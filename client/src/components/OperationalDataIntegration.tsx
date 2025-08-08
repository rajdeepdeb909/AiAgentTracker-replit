import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Link as LinkIcon, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BarChart3,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Wrench,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Zap,
  Eye,
  RefreshCw,
  Sparkles,
  Crown
} from "lucide-react";
import { useAnimatedTooltip } from "@/components/AnimatedMetricsTooltip";

interface OperationalMetric {
  name: string;
  current: string;
  change: string;
  trend: "up" | "down" | "stable";
  ytdChange: string;
  agentImpact: string;
}

interface DistrictData {
  district: string;
  planningArea: string;
  totalCreates: number;
  completes: number;
  revenue: string;
  profit: string;
  pptCost: string;
  margin: string;
  agentOptimization: string;
}

export default function OperationalDataIntegration() {
  const [selectedView, setSelectedView] = useState("live-data");
  const { showTooltip, hideTooltip, TooltipComponent } = useAnimatedTooltip();

  // Live operational metrics from your dashboard
  const liveMetrics: OperationalMetric[] = [
    {
      name: "Paid Completes",
      current: "3,900",
      change: "-38.72%",
      ytdChange: "-38.72%",
      agentImpact: "Advanced Scheduling Agent optimizing completion rates"
    },
    {
      name: "Total Revenue",
      current: "$904,227",
      change: "-24.22%",
      ytdChange: "-24.22%", 
      agentImpact: "Customer Communication Hub driving conversion recovery"
    },
    {
      name: "Profit Margin",
      current: "32.75%",
      change: "+5.40%",
      ytdChange: "+5.40%",
      agentImpact: "Route Optimization Engine reducing operational costs"
    },
    {
      name: "Revenue per Call",
      current: "$231.85",
      change: "+20.98%",
      ytdChange: "+20.98%",
      agentImpact: "Quality Assurance Inspector improving service value"
    },
    {
      name: "PPT Profit per Call",
      current: "$75.94",
      change: "+18.73%",
      ytdChange: "+18.73%",
      agentImpact: "Parts Prediction Engine optimizing inventory efficiency"
    },
    {
      name: "PPT Cost",
      current: "$608,076",
      change: "-26.38%",
      ytdChange: "-26.38%",
      agentImpact: "Parts Ordering Specialist reducing procurement costs"
    }
  ];

  // District performance data from your Spatio Temporal View
  const districtData: DistrictData[] = [
    {
      district: "4766 Ohio Valley",
      planningArea: "Akron",
      totalCreates: 12,
      completes: 5,
      revenue: "$976",
      profit: "$432",
      pptCost: "$544",
      margin: "44.23%",
      agentOptimization: "Geographic Performance Marketing Agent targeting market penetration"
    },
    {
      district: "4768 Ohio Valley",
      planningArea: "Asheville", 
      totalCreates: 10,
      completes: 3,
      revenue: "$387",
      profit: "$49",
      pptCost: "$338",
      margin: "12.70%",
      agentOptimization: "Regional Performance Monitor identifying improvement opportunities"
    },
    {
      district: "4766 Ohio Valley",
      planningArea: "Cincinnati",
      totalCreates: 34,
      completes: 26,
      revenue: "$5,126",
      profit: "$2,489",
      pptCost: "$2,637",
      margin: "48.56%",
      agentOptimization: "Customer Communication Hub driving high-margin conversions"
    },
    {
      district: "4768 Ohio Valley", 
      planningArea: "Cleveland",
      totalCreates: 41,
      completes: 24,
      revenue: "$6,977",
      profit: "$3,896",
      pptCost: "$3,081",
      margin: "55.85%",
      agentOptimization: "Advanced Scheduling Agent maximizing technician efficiency"
    },
    {
      district: "4766 Ohio Valley",
      planningArea: "Columbus OH",
      totalCreates: 42,
      completes: 31,
      revenue: "$10,191",
      profit: "$3,230",
      pptCost: "$6,961",
      margin: "31.69%",
      agentOptimization: "Parts Prediction Engine reducing inventory costs"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUpRight className="h-4 w-4 text-green-400" />;
      case "down": return <ArrowDownRight className="h-4 w-4 text-red-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = (change: string) => {
    const isPositive = change.startsWith('+') || (!change.startsWith('-') && parseFloat(change) > 0);
    return isPositive ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Integration Status */}
      <Card className="bg-gradient-to-r from-blue-900 to-cyan-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Database className="h-6 w-6 mr-3 text-cyan-400" />
            Live Operational Data Integration
          </CardTitle>
          <CardDescription className="text-blue-200">
            Real-time connection to your existing financial and analytics dashboard with agent-driven insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-cyan-300">60+</div>
              <div className="text-sm text-cyan-200">Metrics Tracked</div>
            </div>
            <div className="bg-cyan-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-300">430</div>
              <div className="text-sm text-blue-200">Planning Areas</div>
            </div>
            <div className="bg-green-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-300">25</div>
              <div className="text-sm text-green-200">AI Agents</div>
            </div>
            <div className="bg-purple-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-300">Live</div>
              <div className="text-sm text-purple-200">Data Feed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger
            value="live-data"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <Activity className="h-4 w-4" />
            <span>Live Metrics</span>
          </TabsTrigger>
          <TabsTrigger
            value="district-performance"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <MapPin className="h-4 w-4" />
            <span>District Analysis</span>
          </TabsTrigger>
          <TabsTrigger
            value="agent-attribution"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <Target className="h-4 w-4" />
            <span>Agent Attribution</span>
          </TabsTrigger>
          <TabsTrigger
            value="integration-guide"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <LinkIcon className="h-4 w-4" />
            <span>Integration</span>
          </TabsTrigger>
        </TabsList>

        {/* Live Metrics Tab */}
        <TabsContent value="live-data" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
                Real-Time Financial Metrics
              </CardTitle>
              <CardDescription className="text-gray-400">
                Live data from your dashboard with AI agent impact analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {liveMetrics.map((metric, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900 p-4 rounded-lg cursor-pointer hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const animationTypes: ("bounce" | "pulse" | "slide" | "glow")[] = ["bounce", "pulse", "slide", "glow"];
                      const randomAnimation = animationTypes[index % animationTypes.length];
                      
                      // Smart positioning for tooltips
                      const tooltipX = rect.right > window.innerWidth / 2 ? rect.left - 420 : rect.right;
                      const tooltipY = rect.top;
                      
                      showTooltip(
                        metric.name,
                        metric.current,
                        metric.change,
                        metric.agentImpact,
                        metric.agentImpact.split(':')[0] || "AI Agent",
                        { x: tooltipX, y: tooltipY },
                        randomAnimation
                      );
                    }}
                    onMouseLeave={hideTooltip}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium text-sm flex items-center">
                        <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
                        {metric.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getTrendColor(metric.change)} border-current animate-pulse`}
                        >
                          {metric.change}
                        </Badge>
                        <span className="text-lg font-bold text-white">{metric.current}</span>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="text-xs text-gray-400 mb-1">YTD Change: {metric.ytdChange}</div>
                    </div>

                    <div className="bg-blue-900/20 p-2 rounded text-xs">
                      <div className="text-blue-300 font-medium mb-1">AI Agent Impact:</div>
                      <div className="text-blue-200">{metric.agentImpact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trends Integration */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                Weekly Trends Integration
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your 60+ metrics dashboard connected to agent performance tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-3">Week-over-Week Analysis (2025/25)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-800/20 p-3 rounded">
                    <div className="text-green-300 font-medium text-sm">Paid Completes</div>
                    <div className="text-xl font-bold text-white">12,646</div>
                    <div className="text-xs text-green-400">+224 from previous week</div>
                    <div className="text-xs text-gray-400 mt-1">Advanced Scheduling Agent optimization</div>
                  </div>
                  <div className="bg-blue-800/20 p-3 rounded">
                    <div className="text-blue-300 font-medium text-sm">Total Revenue</div>
                    <div className="text-xl font-bold text-white">$2,930,948</div>
                    <div className="text-xs text-blue-400">Customer Communication Hub impact</div>
                    <div className="text-xs text-gray-400 mt-1">Conversion rate optimization</div>
                  </div>
                  <div className="bg-purple-800/20 p-3 rounded">
                    <div className="text-purple-300 font-medium text-sm">Total PPT Profit</div>
                    <div className="text-xl font-bold text-white">$905,877</div>
                    <div className="text-xs text-purple-400">Parts Prediction Engine efficiency</div>
                    <div className="text-xs text-gray-400 mt-1">Inventory optimization impact</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* District Performance Tab */}
        <TabsContent value="district-performance" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-orange-400" />
                District Performance with Agent Attribution
              </CardTitle>
              <CardDescription className="text-gray-400">
                Spatio Temporal view data with AI agent impact analysis by planning area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {districtData.map((district, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900 p-4 rounded-lg cursor-pointer hover:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:border hover:border-orange-500"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      
                      // Smart positioning for district tooltips
                      const tooltipX = rect.right > window.innerWidth / 2 ? rect.left - 420 : rect.right;
                      const tooltipY = rect.top;
                      
                      showTooltip(
                        `${district.planningArea} Performance`,
                        district.revenue,
                        district.margin,
                        district.agentOptimization,
                        district.agentOptimization.split(' ')[0] || "Geographic Agent",
                        { x: tooltipX, y: tooltipY },
                        "glow"
                      );
                    }}
                    onMouseLeave={hideTooltip}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-medium flex items-center">
                          <Crown className="h-4 w-4 mr-2 text-gold-400" />
                          {district.planningArea}
                        </h4>
                        <div className="text-sm text-gray-400">{district.district}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold animate-pulse">{district.margin}</div>
                        <div className="text-sm text-gray-400">Margin</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                      <div className="text-center">
                        <div className="text-white font-medium">{district.totalCreates}</div>
                        <div className="text-xs text-gray-400">Creates</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-400 font-medium">{district.completes}</div>
                        <div className="text-xs text-gray-400">Completes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-400 font-medium">{district.revenue}</div>
                        <div className="text-xs text-gray-400">Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-400 font-medium">{district.profit}</div>
                        <div className="text-xs text-gray-400">Profit</div>
                      </div>
                      <div className="text-center">
                        <div className="text-red-400 font-medium">{district.pptCost}</div>
                        <div className="text-xs text-gray-400">PPT Cost</div>
                      </div>
                    </div>

                    <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                      <div className="text-orange-300 font-medium text-xs mb-1">AI Agent Optimization:</div>
                      <div className="text-orange-200 text-xs">{district.agentOptimization}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agent Attribution Tab */}
        <TabsContent value="agent-attribution" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-purple-400" />
                Agent Performance Attribution
              </CardTitle>
              <CardDescription className="text-gray-400">
                How each AI agent contributes to your operational metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    agent: "Customer Communication Hub",
                    metrics: ["Revenue per Call +20.98%", "Conversion Rate Optimization", "Customer Retention +34%"],
                    impact: "$231.85 average revenue per call",
                    confidence: 94
                  },
                  {
                    agent: "Advanced Scheduling Agent", 
                    metrics: ["Paid Completes Optimization", "Technician Efficiency +35%", "Service Window Accuracy"],
                    impact: "3,900 paid completes managed",
                    confidence: 91
                  },
                  {
                    agent: "Parts Prediction Engine",
                    metrics: ["PPT Cost Reduction -26.38%", "Inventory Optimization", "Waste Reduction 67%"],
                    impact: "$608,076 in optimized costs",
                    confidence: 88
                  },
                  {
                    agent: "Route Optimization Engine",
                    metrics: ["Margin Improvement +5.40%", "Travel Time Reduction", "Fuel Cost Savings"],
                    impact: "32.75% profit margin maintained",
                    confidence: 92
                  },
                  {
                    agent: "Quality Assurance Inspector",
                    metrics: ["Service Quality Improvement", "Customer Satisfaction +92%", "Repeat Business +45%"],
                    impact: "Quality-driven revenue increases",
                    confidence: 89
                  }
                ].map((agent, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{agent.agent}</h4>
                      <div className="flex items-center space-x-2">
                        <Progress value={agent.confidence} className="w-20" />
                        <span className="text-sm text-gray-400">{agent.confidence}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                      {agent.metrics.map((metric, mIndex) => (
                        <Badge key={mIndex} variant="outline" className="text-blue-400 border-blue-600 text-xs">
                          {metric}
                        </Badge>
                      ))}
                    </div>

                    <div className="bg-purple-900/20 p-2 rounded text-sm">
                      <div className="text-purple-300 font-medium">Direct Impact:</div>
                      <div className="text-purple-200">{agent.impact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Guide Tab */}
        <TabsContent value="integration-guide" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <LinkIcon className="h-5 w-5 mr-2 text-cyan-400" />
                Dashboard Integration Guide
              </CardTitle>
              <CardDescription className="text-gray-400">
                Step-by-step instructions to connect your existing dashboard to our agentic framework
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</div>
                    <h3 className="text-white text-lg font-semibold">API Data Connection</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-900/20 p-3 rounded">
                      <h4 className="text-blue-300 font-medium mb-2">Export Your Data</h4>
                      <ul className="text-sm text-blue-200 space-y-1">
                        <li>• Use your existing dashboard's API or data export features</li>
                        <li>• Export the 60+ metrics from your Trends view in JSON or CSV format</li>
                        <li>• Include district-level data from your Spatio Temporal view</li>
                        <li>• Set up automated daily exports to keep data current</li>
                      </ul>
                    </div>
                    <div className="text-xs text-gray-400">
                      <strong>API Endpoint Example:</strong> POST /api/financial-intelligence/import-metrics
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</div>
                    <h3 className="text-white text-lg font-semibold">Agent Attribution Mapping</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-green-900/20 p-3 rounded">
                      <h4 className="text-green-300 font-medium mb-2">Map Metrics to Agents</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-200">
                        <div>
                          <strong>Revenue Metrics:</strong>
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>• Revenue per Call → Customer Communication Hub</li>
                            <li>• Total Revenue → Multiple agents</li>
                            <li>• Profit Margin → Route Optimization Engine</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Operational Metrics:</strong>
                          <ul className="ml-4 mt-1 space-y-1">
                            <li>• Paid Completes → Advanced Scheduling Agent</li>
                            <li>• PPT Cost → Parts Prediction Engine</li>
                            <li>• Efficiency Metrics → Quality Assurance Inspector</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-gray-900 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</div>
                    <h3 className="text-white text-lg font-semibold">Real-Time Dashboard Integration</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-purple-900/20 p-3 rounded">
                      <h4 className="text-purple-300 font-medium mb-2">Live Data Sync</h4>
                      <ul className="text-sm text-purple-200 space-y-1">
                        <li>• Set up webhooks from your dashboard to push updates</li>
                        <li>• Configure real-time data refresh (recommended: every 15 minutes)</li>
                        <li>• Enable automatic agent performance correlation</li>
                        <li>• Set up alert thresholds for key metric changes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Technical Requirements */}
                <Card className="bg-blue-900/10 border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-300 flex items-center text-lg">
                      <Wrench className="h-5 w-5 mr-2" />
                      Technical Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="text-blue-300 font-medium mb-2">Data Format</h4>
                        <ul className="text-blue-200 space-y-1">
                          <li>• JSON or CSV export capability</li>
                          <li>• Timestamp fields for trend analysis</li>
                          <li>• District/planning area identifiers</li>
                          <li>• Metric value and percentage change data</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-blue-300 font-medium mb-2">API Integration</h4>
                        <ul className="text-blue-200 space-y-1">
                          <li>• REST API endpoints for data push/pull</li>
                          <li>• Authentication tokens or API keys</li>
                          <li>• Webhook support for real-time updates</li>
                          <li>• Rate limiting considerations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
        >
          <Database className="h-4 w-4 mr-2" />
          Test Data Connection
        </Button>
        
        <div className="space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Dashboard Data
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Eye className="h-4 w-4 mr-2" />
            View Live Integration
          </Button>
        </div>
      </div>

      {/* Animated Tooltip */}
      <TooltipComponent />
    </div>
  );
}