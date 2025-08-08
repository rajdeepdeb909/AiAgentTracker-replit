import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertTriangle,
  TrendingDown,
  Clock,
  DollarSign,
  Users,
  Target,
  Zap,
  Brain,
  CheckCircle,
  XCircle,
  ArrowRight,
  BarChart3,
  Filter,
  RefreshCw,
  Lightbulb
} from "lucide-react";
import { useAnimatedTooltip } from "@/components/AnimatedMetricsTooltip";
import ServiceAreaFrictionAnalysis from "@/components/ServiceAreaFrictionAnalysis";
import RevenueRecoveryImplementation from "@/components/RevenueRecoveryImplementation";

export default function CustomerSchedulingFrictionAnalyzer() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [selectedFrictionType, setSelectedFrictionType] = useState("all");
  
  const { showTooltip, hideTooltip, TooltipComponent } = useAnimatedTooltip();

  // Friction Point Analysis Data
  const frictionPoints = [
    {
      step: "Initial Contact",
      stepNumber: 1,
      dropoutRate: 2.3,
      affectedCalls: 138,
      revenueImpact: "$53,406",
      primaryFrictions: [
        { issue: "Long hold times", percentage: 45.2, calls: 62, avgLoss: "$387", serviceType: "All Services" },
        { issue: "Complex phone menu", percentage: 28.1, calls: 39, avgLoss: "$387", serviceType: "All Services" },
        { issue: "Call disconnections", percentage: 26.7, calls: 37, avgLoss: "$387", serviceType: "All Services" }
      ],
      aiSolutions: [
        "Intelligent call routing reduces hold time by 67%",
        "Natural language processing eliminates menu navigation",
        "Automatic callback system prevents disconnect losses"
      ]
    },
    {
      step: "Service Need Assessment",
      stepNumber: 2,
      dropoutRate: 8.7,
      affectedCalls: 487,
      revenueImpact: "$188,469",
      primaryFrictions: [
        { issue: "Unclear appliance problem description (refrigerators, washers, dryers)", percentage: 34.5, calls: 168, avgLoss: "$387", serviceType: "Major Appliances" },
        { issue: "HVAC system complexity confusion", percentage: 31.2, calls: 152, avgLoss: "$387", serviceType: "HVAC" },
        { issue: "Kitchen appliance technical jargon (dishwashers, stoves, microwaves)", percentage: 34.3, calls: 167, avgLoss: "$387", serviceType: "Kitchen Appliances" }
      ],
      aiSolutions: [
        "Appliance-specific visual diagnostic tools for refrigerators, washers, dryers with symptom matching",
        "HVAC system guided troubleshooting with temperature and airflow analysis",
        "Kitchen appliance simplified assessment for dishwashers, stoves/ovens, microwaves"
      ]
    },
    {
      step: "Availability Selection",
      stepNumber: 3,
      dropoutRate: 15.4,
      affectedCalls: 775,
      revenueImpact: "$299,925",
      primaryFrictions: [
        { issue: "Limited time slots", percentage: 38.9, calls: 301, avgLoss: "$387", serviceType: "All Services" },
        { issue: "Inconvenient scheduling windows", percentage: 35.7, calls: 277, avgLoss: "$387", serviceType: "All Services" },
        { issue: "No same-day availability", percentage: 25.4, calls: 197, avgLoss: "$387", serviceType: "Emergency HVAC" }
      ],
      aiSolutions: [
        "Dynamic scheduling optimizes technician routes",
        "Customer preference learning predicts ideal times",
        "Emergency slot allocation for urgent needs"
      ]
    },
    {
      step: "Pricing Transparency",
      stepNumber: 4,
      dropoutRate: 12.8,
      affectedCalls: 640,
      revenueImpact: "$247,680",
      primaryFrictions: [
        { issue: "Unclear pricing structure", percentage: 42.1, calls: 269, avgLoss: "$387", serviceType: "All Services" },
        { issue: "Hidden fees concern", percentage: 31.9, calls: 204, avgLoss: "$387", serviceType: "All Services" },
        { issue: "No upfront cost estimate", percentage: 26.0, calls: 167, avgLoss: "$387", serviceType: "HVAC & Major Appliances" }
      ],
      aiSolutions: [
        "AI-powered instant pricing with transparent breakdown",
        "No hidden fees guarantee with detailed explanations",
        "Range estimates based on historical similar repairs"
      ]
    },
    {
      step: "Information Collection",
      stepNumber: 5,
      dropoutRate: 6.2,
      affectedCalls: 285,
      revenueImpact: "$110,295",
      primaryFrictions: [
        { issue: "Too many required fields", percentage: 44.6, calls: 127, avgLoss: "$387", serviceType: "All Services" },
        { issue: "Address/access complexity", percentage: 33.7, calls: 96, avgLoss: "$387", serviceType: "All Services" },
        { issue: "Payment information hesitation", percentage: 21.7, calls: 62, avgLoss: "$387", serviceType: "All Services" }
      ],
      aiSolutions: [
        "Smart form fills most fields automatically",
        "Map integration simplifies address entry",
        "Flexible payment options with security assurance"
      ]
    }
  ];

  // Friction Impact Summary
  const frictionSummary = {
    totalDropouts: 2325,
    totalRevenueImpact: "$899,775",
    avgDropoutValue: "$387",
    topFrictionCategory: "Availability Selection",
    improvementPotential: "$629,843",
    aiOptimizationSavings: "70%"
  };

  // Real-time Friction Monitoring
  const realTimeFriction = [
    {
      time: "Last Hour",
      frictionEvents: 23,
      revenueAtRisk: "$8,901",
      topIssue: "Limited time slots",
      trend: "up"
    },
    {
      time: "Last 4 Hours", 
      frictionEvents: 89,
      revenueAtRisk: "$34,443",
      topIssue: "Pricing transparency",
      trend: "down"
    },
    {
      time: "Today",
      frictionEvents: 325,
      revenueAtRisk: "$125,775",
      topIssue: "Availability selection",
      trend: "stable"
    }
  ];

  // AI-Powered Solutions Impact by Service Area
  const aiSolutionsImpact = [
    {
      solution: "Appliance-Specific Intelligent Routing",
      frictionReduction: 67,
      revenueRecovery: "$35,721",
      implementationStatus: "Active",
      customerSatisfaction: "+23%",
      serviceAreas: "Refrigerators, Washers, Dryers",
      description: "AI classifies appliance issues and routes to specialized technicians"
    },
    {
      solution: "HVAC Dynamic Scheduling",
      frictionReduction: 45,
      revenueRecovery: "$134,966",
      implementationStatus: "Active", 
      customerSatisfaction: "+31%",
      serviceAreas: "HVAC Systems",
      description: "Seasonal demand prediction and emergency response optimization"
    },
    {
      solution: "Kitchen Appliance Transparent Pricing",
      frictionReduction: 52,
      revenueRecovery: "$128,793",
      implementationStatus: "Testing",
      customerSatisfaction: "+28%",
      serviceAreas: "Dishwashers, Stoves/Ovens, Microwaves",
      description: "Instant repair estimates based on appliance model and common issues"
    },
    {
      solution: "Multi-Appliance Service Bundling",
      frictionReduction: 38,
      revenueRecovery: "$41,912",
      implementationStatus: "Development",
      customerSatisfaction: "+19%",
      serviceAreas: "All Appliances",
      description: "Cross-selling optimization when multiple appliances need service"
    }
  ];

  return (
    <div className="space-y-6">
      <TooltipComponent />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-red-400" />
            Customer Scheduling Friction Point Analyzer
          </h2>
          <p className="text-gray-400 mt-1">
            Real-time analysis of scheduling process friction points with AI-powered optimization recommendations
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Analysis
          </Button>
        </div>
      </div>

      {/* Friction Impact Summary */}
      <Card className="bg-gradient-to-r from-red-900 to-orange-900 border-red-500">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingDown className="h-5 w-5 mr-2 text-red-400" />
            Friction Impact Summary - {selectedTimeframe}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div 
              className="bg-red-800/30 p-3 rounded-lg text-center cursor-pointer hover:bg-red-700/40 transition-all"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const tooltipX = rect.right > window.innerWidth / 2 ? rect.left - 420 : rect.right;
                const tooltipY = rect.top;
                
                showTooltip(
                  "Total Customer Dropouts",
                  frictionSummary.totalDropouts.toLocaleString(),
                  "Critical Impact",
                  "Friction Analyzer AI: Tracking every customer interaction point where scheduling breaks down, identifying patterns and providing actionable insights to recover lost revenue",
                  "Customer Experience AI",
                  { x: tooltipX, y: tooltipY },
                  "bounce"
                );
              }}
              onMouseLeave={hideTooltip}
            >
              <div className="text-2xl font-bold text-red-300">{frictionSummary.totalDropouts.toLocaleString()}</div>
              <div className="text-sm text-red-200">Total Dropouts</div>
            </div>
            <div className="bg-orange-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-300">{frictionSummary.totalRevenueImpact}</div>
              <div className="text-sm text-orange-200">Revenue Impact</div>
            </div>
            <div className="bg-yellow-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-300">{frictionSummary.improvementPotential}</div>
              <div className="text-sm text-yellow-200">Recovery Potential</div>
            </div>
            <div className="bg-green-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-300">{frictionSummary.aiOptimizationSavings}</div>
              <div className="text-sm text-green-200">AI Optimization</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="friction-analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="friction-analysis" className="data-[state=active]:bg-red-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Friction Analysis
          </TabsTrigger>
          <TabsTrigger value="real-time" className="data-[state=active]:bg-red-600">
            <Clock className="h-4 w-4 mr-2" />
            Real-time Monitoring
          </TabsTrigger>
          <TabsTrigger value="ai-solutions" className="data-[state=active]:bg-red-600">
            <Brain className="h-4 w-4 mr-2" />
            AI Solutions
          </TabsTrigger>
          <TabsTrigger value="optimization" className="data-[state=active]:bg-red-600">
            <Target className="h-4 w-4 mr-2" />
            Multi-Dimensional System
          </TabsTrigger>
        </TabsList>

        {/* Friction Analysis Tab */}
        <TabsContent value="friction-analysis" className="space-y-6">
          <div className="space-y-4">
            {frictionPoints.map((point, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold ${
                        point.dropoutRate > 12 ? 'bg-red-600' :
                        point.dropoutRate > 8 ? 'bg-yellow-600' : 'bg-green-600'
                      }`}>
                        {point.stepNumber}
                      </div>
                      Step {point.stepNumber}: {point.step}
                    </CardTitle>
                    <div className="text-right">
                      <Badge className={`${
                        point.dropoutRate > 12 ? 'bg-red-600' :
                        point.dropoutRate > 8 ? 'bg-yellow-600' : 'bg-green-600'
                      } mb-1`}>
                        {point.dropoutRate}% Dropout Rate
                      </Badge>
                      <div className="text-sm text-gray-400">
                        {point.affectedCalls} calls • {point.revenueImpact} impact
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Primary Friction Issues */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Primary Friction Issues</h4>
                      <div className="space-y-3">
                        {point.primaryFrictions.map((friction, idx) => (
                          <div key={idx} className="bg-gray-900 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-white">{friction.issue}</span>
                              <Badge variant="outline" className="text-red-400 border-red-600 text-xs">
                                {friction.percentage}%
                              </Badge>
                            </div>
                            <Progress value={friction.percentage} className="mb-2" />
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>{friction.calls} affected calls</span>
                              <span>{friction.avgLoss} avg loss</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Solutions */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-3">AI-Powered Solutions</h4>
                      <div className="space-y-2">
                        {point.aiSolutions.map((solution, idx) => (
                          <div key={idx} className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
                            <div className="flex items-start">
                              <Lightbulb className="h-4 w-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="text-sm text-blue-200">{solution}</span>
                                {point.primaryFrictions.some(f => f.serviceType) && (
                                  <div className="text-xs text-blue-300 mt-1">
                                    Optimized for: {point.primaryFrictions.find(f => f.serviceType)?.serviceType}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Real-time Monitoring Tab */}
        <TabsContent value="real-time" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {realTimeFriction.map((period, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>{period.time}</span>
                    <Badge className={`${
                      period.trend === 'up' ? 'bg-red-600' :
                      period.trend === 'down' ? 'bg-green-600' : 'bg-yellow-600'
                    }`}>
                      {period.trend === 'up' ? '↑' : period.trend === 'down' ? '↓' : '→'} 
                      {period.trend}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">{period.frictionEvents}</div>
                      <div className="text-sm text-gray-400">Friction Events</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl font-bold text-orange-400">{period.revenueAtRisk}</div>
                      <div className="text-sm text-gray-400">Revenue at Risk</div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-lg">
                      <div className="text-sm text-gray-300 mb-1">Top Issue:</div>
                      <div className="text-sm font-medium text-red-400">{period.topIssue}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Live Friction Feed */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="h-5 w-5 mr-2 text-yellow-400" />
                Live Friction Event Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "2 min ago", event: "Customer dropped during availability selection", customer: "ID: 7834", impact: "$387" },
                  { time: "5 min ago", event: "Pricing transparency issue", customer: "ID: 7829", impact: "$387" },
                  { time: "8 min ago", event: "Complex service assessment", customer: "ID: 7821", impact: "$387" },
                  { time: "12 min ago", event: "Long hold time abandonment", customer: "ID: 7815", impact: "$387" },
                  { time: "15 min ago", event: "Information collection friction", customer: "ID: 7808", impact: "$387" }
                ].map((event, index) => (
                  <div key={index} className="bg-gray-900 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white">{event.event}</div>
                      <div className="text-xs text-gray-400">{event.customer} • {event.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-red-400">{event.impact}</div>
                      <div className="text-xs text-gray-400">Lost Revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Solutions Tab */}
        <TabsContent value="ai-solutions" className="space-y-6">
          <ServiceAreaFrictionAnalysis />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiSolutionsImpact.map((solution, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-blue-400" />
                      {solution.solution}
                    </span>
                    <Badge className={`${
                      solution.implementationStatus === 'Active' ? 'bg-green-600' :
                      solution.implementationStatus === 'Testing' ? 'bg-yellow-600' : 'bg-blue-600'
                    }`}>
                      {solution.implementationStatus}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{solution.frictionReduction}%</div>
                        <div className="text-sm text-gray-400">Friction Reduction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{solution.revenueRecovery}</div>
                        <div className="text-sm text-gray-400">Revenue Recovery</div>
                      </div>
                    </div>

                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <div className="text-sm text-blue-300 mb-1">Service Areas:</div>
                      <div className="text-sm font-medium text-blue-200">{solution.serviceAreas}</div>
                      <div className="text-xs text-blue-300 mt-2">{solution.description}</div>
                    </div>
                    
                    <div className="bg-green-900/30 p-3 rounded-lg">
                      <div className="text-sm text-green-300 mb-1">Customer Satisfaction Impact:</div>
                      <div className="text-lg font-bold text-green-400">{solution.customerSatisfaction}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Optimization Results Tab */}
        <TabsContent value="optimization" className="space-y-6">
          <RevenueRecoveryImplementation />
        </TabsContent>
      </Tabs>
    </div>
  );
}