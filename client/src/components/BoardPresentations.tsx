import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import NavigationBreadcrumbs from './NavigationBreadcrumbs';
import { Link } from 'wouter';
import { 
  Presentation, 
  Download, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3,
  Target,
  Database,
  Settings,
  Zap,
  Building2
} from 'lucide-react';

interface BoardMetrics {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface ExecutivePresentationSlide {
  title: string;
  metrics: BoardMetrics[];
  keyInitiatives: string[];
  challenges: string[];
  recommendations: string[];
  presentationGuidelines?: {
    duration: string;
    format: string;
  };
}

const BoardPresentations: React.FC = () => {
  const [selectedExecutive, setSelectedExecutive] = useState<'ceo' | 'coo' | 'cfo' | 'cto' | 'cmo' | 'cdo' | 'cao'>('ceo');
  const [selectedTemplate, setSelectedTemplate] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');

  const openComprehensivePresentation = () => {
    window.open('/comprehensive-board-presentation-2025.html', '_blank');
  };

  const getExecutivePresentationData = (exec: string, template: string): ExecutivePresentationSlide => {
    const baseData: Record<string, Record<string, ExecutivePresentationSlide>> = {
      ceo: {
        monthly: {
          title: 'CEO Monthly Board Report - Strategic Leadership & Vision',
          metrics: [
            {
              title: 'Series A Progress',
              value: '$200M Target',
              change: '+$45M committed',
              trend: 'up',
              description: 'Fundraising milestone achievement toward $1B valuation'
            },
            {
              title: 'Market Leadership',
              value: '430 Markets',
              change: '+15 new areas',
              trend: 'up',
              description: 'Geographic expansion and market penetration'
            },
            {
              title: 'Investor Relations',
              value: '95% Confidence',
              change: '+5% this month',
              trend: 'up',
              description: 'Investor satisfaction and commitment level'
            },
            {
              title: 'Board Alignment',
              value: '100% Support',
              change: 'Unanimous',
              trend: 'up',
              description: 'Strategic direction and executive decisions'
            }
          ],
          keyInitiatives: [
            'Series A fundraising completion - targeting $200M by Q2',
            'Strategic partnerships with major B2B clients (AHS, Assurant, Choice)',
            'Executive team scaling - recruited CDO and CAO positions',
            'Market expansion strategy - targeting 500+ planning areas',
            'Competitive positioning against traditional home service providers'
          ],
          challenges: [
            'Capacity crisis: 2,000 daily reschedules impacting customer satisfaction',
            'Series A timeline pressures requiring demonstrable growth metrics',
            'Executive coordination across 7 C-level positions requiring clear communication',
            'Market competition from established players requiring differentiation strategy'
          ],
          recommendations: [
            'Accelerate 1099 contractor program to solve capacity crisis immediately',
            'Implement aggressive hiring plan to scale technician workforce by 75%',
            'Establish clear executive coordination protocols for daily operations',
            'Develop competitive moat through AI-first operational superiority'
          ]
        },
        quarterly: {
          title: 'CEO Quarterly Board Report - Strategic Leadership & Market Expansion (15 minutes)',
          metrics: [
            {
              title: 'Series A Progress',
              value: '$200M Target',
              change: '+$125M secured Q1',
              trend: 'up',
              description: 'Major fundraising milestone toward $1B valuation'
            },
            {
              title: 'Market Expansion',
              value: '430 Markets',
              change: '+45 new markets Q1',
              trend: 'up',
              description: 'Aggressive geographic expansion completed'
            },
            {
              title: 'AI Agent Portfolio',
              value: '28 Agents',
              change: '+3 LLM-focused agents',
              trend: 'up',
              description: 'Enhanced marketing intelligence capabilities'
            },
            {
              title: 'Revenue Growth',
              value: '$90M ARR',
              change: '+35% quarter growth',
              trend: 'up',
              description: 'Accelerating revenue trajectory'
            }
          ],
          keyInitiatives: [
            'Completed Series A first tranche - $125M secured with major VCs',
            'Launched LLM marketing intelligence strategy targeting AI-driven customer acquisition',
            'Established executive operations center with comprehensive daily management',
            'Expanded to all 430 planning areas with full operational coverage',
            'Built comprehensive competitive moat through AI-first operational superiority'
          ],
          challenges: [
            'Scaling challenges with rapid expansion requiring careful quality management',
            'Competitive responses from traditional players requiring strategic positioning',
            'Executive team coordination across multiple growth initiatives',
            'Technology infrastructure scaling to support 10x growth trajectory'
          ],
          recommendations: [
            'Continue aggressive expansion while maintaining service quality standards',
            'Double down on AI differentiation as sustainable competitive advantage',
            'Establish regional executive teams for better local market management',
            'Plan Series B preparation for continued expansion and market dominance'
          ]
        },
        annual: {
          title: 'CEO Annual Board Report - Strategic Vision & Long-term Growth (20 minutes)',
          metrics: [
            {
              title: 'Series A Completion',
              value: '$200M Raised',
              change: 'Full round closed',
              trend: 'up',
              description: 'Successfully achieved $1B valuation milestone'
            },
            {
              title: 'Market Leadership',
              value: '#1 Position',
              change: 'Dominant market share',
              trend: 'up',
              description: 'Established market leadership in AI-powered home services'
            },
            {
              title: 'Revenue Achievement',
              value: '$360M ARR',
              change: '200% annual growth',
              trend: 'up',
              description: 'Exceeded all revenue targets and growth projections'
            },
            {
              title: 'Operational Excellence',
              value: '95% Efficiency',
              change: '+15% improvement',
              trend: 'up',
              description: 'Best-in-class operational performance metrics'
            }
          ],
          keyInitiatives: [
            'Successfully completed $200M Series A at $1B valuation establishing unicorn status',
            'Achieved market leadership position through AI-first operational superiority',
            'Built comprehensive national infrastructure serving all major metropolitan areas',
            'Established sustainable competitive moat through proprietary AI agent technology',
            'Created platform for international expansion and category leadership'
          ],
          challenges: [
            'International expansion complexity requiring local market adaptation',
            'Regulatory compliance across multiple jurisdictions and service categories',
            'Talent acquisition at scale while maintaining company culture and values',
            'Technology evolution keeping pace with rapid AI advancement cycles'
          ],
          recommendations: [
            'Initiate international expansion starting with English-speaking markets',
            'Begin Series B planning for $2B+ valuation and global expansion',
            'Establish research and development centers for continued AI innovation',
            'Consider strategic acquisitions to accelerate market consolidation'
          ]
        }
      },
      coo: {
        monthly: {
          title: 'COO Monthly Board Report - Operational Excellence & Execution',
          metrics: [
            {
              title: 'Capacity Utilization',
              value: '78.5%',
              change: '+3.2% vs last month',
              trend: 'up',
              description: 'Technician productivity and schedule optimization'
            },
            {
              title: 'Reschedule Rate',
              value: '2,000 daily',
              change: '-150 daily reduction',
              trend: 'up',
              description: 'Daily reschedules requiring immediate attention'
            },
            {
              title: 'Service Completion',
              value: '20K weekly',
              change: '+800 completions',
              trend: 'up',
              description: 'Successful service order completions'
            },
            {
              title: '1099 Contractor Scale',
              value: '12 orders',
              change: 'From 2 to 50+ companies',
              trend: 'up',
              description: 'Contractor network expansion progress'
            }
          ],
          keyInitiatives: [
            'Capacity crisis management - implementing war room coordination',
            '1099 contractor program scaling from 2 to 50+ partner companies',
            'Technician deployment optimization across 430 planning areas',
            'Quality assurance improvement for hybrid W2/1099 workforce',
            'Emergency response coordination and customer communication'
          ],
          challenges: [
            'Daily reschedule volume of 2,000 orders straining operations',
            'Quality consistency across mixed W2/contractor workforce',
            '430 planning areas requiring localized operational coordination',
            'Emergency response time optimization in high-demand areas'
          ],
          recommendations: [
            'Implement automated reschedule prevention using predictive analytics',
            'Scale contractor onboarding to add 500+ capacity within 60 days',
            'Deploy advanced scheduling AI to optimize technician utilization',
            'Establish regional operation centers for improved coordination'
          ]
        },
        quarterly: {
          title: 'COO Quarterly Board Report - Operational Excellence & Scale Management (15 minutes)',
          metrics: [
            {
              title: 'Capacity Expansion',
              value: '2,600 Technicians',
              change: '+870 new hires Q1',
              trend: 'up',
              description: '50% workforce expansion to meet demand'
            },
            {
              title: 'Reschedule Elimination',
              value: '400 daily',
              change: '-1,600 reduction',
              trend: 'up',
              description: 'Major operational efficiency improvement'
            },
            {
              title: 'Service Quality',
              value: '96.2%',
              change: '+4.7% improvement',
              trend: 'up',
              description: 'Customer satisfaction and service completion rates'
            },
            {
              title: 'Multi-Channel Operations',
              value: '430 Areas',
              change: 'Full coverage achieved',
              trend: 'up',
              description: 'Complete national operational infrastructure'
            }
          ],
          keyInitiatives: [
            'Solved capacity crisis through aggressive hiring and contractor scaling',
            'Implemented advanced scheduling AI reducing reschedules by 80%',
            'Built hybrid W2/1099 workforce model for flexible capacity management',
            'Established regional operation centers for improved local coordination',
            'Deployed predictive maintenance and quality assurance systems'
          ],
          challenges: [
            'Quality consistency across rapidly scaled workforce requiring training programs',
            'Regional coordination complexity across 430 diverse markets',
            'Technology adoption and training for new operational systems',
            'Supply chain optimization for distributed workforce model'
          ],
          recommendations: [
            'Continue workforce development and training program expansion',
            'Implement advanced automation for routine operational tasks',
            'Establish centers of excellence for best practice sharing',
            'Develop succession planning for operational leadership roles'
          ]
        },
        annual: {
          title: 'COO Annual Board Report - Operational Transformation & Market Leadership (20 minutes)',
          metrics: [
            {
              title: 'Workforce Scale',
              value: '5,200 Technicians',
              change: '200% annual growth',
              trend: 'up',
              description: 'Massive workforce expansion while maintaining quality'
            },
            {
              title: 'Operational Efficiency',
              value: '98.5%',
              change: '+20% improvement',
              trend: 'up',
              description: 'Industry-leading operational performance'
            },
            {
              title: 'Service Delivery',
              value: '2.4M Orders',
              change: '180% annual increase',
              trend: 'up',
              description: 'Successful completion of service orders'
            },
            {
              title: 'Cost Optimization',
              value: '$125 per order',
              change: '-$31 reduction',
              trend: 'up',
              description: 'Significant operational cost improvement'
            }
          ],
          keyInitiatives: [
            'Transformed operational model from startup to enterprise scale',
            'Built industry-leading operational infrastructure and processes',
            'Established best-in-class workforce development and training programs',
            'Created sustainable operational competitive advantages',
            'Achieved operational excellence benchmarks across all key metrics'
          ],
          challenges: [
            'Continued scale challenges as company approaches 10,000+ workforce',
            'Operational complexity management across diverse service categories',
            'Technology infrastructure scaling for exponential growth requirements',
            'Global expansion operational planning and implementation'
          ],
          recommendations: [
            'Implement enterprise-grade operational management systems',
            'Establish international operations framework for global expansion',
            'Continue investment in automation and AI-powered operational tools',
            'Build operational leadership development programs for scale'
          ]
        }
      },
      cfo: {
        monthly: {
          title: 'CFO Monthly Board Report - Financial Performance & Strategy',
          metrics: [
            {
              title: 'Monthly Revenue',
              value: '$30M',
              change: '+12% growth',
              trend: 'up',
              description: 'Total revenue across all service channels'
            },
            {
              title: 'Revenue at Risk',
              value: '$15.4M',
              change: '-$2.1M improvement',
              trend: 'up',
              description: 'Revenue leak from reschedule crisis'
            },
            {
              title: 'Cost per Order',
              value: '$156',
              change: '-$8 optimization',
              trend: 'up',
              description: 'Operational efficiency and cost management'
            },
            {
              title: 'Profit Margin',
              value: '23.5%',
              change: '+1.8% improvement',
              trend: 'up',
              description: 'Overall business profitability'
            }
          ],
          keyInitiatives: [
            'Series A financial modeling and investor relations support',
            'Revenue protection from $15.4M monthly reschedule leak',
            'D2C cancellation cost analysis - $11.3M annually',
            'Contractor economics validation for sustainable scaling',
            'Financial systems integration for real-time P&L visibility'
          ],
          challenges: [
            '$31K daily revenue loss from D2C cancellations',
            'Complex cost structure with mixed W2/1099 workforce',
            'Financial system scaling for 430+ planning areas',
            'Revenue recognition complexity across multiple service types'
          ],
          recommendations: [
            'Implement dynamic pricing to optimize revenue per order',
            'Establish contractor cost benchmarks for sustainable margins',
            'Deploy real-time financial dashboards for executive visibility',
            'Optimize working capital management for growth scaling'
          ]
        },
        quarterly: {
          title: 'CFO Quarterly Board Report - Financial Growth & Strategic Investment (15 minutes)',
          metrics: [
            {
              title: 'Quarterly Revenue',
              value: '$90M',
              change: '+45% quarter growth',
              trend: 'up',
              description: 'Strong revenue acceleration and market expansion'
            },
            {
              title: 'Series A Utilization',
              value: '$125M deployed',
              change: '62.5% of $200M round',
              trend: 'up',
              description: 'Strategic capital deployment for growth initiatives'
            },
            {
              title: 'Unit Economics',
              value: '$145 per order',
              change: '-$11 optimization',
              trend: 'up',
              description: 'Improved cost structure and efficiency gains'
            },
            {
              title: 'Cash Runway',
              value: '36 months',
              change: 'Extended runway',
              trend: 'up',
              description: 'Strong financial position for continued growth'
            }
          ],
          keyInitiatives: [
            'Successfully deployed $125M from Series A for strategic growth initiatives',
            'Achieved positive unit economics across all major service categories',
            'Implemented advanced financial modeling for Series B preparation',
            'Established comprehensive financial controls for scaled operations',
            'Built investor relations program with regular stakeholder updates'
          ],
          challenges: [
            'Financial complexity management across 430+ diverse markets',
            'Revenue recognition standardization across multiple service types',
            'Cost allocation accuracy in hybrid W2/1099 workforce model',
            'Working capital optimization for rapid expansion requirements'
          ],
          recommendations: [
            'Begin Series B preparation and market positioning',
            'Implement enterprise financial planning and analysis systems',
            'Establish regional finance teams for improved local oversight',
            'Develop international expansion financial framework'
          ]
        },
        annual: {
          title: 'CFO Annual Board Report - Financial Excellence & Strategic Capital Management (20 minutes)',
          metrics: [
            {
              title: 'Annual Revenue',
              value: '$360M ARR',
              change: '200% annual growth',
              trend: 'up',
              description: 'Exceptional revenue growth and market capture'
            },
            {
              title: 'Profitability',
              value: '28% EBITDA',
              change: '+12% improvement',
              trend: 'up',
              description: 'Strong profitability and operational leverage'
            },
            {
              title: 'Capital Efficiency',
              value: '4.2x ARR Multiple',
              change: 'Industry leading',
              trend: 'up',
              description: 'Exceptional capital efficiency and growth rate'
            },
            {
              title: 'Market Valuation',
              value: '$1.5B',
              change: '+50% from Series A',
              trend: 'up',
              description: 'Strong market validation and investor confidence'
            }
          ],
          keyInitiatives: [
            'Achieved exceptional financial performance with $360M ARR and 28% EBITDA',
            'Successfully managed $200M Series A deployment for maximum growth impact',
            'Built world-class financial infrastructure supporting unicorn-scale operations',
            'Established sustainable unit economics model across all business segments',
            'Created comprehensive financial framework for international expansion'
          ],
          challenges: [
            'International expansion financial complexity and regulatory compliance',
            'Scale financial management across multiple currencies and jurisdictions',
            'Advanced financial modeling for Series B and potential IPO preparation',
            'Strategic acquisition evaluation and integration financial planning'
          ],
          recommendations: [
            'Initiate Series B fundraising at $2B+ valuation for global expansion',
            'Establish international financial operations and treasury management',
            'Begin IPO readiness preparation and public company financial systems',
            'Develop M&A financial framework for strategic acquisitions'
          ]
        }
      },
      cto: {
        monthly: {
          title: 'CTO Monthly Board Report - Technology Infrastructure & Innovation',
          metrics: [
            {
              title: 'AI Agent Performance',
              value: '26 Agents',
              change: '94.2% accuracy',
              trend: 'up',
              description: 'AI system reliability and decision quality'
            },
            {
              title: 'Platform Uptime',
              value: '99.97%',
              change: '+0.05% improvement',
              trend: 'up',
              description: 'System reliability and availability'
            },
            {
              title: 'Data Processing',
              value: '2.4M points',
              change: '+15% volume growth',
              trend: 'up',
              description: 'Real-time data processing capability'
            },
            {
              title: 'Technology ROI',
              value: '423%',
              change: '+28% improvement',
              trend: 'up',
              description: 'Technology investment return'
            }
          ],
          keyInitiatives: [
            'AI agent optimization for autonomous decision making',
            'Platform scaling for 75% business growth requirements',
            'Technology infrastructure for 430+ planning areas',
            'Innovation pipeline - next-generation AI capabilities',
            'Integration architecture for third-party systems'
          ],
          challenges: [
            'System scaling requirements for rapid business growth',
            'AI model accuracy optimization across diverse use cases',
            'Technology debt management while scaling rapidly',
            'Security and compliance across expanding infrastructure'
          ],
          recommendations: [
            'Implement microservices architecture for improved scalability',
            'Deploy advanced AI models for predictive scheduling',
            'Establish technology centers of excellence for innovation',
            'Create robust disaster recovery and business continuity plans'
          ]
        },
        quarterly: {
          title: 'CTO Quarterly Board Report - Technology Innovation & Infrastructure Scale (15 minutes)',
          metrics: [
            {
              title: 'Platform Scale',
              value: '99.99% Uptime',
              change: '+0.02% improvement',
              trend: 'up',
              description: 'Enterprise-grade system reliability achieved'
            },
            {
              title: 'AI Innovation',
              value: '5 New Models',
              change: 'LLM integration complete',
              trend: 'up',
              description: 'Advanced AI capabilities deployed'
            },
            {
              title: 'Technology ROI',
              value: '485%',
              change: '+62% quarterly',
              trend: 'up',
              description: 'Technology investment returns'
            },
            {
              title: 'Security Compliance',
              value: '100% SOC2',
              change: 'Full certification',
              trend: 'up',
              description: 'Enterprise security standards met'
            }
          ],
          keyInitiatives: [
            'Launched LLM marketing intelligence platform for AI-driven customer acquisition',
            'Completed enterprise infrastructure scaling for 10x growth capacity',
            'Deployed advanced predictive analytics reducing operational costs by 15%',
            'Achieved SOC2 compliance for enterprise customer requirements',
            'Built comprehensive API ecosystem for third-party integrations'
          ],
          challenges: [
            'Technology debt management while rapidly scaling infrastructure',
            'AI model accuracy optimization across diverse operational scenarios',
            'Integration complexity with legacy systems at enterprise clients',
            'Cybersecurity threats requiring continuous monitoring and updates'
          ],
          recommendations: [
            'Establish dedicated R&D team for next-generation AI development',
            'Implement automated infrastructure scaling for continued growth',
            'Create technology advisory board with industry experts',
            'Begin planning for international technology infrastructure'
          ]
        },
        annual: {
          title: 'CTO Annual Board Report - Technology Leadership & Strategic Innovation (20 minutes)',
          metrics: [
            {
              title: 'Innovation Portfolio',
              value: '15 Patents',
              change: 'Industry leadership',
              trend: 'up',
              description: 'Proprietary technology intellectual property'
            },
            {
              title: 'Platform Performance',
              value: '99.99% SLA',
              change: 'Best-in-class reliability',
              trend: 'up',
              description: 'Enterprise-grade system performance'
            },
            {
              title: 'Technology Valuation',
              value: '$400M IP',
              change: '40% of company value',
              trend: 'up',
              description: 'Technology assets driving valuation'
            },
            {
              title: 'Engineering Team',
              value: '120 Engineers',
              change: '200% team growth',
              trend: 'up',
              description: 'World-class technology organization'
            }
          ],
          keyInitiatives: [
            'Built industry-leading AI agent technology platform with 15 patents',
            'Achieved technology leadership position in AI-powered home services',
            'Created scalable platform architecture supporting international expansion',
            'Established comprehensive cybersecurity and compliance framework',
            'Developed strategic technology partnerships with major cloud providers'
          ],
          challenges: [
            'Technology talent acquisition in competitive market requiring premium compensation',
            'Maintaining innovation leadership while competitors attempt to replicate technology',
            'International expansion technology complexity across multiple regulatory environments',
            'Next-generation AI development requiring significant R&D investment'
          ],
          recommendations: [
            'Establish international R&D centers in key technology hubs',
            'Begin Series B technology roadmap for autonomous service delivery',
            'Create strategic technology acquisition program for complementary capabilities',
            'Develop open-source initiatives to establish technology ecosystem leadership'
          ]
        }
      },
      cmo: {
        monthly: {
          title: 'CMO Monthly Board Report - Marketing Performance & Customer Acquisition (10 minutes)',
          metrics: [
            {
              title: 'Customer Acquisition',
              value: '3,200 new',
              change: '+18% growth',
              trend: 'up',
              description: 'Monthly new customer acquisitions'
            },
            {
              title: 'D2C Conversion',
              value: '51.8%',
              change: '+2.3% improvement',
              trend: 'up',
              description: 'Direct-to-consumer marketing effectiveness'
            },
            {
              title: 'B2B Partnership',
              value: '3 major clients',
              change: 'AHS, Assurant, Choice',
              trend: 'up',
              description: 'Strategic B2B relationship performance'
            },
            {
              title: 'Brand Recognition',
              value: '12.4%',
              change: '+3.1% increase',
              trend: 'up',
              description: 'Market awareness and brand strength'
            }
          ],
          keyInitiatives: [
            'LLM marketing intelligence deployment targeting AI-driven customer acquisition',
            'D2C marketing optimization to reduce $31K daily cancellation loss',
            'B2B partnership expansion with warranty and insurance providers',
            'Geographic marketing strategy optimization across 430+ planning areas',
            'Brand positioning reinforcement as "America\'s Home Manager"'
          ],
          challenges: [
            'D2C cancellation rate of 50% from reschedules requiring immediate intervention',
            'Competitive marketing in saturated home services market requiring differentiation',
            'Geographic marketing customization complexity across diverse planning areas',
            'Brand awareness building against established service providers with larger budgets'
          ],
          recommendations: [
            'Implement predictive marketing analytics to prevent customer churn before it occurs',
            'Develop hyper-localized marketing strategies for each of the 430+ planning areas',
            'Create comprehensive customer success programs to reduce cancellation rates',
            'Establish thought leadership content strategy in AI-powered home services'
          ]
        },
        quarterly: {
          title: 'CMO Quarterly Board Report - Marketing Growth & Brand Leadership (15 minutes)',
          metrics: [
            {
              title: 'Customer Growth',
              value: '12,800 new',
              change: '+55% quarterly',
              trend: 'up',
              description: 'Quarterly customer acquisition acceleration'
            },
            {
              title: 'Marketing ROI',
              value: '4.2x',
              change: '+0.8x improvement',
              trend: 'up',
              description: 'Marketing spend efficiency and returns'
            },
            {
              title: 'Brand Leadership',
              value: '28.5%',
              change: '+16.1% market share',
              trend: 'up',
              description: 'Market leadership position established'
            },
            {
              title: 'LLM Integration',
              value: '85% Complete',
              change: 'AI-driven acquisition',
              trend: 'up',
              description: 'AI marketing platform deployment progress'
            }
          ],
          keyInitiatives: [
            'Successfully launched comprehensive LLM marketing strategy across ChatGPT, Perplexity, and Claude',
            'Achieved market leadership position through aggressive customer acquisition campaigns',
            'Built strategic partnership ecosystem with major B2B clients driving 40% of revenue',
            'Established "America\'s Home Manager" brand as category leader in AI-powered services',
            'Deployed predictive marketing reducing customer acquisition costs by 25%'
          ],
          challenges: [
            'Maintaining growth velocity while preserving unit economics and profitability',
            'Competitive responses from traditional players requiring strategic positioning',
            'Marketing attribution complexity across multiple channels and partnership programs',
            'Brand messaging consistency across 430+ diverse geographic markets'
          ],
          recommendations: [
            'Double down on LLM marketing advantages as sustainable competitive moat',
            'Expand B2B partnership program to capture additional market segments',
            'Implement advanced marketing automation for improved efficiency',
            'Begin international marketing planning for global expansion'
          ]
        },
        annual: {
          title: 'CMO Annual Board Report - Marketing Excellence & Market Dominance (20 minutes)',
          metrics: [
            {
              title: 'Market Leadership',
              value: '#1 Position',
              change: 'Category dominance',
              trend: 'up',
              description: 'Established market leadership in AI-powered home services'
            },
            {
              title: 'Customer Base',
              value: '150K Active',
              change: '300% annual growth',
              trend: 'up',
              description: 'Massive customer base expansion and retention'
            },
            {
              title: 'Brand Value',
              value: '$180M',
              change: '18% of company value',
              trend: 'up',
              description: 'Brand equity contributing to company valuation'
            },
            {
              title: 'Marketing Efficiency',
              value: '6.8x ROI',
              change: 'Industry leading',
              trend: 'up',
              description: 'Best-in-class marketing performance and returns'
            }
          ],
          keyInitiatives: [
            'Achieved market leadership position and established "America\'s Home Manager" as category-defining brand',
            'Built comprehensive LLM marketing ecosystem generating $12M in AI-driven revenue',
            'Created strategic partnership network driving $144M in annual revenue',
            'Established marketing excellence framework with industry-leading ROI performance',
            'Developed international marketing capabilities for global expansion readiness'
          ],
          challenges: [
            'International market entry complexity requiring localized marketing strategies',
            'Maintaining brand leadership while competitors attempt to replicate positioning',
            'Marketing scalability challenges for continued exponential growth',
            'Next-generation marketing technology development requiring significant investment'
          ],
          recommendations: [
            'Launch international marketing expansion starting with English-speaking markets',
            'Establish marketing centers of excellence for continued innovation leadership',
            'Create strategic marketing acquisition program for complementary capabilities',
            'Begin Series B marketing strategy for global market domination'
          ]
        }
      },
      cdo: {
        monthly: {
          title: 'CDO Monthly Board Report - Data Strategy & Analytics Intelligence (10 minutes)',
          metrics: [
            {
              title: 'Data Processing',
              value: '2.4M Points',
              change: '+15% volume growth',
              trend: 'up',
              description: 'Real-time data processing across all operations'
            },
            {
              title: 'Prediction Accuracy',
              value: '94.2%',
              change: '+2.1% improvement',
              trend: 'up',
              description: 'AI model prediction accuracy across agents'
            },
            {
              title: 'Data Insights',
              value: '47 Dashboards',
              change: '+5 new analytics',
              trend: 'up',
              description: 'Executive and operational intelligence dashboards'
            },
            {
              title: 'Business Intelligence',
              value: '$2.3M Impact',
              change: 'Data-driven decisions',
              trend: 'up',
              description: 'Measurable business impact from data insights'
            }
          ],
          keyInitiatives: [
            'Comprehensive data governance framework implementation across 430 planning areas',
            'Advanced analytics deployment for predictive capacity management and scheduling',
            'Real-time business intelligence dashboards for executive decision making',
            'Data integration architecture connecting all 28 AI agents for unified insights',
            'Privacy and compliance framework ensuring data security across all operations'
          ],
          challenges: [
            'Data quality consistency across diverse operational systems requiring standardization',
            'Privacy compliance complexity across multiple jurisdictions and service categories',
            'Data infrastructure scaling requirements for 75% business growth capacity',
            'Analytics talent acquisition in competitive market requiring specialized skills'
          ],
          recommendations: [
            'Implement automated data quality monitoring and correction systems',
            'Establish data science center of excellence for advanced analytics development',
            'Deploy machine learning models for automated operational optimization',
            'Create comprehensive data strategy for international expansion requirements'
          ]
        },
        quarterly: {
          title: 'CDO Quarterly Board Report - Data Excellence & Strategic Analytics (15 minutes)',
          metrics: [
            {
              title: 'Analytics Platform',
              value: '99.5% Uptime',
              change: 'Enterprise reliability',
              trend: 'up',
              description: 'Mission-critical analytics infrastructure performance'
            },
            {
              title: 'Predictive Models',
              value: '15 Active',
              change: '+8 new deployments',
              trend: 'up',
              description: 'Advanced ML models driving operational efficiency'
            },
            {
              title: 'Data ROI',
              value: '320%',
              change: '+85% quarterly',
              trend: 'up',
              description: 'Data investment returns and business impact'
            },
            {
              title: 'Compliance Score',
              value: '100%',
              change: 'Full compliance',
              trend: 'up',
              description: 'Data privacy and regulatory compliance achievement'
            }
          ],
          keyInitiatives: [
            'Deployed comprehensive predictive analytics reducing operational costs by $3.2M quarterly',
            'Built enterprise data warehouse supporting real-time decision making across all operations',
            'Achieved complete data compliance framework meeting SOC2 and GDPR requirements',
            'Established data science team delivering advanced AI models for competitive advantage',
            'Created unified data platform integrating all business systems for single source of truth'
          ],
          challenges: [
            'Data infrastructure complexity management across rapidly expanding operations',
            'Advanced analytics model development requiring specialized expertise and tools',
            'International data compliance requirements across multiple regulatory frameworks',
            'Data governance scaling challenges for continued business growth'
          ],
          recommendations: [
            'Expand data science team for next-generation analytics development',
            'Implement automated machine learning platforms for improved efficiency',
            'Establish international data governance framework for global expansion',
            'Create strategic data partnerships for enhanced external data sources'
          ]
        },
        annual: {
          title: 'CDO Annual Board Report - Data Leadership & Strategic Intelligence (20 minutes)',
          metrics: [
            {
              title: 'Data Assets',
              value: '$120M Value',
              change: '12% of company value',
              trend: 'up',
              description: 'Data intellectual property and strategic value'
            },
            {
              title: 'Analytics Impact',
              value: '$15M Savings',
              change: 'Data-driven optimization',
              trend: 'up',
              description: 'Annual cost savings from data intelligence'
            },
            {
              title: 'Prediction Platform',
              value: '96.8% Accuracy',
              change: 'Industry leading',
              trend: 'up',
              description: 'Best-in-class predictive analytics performance'
            },
            {
              title: 'Data Team',
              value: '35 Scientists',
              change: '250% team growth',
              trend: 'up',
              description: 'World-class data science organization'
            }
          ],
          keyInitiatives: [
            'Built industry-leading data intelligence platform driving $15M in annual savings',
            'Established comprehensive data governance framework supporting international expansion',
            'Created strategic data assets contributing $120M to company valuation',
            'Achieved data excellence with 96.8% prediction accuracy across all business operations',
            'Developed data science organization recognized as industry leader in home services'
          ],
          challenges: [
            'International data governance complexity across multiple regulatory environments',
            'Next-generation AI development requiring significant data infrastructure investment',
            'Data talent retention in competitive market requiring premium compensation',
            'Data privacy evolution requiring continuous compliance framework updates'
          ],
          recommendations: [
            'Establish international data centers for global expansion data requirements',
            'Begin Series B data strategy for autonomous service delivery capabilities',
            'Create strategic data acquisition program for enhanced competitive intelligence',
            'Develop open data initiatives to establish industry data leadership'
          ]
        }
      },
      cao: {
        monthly: {
          title: 'CAO Monthly Board Report - Process Automation & Operational Efficiency (10 minutes)',
          metrics: [
            {
              title: 'Automation Coverage',
              value: '78.5%',
              change: '+5.2% improvement',
              trend: 'up',
              description: 'Percentage of operations automated'
            },
            {
              title: 'Efficiency Gains',
              value: '$890K',
              change: 'Monthly cost savings',
              trend: 'up',
              description: 'Cost reduction through automation'
            },
            {
              title: 'Process Optimization',
              value: '23 Workflows',
              change: '+4 automated processes',
              trend: 'up',
              description: 'Automated business processes deployed'
            },
            {
              title: 'Error Reduction',
              value: '87%',
              change: '+12% improvement',
              trend: 'up',
              description: 'Reduction in manual process errors'
            }
          ],
          keyInitiatives: [
            'Comprehensive automation strategy implementation across all 430 planning areas',
            'Advanced workflow automation reducing manual coordination by 65%',
            'AI agent optimization achieving 94.8% autonomous execution rate',
            'Process standardization enabling 75% capacity increase through automation',
            'Quality assurance automation ensuring consistent service delivery'
          ],
          challenges: [
            'Legacy system integration complexity requiring custom automation solutions',
            'Process standardization across diverse operational environments and markets',
            'Automation technology adoption requiring comprehensive training programs',
            'Quality maintenance while rapidly scaling automated processes'
          ],
          recommendations: [
            'Implement robotic process automation for high-volume manual tasks',
            'Establish automation centers of excellence for best practice sharing',
            'Deploy advanced AI for autonomous decision making in routine operations',
            'Create comprehensive change management program for automation adoption'
          ]
        },
        quarterly: {
          title: 'CAO Quarterly Board Report - Automation Excellence & Strategic Efficiency (15 minutes)',
          metrics: [
            {
              title: 'Full Automation',
              value: '94.8% Rate',
              change: '+16.3% quarterly',
              trend: 'up',
              description: 'Autonomous execution across all operations'
            },
            {
              title: 'Cost Reduction',
              value: '$8.2M',
              change: 'Quarterly savings',
              trend: 'up',
              description: 'Automation-driven cost optimization'
            },
            {
              title: 'Process Innovation',
              value: '12 Patents',
              change: 'Automation IP',
              trend: 'up',
              description: 'Proprietary automation technology'
            },
            {
              title: 'Efficiency Score',
              value: '96.2%',
              change: 'Industry leading',
              trend: 'up',
              description: 'Operational efficiency benchmarks'
            }
          ],
          keyInitiatives: [
            'Achieved 94.8% autonomous execution rate across all business operations',
            'Delivered $8.2M in quarterly cost savings through comprehensive automation',
            'Built proprietary automation technology with 12 patents for competitive advantage',
            'Established automation excellence framework recognized as industry best practice',
            'Created scalable automation platform supporting 10x business growth'
          ],
          challenges: [
            'Automation complexity management across rapidly expanding operations',
            'Next-generation automation development requiring advanced AI capabilities',
            'International automation deployment across diverse regulatory environments',
            'Automation talent development requiring specialized training programs'
          ],
          recommendations: [
            'Expand automation platform for international operations scaling',
            'Implement next-generation AI for fully autonomous service delivery',
            'Establish automation advisory board with industry automation experts',
            'Create strategic automation partnerships for enhanced capabilities'
          ]
        },
        annual: {
          title: 'CAO Annual Board Report - Automation Leadership & Strategic Innovation (20 minutes)',
          metrics: [
            {
              title: 'Automation Value',
              value: '$95M Impact',
              change: 'Annual efficiency gains',
              trend: 'up',
              description: 'Total business value from automation initiatives'
            },
            {
              title: 'Process Excellence',
              value: '98.7% Score',
              change: 'Perfection achieved',
              trend: 'up',
              description: 'World-class operational process performance'
            },
            {
              title: 'Innovation Portfolio',
              value: '25 Patents',
              change: 'Automation leadership',
              trend: 'up',
              description: 'Proprietary automation intellectual property'
            },
            {
              title: 'Automation Team',
              value: '45 Engineers',
              change: '300% team growth',
              trend: 'up',
              description: 'World-class automation engineering organization'
            }
          ],
          keyInitiatives: [
            'Achieved automation excellence delivering $95M in annual business value',
            'Built industry-leading automation platform with 25 patents for competitive moat',
            'Established 98.7% process excellence score recognized as industry benchmark',
            'Created comprehensive automation framework supporting international expansion',
            'Developed automation engineering organization as strategic competitive advantage'
          ],
          challenges: [
            'International automation deployment complexity across multiple regulatory frameworks',
            'Next-generation automation requiring significant AI and robotics investment',
            'Automation talent retention in competitive market requiring premium compensation',
            'Automation technology evolution requiring continuous platform updates'
          ],
          recommendations: [
            'Establish international automation centers for global expansion support',
            'Begin Series B automation strategy for fully autonomous service delivery',
            'Create strategic automation acquisition program for enhanced capabilities',
            'Develop automation consulting services as additional revenue stream'
          ]
        }
      }
    };

    // Temporary fix: Remove duplicate entries and continue with existing data
    const cleanedData: Record<string, Record<string, ExecutivePresentationSlide>> = {
      ceo: baseData.ceo,
      coo: baseData.coo,
      cfo: baseData.cfo,
      cto: baseData.cto,
      cmo: baseData.cmo,
      cdo: {
        monthly: {
          title: 'CDO Monthly Board Report - Data Strategy & Analytics Intelligence (10 minutes)',
          metrics: [
            {
              title: 'Data Accuracy',
              value: '98.7%',
              change: '+1.2% improvement',
              trend: 'up',
              description: 'Data quality across all operational systems'
            },
            {
              title: 'Predictive Models',
              value: '15 active',
              change: '+3 new models',
              trend: 'up',
              description: 'AI/ML models for business optimization'
            },
            {
              title: 'Real-time Analytics',
              value: '430 areas',
              change: '100% coverage',
              trend: 'up',
              description: 'Live data visibility across planning areas'
            },
            {
              title: 'Data-Driven Decisions',
              value: '87%',
              change: '+12% increase',
              trend: 'up',
              description: 'Percentage of decisions backed by data'
            }
          ],
          keyInitiatives: [
            'Predictive analytics for capacity management and reschedule prevention',
            'Data architecture scaling for 430+ planning areas',
            'Business intelligence platform for executive decision making',
            'Data governance and quality standards implementation',
            'Advanced analytics for customer behavior and technician optimization'
          ],
          challenges: [
            'Data integration across diverse operational systems',
            'Real-time analytics scaling for rapid business growth',
            'Data privacy and security compliance across all markets',
            'Predictive model accuracy improvement for critical decisions'
          ],
          recommendations: [
            'Implement data lake architecture for unified analytics',
            'Deploy machine learning ops (MLOps) for model management',
            'Establish data quality monitoring and automated remediation',
            'Create self-service analytics for operational teams'
          ]
        }
      },
      cao: {
        monthly: {
          title: 'CAO Monthly Board Report - Automation Strategy & Process Excellence',
          metrics: [
            {
              title: 'Process Automation',
              value: '68%',
              change: '+15% increase',
              trend: 'up',
              description: 'Percentage of processes fully automated'
            },
            {
              title: 'Manual Work Reduction',
              value: '1,730 technicians',
              change: '40% less manual tasks',
              trend: 'up',
              description: 'Automation impact on technician productivity'
            },
            {
              title: 'Automation ROI',
              value: '285%',
              change: '+45% improvement',
              trend: 'up',
              description: 'Return on automation investments'
            },
            {
              title: 'Workflow Efficiency',
              value: '92.3%',
              change: '+8.1% optimization',
              trend: 'up',
              description: 'Overall operational workflow performance'
            }
          ],
          keyInitiatives: [
            'Automated reschedule prevention to eliminate 2,000 daily reschedules',
            'Workflow automation for 1,730 technicians reducing manual work',
            'AI agent automation across all 26 operational agents',
            'Process optimization for 75% capacity increase requirements',
            'Intelligent automation for customer service and communication'
          ],
          challenges: [
            'Complex workflow automation across diverse service types',
            'Integration challenges with legacy systems and processes',
            'Automation quality assurance for customer-facing processes',
            'Change management for technician workflow automation adoption'
          ],
          recommendations: [
            'Implement robotic process automation (RPA) for repetitive tasks',
            'Deploy intelligent document processing for service orders',
            'Create automation centers of excellence for best practices',
            'Establish automation governance and quality standards'
          ]
        }
      }
    };

    // Add presentation timing and format guidelines
    const presentationGuidelines = {
      monthly: { duration: '10 minutes', format: 'Focused operational update with key metrics and immediate action items' },
      quarterly: { duration: '15 minutes', format: 'Strategic progress review with detailed analysis and forward planning' },
      annual: { duration: '20 minutes', format: 'Comprehensive strategic assessment with long-term vision and planning' }
    };

    const data = cleanedData[exec]?.[template] || cleanedData.ceo.monthly;
    return {
      ...data,
      presentationGuidelines: presentationGuidelines[template as keyof typeof presentationGuidelines]
    };
  };

  // Executive role definitions with presentation responsibilities
  const executiveRoles = {
    ceo: { title: 'Chief Executive Officer', focus: 'Strategic Leadership & Vision', color: 'bg-blue-600' },
    coo: { title: 'Chief Operating Officer', focus: 'Operational Excellence & Execution', color: 'bg-green-600' },
    cfo: { title: 'Chief Financial Officer', focus: 'Financial Performance & Strategy', color: 'bg-purple-600' },
    cto: { title: 'Chief Technology Officer', focus: 'Technology Infrastructure & Innovation', color: 'bg-orange-600' },
    cmo: { title: 'Chief Marketing Officer', focus: 'Marketing & Customer Acquisition', color: 'bg-pink-600' },
    cdo: { title: 'Chief Data Officer', focus: 'Data Strategy & Analytics', color: 'bg-teal-600' },
    cao: { title: 'Chief Automation Officer', focus: 'Process Automation & Efficiency', color: 'bg-indigo-600' }
  };

  const downloadPresentation = (executive: string, template: string) => {
    // Simulate downloading a presentation
    const filename = `${executive.toUpperCase()}-${template}-board-presentation-${new Date().toISOString().split('T')[0]}.pdf`;
    console.log(`Downloading: ${filename}`);
    // In a real implementation, this would generate and download a PDF
  };

  const currentPresentation = getExecutivePresentationData(selectedExecutive, selectedTemplate);
  const currentRole = executiveRoles[selectedExecutive];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <NavigationBreadcrumbs />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Board of Directors Presentations</h1>
          <p className="text-gray-400">
            Monthly executive board presentation templates for comprehensive C-suite reporting
          </p>
        </div>

        {/* Comprehensive 30-Page Presentation */}
        <Card className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 border-blue-600 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">📊 Comprehensive 30-Page Board Presentation</h2>
                <p className="text-blue-100 mb-4">Complete investor-grade presentation with interactive navigation, charts, and professional styling</p>
                <div className="flex items-center space-x-4 text-sm text-blue-200">
                  <span>✓ 30 Professional Slides</span>
                  <span>✓ Interactive Navigation</span>
                  <span>✓ Live Charts & Analytics</span>
                  <span>✓ Executive Summary</span>
                </div>
              </div>
              <Button
                onClick={openComprehensivePresentation}
                className="bg-white text-blue-900 hover:bg-blue-50 font-semibold text-lg px-8 py-4"
              >
                <Presentation className="w-6 h-6 mr-2" />
                Open Presentation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Executive Selection */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Presentation className="w-5 h-5 mr-2" />
              Executive Presentation Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Executive Role
                </label>
                <Tabs value={selectedExecutive} onValueChange={(value) => setSelectedExecutive(value as any)}>
                  <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                    <TabsTrigger value="ceo" className="data-[state=active]:bg-blue-600">CEO</TabsTrigger>
                    <TabsTrigger value="coo" className="data-[state=active]:bg-green-600">COO</TabsTrigger>
                    <TabsTrigger value="cfo" className="data-[state=active]:bg-purple-600">CFO</TabsTrigger>
                    <TabsTrigger value="cto" className="data-[state=active]:bg-indigo-600">CTO</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid w-full grid-cols-3 bg-gray-700 mt-2">
                    <TabsTrigger value="cmo" className="data-[state=active]:bg-pink-600">CMO</TabsTrigger>
                    <TabsTrigger value="cdo" className="data-[state=active]:bg-teal-600">CDO</TabsTrigger>
                    <TabsTrigger value="cao" className="data-[state=active]:bg-orange-600">CAO</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Presentation Type
                </label>
                <Tabs value={selectedTemplate} onValueChange={(value) => setSelectedTemplate(value as any)}>
                  <TabsList className="grid w-full grid-cols-3 bg-gray-700">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                    <TabsTrigger value="annual">Annual</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Presentation Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700 mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{currentPresentation.title}</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => downloadPresentation(selectedExecutive, selectedTemplate)}
                      variant="outline"
                      size="sm"
                      className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    
                    {selectedExecutive === 'ceo' && (
                      <Button
                        onClick={() => window.location.href = '/simulated-board-presentation'}
                        variant="outline"
                        size="sm"
                        className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
                      >
                        <Presentation className="w-4 h-4 mr-2" />
                        View Live Presentation
                      </Button>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Performance Report - {new Date().toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPresentation.metrics.map((metric, index) => (
                    <div key={index} className="p-4 bg-gray-900/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{metric.title}</h4>
                        <Badge 
                          className={`${
                            metric.trend === 'up' ? 'bg-green-600' : 
                            metric.trend === 'down' ? 'bg-red-600' : 'bg-gray-600'
                          } text-white`}
                        >
                          {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        {metric.value}
                      </div>
                      <div className={`text-sm mb-2 ${
                        metric.trend === 'up' ? 'text-green-400' : 
                        metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {metric.change}
                      </div>
                      <div className="text-xs text-gray-400">
                        {metric.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Executive Summary */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Executive Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Key Initiatives</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {currentPresentation.keyInitiatives.map((initiative, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {initiative}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2">Challenges</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {currentPresentation.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-400 mr-2">•</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Recommendations</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {currentPresentation.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access Links */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Access to Supporting Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard">
                <Button variant="outline" className="justify-start text-gray-300 border-gray-600 hover:bg-gray-700 w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/financials">
                <Button variant="outline" className="justify-start text-gray-300 border-gray-600 hover:bg-gray-700 w-full">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Financials
                </Button>
              </Link>
              <Link href="/performance">
                <Button variant="outline" className="justify-start text-gray-300 border-gray-600 hover:bg-gray-700 w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Performance
                </Button>
              </Link>
              <Link href="/project-management">
                <Button variant="outline" className="justify-start text-gray-300 border-gray-600 hover:bg-gray-700 w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Strategic Projects
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BoardPresentations;