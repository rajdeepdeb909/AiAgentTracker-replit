import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NavigationBreadcrumbs from '@/components/NavigationBreadcrumbs';
import { 
  Users, 
  Bot, 
  UserCheck, 
  TrendingUp, 
  Clock, 
  Award,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Target,
  BarChart3,
  BookOpen,
  DollarSign,
  MapPin,
  Calendar,
  Zap,
  Settings
} from 'lucide-react';

export default function TechnicianManagementTutorial() {
  const [currentModule, setCurrentModule] = useState(0);

  const managementModules = [
    {
      title: "Technician Lifecycle Management",
      description: "Complete overview of technician recruitment, onboarding, training, and retention processes",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "AI-Powered Performance Tracking",
      description: "Understanding how AI agents monitor, analyze, and optimize technician performance",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: "1099 Contractor vs W2 Employee Management",
      description: "Dual workforce optimization strategies and management approaches",
      icon: <UserCheck className="w-6 h-6" />
    },
    {
      title: "Human-AI Collaboration in Technician Support",
      description: "How human coordinators work with AI agents to support technician success",
      icon: <Bot className="w-6 h-6" />
    }
  ];

  const aiAgentFunctions = [
    {
      agent: "Technician Recruiting Agent",
      primaryFunction: "Automated candidate sourcing and initial screening",
      humanCollaboration: "Final interview decisions and cultural fit assessment",
      keyActivities: [
        "Skills-based candidate matching",
        "Automated application screening",
        "Market rate analysis",
        "Recruitment campaign optimization"
      ],
      metrics: ["Candidate quality score", "Time-to-hire", "Recruitment cost per hire"]
    },
    {
      agent: "Technician Training & Development Agent",
      primaryFunction: "Personalized training programs and skill development tracking",
      humanCollaboration: "Complex training scenario design and mentorship programs",
      keyActivities: [
        "Individual learning path creation",
        "Skill gap analysis",
        "Certification tracking",
        "Performance-based training recommendations"
      ],
      metrics: ["Training completion rate", "Skill advancement", "Certification compliance"]
    },
    {
      agent: "Technician Retention Intelligence Agent",
      primaryFunction: "Predictive retention analytics and intervention strategies",
      humanCollaboration: "Personal relationship building and career counseling",
      keyActivities: [
        "Retention risk prediction",
        "Satisfaction analysis",
        "Career path planning",
        "Compensation optimization"
      ],
      metrics: ["Retention rate", "Satisfaction scores", "Career progression rate"]
    },
    {
      agent: "Quality Assurance Inspector",
      primaryFunction: "Automated quality monitoring and standards enforcement",
      humanCollaboration: "Complex quality issues and coaching interventions",
      keyActivities: [
        "Work quality assessment",
        "Customer feedback analysis",
        "Performance coaching alerts",
        "Standards compliance monitoring"
      ],
      metrics: ["Quality scores", "Customer satisfaction", "Compliance rate"]
    }
  ];

  const workforceStrategies = [
    {
      category: "W2 Employee Management",
      description: "Full-time employees with comprehensive benefits and career development",
      advantages: ["Deep company culture integration", "Long-term skill development", "Consistent quality standards"],
      aiSupport: "Performance tracking, career pathing, and retention optimization",
      humanRole: "Leadership development, mentoring, and strategic career planning"
    },
    {
      category: "1099 Contractor Management", 
      description: "Independent contractors providing flexible capacity and specialized skills",
      advantages: ["Rapid scaling capability", "Specialized expertise", "Cost flexibility"],
      aiSupport: "Performance monitoring, quality assurance, and network optimization",
      humanRole: "Relationship management, complex issue resolution, and strategic partnerships"
    }
  ];

  const magikButtonUseCases = [
    {
      title: "Instant Schedule Optimization",
      scenario: "Technician requests schedule change for family emergency",
      aiAction: "Advanced Scheduling Agent automatically finds optimal replacement and adjusts routes",
      humanImpact: "Reduces stress and demonstrates company support for work-life balance",
      outcome: "100% job coverage maintained, technician loyalty increased"
    },
    {
      title: "Skills-Based Advancement",
      scenario: "Technician completes HVAC certification",
      aiAction: "Training Agent updates skill profile and routes higher-value jobs automatically",
      humanImpact: "Immediate recognition and income increase for skill development",
      outcome: "15% average pay increase, higher job satisfaction"
    },
    {
      title: "Real-Time Performance Support",
      scenario: "Technician encounters complex diagnostic challenge",
      aiAction: "HVAC Diagnostics AI provides instant troubleshooting guidance and expert consultation",
      humanImpact: "Confident problem-solving without delays or callback embarrassment",
      outcome: "90% first-call resolution rate, reduced stress"
    },
    {
      title: "Proactive Retention Intervention",
      scenario: "AI detects early signs of technician disengagement",
      aiAction: "Retention Intelligence Agent triggers personalized intervention workflow",
      humanImpact: "Timely support and career guidance before issues escalate",
      outcome: "40% reduction in turnover rate"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <NavigationBreadcrumbs 
          items={[
            { label: 'Tutorials', href: '#' },
            { label: 'Technician Management', href: '/tutorials/technician-management' }
          ]}
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Technician Management Tutorial</h1>
          <p className="text-gray-300 text-lg">
            Master comprehensive technician management through AI-powered insights and human-centered leadership approaches.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-800 grid grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-agents">AI Agents</TabsTrigger>
            <TabsTrigger value="workforce">Workforce Strategy</TabsTrigger>
            <TabsTrigger value="magik-button">Magik Button</TabsTrigger>
            <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-400" />
                    Technician Management Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 p-3 rounded">
                      <div className="text-2xl font-bold text-green-400">1,730</div>
                      <div className="text-sm text-gray-300">Active Technicians</div>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded">
                      <div className="text-2xl font-bold text-blue-400">430</div>
                      <div className="text-sm text-gray-300">Service Areas</div>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded">
                      <div className="text-2xl font-bold text-purple-400">50+</div>
                      <div className="text-sm text-gray-300">Contractor Companies</div>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded">
                      <div className="text-2xl font-bold text-yellow-400">92%</div>
                      <div className="text-sm text-gray-300">Retention Rate</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Comprehensive technician management across W2 employees and 1099 contractors with AI-powered optimization.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="w-5 h-5 mr-2 text-green-400" />
                    AI-Human Collaboration Model
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Automated Management</span>
                      <Badge variant="secondary" className="bg-green-600">87%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Human Leadership</span>
                      <Badge variant="secondary" className="bg-blue-600">13%</Badge>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    AI handles routine management tasks while humans focus on leadership, mentoring, and strategic development.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Management Process Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {managementModules.map((module, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        currentModule === index
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                      }`}
                      onClick={() => setCurrentModule(index)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          currentModule === index ? 'bg-blue-500' : 'bg-gray-600'
                        }`}>
                          {module.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{module.title}</h3>
                          {currentModule === index && (
                            <p className="text-gray-300 text-sm">{module.description}</p>
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
                <CardTitle>AI Agent Functions in Technician Management</CardTitle>
                <p className="text-gray-300">
                  Understanding how AI agents support technician success and when human intervention adds value.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {aiAgentFunctions.map((agent, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-blue-400 text-lg">{agent.agent}</h3>
                        <Badge variant="outline">AI Agent</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2 flex items-center">
                            <Bot className="w-4 h-4 mr-1" />
                            Primary AI Function
                          </h4>
                          <p className="text-sm text-gray-400">{agent.primaryFunction}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            Human Collaboration
                          </h4>
                          <p className="text-sm text-gray-400">{agent.humanCollaboration}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-1" />
                            Key Activities
                          </h4>
                          <div className="space-y-1">
                            {agent.keyActivities.map((activity, idx) => (
                              <div key={idx} className="text-sm text-gray-400 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                                {activity}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2 flex items-center">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Success Metrics
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {agent.metrics.map((metric, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-gray-700">
                                {metric}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workforce" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Dual Workforce Management Strategy</CardTitle>
                <p className="text-gray-300">
                  Optimizing both W2 employees and 1099 contractors for maximum flexibility and performance.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {workforceStrategies.map((strategy, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-4">
                      <h3 className="font-semibold text-green-400 text-lg mb-2">{strategy.category}</h3>
                      <p className="text-gray-300 mb-4">{strategy.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Key Advantages
                          </h4>
                          <div className="space-y-1">
                            {strategy.advantages.map((advantage, idx) => (
                              <div key={idx} className="text-sm text-gray-400 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                                {advantage}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-300 mb-2 flex items-center">
                            <Bot className="w-4 h-4 mr-1" />
                            AI Support
                          </h4>
                          <p className="text-sm text-gray-400">{strategy.aiSupport}</p>
                          
                          <h4 className="font-medium text-gray-300 mt-3 mb-1 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            Human Role
                          </h4>
                          <p className="text-sm text-gray-400">{strategy.humanRole}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="magik-button" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Magik Button: Technician Empowerment Framework
                </CardTitle>
                <p className="text-gray-300">
                  Instant AI-powered solutions that make technicians feel supported, valued, and empowered.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {magikButtonUseCases.map((useCase, index) => (
                    <div key={index} className="border border-gray-600 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-400 text-lg mb-3">{useCase.title}</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-600 p-2 rounded-full">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-blue-400">Scenario</h4>
                            <p className="text-sm text-gray-300">{useCase.scenario}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <ArrowRight className="w-6 h-6 text-gray-500" />
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="bg-green-600 p-2 rounded-full">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-green-400">AI-Powered Solution</h4>
                            <p className="text-sm text-gray-300">{useCase.aiAction}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <ArrowRight className="w-6 h-6 text-gray-500" />
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="bg-purple-600 p-2 rounded-full">
                            <Users className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-purple-400">Human Impact</h4>
                            <p className="text-sm text-gray-300">{useCase.humanImpact}</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-700/50 p-3 rounded">
                          <h4 className="font-medium text-yellow-400 mb-1">Outcome</h4>
                          <p className="text-sm text-gray-300">{useCase.outcome}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="best-practices" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                    Management Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-green-400">Daily Operations</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Monitor technician performance metrics in real-time</li>
                      <li>• Review AI-generated coaching recommendations</li>
                      <li>• Address escalated issues within 2 hours</li>
                      <li>• Conduct brief check-ins with struggling technicians</li>
                    </ul>
                    
                    <h3 className="font-semibold text-blue-400 mt-4">Weekly Activities</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Review retention risk assessments</li>
                      <li>• Plan career development conversations</li>
                      <li>• Analyze training completion rates</li>
                      <li>• Celebrate achievements and milestones</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-400" />
                    Success Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-700/50 p-3 rounded text-center">
                        <div className="text-xl font-bold text-green-400">92%</div>
                        <div className="text-xs text-gray-300">Retention Rate</div>
                      </div>
                      <div className="bg-gray-700/50 p-3 rounded text-center">
                        <div className="text-xl font-bold text-blue-400">4.8/5</div>
                        <div className="text-xs text-gray-300">Satisfaction Score</div>
                      </div>
                      <div className="bg-gray-700/50 p-3 rounded text-center">
                        <div className="text-xl font-bold text-purple-400">89%</div>
                        <div className="text-xs text-gray-300">Training Completion</div>
                      </div>
                      <div className="bg-gray-700/50 p-3 rounded text-center">
                        <div className="text-xl font-bold text-yellow-400">15%</div>
                        <div className="text-xs text-gray-300">Annual Growth</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-300">Key Performance Indicators</h4>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>• First-call resolution rate: 90%+</div>
                        <div>• Customer satisfaction: 4.7/5 average</div>
                        <div>• Safety incident rate: &lt;0.1%</div>
                        <div>• Revenue per technician: 15% YoY growth</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Quick Action Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <Button variant="outline" className="justify-start h-auto p-3">
                    <div className="text-left">
                      <div className="flex items-center mb-1">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="font-medium">Team Overview</span>
                      </div>
                      <div className="text-xs text-gray-400">View all technicians</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto p-3">
                    <div className="text-left">
                      <div className="flex items-center mb-1">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        <span className="font-medium">Performance</span>
                      </div>
                      <div className="text-xs text-gray-400">Metrics & analytics</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto p-3">
                    <div className="text-left">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="font-medium">Scheduling</span>
                      </div>
                      <div className="text-xs text-gray-400">Optimize assignments</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto p-3">
                    <div className="text-left">
                      <div className="flex items-center mb-1">
                        <BookOpen className="w-4 h-4 mr-2" />
                        <span className="font-medium">Training</span>
                      </div>
                      <div className="text-xs text-gray-400">Development programs</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" asChild>
            <a href="/technician-management">Access Technician Management</a>
          </Button>
          <Button asChild>
            <a href="/tutorials/live-activity">Previous: Live Activity Tutorial</a>
          </Button>
        </div>
      </div>
    </div>
  );
}