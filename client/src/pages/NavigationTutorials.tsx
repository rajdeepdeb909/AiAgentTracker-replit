import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NavigationBreadcrumbs from '@/components/NavigationBreadcrumbs';
import { 
  BarChart3, 
  Settings, 
  Zap, 
  MapPin, 
  Users, 
  Brain, 
  GraduationCap, 
  Bot, 
  Home, 
  AlertTriangle,
  Command,
  Presentation,
  DollarSign,
  Target,
  Phone,
  ClipboardCheck,
  ChartBar,
  Package,
  Building2,
  FileText,
  Shield,
  UserCog,
  PlayCircle,
  BookOpen,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  userRole: 'human' | 'ai' | 'both';
  actions: string[];
  dataGenerated: string[];
}

interface NavigationTutorial {
  id: string;
  title: string;
  icon: any;
  category: string;
  description: string;
  permission: string;
  route: string;
  overview: string;
  steps: TutorialStep[];
  integrations: string[];
  keyMetrics: string[];
}

const navigationTutorials: NavigationTutorial[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: BarChart3,
    category: 'Core Operations',
    description: 'Central command center for real-time AI agent performance and system overview',
    permission: 'view_dashboard',
    route: '/dashboard',
    overview: 'The Dashboard serves as America\'s Home Manager mission control, providing real-time visibility into all 28 AI agents, system performance metrics, and operational health indicators. It aggregates data from every subsystem to present a unified view of autonomous execution rates, revenue performance, and critical alerts.',
    steps: [
      {
        title: 'Daily System Health Review',
        description: 'Human executives review autonomous execution rates and system performance',
        userRole: 'human',
        actions: [
          'Review 94.8% autonomous execution rate displayed prominently',
          'Check active agent count (26/28) and identify offline agents',
          'Analyze monthly revenue vs. targets ($30M achieved)',
          'Review critical alerts requiring human intervention'
        ],
        dataGenerated: [
          'Executive access logs and review timestamps',
          'Decision points marked for human oversight',
          'Performance threshold adjustments',
          'Alert acknowledgment records'
        ]
      },
      {
        title: 'Real-Time Performance Monitoring',
        description: 'AI agents continuously update dashboard metrics and performance indicators',
        userRole: 'ai',
        actions: [
          'Agent #1 updates executive KPI calculations every 5 minutes',
          'Agent #19 feeds performance analytics to dashboard widgets',
          'Agent #20 provides regional performance comparisons',
          'All agents report health status and operational metrics'
        ],
        dataGenerated: [
          'Real-time performance metrics from all 28 agents',
          'Revenue calculations and variance analysis',
          'System health indicators and uptime statistics',
          'Agent availability and response time metrics'
        ]
      },
      {
        title: 'Strategic Decision Making',
        description: 'Executives use dashboard insights to make informed strategic decisions',
        userRole: 'both',
        actions: [
          'Humans identify trends requiring strategic intervention',
          'AI agents provide predictive analytics and recommendations',
          'Collaborative analysis of performance gaps and opportunities',
          'Strategic adjustments based on real-time operational data'
        ],
        dataGenerated: [
          'Strategic decision records and justifications',
          'Performance trend analysis and forecasting',
          'Resource allocation adjustments',
          'Strategic initiative tracking and outcomes'
        ]
      }
    ],
    integrations: ['All 28 AI Agents', 'Financial Systems', 'Performance Analytics', 'Executive Operations Center'],
    keyMetrics: ['Autonomous Execution Rate', 'Active Agent Count', 'Monthly Revenue', 'System Performance Score']
  },
  {
    id: 'executive-operations',
    title: 'Executive Operations Center',
    icon: Settings,
    category: 'Core Operations',
    description: 'Comprehensive C-level executive management with business function leaders and OKR tracking',
    permission: 'view_executive_operations',
    route: '/executive-operations',
    overview: 'The Executive Operations Center provides comprehensive management tools for C-level executives, business function leaders, and operational OKRs. It supports both human business function leader management and AI agent OKR tracking with clear separation between human and AI objectives.',
    steps: [
      {
        title: 'Business Function Leader Management',
        description: 'C-level executives manage their direct reports and operational teams',
        userRole: 'human',
        actions: [
          'Create new business function leaders using role-specific templates',
          'Assign AI agents to business function leaders for collaborative execution',
          'Set operational OKRs for each business function area',
          'Review quarterly performance and adjust objectives'
        ],
        dataGenerated: [
          'Business function leader profiles and role assignments',
          'OKR definitions and progress tracking data',
          'AI agent assignment records and collaboration metrics',
          'Performance evaluation data and feedback loops'
        ]
      },
      {
        title: 'AI Agent OKR Performance Tracking',
        description: 'AI agents report performance against their assigned objectives',
        userRole: 'ai',
        actions: [
          'Each of 15+ AI agents updates their OKR progress automatically',
          'AI agents report to assigned business function leaders',
          'Autonomous rate metrics calculated and displayed (94.8%)',
          'Process volume and accuracy metrics continuously updated'
        ],
        dataGenerated: [
          'AI agent performance metrics and OKR progress',
          'Autonomous execution rate calculations',
          'Process volume statistics (45,976+ daily orders)',
          'Accuracy rates and system availability metrics'
        ]
      },
      {
        title: 'Strategic OKR Planning',
        description: 'Quarterly OKR planning and adjustment sessions',
        userRole: 'both',
        actions: [
          'Humans set strategic direction and high-level objectives',
          'AI agents provide data-driven insights for OKR calibration',
          'Collaborative goal setting with realistic performance targets',
          'Continuous monitoring and adjustment of objectives'
        ],
        dataGenerated: [
          'Quarterly OKR plans and strategic alignment records',
          'Performance benchmarking and competitive analysis',
          'Resource allocation decisions and budget adjustments',
          'Strategic initiative success metrics and outcomes'
        ]
      }
    ],
    integrations: ['Business Function Leaders', 'AI Agent Performance', 'OKR Tracking', 'Strategic Planning'],
    keyMetrics: ['OKR Progress %', 'AI Agent Performance', 'Business Function Efficiency', 'Strategic Alignment Score']
  },
  {
    id: 'live-activity',
    title: 'Live AI Agent Activity Feed',
    icon: Zap,
    category: 'Core Operations',
    description: 'Real-time monitoring of AI agent activities with date filtering and threat detection',
    permission: 'view_live_activity',
    route: '/live-activity',
    overview: 'The Live Activity Feed provides real-time visibility into all AI agent activities across the platform, including operational actions, human-in-the-loop approvals, and security threats. It supports comprehensive filtering by date ranges, activity types, and priority levels.',
    steps: [
      {
        title: 'Real-Time Activity Monitoring',
        description: 'Human coordinators monitor AI agent activities and approval requests',
        userRole: 'human',
        actions: [
          'Monitor live feed for critical activities requiring approval',
          'Use date range filtering to analyze historical patterns',
          'Filter by threat activities to review security incidents',
          'Approve or reject AI agent proposed actions'
        ],
        dataGenerated: [
          'Human approval decisions and justifications',
          'Activity review timestamps and response times',
          'Filtering preferences and usage patterns',
          'Security incident response and resolution records'
        ]
      },
      {
        title: 'Continuous Activity Generation',
        description: 'AI agents generate activities representing their operational work',
        userRole: 'ai',
        actions: [
          'All 28 agents log operational activities in real-time',
          'Security agents generate threat detection activities',
          'Approval-required activities trigger human notifications',
          'Activity metadata includes location, priority, and impact'
        ],
        dataGenerated: [
          'Real-time activity logs from all AI agents',
          'Threat detection and security incident reports',
          'Approval workflow data and escalation triggers',
          'Activity categorization and priority assignments'
        ]
      },
      {
        title: 'Historical Analysis and Trend Identification',
        description: 'Using date filtering to analyze patterns and improve operations',
        userRole: 'both',
        actions: [
          'Humans analyze historical data for operational improvements',
          'AI agents identify patterns in activity data',
          'Date range analysis reveals peak activity periods',
          'Threat activity analysis improves security protocols'
        ],
        dataGenerated: [
          'Historical activity analysis and trend reports',
          'Security pattern analysis and threat intelligence',
          'Operational efficiency insights and recommendations',
          'Activity volume forecasting and resource planning'
        ]
      }
    ],
    integrations: ['All AI Agents', 'Human Approval Workflows', 'Security Systems', 'Activity Analytics'],
    keyMetrics: ['Activities Today', 'Pending Approvals', 'Autonomous Rate', 'Threat Detection Count']
  },
  {
    id: 'technician-management',
    title: 'Technician Management',
    icon: Users,
    category: 'Core Operations',
    description: 'Comprehensive technician lifecycle management from recruitment to retention',
    permission: 'view_technician_mgmt',
    route: '/technician-management',
    overview: 'Technician Management provides end-to-end workforce management capabilities, supporting both W2 employees and 1099 contractors. The system integrates recruitment, performance tracking, retention strategies, and empowerment tools to optimize technician productivity and satisfaction.',
    steps: [
      {
        title: 'Technician Performance Review',
        description: 'Human managers review technician performance and provide coaching',
        userRole: 'human',
        actions: [
          'Review technician performance scorecards and metrics',
          'Conduct performance coaching sessions using AI recommendations',
          'Approve retention strategies for at-risk technicians',
          'Make decisions on promotions and recognition programs'
        ],
        dataGenerated: [
          'Performance review records and coaching notes',
          'Retention strategy approvals and outcomes',
          'Recognition and promotion decisions',
          'Manager feedback and development plans'
        ]
      },
      {
        title: 'Automated Performance Tracking',
        description: 'AI agents continuously monitor and analyze technician performance',
        userRole: 'ai',
        actions: [
          'Agent #21 tracks performance metrics and identifies trends',
          'Agent #22 monitors recruitment pipeline and candidate quality',
          'Agent #23 delivers personalized training recommendations',
          'Agent #26 predicts retention risks and suggests interventions'
        ],
        dataGenerated: [
          'Real-time performance metrics and trend analysis',
          'Recruitment pipeline data and candidate assessments',
          'Training completion rates and skill development tracking',
          'Retention risk scores and intervention recommendations'
        ]
      },
      {
        title: 'Technician Empowerment Programs',
        description: 'Collaborative development of technician empowerment initiatives',
        userRole: 'both',
        actions: [
          'Humans design empowerment programs and career paths',
          'AI agents identify skill gaps and training opportunities',
          'Magik Button implementations for technician efficiency',
          'Continuous feedback loops for program improvement'
        ],
        dataGenerated: [
          'Empowerment program participation and success rates',
          'Skill development tracking and certification records',
          'Magik Button usage analytics and satisfaction scores',
          'Career progression tracking and advancement metrics'
        ]
      }
    ],
    integrations: ['AI Agents #21-26', 'HR Systems', 'Training Platforms', 'Performance Analytics'],
    keyMetrics: ['Technician Count', 'Performance Score', 'Retention Rate', 'Satisfaction Index']
  },
  {
    id: 'parts-management',
    title: 'Parts Order Management',
    icon: Package,
    category: 'Business Operations',
    description: 'Intelligent parts ordering with predictive analytics and vendor management',
    permission: 'view_parts',
    route: '/parts-order-management',
    overview: 'Parts Order Management leverages AI-powered predictive analytics to optimize inventory levels, automate ordering processes, and ensure technicians have the right parts at the right time. The system integrates with vendor networks and provides real-time delivery tracking.',
    steps: [
      {
        title: 'Parts Order Approval and Vendor Management',
        description: 'Human procurement managers oversee strategic vendor relationships',
        userRole: 'human',
        actions: [
          'Approve high-value parts orders above threshold limits',
          'Negotiate vendor contracts and pricing agreements',
          'Review vendor performance metrics and quality standards',
          'Make strategic decisions on inventory investment levels'
        ],
        dataGenerated: [
          'Parts order approval records and justifications',
          'Vendor contract terms and performance evaluations',
          'Inventory investment decisions and budget allocations',
          'Quality control standards and compliance records'
        ]
      },
      {
        title: 'Predictive Parts Ordering',
        description: 'AI agents automate parts ordering based on predictive analytics',
        userRole: 'ai',
        actions: [
          'Agent #14 predicts parts demand using historical patterns',
          'Agent #18 automates routine parts ordering within parameters',
          'Predictive algorithms optimize inventory levels by location',
          'Real-time monitoring of parts usage and replenishment needs'
        ],
        dataGenerated: [
          'Predictive demand forecasting and accuracy metrics',
          'Automated order generation and approval workflows',
          'Inventory optimization recommendations and outcomes',
          'Parts usage patterns and replenishment analytics'
        ]
      },
      {
        title: 'Supply Chain Optimization',
        description: 'Collaborative optimization of the entire parts supply chain',
        userRole: 'both',
        actions: [
          'Humans set strategic supply chain policies and priorities',
          'AI agents optimize routing and delivery schedules',
          'Joint analysis of supply chain disruptions and responses',
          'Continuous improvement of order fulfillment processes'
        ],
        dataGenerated: [
          'Supply chain performance metrics and optimization results',
          'Delivery time improvements and cost reduction achievements',
          'Disruption response effectiveness and recovery times',
          'Order fulfillment accuracy and customer satisfaction scores'
        ]
      }
    ],
    integrations: ['AI Agents #14, #18', 'Vendor Networks', 'Inventory Systems', 'Delivery Tracking'],
    keyMetrics: ['Order Fulfillment Rate', 'Delivery Time', 'Inventory Turnover', 'Cost Savings']
  },
  {
    id: 'financial-intelligence',
    title: 'Financial Intelligence Dashboard',
    icon: DollarSign,
    category: 'Executive Leadership',
    description: 'Advanced financial analytics with P&L tracking and goal setting',
    permission: 'view_financial_intelligence',
    route: '/financial-intelligence-dashboard',
    overview: 'The Financial Intelligence Dashboard provides comprehensive financial analytics, P&L tracking, and goal-setting capabilities. It integrates real-time revenue data, cost analysis, and predictive financial modeling to support strategic financial decision-making.',
    steps: [
      {
        title: 'Financial Strategy and Goal Setting',
        description: 'CFO and financial leaders set targets and review performance',
        userRole: 'human',
        actions: [
          'Set quarterly and annual financial targets and budgets',
          'Review P&L performance against established goals',
          'Approve major financial investments and expenditures',
          'Make strategic pricing and cost optimization decisions'
        ],
        dataGenerated: [
          'Financial goals and target setting records',
          'Budget approvals and variance analysis reports',
          'Investment decisions and ROI tracking data',
          'Strategic financial policy changes and impacts'
        ]
      },
      {
        title: 'Real-Time Financial Analytics',
        description: 'AI agents provide continuous financial monitoring and analysis',
        userRole: 'ai',
        actions: [
          'Agent #19 calculates real-time P&L and variance analysis',
          'Financial AI agents track revenue per technician and region',
          'Automated cost analysis and efficiency measurements',
          'Predictive financial modeling for strategic planning'
        ],
        dataGenerated: [
          'Real-time financial metrics and performance indicators',
          'Revenue analysis by region, technician, and service type',
          'Cost optimization recommendations and savings opportunities',
          'Financial forecasting models and scenario analysis'
        ]
      },
      {
        title: 'Financial Performance Optimization',
        description: 'Collaborative financial performance improvement initiatives',
        userRole: 'both',
        actions: [
          'Humans review AI-generated financial insights and recommendations',
          'AI agents identify cost reduction and revenue enhancement opportunities',
          'Joint analysis of financial trends and market conditions',
          'Implementation of financial optimization strategies'
        ],
        dataGenerated: [
          'Financial optimization initiative tracking and results',
          'Cost reduction achievements and revenue improvements',
          'Market analysis insights and competitive positioning',
          'Financial performance benchmarking and improvement metrics'
        ]
      }
    ],
    integrations: ['AI Agent #19', 'Accounting Systems', 'Revenue Tracking', 'Budget Management'],
    keyMetrics: ['Monthly Revenue', 'Profit Margin', 'Cost per Service', 'ROI']
  },
  {
    id: 'agent-roster',
    title: 'Agent Roster',
    icon: Bot,
    category: 'Core Operations',
    description: 'Comprehensive management of all 28 AI agents with performance tracking',
    permission: 'view_agents',
    route: '/agents',
    overview: 'The Agent Roster provides detailed management capabilities for all 28 AI agents, including performance monitoring, evaluation scheduling, and optimization recommendations. It serves as the central hub for understanding and improving AI agent effectiveness.',
    steps: [
      {
        title: 'Agent Performance Evaluation',
        description: 'Human AI coordinators evaluate and optimize agent performance',
        userRole: 'human',
        actions: [
          'Conduct periodic performance evaluations using standardized templates',
          'Review agent recommendations and approve optimization changes',
          'Set performance thresholds and escalation procedures',
          'Make decisions on agent deployment and resource allocation'
        ],
        dataGenerated: [
          'Agent performance evaluation records and scores',
          'Optimization decisions and implementation tracking',
          'Performance threshold adjustments and policy changes',
          'Resource allocation decisions and utilization metrics'
        ]
      },
      {
        title: 'Continuous Self-Monitoring',
        description: 'AI agents monitor their own performance and report metrics',
        userRole: 'ai',
        actions: [
          'Each agent reports health status and operational metrics',
          'Self-evaluation against performance benchmarks',
          'Automated identification of performance degradation',
          'Generation of optimization recommendations for human review'
        ],
        dataGenerated: [
          'Agent health status and operational metrics',
          'Self-evaluation results and performance comparisons',
          'Performance degradation alerts and diagnostic data',
          'Optimization recommendations and improvement suggestions'
        ]
      },
      {
        title: 'Agent Ecosystem Optimization',
        description: 'Strategic optimization of the entire AI agent ecosystem',
        userRole: 'both',
        actions: [
          'Humans design agent interaction protocols and workflows',
          'AI agents optimize inter-agent communication and collaboration',
          'Joint analysis of ecosystem performance and bottlenecks',
          'Continuous improvement of agent capabilities and efficiency'
        ],
        dataGenerated: [
          'Agent ecosystem performance metrics and optimization results',
          'Inter-agent communication patterns and efficiency measures',
          'Workflow optimization outcomes and productivity improvements',
          'Agent capability enhancement tracking and success metrics'
        ]
      }
    ],
    integrations: ['All 28 AI Agents', 'Performance Systems', 'Evaluation Templates', 'Optimization Tools'],
    keyMetrics: ['Agent Performance Score', 'Uptime %', 'Task Completion Rate', 'Efficiency Index']
  },
  {
    id: 'retention-intelligence',
    title: 'Technician Retention Intelligence',
    icon: Brain,
    category: 'Core Operations',
    description: 'AI-powered technician retention with Magik Button empowerment framework',
    permission: 'view_retention',
    route: '/technician-retention',
    overview: 'Technician Retention Intelligence leverages AI Agent #26 to predict retention risks, implement personalized interventions, and deploy the Magik Button framework for technician empowerment. It focuses on proactive retention strategies and satisfaction optimization.',
    steps: [
      {
        title: 'Retention Risk Assessment',
        description: 'Human managers review AI-identified retention risks and intervention plans',
        userRole: 'human',
        actions: [
          'Review retention risk predictions and scored technician profiles',
          'Approve personalized intervention strategies for at-risk technicians',
          'Implement Magik Button use cases for technician empowerment',
          'Conduct retention coaching sessions and career development planning'
        ],
        dataGenerated: [
          'Retention intervention approvals and implementation records',
          'Magik Button deployment decisions and usage tracking',
          'Coaching session records and career development plans',
          'Manager feedback on retention strategy effectiveness'
        ]
      },
      {
        title: 'Predictive Retention Analytics',
        description: 'AI Agent #26 continuously monitors and predicts retention risks',
        userRole: 'ai',
        actions: [
          'Agent #26 calculates retention risk scores using 200+ data points',
          'Automated detection of satisfaction decline patterns',
          'Generation of personalized Magik Button recommendations',
          'Real-time monitoring of retention intervention effectiveness'
        ],
        dataGenerated: [
          'Retention risk scores and prediction accuracy metrics',
          'Satisfaction trend analysis and decline pattern detection',
          'Magik Button effectiveness tracking and usage analytics',
          'Retention intervention outcome measurements and success rates'
        ]
      },
      {
        title: 'Empowerment Program Development',
        description: 'Collaborative development of technician empowerment initiatives',
        userRole: 'both',
        actions: [
          'Humans design empowerment program frameworks and policies',
          'AI agents identify personalization opportunities and success patterns',
          'Joint analysis of Magik Button impact on satisfaction and productivity',
          'Continuous refinement of retention strategies based on outcomes'
        ],
        dataGenerated: [
          'Empowerment program participation rates and satisfaction scores',
          'Magik Button impact analysis and productivity improvements',
          'Retention strategy optimization results and best practices',
          'Program ROI analysis and cost-benefit assessments'
        ]
      }
    ],
    integrations: ['AI Agent #26', 'HR Systems', 'Magik Button Framework', 'Performance Analytics'],
    keyMetrics: ['Retention Risk Score', 'Magik Button Usage', 'Satisfaction Index', 'Turnover Reduction %']
  },
  {
    id: 'performance-analytics',
    title: 'Performance Analytics',
    icon: ChartBar,
    category: 'Business Operations',
    description: 'Comprehensive performance tracking across all business operations',
    permission: 'view_performance',
    route: '/performance',
    overview: 'Performance Analytics provides comprehensive tracking and analysis of all business operations, from individual technician performance to regional comparisons. It integrates real-time data from all 28 AI agents to provide actionable insights for operational optimization.',
    steps: [
      {
        title: 'Performance Review and Strategic Planning',
        description: 'Executives analyze performance data and set strategic direction',
        userRole: 'human',
        actions: [
          'Review regional performance comparisons and identify improvement areas',
          'Analyze job code performance trends and resource allocation needs',
          'Set performance targets and establish improvement initiatives',
          'Approve performance-based incentive programs and recognition systems'
        ],
        dataGenerated: [
          'Strategic performance targets and goal-setting records',
          'Regional improvement initiative approvals and tracking',
          'Incentive program designs and performance reward decisions',
          'Executive performance review notes and strategic adjustments'
        ]
      },
      {
        title: 'Real-Time Performance Monitoring',
        description: 'AI agents continuously track and analyze performance metrics',
        userRole: 'ai',
        actions: [
          'Agent #19 calculates real-time performance analytics and trends',
          'Agent #20 provides regional performance benchmarking',
          'Automated identification of performance anomalies and opportunities',
          'Generation of performance improvement recommendations'
        ],
        dataGenerated: [
          'Real-time performance metrics and trend analysis',
          'Regional benchmarking data and comparative analysis',
          'Performance anomaly detection and alert generation',
          'Improvement recommendations and optimization suggestions'
        ]
      },
      {
        title: 'Performance Optimization Implementation',
        description: 'Collaborative implementation of performance improvement strategies',
        userRole: 'both',
        actions: [
          'Humans implement strategic performance improvement initiatives',
          'AI agents track implementation progress and measure effectiveness',
          'Joint analysis of performance improvement outcomes and ROI',
          'Continuous optimization of performance management processes'
        ],
        dataGenerated: [
          'Performance improvement initiative tracking and results',
          'Implementation effectiveness measurements and ROI analysis',
          'Process optimization outcomes and efficiency gains',
          'Performance management best practices and success metrics'
        ]
      }
    ],
    integrations: ['AI Agents #19, #20', 'Regional Systems', 'Job Code Analytics', 'Performance Tracking'],
    keyMetrics: ['Performance Score', 'Regional Ranking', 'Improvement Rate', 'Efficiency Index']
  },
  {
    id: 'board-presentations',
    title: 'Board Presentations',
    icon: Presentation,
    category: 'Executive Leadership',
    description: 'Executive-level board presentations with comprehensive business metrics',
    permission: 'view_board_presentations',
    route: '/board-presentations',
    overview: 'Board Presentations provide executive-level insights and comprehensive business metrics for board meetings and strategic planning sessions. The system aggregates data from all business functions to present unified performance stories and strategic recommendations.',
    steps: [
      {
        title: 'Board Presentation Preparation',
        description: 'Executives prepare strategic presentations for board meetings',
        userRole: 'human',
        actions: [
          'Compile quarterly business performance summaries',
          'Prepare strategic initiative updates and outcome reports',
          'Review AI-generated insights and validate key metrics',
          'Customize presentations for specific board member interests'
        ],
        dataGenerated: [
          'Board presentation content and strategic narrative development',
          'Quarterly performance summaries and trend analysis',
          'Strategic initiative progress reports and outcome measurements',
          'Executive commentary and strategic recommendation records'
        ]
      },
      {
        title: 'Automated Data Aggregation',
        description: 'AI agents compile and analyze data for executive presentations',
        userRole: 'ai',
        actions: [
          'Comprehensive data aggregation from all 28 AI agents',
          'Automated generation of key performance indicators and trends',
          'Creation of executive summaries and strategic insights',
          'Real-time updating of presentation data and metrics'
        ],
        dataGenerated: [
          'Automated KPI calculations and performance summaries',
          'Strategic insight generation and trend identification',
          'Executive dashboard updates and metric compilations',
          'Board presentation data validation and accuracy verification'
        ]
      },
      {
        title: 'Strategic Decision Documentation',
        description: 'Board meetings generate strategic decisions and direction changes',
        userRole: 'both',
        actions: [
          'Board members review performance data and strategic recommendations',
          'Strategic decision making based on AI-generated insights',
          'Direction setting for operational improvements and investments',
          'Approval of strategic initiatives and resource allocations'
        ],
        dataGenerated: [
          'Board meeting minutes and strategic decision records',
          'Strategic direction changes and policy updates',
          'Investment approvals and resource allocation decisions',
          'Board feedback on operational performance and strategic alignment'
        ]
      }
    ],
    integrations: ['All Business Functions', 'Executive Systems', 'Strategic Planning', 'Performance Analytics'],
    keyMetrics: ['Board Approval Rate', 'Strategic Initiative Progress', 'ROI Achievements', 'Performance Targets']
  }
];

export default function NavigationTutorials() {
  const [selectedTutorial, setSelectedTutorial] = useState<string>('dashboard');
  const [activeStep, setActiveStep] = useState<number>(0);

  const currentTutorial = navigationTutorials.find(t => t.id === selectedTutorial);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <NavigationBreadcrumbs />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-blue-400">
            America's Home Manager - Navigation Tutorials
          </h1>
          <p className="text-gray-300 text-lg">
            Comprehensive tutorials for all navigation functions, explaining how human operators and AI agents collaborate to manage America's home services infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tutorial Selection */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Navigation Sections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {navigationTutorials.map((tutorial) => {
                  const Icon = tutorial.icon;
                  return (
                    <Button
                      key={tutorial.id}
                      variant={selectedTutorial === tutorial.id ? "default" : "ghost"}
                      className={`w-full justify-start text-left h-auto p-3 ${
                        selectedTutorial === tutorial.id 
                          ? "bg-blue-600 text-white" 
                          : "text-gray-300 hover:text-white hover:bg-gray-700"
                      }`}
                      onClick={() => {
                        setSelectedTutorial(tutorial.id);
                        setActiveStep(0);
                      }}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <Icon className="w-4 h-4 mt-1 flex-shrink-0" />
                        <div className="text-left">
                          <div className="font-medium">{tutorial.title}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {tutorial.category}
                          </div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Tutorial Content */}
          <div className="lg:col-span-3">
            {currentTutorial && (
              <div className="space-y-6">
                {/* Tutorial Header */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <currentTutorial.icon className="w-8 h-8 text-blue-400" />
                      <div>
                        <CardTitle className="text-2xl text-white">
                          {currentTutorial.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-blue-400 border-blue-400">
                            {currentTutorial.category}
                          </Badge>
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            Route: {currentTutorial.route}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg">
                      {currentTutorial.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-medium text-white mb-2">System Overview</h4>
                      <p className="text-gray-300 text-sm">
                        {currentTutorial.overview}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Tutorial Steps */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <PlayCircle className="w-5 h-5" />
                      Tutorial Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeStep.toString()} onValueChange={(value) => setActiveStep(parseInt(value))}>
                      <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                        {currentTutorial.steps.map((step, index) => (
                          <TabsTrigger 
                            key={index} 
                            value={index.toString()}
                            className="text-xs"
                          >
                            Step {index + 1}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {currentTutorial.steps.map((step, index) => (
                        <TabsContent key={index} value={index.toString()} className="mt-4">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Badge 
                                variant={step.userRole === 'human' ? "default" : step.userRole === 'ai' ? "secondary" : "outline"}
                                className={
                                  step.userRole === 'human' 
                                    ? "bg-green-600 text-white" 
                                    : step.userRole === 'ai'
                                    ? "bg-blue-600 text-white"
                                    : "bg-purple-600 text-white"
                                }
                              >
                                {step.userRole === 'human' ? 'Human-Led' : step.userRole === 'ai' ? 'AI-Led' : 'Collaborative'}
                              </Badge>
                              <h3 className="text-xl font-semibold text-white">
                                {step.title}
                              </h3>
                            </div>
                            
                            <p className="text-gray-300">
                              {step.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                                  <ArrowRight className="w-4 h-4" />
                                  Actions Performed
                                </h4>
                                <ul className="space-y-2">
                                  {step.actions.map((action, idx) => (
                                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                      {action}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                                  <BarChart3 className="w-4 h-4" />
                                  Data Generated
                                </h4>
                                <ul className="space-y-2">
                                  {step.dataGenerated.map((data, idx) => (
                                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                      {data}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Integration and Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        System Integrations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {currentTutorial.integrations.map((integration, idx) => (
                          <Badge key={idx} variant="outline" className="mr-2 mb-2 text-blue-400 border-blue-400">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Key Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {currentTutorial.keyMetrics.map((metric, idx) => (
                          <Badge key={idx} variant="outline" className="mr-2 mb-2 text-green-400 border-green-400">
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}