import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Phone,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Activity,
  Filter,
  Brain,
  Target,
  Zap,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { useAnimatedTooltip } from "@/components/AnimatedMetricsTooltip";
import CustomerSchedulingFrictionAnalyzer from "@/components/CustomerSchedulingFrictionAnalyzer";

export default function CallCenterSchedulingAgent() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedHour, setSelectedHour] = useState("all");
  const [location, navigate] = useLocation();
  
  const { showTooltip, hideTooltip, TooltipComponent } = useAnimatedTooltip();

  // Daily Conversion Funnel Data (from your screenshots)
  const conversionFunnelData = [
    {
      step: "Total Calls",
      count: 6016,
      percentage: 100,
      dropRate: 0,
      reasons: []
    },
    {
      step: "Scheduled Repair Intent",
      count: 1780,
      percentage: 29.6,
      dropRate: 70.4,
      reasons: ["Non-repair inquiries", "General questions", "Other services"]
    },
    {
      step: "Repair Scheduled",
      count: 922,
      percentage: 51.8,
      dropRate: 48.2,
      reasons: ["Customer Drop-Out", "Service Not Set - Date", "Service Not Set - Price", "Service Not Set - Others"]
    },
    {
      step: "Successfully Completed",
      count: 827,
      percentage: 89.7,
      dropRate: 10.3,
      reasons: ["Cancellations", "No-shows", "Reschedules"]
    }
  ];

  // Intent Analysis Data
  const intentAnalysisData = [
    {
      intent: "Scheduled Repair",
      totalCalls: 1790,
      scheduled: 922,
      conversionRate: 51.5,
      dropoutReasons: [
        { reason: "Customer Drop-Out", count: 95, percentage: 5.3 },
        { reason: "Service Not Set - Date", count: 149, percentage: 8.3 },
        { reason: "Service Not Set - Price", count: 176, percentage: 9.8 },
        { reason: "Service Not Set - Others", count: 32, percentage: 1.8 },
        { reason: "Service Not Set - No Dates", count: 179, percentage: 10.0 }
      ]
    },
    {
      intent: "Product Information",
      totalCalls: 1677,
      scheduled: 0,
      conversionRate: 0,
      dropoutReasons: [
        { reason: "Product Unserviceable", count: 67, percentage: 4.0 },
        { reason: "Bot Issue", count: 1, percentage: 0.1 },
        { reason: "Customer inquiries only", count: 1609, percentage: 95.9 }
      ]
    }
  ];

  // Hourly Performance Data
  const hourlyPerformanceData = [
    { hour: "6AM", totalCalls: 12, scheduledRepairs: 9, conversionRate: 75.0 },
    { hour: "7AM", totalCalls: 27, scheduledRepairs: 19, conversionRate: 70.4 },
    { hour: "8AM", totalCalls: 72, scheduledRepairs: 41, conversionRate: 56.9 },
    { hour: "9AM", totalCalls: 112, scheduledRepairs: 61, conversionRate: 54.5 },
    { hour: "10AM", totalCalls: 176, scheduledRepairs: 108, conversionRate: 61.4 },
    { hour: "11AM", totalCalls: 226, scheduledRepairs: 119, conversionRate: 52.7 },
    { hour: "12PM", totalCalls: 224, scheduledRepairs: 121, conversionRate: 54.0 },
    { hour: "1PM", totalCalls: 245, scheduledRepairs: 137, conversionRate: 55.9 },
    { hour: "2PM", totalCalls: 620, scheduledRepairs: 120, conversionRate: 19.4 },
    { hour: "3PM", totalCalls: 495, scheduledRepairs: 120, conversionRate: 24.2 }
  ];

  // Real-time KPIs
  const liveKPIs = [
    { 
      name: "Total Calls Today", 
      value: "6,016", 
      change: "+12.3%", 
      trend: "up",
      description: "All inbound calls received",
      agentImpact: "AI Call Router: Intelligent call classification and routing optimization driving $23.4M annual revenue through improved conversions"
    },
    { 
      name: "Repair Conversion Rate", 
      value: "51.8%", 
      change: "+3.2%", 
      trend: "up",
      description: "Repairs scheduled from repair-intent calls",
      agentImpact: "Scheduling AI: Dynamic availability optimization generating $12.7M labor revenue + $8.9M parts revenue annually"
    },
    { 
      name: "Revenue per Scheduled Call", 
      value: "$387", 
      change: "+$23", 
      trend: "up",
      description: "Average revenue from labor + parts per completed repair",
      agentImpact: "Financial Intelligence: Optimizing labor rates ($285 avg) + parts markup (26% margin) for maximum profitability"
    },
    { 
      name: "Cost per Acquisition", 
      value: "$47", 
      change: "-$8", 
      trend: "up",
      description: "Total cost to convert call to completed repair",
      agentImpact: "Cost Optimization AI: Reducing technician dispatch costs, parts shipping, and operational overhead"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <TooltipComponent />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Phone className="h-8 w-8 mr-3 text-blue-400" />
          <h1 className="text-4xl font-bold text-white">AI Call Center Scheduling Agent</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Intelligent call routing, intent analysis, and conversion optimization with comprehensive funnel tracking and hourly performance analytics.
        </p>
      </div>

      {/* Agent Status */}
      <Card className="bg-gradient-to-r from-blue-900 to-indigo-900 border-blue-500 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-3 text-blue-400" />
            Agent #26: AI Call Center Scheduling Agent - ACTIVE
          </CardTitle>
          <CardDescription className="text-blue-200">
            Advanced conversational AI managing 6,000+ daily calls with intelligent scheduling optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {liveKPIs.map((kpi, index) => (
              <div 
                key={index} 
                className="bg-blue-800/30 p-3 rounded-lg text-center cursor-pointer hover:bg-blue-700/40 transition-all"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const tooltipX = rect.right > window.innerWidth / 2 ? rect.left - 420 : rect.right;
                  const tooltipY = rect.top;
                  
                  showTooltip(
                    kpi.name,
                    kpi.value,
                    kpi.change,
                    kpi.agentImpact,
                    "Call Center AI",
                    { x: tooltipX, y: tooltipY },
                    "pulse"
                  );
                }}
                onMouseLeave={hideTooltip}
              >
                <div className="text-2xl font-bold text-blue-300">{kpi.value}</div>
                <div className="text-sm text-blue-200">{kpi.name}</div>
                <Badge className={`text-xs mt-1 ${
                  kpi.trend === 'up' ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  {kpi.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
          <TabsTrigger
            value="overview"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="funnel"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <TrendingDown className="h-4 w-4" />
            <span>Conversion Funnel</span>
          </TabsTrigger>
          <TabsTrigger
            value="intent"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <Target className="h-4 w-4" />
            <span>Intent Analysis</span>
          </TabsTrigger>
          <TabsTrigger
            value="hourly"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <Clock className="h-4 w-4" />
            <span>Hourly Performance</span>
          </TabsTrigger>
          <TabsTrigger
            value="ai-insights"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <Brain className="h-4 w-4" />
            <span>AI Insights</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Performance Summary */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-400" />
                  Today's Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Calls Received</span>
                    <span className="text-2xl font-bold text-green-400">6,016</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Repair Intent Calls</span>
                    <span className="text-xl font-bold text-blue-400">1,790 (29.6%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Successfully Scheduled</span>
                    <span className="text-xl font-bold text-green-400">922 (51.5%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Completion Rate</span>
                    <span className="text-xl font-bold text-green-400">89.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Agent Capabilities */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-400" />
                  AI Agent Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span className="text-sm text-gray-300">Intent Recognition & Classification</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span className="text-sm text-gray-300">Dynamic Scheduling Optimization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span className="text-sm text-gray-300">Real-time Conversion Analysis</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span className="text-sm text-gray-300">Automated Dropout Prevention</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span className="text-sm text-gray-300">Hourly Performance Tracking</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                    <span className="text-sm text-gray-300">Multi-channel Communication</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversion Funnel Tab */}
        <TabsContent value="funnel" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingDown className="h-5 w-5 mr-2 text-red-400" />
                Daily Conversion Funnel Analysis
              </CardTitle>
              <CardDescription className="text-gray-400">
                Call progression from total calls to successful completions with dropout analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {conversionFunnelData.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-3 ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-green-500' :
                          index === 2 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <h4 className="text-white font-medium">{step.step}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{step.count.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">{step.percentage}% of previous</div>
                      </div>
                    </div>
                    
                    <Progress value={step.percentage} className="mb-2" />
                    
                    {step.dropRate > 0 && (
                      <div className="text-sm text-red-400 mb-2">
                        <span className="font-medium">Drop Rate: {step.dropRate}%</span>
                        {step.reasons.length > 0 && (
                          <span className="ml-2">({step.reasons.join(", ")})</span>
                        )}
                      </div>
                    )}
                    
                    {index < conversionFunnelData.length - 1 && (
                      <div className="flex justify-center">
                        <ArrowRight className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Intent Analysis Tab */}
        <TabsContent value="intent" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-400" />
                Intent-Based Conversion Analysis
              </CardTitle>
              <CardDescription className="text-gray-400">
                Performance breakdown by call intent with detailed dropout reasons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {intentAnalysisData.map((intent, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-bold text-white">{intent.intent}</h4>
                      <div className="text-right">
                        <div className="text-green-400 text-lg font-bold">{intent.conversionRate}%</div>
                        <div className="text-sm text-gray-400">{intent.scheduled} / {intent.totalCalls} calls</div>
                      </div>
                    </div>
                    
                    <Progress value={intent.conversionRate} className="mb-4" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Top Dropout Reasons</h5>
                        <div className="space-y-2">
                          {intent.dropoutReasons.slice(0, 3).map((reason, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-gray-400">{reason.reason}</span>
                              <span className="text-red-400">{reason.count} ({reason.percentage}%)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-blue-900/30 p-3 rounded">
                        <h5 className="text-sm font-medium text-blue-300 mb-2">AI Optimization Opportunities</h5>
                        <ul className="text-xs text-blue-200 space-y-1">
                          <li>• Predictive scheduling availability</li>
                          <li>• Dynamic pricing optimization</li>
                          <li>• Automated follow-up sequences</li>
                          <li>• Real-time objection handling</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hourly Performance Tab */}
        <TabsContent value="hourly" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="h-5 w-5 mr-2 text-yellow-400" />
                Hourly Performance Analysis
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time performance tracking with hour-by-hour conversion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {hourlyPerformanceData.map((hour, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900 p-4 rounded-lg cursor-pointer hover:bg-gray-800 transition-all"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const tooltipX = rect.right > window.innerWidth / 2 ? rect.left - 420 : rect.right;
                      const tooltipY = rect.top;
                      
                      showTooltip(
                        `${hour.hour} Performance`,
                        `${hour.conversionRate}%`,
                        hour.conversionRate > 50 ? "+Good" : "-Needs Focus",
                        `AI Scheduling Agent: Optimizing ${hour.hour} time slot performance with ${hour.totalCalls} calls`,
                        "Hourly Analytics AI",
                        { x: tooltipX, y: tooltipY },
                        "glow"
                      );
                    }}
                    onMouseLeave={hideTooltip}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-white">{hour.hour}</span>
                      <Badge className={`${
                        hour.conversionRate > 60 ? 'bg-green-600' :
                        hour.conversionRate > 40 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}>
                        {hour.conversionRate}%
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total Calls</span>
                        <span className="text-white">{hour.totalCalls}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Scheduled</span>
                        <span className="text-green-400">{hour.scheduledRepairs}</span>
                      </div>
                    </div>
                    <Progress value={hour.conversionRate} className="mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="space-y-6">
          <CustomerSchedulingFrictionAnalyzer />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-400" />
                  Revenue Optimization Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-900/30 p-4 rounded-lg">
                    <h4 className="text-green-200 font-medium mb-2">Labor Revenue Optimization</h4>
                    <p className="text-sm text-green-100 mb-2">
                      AI maximizes labor revenue ($285 avg per call) through:
                    </p>
                    <ul className="text-xs text-green-100 space-y-1">
                      <li>• Dynamic pricing based on complexity and urgency</li>
                      <li>• Technician skill matching for premium rates</li>
                      <li>• Upselling optimization during scheduling</li>
                      <li>• Commission opportunity identification</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/30 p-4 rounded-lg">
                    <h4 className="text-blue-200 font-medium mb-2">Parts Revenue & Margin</h4>
                    <p className="text-sm text-blue-100 mb-2">
                      Parts revenue optimization ($102 avg, 26% margin) via:
                    </p>
                    <ul className="text-xs text-blue-100 space-y-1">
                      <li>• Predictive parts ordering reduces shipping costs</li>
                      <li>• Direct-ship model (85% of parts) cuts overhead</li>
                      <li>• Dynamic markup optimization by part type</li>
                      <li>• Inventory turnover acceleration</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  Cost Management Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-red-900/30 p-4 rounded-lg">
                    <h4 className="text-red-200 font-medium mb-2">Major Cost Centers Management</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-red-100">Technician Payroll Optimization</span>
                        <Badge className="bg-green-600 text-xs">-12% Cost</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-red-100">Parts Shipping Cost Reduction</span>
                        <Badge className="bg-green-600 text-xs">-28% Cost</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-red-100">Truck Fleet Utilization</span>
                        <Badge className="bg-green-600 text-xs">+35% Efficiency</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-red-100">Marketing ROI Optimization</span>
                        <Badge className="bg-green-600 text-xs">423% ROI</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 p-4 rounded-lg">
                    <h4 className="text-blue-200 font-medium mb-2">Next Hour Financial Projections</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-100">Expected Revenue</span>
                        <span className="text-green-400 font-bold">$30,186</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-100">Labor Revenue</span>
                        <span className="text-green-400 font-bold">$22,230</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-100">Parts Revenue</span>
                        <span className="text-green-400 font-bold">$7,956</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-100">Net Margin</span>
                        <span className="text-green-400 font-bold">63.2%</span>
                      </div>
                    </div>
                  </div>
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
          onClick={() => navigate("/")}
          className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Button>
        
        <div className="space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Live Data
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Performance Report
          </Button>
        </div>
      </div>
    </div>
  );
}