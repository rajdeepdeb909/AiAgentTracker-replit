import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Star, 
  Clock, 
  MapPin, 
  Wrench, 
  Target, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  MessageSquare,
  Award,
  Activity,
  BarChart3,
  Phone,
  Truck,
  Settings
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Technician {
  id: string;
  name: string;
  type: 'W2' | '1099';
  planningArea: string;
  specialties: string[];
  performanceScore: number;
  customerRating: number;
  completionRate: number;
  responseTime: number;
  revenuePerJob: number;
  weeklyJobs: number;
  certifications: string[];
  availabilityStatus: 'Available' | 'Busy' | 'Off-Duty';
  lastActivity: string;
  onboardingProgress?: number;
  contractorFirm?: string;
}

interface TechnicianManagementSystemProps {
  selectedPlanningArea?: string;
  onNavigateBack?: () => void;
}

export const TechnicianManagementSystem: React.FC<TechnicianManagementSystemProps> = ({
  selectedPlanningArea = '8107_H Houston Metro',
  onNavigateBack
}) => {
  const [selectedTechnician, setSelectedTechnician] = useState<string>('');
  const [viewMode, setViewMode] = useState<'roster' | 'performance' | 'assignment' | 'feedback'>('roster');
  const [filterType, setFilterType] = useState<'all' | 'W2' | '1099'>('all');

  // Generate realistic technician data for the selected planning area
  const generateTechnicians = (planningArea: string): Technician[] => {
    // Extract area identifier from real planning area format
    const areaCode = planningArea.split('_')[0] || '8107';
    const areaNumber = parseInt(areaCode) % 100;
    const baseCount = 8 + (areaNumber % 6); // 8-13 technicians per area
    
    const specialties = ['HVAC', 'Plumbing', 'Electrical', 'Appliance Repair', 'General Maintenance'];
    const certifications = ['EPA Certified', 'Electrical License', 'Plumbing License', 'HVAC Certified', 'Safety Trained'];
    const contractorFirms = ['ProService Solutions', 'TechExperts Inc', 'HomeRepair Partners', 'Elite Contractors'];
    
    const technicians: Technician[] = [];
    
    for (let i = 0; i < baseCount; i++) {
      const techId = `${planningArea}-T${i + 1}`;
      const isContractor = Math.random() > 0.6; // 40% contractors
      const specialty = specialties[i % specialties.length];
      
      technicians.push({
        id: techId,
        name: `${['Mike', 'Sarah', 'David', 'Lisa', 'John', 'Maria', 'Chris', 'Amy', 'Steve', 'Rachel'][i % 10]} ${['Johnson', 'Smith', 'Brown', 'Davis', 'Wilson', 'Miller', 'Moore', 'Taylor', 'Anderson', 'Thomas'][i % 10]}`,
        type: isContractor ? '1099' : 'W2',
        planningArea,
        specialties: [specialty, ...(Math.random() > 0.7 ? [specialties[(i + 1) % specialties.length]] : [])],
        performanceScore: Math.round(75 + Math.random() * 20 + (isContractor ? 5 : 0)), // Contractors slightly higher avg
        customerRating: Math.round((4.2 + Math.random() * 0.6 + (isContractor ? 0.1 : 0)) * 10) / 10,
        completionRate: Math.round(85 + Math.random() * 12 + (isContractor ? 2 : 0)),
        responseTime: Math.round(15 + Math.random() * 10 - (isContractor ? 2 : 0)), // Contractors slightly faster
        revenuePerJob: Math.round(280 + Math.random() * 120 + (specialty === 'HVAC' ? 50 : 0)),
        weeklyJobs: Math.round(12 + Math.random() * 8),
        certifications: certifications.filter(() => Math.random() > 0.4),
        availabilityStatus: ['Available', 'Busy', 'Off-Duty'][Math.floor(Math.random() * 3)] as any,
        lastActivity: `${Math.floor(Math.random() * 3) + 1} hours ago`,
        onboardingProgress: isContractor && Math.random() > 0.8 ? Math.round(Math.random() * 100) : undefined,
        contractorFirm: isContractor ? contractorFirms[Math.floor(Math.random() * contractorFirms.length)] : undefined
      });
    }
    
    return technicians.sort((a, b) => b.performanceScore - a.performanceScore);
  };

  const technicians = generateTechnicians(selectedPlanningArea);
  const filteredTechnicians = technicians.filter(tech => 
    filterType === 'all' || tech.type === filterType
  );

  // AI Agent Integration Functions
  const getAIAgentActions = (technician: Technician) => {
    const actions = [];
    
    // Performance Analytics AI actions
    if (technician.performanceScore < 80) {
      actions.push({
        agent: 'Performance Analytics AI',
        action: 'Scheduling additional training for HVAC troubleshooting',
        timeline: '2-3 days',
        expectedImprovement: '+8-12% performance score'
      });
    }
    
    // Customer Communication Hub actions
    if (technician.customerRating < 4.5) {
      actions.push({
        agent: 'Customer Communication Hub',
        action: 'Implementing communication coaching and follow-up protocols',
        timeline: '1 week',
        expectedImprovement: '+0.3-0.5 rating points'
      });
    }
    
    // Technician Recruiting Agent (for contractors)
    if (technician.type === '1099' && technician.onboardingProgress !== undefined) {
      actions.push({
        agent: 'Technician Recruiting Agent',
        action: 'Accelerated onboarding with gamification milestones',
        timeline: `${Math.round((100 - technician.onboardingProgress) / 20)} days`,
        expectedImprovement: 'Full certification completion'
      });
    }
    
    // Route Optimization Engine
    if (technician.responseTime > 20) {
      actions.push({
        agent: 'Route Optimization Engine',
        action: 'Optimizing daily route assignments for reduced travel time',
        timeline: 'Daily optimization',
        expectedImprovement: '-5-8 minutes average response time'
      });
    }
    
    return actions;
  };

  const getPerformanceInsights = (technician: Technician) => {
    const insights = [];
    
    // Planning area specific insights
    const areaGoals = {
      '8107_H Houston Metro': { focus: 'Route Efficiency', target: 'Reduce response time by 15%' },
      '8309_B Sterling Heights': { focus: 'Premium Service', target: 'Increase revenue per job by 22%' },
      '7084_F Baltimore': { focus: 'Parts Efficiency', target: 'Improve completion rate by 8%' }
    };
    
    const goal = areaGoals[selectedPlanningArea as keyof typeof areaGoals] || 
                 { focus: 'Multi-Agent Coordination', target: 'Overall performance improvement' };
    
    insights.push({
      category: 'Planning Area Alignment',
      metric: `${goal.focus} Performance`,
      current: technician.performanceScore,
      target: Math.min(95, technician.performanceScore + 8),
      status: technician.performanceScore >= 85 ? 'On Track' : 'Needs Attention'
    });
    
    // Product type performance
    technician.specialties.forEach(specialty => {
      const productPerformance = {
        'HVAC': { avgRevenue: 420, complexity: 'High', demandTrend: '+15%' },
        'Plumbing': { avgRevenue: 280, complexity: 'Medium', demandTrend: '+8%' },
        'Electrical': { avgRevenue: 350, complexity: 'High', demandTrend: '+12%' },
        'Appliance Repair': { avgRevenue: 240, complexity: 'Low', demandTrend: '+5%' }
      };
      
      const perf = productPerformance[specialty as keyof typeof productPerformance];
      if (perf) {
        insights.push({
          category: 'Product Specialization',
          metric: `${specialty} Revenue`,
          current: technician.revenuePerJob,
          target: perf.avgRevenue,
          status: technician.revenuePerJob >= perf.avgRevenue ? 'Exceeding' : 'Below Target',
          trend: perf.demandTrend
        } as any);
      }
    });
    
    return insights;
  };

  const getCustomerFeedbackSummary = (technician: Technician) => {
    // Simulate recent customer feedback
    const feedbackItems = [
      {
        date: '2 days ago',
        rating: Math.min(5, technician.customerRating + 0.3),
        comment: technician.type === '1099' ? 
          'Very professional contractor, arrived on time and explained everything clearly.' :
          'Great technician! Fixed the issue quickly and provided maintenance tips.',
        serviceType: technician.specialties[0],
        jobValue: technician.revenuePerJob + Math.round(Math.random() * 50 - 25)
      },
      {
        date: '5 days ago',
        rating: Math.max(3, technician.customerRating - 0.2),
        comment: technician.customerRating < 4.5 ? 
          'Service was okay but communication could be improved.' :
          'Excellent work! Very satisfied with the quality and professionalism.',
        serviceType: technician.specialties[Math.floor(Math.random() * technician.specialties.length)],
        jobValue: technician.revenuePerJob + Math.round(Math.random() * 100 - 50)
      }
    ];
    
    return feedbackItems;
  };

  const getAssignmentRecommendations = (technician: Technician) => {
    const recommendations = [];
    
    // Based on specialties and performance
    technician.specialties.forEach(specialty => {
      if (specialty === 'HVAC' && technician.performanceScore > 85) {
        recommendations.push({
          type: 'High-Value Assignment',
          description: `Assign ${technician.name} to premium HVAC installations (avg $520/job)`,
          priority: 'High',
          expectedRevenue: '+$240/job vs standard',
          planningAreaFit: selectedPlanningArea.includes('2') ? 'Perfect Fit' : 'Good Fit'
        });
      }
      
      if (specialty === 'Plumbing' && technician.responseTime < 18) {
        recommendations.push({
          type: 'Emergency Response',
          description: `Fast response makes ${technician.name} ideal for emergency plumbing calls`,
          priority: 'Medium',
          expectedRevenue: '+$80/job emergency premium',
          planningAreaFit: 'Excellent'
        });
      }
    });
    
    // 1099 contractor specific recommendations
    if (technician.type === '1099') {
      recommendations.push({
        type: 'Contractor Optimization',
        description: `Leverage ${technician.contractorFirm}'s expertise for peak demand periods`,
        priority: 'Medium',
        expectedRevenue: 'Capacity flexibility: +15% daily throughput',
        planningAreaFit: 'Strategic'
      });
    }
    
    return recommendations;
  };

  const w2Count = technicians.filter(t => t.type === 'W2').length;
  const contractorCount = technicians.filter(t => t.type === '1099').length;
  const avgPerformance = Math.round(technicians.reduce((sum, t) => sum + t.performanceScore, 0) / technicians.length);
  const avgRevenue = Math.round(technicians.reduce((sum, t) => sum + t.revenuePerJob, 0) / technicians.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Technician Management System</h1>
          <p className="text-gray-600 mt-1">Planning Area: {selectedPlanningArea} • AI-Driven Technician Optimization</p>
        </div>
        {onNavigateBack && (
          <Button variant="outline" onClick={onNavigateBack}>
            ← Back to Dashboard
          </Button>
        )}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Technicians</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{technicians.length}</div>
            <p className="text-xs text-muted-foreground">
              {w2Count} W2 employees • {contractorCount} contractors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPerformance}%</div>
            <p className="text-xs text-muted-foreground">
              +5% vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue/Job</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgRevenue}</div>
            <p className="text-xs text-muted-foreground">
              {selectedPlanningArea.includes('2') ? '+12% premium area' : '+8% vs baseline'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active AI Actions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {technicians.reduce((sum, t) => sum + getAIAgentActions(t).length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Optimization actions in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="roster">Technician Roster</TabsTrigger>
            <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
            <TabsTrigger value="assignment">AI Assignment Engine</TabsTrigger>
            <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="W2">W2 Only</SelectItem>
                <SelectItem value="1099">1099 Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Technician Roster */}
        <TabsContent value="roster" className="space-y-4">
          <div className="grid gap-4">
            {filteredTechnicians.map((technician) => (
              <Card key={technician.id} className="cursor-pointer hover:shadow-md transition-shadow" 
                    onClick={() => setSelectedTechnician(technician.id)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <UserCheck className="w-5 h-5 text-blue-500" />
                        <div>
                          <h3 className="font-semibold">{technician.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Badge variant={technician.type === 'W2' ? 'default' : 'secondary'}>
                              {technician.type}
                            </Badge>
                            {technician.contractorFirm && (
                              <span className="text-xs">• {technician.contractorFirm}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{technician.customerRating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4 text-green-500" />
                          <span>{technician.performanceScore}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{technician.responseTime}m avg</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={technician.availabilityStatus === 'Available' ? 'default' : 
                               technician.availabilityStatus === 'Busy' ? 'destructive' : 'secondary'}
                      >
                        {technician.availabilityStatus}
                      </Badge>
                      <div className="text-right text-sm">
                        <div className="font-medium">${technician.revenuePerJob}/job</div>
                        <div className="text-gray-500">{technician.weeklyJobs} jobs/week</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wrench className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {technician.specialties.join(', ')}
                      </span>
                    </div>
                    
                    {technician.onboardingProgress !== undefined && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Onboarding:</span>
                        <Progress value={technician.onboardingProgress} className="w-16 h-2" />
                        <span className="text-xs text-gray-500">{technician.onboardingProgress}%</span>
                      </div>
                    )}
                  </div>
                  
                  {/* AI Agent Actions */}
                  <div className="mt-3 pt-3 border-t">
                    <div className="text-sm font-medium text-gray-700 mb-2">Active AI Agent Actions:</div>
                    <div className="space-y-1">
                      <TooltipProvider>
                        {getAIAgentActions(technician).slice(0, 2).map((action, idx) => (
                          <Tooltip key={idx}>
                            <TooltipTrigger asChild>
                              <button 
                                className="w-full flex items-center justify-between text-xs bg-blue-50 hover:bg-blue-100 p-2 rounded cursor-pointer transition-colors"
                                onClick={() => alert(`${action.agent} is currently: ${action.action}\n\nExpected timeline: ${action.timeline}\nExpected improvement: ${action.expectedImprovement || 'Performance optimization'}\n\nClick to view detailed progress and recommendations.`)}
                              >
                                <div className="text-left">
                                  <span className="font-medium text-blue-700">{action.agent}:</span>
                                  <span className="ml-1">{action.action}</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {action.timeline}
                                </Badge>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Click to view {action.agent} progress and interventions</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Performance Analysis */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTechnicians.slice(0, 4).map((technician) => (
              <Card key={technician.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{technician.name}</span>
                    <Badge variant={technician.type === 'W2' ? 'default' : 'secondary'}>
                      {technician.type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getPerformanceInsights(technician).map((insight, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{insight.metric}</span>
                          <Badge variant={insight.status === 'On Track' || insight.status === 'Exceeding' ? 'default' : 'destructive'}>
                            {insight.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress 
                            value={Math.min(100, (insight.current / insight.target) * 100)} 
                            className="flex-1 h-2" 
                          />
                          <span className="text-xs text-gray-500">
                            {insight.current}/{insight.target}
                          </span>
                        </div>
                        {'trend' in insight && insight.trend && (
                          <div className="text-xs text-green-600">
                            Demand trend: {insight.trend}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Assignment Engine */}
        <TabsContent value="assignment" className="space-y-4">
          <div className="grid gap-4">
            {filteredTechnicians.slice(0, 6).map((technician) => {
              const recommendations = getAssignmentRecommendations(technician);
              return (
                <Card key={technician.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span>{technician.name}</span>
                        <Badge variant={technician.type === 'W2' ? 'default' : 'secondary'}>
                          {technician.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {technician.specialties.join(' • ')}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recommendations.map((rec, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant={rec.priority === 'High' ? 'destructive' : 'default'}>
                                {rec.priority}
                              </Badge>
                              <span className="font-medium">{rec.type}</span>
                            </div>
                            <span className="text-sm text-gray-600">{rec.planningAreaFit}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{rec.description}</p>
                          <p className="text-xs text-green-600">{rec.expectedRevenue}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Customer Feedback */}
        <TabsContent value="feedback" className="space-y-4">
          <div className="grid gap-4">
            {filteredTechnicians.slice(0, 5).map((technician) => {
              const feedbackItems = getCustomerFeedbackSummary(technician);
              return (
                <Card key={technician.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span>{technician.name}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{technician.customerRating}/5</span>
                        </div>
                      </div>
                      <Badge variant={technician.customerRating >= 4.5 ? 'default' : 'destructive'}>
                        {technician.customerRating >= 4.5 ? 'Excellent' : 'Needs Improvement'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {feedbackItems.map((feedback, idx) => (
                        <div key={idx} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${i < feedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{feedback.date}</span>
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">{feedback.serviceType}</span>
                              <span className="text-gray-600 ml-2">${feedback.jobValue}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{feedback.comment}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* AI Agent Response */}
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-700 mb-1">Customer Communication Hub Action:</div>
                      <p className="text-sm text-blue-600">
                        {technician.customerRating < 4.5 
                          ? `Scheduling follow-up training for ${technician.name} to improve communication skills and customer satisfaction ratings.`
                          : `Recommending ${technician.name} for premium service assignments based on excellent customer feedback.`
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnicianManagementSystem;