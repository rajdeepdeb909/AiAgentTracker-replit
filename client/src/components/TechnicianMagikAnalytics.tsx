import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp,
  TrendingDown,
  Users,
  User,
  Activity,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Phone,
  PhoneOutgoing,
  Clock,
  DollarSign,
  Award,
  Home,
  Settings,
  Database,
  AlertCircle,
  Wand2
} from 'lucide-react';
import CoachingRecommendations from './CoachingRecommendations';
import TrendAnalysis from './TrendAnalysis';
import JobAllocationAnalysis from './JobAllocationAnalysis';

interface TechnicianUsageData {
  technicianId: string;
  name: string;
  totalUsage: number;
  successRate: number;
  avgResponseTime: number;
  inboundUsage: number;
  outboundUsage: number;
  revenueGenerated: number;
  customerSatisfaction: number;
  trend: 'up' | 'down' | 'stable';
  coachingTips: string[];
  categoryBreakdown: Record<string, number>;
  weeklyUsage: { week: string; usage: number; success: number }[];
}

interface MagikButtonAnalytics {
  onNavigateBack: () => void;
}

interface RealTechnicianData {
  weeklyTrends: {
    week: string;
    totalTechs: number;
    lowPerformers: number;
    averagePerformers: number;
    goodPerformers: number;
    highPerformers: number;
    topPerformers: number;
  }[];
  performanceDistribution: {
    category: string;
    count: number;
    percentage: number;
  }[];
  totalActiveTechs: number;
  currentWeek: string;
}

interface TechnicianInsights {
  insights: string[];
  recommendations: string[];
  magikButtonOpportunities: string[];
}

interface TechnicianProfile {
  techId: string;
  name: string;
  district: string;
  planningArea: string;
  status: string;
  jobTitle: string;
  joiningDate: string;
  terminationDate?: string;
  payRate: string;
  weeklyAttempts: number;
  weeklyCompletes: number;
  weeklyRevenue: number;
  performanceTier: string;
  completionRate: number;
}

export default function TechnicianMagikAnalytics({ onNavigateBack }: MagikButtonAnalytics) {
  const [selectedTechnician, setSelectedTechnician] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30d');
  
  // Fetch real technician data
  const { data: realTechData, isLoading: isLoadingRealData } = useQuery<RealTechnicianData>({
    queryKey: ['/api/real-technician-data'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: techInsights, isLoading: isLoadingInsights } = useQuery<TechnicianInsights>({
    queryKey: ['/api/real-technician-insights'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch technician profiles for individual selection
  const { data: technicianProfiles, isLoading: isLoadingProfiles } = useQuery<TechnicianProfile[]>({
    queryKey: ['/api/technician-profiles'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch selected technician details
  const { data: selectedTechProfile, isLoading: isLoadingProfile } = useQuery<TechnicianProfile>({
    queryKey: ['/api/technician-profiles', selectedTechnician],
    enabled: !!selectedTechnician && selectedTechnician !== 'all',
    staleTime: 5 * 60 * 1000,
  });
  
  // Generate comprehensive technician usage data
  const generateTechnicianData = (): TechnicianUsageData[] => {
    const technicians = [
      'Mike Rodriguez', 'Sarah Chen', 'David Thompson', 'Maria Garcia', 'James Wilson',
      'Lisa Anderson', 'Robert Brown', 'Jennifer Lee', 'Michael Davis', 'Ashley Martinez'
    ];
    
    return technicians.map((name, index) => ({
      technicianId: `tech_${index + 1}`,
      name,
      totalUsage: Math.floor(Math.random() * 200) + 50,
      successRate: Math.floor(Math.random() * 15) + 85,
      avgResponseTime: Math.random() * 1.5 + 0.5,
      inboundUsage: Math.floor(Math.random() * 120) + 30,
      outboundUsage: Math.floor(Math.random() * 80) + 20,
      revenueGenerated: Math.floor(Math.random() * 15000) + 5000,
      customerSatisfaction: Math.floor(Math.random() * 20) + 80,
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
      coachingTips: generateCoachingTips(),
      categoryBreakdown: {
        'Service Delivery': Math.floor(Math.random() * 40) + 20,
        'Parts Management': Math.floor(Math.random() * 30) + 15,
        'Customer Communication': Math.floor(Math.random() * 35) + 20,
        'Administrative': Math.floor(Math.random() * 25) + 10,
        'Emergency Response': Math.floor(Math.random() * 20) + 5
      },
      weeklyUsage: Array.from({ length: 12 }, (_, i) => ({
        week: `Week ${i + 1}`,
        usage: Math.floor(Math.random() * 60) + 20,
        success: Math.floor(Math.random() * 15) + 85
      }))
    }));
  };

  const generateCoachingTips = (): string[] => {
    const tips = [
      "Try using repair estimate creation more frequently during D2C calls - it can increase revenue by 23%",
      "Remember to capture appliance details for Sears Protect customers - this improves future service efficiency",
      "Your response time is excellent! Consider mentoring newer technicians on quick decision-making",
      "Use the parts prediction feature before arriving at jobs - it reduces return trips by 40%",
      "Customer communication responses are strong - share your approach with the team",
      "Emergency response usage could be higher - don't hesitate to use AI support during critical situations",
      "Great job on administrative efficiency! Your completion rate is above average",
      "Consider using the scheduling optimization more often to reduce travel time",
      "Your customer satisfaction scores are rising - keep using the communication templates",
      "Quality assurance checks show improvement - maintain this momentum"
    ];
    
    return tips.slice(0, Math.floor(Math.random() * 4) + 2);
  };

  const technicianData = generateTechnicianData();
  const selectedTechData = selectedTechnician === 'all' ? null : 
    technicianData.find(t => t.technicianId === selectedTechnician);

  // Overall metrics
  const overallMetrics = {
    totalTechnicians: technicianData.length,
    avgUsagePerTech: Math.floor(technicianData.reduce((sum, t) => sum + t.totalUsage, 0) / technicianData.length),
    avgSuccessRate: Math.floor(technicianData.reduce((sum, t) => sum + t.successRate, 0) / technicianData.length),
    totalRevenue: technicianData.reduce((sum, t) => sum + t.revenueGenerated, 0),
    inboundOutboundRatio: {
      inbound: technicianData.reduce((sum, t) => sum + t.inboundUsage, 0),
      outbound: technicianData.reduce((sum, t) => sum + t.outboundUsage, 0)
    }
  };

  // Scenario performance data
  const scenarioPerformance = [
    { scenario: 'D2C Repair Estimates', inbound: 145, outbound: 89, revenue: 12400, satisfaction: 92 },
    { scenario: 'Sears Protect Appliance ID', inbound: 78, outbound: 156, revenue: 8900, satisfaction: 88 },
    { scenario: 'Emergency Response', inbound: 234, outbound: 45, revenue: 15600, satisfaction: 95 },
    { scenario: 'Parts Prediction', inbound: 167, outbound: 123, revenue: 9800, satisfaction: 90 },
    { scenario: 'Customer Communication', inbound: 198, outbound: 167, revenue: 7200, satisfaction: 93 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onNavigateBack}
              className="text-white border-white/20 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Technician Magik Analytics
              </h1>
              <p className="text-gray-300 mt-1">Individual performance insights and coaching recommendations</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20">
                <SelectValue placeholder="Select Technician" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Technicians</SelectItem>
                {technicianProfiles?.map(tech => (
                  <SelectItem key={tech.techId} value={tech.techId}>
                    {tech.techId} - {tech.district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overall Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-300">Active Technicians</p>
                  <p className="text-2xl font-bold">{overallMetrics.totalTechnicians}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-sm text-gray-300">Avg Usage/Tech</p>
                  <p className="text-2xl font-bold">{overallMetrics.avgUsagePerTech}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-300">Success Rate</p>
                  <p className="text-2xl font-bold">{overallMetrics.avgSuccessRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-300">Total Revenue</p>
                  <p className="text-2xl font-bold">${overallMetrics.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white/10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="real-data">Real Data</TabsTrigger>
            <TabsTrigger value="coaching">Coaching</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="jobs">Job Analysis</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="individual">Individual</TabsTrigger>
          </TabsList>

          <TabsContent value="real-data" className="space-y-6">
            {isLoadingRealData ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading real technician data...</p>
                </div>
              </div>
            ) : realTechData ? (
              <>
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      Live Technician Performance ({realTechData.currentWeek})
                    </CardTitle>
                    <CardDescription>Real data from Excel files showing actual technician performance distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <p className="text-3xl font-bold text-blue-400">{realTechData.totalActiveTechs.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">Total Active Technicians</p>
                      </div>
                      {realTechData.performanceDistribution.map((category, index) => {
                        const colors = ['text-red-400', 'text-yellow-400', 'text-green-400', 'text-cyan-400', 'text-purple-400'];
                        return (
                          <div key={category.category} className="text-center p-4 bg-white/5 rounded-lg">
                            <p className={`text-2xl font-bold ${colors[index]}`}>{category.count.toLocaleString()}</p>
                            <p className="text-xs text-gray-400 mb-1">{category.category}</p>
                            <p className={`text-lg font-semibold ${colors[index]}`}>{category.percentage}%</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">Weekly Performance Trends (Last 12 Weeks)</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={realTechData.weeklyTrends}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="week" stroke="#9CA3AF" fontSize={10} />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                            labelStyle={{ color: '#F3F4F6' }}
                          />
                          <Line type="monotone" dataKey="totalTechs" stroke="#3B82F6" strokeWidth={3} name="Total Techs" />
                          <Line type="monotone" dataKey="lowPerformers" stroke="#EF4444" strokeWidth={2} name="Low (0-5)" />
                          <Line type="monotone" dataKey="averagePerformers" stroke="#F59E0B" strokeWidth={2} name="Average (6-10)" />
                          <Line type="monotone" dataKey="goodPerformers" stroke="#10B981" strokeWidth={2} name="Good (11-15)" />
                          <Line type="monotone" dataKey="highPerformers" stroke="#06B6D4" strokeWidth={2} name="High (16-20)" />
                          <Line type="monotone" dataKey="topPerformers" stroke="#8B5CF6" strokeWidth={2} name="Top (21+)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Performance Distribution</h3>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie
                              data={realTechData.performanceDistribution}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="percentage"
                              label={({ category, percentage }) => `${percentage}%`}
                            >
                              {realTechData.performanceDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#EF4444', '#F59E0B', '#10B981', '#06B6D4', '#8B5CF6'][index]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Magik Button Opportunity Analysis</h3>
                        <div className="space-y-3">
                          {realTechData.performanceDistribution.map((category, index) => {
                            const opportunity = category.category.includes('Low') ? 'High Impact' : 
                                              category.category.includes('Average') ? 'Medium Impact' : 
                                              category.category.includes('Good') ? 'Optimization' : 'Mentorship';
                            const opportunityColor = opportunity === 'High Impact' ? 'text-red-400' : 
                                                   opportunity === 'Medium Impact' ? 'text-yellow-400' : 
                                                   opportunity === 'Optimization' ? 'text-green-400' : 'text-purple-400';
                            return (
                              <div key={category.category} className="p-3 bg-white/5 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium">{category.category}</span>
                                  <Badge className={opportunityColor.replace('text-', 'bg-').replace('-400', '-600')}>{opportunity}</Badge>
                                </div>
                                <div className="flex justify-between text-sm text-gray-400">
                                  <span>{category.count} technicians</span>
                                  <span>{category.percentage}% of workforce</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {isLoadingInsights ? (
                  <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-gray-400">Generating AI insights...</p>
                  </div>
                ) : techInsights && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="bg-white/10 border-white/20">
                      <CardHeader>
                        <CardTitle className="text-blue-400">Key Insights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {techInsights.insights.map((insight, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <TrendingUp className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                              <p className="text-sm">{insight}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/20">
                      <CardHeader>
                        <CardTitle className="text-green-400">Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {techInsights.recommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                              <p className="text-sm">{recommendation}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/10 border-white/20">
                      <CardHeader>
                        <CardTitle className="text-purple-400">Magik Button Opportunities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {techInsights.magikButtonOpportunities.map((opportunity, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Wand2 className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                              <p className="text-sm">{opportunity}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </>
            ) : (
              <Card className="bg-white/10 border-white/20">
                <CardContent className="text-center p-8">
                  <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Real Data Not Available</h3>
                  <p className="text-gray-400">Unable to load real technician data. Please check file access.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="coaching" className="space-y-6">
            <CoachingRecommendations />
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <TrendAnalysis />
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <JobAllocationAnalysis />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            {/* Inbound vs Outbound Usage */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Inbound vs Outbound Usage
                </CardTitle>
                <CardDescription>How technicians initiate vs respond to Magik Button interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-400" />
                        Inbound (Reactive)
                      </span>
                      <span className="font-bold">{overallMetrics.inboundOutboundRatio.inbound}</span>
                    </div>
                    <Progress 
                      value={(overallMetrics.inboundOutboundRatio.inbound / (overallMetrics.inboundOutboundRatio.inbound + overallMetrics.inboundOutboundRatio.outbound)) * 100} 
                      className="h-2"
                    />
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <PhoneOutgoing className="w-4 h-4 text-green-400" />
                        Outbound (Proactive)
                      </span>
                      <span className="font-bold">{overallMetrics.inboundOutboundRatio.outbound}</span>
                    </div>
                    <Progress 
                      value={(overallMetrics.inboundOutboundRatio.outbound / (overallMetrics.inboundOutboundRatio.inbound + overallMetrics.inboundOutboundRatio.outbound)) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Inbound', value: overallMetrics.inboundOutboundRatio.inbound, fill: '#3b82f6' },
                            { name: 'Outbound', value: overallMetrics.inboundOutboundRatio.outbound, fill: '#10b981' }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[0, 1].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#3b82f6' : '#10b981'} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Technicians */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle>Top Performing Technicians</CardTitle>
                <CardDescription>Ranked by overall Magik Button effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {technicianData
                    .sort((a, b) => (b.successRate * b.totalUsage) - (a.successRate * a.totalUsage))
                    .slice(0, 5)
                    .map((tech, index) => (
                      <div key={tech.technicianId} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                            {index + 1}
                          </Badge>
                          <div>
                            <p className="font-medium">{tech.name}</p>
                            <p className="text-sm text-gray-400">{tech.totalUsage} uses • {tech.successRate}% success</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-400">${tech.revenueGenerated.toLocaleString()}</p>
                          <div className="flex items-center gap-1">
                            {tech.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            ) : tech.trend === 'down' ? (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            ) : (
                              <span className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle>Usage Trends Over Time</CardTitle>
                <CardDescription>Track how Magik Button usage is evolving</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={technicianData[0]?.weeklyUsage || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="week" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                          border: '1px solid rgba(255, 255, 255, 0.2)' 
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="usage" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Usage Count"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="success" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Success Rate %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle>Scenario Performance Breakdown</CardTitle>
                <CardDescription>Detailed analysis by specific Magik Button scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {scenarioPerformance.map((scenario, index) => (
                    <div key={scenario.scenario} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{scenario.scenario}</h3>
                        <Badge variant="outline">{scenario.satisfaction}% satisfaction</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <Phone className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                          <p className="text-sm text-gray-400">Inbound</p>
                          <p className="font-bold">{scenario.inbound}</p>
                        </div>
                        <div className="text-center">
                          <PhoneOutgoing className="w-6 h-6 text-green-400 mx-auto mb-1" />
                          <p className="text-sm text-gray-400">Outbound</p>
                          <p className="font-bold">{scenario.outbound}</p>
                        </div>
                        <div className="text-center">
                          <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                          <p className="text-sm text-gray-400">Revenue</p>
                          <p className="font-bold">${scenario.revenue.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <Award className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                          <p className="text-sm text-gray-400">Success Rate</p>
                          <p className="font-bold">{scenario.satisfaction}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coaching" className="space-y-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  AI Coaching Recommendations
                </CardTitle>
                <CardDescription>Personalized tips to improve Magik Button effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {technicianData.slice(0, 6).map((tech) => (
                    <div key={tech.technicianId} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{tech.name}</h3>
                        <Badge variant={tech.trend === 'up' ? 'default' : tech.trend === 'down' ? 'destructive' : 'secondary'}>
                          {tech.trend === 'up' ? 'Improving' : tech.trend === 'down' ? 'Needs Focus' : 'Stable'}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {tech.coachingTips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="individual" className="space-y-6">
            {selectedTechnician !== 'all' && selectedTechProfile ? (
              <div className="space-y-6">
                {/* Individual Technician Profile Card */}
                <Card className="bg-white/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {selectedTechProfile.techId} - Performance Profile
                    </CardTitle>
                    <CardDescription>
                      {selectedTechProfile.district} • {selectedTechProfile.planningArea} • Week 25 Data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Performance Tier</p>
                        <Badge className={`${
                          selectedTechProfile.performanceTier === 'Top Performer' ? 'bg-green-500' :
                          selectedTechProfile.performanceTier === 'High Performer' ? 'bg-blue-500' :
                          selectedTechProfile.performanceTier === 'Good Performer' ? 'bg-purple-500' :
                          selectedTechProfile.performanceTier === 'Average Performer' ? 'bg-yellow-500' :
                          'bg-red-500'
                        } text-white`}>
                          {selectedTechProfile.performanceTier}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Pay Rate</p>
                        <p className="font-medium text-white">{selectedTechProfile.payRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Completion Rate</p>
                        <p className="font-medium text-white">{selectedTechProfile.completionRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Start Date</p>
                        <p className="font-medium text-white">
                          {selectedTechProfile.joiningDate && selectedTechProfile.joiningDate !== 'Unknown' 
                            ? new Date(selectedTechProfile.joiningDate).toLocaleDateString()
                            : 'Unknown'}
                        </p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-500/20 p-4 rounded-lg text-center">
                        <p className="text-sm text-blue-400">Weekly Attempts</p>
                        <p className="text-2xl font-bold text-white">{selectedTechProfile.weeklyAttempts}</p>
                      </div>
                      <div className="bg-green-500/20 p-4 rounded-lg text-center">
                        <p className="text-sm text-green-400">Completions</p>
                        <p className="text-2xl font-bold text-white">{selectedTechProfile.weeklyCompletes}</p>
                      </div>
                      <div className="bg-purple-500/20 p-4 rounded-lg text-center">
                        <p className="text-sm text-purple-400">Weekly Revenue</p>
                        <p className="text-2xl font-bold text-white">
                          ${selectedTechProfile.weeklyRevenue.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-yellow-500/20 p-4 rounded-lg text-center">
                        <p className="text-sm text-yellow-400">Revenue/Job</p>
                        <p className="text-2xl font-bold text-white">
                          ${selectedTechProfile.weeklyCompletes > 0 
                            ? Math.round(selectedTechProfile.weeklyRevenue / selectedTechProfile.weeklyCompletes)
                            : 0}
                        </p>
                      </div>
                    </div>

                    {/* Magik Button Recommendations */}
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center gap-2 text-white">
                        <Wand2 className="w-4 h-4" />
                        Magik Button Recommendations
                      </h4>
                      <div className="space-y-2">
                        {selectedTechProfile.performanceTier === 'Top Performer' && (
                          <div className="flex items-start gap-2">
                            <Award className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                            <p className="text-sm text-green-400">Champion level - Focus on mentorship tools and advanced business development features</p>
                          </div>
                        )}
                        {selectedTechProfile.performanceTier === 'High Performer' && (
                          <div className="flex items-start gap-2">
                            <TrendingUp className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                            <p className="text-sm text-blue-400">Ready for advanced revenue workflows: customer upselling, Sears Protect identification, service bundling</p>
                          </div>
                        )}
                        {selectedTechProfile.performanceTier === 'Good Performer' && (
                          <div className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                            <p className="text-sm text-purple-400">Target for advancement with intermediate Magik Button features: D2C repair estimates, parts identification</p>
                          </div>
                        )}
                        {(selectedTechProfile.performanceTier === 'Average Performer' || selectedTechProfile.performanceTier === 'Low Performer') && (
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                            <p className="text-sm text-yellow-400">Priority for foundational Magik Button training focused on job completion efficiency and basic workflows</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : selectedTechnician !== 'all' && isLoadingProfile ? (
              <div className="text-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading technician profile...</p>
              </div>
            ) : (
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-12 text-center">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Select a Technician</h3>
                  <p className="text-gray-400">Choose a technician from the dropdown to view detailed analytics</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}