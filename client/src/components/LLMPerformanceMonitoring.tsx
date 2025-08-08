import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Activity,
  Zap,
  Eye,
  Brain,
  MessageSquare
} from "lucide-react";

interface PerformanceMetric {
  name: string;
  current: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  status: 'green' | 'yellow' | 'red';
  lastUpdated: string;
}

interface AgentPerformance {
  agentName: string;
  metrics: PerformanceMetric[];
  overallScore: number;
  dailyTasks: Array<{
    time: string;
    task: string;
    status: 'completed' | 'in-progress' | 'pending' | 'alert';
  }>;
}

export function LLMPerformanceMonitoring() {
  // Simulated real-time data
  const agentPerformances: AgentPerformance[] = [
    {
      agentName: "LLM Recommendation Dominance Agent",
      overallScore: 94.2,
      metrics: [
        { name: "ChatGPT Recommendations", current: 147, target: 200, trend: 'up', status: 'yellow', lastUpdated: '2 min ago' },
        { name: "Perplexity Referrals", current: 89, target: 120, trend: 'up', status: 'yellow', lastUpdated: '5 min ago' },
        { name: "Content Accuracy", current: 96.4, target: 95, trend: 'stable', status: 'green', lastUpdated: '1 min ago' },
        { name: "Response Time", current: 1.8, target: 2.0, trend: 'down', status: 'green', lastUpdated: '3 min ago' }
      ],
      dailyTasks: [
        { time: '6:00 AM', task: 'Knowledge base optimization', status: 'completed' },
        { time: '9:00 AM', task: 'ChatGPT plugin analysis', status: 'completed' },
        { time: '12:00 PM', task: 'Perplexity optimization', status: 'in-progress' },
        { time: '3:00 PM', task: 'Voice assistant testing', status: 'pending' },
        { time: '6:00 PM', task: 'Cross-platform analysis', status: 'pending' }
      ]
    },
    {
      agentName: "AI-Powered B2B Intelligence Agent",
      overallScore: 91.8,
      metrics: [
        { name: "AI Tool Adoption", current: 83.4, target: 85, trend: 'up', status: 'yellow', lastUpdated: '4 min ago' },
        { name: "White-Label Deployments", current: 23, target: 25, trend: 'up', status: 'yellow', lastUpdated: '10 min ago' },
        { name: "Predictive Accuracy", current: 91.8, target: 90, trend: 'stable', status: 'green', lastUpdated: '2 min ago' },
        { name: "Contract Optimization", current: 24.6, target: 22, trend: 'up', status: 'green', lastUpdated: '7 min ago' }
      ],
      dailyTasks: [
        { time: '7:00 AM', task: 'Property manager tool analysis', status: 'completed' },
        { time: '10:00 AM', task: 'White-label optimization', status: 'completed' },
        { time: '1:00 PM', task: 'Client churn predictions', status: 'completed' },
        { time: '4:00 PM', task: 'Proposal generation', status: 'in-progress' },
        { time: '7:00 PM', task: 'Contract optimization delivery', status: 'pending' }
      ]
    },
    {
      agentName: "Hyper-Local LLM Market Intelligence Agent",
      overallScore: 89.3,
      metrics: [
        { name: "Planning Area Dominance", current: 92.7, target: 90, trend: 'up', status: 'green', lastUpdated: '1 min ago' },
        { name: "Local Partnerships", current: 17, target: 15, trend: 'up', status: 'green', lastUpdated: '15 min ago' },
        { name: "Demand Prediction Accuracy", current: 89.3, target: 88, trend: 'stable', status: 'green', lastUpdated: '3 min ago' },
        { name: "Community Engagement", current: 78.9, target: 75, trend: 'up', status: 'green', lastUpdated: '8 min ago' }
      ],
      dailyTasks: [
        { time: '5:00 AM', task: 'Neighborhood demand updates', status: 'completed' },
        { time: '8:00 AM', task: 'Hyper-local content generation', status: 'completed' },
        { time: '11:00 AM', task: 'Municipal AI coordination', status: 'completed' },
        { time: '2:00 PM', task: 'Community platform optimization', status: 'in-progress' },
        { time: '5:00 PM', task: 'Local authority maintenance', status: 'pending' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'text-green-500';
      case 'yellow': return 'text-yellow-500';
      case 'red': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'green': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'yellow': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'red': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Activity className="h-4 w-4 text-blue-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-400" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">LLM Performance Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time monitoring and improvement tracking for LLM marketing agents
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Updated 30 seconds ago
        </Badge>
      </div>

      {/* Performance Zone Indicators */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Green Zone (Optimal)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• LLM recommendation rate: &gt;80%</div>
              <div>• Content accuracy: &gt;95%</div>
              <div>• Conversion rate: &gt;88%</div>
              <div>• Response time: &lt;2s</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 dark:border-yellow-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Yellow Zone (Improvement Needed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• LLM recommendation rate: 60-80%</div>
              <div>• Content accuracy: 85-95%</div>
              <div>• Conversion rate: 70-88%</div>
              <div>• Response time: 2-5s</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Red Zone (Critical Action)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• LLM recommendation rate: &lt;60%</div>
              <div>• Content accuracy: &lt;85%</div>
              <div>• Conversion rate: &lt;70%</div>
              <div>• Response time: &gt;5s</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Tabs */}
      <Tabs defaultValue="llm-dominance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="llm-dominance">LLM Dominance Agent</TabsTrigger>
          <TabsTrigger value="b2b-intelligence">B2B Intelligence Agent</TabsTrigger>
          <TabsTrigger value="local-intelligence">Local Intelligence Agent</TabsTrigger>
        </TabsList>

        {agentPerformances.map((agent, index) => (
          <TabsContent key={index} value={index === 0 ? "llm-dominance" : index === 1 ? "b2b-intelligence" : "local-intelligence"}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Overall Score: <span className="font-semibold text-lg">{agent.overallScore}%</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {agent.metrics.map((metric, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(metric.status)}
                          <span className="text-sm font-medium">{metric.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{metric.current}</span>
                          <TrendingUp className={`h-3 w-3 ${metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500 rotate-180' : 'text-gray-400'}`} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Target: {metric.target}</span>
                        <span>{metric.lastUpdated}</span>
                      </div>
                      <Progress 
                        value={Math.min((metric.current / metric.target) * 100, 100)} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Daily Task Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Daily Operations Schedule
                  </CardTitle>
                  <CardDescription>
                    Today's task progress and monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {agent.dailyTasks.map((task, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        {getTaskStatusIcon(task.status)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{task.time}</span>
                            <Badge 
                              variant={task.status === 'completed' ? 'default' : task.status === 'in-progress' ? 'secondary' : 'outline'}
                              className="text-xs"
                            >
                              {task.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{task.task}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Alerts */}
            {agent.metrics.some(m => m.status === 'yellow' || m.status === 'red') && (
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Performance Alert:</strong> {agent.agentName} has metrics requiring attention. 
                  {agent.metrics.filter(m => m.status === 'yellow').length > 0 && 
                    ` ${agent.metrics.filter(m => m.status === 'yellow').length} metrics in improvement zone.`}
                  {agent.metrics.filter(m => m.status === 'red').length > 0 && 
                    ` ${agent.metrics.filter(m => m.status === 'red').length} metrics require critical action.`}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Performance Improvement Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Automated Improvement Actions
          </CardTitle>
          <CardDescription>
            Real-time optimization and improvement recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-700">Level 1: Real-time Micro-adjustments</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Automatic content refresh when accuracy drops</li>
                <li>• Dynamic prompt optimization</li>
                <li>• Instant response time optimization</li>
                <li>• Real-time competitive positioning</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-yellow-700">Level 2: Daily Strategic Adjustments</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Content strategy pivots</li>
                <li>• Platform prioritization changes</li>
                <li>• Resource allocation optimization</li>
                <li>• Customer journey refinements</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-700">Level 3: Weekly Strategic Overhauls</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Complete strategy assessment</li>
                <li>• New platform integration evaluation</li>
                <li>• Major content architecture changes</li>
                <li>• Comprehensive competitive response</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}