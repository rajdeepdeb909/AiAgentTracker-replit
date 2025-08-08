import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLocation } from 'wouter';
import { Building2, TrendingUp, AlertTriangle, Star, Clock, Phone, MessageSquare, Bot, Users, DollarSign, Activity, ArrowLeft, Eye, Target, Settings, Filter, MapPin, Wrench, Package, BarChart3, ChevronRight, Shield, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AhsAreaManagerSystem from './AhsAreaManagerSystem';

// B2B Client data based on CSV
const B2B_CLIENTS = [
  {
    id: 1,
    name: 'American Home Shield',
    shortName: 'AHS',
    tier: 'Tier 1',
    status: 'active',
    completes: 870,
    revenue: 220318,
    profit: 39345,
    profitMargin: 17.86,
    revenuePerCall: 253.24,
    profitPerCall: 45.22,
    yoyRevenue: -68.50,
    yoyProfit: -77.68,
    currentIssues: ['Cost optimization', 'Response time improvement', 'Quality ratings'],
    primaryContact: 'Jennifer Walsh',
    relationship: 'Partnership Development',
    aiAgent: 'AI-Powered B2B Intelligence Agent',
    ratingConcerns: 'Customer satisfaction tracking needed',
    reliabilityMetrics: {
      responseTime: '2.1 hours avg',
      rescheduleRate: '12%',
      cycleTime: '4.2 days',
      recallRate: '3.1%'
    },
    appliances: ['Refrigerator/Freezer', 'Dryer', 'Range/Cooktop/Oven', 'Dishwasher', 'Washer', 'Mwave'],
    planningAreas: [
      { name: 'Dallas Metro', completes: 143, revenue: 36246, profit: 6479 },
      { name: 'Houston Southwest', completes: 127, revenue: 32275, profit: 5765 },
      { name: 'Phoenix Central', completes: 89, revenue: 22556, profit: 4028 },
      { name: 'Atlanta North', completes: 156, revenue: 39570, profit: 7076 },
      { name: 'Miami-Dade', completes: 98, revenue: 24878, profit: 4445 },
      { name: 'Chicago West', completes: 112, revenue: 28402, profit: 5081 },
      { name: 'Los Angeles East', completes: 145, revenue: 36795, profit: 6579 }
    ],
    appliancePerformance: [
      { type: 'Refrigerator/Freezer', completes: 277, revenue: 75702, profit: 12257, margin: 16.19 },
      { type: 'Dryer', completes: 134, revenue: 31027, profit: 7300, margin: 23.53 },
      { type: 'Range/Cooktop/Oven', completes: 91, revenue: 23859, profit: 3562, margin: 14.93 },
      { type: 'Dishwasher', completes: 132, revenue: 29976, profit: 3416, margin: 11.40 },
      { type: 'Washer', completes: 191, revenue: 47442, profit: 11955, margin: 25.20 },
      { type: 'Mwave', completes: 45, revenue: 12312, profit: 856, margin: 6.95 }
    ]
  },
  {
    id: 2,
    name: 'Assurant',
    shortName: 'AIZ',
    tier: 'Tier 1',
    status: 'active',
    completes: 724,
    revenue: 205081,
    profit: 54985,
    profitMargin: 26.81,
    revenuePerCall: 283.26,
    profitPerCall: 75.95,
    yoyRevenue: -39.12,
    yoyProfit: -8.10,
    currentIssues: ['5-star rating improvement', 'Cost per call reduction'],
    primaryContact: 'Michael Davis',
    relationship: 'Performance Analytics',
    aiAgent: 'Regional Performance Monitor',
    ratingConcerns: 'Maintain >4.5 star average',
    reliabilityMetrics: {
      responseTime: '1.8 hours avg',
      rescheduleRate: '8%',
      cycleTime: '3.8 days',
      recallRate: '2.4%'
    },
    appliances: ['Refrigerator/Freezer', 'Range/Cooktop/Oven', 'Dishwasher', 'Washer', 'Hvac'],
    planningAreas: [
      { name: 'Austin Central', completes: 135, revenue: 38245, profit: 10267 },
      { name: 'San Antonio North', completes: 118, revenue: 33424, profit: 8980 },
      { name: 'Denver Metro', completes: 92, revenue: 26062, profit: 7002 },
      { name: 'Tampa Bay', completes: 147, revenue: 41667, profit: 11197 },
      { name: 'Nashville', completes: 87, revenue: 24661, profit: 6628 },
      { name: 'Charlotte', completes: 102, revenue: 28919, profit: 7772 },
      { name: 'Las Vegas', completes: 143, revenue: 40553, profit: 10891 }
    ],
    appliancePerformance: [
      { type: 'Refrigerator/Freezer', completes: 226, revenue: 68169, profit: 15514, margin: 22.76 },
      { type: 'Range/Cooktop/Oven', completes: 92, revenue: 27701, profit: 7157, margin: 25.84 },
      { type: 'Dishwasher', completes: 67, revenue: 16796, profit: 5530, margin: 32.93 },
      { type: 'Washer', completes: 319, revenue: 88150, profit: 25642, margin: 29.09 },
      { type: 'Hvac', completes: 20, revenue: 4265, profit: 1142, margin: 26.78 }
    ]
  },
  {
    id: 3,
    name: 'Choice Home Warranty',
    shortName: 'Choice',
    tier: 'Tier 1',
    status: 'active',
    completes: 453,
    revenue: 100389,
    profit: 40394,
    profitMargin: 40.24,
    revenuePerCall: 221.61,
    profitPerCall: 89.17,
    yoyRevenue: -78.41,
    yoyProfit: -28.03,
    currentIssues: ['Cycle time optimization', 'HVAC specialization'],
    primaryContact: 'Amanda Thompson',
    relationship: 'Operations Excellence',
    aiAgent: 'Advanced Scheduling Agent',
    ratingConcerns: 'HVAC service quality focus',
    reliabilityMetrics: {
      responseTime: '1.5 hours avg',
      rescheduleRate: '6%',
      cycleTime: '3.2 days',
      recallRate: '1.8%'
    },
    appliances: ['Hvac']
  },
  {
    id: 4,
    name: 'GE (General Electric)',
    shortName: 'GE',
    tier: 'Tier 2',
    status: 'active',
    completes: 99,
    revenue: 24518,
    profit: 4127,
    profitMargin: 16.83,
    revenuePerCall: 247.65,
    profitPerCall: 41.68,
    yoyRevenue: -86.42,
    yoyProfit: 371.38,
    currentIssues: ['Volume growth', 'Brand partnership expansion'],
    primaryContact: 'Sarah Chen',
    relationship: 'Strategic Partnership',
    aiAgent: 'Technician Recruiting Agent',
    ratingConcerns: 'Brand reputation maintenance',
    reliabilityMetrics: {
      responseTime: '2.3 hours avg',
      rescheduleRate: '9%',
      cycleTime: '4.1 days',
      recallRate: '2.9%'
    },
    appliances: ['Refrigerator/Freezer', 'Dryer', 'Range/Cooktop/Oven', 'Dishwasher', 'Washer', 'Other']
  },
  {
    id: 5,
    name: 'LG',
    shortName: 'LG',
    tier: 'Tier 2',
    status: 'active',
    completes: 74,
    revenue: 24086,
    profit: 3952,
    profitMargin: 16.41,
    revenuePerCall: 325.49,
    profitPerCall: 53.40,
    yoyRevenue: -86.37,
    yoyProfit: -75.10,
    currentIssues: ['High-end appliance expertise', 'Premium service delivery'],
    primaryContact: 'Robert Zhang',
    relationship: 'Quality Assurance',
    aiAgent: 'Quality Assurance Inspector',
    ratingConcerns: 'Premium brand expectations',
    reliabilityMetrics: {
      responseTime: '2.0 hours avg',
      rescheduleRate: '7%',
      cycleTime: '3.9 days',
      recallRate: '2.2%'
    },
    appliances: ['Refrigerator/Freezer', 'Dryer', 'Range/Cooktop/Oven', 'Dishwasher', 'Washer']
  },
  {
    id: 6,
    name: 'Samsung',
    shortName: 'Samsung',
    tier: 'Tier 2',
    status: 'expanding',
    completes: 45,
    revenue: 18500,
    profit: 5200,
    profitMargin: 28.11,
    revenuePerCall: 411.11,
    profitPerCall: 115.56,
    yoyRevenue: 12.5,
    yoyProfit: 18.3,
    currentIssues: ['Technology integration', 'Smart appliance support'],
    primaryContact: 'Chris Martinez',
    relationship: 'Technology Training',
    aiAgent: 'Technician Training & Development Agent',
    ratingConcerns: 'Tech-savvy customer expectations',
    reliabilityMetrics: {
      responseTime: '1.9 hours avg',
      rescheduleRate: '5%',
      cycleTime: '3.5 days',
      recallRate: '1.9%'
    },
    appliances: ['Refrigerator/Freezer', 'Dryer', 'Range/Cooktop/Oven', 'Dishwasher', 'Washer']
  },
  {
    id: 7,
    name: 'Electrolux',
    shortName: 'EMA',
    tier: 'Tier 2',
    status: 'active',
    completes: 127,
    revenue: 30531,
    profit: 8054,
    profitMargin: 26.38,
    revenuePerCall: 240.40,
    profitPerCall: 63.42,
    yoyRevenue: -44.21,
    yoyProfit: -277.42,
    currentIssues: ['Profit margin recovery', 'European quality standards'],
    primaryContact: 'Lisa Park',
    relationship: 'Operational Coordination',
    aiAgent: 'Maintenance Scheduler Pro',
    ratingConcerns: 'European brand quality expectations',
    reliabilityMetrics: {
      responseTime: '2.2 hours avg',
      rescheduleRate: '10%',
      cycleTime: '4.0 days',
      recallRate: '2.7%'
    },
    appliances: ['Refrigerator/Freezer', 'Dryer', 'Range/Cooktop/Oven', 'Dishwasher', 'Washer', 'Hvac']
  },
  {
    id: 8,
    name: 'First American Home Warranty',
    shortName: 'First American',
    tier: 'Tier 3',
    status: 'active',
    completes: 106,
    revenue: 28738,
    profit: 5548,
    profitMargin: 19.30,
    revenuePerCall: 271.12,
    profitPerCall: 52.34,
    yoyRevenue: -81.98,
    yoyProfit: -235.43,
    currentIssues: ['Profitability improvement', 'Service standardization'],
    primaryContact: 'Emily Johnson',
    relationship: 'Data Analytics',
    aiAgent: 'Performance Analytics AI',
    ratingConcerns: 'Consistency across service types',
    reliabilityMetrics: {
      responseTime: '2.4 hours avg',
      rescheduleRate: '11%',
      cycleTime: '4.3 days',
      recallRate: '3.0%'
    },
    appliances: ['Refrigerator/Freezer', 'Dryer', 'Range/Cooktop/Oven', 'Dishwasher', 'Washer', 'Hvac']
  },
  {
    id: 9,
    name: 'Cinch Home Warranty',
    shortName: 'Cinch',
    tier: 'Tier 3',
    status: 'active',
    completes: 22,
    revenue: 5928,
    profit: 1925,
    profitMargin: 32.47,
    revenuePerCall: 269.45,
    profitPerCall: 87.49,
    yoyRevenue: -91.03,
    yoyProfit: -78.67,
    currentIssues: ['Volume growth', 'Market presence expansion'],
    primaryContact: 'David Kim',
    relationship: 'Business Development',
    aiAgent: 'LLM Content Intelligence Agent',
    ratingConcerns: 'Small volume quality maintenance',
    reliabilityMetrics: {
      responseTime: '2.6 hours avg',
      rescheduleRate: '13%',
      cycleTime: '4.5 days',
      recallRate: '3.4%'
    },
    appliances: ['Refrigerator/Freezer', 'Dryer', 'Range/Cooktop/Oven', 'Dishwasher', 'Washer']
  }
];

// AI Communication Templates
const COMMUNICATION_TEMPLATES = {
  weekly_report: {
    subject: 'Weekly Performance Update - {client_name}',
    template: 'Performance metrics for week ending {date}:\n- Completions: {completes}\n- Revenue: ${revenue:,}\n- Profit Margin: {profit_margin}%\n- Response Time: {response_time}\n- Customer Rating: {rating}/5\n\nKey Focus Areas:\n{focus_areas}\n\nNext Week Priorities:\n{priorities}'
  },
  issue_escalation: {
    subject: 'Service Quality Alert - {client_name}',
    template: 'Alert: {issue_type} threshold exceeded\n\nCurrent Status:\n- Metric: {metric_name}\n- Current Value: {current_value}\n- Target: {target_value}\n\nImmediate Actions:\n{action_plan}\n\nAI Agent Recommendations:\n{ai_recommendations}'
  },
  feedback_request: {
    subject: 'Service Quality Feedback Request - {client_name}',
    template: 'We value your partnership feedback on recent service delivery:\n\n1. Cost Efficiency: Rate 1-5\n2. Response Time: Rate 1-5\n3. Service Quality: Rate 1-5\n4. Communication: Rate 1-5\n\nSpecific Feedback:\n{custom_questions}\n\nPlease reply with your assessment and any improvement suggestions.'
  }
};

export default function B2BClientManagement() {
  const [, setLocation] = useLocation();
  const { hasPermission } = useAuth();
  const [selectedClient, setSelectedClient] = useState<any>(null);

  // Check if user has permission to view B2B clients
  const canViewB2B = hasPermission('view_b2b_clients');

  // If no permission, show access denied
  if (!canViewB2B) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">B2B Client Management</h1>
        </div>
        
        <Alert className="bg-red-500/10 border-red-500/20 text-red-400">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Access Denied: You don't have permission to view B2B client data. Contact your administrator to request access.
          </AlertDescription>
        </Alert>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-white font-medium mb-3">Available Actions</h3>
          <p className="text-gray-400 mb-4">You can navigate to other sections you have access to:</p>
          <div className="flex flex-wrap gap-3">
            {hasPermission('view_dashboard') && (
              <Button
                onClick={() => setLocation('/')}
                variant="outline"
                className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
  const [showCommunication, setShowCommunication] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [communicationType, setCommunicationType] = useState('weekly_report');
  const [customMessage, setCustomMessage] = useState('');
  const [feedbackData, setFeedbackData] = useState({
    cost: '',
    responseTime: '',
    quality: '',
    communication: '',
    comments: ''
  });
  
  // Performance Analytics Filters
  const [selectedPlanningArea, setSelectedPlanningArea] = useState('All Areas');
  const [selectedProductType, setSelectedProductType] = useState('All Products');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [performanceView, setPerformanceView] = useState('planning-areas');
  const [showRealTimeDashboard, setShowRealTimeDashboard] = useState(false);

  // Generate dynamic data based on filters
  const generateFilteredData = () => {
    const baseMultiplier = selectedPlanningArea === 'All Areas' ? 1.0 : 0.25;
    const productMultiplier = selectedProductType === 'All Products' ? 1.0 : 0.18;
    const areaSpecificMultiplier: Record<string, number> = {
      'Dallas Metro': 1.2,
      'Houston Metro': 1.1,
      'Austin Metro': 0.8,
      'San Antonio Metro': 0.7,
      'California Central': 1.3,
      'Florida Southeast': 0.95,
      'Northeast Corridor': 1.15
    };
    
    const areaMultiplier = selectedPlanningArea === 'All Areas' ? 1.0 : 
      (areaSpecificMultiplier[selectedPlanningArea] || 1.0);
    
    const totalMultiplier = baseMultiplier * productMultiplier * areaMultiplier;
    
    return {
      totalRevenue: Math.round(847000 * totalMultiplier),
      avgMargin: 24.3 + (Math.random() - 0.5) * 2,
      avgResponseTime: 1.9 + (Math.random() - 0.5) * 0.4,
      avgRating: 4.3 + (Math.random() - 0.5) * 0.2,
      completionRate: 87.2 + (Math.random() - 0.5) * 5,
      rescheduleRate: 8.4 + (Math.random() - 0.5) * 2
    };
  };

  const filteredData = generateFilteredData();

  const getAreaSpecificData = () => {
    if (selectedPlanningArea === 'All Areas') {
      return [
        { name: 'Dallas Metro - North', revenue: 47000, technicians: 127, completion: 89, rating: 4.7 },
        { name: 'Houston Metro - West', revenue: 42000, technicians: 98, completion: 91, rating: 4.5 },
        { name: 'California Central - Bay Area', revenue: 38000, technicians: 86, completion: 88, rating: 4.4 }
      ];
    } else {
      const baseRevenue = selectedPlanningArea.includes('Dallas') ? 47000 :
                         selectedPlanningArea.includes('Houston') ? 42000 :
                         selectedPlanningArea.includes('California') ? 38000 : 35000;
      
      return [
        { 
          name: `${selectedPlanningArea} - Zone 1`, 
          revenue: Math.round(baseRevenue * 0.4), 
          technicians: Math.round(127 * 0.35), 
          completion: 89 + Math.round((Math.random() - 0.5) * 4), 
          rating: 4.7 + (Math.random() - 0.5) * 0.3 
        },
        { 
          name: `${selectedPlanningArea} - Zone 2`, 
          revenue: Math.round(baseRevenue * 0.35), 
          technicians: Math.round(98 * 0.35), 
          completion: 91 + Math.round((Math.random() - 0.5) * 4), 
          rating: 4.5 + (Math.random() - 0.5) * 0.3 
        },
        { 
          name: `${selectedPlanningArea} - Zone 3`, 
          revenue: Math.round(baseRevenue * 0.25), 
          technicians: Math.round(86 * 0.30), 
          completion: 88 + Math.round((Math.random() - 0.5) * 4), 
          rating: 4.4 + (Math.random() - 0.5) * 0.3 
        }
      ];
    }
  };

  const getImprovementOpportunities = () => {
    const metricConfig = {
      'revenue': { threshold: 25000, unit: 'K/week', issue: 'Revenue below market average' },
      'profit': { threshold: 20, unit: '% margin', issue: 'Profit margin below target' },
      'response-time': { threshold: 2.5, unit: 'h response', issue: 'Response time above target' },
      'completion-rate': { threshold: 80, unit: '% completion', issue: 'Completion rate below standard' },
      'customer-rating': { threshold: 4.2, unit: '⭐ rating', issue: 'Customer satisfaction needs improvement' },
      'reschedule-rate': { threshold: 10, unit: '% reschedule', issue: 'High reschedule rate impacting efficiency' }
    };

    if (selectedPlanningArea === 'All Areas') {
      return [
        {
          name: 'Austin Metro - South',
          revenue: 18000,
          technicians: 45,
          completion: 72,
          rating: 3.9,
          issue: `High reschedule rate (15%) - ${metricConfig[selectedMetric].issue}`,
          severity: 'high'
        },
        {
          name: 'Florida Southeast - Tampa',
          revenue: 23000,
          technicians: 52,
          completion: 81,
          rating: 4.1,
          issue: `Response time 2.8h (target: 2h) - ${metricConfig[selectedMetric].issue}`,
          severity: 'medium'
        },
        {
          name: 'Northeast Corridor - Philadelphia',
          revenue: 29000,
          technicians: 73,
          completion: 85,
          rating: 4.2,
          issue: `Parts delivery delays impacting cycle time - ${metricConfig[selectedMetric].issue}`,
          severity: 'medium'
        }
      ];
    } else {
      const baseRevenue = selectedPlanningArea.includes('Dallas') ? 18000 :
                         selectedPlanningArea.includes('Houston') ? 23000 :
                         selectedPlanningArea.includes('California') ? 29000 : 20000;
      
      return [
        {
          name: `${selectedPlanningArea} - Underperforming Zone`,
          revenue: Math.round(baseRevenue * 0.6),
          technicians: Math.round(45 * 0.8),
          completion: 72 + Math.round((Math.random() - 0.5) * 6),
          rating: 3.9 + (Math.random() - 0.5) * 0.3,
          issue: `${selectedMetric} performance below regional average - needs attention`,
          severity: 'high'
        },
        {
          name: `${selectedPlanningArea} - Secondary Priority`,
          revenue: Math.round(baseRevenue * 0.8),
          technicians: Math.round(52 * 0.9),
          completion: 81 + Math.round((Math.random() - 0.5) * 4),
          rating: 4.1 + (Math.random() - 0.5) * 0.2,
          issue: `${selectedMetric} optimization opportunity - moderate improvement needed`,
          severity: 'medium'
        }
      ];
    }
  };

  const handleRealTimeDashboard = () => {
    setShowRealTimeDashboard(true);
  };

  const handleBackToDashboard = () => {
    setLocation('/');
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Tier 1': return 'bg-green-600';
      case 'Tier 2': return 'bg-blue-600';
      case 'Tier 3': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'expanding': return 'bg-blue-600';
      case 'at-risk': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const handleSendCommunication = () => {
    console.log('Sending communication:', {
      client: selectedClient?.name,
      type: communicationType,
      message: customMessage
    });
    setShowCommunication(false);
    setCustomMessage('');
  };

  const handleSubmitFeedback = () => {
    console.log('Submitting feedback:', {
      client: selectedClient?.name,
      feedback: feedbackData
    });
    setShowFeedback(false);
    setFeedbackData({
      cost: '',
      responseTime: '',
      quality: '',
      communication: '',
      comments: ''
    });
  };

  const tier1Clients = B2B_CLIENTS.filter(c => c.tier === 'Tier 1');
  const tier2Clients = B2B_CLIENTS.filter(c => c.tier === 'Tier 2');
  const tier3Clients = B2B_CLIENTS.filter(c => c.tier === 'Tier 3');

  const totalRevenue = B2B_CLIENTS.reduce((sum, client) => sum + client.revenue, 0);
  const totalProfit = B2B_CLIENTS.reduce((sum, client) => sum + client.profit, 0);
  const avgProfitMargin = totalProfit / totalRevenue * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={handleBackToDashboard}
            variant="outline"
            size="sm"
            className="text-gray-400 border-gray-600 hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">B2B Client Management</h1>
            <p className="text-gray-400 mt-2">AI-powered client relationship management and performance monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">${(totalRevenue / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-400">Total Revenue</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{avgProfitMargin.toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Avg Margin</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Real Time Dashboard Modal */}
      {showRealTimeDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Real-Time Performance Dashboard</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setShowRealTimeDashboard(false)}
                  className="border-gray-600 text-gray-400 hover:bg-gray-700"
                >
                  Close
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
                  <div className="text-green-400 text-sm">Live Revenue</div>
                  <div className="text-white text-2xl font-bold">${(filteredData.totalRevenue / 1000).toFixed(0)}K</div>
                  <div className="text-green-300 text-xs">Updated: {new Date().toLocaleTimeString()}</div>
                </div>
                <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                  <div className="text-blue-400 text-sm">Active Orders</div>
                  <div className="text-white text-2xl font-bold">2,847</div>
                  <div className="text-blue-300 text-xs">+47 in last hour</div>
                </div>
                <div className="bg-orange-900/20 border border-orange-600 p-4 rounded-lg">
                  <div className="text-orange-400 text-sm">Response Time</div>
                  <div className="text-white text-2xl font-bold">{filteredData.avgResponseTime.toFixed(1)}h</div>
                  <div className="text-orange-300 text-xs">Target: &lt;2h</div>
                </div>
                <div className="bg-purple-900/20 border border-purple-600 p-4 rounded-lg">
                  <div className="text-purple-400 text-sm">Quality Score</div>
                  <div className="text-white text-2xl font-bold">{filteredData.avgRating.toFixed(1)}/5</div>
                  <div className="text-purple-300 text-xs">87% satisfied</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-3">Live Activity Feed</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <div className="text-xs text-gray-300 border-l-2 border-green-400 pl-2">
                      <span className="text-green-400">{new Date().toLocaleTimeString()}</span> - Order #45782 completed in Dallas Metro (AHS client)
                    </div>
                    <div className="text-xs text-gray-300 border-l-2 border-blue-400 pl-2">
                      <span className="text-blue-400">{new Date(Date.now() - 60000).toLocaleTimeString()}</span> - Technician dispatched to Houston Metro emergency call
                    </div>
                    <div className="text-xs text-gray-300 border-l-2 border-orange-400 pl-2">
                      <span className="text-orange-400">{new Date(Date.now() - 120000).toLocaleTimeString()}</span> - Parts ordered for California Central - Bay Area
                    </div>
                    <div className="text-xs text-gray-300 border-l-2 border-purple-400 pl-2">
                      <span className="text-purple-400">{new Date(Date.now() - 180000).toLocaleTimeString()}</span> - Quality alert resolved in Northeast Corridor
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-3">Critical Alerts</h3>
                  <div className="space-y-2">
                    <div className="bg-red-900/30 border border-red-600 p-2 rounded text-xs">
                      <div className="text-red-400 font-medium">High Response Time</div>
                      <div className="text-gray-300">Austin Metro: 3.2h avg (target: 2h)</div>
                    </div>
                    <div className="bg-yellow-900/30 border border-yellow-600 p-2 rounded text-xs">
                      <div className="text-yellow-400 font-medium">Parts Delay</div>
                      <div className="text-gray-300">15 orders delayed in Florida Southeast</div>
                    </div>
                    <div className="bg-blue-900/30 border border-blue-600 p-2 rounded text-xs">
                      <div className="text-blue-400 font-medium">Capacity Alert</div>
                      <div className="text-gray-300">High demand detected in California Central</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">Overview</TabsTrigger>
          <TabsTrigger value="tier1" className="data-[state=active]:bg-green-600">Tier 1 (3)</TabsTrigger>
          <TabsTrigger value="tier2" className="data-[state=active]:bg-blue-600">Tier 2 (4)</TabsTrigger>
          <TabsTrigger value="tier3" className="data-[state=active]:bg-purple-600">Tier 3 (2)</TabsTrigger>
          <TabsTrigger value="ahs-managers" className="data-[state=active]:bg-red-600">AHS Area Managers</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-cyan-600">Performance Analytics</TabsTrigger>
          <TabsTrigger value="communications" className="data-[state=active]:bg-orange-600">AI Communications</TabsTrigger>
          <TabsTrigger value="feedback" className="data-[state=active]:bg-pink-600">Client Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {B2B_CLIENTS.map((client) => (
              <Card key={client.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 cursor-pointer transition-colors"
                    onClick={() => setSelectedClient(client)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">{client.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getTierColor(client.tier)}>{client.tier}</Badge>
                      <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Completes</div>
                      <div className="text-xl font-bold text-white">{client.completes}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Revenue</div>
                      <div className="text-xl font-bold text-green-400">${(client.revenue / 1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Profit Margin</div>
                      <div className={`text-xl font-bold ${client.profitMargin > 25 ? 'text-green-400' : client.profitMargin > 15 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {client.profitMargin.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Per Call</div>
                      <div className="text-xl font-bold text-blue-400">${client.revenuePerCall.toFixed(0)}</div>
                    </div>
                  </div>
                  
                  {client.currentIssues.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-400 mb-2">Current Issues</div>
                      <div className="flex flex-wrap gap-1">
                        {client.currentIssues.slice(0, 2).map((issue, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-red-500 text-red-400">
                            {issue}
                          </Badge>
                        ))}
                        {client.currentIssues.length > 2 && (
                          <Badge variant="outline" className="text-xs border-gray-500 text-gray-400">
                            +{client.currentIssues.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tier1">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Tier 1 Clients - Primary Relationships</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {tier1Clients.map((client) => (
                <Card key={client.id} className="bg-gray-800 border-green-600">
                  <CardHeader>
                    <CardTitle className="text-white">{client.name}</CardTitle>
                    <div className="text-gray-400">{client.completes} completes • ${(client.revenue / 1000).toFixed(0)}K revenue</div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-white mb-2">Primary Issues</div>
                        <div className="space-y-1">
                          {client.currentIssues.map((issue: string, index: number) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <AlertTriangle className="w-4 h-4 text-red-400" />
                              <span className="text-gray-300">{issue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-white mb-2">Reliability Metrics</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Response: {client.reliabilityMetrics.responseTime}</div>
                          <div>Reschedule: {client.reliabilityMetrics.rescheduleRate}</div>
                          <div>Cycle: {client.reliabilityMetrics.cycleTime}</div>
                          <div>Recall: {client.reliabilityMetrics.recallRate}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-white mb-2">AI Agent</div>
                        <Badge className="bg-blue-600">{client.aiAgent}</Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={() => { setSelectedClient(client); setShowCommunication(true); }}>
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setSelectedClient(client)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tier2">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Tier 2 Clients - Growth Partnerships</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tier2Clients.map((client) => (
                <Card key={client.id} className="bg-gray-800 border-blue-600">
                  <CardHeader>
                    <CardTitle className="text-white">{client.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{client.completes}</div>
                        <div className="text-xs text-gray-400">Completes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">${(client.revenue / 1000).toFixed(0)}K</div>
                        <div className="text-xs text-gray-400">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">{client.profitMargin.toFixed(1)}%</div>
                        <div className="text-xs text-gray-400">Margin</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-gray-400">Contact:</span>
                        <span className="text-white ml-2">{client.primaryContact}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-400">Focus:</span>
                        <span className="text-white ml-2">{client.relationship}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => { setSelectedClient(client); setShowCommunication(true); }}>
                        Contact
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setSelectedClient(client)}>
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tier3">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Tier 3 Clients - Emerging Opportunities</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tier3Clients.map((client) => (
                <Card key={client.id} className="bg-gray-800 border-purple-600">
                  <CardHeader>
                    <CardTitle className="text-white">{client.name}</CardTitle>
                    <div className="text-gray-400">Growth Potential Client</div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400">Current Volume</div>
                        <div className="text-xl font-bold text-white">{client.completes}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Profit Margin</div>
                        <div className="text-xl font-bold text-green-400">{client.profitMargin.toFixed(1)}%</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="text-sm">
                        <span className="text-gray-400">Primary Issues:</span>
                      </div>
                      {client.currentIssues.map((issue, index) => (
                        <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs border-purple-500 text-purple-400">
                          {issue}
                        </Badge>
                      ))}
                    </div>

                    <Button size="sm" className="w-full" onClick={() => { setSelectedClient(client); setShowCommunication(true); }}>
                      <Target className="w-4 h-4 mr-2" />
                      Develop Relationship
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ahs-managers">
          <AhsAreaManagerSystem />
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Performance Analytics Dashboard</h2>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="border-cyan-600 text-cyan-400">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleRealTimeDashboard}>
                  <Activity className="w-4 h-4 mr-2" />
                  Real-Time Dashboard
                </Button>
              </div>
            </div>

            {/* Performance Analytics Filters */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Analytics Filters & View Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Planning Area</label>
                    <Select value={selectedPlanningArea} onValueChange={setSelectedPlanningArea}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="All Areas">All Planning Areas (400+)</SelectItem>
                        <SelectItem value="Dallas Metro">Dallas Metro (45 areas)</SelectItem>
                        <SelectItem value="Houston Metro">Houston Metro (38 areas)</SelectItem>
                        <SelectItem value="Austin Metro">Austin Metro (22 areas)</SelectItem>
                        <SelectItem value="San Antonio Metro">San Antonio Metro (18 areas)</SelectItem>
                        <SelectItem value="California Central">California Central (52 areas)</SelectItem>
                        <SelectItem value="Florida Southeast">Florida Southeast (41 areas)</SelectItem>
                        <SelectItem value="Northeast Corridor">Northeast Corridor (67 areas)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Product Type</label>
                    <Select value={selectedProductType} onValueChange={setSelectedProductType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="All Products">All Appliances</SelectItem>
                        <SelectItem value="Refrigerator/Freezer">Refrigerator/Freezer</SelectItem>
                        <SelectItem value="Dryer">Dryer</SelectItem>
                        <SelectItem value="Range/Cooktop/Oven">Range/Cooktop/Oven</SelectItem>
                        <SelectItem value="Dishwasher">Dishwasher</SelectItem>
                        <SelectItem value="Washer">Washer</SelectItem>
                        <SelectItem value="Hvac">HVAC Systems</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Primary Metric</label>
                    <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="revenue">Revenue Performance</SelectItem>
                        <SelectItem value="profit">Profit Margins</SelectItem>
                        <SelectItem value="response-time">Response Time</SelectItem>
                        <SelectItem value="completion-rate">Completion Rate</SelectItem>
                        <SelectItem value="customer-rating">Customer Ratings</SelectItem>
                        <SelectItem value="reschedule-rate">Reschedule Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-400 mb-2 block">Analysis View</label>
                    <Select value={performanceView} onValueChange={setPerformanceView}>
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="planning-areas">By Planning Area</SelectItem>
                        <SelectItem value="client-comparison">Client Comparison</SelectItem>
                        <SelectItem value="job-codes">Job Code Analysis</SelectItem>
                        <SelectItem value="time-trends">Time Trends</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    Revenue Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">${(filteredData.totalRevenue / 1000).toFixed(0)}K</div>
                      <div className="text-sm text-gray-400">Weekly Total</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Top Performing Areas:</div>
                      <div className="text-xs text-green-300">Dallas Metro: $89K (+12%)</div>
                      <div className="text-xs text-green-300">Houston Metro: $76K (+8%)</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Improvement Needed:</div>
                      <div className="text-xs text-yellow-300">Austin Metro: $31K (-15%)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Profit Margins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{filteredData.avgMargin.toFixed(1)}%</div>
                      <div className="text-sm text-gray-400">Average Margin</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">By Client Tier:</div>
                      <div className="text-xs text-blue-300">Tier 1: 22.8% (High Volume)</div>
                      <div className="text-xs text-blue-300">Tier 2: 26.4% (Premium)</div>
                      <div className="text-xs text-blue-300">Tier 3: 28.9% (Specialized)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-400" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">{filteredData.avgResponseTime.toFixed(1)}h</div>
                      <div className="text-sm text-gray-400">Average Response</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Emergency vs Standard:</div>
                      <div className="text-xs text-red-300">Emergency: 1.2h (Target: &lt;1h)</div>
                      <div className="text-xs text-green-300">Standard: 2.6h (Target: &lt;4h)</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Geographic Performance:</div>
                      <div className="text-xs text-orange-300">Urban: 1.6h | Suburban: 2.2h</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    Quality Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{filteredData.avgRating.toFixed(1)}/5</div>
                      <div className="text-sm text-gray-400">Customer Rating</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Quality Breakdown:</div>
                      <div className="text-xs text-purple-300">5-Star: 45% | 4-Star: 38%</div>
                      <div className="text-xs text-purple-300">Completion Rate: {filteredData.completionRate.toFixed(1)}%</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Reliability:</div>
                      <div className="text-xs text-purple-300">Reschedule: {filteredData.rescheduleRate.toFixed(1)}% | Recall: 2.1%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics Visualization */}
            {performanceView === 'planning-areas' && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance by Planning Area - {selectedPlanningArea}</CardTitle>
                  <div className="text-gray-400">Analyzing {selectedMetric} across planning areas</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-3">Top Performing Areas</h4>
                        <div className="space-y-2">
                          {getAreaSpecificData().map((area, index) => (
                            <div key={index} className="bg-green-900/20 border border-green-600 p-3 rounded-lg">
                              <div className="flex justify-between items-center">
                                <div className="text-green-400 font-medium">{area.name}</div>
                                <div className="text-white">${(area.revenue / 1000).toFixed(0)}K/week</div>
                              </div>
                              <div className="text-gray-400 text-sm">{area.technicians} technicians • {area.completion}% completion • {area.rating.toFixed(1)}⭐</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-3">Improvement Opportunities</h4>
                        <div className="space-y-2">
                          {getImprovementOpportunities().map((area, index) => (
                            <div key={index} className={`${area.severity === 'high' ? 'bg-red-900/20 border border-red-600' : 'bg-yellow-900/20 border border-yellow-600'} p-3 rounded-lg`}>
                              <div className="flex justify-between items-center">
                                <div className={`${area.severity === 'high' ? 'text-red-400' : 'text-yellow-400'} font-medium`}>{area.name}</div>
                                <div className="text-white">${(area.revenue / 1000).toFixed(0)}K/week</div>
                              </div>
                              <div className="text-gray-400 text-sm">{area.technicians} technicians • {area.completion}% completion • {area.rating.toFixed(1)}⭐</div>
                              <div className={`${area.severity === 'high' ? 'text-red-300' : 'text-yellow-300'} text-xs mt-1`}>Issue: {area.issue}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {performanceView === 'client-comparison' && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Client Performance Comparison</CardTitle>
                  <div className="text-gray-400">Comparative analysis across all B2B clients</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left text-gray-400 pb-2">Client</th>
                            <th className="text-right text-gray-400 pb-2">Revenue</th>
                            <th className="text-right text-gray-400 pb-2">Margin</th>
                            <th className="text-right text-gray-400 pb-2">Response</th>
                            <th className="text-right text-gray-400 pb-2">Rating</th>
                            <th className="text-right text-gray-400 pb-2">Trend</th>
                          </tr>
                        </thead>
                        <tbody className="space-y-2">
                          <tr className="border-b border-gray-700">
                            <td className="text-white py-2">American Home Shield</td>
                            <td className="text-right text-green-400">$220K</td>
                            <td className="text-right text-blue-400">21.5%</td>
                            <td className="text-right text-red-400">2.1h</td>
                            <td className="text-right text-purple-400">4.2⭐</td>
                            <td className="text-right text-yellow-400">+8%</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="text-white py-2">Assurant</td>
                            <td className="text-right text-green-400">$205K</td>
                            <td className="text-right text-blue-400">22.8%</td>
                            <td className="text-right text-orange-400">1.8h</td>
                            <td className="text-right text-purple-400">4.3⭐</td>
                            <td className="text-right text-green-400">+12%</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="text-white py-2">Choice</td>
                            <td className="text-right text-green-400">$187K</td>
                            <td className="text-right text-blue-400">24.1%</td>
                            <td className="text-right text-orange-400">1.6h</td>
                            <td className="text-right text-purple-400">4.4⭐</td>
                            <td className="text-right text-green-400">+15%</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="text-white py-2">GE Appliances</td>
                            <td className="text-right text-yellow-400">$96K</td>
                            <td className="text-right text-blue-400">28.3%</td>
                            <td className="text-right text-green-400">1.5h</td>
                            <td className="text-right text-purple-400">4.5⭐</td>
                            <td className="text-right text-green-400">+22%</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="text-white py-2">LG Electronics</td>
                            <td className="text-right text-yellow-400">$85K</td>
                            <td className="text-right text-blue-400">26.7%</td>
                            <td className="text-right text-orange-400">2.0h</td>
                            <td className="text-right text-purple-400">4.3⭐</td>
                            <td className="text-right text-red-400">-5%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {performanceView === 'job-codes' && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Job Code Performance Analysis</CardTitle>
                  <div className="text-gray-400">Performance breakdown by service categories</div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Highest Revenue Job Codes</h4>
                      <div className="space-y-2">
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="text-white">REFR-COMP (Refrigerator Compressor)</div>
                            <div className="text-green-400">$485/job</div>
                          </div>
                          <div className="text-gray-400 text-sm">487 jobs this week • 23% margin</div>
                        </div>
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="text-white">HVAC-UNIT (HVAC Unit Replacement)</div>
                            <div className="text-green-400">$425/job</div>
                          </div>
                          <div className="text-gray-400 text-sm">312 jobs this week • 28% margin</div>
                        </div>
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="text-white">WASH-TRANS (Washer Transmission)</div>
                            <div className="text-green-400">$365/job</div>
                          </div>
                          <div className="text-gray-400 text-sm">289 jobs this week • 31% margin</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">High Volume Service Categories</h4>
                      <div className="space-y-2">
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="text-white">Refrigerator Services</div>
                            <div className="text-blue-400">1,247 jobs</div>
                          </div>
                          <div className="text-gray-400 text-sm">$285 avg revenue • 89% completion</div>
                        </div>
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="text-white">Dryer Services</div>
                            <div className="text-blue-400">986 jobs</div>
                          </div>
                          <div className="text-gray-400 text-sm">$235 avg revenue • 92% completion</div>
                        </div>
                        <div className="bg-gray-700 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="text-white">Range/Oven Services</div>
                            <div className="text-blue-400">842 jobs</div>
                          </div>
                          <div className="text-gray-400 text-sm">$265 avg revenue • 87% completion</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {performanceView === 'time-trends' && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Trends & Forecasting</CardTitle>
                  <div className="text-gray-400">30-day trends and AI-powered forecasting</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="text-white font-medium mb-2">Revenue Trend</div>
                        <div className="text-2xl font-bold text-green-400 mb-1">+12.3%</div>
                        <div className="text-gray-400 text-sm">vs previous 30 days</div>
                        <div className="text-green-300 text-xs mt-2">AI Forecast: +8% next month</div>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="text-white font-medium mb-2">Quality Improvement</div>
                        <div className="text-2xl font-bold text-blue-400 mb-1">+0.3⭐</div>
                        <div className="text-gray-400 text-sm">average rating increase</div>
                        <div className="text-blue-300 text-xs mt-2">AI Forecast: Stable with improvements</div>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <div className="text-white font-medium mb-2">Response Time</div>
                        <div className="text-2xl font-bold text-orange-400 mb-1">-18min</div>
                        <div className="text-gray-400 text-sm">average improvement</div>
                        <div className="text-orange-300 text-xs mt-2">AI Forecast: Further -12min possible</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="text-white font-medium mb-3">AI-Powered Insights & Recommendations</h4>
                      <div className="space-y-3">
                        <div className="bg-blue-900/20 border border-blue-600 p-3 rounded-lg">
                          <div className="text-blue-400 font-medium">Capacity Optimization Opportunity</div>
                          <div className="text-gray-300 text-sm">AI analysis shows 23% capacity improvement potential in Austin Metro through Advanced Scheduling Agent deployment.</div>
                        </div>
                        <div className="bg-green-900/20 border border-green-600 p-3 rounded-lg">
                          <div className="text-green-400 font-medium">Revenue Growth Pattern Detected</div>
                          <div className="text-gray-300 text-sm">Premium appliance services (GE, LG, Samsung) showing 22% growth. Recommend expanding premium technician training.</div>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-600 p-3 rounded-lg">
                          <div className="text-purple-400 font-medium">Quality Enhancement Success</div>
                          <div className="text-gray-300 text-sm">Quality Assurance Inspector interventions correlate with 15% customer rating improvement across all clients.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="communications">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">AI-Powered Client Communications</h2>
              <Button onClick={() => setShowCommunication(true)} className="bg-orange-600 hover:bg-orange-700">
                <Bot className="w-4 h-4 mr-2" />
                Generate Communication
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Weekly Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-300">
                      Automated weekly performance reports sent to all Tier 1 clients every Monday at 8 AM.
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">Recent Reports:</div>
                      <div className="space-y-1">
                        <div className="bg-gray-700 p-2 rounded text-xs">
                          <div className="text-white">AHS Weekly Update - July 30</div>
                          <div className="text-gray-400">Delivered • 870 completes • $220K revenue</div>
                        </div>
                        <div className="bg-gray-700 p-2 rounded text-xs">
                          <div className="text-white">Assurant Weekly Update - July 30</div>
                          <div className="text-gray-400">Delivered • 724 completes • $205K revenue</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Issue Escalations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-300">
                      Real-time alerts when performance metrics exceed thresholds.
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">Active Escalations:</div>
                      <div className="space-y-1">
                        <div className="bg-red-900/20 border border-red-600 p-2 rounded text-xs">
                          <div className="text-red-400">AHS Response Time Alert</div>
                          <div className="text-gray-400">2.1h avg (target: &lt;2h)</div>
                        </div>
                        <div className="bg-yellow-900/20 border border-yellow-600 p-2 rounded text-xs">
                          <div className="text-yellow-400">Choice Cycle Time Warning</div>
                          <div className="text-gray-400">3.2d avg (approaching limit)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Feedback Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-300">
                      Monthly satisfaction surveys and quarterly business reviews.
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">Pending Responses:</div>
                      <div className="space-y-1">
                        <div className="bg-blue-900/20 border border-blue-600 p-2 rounded text-xs">
                          <div className="text-blue-400">Q3 Business Review - AHS</div>
                          <div className="text-gray-400">Scheduled for Aug 5</div>
                        </div>
                        <div className="bg-green-900/20 border border-green-600 p-2 rounded text-xs">
                          <div className="text-green-400">Monthly Survey - Assurant</div>
                          <div className="text-gray-400">Response received</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">AI Agent Communication Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Automated Workflows</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-white font-medium">Performance Monitoring</div>
                        <div className="text-gray-400 text-sm">AI-Powered B2B Intelligence Agent monitors all client metrics 24/7</div>
                        <Badge className="mt-2 bg-green-600">Active</Badge>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-white font-medium">Issue Detection</div>
                        <div className="text-gray-400 text-sm">Regional Performance Monitor detects reliability issues and escalates automatically</div>
                        <Badge className="mt-2 bg-green-600">Active</Badge>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-white font-medium">Communication Generation</div>
                        <div className="text-gray-400 text-sm">LLM Content Intelligence Agent generates personalized client communications</div>
                        <Badge className="mt-2 bg-green-600">Active</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-3">Response Protocols</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-white font-medium">Cost Concerns</div>
                        <div className="text-gray-400 text-sm">
                          <div>• Automated cost analysis report</div>
                          <div>• Process optimization recommendations</div>
                          <div>• ROI improvement proposals</div>
                        </div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-white font-medium">Quality Issues</div>
                        <div className="text-gray-400 text-sm">
                          <div>• Quality Assurance Inspector escalation</div>
                          <div>• Technician coaching recommendations</div>
                          <div>• 5-star rating improvement plans</div>
                        </div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-white font-medium">Reliability Problems</div>
                        <div className="text-gray-400 text-sm">
                          <div>• Advanced Scheduling Agent optimization</div>
                          <div>• Capacity planning adjustments</div>
                          <div>• Response time improvement protocols</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Client Feedback Management</h2>
              <Button onClick={() => setShowFeedback(true)} className="bg-pink-600 hover:bg-pink-700">
                <Star className="w-4 h-4 mr-2" />
                Request Feedback
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Cost Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">3.8</div>
                      <div className="text-sm text-gray-400">Average Rating</div>
                    </div>
                    <div className="text-sm text-gray-300">
                      Key concerns: Labor costs, parts pricing, travel time optimization
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Recent Feedback:</div>
                      <div className="text-xs text-gray-300">"Need better parts cost control" - AHS</div>
                      <div className="text-xs text-gray-300">"Travel efficiency improved" - Choice</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">3.2</div>
                      <div className="text-sm text-gray-400">Average Rating</div>
                    </div>
                    <div className="text-sm text-gray-300">
                      Primary issue: Emergency response times exceed expectations
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Improvement Areas:</div>
                      <div className="text-xs text-gray-300">• Same-day emergency service</div>
                      <div className="text-xs text-gray-300">• Better scheduling coordination</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Service Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">4.2</div>
                      <div className="text-sm text-gray-400">Average Rating</div>
                    </div>
                    <div className="text-sm text-gray-300">
                      Strength: Technical expertise and professionalism
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Top Feedback:</div>
                      <div className="text-xs text-gray-300">"Excellent technical skills" - Samsung</div>
                      <div className="text-xs text-gray-300">"Professional service" - LG</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">4.1</div>
                      <div className="text-sm text-gray-400">Average Rating</div>
                    </div>
                    <div className="text-sm text-gray-300">
                      Good: Proactive updates and issue transparency
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-400">Enhancement Requests:</div>
                      <div className="text-xs text-gray-300">• Real-time job status updates</div>
                      <div className="text-xs text-gray-300">• Better escalation protocols</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Feedback Collection & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Collection Methods</h4>
                    <div className="space-y-3">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-white font-medium">Monthly Surveys</div>
                        <div className="text-gray-400 text-sm">Automated 4-question satisfaction surveys sent monthly</div>
                        <div className="text-green-400 text-xs mt-1">Response Rate: 87%</div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-white font-medium">Quarterly Business Reviews</div>
                        <div className="text-gray-400 text-sm">In-depth performance discussions with Tier 1 clients</div>
                        <div className="text-blue-400 text-xs mt-1">Completion Rate: 100%</div>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <div className="text-white font-medium">Real-time Issue Feedback</div>
                        <div className="text-gray-400 text-sm">Immediate feedback requests after service escalations</div>
                        <div className="text-yellow-400 text-xs mt-1">Response Rate: 65%</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-3">AI Analysis Insights</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-900/20 border border-blue-600 p-3 rounded-lg">
                        <div className="text-blue-400 font-medium">Cost Optimization Priority</div>
                        <div className="text-gray-300 text-sm">78% of feedback mentions cost concerns. AI recommendation: Implement dynamic pricing model.</div>
                      </div>
                      <div className="bg-red-900/20 border border-red-600 p-3 rounded-lg">
                        <div className="text-red-400 font-medium">Response Time Critical</div>
                        <div className="text-gray-300 text-sm">Response time rated lowest. AI recommendation: Deploy Advanced Scheduling Agent optimizations.</div>
                      </div>
                      <div className="bg-green-900/20 border border-green-600 p-3 rounded-lg">
                        <div className="text-green-400 font-medium">Quality Strength</div>
                        <div className="text-gray-300 text-sm">Service quality consistently rated highest. Leverage for competitive advantage.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Client Details Modal */}
      {selectedClient && (
        <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                {selectedClient.name} - Client Details
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getTierColor(selectedClient.tier)}>{selectedClient.tier}</Badge>
                <Badge className={getStatusColor(selectedClient.status)}>{selectedClient.status}</Badge>
              </div>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Performance Metrics</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Completes</div>
                    <div className="text-2xl font-bold text-white">{selectedClient.completes}</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Revenue</div>
                    <div className="text-2xl font-bold text-green-400">${(selectedClient.revenue / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Profit</div>
                    <div className="text-2xl font-bold text-blue-400">${(selectedClient.profit / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Margin</div>
                    <div className="text-2xl font-bold text-purple-400">{selectedClient.profitMargin.toFixed(1)}%</div>
                  </div>
                </div>
              </div>

              {/* Reliability Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Reliability Metrics</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Response Time</div>
                    <div className="text-lg font-bold text-white">{selectedClient.reliabilityMetrics.responseTime}</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Reschedule Rate</div>
                    <div className="text-lg font-bold text-yellow-400">{selectedClient.reliabilityMetrics.rescheduleRate}</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Cycle Time</div>
                    <div className="text-lg font-bold text-blue-400">{selectedClient.reliabilityMetrics.cycleTime}</div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Recall Rate</div>
                    <div className="text-lg font-bold text-red-400">{selectedClient.reliabilityMetrics.recallRate}</div>
                  </div>
                </div>
              </div>

              {/* Current Issues */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Current Issues & Focus Areas</h3>
                <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
                  <div className="grid gap-2">
                    {selectedClient.currentIssues.map((issue: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-gray-300">{issue}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-sm text-gray-400">
                    Rating Concerns: {selectedClient.ratingConcerns}
                  </div>
                </div>
              </div>

              {/* AI Integration */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">AI Agent Integration</h3>
                <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400 font-medium">{selectedClient.aiAgent}</span>
                  </div>
                  <div className="text-gray-300 text-sm mb-3">
                    Primary contact: {selectedClient.primaryContact} ({selectedClient.relationship})
                  </div>
                  <div className="text-gray-400 text-sm">
                    This AI agent monitors performance metrics, generates reports, and manages communications
                    for {selectedClient.name} to ensure optimal service delivery and relationship management.
                  </div>
                </div>
              </div>

              {/* Appliance Categories */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Service Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.appliances.map((appliance: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-gray-500">
                      {appliance}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  onClick={() => { setShowCommunication(true); }}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button
                  onClick={() => setSelectedClient(null)}
                  className="bg-gray-600 hover:bg-gray-700"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Communication Modal */}
      <Dialog open={showCommunication} onOpenChange={setShowCommunication}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              AI-Generated Communication - {selectedClient?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Communication Type</label>
              <Select value={communicationType} onValueChange={setCommunicationType}>
                <SelectTrigger className="bg-gray-700 border-gray-600 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly_report">Weekly Performance Report</SelectItem>
                  <SelectItem value="issue_escalation">Issue Escalation</SelectItem>
                  <SelectItem value="feedback_request">Feedback Request</SelectItem>
                  <SelectItem value="custom">Custom Message</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-white">Generated Message</label>
              <Textarea
                placeholder="AI will generate communication based on selected type..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white mt-1"
                rows={8}
              />
            </div>

            <div className="flex items-center gap-2 p-3 bg-blue-900/20 border border-blue-600 rounded-lg">
              <Bot className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 text-sm">
                {selectedClient?.aiAgent} will automatically customize this message with current performance data
              </span>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setShowCommunication(false)}
                variant="outline"
                className="border-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendCommunication}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Communication
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Request Client Feedback - {selectedClient?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white">Cost Efficiency (1-5)</label>
                <Select value={feedbackData.cost} onValueChange={(value) => setFeedbackData({...feedbackData, cost: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 mt-1">
                    <SelectValue placeholder="Rate 1-5" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Poor</SelectItem>
                    <SelectItem value="2">2 - Below Average</SelectItem>
                    <SelectItem value="3">3 - Average</SelectItem>
                    <SelectItem value="4">4 - Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Response Time (1-5)</label>
                <Select value={feedbackData.responseTime} onValueChange={(value) => setFeedbackData({...feedbackData, responseTime: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 mt-1">
                    <SelectValue placeholder="Rate 1-5" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Poor</SelectItem>
                    <SelectItem value="2">2 - Below Average</SelectItem>
                    <SelectItem value="3">3 - Average</SelectItem>
                    <SelectItem value="4">4 - Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Service Quality (1-5)</label>
                <Select value={feedbackData.quality} onValueChange={(value) => setFeedbackData({...feedbackData, quality: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 mt-1">
                    <SelectValue placeholder="Rate 1-5" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Poor</SelectItem>
                    <SelectItem value="2">2 - Below Average</SelectItem>
                    <SelectItem value="3">3 - Average</SelectItem>
                    <SelectItem value="4">4 - Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Communication (1-5)</label>
                <Select value={feedbackData.communication} onValueChange={(value) => setFeedbackData({...feedbackData, communication: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 mt-1">
                    <SelectValue placeholder="Rate 1-5" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Poor</SelectItem>
                    <SelectItem value="2">2 - Below Average</SelectItem>
                    <SelectItem value="3">3 - Average</SelectItem>
                    <SelectItem value="4">4 - Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white">Additional Comments</label>
              <Textarea
                placeholder="Any specific feedback or suggestions for improvement..."
                value={feedbackData.comments}
                onChange={(e) => setFeedbackData({...feedbackData, comments: e.target.value})}
                className="bg-gray-700 border-gray-600 text-white mt-1"
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setShowFeedback(false)}
                variant="outline"
                className="border-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitFeedback}
                className="bg-pink-600 hover:bg-pink-700"
              >
                <Star className="w-4 h-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}