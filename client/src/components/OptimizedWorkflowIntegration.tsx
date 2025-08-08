import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Target, 
  BarChart3, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  tool: string;
  route: string;
  icon: React.ReactNode;
  status: 'pending' | 'active' | 'completed';
  estimatedTime: string;
  insights: string;
}

interface OptimizedWorkflowIntegrationProps {
  selectedPlanningArea?: string;
  onWorkflowSelect?: (workflowId: string) => void;
}

export const OptimizedWorkflowIntegration: React.FC<OptimizedWorkflowIntegrationProps> = ({
  selectedPlanningArea = 'PA-1',
  onWorkflowSelect
}) => {
  const [activeWorkflow, setActiveWorkflow] = useState<string>('comprehensive-analysis');

  const workflows = {
    'comprehensive-analysis': {
      title: 'Comprehensive Planning Area Analysis',
      description: 'Complete 360° performance analysis workflow',
      steps: [
        {
          id: 'step-1',
          title: 'Planning Area Dashboard Review',
          description: 'Analyze current performance metrics and agent actions',
          tool: 'Planning Area Dashboard',
          route: `/planning-area-agents?area=${selectedPlanningArea}`,
          icon: <Target className="w-4 h-4" />,
          status: 'active' as const,
          estimatedTime: '5-8 minutes',
          insights: 'Current performance: 73%, 12 active agents, $85K revenue impact'
        },
        {
          id: 'step-2', 
          title: 'Prompt Performance Deep Dive',
          description: 'Examine specific metric prompts driving performance',
          tool: 'Prompt Heatmap',
          route: `/prompt-heatmap?area=${selectedPlanningArea}`,
          icon: <BarChart3 className="w-4 h-4" />,
          status: 'pending' as const,
          estimatedTime: '8-12 minutes',
          insights: '23 critical prompts, 8 high-impact optimizations identified'
        },
        {
          id: 'step-3',
          title: 'Business Knowledge Correlation',
          description: 'Cross-reference with operational knowledge base',
          tool: 'Business Knowledge',
          route: `/business-knowledge?area=${selectedPlanningArea}`,
          icon: <MessageSquare className="w-4 h-4" />,
          status: 'pending' as const,
          estimatedTime: '4-6 minutes',
          insights: '127 relevant prompts, 15 critical alerts, 89% system health'
        }
      ]
    },
    'performance-optimization': {
      title: 'Performance Optimization Workflow',
      description: 'Focused on improving underperforming areas',
      steps: [
        {
          id: 'step-1',
          title: 'Root Cause Analysis',
          description: 'Identify performance bottlenecks and failure points',
          tool: 'Planning Area Dashboard',
          route: `/planning-area-agents?area=${selectedPlanningArea}&tab=insights`,
          icon: <AlertTriangle className="w-4 h-4" />,
          status: 'active' as const,
          estimatedTime: '6-10 minutes',
          insights: '3 critical bottlenecks identified in routing and scheduling'
        },
        {
          id: 'step-2',
          title: 'Predictive Target Setting',
          description: 'Set realistic improvement targets with AI predictions',
          tool: 'Planning Area Dashboard',
          route: `/planning-area-agents?area=${selectedPlanningArea}&tab=predictive`,
          icon: <TrendingUp className="w-4 h-4" />,
          status: 'pending' as const,
          estimatedTime: '5-8 minutes',
          insights: '+15% improvement potential over 30 days, 87% confidence'
        },
        {
          id: 'step-3',
          title: 'Action Implementation',
          description: 'Deploy optimization strategies through agent coordination',
          tool: 'Prompt Heatmap',
          route: `/prompt-heatmap?area=${selectedPlanningArea}&mode=predictive`,
          icon: <Zap className="w-4 h-4" />,
          status: 'pending' as const,
          estimatedTime: '3-5 minutes',
          insights: '8 immediate actions queued, 12 agents coordinating'
        }
      ]
    }
  };

  const currentWorkflow = workflows[activeWorkflow as keyof typeof workflows];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'active':
        return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusBadge = (status: 'pending' | 'active' | 'completed') => {
    const variants = {
      completed: 'secondary',
      active: 'default',
      pending: 'outline'
    } as const;
    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Workflow Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-500" />
            Optimized Analysis Workflows
          </CardTitle>
          <p className="text-sm text-gray-600">
            Choose your analysis approach for {selectedPlanningArea}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {Object.entries(workflows).map(([key, workflow]) => (
              <Button
                key={key}
                variant={activeWorkflow === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setActiveWorkflow(key);
                  onWorkflowSelect?.(key);
                }}
                className="flex-1"
              >
                {workflow.title}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Workflow Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentWorkflow.title}</CardTitle>
          <p className="text-sm text-gray-600">{currentWorkflow.description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentWorkflow.steps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    {step.icon}
                  </div>
                  {index < currentWorkflow.steps.length - 1 && (
                    <div className="w-px h-12 bg-gray-200"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      {getStatusBadge(step.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(step.status)}
                      <span className="text-xs text-gray-500">{step.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {step.insights}
                    </div>
                    
                    <Link href={step.route}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                        disabled={step.status === 'completed'}
                      >
                        {step.status === 'active' ? 'Continue' : step.status === 'completed' ? 'Completed' : 'Start'}
                        {step.status !== 'completed' && <ArrowRight className="w-3 h-3 ml-1" />}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Workflow Progress */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Workflow Progress</span>
              <span className="text-sm text-gray-600">
                {currentWorkflow.steps.filter(s => s.status === 'completed').length} of {currentWorkflow.steps.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.round((currentWorkflow.steps.filter(s => s.status === 'completed').length / currentWorkflow.steps.length) * 100)}%`
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Quick Analysis Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href={`/planning-area-agents?area=${selectedPlanningArea}`}>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Area Dashboard
              </Button>
            </Link>
            <Link href={`/prompt-heatmap?area=${selectedPlanningArea}`}>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Prompt Analysis
              </Button>
            </Link>
            <Link href={`/business-knowledge?area=${selectedPlanningArea}`}>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Knowledge Base
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptimizedWorkflowIntegration;