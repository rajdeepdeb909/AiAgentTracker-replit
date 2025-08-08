import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Users, Target, Activity, Plus, UserPlus, Search, Filter, MapPin, TrendingUp, X, ArrowLeft, Clock, Bot, Eye, ArrowRight, Edit, Trash2 } from 'lucide-react';

// Generate realistic planning areas for national scale
const generatePlanningAreas = (): string[] => {
  const states = ['TX', 'CA', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI', 'NJ', 'VA', 'WA', 'AZ', 'MA', 'TN', 'IN', 'MO', 'MD', 'WI', 'CO', 'MN', 'SC', 'AL', 'LA', 'KY', 'OR', 'OK', 'CT', 'UT', 'IA', 'NV', 'AR', 'MS', 'KS', 'NM', 'NE', 'WV', 'ID', 'HI', 'NH', 'ME', 'MT', 'RI', 'DE', 'SD', 'ND', 'AK', 'VT', 'WY'];
  const areas: string[] = [];
  
  states.forEach(state => {
    // Major metros
    areas.push(`${state} Metro Region`);
    // Suburban areas
    for (let i = 1; i <= 8; i++) {
      areas.push(`${state} Suburban Zone ${i}`);
    }
  });
  
  return areas.sort();
};

const PLANNING_AREAS = generatePlanningAreas();

// Team members for work tracking with comprehensive job descriptions
const TEAM_MEMBERS = [
  { 
    id: 1, 
    name: 'Sarah Chen', 
    role: 'Senior Recruitment Manager', 
    department: 'Recruitment', 
    planningArea: 'TX Metro Region', 
    status: 'active',
    description: 'Leads comprehensive 1099 contractor recruitment strategy across Texas Metro region, managing recruitment pipeline from initial outreach through onboarding.',
    dailyTasks: [
      'Review and approve recruitment strategies for 15+ Texas planning areas',
      'Coordinate with AI Recruitment Agents to optimize contractor acquisition rates',
      'Analyze weekly recruitment metrics and adjust targeting strategies',
      'Conduct senior-level interviews for high-value contractor candidates',
      'Manage partnership relationships with trade organizations and training centers',
      'Oversee recruitment budget allocation and ROI analysis across metro region'
    ],
    dataSources: [
      'Contractor application database',
      'Regional recruitment performance metrics',
      'Trade organization partnership data',
      'Interview feedback and scoring systems',
      'Recruitment cost and conversion analytics',
      'Market competitor analysis reports'
    ],
    kpis: [
      'Monthly contractor acquisition rate: Target 85+ new contractors',
      'Cost per acquisition: Target <$425 per contractor',
      'Interview-to-hire conversion rate: Target >68%',
      'Contractor retention at 6 months: Target >82%',
      'Regional recruitment coverage: Target 95% of planning areas',
      'Partnership development: Target 3+ new partnerships monthly'
    ],
    aiIntegration: 'Works closely with Technician Recruiting Agent and Regional Performance Monitor to optimize recruitment strategies and track performance across Texas Metro region.',
    reportingFrequency: 'Weekly recruitment dashboard updates, monthly strategic reviews',
    escalationTriggers: 'Contractor acquisition below 70 monthly, cost per acquisition >$550, planning area coverage below 85%'
  },
  { 
    id: 2, 
    name: 'Marcus Rodriguez', 
    role: 'Field Recruitment Specialist', 
    department: 'Recruitment', 
    planningArea: 'CA Metro Region', 
    status: 'active',
    description: 'Executes field-based recruitment activities across California Metro region, specializing in trade show participation, direct outreach, and local partnership development.',
    dailyTasks: [
      'Conduct field recruitment activities at trade shows and industry events',
      'Execute direct outreach campaigns to licensed contractors and technicians',
      'Build relationships with trade schools and certification programs',
      'Perform on-site contractor interviews and skills assessments',
      'Coordinate with local advertising and marketing campaigns',
      'Track and report field recruitment activity performance and outcomes'
    ],
    dataSources: [
      'Trade show attendance and lead generation data',
      'Field recruitment activity logs and outcomes',
      'Local contractor licensing databases',
      'Trade school partnership agreements and graduate pipelines',
      'Regional market penetration analysis',
      'Competitor recruitment activity intelligence'
    ],
    kpis: [
      'Field events participation: Target 12+ events monthly',
      'Lead generation from field activities: Target 150+ leads monthly',
      'Field interview completion rate: Target >75%',
      'Trade school partnership development: Target 2+ partnerships quarterly',
      'Regional brand recognition improvement: Target 15% quarterly increase',
      'Field recruitment conversion rate: Target >45%'
    ],
    aiIntegration: 'Collaborates with LLM Content Intelligence Agent to optimize field messaging and works with Regional Performance Monitor for activity tracking.',
    reportingFrequency: 'Daily field activity reports, weekly performance summaries',
    escalationTriggers: 'Lead generation below 100 monthly, field conversion rate below 35%, event participation below 8 monthly'
  },
  { 
    id: 3, 
    name: 'Jennifer Walsh', 
    role: 'Partnership Development Lead', 
    department: 'Recruitment', 
    planningArea: 'FL Metro Region', 
    status: 'active',
    description: 'Develops and manages strategic partnerships with trade organizations, educational institutions, and industry associations to create sustainable recruitment pipelines.',
    dailyTasks: [
      'Identify and evaluate potential partnership opportunities with trade organizations',
      'Negotiate partnership agreements and contractor referral programs',
      'Manage relationships with trade schools and technical colleges',
      'Coordinate joint recruitment events and training programs',
      'Develop partnership-based marketing and outreach campaigns',
      'Track partnership performance and ROI metrics'
    ],
    dataSources: [
      'Partnership agreement databases and performance metrics',
      'Trade organization membership and activity data',
      'Educational institution graduate placement rates',
      'Joint recruitment event attendance and conversion data',
      'Partnership-sourced contractor performance tracking',
      'Industry association relationship mapping'
    ],
    kpis: [
      'Active partnership maintenance: Target 25+ partnerships',
      'New partnership development: Target 4+ partnerships quarterly',
      'Partnership-sourced contractor acquisitions: Target 35% of total hires',
      'Partnership ROI: Target 3.5x return on partnership investments',
      'Joint event participation: Target 8+ events quarterly',
      'Partnership contractor retention rate: Target >85%'
    ],
    aiIntegration: 'Works with AI-Powered B2B Intelligence Agent to identify partnership opportunities and coordinates with Performance Analytics AI for ROI tracking.',
    reportingFrequency: 'Weekly partnership activity updates, monthly ROI analysis',
    escalationTriggers: 'Partnership-sourced hires below 25%, partnership ROI below 2.5x, active partnerships below 20'
  },
  { 
    id: 4, 
    name: 'David Kim', 
    role: 'Trade Show Coordinator', 
    department: 'Recruitment', 
    planningArea: 'NY Metro Region', 
    status: 'active',
    description: 'Plans, coordinates, and executes trade show participation strategy to maximize contractor recruitment and brand visibility at industry events.',
    dailyTasks: [
      'Research and select high-value trade shows and industry events for participation',
      'Coordinate booth design, materials, and staffing for trade show presence',
      'Manage pre-show marketing campaigns and appointment scheduling',
      'Execute on-site recruitment activities and lead capture processes',
      'Conduct post-show follow-up campaigns and conversion tracking',
      'Analyze trade show ROI and recommend optimization strategies'
    ],
    dataSources: [
      'Trade show attendance and demographic data',
      'Lead capture and conversion tracking systems',
      'Event costs and budget allocation reports',
      'Competitor presence and activity analysis',
      'Post-show survey and feedback data',
      'Industry event calendar and selection criteria'
    ],
    kpis: [
      'Trade show participation: Target 15+ shows annually',
      'Lead capture per show: Target 75+ qualified leads',
      'Show-to-hire conversion rate: Target >25%',
      'Cost per lead from trade shows: Target <$45',
      'Brand awareness improvement: Target 20% increase quarterly',
      'Trade show ROI: Target 4x return on event investments'
    ],
    aiIntegration: 'Leverages LLM Marketing Strategy insights for event selection and works with Conversational Commerce Agent for lead nurturing campaigns.',
    reportingFrequency: 'Post-event reports within 48 hours, monthly trade show performance analysis',
    escalationTriggers: 'Lead capture below 50 per show, conversion rate below 18%, trade show ROI below 2.5x'
  },
  { 
    id: 5, 
    name: 'Amanda Thompson', 
    role: 'Operations Manager', 
    department: 'Operations', 
    planningArea: 'IL Metro Region', 
    status: 'active',
    description: 'Manages day-to-day operational excellence across Illinois Metro region, ensuring efficient contractor deployment, quality standards, and operational performance.',
    dailyTasks: [
      'Monitor contractor performance metrics and service quality standards',
      'Coordinate contractor scheduling and deployment optimization',
      'Manage operational escalations and quality assurance issues',
      'Oversee contractor training and certification compliance',
      'Analyze operational efficiency metrics and implement improvements',
      'Coordinate with customer service teams for service delivery optimization'
    ],
    dataSources: [
      'Contractor performance and completion rate data',
      'Customer satisfaction scores and feedback systems',
      'Service request volume and response time metrics',
      'Operational cost and efficiency analytics',
      'Training completion and certification tracking',
      'Quality assurance inspection results'
    ],
    kpis: [
      'Contractor utilization rate: Target >85%',
      'Service completion rate: Target >92%',
      'Customer satisfaction score: Target >4.6/5',
      'Response time to service requests: Target <2 hours',
      'Operational cost per service: Target optimization of 8% quarterly',
      'Contractor certification compliance: Target 100%'
    ],
    aiIntegration: 'Collaborates with Advanced Scheduling Agent and Quality Assurance Inspector for operational optimization and performance monitoring.',
    reportingFrequency: 'Daily operational dashboards, weekly performance reviews',
    escalationTriggers: 'Contractor utilization below 78%, completion rate below 88%, customer satisfaction below 4.2'
  },
  { 
    id: 6, 
    name: 'Robert Zhang', 
    role: 'Quality Assurance Lead', 
    department: 'Operations', 
    planningArea: 'PA Metro Region', 
    status: 'active',
    description: 'Ensures consistent service quality standards across Pennsylvania Metro region through systematic quality monitoring, contractor evaluation, and continuous improvement processes.',
    dailyTasks: [
      'Conduct quality audits and contractor performance evaluations',
      'Analyze customer feedback and service quality metrics',
      'Develop and implement quality improvement programs',
      'Coordinate contractor coaching and performance improvement plans',
      'Monitor compliance with safety and regulatory standards',
      'Generate quality assurance reports and recommendations'
    ],
    dataSources: [
      'Quality audit results and contractor evaluations',
      'Customer feedback and satisfaction surveys',
      'Service quality metrics and performance trends',
      'Safety incident reports and compliance tracking',
      'Contractor training and improvement program data',
      'Regulatory compliance and certification records'
    ],
    kpis: [
      'Quality audit completion rate: Target 100% monthly coverage',
      'Service quality score: Target >4.7/5',
      'Contractor performance improvement: Target 15% quarterly increase',
      'Safety incident rate: Target <0.2% of service calls',
      'Compliance rate: Target 100% regulatory compliance',
      'Quality-related escalations: Target <2% of total services'
    ],
    aiIntegration: 'Works with Quality Assurance Inspector AI and Performance Analytics AI to identify quality trends and improvement opportunities.',
    reportingFrequency: 'Daily quality monitoring, weekly improvement reports',
    escalationTriggers: 'Quality score below 4.4, safety incidents above 0.3%, compliance issues detected'
  },
  { 
    id: 7, 
    name: 'Lisa Park', 
    role: 'Scheduling Coordinator', 
    department: 'Operations', 
    planningArea: 'OH Metro Region', 
    status: 'active',
    description: 'Optimizes contractor scheduling and deployment across Ohio Metro region to maximize efficiency, minimize travel time, and ensure optimal customer service coverage.',
    dailyTasks: [
      'Coordinate daily contractor scheduling and route optimization',
      'Manage emergency service requests and priority scheduling',
      'Monitor contractor availability and capacity planning',
      'Optimize travel routes and minimize operational costs',
      'Coordinate with customer service for appointment scheduling',
      'Analyze scheduling efficiency and implement optimization strategies'
    ],
    dataSources: [
      'Contractor availability and scheduling systems',
      'Service request volume and priority data',
      'Travel time and route optimization analytics',
      'Customer appointment preferences and constraints',
      'Contractor performance and completion time data',
      'Operational cost and efficiency metrics'
    ],
    kpis: [
      'Scheduling efficiency: Target >90% optimal route utilization',
      'Emergency response time: Target <1 hour average',
      'Contractor utilization: Target >85% daily capacity',
      'Travel time optimization: Target 20% reduction quarterly',
      'Schedule adherence rate: Target >95%',
      'Customer appointment satisfaction: Target >4.5/5'
    ],
    aiIntegration: 'Collaborates with Advanced Scheduling Agent and Maintenance Scheduler Pro for optimal contractor deployment and route planning.',
    reportingFrequency: 'Real-time scheduling dashboards, daily efficiency reports',
    escalationTriggers: 'Emergency response above 1.5 hours, scheduling efficiency below 85%, contractor utilization below 78%'
  },
  { 
    id: 8, 
    name: 'Michael Davis', 
    role: 'Performance Analytics Manager', 
    department: 'Analytics', 
    planningArea: 'GA Metro Region', 
    status: 'active',
    description: 'Analyzes contractor performance data across Georgia Metro region to identify trends, optimize operations, and drive data-driven decision making for continuous improvement.',
    dailyTasks: [
      'Analyze contractor performance metrics and identify optimization opportunities',
      'Generate comprehensive performance reports and trend analysis',
      'Develop predictive models for contractor success and retention',
      'Monitor key performance indicators and alert stakeholders to issues',
      'Coordinate with operational teams to implement data-driven improvements',
      'Maintain performance dashboards and visualization systems'
    ],
    dataSources: [
      'Contractor performance and completion rate databases',
      'Customer satisfaction and feedback systems',
      'Operational efficiency and cost analytics',
      'Revenue and profitability tracking data',
      'Training and development outcome metrics',
      'Market and competitor performance benchmarks'
    ],
    kpis: [
      'Report generation timeliness: Target 100% on-time delivery',
      'Data accuracy and quality: Target >99.5% accuracy',
      'Predictive model accuracy: Target >85% prediction accuracy',
      'Performance improvement identification: Target 5+ opportunities monthly',
      'Dashboard utilization rate: Target >95% stakeholder engagement',
      'Data-driven decision impact: Target 12% operational improvement quarterly'
    ],
    aiIntegration: 'Works closely with Performance Analytics AI and Regional Performance Monitor to enhance analytical capabilities and automated insights.',
    reportingFrequency: 'Daily performance monitoring, weekly trend analysis, monthly strategic reports',
    escalationTriggers: 'Data accuracy below 98%, model accuracy below 80%, performance trends showing >5% degradation'
  },
  { 
    id: 9, 
    name: 'Emily Johnson', 
    role: 'Data Intelligence Specialist', 
    department: 'Analytics', 
    planningArea: 'NC Metro Region', 
    status: 'active',
    description: 'Specializes in advanced data analysis and business intelligence to extract actionable insights from contractor and operational data across North Carolina Metro region.',
    dailyTasks: [
      'Conduct advanced statistical analysis on contractor performance data',
      'Develop and maintain business intelligence dashboards and reports',
      'Create predictive models for contractor recruitment and retention',
      'Analyze market trends and competitive intelligence data',
      'Coordinate data integration projects across multiple systems',
      'Provide analytical support for strategic decision making'
    ],
    dataSources: [
      'Multi-source contractor and operational databases',
      'Market research and competitive intelligence feeds',
      'Customer behavior and satisfaction analytics',
      'Financial performance and profitability data',
      'External economic and demographic data sources',
      'Industry benchmarking and performance standards'
    ],
    kpis: [
      'Data integration accuracy: Target >99% cross-system consistency',
      'Analytical insight generation: Target 8+ actionable insights monthly',
      'Predictive model performance: Target >87% accuracy',
      'Dashboard update frequency: Target real-time or daily refresh',
      'Strategic recommendation adoption: Target >75% implementation rate',
      'Data processing efficiency: Target <4 hour analysis turnaround'
    ],
    aiIntegration: 'Leverages LLM Content Intelligence Agent and AI-Powered B2B Intelligence Agent for enhanced analytical capabilities and automated insights.',
    reportingFrequency: 'Real-time dashboard updates, weekly analytical reports, monthly strategic insights',
    escalationTriggers: 'Data consistency below 97%, model accuracy below 82%, analysis turnaround above 6 hours'
  },
  { 
    id: 10, 
    name: 'Chris Martinez', 
    role: 'Training & Development Lead', 
    department: 'Training', 
    planningArea: 'MI Metro Region', 
    status: 'active',
    description: 'Designs and implements comprehensive training programs for contractor development, certification maintenance, and performance improvement across Michigan Metro region.',
    dailyTasks: [
      'Develop comprehensive training curricula for contractor skill development',
      'Coordinate certification programs and regulatory compliance training',
      'Analyze training effectiveness and contractor performance improvements',
      'Manage training delivery systems and learning management platforms',
      'Coordinate with industry experts and certification organizations',
      'Track training outcomes and return on investment metrics'
    ],
    dataSources: [
      'Training completion and assessment data',
      'Contractor performance before and after training',
      'Certification and compliance tracking systems',
      'Industry training standards and best practices',
      'Training cost and ROI analytics',
      'Contractor feedback and satisfaction surveys'
    ],
    kpis: [
      'Training completion rate: Target >95% for required programs',
      'Certification compliance: Target 100% up-to-date certifications',
      'Performance improvement post-training: Target 18% average increase',
      'Training ROI: Target 5x return on training investments',
      'Contractor satisfaction with training: Target >4.6/5',
      'Training program development: Target 3+ new programs quarterly'
    ],
    aiIntegration: 'Collaborates with Technician Training & Development Agent and AI-powered assessment systems for personalized learning paths and performance tracking.',
    reportingFrequency: 'Weekly training progress reports, monthly effectiveness analysis',
    escalationTriggers: 'Completion rate below 90%, certification compliance below 95%, training ROI below 3x'
  }
];

const WORK_ACTIVITY_TYPES = [
  'contractor_outreach', 'interview_coordination', 'skills_assessment', 'background_verification', 'contract_negotiation',
  'equipment_setup', 'training_delivery', 'performance_review', 'follow_up_coordination', 'partnership_development',
  'trade_show_planning', 'community_engagement', 'social_media_campaign', 'competitive_analysis', 'retention_program'
];

export default function ContractorRecruitment() {
  const [, setLocation] = useLocation();
  const [selectedPlanningArea, setSelectedPlanningArea] = useState('TX Metro Region');
  const [activeTab, setActiveTab] = useState('contractors');
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [performanceFilter, setPerformanceFilter] = useState('all');
  const [showLogActivity, setShowLogActivity] = useState(false);
  const [showTradeShow, setShowTradeShow] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [showActivityDetails, setShowActivityDetails] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [showAddWork, setShowAddWork] = useState(false);
  const [showEditWork, setShowEditWork] = useState(false);
  const [editingWork, setEditingWork] = useState<any>(null);
  const [showPersonDetails, setShowPersonDetails] = useState(false);
  const [selectedPersonDetails, setSelectedPersonDetails] = useState<any>(null);
  const [newWorkItem, setNewWorkItem] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignedAgent: '',
    contractorsInvolved: '',
    estimatedHours: '',
    planningArea: '',
    department: ''
  });
  const [newActivity, setNewActivity] = useState({
    activityType: '',
    description: '',
    planningArea: '',
    outcome: '',
    nextAction: '',
    priority: 'medium',
    value: '',
    assignedAgent: ''
  });
  
  // Generate realistic contractor data across 400+ planning areas
  const generateContractorData = () => {
    const contractors: any[] = [];
    const firstNames = ['John', 'Sarah', 'Mike', 'Lisa', 'David', 'Jennifer', 'Chris', 'Amanda', 'Robert', 'Maria', 'James', 'Jessica', 'Michael', 'Ashley', 'William', 'Emily', 'Daniel', 'Nicole', 'Matthew', 'Rachel'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
    const statuses = ['active', 'screening', 'interview', 'background_check', 'onboarding', 'inactive'];
    
    PLANNING_AREAS.forEach((area, index) => {
      const contractorsInArea = Math.floor(Math.random() * 15) + 1; // 1-15 contractors per area
      for (let i = 0; i < contractorsInArea; i++) {
        contractors.push({
          id: contractors.length + 1,
          firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
          lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
          planningArea: area,
          phone: `555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
          email: `contractor${contractors.length + 1}@email.com`,
          yearsExperience: Math.floor(Math.random() * 15) + 1,
          recruitmentStatus: statuses[Math.floor(Math.random() * statuses.length)],
          hourlyRate: Math.floor(Math.random() * 40) + 25, // $25-65/hr
          completionRate: Math.floor(Math.random() * 30) + 70, // 70-100%
        });
      }
    });
    
    return contractors;
  };

  const generateTargetData = () => {
    return PLANNING_AREAS.map((area, index) => ({
      id: index + 1,
      planningArea: area,
      targetContractors: Math.floor(Math.random() * 20) + 10, // 10-30 target
      currentContractors: Math.floor(Math.random() * 15) + 5, // 5-20 current
      urgencyLevel: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
      progress: Math.floor(Math.random() * 100),
    }));
  };

  const ACTIVITY_TYPES = [
    'trade_show_engagement', 'warm_referral_network', 'targeted_digital_outreach', 'video_interview_screening',
    'hands_on_skills_assessment', 'comprehensive_background_verification', 'onboarding_acceleration', 'contract_terms_negotiation',
    'equipment_delivery_setup', 'magik_button_training', '30_day_performance_review', 'strategic_follow_up',
    'industry_partner_introduction', 'certification_validation', 'reference_deep_dive', 'competitor_conversion',
    'community_networking_event', 'social_media_recruitment', 'apprentice_mentorship_program', 'retention_bonus_discussion'
  ];

  const AI_AGENTS = [
    'Technician Recruiting Agent', 'Partnership Development Agent', 'Skills Assessment AI', 'Background Verification Agent',
    'Onboarding Automation Agent', 'Contract Intelligence Agent', 'Equipment Management Agent', 'Training Delivery Agent',
    'Performance Analytics Agent', 'Follow-up Coordination Agent', 'Network Expansion Agent', 'Certification Tracking Agent',
    'Competitive Intelligence Agent', 'Community Engagement Agent', 'Social Media Recruitment Agent', 'Retention Strategy Agent'
  ];

  const generateActivityData = () => {
    const activities = [];
    
    const detailedActivities = [
      // High-value recruitment activities
      {
        activityType: 'trade_show_engagement',
        description: 'Met with 18 potential contractors at National Home Services Expo - collected 15 qualified leads with HVAC/plumbing/electrical specializations',
        outcome: 'interested',
        nextAction: 'Schedule phone screenings for top 10 candidates within 48 hours',
        value: '$67K potential annual revenue',
        priority: 'high',
        assignedAgent: 'Technician Recruiting Agent',
        timeSpent: '8 hours',
        contractorCount: 18
      },
      {
        activityType: 'warm_referral_network',
        description: 'Top contractor James Martinez referred 4 qualified technicians from his network - all have 7+ years experience and active certifications',
        outcome: 'qualified',
        nextAction: 'Fast-track group interview with regional manager',
        value: '$48K potential annual revenue',
        priority: 'high',
        assignedAgent: 'Network Expansion Agent',
        timeSpent: '3 hours',
        contractorCount: 4
      },
      {
        activityType: 'industry_partner_introduction',
        description: 'Strategic partnership with Regional Contractors Association - gained exclusive access to 250+ vetted member directory with priority recruitment rights',
        outcome: 'partnership_signed',
        nextAction: 'Deploy AI-powered outreach campaign to association members',
        value: '$225K potential pipeline',
        priority: 'high',
        assignedAgent: 'Partnership Development Agent',
        timeSpent: '12 hours',
        contractorCount: 250
      },
      // Skills and certification activities
      {
        activityType: 'skills_assessment',
        description: 'Conducted technical skills assessment for electrical contractor - passed advanced troubleshooting scenarios',
        outcome: 'qualified',
        nextAction: 'Present contract terms and onboarding timeline',
        value: '$28K annual revenue potential',
        priority: 'medium'
      },
      {
        activityType: 'certification_verification',
        description: 'Verified EPA 608 certification and state electrical license for contractor candidate',
        outcome: 'verified',
        nextAction: 'Schedule final interview with regional manager',
        value: '$35K annual revenue potential',
        priority: 'medium'
      },
      // Technology and equipment engagement
      {
        activityType: 'equipment_delivery',
        description: 'Delivered iPad Pro, diagnostic tools, and branded uniforms to newly onboarded contractor',
        outcome: 'completed',
        nextAction: 'Schedule first customer assignment within 48 hours',
        value: '$42K projected first-year revenue',
        priority: 'high'
      },
      {
        activityType: 'training_session',
        description: 'Conducted Magik Button platform training - contractor achieved 95% proficiency score in customer communication tools',
        outcome: 'completed',
        nextAction: 'Monitor first week performance metrics',
        value: 'Platform adoption success',
        priority: 'medium'
      },
      // Performance and retention activities
      {
        activityType: 'performance_review',
        description: '30-day performance review with contractor - 92% customer satisfaction, $8,500 revenue generated',
        outcome: 'exceeding_expectations',
        nextAction: 'Discuss expansion to additional service areas',
        value: '$65K annual revenue potential',
        priority: 'high'
      },
      {
        activityType: 'contract_negotiation',
        description: 'Negotiated performance bonus structure for high-volume contractor - agreed to 12% commission on jobs over $500',
        outcome: 'terms_agreed',
        nextAction: 'Execute updated contractor agreement',
        value: '$15K additional annual commission',
        priority: 'medium'
      }
    ];
    
    const outcomes = [
      'interested', 'not_interested', 'scheduled', 'completed', 'no_response', 'declined', 
      'qualified', 'verified', 'partnership_signed', 'exceeding_expectations', 'terms_agreed',
      'requires_follow_up', 'referred_others', 'contract_signed', 'training_needed'
    ];
    
    const recruiters = [
      'Mike Chen - Senior Recruiter', 'Sarah Johnson - Regional Manager', 
      'David Rodriguez - Technical Recruiter', 'Lisa Thompson - Partnership Director',
      'Chris Wilson - Onboarding Specialist', 'Amanda Foster - Performance Coach',
      'Robert Kim - Equipment Coordinator', 'Jennifer Davis - Training Manager'
    ];
    
    const nextActions = [
      'Schedule phone screening within 24 hours',
      'Send equipment and onboarding package',
      'Coordinate technical skills assessment',
      'Arrange meeting with regional operations manager',
      'Deploy first customer assignment',
      'Schedule 30-day performance review',
      'Process contractor agreement and background check',
      'Enroll in advanced certification program',
      'Connect with mentor contractor in area',
      'Schedule equipment delivery and setup'
    ];
    
    // Add detailed high-value activities
    detailedActivities.forEach((activity, index) => {
      activities.push({
        id: index + 1,
        ...activity,
        planningArea: PLANNING_AREAS[Math.floor(Math.random() * PLANNING_AREAS.length)],
        recruiter: recruiters[Math.floor(Math.random() * recruiters.length)],
        date: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        timeSpent: `${Math.floor(Math.random() * 3) + 1} hours`,
        contractorCount: Math.floor(Math.random() * 8) + 1
      });
    });
    
    // Add additional varied activities with agent assignments
    for (let i = detailedActivities.length; i < 320; i++) {
      const activityType = ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)];
      activities.push({
        id: i + 1,
        activityType,
        planningArea: PLANNING_AREAS[Math.floor(Math.random() * PLANNING_AREAS.length)],
        description: getActivityDescription(activityType, i),
        outcome: outcomes[Math.floor(Math.random() * outcomes.length)],
        recruiter: recruiters[Math.floor(Math.random() * recruiters.length)],
        nextAction: nextActions[Math.floor(Math.random() * nextActions.length)],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        timeSpent: `${Math.floor(Math.random() * 6) + 1} hours`,
        contractorCount: Math.floor(Math.random() * 12) + 1,
        value: `$${(Math.floor(Math.random() * 85) + 15)}K potential`,
        priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        assignedAgent: AI_AGENTS[Math.floor(Math.random() * AI_AGENTS.length)]
      });
    }
    
    return activities;
  };

  // Generate realistic current work items for each person
  const generatePersonWork = (personId: number) => {
    const person = TEAM_MEMBERS.find(p => p.id === personId);
    if (!person) return [];

    const workItems = [];
    const baseActivities = Math.floor(Math.random() * 5) + 3; // 3-7 active work items

    for (let i = 0; i < baseActivities; i++) {
      const activityType = WORK_ACTIVITY_TYPES[Math.floor(Math.random() * WORK_ACTIVITY_TYPES.length)];
      const assignedAgent = AI_AGENTS[Math.floor(Math.random() * AI_AGENTS.length)];
      
      workItems.push({
        id: `${personId}-${i}`,
        title: getWorkItemTitle(activityType, person.role),
        activityType,
        assignedAgent,
        status: ['in_progress', 'pending_review', 'waiting_response', 'completed'][Math.floor(Math.random() * 4)],
        priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        startTime: new Date(Date.now() - Math.random() * 8 * 60 * 60 * 1000), // Started within last 8 hours
        estimatedCompletion: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000), // Complete within 24 hours
        contractorsInvolved: Math.floor(Math.random() * 8) + 1,
        planningArea: person.planningArea,
        description: getWorkItemDescription(activityType, person.role),
        aiAgentActions: generateAgentActions(assignedAgent, activityType)
      });
    }

    return workItems;
  };

  const getWorkItemTitle = (activityType: string, role: string): string => {
    const titles = {
      'contractor_outreach': [
        'LinkedIn outreach campaign to certified HVAC technicians',
        'Direct email campaign to independent contractors',
        'Phone outreach to qualified plumbing contractors',
        'Referral network activation for electrical technicians'
      ],
      'interview_coordination': [
        'Schedule group interviews for Dallas Metro contractors',
        'Coordinate video interviews with California candidates',
        'Arrange skills assessment sessions for Florida applicants',
        'Set up panel interviews for New York technicians'
      ],
      'skills_assessment': [
        'Conduct HVAC certification verification for 5 candidates',
        'Evaluate electrical troubleshooting skills for contractors',
        'Review plumbing expertise for Chicago Metro applicants',
        'Assess multi-trade capabilities for Boston candidates'
      ],
      'partnership_development': [
        'Negotiate partnership with Regional Contractors Association',
        'Develop relationship with Local Trade School network',
        'Establish connection with Equipment Supplier partners',
        'Create alliance with Industry Certification Board'
      ]
    };

    const typeList = (titles as any)[activityType] || [`${activityType.replace('_', ' ')} coordination for planning area`];
    return typeList[Math.floor(Math.random() * typeList.length)];
  };

  const getWorkItemDescription = (activityType: string, role: string): string => {
    return `Currently executing ${activityType.replace('_', ' ')} activities as ${role}. Working with AI agents to optimize process efficiency and candidate quality.`;
  };

  const generateAgentActions = (agentName: string, activityType: string) => {
    const actions = [];
    const actionCount = Math.floor(Math.random() * 6) + 3; // 3-8 actions

    for (let i = 0; i < actionCount; i++) {
      actions.push({
        id: `action-${i}`,
        timestamp: new Date(Date.now() - Math.random() * 4 * 60 * 60 * 1000), // Within last 4 hours
        action: getAgentAction(agentName, activityType, i),
        status: i === 0 ? 'active' : 'completed',
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
        nextAction: i === 0 ? getNextAgentAction(agentName, activityType) : null
      });
    }

    return actions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const getAgentAction = (agentName: string, activityType: string, index: number): string => {
    const agentActions = {
      'Technician Recruiting Agent': [
        'Analyzed LinkedIn profiles of 47 certified technicians',
        'Identified 12 high-potential candidates in target planning area',
        'Generated personalized outreach messages for top candidates',
        'Scheduled follow-up sequences for interested contractors',
        'Updated candidate scoring based on response patterns'
      ],
      'Partnership Development Agent': [
        'Researched 23 potential industry partnerships',
        'Initiated contact with Regional Contractors Association',
        'Drafted partnership proposal with value proposition analysis',
        'Scheduled discovery calls with association leadership',
        'Created partnership pipeline tracking system'
      ],
      'Skills Assessment AI': [
        'Evaluated technical certifications for 8 candidates',
        'Analyzed skill gap patterns across planning areas',
        'Generated competency reports for hiring managers',
        'Recommended additional training for borderline candidates',
        'Updated skills assessment criteria based on market trends'
      ]
    };

    const actions = (agentActions as any)[agentName] || [
      'Processed candidate data and generated insights',
      'Optimized workflow efficiency for assigned tasks',
      'Coordinated with other AI agents for seamless execution',
      'Generated performance metrics and success indicators',
      'Updated knowledge base with latest market information'
    ];

    return actions[index % actions.length];
  };

  const getNextAgentAction = (agentName: string, activityType: string): string => {
    return `Continue ${activityType.replace('_', ' ')} optimization and prepare status update for human coordinator`;
  };

  // Generate AI agent activity feed
  const generateAgentActivityFeed = () => {
    const activities = [];
    const totalActivities = 50;

    for (let i = 0; i < totalActivities; i++) {
      const agent = AI_AGENTS[Math.floor(Math.random() * AI_AGENTS.length)];
      const person = TEAM_MEMBERS[Math.floor(Math.random() * TEAM_MEMBERS.length)];
      const activityType = WORK_ACTIVITY_TYPES[Math.floor(Math.random() * WORK_ACTIVITY_TYPES.length)];
      
      activities.push({
        id: `feed-${i}`,
        timestamp: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000), // Within last 12 hours
        agentName: agent,
        personName: person.name,
        activityType,
        action: getAgentAction(agent, activityType, Math.floor(Math.random() * 5)),
        status: ['completed', 'active', 'pending'][Math.floor(Math.random() * 3)],
        planningArea: person.planningArea,
        impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        contractorsAffected: Math.floor(Math.random() * 15) + 1
      });
    }

    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const handleAddWork = () => {
    if (!selectedPerson) return;
    
    // Here you would normally call an API to save the work item
    console.log('Adding work item:', newWorkItem, 'for person:', selectedPerson);
    
    // Reset form and close modal
    setNewWorkItem({
      title: '',
      description: '',
      priority: 'medium',
      assignedAgent: '',
      contractorsInvolved: '',
      estimatedHours: '',
      planningArea: '',
      department: ''
    });
    setShowAddWork(false);
    
    // In a real app, you'd refresh the work items here
  };

  const handleEditWork = (workItem: any) => {
    setEditingWork(workItem);
    setNewWorkItem({
      title: workItem.title,
      description: workItem.description,
      priority: workItem.priority,
      assignedAgent: workItem.assignedAgent,
      contractorsInvolved: workItem.contractorsInvolved.toString(),
      estimatedHours: '8', // Default hours
      planningArea: workItem.planningArea || '',
      department: workItem.department || ''
    });
    setShowEditWork(true);
  };

  const handleUpdateWork = () => {
    if (!editingWork) return;
    
    // Here you would normally call an API to update the work item
    console.log('Updating work item:', editingWork.id, 'with data:', newWorkItem);
    
    // Reset form and close modal
    setNewWorkItem({
      title: '',
      description: '',
      priority: 'medium',
      assignedAgent: '',
      contractorsInvolved: '',
      estimatedHours: '',
      planningArea: '',
      department: ''
    });
    setEditingWork(null);
    setShowEditWork(false);
    
    // In a real app, you'd refresh the work items here
  };

  const handleDeleteWork = (workItem: any) => {
    if (confirm('Are you sure you want to delete this work item?')) {
      // Here you would normally call an API to delete the work item
      console.log('Deleting work item:', workItem.id);
      
      // In a real app, you'd refresh the work items here
    }
  };

  const handleViewPersonDetails = (person: any) => {
    setSelectedPersonDetails(person);
    setShowPersonDetails(true);
  };
  
  const getActivityDescription = (type: string, index: number): string => {
    const descriptions = {
      'targeted_digital_outreach': [
        'AI-powered LinkedIn campaign targeting certified HVAC technicians with 5+ years experience',
        'Personalized email sequence to licensed contractors in competitive markets',
        'Social media advertising campaign for multi-skilled home service professionals',
        'Direct message campaign to independent contractors with excellent ratings'
      ],
      'warm_referral_network': [
        'Top-performing contractor referred 3 qualified colleagues from previous employer',
        'Customer champions recommended trusted repair technicians from their network',
        'Vendor partnership generated qualified referrals from supply chain contacts',
        'Industry association member provided exclusive access to certified professionals'
      ],
      'phone_screening': [
        'Phone interview with experienced appliance repair contractor',
        'Screening call for multi-trade independent contractor',
        'Initial phone assessment for electrical contractor candidate',
        'Qualification call with plumbing contractor referral'
      ],
      'video_interview': [
        'Virtual interview with contractor team - assessed communication skills',
        'Video screening for technical contractor with 8+ years experience',
        'Remote interview for appliance repair specialist',
        'Online meeting with contractor partnership candidate'
      ],
      'skills_assessment': [
        'Technical skills test for electrical troubleshooting scenarios',
        'Hands-on HVAC diagnostic assessment completed',
        'Customer service and communication skills evaluation',
        'Multi-appliance repair competency examination'
      ],
      'training_session': [
        'Magik Button platform training and customer communication tools',
        'Safety protocols and compliance training session',
        'Advanced diagnostic equipment training completed',
        'Customer service excellence workshop conducted'
      ]
    };
    
    const typeDescriptions = (descriptions as any)[type] || [`${type.replace('_', ' ')} activity conducted with contractor candidates`];
    return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
  };

  const contractors = generateContractorData();
  const targets = generateTargetData();
  const activities = generateActivityData();

  // Advanced filtering logic
  const getStateFromArea = (area: string) => area.split(' ')[0];
  
  const filteredContractors = contractors.filter(c => {
    const matchesArea = selectedPlanningArea === 'all' || c.planningArea === selectedPlanningArea;
    const matchesSearch = !searchTerm || 
      c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.planningArea.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = stateFilter === 'all' || getStateFromArea(c.planningArea) === stateFilter;
    const matchesPerformance = performanceFilter === 'all' || 
      (performanceFilter === 'high' && c.completionRate >= 90) ||
      (performanceFilter === 'medium' && c.completionRate >= 75 && c.completionRate < 90) ||
      (performanceFilter === 'low' && c.completionRate < 75);
    
    return matchesArea && matchesSearch && matchesState && matchesPerformance;
  });
  
  const filteredTargets = targets.filter(t => {
    const matchesArea = selectedPlanningArea === 'all' || t.planningArea === selectedPlanningArea;
    const matchesSearch = !searchTerm || t.planningArea.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = stateFilter === 'all' || getStateFromArea(t.planningArea) === stateFilter;
    
    return matchesArea && matchesSearch && matchesState;
  });
  
  const filteredActivities = activities.filter(a => {
    const matchesArea = selectedPlanningArea === 'all' || a.planningArea === selectedPlanningArea;
    const matchesSearch = !searchTerm || 
      a.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.planningArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.recruiter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = stateFilter === 'all' || getStateFromArea(a.planningArea) === stateFilter;
    
    return matchesArea && matchesSearch && matchesState;
  });
  
  // Get unique states for filter
  const uniqueStates = Array.from(new Set(contractors.map(c => getStateFromArea(c.planningArea)))).sort();

  const agentActivityFeed = generateAgentActivityFeed();
  const filteredMembers = TEAM_MEMBERS.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    totalContractors: contractors.length,
    filteredContractors: filteredContractors.length,
    activeContractors: contractors.filter(c => c.recruitmentStatus === 'active').length,
    pendingScreening: contractors.filter(c => c.recruitmentStatus === 'screening').length,
    totalTargets: targets.length,
    highPriorityTargets: targets.filter(t => t.urgencyLevel === 'high').length,
    planningAreas: PLANNING_AREAS.length,
    totalActivities: activities.length,
    recentActivities: activities.filter(a => new Date(a.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    avgCompletionRate: Math.round(contractors.reduce((sum, c) => sum + c.completionRate, 0) / contractors.length),
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation('/dashboard')}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">1099 Contractor Recruitment</h1>
              <p className="text-gray-400">National contractor recruitment with person work tracking and AI agent activity feeds</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600 text-white px-3 py-1">
              <MapPin className="w-4 h-4 mr-1" />
              {selectedPlanningArea === 'all' ? 'All Areas' : selectedPlanningArea}
            </Badge>
            <Badge className="bg-green-600 text-white px-3 py-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              {stats.avgCompletionRate}% Avg Performance
            </Badge>
          </div>
        </div>

        {/* Advanced Filtering */}
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filtering & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search contractors, areas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Planning Area</label>
                <Select value={selectedPlanningArea} onValueChange={setSelectedPlanningArea}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 max-h-60">
                    <SelectItem value="all" className="text-white">All Areas ({PLANNING_AREAS.length})</SelectItem>
                    {PLANNING_AREAS.map((area) => (
                      <SelectItem key={area} value={area} className="text-white">
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">State Filter</label>
                <Select value={stateFilter} onValueChange={setStateFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 max-h-60">
                    <SelectItem value="all" className="text-white">All States</SelectItem>
                    {uniqueStates.map((state) => (
                      <SelectItem key={state} value={state} className="text-white">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Performance</label>
                <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all" className="text-white">All Performance</SelectItem>
                    <SelectItem value="high" className="text-white">High (90%+)</SelectItem>
                    <SelectItem value="medium" className="text-white">Medium (75-89%)</SelectItem>
                    <SelectItem value="low" className="text-white">Low (&lt;75%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* National Scale Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.totalContractors.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Total Contractors</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-300">{stats.filteredContractors.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Filtered Results</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.activeContractors.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Active</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.pendingScreening.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Screening</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.totalTargets.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Total Targets</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{stats.highPriorityTargets.toLocaleString()}</div>
              <div className="text-xs text-gray-400">High Priority</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{stats.totalActivities.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Total Activities</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-teal-400">{stats.planningAreas.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Planning Areas</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800 border-gray-700">
            <TabsTrigger value="contractors" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-1" />
              Contractors
            </TabsTrigger>
            <TabsTrigger value="targets" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-1" />
              Targets
            </TabsTrigger>
            <TabsTrigger value="activities" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-1" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="individual-work" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-1" />
              Individual Work
            </TabsTrigger>
            <TabsTrigger value="ai-activity" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Bot className="w-4 h-4 mr-1" />
              AI Agent Feed
            </TabsTrigger>
            <TabsTrigger value="team-overview" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-1" />
              Team Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contractors" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Contractors ({filteredContractors.length} of {stats.totalContractors} total)
                  </CardTitle>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Contractor
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {filteredContractors.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No contractors match your current filters</p>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setSearchTerm('');
                        setStateFilter('all');
                        setPerformanceFilter('all');
                        setSelectedPlanningArea('all');
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredContractors.slice(0, 50).map((contractor) => (
                      <div key={contractor.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-white font-medium">
                                {contractor.firstName} {contractor.lastName}
                              </h3>
                              <Badge className={
                                contractor.completionRate >= 90 ? 'bg-green-600' :
                                contractor.completionRate >= 75 ? 'bg-yellow-600' :
                                'bg-red-600'
                              }>
                                {contractor.completionRate}%
                              </Badge>
                            </div>
                            <p className="text-gray-400 text-sm">{contractor.planningArea}</p>
                            <p className="text-gray-400 text-sm">{contractor.yearsExperience} years • ${contractor.hourlyRate}/hr</p>
                          </div>
                          <Badge className={
                            contractor.recruitmentStatus === 'active' ? 'bg-green-600' :
                            contractor.recruitmentStatus === 'screening' ? 'bg-yellow-600' :
                            contractor.recruitmentStatus === 'interview' ? 'bg-blue-600' :
                            contractor.recruitmentStatus === 'onboarding' ? 'bg-purple-600' :
                            'bg-gray-600'
                          }>
                            {contractor.recruitmentStatus.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {filteredContractors.length > 50 && (
                      <div className="text-center py-4">
                        <p className="text-gray-400">Showing first 50 of {filteredContractors.length} results</p>
                        <p className="text-gray-400 text-sm">Use filters to narrow down results</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="targets" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Recruitment Targets for {selectedPlanningArea} ({filteredTargets.length})
                  </CardTitle>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Target
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {filteredTargets.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No recruitment targets match your current filters</p>
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => {
                        setSearchTerm('');
                        setStateFilter('all');
                        setSelectedPlanningArea('all');
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredTargets.slice(0, 50).map((target) => (
                      <div key={target.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-white font-medium">{target.planningArea}</h3>
                              <Badge className={
                                target.urgencyLevel === 'high' ? 'bg-red-600' :
                                target.urgencyLevel === 'medium' ? 'bg-yellow-600' :
                                'bg-green-600'
                              }>
                                {target.urgencyLevel} priority
                              </Badge>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">Target</p>
                                <p className="text-white font-medium">{target.targetContractors}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Current</p>
                                <p className="text-white font-medium">{target.currentContractors}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Gap</p>
                                <p className={`font-medium ${target.targetContractors - target.currentContractors > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                  {target.targetContractors - target.currentContractors > 0 ? '+' : ''}{target.targetContractors - target.currentContractors}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="w-full bg-gray-600 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${Math.min(100, (target.currentContractors / target.targetContractors) * 100)}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">
                                {Math.round((target.currentContractors / target.targetContractors) * 100)}% complete
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredTargets.length > 50 && (
                      <div className="text-center py-4">
                        <p className="text-gray-400">Showing first 50 of {filteredTargets.length} results</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Advanced Recruitment Activities ({filteredActivities.length} of {stats.totalActivities})</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">Comprehensive contractor engagement and recruitment tracking</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setShowTradeShow(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Trade Show Event
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => setShowLogActivity(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Log Activity
                    </Button>
                  </div>
                </div>
                
                {/* Activity Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="bg-gray-700 rounded p-3 text-center">
                    <div className="text-xl font-bold text-blue-400">
                      {filteredActivities.filter(a => a.outcome === 'interested' || a.outcome === 'qualified').length}
                    </div>
                    <div className="text-xs text-gray-400">Qualified Leads</div>
                  </div>
                  <div className="bg-gray-700 rounded p-3 text-center">
                    <div className="text-xl font-bold text-green-400">
                      {filteredActivities.filter(a => a.outcome === 'completed' || a.outcome === 'contract_signed').length}
                    </div>
                    <div className="text-xs text-gray-400">Completed</div>
                  </div>
                  <div className="bg-gray-700 rounded p-3 text-center">
                    <div className="text-xl font-bold text-purple-400">
                      {filteredActivities.filter(a => a.activityType === 'trade_show_meeting' || a.activityType === 'partner_introduction').length}
                    </div>
                    <div className="text-xs text-gray-400">High-Value Events</div>
                  </div>
                  <div className="bg-gray-700 rounded p-3 text-center">
                    <div className="text-xl font-bold text-orange-400">
                      {filteredActivities.filter(a => new Date(a.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                    </div>
                    <div className="text-xs text-gray-400">This Week</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredActivities.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">No activities match your current filters</p>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        setSearchTerm('');
                        setStateFilter('all');
                        setSelectedPlanningArea('all');
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredActivities.slice(0, 50).map((activity) => (
                      <div key={activity.id} className="bg-gray-700 rounded-lg p-5 border-l-4 border-blue-500">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className={
                              activity.activityType === 'trade_show_engagement' ? 'bg-purple-600' :
                              activity.activityType === 'warm_referral_network' ? 'bg-green-600' :
                              activity.activityType === 'industry_partner_introduction' ? 'bg-blue-600' :
                              activity.activityType === 'hands_on_skills_assessment' ? 'bg-orange-600' :
                              activity.activityType === 'equipment_delivery_setup' ? 'bg-teal-600' :
                              activity.activityType === 'magik_button_training' ? 'bg-indigo-600' :
                              activity.activityType === '30_day_performance_review' ? 'bg-emerald-600' :
                              activity.activityType === 'contract_terms_negotiation' ? 'bg-amber-600' :
                              activity.activityType === 'video_interview_screening' ? 'bg-rose-600' :
                              activity.activityType === 'targeted_digital_outreach' ? 'bg-cyan-600' :
                              activity.activityType === 'competitor_conversion' ? 'bg-red-600' :
                              activity.activityType === 'social_media_recruitment' ? 'bg-pink-600' :
                              'bg-gray-600'
                            }>
                              {activity.activityType.replace(/_/g, ' ')}
                            </Badge>
                            {activity.priority && (
                              <Badge className={
                                activity.priority === 'high' ? 'bg-red-500' :
                                activity.priority === 'medium' ? 'bg-yellow-500' :
                                'bg-gray-500'
                              }>
                                {activity.priority} priority
                              </Badge>
                            )}
                            <span className="text-gray-400 text-sm">{activity.date}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-400 text-sm">by {activity.recruiter}</div>
                            {activity.timeSpent && (
                              <div className="text-gray-500 text-xs">{activity.timeSpent}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-white font-medium text-sm mb-1">{activity.planningArea}</p>
                          <p className="text-gray-300 text-sm leading-relaxed">{activity.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                          {activity.contractorCount && (
                            <div className="text-center bg-gray-600 rounded p-2">
                              <div className="text-white font-semibold">{activity.contractorCount}</div>
                              <div className="text-gray-400 text-xs">Contractors</div>
                            </div>
                          )}
                          {activity.value && (
                            <div className="text-center bg-gray-600 rounded p-2">
                              <div className="text-green-400 font-semibold">{activity.value}</div>
                              <div className="text-gray-400 text-xs">Value</div>
                            </div>
                          )}
                          <div className="text-center bg-gray-600 rounded p-2">
                            <Badge className={
                              activity.outcome === 'interested' ? 'bg-green-600' :
                              activity.outcome === 'scheduled' ? 'bg-blue-600' :
                              activity.outcome === 'completed' ? 'bg-teal-600' :
                              activity.outcome === 'qualified' ? 'bg-emerald-600' :
                              activity.outcome === 'verified' ? 'bg-cyan-600' :
                              activity.outcome === 'partnership_signed' ? 'bg-purple-600' :
                              activity.outcome === 'exceeding_expectations' ? 'bg-green-500' :
                              activity.outcome === 'terms_agreed' ? 'bg-blue-500' :
                              activity.outcome === 'contract_signed' ? 'bg-teal-500' :
                              activity.outcome === 'declined' ? 'bg-red-600' :
                              activity.outcome === 'no_response' ? 'bg-gray-600' :
                              'bg-yellow-600'
                            }>
                              {activity.outcome.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-600 pt-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                            {activity.assignedAgent && (
                              <div>
                                <span className="text-gray-400 text-xs">Assigned Agent:</span>
                                <Badge className="ml-2 bg-indigo-600 text-xs">{activity.assignedAgent}</Badge>
                              </div>
                            )}
                            <div className="text-right">
                              <span className="text-gray-400 text-xs">Status: </span>
                              <span className="text-green-400 text-xs font-medium">Active</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Next Action:</span>
                            <span className="text-white text-sm font-medium">{activity.nextAction}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredActivities.length > 50 && (
                      <div className="text-center py-4">
                        <p className="text-gray-400">Showing first 50 of {filteredActivities.length} results</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="individual-work" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Team Members List */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Team Members ({filteredMembers.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredMembers.map((member) => (
                        <div
                          key={member.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedPerson === member.id
                              ? 'bg-blue-900/20 border-blue-500'
                              : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                          }`}
                          onClick={() => setSelectedPerson(member.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 
                              className="text-white font-medium hover:text-blue-400 cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewPersonDetails(member);
                              }}
                            >
                              {member.name}
                            </h4>
                            <Badge className={
                              member.department === 'Recruitment' ? 'bg-green-600' :
                              member.department === 'Operations' ? 'bg-blue-600' :
                              member.department === 'Analytics' ? 'bg-purple-600' :
                              'bg-orange-600'
                            }>
                              {member.department}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm">{member.role}</p>
                          <p className="text-gray-500 text-xs mt-1">{member.planningArea}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Individual Work Details */}
              <div className="lg:col-span-2">
                {selectedPerson ? (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-white">
                            {TEAM_MEMBERS.find(m => m.id === selectedPerson)?.name} - Current Work
                          </CardTitle>
                          <p className="text-gray-400">
                            {TEAM_MEMBERS.find(m => m.id === selectedPerson)?.role} • {TEAM_MEMBERS.find(m => m.id === selectedPerson)?.planningArea}
                          </p>
                        </div>
                        <Button
                          onClick={() => setShowAddWork(true)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Work
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {generatePersonWork(selectedPerson).map((workItem) => (
                          <div key={workItem.id} className="bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="text-white font-medium mb-1">{workItem.title}</h4>
                                <p className="text-gray-400 text-sm mb-2">{workItem.description}</p>
                                
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge className={
                                    workItem.priority === 'high' ? 'bg-red-600' :
                                    workItem.priority === 'medium' ? 'bg-yellow-600' :
                                    'bg-green-600'
                                  }>
                                    {workItem.priority} priority
                                  </Badge>
                                  <Badge className={
                                    workItem.status === 'completed' ? 'bg-green-600' :
                                    workItem.status === 'in_progress' ? 'bg-blue-600' :
                                    'bg-gray-600'
                                  }>
                                    {workItem.status.replace('_', ' ')}
                                  </Badge>
                                  <Badge className="bg-indigo-600">
                                    <Bot className="w-3 h-3 mr-1" />
                                    {workItem.assignedAgent}
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-400">Started:</span>
                                    <p className="text-white">{formatTimeAgo(workItem.startTime)}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Est. Complete:</span>
                                    <p className="text-white">{formatTimeAgo(workItem.estimatedCompletion)}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Contractors:</span>
                                    <p className="text-white">{workItem.contractorsInvolved}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      className="bg-purple-600 hover:bg-purple-700"
                                      onClick={() => {
                                        setSelectedActivity(workItem);
                                        setShowActivityDetails(true);
                                      }}
                                    >
                                      <Eye className="w-3 h-3 mr-1" />
                                      AI Trace
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                      onClick={() => handleEditWork(workItem)}
                                    >
                                      <Edit className="w-3 h-3 mr-1" />
                                      Edit
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-red-600 text-red-300 hover:bg-red-900/20"
                                      onClick={() => handleDeleteWork(workItem)}
                                    >
                                      <Trash2 className="w-3 h-3 mr-1" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-white text-lg font-medium mb-2">Select a Team Member</h3>
                      <p className="text-gray-400">Choose a team member from the list to see their current work and AI agent activities</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-activity" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  AI Agent Activity Feed - Live Trace
                </CardTitle>
                <p className="text-gray-400">Real-time activity trace showing all AI agent actions with timestamps</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {agentActivityFeed.map((activity) => (
                    <div key={activity.id} className="bg-gray-700 rounded-lg p-4 border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-indigo-600">
                              <Bot className="w-3 h-3 mr-1" />
                              {activity.agentName}
                            </Badge>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <Badge className="bg-blue-600">{activity.personName}</Badge>
                            <Badge className={
                              activity.status === 'completed' ? 'bg-green-600' :
                              activity.status === 'active' ? 'bg-yellow-600' :
                              'bg-gray-600'
                            }>
                              {activity.status}
                            </Badge>
                          </div>
                          
                          <p className="text-white font-medium mb-1">{activity.action}</p>
                          <p className="text-gray-400 text-sm mb-2">
                            Activity: {activity.activityType.replace('_', ' ')} • Area: {activity.planningArea}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-400">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {formatTimeAgo(activity.timestamp)}
                            </span>
                            <span className="text-gray-400">
                              Impact: <span className={
                                activity.impact === 'high' ? 'text-red-400' :
                                activity.impact === 'medium' ? 'text-yellow-400' :
                                'text-green-400'
                              }>{activity.impact}</span>
                            </span>
                            <span className="text-gray-400">
                              Contractors: {activity.contractorsAffected}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team-overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{TEAM_MEMBERS.length}</div>
                    <div className="text-gray-400 text-sm">Active Team Members</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{AI_AGENTS.length}</div>
                    <div className="text-gray-400 text-sm">AI Agents Active</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {agentActivityFeed.filter(a => a.status === 'active').length}
                    </div>
                    <div className="text-gray-400 text-sm">Active AI Actions</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">
                      {agentActivityFeed.filter(a => a.timestamp > new Date(Date.now() - 60 * 60 * 1000)).length}
                    </div>
                    <div className="text-gray-400 text-sm">Actions Last Hour</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Department Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Recruitment', 'Operations', 'Analytics', 'Training'].map((dept) => {
                    const deptMembers = TEAM_MEMBERS.filter(m => m.department === dept);
                    const deptActivities = agentActivityFeed.filter(a => 
                      deptMembers.some(m => m.name === a.personName)
                    );
                    
                    return (
                      <div key={dept} className="bg-gray-700 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-3">{dept} Department</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Team Members:</span>
                            <span className="text-white">{deptMembers.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">AI Activities Today:</span>
                            <span className="text-white">{deptActivities.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Active Now:</span>
                            <span className="text-green-400">
                              {deptActivities.filter(a => a.status === 'active').length}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

        {/* Add Work Item Modal */}
        <Dialog open={showAddWork} onOpenChange={setShowAddWork}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Work Item</DialogTitle>
              <p className="text-gray-400">
                Adding work for: {selectedPerson ? TEAM_MEMBERS.find(m => m.id === selectedPerson)?.name : ''}
              </p>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Work Title *</label>
                  <Input
                    placeholder="e.g., Review contractor applications for Dallas Metro"
                    value={newWorkItem.title}
                    onChange={(e) => setNewWorkItem({...newWorkItem, title: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Priority</label>
                  <Select value={newWorkItem.priority} onValueChange={(value) => setNewWorkItem({...newWorkItem, priority: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="high" className="text-white">High Priority</SelectItem>
                      <SelectItem value="medium" className="text-white">Medium Priority</SelectItem>
                      <SelectItem value="low" className="text-white">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Description *</label>
                <Textarea
                  placeholder="Describe the work item, objectives, and expected outcomes..."
                  value={newWorkItem.description}
                  onChange={(e) => setNewWorkItem({...newWorkItem, description: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Assigned AI Agent</label>
                  <Select value={newWorkItem.assignedAgent} onValueChange={(value) => setNewWorkItem({...newWorkItem, assignedAgent: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select AI agent" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {AI_AGENTS.map(agent => (
                        <SelectItem key={agent} value={agent} className="text-white">
                          {agent}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Planning Area</label>
                  <Select value={newWorkItem.planningArea} onValueChange={(value) => setNewWorkItem({...newWorkItem, planningArea: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select planning area" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 max-h-48">
                      {PLANNING_AREAS.slice(0, 20).map(area => (
                        <SelectItem key={area} value={area} className="text-white">
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Contractors Involved</label>
                  <Input
                    placeholder="Number of contractors (e.g., 15)"
                    value={newWorkItem.contractorsInvolved}
                    onChange={(e) => setNewWorkItem({...newWorkItem, contractorsInvolved: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Estimated Hours</label>
                  <Input
                    placeholder="Hours to complete (e.g., 8)"
                    value={newWorkItem.estimatedHours}
                    onChange={(e) => setNewWorkItem({...newWorkItem, estimatedHours: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddWork(false);
                    setNewWorkItem({
                      title: '', description: '', priority: 'medium', assignedAgent: '',
                      contractorsInvolved: '', estimatedHours: '', planningArea: '', department: ''
                    });
                  }}
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddWork}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!newWorkItem.title || !newWorkItem.description}
                >
                  Add Work Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Work Item Modal */}
        <Dialog open={showEditWork} onOpenChange={setShowEditWork}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Work Item</DialogTitle>
              <p className="text-gray-400">
                Editing work for: {selectedPerson ? TEAM_MEMBERS.find(m => m.id === selectedPerson)?.name : ''}
              </p>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Work Title *</label>
                  <Input
                    placeholder="e.g., Review contractor applications for Dallas Metro"
                    value={newWorkItem.title}
                    onChange={(e) => setNewWorkItem({...newWorkItem, title: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Priority</label>
                  <Select value={newWorkItem.priority} onValueChange={(value) => setNewWorkItem({...newWorkItem, priority: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="high" className="text-white">High Priority</SelectItem>
                      <SelectItem value="medium" className="text-white">Medium Priority</SelectItem>
                      <SelectItem value="low" className="text-white">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Description *</label>
                <Textarea
                  placeholder="Describe the work item, objectives, and expected outcomes..."
                  value={newWorkItem.description}
                  onChange={(e) => setNewWorkItem({...newWorkItem, description: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Assigned AI Agent</label>
                  <Select value={newWorkItem.assignedAgent} onValueChange={(value) => setNewWorkItem({...newWorkItem, assignedAgent: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select AI agent" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {AI_AGENTS.map(agent => (
                        <SelectItem key={agent} value={agent} className="text-white">
                          {agent}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Planning Area</label>
                  <Select value={newWorkItem.planningArea} onValueChange={(value) => setNewWorkItem({...newWorkItem, planningArea: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select planning area" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 max-h-48">
                      {PLANNING_AREAS.slice(0, 20).map(area => (
                        <SelectItem key={area} value={area} className="text-white">
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Contractors Involved</label>
                  <Input
                    placeholder="Number of contractors (e.g., 15)"
                    value={newWorkItem.contractorsInvolved}
                    onChange={(e) => setNewWorkItem({...newWorkItem, contractorsInvolved: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Estimated Hours</label>
                  <Input
                    placeholder="Hours to complete (e.g., 8)"
                    value={newWorkItem.estimatedHours}
                    onChange={(e) => setNewWorkItem({...newWorkItem, estimatedHours: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEditWork(false);
                    setEditingWork(null);
                    setNewWorkItem({
                      title: '', description: '', priority: 'medium', assignedAgent: '',
                      contractorsInvolved: '', estimatedHours: '', planningArea: '', department: ''
                    });
                  }}
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateWork}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!newWorkItem.title || !newWorkItem.description}
                >
                  Update Work Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Person Details Modal */}
        <Dialog open={showPersonDetails} onOpenChange={setShowPersonDetails}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                {selectedPersonDetails?.name} - Job Description
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={
                  selectedPersonDetails?.department === 'Recruitment' ? 'bg-green-600' :
                  selectedPersonDetails?.department === 'Operations' ? 'bg-blue-600' :
                  selectedPersonDetails?.department === 'Analytics' ? 'bg-purple-600' :
                  'bg-orange-600'
                }>
                  {selectedPersonDetails?.department}
                </Badge>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{selectedPersonDetails?.planningArea}</span>
              </div>
            </DialogHeader>
            
            {selectedPersonDetails && (
              <div className="space-y-6">
                {/* Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{selectedPersonDetails.role}</h3>
                  <p className="text-gray-300">{selectedPersonDetails.description}</p>
                </div>

                {/* Daily Tasks */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Daily Tasks
                  </h4>
                  <div className="grid gap-2">
                    {selectedPersonDetails.dailyTasks?.map((task: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-gray-700 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Sources */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Data Sources
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedPersonDetails.dataSources?.map((source: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-700 rounded border-l-2 border-purple-500">
                        <span className="text-gray-300 text-sm">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KPIs */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Key Performance Indicators (KPIs)
                  </h4>
                  <div className="grid gap-2">
                    {selectedPersonDetails.kpis?.map((kpi: string, index: number) => (
                      <div key={index} className="p-3 bg-gray-700 rounded-lg border-l-4 border-green-500">
                        <span className="text-gray-300 text-sm">{kpi}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Integration */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    AI Agent Integration
                  </h4>
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-600">
                    <p className="text-gray-300 text-sm">{selectedPersonDetails.aiIntegration}</p>
                  </div>
                </div>

                {/* Reporting & Escalation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Reporting Frequency
                    </h4>
                    <div className="p-3 bg-gray-700 rounded-lg">
                      <p className="text-gray-300 text-sm">{selectedPersonDetails.reportingFrequency}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Escalation Triggers
                    </h4>
                    <div className="p-3 bg-red-900/20 rounded-lg border border-red-600">
                      <p className="text-gray-300 text-sm">{selectedPersonDetails.escalationTriggers}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={() => setShowPersonDetails(false)}
                    className="bg-gray-600 hover:bg-gray-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* AI Activity Details Modal */}
        <Dialog open={showActivityDetails} onOpenChange={setShowActivityDetails}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">AI Agent Activity Trace</DialogTitle>
            </DialogHeader>
            {selectedActivity && (
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">{selectedActivity.title}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-indigo-600">
                      <Bot className="w-3 h-3 mr-1" />
                      {selectedActivity.assignedAgent}
                    </Badge>
                    <Badge className="bg-blue-600">{selectedActivity.planningArea}</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-white font-medium">Agent Action Timeline</h5>
                  {selectedActivity.aiAgentActions?.map((action: any) => (
                    <div key={action.id} className="bg-gray-700 rounded-lg p-4 border-l-4 border-purple-500">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={
                              action.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                            }>
                              {action.status}
                            </Badge>
                            <span className="text-gray-400 text-sm">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {formatTimeAgo(action.timestamp)}
                            </span>
                            <Badge className="bg-purple-600">
                              {action.confidence}% confidence
                            </Badge>
                          </div>
                          
                          <p className="text-white font-medium mb-1">{action.action}</p>
                          {action.nextAction && (
                            <p className="text-gray-400 text-sm">
                              Next: {action.nextAction}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setShowActivityDetails(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Log Activity Modal */}
        <Dialog open={showLogActivity} onOpenChange={setShowLogActivity}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Log New Recruitment Activity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Activity Type</label>
                  <Select value={newActivity.activityType} onValueChange={(value) => setNewActivity({...newActivity, activityType: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {ACTIVITY_TYPES.map(type => (
                        <SelectItem key={type} value={type} className="text-white">
                          {type.replace(/_/g, ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Planning Area</label>
                  <Select value={newActivity.planningArea} onValueChange={(value) => setNewActivity({...newActivity, planningArea: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 max-h-48">
                      {PLANNING_AREAS.slice(0, 20).map(area => (
                        <SelectItem key={area} value={area} className="text-white">
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Assigned AI Agent</label>
                <Select value={newActivity.assignedAgent} onValueChange={(value) => setNewActivity({...newActivity, assignedAgent: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select AI agent" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {AI_AGENTS.map(agent => (
                      <SelectItem key={agent} value={agent} className="text-white">
                        {agent}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Description</label>
                <Textarea 
                  placeholder="Describe the recruitment activity and its outcomes..."
                  className="bg-gray-700 border-gray-600 text-white"
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Priority</label>
                  <Select value={newActivity.priority} onValueChange={(value) => setNewActivity({...newActivity, priority: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="high" className="text-white">High Priority</SelectItem>
                      <SelectItem value="medium" className="text-white">Medium Priority</SelectItem>
                      <SelectItem value="low" className="text-white">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Expected Value</label>
                  <Input 
                    placeholder="e.g., $50K potential"
                    className="bg-gray-700 border-gray-600 text-white"
                    value={newActivity.value}
                    onChange={(e) => setNewActivity({...newActivity, value: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Outcome</label>
                  <Select value={newActivity.outcome} onValueChange={(value) => setNewActivity({...newActivity, outcome: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select outcome" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="interested" className="text-white">Interested</SelectItem>
                      <SelectItem value="qualified" className="text-white">Qualified</SelectItem>
                      <SelectItem value="scheduled" className="text-white">Scheduled</SelectItem>
                      <SelectItem value="completed" className="text-white">Completed</SelectItem>
                      <SelectItem value="requires_follow_up" className="text-white">Requires Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Next Action</label>
                <Input 
                  placeholder="What's the next step for this activity?"
                  className="bg-gray-700 border-gray-600 text-white"
                  value={newActivity.nextAction}
                  onChange={(e) => setNewActivity({...newActivity, nextAction: e.target.value})}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowLogActivity(false);
                    setNewActivity({
                      activityType: '', description: '', planningArea: '', outcome: '', 
                      nextAction: '', priority: 'medium', value: '', assignedAgent: ''
                    });
                  }}
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!newActivity.activityType || !newActivity.description}
                >
                  Log Activity
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Trade Show Event Modal */}
        <Dialog open={showTradeShow} onOpenChange={setShowTradeShow}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Create Trade Show Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-purple-900/20 border border-purple-600 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-purple-600">High-Value Event</Badge>
                  <span className="text-purple-400 text-sm">Potential: $50K-$200K pipeline</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Trade show events are high-impact recruitment activities that connect with multiple qualified contractors simultaneously.
                  These events typically generate 15-50 qualified leads per event.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Event Name</label>
                  <Input 
                    placeholder="e.g., National Home Services Expo 2025"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Location</label>
                  <Input 
                    placeholder="e.g., Dallas Convention Center"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Target Planning Areas</label>
                <Select>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select primary target areas" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="southwest" className="text-white">Southwest Region (TX, OK, NM)</SelectItem>
                    <SelectItem value="southeast" className="text-white">Southeast Region (FL, GA, SC)</SelectItem>
                    <SelectItem value="california" className="text-white">California Metro Areas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Expected Contractor Types</label>
                <div className="grid grid-cols-3 gap-2">
                  <Badge className="bg-orange-600 justify-center py-2">HVAC Specialists</Badge>
                  <Badge className="bg-blue-600 justify-center py-2">Plumbing Contractors</Badge>
                  <Badge className="bg-yellow-600 justify-center py-2">Electrical Technicians</Badge>
                  <Badge className="bg-green-600 justify-center py-2">Appliance Repair</Badge>
                  <Badge className="bg-purple-600 justify-center py-2">Multi-Trade Contractors</Badge>
                  <Badge className="bg-pink-600 justify-center py-2">New License Holders</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Assigned Agent</label>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select AI agent" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="recruiting" className="text-white">Technician Recruiting Agent</SelectItem>
                      <SelectItem value="community" className="text-white">Community Engagement Agent</SelectItem>
                      <SelectItem value="partnership" className="text-white">Partnership Development Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Expected Leads</label>
                  <Select>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Estimate contractor contacts" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="15-25" className="text-white">15-25 qualified leads</SelectItem>
                      <SelectItem value="25-40" className="text-white">25-40 qualified leads</SelectItem>
                      <SelectItem value="40-60" className="text-white">40-60 qualified leads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowTradeShow(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Cancel
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Create Trade Show Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}