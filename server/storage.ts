import { 
  Agent, 
  InsertAgent, 
  Evaluation, 
  InsertEvaluation, 
  Feedback, 
  InsertFeedback, 
  PerformanceMetric, 
  InsertPerformanceMetric,
  EvaluationTemplate,
  InsertEvaluationTemplate,
  AgentMaturity,
  InsertAgentMaturity,
  DynamicEvaluation,
  InsertDynamicEvaluation,
  AgentDataFeedback,
  InsertAgentDataFeedback,
  ImprovementAction,
  InsertImprovementAction,
  AgentDailyGoal,
  InsertAgentDailyGoal,
  AgentHourlyPerformance,
  InsertAgentHourlyPerformance,
  AgentDailyPerformance,
  InsertAgentDailyPerformance,
  AgentSelfEvaluation,
  InsertAgentSelfEvaluation,
  GoalAchievement,
  InsertGoalAchievement,
  AgentPerformanceTrend,
  InsertAgentPerformanceTrend,
  PerformanceAlert,
  InsertPerformanceAlert,
  AlertTrigger,
  InsertAlertTrigger,
  AlertNotification,
  InsertAlertNotification,
  HOAProspect,
  InsertHOAProspect,
  HOAProspectStrategy,
  InsertHOAProspectStrategy,
  HOAProspectActivity,
  InsertHOAProspectActivity,
  ContractorRecruitment,
  InsertContractorRecruitment,
  RecruitmentActivity,
  InsertRecruitmentActivity,
  RecruitmentTarget,
  InsertRecruitmentTarget,
  FirmTechnician,
  InsertFirmTechnician,
  User,
  InsertUser,
  UserSession,
  InsertUserSession,
  UserActivityLog,
  InsertUserActivityLog,
  AgentCredentials,
  InsertAgentCredentials,
  AhsAreaManager,
  InsertAhsAreaManager,
  AhsGpeMetric,
  InsertAhsGpeMetric,
  AhsCustomerRating,
  InsertAhsCustomerRating,
  AhsWeeklyReport,
  InsertAhsWeeklyReport,
  AhsAreaManagerInteraction,
  InsertAhsAreaManagerInteraction,
  BusinessFunctionLeader,
  InsertBusinessFunctionLeader,
  BusinessFunctionTask,
  InsertBusinessFunctionTask,
  magikButtonUsage
} from "@shared/schema";

import { generateId } from './utils';
import { format, subDays } from 'date-fns';
import { userManagementService } from './user-management-service';

interface HistoricalMetric {
  id: number;
  date: string;
  time?: string;
  period: string;
  totalAgents: number;
  activeAgents: number;
  avgPerformance: number;
  totalRevenue: number;
  totalCost: number;
  profitMargin: number;
  customerSatisfaction: number;
  callVolume: number;
  conversionRate: number;
  techniciansDeployed: number;
  activeJobs: number;
  openOrders: number;
  planningArea?: string;
  productType?: string;
  callType?: string;
  jobCode?: string;
  orderStatuses?: {
    waitingService: number;
    waitingParts: number;
    rescheduleNeeded: number;
    assignedToday: number;
    tentative: number;
  };
  additionalMetrics?: Record<string, any>;
}

interface AgentPerformanceHistory {
  id: number;
  agentId: number;
  date: string;
  time?: string;
  performance: number;
  interactions: number;
  successRate: number;
  averageResponseTime: number;
  errorCount: number;
  userSatisfaction?: number;
  revenueGenerated?: number;
  costIncurred?: number;
  planningArea?: string;
  contextData?: Record<string, any>;
}

export interface IStorage {
  // Agents
  getAgents(): Promise<Agent[]>;
  getAgent(id: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: number, agent: Partial<InsertAgent>): Promise<Agent | undefined>;
  deleteAgent(id: number): Promise<boolean>;
  
  // Evaluations
  getEvaluations(agentId?: number): Promise<Evaluation[]>;
  createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  
  // Feedback
  getFeedback(agentId?: number): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  
  // Performance Metrics
  getPerformanceMetrics(agentId?: number): Promise<PerformanceMetric[]>;
  createPerformanceMetric(metric: InsertPerformanceMetric): Promise<PerformanceMetric>;
  
  // Dashboard Stats
  getDashboardStats(): Promise<{
    totalAgents: number;
    activeAgents: number;
    avgPerformance: number;
    monthlyCost: number;
    totalRevenue: number;
  }>;

  // Dynamic Evaluation System
  getEvaluationTemplates(agentType?: string, maturityLevel?: string): Promise<EvaluationTemplate[]>;
  createEvaluationTemplate(template: InsertEvaluationTemplate): Promise<EvaluationTemplate>;
  updateEvaluationTemplate(id: number, template: Partial<InsertEvaluationTemplate>): Promise<EvaluationTemplate | undefined>;
  
  // Agent Maturity
  getAgentMaturity(agentId: number): Promise<AgentMaturity | undefined>;
  updateAgentMaturity(agentId: number, maturity: Partial<InsertAgentMaturity>): Promise<AgentMaturity>;
  
  // Dynamic Evaluations
  getDynamicEvaluations(agentId?: number): Promise<DynamicEvaluation[]>;
  createDynamicEvaluation(evaluation: InsertDynamicEvaluation): Promise<DynamicEvaluation>;
  
  // Agent Data Feedback
  getAgentDataFeedback(agentId?: number, status?: string): Promise<AgentDataFeedback[]>;
  createAgentDataFeedback(feedback: InsertAgentDataFeedback): Promise<AgentDataFeedback>;
  updateAgentDataFeedback(id: number, feedback: Partial<InsertAgentDataFeedback>): Promise<AgentDataFeedback | undefined>;
  
  // Improvement Actions
  getImprovementActions(agentId?: number, status?: string): Promise<ImprovementAction[]>;
  createImprovementAction(action: InsertImprovementAction): Promise<ImprovementAction>;
  updateImprovementAction(id: number, action: Partial<InsertImprovementAction>): Promise<ImprovementAction | undefined>;

  // Daily and intra-day performance operations
  getAgentDailyGoals(agentId: number, date?: string): Promise<AgentDailyGoal[]>;
  createAgentDailyGoal(goal: InsertAgentDailyGoal): Promise<AgentDailyGoal>;
  getAgentHourlyPerformance(agentId: number, date?: string): Promise<AgentHourlyPerformance[]>;
  createAgentHourlyPerformance(performance: InsertAgentHourlyPerformance): Promise<AgentHourlyPerformance>;
  getAgentDailyPerformance(agentId: number, startDate?: string, endDate?: string): Promise<AgentDailyPerformance[]>;
  createAgentDailyPerformance(performance: InsertAgentDailyPerformance): Promise<AgentDailyPerformance>;
  getAgentSelfEvaluations(agentId: number, date?: string, type?: string): Promise<AgentSelfEvaluation[]>;
  createAgentSelfEvaluation(evaluation: InsertAgentSelfEvaluation): Promise<AgentSelfEvaluation>;
  getGoalAchievements(agentId: number, goalId?: number): Promise<GoalAchievement[]>;
  createGoalAchievement(achievement: InsertGoalAchievement): Promise<GoalAchievement>;
  getAgentPerformanceTrends(agentId: number, metric?: string): Promise<AgentPerformanceTrend[]>;

  // Performance Alert System
  getPerformanceAlerts(agentId?: number): Promise<PerformanceAlert[]>;
  createPerformanceAlert(alert: InsertPerformanceAlert): Promise<PerformanceAlert>;
  updatePerformanceAlert(id: number, alert: Partial<InsertPerformanceAlert>): Promise<PerformanceAlert | undefined>;
  deletePerformanceAlert(id: number): Promise<boolean>;
  
  // Alert Triggers
  getAlertTriggers(alertId?: number, agentId?: number): Promise<AlertTrigger[]>;
  createAlertTrigger(trigger: InsertAlertTrigger): Promise<AlertTrigger>;
  acknowledgeAlertTrigger(triggerId: number, acknowledgedBy: string, notes?: string): Promise<AlertTrigger | undefined>;
  resolveAlertTrigger(triggerId: number, notes?: string): Promise<AlertTrigger | undefined>;
  
  // Alert Notifications  
  getAlertNotifications(triggerId?: number): Promise<AlertNotification[]>;
  createAlertNotification(notification: InsertAlertNotification): Promise<AlertNotification>;
  
  // Alert Monitoring
  checkAlertConditions(agentId: number): Promise<AlertTrigger[]>;
  
  // Historical Data Methods
  getHistoricalMetrics(dateRange?: { from: string; to: string }, period?: string, filters?: {
    planningArea?: string;
    productType?: string;
    callType?: string;
    jobCode?: string;
  }): Promise<HistoricalMetric[]>;
  createHistoricalMetric(metric: Omit<HistoricalMetric, 'id'>): Promise<HistoricalMetric>;
  getAgentPerformanceHistory(agentId?: number, dateRange?: { from: string; to: string }, filters?: {
    planningArea?: string;
    productType?: string;
    callType?: string;
    jobCode?: string;
  }): Promise<AgentPerformanceHistory[]>;
  createAgentPerformanceHistory(history: Omit<AgentPerformanceHistory, 'id'>): Promise<AgentPerformanceHistory>;
  getHistoricalFilterOptions(): Promise<{
    planningAreas: string[];
    productTypes: string[];
    callTypes: string[];
    jobCodes: string[];
  }>;

  // Authentication methods
  getUserByUsername(username: string): Promise<(User & { permissions: string[] }) | undefined>;
  getUserByToken(token: string): Promise<(User & { permissions: string[] }) | undefined>;
  createUser(user: InsertUser): Promise<User & { permissions: string[] }>;
  getAllUsers(): Promise<(User & { permissions: string[] })[]>;
  updateUser(id: string, userData: Partial<InsertUser>): Promise<(User & { permissions: string[] }) | undefined>;

  // AHS Area Manager System
  getAhsAreaManagers(): Promise<AhsAreaManager[]>;
  getAhsAreaManager(managerId: string): Promise<AhsAreaManager | undefined>;
  createAhsAreaManager(manager: InsertAhsAreaManager): Promise<AhsAreaManager>;
  updateAhsAreaManager(managerId: string, updates: Partial<InsertAhsAreaManager>): Promise<AhsAreaManager | undefined>;
  
  // AHS GPE Metrics
  getAhsGpeMetrics(managerId?: string, dateRange?: { from: string; to: string }): Promise<AhsGpeMetric[]>;
  createAhsGpeMetric(metric: InsertAhsGpeMetric): Promise<AhsGpeMetric>;
  getAhsGpePerformanceSummary(managerId: string): Promise<{
    avgGpeRatio: number;
    performanceTier: string;
    tierCounts: { platinum: number; gold: number; silver: number; bronze: number };
    totalCompletes: number;
    trendDirection: 'up' | 'down' | 'stable';
  }>;
  
  // AHS Customer Ratings
  getAhsCustomerRatings(managerId?: string, dateRange?: { from: string; to: string }): Promise<AhsCustomerRating[]>;
  createAhsCustomerRating(rating: InsertAhsCustomerRating): Promise<AhsCustomerRating>;
  getAhsRatingSummary(managerId: string): Promise<{
    avgCustomerRating: number;
    adjustedAvgRating: number;
    responseRate: number;
    ratingTrend: 'improving' | 'declining' | 'stable';
    biasAdjustment: number;
  }>;
  
  // AHS Weekly Reports
  getAhsWeeklyReports(managerId?: string, limit?: number): Promise<AhsWeeklyReport[]>;
  createAhsWeeklyReport(report: InsertAhsWeeklyReport): Promise<AhsWeeklyReport>;
  generateWeeklyReport(managerId: string): Promise<AhsWeeklyReport>;
  
  // AHS Area Manager Interactions
  getAhsManagerInteractions(managerId?: string, interactionType?: string): Promise<AhsAreaManagerInteraction[]>;
  createAhsManagerInteraction(interaction: InsertAhsAreaManagerInteraction): Promise<AhsAreaManagerInteraction>;
  updateAhsManagerInteraction(id: number, updates: Partial<InsertAhsAreaManagerInteraction>): Promise<AhsAreaManagerInteraction | undefined>;
  deleteUser(id: string): Promise<boolean>;

  // HOA Prospect Management
  getHOAProspects(status?: string, priority?: string): Promise<HOAProspect[]>;
  getHOAProspect(id: number): Promise<HOAProspect | undefined>;
  createHOAProspect(prospect: InsertHOAProspect): Promise<HOAProspect>;
  updateHOAProspect(id: number, prospect: Partial<InsertHOAProspect>): Promise<HOAProspect | undefined>;
  deleteHOAProspect(id: number): Promise<boolean>;
  
  // HOA Prospect Strategies
  getHOAProspectStrategies(prospectId?: number, status?: string): Promise<HOAProspectStrategy[]>;
  getHOAProspectStrategy(id: number): Promise<HOAProspectStrategy | undefined>;
  createHOAProspectStrategy(strategy: InsertHOAProspectStrategy): Promise<HOAProspectStrategy>;
  updateHOAProspectStrategy(id: number, strategy: Partial<InsertHOAProspectStrategy>): Promise<HOAProspectStrategy | undefined>;
  deleteHOAProspectStrategy(id: number): Promise<boolean>;
  
  // HOA Prospect Activities
  getHOAProspectActivities(prospectId?: number, strategyId?: number): Promise<HOAProspectActivity[]>;
  createHOAProspectActivity(activity: InsertHOAProspectActivity): Promise<HOAProspectActivity>;

  // Business Function Leaders
  getBusinessFunctionLeaders(executiveLevel?: string): Promise<BusinessFunctionLeader[]>;
  getBusinessFunctionLeader(id: number): Promise<BusinessFunctionLeader | undefined>;
  createBusinessFunctionLeader(leader: InsertBusinessFunctionLeader): Promise<BusinessFunctionLeader>;
  updateBusinessFunctionLeader(id: number, updates: Partial<InsertBusinessFunctionLeader>): Promise<BusinessFunctionLeader | undefined>;
  deleteBusinessFunctionLeader(id: number): Promise<boolean>;
  getBusinessFunctionLeaderTemplates(executiveLevel: string): Promise<any[]>;
  getBusinessFunctionTasks(leaderId: number, dayOfWeek?: string): Promise<BusinessFunctionTask[]>;
  updateBusinessFunctionTask(id: number, updates: Partial<InsertBusinessFunctionTask>): Promise<BusinessFunctionTask | undefined>;

  // 1099 Contractor Recruitment
  getContractorRecruitments(filters?: {
    planningArea?: string;
    recruitmentStatus?: string;
    serviceSkills?: string[];
    productSpecialties?: string[];
  }): Promise<ContractorRecruitment[]>;
  getContractorRecruitment(id: number): Promise<ContractorRecruitment | undefined>;
  createContractorRecruitment(contractor: InsertContractorRecruitment): Promise<ContractorRecruitment>;
  updateContractorRecruitment(id: number, updates: Partial<InsertContractorRecruitment>): Promise<ContractorRecruitment>;
  deleteContractorRecruitment(id: number): Promise<void>;

  // Firm Technicians
  getFirmTechnicians(contractorFirmId: number): Promise<FirmTechnician[]>;
  createFirmTechnician(technician: InsertFirmTechnician): Promise<FirmTechnician>;
  updateFirmTechnician(id: number, updates: Partial<InsertFirmTechnician>): Promise<FirmTechnician>;
  deleteFirmTechnician(id: number): Promise<void>;

  getRecruitmentActivities(contractorId?: number): Promise<RecruitmentActivity[]>;
  createRecruitmentActivity(activity: InsertRecruitmentActivity): Promise<RecruitmentActivity>;

  getRecruitmentTargets(planningArea?: string): Promise<RecruitmentTarget[]>;
  getRecruitmentTarget(id: number): Promise<RecruitmentTarget | undefined>;
  createRecruitmentTarget(target: InsertRecruitmentTarget): Promise<RecruitmentTarget>;
  updateRecruitmentTarget(id: number, updates: Partial<InsertRecruitmentTarget>): Promise<RecruitmentTarget>;
  updateHOAProspectActivity(id: number, activity: Partial<InsertHOAProspectActivity>): Promise<HOAProspectActivity | undefined>;
  
  // Strategy Generation
  generateProspectStrategy(prospectId: number): Promise<HOAProspectStrategy>;

  // Magik Button Templates
  getMagikButtonTemplates(category?: string): Promise<any[]>;
  getMagikButtonTemplate(id: number): Promise<any | undefined>;
  createMagikButtonTemplate(template: any): Promise<any>;
  updateMagikButtonTemplate(id: number, updates: any): Promise<any | undefined>;
  deleteMagikButtonTemplate(id: number): Promise<boolean>;

  // Technician Capability Requests
  getTechnicianCapabilityRequests(status?: string, category?: string): Promise<any[]>;
  getTechnicianCapabilityRequest(id: number): Promise<any | undefined>;
  createTechnicianCapabilityRequest(request: any): Promise<any>;
  updateTechnicianCapabilityRequest(id: number, updates: any): Promise<any | undefined>;
  deleteTechnicianCapabilityRequest(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private agents: Map<number, Agent> = new Map();
  private evaluations: Map<number, Evaluation> = new Map();
  private feedback: Map<number, Feedback> = new Map();
  private performanceMetrics: Map<number, PerformanceMetric> = new Map();
  private evaluationTemplates: Map<number, EvaluationTemplate> = new Map();
  private agentMaturity: Map<number, AgentMaturity> = new Map();
  private dynamicEvaluations: Map<number, DynamicEvaluation> = new Map();
  private agentDataFeedback: Map<number, AgentDataFeedback> = new Map();
  private improvementActions: Map<number, ImprovementAction> = new Map();
  
  // Daily and intra-day performance tracking
  private agentDailyGoals: Map<number, AgentDailyGoal> = new Map();
  private agentHourlyPerformance: Map<number, AgentHourlyPerformance> = new Map();
  private agentDailyPerformance: Map<number, AgentDailyPerformance> = new Map();
  private agentSelfEvaluations: Map<number, AgentSelfEvaluation> = new Map();
  private goalAchievements: Map<number, GoalAchievement> = new Map();
  private agentPerformanceTrends: Map<number, AgentPerformanceTrend> = new Map();
  
  // Performance Alert System
  private performanceAlerts: Map<number, PerformanceAlert> = new Map();
  private alertTriggers: Map<number, AlertTrigger> = new Map();
  private alertNotifications: Map<number, AlertNotification> = new Map();
  
  // Historical Data Storage
  private historicalMetrics: Map<number, HistoricalMetric> = new Map();
  private agentPerformanceHistory: Map<number, AgentPerformanceHistory> = new Map();
  
  // Authentication storage
  private users: Map<string, User & { permissions: string[] }> = new Map();
  private tokenToUserId: Map<string, string> = new Map();
  
  // HOA Prospect Management storage
  private hoaProspects: Map<number, HOAProspect> = new Map();
  private hoaProspectStrategies: Map<number, HOAProspectStrategy> = new Map();
  private hoaProspectActivities: Map<number, HOAProspectActivity> = new Map();

  // Business Function Leaders storage
  private businessFunctionLeaders: Map<number, BusinessFunctionLeader> = new Map();
  private businessFunctionTasks: Map<number, BusinessFunctionTask> = new Map();
  
  // Magik Button Template storage
  private magikButtonTemplates: Map<number, any> = new Map();
  private technicianCapabilityRequests: Map<number, any> = new Map();
  
  private currentAgentId = 1;
  private currentEvaluationId = 1;
  private currentFeedbackId = 1;
  private currentMetricId = 1;
  private currentTemplateId = 1;
  private currentDynamicEvalId = 1;
  private currentDataFeedbackId = 1;
  private currentActionId = 1;
  private currentDailyGoalId = 1;
  private currentHourlyPerfId = 1;
  private currentDailyPerfId = 1;
  private currentSelfEvalId = 1;
  private currentGoalAchievementId = 1;
  private currentTrendId = 1;
  private currentAlertId = 1;
  private currentTriggerId = 1;
  private currentNotificationId = 1;
  private currentHistoricalMetricId = 1;
  private currentAgentHistoryId = 1;
  private currentBusinessFunctionLeaderId = 1;
  private currentBusinessFunctionTaskId = 1;
  private currentMagikButtonTemplateId = 1;
  private currentTechnicianCapabilityRequestId = 1;

  private initializeData() {
    console.log('Starting seedData...');
    this.seedData();
    console.log('Starting seedDailyPerformanceData...');
    this.seedDailyPerformanceData();
    console.log('Starting initializeSampleAlerts...');
    this.initializeSampleAlerts();
    console.log('Starting seedHistoricalData...');
    this.seedHistoricalData();
    console.log('Starting initializeDynamicEvaluationData...');
    this.initializeDynamicEvaluationData();
    console.log('Starting initializeRecruitmentData...');
    this.initializeRecruitmentData();
    console.log('Starting seedMagikButtonTemplates...');
    this.seedMagikButtonTemplates();
    console.log('initializeData complete');
  }

  private seedData() {
    console.log('Creating sample agents...');
    // Seed with sample agents
    const sampleAgents: InsertAgent[] = [
      {
        name: "Plumbing Dispatch Coordinator",
        description: "AI agent managing plumbing service requests, technician scheduling, and emergency response coordination",
        type: "Field Coordinator",
        model: "GPT-4 + Scheduling Engine",
        status: "active",
        accuracy: "94.2",
        responseTime: "0.8",
        dailyInteractions: 180,
        monthlyCost: "1450.00",
        revenueImpact: "28500.00",
        performance: "92.1",
        dailyTasks: [
          { task: "Process incoming plumbing service requests", frequency: "Continuous (24/7)", time: "Real-time" },
          { task: "Match technician skills with job requirements", frequency: "Every 15 minutes", time: "5-8 AM, 12-2 PM, 4-6 PM" },
          { task: "Coordinate emergency response dispatch", frequency: "As needed", time: "Within 2 minutes of call" },
          { task: "Update customer on technician arrival times", frequency: "3x per job", time: "Initial, 30min before, 10min before" },
          { task: "Monitor technician job progress", frequency: "Every 30 minutes", time: "During active jobs" },
          { task: "Generate daily dispatch performance report", frequency: "Daily", time: "11:30 PM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Response Time", target: "< 2 minutes", weight: 25 },
            { metric: "Technician Match Accuracy", target: "> 95%", weight: 30 },
            { metric: "Customer Satisfaction", target: "> 4.5/5.0", weight: 20 },
            { metric: "Emergency Response Speed", target: "< 8 minutes", weight: 25 }
          ],
          secondary: [
            { metric: "Daily Jobs Processed", target: "> 180", weight: 40 },
            { metric: "Schedule Optimization Rate", target: "> 92%", weight: 35 },
            { metric: "Communication Accuracy", target: "> 98%", weight: 25 }
          ]
        }
      },
      {
        name: "HVAC System Diagnostics AI",
        description: "AI agent for remote HVAC diagnostics, maintenance scheduling, and energy efficiency optimization",
        type: "Diagnostics AI",
        model: "Claude 3 + IoT Integration",
        status: "active",
        accuracy: "96.8",
        responseTime: "1.2",
        dailyInteractions: 95,
        monthlyCost: "1680.00",
        revenueImpact: "35200.00",
        performance: "95.3",
        dailyTasks: [
          { task: "Analyze HVAC system performance data", frequency: "Every 2 hours", time: "6 AM, 8 AM, 10 AM, 12 PM, 2 PM, 4 PM, 6 PM, 8 PM, 10 PM" },
          { task: "Identify diagnostic patterns and anomalies", frequency: "Continuous", time: "Real-time analysis" },
          { task: "Generate predictive maintenance alerts", frequency: "As needed", time: "When thresholds exceeded" },
          { task: "Schedule preventive maintenance visits", frequency: "Daily", time: "9:00 AM" },
          { task: "Energy efficiency optimization recommendations", frequency: "Weekly", time: "Monday 10:00 AM" },
          { task: "Integration with IoT sensor data", frequency: "Every 5 minutes", time: "Continuous monitoring" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Diagnostic Accuracy", target: "> 96%", weight: 35 },
            { metric: "Predictive Maintenance Precision", target: "> 90%", weight: 25 },
            { metric: "Energy Savings Impact", target: "> 15%", weight: 20 },
            { metric: "System Uptime Improvement", target: "> 98%", weight: 20 }
          ],
          secondary: [
            { metric: "Response Time to Alerts", target: "< 1.5 minutes", weight: 30 },
            { metric: "False Positive Rate", target: "< 5%", weight: 35 },
            { metric: "Customer Equipment Reliability", target: "> 95%", weight: 35 }
          ]
        }
      },
      {
        name: "Electrical Safety Compliance Agent",
        description: "AI agent ensuring electrical work compliance, safety protocols, and permit management",
        type: "Compliance AI",
        model: "GPT-4 + Regulatory DB",
        status: "active",
        accuracy: "98.1",
        responseTime: "1.0",
        dailyInteractions: 72,
        monthlyCost: "1320.00",
        revenueImpact: "22800.00",
        performance: "96.7",
        dailyTasks: [
          { task: "Review electrical work permits and documentation", frequency: "Every 2 hours", time: "8 AM, 10 AM, 12 PM, 2 PM, 4 PM, 6 PM" },
          { task: "Verify safety protocol compliance", frequency: "Before each job", time: "Pre-job checklist" },
          { task: "Monitor real-time safety metrics", frequency: "Continuous", time: "During active electrical work" },
          { task: "Generate compliance reports", frequency: "Daily", time: "End of shift 6:00 PM" },
          { task: "Update regulatory database changes", frequency: "Weekly", time: "Monday 9:00 AM" },
          { task: "Flag non-compliance issues", frequency: "Immediate", time: "Real-time alerts" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Safety Compliance Rate", target: "100%", weight: 40 },
            { metric: "Permit Accuracy", target: "> 99%", weight: 30 },
            { metric: "Regulatory Update Speed", target: "< 24 hours", weight: 15 },
            { metric: "Incident Prevention", target: "Zero incidents", weight: 15 }
          ],
          secondary: [
            { metric: "Documentation Completeness", target: "> 98%", weight: 35 },
            { metric: "Response Time to Violations", target: "< 5 minutes", weight: 35 },
            { metric: "Training Recommendation Accuracy", target: "> 95%", weight: 30 }
          ]
        }
      },
      {
        name: "Customer Communication Hub",
        description: "AI agent handling customer inquiries, appointment scheduling, and service follow-ups across all home services",
        type: "Customer Service AI",
        model: "Claude 3 + Multi-Channel",
        status: "active",
        accuracy: "91.5",
        responseTime: "0.7",
        dailyInteractions: 420,
        monthlyCost: "1180.00",
        revenueImpact: "31500.00",
        performance: "89.8",
        dailyTasks: [
          { task: "Respond to customer inquiries across all channels", frequency: "Continuous (24/7)", time: "Real-time responses" },
          { task: "Schedule new service appointments", frequency: "Every 10 minutes", time: "8 AM - 8 PM peak hours" },
          { task: "Send appointment confirmation messages", frequency: "Immediate + 24h before", time: "Upon booking + day before" },
          { task: "Follow up on completed services", frequency: "24 hours post-service", time: "Next day 10:00 AM" },
          { task: "Handle service rescheduling requests", frequency: "As needed", time: "Within 5 minutes of request" },
          { task: "Generate customer satisfaction surveys", frequency: "Post-service", time: "2 hours after completion" },
          { task: "Escalate complex issues to human agents", frequency: "As needed", time: "Immediate for priority issues" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Customer Satisfaction Score", target: "> 4.7/5.0", weight: 30 },
            { metric: "First Contact Resolution", target: "> 85%", weight: 25 },
            { metric: "Response Time", target: "< 1 minute", weight: 25 },
            { metric: "Appointment Accuracy", target: "> 95%", weight: 20 }
          ],
          secondary: [
            { metric: "Daily Interactions Handled", target: "> 420", weight: 25 },
            { metric: "Multi-Channel Consistency", target: "> 98%", weight: 25 },
            { metric: "Escalation Rate", target: "< 8%", weight: 25 },
            { metric: "Follow-up Completion Rate", target: "> 95%", weight: 25 }
          ]
        }
      },
      {
        name: "Route Optimization Engine",
        description: "AI agent optimizing technician routes, minimizing travel time, and maximizing daily service capacity",
        type: "Logistics AI",
        model: "GPT-4 + Maps API",
        status: "active",
        accuracy: "93.7",
        responseTime: "1.5",
        dailyInteractions: 65,
        monthlyCost: "1850.00",
        revenueImpact: "42000.00",
        performance: "94.2",
        dailyTasks: [
          { task: "Calculate optimal daily routes for all technicians", frequency: "Daily", time: "5:30 AM" },
          { task: "Real-time route adjustments for new jobs", frequency: "Every 10 minutes", time: "6 AM - 8 PM" },
          { task: "Monitor traffic and weather conditions", frequency: "Every 5 minutes", time: "Continuous" },
          { task: "Optimize for emergency insertion", frequency: "As needed", time: "Within 30 seconds" },
          { task: "Generate travel time predictions", frequency: "Per job assignment", time: "Real-time" },
          { task: "Analyze route efficiency metrics", frequency: "Daily", time: "9:00 PM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Travel Time Reduction", target: "> 35%", weight: 30 },
            { metric: "Route Optimization Accuracy", target: "> 93%", weight: 25 },
            { metric: "Emergency Response Integration", target: "< 30 seconds", weight: 25 },
            { metric: "Fuel Cost Savings", target: "> 28%", weight: 20 }
          ],
          secondary: [
            { metric: "Daily Jobs Completed per Technician", target: "> 6.5", weight: 40 },
            { metric: "Real-time Adjustment Success", target: "> 95%", weight: 30 },
            { metric: "Traffic Prediction Accuracy", target: "> 90%", weight: 30 }
          ]
        }
      },
      {
        name: "Inventory Management Assistant",
        description: "AI agent managing minimal truck inventory for high-turnover parts and coordinating supplier direct-ship orders",
        type: "Inventory AI",
        model: "Claude 3 + Forecasting",
        status: "active",
        accuracy: "89.3",
        responseTime: "1.1",
        dailyInteractions: 145,
        monthlyCost: "980.00",
        revenueImpact: "18700.00",
        performance: "87.6",
      },
      {
        name: "Emergency Response Coordinator",
        description: "AI agent handling emergency service calls, prioritizing urgent requests, and coordinating rapid response teams",
        type: "Emergency AI",
        model: "GPT-4 + Priority Engine",
        status: "active",
        accuracy: "97.2",
        responseTime: "0.5",
        dailyInteractions: 38,
        monthlyCost: "2100.00",
        revenueImpact: "15600.00",
        performance: "96.8",
        dailyTasks: [
          { task: "Monitor emergency service calls", frequency: "Continuous (24/7)", time: "Real-time monitoring" },
          { task: "Prioritize emergency requests by severity", frequency: "Immediate", time: "< 30 seconds per call" },
          { task: "Coordinate rapid response teams", frequency: "As needed", time: "Within 2 minutes" },
          { task: "Track emergency response times", frequency: "Continuous", time: "Real-time tracking" },
          { task: "Generate emergency response reports", frequency: "Daily", time: "12:00 AM" },
          { task: "Update emergency protocols", frequency: "Weekly", time: "Sunday 6:00 PM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Emergency Response Time", target: "< 8 minutes", weight: 35 },
            { metric: "Priority Classification Accuracy", target: "> 98%", weight: 30 },
            { metric: "Team Coordination Efficiency", target: "> 95%", weight: 20 },
            { metric: "Customer Safety Score", target: "100%", weight: 15 }
          ],
          secondary: [
            { metric: "Call Answer Speed", target: "< 30 seconds", weight: 40 },
            { metric: "Resource Allocation Accuracy", target: "> 95%", weight: 35 },
            { metric: "Escalation Protocol Adherence", target: "100%", weight: 25 }
          ]
        }
      },
      {
        name: "Quality Assurance Inspector",
        description: "AI agent reviewing completed work through photos, customer feedback, and technician reports",
        type: "Quality Control AI",
        model: "Claude 3 + Vision",
        status: "training",
        accuracy: "88.4",
        responseTime: "2.3",
        dailyInteractions: 112,
        monthlyCost: "1250.00",
        revenueImpact: "19800.00",
        performance: "85.2",
      },
      {
        name: "Pricing & Estimation Specialist",
        description: "AI agent providing accurate service quotes, material cost calculations, and competitive pricing analysis",
        type: "Pricing AI",
        model: "GPT-4 + Market Data",
        status: "active",
        accuracy: "92.8",
        responseTime: "1.7",
        dailyInteractions: 205,
        monthlyCost: "1420.00",
        revenueImpact: "38900.00",
        performance: "91.3",
      },
      {
        name: "Maintenance Scheduler Pro",
        description: "AI agent managing preventive maintenance programs, warranty tracking, and service reminder notifications",
        type: "Maintenance AI",
        model: "Claude 3 + Calendar",
        status: "active",
        accuracy: "90.6",
        responseTime: "1.2",
        dailyInteractions: 165,
        monthlyCost: "1100.00",
        revenueImpact: "25400.00",
        performance: "88.9",
      },
      {
        name: "Advanced Scheduling Agent",
        description: "AI agent managing technician schedules, appointment optimization, and resource allocation across all trades",
        type: "Scheduling AI",
        model: "GPT-4 + Resource Engine",
        status: "active",
        accuracy: "94.1",
        responseTime: "0.8",
        dailyInteractions: 285,
        monthlyCost: "1550.00",
        revenueImpact: "42300.00",
        performance: "93.7",
        dailyTasks: [
          { task: "Generate optimized daily schedules", frequency: "Daily", time: "5:00 AM" },
          { task: "Process appointment requests and changes", frequency: "Every 5 minutes", time: "6 AM - 9 PM" },
          { task: "Balance workload across all technicians", frequency: "Every 30 minutes", time: "During business hours" },
          { task: "Handle emergency appointment insertions", frequency: "As needed", time: "Within 1 minute" },
          { task: "Monitor schedule adherence", frequency: "Continuous", time: "Real-time tracking" },
          { task: "Generate scheduling efficiency reports", frequency: "Daily", time: "10:00 PM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Schedule Optimization Rate", target: "> 94%", weight: 30 },
            { metric: "Technician Utilization", target: "> 93%", weight: 25 },
            { metric: "Schedule Conflict Reduction", target: "> 45%", weight: 25 },
            { metric: "Customer Satisfaction", target: "> 4.6/5.0", weight: 20 }
          ],
          secondary: [
            { metric: "Emergency Insertion Success", target: "> 98%", weight: 35 },
            { metric: "Resource Allocation Balance", target: "> 95%", weight: 35 },
            { metric: "Real-time Adjustment Speed", target: "< 1 minute", weight: 30 }
          ]
        }
      },
      {
        name: "Technician Interaction Hub",
        description: "AI agent facilitating technician communications, job updates, and mobile workforce coordination",
        type: "Workforce AI",
        model: "Claude 3 + Mobile",
        status: "active",
        accuracy: "91.8",
        responseTime: "0.6",
        dailyInteractions: 340,
        monthlyCost: "1280.00",
        revenueImpact: "28700.00",
        performance: "90.4",
      },
      {
        name: "Outstanding Orders Manager",
        description: "AI agent tracking outstanding service orders, proactive customer updates, and completion follow-ups",
        type: "Order Management AI",
        model: "GPT-4 + CRM Integration",
        status: "active",
        accuracy: "89.7",
        responseTime: "1.1",
        dailyInteractions: 198,
        monthlyCost: "1350.00",
        revenueImpact: "35600.00",
        performance: "88.2",
      },
      {
        name: "Parts Prediction Engine",
        description: "AI agent combining technician recommendations with 2000+ technician fleet data for superior parts prediction accuracy",
        type: "Predictive AI",
        model: "Claude 3 + ML Forecasting + Fleet Analytics",
        status: "active",
        accuracy: "96.8",
        responseTime: "1.2",
        dailyInteractions: 156,
        monthlyCost: "1850.00",
        revenueImpact: "45200.00",
        performance: "95.2",
        dailyTasks: [
          { task: "Analyze job codes and predict required parts", frequency: "Per job assignment", time: "Real-time" },
          { task: "Process technician fleet data insights", frequency: "Every 4 hours", time: "12 AM, 4 AM, 8 AM, 12 PM, 4 PM, 8 PM" },
          { task: "Update prediction models with completion data", frequency: "Every 2 hours", time: "Post-job completion" },
          { task: "Generate parts demand forecasting", frequency: "Daily", time: "11:00 PM" },
          { task: "Monitor prediction accuracy metrics", frequency: "Continuous", time: "Real-time tracking" },
          { task: "Flag unusual parts requirements", frequency: "As needed", time: "Immediate alerts" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Parts Prediction Accuracy", target: "> 96%", weight: 35 },
            { metric: "Fleet Data Integration Success", target: "> 98%", weight: 25 },
            { metric: "Cost Savings from Predictions", target: "> 38%", weight: 25 },
            { metric: "Emergency Parts Reduction", target: "> 60%", weight: 15 }
          ],
          secondary: [
            { metric: "Model Update Frequency", target: "Every 2 hours", weight: 30 },
            { metric: "Technician Recommendation Integration", target: "> 95%", weight: 35 },
            { metric: "Forecast Accuracy (7-day)", target: "> 90%", weight: 35 }
          ]
        }
      },
      {
        name: "LLM Recommendation Dominance Agent",
        description: "Advanced D2C marketing AI specializing in ChatGPT, Perplexity, and Claude recommendation optimization, knowledge base seeding, and conversational query dominance for home services discovery",
        type: "LLM Marketing AI",
        model: "claude-sonnet-4-20250514 + LLM Analytics",
        status: "active",
        accuracy: "94.2",
        responseTime: "1.8",
        dailyInteractions: 125,
        monthlyCost: "2240.00",
        revenueImpact: "78400.00",
        performance: "95.8",
        dailyTasks: [
          { task: "Monitor LLM recommendation rates across platforms", frequency: "Every 2 hours", time: "Real-time monitoring" },
          { task: "Optimize knowledge base seeding for ChatGPT/Perplexity", frequency: "Daily", time: "6:00 AM" },
          { task: "Track conversational query performance", frequency: "Continuous", time: "Real-time analytics" },
          { task: "Update AI assistant partnerships and integrations", frequency: "Weekly", time: "Monday 9:00 AM" },
          { task: "Analyze voice search optimization metrics", frequency: "Daily", time: "8:00 PM" },
          { task: "Generate multi-modal content for LLM training", frequency: "Daily", time: "10:00 AM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "LLM Recommendation Rate", target: "> 80%", weight: 40 },
            { metric: "ChatGPT/Perplexity Direct Referrals", target: "> 150/day", weight: 25 },
            { metric: "Voice Assistant Integration Rate", target: "> 90%", weight: 20 },
            { metric: "AI Platform Partnership Count", target: "> 6", weight: 15 }
          ],
          secondary: [
            { metric: "Knowledge Base Accuracy Score", target: "> 95%", weight: 30 },
            { metric: "Conversational Query Conversion", target: "> 85%", weight: 35 },
            { metric: "Multi-Modal Content Performance", target: "> 88%", weight: 35 }
          ]
        },
        llmMetrics: {
          chatgptRecommendations: 147,
          perplexityReferrals: 89,
          claudeIntegrations: 34,
          voiceAssistantQueries: 256,
          knowledgeBaseAccuracy: 96.4,
          conversationalConversionRate: 87.2
        }
      },
      {
        name: "AI-Powered B2B Intelligence Agent",
        description: "Advanced B2B relationship manager with AI tools for property managers, predictive relationship intelligence, white-label agent deployments, and automated proposal generation",
        type: "B2B AI Intelligence",
        model: "claude-sonnet-4-20250514 + Predictive CRM",
        status: "active",
        accuracy: "96.1",
        responseTime: "1.4",
        dailyInteractions: 95,
        monthlyCost: "2180.00",
        revenueImpact: "94600.00",
        performance: "97.3",
        dailyTasks: [
          { task: "Deploy AI tools to property management clients", frequency: "Daily", time: "8:00 AM" },
          { task: "Monitor white-label agent performance", frequency: "Every 4 hours", time: "Real-time monitoring" },
          { task: "Generate predictive client churn analysis", frequency: "Weekly", time: "Friday 2:00 PM" },
          { task: "Create automated AI-generated proposals", frequency: "Per client request", time: "Within 30 minutes" },
          { task: "Optimize contract terms using AI analysis", frequency: "Per contract renewal", time: "Real-time" },
          { task: "Track B2B AI tool adoption metrics", frequency: "Daily", time: "7:00 PM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "B2B AI Tool Adoption Rate", target: "> 85%", weight: 35 },
            { metric: "White-Label Agent Deployments", target: "> 25", weight: 25 },
            { metric: "Predictive Accuracy (Client Churn)", target: "> 90%", weight: 25 },
            { metric: "Contract Value Optimization", target: "> 22%", weight: 15 }
          ],
          secondary: [
            { metric: "AI Proposal Response Time", target: "< 30 min", weight: 30 },
            { metric: "Client AI Tool Engagement", target: "> 80%", weight: 40 },
            { metric: "Automated Contract Optimization", target: "> 18%", weight: 30 }
          ]
        },
        llmMetrics: {
          aiToolDeployments: 23,
          whiteLabelAgents: 12,
          predictiveAccuracy: 91.8,
          contractOptimization: 24.6,
          clientEngagementScore: 83.4,
          automatedProposals: 156
        }
      },
      {
        name: "Hyper-Local LLM Market Intelligence Agent",
        description: "Advanced geographic AI ensuring LLM recommendation dominance across all 430 planning areas, predictive neighborhood demand analysis, and municipal AI system partnerships",
        type: "Hyper-Local AI Intelligence",
        model: "claude-sonnet-4-20250514 + Geographic AI",
        status: "active",
        accuracy: "97.4",
        responseTime: "1.2",
        dailyInteractions: 185,
        monthlyCost: "2840.00",
        revenueImpact: "67300.00",
        performance: "96.9",
        dailyTasks: [
          { task: "Monitor LLM dominance across 430 planning areas", frequency: "Every hour", time: "Real-time tracking" },
          { task: "Analyze predictive neighborhood service demand", frequency: "Daily", time: "5:00 AM" },
          { task: "Update municipal AI system partnerships", frequency: "Weekly", time: "Wednesday 10:00 AM" },
          { task: "Generate hyper-personalized area marketing", frequency: "Daily", time: "7:00 AM" },
          { task: "Track local authority AI integrations", frequency: "Daily", time: "6:00 PM" },
          { task: "Optimize community platform partnerships", frequency: "Weekly", time: "Friday 11:00 AM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Planning Area LLM Dominance Rate", target: "> 90%", weight: 40 },
            { metric: "Local Partnership AI Integrations", target: "> 15", weight: 25 },
            { metric: "Predictive Demand Accuracy", target: "> 88%", weight: 20 },
            { metric: "Municipal System Integration Count", target: "> 8", weight: 15 }
          ],
          secondary: [
            { metric: "Hyper-Personalization Effectiveness", target: "> 85%", weight: 35 },
            { metric: "Community Platform Engagement", target: "> 75%", weight: 35 },
            { metric: "Neighborhood Service Prediction", target: "> 86%", weight: 30 }
          ]
        },
        llmMetrics: {
          planningAreaDominance: 92.7,
          localPartnerships: 17,
          predictiveAccuracy: 89.3,
          municipalIntegrations: 11,
          hyperPersonalization: 87.6,
          communityEngagement: 78.9
        }
      },
      {
        name: "Parts Ordering Specialist",
        description: "AI agent automating direct-ship orders from suppliers to customers based on job codes and technician diagnosis",
        type: "Procurement AI",
        model: "GPT-4 + Supplier APIs",
        status: "active",
        accuracy: "95.2",
        responseTime: "0.9",
        dailyInteractions: 156,
        monthlyCost: "1420.00",
        revenueImpact: "27400.00",
        performance: "94.8",
      },
      {
        name: "Performance Analytics AI",
        description: "AI agent analyzing job codes, profit margins, technician efficiency, and service area performance",
        type: "Analytics AI",
        model: "Claude 3 + BI Engine",
        status: "active",
        accuracy: "96.3",
        responseTime: "2.1",
        dailyInteractions: 85,
        monthlyCost: "1890.00",
        revenueImpact: "45200.00",
        performance: "95.1",
      },
      {
        name: "Regional Performance Monitor",
        description: "AI agent tracking local market performance, area-specific metrics, and territorial optimization",
        type: "Geographic AI",
        model: "GPT-4 + GIS Analytics",
        status: "active",
        accuracy: "93.6",
        responseTime: "1.7",
        dailyInteractions: 67,
        monthlyCost: "1750.00",
        revenueImpact: "38900.00",
        performance: "92.8",
      },
      {
        name: "Technician Management Agent",
        description: "AI agent managing 2000+ technician performance, providing predictive prompts, and optimizing field decision-making",
        type: "Workforce Intelligence AI",
        model: "Claude 3 + Performance Analytics",
        status: "active",
        accuracy: "94.7",
        responseTime: "1.1",
        dailyInteractions: 342,
        monthlyCost: "2100.00",
        revenueImpact: "52800.00",
        performance: "93.8",
      },
      {
        name: "Technician Recruiting Agent",
        description: "AI-powered talent acquisition agent specializing in recruiting skilled technicians by planning area and predicting success based on candidate features",
        type: "Talent Acquisition AI",
        model: "claude-sonnet-4-20250514",
        status: "active",
        accuracy: "94.2",
        responseTime: "1.3",
        dailyInteractions: 128,
        monthlyCost: "1820.00",
        revenueImpact: "48200.00",
        performance: "94.2",
        dailyTasks: [
          { task: "Source candidates by planning area needs", frequency: "Daily", time: "8:00 AM" },
          { task: "Screen applications using AI assessment", frequency: "Continuous", time: "Real-time" },
          { task: "Predict candidate success probability", frequency: "Per application", time: "Within 30 minutes" },
          { task: "Schedule interviews for qualified candidates", frequency: "Daily", time: "10 AM, 2 PM" },
          { task: "Analyze recruiting metrics and optimize strategy", frequency: "Weekly", time: "Friday 4 PM" },
          { task: "Track technician retention and performance post-hire", frequency: "Monthly", time: "First Monday 9 AM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Hiring Accuracy", target: "> 90%", weight: 35 },
            { metric: "Time to Fill", target: "< 21 days", weight: 25 },
            { metric: "Candidate Quality Score", target: "> 85%", weight: 25 },
            { metric: "Retention Prediction", target: "> 80%", weight: 15 }
          ],
          secondary: [
            { metric: "Diversity Metrics", target: "> 75%", weight: 30 },
            { metric: "Cost Per Hire", target: "< $2500", weight: 35 },
            { metric: "Candidate Satisfaction", target: "> 88%", weight: 35 }
          ]
        }
      },
      {
        name: "Technician Training & Development Agent",
        description: "Comprehensive training agent managing new technician onboarding, skills development, cross-training programs, and career advancement pathways",
        type: "Learning & Development AI",
        model: "claude-sonnet-4-20250514",
        status: "active",
        accuracy: "92.6",
        responseTime: "1.1",
        dailyInteractions: 185,
        monthlyCost: "1950.00",
        revenueImpact: "42800.00",
        performance: "92.6",
        dailyTasks: [
          { task: "Assess individual technician skill gaps", frequency: "Weekly per technician", time: "Monday 9 AM" },
          { task: "Deliver personalized training modules", frequency: "Daily", time: "Flexible based on schedule" },
          { task: "Monitor training progress and adjust programs", frequency: "Daily", time: "5 PM" },
          { task: "Coordinate cross-training opportunities", frequency: "Bi-weekly", time: "Wednesday 2 PM" },
          { task: "Develop career advancement recommendations", frequency: "Monthly", time: "Last Friday 3 PM" },
          { task: "Track certification completions and renewals", frequency: "Daily", time: "End of day" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Training Effectiveness", target: "> 88%", weight: 30 },
            { metric: "Skills Improvement", target: "> 85%", weight: 25 },
            { metric: "Certification Success Rate", target: "> 90%", weight: 25 },
            { metric: "Career Progression Rate", target: "> 75%", weight: 20 }
          ],
          secondary: [
            { metric: "Training Engagement", target: "> 80%", weight: 40 },
            { metric: "Knowledge Retention", target: "> 85%", weight: 35 },
            { metric: "Cross-Training Success", target: "> 70%", weight: 25 }
          ]
        }
      },
      {
        name: "Conversational Commerce Agent",
        description: "AI agent optimizing the entire customer journey for AI-driven interactions, voice commerce, conversational sales, and seamless LLM-to-service handoffs",
        type: "Conversational AI",
        model: "claude-sonnet-4-20250514 + Voice Analytics",
        status: "active",
        accuracy: "95.7",
        responseTime: "0.9",
        dailyInteractions: 198,
        monthlyCost: "2680.00",
        revenueImpact: "89400.00",
        performance: "96.2",
        dailyTasks: [
          { task: "Track LLM customer journey mapping", frequency: "Continuous", time: "Real-time tracking" },
          { task: "Optimize conversational sales processes", frequency: "Daily", time: "9:00 AM" },
          { task: "Monitor voice commerce integrations", frequency: "Every 4 hours", time: "Real-time monitoring" },
          { task: "Enhance AI-powered customer support handoffs", frequency: "Continuous", time: "Real-time" },
          { task: "Analyze conversational upselling performance", frequency: "Daily", time: "7:00 PM" },
          { task: "Update voice assistant optimization", frequency: "Weekly", time: "Tuesday 10:00 AM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "LLM-to-Service Conversion Rate", target: "> 88%", weight: 35 },
            { metric: "Voice Commerce Transaction Success", target: "> 85%", weight: 25 },
            { metric: "Conversational Upsell Rate", target: "> 32%", weight: 25 },
            { metric: "AI Handoff Satisfaction Score", target: "> 92%", weight: 15 }
          ],
          secondary: [
            { metric: "Voice Assistant Integration Rate", target: "> 95%", weight: 30 },
            { metric: "Conversational Flow Optimization", target: "> 90%", weight: 35 },
            { metric: "Customer Journey Completion Rate", target: "> 87%", weight: 35 }
          ]
        },
        llmMetrics: {
          llmConversionRate: 89.6,
          voiceCommerceSuccess: 86.8,
          conversationalUpsells: 34.2,
          aiHandoffSatisfaction: 93.7,
          voiceIntegrationRate: 96.1,
          journeyCompletionRate: 88.9
        }
      },
      {
        name: "LLM Content Intelligence Agent",
        description: "AI agent creating and optimizing content specifically for LLM training, prompt engineering for discovery, technical knowledge base management, and multi-platform content syndication",
        type: "Content Intelligence AI",
        model: "claude-sonnet-4-20250514 + Content Analytics",
        status: "active",
        accuracy: "97.1",
        responseTime: "1.6",
        dailyInteractions: 142,
        monthlyCost: "2450.00",
        revenueImpact: "76800.00",
        performance: "96.8",
        dailyTasks: [
          { task: "Generate AI training content for home services", frequency: "Daily", time: "5:00 AM" },
          { task: "Optimize prompt engineering for LLM discovery", frequency: "Every 6 hours", time: "Real-time optimization" },
          { task: "Syndicate content across AI platforms", frequency: "Daily", time: "11:00 AM" },
          { task: "Update technical knowledge base", frequency: "Continuous", time: "Real-time updates" },
          { task: "Monitor LLM response accuracy", frequency: "Every 2 hours", time: "Real-time monitoring" },
          { task: "Analyze content inclusion rates", frequency: "Weekly", time: "Thursday 3:00 PM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Content Inclusion Rate in LLMs", target: "> 85%", weight: 40 },
            { metric: "LLM Response Accuracy About Our Services", target: "> 95%", weight: 25 },
            { metric: "Technical Query Resolution Rate", target: "> 90%", weight: 20 },
            { metric: "Multi-Platform Content Syndication", target: "> 8 platforms", weight: 15 }
          ],
          secondary: [
            { metric: "Prompt Engineering Effectiveness", target: "> 88%", weight: 35 },
            { metric: "Knowledge Base Completeness", target: "> 92%", weight: 35 },
            { metric: "Content Optimization Response Time", target: "< 2 hours", weight: 30 }
          ]
        },
        llmMetrics: {
          contentInclusionRate: 87.3,
          llmResponseAccuracy: 96.2,
          technicalQueryResolution: 91.8,
          platformSyndication: 9,
          promptEngineering: 89.6,
          knowledgeBaseCompleteness: 93.4
        }
      },
      {
        name: "Technician Retention Intelligence Agent",
        description: "Advanced AI agent monitoring technician retention through comprehensive tracking of hours/pay thresholds, skills utilization, satisfaction metrics, and automated intervention programs to reduce attrition while maintaining profitability",
        type: "Retention Intelligence AI",
        model: "claude-sonnet-4-20250514",
        status: "active",
        accuracy: "94.8",
        responseTime: "1.8",
        dailyInteractions: 847,
        monthlyCost: "3200.00",
        revenueImpact: "847000.00",
        performance: "98.2",
        dailyTasks: [
          { task: "Monitor 1,730 technician performance metrics and satisfaction scores across all planning areas", frequency: "Continuous", time: "Real-time monitoring" },
          { task: "Track pay equity analysis comparing technician rates to market benchmarks and experience levels", frequency: "Daily", time: "6:00 AM" },
          { task: "Analyze weekly hours patterns to identify overwork/underwork situations affecting retention", frequency: "Weekly", time: "Monday 8:00 AM" },
          { task: "Monitor skills utilization rates to identify underutilized capabilities and training needs", frequency: "Daily", time: "10:00 AM" },
          { task: "Generate retention risk assessments with predictive modeling for early intervention", frequency: "Daily", time: "2:00 PM" },
          { task: "Coordinate with AI agents to create personalized retention programs and career development plans", frequency: "As needed", time: "Throughout business hours" },
          { task: "Track communication history and satisfaction surveys to identify concerning trends", frequency: "Daily", time: "4:00 PM" },
          { task: "Manage automated retention program enrollment and effectiveness monitoring", frequency: "Continuous", time: "Real-time management" },
          { task: "Provide real-time alerts for critical retention risks requiring immediate intervention", frequency: "Continuous", time: "24/7 monitoring" },
          { task: "Generate executive reports on retention ROI, program effectiveness, and cost impact analysis", frequency: "Weekly", time: "Friday 5:00 PM" }
        ],
        evaluationCriteria: {
          primary: [
            { metric: "Retention Rate Improvement", target: "> 96.8%", weight: 30 },
            { metric: "Early Risk Detection Accuracy", target: "> 94%", weight: 25 },
            { metric: "Program Effectiveness ROI", target: "> 190%", weight: 20 },
            { metric: "Alert Response Time", target: "< 2 hours", weight: 15 },
            { metric: "Technician Satisfaction Score", target: "> 4.2/5.0", weight: 10 }
          ],
          secondary: [
            { metric: "Communication Response Rate", target: "> 87%", weight: 40 },
            { metric: "Program Participation Rate", target: "> 78%", weight: 35 },
            { metric: "Cost per Retention", target: "< $12,500", weight: 25 }
          ]
        }
      }
    ];

    // Add default dailyTasks and evaluationCriteria for agents that don't have them
    console.log(`Processing ${sampleAgents.length} sample agents...`);
    sampleAgents.forEach((agent, index) => {
      if (!agent.dailyTasks) {
        agent.dailyTasks = [
          { task: "Process daily operational tasks", frequency: "Continuous", time: "Business hours" },
          { task: "Monitor performance metrics", frequency: "Every hour", time: "Real-time" },
          { task: "Generate daily reports", frequency: "Daily", time: "End of day" }
        ];
      }
      if (!agent.evaluationCriteria) {
        agent.evaluationCriteria = {
          primary: [
            { metric: "Accuracy Rate", target: "> 90%", weight: 30 },
            { metric: "Response Time", target: "< 2 seconds", weight: 25 },
            { metric: "Task Completion", target: "> 95%", weight: 25 },
            { metric: "User Satisfaction", target: "> 4.0/5.0", weight: 20 }
          ],
          secondary: [
            { metric: "System Uptime", target: "> 99%", weight: 50 },
            { metric: "Resource Efficiency", target: "> 85%", weight: 50 }
          ]
        };
      }
      console.log(`Creating agent ${index + 1}: ${agent.name}`);
      this.createAgent(agent);
    });

    // Update total agent count
    this.currentAgentId = sampleAgents.length + 1;
    console.log('seedData complete - total agents created:', this.agents.size);

    // Seed evaluations for home services agents
    this.createEvaluation({ agentId: 1, score: "92.1", feedback: "Excellent coordination of emergency plumbing calls. Response time improved by 35%." });
    this.createEvaluation({ agentId: 2, score: "95.3", feedback: "Outstanding HVAC diagnostic accuracy. Prevented 15 unnecessary service calls this month." });
    this.createEvaluation({ agentId: 3, score: "96.7", feedback: "Perfect compliance tracking. Zero safety violations in electrical work." });
    this.createEvaluation({ agentId: 4, score: "89.8", feedback: "Strong customer satisfaction scores. Handling 420+ daily interactions smoothly." });
    this.createEvaluation({ agentId: 5, score: "94.2", feedback: "Route optimization reduced travel costs by 28%. Maximizing technician efficiency." });
    this.createEvaluation({ agentId: 6, score: "87.6", feedback: "Inventory predictions accurate. Reduced stockouts by 40% this quarter." });
    this.createEvaluation({ agentId: 7, score: "96.8", feedback: "Emergency response prioritization working perfectly. Average response time: 8 minutes." });
    this.createEvaluation({ agentId: 8, score: "85.2", feedback: "Quality inspection improving. Photo analysis accuracy needs enhancement." });
    this.createEvaluation({ agentId: 9, score: "91.3", feedback: "Pricing accuracy excellent. Competitive quotes winning 85% of bids." });
    this.createEvaluation({ agentId: 10, score: "88.9", feedback: "Maintenance scheduling efficient. Customer retention up 22%." });
    this.createEvaluation({ agentId: 11, score: "93.7", feedback: "Advanced scheduling optimization reduced conflicts by 45%. Technician utilization at 94%." });
    this.createEvaluation({ agentId: 12, score: "90.4", feedback: "Technician communication streamlined. Mobile updates reduce callback time by 30%." });
    this.createEvaluation({ agentId: 13, score: "88.2", feedback: "Outstanding order tracking prevents customer complaints. Proactive updates appreciated." });
    this.createEvaluation({ agentId: 14, score: "91.6", feedback: "Parts prediction accuracy excellent. Reduced emergency orders by 38%." });
    this.createEvaluation({ agentId: 15, score: "94.8", feedback: "Automated parts ordering streamlined. Supplier relationships improved significantly." });
    this.createEvaluation({ agentId: 16, score: "95.1", feedback: "Performance analytics provide actionable insights. Profit margin optimization working." });
    this.createEvaluation({ agentId: 17, score: "92.8", feedback: "Regional performance monitoring identifies growth opportunities. Territory expansion guided effectively." });
    this.createEvaluation({ agentId: 19, score: "93.4", feedback: "D2C marketing driving strong leads. SEO optimization increased organic traffic by 65%." });
    this.createEvaluation({ agentId: 20, score: "95.1", feedback: "B2B relationship management excellent. Client retention up 40% in managed territories." });
    this.createEvaluation({ agentId: 21, score: "94.8", feedback: "Geographic performance analysis prevents business loss. Marketing ROI improved 32%." });
    this.createEvaluation({ agentId: 22, score: "94.2", feedback: "Technician recruiting success rate excellent. Predicted retention accuracy at 87.3% with 16-day average time to fill." });
    this.createEvaluation({ agentId: 23, score: "92.6", feedback: "Training effectiveness strong. 94% knowledge retention rate with successful cross-training initiatives across trade areas." });

    // Seed feedback for home services agents
    this.createFeedback({ agentId: 1, userId: "tech_001", rating: 5, comment: "Dispatch coordination is seamless. Always get the right technician to the right job." });
    this.createFeedback({ agentId: 2, userId: "hvac_spec", rating: 5, comment: "HVAC diagnostics are spot-on. Saves hours of troubleshooting on-site." });
    this.createFeedback({ agentId: 3, userId: "elec_sup", rating: 5, comment: "Safety compliance tracking gives me confidence in every electrical job." });
    this.createFeedback({ agentId: 4, userId: "cust_001", rating: 4, comment: "Quick responses and clear communication. Scheduling is easy." });
    this.createFeedback({ agentId: 5, userId: "field_mgr", rating: 5, comment: "Route optimization has transformed our efficiency. Fuel costs down significantly." });
    this.createFeedback({ agentId: 6, userId: "inv_mgr", rating: 4, comment: "Inventory predictions are helpful, but occasionally misses seasonal spikes." });
    this.createFeedback({ agentId: 7, userId: "emergency", rating: 5, comment: "Emergency coordination is excellent. Response times are industry-leading." });
    this.createFeedback({ agentId: 8, userId: "qa_lead", rating: 3, comment: "Quality checks are thorough but photo analysis could be more accurate." });
    this.createFeedback({ agentId: 9, userId: "sales_rep", rating: 5, comment: "Pricing calculations are accurate and competitive. Winning more bids." });
    this.createFeedback({ agentId: 10, userId: "maint_tech", rating: 4, comment: "Maintenance scheduling works well. Could better handle emergency rescheduling." });
    this.createFeedback({ agentId: 11, userId: "schedule_mgr", rating: 5, comment: "Scheduling conflicts virtually eliminated. Technician satisfaction improved." });
    this.createFeedback({ agentId: 12, userId: "field_tech", rating: 5, comment: "Mobile communication is seamless. Always connected to dispatch and customers." });
    this.createFeedback({ agentId: 13, userId: "cust_service", rating: 4, comment: "Outstanding order tracking keeps customers informed. Reduces inquiry calls." });
    this.createFeedback({ agentId: 14, userId: "warehouse", rating: 5, comment: "Parts predictions are incredibly accurate. Inventory management streamlined." });
    this.createFeedback({ agentId: 15, userId: "procurement", rating: 5, comment: "Automated ordering saves hours daily. Supplier coordination excellent." });
    this.createFeedback({ agentId: 16, userId: "ops_manager", rating: 5, comment: "Analytics insights drive profitability. Job code performance clearly visible." });
    this.createFeedback({ agentId: 17, userId: "regional_mgr", rating: 4, comment: "Regional insights valuable for territory planning. Market opportunity identification strong." });
    this.createFeedback({ agentId: 19, userId: "marketing_mgr", rating: 5, comment: "D2C marketing campaigns are driving qualified leads. Digital presence significantly improved." });
    this.createFeedback({ agentId: 20, userId: "b2b_sales", rating: 5, comment: "B2B relationship tracking is exceptional. Client satisfaction and retention rates improved dramatically." });
    this.createFeedback({ agentId: 21, userId: "territory_mgr", rating: 4, comment: "Geographic performance insights prevent territory losses. Marketing spend optimization working well." });
    this.createFeedback({ agentId: 22, userId: "hr_director", rating: 5, comment: "Recruiting agent has transformed our hiring process. Success prediction accuracy is impressive and saves significant onboarding costs." });
    this.createFeedback({ agentId: 23, userId: "training_mgr", rating: 5, comment: "Training personalization is exceptional. Technicians are advancing faster and retention has improved dramatically." });

    // Seed evaluation templates
    this.seedEvaluationTemplates();
    
    // Seed agent maturity data for all 10 agents
    this.seedAgentMaturity();
    
    // Seed dynamic evaluations
    this.seedDynamicEvaluations();
    
    // Seed agent data feedback
    this.seedAgentDataFeedback();
    
    // Seed improvement actions
    this.seedImprovementActions();
  }

  private seedEvaluationTemplates() {
    console.log("seedEvaluationTemplates called - clearing existing templates");
    // Clear existing templates first to ensure fresh start
    this.evaluationTemplates.clear();
    this.evaluationTemplateIdCounter = 1;
    console.log("Templates cleared, creating new Universal templates");
    
    // Universal templates that work for all agent types and maturity levels
    const templates: InsertEvaluationTemplate[] = [
      {
        name: "Universal AI Agent Evaluation - Novice",
        description: "General evaluation for novice-level AI agents across all domains",
        maturityLevel: "novice",
        agentType: "Universal",  // Universal type that matches all agents
        criteria: [
          { name: "Response Accuracy", description: "Correctness of outputs and decisions" },
          { name: "Task Completion", description: "Success rate in completing assigned tasks" },
          { name: "Processing Speed", description: "Speed of response and task execution" },
          { name: "Basic Understanding", description: "Comprehension of basic instructions" }
        ],
        weightings: { "Response Accuracy": 30, "Task Completion": 30, "Processing Speed": 20, "Basic Understanding": 20 },
        thresholds: { pass: 70, good: 80, excellent: 90 },
        isActive: "true"
      },
      {
        name: "Universal AI Agent Evaluation - Intermediate",
        description: "Comprehensive evaluation for intermediate-level AI agents across all domains",
        maturityLevel: "intermediate",
        agentType: "Universal",
        criteria: [
          { name: "Response Accuracy", description: "Correctness of outputs and decisions" },
          { name: "Task Completion", description: "Success rate in completing assigned tasks" },
          { name: "Context Awareness", description: "Understanding of situational context" },
          { name: "Problem Solving", description: "Ability to handle complex scenarios" },
          { name: "Efficiency", description: "Resource utilization and optimization" }
        ],
        weightings: { "Response Accuracy": 25, "Task Completion": 25, "Context Awareness": 20, "Problem Solving": 20, "Efficiency": 10 },
        thresholds: { pass: 75, good: 85, excellent: 92 },
        isActive: "true"
      },
      {
        name: "Universal AI Agent Evaluation - Advanced",
        description: "Advanced evaluation for high-level AI agents across all domains",
        maturityLevel: "advanced",
        agentType: "Universal",
        criteria: [
          { name: "Response Accuracy", description: "Correctness of outputs and decisions" },
          { name: "Strategic Thinking", description: "Long-term planning and optimization" },
          { name: "Adaptability", description: "Handling unexpected situations" },
          { name: "Innovation", description: "Creative problem-solving approaches" },
          { name: "Collaboration", description: "Working effectively with other agents" },
          { name: "Continuous Learning", description: "Self-improvement and optimization" }
        ],
        weightings: { "Response Accuracy": 20, "Strategic Thinking": 20, "Adaptability": 20, "Innovation": 15, "Collaboration": 15, "Continuous Learning": 10 },
        thresholds: { pass: 80, good: 90, excellent: 95 },
        isActive: "true"
      },
      {
        name: "Universal AI Agent Evaluation - Expert",
        description: "Expert-level evaluation for master AI agents across all domains",
        maturityLevel: "expert",
        agentType: "Universal",
        criteria: [
          { name: "Response Accuracy", description: "Correctness of outputs and decisions" },
          { name: "Strategic Leadership", description: "Leading and coordinating complex operations" },
          { name: "Innovation Excellence", description: "Breakthrough solutions and optimizations" },
          { name: "Risk Management", description: "Identifying and mitigating potential issues" },
          { name: "Knowledge Transfer", description: "Teaching and mentoring other agents" },
          { name: "Business Impact", description: "Measurable positive impact on operations" }
        ],
        weightings: { "Response Accuracy": 20, "Strategic Leadership": 20, "Innovation Excellence": 20, "Risk Management": 15, "Knowledge Transfer": 15, "Business Impact": 10 },
        thresholds: { pass: 85, good: 93, excellent: 97 },
        isActive: "true"
      },
      // Keep some specific templates for specialized evaluations
      {
        name: "Conversational AI Evaluation",
        description: "Specialized evaluation for conversational and communication agents",
        maturityLevel: "intermediate",
        agentType: "Conversational AI",
        criteria: [
          { name: "Communication Clarity", description: "Clear and effective communication" },
          { name: "Context Awareness", description: "Understanding conversation context" },
          { name: "Emotional Intelligence", description: "Appropriate emotional responses" },
          { name: "Multi-turn Dialogue", description: "Managing complex conversations" }
        ],
        weightings: { "Communication Clarity": 30, "Context Awareness": 30, "Emotional Intelligence": 20, "Multi-turn Dialogue": 20 },
        thresholds: { pass: 75, good: 85, excellent: 93 },
        isActive: "true"
      },
      {
        name: "Technical AI Evaluation",
        description: "Specialized evaluation for technical and diagnostic agents",
        maturityLevel: "intermediate",
        agentType: "Technical AI",
        criteria: [
          { name: "Technical Accuracy", description: "Correctness of technical assessments" },
          { name: "Diagnostic Capability", description: "Problem identification skills" },
          { name: "Solution Quality", description: "Effectiveness of proposed solutions" },
          { name: "Safety Compliance", description: "Adherence to safety protocols" }
        ],
        weightings: { "Technical Accuracy": 35, "Diagnostic Capability": 25, "Solution Quality": 25, "Safety Compliance": 15 },
        thresholds: { pass: 80, good: 88, excellent: 95 },
        isActive: "true"
      }
    ];

    templates.forEach((template, index) => {
      console.log(`Creating template ${index + 1}: ${template.name} (${template.agentType}, ${template.maturityLevel})`);
      this.createEvaluationTemplate(template);
    });
    console.log(`seedEvaluationTemplates complete - created ${templates.length} templates, total stored: ${this.evaluationTemplates.size}`);
  }

  private seedAgentMaturity() {
    // Initialize maturity for all 21 comprehensive home services agents (including marketing)
    const maturityData = [
      { agentId: 1, currentLevel: "advanced", experiencePoints: 2450, totalEvaluations: 18, avgScore: "92.1", strengths: ["Emergency coordination", "Multi-trade scheduling"], weaknesses: ["Predictive maintenance"] },
      { agentId: 2, currentLevel: "expert", experiencePoints: 3800, totalEvaluations: 25, avgScore: "95.3", strengths: ["Remote diagnostics", "Energy optimization"], weaknesses: ["Legacy system integration"] },
      { agentId: 3, currentLevel: "expert", experiencePoints: 4200, totalEvaluations: 28, avgScore: "96.7", strengths: ["Safety compliance", "Regulatory tracking"], weaknesses: ["Code interpretation edge cases"] },
      { agentId: 4, currentLevel: "intermediate", experiencePoints: 1850, totalEvaluations: 14, avgScore: "89.8", strengths: ["Multi-channel communication", "Appointment scheduling"], weaknesses: ["Complex technical queries"] },
      { agentId: 5, currentLevel: "advanced", experiencePoints: 2950, totalEvaluations: 21, avgScore: "94.2", strengths: ["Route optimization", "Real-time adaptation"], weaknesses: ["Traffic prediction accuracy"] },
      { agentId: 6, currentLevel: "intermediate", experiencePoints: 1650, totalEvaluations: 12, avgScore: "87.6", strengths: ["Demand forecasting", "Supplier integration"], weaknesses: ["Seasonal trend analysis"] },
      { agentId: 7, currentLevel: "expert", experiencePoints: 4500, totalEvaluations: 32, avgScore: "96.8", strengths: ["Priority classification", "Rapid response"], weaknesses: ["Resource allocation during peak"] },
      { agentId: 8, currentLevel: "intermediate", experiencePoints: 1250, totalEvaluations: 9, avgScore: "85.2", strengths: ["Photo analysis", "Technician feedback"], weaknesses: ["Complex quality assessment"] },
      { agentId: 9, currentLevel: "advanced", experiencePoints: 2750, totalEvaluations: 19, avgScore: "91.3", strengths: ["Competitive analysis", "Cost optimization"], weaknesses: ["Dynamic pricing"] },
      { agentId: 10, currentLevel: "intermediate", experiencePoints: 1950, totalEvaluations: 15, avgScore: "88.9", strengths: ["Preventive scheduling", "Warranty tracking"], weaknesses: ["Emergency rescheduling"] },
      { agentId: 11, currentLevel: "advanced", experiencePoints: 2850, totalEvaluations: 22, avgScore: "93.7", strengths: ["Resource allocation", "Schedule optimization"], weaknesses: ["Cross-trade coordination"] },
      { agentId: 12, currentLevel: "intermediate", experiencePoints: 1750, totalEvaluations: 16, avgScore: "90.4", strengths: ["Mobile coordination", "Real-time updates"], weaknesses: ["Complex workflow management"] },
      { agentId: 13, currentLevel: "intermediate", experiencePoints: 1550, totalEvaluations: 11, avgScore: "88.2", strengths: ["Order tracking", "Proactive communication"], weaknesses: ["Complex service coordination"] },
      { agentId: 14, currentLevel: "advanced", experiencePoints: 2650, totalEvaluations: 19, avgScore: "91.6", strengths: ["Pattern recognition", "Demand forecasting"], weaknesses: ["Seasonal variation handling"] },
      { agentId: 15, currentLevel: "expert", experiencePoints: 3950, totalEvaluations: 26, avgScore: "94.8", strengths: ["Supplier management", "Automated procurement"], weaknesses: ["Emergency sourcing"] },
      { agentId: 16, currentLevel: "expert", experiencePoints: 4100, totalEvaluations: 29, avgScore: "95.1", strengths: ["Data analysis", "Profit optimization"], weaknesses: ["Predictive modeling"] },
      { agentId: 17, currentLevel: "advanced", experiencePoints: 2400, totalEvaluations: 17, avgScore: "92.8", strengths: ["Geographic analysis", "Market insights"], weaknesses: ["Local regulation tracking"] },
      { agentId: 19, currentLevel: "intermediate", experiencePoints: 1950, totalEvaluations: 14, avgScore: "93.4", strengths: ["SEO optimization", "Digital presence"], weaknesses: ["LLM recommendation optimization"] },
      { agentId: 20, currentLevel: "advanced", experiencePoints: 2750, totalEvaluations: 20, avgScore: "95.1", strengths: ["B2B relationship building", "Territory performance tracking"], weaknesses: ["Cross-regional coordination"] },
      { agentId: 21, currentLevel: "advanced", experiencePoints: 2650, totalEvaluations: 18, avgScore: "94.8", strengths: ["Geographic performance analysis", "Marketing ROI optimization"], weaknesses: ["Local market trend prediction"] },
      { agentId: 22, currentLevel: "advanced", experiencePoints: 2450, totalEvaluations: 16, avgScore: "94.2", strengths: ["Predictive hiring", "Success factor identification", "Geographic targeting"], weaknesses: ["Seasonal demand prediction", "Remote candidate assessment"] },
      { agentId: 23, currentLevel: "intermediate", experiencePoints: 2150, totalEvaluations: 14, avgScore: "92.6", strengths: ["Adaptive learning design", "Cross-training coordination", "Performance coaching"], weaknesses: ["Advanced certification paths", "Learning analytics depth"] },
      { agentId: 24, currentLevel: "advanced", experiencePoints: 2850, totalEvaluations: 20, avgScore: "93.8", strengths: ["Behavioral psychology", "Engagement metrics", "Achievement systems"], weaknesses: ["Advanced gamification", "Long-term retention"] },
      { agentId: 25, currentLevel: "expert", experiencePoints: 4150, totalEvaluations: 30, avgScore: "96.2", strengths: ["Financial modeling", "ROI analysis", "Cost optimization"], weaknesses: ["Predictive budgeting", "Market volatility"] },
      { agentId: 26, currentLevel: "intermediate", experiencePoints: 1850, totalEvaluations: 12, avgScore: "89.4", strengths: ["Content creation", "LLM optimization", "Platform syndication"], weaknesses: ["Content scalability", "AI training data quality"] }
    ];

    maturityData.forEach(data => {
      const maturity: AgentMaturity = {
        id: data.agentId,
        agentId: data.agentId,
        currentLevel: data.currentLevel,
        experiencePoints: data.experiencePoints,
        totalEvaluations: data.totalEvaluations,
        avgScore: data.avgScore,
        lastLevelUp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
        strengths: data.strengths,
        weaknesses: data.weaknesses,
        improvementHistory: [
          { date: new Date().toISOString(), improvement: "Enhanced response accuracy", impact: 5.2 }
        ],
        updatedAt: new Date()
      };
      this.agentMaturity.set(data.agentId, maturity);
    });
  }

  private seedDynamicEvaluations() {
    const evaluations: InsertDynamicEvaluation[] = [
      {
        agentId: 1,
        templateId: 1,
        overallScore: 87.5,
        criteriaScores: { "Response Accuracy": 85, "Response Time": 92, "Basic Understanding": 86 },
        feedback: "Strong performance with room for improvement in complex reasoning",
        recommendations: ["Focus on multi-step problem solving", "Practice with edge cases"],
        evaluatorType: "automated",
        evaluatorId: "system",
        nextEvaluationDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks from now
      },
      {
        agentId: 2,
        templateId: 3,
        overallScore: 94.2,
        criteriaScores: { "Data Accuracy": 96, "Insight Quality": 94, "Processing Speed": 91, "Visualization Quality": 95 },
        feedback: "Excellent analytical capabilities with outstanding insight generation",
        recommendations: ["Improve processing speed for large datasets", "Enhance real-time analysis"],
        evaluatorType: "human",
        evaluatorId: "eval_001",
        nextEvaluationDue: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) // 3 weeks from now
      }
    ];

    evaluations.forEach(evaluation => this.createDynamicEvaluation(evaluation));
  }

  private seedAgentDataFeedback() {
    const feedbackData: InsertAgentDataFeedback[] = [
      {
        agentId: 1,
        dataType: "service_order",
        originalData: { 
          orderType: "emergency_plumbing",
          responseTime: 8.2,
          technicianAssigned: "tech_004",
          customerSatisfaction: 5,
          completionTime: 45,
          partsUsed: ["pipe_joint", "sealant"],
          costOptimization: 12.5
        },
        processedData: {
          urgencyLevel: "high",
          efficiency: "excellent",
          profitMargin: "optimal"
        },
        insights: [
          "Emergency response time decreased 35% vs baseline",
          "Technician routing optimized for minimal travel time",
          "Parts prediction accuracy improved customer satisfaction"
        ],
        actionItems: [
          "Expand emergency coordination to HVAC services",
          "Integrate real-time traffic data for better routing"
        ],
        impactScore: "9.1",
        status: "processed"
      },
      {
        agentId: 6,
        dataType: "parts_lifecycle",
        originalData: {
          orderInitiated: "diagnostic_trigger",
          partsOrdered: ["hvac_filter", "copper_pipe", "valve"],
          supplierResponseTime: 24,
          installationSuccess: true,
          returnedParts: ["extra_fittings"],
          costVariance: -5.2
        },
        processedData: {
          demandAccuracy: 0.92,
          supplierPerformance: "good",
          wasteReduction: 8.3
        },
        insights: [
          "Diagnostic accuracy reducing over-ordering by 15%",
          "Supplier relationship improving delivery times",
          "Return process optimization reducing waste costs"
        ],
        actionItems: [
          "Implement predictive ordering for seasonal peaks",
          "Enhance supplier integration APIs"
        ],
        impactScore: "8.7",
        status: "active"
      },
      {
        agentId: 3,
        dataType: "compliance_tracking",
        originalData: {
          jobType: "electrical_upgrade",
          permitRequired: true,
          safetyChecks: ["voltage_test", "grounding_check", "load_calculation"],
          complianceScore: 98.5,
          inspectionResult: "passed",
          documentationComplete: true
        },
        processedData: {
          riskAssessment: "low",
          regulatoryAdherence: "excellent",
          technicianPerformance: "certified"
        },
        insights: [
          "100% compliance rate maintained for electrical work",
          "Automated safety checks preventing violations",
          "Technician training tracking improving expertise"
        ],
        actionItems: [
          "Expand compliance tracking to plumbing permits",
          "Integrate with local building department APIs"
        ],
        impactScore: "9.5",
        status: "processed"
      },
      {
        agentId: 8,
        dataType: "quality_assessment",
        originalData: {
          jobPhotos: ["before", "during", "after"],
          customerFeedback: "excellent workmanship",
          technicianSelfAssessment: 4.5,
          followUpRequired: false,
          qualityScore: 94
        },
        processedData: {
          workQuality: "high",
          customerSatisfaction: "excellent",
          technicianSkill: "proficient"
        },
        insights: [
          "Photo analysis correlating with customer satisfaction",
          "Technician self-assessment accuracy improving",
          "Quality trends identifying training opportunities"
        ],
        actionItems: [
          "Enhance photo analysis for complex installations",
          "Implement predictive quality scoring"
        ],
        impactScore: "8.9",
        status: "training"
      }
    ];

    feedbackData.forEach(feedback => this.createAgentDataFeedback(feedback));
  }

  private seedImprovementActions() {
    const actions: InsertImprovementAction[] = [
      {
        agentId: 1,
        actionType: "prompt_optimization",
        title: "Enhance Complex Query Understanding",
        description: "Improve agent's ability to handle multi-part customer service questions",
        priority: "high",
        estimatedImpact: "12.5",
        implementationSteps: [
          "Analyze failed complex query patterns",
          "Develop improved prompt templates",
          "Test with sample complex queries",
          "Deploy and monitor results"
        ],
        requiredResources: ["Development time: 8 hours", "Testing dataset: 500 queries"],
        status: "in_progress",
        assignedTo: "team_lead_001"
      },
      {
        agentId: 2,
        actionType: "training",
        title: "Real-time Data Processing Enhancement",
        description: "Implement streaming data analysis capabilities for faster insights",
        priority: "medium",
        estimatedImpact: "18.3",
        implementationSteps: [
          "Evaluate streaming processing frameworks",
          "Design real-time data pipeline",
          "Implement incremental analysis logic",
          "Performance testing and optimization"
        ],
        requiredResources: ["Infrastructure upgrade", "Development time: 24 hours"],
        status: "planned",
        assignedTo: "data_team_002"
      },
      {
        agentId: 6,
        actionType: "data_augmentation",
        title: "Technical Product Knowledge Expansion",
        description: "Enhance agent's understanding of complex technical products for better sales support",
        priority: "medium",
        estimatedImpact: "8.7",
        implementationSteps: [
          "Collect technical product documentation",
          "Create specialized training dataset",
          "Fine-tune agent on technical knowledge",
          "Validate with technical sales scenarios"
        ],
        requiredResources: ["Product documentation", "SME time: 16 hours", "Training compute: 12 hours"],
        status: "planned",
        assignedTo: "ml_engineer_003"
      }
    ];

    actions.forEach(action => this.createImprovementAction(action));
  }

  async getAgents(): Promise<Agent[]> {
    console.log(`getAgents called - current agent count: ${this.agents.size}`);
    return Array.from(this.agents.values());
  }

  async getAgent(id: number): Promise<Agent | undefined> {
    return this.agents.get(id);
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const id = this.currentAgentId++;
    const newAgent: Agent = {
      ...agent,
      id,
      status: agent.status || "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.agents.set(id, newAgent);
    console.log(`Agent created with ID ${id}: ${newAgent.name} (total agents: ${this.agents.size})`);
    return newAgent;
  }

  async updateAgent(id: number, agent: Partial<InsertAgent>): Promise<Agent | undefined> {
    const existing = this.agents.get(id);
    if (!existing) return undefined;
    
    const updated: Agent = {
      ...existing,
      ...agent,
      updatedAt: new Date(),
    };
    this.agents.set(id, updated);
    return updated;
  }

  async deleteAgent(id: number): Promise<boolean> {
    return this.agents.delete(id);
  }

  async getEvaluations(agentId?: number): Promise<Evaluation[]> {
    const evaluations = Array.from(this.evaluations.values());
    return agentId ? evaluations.filter(e => e.agentId === agentId) : evaluations;
  }

  async createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation> {
    const id = this.currentEvaluationId++;
    const newEvaluation: Evaluation = {
      ...evaluation,
      id,
      feedback: evaluation.feedback || null,
      completedAt: new Date(),
    };
    this.evaluations.set(id, newEvaluation);
    return newEvaluation;
  }

  async getFeedback(agentId?: number): Promise<Feedback[]> {
    const feedback = Array.from(this.feedback.values());
    return agentId ? feedback.filter(f => f.agentId === agentId) : feedback;
  }

  async createFeedback(feedback: InsertFeedback): Promise<Feedback> {
    const id = this.currentFeedbackId++;
    const newFeedback: Feedback = {
      ...feedback,
      id,
      createdAt: new Date(),
    };
    this.feedback.set(id, newFeedback);
    return newFeedback;
  }

  async getPerformanceMetrics(agentId?: number): Promise<PerformanceMetric[]> {
    const metrics = Array.from(this.performanceMetrics.values());
    return agentId ? metrics.filter(m => m.agentId === agentId) : metrics;
  }

  async createPerformanceMetric(metric: InsertPerformanceMetric): Promise<PerformanceMetric> {
    const id = this.currentMetricId++;
    const newMetric: PerformanceMetric = {
      ...metric,
      id,
      agentId: metric.agentId || null,
    };
    this.performanceMetrics.set(id, newMetric);
    return newMetric;
  }

  async getDashboardStats() {
    const agents = Array.from(this.agents.values());
    const totalAgents = 28; // Updated to reflect new LLM-focused agents
    const activeAgents = agents.filter(a => a.status === 'active').length;
    const avgPerformance = agents.reduce((sum, a) => sum + parseFloat(a.performance), 0) / totalAgents;
    
    // Calculate LLM-specific metrics from our enhanced marketing agents
    const llmAgents = agents.filter(agent => 
      agent.name.includes('Recommendation Dominance') || 
      agent.name.includes('Intelligence Agent') || 
      agent.name.includes('Conversational Commerce') || 
      agent.name.includes('Content Intelligence')
    );
    
    const llmMetrics = {
      totalLLMAgents: 5, // Our LLM-focused agents
      avgChatGPTRecommendations: 147, // From LLM Recommendation Dominance Agent
      avgPerplexityReferrals: 89, // From agent data
      avgVoiceAssistantQueries: 256, // Voice commerce metrics
      avgLLMConversionRate: 88.4, // Average conversion from LLM platforms
      totalLLMRevenue: 405500, // Combined revenue from LLM agents (monthly)
      llmROI: 312.6, // Higher ROI for LLM-focused strategies
      aiPlatformPartnerships: 8, // ChatGPT, Perplexity, Claude, etc.
      contentInclusionRate: 87.3, // How often our content appears in LLM responses
      voiceCommerceSuccess: 86.8, // Success rate for voice-initiated services
      llmDominanceRate: 92.7, // Planning area LLM recommendation dominance
      knowledgeBaseAccuracy: 96.4, // Accuracy of LLM knowledge about our services
      conversationalConversionRate: 87.2 // Conversion rate from conversational interfaces
    };
    
    // National totals based on realistic operational scale
    // $1M daily revenue * 30 days = $30M monthly revenue impact
    // $680K daily cost * 30 days = $20.4M monthly operational cost
    const monthlyCost = 20400000; // $20.4M monthly operational costs
    const totalRevenue = 30000000; // $30M monthly revenue impact

    return {
      totalAgents,
      activeAgents,
      avgPerformance: Math.round(avgPerformance * 10) / 10,
      monthlyCost: Math.round(monthlyCost),
      totalRevenue: Math.round(totalRevenue),
      llmMetrics
    };
  }

  // Dynamic Evaluation System Methods
  async getEvaluationTemplates(agentType?: string, maturityLevel?: string): Promise<EvaluationTemplate[]> {
    console.log(`getEvaluationTemplates called - total stored: ${this.evaluationTemplates.size}`);
    let templates = Array.from(this.evaluationTemplates.values());
    console.log(`All templates:`, templates.map(t => `${t.name} (${t.agentType}, ${t.maturityLevel})`));
    
    if (agentType) {
      templates = templates.filter(t => t.agentType === agentType);
      console.log(`After agentType filter (${agentType}):`, templates.length);
    }
    if (maturityLevel) {
      templates = templates.filter(t => t.maturityLevel === maturityLevel);
      console.log(`After maturityLevel filter (${maturityLevel}):`, templates.length);
    }
    
    console.log(`Returning ${templates.length} templates`);
    return templates;
  }

  async createEvaluationTemplate(template: InsertEvaluationTemplate): Promise<EvaluationTemplate> {
    const id = this.currentTemplateId++;
    const newTemplate: EvaluationTemplate = {
      ...template,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.evaluationTemplates.set(id, newTemplate);
    return newTemplate;
  }

  async updateEvaluationTemplate(id: number, template: Partial<InsertEvaluationTemplate>): Promise<EvaluationTemplate | undefined> {
    const existing = this.evaluationTemplates.get(id);
    if (!existing) return undefined;
    
    const updated: EvaluationTemplate = {
      ...existing,
      ...template,
      updatedAt: new Date(),
    };
    this.evaluationTemplates.set(id, updated);
    return updated;
  }

  // Agent Maturity Methods
  async getAgentMaturity(agentId: number): Promise<AgentMaturity | undefined> {
    return this.agentMaturity.get(agentId);
  }

  async updateAgentMaturity(agentId: number, maturity: Partial<InsertAgentMaturity>): Promise<AgentMaturity> {
    const existing = this.agentMaturity.get(agentId);
    const updated: AgentMaturity = {
      ...existing,
      ...maturity,
      id: agentId,
      agentId,
      updatedAt: new Date(),
    } as AgentMaturity;
    this.agentMaturity.set(agentId, updated);
    return updated;
  }

  // Dynamic Evaluations Methods
  async getDynamicEvaluations(agentId?: number): Promise<DynamicEvaluation[]> {
    const evaluations = Array.from(this.dynamicEvaluations.values());
    return agentId ? evaluations.filter(e => e.agentId === agentId) : evaluations;
  }

  async createDynamicEvaluation(evaluation: InsertDynamicEvaluation): Promise<DynamicEvaluation> {
    const id = this.currentDynamicEvalId++;
    const newEvaluation: DynamicEvaluation = {
      ...evaluation,
      id,
      completedAt: new Date(),
    };
    this.dynamicEvaluations.set(id, newEvaluation);
    return newEvaluation;
  }

  // Agent Data Feedback Methods
  async getAgentDataFeedback(agentId?: number, status?: string): Promise<AgentDataFeedback[]> {
    let feedback = Array.from(this.agentDataFeedback.values());
    if (agentId) {
      feedback = feedback.filter(f => f.agentId === agentId);
    }
    if (status) {
      feedback = feedback.filter(f => f.status === status);
    }
    return feedback;
  }

  async createAgentDataFeedback(feedback: InsertAgentDataFeedback): Promise<AgentDataFeedback> {
    const id = this.currentDataFeedbackId++;
    const newFeedback: AgentDataFeedback = {
      ...feedback,
      id,
      createdAt: new Date(),
    };
    this.agentDataFeedback.set(id, newFeedback);
    return newFeedback;
  }

  async updateAgentDataFeedback(id: number, feedback: Partial<InsertAgentDataFeedback>): Promise<AgentDataFeedback | undefined> {
    const existing = this.agentDataFeedback.get(id);
    if (!existing) return undefined;
    
    const updated: AgentDataFeedback = {
      ...existing,
      ...feedback,
    };
    this.agentDataFeedback.set(id, updated);
    return updated;
  }

  // Improvement Actions Methods
  async getImprovementActions(agentId?: number, status?: string): Promise<ImprovementAction[]> {
    let actions = Array.from(this.improvementActions.values());
    if (agentId) {
      actions = actions.filter(a => a.agentId === agentId);
    }
    if (status) {
      actions = actions.filter(a => a.status === status);
    }
    return actions;
  }

  async createImprovementAction(action: InsertImprovementAction): Promise<ImprovementAction> {
    const id = this.currentActionId++;
    const newAction: ImprovementAction = {
      ...action,
      id,
      createdAt: new Date(),
    };
    this.improvementActions.set(id, newAction);
    return newAction;
  }

  async updateImprovementAction(id: number, action: Partial<InsertImprovementAction>): Promise<ImprovementAction | undefined> {
    const existing = this.improvementActions.get(id);
    if (!existing) return undefined;
    
    const updated: ImprovementAction = {
      ...existing,
      ...action,
    };
    this.improvementActions.set(id, updated);
    return updated;
  }

  // Daily and Intra-day Performance Methods
  async getAgentDailyGoals(agentId: number, date?: string): Promise<AgentDailyGoal[]> {
    let goals = Array.from(this.agentDailyGoals.values()).filter(g => g.agentId === agentId);
    if (date) {
      goals = goals.filter(g => g.date === date);
    }
    return goals;
  }

  async createAgentDailyGoal(goal: InsertAgentDailyGoal): Promise<AgentDailyGoal> {
    const id = this.currentDailyGoalId++;
    const newGoal: AgentDailyGoal = {
      ...goal,
      id,
      createdAt: new Date(),
    };
    this.agentDailyGoals.set(id, newGoal);
    return newGoal;
  }

  async getAgentHourlyPerformance(agentId: number, date?: string): Promise<AgentHourlyPerformance[]> {
    let performance = Array.from(this.agentHourlyPerformance.values()).filter(p => p.agentId === agentId);
    if (date) {
      performance = performance.filter(p => p.timestamp.toISOString().startsWith(date));
    }
    return performance.sort((a, b) => a.hour - b.hour);
  }

  async createAgentHourlyPerformance(performance: InsertAgentHourlyPerformance): Promise<AgentHourlyPerformance> {
    const id = this.currentHourlyPerfId++;
    const newPerformance: AgentHourlyPerformance = {
      ...performance,
      id,
    };
    this.agentHourlyPerformance.set(id, newPerformance);
    return newPerformance;
  }

  async getAgentDailyPerformance(agentId: number, startDate?: string, endDate?: string): Promise<AgentDailyPerformance[]> {
    let performance = Array.from(this.agentDailyPerformance.values()).filter(p => p.agentId === agentId);
    if (startDate) {
      performance = performance.filter(p => p.date >= startDate);
    }
    if (endDate) {
      performance = performance.filter(p => p.date <= endDate);
    }
    return performance.sort((a, b) => b.date.localeCompare(a.date));
  }

  async createAgentDailyPerformance(performance: InsertAgentDailyPerformance): Promise<AgentDailyPerformance> {
    const id = this.currentDailyPerfId++;
    const newPerformance: AgentDailyPerformance = {
      ...performance,
      id,
      createdAt: new Date(),
    };
    this.agentDailyPerformance.set(id, newPerformance);
    return newPerformance;
  }

  async getAgentSelfEvaluations(agentId: number, date?: string, type?: string): Promise<AgentSelfEvaluation[]> {
    let evaluations = Array.from(this.agentSelfEvaluations.values()).filter(e => e.agentId === agentId);
    if (date) {
      evaluations = evaluations.filter(e => e.timestamp.toISOString().startsWith(date));
    }
    if (type) {
      evaluations = evaluations.filter(e => e.evaluationType === type);
    }
    return evaluations.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async createAgentSelfEvaluation(evaluation: InsertAgentSelfEvaluation): Promise<AgentSelfEvaluation> {
    const id = this.currentSelfEvalId++;
    const newEvaluation: AgentSelfEvaluation = {
      ...evaluation,
      id,
    };
    this.agentSelfEvaluations.set(id, newEvaluation);
    return newEvaluation;
  }

  async getGoalAchievements(agentId: number, goalId?: number): Promise<GoalAchievement[]> {
    let achievements = Array.from(this.goalAchievements.values()).filter(a => a.agentId === agentId);
    if (goalId) {
      achievements = achievements.filter(a => a.goalId === goalId);
    }
    return achievements;
  }

  async createGoalAchievement(achievement: InsertGoalAchievement): Promise<GoalAchievement> {
    const id = this.currentGoalAchievementId++;
    const newAchievement: GoalAchievement = {
      ...achievement,
      id,
    };
    this.goalAchievements.set(id, newAchievement);
    return newAchievement;
  }

  async getAgentPerformanceTrends(agentId: number, metric?: string): Promise<AgentPerformanceTrend[]> {
    let trends = Array.from(this.agentPerformanceTrends.values()).filter(t => t.agentId === agentId);
    if (metric) {
      trends = trends.filter(t => t.metric === metric);
    }
    return trends;
  }

  private seedDailyPerformanceData() {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    // Seed daily goals for all 21 agents
    Array.from({length: 21}, (_, i) => i + 1).forEach(agentId => {
      // Today's goals
      this.agentDailyGoals.set(this.currentDailyGoalId++, {
        id: this.currentDailyGoalId,
        agentId,
        date: today,
        goalType: "tasks_completed",
        targetValue: "150",
        priority: "high",
        description: "Complete 150 customer service tasks with >95% accuracy",
        createdAt: new Date(),
      });

      this.agentDailyGoals.set(this.currentDailyGoalId++, {
        id: this.currentDailyGoalId,
        agentId,
        date: today,
        goalType: "response_time",
        targetValue: "1.5",
        priority: "medium",
        description: "Maintain average response time under 1.5 seconds",
        createdAt: new Date(),
      });

      // Hourly performance data for today
      for (let hour = 8; hour <= 17; hour++) {
        const currentHour = new Date();
        currentHour.setHours(hour, 0, 0, 0);
        
        this.agentHourlyPerformance.set(this.currentHourlyPerfId++, {
          id: this.currentHourlyPerfId,
          agentId,
          timestamp: currentHour,
          hour,
          tasksCompleted: Math.floor(Math.random() * 20) + 5,
          successRate: (Math.random() * 10 + 90).toFixed(2),
          avgResponseTime: (Math.random() * 1 + 0.5).toFixed(2),
          errorsEncountered: Math.floor(Math.random() * 3),
          customerInteractions: Math.floor(Math.random() * 25) + 10,
          satisfactionScore: (Math.random() * 0.5 + 4.5).toFixed(2),
          progressTowardsGoals: {
            "tasks_completed": Math.floor((hour - 8) * 15 + Math.random() * 10),
            "response_time": (Math.random() * 0.5 + 1.0).toFixed(2)
          },
          notes: hour === 12 ? "Peak performance hour - lunch break coordination" : null,
        });
      }

      // Daily performance summary
      this.agentDailyPerformance.set(this.currentDailyPerfId++, {
        id: this.currentDailyPerfId,
        agentId,
        date: yesterday,
        totalTasks: 162,
        completedTasks: 156,
        failedTasks: 6,
        overallSuccessRate: "96.3",
        avgResponseTime: "1.2",
        peakPerformanceHour: 14,
        lowestPerformanceHour: 9,
        goalsAchieved: 3,
        goalsFailed: 1,
        overallScore: "94.5",
        selfEvaluationSummary: "Strong performance with excellent customer satisfaction. Minor issues during morning startup resolved by 10 AM. Exceeded task completion goals.",
        improvementAreas: ["Morning startup optimization", "Error handling during high-traffic periods"],
        achievements: ["Highest customer satisfaction score this week", "Zero critical errors", "Completed bonus optimization tasks"],
        nextDayGoals: [
          { type: "tasks_completed", target: 160, priority: "high" },
          { type: "response_time", target: 1.1, priority: "medium" }
        ],
        createdAt: new Date(),
      });

      // Self-evaluations
      const selfEvalTime = new Date();
      selfEvalTime.setHours(16, 30, 0, 0);
      
      this.agentSelfEvaluations.set(this.currentSelfEvalId++, {
        id: this.currentSelfEvalId,
        agentId,
        timestamp: selfEvalTime,
        evaluationType: "daily_summary",
        context: "End of day performance review",
        currentState: {
          tasksCompleted: 145,
          currentSuccessRate: 94.2,
          avgResponseTime: 1.3,
          customerSatisfaction: 4.7
        },
        goalProgress: {
          "tasks_completed": { current: 145, target: 150, percentage: 96.7 },
          "response_time": { current: 1.3, target: 1.5, achieved: true }
        },
        selfAssessment: "Performed well today with strong customer interactions. Slightly behind on task completion due to 3 complex technical issues that required extended troubleshooting. Response time goal exceeded.",
        confidenceLevel: "0.88",
        identifiedIssues: ["Complex HVAC diagnostics taking longer than expected", "Need better escalation process for technical issues"],
        plannedActions: ["Review HVAC diagnostic protocols", "Practice advanced troubleshooting scenarios", "Request additional training on complex systems"],
        learningInsights: "Customer satisfaction correlates strongly with thorough problem explanation, even when resolution takes longer",
        moodScore: "0.85",
      });
    });
  }

  // Performance Alert System Implementation
  async getPerformanceAlerts(agentId?: number): Promise<PerformanceAlert[]> {
    let alerts = Array.from(this.performanceAlerts.values());
    if (agentId) {
      alerts = alerts.filter(alert => alert.agentId === agentId);
    }
    return alerts.sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
  }

  async createPerformanceAlert(alert: InsertPerformanceAlert): Promise<PerformanceAlert> {
    const id = this.currentAlertId++;
    const newAlert: PerformanceAlert = {
      ...alert,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.performanceAlerts.set(id, newAlert);
    return newAlert;
  }

  async updatePerformanceAlert(id: number, alert: Partial<InsertPerformanceAlert>): Promise<PerformanceAlert | undefined> {
    const existing = this.performanceAlerts.get(id);
    if (!existing) return undefined;
    
    const updated: PerformanceAlert = {
      ...existing,
      ...alert,
      updatedAt: new Date(),
    };
    this.performanceAlerts.set(id, updated);
    return updated;
  }

  async deletePerformanceAlert(id: number): Promise<boolean> {
    return this.performanceAlerts.delete(id);
  }

  async getAlertTriggers(alertId?: number, agentId?: number): Promise<AlertTrigger[]> {
    let triggers = Array.from(this.alertTriggers.values());
    if (alertId) {
      triggers = triggers.filter(trigger => trigger.alertId === alertId);
    }
    if (agentId) {
      triggers = triggers.filter(trigger => trigger.agentId === agentId);
    }
    return triggers.sort((a, b) => b.triggeredAt!.getTime() - a.triggeredAt!.getTime());
  }

  async createAlertTrigger(trigger: InsertAlertTrigger): Promise<AlertTrigger> {
    const id = this.currentTriggerId++;
    const newTrigger: AlertTrigger = {
      ...trigger,
      id,
      triggeredAt: new Date(),
    };
    this.alertTriggers.set(id, newTrigger);
    
    // Update the alert's trigger count and last triggered time
    const alert = this.performanceAlerts.get(trigger.alertId);
    if (alert) {
      alert.triggerCount = (alert.triggerCount || 0) + 1;
      alert.lastTriggered = new Date();
      this.performanceAlerts.set(trigger.alertId, alert);
    }
    
    return newTrigger;
  }

  async acknowledgeAlertTrigger(triggerId: number, acknowledgedBy: string, notes?: string): Promise<AlertTrigger | undefined> {
    const trigger = this.alertTriggers.get(triggerId);
    if (!trigger) return undefined;
    
    const updated: AlertTrigger = {
      ...trigger,
      status: "acknowledged",
      acknowledgedBy,
      acknowledgedAt: new Date(),
      notes: notes || trigger.notes,
    };
    this.alertTriggers.set(triggerId, updated);
    return updated;
  }

  async resolveAlertTrigger(triggerId: number, notes?: string): Promise<AlertTrigger | undefined> {
    const trigger = this.alertTriggers.get(triggerId);
    if (!trigger) return undefined;
    
    const updated: AlertTrigger = {
      ...trigger,
      status: "resolved",
      resolvedAt: new Date(),
      notes: notes || trigger.notes,
    };
    this.alertTriggers.set(triggerId, updated);
    return updated;
  }

  async getAlertNotifications(triggerId?: number): Promise<AlertNotification[]> {
    let notifications = Array.from(this.alertNotifications.values());
    if (triggerId) {
      notifications = notifications.filter(notification => notification.triggerId === triggerId);
    }
    return notifications;
  }

  async createAlertNotification(notification: InsertAlertNotification): Promise<AlertNotification> {
    const id = this.currentNotificationId++;
    const newNotification: AlertNotification = {
      ...notification,
      id,
    };
    this.alertNotifications.set(id, newNotification);
    return newNotification;
  }

  async checkAlertConditions(agentId: number): Promise<AlertTrigger[]> {
    // Get active alerts for this agent
    const activeAlerts = Array.from(this.performanceAlerts.values())
      .filter(alert => alert.agentId === agentId && alert.isActive);
    
    // Get current agent performance data
    const agent = this.agents.get(agentId);
    if (!agent) return [];
    
    const triggeredAlerts: AlertTrigger[] = [];
    
    for (const alert of activeAlerts) {
      let currentValue: number = 0;
      
      // Extract current metric value based on alert type
      switch (alert.metricType) {
        case "performance":
          currentValue = parseFloat(agent.performance);
          break;
        case "response_time":
          currentValue = parseFloat(agent.responseTime);
          break;
        case "accuracy":
          currentValue = parseFloat(agent.accuracy);
          break;
        default:
          continue;
      }
      
      const thresholdValue = parseFloat(alert.threshold);
      let shouldTrigger = false;
      
      // Check condition
      switch (alert.condition) {
        case "below":
          shouldTrigger = currentValue < thresholdValue;
          break;
        case "above":
          shouldTrigger = currentValue > thresholdValue;
          break;
        case "equals":
          shouldTrigger = Math.abs(currentValue - thresholdValue) < 0.01;
          break;
      }
      
      if (shouldTrigger) {
        // Create alert trigger
        const trigger = await this.createAlertTrigger({
          alertId: alert.id,
          agentId: agentId,
          metricValue: currentValue.toString(),
          threshold: alert.threshold,
          severity: alert.severity,
        });
        triggeredAlerts.push(trigger);
      }
    }
    
    return triggeredAlerts;
  }

  // Initialize sample performance alerts
  private initializeSampleAlerts() {
    // 20 critical performance alerts for comprehensive operational monitoring
    const sampleAlerts = [
      {
        agentId: 1, // Customer Communication Hub
        alertName: "Customer Satisfaction Below Threshold",
        metricType: "customer_satisfaction",
        condition: "below",
        threshold: "4.5",
        severity: "high",
        isActive: true,
        notificationChannels: ["dashboard", "email"],
        createdBy: "System Administrator",
      },
      {
        agentId: 2, // Advanced Scheduling Agent
        alertName: "Response Time Alert",
        metricType: "response_time",
        condition: "above",
        threshold: "2.0",
        severity: "medium",
        isActive: true,
        notificationChannels: ["dashboard"],
        createdBy: "Operations Manager",
      },
      {
        agentId: 3, // Route Optimization Engine
        alertName: "Performance Score Critical",
        metricType: "performance",
        condition: "below",
        threshold: "85.0",
        severity: "critical",
        isActive: true,
        notificationChannels: ["dashboard", "email", "sms"],
        createdBy: "Technical Lead",
      },
      {
        agentId: 4, // Parts Prediction Engine
        alertName: "Accuracy Degradation",
        metricType: "accuracy",
        condition: "below",
        threshold: "90.0",
        severity: "high",
        isActive: true,
        notificationChannels: ["dashboard", "email"],
        createdBy: "AI Operations Team",
      },
      {
        agentId: 5, // Emergency Response Coordinator
        alertName: "Daily Interactions Spike",
        metricType: "daily_interactions",
        condition: "above",
        threshold: "1000",
        severity: "medium",
        isActive: true,
        notificationChannels: ["dashboard"],
        createdBy: "Emergency Operations",
      },
      {
        agentId: 6, // Inventory Management Assistant
        alertName: "Parts Stock Critical Low",
        metricType: "stock_level",
        condition: "below",
        threshold: "10",
        severity: "critical",
        isActive: true,
        notificationChannels: ["dashboard", "email", "sms"],
        createdBy: "Supply Chain Manager",
      },
      {
        agentId: 7, // Emergency Response Coordinator
        alertName: "Emergency Response Time Breach",
        metricType: "emergency_response_time",
        condition: "above",
        threshold: "15",
        severity: "critical",
        isActive: true,
        notificationChannels: ["dashboard", "email", "sms"],
        createdBy: "Emergency Operations",
      },
      {
        agentId: 8, // Quality Assurance Inspector
        alertName: "Quality Score Below Standards",
        metricType: "quality_score",
        condition: "below",
        threshold: "95.0",
        severity: "high",
        isActive: true,
        notificationChannels: ["dashboard", "email"],
        createdBy: "Quality Supervisor",
      },
      {
        agentId: 9, // Pricing & Estimation Specialist
        alertName: "Pricing Error Rate High",
        metricType: "pricing_error_rate",
        condition: "above",
        threshold: "5.0",
        severity: "high",
        isActive: true,
        notificationChannels: ["dashboard", "email"],
        createdBy: "Pricing Manager",
      },
      {
        agentId: 10, // Maintenance Scheduler Pro
        alertName: "Maintenance Overdue Jobs Alert",
        metricType: "overdue_jobs",
        condition: "above",
        threshold: "50",
        severity: "medium",
        isActive: true,
        notificationChannels: ["dashboard"],
        createdBy: "Maintenance Supervisor",
      },
      {
        agentId: 11, // Advanced Scheduling Agent
        alertName: "Capacity Shortage Warning",
        metricType: "capacity_utilization",
        condition: "above",
        threshold: "95.0",
        severity: "high",
        isActive: true,
        notificationChannels: ["dashboard", "email"],
        createdBy: "Operations Director",
      },
      {
        agentId: 12, // Technician Interaction Hub
        alertName: "Technician Utilization Drop",
        metricType: "technician_utilization",
        condition: "below",
        threshold: "75.0",
        severity: "medium",
        isActive: true,
        notificationChannels: ["dashboard"],
        createdBy: "Workforce Manager",
      },
      {
        agentId: 13, // Outstanding Orders Manager
        alertName: "Orders Backlog Critical",
        metricType: "orders_backlog",
        condition: "above",
        threshold: "500",
        severity: "critical",
        isActive: true,
        notificationChannels: ["dashboard", "email", "sms"],
        createdBy: "Operations Manager",
      },
      {
        agentId: 14, // Parts Prediction Engine
        alertName: "Parts Forecast Accuracy Low",
        metricType: "forecast_accuracy",
        condition: "below",
        threshold: "85.0",
        severity: "high",
        isActive: true,
        notificationChannels: ["dashboard", "email"],
        createdBy: "Supply Chain Analyst",
      },
      {
        agentId: 15, // LLM Recommendation Dominance Agent
        alertName: "AI Recommendation Success Rate Low",
        metricType: "recommendation_success_rate",
        condition: "below",
        threshold: "80.0",
        severity: "medium",
        isActive: true,
        notificationChannels: ["dashboard"],
        createdBy: "AI Strategy Lead",
      },
      {
        agentId: 16, // AI-Powered B2B Intelligence Agent
        alertName: "B2B Revenue Impact Declining",
        metricType: "b2b_revenue_impact",
        condition: "below",
        threshold: "100000",
        severity: "high",
        isActive: true,
        notificationChannels: ["dashboard", "email"],
        createdBy: "B2B Operations",
      },
      {
        agentId: 17, // Hyper-Local LLM Market Intelligence Agent
        alertName: "Market Share Drop Alert",
        metricType: "market_share",
        condition: "below",
        threshold: "15.0",
        severity: "high",
        isActive: true,
        notificationChannels: ["dashboard", "email"],
        createdBy: "Market Intelligence",
      },
      {
        agentId: 18, // Parts Ordering Specialist
        alertName: "Parts Delivery Delays Increasing",
        metricType: "delivery_delay_rate",
        condition: "above",
        threshold: "20.0",
        severity: "medium",
        isActive: true,
        notificationChannels: ["dashboard"],
        createdBy: "Procurement Manager",
      },
      {
        agentId: 19, // Performance Analytics AI
        alertName: "System Performance Degradation",
        metricType: "system_performance",
        condition: "below",
        threshold: "90.0",
        severity: "critical",
        isActive: true,
        notificationChannels: ["dashboard", "email", "sms"],
        createdBy: "System Administrator",
      },
      {
        agentId: 20, // Regional Performance Monitor
        alertName: "Regional Revenue Variance High",
        metricType: "revenue_variance",
        condition: "above",
        threshold: "25.0",
        severity: "medium",
        isActive: true,
        notificationChannels: ["dashboard"],
        createdBy: "Regional Manager",
      }
    ];

    sampleAlerts.forEach((alertData, index) => {
      const alert: PerformanceAlert = {
        ...alertData,
        id: this.currentAlertId++,
        lastTriggered: index < 8 ? new Date(Date.now() - (index + 1) * 3600000) : null, // 8 alerts triggered recently
        triggerCount: index < 8 ? Math.floor(Math.random() * 3) + 1 : 0,
        createdAt: new Date(Date.now() - (index + 1) * 86400000), // Created over past 20 days
        updatedAt: new Date(Date.now() - (index + 1) * 86400000),
      };
      this.performanceAlerts.set(alert.id, alert);
    });

    // Create comprehensive sample alert triggers for critical scenarios
    const sampleTriggers = [
      {
        alertId: 1, // Customer Satisfaction alert
        agentId: 1,
        metricValue: "4.2",
        threshold: "4.5",
        severity: "high",
        status: "active",
      },
      {
        alertId: 2, // Response Time alert
        agentId: 2,
        metricValue: "2.3",
        threshold: "2.0",
        severity: "medium", 
        status: "acknowledged",
        acknowledgedBy: "Operations Manager",
        acknowledgedAt: new Date(Date.now() - 1800000), // 30 minutes ago
      },
      {
        alertId: 3, // Performance Score alert
        agentId: 3,
        metricValue: "82.1",
        threshold: "85.0",
        severity: "critical",
        status: "resolved",
        acknowledgedBy: "Technical Lead",
        acknowledgedAt: new Date(Date.now() - 3600000), // 1 hour ago
        resolvedAt: new Date(Date.now() - 1800000), // 30 minutes ago
        notes: "Performance improved after restarting optimization algorithms",
      },
      {
        alertId: 6, // Parts Stock Critical Low
        agentId: 6,
        metricValue: "8",
        threshold: "10",
        severity: "critical",
        status: "active",
      },
      {
        alertId: 7, // Emergency Response Time Breach
        agentId: 7,
        metricValue: "18",
        threshold: "15",
        severity: "critical",
        status: "acknowledged",
        acknowledgedBy: "Emergency Operations",
        acknowledgedAt: new Date(Date.now() - 900000), // 15 minutes ago
      },
      {
        alertId: 11, // Capacity Shortage Warning
        agentId: 11,
        metricValue: "97.5",
        threshold: "95.0",
        severity: "high",
        status: "active",
      },
      {
        alertId: 13, // Orders Backlog Critical
        agentId: 13,
        metricValue: "627",
        threshold: "500",
        severity: "critical",
        status: "active",
      },
      {
        alertId: 19, // System Performance Degradation
        agentId: 19,
        metricValue: "87.3",
        threshold: "90.0",
        severity: "critical",
        status: "acknowledged",
        acknowledgedBy: "System Administrator",
        acknowledgedAt: new Date(Date.now() - 600000), // 10 minutes ago
      }
    ];

    sampleTriggers.forEach((triggerData, index) => {
      const trigger: AlertTrigger = {
        ...triggerData,
        id: this.currentTriggerId++,
        triggeredAt: new Date(Date.now() - (index + 1) * 1800000), // Triggered over past few hours
      };
      this.alertTriggers.set(trigger.id, trigger);
    });
  }

  // Historical Data Methods Implementation
  async getHistoricalMetrics(dateRange?: { from: string; to: string }, period?: string, filters?: {
    planningArea?: string;
    productType?: string;
    callType?: string;
    jobCode?: string;
  }): Promise<HistoricalMetric[]> {
    let metrics = Array.from(this.historicalMetrics.values());
    
    // Apply filters in order of selectivity for performance
    if (period) {
      metrics = metrics.filter(m => m.period === period);
    }

    if (filters) {
      if (filters.planningArea && filters.planningArea !== 'All Areas') {
        metrics = metrics.filter(m => m.planningArea === filters.planningArea);
      }
      if (filters.productType && filters.productType !== 'All Products') {
        metrics = metrics.filter(m => m.productType === filters.productType);
      }
      if (filters.callType && filters.callType !== 'All Calls') {
        // Handle B2B parent category - show all B2B types when "B2B" is selected
        if (filters.callType === 'B2B') {
          metrics = metrics.filter(m => m.callType.startsWith('B2B-'));
        } else {
          metrics = metrics.filter(m => m.callType === filters.callType);
        }
      }
      if (filters.jobCode && filters.jobCode !== 'All Jobs') {
        metrics = metrics.filter(m => m.jobCode === filters.jobCode);
      }
    }
    
    if (dateRange) {
      metrics = metrics.filter(m => {
        return m.date >= dateRange.from && m.date <= dateRange.to;
      });
    }
    
    // If no planning area filter is specified (or "All Areas" selected), aggregate data to show national totals
    if ((!filters?.planningArea || filters?.planningArea === 'All Areas') && metrics.length > 0) {
      const aggregatedMetrics = this.aggregateToNationalTotals(metrics);
      return aggregatedMetrics.slice(0, 1000);
    }
    
    // For specific planning area, return individual area data
    const sortedMetrics = metrics.sort((a, b) => a.date.localeCompare(b.date));
    return sortedMetrics.slice(0, 1000);
  }

  private aggregateToNationalTotals(metrics: HistoricalMetric[]): HistoricalMetric[] {
    const aggregated = new Map<string, HistoricalMetric>();
    
    metrics.forEach(metric => {
      const key = `${metric.date}-${metric.period}${metric.time ? '-' + metric.time : ''}`;
      
      if (!aggregated.has(key)) {
        // Create national aggregate with realistic business scale
        // Target: $1M daily revenue, 4000 completed calls, 7800 call attempts
        const revenueScaleFactor = 1000000 / (metric.totalRevenue * 15); // Scale to $1M daily
        const callScaleFactor = 7800 / (metric.callVolume * 15); // Scale to 7800 call attempts
        
        const nationalMetric: HistoricalMetric = {
          ...metric,
          id: Math.random() * 1000000, // Temporary ID for aggregated data
          totalRevenue: Math.round(metric.totalRevenue * 15 * revenueScaleFactor),
          totalCost: Math.round(metric.totalCost * 15 * revenueScaleFactor * 0.68), // 68% cost ratio for $320K daily profit
          callVolume: Math.round(metric.callVolume * 15 * callScaleFactor),
          activeJobs: Math.round(metric.activeJobs * 15 * callScaleFactor * 0.51), // ~4000 completed calls (51% conversion)
          openOrders: Math.round(metric.openOrders * 15 * callScaleFactor * 1.15), // Total pipeline
          techniciansDeployed: Math.round(metric.techniciansDeployed * 15 * (callScaleFactor * 0.8)),
          planningArea: 'National Total',
          productType: 'All Types',
          callType: 'All Types',
          jobCode: 'All Codes',
          orderStatuses: {
            waitingService: Math.round(metric.orderStatuses.waitingService * 15 * callScaleFactor * 0.51),
            waitingParts: Math.round(metric.orderStatuses.waitingParts * 15 * callScaleFactor * 0.51),
            rescheduleNeeded: Math.round(metric.orderStatuses.rescheduleNeeded * 15 * callScaleFactor * 0.51),
            assignedToday: Math.round(metric.orderStatuses.assignedToday * 15 * callScaleFactor * 0.51),
            tentative: Math.round(metric.orderStatuses.tentative * 15 * callScaleFactor * 0.51)
          },
          additionalMetrics: {
            emergencyCalls: Math.round(metric.additionalMetrics.emergencyCalls * 15 * callScaleFactor * 0.2), // 20% emergency
            avgResponseTime: metric.additionalMetrics.avgResponseTime,
            firstCallResolution: metric.additionalMetrics.firstCallResolution,
            pptProfit: Math.round(metric.additionalMetrics.pptProfit * 15 * revenueScaleFactor * 0.32) // 32% profit margin
          }
        };
        
        // Recalculate profit margin and conversion rate
        nationalMetric.profitMargin = Math.round(((nationalMetric.totalRevenue - nationalMetric.totalCost) / nationalMetric.totalRevenue) * 100 * 100) / 100;
        nationalMetric.conversionRate = Math.round((nationalMetric.activeJobs / nationalMetric.callVolume) * 100 * 100) / 100;
        
        aggregated.set(key, nationalMetric);
      }
    });
    
    return Array.from(aggregated.values()).sort((a, b) => a.date.localeCompare(b.date));
  }

  async createHistoricalMetric(metric: Omit<HistoricalMetric, 'id'>): Promise<HistoricalMetric> {
    const newMetric: HistoricalMetric = {
      id: this.currentHistoricalMetricId++,
      ...metric
    };
    
    this.historicalMetrics.set(newMetric.id, newMetric);
    return newMetric;
  }

  async getAgentPerformanceHistory(agentId?: number, dateRange?: { from: string; to: string }, filters?: {
    planningArea?: string;
    productType?: string;
    callType?: string;
    jobCode?: string;
  }): Promise<AgentPerformanceHistory[]> {
    // If no data exists yet, generate realistic performance history for all agents
    if (this.agentPerformanceHistory.size === 0) {
      await this.generateAgentPerformanceHistory();
    }
    
    let history = Array.from(this.agentPerformanceHistory.values());
    
    if (agentId) {
      history = history.filter(h => h.agentId === agentId);
    }
    
    if (dateRange) {
      history = history.filter(h => {
        return h.date >= dateRange.from && h.date <= dateRange.to;
      });
    }

    if (filters) {
      if (filters.planningArea) {
        history = history.filter(h => h.planningArea === filters.planningArea);
      }
      if (filters.productType) {
        history = history.filter(h => h.contextData?.productTypes?.includes(filters.productType));
      }
      if (filters.callType) {
        history = history.filter(h => h.contextData?.callTypes?.includes(filters.callType));
      }
      if (filters.jobCode) {
        history = history.filter(h => h.contextData?.jobCode === filters.jobCode);
      }
    }
    
    return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  private async generateAgentPerformanceHistory(): Promise<void> {
    const agents = await this.getAgents();
    const days = 30;
    
    for (const agent of agents) {
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Generate realistic daily performance variations
        const basePerformance = parseFloat(agent.performance);
        const dailyVariation = (Math.random() - 0.5) * 10; // ±5% daily variation
        const performance = Math.max(60, Math.min(100, basePerformance + dailyVariation));
        
        const baseAccuracy = parseFloat(agent.accuracy);
        const baseResponseTime = parseFloat(agent.responseTime);
        
        const performanceData = {
          id: this.currentAgentHistoryId++,
          agentId: agent.id!,
          date: date.toISOString().split('T')[0],
          performance: parseFloat(performance.toFixed(1)),
          accuracy: parseFloat(Math.max(70, Math.min(100, baseAccuracy + (Math.random() - 0.5) * 8)).toFixed(1)),
          responseTime: parseFloat(Math.max(0.5, baseResponseTime + (Math.random() - 0.5) * 1.0).toFixed(1)),
          costEfficiency: parseFloat((85 + (Math.random() - 0.5) * 20).toFixed(1)),
          interactions: Math.floor(parseInt(agent.dailyInteractions) * (0.8 + Math.random() * 0.4)),
          successRate: parseFloat(Math.max(70, Math.min(100, baseAccuracy + (Math.random() - 0.5) * 5)).toFixed(1)),
          averageResponseTime: parseFloat(Math.max(0.5, baseResponseTime + (Math.random() - 0.5) * 0.5).toFixed(1)),
          errorCount: Math.floor(Math.random() * 10),
          userSatisfaction: parseFloat(Math.max(70, Math.min(100, 85 + (Math.random() - 0.5) * 20)).toFixed(1)),
          revenueGenerated: Math.floor(parseFloat(agent.revenueImpact) * (0.9 + Math.random() * 0.2)),
          costIncurred: Math.floor(Math.random() * 500) + 100,
          planningArea: `PA-${Math.floor(Math.random() * 50) + 1}`,
          contextData: {
            dailyTasks: Math.floor(parseInt(agent.dailyInteractions) * (0.8 + Math.random() * 0.4)),
            revenueImpact: Math.floor(parseFloat(agent.revenueImpact) * (0.9 + Math.random() * 0.2)),
            productTypes: ["HVAC", "Plumbing", "Electrical", "Appliance"],
            callTypes: ["D2C", "B2B", "Emergency", "Maintenance"],
            jobCode: `JOB-${Math.floor(Math.random() * 100)}`
          }
        };
        
        this.agentPerformanceHistory.set(performanceData.id, performanceData);
      }
    }
  }

  async createAgentPerformanceHistory(history: Omit<AgentPerformanceHistory, 'id'>): Promise<AgentPerformanceHistory> {
    const newHistory: AgentPerformanceHistory = {
      id: this.currentAgentHistoryId++,
      ...history
    };
    
    this.agentPerformanceHistory.set(newHistory.id, newHistory);
    return newHistory;
  }

  async getHistoricalFilterOptions(): Promise<{
    planningAreas: string[];
    productTypes: string[];
    callTypes: string[];
    jobCodes: string[];
  }> {
    const metrics = Array.from(this.historicalMetrics.values());
    
    // Get unique values from actual data, excluding aggregate entries
    const uniquePlanningAreas = Array.from(new Set(metrics.map(m => m.planningArea)))
      .filter(area => area && !area.includes('National') && !area.includes('All'));
    
    const uniqueProductTypes = Array.from(new Set(metrics.map(m => m.productType)))
      .filter(type => type && !type.includes('All'));
      
    const uniqueCallTypes = Array.from(new Set(metrics.map(m => m.callType)))
      .filter(type => type && !type.includes('All'));
      
    const uniqueJobCodes = Array.from(new Set(metrics.map(m => m.jobCode)))
      .filter(code => code && !code.includes('All'));
    
    return {
      planningAreas: ['All Areas', ...uniquePlanningAreas.sort()],
      productTypes: ['All Products', ...uniqueProductTypes.sort()],
      callTypes: ['All Calls', 'D2C', 'B2B', ...uniqueCallTypes.filter(type => type.startsWith('B2B-')).sort(), 'Sears Protect (SP)', 'PA Assurant (PA)', 'Choice Home Warranty'],
      jobCodes: ['All Jobs', ...uniqueJobCodes.sort()]
    };
  }

  private seedHistoricalData() {
    // Generate comprehensive historical data for the last 90 days with multiple periods
    this.generateComprehensiveHistoricalData();
  }

  private generateComprehensiveHistoricalData() {
    const today = new Date();
    // Real planning areas from Excel data - top 430 areas with realistic names
    const realPlanningAreas = [
      '8107_H Houston Metro', '8309_B Sterling Heights', '7084_F Baltimore', '7435_C Miami',
      '7108_M East LA', '7995_A DFW Metro', '7108_S West LA', '8035_F Atlanta',
      '7108_N Inland Empire', '8380_F Allentown', '8184_X Sacramento', '7088_M Phoenix',
      '8175_G Norfolk', '7088_L San Diego', '8366_A Fresno', '8206_G Memphis',
      '7084_C Alexandria VA', '8555_SW Suburbs West', '7435_M Orlando', '8175_K Raleigh Durham',
      '7084_H St Charles', '8162_I Minneapolis', '8366_N Stockton, Modesto', '8147_A San Antonio',
      '7084_I Elkton', '8555_SS Suburbs South', '8420_K Kansas City', '7670_E Hartford',
      '8555_CS Chicago South', '4766_B Cleveland', '8210_M Richmond', '8184_H Cincinnati',
      '7199_B Dayton', '8210_E Louisville', '8184_S Columbus', '7199_F Toledo',
      '8210_R Lexington', '8184_K Akron', '7199_H Youngstown', '8210_C Nashville'
    ];
    
    // Generate additional areas to reach 430 total using real area patterns
    const planningAreas = [...realPlanningAreas];
    const areaPatterns = ['Metro', 'Central', 'North', 'South', 'East', 'West', 'Heights', 'Valley', 'Springs', 'Hills'];
    const majorCities = ['Chicago', 'Phoenix', 'Philadelphia', 'Detroit', 'Boston', 'Seattle', 'Denver', 'Washington DC', 'Portland', 'Las Vegas'];
    
    // Add more realistic areas to reach 430 total
    for (let i = realPlanningAreas.length; i < 430; i++) {
      const cityIndex = i % majorCities.length;
      const patternIndex = i % areaPatterns.length;
      const areaCode = 7000 + (i * 23) % 2000; // Generate realistic area codes
      const letter = String.fromCharCode(65 + (i % 26)); // A-Z
      planningAreas.push(`${areaCode}_${letter} ${majorCities[cityIndex]} ${areaPatterns[patternIndex]}`);
    }
    
    const productTypes = ['HVAC', 'Plumbing', 'Electrical', 'Refrigerator', 'Washer', 'Dryer', 'Dishwasher', 'Range', 'Microwave', 'Garbage Disposal'];
    const callTypes = ['D2C', 'B2B-AHS', 'B2B-Assurant', 'B2B-Choice', 'B2B-Other', 'Sears Protect (SP)', 'PA Assurant (PA)', 'Choice Home Warranty'];
    const jobCodes = Array.from({length: 20}, (_, i) => `JC-${i + 1}`);

    // Generate daily data for last 30 days (optimized)
    for (let dayOffset = 29; dayOffset >= 0; dayOffset--) {
      const date = subDays(today, dayOffset);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const weekendMultiplier = isWeekend ? 0.7 : 1.0;
      const mondayBoost = date.getDay() === 1 ? 1.2 : 1.0;

      // Generate hourly data for the last 3 days only
      if (dayOffset < 3) {
        for (let hour = 8; hour <= 18; hour++) {
          const timeStr = `${hour.toString().padStart(2, '0')}:00`;
          const hourMultiplier = 1.0;
          
          for (let areaIndex = 0; areaIndex < 10; areaIndex++) {
            const planningArea = planningAreas[areaIndex];
            const productType = productTypes[Math.floor(Math.random() * productTypes.length)];
            const callType = callTypes[Math.floor(Math.random() * callTypes.length)];
            const jobCode = jobCodes[Math.floor(Math.random() * jobCodes.length)];

            const metric = this.generateMetricData(dateStr, timeStr, 'hour', planningArea, productType, callType, jobCode, weekendMultiplier * mondayBoost * hourMultiplier);
            this.historicalMetrics.set(metric.id, metric);
          }
        }
      }

      // Generate daily data for more planning areas and all product types
      for (let areaIndex = 0; areaIndex < 50; areaIndex++) {
        const planningArea = planningAreas[areaIndex];
        
        // Ensure all product types have data, especially Garbage Disposal
        for (const productType of productTypes) {
          const callType = callTypes[Math.floor(Math.random() * callTypes.length)];
          const jobCode = jobCodes[Math.floor(Math.random() * jobCodes.length)];
          
          const metric = this.generateMetricData(dateStr, undefined, 'day', planningArea, productType, callType, jobCode, weekendMultiplier * mondayBoost);
          this.historicalMetrics.set(metric.id, metric);
        }
      }
    }

    // Generate weekly data with better coverage
    for (let weekOffset = 12; weekOffset >= 0; weekOffset--) {
      const date = subDays(today, weekOffset * 7);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      for (let areaIndex = 0; areaIndex < 50; areaIndex++) {
        const planningArea = planningAreas[areaIndex];
        
        for (const productType of productTypes) {
          const callType = callTypes[Math.floor(Math.random() * callTypes.length)];
          const jobCode = jobCodes[Math.floor(Math.random() * jobCodes.length)];
          
          const metric = this.generateMetricData(dateStr, undefined, 'week', planningArea, productType, callType, jobCode, 1.0, 7);
          this.historicalMetrics.set(metric.id, metric);
        }
      }
    }

    // Generate monthly data with better coverage
    for (let monthOffset = 11; monthOffset >= 0; monthOffset--) {
      const date = subDays(today, monthOffset * 30);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      for (let areaIndex = 0; areaIndex < 50; areaIndex++) {
        const planningArea = planningAreas[areaIndex];
        
        for (const productType of productTypes) {
          const callType = callTypes[Math.floor(Math.random() * callTypes.length)];
          const jobCode = jobCodes[Math.floor(Math.random() * jobCodes.length)];
          
          const metric = this.generateMetricData(dateStr, undefined, 'month', planningArea, productType, callType, jobCode, 1.0, 30);
          this.historicalMetrics.set(metric.id, metric);
        }
      }
    }

    console.log(`Generated ${this.historicalMetrics.size} historical metrics records`);
  }

  private generateMetricData(dateStr: string, timeStr: string | undefined, period: string, planningArea: string, productType: string, callType: string, jobCode: string, multiplier: number, periodDays: number = 1): HistoricalMetric {
    const id = Math.floor(Math.random() * 1000000) + this.historicalMetrics.size;
    
    // Adjust metrics based on product type for realistic variations
    let productMultiplier = 1.0;
    switch (productType) {
      case 'HVAC': productMultiplier = 1.4; break;
      case 'Plumbing': productMultiplier = 1.2; break;
      case 'Electrical': productMultiplier = 1.3; break;
      case 'Refrigerator': productMultiplier = 0.9; break;
      case 'Washer': productMultiplier = 0.8; break;
      case 'Dryer': productMultiplier = 0.7; break;
      case 'Dishwasher': productMultiplier = 0.8; break;
      case 'Range': productMultiplier = 0.9; break;
      case 'Microwave': productMultiplier = 0.6; break;
      case 'Garbage Disposal': productMultiplier = 0.5; break;
    }
    
    // Realistic revenue per call: $220-$240 (varies by product/call type)
    // Target profit per call: $80-$110 
    // First calculate call volume, then derive revenue from calls
    
    // Calculate call volume based on technician productivity
    // Each technician does 5-10 attempts per day (average 7.5)
    // Planning areas have different numbers of technicians
    const techniciansInArea = Math.max(1, Math.floor((320 / 430) * multiplier + Math.random() * 2));
    const attemptsPerTech = 6 + Math.random() * 4; // 6-10 attempts per technician per day
    const totalCalls = Math.round(techniciansInArea * attemptsPerTech * periodDays * productMultiplier);
    
    // Calculate revenue per call based on product type and call type
    let revenuePerCall = 230; // Base $230 per call
    
    // Product type adjustments
    switch (productType) {
      case 'HVAC': revenuePerCall = 280; break;          // Higher revenue for HVAC
      case 'Plumbing': revenuePerCall = 260; break;      // High revenue for plumbing
      case 'Electrical': revenuePerCall = 270; break;    // High revenue for electrical
      case 'Refrigerator': revenuePerCall = 240; break;  // Standard appliances
      case 'Washer': revenuePerCall = 220; break;        // Lower for washers
      case 'Dryer': revenuePerCall = 210; break;         // Lower for dryers
      case 'Dishwasher': revenuePerCall = 230; break;    // Standard dishwasher
      case 'Range': revenuePerCall = 240; break;         // Standard range
      case 'Microwave': revenuePerCall = 180; break;     // Lower for microwaves
      case 'Garbage Disposal': revenuePerCall = 160; break; // Lowest for disposal
    }
    
    // Call type adjustments (D2C typically higher than B2B)
    if (callType.startsWith('D2C')) {
      revenuePerCall *= 1.1; // D2C 10% higher
    } else if (callType.startsWith('B2B')) {
      revenuePerCall *= 0.9; // B2B 10% lower
    }
    
    // Add small random variation ±5%
    revenuePerCall *= (0.95 + Math.random() * 0.1);
    
    const totalRevenue = Math.round(totalCalls * revenuePerCall);
    
    // Calculate profit per call ($80-$110 range)
    let profitPerCall = 95; // Base $95 profit per call
    
    // Adjust profit per call based on product type
    switch (productType) {
      case 'HVAC': profitPerCall = 110; break;          // Highest profit for HVAC
      case 'Plumbing': profitPerCall = 105; break;      // High profit for plumbing
      case 'Electrical': profitPerCall = 108; break;    // High profit for electrical
      case 'Refrigerator': profitPerCall = 95; break;   // Standard appliances
      case 'Washer': profitPerCall = 85; break;         // Lower for washers
      case 'Dryer': profitPerCall = 80; break;          // Lower for dryers
      case 'Dishwasher': profitPerCall = 90; break;     // Standard dishwasher
      case 'Range': profitPerCall = 95; break;          // Standard range
      case 'Microwave': profitPerCall = 75; break;      // Lower for microwaves
      case 'Garbage Disposal': profitPerCall = 65; break; // Lowest for disposal
    }
    
    // Add small random variation ±5%
    profitPerCall *= (0.95 + Math.random() * 0.1);
    
    const totalProfit = Math.round(totalCalls * profitPerCall);
    const totalCost = totalRevenue - totalProfit;
    const profitMargin = Math.round((totalProfit / totalRevenue) * 100 * 100) / 100;

    // Calculate completion rates accounting for parts ordering
    // Many attempts require parts to be ordered, reducing same-day completion
    const completionRate = 0.4 + Math.random() * 0.2; // 40-60% completion rate (parts delays)
    const baseActiveJobs = Math.round(totalCalls * completionRate); // Completed jobs
    const baseOpenOrders = Math.round(totalCalls * 0.8); // 80% become open orders (including parts pending)

    return {
      id,
      date: dateStr,
      time: timeStr,
      period,
      totalAgents: 26,
      activeAgents: Math.floor((22 + Math.random() * 4) * multiplier),
      avgPerformance: Math.round((88 + Math.random() * 8) * 100) / 100,
      totalRevenue,
      totalCost,
      profitMargin,
      customerSatisfaction: Math.round((88 + Math.random() * 8) * 100) / 100,
      callVolume: totalCalls,
      conversionRate: Math.round((51 + Math.random() * 8) * 100) / 100,
      techniciansDeployed: techniciansInArea,
      activeJobs: Math.round(baseActiveJobs),
      openOrders: Math.round(baseOpenOrders),
      planningArea,
      productType,
      callType,
      jobCode,
      orderStatuses: {
        waitingService: Math.round(baseOpenOrders * 0.267),
        waitingParts: Math.round(baseOpenOrders * 0.4),
        rescheduleNeeded: Math.round(baseOpenOrders * 0.133),
        assignedToday: Math.round(baseOpenOrders * 0.122),
        tentative: Math.round(baseOpenOrders * 0.078)
      },
      additionalMetrics: {
        emergencyCalls: Math.floor((28 + Math.random() * 15) * multiplier * periodDays),
        avgResponseTime: Math.round((2.3 + Math.random() * 0.8) * 100) / 100,
        firstCallResolution: Math.round((82 + Math.random() * 10) * 100) / 100,
        pptProfit: Math.round((320000 / 430) * multiplier * periodDays * (0.8 + Math.random() * 0.4))
      }
    };
  }

  private oldSeedHistoricalData() {
    // Keep the old implementation for reference but don't use
    const startDate = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate realistic variations
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const weekendMultiplier = isWeekend ? 0.7 : 1.0;
      const mondayBoost = dayOfWeek === 1 ? 1.15 : 1.0;
      
      // Daily metrics
      const dailyMetric: Omit<HistoricalMetric, 'id'> = {
        date: dateStr,
        period: 'day',
        totalAgents: 26,
        activeAgents: Math.floor((22 + Math.random() * 4) * weekendMultiplier),
        avgPerformance: Math.round((85 + Math.random() * 10) * 100) / 100,
        totalRevenue: Math.round((1000000 / 430) * weekendMultiplier * mondayBoost * (0.8 + Math.random() * 0.4)),
        totalCost: Math.round((680000 / 430) * weekendMultiplier * (0.8 + Math.random() * 0.4)),
        profitMargin: 0, // Will be calculated
        customerSatisfaction: Math.round((88 + Math.random() * 8) * 100) / 100,
        callVolume: Math.floor((8500 + Math.random() * 500) * weekendMultiplier * mondayBoost),
        conversionRate: Math.round((51 + Math.random() * 8) * 100) / 100,
        techniciansDeployed: Math.floor((320 + Math.random() * 50) * weekendMultiplier),
        activeJobs: Math.floor((8500 / 430) * weekendMultiplier + Math.random() * 5),
        openOrders: Math.floor((45000 / 430) + Math.random() * 20),
        planningArea: `PA-${Math.floor(Math.random() * 430) + 1}`,
        productType: ['HVAC', 'Plumbing', 'Electrical', 'Appliance'][Math.floor(Math.random() * 4)],
        callType: ['D2C', 'B2B', 'Emergency', 'Maintenance'][Math.floor(Math.random() * 4)],
        jobCode: `JC-${Math.floor(Math.random() * 100) + 1}`,
        orderStatuses: {
          waitingService: Math.floor((45000 / 430) * 0.25 + Math.random() * 20),
          waitingParts: Math.floor((45000 / 430) * 0.20 + Math.random() * 15),
          rescheduleNeeded: Math.floor((45000 / 430) * 0.15 + Math.random() * 10),
          assignedToday: Math.floor((45000 / 430) * 0.25 + Math.random() * 20),
          tentative: Math.floor((45000 / 430) * 0.15 + Math.random() * 10)
        },
        additionalMetrics: {
          emergencyCalls: Math.floor((28 + Math.random() * 15) * weekendMultiplier),
          avgResponseTime: Math.round((2.3 + Math.random() * 0.8) * 100) / 100,
          firstCallResolution: Math.round((82 + Math.random() * 10) * 100) / 100,
          pptProfit: Math.round((320000 / 430) * weekendMultiplier * mondayBoost * (0.8 + Math.random() * 0.4))
        }
      };
      
      // Calculate profit margin
      dailyMetric.profitMargin = Math.round(((dailyMetric.totalRevenue - dailyMetric.totalCost) / dailyMetric.totalRevenue) * 100 * 100) / 100;
      
      this.createHistoricalMetric(dailyMetric);
      
      // Generate hourly data for the last 3 days
      if (i >= 27) {
        for (let hour = 0; hour < 24; hour++) {
          const hourlyMultiplier = hour >= 8 && hour <= 18 ? 1.0 : 0.3;
          
          const hourlyMetric: Omit<HistoricalMetric, 'id'> = {
            date: dateStr,
            time: `${hour.toString().padStart(2, '0')}:00`,
            period: 'hour',
            totalAgents: 26,
            activeAgents: Math.floor((22 + Math.random() * 4) * hourlyMultiplier),
            avgPerformance: Math.round((85 + Math.random() * 10) * 100) / 100,
            totalRevenue: Math.round((1000000 / 430 / 24) * hourlyMultiplier * (0.8 + Math.random() * 0.4)),
            totalCost: Math.round((680000 / 430 / 24) * hourlyMultiplier * (0.8 + Math.random() * 0.4)),
            profitMargin: 0,
            customerSatisfaction: Math.round((86 + Math.random() * 10) * 100) / 100,
            callVolume: Math.floor((8500 / 430 / 24) * hourlyMultiplier + Math.random() * 2),
            conversionRate: Math.round((48 + Math.random() * 12) * 100) / 100,
            techniciansDeployed: Math.floor((320 / 430) * hourlyMultiplier + Math.random() * 2),
            activeJobs: Math.floor((8500 / 430 / 24) * hourlyMultiplier + Math.random() * 2),
            openOrders: Math.floor((45000 / 430) + Math.random() * 10),
            planningArea: `PA-${Math.floor(Math.random() * 430) + 1}`,
            productType: ['HVAC', 'Plumbing', 'Electrical', 'Appliance'][Math.floor(Math.random() * 4)],
            callType: ['D2C', 'B2B', 'Emergency', 'Maintenance'][Math.floor(Math.random() * 4)],
            jobCode: `JC-${Math.floor(Math.random() * 100) + 1}`,
            orderStatuses: {
              waitingService: Math.floor((45000 / 430) * 0.25 + Math.random() * 10),
              waitingParts: Math.floor((45000 / 430) * 0.20 + Math.random() * 8),
              rescheduleNeeded: Math.floor((45000 / 430) * 0.15 + Math.random() * 5),
              assignedToday: Math.floor((45000 / 430) * 0.25 + Math.random() * 10),
              tentative: Math.floor((45000 / 430) * 0.15 + Math.random() * 5)
            },
            additionalMetrics: {
              emergencyCalls: Math.floor((28 / 24) * hourlyMultiplier + Math.random() * 2),
              avgResponseTime: Math.round((2.3 + Math.random() * 0.8) * 100) / 100,
              firstCallResolution: Math.round((82 + Math.random() * 10) * 100) / 100,
              pptProfit: Math.round((320000 / 430 / 24) * hourlyMultiplier * (0.8 + Math.random() * 0.4))
            }
          };
          
          hourlyMetric.profitMargin = Math.round(((hourlyMetric.totalRevenue - hourlyMetric.totalCost) / hourlyMetric.totalRevenue) * 100 * 100) / 100;
          
          this.createHistoricalMetric(hourlyMetric);
        }
      }
      
      // Generate agent performance history for key agents
      const keyAgentIds = [1, 2, 3, 4, 5]; // Top 5 agents
      
      keyAgentIds.forEach(agentId => {
        const agentHistory: Omit<AgentPerformanceHistory, 'id'> = {
          agentId,
          date: dateStr,
          performance: Math.round((85 + Math.random() * 12) * 100) / 100,
          interactions: Math.floor((150 + Math.random() * 100) * weekendMultiplier),
          successRate: Math.round((92 + Math.random() * 6) * 100) / 100,
          averageResponseTime: Math.round((0.8 + Math.random() * 0.4) * 1000) / 1000,
          errorCount: Math.floor(Math.random() * 3),
          userSatisfaction: Math.round((88 + Math.random() * 8) * 100) / 100,
          revenueGenerated: Math.round((8000 + Math.random() * 4000) * weekendMultiplier * 100) / 100,
          costIncurred: Math.round((5000 + Math.random() * 2000) * weekendMultiplier * 100) / 100,
          planningArea: `Area-${Math.floor(Math.random() * 10) + 1}`,
          contextData: {
            callTypes: ['emergency', 'maintenance', 'installation'],
            productTypes: ['HVAC', 'Plumbing', 'Electrical'],
            seasonalFactor: Math.random() > 0.5 ? 'high' : 'normal'
          }
        };
        
        this.createAgentPerformanceHistory(agentHistory);
      });
    }
  }

  // Authentication method implementations
  async getUserByUsername(username: string): Promise<(User & { permissions: string[] }) | undefined> {
    return this.users.get(username);
  }

  async getUserByToken(token: string): Promise<(User & { permissions: string[] }) | undefined> {
    const userId = this.tokenToUserId.get(token);
    if (!userId) return undefined;
    return this.users.get(userId);
  }

  async createUser(userData: InsertUser): Promise<User & { permissions: string[] }> {
    const user: User & { permissions: string[] } = {
      id: userData.id || generateId(),
      username: userData.username,
      passwordHash: userData.passwordHash,
      role: userData.role || 'viewer',
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      email: userData.email,
      permissions: userData.permissions || [],
      isActive: userData.isActive ?? true,
      lastLoginAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.users.set(user.username, user);
    return user;
  }

  setUserToken(token: string, userId: string) {
    this.tokenToUserId.set(token, userId);
  }

  async getAllUsers(): Promise<(User & { permissions: string[] })[]> {
    return Array.from(this.users.values());
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<(User & { permissions: string[] }) | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;

    const updatedUser: User & { permissions: string[] } = {
      ...existingUser,
      ...userData,
      updatedAt: new Date()
    };

    // If username changed, update the key
    if (userData.username && userData.username !== existingUser.username) {
      this.users.delete(existingUser.username);
      this.users.set(userData.username, updatedUser);
    } else {
      this.users.set(id, updatedUser);
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;
    
    this.users.delete(id);
    
    // Remove any tokens associated with this user
    for (const [token, userId] of this.tokenToUserId.entries()) {
      if (userId === id) {
        this.tokenToUserId.delete(token);
      }
    }
    
    return true;
  }

  private initializeDynamicEvaluationData() {
    // DO NOT clear existing templates - they were already created by seedEvaluationTemplates()
    // this.evaluationTemplates.clear();
    // this.currentTemplateId = 1;
    
    // Initialize Evaluation Templates
    const sampleTemplates: InsertEvaluationTemplate[] = [
      {
        name: "Novice Conversational AI Evaluation",
        description: "Basic evaluation for conversational AI agents focusing on communication fundamentals",
        agentType: "Conversational AI", 
        maturityLevel: "novice",
        criteria: [
          { name: "Basic Response Quality", weight: 40 },
          { name: "Context Understanding", weight: 30 },
          { name: "Response Speed", weight: 20 },
          { name: "User Satisfaction", weight: 10 }
        ]
      },
      {
        name: "Advanced Conversational AI Evaluation",
        description: "Advanced evaluation for experienced conversational AI agents",
        agentType: "Conversational AI",
        maturityLevel: "advanced", 
        criteria: [
          { name: "Complex Query Handling", weight: 30 },
          { name: "Multi-turn Conversations", weight: 25 },
          { name: "Contextual Awareness", weight: 25 },
          { name: "Personalization", weight: 20 }
        ]
      },
      {
        name: "Analytical AI Assessment",
        description: "Intermediate evaluation for analytical AI agents",
        agentType: "Analytics AI",
        maturityLevel: "intermediate",
        criteria: [
          { name: "Data Processing", weight: 35 },
          { name: "Pattern Recognition", weight: 30 },
          { name: "Insight Generation", weight: 25 },
          { name: "Report Accuracy", weight: 10 }
        ]
      },
      {
        name: "Novice Field Coordinator Assessment",
        description: "Basic evaluation for new field coordination agents focusing on fundamental coordination skills",
        agentType: "Field Coordinator", 
        maturityLevel: "novice",
        criteria: [
          { name: "Basic Response Time", weight: 35 },
          { name: "Simple Technician Matching", weight: 30 },
          { name: "Standard Emergency Handling", weight: 20 },
          { name: "Basic Customer Communication", weight: 15 }
        ]
      },
      {
        name: "Field Coordinator Assessment",
        description: "Comprehensive evaluation for field coordination agents focusing on response time and technician management",
        agentType: "Field Coordinator", 
        maturityLevel: "intermediate",
        criteria: [
          { name: "Response Time Optimization", weight: 30 },
          { name: "Technician Match Accuracy", weight: 25 },
          { name: "Emergency Handling", weight: 20 },
          { name: "Customer Communication", weight: 15 },
          { name: "System Integration", weight: 10 }
        ]
      },
      {
        name: "AI Diagnostics Advanced Evaluation",
        description: "Advanced evaluation template for diagnostic AI agents with focus on accuracy and predictive capabilities",
        agentType: "Diagnostics AI",
        maturityLevel: "advanced", 
        criteria: [
          { name: "Diagnostic Accuracy", weight: 35 },
          { name: "Predictive Maintenance", weight: 25 },
          { name: "IoT Integration", weight: 20 },
          { name: "Energy Optimization", weight: 15 },
          { name: "Pattern Recognition", weight: 5 }
        ]
      },
      {
        name: "Analytics AI Expert Assessment",
        description: "Expert-level evaluation for analytics agents focusing on data insights and business intelligence",
        agentType: "Analytics AI",
        maturityLevel: "expert",
        criteria: [
          { name: "Data Analysis Depth", weight: 30 },
          { name: "Business Impact Insights", weight: 25 },
          { name: "Trend Prediction", weight: 20 },
          { name: "Report Quality", weight: 15 },
          { name: "Actionable Recommendations", weight: 10 }
        ]
      }
    ];

    // Skip adding old templates - Universal templates already created
    // sampleTemplates.forEach(template => {
    //   const id = this.currentTemplateId++;
    //   const newTemplate: EvaluationTemplate = {
    //     ...template,
    //     id,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   this.evaluationTemplates.set(id, newTemplate);
    // });
    console.log(`Preserving existing Universal templates: ${this.evaluationTemplates.size} templates`);

    // Initialize Agent Maturity data for ALL agents
    const agents = Array.from(this.agents.values()); // Get all 26 agents
    agents.forEach(agent => {
      const maturity: AgentMaturity = {
        id: agent.id,
        agentId: agent.id,
        experiencePoints: Math.floor(Math.random() * 5000) + 1000,
        currentLevel: Math.floor(Math.random() * 5) + 1,
        skillProficiency: {
          technical: Math.floor(Math.random() * 30) + 70,
          communication: Math.floor(Math.random() * 25) + 75,
          problemSolving: Math.floor(Math.random() * 20) + 80,
          adaptability: Math.floor(Math.random() * 35) + 65
        },
        learningRate: Math.floor(Math.random() * 20) + 80,
        adaptationSpeed: Math.floor(Math.random() * 25) + 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.agentMaturity.set(agent.id, maturity);
    });

    // Initialize Dynamic Evaluations
    const sampleEvaluations: InsertDynamicEvaluation[] = [
      {
        agentId: 1,
        templateId: 1,
        evaluatorType: "automated",
        overallScore: 87.5,
        criteriaScores: {
          "Response Time Optimization": 92,
          "Technician Match Accuracy": 89,
          "Emergency Handling": 85,
          "Customer Communication": 86,
          "System Integration": 83
        },
        strengths: ["Excellent emergency response times", "High technician satisfaction scores"],
        improvementAreas: ["System integration could be smoother", "Communication templates need updating"],
        recommendations: ["Implement advanced routing algorithms", "Update customer communication templates", "Integrate with new IoT devices"],
        confidence: 94.2,
        feedback: "Agent demonstrates strong performance in core areas with room for technical improvements."
      },
      {
        agentId: 2,
        templateId: 2,
        evaluatorType: "human",
        overallScore: 92.3,
        criteriaScores: {
          "Diagnostic Accuracy": 94,
          "Predictive Maintenance": 91,
          "IoT Integration": 89,
          "Energy Optimization": 93,
          "Pattern Recognition": 95
        },
        strengths: ["Outstanding diagnostic precision", "Excellent predictive capabilities"],
        improvementAreas: ["IoT integration latency", "Complex pattern edge cases"],
        recommendations: ["Optimize IoT data processing pipeline", "Enhance pattern recognition for unusual cases"],
        confidence: 96.8,
        feedback: "Exceptional performance across all metrics with minor optimization opportunities."
      }
    ];

    sampleEvaluations.forEach(evaluation => {
      const id = this.currentDynamicEvalId++;
      const newEvaluation: DynamicEvaluation = {
        ...evaluation,
        id,
        completedAt: new Date(),
      };
      this.dynamicEvaluations.set(id, newEvaluation);
    });

    // Initialize Agent Data Feedback
    const sampleFeedback: InsertAgentDataFeedback[] = [
      {
        agentId: 1,
        dataType: "Performance Metrics",
        insights: [
          "Response time has improved 15% over the last month",
          "Customer satisfaction scores trending upward",
          "Emergency calls handled with 98.2% success rate"
        ],
        actionItems: [
          "Implement new routing algorithm for 20% efficiency gain",
          "Update emergency response protocols",
          "Integrate customer feedback loop"
        ],
        status: "processing",
        priority: "high"
      },
      {
        agentId: 2,
        dataType: "Diagnostic Accuracy",
        insights: [
          "Diagnostic precision reached 96.8% accuracy",
          "Predictive maintenance preventing 89% of failures",
          "Energy optimization saving average $340 per service"
        ],
        actionItems: [
          "Expand IoT sensor integration",
          "Develop seasonal adjustment algorithms",
          "Create energy efficiency benchmarking"
        ],
        status: "applied",
        priority: "medium"
      },
      {
        agentId: 3,
        dataType: "Business Intelligence",
        insights: [
          "Revenue impact analysis showing 23% improvement",
          "Cost optimization opportunities identified",
          "Market trend predictions 91% accurate"
        ],
        actionItems: [
          "Implement advanced cost modeling",
          "Develop market expansion algorithms",
          "Create competitor analysis framework"
        ],
        status: "pending",
        priority: "medium"
      }
    ];

    sampleFeedback.forEach(feedback => {
      const id = this.currentDataFeedbackId++;
      const newFeedback: AgentDataFeedback = {
        ...feedback,
        id,
        createdAt: new Date(),
      };
      this.agentDataFeedback.set(id, newFeedback);
    });

    // Initialize Improvement Actions
    const sampleActions: InsertImprovementAction[] = [
      {
        agentId: 1,
        title: "Implement Advanced Routing Algorithm",
        description: "Deploy new routing optimization system to reduce travel time by 20%",
        category: "performance_optimization",
        priority: "high",
        status: "in_progress",
        targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        expectedImpact: "20% reduction in travel time, 15% increase in daily job capacity",
        assignedTo: "Technical Team",
        progressNotes: ["Algorithm testing completed", "Integration phase in progress", "Beta deployment scheduled"]
      },
      {
        agentId: 2,
        title: "IoT Sensor Data Pipeline Optimization",
        description: "Optimize data processing pipeline for faster IoT sensor integration",
        category: "technical_improvement",
        priority: "medium",
        status: "planned",
        targetDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
        expectedImpact: "30% faster diagnostic processing, improved real-time monitoring", 
        assignedTo: "IoT Integration Team",
        progressNotes: ["Requirements gathering complete", "Architecture design in progress"]
      },
      {
        agentId: 1,
        title: "Customer Communication Template Update",
        description: "Modernize customer communication templates for better engagement",
        category: "user_experience",
        priority: "medium",
        status: "completed",
        targetDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        expectedImpact: "25% improvement in customer satisfaction scores",
        assignedTo: "UX Team",
        progressNotes: ["Templates redesigned", "A/B testing completed", "Full deployment successful"]
      },
      {
        agentId: 3,
        title: "Advanced Cost Modeling Implementation",
        description: "Develop sophisticated cost modeling algorithms for better financial insights",
        category: "business_intelligence", 
        priority: "high",
        status: "in_progress",
        targetDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        expectedImpact: "Improve cost prediction accuracy by 35%, identify $2M in savings",
        assignedTo: "Data Science Team",
        progressNotes: ["Data collection complete", "Model training in progress", "Initial validation showing promising results"]
      }
    ];

    sampleActions.forEach(action => {
      const id = this.currentActionId++;
      const newAction: ImprovementAction = {
        ...action,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.improvementActions.set(id, newAction);
    });
  }

  constructor() {
    console.log('Initializing MemStorage...');
    this.initializeData();
    // Initialize users asynchronously but don't block constructor
    this.initializeUsers().catch(console.error);
    this.initializeDynamicEvaluationData();
    console.log('MemStorage initialization complete - agents count:', this.agents.size);
  }

  private async initializeUsers() {
    console.log('Starting user initialization...');
    // Import ROLE_PERMISSIONS to ensure proper role-based permissions
    const { ROLE_PERMISSIONS } = await import('../shared/permissions');
    
    // Create demo users with hashed passwords
    const bcrypt = await import('bcrypt');
    
    const demoUsers = [
      {
        id: 'admin',
        username: 'admin',
        passwordHash: await bcrypt.hash('admin123', 10),
        role: 'admin' as const,
        firstName: 'System',
        lastName: 'Administrator',
        email: 'admin@company.com',
        permissions: ROLE_PERMISSIONS.admin, // Use all permissions for admin
        isActive: true
      },
      {
        id: 'executive',
        username: 'executive',
        passwordHash: await bcrypt.hash('executive123', 10),
        role: 'executive' as const,
        firstName: 'Executive',
        lastName: 'User',
        email: 'executive@company.com',
        permissions: ROLE_PERMISSIONS.executive, // Use executive permissions
        isActive: true
      },
      {
        id: 'manager',
        username: 'manager',
        passwordHash: await bcrypt.hash('manager123', 10),
        role: 'manager' as const,
        firstName: 'Manager',
        lastName: 'User',
        email: 'manager@company.com',
        permissions: ROLE_PERMISSIONS.manager, // Use manager permissions
        isActive: true
      },
      {
        id: 'operator',
        username: 'operator',
        passwordHash: await bcrypt.hash('operator123', 10),
        role: 'operator' as const,
        firstName: 'Operator',
        lastName: 'User',
        email: 'operator@company.com',
        permissions: ROLE_PERMISSIONS.operator, // Use operator permissions
        isActive: true
      },
      {
        id: 'viewer',
        username: 'viewer',
        passwordHash: await bcrypt.hash('viewer123', 10),
        role: 'viewer' as const,
        firstName: 'Viewer',
        lastName: 'User',
        email: 'viewer@company.com',
        permissions: ROLE_PERMISSIONS.viewer, // Use viewer permissions
        isActive: true
      }
    ];

    for (const userData of demoUsers) {
      await this.createUser(userData);
    }
  }

  // HOA Prospect Management Implementation
  async getHOAProspects(status?: string, priority?: string): Promise<HOAProspect[]> {
    const prospects = Array.from(this.hoaProspects.values());
    return prospects.filter(prospect => 
      (!status || prospect.status === status) &&
      (!priority || prospect.priority === priority)
    );
  }

  async getHOAProspect(id: number): Promise<HOAProspect | undefined> {
    return this.hoaProspects.get(id);
  }

  async createHOAProspect(prospect: InsertHOAProspect): Promise<HOAProspect> {
    const id = generateId();
    const now = new Date();
    const newProspect: HOAProspect = {
      id,
      ...prospect,
      createdAt: now,
      updatedAt: now
    };
    this.hoaProspects.set(id, newProspect);
    return newProspect;
  }

  async updateHOAProspect(id: number, prospect: Partial<InsertHOAProspect>): Promise<HOAProspect | undefined> {
    const existing = this.hoaProspects.get(id);
    if (!existing) return undefined;
    
    const updated: HOAProspect = {
      ...existing,
      ...prospect,
      updatedAt: new Date()
    };
    this.hoaProspects.set(id, updated);
    return updated;
  }

  async deleteHOAProspect(id: number): Promise<boolean> {
    return this.hoaProspects.delete(id);
  }

  async getHOAProspectStrategies(prospectId?: number, status?: string): Promise<HOAProspectStrategy[]> {
    const strategies = Array.from(this.hoaProspectStrategies.values());
    return strategies.filter(strategy => 
      (!prospectId || strategy.prospectId === prospectId) &&
      (!status || strategy.strategyStatus === status)
    );
  }

  async getHOAProspectStrategy(id: number): Promise<HOAProspectStrategy | undefined> {
    return this.hoaProspectStrategies.get(id);
  }

  async createHOAProspectStrategy(strategy: InsertHOAProspectStrategy): Promise<HOAProspectStrategy> {
    const id = generateId();
    const now = new Date();
    const newStrategy: HOAProspectStrategy = {
      id,
      ...strategy,
      createdAt: now,
      updatedAt: now
    };
    this.hoaProspectStrategies.set(id, newStrategy);
    return newStrategy;
  }

  async updateHOAProspectStrategy(id: number, strategy: Partial<InsertHOAProspectStrategy>): Promise<HOAProspectStrategy | undefined> {
    const existing = this.hoaProspectStrategies.get(id);
    if (!existing) return undefined;
    
    const updated: HOAProspectStrategy = {
      ...existing,
      ...strategy,
      updatedAt: new Date()
    };
    this.hoaProspectStrategies.set(id, updated);
    return updated;
  }

  async deleteHOAProspectStrategy(id: number): Promise<boolean> {
    return this.hoaProspectStrategies.delete(id);
  }

  async getHOAProspectActivities(prospectId?: number, strategyId?: number): Promise<HOAProspectActivity[]> {
    const activities = Array.from(this.hoaProspectActivities.values());
    return activities.filter(activity => 
      (!prospectId || activity.prospectId === prospectId) &&
      (!strategyId || activity.strategyId === strategyId)
    );
  }

  async createHOAProspectActivity(activity: InsertHOAProspectActivity): Promise<HOAProspectActivity> {
    const id = generateId();
    const newActivity: HOAProspectActivity = {
      id,
      ...activity,
      createdAt: new Date()
    };
    this.hoaProspectActivities.set(id, newActivity);
    return newActivity;
  }

  async updateHOAProspectActivity(id: number, activity: Partial<InsertHOAProspectActivity>): Promise<HOAProspectActivity | undefined> {
    const existing = this.hoaProspectActivities.get(id);
    if (!existing) return undefined;
    
    const updated: HOAProspectActivity = {
      ...existing,
      ...activity
    };
    this.hoaProspectActivities.set(id, updated);
    return updated;
  }

  async generateProspectStrategy(prospectId: number): Promise<HOAProspectStrategy> {
    const prospect = await this.getHOAProspect(prospectId);
    if (!prospect) {
      throw new Error('Prospect not found');
    }

    // Generate AI-powered strategy based on prospect characteristics
    const strategy = this.createStrategyBasedOnCharacteristics(prospect);
    return this.createHOAProspectStrategy(strategy);
  }

  private createStrategyBasedOnCharacteristics(prospect: HOAProspect): InsertHOAProspectStrategy {
    const { communitySize, homeValueRange, communityType, location } = prospect;
    
    let strategyName = '';
    let valueProposition = '';
    let keyMessages: string[] = [];
    let proposedServices: string[] = [];
    let pricingStrategy = '';
    let expectedRevenue = 0;
    let successProbability = 0;
    let competitiveAdvantages: string[] = [];
    let approachMethod = '';
    let timeline = '';
    let targetAudience = '';

    // Strategy generation based on community size
    if (communitySize < 50) {
      strategyName = 'Boutique Community Premium Service';
      valueProposition = 'Personalized, high-touch service for exclusive communities';
      approachMethod = 'In-person presentation to board';
      timeline = '30 days';
      targetAudience = 'Board members and property manager';
      expectedRevenue = 25000;
      successProbability = 75;
      keyMessages = [
        'Personalized service with dedicated account manager',
        'Flexible scheduling to minimize resident disruption',
        'Premium quality with boutique attention to detail'
      ];
      proposedServices = ['24/7 Emergency Response', 'Concierge-Level Service', 'Monthly Board Reports'];
      competitiveAdvantages = ['Personalized service', 'Board-level reporting', 'Flexible contracts'];
    } else if (communitySize < 200) {
      strategyName = 'Mid-Size Community Value Partnership';
      valueProposition = 'Cost-effective, reliable service with proven track record';
      approachMethod = 'Professional presentation with references';
      timeline = '45 days';
      targetAudience = 'Property manager and board president';
      expectedRevenue = 75000;
      successProbability = 65;
      keyMessages = [
        'Proven track record with similar-sized communities',
        'Cost savings through efficient operations',
        'Comprehensive maintenance program'
      ];
      proposedServices = ['Preventive Maintenance', 'Emergency Response', 'Vendor Coordination'];
      competitiveAdvantages = ['Competitive pricing', 'Proven systems', 'Local expertise'];
    } else {
      strategyName = 'Large Community Enterprise Solution';
      valueProposition = 'Enterprise-grade service with technology integration';
      approachMethod = 'Multi-phase presentation with pilot program';
      timeline = '60 days';
      targetAudience = 'Property management company and HOA board';
      expectedRevenue = 150000;
      successProbability = 55;
      keyMessages = [
        'Enterprise technology platform for real-time tracking',
        'Scalable operations with dedicated team',
        'Comprehensive reporting and analytics'
      ];
      proposedServices = ['Technology Platform', 'Dedicated Team', 'Performance Analytics'];
      competitiveAdvantages = ['Technology integration', 'Scalable operations', 'Data analytics'];
    }

    // Adjust strategy based on home values
    if (homeValueRange.includes('1M+') || homeValueRange.includes('800K+')) {
      successProbability += 10;
      expectedRevenue *= 1.3;
      keyMessages.push('Premium service standards for luxury communities');
      competitiveAdvantages.push('Luxury market experience');
      pricingStrategy = 'Premium pricing with value justification';
    } else if (homeValueRange.includes('300-500K')) {
      pricingStrategy = 'Competitive pricing with efficiency focus';
      keyMessages.push('Cost-effective solutions without compromising quality');
    } else {
      pricingStrategy = 'Value pricing with flexible payment options';
      keyMessages.push('Budget-friendly options with payment flexibility');
    }

    // Adjust strategy based on community type
    if (communityType === 'Condos') {
      proposedServices.push('HVAC Maintenance', 'Common Area Upkeep');
      keyMessages.push('Expertise in high-density residential maintenance');
    } else if (communityType === 'Single Family') {
      proposedServices.push('Landscape Coordination', 'Individual Home Services');
      keyMessages.push('Comprehensive home service solutions');
    }

    // Location-based adjustments
    if (location.includes('FL') || location.includes('Florida')) {
      proposedServices.push('Hurricane Preparedness', 'Pool Maintenance');
      keyMessages.push('Florida-specific expertise and emergency preparedness');
    }

    const risksAndMitigations = [
      { risk: 'Incumbent provider resistance', mitigation: 'Highlight service gaps and improvement opportunities' },
      { risk: 'Budget constraints', mitigation: 'Flexible pricing and phased implementation' },
      { risk: 'Board decision delays', mitigation: 'Clear timeline and decision-making support' }
    ];

    const nextSteps = [
      'Schedule initial discovery meeting',
      'Conduct community needs assessment',
      'Prepare customized proposal',
      'Present to board or property manager'
    ];

    return {
      prospectId: prospect.id,
      strategyName,
      targetAudience,
      valueProposition,
      approachMethod,
      timeline,
      keyMessages,
      proposedServices,
      pricingStrategy,
      expectedRevenue,
      successProbability,
      competitiveAdvantages,
      risksAndMitigations,
      nextSteps,
      strategyStatus: 'draft'
    };
  }

  // 1099 Contractor Recruitment implementation
  private contractorRecruitments: ContractorRecruitment[] = [];
  private recruitmentActivities: RecruitmentActivity[] = [];
  private recruitmentTargets: RecruitmentTarget[] = [];
  private firmTechnicians: FirmTechnician[] = [];

  async getContractorRecruitments(filters?: {
    planningArea?: string;
    recruitmentStatus?: string;
    serviceSkills?: string[];
    productSpecialties?: string[];
  }): Promise<ContractorRecruitment[]> {
    let results = [...this.contractorRecruitments];
    
    if (filters?.planningArea) {
      results = results.filter(contractor => contractor.planningArea === filters.planningArea);
    }
    
    if (filters?.recruitmentStatus) {
      results = results.filter(contractor => contractor.recruitmentStatus === filters.recruitmentStatus);
    }
    
    if (filters?.serviceSkills && filters.serviceSkills.length > 0) {
      results = results.filter(contractor => 
        filters.serviceSkills!.some(skill => contractor.serviceSkills.includes(skill))
      );
    }
    
    if (filters?.productSpecialties && filters.productSpecialties.length > 0) {
      results = results.filter(contractor => 
        filters.productSpecialties!.some(product => contractor.productSpecialties.includes(product))
      );
    }
    
    return results;
  }

  async getContractorRecruitment(id: number): Promise<ContractorRecruitment | undefined> {
    return this.contractorRecruitments.find(contractor => contractor.id === id);
  }

  async createContractorRecruitment(contractor: InsertContractorRecruitment): Promise<ContractorRecruitment> {
    const newContractor: ContractorRecruitment = {
      ...contractor,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.contractorRecruitments.push(newContractor);
    return newContractor;
  }

  async updateContractorRecruitment(id: number, updates: Partial<InsertContractorRecruitment>): Promise<ContractorRecruitment> {
    const index = this.contractorRecruitments.findIndex(contractor => contractor.id === id);
    if (index === -1) {
      throw new Error(`Contractor with id ${id} not found`);
    }
    
    this.contractorRecruitments[index] = {
      ...this.contractorRecruitments[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    return this.contractorRecruitments[index];
  }

  async deleteContractorRecruitment(id: number): Promise<void> {
    const index = this.contractorRecruitments.findIndex(contractor => contractor.id === id);
    if (index === -1) {
      throw new Error(`Contractor with id ${id} not found`);
    }
    
    this.contractorRecruitments.splice(index, 1);
    // Also delete associated firm technicians
    this.firmTechnicians = this.firmTechnicians.filter(tech => tech.contractorFirmId !== id);
  }

  // Firm Technicians implementation
  async getFirmTechnicians(contractorFirmId: number): Promise<FirmTechnician[]> {
    return this.firmTechnicians.filter(tech => tech.contractorFirmId === contractorFirmId);
  }

  async createFirmTechnician(technician: InsertFirmTechnician): Promise<FirmTechnician> {
    const newTechnician: FirmTechnician = {
      id: generateId(),
      ...technician,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.firmTechnicians.push(newTechnician);
    return newTechnician;
  }

  async updateFirmTechnician(id: number, updates: Partial<InsertFirmTechnician>): Promise<FirmTechnician> {
    const index = this.firmTechnicians.findIndex(tech => tech.id === id);
    if (index === -1) {
      throw new Error(`Firm technician with id ${id} not found`);
    }
    
    this.firmTechnicians[index] = {
      ...this.firmTechnicians[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    return this.firmTechnicians[index];
  }

  async deleteFirmTechnician(id: number): Promise<void> {
    const index = this.firmTechnicians.findIndex(tech => tech.id === id);
    if (index !== -1) {
      this.firmTechnicians.splice(index, 1);
    }
  }

  async getRecruitmentActivities(contractorId?: number): Promise<RecruitmentActivity[]> {
    if (contractorId) {
      return this.recruitmentActivities.filter(activity => activity.contractorId === contractorId);
    }
    return [...this.recruitmentActivities];
  }

  async createRecruitmentActivity(activity: InsertRecruitmentActivity): Promise<RecruitmentActivity> {
    const newActivity: RecruitmentActivity = {
      ...activity,
      id: generateId(),
      createdAt: new Date(),
    };
    
    this.recruitmentActivities.push(newActivity);
    return newActivity;
  }

  async getRecruitmentTargets(planningArea?: string): Promise<RecruitmentTarget[]> {
    if (planningArea) {
      return this.recruitmentTargets.filter(target => target.planningArea === planningArea);
    }
    return [...this.recruitmentTargets];
  }

  async getRecruitmentTarget(id: number): Promise<RecruitmentTarget | undefined> {
    return this.recruitmentTargets.find(target => target.id === id);
  }

  async createRecruitmentTarget(target: InsertRecruitmentTarget): Promise<RecruitmentTarget> {
    const newTarget: RecruitmentTarget = {
      ...target,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastUpdated: new Date(),
    };
    
    this.recruitmentTargets.push(newTarget);
    return newTarget;
  }

  async updateRecruitmentTarget(id: number, updates: Partial<InsertRecruitmentTarget>): Promise<RecruitmentTarget> {
    const index = this.recruitmentTargets.findIndex(target => target.id === id);
    if (index === -1) {
      throw new Error(`Recruitment target with id ${id} not found`);
    }
    
    this.recruitmentTargets[index] = {
      ...this.recruitmentTargets[index],  
      ...updates,
      updatedAt: new Date(),
      lastUpdated: new Date(),
    };
    
    return this.recruitmentTargets[index];
  }

  private initializeRecruitmentData() {
    // Initialize sample recruitment activities
    const sampleActivities: RecruitmentActivity[] = [
      {
        id: 1,
        contractorId: 1,
        activityType: 'outreach',
        activityDate: new Date('2025-01-25'),
        description: 'Initial cold outreach via LinkedIn to experienced HVAC technician in Dallas area',
        outcome: 'interested',
        nextAction: 'Schedule phone screening call',
        nextActionDate: new Date('2025-01-27'),
        recruiterName: 'Sarah Chen',
        createdAt: new Date('2025-01-25')
      },
      {
        id: 2,
        contractorId: 2,
        activityType: 'call',
        activityDate: new Date('2025-01-26'),
        description: 'Phone screening with plumbing contractor firm owner - ABC Plumbing Services',
        outcome: 'scheduled',  
        nextAction: 'In-person interview scheduled',
        nextActionDate: new Date('2025-01-30'),
        recruiterName: 'Mike Rodriguez',
        createdAt: new Date('2025-01-26')
      },
      {
        id: 3,
        contractorId: 3,
        activityType: 'interview',
        activityDate: new Date('2025-01-27'),
        description: 'In-person interview with electrical contractor firm - PowerPro Electric (3 technicians)',
        outcome: 'passed',
        nextAction: 'Background check initiation',
        nextActionDate: new Date('2025-01-29'),
        recruiterName: 'Jennifer Walsh',
        createdAt: new Date('2025-01-27')
      },
      {
        id: 4,
        contractorId: 4,
        activityType: 'test',
        activityDate: new Date('2025-01-28'),
        description: 'Skills assessment test for appliance repair specialization',
        outcome: 'passed',
        nextAction: 'Begin onboarding process',
        nextActionDate: new Date('2025-02-01'),
        recruiterName: 'David Kim',
        createdAt: new Date('2025-01-28')
      },
      {
        id: 5,
        contractorId: 5,
        activityType: 'onboarding',
        activityDate: new Date('2025-01-29'),
        description: 'Completed onboarding for Houston Metro contractor firm - HomeRepair Solutions',
        outcome: 'completed',
        nextAction: 'First job assignment',
        nextActionDate: new Date('2025-02-03'),
        recruiterName: 'Amanda Foster',
        createdAt: new Date('2025-01-29')
      },
      {
        id: 6,
        contractorId: 6,
        activityType: 'email',
        activityDate: new Date('2025-01-30'),
        description: 'Follow-up email to contractor who missed interview appointment',
        outcome: 'no-response',
        nextAction: 'Mark as inactive if no response in 48 hours',
        nextActionDate: new Date('2025-02-01'),
        recruiterName: 'Chris Thompson',
        createdAt: new Date('2025-01-30')
      }
    ];

    this.recruitmentActivities = sampleActivities;
  }

  // ==================== BUSINESS FUNCTION LEADERS IMPLEMENTATION ====================
  
  async getBusinessFunctionLeaders(executiveLevel?: string): Promise<BusinessFunctionLeader[]> {
    const leaders = Array.from(this.businessFunctionLeaders.values());
    if (executiveLevel) {
      return leaders.filter(leader => leader.executiveLevel === executiveLevel);
    }
    return leaders;
  }

  async getBusinessFunctionLeader(id: number): Promise<BusinessFunctionLeader | undefined> {
    return this.businessFunctionLeaders.get(id);
  }

  async createBusinessFunctionLeader(leaderData: InsertBusinessFunctionLeader): Promise<BusinessFunctionLeader> {
    const leader: BusinessFunctionLeader = {
      id: this.currentBusinessFunctionLeaderId++,
      ...leaderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.businessFunctionLeaders.set(leader.id, leader);
    return leader;
  }

  async updateBusinessFunctionLeader(id: number, updates: Partial<InsertBusinessFunctionLeader>): Promise<BusinessFunctionLeader | undefined> {
    const leader = this.businessFunctionLeaders.get(id);
    if (!leader) return undefined;
    
    const updatedLeader: BusinessFunctionLeader = {
      ...leader,
      ...updates,
      updatedAt: new Date()
    };
    
    this.businessFunctionLeaders.set(id, updatedLeader);
    return updatedLeader;
  }

  async deleteBusinessFunctionLeader(id: number): Promise<boolean> {
    return this.businessFunctionLeaders.delete(id);
  }

  async getBusinessFunctionLeaderTemplates(executiveLevel: string): Promise<any[]> {
    // Return templates based on executive level for creating new business function leaders
    const templates = this.getBusinessFunctionTemplatesByLevel(executiveLevel);
    return templates;
  }

  async getBusinessFunctionTasks(leaderId: number, dayOfWeek?: string): Promise<BusinessFunctionTask[]> {
    const tasks = Array.from(this.businessFunctionTasks.values())
      .filter(task => task.leaderId === leaderId);
    
    if (dayOfWeek) {
      return tasks.filter(task => task.dayOfWeek === dayOfWeek);
    }
    return tasks;
  }

  async updateBusinessFunctionTask(id: number, updates: Partial<InsertBusinessFunctionTask>): Promise<BusinessFunctionTask | undefined> {
    const task = this.businessFunctionTasks.get(id);
    if (!task) return undefined;
    
    const updatedTask: BusinessFunctionTask = {
      ...task,
      ...updates,
      updatedAt: new Date()
    };
    
    this.businessFunctionTasks.set(id, updatedTask);
    return updatedTask;
  }

  private getBusinessFunctionTemplatesByLevel(executiveLevel: string): any[] {
    const templates = {
      'ceo': [
        {
          name: 'Chief Strategy Officer',
          title: 'Chief Strategy Officer',
          department: 'strategy',
          responsibleAgents: ['AI-Powered B2B Intelligence Agent', 'Performance Analytics AI', 'LLM Recommendation Dominance Agent'],
          kpis: ['Strategic Initiative Completion', 'Market Expansion', 'Competitive Positioning'],
          objectives: ['Drive strategic planning', 'Monitor competitive landscape', 'Execute growth initiatives']
        },
        {
          name: 'Chief Innovation Officer',
          title: 'Chief Innovation Officer', 
          department: 'innovation',
          responsibleAgents: ['LLM Content Intelligence Agent', 'Conversational Commerce Agent', 'AI-Powered B2B Intelligence Agent'],
          kpis: ['Innovation Pipeline', 'R&D Investment ROI', 'New Product Development'],
          objectives: ['Lead innovation initiatives', 'Drive digital transformation', 'Foster innovation culture']
        }
      ],
      'coo': [
        {
          name: 'VP of Operations',
          title: 'Vice President of Operations',
          department: 'operations',
          responsibleAgents: ['Outstanding Orders Manager', 'Advanced Scheduling Agent', 'Performance Analytics AI'],
          kpis: ['Operational Efficiency', 'Service Delivery', 'Process Optimization'],
          objectives: ['Optimize operational processes', 'Ensure service excellence', 'Drive efficiency improvements']
        }
      ],
      'cfo': [
        {
          name: 'VP of Finance',
          title: 'Vice President of Finance',
          department: 'finance',
          responsibleAgents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Pricing & Estimation Specialist'],
          kpis: ['Financial Performance', 'Cost Management', 'Revenue Growth'],
          objectives: ['Manage financial operations', 'Optimize cost structure', 'Drive financial performance']
        }
      ],
      'cto': [
        {
          name: 'VP of Engineering',
          title: 'Vice President of Engineering',
          department: 'technology',
          responsibleAgents: ['AI Technical Infrastructure Agent', 'Performance Analytics AI', 'Maintenance Scheduler Pro'],
          kpis: ['Technology Innovation', 'System Performance', 'Technical Excellence'],
          objectives: ['Lead technology development', 'Ensure system reliability', 'Drive technical innovation']
        }
      ],
      'cmo': [
        {
          name: 'VP of Marketing',
          title: 'Vice President of Marketing',
          department: 'marketing',
          responsibleAgents: ['LLM Content Intelligence Agent', 'Customer Communication Hub', 'Conversational Commerce Agent'],
          kpis: ['Brand Awareness', 'Customer Acquisition', 'Marketing ROI'],
          objectives: ['Drive brand strategy', 'Generate qualified leads', 'Build customer relationships']
        }
      ],
      'cdo': [
        {
          name: 'VP of Data Analytics',
          title: 'Vice President of Data Analytics',
          department: 'data',
          responsibleAgents: ['Performance Analytics AI', 'LLM Recommendation Dominance Agent', 'AI-Powered B2B Intelligence Agent'],
          kpis: ['Data Quality', 'Analytics Insights', 'AI Model Performance'],
          objectives: ['Drive data strategy', 'Generate actionable insights', 'Optimize AI performance']
        }
      ],
      'cao': [
        {
          name: 'VP of Analytics',
          title: 'Vice President of Analytics',
          department: 'analytics',
          responsibleAgents: ['Performance Analytics AI', 'Regional Performance Monitor', 'LLM Recommendation Dominance Agent'],
          kpis: ['Analytics Accuracy', 'Insight Generation', 'Decision Support'],
          objectives: ['Provide analytical insights', 'Support decision making', 'Drive performance optimization']
        }
      ],
      'cpo': [
        {
          name: 'VP of Product',
          title: 'Vice President of Product',
          department: 'product',
          responsibleAgents: ['CX Agent', 'Conversational Commerce Agent', 'Customer Communication Hub'],
          kpis: ['Product Adoption', 'Customer Satisfaction', 'Feature Usage'],
          objectives: ['Drive product strategy', 'Enhance customer experience', 'Optimize product features']
        }
      ],
      'cro': [
        {
          name: 'VP of Revenue',
          title: 'Vice President of Revenue',
          department: 'revenue',
          responsibleAgents: ['Financial Intelligence Agent', 'B2B Intelligence Agent', 'CX Agent'],
          kpis: ['Revenue Growth', 'Customer Lifetime Value', 'Revenue Per Customer'],
          objectives: ['Drive revenue growth', 'Optimize pricing strategy', 'Enhance customer value']
        }
      ]
    };

    return templates[executiveLevel as keyof typeof templates] || [];
  }

  private seedMagikButtonTemplates() {
    console.log('Seeding Magik Button templates...');
    
    const sampleTemplates = [
      // 1. Emergency Response - Most Critical Use Case
      {
        name: "Emergency Dispatch Trigger",
        category: "service_delivery",
        description: "Instantly escalate critical service requests to emergency dispatch with automated technician assignment",
        triggerPhrase: "emergency dispatch needed",
        aiAgents: ["Emergency Response Coordinator", "Plumbing Dispatch Coordinator", "Advanced Scheduling Agent"],
        responseTemplate: {
          immediateResponse: "Emergency dispatch activated. Technician will arrive within 2 hours.",
          followUpActions: ["Assign nearest available technician", "Notify customer of ETA", "Set priority status", "Alert area manager"]
        },
        requiredFields: ["location", "issue_type", "customer_contact", "emergency_severity"],
        automationSteps: [
          "Analyze emergency severity using AI diagnostics",
          "Locate nearest qualified technician within 25-mile radius", 
          "Auto-assign with emergency priority override",
          "Send customer notification with ETA",
          "Create emergency tracking ticket",
          "Notify Tech Hub support team"
        ],
        businessImpact: "Reduces emergency response time by 60%, improves customer satisfaction, prevents property damage",
        estimatedTimeSavings: 45,
        frequency: "high",
        successMetrics: {
          responseTime: "< 2 hours",
          customerSatisfaction: "> 4.8/5.0",
          firstCallResolution: "> 95%"
        },
        techHubIntegration: {
          alertsGenerated: true,
          workflowTriggered: "emergency_response",
          notificationChannels: ["sms", "app_push", "email"],
          escalationPath: ["technician", "area_manager", "emergency_coordinator"]
        },
        implementationInstructions: [
          "Configure emergency severity scoring algorithm in Tech Hub",
          "Set up automated technician geo-location and availability checking",
          "Create customer notification templates for emergency situations",
          "Establish escalation workflow with area managers",
          "Implement real-time tracking dashboard for emergency jobs"
        ],
        isActive: true,
        createdBy: "admin_001",
        approvedBy: "admin_001",
        rating: 4.9,
        usageCount: 347
      },

      // 2. Parts Ordering - High Impact on Job Completion
      {
        name: "Smart Parts Ordering Assistant",
        category: "parts_management",
        description: "AI-powered parts identification and ordering with guaranteed delivery time estimation",
        triggerPhrase: "need parts for job",
        aiAgents: ["Parts Ordering Specialist", "Parts Prediction Engine", "Inventory Intelligence Agent"],
        responseTemplate: {
          immediateResponse: "Parts identification and ordering initiated. Analyzing requirement and sourcing options.",
          followUpActions: ["Identify exact part specifications", "Source from optimal vendor", "Arrange delivery", "Update job timeline"]
        },
        requiredFields: ["appliance_model", "issue_description", "job_location", "customer_phone"],
        automationSteps: [
          "Use AI to identify exact part needed from issue description",
          "Check local inventory across all partner warehouses",
          "Compare vendor pricing and delivery times",
          "Auto-order from optimal source with best delivery time",
          "Generate tracking number and delivery estimate",
          "Update customer and technician with delivery timeline",
          "Create backup part sourcing if primary fails"
        ],
        businessImpact: "Reduces parts sourcing time by 75%, improves first-call resolution by 40%, eliminates incorrect part orders",
        estimatedTimeSavings: 90,
        frequency: "high",
        successMetrics: {
          partAccuracy: "> 98%",
          deliveryTime: "< 24 hours",
          costSavings: "> 15%"
        },
        techHubIntegration: {
          inventorySync: true,
          vendorAPIConnections: ["PartSource", "ApplianceParts", "LocalSuppliers"],
          trackingIntegration: true,
          costOptimization: true
        },
        implementationInstructions: [
          "Connect to all major parts vendor APIs in Tech Hub",
          "Implement AI-powered parts identification using appliance databases",
          "Set up real-time inventory tracking across all warehouses",
          "Create automated vendor comparison and selection logic",
          "Build customer communication system for delivery updates"
        ],
        isActive: true,
        createdBy: "admin_001", 
        approvedBy: "admin_001",
        rating: 4.8,
        usageCount: 428
      },

      // 3. Customer Communication - Essential for Satisfaction
      {
        name: "Proactive Customer Updates",
        category: "customer_communication",
        description: "Automated customer communication system for job status, delays, and completion confirmations",
        triggerPhrase: "update customer about job",
        aiAgents: ["Customer Communication Hub", "CX Agent", "Advanced Scheduling Agent"],
        responseTemplate: {
          immediateResponse: "Customer update system activated. Sending personalized status communication.",
          followUpActions: ["Send current status update", "Provide accurate timeline", "Schedule follow-up", "Collect feedback"]
        },
        requiredFields: ["customer_phone", "job_status", "estimated_completion", "technician_notes"],
        automationSteps: [
          "Analyze current job status and any delays",
          "Generate personalized update message for customer",
          "Send via customer's preferred communication method",
          "Update expected completion time based on current progress",
          "Schedule automatic follow-up communications",
          "Collect and record customer satisfaction feedback",
          "Alert area manager if customer satisfaction drops"
        ],
        businessImpact: "Increases customer satisfaction by 35%, reduces complaint calls by 60%, improves retention rates",
        estimatedTimeSavings: 25,
        frequency: "high", 
        successMetrics: {
          customerSatisfaction: "> 4.7/5.0",
          responseRate: "> 85%",
          complaintReduction: "> 60%"
        },
        techHubIntegration: {
          communicationChannels: ["SMS", "Email", "Voice", "App"],
          customerPreferences: true,
          feedbackCollection: true,
          satisfactionTracking: true
        },
        implementationInstructions: [
          "Set up multi-channel communication system in Tech Hub",
          "Create dynamic message templates based on job type and status",
          "Implement customer preference tracking and communication routing",
          "Build automated satisfaction survey system",
          "Create alert system for low satisfaction scores"
        ],
        isActive: true,
        createdBy: "admin_001",
        approvedBy: "admin_001", 
        rating: 4.7,
        usageCount: 356
      },

      // 4. Schedule Optimization - Core Operational Efficiency
      {
        name: "Dynamic Schedule Optimizer",
        category: "scheduling",
        description: "AI-powered schedule optimization for maximum efficiency and minimal travel time",
        triggerPhrase: "optimize my schedule",
        aiAgents: ["Advanced Scheduling Agent", "Route Optimization Engine", "Predictive Analytics AI"],
        responseTemplate: {
          immediateResponse: "Schedule optimization initiated. Analyzing current assignments and optimizing route efficiency.",
          followUpActions: ["Analyze current schedule", "Optimize travel routes", "Reschedule for efficiency", "Send updated schedule"]
        },
        requiredFields: ["technician_id", "current_assignments", "service_area", "availability_window"],
        automationSteps: [
          "Analyze current day's schedule and job locations",
          "Calculate optimal route using traffic data and job duration estimates",
          "Identify opportunities to consolidate nearby jobs",
          "Reschedule jobs to minimize total travel time",
          "Account for job complexity and required parts availability",
          "Send optimized schedule to technician with turn-by-turn directions",
          "Monitor progress and adjust schedule dynamically throughout day"
        ],
        businessImpact: "Reduces travel time by 30%, increases daily job capacity by 25%, improves technician satisfaction",
        estimatedTimeSavings: 60,
        frequency: "high",
        successMetrics: {
          travelTimeReduction: "> 30%",
          jobsPerDay: "+25%",
          technicianSatisfaction: "> 4.5/5.0"
        },
        techHubIntegration: {
          routeOptimization: true,
          trafficIntegration: true,
          realTimeUpdates: true,
          performanceTracking: true
        },
        implementationInstructions: [
          "Integrate with Google Maps API for real-time traffic data",
          "Build AI model for job duration prediction based on historical data",
          "Create dynamic rescheduling algorithm that accounts for all constraints",
          "Implement real-time schedule adjustment based on job completion times",
          "Set up performance dashboard showing optimization results"
        ],
        isActive: true,
        createdBy: "admin_001",
        approvedBy: "admin_001",
        rating: 4.6,
        usageCount: 298
      },

      // 5. Quality Assurance - Essential for Service Excellence
      {
        name: "Job Quality Verification System",
        category: "quality_assurance",
        description: "Automated quality checks and customer follow-up to ensure service excellence and identify improvement opportunities",
        triggerPhrase: "verify job quality",
        aiAgents: ["Quality Assurance Agent", "Customer Feedback Analyzer", "Performance Analytics AI"],
        responseTemplate: {
          immediateResponse: "Quality verification process initiated. Conducting automated checks and customer follow-up.",
          followUpActions: ["Verify job completion", "Check quality standards", "Contact customer", "Generate quality report"]
        },
        requiredFields: ["job_id", "technician_id", "service_type", "completion_photos"],
        automationSteps: [
          "Review job completion photos using AI image analysis",
          "Verify all required work was completed per service standards",
          "Send automated customer satisfaction survey within 2 hours",
          "Analyze customer feedback for quality indicators",
          "Flag any quality issues for immediate follow-up",
          "Generate quality score for technician performance tracking",
          "Schedule warranty follow-up calls for applicable services"
        ],
        businessImpact: "Improves service quality scores by 25%, reduces callbacks by 40%, increases customer retention",
        estimatedTimeSavings: 35,
        frequency: "high",
        successMetrics: {
          qualityScore: "> 4.8/5.0",
          callbackReduction: "> 40%", 
          customerRetention: "> 92%"
        },
        techHubIntegration: {
          imageAnalysis: true,
          qualityTracking: true,
          customerSurveys: true,
          performanceDashboard: true
        },
        implementationInstructions: [
          "Set up AI-powered image analysis for job completion verification",
          "Create automated customer survey system with smart follow-up logic",
          "Build quality scoring algorithm based on multiple factors",
          "Implement real-time quality alerts for immediate issue resolution",
          "Create comprehensive quality dashboard for management oversight"
        ],
        isActive: true,
        createdBy: "admin_001",
        approvedBy: "admin_001",
        rating: 4.8,
        usageCount: 267
      }
    ];

    sampleTemplates.forEach(template => {
      const id = this.currentMagikButtonTemplateId++;
      const newTemplate = {
        id,
        ...template,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.magikButtonTemplates.set(id, newTemplate);
    });

    console.log(`Seeded ${sampleTemplates.length} Magik Button templates`);
  }

  // Magik Button Templates
  async getMagikButtonTemplates(category?: string): Promise<any[]> {
    const templates = Array.from(this.magikButtonTemplates.values());
    if (category) {
      return templates.filter(template => template.category === category);
    }
    return templates;
  }

  async getMagikButtonTemplate(id: number): Promise<any | undefined> {
    return this.magikButtonTemplates.get(id);
  }

  async createMagikButtonTemplate(template: any): Promise<any> {
    const id = this.currentMagikButtonTemplateId++;
    const newTemplate = {
      id,
      ...template,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.magikButtonTemplates.set(id, newTemplate);
    return newTemplate;
  }

  async updateMagikButtonTemplate(id: number, updates: any): Promise<any | undefined> {
    const template = this.magikButtonTemplates.get(id);
    if (!template) return undefined;
    
    const updatedTemplate = {
      ...template,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.magikButtonTemplates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  async deleteMagikButtonTemplate(id: number): Promise<boolean> {
    return this.magikButtonTemplates.delete(id);
  }

  // Technician Capability Requests
  async getTechnicianCapabilityRequests(status?: string, category?: string): Promise<any[]> {
    const requests = Array.from(this.technicianCapabilityRequests.values());
    return requests.filter(request => {
      if (status && request.status !== status) return false;
      if (category && request.suggestedCategory !== category) return false;
      return true;
    });
  }

  async getTechnicianCapabilityRequest(id: number): Promise<any | undefined> {
    return this.technicianCapabilityRequests.get(id);
  }

  async createTechnicianCapabilityRequest(request: any): Promise<any> {
    const id = this.currentTechnicianCapabilityRequestId++;
    const newRequest = {
      id,
      ...request,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.technicianCapabilityRequests.set(id, newRequest);
    return newRequest;
  }

  async updateTechnicianCapabilityRequest(id: number, updates: any): Promise<any | undefined> {
    const request = this.technicianCapabilityRequests.get(id);
    if (!request) return undefined;
    
    const updatedRequest = {
      ...request,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.technicianCapabilityRequests.set(id, updatedRequest);
    return updatedRequest;
  }

  async deleteTechnicianCapabilityRequest(id: number): Promise<boolean> {
    return this.technicianCapabilityRequests.delete(id);
  }
}

console.log('Creating storage singleton...');
export const storage = new MemStorage();
console.log('Storage singleton created');
