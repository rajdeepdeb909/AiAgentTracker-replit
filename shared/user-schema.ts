import { pgTable, text, serial, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from 'drizzle-orm';

// User role definitions aligned with AI-agentic organization structure
export type UserRole = 'admin' | 'executive' | 'manager' | 'operator' | 'agent' | 'human_coordinator';

// AI Agent types based on the 26 specialized agents
export type AgentType = 
  | 'scheduling' | 'customer_communication' | 'route_optimization' | 'field_service'
  | 'hvac_diagnostics' | 'inventory_management' | 'emergency_response' | 'quality_assurance'
  | 'pricing_estimation' | 'maintenance_scheduler' | 'technician_interaction'
  | 'parts_prediction' | 'recommendation_dominance' | 'b2b_intelligence' | 'market_intelligence'
  | 'parts_ordering' | 'performance_analytics' | 'regional_performance' | 'technician_management'
  | 'technician_recruiting' | 'technician_training' | 'conversational_commerce'
  | 'content_intelligence' | 'retention_intelligence' | 'financial_intelligence'
  | 'supply_chain' | 'executive_coordination';

// Human role types based on organizational chart
export type HumanRoleType =
  | 'ceo' | 'coo' | 'cfo' | 'cto' | 'cmo' | 'cdo' | 'cao' | 'cpo' | 'cro'
  | 'recruitment_manager' | 'field_specialist' | 'partnership_lead' | 'trade_show_coordinator'
  | 'operations_manager' | 'quality_assurance_lead' | 'scheduling_coordinator'
  | 'analytics_manager' | 'data_intelligence_specialist' | 'training_lead'
  | 'ai_coordination_facilitator' | 'agent_performance_orchestrator' | 'human_ai_synthesizer';

// Core Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  
  // Role and type
  role: varchar("role", { length: 50 }).notNull().$type<UserRole>(),
  userType: varchar("user_type", { length: 50 }).notNull().default('human'), // 'human', 'ai_agent', 'system'
  
  // Personal information
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  displayName: varchar("display_name", { length: 255 }),
  
  // Profile information
  profileImageUrl: text("profile_image_url"),
  department: varchar("department", { length: 100 }),
  title: varchar("title", { length: 255 }),
  
  // Contact information
  phone: varchar("phone", { length: 20 }),
  
  // AI Agent specific fields
  agentType: varchar("agent_type", { length: 50 }).$type<AgentType>(),
  agentId: varchar("agent_id", { length: 100 }), // Reference to agent in agents table
  
  // Human role specific fields
  humanRoleType: varchar("human_role_type", { length: 50 }).$type<HumanRoleType>(),
  managerId: varchar("manager_id").references(() => users.id),
  
  // Permissions and access
  permissions: jsonb("permissions").$type<string[]>().default([]),
  customPermissions: jsonb("custom_permissions").$type<string[]>().default([]),
  
  // AI-agentic coordination fields
  coordinatedAgents: jsonb("coordinated_agents").$type<string[]>().default([]), // AI agents this human coordinates with
  humanCollaborators: jsonb("human_collaborators").$type<string[]>().default([]), // Other humans this user collaborates with
  planningAreas: jsonb("planning_areas").$type<string[]>().default([]), // Geographic areas of responsibility
  
  // Authentication and security
  lastLoginAt: timestamp("last_login_at"),
  passwordResetToken: text("password_reset_token"),
  passwordResetExpires: timestamp("password_reset_expires"),
  
  // Account status
  isActive: boolean("is_active").default(true),
  isEmailVerified: boolean("is_email_verified").default(false),
  isApproved: boolean("is_approved").default(true),
  
  // AI Agent specific status
  agentStatus: varchar("agent_status", { length: 50 }).default('active'), // active, maintenance, error, training
  
  // Audit fields
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdBy: varchar("created_by").references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
});

// User sessions table for authentication
export const userSessions = pgTable("user_sessions", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  sessionToken: text("session_token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  
  // Session metadata
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  
  createdAt: timestamp("created_at").defaultNow(),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
});

// User activity log for audit trail
export const userActivityLog = pgTable("user_activity_log", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  
  // Activity details
  action: varchar("action", { length: 100 }).notNull(), // login, logout, create, update, delete, view
  resource: varchar("resource", { length: 100 }), // agents, users, dashboard, etc.
  resourceId: varchar("resource_id", { length: 100 }),
  
  // Request metadata
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  
  // Activity context
  details: jsonb("details").default('{}'),
  
  timestamp: timestamp("timestamp").defaultNow(),
});

// User preferences and settings
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  
  // UI preferences
  theme: varchar("theme", { length: 20 }).default('dark'), // dark, light, auto
  language: varchar("language", { length: 10 }).default('en'),
  timezone: varchar("timezone", { length: 50 }).default('UTC'),
  
  // Dashboard preferences
  defaultDashboard: varchar("default_dashboard", { length: 100 }).default('/dashboard'),
  dashboardLayout: jsonb("dashboard_layout").default('{}'),
  
  // Notification preferences
  emailNotifications: boolean("email_notifications").default(true),
  smsNotifications: boolean("sms_notifications").default(false),
  pushNotifications: boolean("push_notifications").default(true),
  
  // AI-specific preferences
  preferredAgents: jsonb("preferred_agents").$type<string[]>().default([]),
  collaborationPreferences: jsonb("collaboration_preferences").default('{}'),
  
  // Custom settings
  customSettings: jsonb("custom_settings").default('{}'),
  
  updatedAt: timestamp("updated_at").defaultNow(),
});

// AI Agent credentials and API keys
export const agentCredentials = pgTable("agent_credentials", {
  id: serial("id").primaryKey(),
  agentId: varchar("agent_id").notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  
  // API credentials
  apiKey: text("api_key").notNull(),
  apiSecret: text("api_secret"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  
  // Service credentials
  serviceEndpoint: text("service_endpoint"),
  serviceCredentials: jsonb("service_credentials").default('{}'),
  
  // Status and metadata
  isActive: boolean("is_active").default(true),
  expiresAt: timestamp("expires_at"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  manager: one(users, {
    fields: [users.managerId],
    references: [users.id],
    relationName: "manager"
  }),
  directReports: many(users, {
    relationName: "manager"
  }),
  sessions: many(userSessions),
  activityLog: many(userActivityLog),
  preferences: one(userPreferences),
  credentials: many(agentCredentials),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));

export const userActivityLogRelations = relations(userActivityLog, ({ one }) => ({
  user: one(users, {
    fields: [userActivityLog.userId],
    references: [users.id],
  }),
}));

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.id],
  }),
}));

export const agentCredentialsRelations = relations(agentCredentials, ({ one }) => ({
  user: one(users, {
    fields: [agentCredentials.userId],
    references: [users.id],
  }),
}));

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users, {
  role: z.enum(['admin', 'executive', 'manager', 'operator', 'agent', 'human_coordinator']),
  userType: z.enum(['human', 'ai_agent', 'system']),
  email: z.string().email(),
  username: z.string().min(3).max(100),
  permissions: z.array(z.string()).optional(),
  customPermissions: z.array(z.string()).optional(),
  coordinatedAgents: z.array(z.string()).optional(),
  humanCollaborators: z.array(z.string()).optional(),
  planningAreas: z.array(z.string()).optional(),
});

export const insertUserSessionSchema = createInsertSchema(userSessions);
export const insertUserActivityLogSchema = createInsertSchema(userActivityLog);
export const insertUserPreferencesSchema = createInsertSchema(userPreferences);
export const insertAgentCredentialsSchema = createInsertSchema(agentCredentials);

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;
export type UserActivityLog = typeof userActivityLog.$inferSelect;
export type InsertUserActivityLog = typeof userActivityLog.$inferInsert;
export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;
export type AgentCredentials = typeof agentCredentials.$inferSelect;
export type InsertAgentCredentials = typeof agentCredentials.$inferInsert;