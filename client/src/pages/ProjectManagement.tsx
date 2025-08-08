import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users, 
  Target,
  Zap,
  TrendingUp,
  FileText,
  Settings,
  BarChart3,
  MapPin
} from "lucide-react";

interface Project {
  id: number;
  name: string;
  type: 'strategic' | 'operational' | 'technical';
  status: 'planning' | 'in-progress' | 'review' | 'complete';
  priority: 'high' | 'medium' | 'low';
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  budget: string;
  description: string;
}

export default function ProjectManagement() {
  const [selectedTab, setSelectedTab] = useState("active");

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(res => res.json()),
  });

  // Strategic projects for platform enhancement
  const projects: Project[] = [
    {
      id: 1,
      name: "1099 Contractor Integration Platform",
      type: 'strategic',
      status: 'in-progress',
      priority: 'high',
      progress: 65,
      startDate: '2025-01-15',
      endDate: '2025-04-30',
      team: ['Tech Team', 'Legal', 'Operations'],
      budget: '$280K',
      description: 'Complete platform for managing 1099 contractor firms alongside W2 employees'
    },
    {
      id: 2,
      name: "Advanced Analytics Dashboard",
      type: 'technical',
      status: 'in-progress',
      priority: 'high',
      progress: 40,
      startDate: '2025-01-20',
      endDate: '2025-03-15',
      team: ['Data Team', 'Frontend', 'UX'],
      budget: '$150K',
      description: 'Real-time analytics with predictive insights and AI-powered recommendations'
    },
    {
      id: 3,
      name: "Geographic Expansion Initiative",
      type: 'strategic',
      status: 'planning',
      priority: 'high',
      progress: 25,
      startDate: '2025-02-01',
      endDate: '2025-06-30',
      team: ['Business Dev', 'Operations', 'Marketing'],
      budget: '$500K',
      description: 'Expand to 50 new planning areas across Southwest and Pacific Northwest'
    },
    {
      id: 4,
      name: "Quality Standardization Framework",
      type: 'operational',
      status: 'in-progress',
      priority: 'medium',
      progress: 55,
      startDate: '2025-01-10',
      endDate: '2025-03-31',
      team: ['Quality', 'Training', 'Tech'],
      budget: '$120K',
      description: 'Unified quality standards for both W2 employees and 1099 contractors'
    },
    {
      id: 5,
      name: "AI Agent Performance Optimization",
      type: 'technical',
      status: 'review',
      priority: 'medium',
      progress: 85,
      startDate: '2024-12-01',
      endDate: '2025-02-15',
      team: ['AI Team', 'DevOps'],
      budget: '$95K',
      description: 'Optimize all 23 AI agents for better performance and cost efficiency'
    }
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-green-400 border-green-600';
      case 'in-progress': return 'text-blue-400 border-blue-600';
      case 'review': return 'text-purple-400 border-purple-600';
      case 'planning': return 'text-yellow-400 border-yellow-600';
      default: return 'text-gray-400 border-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 border-red-600';
      case 'medium': return 'text-yellow-400 border-yellow-600';
      case 'low': return 'text-green-400 border-green-600';
      default: return 'text-gray-400 border-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Target className="h-8 w-8 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold text-white">Strategic Project Management</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Managing strategic initiatives across platform development, business expansion, 
          and operational optimization with AI-powered project tracking.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Projects</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-white">12</p>
                  <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                    +3 this month
                  </Badge>
                </div>
              </div>
              <Zap className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">On-Time Delivery</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-white">87%</p>
                  <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                    ↑ 12%
                  </Badge>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Budget Utilization</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-white">73%</p>
                  <Badge variant="outline" className="text-blue-400 border-blue-600 text-xs">
                    On track
                  </Badge>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Team Utilization</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-white">91%</p>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-600 text-xs">
                    High load
                  </Badge>
                </div>
              </div>
              <Users className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger
            value="active"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Zap className="h-4 w-4" />
            <span>Active Projects</span>
          </TabsTrigger>
          <TabsTrigger
            value="roadmap"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Calendar className="h-4 w-4" />
            <span>Roadmap</span>
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Users className="h-4 w-4" />
            <span>Resources</span>
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Active Projects Tab */}
        <TabsContent value="active" className="space-y-6">
          <div className="space-y-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        project.type === 'strategic' ? 'bg-purple-400' :
                        project.type === 'technical' ? 'bg-blue-400' :
                        'bg-green-400'
                      }`} />
                      <CardTitle className="text-white">{project.name}</CardTitle>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant="outline" className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">Progress</span>
                          <span className="text-sm font-medium text-white">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{project.startDate} → {project.endDate}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-300">Budget</span>
                        <div className="text-lg font-medium text-green-400">{project.budget}</div>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-300">Team</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.team.map((member, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        {project.status === 'in-progress' && (
                          <div className="flex items-center space-x-1 text-blue-400">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">In Progress</span>
                          </div>
                        )}
                        {project.status === 'review' && (
                          <div className="flex items-center space-x-1 text-purple-400">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm">Under Review</span>
                          </div>
                        )}
                        {project.status === 'complete' && (
                          <div className="flex items-center space-x-1 text-green-400">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Complete</span>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Roadmap Tab */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                2025 Strategic Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'].map((quarter, qIndex) => (
                  <div key={quarter} className="border-l-2 border-gray-600 pl-6 relative">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-blue-600 rounded-full"></div>
                    <h4 className="text-lg font-semibold text-white mb-3">{quarter}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {qIndex === 0 && (
                        <>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <h5 className="text-white font-medium mb-2">1099 Contractor Platform</h5>
                            <p className="text-gray-400 text-sm mb-2">Complete integration framework</p>
                            <Progress value={65} className="mb-2" />
                            <span className="text-xs text-blue-400">65% Complete</span>
                          </div>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <h5 className="text-white font-medium mb-2">Advanced Analytics</h5>
                            <p className="text-gray-400 text-sm mb-2">Real-time insights dashboard</p>
                            <Progress value={40} className="mb-2" />
                            <span className="text-xs text-blue-400">40% Complete</span>
                          </div>
                        </>
                      )}
                      
                      {qIndex === 1 && (
                        <>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <h5 className="text-white font-medium mb-2">Geographic Expansion</h5>
                            <p className="text-gray-400 text-sm mb-2">50 new planning areas</p>
                            <Progress value={25} className="mb-2" />
                            <span className="text-xs text-yellow-400">Planning Phase</span>
                          </div>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <h5 className="text-white font-medium mb-2">Mobile App Launch</h5>
                            <p className="text-gray-400 text-sm mb-2">Customer and technician apps</p>
                            <Progress value={15} className="mb-2" />
                            <span className="text-xs text-yellow-400">Early Development</span>
                          </div>
                        </>
                      )}
                      
                      {qIndex === 2 && (
                        <>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <h5 className="text-white font-medium mb-2">AI Agent Enhancement</h5>
                            <p className="text-gray-400 text-sm mb-2">Next-gen conversational AI</p>
                            <Progress value={0} className="mb-2" />
                            <span className="text-xs text-gray-400">Planned</span>
                          </div>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <h5 className="text-white font-medium mb-2">IoT Integration</h5>
                            <p className="text-gray-400 text-sm mb-2">Smart home device connectivity</p>
                            <Progress value={0} className="mb-2" />
                            <span className="text-xs text-gray-400">Planned</span>
                          </div>
                        </>
                      )}
                      
                      {qIndex === 3 && (
                        <>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <h5 className="text-white font-medium mb-2">Market Leadership</h5>
                            <p className="text-gray-400 text-sm mb-2">National scale operations</p>
                            <Progress value={0} className="mb-2" />
                            <span className="text-xs text-gray-400">Strategic Planning</span>
                          </div>
                          <div className="bg-gray-900 p-4 rounded-lg">
                            <h5 className="text-white font-medium mb-2">Innovation Lab</h5>
                            <p className="text-gray-400 text-sm mb-2">R&D for future technologies</p>
                            <Progress value={0} className="mb-2" />
                            <span className="text-xs text-gray-400">Concept Phase</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Team Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { team: "Engineering", allocated: 85, capacity: 100, projects: 4 },
                    { team: "Product", allocated: 70, capacity: 80, projects: 3 },
                    { team: "Operations", allocated: 60, capacity: 70, projects: 2 },
                    { team: "Design", allocated: 45, capacity: 50, projects: 2 },
                    { team: "Data", allocated: 90, capacity: 100, projects: 3 }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{item.team}</span>
                        <div className="text-sm text-gray-400">
                          {item.allocated}/{item.capacity} hrs • {item.projects} projects
                        </div>
                      </div>
                      <Progress value={(item.allocated / item.capacity) * 100} />
                      <div className="text-xs text-gray-400 mt-1">
                        {Math.round((item.allocated / item.capacity) * 100)}% utilization
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Budget Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Technology Development", allocated: 450000, spent: 289000, projects: 3 },
                    { category: "Geographic Expansion", allocated: 500000, spent: 125000, projects: 1 },
                    { category: "Operations", allocated: 200000, spent: 143000, projects: 2 },
                    { category: "Marketing", allocated: 150000, spent: 87000, projects: 2 }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{item.category}</span>
                        <div className="text-sm text-gray-400">
                          ${item.projects} projects
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">
                          ${(item.spent/1000).toFixed(0)}K / ${(item.allocated/1000).toFixed(0)}K
                        </span>
                        <span className="text-sm text-green-400">
                          {Math.round((item.spent / item.allocated) * 100)}%
                        </span>
                      </div>
                      <Progress value={(item.spent / item.allocated) * 100} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Project Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "On-Time Delivery Rate", current: "87%", trend: "+12%", period: "vs last quarter" },
                    { metric: "Budget Adherence", current: "91%", trend: "+5%", period: "vs last quarter" },
                    { metric: "Scope Completion", current: "94%", trend: "+8%", period: "vs last quarter" },
                    { metric: "Team Satisfaction", current: "4.6/5", trend: "+0.3", period: "vs last quarter" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">{item.metric}</div>
                          <div className="text-2xl font-bold text-blue-400">{item.current}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-medium">{item.trend}</div>
                          <div className="text-xs text-gray-400">{item.period}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { risk: "Resource Overallocation", level: "High", impact: "Schedule delays", mitigation: "Hire contractors" },
                    { risk: "Technology Dependencies", level: "Medium", impact: "Integration issues", mitigation: "Parallel development" },
                    { risk: "Market Competition", level: "Medium", impact: "Customer acquisition", mitigation: "Accelerate features" },
                    { risk: "Regulatory Changes", level: "Low", impact: "Compliance costs", mitigation: "Monitor regulations" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium text-sm">{item.risk}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            item.level === 'High' ? 'text-red-400 border-red-600' :
                            item.level === 'Medium' ? 'text-yellow-400 border-yellow-600' :
                            'text-green-400 border-green-600'
                          }`}
                        >
                          {item.level}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">Impact: {item.impact}</div>
                      <div className="text-xs text-blue-400">Mitigation: {item.mitigation}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Button>
      </div>
    </div>
  );
}