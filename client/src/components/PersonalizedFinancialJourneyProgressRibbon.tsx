import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  CheckCircle, 
  Clock, 
  Star,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  BarChart3,
  Zap,
  Award,
  Calendar,
  Users,
  ChevronRight,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface FinancialMilestone {
  id: string;
  name: string;
  description: string;
  targetValue: number;
  currentValue: number;
  category: 'revenue' | 'profitability' | 'efficiency' | 'growth';
  priority: 'critical' | 'high' | 'medium' | 'low';
  dueDate: string;
  progress: number;
  status: 'completed' | 'on-track' | 'at-risk' | 'behind';
  aiAgent: string;
  actionItems: string[];
  rewards: string[];
}

interface JourneyStage {
  id: string;
  name: string;
  description: string;
  milestones: FinancialMilestone[];
  overallProgress: number;
  estimatedCompletion: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: any;
  color: string;
}

export default function PersonalizedFinancialJourneyProgressRibbon() {
  const [, setLocation] = useLocation();
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  // Financial Journey Stages with Real P&L Integration
  const journeyStages: JourneyStage[] = [
    {
      id: 'foundation',
      name: 'Financial Foundation',
      description: 'Establish baseline financial metrics and control costs',
      overallProgress: 87,
      estimatedCompletion: 'Feb 2025',
      status: 'completed',
      icon: Target,
      color: 'green',
      milestones: [
        {
          id: 'cost-control',
          name: 'Operational Cost Control',
          description: 'Reduce variable costs below 75% of revenue',
          targetValue: 18330000, // 75% of $24.44M
          currentValue: 19400000, // Current operational costs
          category: 'efficiency',
          priority: 'critical',
          dueDate: '2025-01-31',
          progress: 95,
          status: 'at-risk',
          aiAgent: 'Financial Intelligence Agent',
          actionItems: [
            'Optimize parts procurement costs (-$800K)',
            'Reduce truck maintenance expenses (-$400K)',
            'Streamline payroll efficiency (-$270K)'
          ],
          rewards: ['Cost Control Badge', 'Efficiency Expert Status']
        },
        {
          id: 'cashflow-positive',
          name: 'Positive Monthly Cash Flow',
          description: 'Achieve positive operating cash flow consistently',
          targetValue: 500000, // $500K positive
          currentValue: -2870000, // Current EBITDA
          category: 'profitability',
          priority: 'critical',
          dueDate: '2025-02-28',
          progress: 45,
          status: 'behind',
          aiAgent: 'Financial Intelligence Agent',
          actionItems: [
            'Increase D2C revenue mix (+$2.2M)',
            'Improve parts margin efficiency (+$800K)',
            'Optimize technician utilization (+$1.1M)'
          ],
          rewards: ['Cash Flow Champion', 'Financial Stability Milestone']
        }
      ]
    },
    {
      id: 'growth',
      name: 'Revenue Growth',
      description: 'Scale revenue streams and market penetration',
      overallProgress: 72,
      estimatedCompletion: 'May 2025',
      status: 'current',
      icon: TrendingUp,
      color: 'blue',
      milestones: [
        {
          id: 'revenue-target',
          name: 'Monthly Revenue Target',
          description: 'Achieve $30M monthly revenue',
          targetValue: 30000000,
          currentValue: 24440000, // Current June 2025 revenue
          category: 'revenue',
          priority: 'high',
          dueDate: '2025-05-31',
          progress: 81,
          status: 'on-track',
          aiAgent: 'D2C Marketing Intelligence Agent',
          actionItems: [
            'Expand to 25 new planning areas (+$3.8M)',
            'Increase average order value (+$1.2M)',
            'Launch premium service tier (+$560K)'
          ],
          rewards: ['Revenue Growth Champion', 'Market Expansion Expert']
        },
        {
          id: 'market-share',
          name: 'Market Share Expansion',
          description: 'Capture 15% market share in target regions',
          targetValue: 15,
          currentValue: 11.2,
          category: 'growth',
          priority: 'high',
          dueDate: '2025-06-30',
          progress: 75,
          status: 'on-track',
          aiAgent: 'Geographic Performance Marketing Agent',
          actionItems: [
            'Launch competitor displacement program',
            'Implement referral reward system',
            'Enhance B2B partnership portfolio'
          ],
          rewards: ['Market Leader Badge', 'Competitive Advantage Award']
        }
      ]
    },
    {
      id: 'optimization',
      name: 'Operational Excellence',
      description: 'Optimize operations for maximum efficiency and profitability',
      overallProgress: 58,
      estimatedCompletion: 'Aug 2025',
      status: 'current',
      icon: Zap,
      color: 'yellow',
      milestones: [
        {
          id: 'ebitda-positive',
          name: 'Positive EBITDA Achievement',
          description: 'Achieve +$2M monthly EBITDA',
          targetValue: 2000000,
          currentValue: -2870000,
          category: 'profitability',
          priority: 'critical',
          dueDate: '2025-08-31',
          progress: 35,
          status: 'behind',
          aiAgent: 'Financial Intelligence Agent',
          actionItems: [
            'Implement AI-driven cost optimization (-$2.1M)',
            'Enhance technician productivity (+$1.8M)',
            'Optimize route efficiency (+$900K)'
          ],
          rewards: ['Profitability Master', 'EBITDA Excellence Award']
        },
        {
          id: 'automation-efficiency',
          name: 'Process Automation',
          description: 'Automate 80% of routine operational tasks',
          targetValue: 80,
          currentValue: 58,
          category: 'efficiency',
          priority: 'medium',
          dueDate: '2025-07-31',
          progress: 73,
          status: 'on-track',
          aiAgent: 'Advanced Scheduling Agent',
          actionItems: [
            'Deploy automated scheduling system',
            'Implement smart parts ordering',
            'Launch AI customer communication'
          ],
          rewards: ['Automation Expert', 'Efficiency Pioneer']
        }
      ]
    },
    {
      id: 'mastery',
      name: 'Financial Mastery',
      description: 'Achieve industry-leading financial performance',
      overallProgress: 23,
      estimatedCompletion: 'Dec 2025',
      status: 'upcoming',
      icon: Trophy,
      color: 'purple',
      milestones: [
        {
          id: 'profit-margin',
          name: 'Premium Profit Margins',
          description: 'Achieve 15% EBITDA margin consistently',
          targetValue: 15,
          currentValue: -11.7, // Current EBITDA margin
          category: 'profitability',
          priority: 'high',
          dueDate: '2025-12-31',
          progress: 12,
          status: 'behind',
          aiAgent: 'Financial Intelligence Agent',
          actionItems: [
            'Implement premium pricing strategy',
            'Launch high-margin service offerings',
            'Optimize cost structure for scale'
          ],
          rewards: ['Profit Margin Master', 'Financial Excellence Award']
        },
        {
          id: 'industry-leadership',
          name: 'Industry Leadership Position',
          description: 'Become top 3 player in home services market',
          targetValue: 3,
          currentValue: 12,
          category: 'growth',
          priority: 'medium',
          dueDate: '2025-12-31',
          progress: 35,
          status: 'on-track',
          aiAgent: 'Geographic Performance Marketing Agent',
          actionItems: [
            'Launch national expansion initiative',
            'Acquire strategic competitors',
            'Establish industry partnerships'
          ],
          rewards: ['Industry Leader Badge', 'Market Dominance Award']
        }
      ]
    }
  ];

  // Personal Achievement Metrics
  const achievementMetrics = {
    totalMilestones: journeyStages.reduce((sum, stage) => sum + stage.milestones.length, 0),
    completedMilestones: journeyStages.reduce((sum, stage) => 
      sum + stage.milestones.filter(m => m.status === 'completed').length, 0),
    onTrackMilestones: journeyStages.reduce((sum, stage) => 
      sum + stage.milestones.filter(m => m.status === 'on-track').length, 0),
    atRiskMilestones: journeyStages.reduce((sum, stage) => 
      sum + stage.milestones.filter(m => m.status === 'at-risk').length, 0),
    totalRewards: journeyStages.reduce((sum, stage) => 
      sum + stage.milestones.reduce((milestoneSum, milestone) => 
        milestoneSum + milestone.rewards.length, 0), 0),
    overallProgress: Math.round(journeyStages.reduce((sum, stage) => sum + stage.overallProgress, 0) / journeyStages.length)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'at-risk': return 'text-yellow-600 bg-yellow-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStageColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Sparkles className="h-8 w-8 mr-3 text-purple-600" />
            Financial Journey Progress
          </h1>
          <p className="text-gray-600 mt-1">Personalized milestone tracking with AI-powered financial guidance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setLocation('/financial-intelligence-dashboard')}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Financial Dashboard
          </Button>
          <Badge variant="outline" className="text-purple-600 border-purple-200">
            {achievementMetrics.overallProgress}% Complete
          </Badge>
          <Badge variant="outline" className="text-green-600 border-green-200">
            {achievementMetrics.completedMilestones} Milestones Achieved
          </Badge>
        </div>
      </div>

      {/* Progress Ribbon Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-purple-600" />
            Journey Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${achievementMetrics.overallProgress}%` }}
              />
            </div>
            
            {/* Journey Stages */}
            <div className="relative flex justify-between">
              {journeyStages.map((stage, index) => (
                <div
                  key={stage.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setSelectedStage(stage.id)}
                >
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-all duration-300
                    ${stage.status === 'completed' ? 'bg-green-500' : 
                      stage.status === 'current' ? getStageColor(stage.color) : 'bg-gray-300'}
                    group-hover:scale-110 group-hover:shadow-xl
                  `}>
                    <stage.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="font-semibold text-sm text-gray-900">{stage.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{stage.estimatedCompletion}</p>
                    <div className="mt-2 w-20">
                      <Progress value={stage.overallProgress} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{stage.overallProgress}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-purple-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{achievementMetrics.totalMilestones}</div>
              <div className="text-sm text-gray-600">Total Milestones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{achievementMetrics.completedMilestones}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{achievementMetrics.onTrackMilestones}</div>
              <div className="text-sm text-gray-600">On Track</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{achievementMetrics.atRiskMilestones}</div>
              <div className="text-sm text-gray-600">At Risk</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed View */}
      <Tabs value={selectedView} onValueChange={setSelectedView}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Current Focus</TabsTrigger>
          <TabsTrigger value="milestones">All Milestones</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Current Priority Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Priority Focus Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {journeyStages
                  .filter(stage => stage.status === 'current')
                  .flatMap(stage => stage.milestones)
                  .filter(milestone => milestone.priority === 'critical' || milestone.priority === 'high')
                  .map(milestone => (
                    <div key={milestone.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{milestone.name}</h3>
                            <Badge variant="outline" className={getStatusColor(milestone.status)}>
                              {milestone.status}
                            </Badge>
                            <Badge variant="outline" className={
                              milestone.priority === 'critical' ? 'text-red-600 border-red-200' : 'text-orange-600 border-orange-200'
                            }>
                              {milestone.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{milestone.description}</p>
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{milestone.progress}%</span>
                            </div>
                            <Progress value={milestone.progress} className="h-2" />
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Target:</span> ${(milestone.targetValue / 1000000).toFixed(1)}M | 
                            <span className="font-medium ml-2">Current:</span> ${(milestone.currentValue / 1000000).toFixed(1)}M |
                            <span className="font-medium ml-2">Due:</span> {milestone.dueDate}
                          </div>
                        </div>
                        <div className="ml-4">
                          <Button size="sm" variant="outline">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          {/* All Milestones by Stage */}
          {journeyStages.map(stage => (
            <Card key={stage.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <stage.icon className={`h-5 w-5 mr-2 ${
                      stage.status === 'completed' ? 'text-green-600' : 
                      stage.status === 'current' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    {stage.name}
                    <Badge variant="outline" className="ml-2">
                      {stage.overallProgress}% Complete
                    </Badge>
                  </div>
                  <Badge variant="outline" className={
                    stage.status === 'completed' ? 'text-green-600 border-green-200' :
                    stage.status === 'current' ? 'text-blue-600 border-blue-200' : 'text-gray-600 border-gray-200'
                  }>
                    {stage.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stage.milestones.map(milestone => (
                    <div key={milestone.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{milestone.name}</h4>
                          <p className="text-gray-600 text-sm">{milestone.description}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(milestone.status)}>
                          {milestone.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Progress</div>
                          <Progress value={milestone.progress} className="h-2" />
                          <div className="text-xs text-gray-500 mt-1">{milestone.progress}%</div>
                        </div>
                        <div className="text-sm">
                          <div className="text-gray-600">AI Agent: <span className="font-medium text-gray-900">{milestone.aiAgent}</span></div>
                          <div className="text-gray-600">Due: <span className="font-medium text-gray-900">{milestone.dueDate}</span></div>
                        </div>
                      </div>

                      {milestone.actionItems.length > 0 && (
                        <div className="mt-3">
                          <div className="text-sm font-medium text-gray-900 mb-2">Action Items:</div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {milestone.actionItems.map((item, index) => (
                              <li key={index} className="flex items-center">
                                <ChevronRight className="h-3 w-3 mr-1 text-blue-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Achievements & Rewards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-gold-600" />
                  Earned Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {journeyStages
                    .flatMap(stage => stage.milestones)
                    .filter(milestone => milestone.status === 'completed')
                    .flatMap(milestone => milestone.rewards)
                    .map((reward, index) => (
                      <div key={index} className="flex items-center p-3 bg-gold-50 rounded-lg">
                        <Star className="h-5 w-5 text-gold-500 mr-3" />
                        <span className="font-medium text-gold-900">{reward}</span>
                      </div>
                    ))}
                  {achievementMetrics.completedMilestones === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Trophy className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p>Complete your first milestone to earn achievements!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Progress Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overall Journey Progress</span>
                    <span className="font-semibold text-blue-600">{achievementMetrics.overallProgress}%</span>
                  </div>
                  <Progress value={achievementMetrics.overallProgress} className="h-3" />
                  
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Milestones Completed</span>
                      <span className="font-semibold">{achievementMetrics.completedMilestones}/{achievementMetrics.totalMilestones}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-semibold text-green-600">
                        {Math.round((achievementMetrics.completedMilestones / achievementMetrics.totalMilestones) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rewards Earned</span>
                      <span className="font-semibold text-gold-600">{achievementMetrics.completedMilestones * 2}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}