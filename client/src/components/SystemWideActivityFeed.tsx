import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiRequest } from '@/lib/queryClient';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Activity, 
  Users, 
  Package, 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Star,
  Target,
  TrendingUp,
  Shield,
  Award,
  Zap,
  Settings,
  MessageSquare,
  DollarSign,
  Wrench,
  Phone,
  Mail,
  UserPlus,
  Search,
  Filter,
  CalendarDays
} from 'lucide-react';

interface SystemActivity {
  id: string;
  type: string;
  category: 'contractor' | 'parts' | 'retention' | 'ai_agent' | 'performance' | 'customer' | 'financial' | 'hoa' | 'call_center' | 'recruitment' | 'scheduling' | 'analytics' | 'threat';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  agentId?: number;
  requiresApproval?: boolean;
  proposedAction?: string;
  metadata?: any;
}

// Human-in-the-loop approval examples for all stakeholder roles
const generateHumanApprovalActivities = (currentTime: Date): SystemActivity[] => {
  const approvalActivities: SystemActivity[] = [];

  // CEO-Level Strategic Approvals
  approvalActivities.push({
    id: `ceo_approval_${Date.now()}_1`,
    type: 'strategic_partnership_approval',
    category: 'ai_agent',
    priority: 'critical',
    title: '🏢 CEO Approval Required: $15M Home Depot Partnership',
    description: 'AI Agent #16 negotiated exclusive nationwide partnership with Home Depot covering 1,847 locations. Requires executive approval for $2.5M investment commitment.',
    location: 'Executive Decision Center',
    timestamp: new Date(currentTime.getTime() - 2100000).toISOString(),
    agentId: 16,
    requiresApproval: true,
    proposedAction: 'Execute partnership agreement with $15M annual revenue guarantee, 72-hour competitive window for decision',
    metadata: {
      assignedRole: 'CEO',
      businessImpact: '$15M annual revenue, 34% market share increase',
      riskLevel: 'high',
      approvalDeadline: '72 hours',
      escalationPath: 'Board of Directors'
    }
  });

  // COO-Level Operational Approvals
  approvalActivities.push({
    id: `coo_approval_${Date.now()}_2`,
    type: 'operational_expansion_approval',
    category: 'performance',
    priority: 'high',
    title: '🚀 COO Approval: Phoenix & Denver Market Expansion',
    description: 'AI Agent #20 identified optimal expansion opportunity into 2 new metropolitan markets with 94% success probability and $8M revenue potential.',
    location: 'Operations Command Center',
    timestamp: new Date(currentTime.getTime() - 3900000).toISOString(),
    agentId: 20,
    requiresApproval: true,
    proposedAction: 'Launch operations in Phoenix and Denver, hire 85 technicians, establish regional service hubs',
    metadata: {
      assignedRole: 'COO',
      businessImpact: '1.2M new households, $8M annual revenue',
      riskLevel: 'medium',
      marketAnalysis: '87% technician availability, limited competition'
    }
  });

  // CFO-Level Financial Approvals
  approvalActivities.push({
    id: `cfo_approval_${Date.now()}_3`,
    type: 'financial_investment_approval',
    category: 'financial',
    priority: 'high',
    title: '💰 CFO Approval: $1.8M AI Infrastructure Investment',
    description: 'AI Agent #19 recommends critical infrastructure investment to achieve 97% automation rate, reducing operational costs by $3.2M annually.',
    location: 'Financial Operations Center',
    timestamp: new Date(currentTime.getTime() - 5700000).toISOString(),
    agentId: 19,
    requiresApproval: true,
    proposedAction: 'Approve capital expenditure for AI server expansion, ML model licenses, advanced analytics platform',
    metadata: {
      assignedRole: 'CFO',
      businessImpact: '$3.2M annual cost savings, 8.2-month payback period',
      riskLevel: 'low',
      efficiencyGains: '94.8% to 97% automation rate increase'
    }
  });

  // Recruitment Manager Approvals
  approvalActivities.push({
    id: `recruitment_approval_${Date.now()}_4`,
    type: 'recruitment_campaign_approval',
    category: 'recruitment',
    priority: 'high',
    title: '👥 Recruitment Manager: $340K Technician Hiring Campaign',
    description: 'AI Agent #22 proposes accelerated recruitment targeting 150 experienced HVAC technicians to address 23% workforce shortage.',
    location: 'Recruitment Operations',
    timestamp: new Date(currentTime.getTime() - 2850000).toISOString(),
    agentId: 22,
    requiresApproval: true,
    proposedAction: 'Deploy premium recruitment budget across digital channels, trade shows, referral bonuses',
    metadata: {
      assignedRole: 'Recruitment Manager',
      businessImpact: '$1.2M additional service capacity, reduces shortage to 8%',
      riskLevel: 'medium',
      targetMetrics: '150 technicians in 90 days, 85% retention rate'
    }
  });

  // Operations Manager Quality Approvals
  approvalActivities.push({
    id: `ops_approval_${Date.now()}_5`,
    type: 'quality_improvement_approval',
    category: 'customer',
    priority: 'medium',
    title: '⭐ Operations Manager: Customer Satisfaction Enhancement',
    description: 'AI Agent #8 identified 12 service quality improvements to increase customer ratings from 4.2 to 4.7 stars, improving retention by 18%.',
    location: 'Quality Operations Center',
    timestamp: new Date(currentTime.getTime() - 7500000).toISOString(),
    agentId: 8,
    requiresApproval: true,
    proposedAction: 'Implement enhanced QA protocols, technician coaching program, customer follow-up system',
    metadata: {
      assignedRole: 'Operations Manager',
      businessImpact: '18% retention increase, 28% referral improvement',
      riskLevel: 'low',
      qualityMetrics: '4.2 to 4.7 star rating improvement'
    }
  });

  // Analytics Manager Approvals
  approvalActivities.push({
    id: `analytics_approval_${Date.now()}_6`,
    type: 'predictive_analytics_approval',
    category: 'analytics',
    priority: 'medium',
    title: '📊 Analytics Manager: Predictive Maintenance AI Deployment',
    description: 'AI Agent #14 developed predictive failure models reducing emergency calls by 35% and increasing preventive service revenue by $890K.',
    location: 'Analytics Command Center',
    timestamp: new Date(currentTime.getTime() - 9300000).toISOString(),
    agentId: 14,
    requiresApproval: true,
    proposedAction: 'Deploy ML predictive maintenance models across 15,000 service contracts with IoT integration',
    metadata: {
      assignedRole: 'Analytics Manager',
      businessImpact: '$890K revenue increase, 35% emergency call reduction',
      riskLevel: 'medium',
      accuracy: '87% failure prediction accuracy 30 days in advance'
    }
  });

  // Partnership Development Approvals
  approvalActivities.push({
    id: `partnership_approval_${Date.now()}_7`,
    type: 'partnership_agreement_approval',
    category: 'hoa',
    priority: 'high',
    title: '🤝 Partnership Lead: $2.8M HOA Management Partnership',
    description: 'AI Agent #16 negotiated exclusive partnerships with 3 major HOA management companies covering 45,000 homes with 89% profit margins.',
    location: 'Partnership Development',
    timestamp: new Date(currentTime.getTime() - 4650000).toISOString(),
    agentId: 16,
    requiresApproval: true,
    proposedAction: 'Execute 3-year exclusive partnership agreements for preferred vendor status across residential communities',
    metadata: {
      assignedRole: 'Partnership Development Lead',
      businessImpact: '$2.8M recurring revenue, 89% profit margins',
      riskLevel: 'low',
      serviceVolume: '45,000 homes, 2.3 annual service calls per home'
    }
  });

  // Scheduling Coordinator Approvals
  approvalActivities.push({
    id: `scheduling_approval_${Date.now()}_8`,
    type: 'scheduling_optimization_approval',
    category: 'scheduling',
    priority: 'high',
    title: '📅 Scheduling Coordinator: Dynamic Scheduling Algorithm',
    description: 'AI Agent #11 developed advanced scheduling system reducing travel time by 28% and increasing daily capacity by 32 appointments.',
    location: 'Scheduling Operations',
    timestamp: new Date(currentTime.getTime() - 1350000).toISOString(),
    agentId: 11,
    requiresApproval: true,
    proposedAction: 'Deploy AI-powered dynamic scheduling with real-time optimization across all service territories',
    metadata: {
      assignedRole: 'Scheduling Coordinator',
      businessImpact: '$580K value (32 daily appointments, $180K fuel savings)',
      riskLevel: 'low',
      efficiencyGains: '28% travel time reduction, real-time optimization'
    }
  });

  // Quality Assurance Lead Training Approvals
  approvalActivities.push({
    id: `qa_approval_${Date.now()}_9`,
    type: 'training_enhancement_approval',
    category: 'retention',
    priority: 'medium',
    title: '🎓 QA Lead: Enhanced Technician Certification Program',
    description: 'AI Agent #23 identified training gaps affecting service quality, proposes 6-week certification program for 180 technicians.',
    location: 'Quality Assurance Center',
    timestamp: new Date(currentTime.getTime() - 6450000).toISOString(),
    agentId: 23,
    requiresApproval: true,
    proposedAction: 'Launch comprehensive certification program including advanced HVAC diagnostics and customer service training',
    metadata: {
      assignedRole: 'Quality Assurance Lead',
      businessImpact: '42% callback reduction, 94% first-visit resolution rate',
      riskLevel: 'low',
      technicianImpact: '180 technicians, 91% satisfaction with training'
    }
  });

  return approvalActivities;
};

// Generate comprehensive system-wide activities for demonstration
const generateSystemActivities = (): SystemActivity[] => {
  const currentTime = new Date();
  const activities: SystemActivity[] = [];
  
  // Add human approval activities first - these represent critical decisions requiring human oversight
  activities.push(...generateHumanApprovalActivities(currentTime));
  
  // Agent #1 - Executive Dashboard Agent Activities
  activities.push(
    {
      id: `agent1_${Date.now()}_1`,
      type: 'executive_alert',
      category: 'ai_agent',
      priority: 'high',
      title: '📊 Executive KPI Alert Generated',
      description: 'AI Agent #1 detected 15% revenue variance from Q3 targets - executive dashboard updated with corrective recommendations',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 12000).toISOString(),
      agentId: 1,
      requiresApproval: false
    },
    {
      id: `agent1_${Date.now()}_2`,
      type: 'strategic_insight',
      category: 'analytics',
      priority: 'medium',
      title: '🎯 Strategic Performance Insight',
      description: 'AI Agent #1 identified market opportunity - Houston market showing 23% above-average demand growth',
      location: 'Houston, TX',
      timestamp: new Date(currentTime.getTime() - 34000).toISOString(),
      agentId: 1,
      requiresApproval: false
    },
    {
      id: `agent1_${Date.now()}_3`,
      type: 'board_prep',
      category: 'ai_agent',
      priority: 'high',
      title: '📋 Board Presentation Auto-Generated',
      description: 'AI Agent #1 compiled Q3 board presentation - 94.8% autonomous execution rate, $2.1M revenue achievement highlighted',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 56000).toISOString(),
      agentId: 1,
      requiresApproval: true,
      proposedAction: 'Review presentation materials and approve for C-suite distribution'
    },

  // Agent #2 - Customer Experience Intelligence Activities  
    {
      id: `agent2_${Date.now()}_1`,
      type: 'satisfaction_optimization',
      category: 'customer',
      priority: 'medium',
      title: '⭐ Customer Satisfaction Optimized',
      description: 'AI Agent #2 improved customer experience flow - reduced call resolution time by 18% (3.2min → 2.6min)',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 78000).toISOString(),
      agentId: 2,
      requiresApproval: false
    },
    {
      id: `agent2_${Date.now()}_2`,
      type: 'feedback_analysis',
      category: 'customer',
      priority: 'high',
      title: '🔍 Critical Feedback Pattern Detected',
      description: 'AI Agent #2 analyzed 1,247 customer reviews - identified technician communication as key improvement area',
      location: 'Dallas, TX',
      timestamp: new Date(currentTime.getTime() - 102000).toISOString(),
      agentId: 2,
      requiresApproval: true,
      proposedAction: 'Deploy enhanced communication training program to 34 technicians in Dallas area'
    },

  // Agent #3 - Predictive Service Intelligence Activities
    {
      id: `agent3_${Date.now()}_1`,
      type: 'failure_prediction',
      category: 'ai_agent',
      priority: 'critical',
      title: '🔮 Equipment Failure Predicted',
      description: 'AI Agent #3 predicted 89% probability of HVAC system failures in 23 homes - proactive maintenance recommended',
      location: 'Miami, FL',
      timestamp: new Date(currentTime.getTime() - 124000).toISOString(),
      agentId: 3,
      requiresApproval: true,
      proposedAction: 'Contact customers immediately for preventive maintenance scheduling - potential $12K savings'
    },
    {
      id: `agent3_${Date.now()}_2`,
      type: 'maintenance_optimization',
      category: 'scheduling',
      priority: 'medium',
      title: '🔧 Maintenance Schedule Optimized',
      description: 'AI Agent #3 optimized 156 preventive maintenance schedules - reduced emergency calls by 31%',
      location: 'Atlanta, GA',
      timestamp: new Date(currentTime.getTime() - 146000).toISOString(),
      agentId: 3,
      requiresApproval: false
    },

  // Agent #4 - Smart Diagnostic Agent Activities
    {
      id: `agent4_${Date.now()}_1`,
      type: 'diagnostic_accuracy',
      category: 'ai_agent',
      priority: 'high',
      title: '🧠 Diagnostic Accuracy Improved',
      description: 'AI Agent #4 achieved 94% first-visit diagnostic accuracy - reduced repeat visits by 27%',
      location: 'Chicago, IL',
      timestamp: new Date(currentTime.getTime() - 168000).toISOString(),
      agentId: 4,
      requiresApproval: false
    },
    {
      id: `agent4_${Date.now()}_2`,
      type: 'complex_diagnosis',
      category: 'ai_agent',
      priority: 'medium',
      title: '🔬 Complex System Diagnosed',
      description: 'AI Agent #4 diagnosed rare HVAC controller malfunction - saved customer $3,200 vs replacement',
      location: 'Denver, CO',
      timestamp: new Date(currentTime.getTime() - 192000).toISOString(),
      agentId: 4,
      requiresApproval: false
    },

  // Agent #5 - Resource Allocation Optimizer Activities
    {
      id: `agent5_${Date.now()}_1`,
      type: 'resource_optimization',
      category: 'scheduling',
      priority: 'high',
      title: '📈 Resource Allocation Optimized',
      description: 'AI Agent #5 reallocated 23 technicians across regions - improved utilization from 76% to 89%',
      location: 'Los Angeles, CA',
      timestamp: new Date(currentTime.getTime() - 214000).toISOString(),
      agentId: 5,
      requiresApproval: false
    },
    {
      id: `agent5_${Date.now()}_2`,
      type: 'capacity_alert',
      category: 'scheduling',
      priority: 'critical',
      title: '🚨 Capacity Shortage Alert',
      description: 'AI Agent #5 detected 127% capacity utilization in Seattle - immediate contractor overflow needed',
      location: 'Seattle, WA',
      timestamp: new Date(currentTime.getTime() - 236000).toISOString(),
      agentId: 5,
      requiresApproval: true,
      proposedAction: 'Activate 8 standby contractors and authorize overtime for critical repairs'
    },

  // Agent #6 - Customer Sentiment Analyst Activities
    {
      id: `agent6_${Date.now()}_1`,
      type: 'sentiment_analysis',
      category: 'customer',
      priority: 'medium',
      title: '💭 Customer Sentiment Analyzed',
      description: 'AI Agent #6 analyzed 2,341 customer interactions - overall sentiment improved 12% week-over-week',
      location: 'Austin, TX',
      timestamp: new Date(currentTime.getTime() - 258000).toISOString(),
      agentId: 6,
      requiresApproval: false
    },
    {
      id: `agent6_${Date.now()}_2`,
      type: 'negative_sentiment_alert',
      category: 'customer',
      priority: 'high',
      title: '⚠️ Negative Sentiment Spike',
      description: 'AI Agent #6 detected 34% increase in negative sentiment regarding parts delivery delays',
      location: 'Tampa, FL',
      timestamp: new Date(currentTime.getTime() - 280000).toISOString(),
      agentId: 6,
      requiresApproval: true,
      proposedAction: 'Initiate customer recovery program and expedite 47 delayed parts orders'
    },

  // 1099 Contractor Management Activities (Agent #22)
    {
      id: `contractor_${Date.now()}_1`,
      type: 'contractor_recruited',
      category: 'contractor',
      priority: 'high',
      title: '👷 Elite HVAC Contractor Recruited',
      description: 'AI Agent #22 successfully recruited master HVAC technician (12+ years) with 4.8⭐ rating in Tampa area',
      location: 'Tampa, FL',
      timestamp: new Date(currentTime.getTime() - 25000).toISOString(),
      agentId: 22,
      requiresApproval: false
    },
  // Agent #7 - Emergency Response Coordinator Activities
    {
      id: `agent7_${Date.now()}_1`,
      type: 'emergency_response',
      category: 'ai_agent',
      priority: 'critical',
      title: '🚨 Emergency Response Coordinated',
      description: 'AI Agent #7 coordinated emergency HVAC repair for senior living facility - 127 residents affected, 2-hour response achieved',
      location: 'Orlando, FL',
      timestamp: new Date(currentTime.getTime() - 302000).toISOString(),
      agentId: 7,
      requiresApproval: false
    },
    {
      id: `agent7_${Date.now()}_2`,
      type: 'disaster_preparation',
      category: 'ai_agent',
      priority: 'high',
      title: '🌪️ Storm Preparation Activated',
      description: 'AI Agent #7 pre-positioned 15 emergency teams ahead of Hurricane forecast - 48-hour readiness achieved',
      location: 'Miami, FL',
      timestamp: new Date(currentTime.getTime() - 324000).toISOString(),
      agentId: 7,
      requiresApproval: true,
      proposedAction: 'Approve emergency overtime budget and activate 24/7 dispatch center'
    },

  // Agent #8 - Quality Assurance Inspector Activities
    {
      id: `agent8_${Date.now()}_1`,
      type: 'quality_inspection',
      category: 'performance',
      priority: 'medium',
      title: '🔍 Quality Inspection Completed',
      description: 'AI Agent #8 completed 89 quality inspections - identified 3 technicians needing additional HVAC training',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 346000).toISOString(),
      agentId: 8,
      requiresApproval: false
    },
    {
      id: `agent8_${Date.now()}_2`,
      type: 'compliance_alert',
      category: 'performance',
      priority: 'high',
      title: '⚠️ Compliance Issue Detected',
      description: 'AI Agent #8 detected improper refrigerant handling by contractor team - immediate retraining required',
      location: 'Denver, CO',
      timestamp: new Date(currentTime.getTime() - 368000).toISOString(),
      agentId: 8,
      requiresApproval: true,
      proposedAction: 'Suspend contractor pending EPA compliance training completion'
    },

  // Agent #9 - Pricing & Estimation Specialist Activities
    {
      id: `agent9_${Date.now()}_1`,
      type: 'pricing_optimization',
      category: 'financial',
      priority: 'medium',
      title: '💰 Dynamic Pricing Adjusted',
      description: 'AI Agent #9 optimized pricing for 127 estimates - increased acceptance rate to 91% while maintaining 23% margins',
      location: 'Austin, TX',
      timestamp: new Date(currentTime.getTime() - 390000).toISOString(),
      agentId: 9,
      requiresApproval: false
    },
    {
      id: `agent9_${Date.now()}_2`,
      type: 'competitive_analysis',
      category: 'financial',
      priority: 'high',
      title: '📊 Competitive Pricing Alert',
      description: 'AI Agent #9 detected competitor pricing 18% below market rate in Chicago area - strategy adjustment needed',
      location: 'Chicago, IL',
      timestamp: new Date(currentTime.getTime() - 412000).toISOString(),
      agentId: 9,
      requiresApproval: true,
      proposedAction: 'Implement value-based messaging and temporary promotional pricing for Chicago market'
    },

  // Agent #10 - Maintenance Scheduler Pro Activities
    {
      id: `agent10_${Date.now()}_1`,
      type: 'schedule_optimization',
      category: 'scheduling',
      priority: 'medium',
      title: '📅 Maintenance Schedule Optimized',
      description: 'AI Agent #10 scheduled 234 preventive maintenance visits - achieved 96% customer preference compliance',
      location: 'San Antonio, TX',
      timestamp: new Date(currentTime.getTime() - 434000).toISOString(),
      agentId: 10,
      requiresApproval: false
    },
    {
      id: `agent10_${Date.now()}_2`,
      type: 'seasonal_planning',
      category: 'scheduling',
      priority: 'high',
      title: '🌡️ Seasonal Demand Forecast',
      description: 'AI Agent #10 forecasts 340% HVAC demand increase next week due to heat wave - capacity planning initiated',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 456000).toISOString(),
      agentId: 10,
      requiresApproval: true,
      proposedAction: 'Activate 12 additional contractor teams and extend service hours to 7 PM'
    },

  // Agent #11 - Advanced Scheduling Agent Activities
    {
      id: `agent11_${Date.now()}_1`,
      type: 'call_center_optimization',
      category: 'call_center',
      priority: 'high',
      title: '📞 Call Center AI Optimization',
      description: 'AI Agent #11 reduced average wait time by 34% (2m 15s → 1m 28s) through intelligent routing',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 478000).toISOString(),
      agentId: 11,
      requiresApproval: false
    },
    {
      id: `agent11_${Date.now()}_2`,
      type: 'peak_scheduling_alert',
      category: 'call_center',
      priority: 'critical',
      title: '🚨 Peak Hour Scheduling Alert',
      description: 'AI Agent #11 detected Monday 2-4 PM showing 127% capacity utilization - immediate contractor overflow activation needed',
      location: 'Dallas Metro',
      timestamp: new Date(currentTime.getTime() - 500000).toISOString(),
      agentId: 11,
      requiresApproval: true,
      proposedAction: 'Activate 15 standby contractors and extend hours for premium service'
    },

  // Agent #12 - Technician Interaction Hub Activities
    {
      id: `agent12_${Date.now()}_1`,
      type: 'technician_communication',
      category: 'retention',
      priority: 'medium',
      title: '💬 Technician Communication Hub',
      description: 'AI Agent #12 facilitated 1,247 technician interactions - resolved 89% of questions within 5 minutes',
      location: 'Houston, TX',
      timestamp: new Date(currentTime.getTime() - 522000).toISOString(),
      agentId: 12,
      requiresApproval: false
    },

  // Agent #13 - Outstanding Orders Manager Activities
    {
      id: `agent13_${Date.now()}_1`,
      type: 'order_management',
      category: 'parts',
      priority: 'high',
      title: '📋 Outstanding Orders Managed',
      description: 'AI Agent #13 processed 1,456 outstanding orders - reduced backlog by 23% through intelligent prioritization',
      location: 'Atlanta, GA',
      timestamp: new Date(currentTime.getTime() - 544000).toISOString(),
      agentId: 13,
      requiresApproval: false
    },

  // Agent #14 - Parts Prediction Engine Activities
    {
      id: `agent14_${Date.now()}_1`,
      type: 'parts_prediction',
      category: 'parts',
      priority: 'medium',
      title: '🔮 Parts Demand Predicted',
      description: 'AI Agent #14 predicted 67% increase in compressor demand - pre-ordered inventory to prevent stockouts',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 566000).toISOString(),
      agentId: 14,
      requiresApproval: false
    },

  // Agent #15 - LLM Recommendation Dominance Agent Activities
    {
      id: `agent15_${Date.now()}_1`,
      type: 'recommendation_engine',
      category: 'ai_agent',
      priority: 'medium',
      title: '🎯 Recommendation Engine Optimized',
      description: 'AI Agent #15 improved service recommendations - achieved 94% customer acceptance rate for upsells',
      location: 'Miami, FL',
      timestamp: new Date(currentTime.getTime() - 588000).toISOString(),
      agentId: 15,
      requiresApproval: false
    },

  // Agent #16 - AI-Powered B2B Intelligence Agent Activities (HOA)
    {
      id: `agent16_${Date.now()}_1`,
      type: 'hoa_partnership_signed',
      category: 'hoa',
      priority: 'high',
      title: '🏘️ Major HOA Partnership Secured',
      description: 'AI Agent #16 secured exclusive partnership with Stonegate Community (2,400 homes) - $1.2M annual value',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 610000).toISOString(),
      agentId: 16,
      requiresApproval: false
    },

  // Agent #17 - Hyper-Local LLM Market Intelligence Agent Activities
    {
      id: `agent17_${Date.now()}_1`,
      type: 'market_intelligence',
      category: 'analytics',
      priority: 'medium',
      title: '🎯 Market Intelligence Gathered',
      description: 'AI Agent #17 analyzed local market conditions - identified 45% growth opportunity in suburban Dallas',
      location: 'Dallas, TX',
      timestamp: new Date(currentTime.getTime() - 632000).toISOString(),
      agentId: 17,
      requiresApproval: false
    },

  // Agent #18 - Parts Ordering Specialist Activities
    {
      id: `agent18_${Date.now()}_1`,
      type: 'parts_optimized',
      category: 'parts',
      priority: 'medium',
      title: '📦 Inventory Optimization Success',
      description: 'AI Agent #18 predicted demand spike - pre-ordered 150 compressor units, avoiding 2-week backlog',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 654000).toISOString(),
      agentId: 18,
      requiresApproval: false
    },

  // Agent #19 - Performance Analytics AI Activities
    {
      id: `agent19_${Date.now()}_1`,
      type: 'performance_analytics',
      category: 'analytics',
      priority: 'high',
      title: '📈 Performance Analytics Generated',
      description: 'AI Agent #19 identified top performer patterns - created replication strategy for 89% efficiency improvement',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 676000).toISOString(),
      agentId: 19,
      requiresApproval: false
    },

  // Agent #20 - Regional Performance Monitor Activities
    {
      id: `agent20_${Date.now()}_1`,
      type: 'regional_monitoring',
      category: 'performance',
      priority: 'medium',
      title: '🌎 Regional Performance Monitored',
      description: 'AI Agent #20 analyzed regional performance - Southwest region leading with 97% customer satisfaction',
      location: 'Southwest Region',
      timestamp: new Date(currentTime.getTime() - 698000).toISOString(),
      agentId: 20,
      requiresApproval: false
    },

  // Agent #21 - Technician Management Agent Activities
    {
      id: `agent21_${Date.now()}_1`,
      type: 'technician_management',
      category: 'retention',
      priority: 'high',
      title: '👥 Technician Performance Managed',
      description: 'AI Agent #21 managed 234 technician schedules - optimized routes saving 4.2 hours daily per technician',
      location: 'Los Angeles, CA',
      timestamp: new Date(currentTime.getTime() - 720000).toISOString(),
      agentId: 21,
      requiresApproval: false
    },

  // Agent #22 - Technician Recruiting Agent Activities
    {
      id: `contractor_${Date.now()}_1`,
      type: 'contractor_recruited',
      category: 'contractor',
      priority: 'high',
      title: '👷 Elite HVAC Contractor Recruited',
      description: 'AI Agent #22 successfully recruited master HVAC technician (12+ years) with 4.8⭐ rating in Tampa area',
      location: 'Tampa, FL',
      timestamp: new Date(currentTime.getTime() - 25000).toISOString(),
      agentId: 22,
      requiresApproval: false
    },
    {
      id: `contractor_${Date.now()}_2`,
      type: 'firm_onboarded',
      category: 'contractor',
      priority: 'medium',
      title: '🏢 Multi-Trade Firm Onboarded',
      description: 'AI Agent #22: Southeast Services LLC (8 technicians) completed onboarding with full HVAC/Plumbing certification',
      location: 'Atlanta, GA',
      timestamp: new Date(currentTime.getTime() - 45000).toISOString(),
      agentId: 22,
      requiresApproval: false
    },
  // Agent #23 - Technician Training & Development Agent Activities
    {
      id: `agent23_${Date.now()}_1`,
      type: 'training_program',
      category: 'retention',
      priority: 'medium',
      title: '🎓 Training Program Completed',
      description: 'AI Agent #23 completed HVAC certification training for 23 technicians - 96% pass rate achieved',
      location: 'Austin, TX',
      timestamp: new Date(currentTime.getTime() - 742000).toISOString(),
      agentId: 23,
      requiresApproval: false
    },
    {
      id: `agent23_${Date.now()}_2`,
      type: 'skills_assessment',
      category: 'retention',
      priority: 'high',
      title: '📊 Skills Gap Analysis',
      description: 'AI Agent #23 identified critical skills gaps in smart thermostat installation - training module created',
      location: 'Dallas, TX',
      timestamp: new Date(currentTime.getTime() - 764000).toISOString(),
      agentId: 23,
      requiresApproval: true,
      proposedAction: 'Deploy mandatory smart thermostat training to 89 technicians region-wide'
    },

  // Agent #24 - Conversational Commerce Agent Activities (Call Disposition)
    {
      id: `agent24_${Date.now()}_1`,
      type: 'conversion_optimization',
      category: 'analytics',
      priority: 'medium',
      title: '📊 Call Conversion Rate Improved',
      description: 'AI Agent #24 optimized call scripts - increased call-to-service conversion from 73% to 81%',
      location: 'Miami, FL',
      timestamp: new Date(currentTime.getTime() - 786000).toISOString(),
      agentId: 24,
      requiresApproval: false
    },
    {
      id: `agent24_${Date.now()}_2`,
      type: 'friction_point_detected',
      category: 'analytics',
      priority: 'high',
      title: '⚠️ Call Friction Point Detected',
      description: 'AI Agent #24 analysis shows 23% customer drop-off during pricing discussion - recommending dynamic pricing strategy',
      location: 'Chicago, IL',
      timestamp: new Date(currentTime.getTime() - 808000).toISOString(),
      agentId: 24,
      requiresApproval: true,
      proposedAction: 'Implement graduated pricing reveal and value-first communication approach'
    },

  // Agent #25 - LLM Content Intelligence Agent Activities
    {
      id: `agent25_${Date.now()}_1`,
      type: 'content_optimization',
      category: 'ai_agent',
      priority: 'medium',
      title: '📝 Content Intelligence Optimized',
      description: 'AI Agent #25 optimized service descriptions - improved customer understanding scores by 34%',
      location: 'Seattle, WA',
      timestamp: new Date(currentTime.getTime() - 830000).toISOString(),
      agentId: 25,
      requiresApproval: false
    },
    {
      id: `agent25_${Date.now()}_2`,
      type: 'communication_analysis',
      category: 'customer',
      priority: 'high',
      title: '💬 Communication Pattern Analysis',
      description: 'AI Agent #25 analyzed 3,421 customer communications - identified 5 key satisfaction drivers',
      location: 'Portland, OR',
      timestamp: new Date(currentTime.getTime() - 852000).toISOString(),
      agentId: 25,
      requiresApproval: false
    },

  // Agent #26 - Technician Retention Intelligence Agent Activities
    {
      id: `agent26_${Date.now()}_1`,
      type: 'retention_intervention',
      category: 'retention',
      priority: 'high',
      title: '🎯 Proactive Retention Success',
      description: 'AI Agent #26 prevented departure of top performer through targeted $2K bonus + flexible schedule',
      location: 'San Antonio, TX',
      timestamp: new Date(currentTime.getTime() - 874000).toISOString(),
      agentId: 26,
      requiresApproval: false
    },
    {
      id: `agent26_${Date.now()}_2`,
      type: 'satisfaction_alert',
      category: 'retention',
      priority: 'critical',
      title: '🚨 Satisfaction Score Drop',
      description: 'AI Agent #26 detected metro area technician satisfaction dropped 12% this week - 8 at-risk technicians identified',
      location: 'Atlanta, GA',
      timestamp: new Date(currentTime.getTime() - 896000).toISOString(),
      agentId: 26,
      requiresApproval: true,
      proposedAction: 'Deploy Magik Button retention program + immediate manager check-ins for at-risk technicians'
    },

    // Additional Agent Activities for 20+ entries each
    // More Agent #1 Activities
    {
      id: `agent1_${Date.now()}_4`,
      type: 'revenue_forecast',
      category: 'financial',
      priority: 'high',
      title: '📈 Revenue Forecast Updated',
      description: 'AI Agent #1 revised Q4 revenue forecast to $3.2M based on current market trends and capacity expansion',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 918000).toISOString(),
      agentId: 1,
      requiresApproval: false
    },
    {
      id: `agent1_${Date.now()}_5`,
      type: 'market_expansion',
      category: 'ai_agent',
      priority: 'medium',
      title: '🌎 Market Expansion Analysis',
      description: 'AI Agent #1 identified Nashville as prime expansion target - 67% market opportunity with minimal competition',
      location: 'Nashville, TN',
      timestamp: new Date(currentTime.getTime() - 940000).toISOString(),
      agentId: 1,
      requiresApproval: true,
      proposedAction: 'Approve Nashville market entry with 15-contractor pilot program'
    },

    // More Agent #22 Activities
    {
      id: `contractor_${Date.now()}_3`,
      type: '1099_compliance_check',
      category: 'contractor',
      priority: 'medium',
      title: '📋 1099 Compliance Audit Completed',
      description: 'AI Agent #22 verified 127 contractor agreements meet IRS independent contractor guidelines - 100% compliant',
      location: 'Dallas, TX',
      timestamp: new Date(currentTime.getTime() - 67000).toISOString(),
      agentId: 22,
      requiresApproval: false
    },
    {
      id: `contractor_${Date.now()}_4`,
      type: 'contractor_performance_alert',
      category: 'contractor',
      priority: 'high',
      title: '⚠️ Top Performer Risk Alert',
      description: 'Elite contractor "Mike\'s Pro HVAC" (95% satisfaction) showing 3-day response decline',
      location: 'Houston, TX',
      timestamp: new Date(currentTime.getTime() - 89000).toISOString(),
      agentId: 22,
      requiresApproval: true,
      proposedAction: 'Schedule retention call and offer premium incentive package'
    },
    
    // HOA Partnership Program Activities (Agent #16 - B2B Intelligence)
    {
      id: `hoa_${Date.now()}_1`,
      type: 'hoa_partnership_signed',
      category: 'hoa',
      priority: 'high',
      title: '🏘️ Major HOA Partnership Secured',
      description: 'AI Agent #16 secured exclusive partnership with Stonegate Community (2,400 homes) - $1.2M annual value',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 112000).toISOString(),
      agentId: 16,
      requiresApproval: false
    },
    {
      id: `hoa_${Date.now()}_2`,
      type: 'hoa_contractor_deployment',
      category: 'hoa',
      priority: 'medium',
      title: '🔧 HOA Contractor Network Deployed',
      description: 'Assigned 12 certified contractors to Meadowbrook HOA (850 homes) with 2-hour response guarantee',
      location: 'Austin, TX',
      timestamp: new Date(currentTime.getTime() - 134000).toISOString(),
      agentId: 16,
      requiresApproval: false
    },
    {
      id: `hoa_${Date.now()}_3`,
      type: 'hoa_recruiting_initiative',
      category: 'hoa',
      priority: 'medium',
      title: '🎯 HOA-Specialized Recruiting Drive',
      description: 'Launched targeted recruitment for HOA community specialists - seeking 20 contractors with multi-unit experience',
      location: 'Orlando, FL',
      timestamp: new Date(currentTime.getTime() - 156000).toISOString(),
      agentId: 22,
      requiresApproval: false
    },
    
    // Call Center Scheduling Activities (Agent #11 - Advanced Scheduling)
    {
      id: `call_center_${Date.now()}_1`,
      type: 'call_center_optimization',
      category: 'call_center',
      priority: 'high',
      title: '📞 Call Center AI Optimization',
      description: 'AI Agent #11 reduced average wait time by 34% (2m 15s → 1m 28s) through intelligent routing',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 178000).toISOString(),
      agentId: 11,
      requiresApproval: false
    },
    {
      id: `call_center_${Date.now()}_2`,
      type: 'peak_scheduling_alert',
      category: 'call_center',
      priority: 'critical',
      title: '🚨 Peak Hour Scheduling Alert',
      description: 'Monday 2-4 PM showing 127% capacity utilization - recommend immediate contractor overflow activation',
      location: 'Dallas Metro',
      timestamp: new Date(currentTime.getTime() - 201000).toISOString(),
      agentId: 11,
      requiresApproval: true,
      proposedAction: 'Activate 15 standby contractors and extend hours for premium service'
    },
    
    // Call Disposition Analysis Activities (Agent #24 - Conversational Commerce)
    {
      id: `disposition_${Date.now()}_1`,
      type: 'conversion_optimization',
      category: 'analytics',
      priority: 'medium',
      title: '📊 Call Conversion Rate Improved',
      description: 'AI Agent #24 optimized call scripts - increased call-to-service conversion from 73% to 81%',
      location: 'Miami, FL',
      timestamp: new Date(currentTime.getTime() - 223000).toISOString(),
      agentId: 24,
      requiresApproval: false
    },
    {
      id: `disposition_${Date.now()}_2`,
      type: 'friction_point_detected',
      category: 'analytics',
      priority: 'high',
      title: '⚠️ Call Friction Point Detected',
      description: 'Analysis shows 23% customer drop-off during pricing discussion - recommending dynamic pricing strategy',
      location: 'Chicago, IL',
      timestamp: new Date(currentTime.getTime() - 245000).toISOString(),
      agentId: 24,
      requiresApproval: true,
      proposedAction: 'Implement graduated pricing reveal and value-first communication approach'
    },
    
    // Parts Management Activities (Agent #18 - Parts Ordering Specialist)
    {
      id: `parts_${Date.now()}_1`,
      type: 'parts_optimized',
      category: 'parts',
      priority: 'medium',
      title: '📦 Inventory Optimization Success',
      description: 'AI Agent #18 predicted demand spike - pre-ordered 150 compressor units, avoiding 2-week backlog',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 267000).toISOString(),
      agentId: 18,
      requiresApproval: false
    },
    {
      id: `parts_${Date.now()}_2`,
      type: 'vendor_performance_alert',
      category: 'parts',
      priority: 'high',
      title: '⚠️ Vendor Performance Decline',
      description: 'GE Parts delivery time increased 40% (2.1d → 2.9d) - impacting 127 open orders',
      location: 'Dallas, TX',
      timestamp: new Date(currentTime.getTime() - 289000).toISOString(),
      agentId: 18,
      requiresApproval: true,
      proposedAction: 'Switch to WHIRLPOOL supplier for critical orders and escalate with GE account manager'
    },
    {
      id: `parts_${Date.now()}_3`,
      type: 'delivery_acceleration',
      category: 'parts',
      priority: 'medium',
      title: '🚛 Same-Day Delivery Activated',
      description: 'Activated premium logistics for 23 critical HVAC repairs - all parts delivered within 4 hours',
      location: 'Houston, TX',
      timestamp: new Date(currentTime.getTime() - 311000).toISOString(),
      agentId: 18,
      requiresApproval: false
    },
    
    // Technician Retention Activities (Agent #26 - Retention Intelligence)
    {
      id: `retention_${Date.now()}_1`,
      type: 'retention_intervention',
      category: 'retention',
      priority: 'high',
      title: '🎯 Proactive Retention Success',
      description: 'AI Agent #26 prevented departure of top performer through targeted $2K bonus + flexible schedule',
      location: 'San Antonio, TX',
      timestamp: new Date(currentTime.getTime() - 333000).toISOString(),
      agentId: 26,
      requiresApproval: false
    },
    {
      id: `retention_${Date.now()}_2`,
      type: 'satisfaction_alert',
      category: 'retention',
      priority: 'critical',
      title: '🚨 Satisfaction Score Drop',
      description: 'Metro area technician satisfaction dropped 12% this week - 8 at-risk technicians identified',
      location: 'Atlanta, GA',
      timestamp: new Date(currentTime.getTime() - 355000).toISOString(),
      agentId: 26,
      requiresApproval: true,
      proposedAction: 'Deploy Magik Button retention program + immediate manager check-ins for at-risk technicians'
    },
    
    // Advanced AI Agent Activities
    {
      id: `ai_${Date.now()}_1`,
      type: 'predictive_scheduling',
      category: 'scheduling',
      priority: 'medium',
      title: '🧠 Predictive Scheduling Success',
      description: 'AI Agent #11 predicted weather impact - pre-positioned 12 HVAC teams before heat wave',
      location: 'Austin, TX',
      timestamp: new Date(currentTime.getTime() - 377000).toISOString(),
      agentId: 11,
      requiresApproval: false
    },
    {
      id: `ai_${Date.now()}_2`,
      type: 'quality_assurance',
      category: 'performance',
      priority: 'high',
      title: '🏆 Quality Score Improvement',
      description: 'AI Agent #8 (QA Inspector) identified 3 training gaps - implemented targeted coaching program',
      location: 'Miami, FL',
      timestamp: new Date(currentTime.getTime() - 399000).toISOString(),
      agentId: 8,
      requiresApproval: false
    },
    
    // Financial & Revenue Activities (Agent #9 - Pricing Specialist)
    {
      id: `financial_${Date.now()}_1`,
      type: 'pricing_optimization',
      category: 'financial',
      priority: 'medium',
      title: '💰 Dynamic Pricing Success',
      description: 'AI Agent #9 optimized pricing strategy - increased average order value by 18% while maintaining 95% acceptance',
      location: 'Denver, CO',
      timestamp: new Date(currentTime.getTime() - 421000).toISOString(),
      agentId: 9,
      requiresApproval: false
    },
    {
      id: `financial_${Date.now()}_2`,
      type: 'revenue_alert',
      category: 'financial',
      priority: 'high',
      title: '📊 Revenue Target Achievement',
      description: 'Q3 revenue target achieved 23 days early - $2.1M above forecast with 89% contractor retention',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 443000).toISOString(),
      agentId: 19,
      requiresApproval: false
    },
    
    // MASSIVE EXPANSION: 15+ additional activities per agent to reach 20+ entries each
    
    // Additional Agent #1 Activities (Executive Dashboard)
    {
      id: `agent1_${Date.now()}_11`,
      type: 'risk_assessment',
      category: 'analytics',
      priority: 'high',
      title: '⚠️ Business Risk Assessment',
      description: 'AI Agent #1 identified supply chain risk - created contingency plan for 3 alternate parts suppliers',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 1380000).toISOString(),
      agentId: 1,
      requiresApproval: true,
      proposedAction: 'Approve supplier diversification strategy and emergency inventory buildup'
    },
    {
      id: `agent1_${Date.now()}_12`,
      type: 'acquisition_analysis',
      category: 'financial',
      priority: 'critical',
      title: '🏢 Acquisition Target Identified',
      description: 'AI Agent #1 analysis shows Phoenix HVAC Co (45 techs) as strategic acquisition - $890K valuation',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 1402000).toISOString(),
      agentId: 1,
      requiresApproval: true,
      proposedAction: 'Schedule due diligence meeting and prepare acquisition proposal'
    },
    {
      id: `agent1_${Date.now()}_13`,
      type: 'valuation_update',
      category: 'financial',
      priority: 'high',
      title: '💎 Company Valuation Increased',
      description: 'AI Agent #1 updated company valuation to $847M based on Q3 performance and market growth',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 1424000).toISOString(),
      agentId: 1,
      requiresApproval: false
    },

    // Additional Agent #2 Activities (Customer Experience)
    {
      id: `agent2_${Date.now()}_8`,
      type: 'omnichannel_optimization',
      category: 'customer',
      priority: 'medium',
      title: '📱 Omnichannel Experience Enhanced',
      description: 'AI Agent #2 integrated mobile app with call center - 89% customer preference for app-first interaction',
      location: 'Los Angeles, CA',
      timestamp: new Date(currentTime.getTime() - 1446000).toISOString(),
      agentId: 2,
      requiresApproval: false
    },
    {
      id: `agent2_${Date.now()}_9`,
      type: 'personalization_engine',
      category: 'customer',
      priority: 'high',
      title: '🎯 Personalization Engine Deployed',
      description: 'AI Agent #2 launched customer personalization - 34% increase in service satisfaction through tailored experiences',
      location: 'Dallas, TX',
      timestamp: new Date(currentTime.getTime() - 1468000).toISOString(),
      agentId: 2,
      requiresApproval: false
    },

    // Additional Agent #7 Activities (Emergency Response)
    {
      id: `agent7_${Date.now()}_3`,
      type: 'disaster_recovery',
      category: 'ai_agent',
      priority: 'critical',
      title: '🌪️ Hurricane Response Coordinated',
      description: 'AI Agent #7 coordinated emergency response for Hurricane Milton - 2,341 homes serviced in 48 hours',
      location: 'Tampa Bay, FL',
      timestamp: new Date(currentTime.getTime() - 1490000).toISOString(),
      agentId: 7,
      requiresApproval: false
    },
    {
      id: `agent7_${Date.now()}_4`,
      type: 'emergency_logistics',
      category: 'ai_agent',
      priority: 'high',
      title: '🚛 Emergency Supply Chain Activated',
      description: 'AI Agent #7 deployed emergency parts supply chain - delivered 450 critical components within 6 hours',
      location: 'Houston, TX',
      timestamp: new Date(currentTime.getTime() - 1512000).toISOString(),
      agentId: 7,
      requiresApproval: false
    },

    // Additional Agent #8 Activities (Quality Assurance)
    {
      id: `agent8_${Date.now()}_3`,
      type: 'certification_tracking',
      category: 'performance',
      priority: 'medium',
      title: '📜 Certification Compliance Tracked',
      description: 'AI Agent #8 tracked 234 technician certifications - identified 12 renewals needed within 30 days',
      location: 'Austin, TX',
      timestamp: new Date(currentTime.getTime() - 1534000).toISOString(),
      agentId: 8,
      requiresApproval: false
    },
    {
      id: `agent8_${Date.now()}_4`,
      type: 'safety_audit',
      category: 'performance',
      priority: 'high',
      title: '🦺 Safety Audit Completed',
      description: 'AI Agent #8 completed safety audit - 97% compliance rate, 3 minor violations addressed immediately',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 1556000).toISOString(),
      agentId: 8,
      requiresApproval: false
    },

    // Additional Agent #22 Activities (Recruiting)
    {
      id: `agent22_${Date.now()}_5`,
      type: 'contractor_pipeline',
      category: 'recruitment',
      priority: 'high',
      title: '👥 Contractor Pipeline Expanded',
      description: 'AI Agent #22 built pipeline of 67 qualified contractors - 34 HVAC specialists, 23 electrical, 10 plumbing',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 1578000).toISOString(),
      agentId: 22,
      requiresApproval: false
    },
    {
      id: `agent22_${Date.now()}_6`,
      type: 'veteran_recruitment',
      category: 'recruitment',
      priority: 'medium',
      title: '🇺🇸 Veteran Contractor Program',
      description: 'AI Agent #22 launched veteran recruitment program - secured 15 military-trained HVAC technicians',
      location: 'San Diego, CA',
      timestamp: new Date(currentTime.getTime() - 1600000).toISOString(),
      agentId: 22,
      requiresApproval: false
    },

    // Additional Agent #11 Activities (Advanced Scheduling)
    {
      id: `agent11_${Date.now()}_3`,
      type: 'ai_routing_optimization',
      category: 'scheduling',
      priority: 'medium',
      title: '🗺️ AI Route Optimization Success',
      description: 'AI Agent #11 optimized daily routes - reduced travel time by 27% saving $2,340 weekly in fuel costs',
      location: 'Chicago, IL',
      timestamp: new Date(currentTime.getTime() - 1622000).toISOString(),
      agentId: 11,
      requiresApproval: false
    },
    {
      id: `agent11_${Date.now()}_4`,
      type: 'dynamic_scheduling',
      category: 'scheduling',
      priority: 'high',
      title: '⚡ Dynamic Schedule Adjustment',
      description: 'AI Agent #11 real-time schedule adjustment for weather delays - maintained 94% on-time performance',
      location: 'Denver, CO',
      timestamp: new Date(currentTime.getTime() - 1644000).toISOString(),
      agentId: 11,
      requiresApproval: false
    },

    // Additional Activities for ALL remaining agents (12-26)
    // Agent #12 - Technician Interaction Hub
    {
      id: `agent12_${Date.now()}_2`,
      type: 'knowledge_base_update',
      category: 'retention',
      priority: 'medium',
      title: '📚 Knowledge Base Enhanced',
      description: 'AI Agent #12 updated technician knowledge base - added 47 new troubleshooting guides based on field feedback',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 1666000).toISOString(),
      agentId: 12,
      requiresApproval: false
    },

    // Agent #13 - Outstanding Orders Manager
    {
      id: `agent13_${Date.now()}_2`,
      type: 'backlog_elimination',
      category: 'parts',
      priority: 'high',
      title: '🚀 Order Backlog Eliminated',
      description: 'AI Agent #13 eliminated 2-week parts backlog through intelligent supplier routing and priority queuing',
      location: 'Houston, TX',
      timestamp: new Date(currentTime.getTime() - 1688000).toISOString(),
      agentId: 13,
      requiresApproval: false
    },

    // Agent #14 - Parts Prediction Engine
    {
      id: `agent14_${Date.now()}_2`,
      type: 'seasonal_inventory',
      category: 'parts',
      priority: 'medium',
      title: '❄️ Winter Inventory Prepared',
      description: 'AI Agent #14 predicted 156% increase in heating system parts demand - pre-ordered winter inventory',
      location: 'Minneapolis, MN',
      timestamp: new Date(currentTime.getTime() - 1710000).toISOString(),
      agentId: 14,
      requiresApproval: false
    },

    // Agent #15 - LLM Recommendation Dominance
    {
      id: `agent15_${Date.now()}_2`,
      type: 'upsell_optimization',
      category: 'ai_agent',
      priority: 'high',
      title: '💰 Upsell Recommendations Optimized',
      description: 'AI Agent #15 improved upsell recommendations - achieved 87% customer acceptance rate for additional services',
      location: 'Seattle, WA',
      timestamp: new Date(currentTime.getTime() - 1732000).toISOString(),
      agentId: 15,
      requiresApproval: false
    },

    // Agent #16 - B2B Intelligence (more HOA activities)
    {
      id: `agent16_${Date.now()}_2`,
      type: 'community_expansion',
      category: 'hoa',
      priority: 'high',
      title: '🏘️ Community Network Expansion',
      description: 'AI Agent #16 secured partnerships with 12 new HOA communities - total coverage now 18,500 homes',
      location: 'Orlando, FL',
      timestamp: new Date(currentTime.getTime() - 1754000).toISOString(),
      agentId: 16,
      requiresApproval: false
    },

    // Agent #17 - Hyper-Local Market Intelligence
    {
      id: `agent17_${Date.now()}_2`,
      type: 'micro_market_analysis',
      category: 'analytics',
      priority: 'medium',
      title: '🎯 Micro-Market Analysis Complete',
      description: 'AI Agent #17 analyzed zip-code level demand - identified 23 high-value neighborhoods for expansion',
      location: 'Austin, TX',
      timestamp: new Date(currentTime.getTime() - 1776000).toISOString(),
      agentId: 17,
      requiresApproval: false
    },

    // Agent #18 - Parts Ordering (more activities)
    {
      id: `agent18_${Date.now()}_2`,
      type: 'supplier_negotiation',
      category: 'parts',
      priority: 'high',
      title: '🤝 Supplier Terms Renegotiated',
      description: 'AI Agent #18 renegotiated supplier terms - secured 15% bulk discount and 2-day delivery guarantee',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 1798000).toISOString(),
      agentId: 18,
      requiresApproval: false
    },

    // Agent #19 - Performance Analytics
    {
      id: `agent19_${Date.now()}_2`,
      type: 'predictive_performance',
      category: 'analytics',
      priority: 'medium',
      title: '📊 Performance Trends Predicted',
      description: 'AI Agent #19 predicted Q4 performance trends - identified need for 23% capacity increase in Southwest',
      location: 'Southwest Region',
      timestamp: new Date(currentTime.getTime() - 1820000).toISOString(),
      agentId: 19,
      requiresApproval: false
    },

    // Agent #20 - Regional Performance Monitor
    {
      id: `agent20_${Date.now()}_2`,
      type: 'benchmark_analysis',
      category: 'performance',
      priority: 'medium',
      title: '🏆 Regional Benchmarking Complete',
      description: 'AI Agent #20 benchmarked all regions - Texas leading with 96% satisfaction, California needs improvement',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 1842000).toISOString(),
      agentId: 20,
      requiresApproval: false
    },

    // Agent #21 - Technician Management
    {
      id: `agent21_${Date.now()}_2`,
      type: 'performance_coaching',
      category: 'retention',
      priority: 'high',
      title: '🎯 Performance Coaching Delivered',
      description: 'AI Agent #21 delivered personalized coaching to 45 technicians - average performance score increased by 18%',
      location: 'Miami, FL',
      timestamp: new Date(currentTime.getTime() - 1864000).toISOString(),
      agentId: 21,
      requiresApproval: false
    },

    // Agent #23 - Training & Development (more activities)
    {
      id: `agent23_${Date.now()}_3`,
      type: 'certification_program',
      category: 'retention',
      priority: 'medium',
      title: '🏅 Advanced Certification Program',
      description: 'AI Agent #23 launched smart home integration certification - 34 technicians enrolled, 89% pass rate',
      location: 'Seattle, WA',
      timestamp: new Date(currentTime.getTime() - 1886000).toISOString(),
      agentId: 23,
      requiresApproval: false
    },

    // Agent #24 - Conversational Commerce (more activities)
    {
      id: `agent24_${Date.now()}_3`,
      type: 'conversion_funnel',
      category: 'analytics',
      priority: 'high',
      title: '🎯 Conversion Funnel Optimized',
      description: 'AI Agent #24 optimized entire conversion funnel - increased quote-to-booking rate from 67% to 84%',
      location: 'Tampa, FL',
      timestamp: new Date(currentTime.getTime() - 1908000).toISOString(),
      agentId: 24,
      requiresApproval: false
    },

    // Agent #25 - Content Intelligence (more activities)
    {
      id: `agent25_${Date.now()}_3`,
      type: 'content_personalization',
      category: 'customer',
      priority: 'medium',
      title: '📝 Content Personalization Engine',
      description: 'AI Agent #25 created personalized service explanations - improved customer understanding by 42%',
      location: 'Phoenix, AZ',
      timestamp: new Date(currentTime.getTime() - 1930000).toISOString(),
      agentId: 25,
      requiresApproval: false
    },

    // Agent #26 - Retention Intelligence (more activities)
    {
      id: `agent26_${Date.now()}_3`,
      type: 'retention_analytics',
      category: 'retention',
      priority: 'high',
      title: '📊 Retention Analytics Dashboard',
      description: 'AI Agent #26 launched retention analytics - identified 5 key factors preventing technician turnover',
      location: 'National',
      timestamp: new Date(currentTime.getTime() - 1952000).toISOString(),
      agentId: 26,
      requiresApproval: false
    },
    {
      id: `agent26_${Date.now()}_4`,
      type: 'magik_button_deployment',
      category: 'retention',
      priority: 'critical',
      title: '✨ Magik Button Program Deployed',
      description: 'AI Agent #26 activated Magik Button for 12 at-risk technicians - 100% retention achieved through personalized interventions',
      location: 'Dallas, TX',
      timestamp: new Date(currentTime.getTime() - 1974000).toISOString(),
      agentId: 26,
      requiresApproval: false
    }
  );

  // Security & Threat Detection Activities
  activities.push(
    {
      id: `threat_${Date.now()}_1`,
      type: 'security_breach_attempt',
      category: 'threat',
      priority: 'critical',
      title: '🛡️ Security Breach Attempt Blocked',
      description: 'AI Security Agent detected and blocked 15 suspicious login attempts from IP range 192.168.*.* - automatic security protocols activated',
      location: 'Data Center - East',
      timestamp: new Date(currentTime.getTime() - 28000).toISOString(),
      requiresApproval: true,
      proposedAction: 'Review security logs and implement additional firewall rules'
    },
    {
      id: `threat_${Date.now()}_2`,
      type: 'data_anomaly',
      category: 'threat',
      priority: 'high',
      title: '📊 Data Anomaly Detection',
      description: 'AI Agent detected unusual data access patterns - potential insider threat identified accessing customer payment information',
      location: 'Corporate Network',
      timestamp: new Date(currentTime.getTime() - 67000).toISOString(),
      requiresApproval: true,
      proposedAction: 'Immediate security investigation and user access audit required'
    },
    {
      id: `threat_${Date.now()}_3`,
      type: 'phishing_prevention',
      category: 'threat',
      priority: 'medium',
      title: '🎣 Phishing Attack Prevention',
      description: 'AI Email Security Agent intercepted 43 phishing emails targeting technician login credentials - all threats neutralized',
      location: 'Email Security Gateway',
      timestamp: new Date(currentTime.getTime() - 112000).toISOString(),
      requiresApproval: false
    },
    {
      id: `threat_${Date.now()}_4`,
      type: 'system_vulnerability',
      category: 'threat',
      priority: 'high',
      title: '🔍 System Vulnerability Detected',
      description: 'AI Security Scan identified critical vulnerability in customer portal - patch deployment scheduled for immediate implementation',
      location: 'Web Infrastructure',
      timestamp: new Date(currentTime.getTime() - 145000).toISOString(),
      requiresApproval: true,
      proposedAction: 'Deploy security patch during maintenance window tonight'
    },
    {
      id: `threat_${Date.now()}_5`,
      type: 'compliance_violation',
      category: 'threat',
      priority: 'medium',
      title: '⚖️ Compliance Violation Alert',
      description: 'AI Compliance Monitor detected potential GDPR violation - customer data retention policy needs immediate review',
      location: 'Data Governance Center',
      timestamp: new Date(currentTime.getTime() - 178000).toISOString(),
      requiresApproval: true,
      proposedAction: 'Review data retention policies and ensure GDPR compliance'
    }
  );
  
  return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

interface SystemWideActivityFeedProps {
  category?: 'all' | 'contractor' | 'parts' | 'retention' | 'ai_agent' | 'performance' | 'customer' | 'financial' | 'hoa' | 'call_center' | 'recruitment' | 'scheduling' | 'analytics' | 'threat';
  showHeader?: boolean;
  maxItems?: number;
  compact?: boolean;
}

export default function SystemWideActivityFeed({ 
  category = 'all', 
  showHeader = true, 
  maxItems = 20,
  compact = false 
}: SystemWideActivityFeedProps) {
  const [activities, setActivities] = useState<SystemActivity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<SystemActivity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Review dialog state
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<SystemActivity | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'reject' | ''>('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    // Generate activities on mount and refresh every 30 seconds
    const generateAndSetActivities = () => {
      const newActivities = generateSystemActivities();
      setActivities(newActivities);
    };

    generateAndSetActivities();
    const interval = setInterval(generateAndSetActivities, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = activities;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(activity => activity.category === selectedCategory);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(activity => activity.priority === priorityFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date range filter
    if (startDate && endDate) {
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity.timestamp);
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        // Set time to start and end of day for proper comparison
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        
        return activityDate >= start && activityDate <= end;
      });
    } else if (startDate) {
      // Single date filter
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity.timestamp);
        const filterDate = new Date(startDate);
        
        // Compare just the date part
        return activityDate.toDateString() === filterDate.toDateString();
      });
    }

    // Limit items
    filtered = filtered.slice(0, maxItems);

    setFilteredActivities(filtered);
  }, [activities, selectedCategory, priorityFilter, searchTerm, startDate, endDate, maxItems]);

  // Review functionality
  const handleReviewActivity = (activity: SystemActivity) => {
    setSelectedActivity(activity);
    setShowReviewDialog(true);
    setReviewNotes('');
    setReviewDecision('');
  };

  const handleReviewSubmit = async () => {
    if (!selectedActivity || !reviewDecision) return;

    setSubmittingReview(true);

    try {
      // Call the human approval API to process the decision using apiRequest
      const result = await apiRequest(
        `/api/human-approvals/${selectedActivity.id}/decision`,
        'POST',
        {
          decision: reviewDecision === 'approve' ? 'approved' : 'rejected',
          notes: reviewNotes,
          approverUser: 'current_user' // In real system, get from auth context
        }
      );
      
      // Create a new activity representing the review outcome
      const reviewOutcome: SystemActivity = {
        id: `review_${Date.now()}`,
        type: reviewDecision === 'approve' ? 'approval_granted' : 'approval_rejected',
        category: selectedActivity.category,
        priority: 'high',
        title: `${reviewDecision === 'approve' ? '✅ Executive Approval' : '❌ Executive Rejection'}: ${selectedActivity.title}`,
        description: `Human stakeholder ${reviewDecision === 'approve' ? 'approved' : 'rejected'} AI agent recommendation. ${reviewNotes ? `Decision notes: ${reviewNotes}` : ''} Connected to system-wide activity feed.`,
        location: 'Executive Decision Center',
        timestamp: new Date().toISOString(),
        agentId: selectedActivity.agentId,
        requiresApproval: false,
        metadata: {
          originalActivityId: selectedActivity.id,
          decision: reviewDecision === 'approve' ? 'approved' : 'rejected',
          reviewNotes,
          processedAt: new Date().toISOString(),
          apiResponse: result
        }
      };

      // Update the activities to show both original and decision
      setActivities(prev => [reviewOutcome, ...prev]);
      
      setSubmittingReview(false);
      setShowReviewDialog(false);
      setSelectedActivity(null);
      setReviewNotes('');
      setReviewDecision('');
      
      console.log('Human-in-the-loop approval processed successfully:', result);
      
    } catch (error) {
      console.error('Error processing human approval:', error);
      setSubmittingReview(false);
      // Show error but keep dialog open for retry
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 border-red-600';
      case 'high': return 'text-orange-400 border-orange-600';
      case 'medium': return 'text-yellow-400 border-yellow-600';
      case 'low': return 'text-green-400 border-green-600';
      default: return 'text-gray-400 border-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'contractor': return <Users className="w-4 h-4" />;
      case 'parts': return <Package className="w-4 h-4" />;
      case 'retention': return <Target className="w-4 h-4" />;
      case 'ai_agent': return <Brain className="w-4 h-4" />;
      case 'performance': return <TrendingUp className="w-4 h-4" />;
      case 'customer': return <Star className="w-4 h-4" />;
      case 'financial': return <DollarSign className="w-4 h-4" />;
      case 'hoa': return <Shield className="w-4 h-4" />;
      case 'call_center': return <Phone className="w-4 h-4" />;
      case 'recruitment': return <UserPlus className="w-4 h-4" />;
      case 'scheduling': return <Calendar className="w-4 h-4" />;
      case 'analytics': return <Settings className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contractor': return 'bg-blue-500';
      case 'parts': return 'bg-purple-500';
      case 'retention': return 'bg-green-500';
      case 'ai_agent': return 'bg-cyan-500';
      case 'performance': return 'bg-orange-500';
      case 'customer': return 'bg-yellow-500';
      case 'financial': return 'bg-emerald-500';
      case 'hoa': return 'bg-indigo-500';
      case 'call_center': return 'bg-pink-500';
      case 'recruitment': return 'bg-teal-500';
      case 'scheduling': return 'bg-violet-500';
      case 'analytics': return 'bg-rose-500';
      default: return 'bg-gray-500';
    }
  };

  if (compact) {
    return (
      <div className="space-y-2">
        {filteredActivities.slice(0, 5).map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 p-2 rounded bg-gray-700 hover:bg-gray-650">
            <div className={`w-2 h-2 rounded-full ${getCategoryColor(activity.category)}`}></div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">{activity.title}</div>
              <div className="text-gray-400 text-xs">{activity.location}</div>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(activity.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
    <Card className="bg-gray-800 border-gray-700">
      {showHeader && (
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System-Wide Activity Feed
            <Badge variant="outline" className="text-cyan-400 border-cyan-600">
              {filteredActivities.length} Live Events
            </Badge>
          </CardTitle>
          
          {/* Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-4">
            <div>
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="contractor">1099 Contractor Management</SelectItem>
                  <SelectItem value="parts">Parts & Inventory</SelectItem>
                  <SelectItem value="retention">Technician Retention</SelectItem>
                  <SelectItem value="ai_agent">AI Agent Activities</SelectItem>
                  <SelectItem value="performance">Performance & Analytics</SelectItem>
                  <SelectItem value="customer">Customer Experience</SelectItem>
                  <SelectItem value="financial">Financial Operations</SelectItem>
                  <SelectItem value="hoa">HOA Partnership Program</SelectItem>
                  <SelectItem value="call_center">Call Center Scheduling</SelectItem>
                  <SelectItem value="recruitment">Contractor Recruiting</SelectItem>
                  <SelectItem value="scheduling">Predictive Scheduling</SelectItem>
                  <SelectItem value="analytics">Call Disposition Analysis</SelectItem>
                  <SelectItem value="threat">Security & Threat Detection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Date Range Selection */}
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {startDate ? (
                      endDate ? (
                        `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                      ) : (
                        startDate.toLocaleDateString()
                      )
                    ) : (
                      "Select date range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0 bg-gray-800 border-gray-600" 
                  align="start" 
                  side="bottom" 
                  sideOffset={8}
                  style={{ zIndex: 99999, position: 'fixed' }}
                  avoidCollisions={true}
                  collisionPadding={10}
                >
                  <div className="p-3">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm text-gray-300">Start Date</Label>
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          className="bg-gray-800"
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-300">End Date</Label>
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => startDate ? date < startDate : false}
                          className="bg-gray-800"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          onClick={() => {
                            setStartDate(undefined);
                            setEndDate(undefined);
                          }}
                          variant="outline"
                          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Quick Date Presets */}
            <div>
              <Select onValueChange={(value) => {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                const weekAgo = new Date(today);
                weekAgo.setDate(weekAgo.getDate() - 7);
                
                switch(value) {
                  case 'today':
                    setStartDate(today);
                    setEndDate(today);
                    break;
                  case 'yesterday':
                    setStartDate(yesterday);
                    setEndDate(yesterday);
                    break;
                  case 'last-7-days':
                    setStartDate(weekAgo);
                    setEndDate(today);
                    break;
                  case 'clear':
                    setStartDate(undefined);
                    setEndDate(undefined);
                    break;
                }
              }}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Quick filters" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="clear">Clear Filter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-blue-400 border-blue-600">
                {activities.filter(a => a.category === 'contractor').length} Contractor
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-600">
                {activities.filter(a => a.category === 'parts').length} Parts
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-600">
                {activities.filter(a => a.category === 'retention').length} Retention
              </Badge>
            </div>
          </div>
        </CardHeader>
      )}
      
      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredActivities.map((activity, index) => (
            <div key={`${activity.id}_${activity.timestamp}_${index}`} className={`flex items-center gap-3 p-3 rounded transition-colors ${
              activity.requiresApproval ? 'bg-red-900/20 border border-red-700' : 'bg-gray-700 hover:bg-gray-650'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(activity.category)}`}></div>
                {getCategoryIcon(activity.category)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">{activity.title}</span>
                  <Badge variant="outline" className={getPriorityColor(activity.priority)}>
                    {activity.priority}
                  </Badge>
                  {activity.requiresApproval && (
                    <Badge variant="outline" className="text-red-400 border-red-600">
                      Needs Approval
                    </Badge>
                  )}
                </div>
                <div className="text-gray-300 text-sm">{activity.description}</div>
                {activity.proposedAction && (
                  <div className="mt-2 p-2 bg-gray-600 rounded text-sm">
                    <span className="text-yellow-400 font-medium">Proposed Action: </span>
                    <span className="text-gray-200">{activity.proposedAction}</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-xs">{new Date(activity.timestamp).toLocaleTimeString()}</div>
                <div className="text-gray-500 text-xs">{activity.location}</div>
                {activity.agentId && (
                  <Badge variant="outline" className="text-blue-400 border-blue-600 text-xs mt-1">
                    Agent #{activity.agentId}
                  </Badge>
                )}
                {activity.requiresApproval && (
                  <Button 
                    size="sm" 
                    className="mt-2 bg-orange-600 hover:bg-orange-700"
                    onClick={() => handleReviewActivity(activity)}
                  >
                    Review
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    
    
    {/* Review Dialog */}
    <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Review AI Agent Action</DialogTitle>
          <DialogDescription className="text-gray-300">
            Please review this AI recommendation and decide whether to approve or reject the proposed action.
          </DialogDescription>
        </DialogHeader>
        
        {selectedActivity && (
          <div className="space-y-4">
            {/* Activity Details */}
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={getPriorityColor(selectedActivity.priority)}>
                  {selectedActivity.priority}
                </Badge>
                <Badge variant="outline" className="text-blue-400 border-blue-600">
                  Agent #{selectedActivity.agentId}
                </Badge>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{selectedActivity.title}</h4>
              <p className="text-gray-300 mb-3">{selectedActivity.description}</p>
              {selectedActivity.proposedAction && (
                <div className="p-3 bg-yellow-900/20 border border-yellow-600/20 rounded">
                  <div className="text-yellow-400 font-medium mb-1">Proposed Action:</div>
                  <div className="text-gray-200">{selectedActivity.proposedAction}</div>
                </div>
              )}
              <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
                <span>{selectedActivity.location}</span>
                <span>{new Date(selectedActivity.timestamp).toLocaleString()}</span>
              </div>
            </div>

            {/* Decision Section */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Decision</Label>
              <div className="flex gap-4">
                <Button
                  variant={reviewDecision === 'approve' ? 'default' : 'outline'}
                  onClick={() => setReviewDecision('approve')}
                  className={reviewDecision === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'border-green-600 text-green-400 hover:bg-green-600 hover:text-white'}
                >
                  ✅ Approve Action
                </Button>
                <Button
                  variant={reviewDecision === 'reject' ? 'default' : 'outline'}
                  onClick={() => setReviewDecision('reject')}
                  className={reviewDecision === 'reject' ? 'bg-red-600 hover:bg-red-700' : 'border-red-600 text-red-400 hover:bg-red-600 hover:text-white'}
                >
                  ❌ Reject Action
                </Button>
              </div>
            </div>

            {/* Review Notes */}
            <div className="space-y-2">
              <Label className="text-white font-medium">Review Notes (Optional)</Label>
              <Textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add any notes about your decision..."
                className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
                rows={3}
              />
            </div>
          </div>
        )}

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowReviewDialog(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleReviewSubmit}
            disabled={!reviewDecision}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}