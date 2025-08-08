import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  TrendingUp, 
  MapPin,
  Users,
  Wrench,
  Zap,
  Target,
  Activity,
  Shield,
  Gauge,
  ArrowLeft
} from 'lucide-react';

interface PredictiveWarning {
  id: string;
  type: string;
  category: 'operational' | 'financial' | 'customer' | 'technical' | 'supply_chain' | 'workforce';
  severity: 'critical' | 'high' | 'medium' | 'low';
  planningArea: string;
  predictedDate: string;
  confidence: number;
  impactDescription: string;
  suggestedActions: string[];
  affectedServices: string[];
  estimatedLossRevenue: number;
  preventionWindow: number; // hours before event
  relatedAgents: string[];
  currentTrend: 'increasing' | 'stable' | 'decreasing';
  recipientTypes: string[]; // who gets notified
}

interface PredictiveSchedulingWarningsProps {
  onNavigateBack: () => void;
}

export function PredictiveSchedulingWarnings({ onNavigateBack }: PredictiveSchedulingWarningsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('24h');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedPlanningArea, setSelectedPlanningArea] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Generate realistic predictive warnings
  const predictiveWarnings: PredictiveWarning[] = useMemo(() => {
    const warnings: PredictiveWarning[] = [];
    const planningAreas = [
      'Atlanta Metro North', 'Austin Central', 'Boston Metro', 'Charlotte Central',
      'Chicago North', 'Dallas Fort Worth', 'Denver Metro', 'Houston Central',
      'Las Vegas Metro', 'Los Angeles Central', 'Miami Metro', 'New York Metro',
      'Phoenix Central', 'Portland Metro', 'San Francisco Bay', 'Seattle Metro'
    ];

    const warningTypes = [
      // OPERATIONAL ALERTS (8 types)
      {
        type: 'capacity_shortage',
        category: 'operational' as const,
        descriptions: [
          'Demand forecasted to exceed technician capacity by 35%',
          'Service requests predicted to spike during peak hours',
          'Insufficient scheduling slots for emergency services'
        ],
        agents: ['Advanced Scheduling Agent', 'Technician Interaction Hub', 'Regional Performance Monitor'],
        recipientTypes: ['technicians', 'executives', 'dispatchers']
      },
      {
        type: 'demand_surge',
        category: 'operational' as const,
        descriptions: [
          'Weather-driven HVAC service demand surge expected',
          'Seasonal appliance failure pattern detected',
          'Local event driving emergency service requests'
        ],
        agents: ['HVAC System Diagnostics AI', 'Emergency Response Coordinator', 'Regional Performance Monitor'],
        recipientTypes: ['technicians', 'executives', 'b2b_clients']
      },
      {
        type: 'route_inefficiency',
        category: 'operational' as const,
        descriptions: [
          'Travel time between jobs exceeding optimal thresholds',
          'Traffic patterns creating routing bottlenecks',
          'Geographic clustering opportunities being missed'
        ],
        agents: ['Route Optimization Engine', 'Regional Performance Monitor', 'Advanced Scheduling Agent'],
        recipientTypes: ['technicians', 'dispatchers']
      },
      {
        type: 'service_backlog',
        category: 'operational' as const,
        descriptions: [
          'Pending service requests accumulating beyond threshold',
          'Rescheduled appointments creating cascade delays',
          'Priority queue overflow detected'
        ],
        agents: ['Advanced Scheduling Agent', 'Customer Communication Hub', 'Regional Performance Monitor'],
        recipientTypes: ['executives', 'dispatchers', 'b2b_clients']
      },
      {
        type: 'quality_decline',
        category: 'operational' as const,
        descriptions: [
          'Customer satisfaction scores trending downward',
          'Repeat service calls indicating quality issues',
          'First-time fix rate dropping below standards'
        ],
        agents: ['Quality Assurance Inspector', 'Technician Training Agent', 'Customer Communication Hub'],
        recipientTypes: ['technicians', 'executives', 'quality_managers']
      },
      {
        type: 'compliance_violation',
        category: 'operational' as const,
        descriptions: [
          'Safety protocol deviations detected',
          'Licensing requirements not being met',
          'Regulatory compliance gaps identified'
        ],
        agents: ['Quality Assurance Inspector', 'Technician Training Agent', 'Compliance Monitor'],
        recipientTypes: ['executives', 'compliance_officers', 'technicians']
      },
      {
        type: 'equipment_utilization',
        category: 'operational' as const,
        descriptions: [
          'Diagnostic equipment sitting idle beyond thresholds',
          'Tool inventory underutilized in planning area',
          'Equipment maintenance schedules creating inefficiencies'
        ],
        agents: ['Inventory Management Assistant', 'Quality Assurance Inspector', 'Regional Performance Monitor'],
        recipientTypes: ['technicians', 'procurement_personnel']
      },
      {
        type: 'emergency_response_delay',
        category: 'operational' as const,
        descriptions: [
          'Emergency service response times exceeding SLA',
          'Critical HVAC failures not being prioritized properly',
          'Emergency technician availability below threshold'
        ],
        agents: ['Emergency Response Coordinator', 'Advanced Scheduling Agent', 'HVAC System Diagnostics AI'],
        recipientTypes: ['technicians', 'executives', 'emergency_coordinators']
      },
      
      // WORKFORCE ALERTS (7 types)
      {
        type: 'technician_shortage',
        category: 'workforce' as const,
        descriptions: [
          'Multiple technician sick days predicted based on patterns',
          'Vacation scheduling creating coverage gaps',
          'High-skill technician availability dropping below threshold'
        ],
        agents: ['Technician Recruiting Agent', 'Technician Training Agent', 'Advanced Scheduling Agent'],
        recipientTypes: ['executives', 'hr_managers', 'dispatchers']
      },
      {
        type: 'skill_gap_warning',
        category: 'workforce' as const,
        descriptions: [
          'Specialized HVAC skills unavailable for scheduled jobs',
          'New appliance technology requiring additional training',
          'Certification renewals needed for planning area compliance'
        ],
        agents: ['Technician Training Agent', 'HVAC System Diagnostics AI', 'Quality Assurance Inspector'],
        recipientTypes: ['technicians', 'training_managers', 'executives']
      },
      {
        type: 'retention_risk',
        category: 'workforce' as const,
        descriptions: [
          'High-performing technician showing disengagement patterns',
          'Multiple technicians considering competitor offers',
          'Burnout indicators detected in planning area workforce'
        ],
        agents: ['Technician Recruiting Agent', 'Retention Analytics AI', 'Regional Performance Monitor'],
        recipientTypes: ['executives', 'hr_managers', 'team_leads']
      },
      {
        type: 'performance_decline',
        category: 'workforce' as const,
        descriptions: [
          'Individual technician metrics trending below standards',
          'Team productivity dropping in specific planning area',
          'Customer ratings for specific technicians declining'
        ],
        agents: ['Quality Assurance Inspector', 'Technician Training Agent', 'Performance Analytics AI'],
        recipientTypes: ['technicians', 'supervisors', 'training_managers']
      },
      {
        type: 'overtime_surge',
        category: 'workforce' as const,
        descriptions: [
          'Overtime hours exceeding budget thresholds',
          'Technician fatigue indicators from excessive hours',
          'Labor cost inflation detected in planning area'
        ],
        agents: ['Financial Intelligence Agent', 'Technician Recruiting Agent', 'Regional Performance Monitor'],
        recipientTypes: ['executives', 'hr_managers', 'financial_analysts']
      },
      {
        type: 'safety_incident_risk',
        category: 'workforce' as const,
        descriptions: [
          'Safety protocol compliance declining in planning area',
          'Hazardous work conditions increasing incident probability',
          'Near-miss reports indicating elevated risk levels'
        ],
        agents: ['Quality Assurance Inspector', 'Safety Compliance AI', 'Emergency Response Coordinator'],
        recipientTypes: ['technicians', 'safety_officers', 'executives']
      },
      {
        type: 'contractor_availability',
        category: 'workforce' as const,
        descriptions: [
          '1099 contractor capacity dropping below minimum levels',
          'Key contractor partnerships at risk of termination',
          'Contractor quality scores declining below standards'
        ],
        agents: ['Contractor Management AI', 'Quality Assurance Inspector', 'Regional Performance Monitor'],
        recipientTypes: ['executives', 'contractor_coordinators', 'procurement_personnel']
      },
      
      // SUPPLY CHAIN ALERTS (5 types)
      {
        type: 'parts_delay',
        category: 'supply_chain' as const,
        descriptions: [
          'Critical HVAC parts shipment delays forecasted',
          'Supplier capacity constraints affecting delivery times',
          'Inventory depletion predicted for high-demand components'
        ],
        agents: ['Parts Prediction Engine', 'Parts Ordering Specialist', 'Inventory Management Assistant'],
        recipientTypes: ['procurement_personnel', 'vendors', 'technicians']
      },
      {
        type: 'inventory_shortage',
        category: 'supply_chain' as const,
        descriptions: [
          'Stock levels dropping below safety thresholds',
          'Seasonal demand exceeding inventory projections',
          'Critical parts unavailable for scheduled services'
        ],
        agents: ['Inventory Management Assistant', 'Parts Prediction Engine', 'Advanced Scheduling Agent'],
        recipientTypes: ['procurement_personnel', 'vendors', 'dispatchers']
      },
      {
        type: 'supplier_performance',
        category: 'supply_chain' as const,
        descriptions: [
          'Vendor delivery reliability declining below SLA',
          'Parts quality issues from specific suppliers',
          'Pricing volatility affecting cost projections'
        ],
        agents: ['Vendor Management AI', 'Quality Assurance Inspector', 'Financial Intelligence Agent'],
        recipientTypes: ['procurement_personnel', 'vendors', 'executives']
      },
      {
        type: 'logistics_disruption',
        category: 'supply_chain' as const,
        descriptions: [
          'Shipping delays affecting multiple suppliers',
          'Weather disrupting parts distribution network',
          'Transportation cost spikes impacting delivery economics'
        ],
        agents: ['Logistics Optimization AI', 'Parts Prediction Engine', 'Emergency Response Coordinator'],
        recipientTypes: ['procurement_personnel', 'vendors', 'logistics_coordinators']
      },
      {
        type: 'warranty_claim_surge',
        category: 'supply_chain' as const,
        descriptions: [
          'Defective parts claims exceeding normal patterns',
          'Manufacturer recalls affecting inventory',
          'Installation quality issues creating warranty liabilities'
        ],
        agents: ['Quality Assurance Inspector', 'Parts Ordering Specialist', 'Financial Intelligence Agent'],
        recipientTypes: ['vendors', 'quality_managers', 'executives']
      },
      
      // FINANCIAL ALERTS (4 types)
      {
        type: 'revenue_variance',
        category: 'financial' as const,
        descriptions: [
          'Planning area revenue trending below projections',
          'Service mix shifting toward lower-margin offerings',
          'Pricing pressure from competitors affecting margins'
        ],
        agents: ['Financial Intelligence Agent', 'Pricing Optimization AI', 'Regional Performance Monitor'],
        recipientTypes: ['executives', 'financial_analysts', 'pricing_managers']
      },
      {
        type: 'cost_overrun',
        category: 'financial' as const,
        descriptions: [
          'Operational costs exceeding budget allocations',
          'Labor expense inflation outpacing revenue growth',
          'Parts cost volatility affecting profitability'
        ],
        agents: ['Financial Intelligence Agent', 'Cost Management AI', 'Parts Prediction Engine'],
        recipientTypes: ['executives', 'financial_analysts', 'cost_controllers']
      },
      {
        type: 'cash_flow_pressure',
        category: 'financial' as const,
        descriptions: [
          'Account receivables aging beyond collection targets',
          'Working capital requirements exceeding projections',
          'Seasonal cash flow patterns creating liquidity constraints'
        ],
        agents: ['Financial Intelligence Agent', 'Collections AI', 'Cash Flow Optimizer'],
        recipientTypes: ['executives', 'financial_analysts', 'accounting_managers']
      },
      {
        type: 'profitability_decline',
        category: 'financial' as const,
        descriptions: [
          'Per-job profit margins compressing below targets',
          'Planning area P&L showing negative trends',
          'Cost per acquisition rising faster than customer value'
        ],
        agents: ['Financial Intelligence Agent', 'Profitability Analyzer', 'Regional Performance Monitor'],
        recipientTypes: ['executives', 'financial_analysts', 'business_analysts']
      },
      
      // CUSTOMER ALERTS (3 types)
      {
        type: 'satisfaction_decline',
        category: 'customer' as const,
        descriptions: [
          'Customer satisfaction scores dropping below benchmarks',
          'Negative review patterns increasing in planning area',
          'Service quality complaints trending upward'
        ],
        agents: ['Customer Communication Hub', 'Quality Assurance Inspector', 'Customer Experience AI'],
        recipientTypes: ['executives', 'customer_service', 'quality_managers']
      },
      {
        type: 'churn_risk',
        category: 'customer' as const,
        descriptions: [
          'High-value B2B clients showing disengagement signals',
          'Repeat customer frequency declining below targets',
          'Customer lifetime value metrics deteriorating'
        ],
        agents: ['Customer Retention AI', 'B2B Relationship Manager', 'Customer Communication Hub'],
        recipientTypes: ['executives', 'account_managers', 'b2b_clients']
      },
      {
        type: 'service_escalation',
        category: 'customer' as const,
        descriptions: [
          'Customer complaints requiring executive intervention',
          'Service failures creating liability exposure',
          'Repeat service calls indicating systemic issues'
        ],
        agents: ['Customer Communication Hub', 'Quality Assurance Inspector', 'Executive Escalation AI'],
        recipientTypes: ['executives', 'customer_service', 'legal_teams']
      },
      
      // TECHNICAL ALERTS (3 types)
      {
        type: 'system_performance',
        category: 'technical' as const,
        descriptions: [
          'Scheduling system response times degrading',
          'Mobile app crashes affecting technician productivity',
          'Database performance impacting real-time operations'
        ],
        agents: ['Technical Operations AI', 'System Monitoring Agent', 'Performance Analytics AI'],
        recipientTypes: ['technical_teams', 'executives', 'system_administrators']
      },
      {
        type: 'data_quality',
        category: 'technical' as const,
        descriptions: [
          'Customer data inconsistencies affecting service delivery',
          'Inventory tracking discrepancies detected',
          'Integration failures between system components'
        ],
        agents: ['Data Quality Monitor', 'System Integration AI', 'Technical Operations AI'],
        recipientTypes: ['technical_teams', 'data_analysts', 'system_administrators']
      },
      {
        type: 'cybersecurity_threat',
        category: 'technical' as const,
        descriptions: [
          'Unusual access patterns detected in planning area',
          'Security vulnerability requiring immediate patching',
          'Data breach risk from compromised endpoints'
        ],
        agents: ['Cybersecurity AI', 'Threat Detection System', 'Technical Operations AI'],
        recipientTypes: ['technical_teams', 'security_officers', 'executives']
      }
    ];

    // Generate warnings for next 72 hours - increased to show comprehensive alert types
    for (let i = 0; i < 35; i++) {
      const warningType = warningTypes[Math.floor(Math.random() * warningTypes.length)];
      const planningArea = planningAreas[Math.floor(Math.random() * planningAreas.length)];
      const hoursFromNow = Math.floor(Math.random() * 72) + 1;
      const predictedDate = new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
      
      // Adjust severity based on category
      let severity: 'critical' | 'high' | 'medium' | 'low';
      if (warningType.category === 'technical' || warningType.category === 'financial') {
        severity = Math.random() < 0.25 ? 'critical' : 
                  Math.random() < 0.5 ? 'high' : 
                  Math.random() < 0.8 ? 'medium' : 'low';
      } else {
        severity = Math.random() < 0.15 ? 'critical' : 
                  Math.random() < 0.35 ? 'high' : 
                  Math.random() < 0.65 ? 'medium' : 'low';
      }

      const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      const preventionWindow = Math.floor(Math.random() * 12) + 2; // 2-14 hours
      
      // Revenue impact varies by category
      let revenueImpact: number;
      switch (warningType.category) {
        case 'financial':
          revenueImpact = Math.floor(Math.random() * 100000) + 20000; // $20K-$120K
          break;
        case 'operational':
          revenueImpact = Math.floor(Math.random() * 60000) + 10000; // $10K-$70K
          break;
        case 'workforce':
          revenueImpact = Math.floor(Math.random() * 40000) + 8000; // $8K-$48K
          break;
        case 'supply_chain':
          revenueImpact = Math.floor(Math.random() * 50000) + 5000; // $5K-$55K
          break;
        case 'customer':
          revenueImpact = Math.floor(Math.random() * 80000) + 15000; // $15K-$95K
          break;
        case 'technical':
          revenueImpact = Math.floor(Math.random() * 30000) + 5000; // $5K-$35K
          break;
        default:
          revenueImpact = Math.floor(Math.random() * 50000) + 5000;
      }

      warnings.push({
        id: `${warningType.category.toUpperCase().slice(0,3)}-${i.toString().padStart(3, '0')}`,
        type: warningType.type,
        category: warningType.category,
        severity,
        planningArea,
        predictedDate: predictedDate.toISOString(),
        confidence,
        impactDescription: warningType.descriptions[Math.floor(Math.random() * warningType.descriptions.length)],
        suggestedActions: [
          `Coordinate with ${warningType.agents[0]} for immediate response`,
          `Implement preventive measures through ${warningType.agents[1]}`,
          `Monitor escalation triggers via ${warningType.agents[2] || warningType.agents[0]}`,
          `Notify ${warningType.recipientTypes.join(', ')} of situation`
        ],
        affectedServices: generateAffectedServices(warningType.type),
        estimatedLossRevenue: revenueImpact,
        preventionWindow,
        relatedAgents: warningType.agents,
        recipientTypes: warningType.recipientTypes,
        currentTrend: Math.random() < 0.4 ? 'increasing' : Math.random() < 0.7 ? 'stable' : 'decreasing'
      });
    }

    return warnings.sort((a, b) => {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }, []);

  function generateSuggestedActions(type: PredictiveWarning['type']): string[] {
    const actionMap: Record<string, string[]> = {
      capacity_shortage: [
        'Activate on-call technician pool',
        'Extend service hours temporarily',
        'Implement priority scheduling algorithm',
        'Contact contractor network for backup support'
      ],
      demand_surge: [
        'Pre-position technicians in affected areas',
        'Stock emergency vehicles with high-demand parts',
        'Activate surge pricing protocols',
        'Send proactive customer communications'
      ],
      technician_shortage: [
        'Initiate emergency recruiting protocols',
        'Offer overtime incentives to available staff',
        'Cross-train technicians for coverage',
        'Partner with external contractor firms'
      ],
      parts_delay: [
        'Expedite critical parts shipments',
        'Source alternative suppliers',
        'Redistribute inventory from other regions',
        'Implement parts conservation protocols'
      ],
      weather_impact: [
        'Pre-deploy emergency response teams',
        'Secure additional fleet vehicles',
        'Activate weather monitoring protocols',
        'Prepare customer safety communications'
      ],
      equipment_failure: [
        'Schedule maintenance during off-peak hours',
        'Prepare backup equipment inventory',
        'Coordinate with equipment vendors',
        'Implement manual fallback procedures'
      ]
    };
    return actionMap[type] || ['Review and assess situation', 'Contact relevant support teams'];
  }

  function generateAffectedServices(type: PredictiveWarning['type']): string[] {
    const serviceMap: Record<string, string[]> = {
      capacity_shortage: ['Emergency Repairs', 'Scheduled Maintenance', 'New Installations'],
      demand_surge: ['HVAC Emergency', 'Appliance Repair', 'Electrical Service'],
      technician_shortage: ['All Service Types', 'Quality Inspections', 'Customer Communications'],
      parts_delay: ['Appliance Repairs', 'HVAC Installations', 'Equipment Replacements'],
      weather_impact: ['Emergency Services', 'Storm Damage Repair', 'Preventive Maintenance'],
      equipment_failure: ['Diagnostic Services', 'Quality Assessments', 'Performance Monitoring']
    };
    return serviceMap[type] || ['General Services'];
  }

  // Filter warnings based on selected criteria
  const filteredWarnings = useMemo(() => {
    return predictiveWarnings.filter(warning => {
      const now = new Date();
      const warningDate = new Date(warning.predictedDate);
      
      // Time filter
      let timeMatch = true;
      if (selectedTimeframe === '24h') {
        timeMatch = warningDate.getTime() - now.getTime() <= 24 * 60 * 60 * 1000;
      } else if (selectedTimeframe === '48h') {
        timeMatch = warningDate.getTime() - now.getTime() <= 48 * 60 * 60 * 1000;
      } else if (selectedTimeframe === '72h') {
        timeMatch = warningDate.getTime() - now.getTime() <= 72 * 60 * 60 * 1000;
      }
      
      const severityMatch = selectedSeverity === 'all' || warning.severity === selectedSeverity;
      const areaMatch = selectedPlanningArea === 'all' || warning.planningArea === selectedPlanningArea;
      const agentMatch = selectedAgent === 'all' || warning.relatedAgents.some(agent => 
        agent.toLowerCase().includes(selectedAgent.toLowerCase())
      );
      const categoryMatch = selectedCategory === 'all' || warning.category === selectedCategory;
      
      return timeMatch && severityMatch && areaMatch && agentMatch && categoryMatch;
    });
  }, [predictiveWarnings, selectedTimeframe, selectedSeverity, selectedPlanningArea, selectedAgent, selectedCategory]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const critical = filteredWarnings.filter(w => w.severity === 'critical').length;
    const high = filteredWarnings.filter(w => w.severity === 'high').length;
    const totalRevenueLoss = filteredWarnings.reduce((sum, w) => sum + w.estimatedLossRevenue, 0);
    const avgConfidence = filteredWarnings.length > 0 
      ? filteredWarnings.reduce((sum, w) => sum + w.confidence, 0) / filteredWarnings.length 
      : 0;

    // Category breakdown
    const categoryStats = {
      operational: filteredWarnings.filter(w => w.category === 'operational').length,
      workforce: filteredWarnings.filter(w => w.category === 'workforce').length,
      supply_chain: filteredWarnings.filter(w => w.category === 'supply_chain').length,
      financial: filteredWarnings.filter(w => w.category === 'financial').length,
      customer: filteredWarnings.filter(w => w.category === 'customer').length,
      technical: filteredWarnings.filter(w => w.category === 'technical').length,
    };

    return { critical, high, totalRevenueLoss, avgConfidence, categoryStats };
  }, [filteredWarnings]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffHours = Math.round((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Within 1 hour';
    if (diffHours === 1) return 'In 1 hour';
    if (diffHours < 24) return `In ${diffHours} hours`;
    const diffDays = Math.round(diffHours / 24);
    return `In ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'capacity_shortage': return <Users className="h-4 w-4" />;
      case 'demand_surge': return <TrendingUp className="h-4 w-4" />;
      case 'technician_shortage': return <Wrench className="h-4 w-4" />;
      case 'parts_delay': return <Target className="h-4 w-4" />;
      case 'weather_impact': return <Shield className="h-4 w-4" />;
      case 'equipment_failure': return <Gauge className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onNavigateBack}>
            ← Back to Dashboard
          </Button>
          <AlertTriangle className="h-8 w-8 text-orange-500" />
          <div>
            <h1 className="text-3xl font-bold">Predictive Scheduling Warnings</h1>
            <p className="text-gray-600">
              AI-powered early warning system for scheduling disruptions and capacity issues
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.location.href = '/predictive-demos'}>
            View Demonstrations
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{summaryStats.critical}</div>
            <p className="text-xs text-muted-foreground">Require immediate action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">{summaryStats.high}</div>
            <p className="text-xs text-muted-foreground">Need attention soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue at Risk</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              {formatCurrency(summaryStats.totalRevenueLoss)}
            </div>
            <p className="text-xs text-muted-foreground">Potential loss if unaddressed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <Gauge className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {summaryStats.avgConfidence.toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">Prediction accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Distribution by Category</CardTitle>
          <p className="text-sm text-gray-400">
            Comprehensive breakdown of the 30 alert types across 6 operational categories
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-4 border border-gray-700 rounded-lg bg-blue-500/10">
              <div className="text-2xl font-bold text-blue-400">{summaryStats.categoryStats.operational}</div>
              <div className="text-sm text-gray-300">🔧 Operational</div>
              <div className="text-xs text-gray-400 mt-1">8 alert types</div>
            </div>
            <div className="text-center p-4 border border-gray-700 rounded-lg bg-green-500/10">
              <div className="text-2xl font-bold text-green-400">{summaryStats.categoryStats.workforce}</div>
              <div className="text-sm text-gray-300">👥 Workforce</div>
              <div className="text-xs text-gray-400 mt-1">7 alert types</div>
            </div>
            <div className="text-center p-4 border border-gray-700 rounded-lg bg-yellow-500/10">
              <div className="text-2xl font-bold text-yellow-400">{summaryStats.categoryStats.supply_chain}</div>
              <div className="text-sm text-gray-300">📦 Supply Chain</div>
              <div className="text-xs text-gray-400 mt-1">5 alert types</div>
            </div>
            <div className="text-center p-4 border border-gray-700 rounded-lg bg-purple-500/10">
              <div className="text-2xl font-bold text-purple-400">{summaryStats.categoryStats.financial}</div>
              <div className="text-sm text-gray-300">💰 Financial</div>
              <div className="text-xs text-gray-400 mt-1">4 alert types</div>
            </div>
            <div className="text-center p-4 border border-gray-700 rounded-lg bg-orange-500/10">
              <div className="text-2xl font-bold text-orange-400">{summaryStats.categoryStats.customer}</div>
              <div className="text-sm text-gray-300">🤝 Customer</div>
              <div className="text-xs text-gray-400 mt-1">3 alert types</div>
            </div>
            <div className="text-center p-4 border border-gray-700 rounded-lg bg-red-500/10">
              <div className="text-2xl font-bold text-red-400">{summaryStats.categoryStats.technical}</div>
              <div className="text-sm text-gray-300">⚙️ Technical</div>
              <div className="text-xs text-gray-400 mt-1">3 alert types</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Warnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Category:</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="operational">🔧 Operational</SelectItem>
                  <SelectItem value="workforce">👥 Workforce</SelectItem>
                  <SelectItem value="supply_chain">📦 Supply Chain</SelectItem>
                  <SelectItem value="financial">💰 Financial</SelectItem>
                  <SelectItem value="customer">🤝 Customer</SelectItem>
                  <SelectItem value="technical">⚙️ Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Timeframe:</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Next 24 Hours</SelectItem>
                  <SelectItem value="48h">Next 48 Hours</SelectItem>
                  <SelectItem value="72h">Next 72 Hours</SelectItem>
                  <SelectItem value="all">All Timeframes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Severity:</label>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Planning Area:</label>
              <Select value={selectedPlanningArea} onValueChange={setSelectedPlanningArea}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="Atlanta Metro North">Atlanta Metro North</SelectItem>
                  <SelectItem value="Austin Central">Austin Central</SelectItem>
                  <SelectItem value="Boston Metro">Boston Metro</SelectItem>
                  <SelectItem value="Chicago North">Chicago North</SelectItem>
                  <SelectItem value="Dallas Fort Worth">Dallas Fort Worth</SelectItem>
                  <SelectItem value="Los Angeles Central">Los Angeles Central</SelectItem>
                  <SelectItem value="New York Metro">New York Metro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Related Agent:</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="scheduling">Scheduling Agents</SelectItem>
                  <SelectItem value="technician">Technician Agents</SelectItem>
                  <SelectItem value="parts">Parts & Inventory</SelectItem>
                  <SelectItem value="emergency">Emergency Response</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings List */}
      <div className="space-y-4">
        {filteredWarnings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-white mb-2">No Warnings Found</h3>
              <p className="text-gray-400">No predictive warnings match your current filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredWarnings.map(warning => (
            <Card key={warning.id} className={`border-l-4 ${getSeverityColor(warning.severity).includes('red') ? 'border-l-red-500' : 
              getSeverityColor(warning.severity).includes('orange') ? 'border-l-orange-500' :
              getSeverityColor(warning.severity).includes('yellow') ? 'border-l-yellow-500' : 'border-l-blue-500'}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(warning.type)}
                    <div>
                      <h3 className="text-lg font-semibold">{getTypeLabel(warning.type)}</h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-400">{warning.planningArea}</p>
                        <Badge variant="outline" className="text-xs">
                          {warning.category.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(warning.severity)}>
                      {warning.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-gray-300">
                      {warning.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Impact Description</h4>
                    <p className="text-sm text-gray-300">{warning.impactDescription}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Timeline</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-300">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Predicted: {formatRelativeTime(warning.predictedDate)}
                      </p>
                      <p className="text-sm text-gray-300">
                        <AlertTriangle className="h-4 w-4 inline mr-1" />
                        Prevention window: {warning.preventionWindow} hours
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Affected Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {warning.affectedServices.map(service => (
                      <Badge key={service} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Related Agents</h4>
                    <div className="flex flex-wrap gap-2">
                      {warning.relatedAgents.map(agent => (
                        <Badge key={agent} variant="outline" className="text-xs">
                          {agent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Notification Recipients</h4>
                    <div className="flex flex-wrap gap-2">
                      {warning.recipientTypes?.map(recipient => (
                        <Badge key={recipient} className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {recipient.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Suggested Actions</h4>
                  <ul className="space-y-1">
                    {warning.suggestedActions.map((action, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start">
                        <span className="mr-2">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="text-sm text-gray-400">
                    Revenue at Risk: <span className="text-red-400 font-medium">
                      {formatCurrency(warning.estimatedLossRevenue)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Trend: <span className={`font-medium ${
                      warning.currentTrend === 'increasing' ? 'text-red-400' :
                      warning.currentTrend === 'stable' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {warning.currentTrend}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}