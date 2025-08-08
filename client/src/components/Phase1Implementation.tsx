import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlayCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Phone,
  Wind,
  Refrigerator,
  Waves,
  ChefHat,
  AlertTriangle,
  TrendingUp,
  Settings,
  Users,
  Target,
  Zap,
  Calendar,
  Activity
} from "lucide-react";

export default function Phase1Implementation() {
  const [activeDeployment, setActiveDeployment] = useState("routing");

  // Phase 1 Implementation Status
  const phase1Initiatives = [
    {
      id: "routing",
      name: "Intelligent Call Routing Optimization",
      status: "Active",
      progress: 85,
      timeline: "Week 1",
      revenue: "$35,721",
      description: "AI classifies calls by appliance type and routes to specialized technicians",
      currentMetrics: {
        holdTimeReduction: "67%",
        customerSatisfaction: "+23%",
        dropoutReduction: "2.3% → 1.6%"
      },
      implementation: [
        { step: "Deploy NLP call classification", status: "Complete", duration: "2 days" },
        { step: "Integrate appliance routing algorithms", status: "Complete", duration: "3 days" },
        { step: "Real-time technician matching", status: "In Progress", duration: "2 days" },
        { step: "Performance monitoring setup", status: "Pending", duration: "1 day" }
      ],
      serviceAreas: ["All Services"],
      impact: "Immediate reduction in customer wait times and improved call resolution"
    },
    {
      id: "hvac",
      name: "HVAC Emergency Response Optimization",
      status: "Testing",
      progress: 65,
      timeline: "Week 2",
      revenue: "$67,250",
      description: "Seasonal demand prediction and emergency response for heating/cooling failures",
      currentMetrics: {
        frictionReduction: "45%",
        customerSatisfaction: "+31%", 
        dropoutReduction: "16.4% → 9.0%"
      },
      implementation: [
        { step: "Weather-based demand forecasting", status: "Complete", duration: "3 days" },
        { step: "Emergency technician pool setup", status: "In Progress", duration: "4 days" },
        { step: "Transparent emergency pricing", status: "Testing", duration: "2 days" },
        { step: "Customer communication flows", status: "Pending", duration: "3 days" }
      ],
      serviceAreas: ["HVAC Systems"],
      impact: "Faster emergency response and transparent pricing for urgent HVAC issues"
    },
    {
      id: "diagnostics",
      name: "Appliance Diagnostic Simplification",
      status: "Development",
      progress: 40,
      timeline: "Week 1",
      revenue: "$24,529",
      description: "Visual diagnostic tools guide customers through appliance problem identification",
      currentMetrics: {
        assessmentFriction: "-52%",
        problemIdentification: "Faster",
        technicianPreparation: "Better"
      },
      implementation: [
        { step: "Visual symptom matching interface", status: "Development", duration: "4 days" },
        { step: "Appliance troubleshooting flows", status: "Planning", duration: "3 days" },
        { step: "Technician dispatch integration", status: "Pending", duration: "2 days" },
        { step: "Customer feedback collection", status: "Pending", duration: "1 day" }
      ],
      serviceAreas: ["Refrigerators", "Washers", "Dryers"],
      impact: "Simplified problem assessment leading to better service preparation"
    }
  ];

  // Real-time Implementation Metrics
  const implementationMetrics = [
    {
      metric: "Revenue Recovery Progress",
      current: "$89,300",
      target: "$127,500",
      percentage: 70,
      trend: "up",
      timeframe: "2 weeks"
    },
    {
      metric: "Customer Dropout Reduction",
      current: "4.2%",
      target: "7.8%",
      percentage: 54,
      trend: "up",
      timeframe: "Daily average"
    },
    {
      metric: "Implementation Completion",
      current: "63%",
      target: "100%",
      percentage: 63,
      trend: "up",
      timeframe: "Phase 1 progress"
    },
    {
      metric: "ROI Achievement",
      current: "187%",
      target: "310%",
      percentage: 60,
      trend: "up",
      timeframe: "Current period"
    }
  ];

  // Live Deployment Activity
  const deploymentActivity = [
    {
      time: "10 minutes ago",
      activity: "HVAC emergency routing algorithm deployed",
      system: "Call Routing Engine",
      impact: "3 emergency calls successfully routed",
      status: "success"
    },
    {
      time: "25 minutes ago", 
      activity: "Refrigerator diagnostic flow tested",
      system: "Appliance Diagnostics",
      impact: "92% accuracy in problem identification",
      status: "success"
    },
    {
      time: "1 hour ago",
      activity: "Weather-based demand forecasting activated",
      system: "HVAC Optimization",
      impact: "Predicted 15% demand increase for tomorrow",
      status: "success"
    },
    {
      time: "2 hours ago",
      activity: "Technician specialization matching live",
      system: "Call Routing Engine", 
      impact: "Average routing time reduced to 12 seconds",
      status: "success"
    },
    {
      time: "3 hours ago",
      activity: "Natural language processing enhancement",
      system: "Call Classification",
      impact: "96% accuracy in appliance type detection",
      status: "success"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-600";
      case "Testing": return "bg-yellow-600";
      case "Development": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "text-green-400";
      case "In Progress": return "text-yellow-400";
      case "Testing": return "text-blue-400";
      case "Development": return "text-purple-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <PlayCircle className="h-6 w-6 mr-3 text-green-400" />
            Phase 1 Implementation: Immediate Wins
          </h2>
          <p className="text-gray-400 mt-1">
            2-week sprint to recover $127,500 through intelligent routing and HVAC optimization
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-green-400">$89,300</div>
          <div className="text-sm text-gray-400">Revenue Recovered So Far</div>
          <Badge className="bg-green-600 mt-1">70% Complete</Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {implementationMetrics.map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{metric.current}</div>
                <div className="text-sm text-gray-400 mb-2">{metric.metric}</div>
                <Progress value={metric.percentage} className="mb-2" />
                <div className="text-xs text-gray-400">
                  Target: {metric.target} • {metric.timeframe}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeDeployment} onValueChange={setActiveDeployment} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="routing" className="data-[state=active]:bg-green-600">
            <Phone className="h-4 w-4 mr-2" />
            Call Routing
          </TabsTrigger>
          <TabsTrigger value="hvac" className="data-[state=active]:bg-green-600">
            <Wind className="h-4 w-4 mr-2" />
            HVAC Emergency
          </TabsTrigger>
          <TabsTrigger value="diagnostics" className="data-[state=active]:bg-green-600">
            <Settings className="h-4 w-4 mr-2" />
            Diagnostics
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-green-600">
            <Activity className="h-4 w-4 mr-2" />
            Live Monitoring
          </TabsTrigger>
        </TabsList>

        {/* Call Routing Tab */}
        <TabsContent value="routing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-green-400" />
                    Intelligent Call Routing
                  </span>
                  <Badge className="bg-green-600">85% Complete</Badge>
                </CardTitle>
                <CardDescription>
                  AI-powered call classification and technician specialization matching
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">67%</div>
                    <div className="text-xs text-gray-400">Hold Time Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">96%</div>
                    <div className="text-xs text-gray-400">Classification Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">12s</div>
                    <div className="text-xs text-gray-400">Avg Routing Time</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Implementation Progress</h4>
                  <div className="space-y-3">
                    {phase1Initiatives[0].implementation.map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className={`h-4 w-4 mr-2 ${getStepStatusColor(step.status)}`} />
                          <span className="text-sm text-white">{step.step}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">{step.duration}</Badge>
                          <Badge className={`text-xs ${
                            step.status === 'Complete' ? 'bg-green-600' :
                            step.status === 'In Progress' ? 'bg-yellow-600' : 'bg-gray-600'
                          }`}>
                            {step.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-400" />
                  Service Area Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { area: "Refrigerators", calls: 342, improvement: "+23%", icon: Refrigerator },
                    { area: "Washers/Dryers", calls: 289, improvement: "+19%", icon: Waves },
                    { area: "HVAC Systems", calls: 234, improvement: "+31%", icon: Wind },
                    { area: "Kitchen Appliances", calls: 198, improvement: "+15%", icon: ChefHat }
                  ].map((area, idx) => {
                    const IconComponent = area.icon;
                    return (
                      <div key={idx} className="bg-gray-900 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <IconComponent className="h-4 w-4 mr-2 text-blue-400" />
                            <span className="text-sm text-white">{area.area}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-green-400">{area.improvement}</div>
                            <div className="text-xs text-gray-400">{area.calls} calls today</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-green-900/30 p-3 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">$35,721</div>
                    <div className="text-sm text-green-200">Revenue Recovery Achieved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* HVAC Emergency Tab */}
        <TabsContent value="hvac" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <Wind className="h-5 w-5 mr-2 text-blue-400" />
                    HVAC Emergency Optimization
                  </span>
                  <Badge className="bg-yellow-600">65% Complete</Badge>
                </CardTitle>
                <CardDescription>
                  Seasonal demand prediction and transparent emergency response
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">45%</div>
                    <div className="text-xs text-gray-400">Friction Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">31%</div>
                    <div className="text-xs text-gray-400">Satisfaction Increase</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">9.0%</div>
                    <div className="text-xs text-gray-400">Target Dropout Rate</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Implementation Progress</h4>
                  <div className="space-y-3">
                    {phase1Initiatives[1].implementation.map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className={`h-4 w-4 mr-2 ${getStepStatusColor(step.status)}`} />
                          <span className="text-sm text-white">{step.step}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">{step.duration}</Badge>
                          <Badge className={`text-xs ${
                            step.status === 'Complete' ? 'bg-green-600' :
                            step.status === 'In Progress' ? 'bg-yellow-600' :
                            step.status === 'Testing' ? 'bg-blue-600' : 'bg-gray-600'
                          }`}>
                            {step.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                  Emergency Response Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-red-900/30 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-red-200">Critical HVAC Calls Today</span>
                      <span className="text-lg font-bold text-red-400">23</span>
                    </div>
                    <div className="text-xs text-red-300 mt-1">Average response time: 47 minutes</div>
                  </div>

                  <div className="bg-yellow-900/30 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-yellow-200">Weather Impact Forecast</span>
                      <span className="text-lg font-bold text-yellow-400">+15%</span>
                    </div>
                    <div className="text-xs text-yellow-300 mt-1">Demand increase predicted for tomorrow</div>
                  </div>

                  <div className="bg-green-900/30 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-200">Emergency Pool Utilization</span>
                      <span className="text-lg font-bold text-green-400">87%</span>
                    </div>
                    <div className="text-xs text-green-300 mt-1">Optimal technician allocation achieved</div>
                  </div>
                </div>

                <div className="bg-blue-900/30 p-3 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">$67,250</div>
                    <div className="text-sm text-blue-200">Target Revenue Recovery</div>
                    <Progress value={45} className="mt-2" />
                    <div className="text-xs text-blue-300 mt-1">45% progress toward target</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Diagnostics Tab */}
        <TabsContent value="diagnostics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-purple-400" />
                    Appliance Diagnostic Tools
                  </span>
                  <Badge className="bg-blue-600">40% Complete</Badge>
                </CardTitle>
                <CardDescription>
                  Visual diagnostic interfaces for refrigerators, washers, and dryers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">52%</div>
                    <div className="text-xs text-gray-400">Assessment Friction Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">92%</div>
                    <div className="text-xs text-gray-400">Problem ID Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">3.2min</div>
                    <div className="text-xs text-gray-400">Avg Assessment Time</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Development Progress</h4>
                  <div className="space-y-3">
                    {phase1Initiatives[2].implementation.map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className={`h-4 w-4 mr-2 ${getStepStatusColor(step.status)}`} />
                          <span className="text-sm text-white">{step.step}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">{step.duration}</Badge>
                          <Badge className={`text-xs ${
                            step.status === 'Development' ? 'bg-purple-600' :
                            step.status === 'Planning' ? 'bg-blue-600' : 'bg-gray-600'
                          }`}>
                            {step.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  Diagnostic Tool Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { appliance: "Refrigerators", tests: 127, accuracy: "94%", time: "2.8min" },
                    { appliance: "Washers", tests: 98, accuracy: "91%", time: "3.1min" },
                    { appliance: "Dryers", tests: 84, accuracy: "89%", time: "3.6min" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-white">{item.appliance}</span>
                        <Badge className="bg-green-600 text-xs">{item.accuracy}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-gray-400">Tests: {item.tests}</div>
                        <div className="text-gray-400">Avg Time: {item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-purple-900/30 p-3 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">$24,529</div>
                    <div className="text-sm text-purple-200">Revenue Recovery Target</div>
                    <Progress value={40} className="mt-2" />
                    <div className="text-xs text-purple-300 mt-1">40% development complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Live Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-400" />
                Live Implementation Activity
              </CardTitle>
              <CardDescription>
                Real-time deployment progress and system performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deploymentActivity.map((activity, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white font-medium">{activity.activity}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {activity.system} • {activity.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-600 mb-1">Success</Badge>
                      <div className="text-xs text-green-400">{activity.impact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-center">System Health</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">98.7%</div>
                <div className="text-sm text-gray-400">Uptime</div>
                <div className="text-xs text-green-300 mt-2">All systems operational</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-center">Response Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">147ms</div>
                <div className="text-sm text-gray-400">Average API Response</div>
                <div className="text-xs text-blue-300 mt-2">23% faster than baseline</div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-center">Active Users</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">1,247</div>
                <div className="text-sm text-gray-400">Concurrent Sessions</div>
                <div className="text-xs text-purple-300 mt-2">Peak capacity: 85%</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}