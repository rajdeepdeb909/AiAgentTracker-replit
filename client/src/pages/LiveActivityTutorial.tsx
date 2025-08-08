import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import NavigationBreadcrumbs from '@/components/NavigationBreadcrumbs';
import { 
  Activity, 
  Bot, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Play, 
  Pause,
  ArrowRight,
  Eye,
  MessageSquare,
  FileText,
  TrendingUp,
  Zap,
  Settings,
  Target
} from 'lucide-react';

export default function LiveActivityTutorial() {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Understanding the Live Activity Feed",
      content: "The Live AI Agent Activity Feed is your real-time window into all 26 AI agents working across America's Home Manager platform. This feed shows live activities, approvals, and system-wide coordination.",
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: "AI Agent Actions and Human Oversight",
      content: "AI agents autonomously handle 94.8% of operations, while human coordinators provide oversight for strategic decisions and complex scenarios requiring judgment.",
      icon: <Bot className="w-6 h-6" />
    },
    {
      title: "Approval Workflows",
      content: "Critical decisions like partnerships, budget allocations, and strategic initiatives require human approval. The system presents context, AI recommendations, and impact analysis for informed decision-making.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Real-time Monitoring",
      content: "Track active agents, pending approvals, daily activities, and autonomous execution rates. Monitor system health and intervention points across the entire platform.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const aiAgentRoles = [
    {
      name: "Advanced Scheduling Agent",
      role: "Autonomous scheduling optimization and capacity management",
      humanInteraction: "Escalates complex scheduling conflicts and capacity crisis decisions",
      activities: ["Route optimization", "Technician assignment", "Emergency rescheduling"]
    },
    {
      name: "B2B Intelligence Agent",
      role: "Partnership management and client relationship optimization",
      humanInteraction: "Requests approval for new partnerships and contract negotiations",
      activities: ["Client communication", "Partnership analysis", "Contract optimization"]
    },
    {
      name: "Financial Intelligence Agent",
      role: "Revenue tracking and financial performance analysis",
      humanInteraction: "Flags budget variances and requests approval for financial strategies",
      activities: ["Revenue analysis", "Cost optimization", "Budget monitoring"]
    },
    {
      name: "Technician Recruiting Agent",
      role: "1099 contractor recruitment and onboarding automation",
      humanInteraction: "Seeks approval for recruitment campaigns and compensation packages",
      activities: ["Candidate sourcing", "Skills assessment", "Onboarding coordination"]
    }
  ];

  const workflowExamples = [
    {
      scenario: "Partnership Approval",
      aiAction: "B2B Intelligence Agent identifies $15M partnership opportunity with regional HOA network",
      humanDecision: "Review partnership terms, assess strategic fit, approve/modify/reject proposal",
      outcome: "Strategic partnership activated, expanding service coverage by 40%"
    },
    {
      scenario: "Capacity Crisis",
      aiAction: "Advanced Scheduling Agent detects 2,000+ potential reschedules in Dallas area",
      humanDecision: "Approve emergency contractor deployment and premium rate authorization",
      outcome: "Crisis averted, 89% of jobs completed on schedule"
    },
    {
      scenario: "Recruitment Campaign",
      aiAction: "Technician Recruiting Agent proposes $500K marketing spend for contractor expansion",
      humanDecision: "Review campaign strategy, approve budget allocation and target metrics",
      outcome: "50+ new contractor companies onboarded, 30% capacity increase"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <NavigationBreadcrumbs 
          items={[
            { label: 'Tutorials', href: '#' },
            { label: 'Live AI Agent Activity Feed', href: '/tutorials/live-activity' }
          ]}
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Live AI Agent Activity Feed Tutorial</h1>
          <p className="text-gray-300 text-lg">
            Master the Live Activity Feed to monitor, manage, and optimize AI agent performance across America's Home Manager platform.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-800 grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-agents">AI Agents</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-400" />
                    Real-time Activity Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 p-3 rounded">
                      <div className="text-2xl font-bold text-green-400">26/28</div>
                      <div className="text-sm text-gray-300">Active Agents</div>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded">
                      <div className="text-2xl font-bold text-yellow-400">7</div>
                      <div className="text-sm text-gray-300">Pending Approvals</div>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded">
                      <div className="text-2xl font-bold text-blue-400">1,247</div>
                      <div className="text-sm text-gray-300">Activities Today</div>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded">
                      <div className="text-2xl font-bold text-purple-400">94.8%</div>
                      <div className="text-sm text-gray-300">Autonomous Rate</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    These metrics update in real-time, providing instant visibility into platform performance and AI agent coordination.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-400" />
                    Human-AI Collaboration Model
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Autonomous Operations</span>
                      <Badge variant="secondary" className="bg-green-600">94.8%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Human Oversight</span>
                      <Badge variant="secondary" className="bg-blue-600">5.2%</Badge>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    AI agents handle routine operations while humans focus on strategic decisions, complex problems, and high-value interventions.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Interactive Tutorial Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tutorialSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        currentStep === index
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          currentStep === index ? 'bg-blue-500' : 'bg-gray-600'
                        }`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{step.title}</h3>
                          {currentStep === index && (
                            <p className="text-gray-300 text-sm">{step.content}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-agents" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>AI Agent Roles and Human Interactions</CardTitle>
                <p className="text-gray-300">
                  Understanding how each AI agent operates and when human intervention is required.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {aiAgentRoles.map((agent, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-blue-400">{agent.name}</h3>
                        <Badge variant="outline">AI Agent</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2 flex items-center">
                            <Bot className="w-4 h-4 mr-1" />
                            Autonomous Role
                          </h4>
                          <p className="text-sm text-gray-400">{agent.role}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            Human Interaction
                          </h4>
                          <p className="text-sm text-gray-400">{agent.humanInteraction}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-300 mb-2 flex items-center">
                          <Activity className="w-4 h-4 mr-1" />
                          Key Activities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {agent.activities.map((activity, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-gray-700">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Approval Workflow Examples</CardTitle>
                <p className="text-gray-300">
                  Real scenarios showing AI agent recommendations and human decision-making processes.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {workflowExamples.map((workflow, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-4">
                      <h3 className="font-semibold mb-4 text-green-400">{workflow.scenario}</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-600 p-2 rounded-full">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-blue-400">AI Agent Action</h4>
                            <p className="text-sm text-gray-300">{workflow.aiAction}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <ArrowRight className="w-6 h-6 text-gray-500" />
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="bg-yellow-600 p-2 rounded-full">
                            <Users className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-yellow-400">Human Decision Required</h4>
                            <p className="text-sm text-gray-300">{workflow.humanDecision}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <ArrowRight className="w-6 h-6 text-gray-500" />
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="bg-green-600 p-2 rounded-full">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-green-400">Outcome</h4>
                            <p className="text-sm text-gray-300">{workflow.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-purple-400" />
                    Advanced Monitoring Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">Real-time activity filtering and search</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-4 h-4 text-green-400" />
                      <span className="text-sm">AI agent communication logs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">Audit trail and decision history</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">Performance metrics and KPI tracking</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="w-4 h-4 mr-2" />
                    View Pending Approvals
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Monitor Agent Performance
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Check System Alerts
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Best Practices for Live Activity Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-green-400">Monitoring Guidelines</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Check pending approvals every 2-4 hours</li>
                      <li>• Monitor autonomous execution rates daily</li>
                      <li>• Review agent performance metrics weekly</li>
                      <li>• Set up alerts for critical decisions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-blue-400">Decision-Making Tips</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Review AI recommendations thoroughly</li>
                      <li>• Consider long-term strategic impact</li>
                      <li>• Document decision rationale</li>
                      <li>• Monitor outcomes for learning</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" asChild>
            <a href="/live-activity">Access Live Activity Feed</a>
          </Button>
          <Button asChild>
            <a href="/tutorials/technician-management">Next: Technician Management Tutorial</a>
          </Button>
        </div>
      </div>
    </div>
  );
}