import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { wsMessageSchema, PresenceUpdate, ActivityBroadcast } from '@shared/collaboration-schema';
import { db } from './db';
import { userPresence, collaborationActivities, collaborationNotifications } from '@shared/collaboration-schema';
import { eq } from 'drizzle-orm';

interface ConnectedClient {
  ws: WebSocket;
  userId: string;
  userName: string;
  userRole: string;
  currentPage: string;
  sessionId: string;
  lastActivity: Date;
}

class CollaborationWebSocketServer {
  private wss: WebSocketServer;
  private clients: Map<string, ConnectedClient> = new Map();
  private heartbeatInterval: NodeJS.Timeout;

  constructor(server: Server) {
    this.wss = new WebSocketServer({ 
      server, 
      path: '/ws/collaboration',
      verifyClient: (info: any) => {
        // Add authentication logic here if needed
        return true;
      }
    });

    this.wss.on('connection', this.handleConnection.bind(this));
    
    // Cleanup inactive connections every 30 seconds
    this.heartbeatInterval = setInterval(() => {
      this.cleanupInactiveConnections();
    }, 30000);
  }

  private handleConnection(ws: WebSocket, request: any) {
    console.log('New WebSocket connection established');

    ws.on('message', async (data: string) => {
      try {
        const message = JSON.parse(data);
        const validatedMessage = wsMessageSchema.parse(message);
        await this.handleMessage(ws, validatedMessage);
      } catch (error) {
        console.error('Invalid WebSocket message:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Invalid message format',
          timestamp: new Date().toISOString()
        }));
      }
    });

    ws.on('close', () => {
      this.handleDisconnection(ws);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.handleDisconnection(ws);
    });

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connected',
      message: 'Connected to collaboration server',
      timestamp: new Date().toISOString()
    }));
  }

  private async handleMessage(ws: WebSocket, message: any) {
    const { type, payload, userId, userName } = message;

    switch (type) {
      case 'presence_update':
        await this.handlePresenceUpdate(ws, payload, userId, userName);
        break;
      
      case 'activity_broadcast':
        await this.handleActivityBroadcast(payload, userId, userName);
        break;
      
      case 'session_join':
        await this.handleSessionJoin(ws, payload, userId, userName);
        break;
      
      case 'session_leave':
        await this.handleSessionLeave(ws, payload, userId);
        break;
      
      default:
        console.warn('Unknown message type:', type);
    }
  }

  private async handlePresenceUpdate(ws: WebSocket, payload: PresenceUpdate, userId: string, userName: string) {
    try {
      // Update client info
      const client: ConnectedClient = {
        ws,
        userId,
        userName,
        userRole: payload.userRole,
        currentPage: payload.currentPage,
        sessionId: this.generateSessionId(),
        lastActivity: new Date()
      };

      this.clients.set(userId, client);

      // Update database
      const existingPresence = await db
        .select()
        .from(userPresence)
        .where(eq(userPresence.userId, userId))
        .limit(1);

      if (existingPresence.length > 0) {
        await db
          .update(userPresence)
          .set({
            userName,
            userRole: payload.userRole,
            currentPage: payload.currentPage,
            currentSection: payload.currentSection,
            lastActivity: new Date(),
            isActive: payload.isActive,
            metadata: payload.metadata
          })
          .where(eq(userPresence.userId, userId));
      } else {
        await db
          .insert(userPresence)
          .values({
            userId,
            userName,
            userRole: payload.userRole,
            currentPage: payload.currentPage,
            currentSection: payload.currentSection,
            sessionId: client.sessionId,
            isActive: payload.isActive,
            metadata: payload.metadata
          });
      }

      // Broadcast presence update to other users on the same page
      this.broadcastToPage(payload.currentPage, {
        type: 'presence_update',
        payload: {
          userId,
          userName,
          userRole: payload.userRole,
          currentPage: payload.currentPage,
          currentSection: payload.currentSection,
          isActive: payload.isActive,
          action: 'joined'
        },
        timestamp: new Date().toISOString()
      }, userId);

    } catch (error) {
      console.error('Error handling presence update:', error);
    }
  }

  private async handleActivityBroadcast(payload: ActivityBroadcast, userId: string, userName: string) {
    try {
      // Save activity to database
      await db
        .insert(collaborationActivities)
        .values({
          userId,
          userName,
          activityType: payload.activityType,
          targetEntity: payload.targetEntity,
          targetId: payload.targetId,
          description: payload.description,
          metadata: payload.metadata
        });

      // Broadcast activity to relevant users
      const targetPage = payload.targetEntity;
      this.broadcastToPage(targetPage, {
        type: 'activity_broadcast',
        payload: {
          userId,
          userName,
          activityType: payload.activityType,
          targetEntity: payload.targetEntity,
          targetId: payload.targetId,
          description: payload.description,
          timestamp: new Date().toISOString()
        },
        timestamp: new Date().toISOString()
      }, userId);

    } catch (error) {
      console.error('Error handling activity broadcast:', error);
    }
  }

  private async handleSessionJoin(ws: WebSocket, payload: any, userId: string, userName: string) {
    // Handle collaboration session join logic
    const { sessionId, targetPage } = payload;
    
    // Notify other session participants
    this.broadcastToPage(targetPage, {
      type: 'session_join',
      payload: {
        userId,
        userName,
        sessionId,
        targetPage
      },
      timestamp: new Date().toISOString()
    }, userId);
  }

  private async handleSessionLeave(ws: WebSocket, payload: any, userId: string) {
    // Handle collaboration session leave logic
    const { sessionId, targetPage } = payload;
    
    // Notify other session participants
    this.broadcastToPage(targetPage, {
      type: 'session_leave',
      payload: {
        userId,
        sessionId,
        targetPage
      },
      timestamp: new Date().toISOString()
    }, userId);
  }

  private handleDisconnection(ws: WebSocket) {
    // Find and remove the disconnected client
    Array.from(this.clients.entries()).forEach(([userId, client]) => {
      if (client.ws === ws) {
        // Mark user as inactive in database
        db.update(userPresence)
          .set({ isActive: false })
          .where(eq(userPresence.userId, userId))
          .catch(console.error);

        // Notify other users on the same page
        this.broadcastToPage(client.currentPage, {
          type: 'presence_update',
          payload: {
            userId,
            userName: client.userName,
            currentPage: client.currentPage,
            isActive: false,
            action: 'left'
          },
          timestamp: new Date().toISOString()
        }, userId);

        this.clients.delete(userId);
      }
    });
  }

  private broadcastToPage(page: string, message: any, excludeUserId?: string) {
    Array.from(this.clients.entries()).forEach(([userId, client]) => {
      if (client.currentPage === page && userId !== excludeUserId) {
        if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.send(JSON.stringify(message));
        }
      }
    });
  }

  private cleanupInactiveConnections() {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    Array.from(this.clients.entries()).forEach(([userId, client]) => {
      if (client.lastActivity < fiveMinutesAgo || client.ws.readyState !== WebSocket.OPEN) {
        this.handleDisconnection(client.ws);
      }
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public getActiveUsers(page?: string): ConnectedClient[] {
    const users = Array.from(this.clients.values());
    return page ? users.filter(user => user.currentPage === page) : users;
  }

  public getUserCount(page?: string): number {
    return this.getActiveUsers(page).length;
  }

  public close() {
    clearInterval(this.heartbeatInterval);
    this.wss.close();
  }
}

export { CollaborationWebSocketServer };