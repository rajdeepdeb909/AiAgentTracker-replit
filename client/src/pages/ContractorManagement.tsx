import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  MapPin, 
  Star, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Clock,
  Award,
  UserCheck,
  FileText,
  Target,
  Gamepad2,
  Trophy,
  Brain
} from "lucide-react";
import { Link } from "wouter";

interface ContractorFirm {
  id: number;
  name: string;
  location: string;
  technicianCount: number;
  specialties: string[];
  rating: number;
  completedJobs: number;
  revenue: string;
  status: 'active' | 'onboarding' | 'review';
}

export default function ContractorManagement() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(res => res.json()),
  });

  // Mock contractor data - in production this would come from API
  const contractorFirms: ContractorFirm[] = [
    {
      id: 1,
      name: "Elite Home Services LLC",
      location: "Dallas, TX",
      technicianCount: 12,
      specialties: ["HVAC", "Electrical"],
      rating: 4.8,
      completedJobs: 234,
      revenue: "$89K",
      status: 'active'
    },
    {
      id: 2,
      name: "Precision Plumbing Co",
      location: "Phoenix, AZ",
      technicianCount: 8,
      specialties: ["Plumbing", "Water Heaters"],
      rating: 4.6,
      completedJobs: 156,
      revenue: "$67K",
      status: 'active'
    },
    {
      id: 3,
      name: "Metro Maintenance Group",
      location: "Chicago, IL",
      technicianCount: 15,
      specialties: ["HVAC", "Plumbing", "Electrical"],
      rating: 4.9,
      completedJobs: 389,
      revenue: "$142K",
      status: 'active'
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

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Building2 className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-white">1099 Contractor Management</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Expanding from W2 employees to include 1099 contractor firms and their technicians 
          for scalable service delivery across all planning areas.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Contractors</p>
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-green-400 text-xs">↑ 43% this quarter</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contractor Technicians</p>
                <p className="text-2xl font-bold text-white">287</p>
                <p className="text-green-400 text-xs">vs 342 W2 employees</p>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Monthly Revenue</p>
                <p className="text-2xl font-bold text-white">$1.2M</p>
                <p className="text-green-400 text-xs">34% from contractors</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-white">4.7</p>
                <p className="text-green-400 text-xs">Quality maintained</p>
              </div>
              <Star className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger
            value="overview"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <Building2 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="recruitment"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <UserCheck className="h-4 w-4" />
            <span>Recruitment</span>
          </TabsTrigger>
          <TabsTrigger
            value="management"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <FileText className="h-4 w-4" />
            <span>Management</span>
          </TabsTrigger>
          <TabsTrigger
            value="integration"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <Target className="h-4 w-4" />
            <span>Integration</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Workforce Composition */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-400" />
                Workforce Composition: W2 vs 1099 Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-300">W2 Employee Technicians</h4>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">342 Technicians</span>
                      <Badge variant="outline" className="text-green-400 border-green-600">
                        54.3%
                      </Badge>
                    </div>
                    <Progress value={54.3} className="mb-2" />
                    <div className="text-xs text-gray-400">
                      Direct employees with full benefits, training, and oversight
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-300">1099 Contractor Technicians</h4>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">287 Technicians</span>
                      <Badge variant="outline" className="text-blue-400 border-blue-600">
                        45.7%
                      </Badge>
                    </div>
                    <Progress value={45.7} className="mb-2" />
                    <div className="text-xs text-gray-400">
                      Independent contractors through 23 partner firms
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Contractor Firms */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-green-400" />
                Top Performing Contractor Firms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractorFirms.map((firm) => (
                  <div key={firm.id} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-5 w-5 text-blue-400" />
                        <div>
                          <h4 className="text-white font-medium">{firm.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <MapPin className="h-3 w-3" />
                            <span>{firm.location}</span>
                            <span>•</span>
                            <span>{firm.technicianCount} techs</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{firm.rating}</span>
                        </div>
                        <div className="text-sm text-gray-400">{firm.completedJobs} jobs</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {firm.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-green-400 font-medium">{firm.revenue}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            firm.status === 'active' ? 'text-green-400 border-green-600' :
                            firm.status === 'onboarding' ? 'text-blue-400 border-blue-600' :
                            'text-yellow-400 border-yellow-600'
                          }`}
                        >
                          {firm.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recruitment Tab - Contractor-focused */}
        <TabsContent value="recruitment" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-blue-400" />
                Contractor Firm Recruitment Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">1. IDENTIFY: Market Research</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Geographic coverage gaps</li>
                    <li>• Specialty skill requirements</li>
                    <li>• Local contractor firm analysis</li>
                    <li>• Capacity and quality assessment</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">2. EVALUATE: Firm Assessment</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Insurance and licensing verification</li>
                    <li>• Technician skill certification</li>
                    <li>• Financial stability review</li>
                    <li>• Customer service standards</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">3. ONBOARD: Integration Process</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Platform training and setup</li>
                    <li>• Quality standards alignment</li>
                    <li>• Payment systems integration</li>
                    <li>• Communication protocols</li>
                  </ul>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-sm font-semibold text-orange-300 mb-2">4. OPTIMIZE: Performance Management</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Job assignment optimization</li>
                    <li>• Quality monitoring systems</li>
                    <li>• Revenue growth tracking</li>
                    <li>• Relationship management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recruitment Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "New Firms This Quarter", value: "8", target: "10", progress: 80 },
                    { metric: "Average Onboarding Time", value: "21 days", target: "18 days", progress: 75 },
                    { metric: "Quality Score (New Firms)", value: "4.6/5", target: "4.5/5", progress: 92 },
                    { metric: "Geographic Coverage", value: "89%", target: "95%", progress: 89 }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">{item.metric}</span>
                        <Badge variant="outline" className="text-white border-gray-600">
                          {item.value}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={item.progress} className="flex-1" />
                        <span className="text-xs text-gray-500">Target: {item.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recruitment Priorities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { area: "Southwest Region (Phoenix, Las Vegas)", urgency: "High", specialties: "HVAC, Electrical" },
                    { area: "Pacific Northwest (Seattle, Portland)", urgency: "Medium", specialties: "Plumbing, General" },
                    { area: "Southeast Expansion", urgency: "Medium", specialties: "All Trades" },
                    { area: "Rural Area Coverage", urgency: "Low", specialties: "General Maintenance" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{item.area}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            item.urgency === 'High' ? 'text-red-400 border-red-600' :
                            item.urgency === 'Medium' ? 'text-yellow-400 border-yellow-600' :
                            'text-green-400 border-green-600'
                          }`}
                        >
                          {item.urgency}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400">{item.specialties}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gamification Integration */}
          <Card className="bg-gradient-to-r from-purple-900 to-blue-900 border-purple-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Gamepad2 className="h-5 w-5 mr-2 text-purple-400" />
                Agent #24: Gamification Intelligence System
              </CardTitle>
              <CardDescription className="text-purple-200">
                AI-powered engagement optimization across all contractor lifecycle stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-purple-800/30 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-300">43%</div>
                  <div className="text-sm text-purple-200">Faster Onboarding</div>
                </div>
                <div className="bg-blue-800/30 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-300">94%</div>
                  <div className="text-sm text-blue-200">Engagement Rate</div>
                </div>
                <div className="bg-green-800/30 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-300">9,525</div>
                  <div className="text-sm text-green-200">Total Participants</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <Link href="/contractor-onboarding-gamification">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Trophy className="h-4 w-4 mr-2" />
                    Onboarding Gamification
                  </Button>
                </Link>
                <Link href="/gamification-agent">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Brain className="h-4 w-4 mr-2" />
                    Full Agent Dashboard
                  </Button>
                </Link>
              </div>
              <div className="text-xs text-purple-200 text-center">
                6 Active Engines • $2.3M Incentive Pool • 89% Avg Engagement
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Management Tab */}
        <TabsContent value="management" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-400" />
                Dual Workforce Management Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-3">W2 Employee Management</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Direct hiring and training programs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Full benefits and career development</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Quality control and standardization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Brand consistency and culture</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-3">1099 Contractor Management</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span>Partnership agreements and SLAs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span>Performance-based compensation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span>Quality monitoring and feedback</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span>Technology integration and support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "Customer Satisfaction", w2: "4.8", contractor: "4.6", trend: "↑" },
                    { metric: "Job Completion Time", w2: "2.3 hrs", contractor: "2.5 hrs", trend: "→" },
                    { metric: "First-Time Fix Rate", w2: "87%", contractor: "82%", trend: "↑" },
                    { metric: "Revenue per Technician", w2: "$4,200", contractor: "$3,800", trend: "↑" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">{item.metric}</span>
                        <span className="text-lg">{item.trend}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-green-400 font-medium">W2: {item.w2}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-400 font-medium">1099: {item.contractor}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Management Priorities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { priority: "Standardize quality metrics across all technicians", status: "In Progress", urgency: "High" },
                    { priority: "Implement unified training certification", status: "Planning", urgency: "High" },
                    { priority: "Optimize contractor payment processing", status: "Complete", urgency: "Medium" },
                    { priority: "Develop contractor performance dashboards", status: "In Progress", urgency: "Medium" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white">{item.priority}</span>
                        <div className="flex space-x-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              item.status === 'Complete' ? 'text-green-400 border-green-600' :
                              item.status === 'In Progress' ? 'text-blue-400 border-blue-600' :
                              'text-yellow-400 border-yellow-600'
                            }`}
                          >
                            {item.status}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              item.urgency === 'High' ? 'text-red-400 border-red-600' :
                              'text-yellow-400 border-yellow-600'
                            }`}
                          >
                            {item.urgency}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integration Tab */}
        <TabsContent value="integration" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-400" />
                Strategic Integration Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                    <h4 className="text-blue-300 font-medium mb-3">Phase 1: Foundation (Q1)</h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Technology platform integration</li>
                      <li>• Legal framework establishment</li>
                      <li>• Quality standards alignment</li>
                      <li>• Payment system setup</li>
                    </ul>
                    <div className="mt-3">
                      <Progress value={85} />
                      <span className="text-xs text-blue-300">85% Complete</span>
                    </div>
                  </div>

                  <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                    <h4 className="text-green-300 font-medium mb-3">Phase 2: Scale (Q2-Q3)</h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Geographic expansion</li>
                      <li>• Contractor firm recruitment</li>
                      <li>• Performance optimization</li>
                      <li>• Training standardization</li>
                    </ul>
                    <div className="mt-3">
                      <Progress value={45} />
                      <span className="text-xs text-green-300">45% Complete</span>
                    </div>
                  </div>

                  <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                    <h4 className="text-purple-300 font-medium mb-3">Phase 3: Optimize (Q4)</h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Advanced analytics implementation</li>
                      <li>• Hybrid workforce optimization</li>
                      <li>• Market leadership positioning</li>
                      <li>• Innovation partnerships</li>
                    </ul>
                    <div className="mt-3">
                      <Progress value={15} />
                      <span className="text-xs text-purple-300">15% Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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