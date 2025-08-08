import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, serial, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

// User presence tracking table
export const userPresence = pgTable("user_presence", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  userName: text("user_name").notNull(),
  userRole: text("user_role").notNull(), // executive, manager, analyst, etc.
  currentPage: text("current_page").notNull(),
  currentSection: text("current_section"),
  lastActivity: timestamp("last_activity").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  sessionId: text("session_id").notNull(),
  metadata: jsonb("metadata"), // Additional context like viewing specific OKRs, etc.
});

// Collaboration activities table
export const collaborationActivities = pgTable("collaboration_activities", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  userName: text("user_name").notNull(),
  activityType: text("activity_type").notNull(), // view, edit, comment, approve, etc.
  targetEntity: text("target_entity").notNull(), // okr, agent, dashboard, etc.
  targetId: text("target_id"),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: jsonb("metadata"),
});

// Real-time notifications table
export const collaborationNotifications = pgTable("collaboration_notifications", {
  id: serial("id").primaryKey(),
  recipientId: text("recipient_id").notNull(),
  senderId: text("sender_id").notNull(),
  senderName: text("sender_name").notNull(),
  notificationType: text("notification_type").notNull(), // join, leave, edit, comment, etc.
  message: text("message").notNull(),
  targetPage: text("target_page"),
  isRead: boolean("is_read").default(false).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Collaboration sessions table
export const collaborationSessions = pgTable("collaboration_sessions", {
  id: serial("id").primaryKey(),
  sessionName: text("session_name").notNull(),
  hostId: text("host_id").notNull(),
  hostName: text("host_name").notNull(),
  targetPage: text("target_page").notNull(),
  participants: jsonb("participants").notNull(), // Array of user objects
  status: text("status").default("active").notNull(), // active, paused, ended
  startTime: timestamp("start_time").defaultNow().notNull(),
  endTime: timestamp("end_time"),
});

// Zod schemas for validation
export const insertUserPresenceSchema = createInsertSchema(userPresence);
export const insertCollaborationActivitySchema = createInsertSchema(collaborationActivities);
export const insertCollaborationNotificationSchema = createInsertSchema(collaborationNotifications);
export const insertCollaborationSessionSchema = createInsertSchema(collaborationSessions);

// TypeScript types
export type UserPresence = typeof userPresence.$inferSelect;
export type InsertUserPresence = z.infer<typeof insertUserPresenceSchema>;
export type CollaborationActivity = typeof collaborationActivities.$inferSelect;
export type InsertCollaborationActivity = z.infer<typeof insertCollaborationActivitySchema>;
export type CollaborationNotification = typeof collaborationNotifications.$inferSelect;
export type InsertCollaborationNotification = z.infer<typeof insertCollaborationNotificationSchema>;
export type CollaborationSession = typeof collaborationSessions.$inferSelect;
export type InsertCollaborationSession = z.infer<typeof insertCollaborationSessionSchema>;

// WebSocket message types
export const wsMessageSchema = z.object({
  type: z.enum(['presence_update', 'activity_broadcast', 'notification', 'session_join', 'session_leave']),
  payload: z.any(),
  timestamp: z.string(),
  userId: z.string(),
  userName: z.string(),
});

export type WSMessage = z.infer<typeof wsMessageSchema>;

// Presence update payload
export const presenceUpdateSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  userRole: z.string(),
  currentPage: z.string(),
  currentSection: z.string().optional(),
  isActive: z.boolean(),
  metadata: z.any().optional(),
});

export type PresenceUpdate = z.infer<typeof presenceUpdateSchema>;

// Activity broadcast payload
export const activityBroadcastSchema = z.object({
  activityType: z.string(),
  targetEntity: z.string(),
  targetId: z.string().optional(),
  description: z.string(),
  metadata: z.any().optional(),
});

export type ActivityBroadcast = z.infer<typeof activityBroadcastSchema>;