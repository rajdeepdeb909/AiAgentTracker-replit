import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  Target, 
  Activity, 
  CheckCircle, 
  ArrowLeft,
  Star,
  AlertCircle,
  TrendingUp,
  Zap
} from "lucide-react";
import { Link } from "wouter";
import type { Agent } from "@shared/schema";

interface AgentDetailViewProps {
  agent: Agent;
}

export default function AgentDetailView({ agent }: AgentDetailViewProps) {
  const dailyTasks = Array.isArray(agent.dailyTasks) ? agent.dailyTasks : [];
  const evaluationCriteria = agent.evaluationCriteria && typeof agent.evaluationCriteria === 'object' ? agent.evaluationCriteria as any : { primary: [], secondary: [] };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400';
      case 'training': return 'text-yellow-400 border-yellow-400';
      case 'maintenance': return 'text-orange-400 border-orange-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getFrequencyIcon = (frequency: string) => {
    if (frequency.includes('Continuous') || frequency.includes('Real-time')) {
      return <Zap className="w-4 h-4 text-blue-400" />;
    } else if (frequency.includes('Daily')) {
      return <Clock className="w-4 h-4 text-green-400" />;
    } else if (frequency.includes('Weekly')) {
      return <Activity className="w-4 h-4 text-purple-400" />;
    } else {
      return <CheckCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Agent Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-400" />
            {agent.name}
          </h1>
          <p className="text-gray-400 mt-1">{agent.description}</p>
          <div className="flex items-center gap-4 mt-3">
            <Badge variant="outline" className={getStatusColor(agent.status)}>
              {agent.status}
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              {agent.type}
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              {agent.model}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-400">{agent.performance}%</div>
          <div className="text-sm text-gray-400">Performance Score</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-400">{agent.accuracy}%</div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">{agent.responseTime}s</div>
            <div className="text-sm text-gray-400">Response Time</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-400">{agent.dailyInteractions}</div>
            <div className="text-sm text-gray-400">Daily Interactions</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-400">${parseFloat(agent.revenueImpact).toLocaleString()}</div>
            <div className="text-sm text-gray-400">Revenue Impact</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="tasks" className="text-white">Daily Tasks & Frequency</TabsTrigger>
          <TabsTrigger value="evaluation" className="text-white">Evaluation Criteria</TabsTrigger>
        </TabsList>

        {/* Daily Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Daily Operational Tasks
              </CardTitle>
              <CardDescription className="text-gray-400">
                Detailed breakdown of tasks, execution frequency, and timing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyTasks.map((task: any, idx: number) => (
                  <div key={idx} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getFrequencyIcon(task.frequency)}
                        <div>
                          <h4 className="text-white font-medium">{task.task}</h4>
                          <p className="text-gray-400 text-sm">
                            <span className="font-medium">Frequency:</span> {task.frequency}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-gray-300 border-gray-500 whitespace-nowrap">
                        {task.time}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Evaluation Criteria Tab */}
        <TabsContent value="evaluation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primary Criteria */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Primary Evaluation Criteria
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Key performance metrics with highest impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {((evaluationCriteria as any).primary || []).map((criterion: any, idx: number) => (
                  <div key={idx} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{criterion.metric}</h4>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        {criterion.weight}% weight
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Target:</span>
                      <span className="text-green-400 font-medium">{criterion.target}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Secondary Criteria */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Secondary Evaluation Criteria
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Supporting metrics for comprehensive evaluation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {((evaluationCriteria as any).secondary || []).map((criterion: any, idx: number) => (
                  <div key={idx} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{criterion.metric}</h4>
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        {criterion.weight}% weight
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Target:</span>
                      <span className="text-green-400 font-medium">{criterion.target}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Evaluation Summary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                Performance Evaluation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">{agent.performance}%</div>
                  <div className="text-sm text-gray-300">Overall Performance</div>
                  <div className="text-xs text-gray-400 mt-1">Based on all criteria</div>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">{((evaluationCriteria as any).primary || []).length}</div>
                  <div className="text-sm text-gray-300">Primary Metrics</div>
                  <div className="text-xs text-gray-400 mt-1">Core performance indicators</div>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">{((evaluationCriteria as any).secondary || []).length}</div>
                  <div className="text-sm text-gray-300">Secondary Metrics</div>
                  <div className="text-xs text-gray-400 mt-1">Supporting indicators</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}