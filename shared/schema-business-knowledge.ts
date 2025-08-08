import { pgTable, serial, text, varchar, jsonb, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Business Glossary Table - Core terminology and definitions
export const businessGlossary = pgTable("business_glossary", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 100 }).notNull(), // e.g., "Trendview_Glossary", "Parts", "Operations"
  metricName: varchar("metric_name", { length: 200 }).notNull(),
  description: text("description").notNull(),
  source: varchar("source", { length: 100 }), // Source file/system
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Agent Prompts and Classification System
export const agentPrompts = pgTable("agent_prompts", {
  id: serial("id").primaryKey(),
  agentType: varchar("agent_type", { length: 100 }).notNull(), // e.g., "Parts_Prediction", "Customer_Communication"
  promptCategory: varchar("prompt_category", { length: 100 }), // e.g., "Emergency", "Standard", "Parts_Ordering"
  promptText: text("prompt_text").notNull(),
  classification: varchar("classification", { length: 20 }).notNull(), // "RED", "YELLOW", "GREEN"
  classificationReason: text("classification_reason"), // AI-generated reasoning for classification
  contextData: jsonb("context_data"), // Additional metadata (KPIs, thresholds, etc.)
  source: varchar("source", { length: 100 }), // Source spreadsheet/system
  isActive: boolean("is_active").default(true),
  confidenceScore: integer("confidence_score"), // 0-100 confidence in classification
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

// Agent Knowledge Base - Links agents to relevant business terms and prompts
export const agentKnowledgeBase = pgTable("agent_knowledge_base", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").notNull(), // Reference to agents table
  agentName: varchar("agent_name", { length: 200 }).notNull(),
  knowledgeType: varchar("knowledge_type", { length: 50 }).notNull(), // "GLOSSARY", "PROMPT", "PROCEDURE"
  referenceId: integer("reference_id").notNull(), // ID from glossary or prompts table
  relevanceScore: integer("relevance_score").default(100), // 0-100 how relevant this knowledge is
  contextTags: jsonb("context_tags"), // ["parts", "emergency", "B2B", etc.]
  createdAt: timestamp("created_at").defaultNow()
});

// Prompt Classification Rules - AI learning system for prompt classification
export const promptClassificationRules = pgTable("prompt_classification_rules", {
  id: serial("id").primaryKey(),
  ruleType: varchar("rule_type", { length: 50 }).notNull(), // "KEYWORD", "CONTEXT", "PATTERN"
  condition: text("condition").notNull(), // The rule condition
  classification: varchar("classification", { length: 20 }).notNull(), // "RED", "YELLOW", "GREEN"
  confidence: integer("confidence").default(100), // 0-100 confidence in this rule
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});

// Insert schemas for type safety
export const insertBusinessGlossary = createInsertSchema(businessGlossary);
export const insertAgentPrompts = createInsertSchema(agentPrompts);
export const insertAgentKnowledgeBase = createInsertSchema(agentKnowledgeBase);
export const insertPromptClassificationRules = createInsertSchema(promptClassificationRules);

// Types
export type BusinessGlossary = typeof businessGlossary.$inferSelect;
export type InsertBusinessGlossary = z.infer<typeof insertBusinessGlossary>;
export type AgentPrompts = typeof agentPrompts.$inferSelect;
export type InsertAgentPrompts = z.infer<typeof insertAgentPrompts>;
export type AgentKnowledgeBase = typeof agentKnowledgeBase.$inferSelect;
export type InsertAgentKnowledgeBase = z.infer<typeof insertAgentKnowledgeBase>;
export type PromptClassificationRules = typeof promptClassificationRules.$inferSelect;
export type InsertPromptClassificationRules = z.infer<typeof insertPromptClassificationRules>;

// Classification enums
export const PROMPT_CLASSIFICATIONS = {
  RED: "HIGH_PRIORITY_IMMEDIATE_ACTION",
  YELLOW: "MEDIUM_PRIORITY_ESCALATION_NEEDED", 
  GREEN: "NORMAL_OPERATIONS_AUTONOMOUS"
} as const;

export type PromptClassification = keyof typeof PROMPT_CLASSIFICATIONS;