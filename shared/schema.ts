import { pgTable, text, serial, integer, decimal, timestamp, jsonb, date, time, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from 'drizzle-orm';

// Import collaboration schema tables
export * from "./collaboration-schema";

// Import user management schema tables
export * from "./user-schema";

// Business Function Leaders Schema
export const businessFunctionLeaders = pgTable("business_function_leaders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  department: text("department").notNull(), // e.g., 'operations', 'finance', 'technology', 'marketing'
  executiveLevel: text("executive_level").notNull(), // 'ceo', 'coo', 'cfo', 'cto', 'cmo', 'cdo', 'cao', 'cpo', 'cro'
  weeklyOperations: jsonb("weekly_operations").notNull().default('{}'), // Complete weekly schedule structure
  responsibleAgents: jsonb("responsible_agents").notNull().default('[]'), // Array of AI agent names/IDs
  kpis: jsonb("kpis").notNull().default('[]'), // Key performance indicators
  objectives: jsonb("objectives").notNull().default('[]'), // Strategic objectives
  isActive: boolean("is_active").notNull().default(true),
  createdBy: text("created_by").notNull(), // Executive who created this leader
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Business Function Leader Tasks Schema
export const businessFunctionTasks = pgTable("business_function_tasks", {
  id: serial("id").primaryKey(),
  leaderId: integer("leader_id").references(() => businessFunctionLeaders.id).notNull(),
  dayOfWeek: text("day_of_week").notNull(), // 'monday', 'tuesday', etc.
  time: text("time").notNull(),
  task: text("task").notNull(),
  status: text("status").notNull().default('pending'), // 'completed', 'in-progress', 'pending', 'critical'
  impact: text("impact").notNull(),
  kpi: text("kpi").notNull(),
  agents: jsonb("agents").notNull().default('[]'), // Array of agent names involved
  priority: text("priority").notNull().default('medium'), // 'high', 'medium', 'low'
  estimatedDuration: integer("estimated_duration"), // in minutes
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  model: text("model").notNull(),
  status: text("status").notNull().default("active"), // active, training, maintenance, error
  accuracy: decimal("accuracy", { precision: 5, scale: 2 }).notNull(),
  responseTime: decimal("response_time", { precision: 8, scale: 3 }).notNull(),
  dailyInteractions: integer("daily_interactions").notNull(),
  monthlyCost: decimal("monthly_cost", { precision: 10, scale: 2 }).notNull(),
  revenueImpact: decimal("revenue_impact", { precision: 10, scale: 2 }).notNull(),
  performance: decimal("performance", { precision: 5, scale: 2 }).notNull(),
  dailyTasks: jsonb("daily_tasks").notNull().default('[]'), // Array of daily tasks with frequency
  evaluationCriteria: jsonb("evaluation_criteria").notNull().default('{}'), // Performance evaluation criteria
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const evaluations = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  score: decimal("score", { precision: 5, scale: 2 }).notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
  feedback: text("feedback"),
});

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  userId: text("user_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const performanceMetrics = pgTable("performance_metrics", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id),
  date: timestamp("date").notNull(),
  performance: decimal("performance", { precision: 5, scale: 2 }).notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).notNull(),
  interactions: integer("interactions").notNull(),
});

// Magik Button Dynamic Capability System
export const magikButtonTemplates = pgTable("magik_button_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'service_delivery', 'parts_management', 'scheduling', 'quality_assurance', 'customer_communication', 'safety', 'training', 'administrative'
  description: text("description").notNull(),
  triggerPhrase: text("trigger_phrase").notNull(), // What technician says to activate
  aiAgents: jsonb("ai_agents").notNull().default('[]'), // Array of AI agent names/IDs involved
  responseTemplate: jsonb("response_template").notNull().default('{}'), // Structured AI response template
  requiredFields: jsonb("required_fields").notNull().default('[]'), // Data fields needed for execution
  automationSteps: jsonb("automation_steps").notNull().default('[]'), // Step-by-step automation process
  businessImpact: text("business_impact").notNull(),
  estimatedTimeSavings: integer("estimated_time_savings"), // in minutes
  frequency: text("frequency").notNull().default('medium'), // 'high', 'medium', 'low'
  successMetrics: jsonb("success_metrics").notNull().default('{}'), // How to measure success
  isActive: boolean("is_active").notNull().default(true),
  createdBy: text("created_by").notNull(),
  approvedBy: text("approved_by"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  approvedAt: timestamp("approved_at"),
});

export const technicianCapabilityRequests = pgTable("technician_capability_requests", {
  id: serial("id").primaryKey(),
  technicianId: text("technician_id").notNull(),
  technicianName: text("technician_name").notNull(),
  requestText: text("request_text").notNull(), // What the technician commented/requested
  suggestedCategory: text("suggested_category"), // AI-suggested category
  urgency: text("urgency").notNull().default('medium'), // 'critical', 'high', 'medium', 'low'
  frequency: text("frequency").notNull().default('unknown'), // How often they need this
  currentWorkaround: text("current_workaround"), // How they currently handle this
  estimatedTimeSpent: integer("estimated_time_spent"), // Current time spent on this task (minutes)
  businessJustification: text("business_justification"), // Why this should be automated
  status: text("status").notNull().default('pending'), // 'pending', 'reviewing', 'approved', 'rejected', 'implemented'
  assignedTo: text("assigned_to"), // Who's reviewing/implementing
  templateId: integer("template_id").references(() => magikButtonTemplates.id), // If converted to template
  reviewNotes: text("review_notes"),
  implementationNotes: text("implementation_notes"),
  rejectionReason: text("rejection_reason"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  implementedAt: timestamp("implemented_at"),
});

export const magikButtonUsageTracking = pgTable("magik_button_usage_tracking", {
  id: serial("id").primaryKey(),
  templateId: integer("template_id").references(() => magikButtonTemplates.id).notNull(),
  technicianId: text("technician_id").notNull(),
  technicianName: text("technician_name").notNull(),
  usageContext: text("usage_context"), // Job context when used
  executionTime: timestamp("execution_time").defaultNow(),
  success: boolean("success").notNull().default(true),
  timeSaved: integer("time_saved"), // actual time saved in minutes
  errorMessage: text("error_message"),
  feedbackRating: integer("feedback_rating"), // 1-5 rating from technician
  feedbackComments: text("feedback_comments"),
  automationStepsCompleted: jsonb("automation_steps_completed").default('[]'),
  aiAgentsInvolved: jsonb("ai_agents_involved").default('[]'),
  businessMetrics: jsonb("business_metrics").default('{}'), // Captured business impact
});

// AHS Area Manager AI Interaction System
export const ahsAreaManagers = pgTable("ahs_area_managers", {
  id: serial("id").primaryKey(),
  managerId: text("manager_id").notNull().unique(), // AHS internal ID
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  region: text("region").notNull(), // Geographic region they oversee
  planningAreas: jsonb("planning_areas").notNull().default('[]'), // Array of planning area codes
  aiAgentId: integer("ai_agent_id").references(() => agents.id), // Dedicated AI agent for this manager
  preferredCommunicationTime: text("preferred_communication_time"), // "morning", "afternoon", "evening"
  weeklyReportDay: text("weekly_report_day").default("monday"), // Day they receive reports
  lastContactDate: timestamp("last_contact_date"),
  totalServiceCompletes: integer("total_service_completes").default(0),
  activeStatus: boolean("active_status").default(true),
  specialFocus: jsonb("special_focus").default('[]'), // Areas of particular interest
  communicationNotes: text("communication_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const ahsGpeMetrics = pgTable("ahs_gpe_metrics", {
  id: serial("id").primaryKey(),
  managerId: text("manager_id").references(() => ahsAreaManagers.managerId).notNull(),
  planningArea: text("planning_area").notNull(),
  dispatchDate: date("dispatch_date").notNull(),
  grossAmount: decimal("gross_amount", { precision: 10, scale: 2 }).notNull(),
  expenseAmount: decimal("expense_amount", { precision: 10, scale: 2 }).notNull(),
  gpeRatio: decimal("gpe_ratio", { precision: 5, scale: 2 }).notNull(), // Gross Per Expense percentage
  targetRatio: decimal("target_ratio", { precision: 5, scale: 2 }).notNull().default("100.00"),
  performanceTier: text("performance_tier").notNull(), // platinum, gold, silver, bronze
  contractorPaid: decimal("contractor_paid", { precision: 10, scale: 2 }).notNull(),
  supplierCost: decimal("supplier_cost", { precision: 10, scale: 2 }).default("0.00"),
  memberCost: decimal("member_cost", { precision: 10, scale: 2 }).default("0.00"),
  jobCode: text("job_code"),
  applianceType: text("appliance_type"),
  serviceType: text("service_type"), // repair, maintenance, replacement
  createdAt: timestamp("created_at").defaultNow(),
});

export const ahsCustomerRatings = pgTable("ahs_customer_ratings", {
  id: serial("id").primaryKey(),
  managerId: text("manager_id").references(() => ahsAreaManagers.managerId).notNull(),
  planningArea: text("planning_area").notNull(),
  serviceDate: date("service_date").notNull(),
  customerRating: integer("customer_rating").notNull(), // 1-5 stars
  technicianSelfRating: integer("technician_self_rating"), // 1-5 stars from our technician
  ratingBiasAdjustment: decimal("rating_bias_adjustment", { precision: 3, scale: 2 }).default("0.00"),
  adjustedRating: decimal("adjusted_rating", { precision: 3, scale: 2 }),
  responseRate: decimal("response_rate", { precision: 5, scale: 2 }), // Percentage of customers who responded
  jobComplexity: text("job_complexity"), // simple, moderate, complex
  technicianExperience: text("technician_experience"), // junior, mid, senior
  customerComments: text("customer_comments"),
  internalNotes: text("internal_notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ahsWeeklyReports = pgTable("ahs_weekly_reports", {
  id: serial("id").primaryKey(),
  managerId: text("manager_id").references(() => ahsAreaManagers.managerId).notNull(),
  reportWeek: date("report_week").notNull(), // Monday of the week
  totalCompletes: integer("total_completes").notNull(),
  avgGpeRatio: decimal("avg_gpe_ratio", { precision: 5, scale: 2 }).notNull(),
  gpePerformanceTier: text("gpe_performance_tier").notNull(),
  platinumCount: integer("platinum_count").default(0),
  goldCount: integer("gold_count").default(0),
  silverCount: integer("silver_count").default(0),
  bronzeCount: integer("bronze_count").default(0),
  avgCustomerRating: decimal("avg_customer_rating", { precision: 3, scale: 2 }),
  adjustedAvgRating: decimal("adjusted_avg_rating", { precision: 3, scale: 2 }),
  ratingResponseRate: decimal("rating_response_rate", { precision: 5, scale: 2 }),
  keyInsights: jsonb("key_insights").default('[]'),
  actionItems: jsonb("action_items").default('[]'),
  sentAt: timestamp("sent_at"),
  aiGeneratedContent: jsonb("ai_generated_content").default('{}'),
  managerFeedback: text("manager_feedback"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ahsAreaManagerInteractions = pgTable("ahs_area_manager_interactions", {
  id: serial("id").primaryKey(),
  managerId: text("manager_id").references(() => ahsAreaManagers.managerId).notNull(),
  aiAgentId: integer("ai_agent_id").references(() => agents.id).notNull(),
  interactionType: text("interaction_type").notNull(), // weekly_report, question_response, proactive_alert
  messageContent: text("message_content").notNull(),
  managerResponse: text("manager_response"),
  sentiment: text("sentiment"), // positive, neutral, negative
  resolved: boolean("resolved").default(false),
  priority: text("priority").default("normal"), // low, normal, high, urgent
  tags: jsonb("tags").default('[]'),
  responseTime: integer("response_time"), // Minutes to respond
  satisfactionRating: integer("satisfaction_rating"), // 1-5 from manager
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

// HOA Prospect Management Tables
export const hoaProspects = pgTable("hoa_prospects", {
  id: serial("id").primaryKey(),
  communityName: text("community_name").notNull(),
  location: text("location").notNull(), // City, State
  address: text("address"),
  contactName: text("contact_name"),
  contactTitle: text("contact_title"), // Board President, Property Manager, etc.
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  communitySize: integer("community_size").notNull(), // Number of homes
  homeValueRange: text("home_value_range").notNull(), // e.g., "300-500K", "500K-1M", "1M+"
  communityType: text("community_type").notNull(), // Single Family, Townhomes, Condos, Mixed
  amenities: jsonb("amenities").default('[]'), // Pool, Tennis, Golf, etc.
  currentServiceProvider: text("current_service_provider"),
  contractExpiration: date("contract_expiration"),
  annualServiceBudget: decimal("annual_service_budget", { precision: 10, scale: 2 }),
  keyPainPoints: jsonb("key_pain_points").default('[]'), // Service issues, cost concerns, etc.
  decisionMakers: jsonb("decision_makers").default('[]'), // Board members, property manager info
  competitiveIntel: jsonb("competitive_intel").default('{}'), // Current pricing, service gaps
  status: text("status").notNull().default("prospect"), // prospect, qualified, proposal, won, lost
  priority: text("priority").notNull().default("medium"), // high, medium, low
  acquisitionSource: text("acquisition_source"), // Referral, Marketing, Cold Outreach
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const hoaProspectStrategies = pgTable("hoa_prospect_strategies", {
  id: serial("id").primaryKey(),
  prospectId: integer("prospect_id").references(() => hoaProspects.id).notNull(),
  strategyName: text("strategy_name").notNull(),
  targetAudience: text("target_audience").notNull(), // Decision makers, residents, property manager
  valueProposition: text("value_proposition").notNull(),
  approachMethod: text("approach_method").notNull(), // Email, Phone, In-person, Referral
  timeline: text("timeline").notNull(), // Immediate, 30 days, 60 days, Seasonal
  keyMessages: jsonb("key_messages").default('[]'),
  proposedServices: jsonb("proposed_services").default('[]'),
  pricingStrategy: text("pricing_strategy"),
  expectedRevenue: decimal("expected_revenue", { precision: 10, scale: 2 }),
  successProbability: integer("success_probability"), // 1-100%
  competitiveAdvantages: jsonb("competitive_advantages").default('[]'),
  risksAndMitigations: jsonb("risks_and_mitigations").default('[]'),
  nextSteps: jsonb("next_steps").default('[]'),
  strategyStatus: text("strategy_status").notNull().default("draft"), // draft, active, completed, paused
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const hoaProspectActivities = pgTable("hoa_prospect_activities", {
  id: serial("id").primaryKey(),
  prospectId: integer("prospect_id").references(() => hoaProspects.id).notNull(),
  strategyId: integer("strategy_id").references(() => hoaProspectStrategies.id),
  activityType: text("activity_type").notNull(), // Call, Email, Meeting, Proposal, Follow-up
  activityDate: timestamp("activity_date").notNull(),
  contactPerson: text("contact_person"),
  outcome: text("outcome"), // Positive, Neutral, Negative, No Response
  notes: text("notes"),
  nextActionDate: timestamp("next_action_date"),
  nextActionType: text("next_action_type"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 1099 Contractor Recruitment tables
export const contractorRecruitment = pgTable("contractor_recruitment", {
  id: serial("id").primaryKey(),
  contractorType: varchar("contractor_type", { length: 50 }).notNull().default("individual"), // "individual" or "firm"
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  firmName: varchar("firm_name", { length: 255 }),
  firmOwnerName: varchar("firm_owner_name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  planningArea: varchar("planning_area", { length: 100 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  zipCode: varchar("zip_code", { length: 10 }),
  
  // Experience and Skills
  yearsExperience: integer("years_experience"),
  serviceSkills: jsonb("service_skills").$type<string[]>().default([]), // HVAC, Plumbing, Electrical, Appliance Repair, etc.
  productSpecialties: jsonb("product_specialties").$type<string[]>().default([]), // Whirlpool, GE, Samsung, etc.
  certifications: jsonb("certifications").$type<string[]>().default([]),
  
  // Business Information
  businessName: varchar("business_name", { length: 255 }),
  businessLicense: varchar("business_license", { length: 100 }),
  insuranceProvider: varchar("insurance_provider", { length: 255 }),
  insuranceAmount: integer("insurance_amount"),
  insuranceCoverage: text("insurance_coverage"), // Detailed insurance coverage for firms
  
  // Firm-Specific Information
  firmCertifications: jsonb("firm_certifications").$type<string[]>().default([]),
  productsServiced: jsonb("products_serviced").$type<string[]>().default([]),
  productsNotServiced: jsonb("products_not_serviced").$type<string[]>().default([]),
  teamSize: integer("team_size").default(1),
  
  // Parts Sourcing
  partsSourcePreference: varchar("parts_source_preference", { length: 50 }).default('company'), // company, self, hybrid
  hasPartsAccounts: boolean("has_parts_accounts").default(false),
  partsSuppliers: jsonb("parts_suppliers").$type<string[]>().default([]), // Ferguson, Home Depot, etc.
  
  // Recruitment Status
  recruitmentStatus: varchar("recruitment_status", { length: 50 }).default('prospect'), // prospect, applied, interviewed, testing, approved, onboarded, active, inactive
  applicationDate: timestamp("application_date"),
  interviewDate: timestamp("interview_date"),
  testingDate: timestamp("testing_date"),  
  onboardingDate: timestamp("onboarding_date"),
  
  // Performance Metrics
  expectedJobsPerWeek: integer("expected_jobs_per_week"),
  preferredWorkDays: jsonb("preferred_work_days").$type<string[]>().default([]),
  travelRadius: integer("travel_radius"), // miles
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  
  // Recruitment Source
  recruitmentSource: varchar("recruitment_source", { length: 100 }), // indeed, referral, cold_outreach, etc.
  referredBy: varchar("referred_by", { length: 255 }),
  
  // Notes and Status
  notes: text("notes"),
  recruiterNotes: text("recruiter_notes"),
  isActive: boolean("is_active").default(true),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Technicians associated with contractor firms
export const firmTechnicians = pgTable("firm_technicians", {
  id: serial("id").primaryKey(),
  contractorFirmId: integer("contractor_firm_id").references(() => contractorRecruitment.id).notNull(),
  
  // Personal Information
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  
  // Skills and Experience
  specialization: varchar("specialization", { length: 255 }), // Primary specialization
  skills: jsonb("skills").$type<string[]>().default([]), // Technical skills possessed
  certifications: jsonb("certifications").$type<string[]>().default([]), // Individual certifications
  experienceYears: integer("experience_years"),
  
  // Employment Details
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  weeklyAvailability: varchar("weekly_availability", { length: 100 }),
  startDate: timestamp("start_date"),
  status: varchar("status", { length: 50 }).default("active"), // active, inactive, pending
  
  // Additional Information
  notes: text("notes"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Recruitment Activities table
export const recruitmentActivities = pgTable("recruitment_activities", {
  id: serial("id").primaryKey(),
  contractorId: integer("contractor_id").references(() => contractorRecruitment.id).notNull(),
  activityType: varchar("activity_type", { length: 50 }).notNull(), // outreach, call, email, interview, test, onboarding
  activityDate: timestamp("activity_date").defaultNow().notNull(),
  description: text("description").notNull(),
  outcome: varchar("outcome", { length: 50 }), // scheduled, completed, no-response, interested, declined, passed, failed
  nextAction: text("next_action"),
  nextActionDate: timestamp("next_action_date"),
  recruiterName: varchar("recruiter_name", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Recruitment Targets by Planning Area
export const recruitmentTargets = pgTable("recruitment_targets", {
  id: serial("id").primaryKey(),
  planningArea: varchar("planning_area", { length: 100 }).notNull(),
  targetContractors: integer("target_contractors").notNull(),
  currentContractors: integer("current_contractors").default(0),
  urgencyLevel: varchar("urgency_level", { length: 20 }).default('medium'), // low, medium, high, critical
  
  // Skill Requirements
  requiredSkills: jsonb("required_skills").$type<string[]>().default([]),
  preferredProducts: jsonb("preferred_products").$type<string[]>().default([]),
  
  // Compensation
  minHourlyRate: decimal("min_hourly_rate", { precision: 10, scale: 2 }),
  maxHourlyRate: decimal("max_hourly_rate", { precision: 10, scale: 2 }),
  
  // Timeline
  targetDate: timestamp("target_date"),
  lastUpdated: timestamp("last_updated").defaultNow(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Historical Data Tracking
export const historicalMetrics = pgTable("historical_metrics", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  time: time("time"), // For hourly tracking
  period: text("period").notNull(), // hour, day, week, month
  totalAgents: integer("total_agents").notNull(),
  activeAgents: integer("active_agents").notNull(),
  avgPerformance: decimal("avg_performance", { precision: 5, scale: 2 }).notNull(),
  totalRevenue: decimal("total_revenue", { precision: 12, scale: 2 }).notNull(),
  totalCost: decimal("total_cost", { precision: 12, scale: 2 }).notNull(),
  profitMargin: decimal("profit_margin", { precision: 5, scale: 2 }).notNull(),
  customerSatisfaction: decimal("customer_satisfaction", { precision: 5, scale: 2 }).notNull(),
  callVolume: integer("call_volume").notNull(),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }).notNull(),
  techniciansDeployed: integer("technicians_deployed").notNull(),
  planningArea: text("planning_area"), // For geographic breakdowns
  additionalMetrics: jsonb("additional_metrics").default('{}'), // Flexible metrics storage
  createdAt: timestamp("created_at").defaultNow(),
});

// Parts Orders Table
export const partsOrders = pgTable("parts_orders", {
  id: serial("id").primaryKey(),
  sku: text("sku").notNull(),
  serviceUnitNo: text("service_unit_no"),
  serviceOrderNo: text("service_order_no").notNull(),
  partSequenceNo: text("part_sequence_no"),
  appliance: text("appliance").notNull(),
  applianceBrand: text("appliance_brand"),
  appModel: text("app_model"),
  partDescription: text("part_description").notNull(),
  partSource: text("part_source"),
  partOrderDate: date("part_order_date").notNull(),
  partOrderQuantity: integer("part_order_quantity").notNull().default(1),
  servicePartStatusCode: text("service_part_status_code").notNull(),
  servicePartStatusDate: date("service_part_status_date"),
  partOrderStatusCode: text("part_order_status_code"),
  partOrderStatusDescription: text("part_order_status_description"),
  shipDate: date("ship_date"),
  orderEmployeeId: text("order_employee_id"),
  estimatedDeliveryDate: date("estimated_delivery_date"),
  actualDeliveryDate: date("actual_delivery_date"),
  procedureId: text("procedure_id"),
  procedureDescription: text("procedure_description"),
  lawsonCost: decimal("lawson_cost", { precision: 10, scale: 2 }).default('0'),
  lawsonSell: decimal("lawson_sell", { precision: 10, scale: 2 }).default('0'),
  partUnitCostPrice: decimal("part_unit_cost_price", { precision: 10, scale: 2 }).default('0'),
  partUnitSellPrice: decimal("part_unit_sell_price", { precision: 10, scale: 2 }).default('0'),
  vendor: text("vendor"),
  backorderFlag: text("backorder_flag"),
  districtName: text("district_name"),
  planningArea: text("planning_area"),
  programType: text("program_type"),
  customerType: text("customer_type"),
  callType: text("call_type"),
  deliveryTrackingNumber: text("delivery_tracking_number"),
  skuCategory: text("sku_category"),
  isDeliveryOnTime: boolean("is_delivery_on_time"),
  deliveryDaysActual: integer("delivery_days_actual"),
  deliveryDaysEstimated: integer("delivery_days_estimated"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Parts Delivery Performance Tracking
export const partsDeliveryPerformance = pgTable("parts_delivery_performance", {
  id: serial("id").primaryKey(),
  vendor: text("vendor").notNull(),
  totalOrders: integer("total_orders").notNull().default(0),
  onTimeDeliveries: integer("on_time_deliveries").notNull().default(0),
  lateDeliveries: integer("late_deliveries").notNull().default(0),
  averageDeliveryDays: decimal("average_delivery_days", { precision: 5, scale: 2 }).default('0'),
  onTimePercentage: decimal("on_time_percentage", { precision: 5, scale: 2 }).default('0'),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Agent Performance History
export const agentPerformanceHistory = pgTable("agent_performance_history", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  date: date("date").notNull(),
  time: time("time"), // For hourly tracking
  performance: decimal("performance", { precision: 5, scale: 2 }).notNull(),
  interactions: integer("interactions").notNull(),
  successRate: decimal("success_rate", { precision: 5, scale: 2 }).notNull(),
  averageResponseTime: decimal("avg_response_time", { precision: 8, scale: 3 }).notNull(),
  errorCount: integer("error_count").default(0),
  userSatisfaction: decimal("user_satisfaction", { precision: 5, scale: 2 }),
  revenueGenerated: decimal("revenue_generated", { precision: 10, scale: 2 }),
  costIncurred: decimal("cost_incurred", { precision: 10, scale: 2 }),
  planningArea: text("planning_area"),
  contextData: jsonb("context_data").default('{}'), // Additional context
  createdAt: timestamp("created_at").defaultNow(),
});

// Executive Orchestration Layer
export const executiveAgents = pgTable("executive_agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // CXO, Strategy, Finance, Risk
  role: text("role").notNull(),
  status: text("status").notNull().default("active"),
  kpis: jsonb("kpis").notNull(), // Key performance indicators
  okaObjectives: jsonb("oka_objectives").notNull(), // Quarterly OKRs
  computeBudget: decimal("compute_budget", { precision: 12, scale: 2 }).notNull(),
  lastDecision: timestamp("last_decision"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Market Pods (400+ local markets)
export const marketPods = pgTable("market_pods", {
  id: serial("id").primaryKey(),
  areaCode: text("area_code").notNull().unique(), // e.g., "PA001", "PA002"
  name: text("name").notNull(), // e.g., "North Dallas Metro"
  region: text("region").notNull(), // e.g., "TX-North", "FL-South"
  households: integer("households").notNull().default(30000), // ~30k households per pod
  geography: jsonb("geography").notNull(), // Lat/lng boundaries, zip codes
  population: integer("population"),
  marketType: text("market_type").notNull(), // urban, suburban, rural
  primaryServices: jsonb("primary_services").notNull(), // Array of primary service types
  podStatus: text("pod_status").notNull().default("active"), // active, parked, scaling
  kubernetesNamespace: text("kubernetes_namespace").notNull(),
  computeResources: jsonb("compute_resources").notNull(), // CPU, memory allocation
  lastActivity: timestamp("last_activity").defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Magik Button Usage Tracking
export const magikButtonUsage = pgTable("magik_button_usage", {
  id: serial("id").primaryKey(),
  technicianId: text("technician_id").notNull(),
  technicianName: text("technician_name").notNull(),
  useCaseId: text("use_case_id").notNull(),
  useCaseTitle: text("use_case_title").notNull(),
  category: text("category").notNull(),
  triggerType: text("trigger_type").notNull(), // 'inbound' or 'outbound'
  successRate: decimal("success_rate", { precision: 5, scale: 2 }).notNull(),
  responseTime: decimal("response_time", { precision: 8, scale: 3 }).notNull(),
  location: text("location"),
  planningArea: text("planning_area"),
  jobCode: text("job_code"),
  contextData: jsonb("context_data").default('{}'), // Additional context about the usage
  timestamp: timestamp("timestamp").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Technician Retention & Performance Tracking
export const technicians = pgTable("technicians", {
  id: serial("id").primaryKey(),
  employeeId: text("employee_id").notNull().unique(),
  name: text("name").notNull(),
  planningArea: text("planning_area").notNull(),
  employmentType: text("employment_type").notNull(), // W2, 1099
  hireDate: date("hire_date").notNull(),
  skills: jsonb("skills").notNull().default('[]'), // Array of certified skills
  crossTrainingLevel: text("cross_training_level").notNull(), // Basic, Advanced, Expert
  hourlyCertifications: jsonb("hourly_certifications").notNull().default('{}'), // Certification levels and rates
  baseHourlyRate: decimal("base_hourly_rate", { precision: 8, scale: 2 }).notNull(),
  currentWeeklyHours: decimal("current_weekly_hours", { precision: 5, scale: 2 }).default('0'),
  targetWeeklyHours: decimal("target_weekly_hours", { precision: 5, scale: 2 }).notNull().default('40'),
  minimumWeeklyHours: decimal("minimum_weekly_hours", { precision: 5, scale: 2 }).notNull().default('30'),
  preferredSchedule: jsonb("preferred_schedule").notNull().default('{}'), // Schedule preferences
  satisfactionScore: decimal("satisfaction_score", { precision: 5, scale: 2 }).default('75'),
  retentionRisk: text("retention_risk").notNull().default('low'), // low, medium, high, critical
  lastSatisfactionSurvey: date("last_satisfaction_survey"),
  status: text("status").notNull().default('active'), // active, on_leave, terminated
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const technicianPerformanceMetrics = pgTable("technician_performance_metrics", {
  id: serial("id").primaryKey(),
  technicianId: integer("technician_id").references(() => technicians.id).notNull(),
  date: date("date").notNull(),
  hoursWorked: decimal("hours_worked", { precision: 5, scale: 2 }).notNull(),
  ordersCompleted: integer("orders_completed").notNull(),
  revenueGenerated: decimal("revenue_generated", { precision: 10, scale: 2 }).notNull(),
  customerSatisfactionAvg: decimal("customer_satisfaction_avg", { precision: 5, scale: 2 }),
  travelTimeHours: decimal("travel_time_hours", { precision: 5, scale: 2 }),
  skillsUtilized: jsonb("skills_utilized").notNull().default('[]'), // Which skills were used
  routeEfficiency: decimal("route_efficiency", { precision: 5, scale: 2 }),
  firstTimeCompletion: boolean("first_time_completion").default(true),
  planningArea: text("planning_area").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const technicianRetentionAlerts = pgTable("technician_retention_alerts", {
  id: serial("id").primaryKey(),
  technicianId: integer("technician_id").references(() => technicians.id).notNull(),
  alertType: text("alert_type").notNull(), // hours_shortage, pay_below_threshold, skill_underutilization, satisfaction_decline
  severity: text("severity").notNull(), // low, medium, high, critical
  description: text("description").notNull(),
  currentValue: decimal("current_value", { precision: 10, scale: 2 }),
  thresholdValue: decimal("threshold_value", { precision: 10, scale: 2 }),
  suggestedActions: jsonb("suggested_actions").notNull().default('[]'),
  assignedAgent: text("assigned_agent"), // Which AI agent is handling this
  status: text("status").notNull().default('active'), // active, in_progress, resolved
  revenueImpact: decimal("revenue_impact", { precision: 10, scale: 2 }),
  resolutionDeadline: timestamp("resolution_deadline"),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

export const technicianRetentionPrograms = pgTable("technician_retention_programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  programType: text("program_type").notNull(), // hours_guarantee, skills_development, pay_adjustment, schedule_flexibility
  targetCriteria: jsonb("target_criteria").notNull(), // Who qualifies for this program
  benefits: jsonb("benefits").notNull(), // What benefits are provided
  costPerTechnician: decimal("cost_per_technician", { precision: 10, scale: 2 }),
  expectedROI: decimal("expected_roi", { precision: 5, scale: 2 }),
  status: text("status").notNull().default('active'), // active, paused, ended
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  participantCount: integer("participant_count").default(0),
  successMetrics: jsonb("success_metrics").notNull().default('{}'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const technicianCommunications = pgTable("technician_communications", {
  id: serial("id").primaryKey(),
  technicianId: integer("technician_id").references(() => technicians.id).notNull(),
  communicationType: text("communication_type").notNull(), // satisfaction_check, hours_discussion, skills_development, retention_intervention
  channel: text("channel").notNull(), // email, sms, phone, in_person, app_notification
  message: text("message").notNull(),
  aiAgentSender: text("ai_agent_sender"), // Which AI agent sent this
  response: text("response"), // Technician's response if applicable
  sentiment: text("sentiment"), // positive, neutral, negative
  followUpRequired: boolean("follow_up_required").default(false),
  followUpDate: date("follow_up_date"),
  status: text("status").notNull().default('sent'), // sent, delivered, read, responded
  createdAt: timestamp("created_at").defaultNow(),
});

// Market Pod Agents (3 per pod: Demand Forecaster, Roster & Routing, Community CX)
export const marketPodAgents = pgTable("market_pod_agents", {
  id: serial("id").primaryKey(),
  podId: integer("pod_id").references(() => marketPods.id).notNull(),
  agentType: text("agent_type").notNull(), // local_demand_forecaster, roster_routing, community_cx
  name: text("name").notNull(),
  specialization: jsonb("specialization").notNull(), // Local intelligence data
  dailyDecisions: integer("daily_decisions").notNull().default(0),
  localOptimizations: jsonb("local_optimizations"), // Recent optimization actions
  performance: decimal("performance", { precision: 5, scale: 2 }).notNull().default('0.00'),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Planning Area Performance Tables (430 planning areas)
export const planningAreas = pgTable("planning_areas", {
  id: serial("id").primaryKey(),
  podId: integer("pod_id").references(() => marketPods.id),
  areaCode: text("area_code").notNull().unique(), // e.g., "PA001", "PA002"
  name: text("name").notNull(), // e.g., "North Dallas", "West Houston"
  region: text("region").notNull(), // e.g., "TX-North", "FL-South"
  geography: jsonb("geography").notNull(), // Lat/lng boundaries, zip codes
  population: integer("population"),
  marketType: text("market_type").notNull(), // urban, suburban, rural
  primaryServices: jsonb("primary_services").notNull(), // Array of primary service types
  ceoAgentId: integer("ceo_agent_id"), // Planning Area CEO Agent
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const planningAreaMetrics = pgTable("planning_area_metrics", {
  id: serial("id").primaryKey(),
  areaId: integer("area_id").references(() => planningAreas.id).notNull(),
  metricDate: date("metric_date").notNull(),
  timeframe: text("timeframe").notNull(), // daily, weekly, monthly, quarterly
  
  // Supply Metrics
  availableTechnicians: integer("available_technicians").notNull(),
  technicianSkillScore: decimal("technician_skill_score", { precision: 5, scale: 2 }).notNull(),
  technicianUtilization: decimal("technician_utilization", { precision: 5, scale: 2 }).notNull(),
  partsAvailability: decimal("parts_availability", { precision: 5, scale: 2 }).notNull(),
  partsStockValue: decimal("parts_stock_value", { precision: 12, scale: 2 }).notNull(),
  
  // Demand Metrics
  d2cCalls: integer("d2c_calls").notNull(), // Direct-to-consumer
  b2bCalls: integer("b2b_calls").notNull(), // Business-to-business
  emergencyCalls: integer("emergency_calls").notNull(),
  maintenanceCalls: integer("maintenance_calls").notNull(),
  installationCalls: integer("installation_calls").notNull(),
  
  // Performance Metrics
  responseTime: decimal("response_time", { precision: 8, scale: 3 }).notNull(), // hours
  completionRate: decimal("completion_rate", { precision: 5, scale: 2 }).notNull(),
  customerSatisfaction: decimal("customer_satisfaction", { precision: 3, scale: 2 }).notNull(),
  firstCallResolution: decimal("first_call_resolution", { precision: 5, scale: 2 }).notNull(),
  
  // Financial Metrics
  revenue: decimal("revenue", { precision: 12, scale: 2 }).notNull(),
  costs: decimal("costs", { precision: 12, scale: 2 }).notNull(),
  profit: decimal("profit", { precision: 12, scale: 2 }).notNull(),
  marginPercent: decimal("margin_percent", { precision: 5, scale: 2 }).notNull(),
  avgTicketValue: decimal("avg_ticket_value", { precision: 8, scale: 2 }).notNull(),
  
  // Key Variables Analysis
  demandDrivers: jsonb("demand_drivers"), // Key variables driving demand
  supplyConstraints: jsonb("supply_constraints"), // Main supply limiting factors
  performanceFactors: jsonb("performance_factors"), // Variables affecting performance
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const planningAreaAnalysis = pgTable("planning_area_analysis", {
  id: serial("id").primaryKey(),
  areaId: integer("area_id").references(() => planningAreas.id).notNull(),
  analysisDate: date("analysis_date").notNull(),
  timeframe: text("timeframe").notNull(), // weekly, monthly, quarterly
  
  // Key Variables Identification
  topPerformanceDrivers: jsonb("top_performance_drivers").notNull(), // Top 5 variables driving performance
  supplyOptimizations: jsonb("supply_optimizations").notNull(), // Technician & parts optimization opportunities
  demandPredictions: jsonb("demand_predictions").notNull(), // Demand forecasting by call type
  
  // Benchmarking
  benchmarkRank: integer("benchmark_rank"), // Rank among all 430 areas
  topQuartileMetrics: jsonb("top_quartile_metrics"), // Metrics in top 25%
  improvementOpportunities: jsonb("improvement_opportunities"), // Bottom quartile metrics
  
  // Recommendations
  actionItems: jsonb("action_items").notNull(), // Specific actions to improve performance
  resourceNeeds: jsonb("resource_needs"), // Additional resources needed
  expectedImpact: jsonb("expected_impact"), // Projected performance improvement
  
  createdAt: timestamp("created_at").defaultNow(),
});

// New tables for dynamic evaluation and improvement system
export const evaluationTemplates = pgTable("evaluation_templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  maturityLevel: text("maturity_level").notNull(), // novice, intermediate, advanced, expert
  agentType: text("agent_type").notNull(),
  criteria: jsonb("criteria").notNull(), // Array of evaluation criteria
  weightings: jsonb("weightings").notNull(), // Criteria weightings
  thresholds: jsonb("thresholds").notNull(), // Pass/fail thresholds
  isActive: text("is_active").notNull().default("true"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const agentMaturity = pgTable("agent_maturity", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  currentLevel: text("current_level").notNull().default("novice"), // novice, intermediate, advanced, expert
  experiencePoints: integer("experience_points").notNull().default(0),
  totalEvaluations: integer("total_evaluations").notNull().default(0),
  avgScore: decimal("avg_score", { precision: 5, scale: 2 }).notNull().default("0"),
  lastLevelUp: timestamp("last_level_up"),
  strengths: jsonb("strengths"), // Array of strength areas
  weaknesses: jsonb("weaknesses"), // Array of improvement areas
  improvementHistory: jsonb("improvement_history"), // Track improvements over time
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const dynamicEvaluations = pgTable("dynamic_evaluations", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  templateId: integer("template_id").references(() => evaluationTemplates.id).notNull(),
  overallScore: decimal("overall_score", { precision: 5, scale: 2 }).notNull(),
  criteriaScores: jsonb("criteria_scores").notNull(), // Individual criteria scores
  feedback: text("feedback"),
  recommendations: jsonb("recommendations"), // Auto-generated improvement suggestions
  evaluatorType: text("evaluator_type").notNull(), // human, automated, peer
  evaluatorId: text("evaluator_id"),
  completedAt: timestamp("completed_at").defaultNow(),
  nextEvaluationDue: timestamp("next_evaluation_due"),
});

export const agentDataFeedback = pgTable("agent_data_feedback", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  dataType: text("data_type").notNull(), // interaction, output, error, performance
  originalData: jsonb("original_data").notNull(),
  processedData: jsonb("processed_data"),
  insights: jsonb("insights"), // Extracted insights
  actionItems: jsonb("action_items"), // Specific improvements to implement
  impactScore: decimal("impact_score", { precision: 5, scale: 2 }), // Expected improvement impact
  status: text("status").notNull().default("pending"), // pending, processing, applied, archived
  appliedAt: timestamp("applied_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const improvementActions = pgTable("improvement_actions", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  actionType: text("action_type").notNull(), // training, parameter_tuning, prompt_optimization, data_augmentation
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull().default("medium"), // low, medium, high, critical
  estimatedImpact: decimal("estimated_impact", { precision: 5, scale: 2 }),
  implementationSteps: jsonb("implementation_steps").notNull(),
  requiredResources: jsonb("required_resources"),
  status: text("status").notNull().default("planned"), // planned, in_progress, completed, cancelled
  assignedTo: text("assigned_to"),
  createdAt: timestamp("created_at").defaultNow(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  results: jsonb("results"), // Actual impact and metrics after implementation
});

export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEvaluationSchema = createInsertSchema(evaluations).omit({
  id: true,
  completedAt: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  createdAt: true,
});

export const insertPerformanceMetricSchema = createInsertSchema(performanceMetrics).omit({
  id: true,
});

// Magik Button Template System Schemas
export const insertMagikButtonTemplateSchema = createInsertSchema(magikButtonTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTechnicianCapabilityRequestSchema = createInsertSchema(technicianCapabilityRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMagikButtonUsageTrackingSchema = createInsertSchema(magikButtonUsageTracking).omit({
  id: true,
  executionTime: true,
});

export const insertEvaluationTemplateSchema = createInsertSchema(evaluationTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAgentMaturitySchema = createInsertSchema(agentMaturity).omit({
  id: true,
  updatedAt: true,
});

export const insertDynamicEvaluationSchema = createInsertSchema(dynamicEvaluations).omit({
  id: true,
  completedAt: true,
});

export const insertAgentDataFeedbackSchema = createInsertSchema(agentDataFeedback).omit({
  id: true,
  createdAt: true,
});

export const insertImprovementActionSchema = createInsertSchema(improvementActions).omit({
  id: true,
  createdAt: true,
});

// Parts Order Schema
export const insertPartsOrderSchema = createInsertSchema(partsOrders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPartsDeliveryPerformanceSchema = createInsertSchema(partsDeliveryPerformance).omit({
  id: true,
  lastUpdated: true,
});

// AHS Area Manager Schemas
export const insertAhsAreaManagerSchema = createInsertSchema(ahsAreaManagers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAhsGpeMetricSchema = createInsertSchema(ahsGpeMetrics).omit({
  id: true,
  createdAt: true,
});

export const insertAhsCustomerRatingSchema = createInsertSchema(ahsCustomerRatings).omit({
  id: true,
  createdAt: true,
});

export const insertAhsWeeklyReportSchema = createInsertSchema(ahsWeeklyReports).omit({
  id: true,
  createdAt: true,
});

export const insertAhsAreaManagerInteractionSchema = createInsertSchema(ahsAreaManagerInteractions).omit({
  id: true,
  createdAt: true,
});

// Permission System Tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("viewer"), // admin, executive, manager, operator, viewer
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userPermissions = pgTable("user_permissions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  permissionId: text("permission_id").notNull(), // Reference to PERMISSIONS constant
  grantedAt: timestamp("granted_at").defaultNow(),
  grantedBy: integer("granted_by").references(() => users.id),
});

export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  sessionToken: text("session_token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  permissions: many(userPermissions),
  sessions: many(userSessions),
}));

export const userPermissionsRelations = relations(userPermissions, ({ one }) => ({
  user: one(users, {
    fields: [userPermissions.userId],
    references: [users.id],
  }),
  grantedByUser: one(users, {
    fields: [userPermissions.grantedBy],
    references: [users.id],
  }),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));

export type Agent = typeof agents.$inferSelect;
export type User = typeof users.$inferSelect;
export type UserPermission = typeof userPermissions.$inferSelect;
export type UserSession = typeof userSessions.$inferSelect;

// Zod schemas
export const insertUserSchema = createInsertSchema(users);
export const insertUserPermissionSchema = createInsertSchema(userPermissions);
export const insertUserSessionSchema = createInsertSchema(userSessions);

export type InsertUser = z.infer<typeof insertUserSchema> & { permissions?: string[] };
export type InsertUserPermission = z.infer<typeof insertUserPermissionSchema>;
export type InsertUserSession = z.infer<typeof insertUserSessionSchema>;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Evaluation = typeof evaluations.$inferSelect;
export type InsertEvaluation = z.infer<typeof insertEvaluationSchema>;
export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type PerformanceMetric = typeof performanceMetrics.$inferSelect;
export type InsertPerformanceMetric = z.infer<typeof insertPerformanceMetricSchema>;

// New types for dynamic evaluation system
export type EvaluationTemplate = typeof evaluationTemplates.$inferSelect;
export type InsertEvaluationTemplate = z.infer<typeof insertEvaluationTemplateSchema>;
export type AgentMaturity = typeof agentMaturity.$inferSelect;
export type InsertAgentMaturity = z.infer<typeof insertAgentMaturitySchema>;
export type DynamicEvaluation = typeof dynamicEvaluations.$inferSelect;
export type InsertDynamicEvaluation = z.infer<typeof insertDynamicEvaluationSchema>;
export type AgentDataFeedback = typeof agentDataFeedback.$inferSelect;
export type InsertAgentDataFeedback = z.infer<typeof insertAgentDataFeedbackSchema>;
export type ImprovementAction = typeof improvementActions.$inferSelect;
export type InsertImprovementAction = z.infer<typeof insertImprovementActionSchema>;

// AHS Area Manager Types
export type AhsAreaManager = typeof ahsAreaManagers.$inferSelect;
export type InsertAhsAreaManager = z.infer<typeof insertAhsAreaManagerSchema>;
export type AhsGpeMetric = typeof ahsGpeMetrics.$inferSelect;
export type InsertAhsGpeMetric = z.infer<typeof insertAhsGpeMetricSchema>;
export type AhsCustomerRating = typeof ahsCustomerRatings.$inferSelect;
export type InsertAhsCustomerRating = z.infer<typeof insertAhsCustomerRatingSchema>;
export type AhsWeeklyReport = typeof ahsWeeklyReports.$inferSelect;
export type InsertAhsWeeklyReport = z.infer<typeof insertAhsWeeklyReportSchema>;
export type AhsAreaManagerInteraction = typeof ahsAreaManagerInteractions.$inferSelect;
export type InsertAhsAreaManagerInteraction = z.infer<typeof insertAhsAreaManagerInteractionSchema>;

// Magik Button Template System Types
export type MagikButtonTemplate = typeof magikButtonTemplates.$inferSelect;
export type InsertMagikButtonTemplate = z.infer<typeof insertMagikButtonTemplateSchema>;
export type TechnicianCapabilityRequest = typeof technicianCapabilityRequests.$inferSelect;
export type InsertTechnicianCapabilityRequest = z.infer<typeof insertTechnicianCapabilityRequestSchema>;
export type MagikButtonUsageTracking = typeof magikButtonUsageTracking.$inferSelect;
export type InsertMagikButtonUsageTracking = z.infer<typeof insertMagikButtonUsageTrackingSchema>;

// Parts Order Types
export type PartsOrder = typeof partsOrders.$inferSelect;
export type InsertPartsOrder = z.infer<typeof insertPartsOrderSchema>;
export type PartsDeliveryPerformance = typeof partsDeliveryPerformance.$inferSelect;
export type InsertPartsDeliveryPerformance = z.infer<typeof insertPartsDeliveryPerformanceSchema>;

// Home Services Business Tables

// Service Requests - Track customer service requests and job assignments
export const serviceRequestsTable = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  customerId: text("customer_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone"),
  customerEmail: text("customer_email"),
  serviceType: text("service_type").notNull(), // 'plumbing', 'electrical', 'hvac', 'cleaning', 'landscaping'
  description: text("description").notNull(),
  priority: text("priority").notNull().default('medium'), // 'low', 'medium', 'high', 'emergency'
  status: text("status").notNull().default('pending'), // 'pending', 'scheduled', 'in_progress', 'completed', 'cancelled'
  assignedAgentId: integer("assigned_agent_id").references(() => agents.id),
  scheduledDate: timestamp("scheduled_date"),
  estimatedDuration: integer("estimated_duration"), // in minutes
  address: text("address").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  estimatedCost: decimal("estimated_cost", { precision: 10, scale: 2 }),
  actualCost: decimal("actual_cost", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  customerRating: integer("customer_rating"), // 1-5 stars
  customerFeedback: text("customer_feedback"),
  notes: text("notes").array()
});

// Technician Schedules - Track field technician availability and assignments
export const technicianSchedulesTable = pgTable("technician_schedules", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id),
  date: date("date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  status: text("status").notNull().default('available'), // 'available', 'busy', 'break', 'travel', 'off'
  location: text("location"),
  serviceRequestId: integer("service_request_id").references(() => serviceRequestsTable.id),
  notes: text("notes")
});

// Inventory Management - Track tools, parts, and supplies
export const inventoryTable = pgTable("inventory", {
  id: serial("id").primaryKey(),
  itemName: text("item_name").notNull(),
  category: text("category").notNull(), // 'tools', 'parts', 'supplies', 'materials'
  sku: text("sku"),
  currentStock: integer("current_stock").notNull().default(0),
  minStockLevel: integer("min_stock_level").notNull().default(5),
  maxStockLevel: integer("max_stock_level").notNull().default(100),
  unitCost: decimal("unit_cost", { precision: 10, scale: 2 }),
  supplier: text("supplier"),
  lastRestocked: timestamp("last_restocked"),
  location: text("location"), // warehouse, truck, etc.
  assignedAgentId: integer("assigned_agent_id").references(() => agents.id)
});

// Customer Communications - Track all customer interactions
export const customerCommunicationsTable = pgTable("customer_communications", {
  id: serial("id").primaryKey(),
  serviceRequestId: integer("service_request_id").references(() => serviceRequestsTable.id),
  agentId: integer("agent_id").references(() => agents.id),
  communicationType: text("communication_type").notNull(), // 'call', 'sms', 'email', 'chat', 'in_person'
  direction: text("direction").notNull(), // 'inbound', 'outbound'
  content: text("content").notNull(),
  sentiment: text("sentiment"), // 'positive', 'neutral', 'negative'
  resolved: boolean("resolved").default(false),
  followUpRequired: boolean("follow_up_required").default(false),
  followUpDate: timestamp("follow_up_date"),
  createdAt: timestamp("created_at").defaultNow()
});

// Route Optimization - Track optimized routes for field technicians
export const routeOptimizationTable = pgTable("route_optimization", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id),
  date: date("date").notNull(),
  optimizedRoute: text("optimized_route").array(), // Array of service request IDs in order
  totalDistance: decimal("total_distance", { precision: 8, scale: 2 }), // in miles
  estimatedTravelTime: integer("estimated_travel_time"), // in minutes
  fuelCost: decimal("fuel_cost", { precision: 8, scale: 2 }),
  actualStartTime: timestamp("actual_start_time"),
  actualEndTime: timestamp("actual_end_time"),
  status: text("status").notNull().default('planned'), // 'planned', 'active', 'completed'
  createdAt: timestamp("created_at").defaultNow()
});

// Create Zod schemas and types for home services features
export const insertServiceRequestSchema = createInsertSchema(serviceRequestsTable).omit({
  id: true,
  createdAt: true,
});

export const insertTechnicianScheduleSchema = createInsertSchema(technicianSchedulesTable).omit({
  id: true,
});

export const insertInventorySchema = createInsertSchema(inventoryTable).omit({
  id: true,
});

export const insertCustomerCommunicationSchema = createInsertSchema(customerCommunicationsTable).omit({
  id: true,
  createdAt: true,
});

export const insertRouteOptimizationSchema = createInsertSchema(routeOptimizationTable).omit({
  id: true,
  createdAt: true,
});

// Home Services Types
export type ServiceRequest = typeof serviceRequestsTable.$inferSelect;
export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
export type TechnicianSchedule = typeof technicianSchedulesTable.$inferSelect;
export type InsertTechnicianSchedule = z.infer<typeof insertTechnicianScheduleSchema>;
export type Inventory = typeof inventoryTable.$inferSelect;
export type InsertInventory = z.infer<typeof insertInventorySchema>;
export type CustomerCommunication = typeof customerCommunicationsTable.$inferSelect;
export type InsertCustomerCommunication = z.infer<typeof insertCustomerCommunicationSchema>;
export type RouteOptimization = typeof routeOptimizationTable.$inferSelect;
export type InsertRouteOptimization = z.infer<typeof insertRouteOptimizationSchema>;

// Export business knowledge schemas
export * from "./schema-business-knowledge";

// Types for planning areas and metrics
export const insertPlanningAreaSchema = createInsertSchema(planningAreas);
export type InsertPlanningArea = z.infer<typeof insertPlanningAreaSchema>;
export type PlanningArea = typeof planningAreas.$inferSelect;

export const insertPlanningAreaMetricSchema = createInsertSchema(planningAreaMetrics);
export type InsertPlanningAreaMetric = z.infer<typeof insertPlanningAreaMetricSchema>;
export type PlanningAreaMetric = typeof planningAreaMetrics.$inferSelect;

export const insertPlanningAreaAnalysisSchema = createInsertSchema(planningAreaAnalysis);
export type InsertPlanningAreaAnalysis = z.infer<typeof insertPlanningAreaAnalysisSchema>;
export type PlanningAreaAnalysis = typeof planningAreaAnalysis.$inferSelect;

// Agent Daily Performance and Self-Evaluation Tables

// Daily performance goals and targets for each agent
export const agentDailyGoals = pgTable("agent_daily_goals", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  date: date("date").notNull(),
  goalType: text("goal_type").notNull(), // tasks_completed, accuracy_target, response_time, customer_satisfaction
  targetValue: decimal("target_value", { precision: 10, scale: 2 }).notNull(),
  priority: text("priority").notNull().default("medium"), // low, medium, high, critical
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Intra-day performance tracking (hourly snapshots)
export const agentHourlyPerformance = pgTable("agent_hourly_performance", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  timestamp: timestamp("timestamp").notNull(),
  hour: integer("hour").notNull(), // 0-23
  tasksCompleted: integer("tasks_completed").notNull().default(0),
  successRate: decimal("success_rate", { precision: 5, scale: 2 }).notNull().default("0"),
  avgResponseTime: decimal("avg_response_time", { precision: 8, scale: 2 }).notNull().default("0"), // in seconds
  errorsEncountered: integer("errors_encountered").notNull().default(0),
  customerInteractions: integer("customer_interactions").notNull().default(0),
  satisfactionScore: decimal("satisfaction_score", { precision: 3, scale: 2 }).notNull().default("0"),
  progressTowardsGoals: jsonb("progress_towards_goals").notNull(), // goal_id -> current_progress mapping
  notes: text("notes"),
});

// Daily performance summary and self-evaluation
export const agentDailyPerformance = pgTable("agent_daily_performance", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  date: date("date").notNull(),
  totalTasks: integer("total_tasks").notNull().default(0),
  completedTasks: integer("completed_tasks").notNull().default(0),
  failedTasks: integer("failed_tasks").notNull().default(0),
  overallSuccessRate: decimal("overall_success_rate", { precision: 5, scale: 2 }).notNull().default("0"),
  avgResponseTime: decimal("avg_response_time", { precision: 8, scale: 2 }).notNull().default("0"),
  peakPerformanceHour: integer("peak_performance_hour"), // 0-23, hour with best performance
  lowestPerformanceHour: integer("lowest_performance_hour"), // 0-23, hour with worst performance
  goalsAchieved: integer("goals_achieved").notNull().default(0),
  goalsFailed: integer("goals_failed").notNull().default(0),
  overallScore: decimal("overall_score", { precision: 5, scale: 2 }).notNull().default("0"), // 0-100
  selfEvaluationSummary: text("self_evaluation_summary").notNull(),
  improvementAreas: jsonb("improvement_areas").notNull(), // identified areas for improvement
  achievements: jsonb("achievements").notNull(), // notable successes and milestones
  nextDayGoals: jsonb("next_day_goals"), // auto-generated goals for next day
  createdAt: timestamp("created_at").defaultNow(),
});

// Self-evaluation logs - agent's own assessment of performance
export const agentSelfEvaluations = pgTable("agent_self_evaluations", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  timestamp: timestamp("timestamp").notNull(),
  evaluationType: text("evaluation_type").notNull(), // hourly, task_completion, goal_check, daily_summary
  context: text("context").notNull(), // what triggered this evaluation
  currentState: jsonb("current_state").notNull(), // agent's current performance metrics
  goalProgress: jsonb("goal_progress").notNull(), // progress towards each goal
  selfAssessment: text("self_assessment").notNull(), // agent's narrative self-evaluation
  confidenceLevel: decimal("confidence_level", { precision: 3, scale: 2 }).notNull(), // 0-1, agent's confidence in its assessment
  identifiedIssues: jsonb("identified_issues"), // problems the agent has identified
  plannedActions: jsonb("planned_actions"), // actions the agent plans to take
  learningInsights: text("learning_insights"), // what the agent has learned
  moodScore: decimal("mood_score", { precision: 3, scale: 2 }), // 0-1, agent's "mood" or confidence
});

// Goal achievement tracking
export const goalAchievements = pgTable("goal_achievements", {
  id: serial("id").primaryKey(),
  goalId: integer("goal_id").references(() => agentDailyGoals.id).notNull(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  achievedAt: timestamp("achieved_at"),
  finalValue: decimal("final_value", { precision: 10, scale: 2 }).notNull(),
  achievementRate: decimal("achievement_rate", { precision: 5, scale: 2 }).notNull(), // percentage of goal achieved
  status: text("status").notNull(), // achieved, failed, partial, exceeded
  notes: text("notes"),
  impactOnNextGoals: text("impact_on_next_goals"), // how this affects future goal setting
});

// Agent performance trends and patterns
export const agentPerformanceTrends = pgTable("agent_performance_trends", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  weekStartDate: date("week_start_date").notNull(),
  trendType: text("trend_type").notNull(), // improving, declining, stable, volatile
  metric: text("metric").notNull(), // accuracy, response_time, task_completion, etc.
  trendStrength: decimal("trend_strength", { precision: 3, scale: 2 }).notNull(), // -1 to 1
  weeklyAverage: decimal("weekly_average", { precision: 10, scale: 2 }).notNull(),
  weeklyVariance: decimal("weekly_variance", { precision: 10, scale: 2 }).notNull(),
  predictedNextWeek: decimal("predicted_next_week", { precision: 10, scale: 2 }),
  recommendations: jsonb("recommendations").notNull(), // automated recommendations for improvement
  createdAt: timestamp("created_at").defaultNow(),
});

// Types for daily and intra-day performance tracking
export const insertAgentDailyGoalSchema = createInsertSchema(agentDailyGoals);
export type InsertAgentDailyGoal = z.infer<typeof insertAgentDailyGoalSchema>;
export type AgentDailyGoal = typeof agentDailyGoals.$inferSelect;

export const insertAgentHourlyPerformanceSchema = createInsertSchema(agentHourlyPerformance);
export type InsertAgentHourlyPerformance = z.infer<typeof insertAgentHourlyPerformanceSchema>;
export type AgentHourlyPerformance = typeof agentHourlyPerformance.$inferSelect;

export const insertAgentDailyPerformanceSchema = createInsertSchema(agentDailyPerformance);
export type InsertAgentDailyPerformance = z.infer<typeof insertAgentDailyPerformanceSchema>;
export type AgentDailyPerformance = typeof agentDailyPerformance.$inferSelect;

export const insertAgentSelfEvaluationSchema = createInsertSchema(agentSelfEvaluations);
export type InsertAgentSelfEvaluation = z.infer<typeof insertAgentSelfEvaluationSchema>;
export type AgentSelfEvaluation = typeof agentSelfEvaluations.$inferSelect;

export const insertGoalAchievementSchema = createInsertSchema(goalAchievements);
export type InsertGoalAchievement = z.infer<typeof insertGoalAchievementSchema>;
export type GoalAchievement = typeof goalAchievements.$inferSelect;

export const insertAgentPerformanceTrendSchema = createInsertSchema(agentPerformanceTrends);
export type InsertAgentPerformanceTrend = z.infer<typeof insertAgentPerformanceTrendSchema>;
export type AgentPerformanceTrend = typeof agentPerformanceTrends.$inferSelect;

// Performance Alert System
export const performanceAlerts = pgTable("performance_alerts", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id),
  alertName: text("alert_name").notNull(),
  metricType: text("metric_type").notNull(), // performance, response_time, accuracy, customer_satisfaction, etc.
  condition: text("condition").notNull(), // below, above, equals, change_percentage
  threshold: decimal("threshold", { precision: 10, scale: 2 }).notNull(),
  severity: text("severity").notNull().default("medium"), // low, medium, high, critical
  isActive: boolean("is_active").notNull().default(true),
  notificationChannels: jsonb("notification_channels").notNull().default('[]'), // email, sms, dashboard, webhook
  lastTriggered: timestamp("last_triggered"),
  triggerCount: integer("trigger_count").notNull().default(0),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const alertTriggers = pgTable("alert_triggers", {
  id: serial("id").primaryKey(),
  alertId: integer("alert_id").references(() => performanceAlerts.id).notNull(),
  agentId: integer("agent_id").references(() => agents.id).notNull(),
  triggeredAt: timestamp("triggered_at").defaultNow(),
  metricValue: decimal("metric_value", { precision: 10, scale: 2 }).notNull(),
  threshold: decimal("threshold", { precision: 10, scale: 2 }).notNull(),
  severity: text("severity").notNull(),
  status: text("status").notNull().default("active"), // active, acknowledged, resolved
  acknowledgedBy: text("acknowledged_by"),
  acknowledgedAt: timestamp("acknowledged_at"),
  resolvedAt: timestamp("resolved_at"),
  notes: text("notes"),
});

export const alertNotifications = pgTable("alert_notifications", {
  id: serial("id").primaryKey(),
  triggerId: integer("trigger_id").references(() => alertTriggers.id).notNull(),
  channel: text("channel").notNull(), // email, sms, dashboard, webhook
  recipient: text("recipient").notNull(),
  status: text("status").notNull().default("pending"), // pending, sent, failed
  sentAt: timestamp("sent_at"),
  errorMessage: text("error_message"),
  retryCount: integer("retry_count").notNull().default(0),
});

// Alert System Types and Schemas
export const insertPerformanceAlertSchema = createInsertSchema(performanceAlerts);
export type InsertPerformanceAlert = z.infer<typeof insertPerformanceAlertSchema>;
export type PerformanceAlert = typeof performanceAlerts.$inferSelect;

export const insertAlertTriggerSchema = createInsertSchema(alertTriggers);
export type InsertAlertTrigger = z.infer<typeof insertAlertTriggerSchema>;
export type AlertTrigger = typeof alertTriggers.$inferSelect;

export const insertAlertNotificationSchema = createInsertSchema(alertNotifications);
export type InsertAlertNotification = z.infer<typeof insertAlertNotificationSchema>;
export type AlertNotification = typeof alertNotifications.$inferSelect;

// Technician Retention Types
export const insertTechnicianSchema = createInsertSchema(technicians).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertTechnicianPerformanceMetricsSchema = createInsertSchema(technicianPerformanceMetrics).omit({
  id: true,
  createdAt: true,
});
export const insertTechnicianRetentionAlertsSchema = createInsertSchema(technicianRetentionAlerts).omit({
  id: true,
  createdAt: true,
});
export const insertTechnicianRetentionProgramsSchema = createInsertSchema(technicianRetentionPrograms).omit({
  id: true,
  createdAt: true,
});
export const insertTechnicianCommunicationsSchema = createInsertSchema(technicianCommunications).omit({
  id: true,
  createdAt: true,
});

export type Technician = typeof technicians.$inferSelect;
export type InsertTechnician = z.infer<typeof insertTechnicianSchema>;
export type TechnicianPerformanceMetrics = typeof technicianPerformanceMetrics.$inferSelect;
export type InsertTechnicianPerformanceMetrics = z.infer<typeof insertTechnicianPerformanceMetricsSchema>;
export type TechnicianRetentionAlert = typeof technicianRetentionAlerts.$inferSelect;
export type InsertTechnicianRetentionAlert = z.infer<typeof insertTechnicianRetentionAlertsSchema>;
export type TechnicianRetentionProgram = typeof technicianRetentionPrograms.$inferSelect;
export type InsertTechnicianRetentionProgram = z.infer<typeof insertTechnicianRetentionProgramsSchema>;
export type TechnicianCommunication = typeof technicianCommunications.$inferSelect;
export type InsertTechnicianCommunication = z.infer<typeof insertTechnicianCommunicationsSchema>;

// HOA Prospect Management Types and Schemas
export const insertHOAProspectSchema = createInsertSchema(hoaProspects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHOAProspectStrategySchema = createInsertSchema(hoaProspectStrategies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHOAProspectActivitySchema = createInsertSchema(hoaProspectActivities).omit({
  id: true,
  createdAt: true,
});

export type HOAProspect = typeof hoaProspects.$inferSelect;
export type InsertHOAProspect = z.infer<typeof insertHOAProspectSchema>;
export type HOAProspectStrategy = typeof hoaProspectStrategies.$inferSelect;
export type InsertHOAProspectStrategy = z.infer<typeof insertHOAProspectStrategySchema>;
export type HOAProspectActivity = typeof hoaProspectActivities.$inferSelect;
export type InsertHOAProspectActivity = z.infer<typeof insertHOAProspectActivitySchema>;

// 1099 Contractor Recruitment Schema and Types
export const insertContractorRecruitmentSchema = createInsertSchema(contractorRecruitment).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertContractorRecruitment = z.infer<typeof insertContractorRecruitmentSchema>;
export type ContractorRecruitment = typeof contractorRecruitment.$inferSelect;

export const insertRecruitmentActivitySchema = createInsertSchema(recruitmentActivities).omit({
  id: true,
  createdAt: true,
});

export type InsertRecruitmentActivity = z.infer<typeof insertRecruitmentActivitySchema>;
export type RecruitmentActivity = typeof recruitmentActivities.$inferSelect;

export const insertRecruitmentTargetSchema = createInsertSchema(recruitmentTargets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastUpdated: true,
});

export type InsertRecruitmentTarget = z.infer<typeof insertRecruitmentTargetSchema>;
export type RecruitmentTarget = typeof recruitmentTargets.$inferSelect;

export const insertFirmTechnicianSchema = createInsertSchema(firmTechnicians).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertFirmTechnician = z.infer<typeof insertFirmTechnicianSchema>;
export type FirmTechnician = typeof firmTechnicians.$inferSelect;

// Business Function Leaders schemas
export const insertBusinessFunctionLeaderSchema = createInsertSchema(businessFunctionLeaders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBusinessFunctionTaskSchema = createInsertSchema(businessFunctionTasks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBusinessFunctionLeader = z.infer<typeof insertBusinessFunctionLeaderSchema>;
export type BusinessFunctionLeader = typeof businessFunctionLeaders.$inferSelect;
export type InsertBusinessFunctionTask = z.infer<typeof insertBusinessFunctionTaskSchema>;
export type BusinessFunctionTask = typeof businessFunctionTasks.$inferSelect;
