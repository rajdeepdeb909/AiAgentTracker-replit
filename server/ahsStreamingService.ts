import WebSocket, { WebSocketServer } from 'ws';

export interface AhsInteractionEvent {
  type: 'message' | 'report' | 'alert' | 'feedback' | 'schedule';
  managerId: string;
  managerName: string;
  agentId: number;
  timestamp: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: any;
  requiresResponse?: boolean;
  scheduledFor?: string;
}

export interface AhsStreamingClient {
  ws: WebSocket;
  managerId?: string;
  subscriptions: Set<string>;
  isAreaManager: boolean;
  lastPing: Date;
}

export class AhsStreamingService {
  private wss: WebSocketServer;
  private clients: Map<string, AhsStreamingClient> = new Map();
  private interactionHistory: AhsInteractionEvent[] = [];
  private scheduledInteractions: Map<string, AhsInteractionEvent> = new Map();
  
  constructor(server: any) {
    this.wss = new WebSocketServer({ 
      server, 
      path: '/ws/ahs-stream'
    });
    
    this.wss.on('connection', this.handleConnection.bind(this));
    this.startHeartbeat();
    this.startScheduledInteractionProcessor();
    
    console.log('AHS Streaming Service initialized on /ws/ahs-stream');
  }

  private handleConnection(ws: WebSocket, request: any) {
    const clientId = this.generateClientId();
    const client: AhsStreamingClient = {
      ws,
      subscriptions: new Set(),
      isAreaManager: false,
      lastPing: new Date()
    };
    
    this.clients.set(clientId, client);
    console.log(`AHS streaming client connected: ${clientId}`);
    
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        this.handleMessage(clientId, message);
      } catch (error) {
        console.error('Error parsing AHS stream message:', error);
      }
    });
    
    ws.on('close', () => {
      this.clients.delete(clientId);
      console.log(`AHS streaming client disconnected: ${clientId}`);
    });
    
    ws.on('pong', () => {
      const client = this.clients.get(clientId);
      if (client) {
        client.lastPing = new Date();
      }
    });
    
    // Send welcome message
    this.sendToClient(clientId, {
      type: 'system',
      message: 'Connected to AHS Area Manager streaming service',
      timestamp: new Date().toISOString()
    });
  }

  private handleMessage(clientId: string, message: any) {
    const client = this.clients.get(clientId);
    if (!client) return;
    
    switch (message.type) {
      case 'subscribe':
        this.handleSubscription(clientId, message);
        break;
      case 'manager_auth':
        this.handleManagerAuth(clientId, message);
        break;
      case 'send_interaction':
        this.handleSendInteraction(clientId, message);
        break;
      case 'schedule_interaction':
        this.handleScheduleInteraction(clientId, message);
        break;
      case 'manager_feedback':
        this.handleManagerFeedback(clientId, message);
        break;
      case 'request_history':
        this.handleHistoryRequest(clientId, message);
        break;
      default:
        console.log('Unknown AHS stream message type:', message.type);
    }
  }

  private handleSubscription(clientId: string, message: any) {
    const client = this.clients.get(clientId);
    if (!client) return;
    
    const { subscriptions } = message;
    
    if (Array.isArray(subscriptions)) {
      subscriptions.forEach(sub => client.subscriptions.add(sub));
    }
    
    this.sendToClient(clientId, {
      type: 'subscription_confirmed',
      subscriptions: Array.from(client.subscriptions),
      timestamp: new Date().toISOString()
    });
  }

  private handleManagerAuth(clientId: string, message: any) {
    const client = this.clients.get(clientId);
    if (!client) return;
    
    const { managerId, managerName } = message;
    
    client.managerId = managerId;
    client.isAreaManager = true;
    client.subscriptions.add(`manager_${managerId}`);
    client.subscriptions.add('all_managers');
    
    this.sendToClient(clientId, {
      type: 'auth_confirmed',
      managerId,
      managerName,
      message: `Authenticated as AHS Area Manager: ${managerName}`,
      timestamp: new Date().toISOString()
    });
    
    // Send recent interactions for this manager
    const recentInteractions = this.interactionHistory
      .filter(event => event.managerId === managerId)
      .slice(-10);
    
    this.sendToClient(clientId, {
      type: 'recent_interactions',
      interactions: recentInteractions,
      timestamp: new Date().toISOString()
    });
  }

  private handleSendInteraction(clientId: string, message: any) {
    const interaction: AhsInteractionEvent = {
      type: message.interactionType || 'message',
      managerId: message.managerId,
      managerName: message.managerName,
      agentId: message.agentId,
      timestamp: new Date().toISOString(),
      content: message.content,
      priority: message.priority || 'medium',
      metadata: message.metadata || {},
      requiresResponse: message.requiresResponse || false
    };
    
    this.broadcastInteraction(interaction);
    this.interactionHistory.push(interaction);
    
    // Keep only last 1000 interactions
    if (this.interactionHistory.length > 1000) {
      this.interactionHistory = this.interactionHistory.slice(-1000);
    }
    
    // Send confirmation to sender
    this.sendToClient(clientId, {
      type: 'interaction_sent',
      interactionId: interaction.timestamp,
      timestamp: new Date().toISOString()
    });
  }

  private handleScheduleInteraction(clientId: string, message: any) {
    const interaction: AhsInteractionEvent = {
      type: message.interactionType || 'message',
      managerId: message.managerId,
      managerName: message.managerName,
      agentId: message.agentId,
      timestamp: new Date().toISOString(),
      content: message.content,
      priority: message.priority || 'medium',
      metadata: message.metadata || {},
      requiresResponse: message.requiresResponse || false,
      scheduledFor: message.scheduledFor
    };
    
    const scheduleId = `${interaction.managerId}_${Date.now()}`;
    this.scheduledInteractions.set(scheduleId, interaction);
    
    this.sendToClient(clientId, {
      type: 'interaction_scheduled',
      scheduleId,
      scheduledFor: interaction.scheduledFor,
      timestamp: new Date().toISOString()
    });
    
    // Also broadcast to relevant subscribers immediately for tracking
    this.broadcastToSubscribers(`manager_${interaction.managerId}`, {
      type: 'interaction_scheduled',
      interaction,
      scheduleId,
      timestamp: new Date().toISOString()
    });
  }

  private handleManagerFeedback(clientId: string, message: any) {
    const client = this.clients.get(clientId);
    if (!client || !client.isAreaManager) return;
    
    const feedbackEvent: AhsInteractionEvent = {
      type: 'feedback',
      managerId: client.managerId!,
      managerName: message.managerName,
      agentId: message.agentId || 0,
      timestamp: new Date().toISOString(),
      content: message.feedback,
      priority: 'medium',
      metadata: {
        originalInteractionId: message.originalInteractionId,
        rating: message.rating,
        actionable: message.actionable
      }
    };
    
    this.broadcastInteraction(feedbackEvent);
    this.interactionHistory.push(feedbackEvent);
    
    this.sendToClient(clientId, {
      type: 'feedback_received',
      message: 'Your feedback has been recorded and shared with the AI system',
      timestamp: new Date().toISOString()
    });
  }

  private handleHistoryRequest(clientId: string, message: any) {
    const { managerId, limit = 50, type } = message;
    
    let filteredHistory = this.interactionHistory;
    
    if (managerId) {
      filteredHistory = filteredHistory.filter(event => event.managerId === managerId);
    }
    
    if (type) {
      filteredHistory = filteredHistory.filter(event => event.type === type);
    }
    
    const recentHistory = filteredHistory.slice(-limit);
    
    this.sendToClient(clientId, {
      type: 'interaction_history',
      interactions: recentHistory,
      totalCount: filteredHistory.length,
      timestamp: new Date().toISOString()
    });
  }

  private broadcastInteraction(interaction: AhsInteractionEvent) {
    // Broadcast to specific manager subscribers
    this.broadcastToSubscribers(`manager_${interaction.managerId}`, {
      type: 'new_interaction',
      interaction,
      timestamp: new Date().toISOString()
    });
    
    // Broadcast to all managers subscribers
    this.broadcastToSubscribers('all_managers', {
      type: 'new_interaction',
      interaction,
      timestamp: new Date().toISOString()
    });
    
    // Broadcast to system administrators
    this.broadcastToSubscribers('admin', {
      type: 'new_interaction',
      interaction,
      timestamp: new Date().toISOString()
    });
  }

  private broadcastToSubscribers(subscription: string, message: any) {
    for (const [clientId, client] of this.clients) {
      if (client.subscriptions.has(subscription) && client.ws.readyState === WebSocket.OPEN) {
        try {
          client.ws.send(JSON.stringify(message));
        } catch (error) {
          console.error(`Error sending to AHS streaming client ${clientId}:`, error);
        }
      }
    }
  }

  private sendToClient(clientId: string, message: any) {
    const client = this.clients.get(clientId);
    if (client && client.ws.readyState === WebSocket.OPEN) {
      try {
        client.ws.send(JSON.stringify(message));
      } catch (error) {
        console.error(`Error sending to AHS streaming client ${clientId}:`, error);
      }
    }
  }

  private generateClientId(): string {
    return `ahs_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private startHeartbeat() {
    setInterval(() => {
      const now = new Date();
      for (const [clientId, client] of this.clients) {
        if (client.ws.readyState === WebSocket.OPEN) {
          const timeSincePing = now.getTime() - client.lastPing.getTime();
          if (timeSincePing > 30000) { // 30 seconds
            client.ws.ping();
          }
          if (timeSincePing > 60000) { // 60 seconds - disconnect stale clients
            client.ws.terminate();
            this.clients.delete(clientId);
          }
        } else {
          this.clients.delete(clientId);
        }
      }
    }, 15000); // Check every 15 seconds
  }

  private startScheduledInteractionProcessor() {
    setInterval(() => {
      const now = new Date();
      
      for (const [scheduleId, interaction] of this.scheduledInteractions) {
        if (interaction.scheduledFor && new Date(interaction.scheduledFor) <= now) {
          // Execute scheduled interaction
          this.broadcastInteraction(interaction);
          this.interactionHistory.push(interaction);
          
          // Remove from scheduled interactions
          this.scheduledInteractions.delete(scheduleId);
          
          // Notify about execution
          this.broadcastToSubscribers(`manager_${interaction.managerId}`, {
            type: 'scheduled_interaction_executed',
            interaction,
            scheduleId,
            timestamp: new Date().toISOString()
          });
        }
      }
    }, 60000); // Check every minute
  }

  // Public methods for API integration
  public sendInteractionToManager(interaction: AhsInteractionEvent) {
    this.broadcastInteraction(interaction);
    this.interactionHistory.push(interaction);
  }

  public scheduleInteraction(interaction: AhsInteractionEvent): string {
    const scheduleId = `${interaction.managerId}_${Date.now()}`;
    this.scheduledInteractions.set(scheduleId, interaction);
    return scheduleId;
  }

  public getInteractionHistory(managerId?: string, limit: number = 100): AhsInteractionEvent[] {
    let filteredHistory = this.interactionHistory;
    
    if (managerId) {
      filteredHistory = filteredHistory.filter(event => event.managerId === managerId);
    }
    
    return filteredHistory.slice(-limit);
  }

  public getScheduledInteractions(managerId?: string): AhsInteractionEvent[] {
    const scheduled = Array.from(this.scheduledInteractions.values());
    
    if (managerId) {
      return scheduled.filter(interaction => interaction.managerId === managerId);
    }
    
    return scheduled;
  }

  public getConnectedManagers(): { [managerId: string]: { managerName?: string; lastSeen: string } } {
    const managers: { [key: string]: any } = {};
    
    for (const client of this.clients.values()) {
      if (client.isAreaManager && client.managerId) {
        managers[client.managerId] = {
          lastSeen: client.lastPing.toISOString()
        };
      }
    }
    
    return managers;
  }
}

// Singleton instance
let streamingService: AhsStreamingService | null = null;

export function initializeAhsStreaming(server: any): AhsStreamingService {
  if (!streamingService) {
    streamingService = new AhsStreamingService(server);
  }
  return streamingService;
}

export function getAhsStreamingService(): AhsStreamingService | null {
  return streamingService;
}