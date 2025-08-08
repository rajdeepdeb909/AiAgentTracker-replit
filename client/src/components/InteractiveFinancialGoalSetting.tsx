import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  DollarSign, 
  Users, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Brain,
  BarChart3,
  Plus,
  Edit,
  Save,
  X,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Lightbulb
} from 'lucide-react';

interface InteractiveFinancialGoalSettingProps {
  onNavigateBack?: () => void;
}

// Goal categories and types
const goalCategories = [
  { id: 'revenue', label: 'Revenue Growth', icon: DollarSign, color: 'blue' },
  { id: 'profitability', label: 'Profitability', icon: TrendingUp, color: 'green' },
  { id: 'efficiency', label: 'Operational Efficiency', icon: Zap, color: 'purple' },
  { id: 'customer', label: 'Customer Metrics', icon: Users, color: 'orange' },
];

const timeframes = [
  { id: 'monthly', label: 'Monthly', multiplier: 1 },
  { id: 'quarterly', label: 'Quarterly', multiplier: 3 },
  { id: 'annually', label: 'Annually', multiplier: 12 },
];

// Current performance data (from existing P&L)
const currentPerformance = {
  'national': {
    totalRevenue: 47080388,
    totalEBITDA: -3663211,
    adjustedEBITDA: -1557384,
    totalLabourRevenue: 30886621,
    totalPartsRevenue: 12178467,
    d2cPaidLabour: 13187058,
    b2bPaidLabour: 17640070,
    homeWarrantyCommission: 690316,
    paServiceReimbursement: 1857978,
  },
  'district': {
    totalRevenue: 2918900,
    totalEBITDA: -110334,
    adjustedEBITDA: 34953,
    totalLabourRevenue: 1807323,
    totalPartsRevenue: 829989,
    d2cPaidLabour: 677336,
    b2bPaidLabour: 1125215,
    homeWarrantyCommission: 57322,
    paServiceReimbursement: 124446,
  }
};

// Sample goals data structure
const initialGoals = [
  {
    id: '1',
    title: 'Achieve Positive EBITDA',
    category: 'profitability',
    metric: 'totalEBITDA',
    currentValue: -3663211,
    targetValue: 2000000,
    timeframe: 'quarterly',
    priority: 'Critical',
    status: 'In Progress',
    aiAgents: ['Financial Intelligence Agent', 'Performance Analytics AI', 'Cost Optimization Engine'],
    progress: 25,
    deadline: '2025-09-30',
    description: 'Transform negative EBITDA to positive $2M quarterly through operational efficiency improvements',
    milestones: [
      { date: '2025-07-31', target: -2000000, status: 'completed', description: 'Reduce losses by 50%' },
      { date: '2025-08-31', target: 0, status: 'in-progress', description: 'Achieve break-even' },
      { date: '2025-09-30', target: 2000000, status: 'pending', description: 'Reach $2M positive EBITDA' }
    ]
  },
  {
    id: '2',
    title: 'Increase D2C Revenue Mix',
    category: 'revenue',
    metric: 'd2cPaidLabour',
    currentValue: 13187058,
    targetValue: 18000000,
    timeframe: 'quarterly',
    priority: 'High',
    status: 'On Track',
    aiAgents: ['D2C Marketing Intelligence Agent', 'Customer Communication Hub', 'Geographic Performance Marketing'],
    progress: 65,
    deadline: '2025-09-30',
    description: 'Increase D2C labour revenue from $13.2M to $18M through enhanced marketing and customer acquisition',
    milestones: [
      { date: '2025-07-31', target: 14500000, status: 'completed', description: 'Achieve $14.5M D2C revenue' },
      { date: '2025-08-31', target: 16000000, status: 'in-progress', description: 'Reach $16M D2C revenue' },
      { date: '2025-09-30', target: 18000000, status: 'pending', description: 'Target $18M D2C revenue' }
    ]
  },
  {
    id: '3',
    title: 'Optimize Parts Revenue Margin',
    category: 'efficiency',
    metric: 'totalPartsRevenue',
    currentValue: 12178467,
    targetValue: 15000000,
    timeframe: 'quarterly',
    priority: 'Medium',
    status: 'At Risk',
    aiAgents: ['Parts Prediction Engine', 'Inventory Management Assistant', 'Supply Chain Optimization'],
    progress: 45,
    deadline: '2025-09-30',
    description: 'Increase parts revenue to $15M while improving margin through AI-driven inventory optimization',
    milestones: [
      { date: '2025-07-31', target: 13000000, status: 'completed', description: 'Reach $13M parts revenue' },
      { date: '2025-08-31', target: 14000000, status: 'at-risk', description: 'Target $14M parts revenue' },
      { date: '2025-09-30', target: 15000000, status: 'pending', description: 'Achieve $15M parts revenue' }
    ]
  }
];

export const InteractiveFinancialGoalSetting: React.FC<InteractiveFinancialGoalSettingProps> = ({
  onNavigateBack
}) => {
  const [, setLocation] = useLocation();
  const [selectedView, setSelectedView] = useState('national');
  const [goals, setGoals] = useState(initialGoals);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const currentData = currentPerformance[selectedView];

  // New goal form state
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: 'revenue',
    metric: 'totalRevenue',
    targetValue: '',
    timeframe: 'quarterly',
    priority: 'Medium',
    description: '',
    aiAgents: []
  });

  // Calculate goal progress and insights
  const calculateGoalProgress = (goal) => {
    const current = currentData[goal.metric] || goal.currentValue;
    const target = goal.targetValue;
    const progress = Math.max(0, Math.min(100, ((current - goal.currentValue) / (target - goal.currentValue)) * 100));
    return isNaN(progress) ? 0 : progress;
  };

  const getGoalStatus = (goal) => {
    const progress = calculateGoalProgress(goal);
    const daysToDeadline = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    
    if (progress >= 90) return 'On Track';
    if (progress >= 60 && daysToDeadline > 30) return 'On Track';
    if (progress >= 40 && daysToDeadline > 60) return 'In Progress';
    if (daysToDeadline < 30 && progress < 70) return 'At Risk';
    return 'In Progress';
  };

  const getAIRecommendations = (goal) => {
    const recommendations = [];
    const status = getGoalStatus(goal);
    
    if (goal.metric === 'totalEBITDA' && goal.currentValue < 0) {
      recommendations.push({
        agent: 'Financial Intelligence Agent',
        action: 'Deploy cost reduction algorithms across all planning areas',
        impact: 'Potential $800K monthly savings',
        timeframe: '30 days'
      });
      recommendations.push({
        agent: 'Performance Analytics AI',
        action: 'Optimize technician routing to reduce operational costs',
        impact: 'Expected 15% efficiency improvement',
        timeframe: '45 days'
      });
    }
    
    if (goal.metric === 'd2cPaidLabour') {
      recommendations.push({
        agent: 'D2C Marketing Intelligence Agent',
        action: 'Increase digital marketing spend in high-conversion planning areas',
        impact: 'Projected 25% D2C lead increase',
        timeframe: '60 days'
      });
      recommendations.push({
        agent: 'Customer Communication Hub',
        action: 'Implement AI-powered follow-up sequences for lost leads',
        impact: 'Expected 18% conversion rate improvement',
        timeframe: '30 days'
      });
    }
    
    if (goal.metric === 'totalPartsRevenue') {
      recommendations.push({
        agent: 'Parts Prediction Engine',
        action: 'Optimize inventory levels using demand forecasting',
        impact: 'Reduce carrying costs by $200K monthly',
        timeframe: '90 days'
      });
    }
    
    return recommendations;
  };

  const handleCreateGoal = () => {
    const goal = {
      ...newGoal,
      id: Date.now().toString(),
      currentValue: currentData[newGoal.metric] || 0,
      status: 'Not Started',
      progress: 0,
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
      milestones: []
    };
    
    setGoals([...goals, goal]);
    setIsCreatingGoal(false);
    setNewGoal({
      title: '',
      category: 'revenue',
      metric: 'totalRevenue',
      targetValue: '',
      timeframe: 'quarterly',
      priority: 'Medium',
      description: '',
      aiAgents: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Interactive Financial Goal Setting</h1>
          <p className="text-gray-600 mt-1">Set financial targets and track AI agent progress toward goals</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="national">National Goals</SelectItem>
              <SelectItem value="district">South Florida District</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setLocation('/')}>
            ← Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Goal Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground">
              Active financial objectives
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {goals.filter(g => getGoalStatus(g) === 'On Track').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Goals meeting targets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {goals.filter(g => getGoalStatus(g) === 'At Risk').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Goals needing attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(goals.reduce((sum, goal) => sum + calculateGoalProgress(goal), 0) / goals.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall goal completion
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Goals Overview</TabsTrigger>
            <TabsTrigger value="create">Create Goal</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Recommendations</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          </TabsList>
          
          <Button onClick={() => setIsCreatingGoal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>

        {/* Goals Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {goals.map((goal) => {
              const progress = calculateGoalProgress(goal);
              const status = getGoalStatus(goal);
              const category = goalCategories.find(c => c.id === goal.category);
              
              return (
                <Card key={goal.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-${category.color}-50`}>
                          <category.icon className={`w-5 h-5 text-${category.color}-600`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{goal.title}</h3>
                          <p className="text-sm text-gray-600">{category.label}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          status === 'On Track' ? 'default' : 
                          status === 'At Risk' ? 'destructive' : 
                          'secondary'
                        }>
                          {status}
                        </Badge>
                        <Badge variant="outline">
                          {goal.priority}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">{goal.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Current Value</p>
                          <p className="font-semibold">${(currentData[goal.metric] || goal.currentValue).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Target Value</p>
                          <p className="font-semibold text-green-600">${goal.targetValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Deadline</p>
                          <p className="font-semibold">{new Date(goal.deadline).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-2">AI Agents Working on Goal</p>
                        <div className="flex flex-wrap gap-1">
                          {goal.aiAgents.map((agent, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <Brain className="w-3 h-3 mr-1" />
                              {agent}
                            </Badge>
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

        {/* Create Goal */}
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Financial Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input
                    id="goal-title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder="Enter goal title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goal-category">Category</Label>
                  <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {goalCategories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goal-metric">Metric</Label>
                  <Select value={newGoal.metric} onValueChange={(value) => setNewGoal({...newGoal, metric: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="totalRevenue">Total Revenue</SelectItem>
                      <SelectItem value="totalEBITDA">Total EBITDA</SelectItem>
                      <SelectItem value="adjustedEBITDA">Adjusted EBITDA</SelectItem>
                      <SelectItem value="totalLabourRevenue">Total Labour Revenue</SelectItem>
                      <SelectItem value="totalPartsRevenue">Parts Revenue</SelectItem>
                      <SelectItem value="d2cPaidLabour">D2C Labour Revenue</SelectItem>
                      <SelectItem value="b2bPaidLabour">B2B Labour Revenue</SelectItem>
                      <SelectItem value="homeWarrantyCommission">Home Warranty Commission</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goal-target">Target Value</Label>
                  <Input
                    id="goal-target"
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({...newGoal, targetValue: e.target.value})}
                    placeholder="Enter target value"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goal-timeframe">Timeframe</Label>
                  <Select value={newGoal.timeframe} onValueChange={(value) => setNewGoal({...newGoal, timeframe: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeframes.map(timeframe => (
                        <SelectItem key={timeframe.id} value={timeframe.id}>
                          {timeframe.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goal-priority">Priority</Label>
                  <Select value={newGoal.priority} onValueChange={(value) => setNewGoal({...newGoal, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal-description">Description</Label>
                <Textarea
                  id="goal-description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  placeholder="Describe the goal and expected outcomes"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setActiveTab('overview')}>
                  Cancel
                </Button>
                <Button onClick={handleCreateGoal}>
                  <Save className="w-4 h-4 mr-2" />
                  Create Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Recommendations */}
        <TabsContent value="ai-insights" className="space-y-4">
          <div className="grid gap-4">
            {goals.map((goal) => {
              const recommendations = getAIRecommendations(goal);
              
              return (
                <Card key={goal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      <span>AI Recommendations for: {goal.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendations.map((rec, idx) => (
                        <div key={idx} className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Brain className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-blue-900">{rec.agent}</span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{rec.action}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <span className="flex items-center">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  {rec.impact}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {rec.timeframe}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Implement
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Progress Tracking */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid gap-6">
            {goals.map((goal) => {
              const progress = calculateGoalProgress(goal);
              const currentValue = currentData[goal.metric] || goal.currentValue;
              
              return (
                <Card key={goal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{goal.title}</span>
                      <Badge variant="outline">
                        {Math.round(progress)}% Complete
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Current</p>
                          <p className="text-2xl font-bold text-blue-600">
                            ${currentValue.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Target</p>
                          <p className="text-2xl font-bold text-green-600">
                            ${goal.targetValue.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-gray-600">Gap</p>
                          <p className={`text-2xl font-bold ${goal.targetValue - currentValue > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ${Math.abs(goal.targetValue - currentValue).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Overall Progress</span>
                          <span className="text-sm font-medium">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-3" />
                      </div>
                      
                      {goal.milestones && goal.milestones.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">Milestones</h4>
                          <div className="space-y-2">
                            {goal.milestones.map((milestone, idx) => (
                              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${
                                    milestone.status === 'completed' ? 'bg-green-500' :
                                    milestone.status === 'in-progress' ? 'bg-blue-500' :
                                    milestone.status === 'at-risk' ? 'bg-orange-500' : 'bg-gray-300'
                                  }`} />
                                  <div>
                                    <p className="font-medium">{milestone.description}</p>
                                    <p className="text-sm text-gray-600">{new Date(milestone.date).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">${milestone.target.toLocaleString()}</p>
                                  <Badge variant="outline" className="text-xs">
                                    {milestone.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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

export default InteractiveFinancialGoalSetting;