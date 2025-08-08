import { pgTable, text, serial, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Coaching recommendations table
export const coachingRecommendations = pgTable("coaching_recommendations", {
  id: serial("id").primaryKey(),
  technicianId: text("technician_id").notNull(),
  technicianName: text("technician_name").notNull(),
  recommendationType: text("recommendation_type").notNull(), // 'technical', 'customer_service', 'efficiency', 'safety'
  priority: text("priority").notNull(), // 'high', 'medium', 'low'
  title: text("title").notNull(),
  description: text("description").notNull(),
  actionItems: jsonb("action_items").$type<string[]>(),
  estimatedImpact: text("estimated_impact"), // Expected improvement
  timeToComplete: integer("time_to_complete"), // Hours
  status: text("status").default("pending"), // 'pending', 'in_progress', 'completed', 'dismissed'
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  coachAssigned: text("coach_assigned"),
  performanceMetrics: jsonb("performance_metrics").$type<Record<string, number>>(),
});

// Technician performance insights table
export const technicianPerformanceInsights = pgTable("technician_performance_insights", {
  id: serial("id").primaryKey(),
  technicianId: text("technician_id").notNull(),
  technicianName: text("technician_name").notNull(),
  overallScore: decimal("overall_score", { precision: 4, scale: 2 }),
  customerSatisfactionScore: decimal("customer_satisfaction_score", { precision: 4, scale: 2 }),
  efficiencyScore: decimal("efficiency_score", { precision: 4, scale: 2 }),
  technicalSkillScore: decimal("technical_skill_score", { precision: 4, scale: 2 }),
  safetyScore: decimal("safety_score", { precision: 4, scale: 2 }),
  strengths: jsonb("strengths").$type<string[]>(),
  improvementAreas: jsonb("improvement_areas").$type<string[]>(),
  recentTrends: jsonb("recent_trends").$type<Record<string, string>>(), // 'improving', 'declining', 'stable'
  lastAnalyzed: timestamp("last_analyzed").defaultNow(),
  totalCompletedOrders: integer("total_completed_orders"),
  averageRatingDifference: decimal("average_rating_difference", { precision: 3, scale: 2 }),
});

// Coaching progress tracking
export const coachingProgress = pgTable("coaching_progress", {
  id: serial("id").primaryKey(),
  recommendationId: integer("recommendation_id").references(() => coachingRecommendations.id),
  technicianId: text("technician_id").notNull(),
  progressUpdate: text("progress_update").notNull(),
  completionPercentage: integer("completion_percentage").default(0),
  notes: text("notes"),
  updatedBy: text("updated_by"), // Coach or supervisor
  updatedAt: timestamp("updated_at").defaultNow(),
  performanceImpact: jsonb("performance_impact").$type<Record<string, number>>(),
});

// Insert schemas
export const insertCoachingRecommendationSchema = createInsertSchema(coachingRecommendations).omit({
  id: true,
  createdAt: true,
});

export const insertTechnicianPerformanceInsightsSchema = createInsertSchema(technicianPerformanceInsights).omit({
  id: true,
  lastAnalyzed: true,
});

export const insertCoachingProgressSchema = createInsertSchema(coachingProgress).omit({
  id: true,
  updatedAt: true,
});

// Types
export type CoachingRecommendation = typeof coachingRecommendations.$inferSelect;
export type InsertCoachingRecommendation = z.infer<typeof insertCoachingRecommendationSchema>;
export type TechnicianPerformanceInsights = typeof technicianPerformanceInsights.$inferSelect;
export type InsertTechnicianPerformanceInsights = z.infer<typeof insertTechnicianPerformanceInsightsSchema>;
export type CoachingProgress = typeof coachingProgress.$inferSelect;
export type InsertCoachingProgress = z.infer<typeof insertCoachingProgressSchema>;