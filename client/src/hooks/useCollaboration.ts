import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { 
  UserPresence, 
  CollaborationActivity, 
  CollaborationNotification,
  PresenceUpdate,
  ActivityBroadcast,
  WSMessage 
} from '@shared/collaboration-schema';

interface UseCollaborationOptions {
  userId: string;
  userName: string;
  userRole: string;
  currentPage: string;
  currentSection?: string;
}

interface CollaborationState {
  isConnected: boolean;
  activeUsers: UserPresence[];
  recentActivities: CollaborationActivity[];
  notifications: CollaborationNotification[];
  unreadCount: number;
}

export function useCollaboration(options: UseCollaborationOptions) {
  const [state, setState] = useState<CollaborationState>({
    isConnected: false,
    activeUsers: [],
    recentActivities: [],
    notifications: [],
    unreadCount: 0
  });

  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  // Fetch active users on current page
  const { data: activeUsers = [] } = useQuery({
    queryKey: ['/api/collaboration/presence', options.currentPage],
    queryFn: () => fetch(`/api/collaboration/presence/${options.currentPage}`).then(res => res.json()),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch recent activities
  const { data: recentActivities = [] } = useQuery({
    queryKey: ['/api/collaboration/activities', options.currentPage],
    queryFn: () => fetch(`/api/collaboration/activities?page=${options.currentPage}&limit=20`).then(res => res.json()),
    refetchInterval: 15000, // Refresh every 15 seconds
  });

  // Fetch user notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ['/api/collaboration/notifications', options.userId],
    queryFn: () => fetch(`/api/collaboration/notifications/${options.userId}`).then(res => res.json()),
    refetchInterval: 30000,
  });

  // Update presence mutation
  const updatePresenceMutation = useMutation({
    mutationFn: (presenceData: Partial<PresenceUpdate>) => 
      fetch('/api/collaboration/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: options.userId,
          userName: options.userName,
          userRole: options.userRole,
          currentPage: options.currentPage,
          currentSection: options.currentSection,
          isActive: true,
          ...presenceData
        })
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collaboration/presence'] });
    }
  });

  // Broadcast activity mutation
  const broadcastActivityMutation = useMutation({
    mutationFn: (activity: ActivityBroadcast) => 
      fetch('/api/collaboration/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: options.userId,
          userName: options.userName,
          ...activity
        })
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collaboration/activities'] });
    }
  });

  // WebSocket connection management
  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/collaboration`;
    
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log('Connected to collaboration WebSocket');
      setState(prev => ({ ...prev, isConnected: true }));
      
      // Send initial presence update
      sendPresenceUpdate({
        userId: options.userId,
        userName: options.userName,
        userRole: options.userRole,
        currentPage: options.currentPage,
        currentSection: options.currentSection,
        isActive: true
      });
    };

    wsRef.current.onmessage = (event) => {
      try {
        const message: WSMessage = JSON.parse(event.data);
        handleWebSocketMessage(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    wsRef.current.onclose = () => {
      console.log('Disconnected from collaboration WebSocket');
      setState(prev => ({ ...prev, isConnected: false }));
      
      // Attempt to reconnect after 3 seconds
      setTimeout(connectWebSocket, 3000);
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, [options]);

  const handleWebSocketMessage = useCallback((message: WSMessage) => {
    switch (message.type) {
      case 'presence_update':
        queryClient.invalidateQueries({ queryKey: ['/api/collaboration/presence'] });
        break;
        
      case 'activity_broadcast':
        queryClient.invalidateQueries({ queryKey: ['/api/collaboration/activities'] });
        setState(prev => ({
          ...prev,
          recentActivities: [message.payload as CollaborationActivity, ...prev.recentActivities.slice(0, 19)]
        }));
        break;
        
      case 'notification':
        queryClient.invalidateQueries({ queryKey: ['/api/collaboration/notifications'] });
        setState(prev => ({
          ...prev,
          unreadCount: prev.unreadCount + 1
        }));
        break;
        
      default:
        console.log('Received WebSocket message:', message);
    }
  }, [queryClient]);

  const sendPresenceUpdate = useCallback((presence: PresenceUpdate) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: WSMessage = {
        type: 'presence_update',
        payload: presence,
        timestamp: new Date().toISOString(),
        userId: options.userId,
        userName: options.userName
      };
      wsRef.current.send(JSON.stringify(message));
    }
  }, [options.userId, options.userName]);

  const sendActivityBroadcast = useCallback((activity: ActivityBroadcast) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: WSMessage = {
        type: 'activity_broadcast',
        payload: activity,
        timestamp: new Date().toISOString(),
        userId: options.userId,
        userName: options.userName
      };
      wsRef.current.send(JSON.stringify(message));
    }
    
    // Also save to database
    broadcastActivityMutation.mutate(activity);
  }, [options.userId, options.userName, broadcastActivityMutation]);

  // Initialize WebSocket connection
  useEffect(() => {
    connectWebSocket();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  // Update presence when page/section changes
  useEffect(() => {
    updatePresenceMutation.mutate({
      currentPage: options.currentPage,
      currentSection: options.currentSection
    });
    
    if (state.isConnected) {
      sendPresenceUpdate({
        userId: options.userId,
        userName: options.userName,
        userRole: options.userRole,
        currentPage: options.currentPage,
        currentSection: options.currentSection,
        isActive: true
      });
    }
  }, [options.currentPage, options.currentSection, state.isConnected]);

  // Cleanup on unmount
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        sendPresenceUpdate({
          userId: options.userId,
          userName: options.userName,
          userRole: options.userRole,
          currentPage: options.currentPage,
          currentSection: options.currentSection,
          isActive: false
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [options, sendPresenceUpdate]);

  // Update state with fetched data
  useEffect(() => {
    setState(prev => ({
      ...prev,
      activeUsers,
      recentActivities,
      notifications,
      unreadCount: notifications.filter((n: CollaborationNotification) => !n.isRead).length
    }));
  }, [activeUsers, recentActivities, notifications]);

  return {
    ...state,
    sendActivityBroadcast,
    updatePresence: updatePresenceMutation.mutate,
    markNotificationsAsRead: (notificationIds?: number[]) => {
      fetch(`/api/collaboration/notifications/${options.userId}/read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationIds })
      }).then(() => {
        queryClient.invalidateQueries({ queryKey: ['/api/collaboration/notifications'] });
        setState(prev => ({ ...prev, unreadCount: 0 }));
      });
    }
  };
}