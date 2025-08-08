import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target,
  Brain,
  Award,
  BookOpen,
  MessageSquare,
  BarChart3,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  ArrowLeft,
  User,
  DollarSign
} from 'lucide-react';
import { useLocation } from 'wouter';
import NavigationLink from './NavigationLink';
import { TechnicianProductPerformance } from './TechnicianProductPerformance';

interface CoachingRecommendation {
  id: string;
  technicianId: string;
  technicianName: string;
  type: 'technical' | 'customer_service' | 'efficiency' | 'safety' | 'communication';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionItems: string[];
  estimatedImpact: string;
  timeToComplete: number;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'dismissed';
  performanceGap: number;
  confidence: number;
}

interface TechnicianInsights {
  technicianId: string;
  technicianName: string;
  overallScore: number;
  customerSatisfactionScore: number;
  efficiencyScore: number;
  technicalSkillScore: number;
  communicationScore: number;
  strengths: string[];
  improvementAreas: string[];
  recentTrends: Record<string, 'improving' | 'declining' | 'stable'>;
  totalOrders: number;
  averageRatingDifference: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  // Additional properties for individual analysis
  planningArea: string;
  yearsExperience?: number;
  completionRate: number;
  averageRevenue: number;
  averageCustomerRating: number;
  averageTechRating?: number;
  keyOpportunities: string[];
}

interface CoachingSummary {
  totalTechnicians: number;
  totalRecommendations: number;
  criticalRecommendations: number;
  highPriorityRecommendations: number;
  averageOverallScore: number;
  riskDistribution: Record<string, number>;
  topPerformers: Array<{ name: string; score: number }>;
  needsAttention: Array<{ name: string; score: number; riskLevel: string }>;
}

interface ProgressItem {
  id: string;
  technicianId: string;
  technicianName: string;
  recommendationId: string;
  title: string;
  type: string;
  priority: string;
  startDate: string;
  targetDate: string;
  progressPercentage: number;
  status: 'not_started' | 'in_progress' | 'review' | 'completed';
  milestones: Array<{
    id: string;
    title: string;
    completed: boolean;
    completedDate?: string;
  }>;
  performanceMetrics: {
    baselineScore: number;
    currentScore: number;
    targetScore: number;
    improvement: number;
  };
  coachNotes: string[];
  lastUpdateDate: string;
}

const PersonalizedCoachingEngine: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [selectedTechnician, setSelectedTechnician] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("overview");

  const queryClient = useQueryClient();

  // Handle URL parameters for technician filtering
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const technicianFromUrl = params.get('technician');
    console.log('URL parameters:', { technician: technicianFromUrl, currentLocation: location });
    if (technicianFromUrl) {
      setSelectedTechnician(technicianFromUrl);
      setActiveTab('insights'); // Switch to insights tab to show individual performance
    }
  }, [location]);

  // Fetch coaching summary
  const { data: summary, isLoading: summaryLoading } = useQuery<CoachingSummary>({
    queryKey: ['/api/coaching/summary'],
    refetchInterval: 30000
  });

  // Fetch all coaching recommendations
  const { data: recommendations, isLoading: recommendationsLoading } = useQuery<Array<{technicianId: string; recommendations: CoachingRecommendation[]}>>({
    queryKey: ['/api/coaching/recommendations'],
    refetchInterval: 30000
  });

  // Fetch technician insights
  const { data: insights, isLoading: insightsLoading } = useQuery<TechnicianInsights[]>({
    queryKey: ['/api/coaching/insights'],
    refetchInterval: 30000
  });

  // Update recommendation status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ recommendationId, status, notes }: { recommendationId: string; status: string; notes?: string }) => {
      const response = await fetch(`/api/coaching/recommendations/${recommendationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/coaching/recommendations'] });
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'technical': return <Brain className="w-4 h-4" />;
      case 'customer_service': return <MessageSquare className="w-4 h-4" />;
      case 'efficiency': return <Clock className="w-4 h-4" />;
      case 'safety': return <AlertTriangle className="w-4 h-4" />;
      case 'communication': return <Users className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'declining': return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredRecommendations = recommendations?.filter(tech => {
    if (selectedTechnician !== "all" && tech.technicianId !== selectedTechnician) {
      return false;
    }
    return tech.recommendations.some(rec => filterPriority === "all" || rec.priority === filterPriority);
  }) || [];

  const allRecommendations = filteredRecommendations.flatMap(tech => tech.recommendations)
    .filter(rec => filterPriority === "all" || rec.priority === filterPriority);

  if (summaryLoading || recommendationsLoading || insightsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-4 mb-4">
        <Button 
          variant="outline" 
          onClick={() => setLocation('/completed-orders')}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Completed Orders
        </Button>
      </div>

      {/* Navigation from completed orders notification */}
      {selectedTechnician !== 'all' && (
        <Alert className="mb-4 bg-blue-900/20 border-blue-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-blue-300">
            Showing coaching data for technician: <strong>{insights?.find(i => i.technicianId === selectedTechnician)?.technicianName || selectedTechnician}</strong> 
            (linked from completed orders)
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setLocation('/dashboard')}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="h-6 w-px bg-gray-600" />
          <div>
            <h1 className="text-3xl font-bold gradient-text">Personalized Coaching Engine</h1>
            <p className="text-gray-400 mt-1">AI-powered coaching recommendations for technician development</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Technician" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Technicians</SelectItem>
              {insights?.filter(tech => tech.technicianId && tech.technicianId.trim() !== '').map(tech => (
                <SelectItem key={tech.technicianId} value={tech.technicianId}>
                  {tech.technicianName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Technicians</p>
                <p className="text-2xl font-bold text-white">{summary?.totalTechnicians || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Recommendations</p>
                <p className="text-2xl font-bold text-white">{summary?.totalRecommendations || 0}</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Critical Priority</p>
                <p className="text-2xl font-bold text-red-400">{summary?.criticalRecommendations || 0}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Score</p>
                <p className="text-2xl font-bold text-white">{summary?.averageOverallScore?.toFixed(1) || 0}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="insights">Performance Insights</TabsTrigger>
          <TabsTrigger value="productanalysis">Product Performance</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {selectedTechnician === 'all' ? (
            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white text-lg mb-2">Individual Technician Analysis</p>
                <p className="text-gray-400">Select a specific technician to view their detailed performance overview with peer comparisons</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Individual Technician Overview */}
              {insights?.filter(i => i.technicianId === selectedTechnician).map((insight) => {
                // Get peer group for comparison (same planning area and similar skill level)
                const technicianInsight = insights?.find(i => i.technicianId === selectedTechnician);
                const peerGroup = insights?.filter(i => 
                  i.planningArea === technicianInsight?.planningArea && 
                  i.technicianId !== selectedTechnician
                ) || [];
                
                // Calculate percentiles
                const completionRatePercentile = peerGroup.length > 0 
                  ? (peerGroup.filter(p => p.completionRate < insight.completionRate).length / peerGroup.length) * 100
                  : 50;
                
                const revenuePercentile = peerGroup.length > 0
                  ? (peerGroup.filter(p => p.averageRevenue < insight.averageRevenue).length / peerGroup.length) * 100
                  : 50;
                
                const ratingPercentile = peerGroup.length > 0
                  ? (peerGroup.filter(p => p.averageCustomerRating < insight.averageCustomerRating).length / peerGroup.length) * 100
                  : 50;

                return (
                  <div key={insight.technicianId} className="space-y-6">
                    {/* Individual Performance Header */}
                    <Card className="bg-dark-card border-dark-border">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-white text-xl flex items-center gap-2">
                              <User className="w-6 h-6 text-blue-500" />
                              {insight.technicianName}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                              {insight.planningArea} • {insight.yearsExperience} years experience
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <Badge className={getRiskLevelColor(insight.riskLevel)} variant="outline">
                              {insight.riskLevel}
                            </Badge>
                            <p className="text-sm text-gray-400 mt-1">Overall Score: {insight.overallScore.toFixed(1)}/100</p>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Performance Metrics with Peer Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-dark-card border-dark-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-white font-medium">Completion Rate</span>
                            </div>
                            <Badge variant="outline" className={completionRatePercentile >= 75 ? 'text-green-400' : completionRatePercentile >= 50 ? 'text-yellow-400' : 'text-red-400'}>
                              {completionRatePercentile.toFixed(0)}th %ile
                            </Badge>
                          </div>
                          <p className="text-2xl font-bold text-white">{(insight.completionRate * 100).toFixed(1)}%</p>
                          <p className="text-sm text-gray-400">
                            Area avg: {peerGroup.length > 0 
                              ? ((peerGroup.reduce((sum, p) => sum + p.completionRate, 0) / peerGroup.length) * 100).toFixed(1) + '%'
                              : 'N/A'
                            }
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-dark-card border-dark-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-green-500" />
                              <span className="text-white font-medium">Revenue/Order</span>
                            </div>
                            <Badge variant="outline" className={revenuePercentile >= 75 ? 'text-green-400' : revenuePercentile >= 50 ? 'text-yellow-400' : 'text-red-400'}>
                              {revenuePercentile.toFixed(0)}th %ile
                            </Badge>
                          </div>
                          <p className="text-2xl font-bold text-white">${insight.averageRevenue.toFixed(0)}</p>
                          <p className="text-sm text-gray-400">
                            Area avg: ${peerGroup.length > 0 
                              ? (peerGroup.reduce((sum, p) => sum + p.averageRevenue, 0) / peerGroup.length).toFixed(0)
                              : 'N/A'
                            }
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-dark-card border-dark-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500" />
                              <span className="text-white font-medium">Customer Rating</span>
                            </div>
                            <Badge variant="outline" className={ratingPercentile >= 75 ? 'text-green-400' : ratingPercentile >= 50 ? 'text-yellow-400' : 'text-red-400'}>
                              {ratingPercentile.toFixed(0)}th %ile
                            </Badge>
                          </div>
                          <p className="text-2xl font-bold text-white">{insight.averageCustomerRating.toFixed(1)}</p>
                          <p className="text-sm text-gray-400">
                            Area avg: {peerGroup.length > 0 
                              ? (peerGroup.reduce((sum, p) => sum + p.averageCustomerRating, 0) / peerGroup.length).toFixed(1)
                              : 'N/A'
                            }
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Perception vs Reality Analysis for Individual */}
                    <Card className="bg-dark-card border-dark-border">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Brain className="w-5 h-5 text-purple-500" />
                          Perception vs Reality Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="p-3 bg-purple-900/20 rounded border border-purple-800">
                              <p className="text-purple-300 text-sm font-medium mb-1">Self vs Customer Rating Gap</p>
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-xs text-gray-400">Self Rating</p>
                                  <p className="text-lg font-bold text-white">{insight.averageTechRating?.toFixed(1) || 'N/A'}</p>
                                </div>
                                <div className="text-gray-400">vs</div>
                                <div>
                                  <p className="text-xs text-gray-400">Customer Rating</p>
                                  <p className="text-lg font-bold text-white">{insight.averageCustomerRating?.toFixed(1) || 'N/A'}</p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className={`text-sm font-medium ${
                                  insight.averageRatingDifference > 1.0 ? 'text-red-400' : 
                                  insight.averageRatingDifference < -0.5 ? 'text-blue-400' : 'text-green-400'
                                }`}>
                                  {insight.averageRatingDifference > 1.0 ? '⚠️ Overconfident' : 
                                   insight.averageRatingDifference < -0.5 ? '💡 Under-confident' : '✅ Well-calibrated'}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
                              <p className="text-blue-300 text-sm font-medium mb-1">Peer Comparison</p>
                              <p className="text-blue-200 text-xs mb-2">
                                vs {peerGroup.length} technicians in {insight.planningArea}
                              </p>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-400">Performance Rank</span>
                                  <span className="text-white">
                                    #{peerGroup.filter(p => p.overallScore > insight.overallScore).length + 1} of {peerGroup.length + 1}
                                  </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-400">Top Quartile</span>
                                  <span className={completionRatePercentile >= 75 ? 'text-green-400' : 'text-gray-400'}>
                                    {completionRatePercentile >= 75 ? '✅ Yes' : '❌ No'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Enhanced Performance Insights */}
                    <Card className="bg-dark-card border-dark-border">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-blue-500" />
                          Detailed Performance Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Performance Metrics Detail */}
                          <div className="space-y-4">
                            <h5 className="text-blue-300 font-medium mb-3">Performance Breakdown</h5>
                            <div className="space-y-3">
                              <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-blue-300 text-sm">Technical Efficiency</span>
                                  <span className="text-white font-bold">{insight.technicalSkillScore.toFixed(1)}/100</span>
                                </div>
                                <div className="text-xs text-blue-200">
                                  Diagnostic accuracy, repair completion rate, and technical problem-solving effectiveness
                                </div>
                              </div>
                              
                              <div className="p-3 bg-green-900/20 rounded border border-green-800">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-green-300 text-sm">Customer Experience</span>
                                  <span className="text-white font-bold">{insight.customerSatisfactionScore.toFixed(1)}/100</span>
                                </div>
                                <div className="text-xs text-green-200">
                                  Communication clarity, professionalism, and customer satisfaction ratings
                                </div>
                              </div>
                              
                              <div className="p-3 bg-purple-900/20 rounded border border-purple-800">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-purple-300 text-sm">Operational Efficiency</span>
                                  <span className="text-white font-bold">{insight.efficiencyScore.toFixed(1)}/100</span>
                                </div>
                                <div className="text-xs text-purple-200">
                                  Time management, route optimization, and resource utilization
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Business Impact Analysis */}
                          <div className="space-y-4">
                            <h5 className="text-orange-300 font-medium mb-3">Business Impact</h5>
                            <div className="space-y-3">
                              <div className="p-3 bg-green-900/20 rounded border border-green-800">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-green-300 text-sm">Revenue Generation</span>
                                  <span className="text-white font-bold">${insight.averageRevenue.toFixed(0)}/order</span>
                                </div>
                                <div className="text-xs text-green-200">
                                  Average revenue per service call compared to area benchmark
                                </div>
                              </div>
                              
                              <div className="p-3 bg-yellow-900/20 rounded border border-yellow-800">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-yellow-300 text-sm">Completion Efficiency</span>
                                  <span className="text-white font-bold">{(insight.completionRate * 100).toFixed(1)}%</span>
                                </div>
                                <div className="text-xs text-yellow-200">
                                  First-time fix rate and overall job completion percentage
                                </div>
                              </div>
                              
                              <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-blue-300 text-sm">Experience Level</span>
                                  <span className="text-white font-bold">{insight.yearsExperience || 5} years</span>
                                </div>
                                <div className="text-xs text-blue-200">
                                  Field experience and skill development progression
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Key Opportunities */}
                    <Card className="bg-dark-card border-dark-border">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Target className="w-5 h-5 text-orange-500" />
                          Priority Improvement Opportunities
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {insight.keyOpportunities.map((opportunity, index) => (
                            <div key={index} className="p-3 bg-orange-900/20 rounded border border-orange-800">
                              <p className="text-orange-300 text-sm font-medium">{opportunity}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {allRecommendations.length === 0 ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                No coaching recommendations found for the selected filters.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {allRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="bg-dark-card border-dark-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(recommendation.type)}
                        <CardTitle className="text-white text-lg">{recommendation.title}</CardTitle>
                      </div>
                      <Badge className={getPriorityColor(recommendation.priority)}>
                        {recommendation.priority}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      For: <NavigationLink 
                        type="technician" 
                        id={recommendation.technicianId} 
                        name={recommendation.technicianName}
                        compact={true}
                        className="text-blue-400"
                      />
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">{recommendation.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>⏱️ {recommendation.timeToComplete}h</span>
                      <span>📅 Due: {new Date(recommendation.dueDate).toLocaleDateString()}</span>
                      <span>🎯 {recommendation.confidence * 100}% confidence</span>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-white font-medium">Action Items:</h5>
                      <ul className="space-y-1">
                        {recommendation.actionItems.map((item, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-blue-900/20 rounded border border-blue-800">
                      <p className="text-blue-300 text-sm">
                        <strong>Expected Impact:</strong> {recommendation.estimatedImpact}
                      </p>
                    </div>

                    {/* Perception Gap Warning for Critical Coaching */}
                    {recommendation.title.includes('Perception vs Reality') && (
                      <div className="p-3 bg-orange-900/20 rounded border border-orange-800">
                        <p className="text-orange-300 text-sm font-medium mb-1">
                          ⚠️ Perception Gap Detected
                        </p>
                        <p className="text-orange-200 text-xs">
                          This technician shows significant disconnect between self-assessment and customer feedback. 
                          Requires specialized coaching to align service perception with customer experience.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateStatusMutation.mutate({
                          recommendationId: recommendation.id,
                          status: 'in_progress'
                        })}
                        disabled={recommendation.status === 'in_progress'}
                      >
                        Start Coaching
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateStatusMutation.mutate({
                          recommendationId: recommendation.id,
                          status: 'completed'
                        })}
                        disabled={recommendation.status === 'completed'}
                      >
                        Mark Complete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {insights?.filter(insight => selectedTechnician === 'all' || insight.technicianId === selectedTechnician)
              .map((insight) => {
                const isHighlighted = selectedTechnician !== 'all' && insight.technicianId === selectedTechnician;
                return (
                  <Card 
                    key={insight.technicianId} 
                    className={`bg-dark-card border-dark-border ${isHighlighted ? 'ring-2 ring-blue-500 bg-blue-900/10' : ''}`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className={`${isHighlighted ? 'text-blue-300' : 'text-white'} flex items-center gap-2`}>
                          {isHighlighted && <Star className="w-5 h-5 text-blue-400" />}
                          {insight.technicianName}
                        </CardTitle>
                        <Badge className={getRiskLevelColor(insight.riskLevel)}>
                          {insight.riskLevel}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        {insight.totalOrders} completed orders
                        {isHighlighted && <span className="ml-2 text-blue-400 font-medium">(Selected from Orders)</span>}
                      </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      {insight.overallScore.toFixed(1)}
                    </div>
                    <p className="text-gray-400 text-sm">Overall Score</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Customer Satisfaction</span>
                        <span className="text-white">{insight.customerSatisfactionScore.toFixed(1)}%</span>
                      </div>
                      <Progress value={insight.customerSatisfactionScore} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Efficiency</span>
                        <span className="text-white">{insight.efficiencyScore.toFixed(1)}%</span>
                      </div>
                      <Progress value={insight.efficiencyScore} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Technical Skill</span>
                        <span className="text-white">{insight.technicalSkillScore.toFixed(1)}%</span>
                      </div>
                      <Progress value={insight.technicalSkillScore} className="h-2" />
                    </div>
                  </div>

                  {insight.strengths.length > 0 && (
                    <div>
                      <h5 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Strengths
                      </h5>
                      <div className="space-y-1">
                        {insight.strengths.slice(0, 2).map((strength, index) => (
                          <Badge key={index} variant="outline" className="text-green-400 border-green-600 text-xs">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {insight.improvementAreas.length > 0 && (
                    <div>
                      <h5 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Improvement Areas
                      </h5>
                      <div className="space-y-1">
                        {insight.improvementAreas.slice(0, 2).map((area, index) => (
                          <Badge key={index} variant="outline" className="text-orange-400 border-orange-600 text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-700">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Recent Trends</span>
                      <div className="flex gap-2">
                        {Object.entries(insight.recentTrends).map(([metric, trend]) => (
                          <div key={metric} className="flex items-center gap-1">
                            {getTrendIcon(trend)}
                            <span className="text-xs text-gray-400 capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="productanalysis" className="space-y-4">
          {selectedTechnician === 'all' ? (
            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white text-lg mb-2">Product Performance Analysis</p>
                <p className="text-gray-400">Select a specific technician to view detailed product type and job code performance breakdown</p>
              </CardContent>
            </Card>
          ) : (
            <TechnicianProductPerformance 
              technicianId={selectedTechnician}
              technicianName={insights?.find(i => i.technicianId === selectedTechnician)?.technicianName || selectedTechnician}
            />
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          {selectedTechnician === 'all' ? (
            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-white text-lg mb-2">Progress Tracking</p>
                <p className="text-gray-400">Select a specific technician to view their coaching progress and performance improvements</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Progress Overview */}
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    {insights?.find(i => i.technicianId === selectedTechnician)?.technicianName || selectedTechnician} - Coaching Progress
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Active coaching recommendations and progress tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-blue-900/20 rounded border border-blue-800">
                      <p className="text-2xl font-bold text-blue-400">4</p>
                      <p className="text-sm text-blue-300">Active Plans</p>
                    </div>
                    <div className="text-center p-3 bg-yellow-900/20 rounded border border-yellow-800">
                      <p className="text-2xl font-bold text-yellow-400">67%</p>
                      <p className="text-sm text-yellow-300">Avg Progress</p>
                    </div>
                    <div className="text-center p-3 bg-green-900/20 rounded border border-green-800">
                      <p className="text-2xl font-bold text-green-400">2</p>
                      <p className="text-sm text-green-300">Completed</p>
                    </div>
                    <div className="text-center p-3 bg-purple-900/20 rounded border border-purple-800">
                      <p className="text-2xl font-bold text-purple-400">+12</p>
                      <p className="text-sm text-purple-300">Score Improvement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Progress Items */}
              <div className="space-y-4">
                {generateProgressItems(selectedTechnician, insights?.find(i => i.technicianId === selectedTechnician)?.technicianName || selectedTechnician).map((item) => (
                  <Card key={item.id} className="bg-dark-card border-dark-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            item.priority === 'critical' ? 'bg-red-900 text-red-300' :
                            item.priority === 'high' ? 'bg-orange-900 text-orange-300' :
                            item.priority === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-blue-900 text-blue-300'
                          }>
                            {item.priority}
                          </Badge>
                          <Badge className={
                            item.status === 'completed' ? 'bg-green-900 text-green-300' :
                            item.status === 'in_progress' ? 'bg-blue-900 text-blue-300' :
                            item.status === 'review' ? 'bg-purple-900 text-purple-300' :
                            'bg-gray-900 text-gray-300'
                          }>
                            {item.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-gray-400">
                        Target: {new Date(item.targetDate).toLocaleDateString()} • Type: {item.type}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{item.progressPercentage}%</span>
                        </div>
                        <Progress value={item.progressPercentage} className="h-3" />
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-900/50 rounded">
                          <p className="text-lg font-bold text-gray-400">{item.performanceMetrics.baselineScore}</p>
                          <p className="text-xs text-gray-500">Baseline</p>
                        </div>
                        <div className="text-center p-3 bg-blue-900/30 rounded">
                          <p className="text-lg font-bold text-blue-400">{item.performanceMetrics.currentScore}</p>
                          <p className="text-xs text-blue-300">Current</p>
                        </div>
                        <div className="text-center p-3 bg-green-900/30 rounded">
                          <p className="text-lg font-bold text-green-400">{item.performanceMetrics.targetScore}</p>
                          <p className="text-xs text-green-300">Target</p>
                        </div>
                      </div>

                      {/* Milestones */}
                      <div>
                        <h5 className="text-white font-medium mb-3">Milestones</h5>
                        <div className="space-y-2">
                          {item.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                milestone.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
                              }`}>
                                {milestone.completed && <CheckCircle className="w-2 h-2 text-white" />}
                              </div>
                              <span className={`text-sm ${milestone.completed ? 'text-green-400' : 'text-gray-400'}`}>
                                {milestone.title}
                              </span>
                              {milestone.completed && milestone.completedDate && (
                                <span className="text-xs text-gray-500 ml-auto">
                                  {new Date(milestone.completedDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Coach Notes */}
                      {item.coachNotes.length > 0 && (
                        <div>
                          <h5 className="text-white font-medium mb-2">Recent Coach Notes</h5>
                          <div className="space-y-2">
                            {item.coachNotes.slice(0, 2).map((note, index) => (
                              <div key={index} className="p-2 bg-purple-900/20 rounded border border-purple-800">
                                <p className="text-purple-300 text-sm">{note}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
                        Last updated: {new Date(item.lastUpdateDate).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Generate simulated progress data for technicians
function generateProgressItems(technicianId: string, technicianName: string): ProgressItem[] {
  const progressItems: ProgressItem[] = [
    {
      id: `${technicianId}-prog-1`,
      technicianId,
      technicianName,
      recommendationId: `${technicianId}-cs-1`,
      title: 'Customer Service Excellence Training',
      type: 'customer_service',
      priority: 'high',
      startDate: '2025-07-15',
      targetDate: '2025-08-15',
      progressPercentage: 75,
      status: 'in_progress',
      milestones: [
        { id: 'm1', title: 'Complete communication workshop', completed: true, completedDate: '2025-07-20' },
        { id: 'm2', title: 'Shadow top-performing technician', completed: true, completedDate: '2025-07-25' },
        { id: 'm3', title: 'Practice active listening techniques', completed: false },
        { id: 'm4', title: 'Review customer feedback strategies', completed: false }
      ],
      performanceMetrics: {
        baselineScore: 72,
        currentScore: 84,
        targetScore: 90,
        improvement: 12
      },
      coachNotes: [
        'Great progress on communication workshop. Showing improved empathy skills.',
        'Shadowing session with top performer was very beneficial. Apply techniques learned.',
        'Continue practicing active listening - customer satisfaction scores improving.'
      ],
      lastUpdateDate: '2025-07-28'
    },
    {
      id: `${technicianId}-prog-2`,
      technicianId,
      technicianName,
      recommendationId: `${technicianId}-tech-1`,
      title: 'Diagnostic Accuracy Improvement',
      type: 'technical',
      priority: 'medium',
      startDate: '2025-07-10',
      targetDate: '2025-08-10',
      progressPercentage: 60,
      status: 'in_progress',
      milestones: [
        { id: 'm1', title: 'Complete advanced diagnostic training', completed: true, completedDate: '2025-07-18' },
        { id: 'm2', title: 'Practice with diagnostic equipment', completed: true, completedDate: '2025-07-22' },
        { id: 'm3', title: 'Shadow senior technician', completed: false },
        { id: 'm4', title: 'Take certification exam', completed: false }
      ],
      performanceMetrics: {
        baselineScore: 78,
        currentScore: 85,
        targetScore: 92,
        improvement: 7
      },
      coachNotes: [
        'Excellent understanding of new diagnostic procedures.',
        'Equipment familiarity improving rapidly.',
        'Ready for advanced shadowing session next week.'
      ],
      lastUpdateDate: '2025-07-27'
    },
    {
      id: `${technicianId}-prog-3`,
      technicianId,
      technicianName,
      recommendationId: `${technicianId}-eff-1`,
      title: 'Time Management & Efficiency',
      type: 'efficiency',
      priority: 'critical',
      startDate: '2025-07-05',
      targetDate: '2025-08-05',
      progressPercentage: 90,
      status: 'review',
      milestones: [
        { id: 'm1', title: 'Time tracking analysis', completed: true, completedDate: '2025-07-12' },
        { id: 'm2', title: 'Route optimization training', completed: true, completedDate: '2025-07-16' },
        { id: 'm3', title: 'Implement new scheduling system', completed: true, completedDate: '2025-07-24' },
        { id: 'm4', title: 'Performance review meeting', completed: false }
      ],
      performanceMetrics: {
        baselineScore: 65,
        currentScore: 88,
        targetScore: 85,
        improvement: 23
      },
      coachNotes: [
        'Outstanding improvement in time management. Exceeded target!',
        'Route optimization has reduced travel time by 25%.',
        'Ready for final performance review - likely to complete ahead of schedule.'
      ],
      lastUpdateDate: '2025-07-29'
    },
    {
      id: `${technicianId}-prog-4`,
      technicianId,
      technicianName,
      recommendationId: `${technicianId}-comm-1`,
      title: 'Communication Skills Enhancement',
      type: 'communication',
      priority: 'low',
      startDate: '2025-07-20',
      targetDate: '2025-08-20',
      progressPercentage: 25,
      status: 'not_started',
      milestones: [
        { id: 'm1', title: 'Assessment of current communication style', completed: false },
        { id: 'm2', title: 'Attend presentation skills workshop', completed: false },
        { id: 'm3', title: 'Practice customer explanation techniques', completed: false },
        { id: 'm4', title: 'Final assessment and feedback', completed: false }
      ],
      performanceMetrics: {
        baselineScore: 82,
        currentScore: 82,
        targetScore: 90,
        improvement: 0
      },
      coachNotes: [
        'Scheduled to begin next week after current priorities complete.',
        'Will focus on technical explanation clarity for customers.'
      ],
      lastUpdateDate: '2025-07-29'
    }
  ];

  return progressItems;
}

export default PersonalizedCoachingEngine;