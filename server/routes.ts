import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ROLE_PERMISSIONS } from '@shared/permissions';
import { 
  insertAgentSchema, 
  insertEvaluationSchema, 
  insertFeedbackSchema,
  insertEvaluationTemplateSchema,
  insertDynamicEvaluationSchema,
  insertAgentDataFeedbackSchema,
  insertImprovementActionSchema,
  insertAgentMaturitySchema,
  insertPerformanceAlertSchema,
  insertAlertTriggerSchema,
  insertAlertNotificationSchema,
  insertTechnicianSchema,
  insertTechnicianPerformanceMetricsSchema,
  insertTechnicianRetentionAlertsSchema,
  insertTechnicianRetentionProgramsSchema,
  insertTechnicianCommunicationsSchema,
  insertHOAProspectSchema,
  insertHOAProspectStrategySchema,
  insertHOAProspectActivitySchema,
  insertMagikButtonTemplateSchema,
  insertTechnicianCapabilityRequestSchema,
  insertMagikButtonUsageTrackingSchema
} from "@shared/schema";
import { z } from "zod";
import historicalRoutes from "./routes/historical";
import { collaborationRoutes } from "./collaboration-routes";
import { realTechnicianDataProcessor } from "./realTechnicianDataProcessor";
import completedOrdersRouter from "./routes/completed-orders-new";
import openOrdersRouter from "./routes/open-orders";
import { jobCodesRouter } from "./routes/job-codes";
import authRoutes, { requireAuth, requirePermission } from "./auth-routes";
import * as fs from "fs";
import * as path from "path";
import { getAhsSurveyProcessor } from "./ahsSurveyProcessor";
import { initializeAhsStreaming, getAhsStreamingService } from "./ahsStreamingService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Mount authentication routes
  app.use("/api/auth", authRoutes);

  // Dashboard stats - PROTECTED by view_dashboard permission
  app.get("/api/dashboard/stats", requireAuth, requirePermission('view_dashboard'), async (req, res) => {
    try {
      console.log('Fetching dashboard stats...');
      const stats = await storage.getDashboardStats();
      console.log('Dashboard stats:', stats);
      res.json(stats);
    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Agents
  app.get("/api/agents", async (req, res) => {
    try {
      console.log('Fetching agents...');
      const agents = await storage.getAgents();
      console.log('Agents count:', agents.length);
      res.json(agents);
    } catch (error) {
      console.error('Agents fetch error:', error);
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  });

  app.get("/api/agents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const agent = await storage.getAgent(id);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent" });
    }
  });

  app.post("/api/agents", async (req, res) => {
    try {
      const validatedData = insertAgentSchema.parse(req.body);
      const agent = await storage.createAgent(validatedData);
      res.status(201).json(agent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid agent data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create agent" });
    }
  });

  app.put("/api/agents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertAgentSchema.partial().parse(req.body);
      const agent = await storage.updateAgent(id, validatedData);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid agent data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update agent" });
    }
  });

  app.delete("/api/agents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteAgent(id);
      if (!deleted) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete agent" });
    }
  });

  // Evaluations
  app.get("/api/evaluations", async (req, res) => {
    try {
      const agentId = req.query.agentId ? parseInt(req.query.agentId as string) : undefined;
      const evaluations = await storage.getEvaluations(agentId);
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch evaluations" });
    }
  });

  app.post("/api/evaluations", async (req, res) => {
    try {
      const validatedData = insertEvaluationSchema.parse(req.body);
      const evaluation = await storage.createEvaluation(validatedData);
      res.status(201).json(evaluation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid evaluation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create evaluation" });
    }
  });

  // Feedback
  app.get("/api/feedback", async (req, res) => {
    try {
      const agentId = req.query.agentId ? parseInt(req.query.agentId as string) : undefined;
      const feedback = await storage.getFeedback(agentId);
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(validatedData);
      res.status(201).json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid feedback data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create feedback" });
    }
  });

  // Performance metrics
  app.get("/api/performance-metrics", async (req, res) => {
    try {
      const agentId = req.query.agentId ? parseInt(req.query.agentId as string) : undefined;
      const metrics = await storage.getPerformanceMetrics(agentId);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch performance metrics" });
    }
  });

  // Dynamic Evaluation System Routes

  // Evaluation Templates
  app.get("/api/evaluation-templates", async (req, res) => {
    try {
      const agentType = req.query.agentType as string;
      const maturityLevel = req.query.maturityLevel as string;
      const templates = await storage.getEvaluationTemplates(agentType, maturityLevel);
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch evaluation templates" });
    }
  });

  app.post("/api/evaluation-templates", async (req, res) => {
    try {
      const validatedData = insertEvaluationTemplateSchema.parse(req.body);
      const template = await storage.createEvaluationTemplate(validatedData);
      res.status(201).json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid template data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create evaluation template" });
    }
  });

  // Agent Maturity
  app.get("/api/agent-maturity/:agentId", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const maturity = await storage.getAgentMaturity(agentId);
      if (!maturity) {
        return res.status(404).json({ message: "Agent maturity data not found" });
      }
      res.json(maturity);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent maturity" });
    }
  });

  app.put("/api/agent-maturity/:agentId", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const validatedData = insertAgentMaturitySchema.partial().parse(req.body);
      const maturity = await storage.updateAgentMaturity(agentId, validatedData);
      res.json(maturity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid maturity data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update agent maturity" });
    }
  });

  // Dynamic Evaluations
  app.get("/api/dynamic-evaluations", async (req, res) => {
    try {
      const agentId = req.query.agentId ? parseInt(req.query.agentId as string) : undefined;
      const evaluations = await storage.getDynamicEvaluations(agentId);
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dynamic evaluations" });
    }
  });

  app.post("/api/dynamic-evaluations", async (req, res) => {
    try {
      console.log("Received evaluation data:", JSON.stringify(req.body, null, 2));
      const validatedData = insertDynamicEvaluationSchema.parse(req.body);
      console.log("Validation successful, creating evaluation");
      const evaluation = await storage.createDynamicEvaluation(validatedData);
      res.status(201).json(evaluation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log("Validation error:", error.errors);
        return res.status(400).json({ message: "Invalid evaluation data", errors: error.errors });
      }
      console.log("Server error:", error);
      res.status(500).json({ message: "Failed to create dynamic evaluation" });
    }
  });

  // Agent Data Feedback
  app.get("/api/agent-data-feedback", async (req, res) => {
    try {
      const agentId = req.query.agentId ? parseInt(req.query.agentId as string) : undefined;
      const status = req.query.status as string;
      const feedback = await storage.getAgentDataFeedback(agentId, status);
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent data feedback" });
    }
  });

  app.post("/api/agent-data-feedback", async (req, res) => {
    try {
      const validatedData = insertAgentDataFeedbackSchema.parse(req.body);
      const feedback = await storage.createAgentDataFeedback(validatedData);
      res.status(201).json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid feedback data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create agent data feedback" });
    }
  });

  app.put("/api/agent-data-feedback/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertAgentDataFeedbackSchema.partial().parse(req.body);
      const feedback = await storage.updateAgentDataFeedback(id, validatedData);
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      res.json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid feedback data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update agent data feedback" });
    }
  });

  // Improvement Actions
  app.get("/api/improvement-actions", async (req, res) => {
    try {
      const agentId = req.query.agentId ? parseInt(req.query.agentId as string) : undefined;
      const status = req.query.status as string;
      const actions = await storage.getImprovementActions(agentId, status);
      res.json(actions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch improvement actions" });
    }
  });

  app.post("/api/improvement-actions", async (req, res) => {
    try {
      const validatedData = insertImprovementActionSchema.parse(req.body);
      const action = await storage.createImprovementAction(validatedData);
      res.status(201).json(action);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid action data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create improvement action" });
    }
  });

  app.put("/api/improvement-actions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertImprovementActionSchema.partial().parse(req.body);
      const action = await storage.updateImprovementAction(id, validatedData);
      if (!action) {
        return res.status(404).json({ message: "Action not found" });
      }
      res.json(action);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid action data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update improvement action" });
    }
  });

  // Daily and Intra-day Performance Routes

  // Agent daily goals
  app.get("/api/agents/:id/daily-goals", async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const date = req.query.date as string;
      const goals = await storage.getAgentDailyGoals(agentId, date);
      res.json(goals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch daily goals" });
    }
  });

  app.post("/api/agents/:id/daily-goals", async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const goal = await storage.createAgentDailyGoal({ ...req.body, agentId });
      res.status(201).json(goal);
    } catch (error) {
      res.status(500).json({ message: "Failed to create daily goal" });
    }
  });

  // Agent hourly performance
  app.get("/api/agents/:id/hourly-performance", async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const date = req.query.date as string;
      const performance = await storage.getAgentHourlyPerformance(agentId, date);
      res.json(performance);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hourly performance" });
    }
  });

  // Agent daily performance
  app.get("/api/agents/:id/daily-performance", async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;
      const performance = await storage.getAgentDailyPerformance(agentId, startDate, endDate);
      res.json(performance);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch daily performance" });
    }
  });

  // Agent self-evaluations
  app.get("/api/agents/:id/self-evaluations", async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const date = req.query.date as string;
      const type = req.query.type as string;
      const evaluations = await storage.getAgentSelfEvaluations(agentId, date, type);
      res.json(evaluations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch self-evaluations" });
    }
  });

  // Goal achievements
  app.get("/api/agents/:id/goal-achievements", async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const goalId = req.query.goalId ? parseInt(req.query.goalId as string) : undefined;
      const achievements = await storage.getGoalAchievements(agentId, goalId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch goal achievements" });
    }
  });

  // Performance trends
  app.get("/api/agents/:id/performance-trends", async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const metric = req.query.metric as string;
      const trends = await storage.getAgentPerformanceTrends(agentId, metric);
      res.json(trends);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch performance trends" });
    }
  });

  // Performance Alert System Routes
  app.get("/api/alerts", async (req, res) => {
    try {
      const agentId = req.query.agentId ? parseInt(req.query.agentId as string) : undefined;
      const alerts = await storage.getPerformanceAlerts(agentId);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch performance alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const validatedData = insertPerformanceAlertSchema.parse(req.body);
      const alert = await storage.createPerformanceAlert(validatedData);
      res.status(201).json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid alert data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create performance alert" });
    }
  });

  app.put("/api/alerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPerformanceAlertSchema.partial().parse(req.body);
      const alert = await storage.updatePerformanceAlert(id, validatedData);
      if (!alert) {
        return res.status(404).json({ message: "Alert not found" });
      }
      res.json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid alert data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update performance alert" });
    }
  });

  app.delete("/api/alerts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePerformanceAlert(id);
      if (!success) {
        return res.status(404).json({ message: "Alert not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete performance alert" });
    }
  });

  // Alert Triggers
  app.get("/api/alert-triggers", async (req, res) => {
    try {
      const alertId = req.query.alertId ? parseInt(req.query.alertId as string) : undefined;
      const agentId = req.query.agentId ? parseInt(req.query.agentId as string) : undefined;
      const triggers = await storage.getAlertTriggers(alertId, agentId);
      res.json(triggers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch alert triggers" });
    }
  });

  app.post("/api/alert-triggers/:id/acknowledge", async (req, res) => {
    try {
      const triggerId = parseInt(req.params.id);
      const { acknowledgedBy, notes } = req.body;
      const trigger = await storage.acknowledgeAlertTrigger(triggerId, acknowledgedBy, notes);
      if (!trigger) {
        return res.status(404).json({ message: "Alert trigger not found" });
      }
      res.json(trigger);
    } catch (error) {
      res.status(500).json({ message: "Failed to acknowledge alert trigger" });
    }
  });

  app.post("/api/alert-triggers/:id/resolve", async (req, res) => {
    try {
      const triggerId = parseInt(req.params.id);
      const { notes } = req.body;
      const trigger = await storage.resolveAlertTrigger(triggerId, notes);
      if (!trigger) {
        return res.status(404).json({ message: "Alert trigger not found" });
      }
      res.json(trigger);
    } catch (error) {
      res.status(500).json({ message: "Failed to resolve alert trigger" });
    }
  });

  // Alert Monitoring - Check conditions for a specific agent
  app.post("/api/agents/:id/check-alerts", async (req, res) => {
    try {
      const agentId = parseInt(req.params.id);
      const triggeredAlerts = await storage.checkAlertConditions(agentId);
      res.json(triggeredAlerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to check alert conditions" });
    }
  });

  // Register historical data routes
  app.use("/api/historical", historicalRoutes);

  // Register collaboration routes
  app.use("/api/collaboration", collaborationRoutes);

  // Register completed orders routes
  app.use("/api", completedOrdersRouter);

  // Planning area specific data endpoints
  app.get("/api/planning-area/data/:area/:timeRange", async (req, res) => {
    try {
      const { area, timeRange } = req.params;
      
      // Generate time-filtered data based on time range
      const now = new Date();
      let startDate: Date;
      
      switch (timeRange) {
        case '24h':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      }

      // Generate realistic data using same business model as historical metrics
      const areaNum = parseInt(area.replace('PA-', '')) || 1;
      const timeMultiplier = timeRange === '24h' ? 1 : (timeRange === '7d' ? 7 : 30);
      
      // Use actual business scale: 1730 technicians nationally, ~30,000 orders/week
      const techniciansInArea = Math.max(3, Math.floor((1730 / 430) * (0.8 + Math.random() * 0.4))); // 3-6 technicians per area (1730 total)
      const ordersPerTechDaily = 2.5 + Math.random() * 1.5; // 2.5-4 orders per technician daily (30K/week ÷ 1730 ÷ 7 days)
      const callVolume = Math.round(techniciansInArea * ordersPerTechDaily * timeMultiplier);
      
      // Calculate revenue per call based on realistic business model
      let revenuePerCall = 230; // Base $230 per call
      revenuePerCall *= (0.95 + Math.random() * 0.1); // ±5% variation
      const totalRevenue = Math.round(callVolume * revenuePerCall);
      
      // Calculate profit per call ($80-$110 range) 
      let profitPerCall = 95; // Base $95 profit per call
      profitPerCall *= (0.95 + Math.random() * 0.1); // ±5% variation
      const totalProfit = Math.round(callVolume * profitPerCall);
      const profitMargin = Math.round((totalProfit / totalRevenue) * 100 * 100) / 100;
      
      // Calculate realistic completion rates reflecting capacity shortage
      // 20K completed vs 30K created = 66.7% completion rate, but including reschedules
      const rescheduleRate = 0.27; // ~2000/7500 daily orders rescheduled due to capacity
      const d2cCancellationRate = 0.125; // 250 D2C orders rescheduled, 50% cancel = 125/1000 D2C orders
      const baseCompletionRate = 0.67; // Base completion accounting for capacity
      const actualCompletionRate = baseCompletionRate * (1 - rescheduleRate + (rescheduleRate * 0.5)); // Factor in reschedules
      const completedJobs = Math.round(callVolume * actualCompletionRate);
      
      // Generate breakdown by call type with realistic business distribution
      const callTypeBreakdown = {
        'D2C': {
          volume: Math.round(callVolume * 0.35), // 35% D2C direct consumer
          revenue: Math.round(totalRevenue * 0.38), // Higher revenue per call
          profitMargin: profitMargin + 3 // D2C typically 3% higher margin
        },
        'B2B': {
          volume: Math.round(callVolume * 0.30), // 30% B2B (AHS, Assurant, Choice)
          revenue: Math.round(totalRevenue * 0.28), // Lower revenue per call
          profitMargin: profitMargin - 2 // B2B typically 2% lower margin
        },
        'Sears Protect (SP)': {
          volume: Math.round(callVolume * 0.15), // 15% Sears Protect
          revenue: Math.round(totalRevenue * 0.14), // Standard warranty pricing
          profitMargin: profitMargin - 1 // Warranty partner margin
        },
        'Cinch HW (CHW)': {
          volume: Math.round(callVolume * 0.12), // 12% Cinch Home Warranty
          revenue: Math.round(totalRevenue * 0.12), // Standard warranty pricing
          profitMargin: profitMargin - 1 // Warranty partner margin
        },
        'Assurant PA (PA)': {
          volume: Math.round(callVolume * 0.08), // 8% Assurant Protection Advantage
          revenue: Math.round(totalRevenue * 0.08), // Standard warranty pricing
          profitMargin: profitMargin - 1 // Warranty partner margin
        }
      };
      
      // Generate breakdown by product type with realistic distribution  
      const productTypeBreakdown = {
        'HVAC': {
          volume: Math.round(callVolume * 0.25), // 25% HVAC
          revenue: Math.round(totalRevenue * 0.35), // Higher revenue per call ($280 avg)
          profitMargin: profitMargin + 8 // HVAC has highest margins
        },
        'Plumbing': {
          volume: Math.round(callVolume * 0.20), // 20% Plumbing
          revenue: Math.round(totalRevenue * 0.25), // Good revenue per call
          profitMargin: profitMargin + 5 // High margin plumbing
        },
        'Electrical': {
          volume: Math.round(callVolume * 0.15), // 15% Electrical
          revenue: Math.round(totalRevenue * 0.18), // Premium electrical work
          profitMargin: profitMargin + 6 // High margin electrical
        },
        'Refrigerator': {
          volume: Math.round(callVolume * 0.12), // 12% Refrigerator
          revenue: Math.round(totalRevenue * 0.10), // Standard appliance revenue
          profitMargin: profitMargin // Standard margin
        },
        'Washer': {
          volume: Math.round(callVolume * 0.10), // 10% Washer
          revenue: Math.round(totalRevenue * 0.06), // Lower revenue per call
          profitMargin: profitMargin - 2 // Lower margin washers
        },
        'Dryer': {
          volume: Math.round(callVolume * 0.08), // 8% Dryer
          revenue: Math.round(totalRevenue * 0.04), // Lower revenue per call
          profitMargin: profitMargin - 3 // Lower margin dryers
        },
        'Dishwasher': {
          volume: Math.round(callVolume * 0.06), // 6% Dishwasher
          revenue: Math.round(totalRevenue * 0.025), // Standard dishwasher
          profitMargin: profitMargin - 1 // Slightly lower margin
        },
        'Range': {
          volume: Math.round(callVolume * 0.03), // 3% Range
          revenue: Math.round(totalRevenue * 0.015), // Standard range revenue
          profitMargin: profitMargin // Standard margin
        },
        'Microwave': {
          volume: Math.round(callVolume * 0.008), // 0.8% Microwave
          revenue: Math.round(totalRevenue * 0.003), // Lower revenue
          profitMargin: profitMargin - 4 // Lower margin microwaves
        },
        'Garbage Disposal': {
          volume: Math.round(callVolume * 0.002), // 0.2% Garbage Disposal
          revenue: Math.round(totalRevenue * 0.001), // Lowest revenue
          profitMargin: profitMargin - 6 // Lowest margin
        }
      };
      
      // Generate previous period data for comparison
      const previousPeriodMultiplier = timeMultiplier;
      const previousTechnicians = Math.max(2, Math.floor((320 / 430) * 7 + Math.random() * 3));
      const previousAttemptsPerTech = 6.5 + Math.random() * 2.5;
      const previousCallVolume = Math.round(previousTechnicians * previousAttemptsPerTech * previousPeriodMultiplier);
      const previousRevenue = Math.round(previousCallVolume * (revenuePerCall * 0.92)); // 8% lower revenue per call previously
      const previousProfitMargin = profitMargin - (2 + Math.random() * 3); // 2-5% lower margin previously
      
      // Generate historical breakdown data with trends
      const generateHistoricalBreakdown = (currentBreakdown: any, variationPercent: number) => {
        const historical: any = {};
        Object.entries(currentBreakdown).forEach(([key, current]: [string, any]) => {
          const variation = 0.85 + (variationPercent / 100); // Previous period variation
          historical[key] = {
            volume: Math.round(current.volume * variation),
            revenue: Math.round(current.revenue * variation),
            profitMargin: current.profitMargin - (1 + Math.random() * 2), // 1-3% lower margins
            change: {
              volumeChange: ((current.volume - (current.volume * variation)) / (current.volume * variation) * 100).toFixed(1),
              revenueChange: ((current.revenue - (current.revenue * variation)) / (current.revenue * variation) * 100).toFixed(1),
              marginChange: (current.profitMargin - (current.profitMargin - (1 + Math.random() * 2))).toFixed(1)
            }
          };
        });
        return historical;
      };

      const previousCallTypeBreakdown = generateHistoricalBreakdown(callTypeBreakdown, -8);
      const previousProductTypeBreakdown = generateHistoricalBreakdown(productTypeBreakdown, -12);
      
      const data = {
        planningArea: area,
        timeRange,
        startDate: startDate.toISOString(),
        endDate: now.toISOString(),
        metrics: {
          callVolume,
          techniciansDeployed: techniciansInArea,
          totalJobs: callVolume,
          completedJobs,
          revenue: totalRevenue,
          profitMargin,
          customerSatisfaction: 88.2 + (areaNum % 15),
          activeAgents: Math.min(26, 8 + Math.floor(areaNum / 10)),
          averageResponseTime: Math.max(15, 45 - areaNum * 0.2),
          partsEfficiency: 82.1 + (areaNum % 12),
          completionRate: Math.round(actualCompletionRate * 100 * 100) / 100
        },
        previousMetrics: {
          callVolume: previousCallVolume,
          revenue: previousRevenue,
          profitMargin: previousProfitMargin,
          completedJobs: Math.round(previousCallVolume * (actualCompletionRate - 0.05))
        },
        callTypeBreakdown,
        productTypeBreakdown,
        previousCallTypeBreakdown,
        previousProductTypeBreakdown,
        performanceChanges: {
          volumeChange: ((callVolume - previousCallVolume) / previousCallVolume * 100).toFixed(1),
          revenueChange: ((totalRevenue - previousRevenue) / previousRevenue * 100).toFixed(1),
          marginChange: (profitMargin - previousProfitMargin).toFixed(1),
          reasons: [
            callVolume > previousCallVolume ? "Increased technician productivity through AI optimization" : "Seasonal demand adjustment",
            totalRevenue > previousRevenue ? "Improved pricing strategy and upselling" : "Market competition pressure",
            profitMargin > previousProfitMargin ? "Enhanced parts efficiency and route optimization" : "Cost management improvements needed"
          ]
        },
        trends: {
          jobGrowth: timeRange === '24h' ? '+2.3%' : (timeRange === '7d' ? '+8.7%' : '+23.4%'),
          revenueGrowth: timeRange === '24h' ? '+1.8%' : (timeRange === '7d' ? '+12.1%' : '+28.9%'),
          efficiencyGrowth: timeRange === '24h' ? '+0.9%' : (timeRange === '7d' ? '+4.2%' : '+11.7%')
        }
      };
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch planning area data" });
    }
  });

  app.get("/api/planning-area/prompts/:area/:timeRange", async (req, res) => {
    try {
      const { area, timeRange } = req.params;
      
      // Generate prompt tracking data with change history
      const areaNum = parseInt(area.replace('PA-', '')) || 1;
      const now = new Date();
      
      // Generate a comprehensive set of prompts based on the actual business operations
      const promptTemplates = [
        // Volume & Revenue Metrics
        { category: "Volume & Revenue", text: `High-value job mix (YoY) for ${area}`, agent: "Regional Performance Monitor" },
        { category: "Volume & Revenue", text: `Daily service call volume for ${area}`, agent: "Advanced Scheduling Agent" },
        { category: "Volume & Revenue", text: `Emergency call conversion rate for ${area}`, agent: "Emergency Response Coordinator" },
        { category: "Volume & Revenue", text: `B2B vs D2C revenue mix for ${area}`, agent: "B2B Relationship Manager" },
        { category: "Volume & Revenue", text: `Average ticket value for ${area} technicians`, agent: "Pricing & Estimation Specialist" },
        
        // Parts & Inventory Management
        { category: "Parts Funnel", text: `Parts delivery efficiency for ${area} technicians`, agent: "Parts Prediction Engine" },
        { category: "Parts Funnel", text: `Parts order accuracy rate for ${area}`, agent: "Parts Ordering Specialist" },
        { category: "Parts Funnel", text: `Inventory turnover rate for ${area}`, agent: "Inventory Management Assistant" },
        { category: "Parts Funnel", text: `Same-day parts availability for ${area}`, agent: "Parts Ordering Specialist" },
        { category: "Parts Funnel", text: `Parts cost optimization for ${area}`, agent: "Parts Prediction Engine" },
        
        // Customer Experience & Communication
        { category: "Customer Experience", text: `Customer satisfaction scores for ${area} service completion`, agent: "Quality Assurance Inspector" },
        { category: "Customer Experience", text: `First-call resolution rate for ${area}`, agent: "Customer Communication Hub" },
        { category: "Customer Experience", text: `Customer complaint response time for ${area}`, agent: "Customer Communication Hub" },
        { category: "Customer Experience", text: `Post-service follow-up completion for ${area}`, agent: "Customer Communication Hub" },
        { category: "Customer Experience", text: `Net Promoter Score for ${area}`, agent: "CX Agent" },
        
        // Technician Performance & Safety
        { category: "Technician Performance", text: `Technician productivity score for ${area}`, agent: "Technician Interaction Hub" },
        { category: "Technician Performance", text: `Safety compliance rate for ${area} technicians`, agent: "Quality Assurance Inspector" },
        { category: "Technician Performance", text: `Technician training completion for ${area}`, agent: "Technician Training & Development Agent" },
        { category: "Technician Performance", text: `Job completion time variance for ${area}`, agent: "Advanced Scheduling Agent" },
        { category: "Technician Performance", text: `Technician retention rate for ${area}`, agent: "Technician Recruiting Agent" },
        
        // Operational Efficiency
        { category: "Operations", text: `Route optimization efficiency for ${area}`, agent: "Route Optimization Engine" },
        { category: "Operations", text: `Schedule adherence rate for ${area}`, agent: "Advanced Scheduling Agent" },
        { category: "Operations", text: `Equipment utilization for ${area}`, agent: "Inventory Management Assistant" },
        { category: "Operations", text: `Maintenance scheduler accuracy for ${area}`, agent: "Maintenance Scheduler Pro" },
        { category: "Operations", text: `Service area coverage efficiency for ${area}`, agent: "Regional Performance Monitor" },
        
        // Financial Performance
        { category: "Financial", text: `Cost per service call for ${area}`, agent: "Financial Intelligence Agent" },
        { category: "Financial", text: `Profit margin by service type for ${area}`, agent: "Pricing & Estimation Specialist" },
        { category: "Financial", text: `Revenue per technician for ${area}`, agent: "Performance Analytics AI" },
        { category: "Financial", text: `Collection efficiency for ${area}`, agent: "Financial Intelligence Agent" },
        { category: "Financial", text: `Service upsell conversion rate for ${area}`, agent: "Pricing & Estimation Specialist" },
        
        // Marketing & Growth
        { category: "Marketing", text: `Lead conversion rate for ${area}`, agent: "D2C Marketing Intelligence" },
        { category: "Marketing", text: `Customer acquisition cost for ${area}`, agent: "Geographic Performance Marketing" },
        { category: "Marketing", text: `Repeat customer rate for ${area}`, agent: "B2B Relationship Manager" },
        { category: "Marketing", text: `Service area market penetration for ${area}`, agent: "Geographic Performance Marketing" },
        { category: "Marketing", text: `Brand awareness in ${area}`, agent: "D2C Marketing Intelligence" },
        
        // Quality & Compliance
        { category: "Quality", text: `Service quality audit score for ${area}`, agent: "Quality Assurance Inspector" },
        { category: "Quality", text: `Electrical safety compliance for ${area}`, agent: "Electrical Safety Compliance Agent" },
        { category: "Quality", text: `HVAC diagnostic accuracy for ${area}`, agent: "HVAC System Diagnostics AI" },
        { category: "Quality", text: `Plumbing service completion rate for ${area}`, agent: "Plumbing Dispatch Coordinator" },
        { category: "Quality", text: `Service warranty claim rate for ${area}`, agent: "Quality Assurance Inspector" }
      ];

      // Select 12-15 prompts randomly for variety, but ensure coverage across categories
      const selectedPrompts: typeof promptTemplates = [];
      const categories = Array.from(new Set(promptTemplates.map(p => p.category)));
      
      // Pick at least 1-2 prompts from each category
      categories.forEach(category => {
        const categoryPrompts = promptTemplates.filter(p => p.category === category);
        const numToSelect = Math.min(2, Math.max(1, Math.floor(Math.random() * 3) + 1));
        const shuffled = categoryPrompts.sort(() => Math.random() - 0.5);
        selectedPrompts.push(...shuffled.slice(0, numToSelect));
      });

      // Fill up to 15 total prompts with random selections
      while (selectedPrompts.length < 15 && selectedPrompts.length < promptTemplates.length) {
        const remaining = promptTemplates.filter(p => !selectedPrompts.includes(p));
        if (remaining.length === 0) break;
        const randomPrompt = remaining[Math.floor(Math.random() * remaining.length)];
        selectedPrompts.push(randomPrompt);
      }

      const prompts = selectedPrompts.slice(0, 15).map((template, index) => {
        const promptId = String(index + 1).padStart(3, '0');
        const classification = areaNum % 5 === 0 ? "RED" : (areaNum % 3 === 0 ? "YELLOW" : "GREEN");
        const baseValue = 60 + (areaNum * 3 + index * 2) % 35; // Creates variation between 60-95
        
        return {
          id: `prompt-${area}-${promptId}`,
          category: template.category,
          text: template.text,
          classification: classification,
          currentValue: baseValue,
          targetValue: 90,
          changes: [
            {
              timestamp: new Date(now.getTime() - (timeRange === '24h' ? (6 + index * 2) : (timeRange === '7d' ? (48 + index * 8) : (240 + index * 24))) * 60 * 60 * 1000).toISOString(),
              oldValue: Math.max(30, baseValue - 10 - (index % 8)),
              newValue: baseValue,
              reason: `${template.agent} optimization and process improvements`,
              agentAction: `Implemented targeted improvements based on ${area} performance patterns and operational feedback`
            }
          ],
          responsibleAgent: template.agent,
          lastUpdated: new Date(now.getTime() - (timeRange === '24h' ? (1 + index) : (timeRange === '7d' ? (6 + index * 2) : (48 + index * 6))) * 60 * 60 * 1000).toISOString()
        };
      });
      
      res.json({
        planningArea: area,
        timeRange,
        prompts,
        summary: {
          totalPrompts: prompts.length,
          redCount: prompts.filter(p => p.classification === "RED").length,
          yellowCount: prompts.filter(p => p.classification === "YELLOW").length,
          greenCount: prompts.filter(p => p.classification === "GREEN").length,
          averageImprovement: "+12.8%",
          activeAgentActions: prompts.filter(p => p.changes.length > 0).length
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prompt tracking data" });
    }
  });

  // Business Knowledge System routes
  app.get("/api/business-knowledge/processed-prompts", async (req, res) => {
    try {
      const filePath = path.join(process.cwd(), 'shared', 'processed-prompts.json');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      res.json(data);
    } catch (error) {
      console.error('Error reading processed prompts:', error);
      res.status(500).json({ message: "Failed to fetch processed prompts" });
    }
  });

  // Technician Retention System Routes
  
  // Technicians CRUD
  app.get("/api/technicians", async (req, res) => {
    try {
      const planningArea = req.query.planningArea as string;
      const retentionRisk = req.query.retentionRisk as string;
      const technicians = await storage.getTechnicians(planningArea, retentionRisk);
      res.json(technicians);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch technicians" });
    }
  });

  app.get("/api/technicians/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const technician = await storage.getTechnician(id);
      if (!technician) {
        return res.status(404).json({ message: "Technician not found" });
      }
      res.json(technician);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch technician" });
    }
  });

  app.post("/api/technicians", async (req, res) => {
    try {
      const validatedData = insertTechnicianSchema.parse(req.body);
      const technician = await storage.createTechnician(validatedData);
      res.status(201).json(technician);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid technician data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create technician" });
    }
  });

  app.put("/api/technicians/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertTechnicianSchema.partial().parse(req.body);
      const technician = await storage.updateTechnician(id, validatedData);
      if (!technician) {
        return res.status(404).json({ message: "Technician not found" });
      }
      res.json(technician);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid technician data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update technician" });
    }
  });

  // Technician Performance Metrics
  app.get("/api/technicians/:id/performance", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;
      const metrics = await storage.getTechnicianPerformanceMetrics(id, startDate, endDate);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch technician performance metrics" });
    }
  });

  // Technician Retention Alerts
  app.get("/api/technician-alerts", async (req, res) => {
    try {
      const technicianId = req.query.technicianId ? parseInt(req.query.technicianId as string) : undefined;
      const alertType = req.query.alertType as string;
      const severity = req.query.severity as string;
      const alerts = await storage.getTechnicianRetentionAlerts(technicianId, alertType, severity);
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch technician retention alerts" });
    }
  });

  app.post("/api/technician-alerts", async (req, res) => {
    try {
      const validatedData = insertTechnicianRetentionAlertsSchema.parse(req.body);
      const alert = await storage.createTechnicianRetentionAlert(validatedData);
      res.status(201).json(alert);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid alert data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create technician retention alert" });
    }
  });

  // Technician Retention Programs
  app.get("/api/retention-programs", async (req, res) => {
    try {
      const programType = req.query.programType as string;
      const status = req.query.status as string;
      const programs = await storage.getTechnicianRetentionPrograms(programType, status);
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch retention programs" });
    }
  });

  app.post("/api/retention-programs", async (req, res) => {
    try {
      const validatedData = insertTechnicianRetentionProgramsSchema.parse(req.body);
      const program = await storage.createTechnicianRetentionProgram(validatedData);
      res.status(201).json(program);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid program data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create retention program" });
    }
  });

  // Technician Communications
  app.get("/api/technicians/:id/communications", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const communicationType = req.query.communicationType as string;
      const communications = await storage.getTechnicianCommunications(id, communicationType);
      res.json(communications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch technician communications" });
    }
  });

  app.post("/api/technician-communications", async (req, res) => {
    try {
      const validatedData = insertTechnicianCommunicationsSchema.parse(req.body);
      const communication = await storage.createTechnicianCommunication(validatedData);
      res.status(201).json(communication);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid communication data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create technician communication" });
    }
  });

  // Technician Retention Dashboard Stats
  app.get("/api/technician-retention/dashboard", async (req, res) => {
    try {
      const stats = await storage.getTechnicianRetentionDashboard();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch technician retention dashboard" });
    }
  });

  // Real Technician Data API Routes
  app.get("/api/real-technician-data", async (req, res) => {
    try {
      const data = await realTechnicianDataProcessor.processTechnicianData();
      res.json(data);
    } catch (error) {
      console.error('Error processing real technician data:', error);
      res.status(500).json({ message: "Failed to process real technician data" });
    }
  });

  app.get("/api/real-technician-insights", async (req, res) => {
    try {
      const insights = await realTechnicianDataProcessor.generateTechnicianInsights();
      res.json(insights);
    } catch (error) {
      console.error('Error generating technician insights:', error);
      res.status(500).json({ message: "Failed to generate technician insights" });
    }
  });

  // Technician profiles endpoint
  app.get('/api/technician-profiles', async (req, res) => {
    try {
      const profiles = await realTechnicianDataProcessor.getTechnicianProfiles();
      res.json(profiles);
    } catch (error) {
      console.error('Error getting technician profiles:', error);
      res.status(500).json({ message: 'Failed to get technician profiles' });
    }
  });

  // Individual technician profile endpoint
  app.get('/api/technician-profiles/:techId', async (req, res) => {
    try {
      const profiles = await realTechnicianDataProcessor.getTechnicianProfiles();
      const profile = profiles.find(p => p.techId === req.params.techId);
      
      if (!profile) {
        return res.status(404).json({ message: 'Technician not found' });
      }
      
      res.json(profile);
    } catch (error) {
      console.error('Error getting technician profile:', error);
      res.status(500).json({ message: 'Failed to get technician profile' });
    }
  });

  app.get("/api/job-allocation-analysis", async (req, res) => {
    try {
      const analysis = await realTechnicianDataProcessor.analyzeJobAllocation();
      res.json(analysis);
    } catch (error) {
      console.error('Error analyzing job allocation:', error);
      res.status(500).json({ message: "Failed to analyze job allocation" });
    }
  });

  app.get("/api/coaching-recommendations", async (req, res) => {
    try {
      const recommendations = await realTechnicianDataProcessor.generateCoachingRecommendations();
      res.json(recommendations);
    } catch (error) {
      console.error('Error generating coaching recommendations:', error);
      res.status(500).json({ message: "Failed to generate coaching recommendations" });
    }
  });

  app.get("/api/trend-analysis", async (req, res) => {
    try {
      const analysis = await realTechnicianDataProcessor.analyzeTrends();
      res.json(analysis);
    } catch (error) {
      console.error('Error analyzing trends:', error);
      res.status(500).json({ message: "Failed to analyze trends" });
    }
  });

  // Import and use parts order routes
  const { router: partsOrderRoutes } = await import('./partsOrderRoutes');
  app.use("/api/parts-orders", partsOrderRoutes);
  
  // Use completed orders routes
  app.use("/api", completedOrdersRouter);

  // Mount open orders routes
  app.use("/api", openOrdersRouter);
  
  // Job Code Performance routes
  app.use("/api/job-codes", jobCodesRouter);
  

  
  // Use coaching routes
  const { default: coachingRouter } = await import('./routes/coaching');
  app.use("/api/coaching", coachingRouter);

  // Documentation endpoints
  app.get("/api/documentation/files", async (req, res) => {
    try {
      const documentationFiles = [
        {
          id: "americas-home-manager-operations-guide",
          name: "Americas Home Manager Operations Guide",
          filename: "AMERICAS_HOME_MANAGER_OPERATIONS_GUIDE.md",
          category: "Core Operations Documentation",
          highlight: "primary"
        },
        {
          id: "ai-agent-ecosystem-reference",
          name: "AI Agent Ecosystem Reference",
          filename: "AI_AGENT_ECOSYSTEM_REFERENCE.md",
          category: "Core Operations Documentation",
          highlight: "primary"
        },
        {
          id: "business-operations-manual",
          name: "Business Operations Manual",
          filename: "BUSINESS_OPERATIONS_MANUAL.md",
          category: "Core Operations Documentation",
          highlight: "primary"
        },
        {
          id: "readme",
          name: "Platform README",
          filename: "README.md",
          category: "Core Operations Documentation",
          highlight: "secondary"
        },
        {
          id: "replit-md",
          name: "Technical Architecture (replit.md)",
          filename: "replit.md",
          category: "Core Operations Documentation",
          highlight: "secondary"
        },
        {
          id: "daily-operations-guide",
          name: "Daily Operations Guide",
          filename: "DAILY_OPERATIONS_GUIDE.md",
          category: "Specialized Guides",
          highlight: "business"
        },
        {
          id: "enhanced-daily-operations-guide",
          name: "Enhanced Daily Operations Guide",
          filename: "ENHANCED_DAILY_OPERATIONS_GUIDE.md",
          category: "Specialized Guides",
          highlight: "business"
        },
        {
          id: "business-excellence-framework",
          name: "Business Excellence Framework",
          filename: "BUSINESS_EXCELLENCE_FRAMEWORK.md",
          category: "Specialized Guides",
          highlight: "business"
        },
        {
          id: "predictive-scheduling-documentation",
          name: "Predictive Scheduling System",
          filename: "PREDICTIVE_SCHEDULING_DOCUMENTATION.md",
          category: "Specialized Guides",
          highlight: "technical"
        }
      ];
      res.json(documentationFiles);
    } catch (error) {
      console.error('Error fetching documentation files:', error);
      res.status(500).json({ message: "Failed to fetch documentation files" });
    }
  });

  app.get("/api/documentation/content/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      // URL decode the filename to handle encoded names
      const decodedFilename = decodeURIComponent(filename);
      const filePath = path.join(process.cwd(), decodedFilename);
      
      // Security check - only allow specific documentation files
      const allowedFiles = [
        'AMERICAS_HOME_MANAGER_OPERATIONS_GUIDE.md',
        'AI_AGENT_ECOSYSTEM_REFERENCE.md',
        'BUSINESS_OPERATIONS_MANUAL.md',
        'README.md',
        'replit.md',
        'DAILY_OPERATIONS_GUIDE.md',
        'ENHANCED_DAILY_OPERATIONS_GUIDE.md',
        'BUSINESS_EXCELLENCE_FRAMEWORK.md',
        'PREDICTIVE_SCHEDULING_DOCUMENTATION.md',
        'WEEKLY_AUTOMATED_REPORTING_SYSTEM.md'
      ];
      
      // Also check if the filename matches one of the display names
      const fileNameMapping = {
        'Americas Home Manager Operations Guide': 'AMERICAS_HOME_MANAGER_OPERATIONS_GUIDE.md',
        'AI Agent Ecosystem Reference': 'AI_AGENT_ECOSYSTEM_REFERENCE.md',
        'Business Operations Manual': 'BUSINESS_OPERATIONS_MANUAL.md',
        'Platform README': 'README.md',
        'Technical Architecture (replit.md)': 'replit.md',
        'Daily Operations Guide': 'DAILY_OPERATIONS_GUIDE.md',
        'Enhanced Daily Operations Guide': 'ENHANCED_DAILY_OPERATIONS_GUIDE.md',
        'Business Excellence Framework': 'BUSINESS_EXCELLENCE_FRAMEWORK.md',
        'Predictive Scheduling System': 'PREDICTIVE_SCHEDULING_DOCUMENTATION.md'
      };
      
      // If the decoded filename is a display name, map it to the actual filename
      const actualFilename = fileNameMapping[decodedFilename] || decodedFilename;
      
      if (!allowedFiles.includes(actualFilename)) {
        return res.status(403).json({ message: "Access denied to this file" });
      }
      
      const actualFilePath = path.join(process.cwd(), actualFilename);
      if (!fs.existsSync(actualFilePath)) {
        return res.status(404).json({ message: "Documentation file not found" });
      }
      
      const content = fs.readFileSync(actualFilePath, 'utf-8');
      res.json({ content, filename: actualFilename });
    } catch (error) {
      console.error('Error reading documentation file:', error);
      res.status(500).json({ message: "Failed to read documentation file" });
    }
  });

  // HOA Prospect Management API Routes
  
  // Get all prospects with optional filtering
  app.get("/api/hoa-prospects", async (req, res) => {
    try {
      const { status, priority } = req.query;
      const prospects = await storage.getHOAProspects(
        status as string, 
        priority as string
      );
      res.json(prospects);
    } catch (error) {
      console.error('Error fetching HOA prospects:', error);
      res.status(500).json({ message: "Failed to fetch HOA prospects" });
    }
  });

  // Get single prospect
  app.get("/api/hoa-prospects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const prospect = await storage.getHOAProspect(id);
      if (!prospect) {
        return res.status(404).json({ message: "Prospect not found" });
      }
      res.json(prospect);
    } catch (error) {
      console.error('Error fetching HOA prospect:', error);
      res.status(500).json({ message: "Failed to fetch HOA prospect" });
    }
  });

  // Create new prospect
  app.post("/api/hoa-prospects", async (req, res) => {
    try {
      const prospectData = insertHOAProspectSchema.parse(req.body);
      const prospect = await storage.createHOAProspect(prospectData);
      res.status(201).json(prospect);
    } catch (error) {
      console.error('Error creating HOA prospect:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid prospect data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create HOA prospect" });
    }
  });

  // Update prospect
  app.put("/api/hoa-prospects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const prospect = await storage.updateHOAProspect(id, updates);
      if (!prospect) {
        return res.status(404).json({ message: "Prospect not found" });
      }
      res.json(prospect);
    } catch (error) {
      console.error('Error updating HOA prospect:', error);
      res.status(500).json({ message: "Failed to update HOA prospect" });
    }
  });

  // Delete prospect
  app.delete("/api/hoa-prospects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteHOAProspect(id);
      if (!deleted) {
        return res.status(404).json({ message: "Prospect not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting HOA prospect:', error);
      res.status(500).json({ message: "Failed to delete HOA prospect" });
    }
  });

  // Get prospect strategies
  app.get("/api/hoa-prospects/:id/strategies", async (req, res) => {
    try {
      const prospectId = parseInt(req.params.id);
      const { status } = req.query;
      const strategies = await storage.getHOAProspectStrategies(
        prospectId, 
        status as string
      );
      res.json(strategies);
    } catch (error) {
      console.error('Error fetching prospect strategies:', error);
      res.status(500).json({ message: "Failed to fetch prospect strategies" });
    }
  });

  // Generate AI-powered strategy for prospect
  app.post("/api/hoa-prospects/:id/generate-strategy", async (req, res) => {
    try {
      const prospectId = parseInt(req.params.id);
      const strategy = await storage.generateProspectStrategy(prospectId);
      res.status(201).json(strategy);
    } catch (error) {
      console.error('Error generating prospect strategy:', error);
      if (error instanceof Error && error.message === 'Prospect not found') {
        return res.status(404).json({ message: "Prospect not found" });
      }
      res.status(500).json({ message: "Failed to generate prospect strategy" });
    }
  });

  // Get all strategies with optional filtering
  app.get("/api/hoa-prospect-strategies", async (req, res) => {
    try {
      const { status } = req.query;
      const strategies = await storage.getHOAProspectStrategies(
        undefined, 
        status as string
      );
      res.json(strategies);
    } catch (error) {
      console.error('Error fetching strategies:', error);
      res.status(500).json({ message: "Failed to fetch strategies" });
    }
  });

  // Create strategy
  app.post("/api/hoa-prospect-strategies", async (req, res) => {
    try {
      const strategyData = insertHOAProspectStrategySchema.parse(req.body);
      const strategy = await storage.createHOAProspectStrategy(strategyData);
      res.status(201).json(strategy);
    } catch (error) {
      console.error('Error creating strategy:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid strategy data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create strategy" });
    }
  });

  // Update strategy
  app.put("/api/hoa-prospect-strategies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const strategy = await storage.updateHOAProspectStrategy(id, updates);
      if (!strategy) {
        return res.status(404).json({ message: "Strategy not found" });
      }
      res.json(strategy);
    } catch (error) {
      console.error('Error updating strategy:', error);
      res.status(500).json({ message: "Failed to update strategy" });
    }
  });

  // Get prospect activities
  app.get("/api/hoa-prospects/:id/activities", async (req, res) => {
    try {
      const prospectId = parseInt(req.params.id);
      const activities = await storage.getHOAProspectActivities(prospectId);
      res.json(activities);
    } catch (error) {
      console.error('Error fetching prospect activities:', error);
      res.status(500).json({ message: "Failed to fetch prospect activities" });
    }
  });

  // Create activity
  app.post("/api/hoa-prospect-activities", async (req, res) => {
    try {
      const activityData = insertHOAProspectActivitySchema.parse(req.body);
      const activity = await storage.createHOAProspectActivity(activityData);
      res.status(201).json(activity);
    } catch (error) {
      console.error('Error creating activity:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid activity data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create activity" });
    }
  });

  // 1099 Contractor Recruitment Routes
  // Get contractor recruitments with filters
  app.get('/api/contractor-recruitment', async (req, res) => {
    try {
      const { planningArea, recruitmentStatus, serviceSkills, productSpecialties } = req.query;
      
      const filters: any = {};
      if (planningArea) filters.planningArea = planningArea as string;
      if (recruitmentStatus) filters.recruitmentStatus = recruitmentStatus as string;
      if (serviceSkills) {
        filters.serviceSkills = Array.isArray(serviceSkills) 
          ? serviceSkills as string[]
          : [serviceSkills as string];
      }
      if (productSpecialties) {
        filters.productSpecialties = Array.isArray(productSpecialties)
          ? productSpecialties as string[]
          : [productSpecialties as string];
      }
      
      const contractors = await storage.getContractorRecruitments(filters);
      res.json(contractors);
    } catch (error) {
      console.error('Error fetching contractor recruitments:', error);
      res.status(500).json({ message: 'Failed to fetch contractor recruitments' });
    }
  });

  // Get specific contractor recruitment
  app.get('/api/contractor-recruitment/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contractor = await storage.getContractorRecruitment(id);
      
      if (!contractor) {
        return res.status(404).json({ message: 'Contractor not found' });
      }
      
      res.json(contractor);
    } catch (error) {
      console.error('Error fetching contractor recruitment:', error);
      res.status(500).json({ message: 'Failed to fetch contractor recruitment' });
    }
  });

  // Create new contractor recruitment
  app.post('/api/contractor-recruitment', async (req, res) => {
    try {
      const contractorData = req.body;
      const contractor = await storage.createContractorRecruitment(contractorData);
      res.status(201).json(contractor);
    } catch (error) {
      console.error('Error creating contractor recruitment:', error);
      res.status(500).json({ message: 'Failed to create contractor recruitment' });
    }
  });

  // Update contractor recruitment
  app.put('/api/contractor-recruitment/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const contractor = await storage.updateContractorRecruitment(id, updates);
      res.json(contractor);
    } catch (error) {
      console.error('Error updating contractor recruitment:', error);
      res.status(500).json({ message: 'Failed to update contractor recruitment' });
    }
  });

  // Delete contractor recruitment
  app.delete('/api/contractor-recruitment/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteContractorRecruitment(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting contractor recruitment:', error);
      res.status(500).json({ message: 'Failed to delete contractor recruitment' });
    }
  });

  // Firm Technicians Routes
  app.get('/api/firm-technicians/:contractorFirmId', async (req, res) => {
    try {
      const contractorFirmId = parseInt(req.params.contractorFirmId);
      const technicians = await storage.getFirmTechnicians(contractorFirmId);
      res.json(technicians);
    } catch (error) {
      console.error('Error fetching firm technicians:', error);
      res.status(500).json({ message: 'Failed to fetch firm technicians' });
    }
  });

  app.post('/api/firm-technicians', async (req, res) => {
    try {
      const technicianData = req.body;
      const technician = await storage.createFirmTechnician(technicianData);
      res.status(201).json(technician);
    } catch (error) {
      console.error('Error creating firm technician:', error);
      res.status(500).json({ message: 'Failed to create firm technician' });
    }
  });

  app.put('/api/firm-technicians/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const technician = await storage.updateFirmTechnician(id, updates);
      res.json(technician);
    } catch (error) {
      console.error('Error updating firm technician:', error);
      res.status(500).json({ message: 'Failed to update firm technician' });
    }
  });

  app.delete('/api/firm-technicians/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteFirmTechnician(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting firm technician:', error);
      res.status(500).json({ message: 'Failed to delete firm technician' });
    }
  });

  // Get recruitment activities
  app.get('/api/recruitment-activities', async (req, res) => {
    try {
      const { contractorId } = req.query;
      const activities = await storage.getRecruitmentActivities(
        contractorId ? parseInt(contractorId as string) : undefined
      );
      res.json(activities);
    } catch (error) {
      console.error('Error fetching recruitment activities:', error);
      res.status(500).json({ message: 'Failed to fetch recruitment activities' });
    }
  });

  // Create recruitment activity
  app.post('/api/recruitment-activities', async (req, res) => {
    try {
      const activityData = req.body;
      const activity = await storage.createRecruitmentActivity(activityData);
      res.status(201).json(activity);
    } catch (error) {
      console.error('Error creating recruitment activity:', error);
      res.status(500).json({ message: 'Failed to create recruitment activity' });
    }
  });

  // Get recruitment targets
  app.get('/api/recruitment-targets', async (req, res) => {
    try {
      const { planningArea } = req.query;
      const targets = await storage.getRecruitmentTargets(planningArea as string);
      res.json(targets);
    } catch (error) {
      console.error('Error fetching recruitment targets:', error);
      res.status(500).json({ message: 'Failed to fetch recruitment targets' });
    }
  });

  // Get specific recruitment target
  app.get('/api/recruitment-targets/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const target = await storage.getRecruitmentTarget(id);
      
      if (!target) {
        return res.status(404).json({ message: 'Recruitment target not found' });
      }
      
      res.json(target);
    } catch (error) {
      console.error('Error fetching recruitment target:', error);
      res.status(500).json({ message: 'Failed to fetch recruitment target' });
    }
  });

  // Create recruitment target
  app.post('/api/recruitment-targets', async (req, res) => {
    try {
      const targetData = req.body;
      const target = await storage.createRecruitmentTarget(targetData);
      res.status(201).json(target);
    } catch (error) {
      console.error('Error creating recruitment target:', error);
      res.status(500).json({ message: 'Failed to create recruitment target' });
    }
  });

  // Update recruitment target
  app.put('/api/recruitment-targets/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const target = await storage.updateRecruitmentTarget(id, updates);
      res.json(target);
    } catch (error) {
      console.error('Error updating recruitment target:', error);
      res.status(500).json({ message: 'Failed to update recruitment target' });
    }
  });

  // =========================================
  // AHS AREA MANAGER AI SYSTEM ROUTES
  // =========================================
  
  // AHS Survey Data and Analytics Routes
  app.get("/api/ahs/surveys", requireAuth, async (req, res) => {
    try {
      const { state, rating, trade, vendorId, dateFrom, dateTo } = req.query;
      
      const filters: any = {};
      if (state) filters.state = state as string;
      if (rating) filters.rating = parseInt(rating as string);
      if (trade) filters.trade = trade as string;
      if (vendorId) filters.vendorId = vendorId as string;
      if (dateFrom && dateTo) {
        filters.dateRange = { from: dateFrom as string, to: dateTo as string };
      }
      
      const surveyProcessor = getAhsSurveyProcessor();
      const surveys = surveyProcessor.getSurveys(filters);
      
      res.json({
        surveys: surveys.slice(0, 1000), // Limit for performance
        totalCount: surveys.length
      });
    } catch (error) {
      console.error('Error fetching AHS surveys:', error);
      res.status(500).json({ message: "Failed to fetch AHS survey data" });
    }
  });
  
  app.get("/api/ahs/analytics", requireAuth, async (req, res) => {
    try {
      const surveyProcessor = getAhsSurveyProcessor();
      const analytics = surveyProcessor.getAnalytics();
      
      if (!analytics) {
        return res.status(404).json({ message: "AHS survey analytics not available" });
      }
      
      res.json(analytics);
    } catch (error) {
      console.error('Error fetching AHS analytics:', error);
      res.status(500).json({ message: "Failed to fetch AHS analytics" });
    }
  });
  
  app.get("/api/ahs/filter-options", requireAuth, async (req, res) => {
    try {
      const surveyProcessor = getAhsSurveyProcessor();
      const filterOptions = surveyProcessor.getFilterOptions();
      
      res.json(filterOptions);
    } catch (error) {
      console.error('Error fetching AHS filter options:', error);
      res.status(500).json({ message: "Failed to fetch AHS filter options" });
    }
  });
  
  app.get("/api/ahs/regional-insights/:region", requireAuth, async (req, res) => {
    try {
      const { region } = req.params;
      const surveyProcessor = getAhsSurveyProcessor();
      const insight = surveyProcessor.getRegionalInsight(region);
      
      if (!insight) {
        return res.status(404).json({ message: "Regional insight not found" });
      }
      
      res.json(insight);
    } catch (error) {
      console.error('Error fetching regional insight:', error);
      res.status(500).json({ message: "Failed to fetch regional insight" });
    }
  });
  
  // AHS Streaming Communication Routes
  app.post("/api/ahs/send-interaction", async (req, res) => {
    try {
      const streamingService = getAhsStreamingService();
      if (!streamingService) {
        return res.status(503).json({ message: "AHS streaming service not available" });
      }
      
      const interaction = {
        type: req.body.type || 'message',
        managerId: req.body.managerId,
        managerName: req.body.managerName,
        agentId: req.body.agentId,
        timestamp: new Date().toISOString(),
        content: req.body.content,
        priority: req.body.priority || 'medium',
        metadata: req.body.metadata || {},
        requiresResponse: req.body.requiresResponse || false
      };
      
      streamingService.sendInteractionToManager(interaction);
      
      res.json({ 
        success: true, 
        interactionId: interaction.timestamp,
        message: "Interaction sent successfully" 
      });
    } catch (error) {
      console.error('Error sending AHS interaction:', error);
      res.status(500).json({ message: "Failed to send interaction" });
    }
  });
  
  app.post("/api/ahs/schedule-interaction", async (req, res) => {
    try {
      const streamingService = getAhsStreamingService();
      if (!streamingService) {
        return res.status(503).json({ message: "AHS streaming service not available" });
      }
      
      const interaction = {
        type: req.body.type || 'message',
        managerId: req.body.managerId,
        managerName: req.body.managerName,
        agentId: req.body.agentId,
        timestamp: new Date().toISOString(),
        content: req.body.content,
        priority: req.body.priority || 'medium',
        metadata: req.body.metadata || {},
        requiresResponse: req.body.requiresResponse || false,
        scheduledFor: req.body.scheduledFor
      };
      
      const scheduleId = streamingService.scheduleInteraction(interaction);
      
      res.json({ 
        success: true, 
        scheduleId,
        scheduledFor: interaction.scheduledFor,
        message: "Interaction scheduled successfully" 
      });
    } catch (error) {
      console.error('Error scheduling AHS interaction:', error);
      res.status(500).json({ message: "Failed to schedule interaction" });
    }
  });
  
  app.get("/api/ahs/interaction-history", requireAuth, async (req, res) => {
    try {
      const { managerId, limit } = req.query;
      const streamingService = getAhsStreamingService();
      
      if (!streamingService) {
        return res.status(503).json({ message: "AHS streaming service not available" });
      }
      
      const history = streamingService.getInteractionHistory(
        managerId as string,
        limit ? parseInt(limit as string) : 100
      );
      
      res.json({ interactions: history });
    } catch (error) {
      console.error('Error fetching AHS interaction history:', error);
      res.status(500).json({ message: "Failed to fetch interaction history" });
    }
  });
  
  app.get("/api/ahs/scheduled-interactions", requireAuth, async (req, res) => {
    try {
      const { managerId } = req.query;
      const streamingService = getAhsStreamingService();
      
      if (!streamingService) {
        return res.status(503).json({ message: "AHS streaming service not available" });
      }
      
      const scheduled = streamingService.getScheduledInteractions(managerId as string);
      
      res.json({ scheduledInteractions: scheduled });
    } catch (error) {
      console.error('Error fetching scheduled interactions:', error);
      res.status(500).json({ message: "Failed to fetch scheduled interactions" });
    }
  });
  
  app.get("/api/ahs/connected-managers", requireAuth, async (req, res) => {
    try {
      const streamingService = getAhsStreamingService();
      
      if (!streamingService) {
        return res.status(503).json({ message: "AHS streaming service not available" });
      }
      
      const connectedManagers = streamingService.getConnectedManagers();
      
      res.json({ connectedManagers });
    } catch (error) {
      console.error('Error fetching connected managers:', error);
      res.status(500).json({ message: "Failed to fetch connected managers" });
    }
  });

  // Human-in-the-Loop Approval System API Routes
  // Import the human approval service
  const { HumanApprovalService } = await import("./human-approval-service");

  // Get all approval requests (for admin/executive overview)
  app.get("/api/human-approvals", requireAuth, async (req, res) => {
    try {
      const { role, priority, status } = req.query;
      let approvals = HumanApprovalService.generateRoleSpecificApprovals();
      
      // Filter by role if specified
      if (role) {
        approvals = approvals.filter(approval => approval.assignedRole === role);
      }
      
      // Filter by priority if specified
      if (priority) {
        approvals = approvals.filter(approval => approval.priority === priority);
      }
      
      // Filter by status if specified
      if (status) {
        approvals = approvals.filter(approval => approval.status === status);
      }
      
      res.json(approvals);
    } catch (error) {
      console.error('Error fetching human approvals:', error);
      res.status(500).json({ message: "Failed to fetch approval requests" });
    }
  });

  // Get approval requests for a specific role
  app.get("/api/human-approvals/role/:roleName", requireAuth, async (req, res) => {
    try {
      const roleName = req.params.roleName;
      const approvals = HumanApprovalService.getApprovalsByRole(roleName);
      res.json(approvals);
    } catch (error) {
      console.error('Error fetching role-specific approvals:', error);
      res.status(500).json({ message: "Failed to fetch role-specific approvals" });
    }
  });

  // Get high priority pending approvals
  app.get("/api/human-approvals/high-priority", requireAuth, async (req, res) => {
    try {
      const highPriorityApprovals = HumanApprovalService.getHighPriorityApprovals();
      res.json(highPriorityApprovals);
    } catch (error) {
      console.error('Error fetching high priority approvals:', error);
      res.status(500).json({ message: "Failed to fetch high priority approvals" });
    }
  });

  // Process approval decision (approve/reject)
  app.post("/api/human-approvals/:approvalId/decision", requireAuth, async (req, res) => {
    try {
      const approvalId = req.params.approvalId;
      const { decision, notes, approverUser } = req.body;
      
      if (!decision || !['approved', 'rejected'].includes(decision)) {
        return res.status(400).json({ message: "Invalid decision. Must be 'approved' or 'rejected'" });
      }
      
      // Process the approval decision and generate system activity
      const systemActivity = HumanApprovalService.processApprovalDecision(
        approvalId,
        decision,
        approverUser || 'unknown_user',
        notes
      );
      
      // In a real system, you would:
      // 1. Store the approval decision in the database
      // 2. Notify the requesting AI agent
      // 3. Update the system activity feed
      // 4. Trigger any follow-up actions
      
      res.json({
        success: true,
        approvalId,
        decision,
        systemActivity,
        message: `Approval ${decision} successfully recorded`
      });
    } catch (error) {
      console.error('Error processing approval decision:', error);
      res.status(500).json({ message: "Failed to process approval decision" });
    }
  });

  // Get approval statistics for dashboards
  app.get("/api/human-approvals/stats", requireAuth, async (req, res) => {
    try {
      const allApprovals = HumanApprovalService.generateRoleSpecificApprovals();
      
      const stats = {
        totalApprovals: allApprovals.length,
        pendingApprovals: allApprovals.filter(a => a.status === 'pending').length,
        approvedCount: allApprovals.filter(a => a.status === 'approved').length,
        rejectedCount: allApprovals.filter(a => a.status === 'rejected').length,
        highPriorityCount: allApprovals.filter(a => a.priority === 'high' || a.priority === 'critical').length,
        averageValue: allApprovals.reduce((sum, a) => sum + (a.estimatedValue || 0), 0) / allApprovals.length,
        byCategory: {
          executive: allApprovals.filter(a => a.category === 'executive').length,
          operational: allApprovals.filter(a => a.category === 'operational').length,
          financial: allApprovals.filter(a => a.category === 'financial').length,
          recruitment: allApprovals.filter(a => a.category === 'recruitment').length,
          quality: allApprovals.filter(a => a.category === 'quality').length,
          analytics: allApprovals.filter(a => a.category === 'analytics').length,
          partnership: allApprovals.filter(a => a.category === 'partnership').length
        }
      };
      
      res.json(stats);
    } catch (error) {
      console.error('Error fetching approval stats:', error);
      res.status(500).json({ message: "Failed to fetch approval statistics" });
    }
  });

  // Get approval workflow for a specific agent
  app.get("/api/human-approvals/agent/:agentId", requireAuth, async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const allApprovals = HumanApprovalService.generateRoleSpecificApprovals();
      const agentApprovals = allApprovals.filter(approval => approval.requestingAgent === agentId);
      
      res.json(agentApprovals);
    } catch (error) {
      console.error('Error fetching agent approvals:', error);
      res.status(500).json({ message: "Failed to fetch agent-specific approvals" });
    }
  });

  // ==================== BUSINESS FUNCTION LEADERS API ====================
  
  // Get all business function leaders for an executive
  app.get("/api/business-function-leaders", requireAuth, async (req, res) => {
    try {
      const { executiveLevel } = req.query;
      const leaders = await storage.getBusinessFunctionLeaders(executiveLevel as string);
      res.json(leaders);
    } catch (error) {
      console.error('Error fetching business function leaders:', error);
      res.status(500).json({ message: "Failed to fetch business function leaders" });
    }
  });

  // Get specific business function leader
  app.get("/api/business-function-leaders/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const leader = await storage.getBusinessFunctionLeader(id);
      if (!leader) {
        return res.status(404).json({ message: "Business function leader not found" });
      }
      res.json(leader);
    } catch (error) {
      console.error('Error fetching business function leader:', error);
      res.status(500).json({ message: "Failed to fetch business function leader" });
    }
  });

  // Create new business function leader
  app.post("/api/business-function-leaders", requireAuth, async (req, res) => {
    try {
      const leaderData = req.body;
      // Add the executive who created this leader
      leaderData.createdBy = req.user?.id || 'admin_001';
      
      const leader = await storage.createBusinessFunctionLeader(leaderData);
      res.status(201).json(leader);
    } catch (error) {
      console.error('Error creating business function leader:', error);
      res.status(500).json({ message: "Failed to create business function leader" });
    }
  });

  // Update business function leader
  app.put("/api/business-function-leaders/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const leader = await storage.updateBusinessFunctionLeader(id, updates);
      if (!leader) {
        return res.status(404).json({ message: "Business function leader not found" });
      }
      res.json(leader);
    } catch (error) {
      console.error('Error updating business function leader:', error);
      res.status(500).json({ message: "Failed to update business function leader" });
    }
  });

  // Delete business function leader
  app.delete("/api/business-function-leaders/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBusinessFunctionLeader(id);
      if (!success) {
        return res.status(404).json({ message: "Business function leader not found" });
      }
      res.json({ message: "Business function leader deleted successfully" });
    } catch (error) {
      console.error('Error deleting business function leader:', error);
      res.status(500).json({ message: "Failed to delete business function leader" });
    }
  });

  // Get business function leader templates by executive level
  app.get("/api/business-function-templates/:executiveLevel", requireAuth, async (req, res) => {
    try {
      const { executiveLevel } = req.params;
      const templates = await storage.getBusinessFunctionLeaderTemplates(executiveLevel);
      res.json(templates);
    } catch (error) {
      console.error('Error fetching business function templates:', error);
      res.status(500).json({ message: "Failed to fetch business function templates" });
    }
  });

  // Get tasks for a specific business function leader
  app.get("/api/business-function-leaders/:id/tasks", requireAuth, async (req, res) => {
    try {
      const leaderId = parseInt(req.params.id);
      const { dayOfWeek } = req.query;
      const tasks = await storage.getBusinessFunctionTasks(leaderId, dayOfWeek as string);
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching business function tasks:', error);
      res.status(500).json({ message: "Failed to fetch business function tasks" });
    }
  });

  // Update task for business function leader
  app.put("/api/business-function-tasks/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const task = await storage.updateBusinessFunctionTask(id, updates);
      if (!task) {
        return res.status(404).json({ message: "Business function task not found" });
      }
      res.json(task);
    } catch (error) {
      console.error('Error updating business function task:', error);
      res.status(500).json({ message: "Failed to update business function task" });
    }
  });

  // ==================== BUSINESS FUNCTION LEADERS API ROUTES ====================
  
  // Get all business function leaders, optionally filtered by executive level
  app.get("/api/business-function-leaders", requireAuth, async (req, res) => {
    try {
      const { executiveLevel } = req.query;
      const leaders = await storage.getBusinessFunctionLeaders(executiveLevel as string);
      res.json(leaders);
    } catch (error) {
      console.error('Error fetching business function leaders:', error);
      res.status(500).json({ message: "Failed to fetch business function leaders" });
    }
  });

  // Get a specific business function leader by ID
  app.get("/api/business-function-leaders/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const leader = await storage.getBusinessFunctionLeader(id);
      
      if (!leader) {
        return res.status(404).json({ message: "Business function leader not found" });
      }
      
      res.json(leader);
    } catch (error) {
      console.error('Error fetching business function leader:', error);
      res.status(500).json({ message: "Failed to fetch business function leader" });
    }
  });

  // Create a new business function leader
  app.post("/api/business-function-leaders", requireAuth, async (req, res) => {
    try {
      const { name, title, department, executiveLevel, responsibleAgents, kpis, objectives } = req.body;
      
      if (!name || !title || !department || !executiveLevel) {
        return res.status(400).json({ message: "Missing required fields: name, title, department, executiveLevel" });
      }
      
      const leader = await storage.createBusinessFunctionLeader({
        name,
        title,
        department,
        executiveLevel,
        responsibleAgents: responsibleAgents || [],
        kpis: kpis || [],
        objectives: objectives || [],
        weeklyOperations: {},
        isActive: true,
        createdBy: req.user?.name || 'system'
      });
      
      res.status(201).json(leader);
    } catch (error) {
      console.error('Error creating business function leader:', error);
      res.status(500).json({ message: "Failed to create business function leader" });
    }
  });

  // Update a business function leader
  app.put("/api/business-function-leaders/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const updatedLeader = await storage.updateBusinessFunctionLeader(id, updates);
      
      if (!updatedLeader) {
        return res.status(404).json({ message: "Business function leader not found" });
      }
      
      res.json(updatedLeader);
    } catch (error) {
      console.error('Error updating business function leader:', error);
      res.status(500).json({ message: "Failed to update business function leader" });
    }
  });

  // Delete a business function leader
  app.delete("/api/business-function-leaders/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBusinessFunctionLeader(id);
      
      if (!success) {
        return res.status(404).json({ message: "Business function leader not found" });
      }
      
      res.json({ message: "Business function leader deleted successfully" });
    } catch (error) {
      console.error('Error deleting business function leader:', error);
      res.status(500).json({ message: "Failed to delete business function leader" });
    }
  });

  // Get templates for creating business function leaders
  app.get("/api/business-function-templates/:executiveLevel", requireAuth, async (req, res) => {
    try {
      const { executiveLevel } = req.params;
      const templates = await storage.getBusinessFunctionLeaderTemplates(executiveLevel);
      res.json(templates);
    } catch (error) {
      console.error('Error fetching business function templates:', error);
      res.status(500).json({ message: "Failed to fetch business function templates" });
    }
  });

  // Get tasks for a business function leader
  app.get("/api/business-function-leaders/:id/tasks", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { dayOfWeek } = req.query;
      const tasks = await storage.getBusinessFunctionTasks(id, dayOfWeek as string);
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching business function tasks:', error);
      res.status(500).json({ message: "Failed to fetch business function tasks" });
    }
  });

  // Update a business function task
  app.put("/api/business-function-tasks/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const updatedTask = await storage.updateBusinessFunctionTask(id, updates);
      
      if (!updatedTask) {
        return res.status(404).json({ message: "Business function task not found" });
      }
      
      res.json(updatedTask);
    } catch (error) {
      console.error('Error updating business function task:', error);
      res.status(500).json({ message: "Failed to update business function task" });
    }
  });

  // Magik Button Analytics Routes
  app.get("/api/magik-button/technician-stats", async (req, res) => {
    try {
      const { timeRange, category } = req.query;
      const stats = generateMagikButtonTechnicianStats(timeRange as string, category as string);
      res.json(stats);
    } catch (error) {
      console.error('Magik Button technician stats error:', error);
      res.status(500).json({ message: "Failed to fetch technician stats" });
    }
  });

  app.get("/api/magik-button/usecase-stats", async (req, res) => {
    try {
      const { timeRange, category } = req.query;
      const stats = generateMagikButtonUseCaseStats(timeRange as string, category as string);
      res.json(stats);
    } catch (error) {
      console.error('Magik Button use case stats error:', error);
      res.status(500).json({ message: "Failed to fetch use case stats" });
    }
  });

  app.get("/api/magik-button/usage-data", async (req, res) => {
    try {
      const { technicianId, timeRange, category } = req.query;
      const data = generateMagikButtonUsageData(technicianId as string, timeRange as string, category as string);
      res.json(data);
    } catch (error) {
      console.error('Magik Button usage data error:', error);
      res.status(500).json({ message: "Failed to fetch usage data" });
    }
  });

// Magik Button Analytics Data Generation Functions
function generateMagikButtonTechnicianStats(timeRange?: string, category?: string) {
  const technicians = [
    'OGOMEZ1', 'JSMITH2', 'MWIL3', 'RDAVIS4', 'SCLARK5', 'TJOHN6', 'ABROWN7', 'DMILLER8', 'KWILSON9', 'LGARCIA10',
    'RMARTINEZ11', 'CANDERSON12', 'JTHOMAS13', 'PJACKSON14', 'NWHITE15', 'BHARRIS16', 'ZMARTIN17', 'KTHOMPSON18', 'RLEE19', 'SWALK20'
  ];

  const useCases = [
    { id: '1', title: 'Customer wants to add more work', category: 'Service Delivery' },
    { id: '2', title: 'Need immediate parts order', category: 'Parts Management' },
    { id: '3', title: 'Schedule follow-up appointment', category: 'Scheduling' },
    { id: '4', title: 'Customer perspective self-rating', category: 'Quality Assurance' },
    { id: '5', title: 'Get recall prevention tips', category: 'Quality Assurance' },
    { id: '6', title: 'Prevent third attempt failures', category: 'Quality Assurance' },
    { id: '7', title: 'Emergency dispatch needed', category: 'Communication' },
    { id: '8', title: 'Submit expense report', category: 'Administrative' },
    { id: '9', title: 'Request skill certification', category: 'Personal Development' },
    { id: '10', title: 'Report safety concern', category: 'Communication' }
  ];

  return technicians.map(techId => {
    const name = `${techId.replace(/\d/g, '')} ${techId}`;
    const totalUsage = Math.floor(Math.random() * 150) + 50;
    const inboundRatio = 0.6 + Math.random() * 0.3; // 60-90% inbound
    const inboundUsage = Math.floor(totalUsage * inboundRatio);
    const outboundUsage = totalUsage - inboundUsage;

    const topUseCases = useCases
      .filter(uc => !category || category === 'all' || uc.category === category)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
      .map(uc => ({
        useCaseId: uc.id,
        title: uc.title,
        count: Math.floor(Math.random() * 20) + 5,
        category: uc.category
      }));

    return {
      technicianId: techId,
      technicianName: name,
      totalUsage,
      inboundUsage,
      outboundUsage,
      topUseCases,
      avgSuccessRate: Math.floor(Math.random() * 15) + 85, // 85-100%
      avgResponseTime: Math.round((Math.random() * 2 + 1) * 10) / 10, // 1.0-3.0s
      lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    };
  });
}

function generateMagikButtonUseCaseStats(timeRange?: string, category?: string) {
  const useCases = [
    { id: '1', title: 'Customer wants to add more work', category: 'Service Delivery' },
    { id: '2', title: 'Need immediate parts order', category: 'Parts Management' },
    { id: '3', title: 'Schedule follow-up appointment', category: 'Scheduling' },
    { id: '4', title: 'Update service notes', category: 'Communication' },
    { id: '5', title: 'Request technical support', category: 'Communication' },
    { id: '6', title: 'Submit timesheet', category: 'Administrative' },
    { id: '7', title: 'Emergency dispatch needed', category: 'Communication' },
    { id: '8', title: 'Customer perspective self-rating', category: 'Quality Assurance' },
    { id: '9', title: 'Get recall prevention tips', category: 'Quality Assurance' },
    { id: '10', title: 'Prevent third attempt failures', category: 'Quality Assurance' },
    { id: '11', title: 'Access diagnostic guides', category: 'Technical Resources' },
    { id: '12', title: 'Report safety concern', category: 'Communication' }
  ];

  const technicians = ['OGOMEZ1', 'JSMITH2', 'MWIL3', 'RDAVIS4', 'SCLARK5'];

  return useCases
    .filter(uc => !category || category === 'all' || uc.category === category)
    .map(uc => {
      const totalTriggers = Math.floor(Math.random() * 500) + 100;
      const inboundRatio = 0.4 + Math.random() * 0.4; // 40-80% inbound
      const inboundTriggers = Math.floor(totalTriggers * inboundRatio);
      const outboundTriggers = totalTriggers - inboundTriggers;

      const topTechnicians = technicians
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map(techId => ({
          technicianId: techId,
          name: `${techId.replace(/\d/g, '')} ${techId}`,
          count: Math.floor(Math.random() * 50) + 10
        }));

      return {
        useCaseId: uc.id,
        title: uc.title,
        category: uc.category,
        totalTriggers,
        inboundTriggers,
        outboundTriggers,
        uniqueTechnicians: Math.floor(Math.random() * 15) + 5,
        avgSuccessRate: Math.floor(Math.random() * 15) + 85,
        avgResponseTime: Math.round((Math.random() * 2 + 1) * 10) / 10,
        topTechnicians
      };
    })
    .sort((a, b) => b.totalTriggers - a.totalTriggers);
}

function generateMagikButtonUsageData(technicianId?: string, timeRange?: string, category?: string) {
  const useCases = [
    { id: '1', title: 'Customer wants to add more work', category: 'Service Delivery' },
    { id: '2', title: 'Need immediate parts order', category: 'Parts Management' },
    { id: '3', title: 'Schedule follow-up appointment', category: 'Scheduling' },
    { id: '4', title: 'Customer perspective self-rating', category: 'Quality Assurance' },
    { id: '5', title: 'Get recall prevention tips', category: 'Quality Assurance' },
    { id: '6', title: 'Prevent third attempt failures', category: 'Quality Assurance' }
  ];

  const technicians = technicianId === 'all' ? 
    ['OGOMEZ1', 'JSMITH2', 'MWIL3', 'RDAVIS4', 'SCLARK5'] : 
    [technicianId || 'OGOMEZ1'];

  const usageData = [];
  const days = timeRange === '1d' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;

  for (let day = 0; day < days; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);

    technicians.forEach(techId => {
      const name = `${techId.replace(/\d/g, '')} ${techId}`;
      const dailyUsage = Math.floor(Math.random() * 8) + 2; // 2-10 uses per day

      for (let i = 0; i < dailyUsage; i++) {
        const useCase = useCases[Math.floor(Math.random() * useCases.length)];
        if (category && category !== 'all' && useCase.category !== category) continue;

        const timestamp = new Date(date);
        timestamp.setHours(8 + Math.floor(Math.random() * 10)); // 8am-6pm
        timestamp.setMinutes(Math.floor(Math.random() * 60));

        usageData.push({
          technicianId: techId,
          technicianName: name,
          useCaseId: useCase.id,
          useCaseTitle: useCase.title,
          category: useCase.category,
          triggerType: Math.random() > 0.6 ? 'inbound' : 'outbound',
          successRate: Math.floor(Math.random() * 15) + 85,
          responseTime: Math.round((Math.random() * 2 + 1) * 10) / 10,
          location: `Planning Area ${Math.floor(Math.random() * 20) + 1}`,
          timestamp: timestamp.toISOString()
        });
      }
    });
  }

  return usageData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

  // =============================================================================
  // MAGIK BUTTON DYNAMIC TEMPLATE SYSTEM API ROUTES  
  // =============================================================================

  // Get all Magik Button templates
  app.get("/api/magik-button/templates", async (req, res) => {
    try {
      const category = req.query.category as string;
      const templates = await storage.getMagikButtonTemplates(category);
      res.json(templates);
    } catch (error) {
      console.error("Error fetching Magik Button templates:", error);
      res.status(500).json({ message: "Failed to fetch templates" });
    }
  });

  // Create new Magik Button template
  app.post("/api/magik-button/templates", async (req, res) => {
    try {
      const newTemplate = await storage.createMagikButtonTemplate(req.body);
      res.status(201).json(newTemplate);
    } catch (error) {
      console.error("Error creating Magik Button template:", error);
      res.status(400).json({ message: "Invalid template data" });
    }
  });

  // Get capability requests
  app.get("/api/magik-button/capability-requests", async (req, res) => {
    try {
      const status = req.query.status as string;
      const category = req.query.category as string;
      const requests = await storage.getTechnicianCapabilityRequests(status, category);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching capability requests:", error);
      res.status(500).json({ message: "Failed to fetch requests" });
    }
  });

  // Create capability request
  app.post("/api/magik-button/capability-requests", async (req, res) => {
    try {
      const newRequest = await storage.createTechnicianCapabilityRequest(req.body);
      res.status(201).json(newRequest);
    } catch (error) {
      console.error("Error creating capability request:", error);
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Get individual template
  app.get("/api/magik-button/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const template = await storage.getMagikButtonTemplate(id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      console.error("Error fetching template:", error);
      res.status(500).json({ message: "Failed to fetch template" });
    }
  });

  // Update template
  app.put("/api/magik-button/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedTemplate = await storage.updateMagikButtonTemplate(id, req.body);
      if (!updatedTemplate) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json(updatedTemplate);
    } catch (error) {
      console.error("Error updating template:", error);
      res.status(400).json({ message: "Invalid template data" });
    }
  });

  // Delete template
  app.delete("/api/magik-button/templates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMagikButtonTemplate(id);
      if (!deleted) {
        return res.status(404).json({ message: "Template not found" });
      }
      res.json({ message: "Template deleted successfully" });
    } catch (error) {
      console.error("Error deleting template:", error);
      res.status(500).json({ message: "Failed to delete template" });
    }
  });

  // Get implementation instructions for a template
  app.get("/api/magik-button/templates/:id/implementation", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const template = await storage.getMagikButtonTemplate(id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      
      const instructions = {
        magikButtonIntegration: {
          title: "Magik Button Integration",
          steps: [
            "Navigate to the Magik Button configuration panel",
            `Add trigger phrase: "${template.triggerPhrase}"`,
            "Configure AI agent mappings for: " + template.aiAgents.join(", "),
            "Set up automated response template",
            "Configure required data fields: " + template.requiredFields.join(", "),
            "Test trigger phrase activation",
            "Deploy to production environment"
          ],
          estimatedTime: "30-45 minutes",
          technicalRequirements: [
            "Access to Magik Button admin panel",
            "AI agent configuration permissions",
            "Testing environment access"
          ]
        },
        techHubIntegration: {
          title: "Tech Hub Integration", 
          steps: [
            "Access Tech Hub admin interface",
            "Create new workflow automation",
            "Map template automation steps to Tech Hub processes",
            "Configure data integration points",
            "Set up success metrics tracking",
            "Test workflow execution",
            "Train technicians on new capability",
            "Monitor usage and performance"
          ],
          estimatedTime: "60-90 minutes",
          technicalRequirements: [
            "Tech Hub admin access",
            "Workflow configuration permissions",
            "Integration API access",
            "Training materials preparation"
          ]
        },
        deploymentChecklist: [
          "Verify all required AI agents are active",
          "Test trigger phrase recognition",
          "Validate data field collection",
          "Confirm automation step execution",
          "Check success metrics reporting",
          "Ensure proper error handling",
          "Verify technician notification system",
          "Test rollback procedures"
        ]
      };
      
      res.json(instructions);
    } catch (error) {
      console.error("Error generating implementation instructions:", error);
      res.status(500).json({ message: "Failed to generate instructions" });
    }
  });

  // Get analytics
  app.get("/api/magik-button/analytics", async (req, res) => {
    try {
      const templates = await storage.getMagikButtonTemplates();
      const requests = await storage.getTechnicianCapabilityRequests();
      
      const analytics = {
        totalTemplates: templates.length,
        totalUsages: templates.reduce((sum, template) => sum + (template.usageCount || 0), 0),
        totalTimeSaved: templates.reduce((sum, template) => sum + (template.estimatedTimeSavings || 0), 0),
        averageRating: templates.length > 0 ? 
          templates.reduce((sum, template) => sum + (template.rating || 4.5), 0) / templates.length : 0,
        pendingRequests: requests.filter(req => req.status === 'pending').length,
        approvedRequests: requests.filter(req => req.status === 'approved').length
      };
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  
  // Initialize WebSocket server for collaboration
  const { CollaborationWebSocketServer } = await import("./websocket-server");
  const wsServer = new CollaborationWebSocketServer(httpServer);
  console.log('Collaboration WebSocket server initialized on /ws/collaboration');
  
  // Initialize AHS Streaming Service
  const ahsStreamingService = initializeAhsStreaming(httpServer);
  console.log('AHS Streaming Service initialized on /ws/ahs-stream');

  return httpServer;
}
