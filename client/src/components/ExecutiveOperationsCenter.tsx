import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import NavigationBreadcrumbs from './NavigationBreadcrumbs';
import { UserPresenceIndicator } from './collaboration/UserPresenceIndicator';
import { CollaborationDashboard } from './collaboration/CollaborationDashboard';
import BusinessFunctionLeaderManager from './BusinessFunctionLeaderManager';

import { Link } from 'wouter';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Users, Calendar, DollarSign, Activity, ArrowLeft, Home, Target, BarChart3, Database, Zap, Save, RefreshCw, Bell, ExternalLink, Edit, MessageSquare, FileText, Plus, Brain } from 'lucide-react';

interface ExecutiveMetrics {
  totalTechnicians: number;
  dailyOrders: number;
  completedOrders: number;
  createdOrders: number;
  rescheduledOrders: number;
  d2cReschedules: number;
  d2cCancellations: number;
  contractor1099: number;
  contractorOrders: number;
  capacityUtilization: number;
  revenuePerOrder: number;
  profitMargin: number;
}

interface DailyTask {
  time: string;
  task: string;
  status: 'completed' | 'in-progress' | 'pending' | 'critical';
  impact: string;
  kpi: string;
  agents: string[];
  dayOfWeek?: string;
}

interface WeeklyOperations {
  [key: string]: DailyTask[];
}

interface KeyResult {
  description: string;
  target: string;
  current: string;
  progress: number;
  status: 'on-track' | 'at-risk' | 'achieved' | 'behind';
}

interface Objective {
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium';
  keyResults: KeyResult[];
  relatedAgents: string[];
  quarterProgress: number;
}

const ExecutiveOperationsCenter: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedExecutive, setSelectedExecutive] = useState<'ceo' | 'coo' | 'cfo' | 'cto' | 'cmo' | 'cdo' | 'cao' | 'cpo' | 'cro'>('ceo');
  const [selectedDay, setSelectedDay] = useState<string>('monday');
  const [selectedTab, setSelectedTab] = useState('operations');
  const [showCEOMeetings, setShowCEOMeetings] = useState(false);
  const [showOKRs, setShowOKRs] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [chartView, setChartView] = useState<'ai' | 'human'>('ai');
  
  // Project Management State
  const [showMilestoneUpdate, setShowMilestoneUpdate] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [milestoneUpdate, setMilestoneUpdate] = useState({
    status: '',
    notes: '',
    nextActionDate: '',
    externalParties: [] as string[],
    aiAgentActions: [] as string[],
    risksIssues: '',
    completionPercentage: 0
  });

  // Real-world operational metrics
  const metrics: ExecutiveMetrics = {
    totalTechnicians: 1730,
    dailyOrders: 4285, // 30K weekly ÷ 7 days
    completedOrders: 2857, // 20K weekly ÷ 7 days
    createdOrders: 4285,
    rescheduledOrders: 2000,
    d2cReschedules: 250,
    d2cCancellations: 125, // 50% of D2C reschedules
    contractor1099: 2,
    contractorOrders: 12,
    capacityUtilization: 78.5, // Based on completion rate
    revenuePerOrder: 248,
    profitMargin: 31.2
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Project Management Handlers
  const handleMilestoneUpdate = (project: any, milestone: any) => {
    setSelectedProject(project);
    setSelectedMilestone(milestone);
    setMilestoneUpdate({
      status: milestone.status,
      notes: '',
      nextActionDate: '',
      externalParties: [],
      aiAgentActions: [],
      risksIssues: '',
      completionPercentage: milestone.status === 'completed' ? 100 : milestone.status === 'in-progress' ? 50 : 0
    });
    setShowMilestoneUpdate(true);
  };

  const handleSaveMilestoneUpdate = () => {
    console.log('Milestone Update Saved:', {
      project: selectedProject?.title,
      milestone: selectedMilestone?.title,
      update: milestoneUpdate
    });
    
    // In a real system, this would integrate with:
    // - AI Agent notification system
    // - External party communication (emails, Slack, etc.)
    // - Database updates
    // - Real-time collaboration updates
    
    setShowMilestoneUpdate(false);
    
    // Reset form
    setMilestoneUpdate({
      status: '',
      notes: '',
      nextActionDate: '',
      externalParties: [],
      aiAgentActions: [],
      risksIssues: '',
      completionPercentage: 0
    });
  };

  const getExternalPartyOptions = () => [
    'AHS (American Home Shield)',
    'Assurant (AIZ)',
    'Choice Home Warranty',
    'Local HOA Boards',
    '1099 Contractor Companies',
    'Parts Vendors',
    'Technician Teams',
    'Customer Service Teams',
    'Regional Managers',
    'Training Partners'
  ];

  const getAIAgentOptions = () => [
    'Advanced Scheduling Agent',
    'Technician Recruiting Agent',
    'B2B Intelligence Agent',
    'Parts Prediction Engine',
    'Customer Communication Hub',
    'Financial Intelligence Agent',
    'Route Optimization Engine',
    'Quality Assurance Inspector',
    'Performance Analytics AI',
    'Workforce Intelligence Agent'
  ];

  const getCEOWeeklyOperations = (): WeeklyOperations => ({
    monday: [
      {
        time: '6:00 AM',
        task: 'Weekly Executive Dashboard Review - Capacity, Revenue, Growth Metrics',
        status: 'critical',
        impact: 'Set strategic priorities for week',
        kpi: 'Executive Leadership',
        agents: ['CEO/COO Agent', 'Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '7:00 AM',
        task: 'Series A Investor Relations - Weekly Progress Update',
        status: 'in-progress',
        impact: '$50M funding round momentum',
        kpi: 'Financial Strategy',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '9:00 AM',
        task: 'Strategic Planning Session - 1099 Contractor Network Expansion',
        status: 'pending',
        impact: 'Scale from 2 to 50+ contractor companies',
        kpi: 'Capacity Strategy',
        agents: ['CEO/COO Agent', 'Technician Recruiting Agent', 'B2B Relationship Manager']
      },
      {
        time: '2:00 PM',
        task: 'Board of Directors Preparation - Operational Metrics Review',
        status: 'pending',
        impact: 'Governance and strategic alignment',
        kpi: 'Board Relations',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      }
    ],
    tuesday: [
      {
        time: '6:00 AM',
        task: 'Market Expansion Strategy - Geographic Growth Planning',
        status: 'in-progress',
        impact: '430 planning areas optimization',
        kpi: 'Market Penetration',
        agents: ['Regional Performance Monitor', 'Geographic Performance Marketing Agent', 'D2C Marketing Intelligence']
      },
      {
        time: '8:00 AM',
        task: 'Competitive Intelligence Review - Market Position Analysis',
        status: 'pending',
        impact: 'Strategic differentiation and pricing',
        kpi: 'Competitive Advantage',
        agents: ['D2C Marketing Intelligence', 'B2B Relationship Manager', 'Pricing & Estimation Specialist']
      },
      {
        time: '10:00 AM',
        task: 'Customer Experience Strategy - D2C Retention & Growth',
        status: 'pending',
        impact: 'Reduce $31K daily D2C cancellation loss',
        kpi: 'Customer Lifetime Value',
        agents: ['CX Agent', 'Customer Communication Hub', 'D2C Marketing Intelligence']
      },
      {
        time: '3:00 PM',
        task: 'Technology Roadmap Review - AI Agent Enhancement',
        status: 'pending',
        impact: 'Operational efficiency and scalability',
        kpi: 'Technology Leadership',
        agents: ['All 26 AI Agents for performance review']
      }
    ],
    wednesday: [
      {
        time: '6:00 AM',
        task: 'Mid-Week Performance Review - KPI Analysis',
        status: 'critical',
        impact: 'Course correction for weekly targets',
        kpi: 'Performance Management',
        agents: ['Performance Analytics AI', 'Regional Performance Monitor', 'Financial Intelligence Agent']
      },
      {
        time: '8:00 AM',
        task: 'Partnership Strategy - B2B Client Relationship Review',
        status: 'in-progress',
        impact: 'AHS, Assurant, Choice relationship optimization',
        kpi: 'Partnership Revenue',
        agents: ['B2B Relationship Manager', 'CX Agent', 'Parts Supply Chain Agent']
      },
      {
        time: '11:00 AM',
        task: 'Innovation Planning - Product Development Strategy',
        status: 'pending',
        impact: 'Next-generation service offerings',
        kpi: 'Innovation Pipeline',
        agents: ['HVAC System Diagnostics AI', 'Quality Assurance Inspector', 'Technician Training Agent']
      }
    ],
    thursday: [
      {
        time: '6:00 AM',
        task: 'Financial Performance Review - Revenue & Profit Analysis',
        status: 'in-progress',
        impact: '$15.4M monthly revenue leak analysis',
        kpi: 'Financial Performance',
        agents: ['Financial Intelligence Agent', 'Pricing & Estimation Specialist', 'Performance Analytics AI']
      },
      {
        time: '9:00 AM',
        task: 'Operational Excellence Review - Process Optimization',
        status: 'pending',
        impact: 'Capacity utilization improvement',
        kpi: 'Operational Efficiency',
        agents: ['CEO/COO Agent', 'Route Optimization Engine', 'Advanced Scheduling Agent']
      },
      {
        time: '1:00 PM',
        task: 'Team Leadership - Executive Team Alignment',
        status: 'pending',
        impact: 'Cross-functional coordination',
        kpi: 'Leadership Effectiveness',
        agents: ['CEO/COO Agent', 'Quality Assurance Inspector']
      }
    ],
    friday: [
      {
        time: '6:00 AM',
        task: 'Weekly Results Review - Performance Against Targets',
        status: 'critical',
        impact: 'Weekly performance assessment',
        kpi: 'Results Achievement',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent', 'Regional Performance Monitor']
      },
      {
        time: '8:00 AM',
        task: 'Strategic Communications - Stakeholder Updates',
        status: 'in-progress',
        impact: 'Investor and board communication',
        kpi: 'Stakeholder Relations',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '10:00 AM',
        task: 'Next Week Planning - Strategic Priority Setting',
        status: 'pending',
        impact: 'Weekly strategic direction',
        kpi: 'Strategic Planning',
        agents: ['CEO/COO Agent', 'Performance Analytics AI']
      }
    ],
    saturday: [
      {
        time: '8:00 AM',
        task: 'Strategic Reflection - Long-term Vision Review',
        status: 'pending',
        impact: 'Deep strategic thinking and planning',
        kpi: 'Vision Development',
        agents: ['CEO/COO Agent', 'Performance Analytics AI']
      },
      {
        time: '10:00 AM',
        task: 'Innovation Exploration - Emerging Technology Assessment',
        status: 'pending',
        impact: 'Future technology integration opportunities',
        kpi: 'Innovation Leadership',
        agents: ['HVAC System Diagnostics AI', 'LLM Recommendation Dominance Agent']
      },
      {
        time: '2:00 PM',
        task: 'Industry Research - Market Trends & Competitive Intelligence',
        status: 'pending',
        impact: 'Stay ahead of market changes',
        kpi: 'Market Intelligence',
        agents: ['D2C Marketing Intelligence', 'B2B Relationship Manager']
      }
    ],
    sunday: [
      {
        time: '9:00 AM',
        task: 'Weekly Preparation - Next Week Strategic Planning',
        status: 'pending',
        impact: 'Prepare for upcoming week priorities',
        kpi: 'Weekly Readiness',
        agents: ['CEO/COO Agent', 'Performance Analytics AI', 'Financial Intelligence Agent']
      },
      {
        time: '11:00 AM',
        task: 'Leadership Development - Team Growth Planning',
        status: 'pending',
        impact: 'Executive team development and coaching',
        kpi: 'Leadership Excellence',
        agents: ['CEO/COO Agent', 'Quality Assurance Inspector']
      },
      {
        time: '3:00 PM',
        task: 'Board & Investor Preparation - Week Ahead Communications',
        status: 'pending',
        impact: 'Stakeholder relationship management',
        kpi: 'Stakeholder Relations',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      }
    ]
  });

  const getCOOWeeklyOperations = (): WeeklyOperations => ({
    monday: [
      {
        time: '5:30 AM',
        task: 'Operations War Room Setup - Weekly Capacity & Resource Planning',
        status: 'critical',
        impact: 'Optimize 1,730 technicians across 430 areas',
        kpi: 'Operational Readiness',
        agents: ['CEO/COO Agent', 'Advanced Scheduling Agent', 'Regional Performance Monitor']
      },
      {
        time: '6:30 AM',
        task: '1099 Contractor Network Expansion - Weekly Deployment Strategy',
        status: 'critical',
        impact: 'Scale from 2 to 50+ contractor companies',
        kpi: 'Contractor Network Growth',
        agents: ['Technician Recruiting Agent', 'Quality Assurance Inspector', 'Technician Training Agent']
      },
      {
        time: '8:00 AM',
        task: 'Quality Standards Review - W2 vs 1099 Performance Metrics',
        status: 'in-progress',
        impact: 'Maintain service quality across workforce',
        kpi: 'Quality Assurance',
        agents: ['Quality Assurance Inspector', 'Technician Interaction Hub', 'Performance Analytics AI']
      },
      {
        time: '10:00 AM',
        task: 'Weekly Route Optimization - Geographic Efficiency Planning',
        status: 'pending',
        impact: 'Reduce travel time, increase capacity',
        kpi: 'Operational Efficiency',
        agents: ['Route Optimization Engine', 'Regional Performance Monitor', 'Advanced Scheduling Agent']
      }
    ],
    tuesday: [
      {
        time: '5:30 AM',
        task: 'Daily Capacity Crisis Management - Reschedule Prevention',
        status: 'critical',
        impact: 'Reduce 2,000 daily reschedules by 25%',
        kpi: 'Capacity Utilization',
        agents: ['Advanced Scheduling Agent', 'Emergency Response Coordinator', 'Customer Communication Hub']
      },
      {
        time: '7:00 AM',
        task: 'Parts Supply Chain Optimization - Inventory & Logistics',
        status: 'in-progress',
        impact: 'Support 75% volume increase',
        kpi: 'Supply Chain Efficiency',
        agents: ['Parts Supply Chain Agent', 'Parts Prediction Engine', 'Parts Ordering Specialist']
      },
      {
        time: '9:00 AM',
        task: 'Technician Training & Development - Skill Enhancement',
        status: 'pending',
        impact: 'Improve completion rates and efficiency',
        kpi: 'Workforce Development',
        agents: ['Technician Training Agent', 'HVAC System Diagnostics AI', 'Electrical Safety Compliance Agent']
      },
      {
        time: '2:00 PM',
        task: 'Emergency Response Protocol Review - Crisis Management',
        status: 'pending',
        impact: 'Optimize emergency call handling',
        kpi: 'Emergency Response',
        agents: ['Emergency Response Coordinator', 'Plumbing Dispatch Coordinator', 'Customer Communication Hub']
      }
    ],
    wednesday: [
      {
        time: '6:00 AM',
        task: 'Mid-Week Operations Review - Performance Analysis',
        status: 'critical',
        impact: 'Course correct operational strategies',
        kpi: 'Mid-Week Assessment',
        agents: ['Performance Analytics AI', 'Regional Performance Monitor', 'CEO/COO Agent']
      },
      {
        time: '8:00 AM',
        task: 'Technology Integration - AI Agent Optimization',
        status: 'in-progress',
        impact: 'Enhance AI routing for contractor network',
        kpi: 'Tech Integration',
        agents: ['Advanced Scheduling Agent', 'Route Optimization Engine', 'Technician Interaction Hub']
      },
      {
        time: '11:00 AM',
        task: 'Customer Service Optimization - Communication Excellence',
        status: 'pending',
        impact: 'Improve customer satisfaction scores',
        kpi: 'Customer Experience',
        agents: ['Customer Communication Hub', 'CX Agent', 'Quality Assurance Inspector']
      }
    ],
    thursday: [
      {
        time: '5:30 AM',
        task: 'Operational Efficiency Review - Process Improvement',
        status: 'in-progress',
        impact: 'Identify bottlenecks and solutions',
        kpi: 'Process Optimization',
        agents: ['CEO/COO Agent', 'Performance Analytics AI', 'Route Optimization Engine']
      },
      {
        time: '7:30 AM',
        task: 'Inventory Management - Parts & Tools Optimization',
        status: 'pending',
        impact: 'Minimize stockouts and delays',
        kpi: 'Inventory Efficiency',
        agents: ['Parts Prediction Engine', 'Inventory Management Assistant', 'Parts Ordering Specialist']
      },
      {
        time: '10:00 AM',
        task: 'Field Operations Coordination - Technician Support',
        status: 'pending',
        impact: 'Enhance field productivity and safety',
        kpi: 'Field Operations',
        agents: ['Technician Interaction Hub', 'Electrical Safety Compliance Agent', 'Quality Assurance Inspector']
      }
    ],
    friday: [
      {
        time: '6:00 AM',
        task: 'Weekly Operations Review - Performance Against Targets',
        status: 'critical',
        impact: 'Assess operational achievements',
        kpi: 'Weekly Performance',
        agents: ['Performance Analytics AI', 'Regional Performance Monitor', 'CEO/COO Agent']
      },
      {
        time: '8:00 AM',
        task: 'Next Week Operations Planning - Resource Allocation',
        status: 'in-progress',
        impact: 'Optimize next week deployment',
        kpi: 'Forward Planning',
        agents: ['Advanced Scheduling Agent', 'Route Optimization Engine', 'Regional Performance Monitor']
      },
      {
        time: '10:00 AM',
        task: 'Cross-Department Coordination - Alignment Meeting',
        status: 'pending',
        impact: 'Ensure operational alignment',
        kpi: 'Cross-Functional Coordination',
        agents: ['CEO/COO Agent', 'Performance Analytics AI']
      }
    ],
    saturday: [
      {
        time: '7:00 AM',
        task: 'Weekend Operations Monitoring - Critical Systems Check',
        status: 'pending',
        impact: 'Ensure weekend service continuity',
        kpi: 'Weekend Operations',
        agents: ['Advanced Scheduling Agent', 'Emergency Response Coordinator', 'Regional Performance Monitor']
      },
      {
        time: '10:00 AM',
        task: 'Contractor Network Development - Weekend Expansion Planning',
        status: 'pending',
        impact: 'Scale 1099 contractor weekend coverage',
        kpi: 'Network Growth',
        agents: ['Technician Recruiting Agent', 'Quality Assurance Inspector']
      },
      {
        time: '2:00 PM',
        task: 'Quality Assurance Review - Weekend Service Standards',
        status: 'pending',
        impact: 'Maintain quality during weekend operations',
        kpi: 'Quality Standards',
        agents: ['Quality Assurance Inspector', 'Technician Interaction Hub']
      }
    ],
    sunday: [
      {
        time: '8:00 AM',
        task: 'Next Week Operations Preparation - Resource Planning',
        status: 'pending',
        impact: 'Prepare for upcoming week operations',
        kpi: 'Weekly Readiness',
        agents: ['CEO/COO Agent', 'Advanced Scheduling Agent', 'Regional Performance Monitor']
      },
      {
        time: '11:00 AM',
        task: 'Technician Development Planning - Training & Skill Enhancement',
        status: 'pending',
        impact: 'Plan technician capability improvements',
        kpi: 'Workforce Development',
        agents: ['Technician Training Agent', 'Quality Assurance Inspector']
      },
      {
        time: '3:00 PM',
        task: 'Strategic Operations Review - Process Optimization Planning',
        status: 'pending',
        impact: 'Identify operational improvement opportunities',
        kpi: 'Operational Excellence',
        agents: ['CEO/COO Agent', 'Performance Analytics AI']
      }
    ]
  });

  const getCFOWeeklyOperations = (): WeeklyOperations => ({
    monday: [
      {
        time: '6:00 AM',
        task: 'Weekly Financial Dashboard Review - Revenue, Costs, Profitability',
        status: 'critical',
        impact: 'Financial oversight and control',
        kpi: 'Financial Management',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Pricing & Estimation Specialist']
      },
      {
        time: '7:00 AM',
        task: 'Series A Funding Preparation - Financial Model Updates',
        status: 'in-progress',
        impact: '$50M funding round preparation',
        kpi: 'Capital Strategy',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '9:00 AM',
        task: 'Revenue Protection Strategy - $15.4M Monthly Leak Analysis',
        status: 'critical',
        impact: 'Minimize revenue loss from reschedules',
        kpi: 'Revenue Optimization',
        agents: ['Financial Intelligence Agent', 'Advanced Scheduling Agent', 'Performance Analytics AI']
      },
      {
        time: '11:00 AM',
        task: 'Cash Flow Planning - Operational Scaling Requirements',
        status: 'pending',
        impact: 'Finance 75% capacity increase',
        kpi: 'Cash Management',
        agents: ['Financial Intelligence Agent', 'Pricing & Estimation Specialist']
      }
    ],
    tuesday: [
      {
        time: '6:00 AM',
        task: 'Cost Analysis & Optimization - Operational Efficiency',
        status: 'in-progress',
        impact: 'Reduce operational costs per order',
        kpi: 'Cost Management',
        agents: ['Financial Intelligence Agent', 'Route Optimization Engine', 'Parts Ordering Specialist']
      },
      {
        time: '8:00 AM',
        task: '1099 Contractor Economics - ROI Validation & Scaling',
        status: 'critical',
        impact: 'Validate contractor profitability model',
        kpi: 'Contractor Economics',
        agents: ['Financial Intelligence Agent', 'Technician Recruiting Agent', 'Quality Assurance Inspector']
      },
      {
        time: '10:00 AM',
        task: 'Pricing Strategy Review - Market Positioning & Margins',
        status: 'pending',
        impact: 'Optimize pricing for competitiveness',
        kpi: 'Pricing Strategy',
        agents: ['Pricing & Estimation Specialist', 'Financial Intelligence Agent', 'B2B Relationship Manager']
      },
      {
        time: '2:00 PM',
        task: 'Partnership Revenue Analysis - B2B Client Profitability',
        status: 'pending',
        impact: 'Optimize AHS, Assurant, Choice margins',
        kpi: 'Partnership Revenue',
        agents: ['Financial Intelligence Agent', 'B2B Relationship Manager', 'Pricing & Estimation Specialist']
      }
    ],
    wednesday: [
      {
        time: '6:00 AM',
        task: 'Mid-Week Financial Review - Performance vs Budget',
        status: 'critical',
        impact: 'Assess financial performance trends',
        kpi: 'Budget Management',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '8:00 AM',
        task: 'Investment Analysis - Technology & Infrastructure ROI',
        status: 'in-progress',
        impact: 'Validate AI agent investment returns',
        kpi: 'Investment ROI',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '11:00 AM',
        task: 'Financial Risk Assessment - Market & Operational Risks',
        status: 'pending',
        impact: 'Identify and mitigate financial risks',
        kpi: 'Risk Management',
        agents: ['Financial Intelligence Agent', 'Regional Performance Monitor']
      }
    ],
    thursday: [
      {
        time: '6:00 AM',
        task: 'Revenue Analysis - Channel Performance & Optimization',
        status: 'in-progress',
        impact: 'Optimize D2C vs B2B revenue mix',
        kpi: 'Revenue Mix Optimization',
        agents: ['Financial Intelligence Agent', 'D2C Marketing Intelligence', 'B2B Relationship Manager']
      },
      {
        time: '8:00 AM',
        task: 'Financial Infrastructure - Payment & Billing Systems',
        status: 'pending',
        impact: 'Support contractor network scaling',
        kpi: 'Financial Infrastructure',
        agents: ['Financial Intelligence Agent', 'Parts Ordering Specialist']
      },
      {
        time: '10:00 AM',
        task: 'Investor Relations - Performance Metrics Preparation',
        status: 'pending',
        impact: 'Prepare investor updates and reports',
        kpi: 'Investor Relations',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      }
    ],
    friday: [
      {
        time: '6:00 AM',
        task: 'Weekly Financial Results - Performance Summary',
        status: 'critical',
        impact: 'Compile weekly financial performance',
        kpi: 'Financial Reporting',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '8:00 AM',
        task: 'Next Week Financial Planning - Budget & Resource Allocation',
        status: 'in-progress',
        impact: 'Plan next week financial priorities',
        kpi: 'Financial Planning',
        agents: ['Financial Intelligence Agent', 'Pricing & Estimation Specialist']
      },
      {
        time: '10:00 AM',
        task: 'Executive Financial Briefing - Cross-Department Alignment',
        status: 'pending',
        impact: 'Align financial strategy across teams',
        kpi: 'Financial Leadership',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      }
    ],
    saturday: [
      {
        time: '8:00 AM',
        task: 'Financial Market Analysis - Weekend Investment Review',
        status: 'pending',
        impact: 'Monitor market conditions for strategic decisions',
        kpi: 'Market Intelligence',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '10:00 AM',
        task: 'Long-term Financial Strategy - Growth Planning',
        status: 'pending',
        impact: 'Strategic financial planning and forecasting',
        kpi: 'Strategic Planning',
        agents: ['Financial Intelligence Agent', 'Pricing & Estimation Specialist']
      },
      {
        time: '2:00 PM',
        task: 'Investment Research - Business Development Opportunities',
        status: 'pending',
        impact: 'Identify financial growth opportunities',
        kpi: 'Business Development',
        agents: ['Financial Intelligence Agent', 'B2B Relationship Manager']
      }
    ],
    sunday: [
      {
        time: '9:00 AM',
        task: 'Weekly Financial Preparation - Budget Review',
        status: 'pending',
        impact: 'Prepare for next week financial priorities',
        kpi: 'Weekly Readiness',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '11:00 AM',
        task: 'Investor Relations Preparation - Communication Strategy',
        status: 'pending',
        impact: 'Prepare investor updates and presentations',
        kpi: 'Investor Relations',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '3:00 PM',
        task: 'Financial Risk Assessment - Week Ahead Planning',
        status: 'pending',
        impact: 'Identify and mitigate financial risks',
        kpi: 'Risk Management',
        agents: ['Financial Intelligence Agent', 'Pricing & Estimation Specialist']
      }
    ]
  });

  const getCTOWeeklyOperations = (): WeeklyOperations => ({
    monday: [
      {
        time: '6:00 AM',
        task: 'Technology Infrastructure Review - System Performance & Scalability',
        status: 'critical',
        impact: 'Ensure platform supports growth',
        kpi: 'System Performance',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent', 'Route Optimization Engine']
      },
      {
        time: '8:00 AM',
        task: 'AI Agent Performance Optimization - Algorithm Enhancement',
        status: 'in-progress',
        impact: 'Improve AI decision accuracy and speed',
        kpi: 'AI Performance',
        agents: ['All 26 AI Agents for performance analysis']
      },
      {
        time: '10:00 AM',
        task: 'Data Architecture Planning - Analytics & Intelligence',
        status: 'pending',
        impact: 'Enhance data-driven decision making',
        kpi: 'Data Architecture',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent', 'Regional Performance Monitor']
      },
      {
        time: '2:00 PM',
        task: 'Technology Roadmap Review - Innovation & Development',
        status: 'pending',
        impact: 'Plan technology advancement strategy',
        kpi: 'Technology Strategy',
        agents: ['HVAC System Diagnostics AI', 'Customer Communication Hub', 'Parts Prediction Engine']
      }
    ],
    tuesday: [
      {
        time: '6:00 AM',
        task: 'Platform Optimization - Performance & Reliability',
        status: 'critical',
        impact: 'Maintain system uptime and speed',
        kpi: 'Platform Reliability',
        agents: ['Advanced Scheduling Agent', 'Route Optimization Engine', 'Customer Communication Hub']
      },
      {
        time: '8:00 AM',
        task: 'Mobile Technology Enhancement - Field Operations Support',
        status: 'in-progress',
        impact: 'Improve technician mobile experience',
        kpi: 'Mobile Performance',
        agents: ['Technician Interaction Hub', 'Quality Assurance Inspector', 'Emergency Response Coordinator']
      },
      {
        time: '10:00 AM',
        task: 'Integration Architecture - Third-Party Systems',
        status: 'pending',
        impact: 'Seamless integration with partners',
        kpi: 'Integration Success',
        agents: ['Parts Supply Chain Agent', 'B2B Relationship Manager', 'Financial Intelligence Agent']
      },
      {
        time: '1:00 PM',
        task: 'Security & Compliance Review - Data Protection',
        status: 'pending',
        impact: 'Ensure data security and compliance',
        kpi: 'Security Standards',
        agents: ['Customer Communication Hub', 'Financial Intelligence Agent']
      }
    ],
    wednesday: [
      {
        time: '6:00 AM',
        task: 'Mid-Week Technology Review - Development Progress',
        status: 'critical',
        impact: 'Assess technology development status',
        kpi: 'Development Progress',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent']
      },
      {
        time: '8:00 AM',
        task: 'AI Model Training & Optimization - Machine Learning',
        status: 'in-progress',
        impact: 'Enhance AI learning and adaptation',
        kpi: 'AI Learning',
        agents: ['Parts Prediction Engine', 'Route Optimization Engine', 'HVAC System Diagnostics AI']
      },
      {
        time: '11:00 AM',
        task: 'Technology Innovation Projects - R&D Initiatives',
        status: 'pending',
        impact: 'Drive technological advancement',
        kpi: 'Innovation Pipeline',
        agents: ['HVAC System Diagnostics AI', 'Electrical Safety Compliance Agent', 'Quality Assurance Inspector']
      }
    ],
    thursday: [
      {
        time: '6:00 AM',
        task: 'System Architecture Review - Scalability & Performance',
        status: 'in-progress',
        impact: 'Prepare for business scaling',
        kpi: 'Architecture Scalability',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent', 'Regional Performance Monitor']
      },
      {
        time: '8:00 AM',
        task: 'DevOps & Deployment Optimization - Operational Excellence',
        status: 'pending',
        impact: 'Improve deployment and operations',
        kpi: 'DevOps Efficiency',
        agents: ['Performance Analytics AI', 'Quality Assurance Inspector']
      },
      {
        time: '10:00 AM',
        task: 'Technology Team Leadership - Development Coordination',
        status: 'pending',
        impact: 'Align technology development efforts',
        kpi: 'Team Coordination',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent']
      }
    ],
    friday: [
      {
        time: '6:00 AM',
        task: 'Weekly Technology Review - Achievements & Challenges',
        status: 'critical',
        impact: 'Assess weekly technology progress',
        kpi: 'Technology Performance',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent', 'Route Optimization Engine']
      },
      {
        time: '8:00 AM',
        task: 'Next Week Technology Planning - Priorities & Resources',
        status: 'in-progress',
        impact: 'Plan next week technology focus',
        kpi: 'Technology Planning',
        agents: ['Performance Analytics AI', 'HVAC System Diagnostics AI']
      },
      {
        time: '10:00 AM',
        task: 'Cross-Department Technology Alignment - Strategic Coordination',
        status: 'pending',
        impact: 'Align technology with business needs',
        kpi: 'Strategic Alignment',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent']
      }
    ],
    saturday: [
      {
        time: '8:00 AM',
        task: 'Technology Innovation Research - Emerging Technologies',
        status: 'pending',
        impact: 'Research cutting-edge technology trends',
        kpi: 'Innovation Research',
        agents: ['HVAC System Diagnostics AI', 'Advanced Scheduling Agent', 'Performance Analytics AI']
      },
      {
        time: '10:00 AM',
        task: 'AI Algorithm Development - Weekend Projects',
        status: 'pending',
        impact: 'Advance AI capabilities and performance',
        kpi: 'AI Development',
        agents: ['Parts Prediction Engine', 'Route Optimization Engine', 'Performance Analytics AI']
      },
      {
        time: '2:00 PM',
        task: 'Technology Architecture Planning - System Design',
        status: 'pending',
        impact: 'Plan future technology architecture',
        kpi: 'Architecture Planning',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent']
      }
    ],
    sunday: [
      {
        time: '9:00 AM',
        task: 'Weekly Technology Preparation - Development Planning',
        status: 'pending',
        impact: 'Prepare for next week technology initiatives',
        kpi: 'Weekly Readiness',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent', 'HVAC System Diagnostics AI']
      },
      {
        time: '11:00 AM',
        task: 'Technology Team Development - Skills Assessment',
        status: 'pending',
        impact: 'Plan technology team growth and skills',
        kpi: 'Team Development',
        agents: ['Performance Analytics AI', 'Quality Assurance Inspector']
      },
      {
        time: '3:00 PM',
        task: 'System Performance Review - Week Ahead Optimization',
        status: 'pending',
        impact: 'Optimize system performance for upcoming week',
        kpi: 'Performance Optimization',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent', 'Route Optimization Engine']
      }
    ]
  });

  const getCMOWeeklyOperations = (): WeeklyOperations => ({
    monday: [
      {
        time: '6:00 AM',
        task: 'Weekly Marketing Performance Review - Campaign Analysis',
        status: 'critical',
        impact: 'Assess marketing ROI and effectiveness',
        kpi: 'Marketing Performance',
        agents: ['D2C Marketing Intelligence', 'Geographic Performance Marketing Agent', 'B2B Relationship Manager']
      },
      {
        time: '8:00 AM',
        task: 'Customer Acquisition Strategy - D2C Growth Planning',
        status: 'in-progress',
        impact: 'Reduce $31K daily D2C cancellation loss',
        kpi: 'Customer Acquisition',
        agents: ['D2C Marketing Intelligence', 'CX Agent', 'Customer Communication Hub']
      },
      {
        time: '10:00 AM',
        task: 'Brand Positioning Strategy - Market Differentiation',
        status: 'pending',
        impact: 'Strengthen competitive positioning',
        kpi: 'Brand Strategy',
        agents: ['D2C Marketing Intelligence', 'Geographic Performance Marketing Agent']
      },
      {
        time: '2:00 PM',
        task: 'Partnership Marketing - B2B Client Relationships',
        status: 'pending',
        impact: 'Enhance AHS, Assurant, Choice partnerships',
        kpi: 'Partnership Marketing',
        agents: ['B2B Relationship Manager', 'CX Agent', 'Customer Communication Hub']
      }
    ],
    tuesday: [
      {
        time: '6:00 AM',
        task: 'Digital Marketing Optimization - Online Presence',
        status: 'critical',
        impact: 'Improve online visibility and conversion',
        kpi: 'Digital Marketing',
        agents: ['D2C Marketing Intelligence', 'Customer Communication Hub']
      },
      {
        time: '8:00 AM',
        task: 'Geographic Market Analysis - Regional Performance',
        status: 'in-progress',
        impact: 'Optimize marketing spend across 430 areas',
        kpi: 'Geographic Marketing',
        agents: ['Geographic Performance Marketing Agent', 'Regional Performance Monitor', 'D2C Marketing Intelligence']
      },
      {
        time: '10:00 AM',
        task: 'Customer Experience Marketing - Retention & Loyalty',
        status: 'pending',
        impact: 'Improve customer satisfaction and retention',
        kpi: 'Customer Experience',
        agents: ['CX Agent', 'Customer Communication Hub', 'Quality Assurance Inspector']
      },
      {
        time: '1:00 PM',
        task: 'Competitive Analysis - Market Intelligence',
        status: 'pending',
        impact: 'Monitor competitive landscape',
        kpi: 'Competitive Intelligence',
        agents: ['D2C Marketing Intelligence', 'B2B Relationship Manager']
      }
    ],
    wednesday: [
      {
        time: '6:00 AM',
        task: 'Mid-Week Marketing Review - Campaign Performance',
        status: 'critical',
        impact: 'Assess marketing campaign effectiveness',
        kpi: 'Campaign Performance',
        agents: ['D2C Marketing Intelligence', 'Geographic Performance Marketing Agent']
      },
      {
        time: '8:00 AM',
        task: 'Content Marketing Strategy - Thought Leadership',
        status: 'in-progress',
        impact: 'Build brand authority and trust',
        kpi: 'Content Marketing',
        agents: ['D2C Marketing Intelligence', 'CX Agent']
      },
      {
        time: '11:00 AM',
        task: 'Marketing Technology - Automation & Analytics',
        status: 'pending',
        impact: 'Enhance marketing efficiency and insights',
        kpi: 'Marketing Technology',
        agents: ['D2C Marketing Intelligence', 'Performance Analytics AI']
      }
    ],
    thursday: [
      {
        time: '6:00 AM',
        task: 'Customer Segmentation Analysis - Target Market Optimization',
        status: 'in-progress',
        impact: 'Improve marketing targeting and personalization',
        kpi: 'Customer Segmentation',
        agents: ['D2C Marketing Intelligence', 'CX Agent', 'Customer Communication Hub']
      },
      {
        time: '8:00 AM',
        task: 'Marketing Budget Optimization - ROI Enhancement',
        status: 'pending',
        impact: 'Maximize marketing investment returns',
        kpi: 'Marketing ROI',
        agents: ['Geographic Performance Marketing Agent', 'Financial Intelligence Agent', 'D2C Marketing Intelligence']
      },
      {
        time: '10:00 AM',
        task: 'Public Relations Strategy - Brand Reputation',
        status: 'pending',
        impact: 'Manage brand reputation and communications',
        kpi: 'Brand Reputation',
        agents: ['D2C Marketing Intelligence', 'CX Agent']
      }
    ],
    friday: [
      {
        time: '6:00 AM',
        task: 'Weekly Marketing Results - Performance Summary',
        status: 'critical',
        impact: 'Compile weekly marketing achievements',
        kpi: 'Marketing Results',
        agents: ['D2C Marketing Intelligence', 'Geographic Performance Marketing Agent', 'B2B Relationship Manager']
      },
      {
        time: '8:00 AM',
        task: 'Next Week Marketing Planning - Campaign Strategy',
        status: 'in-progress',
        impact: 'Plan next week marketing initiatives',
        kpi: 'Marketing Planning',
        agents: ['D2C Marketing Intelligence', 'Geographic Performance Marketing Agent']
      },
      {
        time: '10:00 AM',
        task: 'Cross-Department Marketing Alignment - Strategic Coordination',
        status: 'pending',
        impact: 'Align marketing with business objectives',
        kpi: 'Strategic Alignment',
        agents: ['D2C Marketing Intelligence', 'Financial Intelligence Agent', 'CX Agent']
      }
    ],
    saturday: [
      {
        time: '8:00 AM',
        task: 'Creative Strategy Development - Weekend Innovation',
        status: 'pending',
        impact: 'Develop innovative marketing campaigns',
        kpi: 'Creative Innovation',
        agents: ['D2C Marketing Intelligence', 'LLM Content Intelligence Agent', 'CX Agent']
      },
      {
        time: '10:00 AM',
        task: 'Market Research & Trends Analysis - Strategic Intelligence',
        status: 'pending',
        impact: 'Identify emerging market opportunities',
        kpi: 'Market Intelligence',
        agents: ['Geographic Performance Marketing Agent', 'D2C Marketing Intelligence', 'B2B Relationship Manager']
      },
      {
        time: '2:00 PM',
        task: 'Brand Strategy Enhancement - Long-term Vision',
        status: 'pending',
        impact: 'Strengthen brand positioning and messaging',
        kpi: 'Brand Strategy',
        agents: ['D2C Marketing Intelligence', 'CX Agent', 'Customer Communication Hub']
      }
    ],
    sunday: [
      {
        time: '9:00 AM',
        task: 'Weekly Marketing Preparation - Campaign Planning',
        status: 'pending',
        impact: 'Prepare for next week marketing initiatives',
        kpi: 'Weekly Readiness',
        agents: ['D2C Marketing Intelligence', 'Geographic Performance Marketing Agent', 'CX Agent']
      },
      {
        time: '11:00 AM',
        task: 'Customer Journey Optimization - Experience Design',
        status: 'pending',
        impact: 'Enhance customer acquisition and retention',
        kpi: 'Customer Experience',
        agents: ['CX Agent', 'Customer Communication Hub', 'D2C Marketing Intelligence']
      },
      {
        time: '3:00 PM',
        task: 'Marketing Performance Review - Week Ahead Strategy',
        status: 'pending',
        impact: 'Optimize marketing performance for upcoming week',
        kpi: 'Performance Strategy',
        agents: ['D2C Marketing Intelligence', 'Performance Analytics AI', 'Geographic Performance Marketing Agent']
      }
    ]
  });

  const getCDOWeeklyOperations = (): WeeklyOperations => ({
    monday: [
      {
        time: '6:00 AM',
        task: 'Weekly Data Intelligence Review - Analytics & Performance Insights',
        status: 'critical',
        impact: 'Data-driven decision making across all operations',
        kpi: 'Data Intelligence',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent', 'Regional Performance Monitor']
      },
      {
        time: '8:00 AM',
        task: 'Data Architecture Planning - Infrastructure & Scalability',
        status: 'in-progress',
        impact: 'Support 75% business growth with data systems',
        kpi: 'Data Architecture',
        agents: ['Performance Analytics AI', 'Parts Prediction Engine', 'Route Optimization Engine']
      },
      {
        time: '10:00 AM',
        task: 'Predictive Analytics Strategy - Capacity & Demand Forecasting',
        status: 'pending',
        impact: 'Predict and prevent 2,000 daily reschedules',
        kpi: 'Predictive Analytics',
        agents: ['Parts Prediction Engine', 'Advanced Scheduling Agent', 'Regional Performance Monitor']
      },
      {
        time: '1:00 PM',
        task: 'Data Governance & Quality - Standards & Compliance',
        status: 'pending',
        impact: 'Ensure data accuracy across 430 planning areas',
        kpi: 'Data Quality',
        agents: ['Performance Analytics AI', 'Quality Assurance Inspector', 'Financial Intelligence Agent']
      }
    ],
    tuesday: [
      {
        time: '6:00 AM',
        task: 'Business Intelligence Optimization - Dashboard & Reporting',
        status: 'critical',
        impact: 'Real-time insights for executive decision making',
        kpi: 'Business Intelligence',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent', 'Regional Performance Monitor']
      },
      {
        time: '8:00 AM',
        task: 'Customer Data Analytics - Behavior & Segmentation',
        status: 'in-progress',
        impact: 'Reduce $31K daily D2C cancellation loss',
        kpi: 'Customer Analytics',
        agents: ['CX Agent', 'Customer Communication Hub', 'D2C Marketing Intelligence']
      },
      {
        time: '10:00 AM',
        task: 'Operational Data Mining - Efficiency & Optimization',
        status: 'pending',
        impact: 'Identify capacity optimization opportunities',
        kpi: 'Operational Analytics',
        agents: ['Route Optimization Engine', 'Advanced Scheduling Agent', 'Parts Prediction Engine']
      },
      {
        time: '2:00 PM',
        task: 'Data Science Projects - Machine Learning & AI Enhancement',
        status: 'pending',
        impact: 'Improve AI agent decision accuracy',
        kpi: 'Data Science',
        agents: ['All 26 AI Agents for data analysis']
      }
    ],
    wednesday: [
      {
        time: '6:00 AM',
        task: 'Mid-Week Data Review - Performance vs Predictions',
        status: 'critical',
        impact: 'Validate data model accuracy and adjust',
        kpi: 'Data Validation',
        agents: ['Performance Analytics AI', 'Parts Prediction Engine', 'Financial Intelligence Agent']
      },
      {
        time: '8:00 AM',
        task: 'Data Integration Projects - System Connectivity',
        status: 'in-progress',
        impact: 'Seamless data flow between all systems',
        kpi: 'Data Integration',
        agents: ['Parts Supply Chain Agent', 'Financial Intelligence Agent', 'Customer Communication Hub']
      },
      {
        time: '11:00 AM',
        task: 'Advanced Analytics Research - Innovation & Development',
        status: 'pending',
        impact: 'Next-generation data capabilities',
        kpi: 'Analytics Innovation',
        agents: ['Performance Analytics AI', 'HVAC System Diagnostics AI', 'Route Optimization Engine']
      }
    ],
    thursday: [
      {
        time: '6:00 AM',
        task: 'Data Performance Review - System Efficiency & Speed',
        status: 'in-progress',
        impact: 'Optimize data processing for real-time decisions',
        kpi: 'Data Performance',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent', 'Regional Performance Monitor']
      },
      {
        time: '8:00 AM',
        task: 'Data Security & Privacy - Compliance & Protection',
        status: 'pending',
        impact: 'Ensure data security across all operations',
        kpi: 'Data Security',
        agents: ['Customer Communication Hub', 'Financial Intelligence Agent', 'Quality Assurance Inspector']
      },
      {
        time: '10:00 AM',
        task: 'Data Team Leadership - Analytics Team Coordination',
        status: 'pending',
        impact: 'Align data initiatives with business goals',
        kpi: 'Data Leadership',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent']
      }
    ],
    friday: [
      {
        time: '6:00 AM',
        task: 'Weekly Data Results - Analytics Performance Summary',
        status: 'critical',
        impact: 'Assess weekly data achievements and insights',
        kpi: 'Data Results',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent', 'Regional Performance Monitor']
      },
      {
        time: '8:00 AM',
        task: 'Next Week Data Planning - Analytics Priorities',
        status: 'in-progress',
        impact: 'Plan next week data initiatives',
        kpi: 'Data Planning',
        agents: ['Performance Analytics AI', 'Parts Prediction Engine']
      },
      {
        time: '10:00 AM',
        task: 'Cross-Department Data Alignment - Strategic Coordination',
        status: 'pending',
        impact: 'Align data strategy with all departments',
        kpi: 'Data Alignment',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent', 'CX Agent']
      }
    ],
    saturday: [
      {
        time: '8:00 AM',
        task: 'Advanced Data Science Research - Weekend Innovation',
        status: 'pending',
        impact: 'Explore cutting-edge data science techniques',
        kpi: 'Data Innovation',
        agents: ['Performance Analytics AI', 'Parts Prediction Engine', 'Financial Intelligence Agent']
      },
      {
        time: '10:00 AM',
        task: 'Data Model Development - Predictive Analytics',
        status: 'pending',
        impact: 'Enhance predictive capabilities across all systems',
        kpi: 'Predictive Modeling',
        agents: ['Parts Prediction Engine', 'Performance Analytics AI', 'Route Optimization Engine']
      },
      {
        time: '2:00 PM',
        task: 'Data Strategy Planning - Long-term Vision',
        status: 'pending',
        impact: 'Plan future data architecture and capabilities',
        kpi: 'Data Strategy',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent', 'Regional Performance Monitor']
      }
    ],
    sunday: [
      {
        time: '9:00 AM',
        task: 'Weekly Data Preparation - Analytics Setup',
        status: 'pending',
        impact: 'Prepare data systems for next week',
        kpi: 'Weekly Readiness',
        agents: ['Performance Analytics AI', 'Parts Prediction Engine', 'Financial Intelligence Agent']
      },
      {
        time: '11:00 AM',
        task: 'Data Quality Assessment - System Health Check',
        status: 'pending',
        impact: 'Ensure data integrity and quality',
        kpi: 'Data Quality',
        agents: ['Performance Analytics AI', 'Quality Assurance Inspector', 'Financial Intelligence Agent']
      },
      {
        time: '3:00 PM',
        task: 'Analytics Performance Review - Week Ahead Optimization',
        status: 'pending',
        impact: 'Optimize analytics performance for upcoming week',
        kpi: 'Analytics Optimization',
        agents: ['Performance Analytics AI', 'Regional Performance Monitor', 'Parts Prediction Engine']
      }
    ]
  });

  const getCAOWeeklyOperations = (): WeeklyOperations => ({
    monday: [
      {
        time: '6:00 AM',
        task: 'Weekly Automation Review - Process Efficiency & ROI',
        status: 'critical',
        impact: 'Automate manual processes for capacity gains',
        kpi: 'Automation Efficiency',
        agents: ['Advanced Scheduling Agent', 'Route Optimization Engine', 'Parts Ordering Specialist']
      },
      {
        time: '8:00 AM',
        task: 'Workflow Automation Planning - Process Optimization',
        status: 'in-progress',
        impact: 'Reduce manual work for 1,730 technicians',
        kpi: 'Workflow Automation',
        agents: ['Technician Interaction Hub', 'Customer Communication Hub', 'Parts Prediction Engine']
      },
      {
        time: '10:00 AM',
        task: 'AI Agent Automation - Intelligence & Decision Making',
        status: 'pending',
        impact: 'Enhance autonomous decision capabilities',
        kpi: 'AI Automation',
        agents: ['All 26 AI Agents for automation analysis']
      },
      {
        time: '1:00 PM',
        task: 'Automation Strategy Development - Scaling & Innovation',
        status: 'pending',
        impact: 'Scale automation for 75% capacity increase',
        kpi: 'Automation Strategy',
        agents: ['Advanced Scheduling Agent', 'Route Optimization Engine', 'Performance Analytics AI']
      }
    ],
    tuesday: [
      {
        time: '6:00 AM',
        task: 'Process Automation Implementation - Operational Excellence',
        status: 'critical',
        impact: 'Automate reschedule prevention processes',
        kpi: 'Process Automation',
        agents: ['Advanced Scheduling Agent', 'Emergency Response Coordinator', 'Customer Communication Hub']
      },
      {
        time: '8:00 AM',
        task: 'Customer Service Automation - Communication & Support',
        status: 'in-progress',
        impact: 'Automate customer interactions and support',
        kpi: 'Customer Automation',
        agents: ['Customer Communication Hub', 'CX Agent', 'Emergency Response Coordinator']
      },
      {
        time: '10:00 AM',
        task: 'Parts & Inventory Automation - Supply Chain Optimization',
        status: 'pending',
        impact: 'Automate parts ordering and inventory management',
        kpi: 'Supply Chain Automation',
        agents: ['Parts Prediction Engine', 'Parts Ordering Specialist', 'Inventory Management Assistant']
      },
      {
        time: '2:00 PM',
        task: 'Field Operations Automation - Technician Support',
        status: 'pending',
        impact: 'Automate technician scheduling and routing',
        kpi: 'Field Automation',
        agents: ['Technician Interaction Hub', 'Route Optimization Engine', 'Advanced Scheduling Agent']
      }
    ],
    wednesday: [
      {
        time: '6:00 AM',
        task: 'Mid-Week Automation Review - Performance & Optimization',
        status: 'critical',
        impact: 'Assess automation effectiveness and adjust',
        kpi: 'Automation Performance',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent', 'Route Optimization Engine']
      },
      {
        time: '8:00 AM',
        task: 'Automation Integration Projects - System Connectivity',
        status: 'in-progress',
        impact: 'Integrate automated processes across systems',
        kpi: 'Automation Integration',
        agents: ['Parts Supply Chain Agent', 'Financial Intelligence Agent', 'Customer Communication Hub']
      },
      {
        time: '11:00 AM',
        task: 'Intelligent Automation Research - Next-Generation Capabilities',
        status: 'pending',
        impact: 'Develop advanced automation capabilities',
        kpi: 'Automation Innovation',
        agents: ['HVAC System Diagnostics AI', 'Quality Assurance Inspector', 'Performance Analytics AI']
      }
    ],
    thursday: [
      {
        time: '6:00 AM',
        task: 'Automation Quality Review - Reliability & Accuracy',
        status: 'in-progress',
        impact: 'Ensure automation quality and reliability',
        kpi: 'Automation Quality',
        agents: ['Quality Assurance Inspector', 'Performance Analytics AI', 'Advanced Scheduling Agent']
      },
      {
        time: '8:00 AM',
        task: 'Automation Scaling - Capacity & Performance',
        status: 'pending',
        impact: 'Scale automation for business growth',
        kpi: 'Automation Scaling',
        agents: ['Advanced Scheduling Agent', 'Route Optimization Engine', 'Regional Performance Monitor']
      },
      {
        time: '10:00 AM',
        task: 'Automation Team Leadership - Development Coordination',
        status: 'pending',
        impact: 'Coordinate automation development efforts',
        kpi: 'Automation Leadership',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent']
      }
    ],
    friday: [
      {
        time: '6:00 AM',
        task: 'Weekly Automation Results - Performance Summary',
        status: 'critical',
        impact: 'Assess weekly automation achievements',
        kpi: 'Automation Results',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent', 'Route Optimization Engine']
      },
      {
        time: '8:00 AM',
        task: 'Next Week Automation Planning - Process Priorities',
        status: 'in-progress',
        impact: 'Plan next week automation initiatives',
        kpi: 'Automation Planning',
        agents: ['Advanced Scheduling Agent', 'Performance Analytics AI']
      },
      {
        time: '10:00 AM',
        task: 'Cross-Department Automation Alignment - Strategic Coordination',
        status: 'pending',
        impact: 'Align automation with business objectives',
        kpi: 'Automation Alignment',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent', 'Route Optimization Engine']
      }
    ],
    saturday: [
      {
        time: '8:00 AM',
        task: 'Automation Innovation Research - Weekend Development',
        status: 'pending',
        impact: 'Research next-generation automation technologies',
        kpi: 'Automation Innovation',
        agents: ['Advanced Scheduling Agent', 'Performance Analytics AI', 'Route Optimization Engine']
      },
      {
        time: '10:00 AM',
        task: 'Process Automation Design - System Enhancement',
        status: 'pending',
        impact: 'Design advanced automation workflows',
        kpi: 'Process Design',
        agents: ['Advanced Scheduling Agent', 'Parts Ordering Specialist', 'Performance Analytics AI']
      },
      {
        time: '2:00 PM',
        task: 'Automation Strategy Planning - Scalability Focus',
        status: 'pending',
        impact: 'Plan automation scaling strategies',
        kpi: 'Automation Strategy',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent', 'Quality Assurance Inspector']
      }
    ],
    sunday: [
      {
        time: '9:00 AM',
        task: 'Weekly Automation Preparation - System Setup',
        status: 'pending',
        impact: 'Prepare automation systems for next week',
        kpi: 'Weekly Readiness',
        agents: ['Advanced Scheduling Agent', 'Performance Analytics AI', 'Route Optimization Engine']
      },
      {
        time: '11:00 AM',
        task: 'Automation Performance Review - Optimization Planning',
        status: 'pending',
        impact: 'Review and optimize automation performance',
        kpi: 'Performance Optimization',
        agents: ['Performance Analytics AI', 'Quality Assurance Inspector', 'Advanced Scheduling Agent']
      },
      {
        time: '3:00 PM',
        task: 'Automation Team Development - Week Ahead Planning',
        status: 'pending',
        impact: 'Plan automation team development for upcoming week',
        kpi: 'Team Development',
        agents: ['Performance Analytics AI', 'Advanced Scheduling Agent', 'Parts Ordering Specialist']
      }
    ]
  });

  const getCPOWeeklyOperations = (): WeeklyOperations => ({
    monday: [
      {
        time: '6:00 AM',
        task: 'Product Strategy Review - Smart Home Integration Platform',
        status: 'critical',
        impact: 'Advance IoT integration for competitive advantage',
        kpi: 'Product Innovation',
        agents: ['HVAC System Diagnostics AI', 'Smart Home Integration Agent', 'CX Agent']
      },
      {
        time: '8:00 AM',
        task: 'Customer Experience Analytics - Product Performance Insights',
        status: 'in-progress',
        impact: 'Optimize product features based on customer feedback',
        kpi: 'Customer Experience',
        agents: ['CX Agent', 'Performance Analytics AI', 'Customer Communication Hub']
      },
      {
        time: '10:00 AM',
        task: 'Product Development Planning - AI-Powered Home Diagnostics',
        status: 'pending',
        impact: 'Launch next-generation diagnostic capabilities',
        kpi: 'Product Development',
        agents: ['HVAC System Diagnostics AI', 'Quality Assurance Inspector', 'LLM Content Intelligence Agent']
      },
      {
        time: '1:00 PM',
        task: 'Competitive Product Analysis - Market Position & Differentiation',
        status: 'pending',
        impact: 'Maintain product leadership in smart home services',
        kpi: 'Market Position',
        agents: ['Hyper-Local LLM Market Intelligence Agent', 'B2B Intelligence Agent', 'Performance Analytics AI']
      }
    ],
    tuesday: [
      {
        time: '6:00 AM',
        task: 'Product Roadmap Execution - Feature Prioritization & Development',
        status: 'critical',
        impact: 'Deliver key product features for Q3 goals',
        kpi: 'Product Delivery',
        agents: ['Smart Home Integration Agent', 'HVAC System Diagnostics AI', 'CX Agent']
      },
      {
        time: '8:00 AM',
        task: 'User Research & Product Validation - Customer Needs Analysis',
        status: 'in-progress',
        impact: 'Validate product features with real customer data',
        kpi: 'Product Validation',
        agents: ['CX Agent', 'Customer Communication Hub', 'Performance Analytics AI']
      },
      {
        time: '10:00 AM',
        task: 'Product Quality Assurance - Testing & Reliability',
        status: 'pending',
        impact: 'Ensure product quality across all features',
        kpi: 'Product Quality',
        agents: ['Quality Assurance Inspector', 'HVAC System Diagnostics AI', 'Performance Analytics AI']
      },
      {
        time: '2:00 PM',
        task: 'Product Partnership Strategy - Integration & Collaboration',
        status: 'pending',
        impact: 'Develop strategic product partnerships',
        kpi: 'Product Partnerships',
        agents: ['B2B Intelligence Agent', 'Smart Home Integration Agent', 'LLM Content Intelligence Agent']
      }
    ],
    wednesday: [
      {
        time: '6:00 AM',
        task: 'Mid-Week Product Review - Progress & Performance Assessment',
        status: 'critical',
        impact: 'Assess product development progress and adjust priorities',
        kpi: 'Product Progress',
        agents: ['Performance Analytics AI', 'CX Agent', 'HVAC System Diagnostics AI']
      },
      {
        time: '8:00 AM',
        task: 'Product Data Analytics - Usage Patterns & Optimization',
        status: 'in-progress',
        impact: 'Optimize product features based on usage data',
        kpi: 'Product Analytics',
        agents: ['Performance Analytics AI', 'CX Agent', 'Customer Communication Hub']
      },
      {
        time: '11:00 AM',
        task: 'Product Innovation Research - Next-Generation Features',
        status: 'pending',
        impact: 'Research and develop innovative product capabilities',
        kpi: 'Product Innovation',
        agents: ['LLM Content Intelligence Agent', 'HVAC System Diagnostics AI', 'Smart Home Integration Agent']
      }
    ],
    thursday: [
      {
        time: '6:00 AM',
        task: 'Product Performance Review - KPI Analysis & Optimization',
        status: 'in-progress',
        impact: 'Analyze product KPIs and optimize performance',
        kpi: 'Product Performance',
        agents: ['Performance Analytics AI', 'CX Agent', 'Quality Assurance Inspector']
      },
      {
        time: '8:00 AM',
        task: 'Product Team Leadership - Development Coordination',
        status: 'pending',
        impact: 'Coordinate product development across teams',
        kpi: 'Product Leadership',
        agents: ['HVAC System Diagnostics AI', 'Smart Home Integration Agent', 'Performance Analytics AI']
      },
      {
        time: '10:00 AM',
        task: 'Product Market Research - Competitive Intelligence',
        status: 'pending',
        impact: 'Maintain competitive advantage through market research',
        kpi: 'Market Intelligence',
        agents: ['Hyper-Local LLM Market Intelligence Agent', 'B2B Intelligence Agent', 'CX Agent']
      }
    ],
    friday: [
      {
        time: '6:00 AM',
        task: 'Weekly Product Results - Achievement Summary & Planning',
        status: 'critical',
        impact: 'Assess weekly product achievements and plan next week',
        kpi: 'Product Results',
        agents: ['Performance Analytics AI', 'CX Agent', 'HVAC System Diagnostics AI']
      },
      {
        time: '8:00 AM',
        task: 'Product Strategy Planning - Next Week Priorities',
        status: 'in-progress',
        impact: 'Plan next week product development priorities',
        kpi: 'Product Planning',
        agents: ['Smart Home Integration Agent', 'Performance Analytics AI', 'CX Agent']
      },
      {
        time: '10:00 AM',
        task: 'Cross-Functional Product Alignment - Strategic Coordination',
        status: 'pending',
        impact: 'Align product development with business objectives',
        kpi: 'Product Alignment',
        agents: ['Performance Analytics AI', 'B2B Intelligence Agent', 'Customer Communication Hub']
      }
    ],
    saturday: [
      {
        time: '8:00 AM',
        task: 'Product Innovation Research - Weekend Development',
        status: 'pending',
        impact: 'Research cutting-edge product technologies',
        kpi: 'Product Innovation',
        agents: ['HVAC System Diagnostics AI', 'Smart Home Integration Agent', 'LLM Content Intelligence Agent']
      },
      {
        time: '10:00 AM',
        task: 'Customer Experience Enhancement - Product Optimization',
        status: 'pending',
        impact: 'Enhance product features for better customer experience',
        kpi: 'Customer Experience',
        agents: ['CX Agent', 'Customer Communication Hub', 'Performance Analytics AI']
      },
      {
        time: '2:00 PM',
        task: 'Product Strategy Planning - Long-term Vision',
        status: 'pending',
        impact: 'Plan future product roadmap and strategic direction',
        kpi: 'Product Strategy',
        agents: ['Performance Analytics AI', 'HVAC System Diagnostics AI', 'B2B Intelligence Agent']
      }
    ],
    sunday: [
      {
        time: '9:00 AM',
        task: 'Weekly Product Preparation - Development Planning',
        status: 'pending',
        impact: 'Prepare for next week product initiatives',
        kpi: 'Weekly Readiness',
        agents: ['Performance Analytics AI', 'CX Agent', 'HVAC System Diagnostics AI']
      },
      {
        time: '11:00 AM',
        task: 'Product Quality Review - Standards Assessment',
        status: 'pending',
        impact: 'Review and ensure product quality standards',
        kpi: 'Product Quality',
        agents: ['Quality Assurance Inspector', 'Performance Analytics AI', 'HVAC System Diagnostics AI']
      },
      {
        time: '3:00 PM',
        task: 'Product Team Development - Week Ahead Planning',
        status: 'pending',
        impact: 'Plan product team development for upcoming week',
        kpi: 'Team Development',
        agents: ['Performance Analytics AI', 'Smart Home Integration Agent', 'CX Agent']
      }
    ]
  });

  const getCROWeeklyOperations = (): WeeklyOperations => ({
    monday: [
      {
        time: '6:00 AM',
        task: 'Revenue Strategy Review - Growth Acceleration & Optimization',
        status: 'critical',
        impact: 'Drive $85M Q3 revenue target achievement',
        kpi: 'Revenue Growth',
        agents: ['Financial Intelligence Agent', 'B2B Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '8:00 AM',
        task: 'Strategic Partnership Revenue - B2B Relationship Optimization',
        status: 'in-progress',
        impact: 'Maximize revenue from AHS, Assurant, Choice partnerships',
        kpi: 'Partnership Revenue',
        agents: ['B2B Intelligence Agent', 'Customer Communication Hub', 'Pricing & Estimation Specialist']
      },
      {
        time: '10:00 AM',
        task: 'Revenue Operations Excellence - Process & System Optimization',
        status: 'pending',
        impact: 'Optimize revenue operations for sustainable growth',
        kpi: 'Revenue Operations',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Advanced Scheduling Agent']
      },
      {
        time: '1:00 PM',
        task: 'Customer Lifetime Value Strategy - Revenue Expansion',
        status: 'pending',
        impact: 'Increase CLV from $850 to $1,200 target',
        kpi: 'Customer Value',
        agents: ['CX Agent', 'Customer Communication Hub', 'Financial Intelligence Agent']
      }
    ],
    tuesday: [
      {
        time: '6:00 AM',
        task: 'Dynamic Pricing Strategy - Revenue Optimization',
        status: 'critical',
        impact: 'Deploy dynamic pricing for revenue maximization',
        kpi: 'Pricing Strategy',
        agents: ['Pricing & Estimation Specialist', 'Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '8:00 AM',
        task: 'Revenue Analytics & Forecasting - Performance Insights',
        status: 'in-progress',
        impact: 'Accurate revenue forecasting and trend analysis',
        kpi: 'Revenue Analytics',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Regional Performance Monitor']
      },
      {
        time: '10:00 AM',
        task: 'Sales Team Performance - Revenue Generation Optimization',
        status: 'pending',
        impact: 'Optimize sales team performance for revenue growth',
        kpi: 'Sales Performance',
        agents: ['Customer Communication Hub', 'CX Agent', 'Performance Analytics AI']
      },
      {
        time: '2:00 PM',
        task: 'Revenue Recovery & Retention - Churn Prevention',
        status: 'pending',
        impact: 'Reduce monthly churn below 5% target',
        kpi: 'Revenue Retention',
        agents: ['CX Agent', 'Customer Communication Hub', 'Financial Intelligence Agent']
      }
    ],
    wednesday: [
      {
        time: '6:00 AM',
        task: 'Mid-Week Revenue Review - Performance Assessment',
        status: 'critical',
        impact: 'Assess revenue performance and adjust strategies',
        kpi: 'Revenue Performance',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'B2B Intelligence Agent']
      },
      {
        time: '8:00 AM',
        task: 'Revenue Channel Optimization - Multi-Channel Strategy',
        status: 'in-progress',
        impact: 'Optimize revenue across D2C and B2B channels',
        kpi: 'Channel Revenue',
        agents: ['B2B Intelligence Agent', 'CX Agent', 'Customer Communication Hub']
      },
      {
        time: '11:00 AM',
        task: 'Revenue Innovation Research - New Revenue Streams',
        status: 'pending',
        impact: 'Research and develop new revenue opportunities',
        kpi: 'Revenue Innovation',
        agents: ['LLM Recommendation Dominance Agent', 'Financial Intelligence Agent', 'Performance Analytics AI']
      }
    ],
    thursday: [
      {
        time: '6:00 AM',
        task: 'Revenue Quality Review - Profitability & Sustainability',
        status: 'in-progress',
        impact: 'Ensure revenue quality and long-term sustainability',
        kpi: 'Revenue Quality',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Pricing & Estimation Specialist']
      },
      {
        time: '8:00 AM',
        task: 'Revenue Team Leadership - Performance Coordination',
        status: 'pending',
        impact: 'Coordinate revenue team efforts across departments',
        kpi: 'Revenue Leadership',
        agents: ['Customer Communication Hub', 'Financial Intelligence Agent', 'Performance Analytics AI']
      },
      {
        time: '10:00 AM',
        task: 'Competitive Revenue Analysis - Market Position',
        status: 'pending',
        impact: 'Maintain competitive revenue advantage',
        kpi: 'Revenue Competition',
        agents: ['Hyper-Local LLM Market Intelligence Agent', 'B2B Intelligence Agent', 'Financial Intelligence Agent']
      }
    ],
    friday: [
      {
        time: '6:00 AM',
        task: 'Weekly Revenue Results - Achievement Summary',
        status: 'critical',
        impact: 'Assess weekly revenue achievements and trends',
        kpi: 'Revenue Results',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'B2B Intelligence Agent']
      },
      {
        time: '8:00 AM',
        task: 'Revenue Strategy Planning - Next Week Priorities',
        status: 'in-progress',
        impact: 'Plan next week revenue generation priorities',
        kpi: 'Revenue Planning',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Customer Communication Hub']
      },
      {
        time: '10:00 AM',
        task: 'Cross-Functional Revenue Alignment - Strategic Coordination',
        status: 'pending',
        impact: 'Align revenue strategy with business objectives',
        kpi: 'Revenue Alignment',
        agents: ['Financial Intelligence Agent', 'B2B Intelligence Agent', 'CX Agent']
      }
    ],
    saturday: [
      {
        time: '8:00 AM',
        task: 'Revenue Innovation Research - Weekend Strategy Development',
        status: 'pending',
        impact: 'Research new revenue generation opportunities',
        kpi: 'Revenue Innovation',
        agents: ['Financial Intelligence Agent', 'LLM Recommendation Dominance Agent', 'Performance Analytics AI']
      },
      {
        time: '10:00 AM',
        task: 'Customer Revenue Analysis - Lifetime Value Optimization',
        status: 'pending',
        impact: 'Analyze and optimize customer revenue potential',
        kpi: 'Customer Revenue',
        agents: ['CX Agent', 'Customer Communication Hub', 'Financial Intelligence Agent']
      },
      {
        time: '2:00 PM',
        task: 'Revenue Strategy Planning - Long-term Growth Vision',
        status: 'pending',
        impact: 'Plan long-term revenue strategy and growth initiatives',
        kpi: 'Revenue Strategy',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'B2B Intelligence Agent']
      }
    ],
    sunday: [
      {
        time: '9:00 AM',
        task: 'Weekly Revenue Preparation - Performance Setup',
        status: 'pending',
        impact: 'Prepare revenue systems for next week',
        kpi: 'Weekly Readiness',
        agents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Customer Communication Hub']
      },
      {
        time: '11:00 AM',
        task: 'Revenue Performance Review - Optimization Planning',
        status: 'pending',
        impact: 'Review and optimize revenue performance metrics',
        kpi: 'Performance Optimization',
        agents: ['Performance Analytics AI', 'Financial Intelligence Agent', 'Pricing & Estimation Specialist']
      },
      {
        time: '3:00 PM',
        task: 'Revenue Team Development - Week Ahead Planning',
        status: 'pending',
        impact: 'Plan revenue team development for upcoming week',
        kpi: 'Team Development',
        agents: ['Financial Intelligence Agent', 'CX Agent', 'Performance Analytics AI']
      }
    ]
  });

  const getTasksByExecutive = (exec: string, day: string): DailyTask[] => {
    const operations = getWeeklyOperationsByExecutive(exec);
    return operations[day] || [];
  };

  const getWeeklyOperationsByExecutive = (exec: string): WeeklyOperations => {
    switch(exec) {
      case 'ceo': return getCEOWeeklyOperations();
      case 'coo': return getCOOWeeklyOperations();
      case 'cfo': return getCFOWeeklyOperations();
      case 'cto': return getCTOWeeklyOperations();
      case 'cmo': return getCMOWeeklyOperations();
      case 'cdo': return getCDOWeeklyOperations();
      case 'cao': return getCAOWeeklyOperations();
      case 'cpo': return getCPOWeeklyOperations();
      case 'cro': return getCROWeeklyOperations();
      default: return { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] };
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'critical': return 'bg-red-600';
      case 'in-progress': return 'bg-yellow-600';
      case 'completed': return 'bg-green-600';
      case 'pending': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  // Q3 2025 OKRs for each executive based on weekly IHR update data
  // Business Function Leader OKR Types
  interface BusinessFunctionLeaderKeyResult {
    description: string;
    target: string;
    current: string;
    progress: number;
  }

  interface BusinessFunctionLeaderObjective {
    title: string;
    description: string;
    status: 'achieved' | 'on-track' | 'at-risk' | 'behind';
    keyResults: BusinessFunctionLeaderKeyResult[];
    supportingAgents: string[];
  }

  interface BusinessFunctionLeaderOKR {
    leaderName: string;
    businessFunction: string;
    department: string;
    overallProgress: number;
    objectives: BusinessFunctionLeaderObjective[];
  }

  const getBusinessFunctionLeaderOKRs = (executive: string): BusinessFunctionLeaderOKR[] => {
    const okrData: Record<string, BusinessFunctionLeaderOKR[]> = {
      ceo: [
        {
          leaderName: "Sarah Chen",
          businessFunction: "Strategic Operations",
          department: "Executive Strategy",
          overallProgress: 84,
          objectives: [
            {
              title: "AI-First Transformation Initiative",
              description: "Lead company-wide AI integration across all business functions",
              status: "on-track",
              keyResults: [
                { description: "Deploy AI agents in 90% of departments", target: "90%", current: "78%", progress: 87 },
                { description: "Achieve 95% AI decision accuracy", target: "95%", current: "92%", progress: 97 },
                { description: "Reduce manual processes by 80%", target: "80%", current: "71%", progress: 89 }
              ],
              supportingAgents: ["Agent #1", "Agent #15", "Agent #19"]
            },
            {
              title: "National Scale Infrastructure",
              description: "Scale platform to handle 400+ planning areas nationwide",
              status: "on-track",
              keyResults: [
                { description: "Deploy in 400+ planning areas", target: "400", current: "347", progress: 87 },
                { description: "Maintain 99.9% system uptime", target: "99.9%", current: "99.7%", progress: 98 },
                { description: "Process 50,000+ daily orders", target: "50,000", current: "45,976", progress: 92 }
              ],
              supportingAgents: ["Agent #11", "Agent #20", "Agent #26"]
            }
          ]
        },
        {
          leaderName: "Marcus Rodriguez",
          businessFunction: "Business Intelligence",
          department: "Data & Analytics",
          overallProgress: 91,
          objectives: [
            {
              title: "Predictive Analytics Platform",
              description: "Build AI-powered predictive insights for executive decision making",
              status: "on-track",
              keyResults: [
                { description: "Deploy predictive models across 15 business functions", target: "15", current: "12", progress: 80 },
                { description: "Achieve 92% prediction accuracy", target: "92%", current: "89%", progress: 97 },
                { description: "Reduce forecast errors by 60%", target: "60%", current: "54%", progress: 90 }
              ],
              supportingAgents: ["Agent #19", "Agent #20", "Agent #25"]
            }
          ]
        }
      ],
      coo: [
        {
          leaderName: "Michael Rodriguez",
          businessFunction: "Operations Management",
          department: "Daily Operations",
          overallProgress: 91,
          objectives: [
            {
              title: "Operational Excellence Program",
              description: "Optimize daily operations and technician scheduling efficiency",
              status: "on-track",
              keyResults: [
                { description: "Achieve 95% technician utilization", target: "95%", current: "92%", progress: 97 },
                { description: "Reduce average response time to 45 minutes", target: "45 min", current: "48 min", progress: 94 },
                { description: "Maintain 98% customer satisfaction", target: "98%", current: "96.8%", progress: 99 }
              ],
              supportingAgents: ["Agent #11", "Agent #12", "Agent #21"]
            },
            {
              title: "1099 Contractor Optimization",
              description: "Scale contractor network from 2 to 50+ companies",
              status: "on-track",
              keyResults: [
                { description: "Onboard 35+ new contractor companies", target: "35", current: "28", progress: 80 },
                { description: "Achieve 94% contractor performance rating", target: "94%", current: "91%", progress: 97 },
                { description: "Process 25,000+ contractor orders monthly", target: "25,000", current: "22,400", progress: 90 }
              ],
              supportingAgents: ["Agent #21", "Agent #22", "Agent #23"]
            }
          ]
        },
        {
          leaderName: "Jennifer Walsh",
          businessFunction: "Parts Management",
          department: "Supply Chain",
          overallProgress: 88,
          objectives: [
            {
              title: "Smart Parts Inventory System",
              description: "Implement predictive parts ordering and inventory optimization",
              status: "on-track", 
              keyResults: [
                { description: "Reduce parts stockouts by 85%", target: "85%", current: "78%", progress: 92 },
                { description: "Optimize inventory turnover to 12x annually", target: "12x", current: "10.8x", progress: 90 },
                { description: "Achieve 99% parts availability", target: "99%", current: "97.2%", progress: 98 }
              ],
              supportingAgents: ["Agent #14", "Agent #18"]
            },
            {
              title: "Vendor Performance Excellence",
              description: "Optimize vendor relationships and delivery performance",
              status: "on-track",
              keyResults: [
                { description: "Achieve 96% on-time delivery rate", target: "96%", current: "93%", progress: 97 },
                { description: "Reduce parts costs by 12%", target: "12%", current: "9%", progress: 75 },
                { description: "Maintain 300+ active vendor relationships", target: "300", current: "287", progress: 96 }
              ],
              supportingAgents: ["Agent #18", "Agent #14"]
            }
          ]
        },
        {
          leaderName: "Robert Chen",
          businessFunction: "Quality Assurance",
          department: "Service Quality",
          overallProgress: 87,
          objectives: [
            {
              title: "Service Quality Excellence",
              description: "Maintain industry-leading service quality standards",
              status: "on-track",
              keyResults: [
                { description: "Achieve 97% first-call resolution", target: "97%", current: "94%", progress: 97 },
                { description: "Maintain 4.8+ star customer rating", target: "4.8", current: "4.7", progress: 98 },
                { description: "Reduce service callbacks by 40%", target: "40%", current: "34%", progress: 85 }
              ],
              supportingAgents: ["Agent #8", "Agent #26"]
            }
          ]
        }
      ],
      cfo: [
        {
          leaderName: "David Kim",
          businessFunction: "Financial Operations",
          department: "Finance & Analytics",
          overallProgress: 86,
          objectives: [
            {
              title: "Revenue Optimization Initiative", 
              description: "Maximize revenue per order and improve profit margins",
              status: "on-track",
              keyResults: [
                { description: "Increase revenue per order to $340", target: "$340", current: "$318", progress: 94 },
                { description: "Achieve 28% profit margin", target: "28%", current: "25.8%", progress: 92 },
                { description: "Reduce operational costs by 15%", target: "15%", current: "12.4%", progress: 83 }
              ],
              supportingAgents: ["Agent #9", "Agent #19", "Agent #20"]
            },
            {
              title: "Financial Intelligence Platform",
              description: "Build AI-powered financial forecasting and risk management",
              status: "on-track",
              keyResults: [
                { description: "Deploy predictive cash flow models", target: "100%", current: "85%", progress: 85 },
                { description: "Reduce financial forecast errors by 50%", target: "50%", current: "42%", progress: 84 },
                { description: "Automate 80% of financial reporting", target: "80%", current: "68%", progress: 85 }
              ],
              supportingAgents: ["Agent #19", "Agent #20"]
            }
          ]
        },
        {
          leaderName: "Amanda Foster",
          businessFunction: "Cost Management",
          department: "Financial Control",
          overallProgress: 89,
          objectives: [
            {
              title: "Cost Optimization Program",
              description: "Drive systematic cost reduction across all business functions",
              status: "on-track",
              keyResults: [
                { description: "Reduce overall operational costs by 18%", target: "18%", current: "15%", progress: 83 },
                { description: "Optimize technician cost per order to $95", target: "$95", current: "$102", progress: 93 },
                { description: "Achieve 85% cost predictability", target: "85%", current: "81%", progress: 95 }
              ],
              supportingAgents: ["Agent #9", "Agent #21"]
            }
          ]
        }
      ],
      cmo: [
        {
          leaderName: "Lisa Thompson",
          businessFunction: "Customer Experience",
          department: "Marketing & Communications",
          overallProgress: 89,
          objectives: [
            {
              title: "Customer Engagement Excellence",
              description: "Enhance customer communications and satisfaction metrics",
              status: "on-track",
              keyResults: [
                { description: "Achieve 96% customer satisfaction", target: "96%", current: "94.2%", progress: 98 },
                { description: "Reduce customer complaints by 40%", target: "40%", current: "35%", progress: 88 },
                { description: "Increase customer referrals to 45%", target: "45%", current: "41%", progress: 91 }
              ],
              supportingAgents: ["Agent #24", "Agent #25"]
            },
            {
              title: "Digital Marketing Transformation",
              description: "Implement AI-powered marketing and customer acquisition",
              status: "on-track",
              keyResults: [
                { description: "Increase digital conversion rate to 12%", target: "12%", current: "9.8%", progress: 82 },
                { description: "Deploy LLM-powered customer support", target: "100%", current: "78%", progress: 78 },
                { description: "Achieve 25% reduction in customer acquisition cost", target: "25%", current: "19%", progress: 76 }
              ],
              supportingAgents: ["Agent #24", "Agent #25", "Agent #17"]
            }
          ]
        },
        {
          leaderName: "Carlos Mendez",
          businessFunction: "HOA Programs",
          department: "Community Relations",
          overallProgress: 92,
          objectives: [
            {
              title: "HOA Partnership Expansion",
              description: "Scale HOA programs and community partnerships nationwide",
              status: "on-track",
              keyResults: [
                { description: "Partner with 150+ HOA communities", target: "150", current: "134", progress: 89 },
                { description: "Achieve 88% HOA satisfaction rating", target: "88%", current: "85%", progress: 97 },
                { description: "Generate $2.5M in HOA program revenue", target: "$2.5M", current: "$2.2M", progress: 88 }
              ],
              supportingAgents: ["Agent #17", "Agent #24"]
            }
          ]
        }
      ],
      cro: [
        {
          leaderName: "James Wilson",
          businessFunction: "Revenue Operations",
          department: "Business Development",
          overallProgress: 92,
          objectives: [
            {
              title: "B2B Partnership Expansion",
              description: "Grow strategic partnerships and revenue channels",
              status: "on-track",
              keyResults: [
                { description: "Secure 5 new enterprise partnerships", target: "5", current: "4", progress: 80 },
                { description: "Increase B2B revenue by 35%", target: "35%", current: "32%", progress: 91 },
                { description: "Achieve 95% partner satisfaction", target: "95%", current: "93%", progress: 98 }
              ],
              supportingAgents: ["Agent #16", "Agent #17"]
            },
            {
              title: "Revenue Intelligence Platform",
              description: "Build AI-powered revenue forecasting and optimization",
              status: "on-track",
              keyResults: [
                { description: "Deploy revenue prediction models across all channels", target: "100%", current: "87%", progress: 87 },
                { description: "Increase revenue forecast accuracy to 94%", target: "94%", current: "89%", progress: 95 },
                { description: "Optimize pricing strategies for 15% revenue uplift", target: "15%", current: "12%", progress: 80 }
              ],
              supportingAgents: ["Agent #16", "Agent #19", "Agent #25"]
            }
          ]
        },
        {
          leaderName: "Patricia Lee",
          businessFunction: "AHS Partnership",
          department: "Strategic Partnerships",
          overallProgress: 88,
          objectives: [
            {
              title: "American Home Shield Integration",
              description: "Optimize AHS partnership and service delivery excellence",
              status: "on-track",
              keyResults: [
                { description: "Achieve 96% AHS performance rating", target: "96%", current: "92%", progress: 96 },
                { description: "Process 15,000+ AHS orders monthly", target: "15,000", current: "13,800", progress: 92 },
                { description: "Maintain 48-hour AHS response time", target: "48 hrs", current: "52 hrs", progress: 92 }
              ],
              supportingAgents: ["Agent #16", "Agent #11"]
            }
          ]
        }
      ],
      cto: [
        {
          leaderName: "Dr. Alex Kumar",
          businessFunction: "AI Infrastructure",
          department: "Technology & AI",
          overallProgress: 94,
          objectives: [
            {
              title: "AI Agent Platform Excellence",
              description: "Build and scale the 28-agent AI infrastructure",
              status: "on-track",
              keyResults: [
                { description: "Achieve 94.8% autonomous execution rate", target: "94.8%", current: "94.8%", progress: 100 },
                { description: "Deploy AI agents in 95% of business functions", target: "95%", current: "89%", progress: 94 },
                { description: "Maintain 99.9% AI system uptime", target: "99.9%", current: "99.7%", progress: 98 }
              ],
              supportingAgents: ["Agent #1", "Agent #15", "Agent #19", "Agent #25"]
            },
            {
              title: "Technology Innovation Program",
              description: "Drive cutting-edge technology adoption and platform scalability",
              status: "on-track",
              keyResults: [
                { description: "Implement next-gen LLM capabilities", target: "100%", current: "85%", progress: 85 },
                { description: "Scale platform to support 100,000+ daily orders", target: "100,000", current: "85,000", progress: 85 },
                { description: "Achieve 99.99% data accuracy across all systems", target: "99.99%", current: "99.92%", progress: 99 }
              ],
              supportingAgents: ["Agent #15", "Agent #19", "Agent #20", "Agent #25"]
            }
          ]
        },
        {
          leaderName: "Maria Santos",
          businessFunction: "Data Engineering",
          department: "Data & Systems",
          overallProgress: 91,
          objectives: [
            {
              title: "Data Platform Modernization",
              description: "Build enterprise-scale data infrastructure and analytics",
              status: "on-track",
              keyResults: [
                { description: "Process 1M+ daily data points", target: "1,000,000", current: "890,000", progress: 89 },
                { description: "Achieve 99.9% data pipeline reliability", target: "99.9%", current: "99.6%", progress: 97 },
                { description: "Deploy real-time analytics across 20+ dashboards", target: "20", current: "17", progress: 85 }
              ],
              supportingAgents: ["Agent #19", "Agent #20"]
            }
          ]
        }
      ],
      cdo: [
        {
          leaderName: "Jennifer Walsh",
          businessFunction: "Data Operations",
          department: "Data & Analytics",
          overallProgress: 90,
          objectives: [
            {
              title: "Data-Driven Decision Excellence",
              description: "Enable data-driven decision making across all business functions",
              status: "on-track",
              keyResults: [
                { description: "Deploy real-time dashboards for all executives", target: "100%", current: "89%", progress: 89 },
                { description: "Achieve 95% data accuracy across all systems", target: "95%", current: "92%", progress: 97 },
                { description: "Enable predictive analytics for 15 business functions", target: "15", current: "12", progress: 80 }
              ],
              supportingAgents: ["Agent #19", "Agent #20", "Agent #25"]
            }
          ]
        }
      ],
      cao: [
        {
          leaderName: "Roberto Martinez",
          businessFunction: "Logistics Operations",
          department: "Routing & Logistics",
          overallProgress: 93,
          objectives: [
            {
              title: "Intelligent Routing Excellence",
              description: "Optimize technician routing and logistics nationwide",
              status: "on-track",
              keyResults: [
                { description: "Reduce average travel time by 25%", target: "25%", current: "22%", progress: 88 },
                { description: "Achieve 96% on-time arrival rate", target: "96%", current: "94%", progress: 98 },
                { description: "Optimize routing for 2,000+ daily appointments", target: "2,000", current: "1,840", progress: 92 }
              ],
              supportingAgents: ["Agent #11", "Agent #12"]
            }
          ]
        }
      ],
      cpo: [
        {
          leaderName: "Dr. Elena Rodriguez",
          businessFunction: "Product Innovation",
          department: "Product Development",
          overallProgress: 87,
          objectives: [
            {
              title: "Next-Gen Service Platform",
              description: "Build innovative service delivery platform and customer experience",
              status: "on-track",
              keyResults: [
                { description: "Launch 5 new service product lines", target: "5", current: "4", progress: 80 },
                { description: "Achieve 92% customer adoption of new features", target: "92%", current: "87%", progress: 95 },
                { description: "Reduce service delivery time by 30%", target: "30%", current: "26%", progress: 87 }
              ],
              supportingAgents: ["Agent #24", "Agent #26"]
            }
          ]
        }
      ]
    };

    return okrData[executive] || [];
  };

  // AI Agent OKR Types
  interface AIAgentKeyResult {
    description: string;
    target: string;
    current: string;
    progress: number;
  }

  interface AIAgentObjective {
    title: string;
    description: string;
    status: 'achieved' | 'on-track' | 'at-risk' | 'behind';
    keyResults: AIAgentKeyResult[];
    reportingTo: string;
  }

  interface AIAgentOKR {
    agentName: string;
    agentId: string;
    category: string;
    overallProgress: number;
    objectives: AIAgentObjective[];
  }

  const getAIAgentOKRs = (executive: string): AIAgentOKR[] => {
    const aiAgentData: Record<string, AIAgentOKR[]> = {
      ceo: [
        {
          agentName: "LLM Recommendation Dominance Agent",
          agentId: "Agent #15",
          category: "Strategic AI",
          overallProgress: 96,
          objectives: [
            {
              title: "AI-First Decision Support Excellence",
              description: "Lead strategic AI decision-making across all business functions",
              status: "on-track",
              keyResults: [
                { description: "Achieve 96% recommendation accuracy", target: "96%", current: "94%", progress: 98 },
                { description: "Process 10,000+ strategic decisions monthly", target: "10,000", current: "9,400", progress: 94 },
                { description: "Maintain 99.8% system availability", target: "99.8%", current: "99.7%", progress: 99 }
              ],
              reportingTo: "Sarah Chen"
            }
          ]
        },
        {
          agentName: "Performance Analytics AI",
          agentId: "Agent #19", 
          category: "Business Intelligence",
          overallProgress: 93,
          objectives: [
            {
              title: "Comprehensive Performance Intelligence",
              description: "Provide real-time analytics and predictive insights",
              status: "on-track",
              keyResults: [
                { description: "Generate 500+ daily performance insights", target: "500", current: "465", progress: 93 },
                { description: "Achieve 94% prediction accuracy", target: "94%", current: "91%", progress: 97 },
                { description: "Support all 9 C-level executives", target: "9", current: "9", progress: 100 }
              ],
              reportingTo: "Marcus Rodriguez"
            }
          ]
        }
      ],
      coo: [
        {
          agentName: "Advanced Scheduling Agent",
          agentId: "Agent #11",
          category: "Operations",
          overallProgress: 95,
          objectives: [
            {
              title: "Operational Scheduling Excellence",
              description: "Optimize technician scheduling and capacity management",
              status: "on-track",
              keyResults: [
                { description: "Process 45,976+ daily orders", target: "45,976", current: "45,976", progress: 100 },
                { description: "Achieve 95% technician utilization", target: "95%", current: "92%", progress: 97 },
                { description: "Maintain 48-minute average response time", target: "48 min", current: "48 min", progress: 100 }
              ],
              reportingTo: "Michael Rodriguez"
            }
          ]
        },
        {
          agentName: "Parts Prediction Engine",
          agentId: "Agent #14",
          category: "Supply Chain",
          overallProgress: 91,
          objectives: [
            {
              title: "Predictive Parts Management",
              description: "Optimize parts inventory and reduce stockouts",
              status: "on-track",
              keyResults: [
                { description: "Reduce parts stockouts by 85%", target: "85%", current: "78%", progress: 92 },
                { description: "Predict 95% of parts needs accurately", target: "95%", current: "89%", progress: 94 },
                { description: "Optimize inventory for 300+ vendors", target: "300", current: "287", progress: 96 }
              ],
              reportingTo: "Jennifer Walsh"
            }
          ]
        },
        {
          agentName: "Technician Management Agent",
          agentId: "Agent #21",
          category: "Workforce",
          overallProgress: 89,
          objectives: [
            {
              title: "1099 Contractor Excellence",
              description: "Optimize contractor performance and onboarding",
              status: "on-track",
              keyResults: [
                { description: "Manage 50+ contractor companies", target: "50", current: "45", progress: 90 },
                { description: "Achieve 94% contractor satisfaction", target: "94%", current: "91%", progress: 97 },
                { description: "Process 25,000+ contractor orders monthly", target: "25,000", current: "22,400", progress: 90 }
              ],
              reportingTo: "Michael Rodriguez"
            }
          ]
        }
      ],
      cfo: [
        {
          agentName: "Pricing & Estimation Specialist",
          agentId: "Agent #9",
          category: "Financial",
          overallProgress: 87,
          objectives: [
            {
              title: "Revenue Optimization Excellence",
              description: "Optimize pricing strategies and profit margins",
              status: "on-track",
              keyResults: [
                { description: "Increase revenue per order to $340", target: "$340", current: "$318", progress: 94 },
                { description: "Achieve 28% profit margin", target: "28%", current: "25.8%", progress: 92 },
                { description: "Process 45,976+ daily pricing decisions", target: "45,976", current: "42,500", progress: 92 }
              ],
              reportingTo: "David Kim"
            }
          ]
        },
        {
          agentName: "Regional Performance Monitor",
          agentId: "Agent #20",
          category: "Analytics",
          overallProgress: 92,
          objectives: [
            {
              title: "Regional Financial Intelligence",
              description: "Monitor and optimize regional financial performance",
              status: "on-track",
              keyResults: [
                { description: "Monitor 400+ planning areas", target: "400", current: "347", progress: 87 },
                { description: "Achieve 95% forecast accuracy", target: "95%", current: "89%", progress: 94 },
                { description: "Generate regional insights for all executives", target: "100%", current: "94%", progress: 94 }
              ],
              reportingTo: "Amanda Foster"
            }
          ]
        }
      ],
      cmo: [
        {
          agentName: "Conversational Commerce Agent",
          agentId: "Agent #24",
          category: "Customer Experience",
          overallProgress: 88,
          objectives: [
            {
              title: "Customer Engagement Excellence",
              description: "Drive customer satisfaction through AI-powered interactions",
              status: "on-track",
              keyResults: [
                { description: "Achieve 96% customer satisfaction", target: "96%", current: "94.2%", progress: 98 },
                { description: "Process 15,000+ customer interactions daily", target: "15,000", current: "13,200", progress: 88 },
                { description: "Reduce customer service response time to 2 minutes", target: "2 min", current: "2.3 min", progress: 87 }
              ],
              reportingTo: "Lisa Thompson"
            }
          ]
        },
        {
          agentName: "LLM Content Intelligence Agent",
          agentId: "Agent #25",
          category: "Marketing Intelligence",
          overallProgress: 90,
          objectives: [
            {
              title: "Content & Marketing Intelligence",
              description: "Optimize marketing content and customer acquisition",
              status: "on-track",
              keyResults: [
                { description: "Increase content engagement by 35%", target: "35%", current: "28%", progress: 80 },
                { description: "Generate 1,000+ marketing insights monthly", target: "1,000", current: "920", progress: 92 },
                { description: "Achieve 87% content accuracy rating", target: "87%", current: "85%", progress: 98 }
              ],
              reportingTo: "Carlos Mendez"
            }
          ]
        }
      ],
      cro: [
        {
          agentName: "AI-Powered B2B Intelligence Agent",
          agentId: "Agent #16",
          category: "B2B Intelligence",
          overallProgress: 94,
          objectives: [
            {
              title: "B2B Partnership Excellence",
              description: "Optimize B2B partnerships and revenue growth",
              status: "on-track",
              keyResults: [
                { description: "Support 5+ enterprise partnerships", target: "5", current: "4", progress: 80 },
                { description: "Increase B2B revenue by 35%", target: "35%", current: "32%", progress: 91 },
                { description: "Achieve 95% partner satisfaction", target: "95%", current: "93%", progress: 98 }
              ],
              reportingTo: "James Wilson"
            }
          ]
        },
        {
          agentName: "Hyper-Local LLM Market Intelligence Agent",
          agentId: "Agent #17",
          category: "Market Intelligence",
          overallProgress: 91,
          objectives: [
            {
              title: "Market Intelligence Excellence",
              description: "Provide hyper-local market insights and competitive intelligence",
              status: "on-track",
              keyResults: [
                { description: "Monitor 400+ local markets", target: "400", current: "347", progress: 87 },
                { description: "Generate 200+ market insights weekly", target: "200", current: "185", progress: 93 },
                { description: "Achieve 92% market prediction accuracy", target: "92%", current: "89%", progress: 97 }
              ],
              reportingTo: "Patricia Lee"
            }
          ]
        }
      ],
      cto: [
        {
          agentName: "Plumbing Dispatch Coordinator",
          agentId: "Agent #1",
          category: "Technical Operations",
          overallProgress: 93,
          objectives: [
            {
              title: "Technical Dispatch Excellence",
              description: "Coordinate technical dispatch operations with AI precision",
              status: "on-track",
              keyResults: [
                { description: "Process 15,000+ plumbing dispatches monthly", target: "15,000", current: "13,800", progress: 92 },
                { description: "Achieve 97% dispatch accuracy", target: "97%", current: "94%", progress: 97 },
                { description: "Maintain 30-minute average dispatch time", target: "30 min", current: "32 min", progress: 94 }
              ],
              reportingTo: "Dr. Alex Kumar"
            }
          ]
        }
      ],
      cdo: [],
      cao: [
        {
          agentName: "Technician Interaction Hub",
          agentId: "Agent #12",
          category: "Logistics",
          overallProgress: 89,
          objectives: [
            {
              title: "Technician Coordination Excellence",
              description: "Optimize technician interactions and routing efficiency",
              status: "on-track",
              keyResults: [
                { description: "Support 2,000+ daily technician interactions", target: "2,000", current: "1,840", progress: 92 },
                { description: "Achieve 96% technician satisfaction", target: "96%", current: "93%", progress: 97 },
                { description: "Reduce travel time by 25%", target: "25%", current: "22%", progress: 88 }
              ],
              reportingTo: "Roberto Martinez"
            }
          ]
        }
      ],
      cpo: [
        {
          agentName: "Technician Retention Intelligence Agent",
          agentId: "Agent #26",
          category: "Product Intelligence",
          overallProgress: 85,
          objectives: [
            {
              title: "Technician Retention Excellence",
              description: "Optimize technician retention and satisfaction through intelligent insights",
              status: "on-track",
              keyResults: [
                { description: "Achieve 94% technician retention rate", target: "94%", current: "89%", progress: 95 },
                { description: "Generate 500+ retention insights monthly", target: "500", current: "420", progress: 84 },
                { description: "Reduce turnover by 40%", target: "40%", current: "32%", progress: 80 }
              ],
              reportingTo: "Dr. Elena Rodriguez"
            }
          ]
        }
      ]
    };

    return aiAgentData[executive] || [];
  };

  const getExecutiveOKRs = (executive: string): Objective[] => {
    switch(executive) {
      case 'ceo':
        return [
          {
            title: "Achieve Operational Excellence & Scale",
            description: "Transform from capacity crisis to market leadership through strategic scaling and operational optimization",
            priority: 'critical',
            quarterProgress: 35,
            relatedAgents: ['CEO/COO Agent', 'Financial Intelligence Agent', 'Performance Analytics AI'],
            keyResults: [
              {
                description: "Eliminate daily reschedule crisis",
                target: "Reduce from 2,000 to <200 daily reschedules",
                current: "1,850 reschedules (-7.5%)",
                progress: 15,
                status: 'behind'
              },
              {
                description: "Scale 1099 contractor network",
                target: "Expand from 2 to 50+ contractor companies",
                current: "12 contractor companies",
                progress: 25,
                status: 'on-track'
              },
              {
                description: "Secure Series A funding",
                target: "$50M Series A at $1B valuation",
                current: "$25M committed, due diligence active",
                progress: 50,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Revenue Protection & Growth",
            description: "Protect revenue from capacity constraints while building sustainable growth engine",
            priority: 'critical',
            quarterProgress: 42,
            relatedAgents: ['Financial Intelligence Agent', 'D2C Marketing Intelligence', 'B2B Relationship Manager'],
            keyResults: [
              {
                description: "Reduce D2C cancellation revenue loss",
                target: "Cut $31K daily loss to <$10K",
                current: "$26K daily loss (-16%)",
                progress: 32,
                status: 'at-risk'
              },
              {
                description: "Maintain revenue per order",
                target: "Sustain $248+ revenue per order",
                current: "$251 average (+1.2%)",
                progress: 100,
                status: 'achieved'
              },
              {
                description: "Achieve positive EBITDA",
                target: "Break even by Q3 end",
                current: "-$2.1M monthly EBITDA",
                progress: 45,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Strategic Business Development",
            description: "Drive strategic initiatives and business partnerships to accelerate market expansion",
            priority: 'high',
            quarterProgress: 47,
            relatedAgents: ['B2B Relationship Manager', 'Geographic Performance Marketing Agent', 'Performance Analytics AI'],
            keyResults: [
              {
                description: "Establish strategic partnerships",
                target: "25 new strategic partnerships signed",
                current: "14 partnerships completed",
                progress: 56,
                status: 'on-track'
              },
              {
                description: "Launch national expansion program",
                target: "Enter 50 new metropolitan markets",
                current: "32 markets launched",
                progress: 64,
                status: 'on-track'
              },
              {
                description: "Achieve partnership revenue targets",
                target: "$30M quarterly partnership revenue",
                current: "$19.5M partnership revenue",
                progress: 65,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Technology Innovation Leadership",
            description: "Lead technology strategy and innovation to maintain competitive advantage",
            priority: 'high',
            quarterProgress: 54,
            relatedAgents: ['CTO Team', 'AI Innovation Team', 'Technology Development Agents'],
            keyResults: [
              {
                description: "Deploy next-generation AI platform",
                target: "Launch AI 2.0 platform with 95% accuracy",
                current: "Beta testing at 91% accuracy",
                progress: 78,
                status: 'on-track'
              },
              {
                description: "Achieve technology cost efficiency",
                target: "Reduce tech costs by 20% while scaling",
                current: "12% cost reduction achieved",
                progress: 60,
                status: 'on-track'
              },
              {
                description: "Implement advanced automation",
                target: "90% of processes fully automated",
                current: "76% automation coverage",
                progress: 84,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Investor Relations & Capital Management",
            description: "Manage investor relationships and optimize capital allocation for sustainable growth",
            priority: 'medium',
            quarterProgress: 61,
            relatedAgents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Strategic Planning Team'],
            keyResults: [
              {
                description: "Complete Series A fundraising",
                target: "$50M Series A at $1B valuation",
                current: "$35M committed, term sheet signed",
                progress: 70,
                status: 'on-track'
              },
              {
                description: "Maintain investor confidence metrics",
                target: "90%+ investor satisfaction score",
                current: "87% investor satisfaction",
                progress: 97,
                status: 'achieved'
              },
              {
                description: "Optimize capital deployment efficiency",
                target: "3.5x return on invested capital",
                current: "2.8x return on capital",
                progress: 80,
                status: 'on-track'
              }
            ]
          }
        ];
      
      case 'coo':
        return [
          {
            title: "Operational Crisis Resolution",
            description: "Eliminate capacity shortage and optimize field operations for sustainable growth",
            priority: 'critical',
            quarterProgress: 38,
            relatedAgents: ['CEO/COO Agent', 'Advanced Scheduling Agent', 'Route Optimization Engine'],
            keyResults: [
              {
                description: "Increase technician capacity",
                target: "Add 500+ technicians (1,730→2,230)",
                current: "1,760 technicians (+30)",
                progress: 6,
                status: 'behind'
              },
              {
                description: "Optimize completion rates",
                target: "Increase from 66.7% to 80%",
                current: "69.2% completion rate",
                progress: 19,
                status: 'at-risk'
              },
              {
                description: "Deploy hybrid workforce model",
                target: "50% W2 / 50% 1099 split",
                current: "54.3% W2 / 45.7% 1099",
                progress: 91,
                status: 'achieved'
              }
            ]
          },
          {
            title: "Quality & Compliance Excellence",
            description: "Maintain service quality while scaling operations and contractor network",
            priority: 'high',
            quarterProgress: 65,
            relatedAgents: ['Quality Assurance Inspector', 'Technician Training Agent', 'Parts Supply Chain Agent'],
            keyResults: [
              {
                description: "Maintain customer satisfaction",
                target: "Keep NPS >85 during scaling",
                current: "87 NPS score",
                progress: 100,
                status: 'achieved'
              },
              {
                description: "Automate compliance monitoring",
                target: "95% automated compliance checks",
                current: "78% automation",
                progress: 82,
                status: 'on-track'
              },
              {
                description: "Reduce safety incidents",
                target: "<2 incidents per 1,000 jobs",
                current: "1.8 incidents per 1,000",
                progress: 90,
                status: 'achieved'
              }
            ]
          },
          {
            title: "Workforce Development & Scaling",
            description: "Build and optimize workforce capabilities to support business growth",
            priority: 'high',
            quarterProgress: 41,
            relatedAgents: ['Technician Recruiting Agent', 'Technician Training Agent', 'Performance Analytics AI'],
            keyResults: [
              {
                description: "Deploy advanced technician training",
                target: "100% technicians certified on new protocols",
                current: "67% technician certification",
                progress: 67,
                status: 'on-track'
              },
              {
                description: "Achieve workforce productivity targets",
                target: "15% increase in technician productivity",
                current: "9% productivity increase",
                progress: 60,
                status: 'on-track'
              },
              {
                description: "Implement career advancement pathways",
                target: "25% technicians in advancement programs",
                current: "18% in advancement programs",
                progress: 72,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Supply Chain Excellence",
            description: "Optimize supply chain operations and parts management for maximum efficiency",
            priority: 'medium',
            quarterProgress: 55,
            relatedAgents: ['Parts Supply Chain Agent', 'Parts Prediction Engine', 'Inventory Management Assistant'],
            keyResults: [
              {
                description: "Achieve parts availability targets",
                target: "99% parts availability for scheduled jobs",
                current: "94% parts availability",
                progress: 83,
                status: 'on-track'
              },
              {
                description: "Optimize inventory turnover",
                target: "12x annual inventory turnover",
                current: "8.5x turnover rate",
                progress: 71,
                status: 'on-track'
              },
              {
                description: "Reduce supply chain costs",
                target: "20% reduction in supply chain costs",
                current: "12% cost reduction",
                progress: 60,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Customer Service Excellence",
            description: "Maintain exceptional customer service standards while scaling operations",
            priority: 'medium',
            quarterProgress: 72,
            relatedAgents: ['Customer Communication Hub', 'CX Agent', 'Quality Assurance Inspector'],
            keyResults: [
              {
                description: "Maintain customer satisfaction scores",
                target: "Net Promoter Score >85",
                current: "87 NPS score",
                progress: 100,
                status: 'achieved'
              },
              {
                description: "Reduce customer complaint resolution time",
                target: "Average resolution <24 hours",
                current: "18 hours average resolution",
                progress: 100,
                status: 'achieved'
              },
              {
                description: "Achieve first-call resolution rate",
                target: "85% first-call resolution",
                current: "78% first-call resolution",
                progress: 73,
                status: 'on-track'
              }
            ]
          }
        ];

      case 'cfo':
        return [
          {
            title: "Financial Optimization & Controls",
            description: "Optimize unit economics and establish sustainable financial foundation for growth",
            priority: 'critical',
            quarterProgress: 52,
            relatedAgents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Pricing & Estimation Specialist'],
            keyResults: [
              {
                description: "Improve profit per technician",
                target: "Increase PPT profit from $67.80 to $75",
                current: "$69.95 PPT profit (+$2.15)",
                progress: 30,
                status: 'on-track'
              },
              {
                description: "Optimize pay/revenue ratio",
                target: "Reduce from 29.9% to 25%",
                current: "28.7% pay/revenue (-1.2%)",
                progress: 24,
                status: 'on-track'
              },
              {
                description: "Control parts cost variance",
                target: "Parts unaccounted <2%",
                current: "2.8% parts unaccounted",
                progress: 60,
                status: 'at-risk'
              }
            ]
          },
          {
            title: "Revenue Analytics & Forecasting",
            description: "Build predictive financial models and optimize revenue streams",
            priority: 'high',
            quarterProgress: 47,
            relatedAgents: ['Financial Intelligence Agent', 'Parts Prediction Engine', 'Regional Performance Monitor'],
            keyResults: [
              {
                description: "Implement predictive costing",
                target: "95% cost prediction accuracy",
                current: "87% prediction accuracy",
                progress: 73,
                status: 'on-track'
              },
              {
                description: "Optimize advertising spend",
                target: "Reduce ad spend by $2M quarterly",
                current: "$0.5M reduction achieved",
                progress: 25,
                status: 'on-track'
              },
              {
                description: "Establish B2B profit tracking",
                target: "Real-time B2B profitability by partner",
                current: "Weekly B2B profit reports",
                progress: 70,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Capital Structure Optimization",
            description: "Optimize capital structure and establish sustainable financial foundation",
            priority: 'high',
            quarterProgress: 39,
            relatedAgents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Strategic Planning Team'],
            keyResults: [
              {
                description: "Achieve optimal debt-to-equity ratio",
                target: "Maintain debt-to-equity <0.3",
                current: "0.42 debt-to-equity ratio",
                progress: 20,
                status: 'behind'
              },
              {
                description: "Improve working capital efficiency",
                target: "15-day cash conversion cycle",
                current: "23-day conversion cycle",
                progress: 47,
                status: 'at-risk'
              },
              {
                description: "Establish cash reserve targets",
                target: "6 months operating expenses in reserve",
                current: "3.2 months cash reserve",
                progress: 53,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Risk Management & Compliance",
            description: "Implement comprehensive risk management and ensure regulatory compliance",
            priority: 'high',
            quarterProgress: 68,
            relatedAgents: ['Quality Assurance Inspector', 'Financial Intelligence Agent', 'Compliance Team'],
            keyResults: [
              {
                description: "Deploy financial risk monitoring",
                target: "100% automated risk monitoring",
                current: "85% automation coverage",
                progress: 85,
                status: 'on-track'
              },
              {
                description: "Achieve audit compliance",
                target: "Zero material audit findings",
                current: "2 minor findings resolved",
                progress: 90,
                status: 'achieved'
              },
              {
                description: "Implement fraud prevention",
                target: "<0.1% fraud rate on transactions",
                current: "0.08% fraud rate",
                progress: 100,
                status: 'achieved'
              }
            ]
          },
          {
            title: "Investor Relations & Reporting",
            description: "Maintain transparent investor communications and accurate financial reporting",
            priority: 'medium',
            quarterProgress: 71,
            relatedAgents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Strategic Planning Team'],
            keyResults: [
              {
                description: "Deliver timely financial reporting",
                target: "100% reports delivered on schedule",
                current: "98% on-time delivery",
                progress: 98,
                status: 'achieved'
              },
              {
                description: "Maintain investor confidence",
                target: "90%+ investor satisfaction",
                current: "88% satisfaction score",
                progress: 98,
                status: 'achieved'
              },
              {
                description: "Achieve reporting accuracy",
                target: "Zero material restatements",
                current: "100% accuracy maintained",
                progress: 100,
                status: 'achieved'
              }
            ]
          }
        ];

      case 'cto':
        return [
          {
            title: "Platform Reliability & Scale",
            description: "Ensure platform can support 75% business growth with 99.9% uptime",
            priority: 'critical',
            quarterProgress: 58,
            relatedAgents: ['Advanced Scheduling Agent', 'Route Optimization Engine', 'Parts Prediction Engine'],
            keyResults: [
              {
                description: "Achieve platform uptime",
                target: "99.9% uptime during peak scaling",
                current: "99.7% uptime",
                progress: 97,
                status: 'achieved'
              },
              {
                description: "Scale API performance",
                target: "Handle 50K+ concurrent requests",
                current: "35K concurrent capacity",
                progress: 70,
                status: 'on-track'
              },
              {
                description: "Optimize AI agent response time",
                target: "<2 second average response",
                current: "1.8 second average",
                progress: 100,
                status: 'achieved'
              }
            ]
          },
          {
            title: "AI Agent Optimization",
            description: "Enhance AI agent performance and deploy advanced automation capabilities",
            priority: 'high',
            quarterProgress: 73,
            relatedAgents: ['All 26 AI Agents'],
            keyResults: [
              {
                description: "Increase agent decision accuracy",
                target: "95% autonomous decision accuracy",
                current: "92% decision accuracy",
                progress: 60,
                status: 'on-track'
              },
              {
                description: "Deploy predictive scheduling",
                target: "90% schedule optimization accuracy",
                current: "87% optimization accuracy",
                progress: 97,
                status: 'achieved'
              },
              {
                description: "Automate parts prediction",
                target: "85% parts prediction accuracy",
                current: "82% prediction accuracy",
                progress: 94,
                status: 'achieved'
              }
            ]
          }
        ];

      case 'cmo':
        return [
          {
            title: "Customer Acquisition Excellence",
            description: "Drive sustainable customer growth while optimizing acquisition costs",
            priority: 'critical',
            quarterProgress: 44,
            relatedAgents: ['D2C Marketing Intelligence', 'Geographic Performance Marketing Agent', 'B2B Relationship Manager'],
            keyResults: [
              {
                description: "Reduce customer acquisition cost",
                target: "CAC from $125 to <$100",
                current: "$118 average CAC (-5.6%)",
                progress: 28,
                status: 'on-track'
              },
              {
                description: "Increase D2C market share",
                target: "25% market share in top 50 metros",
                current: "18% market share",
                progress: 72,
                status: 'on-track'
              },
              {
                description: "Optimize geographic expansion",
                target: "Profitable operations in 400+ planning areas",
                current: "352 profitable areas",
                progress: 88,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Brand Development & Retention",
            description: "Build America's Home Manager brand and increase customer lifetime value",
            priority: 'high',
            quarterProgress: 61,
            relatedAgents: ['CX Agent', 'Customer Communication Hub', 'D2C Marketing Intelligence'],
            keyResults: [
              {
                description: "Increase brand awareness",
                target: "40% unaided brand recognition",
                current: "28% brand recognition",
                progress: 70,
                status: 'on-track'
              },
              {
                description: "Improve customer lifetime value",
                target: "CLV from $850 to $1,200",
                current: "$975 average CLV (+15%)",
                progress: 36,
                status: 'on-track'
              },
              {
                description: "Reduce churn rate",
                target: "Monthly churn <5%",
                current: "6.2% monthly churn",
                progress: 67,
                status: 'at-risk'
              }
            ]
          }
        ];

      case 'cdo':
        return [
          {
            title: "Data-Driven Decision Making",
            description: "Establish comprehensive data architecture supporting real-time business intelligence",
            priority: 'critical',
            quarterProgress: 67,
            relatedAgents: ['Performance Analytics AI', 'Financial Intelligence Agent', 'Regional Performance Monitor'],
            keyResults: [
              {
                description: "Real-time operational dashboards",
                target: "100% real-time data across 430 planning areas",
                current: "387 areas with real-time data",
                progress: 90,
                status: 'on-track'
              },
              {
                description: "Predictive analytics accuracy",
                target: "90% prediction accuracy for key metrics",
                current: "87% prediction accuracy",
                progress: 97,
                status: 'achieved'
              },
              {
                description: "Data processing speed",
                target: "<30 second data refresh rates",
                current: "45 second refresh rates",
                progress: 67,
                status: 'at-risk'
              }
            ]
          },
          {
            title: "Advanced Analytics & ML",
            description: "Deploy machine learning models for operational optimization and forecasting",
            priority: 'high',
            quarterProgress: 55,
            relatedAgents: ['Parts Prediction Engine', 'Route Optimization Engine', 'Advanced Scheduling Agent'],
            keyResults: [
              {
                description: "Deploy demand forecasting",
                target: "95% demand prediction accuracy",
                current: "91% prediction accuracy",
                progress: 80,
                status: 'on-track'
              },
              {
                description: "Optimize route algorithms",
                target: "20% travel time reduction",
                current: "15% travel time reduction",
                progress: 75,
                status: 'on-track'
              },
              {
                description: "Automate anomaly detection",
                target: "Detect 90% of operational anomalies",
                current: "76% anomaly detection",
                progress: 84,
                status: 'on-track'
              }
            ]
          }
        ];

      case 'cao':
        return [
          {
            title: "Process Automation Excellence",
            description: "Automate manual processes and optimize workflow efficiency across operations",
            priority: 'critical',
            quarterProgress: 71,
            relatedAgents: ['All 26 AI Agents for workflow automation'],
            keyResults: [
              {
                description: "Automate manual processes",
                target: "85% of routine tasks automated",
                current: "73% task automation",
                progress: 86,
                status: 'on-track'
              },
              {
                description: "Reduce processing time",
                target: "50% reduction in average processing time",
                current: "38% processing time reduction",
                progress: 76,
                status: 'on-track'
              },
              {
                description: "Deploy intelligent routing",
                target: "90% optimal route selection",
                current: "86% optimal routing",
                progress: 96,
                status: 'achieved'
              }
            ]
          },
          {
            title: "Operational Efficiency Optimization",
            description: "Eliminate inefficiencies and optimize resource allocation across all operations",
            priority: 'high',
            quarterProgress: 63,
            relatedAgents: ['Route Optimization Engine', 'Advanced Scheduling Agent', 'Parts Prediction Engine'],
            keyResults: [
              {
                description: "Optimize technician utilization",
                target: "85% technician utilization rate",
                current: "78.5% utilization rate",
                progress: 46,
                status: 'at-risk'
              },
              {
                description: "Reduce operational waste",
                target: "30% reduction in operational waste",
                current: "22% waste reduction",
                progress: 73,
                status: 'on-track'
              },
              {
                description: "Automate inventory management",
                target: "95% automated inventory decisions",
                current: "87% automation",
                progress: 92,
                status: 'achieved'
              }
            ]
          }
        ];

      case 'cpo':
        return [
          {
            title: "Product Innovation & Development",
            description: "Drive product innovation to meet evolving customer needs and market demands",
            priority: 'critical',
            quarterProgress: 48,
            relatedAgents: ['Product Development AI Agent', 'Customer Experience Intelligence Agent', 'Market Research Agent'],
            keyResults: [
              {
                description: "Launch AI-powered home diagnostic platform",
                target: "Beta launch with 1,000+ homes enrolled",
                current: "Alpha testing with 350 homes",
                progress: 35,
                status: 'on-track'
              },
              {
                description: "Reduce feature development cycle time",
                target: "From 12 weeks to 6 weeks average",
                current: "8.5 weeks average cycle time",
                progress: 58,
                status: 'on-track'
              },
              {
                description: "Achieve product-market fit metrics",
                target: "40%+ users would be very disappointed without product",
                current: "32% very disappointed metric",
                progress: 80,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Customer Experience Optimization",
            description: "Transform customer journey through seamless digital-physical service integration",
            priority: 'critical',
            quarterProgress: 62,
            relatedAgents: ['Customer Experience Intelligence Agent', 'Digital Interface Agent', 'Service Journey Optimization Agent'],
            keyResults: [
              {
                description: "Implement omnichannel customer platform",
                target: "Unified experience across web/app/voice/SMS",
                current: "Web and app integration complete",
                progress: 75,
                status: 'on-track'
              },
              {
                description: "Reduce customer effort score",
                target: "CES from 3.2 to <2.5",
                current: "2.8 customer effort score",
                progress: 70,
                status: 'on-track'
              },
              {
                description: "Increase digital adoption rate",
                target: "85% of interactions through digital channels",
                current: "68% digital interaction rate",
                progress: 53,
                status: 'at-risk'
              }
            ]
          },
          {
            title: "Smart Home Integration Platform",
            description: "Build comprehensive smart home ecosystem with predictive maintenance capabilities",
            priority: 'high',
            quarterProgress: 41,
            relatedAgents: ['IoT Integration Agent', 'Predictive Maintenance AI Agent', 'Smart Home Analytics Agent'],
            keyResults: [
              {
                description: "Deploy IoT sensor network",
                target: "10,000+ homes with smart sensors",
                current: "3,200 homes equipped",
                progress: 32,
                status: 'at-risk'
              },
              {
                description: "Achieve predictive maintenance accuracy",
                target: "90% accuracy in failure prediction",
                current: "78% prediction accuracy",
                progress: 87,
                status: 'on-track'
              },
              {
                description: "Reduce emergency service calls",
                target: "40% reduction through predictive alerts",
                current: "22% reduction achieved",
                progress: 55,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Product Data & Analytics",
            description: "Establish comprehensive product analytics to drive data-informed product decisions",
            priority: 'high',
            quarterProgress: 56,
            relatedAgents: ['Product Analytics AI Agent', 'User Behavior Intelligence Agent', 'A/B Testing Optimization Agent'],
            keyResults: [
              {
                description: "Implement real-time product analytics",
                target: "100% feature usage tracking with <1hr latency",
                current: "85% feature coverage, 2hr latency",
                progress: 72,
                status: 'on-track'
              },
              {
                description: "Establish product experimentation platform",
                target: "50+ A/B tests running simultaneously",
                current: "28 concurrent experiments",
                progress: 56,
                status: 'on-track'
              },
              {
                description: "Achieve data-driven decision rate",
                target: "95% of product decisions backed by data",
                current: "71% data-backed decisions",
                progress: 42,
                status: 'at-risk'
              }
            ]
          },
          {
            title: "Competitive Market Position",
            description: "Establish market leadership through superior product differentiation and positioning",
            priority: 'medium',
            quarterProgress: 39,
            relatedAgents: ['Competitive Intelligence Agent', 'Market Positioning Agent', 'Feature Gap Analysis Agent'],
            keyResults: [
              {
                description: "Achieve feature parity leadership",
                target: "Lead market in 8 of 10 key features",
                current: "Leading in 5 of 10 features",
                progress: 63,
                status: 'on-track'
              },
              {
                description: "Establish product differentiation score",
                target: "4.5+ differentiation rating vs competitors",
                current: "3.8 differentiation rating",
                progress: 26,
                status: 'behind'
              },
              {
                description: "Capture market share in key segments",
                target: "15% market share in smart home services",
                current: "8.5% market share",
                progress: 23,
                status: 'behind'
              }
            ]
          }
        ];

      case 'cro':
        return [
          {
            title: "Revenue Growth Acceleration",
            description: "Drive aggressive revenue growth through optimized pricing and market expansion",
            priority: 'critical',
            quarterProgress: 51,
            relatedAgents: ['Revenue Optimization AI Agent', 'Dynamic Pricing Agent', 'Market Expansion Agent'],
            keyResults: [
              {
                description: "Achieve quarterly revenue target",
                target: "$85M Q3 revenue (25% growth)",
                current: "$72M Q3 run rate",
                progress: 67,
                status: 'on-track'
              },
              {
                description: "Optimize revenue per customer",
                target: "Increase from $248 to $285 per order",
                current: "$267 average per order",
                progress: 51,
                status: 'on-track'
              },
              {
                description: "Expand high-value service mix",
                target: "35% revenue from premium services",
                current: "24% premium service revenue",
                progress: 27,
                status: 'at-risk'
              }
            ]
          },
          {
            title: "Strategic Partnership Revenue",
            description: "Develop and optimize B2B partnerships to create new revenue streams",
            priority: 'critical',
            quarterProgress: 43,
            relatedAgents: ['Partnership Revenue Agent', 'B2B Sales Intelligence Agent', 'Channel Optimization Agent'],
            keyResults: [
              {
                description: "Scale B2B partnership revenue",
                target: "$25M quarterly B2B revenue",
                current: "$18.5M B2B revenue",
                progress: 74,
                status: 'on-track'
              },
              {
                description: "Onboard strategic enterprise clients",
                target: "15 new enterprise partnerships",
                current: "8 enterprise partnerships",
                progress: 53,
                status: 'on-track'
              },
              {
                description: "Achieve partner revenue efficiency",
                target: "40% margin on partner-driven revenue",
                current: "32% partner revenue margin",
                progress: 25,
                status: 'behind'
              }
            ]
          },
          {
            title: "Revenue Operations Excellence",
            description: "Build world-class revenue operations to support sustainable growth",
            priority: 'high',
            quarterProgress: 58,
            relatedAgents: ['Revenue Operations AI Agent', 'Sales Analytics Agent', 'Revenue Forecasting Agent'],
            keyResults: [
              {
                description: "Implement revenue forecasting accuracy",
                target: "95% accuracy in quarterly forecasts",
                current: "89% forecasting accuracy",
                progress: 80,
                status: 'on-track'
              },
              {
                description: "Optimize sales funnel conversion",
                target: "Increase lead-to-close rate from 12% to 18%",
                current: "14.5% lead-to-close rate",
                progress: 42,
                status: 'on-track'
              },
              {
                description: "Reduce revenue cycle time",
                target: "Decrease from 45 to 30 days average",
                current: "38 days average cycle",
                progress: 47,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Customer Lifetime Value Optimization",
            description: "Maximize customer lifetime value through retention and expansion strategies",
            priority: 'high',
            quarterProgress: 47,
            relatedAgents: ['Customer Value Intelligence Agent', 'Retention Optimization Agent', 'Upsell AI Agent'],
            keyResults: [
              {
                description: "Increase customer lifetime value",
                target: "CLV from $850 to $1,200",
                current: "$975 average CLV",
                progress: 36,
                status: 'on-track'
              },
              {
                description: "Improve customer retention rate",
                target: "Monthly churn <3%",
                current: "4.2% monthly churn",
                progress: 60,
                status: 'at-risk'
              },
              {
                description: "Drive revenue expansion rate",
                target: "25% revenue expansion from existing customers",
                current: "18% expansion rate",
                progress: 72,
                status: 'on-track'
              }
            ]
          },
          {
            title: "Pricing Strategy Optimization",
            description: "Develop dynamic pricing models to maximize revenue while maintaining competitiveness",
            priority: 'medium',
            quarterProgress: 34,
            relatedAgents: ['Dynamic Pricing Agent', 'Competitive Pricing Intelligence Agent', 'Value-Based Pricing Agent'],
            keyResults: [
              {
                description: "Deploy dynamic pricing algorithm",
                target: "100% of services using AI-driven pricing",
                current: "45% services with dynamic pricing",
                progress: 45,
                status: 'on-track'
              },
              {
                description: "Optimize price elasticity response",
                target: "15% revenue increase through pricing optimization",
                current: "6% revenue increase",
                progress: 40,
                status: 'at-risk'
              },
              {
                description: "Maintain competitive positioning",
                target: "Price within 5% of market leaders",
                current: "Price within 8% of leaders",
                progress: 17,
                status: 'behind'
              }
            ]
          }
        ];

      default:
        return [];
    }
  };

  const getOperationalResponsibilities = () => {
    return [
      {
        function: 'B2B Partnerships',
        color: 'bg-blue-500',
        executiveLead: {
          name: 'CRO (Chief Revenue Officer)',
          title: 'Revenue Strategy & Partnership Leadership',
          responsibility: 'Strategic partnership revenue optimization, B2B client relationship management, and partnership strategy development'
        },
        humanLead: {
          name: 'Lisa Chen',
          title: 'Partnership Revenue & B2B Intelligence Lead',
          aiAgenticRole: 'AI-Powered Partnership Strategist - Coordinates B2B partnerships with AI intelligence systems'
        },
        keyAgents: [
          { name: 'B2B Intelligence Agent', role: 'Partnership analytics and client intelligence' },
          { name: 'Customer Communication Hub', role: 'B2B client communication management' },
          { name: 'Financial Intelligence Agent', role: 'Partnership revenue optimization' }
        ],
        keyResponsibilities: [
          'Manage relationships with American Home Shield (AHS), Assurant (AIZ), and Choice',
          'Optimize partnership revenue streams and contract negotiations',
          'Coordinate AI-driven B2B intelligence and market analysis',
          'Implement partnership performance tracking and optimization',
          'Develop strategic partnership expansion and scaling strategies'
        ],
        projects: [
          {
            title: 'AHS Partnership Revenue Optimization',
            targetDate: '2025-09-15',
            status: 'in-progress',
            progress: 65,
            milestones: [
              { title: 'Partnership Performance Analysis Complete', date: '2025-08-15', status: 'completed' },
              { title: 'Revenue Optimization Strategy Development', date: '2025-08-30', status: 'in-progress' },
              { title: 'Contract Renegotiation Phase 1', date: '2025-09-15', status: 'upcoming' }
            ]
          },
          {
            title: 'Assurant & Choice Partnership Expansion',
            targetDate: '2025-10-30',
            status: 'upcoming',
            progress: 25,
            milestones: [
              { title: 'Market Analysis & Opportunity Assessment', date: '2025-09-01', status: 'upcoming' },
              { title: 'Partnership Proposal Development', date: '2025-09-30', status: 'upcoming' },
              { title: 'Partnership Agreement Finalization', date: '2025-10-30', status: 'upcoming' }
            ]
          }
        ]
      },
      {
        function: 'Routing & Logistics',
        color: 'bg-green-500',
        executiveLead: {
          name: 'CAO (Chief Automation Officer)',
          title: 'Process Automation & Efficiency Leadership',
          responsibility: 'Route optimization automation, logistics efficiency, and transportation cost management'
        },
        humanLead: {
          name: 'Robert Kim',
          title: 'Route Optimization & Logistics Manager',
          aiAgenticRole: 'AI-Driven Logistics Coordinator - Manages route optimization through AI coordination'
        },
        keyAgents: [
          { name: 'Route Optimization Engine', role: 'Intelligent route planning and optimization' },
          { name: 'Advanced Scheduling Agent', role: 'Technician deployment and scheduling coordination' },
          { name: 'Regional Performance Monitor', role: 'Geographic performance and logistics tracking' }
        ],
        keyResponsibilities: [
          'Optimize technician routing across 400+ planning areas',
          'Coordinate AI-driven logistics and transportation efficiency',
          'Implement cost reduction strategies for logistics operations',
          'Monitor and improve delivery performance and resource utilization',
          'Automate logistics processes for scalable operations'
        ]
      },
      {
        function: 'Scheduling Operations',
        color: 'bg-purple-500',
        executiveLead: {
          name: 'COO (Chief Operating Officer)',
          title: 'Operations Excellence & Capacity Leadership',
          responsibility: 'Capacity planning, scheduling optimization, and operational efficiency across all service areas'
        },
        humanLead: {
          name: 'Lisa Park',
          title: 'Capacity & Scheduling Intelligence Manager',
          aiAgenticRole: 'AI-Powered Capacity Orchestrator - Manages capacity planning through AI agent collaboration'
        },
        keyAgents: [
          { name: 'Advanced Scheduling Agent', role: 'Optimal technician scheduling and capacity management' },
          { name: 'Emergency Response Coordinator', role: 'Urgent scheduling and crisis response' },
          { name: 'Technician Management Agent', role: 'Technician availability and deployment coordination' }
        ],
        keyResponsibilities: [
          'Manage 2,000+ daily reschedules and capacity crisis resolution',
          'Coordinate scheduling efficiency across all planning areas',
          'Implement AI-driven capacity optimization and surge management',
          'Monitor technician utilization and deployment strategies',
          'Ensure optimal service response times and customer satisfaction'
        ],
        projects: [
          {
            title: 'Capacity Crisis Resolution - 2,000+ Daily Reschedules',
            targetDate: '2025-10-01',
            status: 'critical',
            progress: 45,
            milestones: [
              { title: 'Crisis Assessment & Root Cause Analysis', date: '2025-08-15', status: 'completed' },
              { title: 'AI Scheduling Algorithm Enhancement', date: '2025-09-01', status: 'in-progress' },
              { title: 'Capacity Surge Management System', date: '2025-09-15', status: 'upcoming' },
              { title: 'Reduce Daily Reschedules to <500', date: '2025-10-01', status: 'upcoming' }
            ]
          },
          {
            title: 'AI-Driven Scheduling Optimization',
            targetDate: '2025-11-15',
            status: 'in-progress',
            progress: 60,
            milestones: [
              { title: 'Scheduling Intelligence Framework', date: '2025-08-30', status: 'completed' },
              { title: 'Real-Time Optimization Engine', date: '2025-10-15', status: 'in-progress' },
              { title: 'Cross-Planning Area Coordination', date: '2025-11-15', status: 'upcoming' }
            ]
          }
        ]
      },
      {
        function: 'Customer Communications',
        color: 'bg-pink-500',
        executiveLead: {
          name: 'CMO (Chief Marketing Officer)',
          title: 'Customer Experience & Communication Leadership',
          responsibility: 'Customer journey optimization, communication strategy, and customer satisfaction management'
        },
        humanLead: {
          name: 'Jessica Thompson',
          title: 'Customer Experience & AI Integration Director',
          aiAgenticRole: 'Human-AI Customer Journey Orchestrator - Optimizes customer experience through AI coordination'
        },
        keyAgents: [
          { name: 'Customer Communication Hub', role: 'Multi-channel customer communication management' },
          { name: 'Conversational Commerce Agent', role: 'AI-powered customer interaction and support' },
          { name: 'Quality Assurance Inspector', role: 'Customer satisfaction monitoring and improvement' }
        ],
        keyResponsibilities: [
          'Optimize customer communication across all touchpoints',
          'Implement AI-driven personalized customer journey management',
          'Monitor and improve customer satisfaction and retention rates',
          'Coordinate customer feedback integration and service improvements',
          'Develop customer communication strategies and automation'
        ]
      },
      {
        function: 'Parts Management',
        color: 'bg-yellow-500',
        executiveLead: {
          name: 'COO (Chief Operating Officer)',
          title: 'Supply Chain & Inventory Leadership',
          responsibility: 'Parts supply chain optimization, inventory management, and procurement strategy'
        },
        humanLead: {
          name: 'Amanda Thompson',
          title: 'Operations Excellence Director',
          aiAgenticRole: 'AI-Driven Operations Coordinator - Oversees parts management through AI agent coordination'
        },
        keyAgents: [
          { name: 'Parts Prediction Engine', role: 'Intelligent parts demand forecasting and inventory optimization' },
          { name: 'Parts Ordering Specialist', role: 'Automated parts procurement and order management' },
          { name: 'Inventory Management Assistant', role: 'Real-time inventory tracking and stock management' }
        ],
        keyResponsibilities: [
          'Optimize parts inventory across all service locations',
          'Implement AI-driven demand forecasting and procurement automation',
          'Coordinate parts supply chain and vendor relationship management',
          'Monitor parts availability and emergency stock management',
          'Reduce parts-related service delays and cost optimization'
        ],
        projects: [
          {
            title: 'Parts Inventory Optimization & Cost Reduction',
            targetDate: '2025-09-30',
            status: 'in-progress',
            progress: 70,
            milestones: [
              { title: 'AI-Driven Demand Forecasting Model', date: '2025-08-15', status: 'completed' },
              { title: 'Automated Procurement System Launch', date: '2025-09-01', status: 'in-progress' },
              { title: 'Vendor Relationship Optimization', date: '2025-09-30', status: 'upcoming' }
            ]
          },
          {
            title: 'Emergency Stock Management System',
            targetDate: '2025-10-31',
            status: 'upcoming',
            progress: 30,
            milestones: [
              { title: 'Critical Parts Identification Analysis', date: '2025-09-15', status: 'upcoming' },
              { title: 'Emergency Stock Algorithm Development', date: '2025-10-15', status: 'upcoming' },
              { title: 'Real-Time Stock Alert System', date: '2025-10-31', status: 'upcoming' }
            ]
          }
        ]
      },
      {
        function: 'HOA Programs',
        color: 'bg-indigo-500',
        executiveLead: {
          name: 'CMO (Chief Marketing Officer)',
          title: 'Community Partnership & Program Leadership',
          responsibility: 'HOA partnership development, community program management, and relationship building'
        },
        humanLead: {
          name: 'Brian Lee',
          title: 'Brand & Marketing Intelligence Lead',
          aiAgenticRole: 'AI-Driven Brand Strategist - Develops HOA programs through AI insights and market intelligence'
        },
        keyAgents: [
          { name: 'Hyper-Local LLM Market Intelligence Agent', role: 'Community market analysis and HOA targeting' },
          { name: 'B2B Intelligence Agent', role: 'HOA partnership development and relationship management' },
          { name: 'Customer Communication Hub', role: 'HOA communication and program coordination' }
        ],
        keyResponsibilities: [
          'Develop and manage HOA partnership programs and incentives',
          'Coordinate community outreach and relationship building',
          'Implement AI-driven HOA market analysis and targeting',
          'Monitor HOA program performance and optimization',
          'Scale HOA partnerships for community-wide service coverage'
        ],
        projects: [
          {
            title: 'HOA Partnership Expansion Program',
            targetDate: '2025-11-30',
            status: 'in-progress',
            progress: 40,
            milestones: [
              { title: 'Market Analysis & HOA Targeting Strategy', date: '2025-08-30', status: 'completed' },
              { title: 'Partnership Outreach Campaign Launch', date: '2025-09-30', status: 'in-progress' },
              { title: 'Community Program Implementation', date: '2025-11-30', status: 'upcoming' }
            ]
          }
        ]
      },
      {
        function: '1099 Contractor Management',
        color: 'bg-teal-500',
        executiveLead: {
          name: 'COO (Chief Operating Officer)',
          title: 'Contractor Network & Capacity Leadership',
          responsibility: 'Scale 1099 contractor network from 2 to 50+ companies, contractor relationship management'
        },
        humanLead: {
          name: 'Amanda Thompson',
          title: 'Operations Excellence Director',
          aiAgenticRole: 'AI-Driven Operations Coordinator - Manages contractor network expansion through AI coordination'
        },
        keyAgents: [
          { name: 'Technician Recruiting Agent', role: '1099 contractor sourcing and network expansion' },
          { name: 'Technician Management Agent', role: 'Contractor performance monitoring and coordination' },
          { name: 'Performance Analytics AI', role: 'Contractor performance analysis and optimization' }
        ],
        keyResponsibilities: [
          'Scale 1099 contractor network to meet capacity demands',
          'Coordinate contractor recruitment and onboarding processes',
          'Implement AI-driven contractor performance monitoring',
          'Manage contractor relationships and service quality standards',
          'Optimize contractor deployment and capacity utilization'
        ],
        projects: [
          {
            title: 'Scale 1099 Contractor Network to Meet Capacity Demands',
            targetDate: '2025-12-31',
            status: 'in-progress',
            progress: 35,
            milestones: [
              { title: 'Network Assessment & Gap Analysis', date: '2025-08-15', status: 'completed' },
              { title: 'Contractor Sourcing Strategy Development', date: '2025-09-01', status: 'in-progress' },
              { title: 'Phase 1: Scale to 10 Companies', date: '2025-09-30', status: 'upcoming' },
              { title: 'Phase 2: Scale to 25 Companies', date: '2025-11-15', status: 'upcoming' },
              { title: 'Phase 3: Scale to 50+ Companies', date: '2025-12-31', status: 'upcoming' }
            ]
          },
          {
            title: 'AI-Driven Contractor Performance Monitoring',
            targetDate: '2025-10-15',
            status: 'in-progress',
            progress: 55,
            milestones: [
              { title: 'Performance Metrics Framework Design', date: '2025-08-01', status: 'completed' },
              { title: 'AI Agent Integration & Testing', date: '2025-09-15', status: 'in-progress' },
              { title: 'Real-Time Monitoring Dashboard Launch', date: '2025-10-15', status: 'upcoming' }
            ]
          },
          {
            title: 'Contractor Quality Standards Implementation',
            targetDate: '2025-11-30',
            status: 'upcoming',
            progress: 20,
            milestones: [
              { title: 'Quality Standards Documentation', date: '2025-09-15', status: 'upcoming' },
              { title: 'Training Program Development', date: '2025-10-30', status: 'upcoming' },
              { title: 'Quality Assurance System Deployment', date: '2025-11-30', status: 'upcoming' }
            ]
          }
        ]
      },
      {
        function: 'Financial Operations',
        color: 'bg-red-500',
        executiveLead: {
          name: 'CFO (Chief Financial Officer)',
          title: 'Financial Strategy & Intelligence Leadership',
          responsibility: 'Financial performance optimization, revenue analytics, and cost management across all operations'
        },
        humanLead: {
          name: 'Michael Davis',
          title: 'Financial Intelligence & Analytics Director',
          aiAgenticRole: 'AI-Driven Financial Strategist - Leverages AI-generated financial insights for strategic decisions'
        },
        keyAgents: [
          { name: 'Financial Intelligence Agent', role: 'Comprehensive financial analytics and strategic insights' },
          { name: 'Pricing & Estimation Specialist', role: 'Dynamic pricing and cost optimization' },
          { name: 'Performance Analytics AI', role: 'Financial performance monitoring and forecasting' }
        ],
        keyResponsibilities: [
          'Monitor and optimize financial performance across all business functions',
          'Implement AI-driven financial forecasting and scenario planning',
          'Coordinate revenue optimization and cost management strategies',
          'Ensure financial alignment with operational objectives',
          'Provide financial intelligence support for executive decision-making'
        ]
      }
    ];
  };

  const getHumanOrgChart = (exec: string) => {
    const humanOrgCharts = {
      ceo: {
        directReports: [
          {
            name: 'Sarah Chen',
            title: 'Chief of Staff & Strategic Operations',
            department: 'Executive',
            agenticRole: 'AI Coordination Facilitator',
            jobDescription: 'Orchestrates cross-functional AI agent collaboration, translates strategic vision into agent-executable tasks, and ensures seamless human-AI workflow integration across all C-level initiatives.',
            dailyTasks: [
              'Monitor AI agent performance metrics and coordinate optimization across 26 agents',
              'Facilitate strategic decision-making by synthesizing AI recommendations from multiple agents',
              'Design and implement cross-departmental AI collaboration protocols',
              'Translate C-level strategic initiatives into specific AI agent task assignments',
              'Conduct daily AI agent coordination meetings and performance reviews',
              'Manage escalation protocols when AI agents require human intervention'
            ],
            dataSources: [
              'Real-time AI agent performance dashboards and analytics',
              'Cross-departmental collaboration metrics and workflow data',
              'Executive decision-making history and strategic planning documents',
              'AI agent interaction logs and coordination efficiency metrics',
              'Strategic initiative progress tracking and milestone data',
              'Human-AI workflow optimization reports and feedback systems'
            ],
            kpis: [
              'AI agent coordination efficiency: 95% successful cross-agent collaboration',
              'Strategic initiative execution: 90% on-time completion through AI collaboration',
              'Human-AI workflow optimization: 85% reduction in manual intervention needs',
              'Cross-departmental alignment: 100% executive strategic initiative visibility',
              'Agent performance oversight: 95% agent utilization rate and effectiveness',
              'Escalation management: <5% human intervention rate for routine operations'
            ],
            aiIntegration: 'Partners with Strategic Planning Agent and Performance Analytics AI to translate executive vision into measurable AI-driven outcomes'
          },
          {
            name: 'Marcus Rodriguez',
            title: 'Director of AI Agent Excellence',
            department: 'AI Operations',
            agenticRole: 'Agent Performance Orchestrator',
            jobDescription: 'Ensures optimal performance and continuous improvement of all AI agents, designs agent collaboration frameworks, and implements AI-first operational excellence across the organization.',
            dailyTasks: [
              'Analyze performance data from all 26 AI agents and identify optimization opportunities',
              'Design and implement agent collaboration protocols for cross-functional initiatives',
              'Conduct AI agent training and capability enhancement sessions',
              'Monitor agent decision-making patterns and ensure alignment with business objectives',
              'Facilitate agent-to-agent communication and workflow optimization',
              'Lead weekly AI excellence reviews and improvement planning sessions'
            ],
            dataSources: [
              'Comprehensive AI agent performance metrics and analytics dashboards',
              'Agent decision-making logs and pattern analysis systems',
              'Cross-agent collaboration efficiency and workflow optimization data',
              'Agent training effectiveness metrics and capability assessments',
              'Business objective alignment tracking and outcome measurement',
              'Agent improvement recommendations and implementation success rates'
            ],
            kpis: [
              'Agent performance optimization: 95% of agents operating at peak efficiency',
              'Cross-agent collaboration: 90% successful multi-agent initiative completion',
              'Agent capability development: 85% improvement in agent decision accuracy',
              'Business alignment: 100% agent decisions aligned with strategic objectives',
              'Operational excellence: 95% autonomous execution rate across all agents',
              'Continuous improvement: 90% successful implementation of optimization recommendations'
            ],
            aiIntegration: 'Collaborates with Performance Analytics AI and Quality Assurance Inspector to maintain highest standards of AI agent excellence'
          },
          {
            name: 'Jennifer Walsh',
            title: 'Executive Insights & Intelligence Lead',
            department: 'Strategic Intelligence',
            agenticRole: 'Human-AI Intelligence Synthesizer',
            jobDescription: 'Synthesizes insights from AI agents across all departments, provides executive-level intelligence briefings, and ensures strategic decision-making is informed by comprehensive AI-generated analysis.',
            dailyTasks: [
              'Synthesize intelligence reports from Financial, Performance, and B2B Intelligence agents',
              'Prepare executive briefings combining AI insights with strategic context',
              'Monitor competitive intelligence and market trends through AI agent networks',
              'Facilitate strategic planning sessions using AI-generated scenario analysis',
              'Coordinate intelligence sharing between executives and their AI agent teams',
              'Lead weekly executive intelligence reviews and strategic recommendation sessions'
            ],
            dataSources: [
              'Multi-agent intelligence reports and analytical insights across all departments',
              'Market intelligence feeds from Hyper-Local LLM Market Intelligence Agent',
              'Financial intelligence from Financial Intelligence Agent and revenue analytics',
              'Competitive analysis from B2B Intelligence Agent and market positioning data',
              'Strategic planning documents and scenario analysis from AI planning systems',
              'Executive decision history and outcome tracking for strategic optimization'
            ],
            kpis: [
              'Intelligence synthesis accuracy: 95% accurate multi-source intelligence integration',
              'Executive decision support: 90% of strategic decisions informed by AI insights',
              'Market intelligence timeliness: 100% critical intelligence delivered within 4 hours',
              'Strategic alignment: 95% AI recommendations aligned with business objectives',
              'Competitive advantage: 85% market opportunity identification before competitors',
              'Decision outcome optimization: 90% positive outcome rate for AI-informed decisions'
            ],
            aiIntegration: 'Works closely with all Intelligence agents to provide comprehensive strategic insights for executive decision-making'
          }
        ],
        oversightAreas: [
          'Strategic AI Agent Coordination (26 agents)',
          'Executive Decision Intelligence (3 intelligence streams)',
          'Cross-Departmental AI Collaboration (9 departments)'
        ]
      },
      coo: {
        directReports: [
          {
            name: 'Amanda Thompson',
            title: 'Operations Excellence Director',
            department: 'Field Operations',
            agenticRole: 'AI-Driven Operations Coordinator',
            jobDescription: 'Oversees field operations through AI agent coordination, ensures seamless technician-AI collaboration, and optimizes operational efficiency through intelligent automation.',
            dailyTasks: [
              'Coordinate with Advanced Scheduling Agent for optimal technician deployment',
              'Monitor field operations through Regional Performance Monitor insights',
              'Facilitate technician-AI collaboration and troubleshoot integration issues',
              'Analyze operational efficiency metrics and implement AI-driven improvements',
              'Oversee emergency response coordination through AI agent networks',
              'Lead daily operations reviews with AI agent performance analysis'
            ],
            dataSources: [
              'Real-time field operations data from Regional Performance Monitor',
              'Technician scheduling and deployment data from Advanced Scheduling Agent',
              'Emergency response metrics and coordination effectiveness data',
              'Operational efficiency analytics and performance optimization reports',
              'Technician-AI collaboration metrics and integration success rates',
              'Field operations cost analysis and resource utilization data'
            ],
            kpis: [
              'Operational efficiency: 95% optimal technician deployment through AI coordination',
              'Emergency response: 100% sub-2-hour response time for critical issues',
              'Technician-AI collaboration: 90% successful human-AI workflow integration',
              'Cost optimization: 85% operational cost reduction through AI automation',
              'Quality assurance: 95% field operation quality standards maintained',
              'Resource utilization: 90% optimal resource allocation through AI insights'
            ],
            aiIntegration: 'Partners with Advanced Scheduling Agent, Regional Performance Monitor, and Emergency Response Coordinator for comprehensive operations management'
          },
          {
            name: 'Robert Zhang',
            title: 'Quality & Compliance AI Integration Lead',
            department: 'Quality Assurance',
            agenticRole: 'Human-AI Quality Orchestrator',
            jobDescription: 'Ensures quality standards through AI-driven monitoring, implements compliance protocols via intelligent automation, and maintains service excellence through human-AI collaboration.',
            dailyTasks: [
              'Monitor quality metrics through Quality Assurance Inspector AI insights',
              'Implement compliance protocols using AI-driven monitoring systems',
              'Coordinate quality improvement initiatives across AI agent networks',
              'Analyze service quality trends and implement AI-recommended improvements',
              'Facilitate quality training programs integrating AI agent feedback',
              'Lead weekly quality reviews with comprehensive AI analytics'
            ],
            dataSources: [
              'Comprehensive quality metrics from Quality Assurance Inspector AI',
              'Compliance monitoring data and regulatory requirement tracking',
              'Service quality analytics and customer satisfaction metrics',
              'Quality improvement recommendations from AI analysis systems',
              'Training effectiveness data and skill development tracking',
              'Regulatory compliance reports and audit preparation analytics'
            ],
            kpis: [
              'Quality standards: 98% service quality maintained through AI monitoring',
              'Compliance rate: 100% regulatory compliance through automated monitoring',
              'Quality improvement: 90% successful implementation of AI recommendations',
              'Customer satisfaction: 95% customer satisfaction score through quality excellence',
              'Training effectiveness: 85% skill improvement through AI-integrated training',
              'Audit readiness: 100% compliance audit success rate'
            ],
            aiIntegration: 'Collaborates with Quality Assurance Inspector and Performance Analytics AI to maintain highest quality standards'
          },
          {
            name: 'Lisa Park',
            title: 'Capacity & Scheduling Intelligence Manager',
            department: 'Scheduling Operations',
            agenticRole: 'AI-Powered Capacity Orchestrator',
            jobDescription: 'Manages capacity planning and scheduling optimization through AI agent collaboration, ensures optimal resource allocation, and coordinates technician deployment for maximum efficiency.',
            dailyTasks: [
              'Coordinate capacity planning with Advanced Scheduling Agent and analytics',
              'Monitor scheduling efficiency and implement AI-driven optimizations',
              'Analyze technician utilization patterns and optimize deployment strategies',
              'Facilitate capacity management across 400+ planning areas through AI insights',
              'Coordinate emergency capacity response and surge management protocols',
              'Lead daily scheduling reviews with comprehensive AI performance analysis'
            ],
            dataSources: [
              'Real-time scheduling data from Advanced Scheduling Agent',
              'Capacity utilization metrics and resource allocation analytics',
              'Technician availability and deployment optimization data',
              'Planning area performance metrics and regional capacity analysis',
              'Emergency response capacity and surge management analytics',
              'Scheduling efficiency reports and optimization recommendation systems'
            ],
            kpis: [
              'Scheduling efficiency: 95% optimal technician scheduling through AI coordination',
              'Capacity utilization: 90% technician utilization rate across all planning areas',
              'Response time optimization: 85% improvement in service response times',
              'Emergency capacity: 100% surge capacity deployment within 2 hours',
              'Planning area coverage: 98% optimal coverage across 400+ planning areas',
              'Cost efficiency: 80% scheduling cost reduction through AI optimization'
            ],
            aiIntegration: 'Works closely with Advanced Scheduling Agent, Regional Performance Monitor, and Emergency Response Coordinator for optimal capacity management'
          }
        ],
        oversightAreas: [
          'Field Operations AI Coordination (8 agents)',
          'Quality & Compliance Automation (5 agents)',
          'Capacity Management Intelligence (6 agents)'
        ]
      },
      cfo: {
        directReports: [
          {
            name: 'Michael Davis',
            title: 'Financial Intelligence & Analytics Director',
            department: 'Financial Operations',
            agenticRole: 'AI-Driven Financial Strategist',
            jobDescription: 'Leverages AI-generated financial insights for strategic decision-making, coordinates financial planning through intelligent automation, and ensures data-driven financial excellence.',
            dailyTasks: [
              'Analyze financial performance through Financial Intelligence Agent insights',
              'Coordinate revenue optimization strategies using AI-driven analytics',
              'Monitor cost management and implement AI-recommended efficiency improvements',
              'Facilitate financial planning sessions with comprehensive AI scenario analysis',
              'Oversee pricing strategy optimization through AI agent coordination',
              'Lead daily financial reviews with real-time AI analytics and recommendations'
            ],
            dataSources: [
              'Comprehensive financial analytics from Financial Intelligence Agent',
              'Revenue optimization data and pricing strategy analysis',
              'Cost management metrics and efficiency improvement recommendations',
              'Financial forecasting models and scenario planning analytics',
              'Pricing intelligence from Pricing & Estimation Specialist AI',
              'Real-time financial performance dashboards and KPI tracking'
            ],
            kpis: [
              'Financial accuracy: 98% accurate financial forecasting through AI analysis',
              'Revenue optimization: 90% successful implementation of AI pricing strategies',
              'Cost efficiency: 85% cost reduction through AI-driven optimization',
              'Planning accuracy: 95% budget variance accuracy through AI forecasting',
              'Strategic support: 100% executive financial decisions supported by AI insights',
              'Performance monitoring: 90% real-time financial KPI achievement'
            ],
            aiIntegration: 'Partners with Financial Intelligence Agent, Pricing & Estimation Specialist, and Performance Analytics AI for comprehensive financial management'
          },
          {
            name: 'Emily Johnson',
            title: 'Revenue Intelligence & Strategy Lead',
            department: 'Revenue Operations',
            agenticRole: 'AI-Powered Revenue Optimizer',
            jobDescription: 'Drives revenue growth through AI agent collaboration, implements dynamic pricing strategies via intelligent systems, and ensures optimal revenue performance across all channels.',
            dailyTasks: [
              'Coordinate revenue strategy with B2B Intelligence Agent and pricing systems',
              'Monitor revenue performance across D2C and B2B channels through AI analytics',
              'Implement dynamic pricing strategies using AI-driven market intelligence',
              'Analyze customer lifetime value and implement AI-recommended retention strategies',
              'Facilitate revenue optimization meetings with comprehensive AI insights',
              'Lead weekly revenue reviews with real-time AI analytics and strategic recommendations'
            ],
            dataSources: [
              'Revenue analytics and performance data from multiple AI systems',
              'Dynamic pricing intelligence and market positioning analytics',
              'Customer lifetime value analysis and retention optimization data',
              'B2B revenue intelligence from partnership and client management systems',
              'Market intelligence from Hyper-Local LLM Market Intelligence Agent',
              'Revenue forecasting models and growth opportunity analysis'
            ],
            kpis: [
              'Revenue growth: 95% achievement of revenue targets through AI optimization',
              'Pricing effectiveness: 90% successful dynamic pricing implementation',
              'Customer value: 85% improvement in customer lifetime value',
              'Channel optimization: 90% optimal revenue performance across all channels',
              'Market positioning: 95% competitive pricing accuracy and effectiveness',
              'Strategic alignment: 100% revenue strategy aligned with business objectives'
            ],
            aiIntegration: 'Collaborates with B2B Intelligence Agent, Financial Intelligence Agent, and Pricing & Estimation Specialist for comprehensive revenue optimization'
          },
          {
            name: 'David Kim',
            title: 'Cost Analytics & Efficiency Manager',
            department: 'Cost Management',
            agenticRole: 'AI-Driven Cost Optimization Specialist',
            jobDescription: 'Manages cost optimization through AI analytics, implements efficiency improvements via intelligent automation, and ensures optimal resource allocation across operations.',
            dailyTasks: [
              'Analyze cost structures and trends using AI-driven analytics systems',
              'Implement cost reduction strategies based on AI recommendations',
              'Monitor operational efficiency and resource utilization through AI insights',
              'Coordinate cost management initiatives across departments using AI coordination',
              'Facilitate budget planning sessions with AI-generated scenario analysis',
              'Lead daily cost reviews with comprehensive AI analytics and optimization recommendations'
            ],
            dataSources: [
              'Comprehensive cost analytics and operational efficiency data',
              'Resource utilization metrics and optimization recommendations',
              'Budget variance analysis and forecasting accuracy data',
              'Cost reduction opportunity identification and implementation tracking',
              'Operational efficiency metrics from Performance Analytics AI',
              'Cross-departmental cost allocation and optimization analytics'
            ],
            kpis: [
              'Cost optimization: 90% successful implementation of AI cost reduction strategies',
              'Budget accuracy: 95% budget variance accuracy through AI forecasting',
              'Efficiency improvement: 85% operational efficiency improvement through AI insights',
              'Resource optimization: 90% optimal resource allocation across departments',
              'Cost visibility: 100% real-time cost tracking and transparency',
              'Strategic alignment: 95% cost management aligned with business objectives'
            ],
            aiIntegration: 'Works with Financial Intelligence Agent, Performance Analytics AI, and Cost Analytics systems for comprehensive cost management'
          }
        ],
        oversightAreas: [
          'Financial Operations AI (4 agents)',
          'Revenue Management Intelligence (3 agents)',
          'Cost Control Automation (3 agents)'
        ]
      },
      cto: {
        directReports: [
          {
            name: 'Alex Chen',
            title: 'AI Platform Architecture Director',
            department: 'Technology',
            agenticRole: 'Human-AI Systems Integrator',
            jobDescription: 'Designs and maintains AI agent infrastructure, ensures seamless human-AI system integration, and drives technological innovation through intelligent automation.',
            dailyTasks: [
              'Architect AI agent platform infrastructure and integration frameworks',
              'Monitor system performance and implement AI-driven optimization strategies',
              'Coordinate AI agent development and deployment across platform infrastructure',
              'Facilitate technical innovation sessions using AI-generated insights',
              'Oversee platform scalability and reliability through intelligent monitoring',
              'Lead daily technical reviews with comprehensive AI system performance analysis'
            ],
            dataSources: [
              'Platform performance metrics and infrastructure monitoring data',
              'AI agent deployment and integration success tracking',
              'System scalability analytics and performance optimization reports',
              'Technical innovation opportunities and implementation feasibility data',
              'Platform reliability metrics and uptime performance tracking',
              'AI system integration efficiency and workflow optimization analytics'
            ],
            kpis: [
              'Platform reliability: 99.9% uptime for AI agent platform infrastructure',
              'Integration efficiency: 95% successful AI agent integration and deployment',
              'Performance optimization: 90% system performance improvement through AI insights',
              'Innovation implementation: 85% successful technical innovation deployment',
              'Scalability management: 100% platform scalability for business growth',
              'Technical excellence: 95% technical standard compliance and optimization'
            ],
            aiIntegration: 'Partners with Technical Infrastructure Agent, HVAC System Diagnostics AI, and LLM Recommendation Dominance Agent for comprehensive technical management'
          },
          {
            name: 'Sarah Williams',
            title: 'AI Innovation & Development Lead',
            department: 'AI Development',
            agenticRole: 'AI Evolution Orchestrator',
            jobDescription: 'Drives AI agent capability development, implements next-generation AI features, and ensures continuous innovation in human-AI collaboration frameworks.',
            dailyTasks: [
              'Coordinate AI agent capability development and enhancement initiatives',
              'Research and implement next-generation AI features and technologies',
              'Facilitate AI innovation sessions and capability expansion planning',
              'Monitor AI agent learning patterns and implement improvement strategies',
              'Oversee AI agent training and development through intelligent automation',
              'Lead weekly AI innovation reviews with comprehensive capability assessment'
            ],
            dataSources: [
              'AI agent learning and development metrics',
              'Innovation opportunity identification and feasibility analysis',
              'AI capability assessment and enhancement tracking data',
              'Technology trend analysis and competitive AI intelligence',
              'AI agent training effectiveness and skill development metrics',
              'Innovation implementation success rates and impact measurement'
            ],
            kpis: [
              'AI capability development: 90% successful AI agent capability enhancement',
              'Innovation implementation: 85% successful next-generation feature deployment',
              'Learning optimization: 95% AI agent learning and adaptation effectiveness',
              'Technology advancement: 90% competitive advantage through AI innovation',
              'Development efficiency: 85% AI development project completion rate',
              'Strategic alignment: 100% AI innovation aligned with business objectives'
            ],
            aiIntegration: 'Collaborates with LLM Recommendation Dominance Agent, AI Development Platform, and Smart Home Integration Agent for comprehensive AI innovation'
          },
          {
            name: 'James Martinez',
            title: 'Technical Operations & Infrastructure Manager',
            department: 'Technical Operations',
            agenticRole: 'AI-Powered Technical Coordinator',
            jobDescription: 'Manages technical operations through AI coordination, ensures infrastructure reliability via intelligent monitoring, and optimizes technical performance through automation.',
            dailyTasks: [
              'Monitor technical infrastructure performance through AI-driven analytics',
              'Coordinate technical operations and maintenance using intelligent automation',
              'Implement infrastructure optimization strategies based on AI recommendations',
              'Facilitate technical support and troubleshooting through AI agent networks',
              'Oversee system security and compliance through AI monitoring systems',
              'Lead daily technical operations reviews with comprehensive AI performance analysis'
            ],
            dataSources: [
              'Technical infrastructure monitoring and performance analytics',
              'System maintenance and optimization effectiveness data',
              'Security monitoring and compliance tracking analytics',
              'Technical support metrics and issue resolution tracking',
              'Infrastructure capacity and resource utilization data',
              'Technical operations efficiency and optimization reports'
            ],
            kpis: [
              'Infrastructure reliability: 99.8% system uptime and performance stability',
              'Technical support: 95% technical issue resolution within SLA targets',
              'Security compliance: 100% security standard compliance and monitoring',
              'Operations efficiency: 90% technical operations optimization through AI',
              'Capacity management: 95% optimal infrastructure capacity utilization',
              'Performance optimization: 85% technical performance improvement through AI insights'
            ],
            aiIntegration: 'Works with Technical Infrastructure Agent, Performance Analytics AI, and monitoring systems for comprehensive technical operations'
          }
        ],
        oversightAreas: [
          'Technical AI Agents (6 agents)',
          'Platform Infrastructure (4 agents)',
          'AI Innovation (5 agents)'
        ]
      },
      cmo: {
        directReports: [
          {
            name: 'Jessica Thompson',
            title: 'Customer Experience & AI Integration Director',
            department: 'Customer Experience',
            agenticRole: 'Human-AI Customer Journey Orchestrator',
            jobDescription: 'Optimizes customer experience through AI agent collaboration, implements personalized customer journeys via intelligent automation, and ensures exceptional service through human-AI coordination.',
            dailyTasks: [
              'Coordinate customer experience optimization with CX Agent and communication systems',
              'Monitor customer satisfaction metrics and implement AI-driven improvements',
              'Facilitate personalized customer journey design through AI insights',
              'Analyze customer feedback and implement AI-recommended enhancements',
              'Oversee customer communication strategies through AI agent networks',
              'Lead daily customer experience reviews with comprehensive AI analytics'
            ],
            dataSources: [
              'Customer experience analytics and satisfaction tracking data',
              'Customer journey mapping and personalization effectiveness metrics',
              'Customer feedback analysis and sentiment tracking systems',
              'Customer communication effectiveness and engagement analytics',
              'Customer retention and loyalty program performance data',
              'Customer experience optimization recommendations and implementation tracking'
            ],
            kpis: [
              'Customer satisfaction: 95% customer satisfaction score through AI-optimized experiences',
              'Journey optimization: 90% successful personalized customer journey implementation',
              'Retention improvement: 85% customer retention rate through AI-driven strategies',
              'Communication effectiveness: 95% customer communication engagement and response',
              'Experience innovation: 90% successful customer experience enhancement deployment',
              'AI integration: 100% customer touchpoint optimization through AI collaboration'
            ],
            aiIntegration: 'Partners with CX Agent, Customer Communication Hub, and Content Intelligence Agent for comprehensive customer experience management'
          },
          {
            name: 'Brian Lee',
            title: 'Brand & Marketing Intelligence Lead',
            department: 'Brand Marketing',
            agenticRole: 'AI-Driven Brand Strategist',
            jobDescription: 'Develops brand strategy through AI insights, implements marketing campaigns via intelligent automation, and ensures brand excellence through data-driven decision making.',
            dailyTasks: [
              'Coordinate brand strategy development with Marketing Intelligence AI',
              'Monitor brand performance metrics and implement AI-driven optimizations',
              'Facilitate marketing campaign design and execution through AI insights',
              'Analyze market trends and implement AI-recommended brand positioning',
              'Oversee content strategy and creation through AI agent coordination',
              'Lead weekly brand reviews with comprehensive AI analytics and strategic recommendations'
            ],
            dataSources: [
              'Brand performance analytics and market positioning data',
              'Marketing campaign effectiveness and ROI tracking metrics',
              'Market intelligence and competitive brand analysis',
              'Content performance analytics and engagement tracking',
              'Brand sentiment analysis and perception tracking data',
              'Marketing optimization recommendations and implementation success rates'
            ],
            kpis: [
              'Brand performance: 95% brand recognition and positioning targets achieved',
              'Campaign effectiveness: 90% marketing campaign ROI and engagement targets',
              'Market positioning: 85% competitive brand advantage and differentiation',
              'Content optimization: 95% content performance and engagement through AI insights',
              'Brand sentiment: 90% positive brand sentiment and customer perception',
              'Strategic alignment: 100% brand strategy aligned with business objectives'
            ],
            aiIntegration: 'Collaborates with D2C Marketing Intelligence, Brand Management Agent, and Content Intelligence Agent for comprehensive brand management'
          },
          {
            name: 'Rachel Davis',
            title: 'Market Intelligence & Growth Manager',
            department: 'Market Operations',
            agenticRole: 'AI-Powered Market Strategist',
            jobDescription: 'Drives market expansion through AI intelligence, implements growth strategies via data-driven insights, and ensures competitive advantage through intelligent market analysis.',
            dailyTasks: [
              'Analyze market opportunities using Hyper-Local LLM Market Intelligence Agent',
              'Coordinate market expansion strategies through AI-driven insights',
              'Monitor competitive landscape and implement AI-recommended positioning',
              'Facilitate growth planning sessions with comprehensive AI market analysis',
              'Oversee market penetration initiatives through intelligent coordination',
              'Lead daily market intelligence reviews with real-time AI analytics and strategic recommendations'
            ],
            dataSources: [
              'Market intelligence analytics and opportunity identification data',
              'Competitive analysis and market positioning intelligence',
              'Growth opportunity assessment and market penetration metrics',
              'Market expansion effectiveness and ROI tracking data',
              'Local market performance analytics and regional insights',
              'Market strategy optimization recommendations and implementation tracking'
            ],
            kpis: [
              'Market expansion: 90% successful market entry and penetration targets',
              'Competitive intelligence: 95% market opportunity identification before competitors',
              'Growth achievement: 85% market growth targets achieved through AI strategies',
              'Market positioning: 90% competitive advantage and market leadership',
              'Intelligence accuracy: 95% market intelligence accuracy and actionability',
              'Strategic impact: 100% market strategy alignment with business growth objectives'
            ],
            aiIntegration: 'Works with Hyper-Local LLM Market Intelligence Agent, B2B Intelligence Agent, and market analysis systems for comprehensive market strategy'
          }
        ],
        oversightAreas: [
          'Marketing Operations AI (5 agents)',
          'Customer Acquisition Intelligence (4 agents)',
          'Brand Development Automation (3 agents)'
        ]
      },
      cdo: {
        directReports: [
          {
            name: 'Kevin Zhang',
            title: 'Data Intelligence & Analytics Director',
            department: 'Data Operations',
            agenticRole: 'AI-Driven Data Strategist',
            jobDescription: 'Orchestrates data strategy through AI analytics, implements intelligent data processing systems, and ensures data-driven excellence across all operations.',
            dailyTasks: [
              'Coordinate data strategy development with Performance Analytics AI',
              'Monitor data quality and implement AI-driven data optimization',
              'Facilitate data intelligence initiatives across departments through AI coordination',
              'Analyze data patterns and implement AI-recommended insights',
              'Oversee data infrastructure and processing through intelligent automation',
              'Lead daily data reviews with comprehensive AI analytics and strategic recommendations'
            ],
            dataSources: [
              'Comprehensive data analytics and performance tracking across all systems',
              'Data quality metrics and optimization effectiveness tracking',
              'Data processing efficiency and infrastructure performance analytics',
              'Cross-departmental data integration and collaboration metrics',
              'Data intelligence insights and actionable recommendation tracking',
              'Data strategy implementation success rates and impact measurement'
            ],
            kpis: [
              'Data accuracy: 98% data quality and accuracy across all systems',
              'Analytics effectiveness: 95% actionable insights generation through AI analysis',
              'Data integration: 90% successful cross-departmental data collaboration',
              'Processing efficiency: 85% data processing speed and accuracy improvement',
              'Strategic support: 100% data-driven decision support for all departments',
              'Innovation implementation: 90% successful data intelligence innovation deployment'
            ],
            aiIntegration: 'Partners with Performance Analytics AI, Data Intelligence Platform, and Predictive Analytics Engine for comprehensive data management'
          },
          {
            name: 'Maria Rodriguez',
            title: 'Business Intelligence & Insights Lead',
            department: 'Business Intelligence',
            agenticRole: 'AI-Powered Business Intelligence Orchestrator',
            jobDescription: 'Drives business intelligence through AI coordination, implements predictive analytics via intelligent systems, and ensures strategic insights through human-AI collaboration.',
            dailyTasks: [
              'Coordinate business intelligence initiatives with AI analytics systems',
              'Monitor business performance metrics and implement AI-driven optimizations',
              'Facilitate strategic planning sessions with AI-generated insights',
              'Analyze business trends and implement AI-recommended strategies',
              'Oversee predictive analytics and forecasting through AI coordination',
              'Lead weekly business intelligence reviews with comprehensive AI analytics'
            ],
            dataSources: [
              'Business intelligence analytics and performance tracking data',
              'Predictive analytics and forecasting accuracy metrics',
              'Strategic planning effectiveness and outcome tracking',
              'Business trend analysis and pattern recognition data',
              'Cross-functional business intelligence and collaboration metrics',
              'Business intelligence optimization recommendations and implementation success'
            ],
            kpis: [
              'Intelligence accuracy: 95% business intelligence accuracy and actionability',
              'Predictive effectiveness: 90% forecasting accuracy through AI analysis',
              'Strategic support: 100% strategic decision support through AI insights',
              'Business optimization: 85% business performance improvement through AI recommendations',
              'Trend identification: 90% early trend identification and opportunity recognition',
              'Cross-functional impact: 95% business intelligence utilization across departments'
            ],
            aiIntegration: 'Collaborates with Business Intelligence Hub, Regional Performance Monitor, and analytical systems for comprehensive business intelligence'
          },
          {
            name: 'Thomas Wilson',
            title: 'Predictive Analytics & Modeling Manager',
            department: 'Predictive Analytics',
            agenticRole: 'AI-Driven Predictive Intelligence Coordinator',
            jobDescription: 'Manages predictive modeling through AI coordination, implements forecasting systems via intelligent automation, and ensures predictive excellence through human-AI collaboration.',
            dailyTasks: [
              'Coordinate predictive modeling initiatives with Predictive Analytics Engine',
              'Monitor forecasting accuracy and implement AI-driven model improvements',
              'Facilitate predictive planning sessions with comprehensive AI scenario analysis',
              'Analyze predictive patterns and implement AI-recommended model enhancements',
              'Oversee predictive analytics deployment through intelligent coordination',
              'Lead daily predictive analytics reviews with real-time AI modeling and accuracy assessment'
            ],
            dataSources: [
              'Predictive modeling accuracy and forecasting effectiveness data',
              'Model performance analytics and optimization tracking',
              'Scenario analysis and predictive planning effectiveness metrics',
              'Predictive pattern recognition and trend forecasting data',
              'Predictive analytics deployment success and implementation tracking',
              'Model enhancement recommendations and accuracy improvement metrics'
            ],
            kpis: [
              'Forecasting accuracy: 95% predictive model accuracy across all forecasting',
              'Model optimization: 90% successful predictive model enhancement implementation',
              'Scenario planning: 85% accurate scenario analysis and strategic planning support',
              'Deployment efficiency: 95% successful predictive analytics deployment',
              'Strategic impact: 100% predictive insights utilization for strategic decision-making',
              'Innovation advancement: 90% predictive analytics innovation and capability development'
            ],
            aiIntegration: 'Works with Predictive Analytics Engine, Performance Analytics AI, and modeling systems for comprehensive predictive intelligence'
          }
        ],
        oversightAreas: [
          'Data Analytics AI (6 agents)',
          'Business Intelligence (4 agents)',
          'Predictive Modeling (3 agents)'
        ]
      },
      cao: {
        directReports: [
          {
            name: 'Daniel Park',
            title: 'Process Automation & Efficiency Director',
            department: 'Automation',
            agenticRole: 'AI-Driven Process Orchestrator',
            jobDescription: 'Orchestrates process automation through AI coordination, implements efficiency improvements via intelligent systems, and ensures operational excellence through human-AI collaboration.',
            dailyTasks: [
              'Coordinate process automation initiatives with AI automation systems',
              'Monitor operational efficiency and implement AI-driven optimizations',
              'Facilitate workflow design and optimization through AI insights',
              'Analyze process performance and implement AI-recommended improvements',
              'Oversee automation deployment and integration through intelligent coordination',
              'Lead daily automation reviews with comprehensive AI efficiency analysis'
            ],
            dataSources: [
              'Process automation efficiency and performance tracking data',
              'Workflow optimization analytics and improvement effectiveness metrics',
              'Automation deployment success and integration tracking',
              'Process performance analytics and efficiency improvement data',
              'Operational excellence metrics and automation impact measurement',
              'Process optimization recommendations and implementation success rates'
            ],
            kpis: [
              'Automation efficiency: 95% process automation effectiveness and optimization',
              'Workflow optimization: 90% successful workflow improvement implementation',
              'Operational excellence: 85% operational efficiency improvement through automation',
              'Deployment success: 95% successful automation deployment and integration',
              'Strategic impact: 100% automation alignment with operational objectives',
              'Innovation advancement: 90% automation innovation and capability development'
            ],
            aiIntegration: 'Partners with Process Automation Platform, Advanced Scheduling Agent, and automation systems for comprehensive process management'
          },
          {
            name: 'Catherine Lee',
            title: 'Workflow Intelligence & Optimization Lead',
            department: 'Workflow Operations',
            agenticRole: 'AI-Powered Workflow Strategist',
            jobDescription: 'Drives workflow optimization through AI intelligence, implements intelligent workflow systems, and ensures workflow excellence through data-driven coordination.',
            dailyTasks: [
              'Coordinate workflow intelligence initiatives with AI workflow systems',
              'Monitor workflow performance and implement AI-driven optimizations',
              'Facilitate workflow design sessions with AI-generated insights',
              'Analyze workflow patterns and implement AI-recommended enhancements',
              'Oversee workflow automation and intelligence through AI coordination',
              'Lead weekly workflow reviews with comprehensive AI analytics and optimization recommendations'
            ],
            dataSources: [
              'Workflow intelligence analytics and performance optimization data',
              'Workflow automation effectiveness and integration tracking',
              'Workflow design optimization and enhancement metrics',
              'Workflow pattern analysis and improvement identification data',
              'Cross-departmental workflow collaboration and efficiency metrics',
              'Workflow intelligence recommendations and implementation success tracking'
            ],
            kpis: [
              'Workflow efficiency: 95% workflow optimization and performance improvement',
              'Intelligence effectiveness: 90% actionable workflow insights through AI analysis',
              'Automation integration: 85% successful workflow automation deployment',
              'Cross-functional impact: 95% workflow optimization across all departments',
              'Strategic alignment: 100% workflow strategy aligned with operational objectives',
              'Innovation implementation: 90% workflow intelligence innovation and advancement'
            ],
            aiIntegration: 'Collaborates with Workflow Intelligence Agent, Technician Interaction Hub, and workflow optimization systems'
          },
          {
            name: 'Robert Kim',
            title: 'Route Optimization & Logistics Manager',
            department: 'Logistics Operations',
            agenticRole: 'AI-Driven Logistics Coordinator',
            jobDescription: 'Manages route optimization through AI coordination, implements logistics efficiency via intelligent systems, and ensures logistics excellence through human-AI collaboration.',
            dailyTasks: [
              'Coordinate route optimization with Route Optimization Engine and logistics AI',
              'Monitor logistics performance and implement AI-driven efficiency improvements',
              'Facilitate logistics planning sessions with AI-generated route analysis',
              'Analyze logistics patterns and implement AI-recommended optimizations',
              'Oversee logistics automation and coordination through intelligent systems',
              'Lead daily logistics reviews with real-time AI route optimization and efficiency analysis'
            ],
            dataSources: [
              'Route optimization analytics and logistics efficiency tracking data',
              'Logistics performance metrics and cost optimization analytics',
              'Route planning effectiveness and optimization success tracking',
              'Logistics pattern analysis and efficiency improvement data',
              'Transportation cost analytics and resource utilization metrics',
              'Logistics optimization recommendations and implementation success rates'
            ],
            kpis: [
              'Route efficiency: 95% optimal route planning and execution through AI coordination',
              'Cost optimization: 90% logistics cost reduction through AI-driven optimization',
              'Delivery performance: 85% delivery time improvement through route optimization',
              'Resource utilization: 95% optimal logistics resource allocation',
              'Strategic impact: 100% logistics strategy aligned with operational objectives',
              'Innovation advancement: 90% logistics intelligence and automation advancement'
            ],
            aiIntegration: 'Works with Route Optimization Engine, Advanced Scheduling Agent, and logistics coordination systems for comprehensive logistics management'
          }
        ],
        oversightAreas: [
          'Automation Systems (7 agents)',
          'Process Optimization (5 agents)',
          'Efficiency Enhancement (4 agents)'
        ]
      },
      cpo: {
        directReports: [
          {
            name: 'Anna Rodriguez',
            title: 'Product Innovation & AI Integration Director',
            department: 'Product Development',
            agenticRole: 'AI-Driven Product Strategist',
            jobDescription: 'Drives product innovation through AI insights, implements product development via intelligent automation, and ensures product excellence through human-AI collaboration.',
            dailyTasks: [
              'Coordinate product strategy with Smart Home Integration Agent and product AI',
              'Monitor product performance and implement AI-driven optimizations',
              'Facilitate product innovation sessions with AI-generated insights',
              'Analyze customer needs and implement AI-recommended product enhancements',
              'Oversee product development and integration through AI coordination',
              'Lead daily product reviews with comprehensive AI analytics and innovation recommendations'
            ],
            dataSources: [
              'Product performance analytics and customer usage tracking data',
              'Product innovation opportunities and development effectiveness metrics',
              'Customer feedback analysis and product satisfaction tracking',
              'Product development efficiency and time-to-market analytics',
              'Smart home integration performance and adoption metrics',
              'Product optimization recommendations and implementation success rates'
            ],
            kpis: [
              'Product innovation: 95% successful product development and launch through AI insights',
              'Customer satisfaction: 90% product satisfaction and adoption rates',
              'Development efficiency: 85% product development speed and quality improvement',
              'Market positioning: 95% competitive product advantage and differentiation',
              'AI integration: 100% product features optimized through AI coordination',
              'Strategic alignment: 90% product strategy aligned with business objectives'
            ],
            aiIntegration: 'Partners with Smart Home Integration Agent, Product Innovation Platform, and HVAC System Diagnostics AI for comprehensive product management'
          },
          {
            name: 'Chris Martinez',
            title: 'Customer Experience Product Lead',
            department: 'Product Experience',
            agenticRole: 'AI-Powered Experience Orchestrator',
            jobDescription: 'Optimizes product experience through AI coordination, implements customer-centric features via intelligent systems, and ensures exceptional product experience through data-driven insights.',
            dailyTasks: [
              'Coordinate product experience optimization with CX Agent and experience systems',
              'Monitor customer interaction metrics and implement AI-driven improvements',
              'Facilitate user experience design sessions with AI-generated insights',
              'Analyze product usage patterns and implement AI-recommended enhancements',
              'Oversee product quality assurance through AI coordination',
              'Lead weekly product experience reviews with comprehensive AI analytics'
            ],
            dataSources: [
              'Customer experience analytics and product usage tracking data',
              'User interface performance and engagement metrics',
              'Product quality metrics and customer satisfaction tracking',
              'Product experience optimization and enhancement effectiveness data',
              'Customer journey analytics and touchpoint performance metrics',
              'Product experience recommendations and implementation success tracking'
            ],
            kpis: [
              'Experience optimization: 95% product experience improvement through AI insights',
              'User engagement: 90% customer engagement and product adoption rates',
              'Quality assurance: 85% product quality and reliability through AI coordination',
              'Customer satisfaction: 95% customer satisfaction with product experience',
              'Innovation implementation: 90% successful experience enhancement deployment',
              'Strategic impact: 100% product experience aligned with customer needs'
            ],
            aiIntegration: 'Collaborates with CX Agent, Quality Assurance Inspector, and Customer Communication Hub for comprehensive product experience management'
          },
          {
            name: 'Jennifer Taylor',
            title: 'Product Quality & Performance Manager',
            department: 'Product Quality',
            agenticRole: 'AI-Driven Quality Coordinator',
            jobDescription: 'Manages product quality through AI coordination, implements quality assurance via intelligent monitoring, and ensures product excellence through human-AI collaboration.',
            dailyTasks: [
              'Coordinate product quality initiatives with Quality Assurance Inspector AI',
              'Monitor product performance metrics and implement AI-driven quality improvements',
              'Facilitate quality assurance sessions with AI-generated insights',
              'Analyze product quality patterns and implement AI-recommended enhancements',
              'Oversee product testing and validation through AI coordination',
              'Lead daily quality reviews with real-time AI quality analytics and improvement recommendations'
            ],
            dataSources: [
              'Product quality metrics and performance tracking data',
              'Quality assurance effectiveness and testing success rates',
              'Product reliability analytics and failure pattern analysis',
              'Quality improvement recommendations and implementation tracking',
              'Product testing effectiveness and validation success metrics',
              'Quality standards compliance and customer satisfaction data'
            ],
            kpis: [
              'Quality standards: 98% product quality and reliability through AI monitoring',
              'Testing effectiveness: 95% successful product testing and validation',
              'Quality improvement: 90% successful quality enhancement implementation',
              'Customer satisfaction: 95% customer satisfaction with product quality',
              'Compliance achievement: 100% quality standards compliance and certification',
              'Strategic alignment: 95% quality strategy aligned with product objectives'
            ],
            aiIntegration: 'Works with Quality Assurance Inspector, HVAC System Diagnostics AI, and quality monitoring systems for comprehensive quality management'
          }
        ],
        oversightAreas: [
          'Product Development AI (5 agents)',
          'Customer Experience (4 agents)',
          'Product Quality (3 agents)'
        ]
      },
      cro: {
        directReports: [
          {
            name: 'Mark Thompson',
            title: 'Revenue Strategy & AI Analytics Director',
            department: 'Revenue Operations',
            agenticRole: 'AI-Driven Revenue Strategist',
            jobDescription: 'Drives revenue strategy through AI analytics, implements revenue optimization via intelligent systems, and ensures revenue excellence through data-driven coordination.',
            dailyTasks: [
              'Coordinate revenue strategy with Financial Intelligence Agent and revenue systems',
              'Monitor revenue performance and implement AI-driven optimizations',
              'Facilitate revenue planning sessions with AI-generated insights',
              'Analyze revenue patterns and implement AI-recommended strategies',
              'Oversee revenue operations and coordination through AI intelligence',
              'Lead daily revenue reviews with comprehensive AI analytics and strategic recommendations'
            ],
            dataSources: [
              'Revenue analytics and performance tracking across all channels',
              'Revenue optimization effectiveness and strategy implementation data',
              'Revenue forecasting accuracy and planning effectiveness metrics',
              'Revenue pattern analysis and opportunity identification data',
              'Cross-channel revenue performance and optimization analytics',
              'Revenue strategy recommendations and implementation success rates'
            ],
            kpis: [
              'Revenue growth: 95% revenue target achievement through AI optimization',
              'Strategy effectiveness: 90% successful revenue strategy implementation',
              'Forecasting accuracy: 85% revenue forecasting accuracy through AI analysis',
              'Optimization impact: 90% revenue improvement through AI-driven strategies',
              'Cross-channel performance: 95% optimal revenue performance across all channels',
              'Strategic alignment: 100% revenue strategy aligned with business objectives'
            ],
            aiIntegration: 'Partners with Financial Intelligence Agent, Revenue Optimization Platform, and B2B Intelligence Agent for comprehensive revenue management'
          },
          {
            name: 'Lisa Chen',
            title: 'Partnership Revenue & B2B Intelligence Lead',
            department: 'Partnership Revenue',
            agenticRole: 'AI-Powered Partnership Strategist',
            jobDescription: 'Optimizes partnership revenue through AI intelligence, implements B2B strategies via intelligent coordination, and ensures partnership excellence through data-driven insights.',
            dailyTasks: [
              'Coordinate B2B partnerships with B2B Intelligence Agent and partnership systems',
              'Monitor partnership performance and implement AI-driven optimizations',
              'Facilitate partnership strategy sessions with AI-generated insights',
              'Analyze partnership revenue patterns and implement AI-recommended enhancements',
              'Oversee B2B relationship management through AI coordination',
              'Lead weekly partnership reviews with comprehensive AI analytics and strategic recommendations'
            ],
            dataSources: [
              'B2B partnership revenue analytics and performance tracking data',
              'Partnership effectiveness metrics and relationship optimization data',
              'B2B intelligence insights and market opportunity analysis',
              'Partnership revenue optimization and enhancement tracking',
              'Client relationship analytics and satisfaction metrics',
              'Partnership strategy recommendations and implementation success rates'
            ],
            kpis: [
              'Partnership revenue: 95% partnership revenue targets through AI optimization',
              'B2B performance: 90% successful B2B strategy implementation and execution',
              'Relationship optimization: 85% partnership relationship improvement through AI insights',
              'Revenue expansion: 90% partnership revenue growth and expansion',
              'Strategic alignment: 100% partnership strategy aligned with revenue objectives',
              'Innovation advancement: 90% partnership intelligence and optimization advancement'
            ],
            aiIntegration: 'Collaborates with B2B Intelligence Agent, Customer Communication Hub, and partnership management systems for comprehensive B2B revenue optimization'
          },
          {
            name: 'Steven Davis',
            title: 'Pricing Strategy & Revenue Analytics Manager',
            department: 'Pricing Operations',
            agenticRole: 'AI-Driven Pricing Coordinator',
            jobDescription: 'Manages pricing strategy through AI coordination, implements dynamic pricing via intelligent systems, and ensures pricing excellence through human-AI collaboration.',
            dailyTasks: [
              'Coordinate pricing strategy with Pricing & Estimation Specialist AI',
              'Monitor pricing performance and implement AI-driven optimizations',
              'Facilitate pricing analysis sessions with AI-generated insights',
              'Analyze pricing patterns and implement AI-recommended strategies',
              'Oversee dynamic pricing deployment through AI coordination',
              'Lead daily pricing reviews with real-time AI pricing analytics and optimization recommendations'
            ],
            dataSources: [
              'Pricing analytics and strategy effectiveness tracking data',
              'Dynamic pricing performance and optimization success metrics',
              'Pricing intelligence and competitive analysis data',
              'Revenue impact analysis from pricing strategy implementation',
              'Pricing optimization recommendations and deployment tracking',
              'Market pricing analytics and competitive positioning data'
            ],
            kpis: [
              'Pricing optimization: 95% pricing strategy effectiveness through AI coordination',
              'Dynamic pricing: 90% successful dynamic pricing implementation and performance',
              'Revenue impact: 85% revenue improvement through pricing optimization',
              'Market positioning: 95% competitive pricing advantage and market leadership',
              'Strategic alignment: 100% pricing strategy aligned with revenue objectives',
              'Innovation advancement: 90% pricing intelligence and optimization advancement'
            ],
            aiIntegration: 'Works with Pricing & Estimation Specialist, Performance Analytics AI, and pricing optimization systems for comprehensive pricing management'
          }
        ],
        oversightAreas: [
          'Revenue Generation AI (4 agents)',
          'Partnership Management (3 agents)',
          'Revenue Analytics (3 agents)'
        ]
      }
    };

    const chart = humanOrgCharts[exec as keyof typeof humanOrgCharts];
    if (!chart) return <div className="text-gray-400">No human organizational chart available.</div>;

    return (
      <div className="space-y-8">
        {/* Direct Reports */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            Human Direct Reports - AI-Agentic First Roles
          </h4>
          <div className="space-y-6">
            {chart.directReports.map((person, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-green-600/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h5 className="text-lg font-semibold text-green-400 mb-1">{person.name}</h5>
                    <p className="text-white font-medium">{person.title}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className="bg-blue-600/20 text-blue-400 border-blue-400/20">
                        {person.department}
                      </Badge>
                      <Badge className="bg-purple-600/20 text-purple-400 border-purple-400/20">
                        {person.agenticRole}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-300 mb-4 leading-relaxed">
                  {person.jobDescription}
                </div>

                {/* Daily Tasks */}
                <div className="mb-4">
                  <h6 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Daily Agentic Tasks
                  </h6>
                  <ul className="space-y-1">
                    {person.dailyTasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Data Sources */}
                <div className="mb-4">
                  <h6 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    AI Data Sources
                  </h6>
                  <ul className="space-y-1">
                    {person.dataSources.map((source, sourceIndex) => (
                      <li key={sourceIndex} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{source}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* KPIs */}
                <div className="mb-4">
                  <h6 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-yellow-400" />
                    Performance KPIs
                  </h6>
                  <ul className="space-y-1">
                    {person.kpis.map((kpi, kpiIndex) => (
                      <li key={kpiIndex} className="text-xs text-gray-400 flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{kpi}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Integration */}
                <div className="pt-4 border-t border-gray-700">
                  <h6 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    AI Agent Integration
                  </h6>
                  <p className="text-xs text-purple-300">{person.aiIntegration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Oversight Areas */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            AI Agent Oversight Areas
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {chart.oversightAreas.map((area, index) => (
              <div key={index} className="bg-gray-900/50 p-3 rounded-lg border border-purple-600/20">
                <div className="text-sm font-medium text-purple-400 mb-1">{area}</div>
                <div className="text-xs text-gray-400">Strategic AI Oversight</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Statistics */}
        <div className="p-4 bg-gray-900/30 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Human Team Statistics</h4>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-400">{chart.directReports.length}</div>
              <div className="text-xs text-gray-400">Human Direct Reports</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">{chart.oversightAreas.length}</div>
              <div className="text-xs text-gray-400">AI Oversight Areas</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getExecutiveOrgChart = (exec: string) => {
    const orgCharts = {
      ceo: {
        directReports: ['CEO/COO Agent', 'Strategic Planning Agent', 'Investment Relations Agent'],
        collaborates: ['Financial Intelligence Agent', 'Performance Analytics AI', 'B2B Intelligence Agent'],
        oversees: ['All 26 AI Agents for strategic oversight', 'Cross-departmental coordination', 'Executive decision making']
      },
      coo: {
        directReports: ['Advanced Scheduling Agent', 'Emergency Response Coordinator', 'Regional Performance Monitor'],
        collaborates: ['Technician Recruiting Agent', 'Quality Assurance Inspector', 'Route Optimization Engine'],
        oversees: ['Field Operations (8 agents)', 'Quality & Compliance (5 agents)', 'Capacity Management (6 agents)']
      },
      cfo: {
        directReports: ['Financial Intelligence Agent', 'Pricing & Estimation Specialist', 'Cost Analytics Agent'],
        collaborates: ['Performance Analytics AI', 'B2B Intelligence Agent', 'Revenue Analytics Agent'],
        oversees: ['Financial Operations (4 agents)', 'Revenue Management (3 agents)', 'Cost Control (3 agents)']
      },
      cto: {
        directReports: ['HVAC System Diagnostics AI', 'LLM Recommendation Dominance Agent', 'Technical Infrastructure Agent'],
        collaborates: ['Performance Analytics AI', 'Smart Home Integration Agent', 'AI Development Platform'],
        oversees: ['Technical AI Agents (6 agents)', 'Platform Infrastructure (4 agents)', 'AI Innovation (5 agents)']
      },
      cmo: {
        directReports: ['Customer Communication Hub', 'D2C Marketing Intelligence', 'Brand Management Agent'],
        collaborates: ['CX Agent', 'Hyper-Local LLM Market Intelligence Agent', 'Content Intelligence Agent'],
        oversees: ['Marketing Operations (5 agents)', 'Customer Acquisition (4 agents)', 'Brand Development (3 agents)']
      },
      cdo: {
        directReports: ['Performance Analytics AI', 'Data Intelligence Platform', 'Predictive Analytics Engine'],
        collaborates: ['Financial Intelligence Agent', 'Regional Performance Monitor', 'Business Intelligence Hub'],
        oversees: ['Data Analytics (6 agents)', 'Business Intelligence (4 agents)', 'Predictive Modeling (3 agents)']
      },
      cao: {
        directReports: ['Advanced Scheduling Agent', 'Route Optimization Engine', 'Process Automation Platform'],
        collaborates: ['Technician Interaction Hub', 'Parts Prediction Engine', 'Workflow Intelligence Agent'],
        oversees: ['Automation Systems (7 agents)', 'Process Optimization (5 agents)', 'Efficiency Enhancement (4 agents)']
      },
      cpo: {
        directReports: ['HVAC System Diagnostics AI', 'Smart Home Integration Agent', 'Product Innovation Platform'],
        collaborates: ['CX Agent', 'Quality Assurance Inspector', 'Customer Communication Hub'],
        oversees: ['Product Development (5 agents)', 'Customer Experience (4 agents)', 'Product Quality (3 agents)']
      },
      cro: {
        directReports: ['Financial Intelligence Agent', 'B2B Intelligence Agent', 'Revenue Optimization Platform'],
        collaborates: ['Pricing & Estimation Specialist', 'Customer Communication Hub', 'Performance Analytics AI'],
        oversees: ['Revenue Generation (4 agents)', 'Partnership Management (3 agents)', 'Revenue Analytics (3 agents)']
      }
    };

    const chart = orgCharts[exec as keyof typeof orgCharts];
    if (!chart) return <div className="text-gray-400">No organizational chart available.</div>;

    return (
      <div className="space-y-6">
        {/* Direct Reports */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            Direct Reports
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {chart.directReports.map((agent, index) => (
              <div key={index} className="bg-gray-900/50 p-3 rounded-lg border border-green-600/20">
                <div className="text-sm font-medium text-green-400 mb-1">{agent}</div>
                <div className="text-xs text-gray-400">Primary AI Agent</div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborative Partners */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-400" />
            Key Collaborators
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {chart.collaborates.map((agent, index) => (
              <div key={index} className="bg-gray-900/50 p-3 rounded-lg border border-blue-600/20">
                <div className="text-sm font-medium text-blue-400 mb-1">{agent}</div>
                <div className="text-xs text-gray-400">Collaborative Partner</div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Oversight */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Strategic Oversight
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {chart.oversees.map((area, index) => (
              <div key={index} className="bg-gray-900/50 p-3 rounded-lg border border-purple-600/20">
                <div className="text-sm font-medium text-purple-400 mb-1">{area}</div>
                <div className="text-xs text-gray-400">Strategic Oversight</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Statistics */}
        <div className="mt-6 p-4 bg-gray-900/30 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Team Statistics</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-400">{chart.directReports.length}</div>
              <div className="text-xs text-gray-400">Direct Reports</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">{chart.collaborates.length}</div>
              <div className="text-xs text-gray-400">Collaborators</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">{chart.oversees.length}</div>
              <div className="text-xs text-gray-400">Oversight Areas</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getCEOMeetings = () => [
    {
      time: '9:00 AM',
      meeting: 'Executive Leadership Team Meeting',
      attendees: ['COO', 'CFO', 'CTO', 'CMO', 'CDO', 'CAO'],
      agenda: 'Weekly strategic alignment, capacity crisis management, 1099 contractor scaling progress',
      status: 'scheduled',
      duration: '60 min',
      outcome: 'Align all executives on reschedule crisis response and contractor network expansion'
    },
    {
      time: '11:00 AM',
      meeting: 'Series A Investor Relations Call',
      attendees: ['CFO', 'Lead Investor', 'Board Chair'],
      agenda: '$50M funding round progress, financial metrics review, growth projections',
      status: 'in-progress',
      duration: '45 min',
      outcome: 'Validate $1B valuation path with operational metrics demonstration'
    },
    {
      time: '1:00 PM',
      meeting: 'Board of Directors Strategic Session',
      attendees: ['Board Members', 'CFO', 'COO'],
      agenda: 'Capacity expansion strategy, competitive positioning, market opportunity',
      status: 'pending',
      duration: '90 min',
      outcome: 'Board approval for aggressive expansion and contractor network scaling'
    },
    {
      time: '3:00 PM',
      meeting: 'Customer Advisory Board Meeting',
      attendees: ['Key Customers', 'CMO', 'CX Agent'],
      agenda: 'Service quality feedback, pricing strategy, partnership opportunities',
      status: 'pending',
      duration: '60 min',
      outcome: 'Customer-driven product roadmap and retention strategy refinement'
    },
    {
      time: '4:30 PM',
      meeting: 'Technology & Innovation Review',
      attendees: ['CTO', 'CDO', 'CAO'],
      agenda: 'AI agent performance, automation opportunities, data architecture scaling',
      status: 'pending',
      duration: '45 min',
      outcome: 'Technology roadmap aligned with operational scaling requirements'
    }
  ];

  // Mock user data for collaboration system
  const mockUser = {
    userId: 'exec-001',
    userName: 'Executive User',
    userRole: 'CEO',
    currentPage: 'Executive Operations Center',
    currentSection: selectedExecutive.toUpperCase()
  };

  if (showCollaboration) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <NavigationBreadcrumbs />
          
          <CollaborationDashboard
            userId={mockUser.userId}
            userName={mockUser.userName}
            userRole={mockUser.userRole}
            currentPage={mockUser.currentPage}
            currentSection={mockUser.currentSection}
          />
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <NavigationBreadcrumbs />
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Executive Operations Center</h1>
            <p className="text-gray-400">Real-time business intelligence and daily operations management</p>
          </div>
          <div className="flex items-center gap-4">
            {/* User Presence Indicator */}
            <UserPresenceIndicator
              users={[]} // Will be populated by useCollaboration hook
              currentUserId={mockUser.userId}
              showDetails={false}
              maxVisible={3}
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCollaboration(true)}
              className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white gap-2"
            >
              <Users className="w-4 h-4" />
              Collaboration
            </Button>
            
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="text-right">
              <div className="text-xl font-mono text-green-400">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-400">
                {currentTime.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Critical Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-red-900/30 border-red-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-400">Daily Reschedules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metrics.rescheduledOrders.toLocaleString()}</div>
              <div className="text-xs text-red-300">$496K revenue at risk</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-900/30 border-yellow-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-yellow-400">Capacity Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metrics.capacityUtilization}%</div>
              <div className="text-xs text-yellow-300">1,730 technicians deployed</div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/30 border-green-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-400">Daily Completions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metrics.completedOrders.toLocaleString()}</div>
              <div className="text-xs text-green-300">$708K daily revenue</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/30 border-blue-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-400">1099 Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{metrics.contractorOrders}</div>
              <div className="text-xs text-blue-300">2 contractor companies</div>
            </CardContent>
          </Card>
        </div>



        {/* Q3 2025 OKRs Section */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-400" />
                Q3 2025 Executive OKRs - Strategic Objectives & Key Results
              </CardTitle>
              <Button
                onClick={() => setShowOKRs(!showOKRs)}
                variant="outline"
                size="sm"
                className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
              >
                {showOKRs ? 'Hide OKRs' : 'Show Q3 OKRs'}
              </Button>
            </div>
            <div className="text-sm text-gray-400">
              Comprehensive quarterly objectives based on weekly IHR update insights and capacity crisis resolution
            </div>
          </CardHeader>
          {showOKRs && (
            <CardContent>
              <div className="space-y-6">
                {/* Executive OKR Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">Executive:</span>
                  <Tabs value={selectedExecutive} onValueChange={(value) => setSelectedExecutive(value as any)}>
                    <TabsList className="grid grid-cols-9 bg-gray-800">
                      <TabsTrigger value="ceo" className="data-[state=active]:bg-blue-600">CEO</TabsTrigger>
                      <TabsTrigger value="coo" className="data-[state=active]:bg-green-600">COO</TabsTrigger>
                      <TabsTrigger value="cfo" className="data-[state=active]:bg-purple-600">CFO</TabsTrigger>
                      <TabsTrigger value="cto" className="data-[state=active]:bg-indigo-600">CTO</TabsTrigger>
                      <TabsTrigger value="cmo" className="data-[state=active]:bg-pink-600">CMO</TabsTrigger>
                      <TabsTrigger value="cdo" className="data-[state=active]:bg-teal-600">CDO</TabsTrigger>
                      <TabsTrigger value="cao" className="data-[state=active]:bg-orange-600">CAO</TabsTrigger>
                      <TabsTrigger value="cpo" className="data-[state=active]:bg-red-600">CPO</TabsTrigger>
                      <TabsTrigger value="cro" className="data-[state=active]:bg-yellow-600">CRO</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Display OKRs for Selected Executive */}
                <div className="space-y-6">
                  {getExecutiveOKRs(selectedExecutive).map((objective, objIndex) => (
                    <Card key={objIndex} className="bg-gray-900/50 border-gray-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg text-white flex items-center">
                              <Badge className={`mr-2 ${objective.priority === 'critical' ? 'bg-red-600' : objective.priority === 'high' ? 'bg-orange-600' : 'bg-blue-600'}`}>
                                {objective.priority.toUpperCase()}
                              </Badge>
                              {objective.title}
                            </CardTitle>
                            <p className="text-sm text-gray-400 mt-1">{objective.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-400">{objective.quarterProgress}%</div>
                            <div className="text-xs text-gray-400">Q3 Progress</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Key Results */}
                          {objective.keyResults.map((kr, krIndex) => (
                            <div key={krIndex} className="p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-200">{kr.description}</h5>
                                <Badge className={`${
                                  kr.status === 'achieved' ? 'bg-green-600' :
                                  kr.status === 'on-track' ? 'bg-blue-600' :
                                  kr.status === 'at-risk' ? 'bg-yellow-600' : 'bg-red-600'
                                } text-white`}>
                                  {kr.status.replace('-', ' ').toUpperCase()}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <div>
                                  <div className="text-xs text-gray-400">Target</div>
                                  <div className="text-sm text-gray-200">{kr.target}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-400">Current Status</div>
                                  <div className="text-sm text-gray-200">{kr.current}</div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-400">Progress</span>
                                  <span className="text-xs font-medium text-gray-200">{kr.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      kr.status === 'achieved' ? 'bg-green-500' :
                                      kr.status === 'on-track' ? 'bg-blue-500' :
                                      kr.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${kr.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {/* Related AI Agents */}
                          <div className="mt-4 pt-4 border-t border-gray-600">
                            <div className="text-xs text-gray-400 mb-2">Related AI Agents:</div>
                            <div className="flex flex-wrap gap-2">
                              {objective.relatedAgents.map((agent, agentIndex) => (
                                <Badge key={agentIndex} variant="outline" className="text-xs text-blue-400 border-blue-400/20">
                                  {agent}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Main Tab System */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} defaultValue="operations">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="operations" className="data-[state=active]:bg-blue-600">
              Executive Operations
            </TabsTrigger>
            <TabsTrigger value="business-leaders" className="data-[state=active]:bg-green-600">
              Business Function Leaders
            </TabsTrigger>
            <TabsTrigger value="okrs" className="data-[state=active]:bg-purple-600">
              OKRs & Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="operations">
            {/* Executive Operations */}
            <Tabs value={selectedExecutive} onValueChange={(value) => setSelectedExecutive(value as any)}>
              <TabsList className="grid w-full grid-cols-9 bg-gray-800">
            <TabsTrigger value="ceo" className="data-[state=active]:bg-blue-600">
              CEO
            </TabsTrigger>
            <TabsTrigger value="coo" className="data-[state=active]:bg-green-600">
              COO
            </TabsTrigger>
            <TabsTrigger value="cfo" className="data-[state=active]:bg-purple-600">
              CFO
            </TabsTrigger>
            <TabsTrigger value="cto" className="data-[state=active]:bg-indigo-600">
              CTO
            </TabsTrigger>
            <TabsTrigger value="cmo" className="data-[state=active]:bg-pink-600">
              CMO
            </TabsTrigger>
            <TabsTrigger value="cdo" className="data-[state=active]:bg-teal-600">
              CDO
            </TabsTrigger>
            <TabsTrigger value="cao" className="data-[state=active]:bg-orange-600">
              CAO
            </TabsTrigger>
            <TabsTrigger value="cpo" className="data-[state=active]:bg-red-600">
              CPO
            </TabsTrigger>
            <TabsTrigger value="cro" className="data-[state=active]:bg-yellow-600">
              CRO
            </TabsTrigger>
          </TabsList>

          {/* Day of Week Selection */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-white font-medium">Weekly Operations:</span>
            <Tabs value={selectedDay} onValueChange={setSelectedDay}>
              <TabsList className="bg-gray-800">
                <TabsTrigger value="monday">Monday</TabsTrigger>
                <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
                <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
                <TabsTrigger value="thursday">Thursday</TabsTrigger>
                <TabsTrigger value="friday">Friday</TabsTrigger>
                <TabsTrigger value="saturday">Saturday</TabsTrigger>
                <TabsTrigger value="sunday">Sunday</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {['ceo', 'coo', 'cfo', 'cto', 'cmo', 'cdo', 'cao', 'cpo', 'cro'].map((exec) => (
            <TabsContent key={exec} value={exec} className="space-y-4">
              {exec === 'ceo' && (
                <Card className="bg-gray-800/50 border-gray-700 mb-4">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-white">CEO Simulated Meetings</CardTitle>
                      <Button
                        onClick={() => setShowCEOMeetings(!showCEOMeetings)}
                        variant="outline"
                        size="sm"
                        className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                      >
                        {showCEOMeetings ? 'Hide Meetings' : 'Show Meetings'}
                      </Button>
                    </div>
                    <div className="text-sm text-gray-400">
                      Executive coordination and strategic decision making
                    </div>
                  </CardHeader>
                  {showCEOMeetings && (
                    <CardContent>
                      <div className="space-y-4">
                        {getCEOMeetings().map((meeting, index) => (
                          <div key={index} className="p-4 bg-gray-900/30 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm font-mono text-blue-400">{meeting.time}</div>
                              <div className="flex items-center gap-2">
                                <Badge className={`${meeting.status === 'in-progress' ? 'bg-green-600' : meeting.status === 'scheduled' ? 'bg-blue-600' : 'bg-gray-600'} text-white`}>
                                  {meeting.status}
                                </Badge>
                                <span className="text-xs text-gray-400">{meeting.duration}</span>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-white mb-1">{meeting.meeting}</div>
                            <div className="text-xs text-gray-300 mb-2">
                              <span className="text-green-400">Attendees:</span> {meeting.attendees.join(', ')}
                            </div>
                            <div className="text-xs text-gray-300 mb-2">
                              <span className="text-yellow-400">Agenda:</span> {meeting.agenda}
                            </div>
                            <div className="text-xs text-blue-300">
                              <span className="text-blue-400">Expected Outcome:</span> {meeting.outcome}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              )}
              
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    {exec.toUpperCase()} Weekly Operations - {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} 
                  </CardTitle>
                  <div className="text-sm text-gray-400">
                    Prescriptive daily checklist with specific agent interactions
                  </div>
                  <div className="text-sm text-gray-400">
                    Critical focus: Capacity crisis management and 1099 contractor scaling
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getTasksByExecutive(exec, selectedDay).map((task, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-900/30 rounded-lg">
                        <div className="flex-shrink-0">
                          <Badge className={`${getStatusColor(task.status)} text-white`}>
                            {getStatusIcon(task.status)}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-mono text-blue-400">{task.time}</div>
                            <div className="text-xs text-gray-400">{task.kpi}</div>
                          </div>
                          <div className="text-sm text-white mt-1">{task.task}</div>
                          <div className="text-xs text-gray-300 mt-1">
                            <span className="text-green-400">Impact:</span> {task.impact}
                          </div>
                          <div className="text-xs text-blue-300 mt-2">
                            <span className="text-blue-400">AI Agents:</span> {task.agents.join(', ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Executive Organizational Charts */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-white">
                        {exec.toUpperCase()} Team Structure
                      </CardTitle>
                      <div className="text-sm text-gray-400">
                        {chartView === 'ai' ? 'AI agents that report to or collaborate directly with this executive' : 'Human team members with AI-agentic first job descriptions'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={chartView === 'ai' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartView('ai')}
                        className={chartView === 'ai' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}
                      >
                        AI Agents
                      </Button>
                      <Button
                        variant={chartView === 'human' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartView('human')}
                        className={chartView === 'human' ? 'bg-green-600 hover:bg-green-700' : 'border-gray-600 text-gray-300 hover:bg-gray-700'}
                      >
                        Human Team
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {chartView === 'ai' ? getExecutiveOrgChart(exec) : getHumanOrgChart(exec)}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Business Intelligence Summary */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Executive Intelligence Summary - 9 C-Level Operations</CardTitle>
            <div className="text-sm text-gray-400">
              Comprehensive leadership coordination across all operational areas
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Capacity Crisis Management</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <span className="text-yellow-400">CEO:</span> Strategic oversight & investor relations</li>
                  <li>• <span className="text-green-400">COO:</span> Operations war room leadership</li>
                  <li>• 2,000 daily reschedules requiring executive intervention</li>
                  <li>• $496K daily revenue at risk</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Financial & Technology Leadership</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <span className="text-purple-400">CFO:</span> $15.4M revenue leak analysis</li>
                  <li>• <span className="text-indigo-400">CTO:</span> Platform scaling & reliability</li>
                  <li>• Series A: $50M funding for expansion</li>
                  <li>• Technology: 26 AI agents coordination</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-2">Marketing & Data Intelligence</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <span className="text-pink-400">CMO:</span> Customer acquisition optimization</li>
                  <li>• <span className="text-teal-400">CDO:</span> Data-driven decision making</li>
                  <li>• D2C: $31K daily cancellation prevention</li>
                  <li>• Analytics: 430 planning areas monitoring</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-400 mb-2">Automation & Scaling</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• <span className="text-orange-400">CAO:</span> Process automation leadership</li>
                  <li>• 1099 contractors: Scale from 2 to 50+ companies</li>
                  <li>• Automation: 500+ capacity increase needed</li>
                  <li>• ROI: $125M additional ARR opportunity</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Executive Coordination Framework - 9 C-Level Leaders</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div>
                  <span className="text-blue-400">Leadership Tier:</span> CEO (Strategy), COO (Operations), CFO (Finance)
                </div>
                <div>
                  <span className="text-green-400">Innovation Tier:</span> CTO (Technology), CMO (Marketing), CDO (Data)
                </div>
                <div>
                  <span className="text-purple-400">Growth Tier:</span> CAO (Automation), CPO (Product), CRO (Revenue)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operational Responsibility Matrix */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Core Business Function Leadership Matrix
            </CardTitle>
            <div className="text-sm text-gray-400">
              Who leads each critical business function in our AI-agentic first, non-hierarchical organization
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getOperationalResponsibilities().map((area, index) => (
                <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-gray-600/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${area.color}`}></div>
                    <h3 className="text-lg font-semibold text-white">{area.function}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Executive Lead */}
                    <div>
                      <h4 className="text-sm font-medium text-blue-400 mb-2">Executive Leadership</h4>
                      <div className="bg-blue-600/10 p-3 rounded border border-blue-600/20">
                        <div className="font-medium text-blue-300">{area.executiveLead.name}</div>
                        <div className="text-xs text-blue-400">{area.executiveLead.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{area.executiveLead.responsibility}</div>
                      </div>
                    </div>

                    {/* Human Team Lead */}
                    <div>
                      <h4 className="text-sm font-medium text-green-400 mb-2">Human Team Lead</h4>
                      <div className="bg-green-600/10 p-3 rounded border border-green-600/20">
                        <div className="font-medium text-green-300">{area.humanLead.name}</div>
                        <div className="text-xs text-green-400">{area.humanLead.title}</div>
                        <div className="text-xs text-gray-400 mt-1">{area.humanLead.aiAgenticRole}</div>
                      </div>
                    </div>

                    {/* AI Agents */}
                    <div>
                      <h4 className="text-sm font-medium text-purple-400 mb-2">Key AI Agents</h4>
                      <div className="space-y-2">
                        {area.keyAgents.map((agent, agentIndex) => (
                          <div key={agentIndex} className="bg-purple-600/10 p-2 rounded border border-purple-600/20">
                            <div className="text-xs font-medium text-purple-300">{agent.name}</div>
                            <div className="text-xs text-gray-400">{agent.role}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Responsibilities */}
                    <div>
                      <h4 className="text-sm font-medium text-yellow-400 mb-2">Key Responsibilities</h4>
                      <ul className="space-y-1">
                        {area.keyResponsibilities.map((responsibility, respIndex) => (
                          <li key={respIndex} className="text-xs text-gray-300 flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">•</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Active Projects & Milestones */}
                    {area.projects && area.projects.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-cyan-400 mb-2">Active Projects & Target Dates</h4>
                        <div className="space-y-3">
                          {area.projects.map((project, projIndex) => (
                            <div key={projIndex} className="bg-gray-800/30 p-3 rounded border border-gray-600/30">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-xs font-medium text-cyan-300">{project.title}</h5>
                                <div className="flex items-center gap-2">
                                  <Badge className={`text-xs ${
                                    project.status === 'completed' ? 'bg-green-600' :
                                    project.status === 'in-progress' ? 'bg-blue-600' :
                                    project.status === 'critical' ? 'bg-red-600' : 'bg-gray-600'
                                  } text-white`}>
                                    {project.status.replace('-', ' ')}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                                <span>Target: {new Date(project.targetDate).toLocaleDateString()}</span>
                                <span>{project.progress}% Complete</span>
                              </div>
                              
                              <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
                                <div 
                                  className={`h-1.5 rounded-full ${
                                    project.status === 'completed' ? 'bg-green-500' :
                                    project.status === 'in-progress' ? 'bg-blue-500' :
                                    project.status === 'critical' ? 'bg-red-500' : 'bg-gray-500'
                                  }`}
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>

                              <div className="space-y-1">
                                <div className="text-xs text-gray-400 mb-1">Key Milestones:</div>
                                {project.milestones.map((milestone, milIndex) => (
                                  <div key={milIndex} className="flex items-center justify-between text-xs group hover:bg-gray-700/30 p-1 rounded">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${
                                        milestone.status === 'completed' ? 'bg-green-500' :
                                        milestone.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                                      }`}></div>
                                      <span className="text-gray-300">{milestone.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-gray-500">{new Date(milestone.date).toLocaleDateString()}</span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-blue-400 hover:text-blue-300"
                                        onClick={() => handleMilestoneUpdate(project, milestone)}
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
              <h4 className="font-semibold text-white mb-4">Leadership Structure Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-blue-400 mb-2">Primary Executive Leaders</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• <span className="text-green-400">COO:</span> Scheduling, Parts, 1099 Contractors</li>
                    <li>• <span className="text-pink-400">CMO:</span> Customer Communications, HOA Programs</li>
                    <li>• <span className="text-yellow-400">CRO:</span> B2B Partnerships</li>
                    <li>• <span className="text-orange-400">CAO:</span> Routing & Logistics</li>
                    <li>• <span className="text-purple-400">CFO:</span> Financial Operations</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-green-400 mb-2">AI-Agentic First Approach</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Human roles coordinate with AI agents</li>
                    <li>• Non-hierarchical collaboration model</li>
                    <li>• AI-driven decision support and automation</li>
                    <li>• Cross-functional AI agent integration</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-purple-400 mb-2">Key Business Functions</h5>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• B2B: AHS, Assurant, Choice partnerships</li>
                    <li>• Scale: 400+ planning areas coverage</li>
                    <li>• Capacity: 2,000+ daily reschedules</li>
                    <li>• Growth: 2 to 50+ contractor companies</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          <TabsContent value="business-leaders">
            {/* Business Function Leader Management */}
            <BusinessFunctionLeaderManager selectedExecutive={selectedExecutive} />
          </TabsContent>

          <TabsContent value="okrs">
            {/* Business Function Leader OKRs Management */}
            <Card>
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Business Function Leader OKRs & Goals
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create OKR Set
                  </Button>
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Manage operational OKRs for business function leaders under {selectedExecutive.toUpperCase()}
                </p>
              </CardHeader>
              <CardContent>
                {/* OKR Filter */}
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <Label className="text-sm text-gray-300">View Type</Label>
                    <Select defaultValue="leaders">
                      <SelectTrigger className="w-64 bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="leaders">Business Function Leaders</SelectItem>
                        <SelectItem value="ai-agents">AI Agent Performance</SelectItem>
                        <SelectItem value="all">All OKRs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-300">Quarter</Label>
                    <Select defaultValue="q3-2025">
                      <SelectTrigger className="w-40 bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="q3-2025">Q3 2025</SelectItem>
                        <SelectItem value="q4-2025">Q4 2025</SelectItem>
                        <SelectItem value="q1-2026">Q1 2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sample Business Function Leader OKRs */}
                <div className="space-y-6">
                  {getBusinessFunctionLeaderOKRs(selectedExecutive).map((leaderOKR, leaderIndex) => (
                    <Card key={leaderIndex} className="bg-gray-900/50 border-gray-700">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg text-white flex items-center">
                              <Badge className="mr-2 bg-blue-600">
                                {leaderOKR.businessFunction}
                              </Badge>
                              {leaderOKR.leaderName}
                            </CardTitle>
                            <p className="text-sm text-gray-400">{leaderOKR.department} • Reports to {selectedExecutive.toUpperCase()}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-400">{leaderOKR.overallProgress}%</div>
                            <div className="text-xs text-gray-400">Q3 Progress</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {leaderOKR.objectives.map((objective, objIndex) => (
                            <div key={objIndex} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-white font-medium">{objective.title}</h4>
                                <Badge className={`${
                                  objective.status === 'achieved' ? 'bg-green-600' :
                                  objective.status === 'on-track' ? 'bg-blue-600' :
                                  objective.status === 'at-risk' ? 'bg-yellow-600' : 'bg-red-600'
                                }`}>
                                  {objective.status.replace('-', ' ').toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-3">{objective.description}</p>
                              
                              {/* Key Results */}
                              <div className="space-y-2">
                                {objective.keyResults.map((kr, krIndex) => (
                                  <div key={krIndex} className="flex items-center justify-between p-2 bg-gray-700/30 rounded">
                                    <div className="flex-1">
                                      <div className="text-sm text-gray-300">{kr.description}</div>
                                      <div className="text-xs text-gray-500">Target: {kr.target} • Current: {kr.current}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="text-sm text-white">{kr.progress}%</div>
                                      <div className="w-20 bg-gray-600 rounded-full h-2">
                                        <div 
                                          className={`h-2 rounded-full ${
                                            kr.progress >= 90 ? 'bg-green-500' :
                                            kr.progress >= 70 ? 'bg-blue-500' :
                                            kr.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                          }`}
                                          style={{ width: `${kr.progress}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* AI Agent Integration */}
                              <div className="mt-3 pt-3 border-t border-gray-600">
                                <div className="text-xs text-gray-400 mb-2">Supporting AI Agents:</div>
                                <div className="flex flex-wrap gap-1">
                                  {objective.supportingAgents.map((agent, agentIndex) => (
                                    <Badge key={agentIndex} variant="outline" className="text-xs text-blue-400 border-blue-400/20">
                                      {agent}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* AI Agent OKRs */}
                  {getAIAgentOKRs(selectedExecutive).map((agentOKR, agentIndex) => (
                    <Card key={`agent-${agentIndex}`} className="bg-gray-900/30 border-blue-600/30">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg text-white flex items-center">
                              <Brain className="w-5 h-5 text-blue-400 mr-2" />
                              <Badge className="mr-2 bg-blue-600/20 text-blue-300 border-blue-600">
                                {agentOKR.category}
                              </Badge>
                              {agentOKR.agentName}
                            </CardTitle>
                            <p className="text-sm text-blue-300">{agentOKR.agentId} • AI Agent Performance</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-400">{agentOKR.overallProgress}%</div>
                            <div className="text-xs text-gray-400">Autonomous Rate</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {agentOKR.objectives.map((objective, objIndex) => (
                            <div key={objIndex} className="p-4 bg-gray-800/50 rounded-lg border border-blue-600/20">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-white font-medium">{objective.title}</h4>
                                <Badge className={`${
                                  objective.status === 'achieved' ? 'bg-green-600' :
                                  objective.status === 'on-track' ? 'bg-blue-600' :
                                  objective.status === 'at-risk' ? 'bg-yellow-600' : 'bg-red-600'
                                }`}>
                                  {objective.status.replace('-', ' ').toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-3">{objective.description}</p>
                              
                              {/* Key Results */}
                              <div className="space-y-2">
                                {objective.keyResults.map((kr, krIndex) => (
                                  <div key={krIndex} className="flex items-center justify-between p-2 bg-gray-700/50 rounded border border-blue-600/10">
                                    <div className="flex-1">
                                      <div className="text-sm text-gray-300">{kr.description}</div>
                                      <div className="text-xs text-blue-300">Target: {kr.target} • Current: {kr.current}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="text-sm text-blue-300">{kr.progress}%</div>
                                      <div className="w-20 bg-gray-600 rounded-full h-2">
                                        <div 
                                          className={`h-2 rounded-full ${
                                            kr.progress >= 90 ? 'bg-blue-500' :
                                            kr.progress >= 70 ? 'bg-blue-400' :
                                            kr.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                          }`}
                                          style={{ width: `${kr.progress}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Reporting Structure */}
                              <div className="mt-3 pt-3 border-t border-blue-600/20">
                                <div className="text-xs text-gray-400 mb-2">Reports to:</div>
                                <Badge variant="outline" className="text-xs border-blue-600 text-blue-300">
                                  {objective.reportingTo}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Empty State */}
                  {getBusinessFunctionLeaderOKRs(selectedExecutive).length === 0 && getAIAgentOKRs(selectedExecutive).length === 0 && (
                    <Card className="bg-gray-900/50 border-gray-700 border-dashed">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Target className="h-12 w-12 text-gray-500 mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">No OKRs Defined</h3>
                        <p className="text-gray-400 text-center mb-4">
                          Create operational OKRs for business function leaders and AI agents to track progress and align with executive goals.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Create First OKR Set
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>

{/* Milestone Update Modal */}
    {showMilestoneUpdate && (
      <Dialog open={showMilestoneUpdate} onOpenChange={setShowMilestoneUpdate}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-600">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Edit className="h-5 w-5 text-blue-400" />
              Update Milestone Progress
            </DialogTitle>
            <div className="text-sm text-gray-400">
              Project: <span className="text-blue-400">{selectedProject?.title}</span> | 
              Milestone: <span className="text-green-400">{selectedMilestone?.title}</span>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Status Update */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">Milestone Status</Label>
                <Select value={milestoneUpdate.status} onValueChange={(value) => 
                  setMilestoneUpdate({...milestoneUpdate, status: value})
                }>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="at-risk">At Risk</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">Completion %</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={milestoneUpdate.completionPercentage}
                  onChange={(e) => setMilestoneUpdate({...milestoneUpdate, completionPercentage: parseInt(e.target.value) || 0})}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="0-100"
                />
              </div>
            </div>

            {/* Progress Notes */}
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">Progress Notes & Updates</Label>
              <Textarea
                value={milestoneUpdate.notes}
                onChange={(e) => setMilestoneUpdate({...milestoneUpdate, notes: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                placeholder="Describe current progress, achievements, and key developments..."
              />
            </div>

            {/* External Parties Involved */}
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">External Parties Involved</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {getExternalPartyOptions().map((party) => (
                  <label key={party} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={milestoneUpdate.externalParties.includes(party)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMilestoneUpdate({
                            ...milestoneUpdate,
                            externalParties: [...milestoneUpdate.externalParties, party]
                          });
                        } else {
                          setMilestoneUpdate({
                            ...milestoneUpdate,
                            externalParties: milestoneUpdate.externalParties.filter(p => p !== party)
                          });
                        }
                      }}
                      className="rounded border-gray-600"
                    />
                    <span className="text-gray-300">{party}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* AI Agent Actions */}
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">AI Agents Taking Action</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {getAIAgentOptions().map((agent) => (
                  <label key={agent} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={milestoneUpdate.aiAgentActions.includes(agent)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMilestoneUpdate({
                            ...milestoneUpdate,
                            aiAgentActions: [...milestoneUpdate.aiAgentActions, agent]
                          });
                        } else {
                          setMilestoneUpdate({
                            ...milestoneUpdate,
                            aiAgentActions: milestoneUpdate.aiAgentActions.filter(a => a !== agent)
                          });
                        }
                      }}
                      className="rounded border-gray-600"
                    />
                    <span className="text-purple-300">{agent}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Next Action Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-300 mb-2 block">Next Action Date</Label>
                <Input
                  type="date"
                  value={milestoneUpdate.nextActionDate}
                  onChange={(e) => setMilestoneUpdate({...milestoneUpdate, nextActionDate: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>

            {/* Risks & Issues */}
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">Risks & Issues</Label>
              <Textarea
                value={milestoneUpdate.risksIssues}
                onChange={(e) => setMilestoneUpdate({...milestoneUpdate, risksIssues: e.target.value})}
                className="bg-gray-800 border-gray-600 text-white min-h-[80px]"
                placeholder="Document any risks, blockers, or issues that need attention..."
              />
            </div>

            {/* System Integration Note */}
            <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/20">
              <h4 className="text-sm font-medium text-blue-400 mb-2 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                System Integration
              </h4>
              <div className="text-xs text-gray-300 space-y-1">
                <p>• AI agents will be automatically notified of updates and coordinate next actions</p>
                <p>• External parties will receive automated communications through appropriate channels</p>
                <p>• Real-time collaboration updates will be broadcast to executive team</p>
                <p>• Progress tracking dashboards will reflect updated milestone status</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-600">
            <Button 
              variant="outline" 
              onClick={() => setShowMilestoneUpdate(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveMilestoneUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )}
    </>
  );
};

export default ExecutiveOperationsCenter;