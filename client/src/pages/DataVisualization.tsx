import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Users, 
  DollarSign,
  Zap,
  Clock,
  Target,
  Activity,
  PieChart,
  LineChart,
  Eye
} from "lucide-react";

export default function DataVisualization() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(res => res.json()),
  });

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
          <BarChart3 className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-white">Advanced Data Visualization</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Real-time analytics and predictive insights across all operational areas 
          with AI-powered recommendations and interactive dashboards.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Real-Time Data Points</p>
                <p className="text-2xl font-bold text-white">2.4M</p>
                <p className="text-green-400 text-xs">↑ 340K today</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Visualization Views</p>
                <p className="text-2xl font-bold text-white">47</p>
                <p className="text-green-400 text-xs">Interactive dashboards</p>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Prediction Accuracy</p>
                <p className="text-2xl font-bold text-white">94.2%</p>
                <p className="text-green-400 text-xs">AI insights</p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Data Refresh Rate</p>
                <p className="text-2xl font-bold text-white">30s</p>
                <p className="text-green-400 text-xs">Near real-time</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger
            value="overview"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="operational"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <Activity className="h-4 w-4" />
            <span>Operational</span>
          </TabsTrigger>
          <TabsTrigger
            value="predictive"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Predictive</span>
          </TabsTrigger>
          <TabsTrigger
            value="geographic"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <MapPin className="h-4 w-4" />
            <span>Geographic</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Executive Dashboard */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                Executive Performance Dashboard
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time KPIs across all business operations with trend analysis and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Revenue Metrics */}
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-400" />
                    Revenue Performance
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Monthly Revenue</span>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">$1.2M</div>
                        <div className="text-xs text-green-400">↑ 18.5%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">W2 vs 1099 Split</span>
                      <div className="text-right">
                        <div className="text-white font-bold">66% / 34%</div>
                        <div className="text-xs text-blue-400">Optimal balance</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Profit Margin</span>
                      <div className="text-right">
                        <div className="text-purple-400 font-bold">28.4%</div>
                        <div className="text-xs text-green-400">↑ 2.1%</div>
                      </div>
                    </div>
                    <div className="h-16 bg-gray-800 rounded flex items-center justify-center">
                      <LineChart className="h-8 w-8 text-green-400" />
                      <span className="text-xs text-gray-400 ml-2">Revenue Trend Chart</span>
                    </div>
                  </div>
                </div>

                {/* Operational Metrics */}
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-blue-400" />
                    Operational Excellence
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Customer Satisfaction</span>
                      <div className="text-right">
                        <div className="text-blue-400 font-bold">4.8/5</div>
                        <div className="text-xs text-green-400">↑ 0.2</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">First-Time Fix Rate</span>
                      <div className="text-right">
                        <div className="text-white font-bold">87.3%</div>
                        <div className="text-xs text-green-400">↑ 4.2%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Response Time</span>
                      <div className="text-right">
                        <div className="text-yellow-400 font-bold">0.8s</div>
                        <div className="text-xs text-green-400">↓ 0.3s</div>
                      </div>
                    </div>
                    <div className="h-16 bg-gray-800 rounded flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-blue-400" />
                      <span className="text-xs text-gray-400 ml-2">Performance Metrics</span>
                    </div>
                  </div>
                </div>

                {/* Workforce Metrics */}
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-purple-400" />
                    Workforce Analytics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Total Technicians</span>
                      <div className="text-right">
                        <div className="text-purple-400 font-bold">629</div>
                        <div className="text-xs text-green-400">+47 this month</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Utilization Rate</span>
                      <div className="text-right">
                        <div className="text-white font-bold">91.2%</div>
                        <div className="text-xs text-yellow-400">High load</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Training Completion</span>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">94.6%</div>
                        <div className="text-xs text-green-400">↑ 8.1%</div>
                      </div>
                    </div>
                    <div className="h-16 bg-gray-800 rounded flex items-center justify-center">
                      <PieChart className="h-8 w-8 text-purple-400" />
                      <span className="text-xs text-gray-400 ml-2">Workforce Composition</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Agent Performance Matrix */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                AI Agent Performance Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { category: "Customer Communication", agents: 3, performance: 96.2, trend: "↑" },
                  { category: "Scheduling & Routing", agents: 4, performance: 94.8, trend: "↑" },
                  { category: "Parts & Inventory", agents: 4, performance: 92.1, trend: "→" },
                  { category: "Quality & Safety", agents: 4, performance: 89.7, trend: "↑" },
                  { category: "Marketing & Growth", agents: 3, performance: 87.3, trend: "↑" },
                  { category: "Workforce Management", agents: 5, performance: 91.6, trend: "↑" }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-medium text-sm">{item.category}</h5>
                      <Badge variant="outline" className="text-xs">
                        {item.agents} agents
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-400">
                        {item.performance}%
                      </div>
                      <div className="text-right">
                        <div className={`text-lg ${item.trend === '↑' ? 'text-green-400' : 'text-blue-400'}`}>
                          {item.trend}
                        </div>
                        <div className="text-xs text-gray-400">performance</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operational Tab */}
        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Real-Time Operations Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Active Service Requests</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">247</div>
                        <div className="text-xs text-gray-400">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">89</div>
                        <div className="text-xs text-gray-400">Completed Today</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Technician Status</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">421</div>
                        <div className="text-xs text-gray-400">Available</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">187</div>
                        <div className="text-xs text-gray-400">On Job</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400">21</div>
                        <div className="text-xs text-gray-400">Off Duty</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Emergency Response</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Critical Alerts</span>
                        <Badge variant="outline" className="text-red-400 border-red-600">
                          3 Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Avg Response Time</span>
                        <span className="text-green-400 font-medium">11 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "Customer Satisfaction", value: "4.8/5", change: "+0.2", period: "vs last month" },
                    { metric: "Revenue Growth", value: "+18.5%", change: "+3.2%", period: "vs last month" },
                    { metric: "Cost Optimization", value: "-12.4%", change: "-2.1%", period: "operational costs" },
                    { metric: "Market Expansion", value: "+23%", change: "+8%", period: "new areas" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">{item.metric}</div>
                          <div className="text-2xl font-bold text-blue-400">{item.value}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-medium">{item.change}</div>
                          <div className="text-xs text-gray-400">{item.period}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Predictive Tab */}
        <TabsContent value="predictive" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                AI-Powered Predictive Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Demand Forecasting</h4>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Next 7 Days</span>
                        <span className="text-green-400 font-bold">+24% demand</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Peak Hours</span>
                        <span className="text-blue-400">10 AM - 2 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">High Demand Areas</span>
                        <span className="text-purple-400">Southwest Region</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-white font-medium">Equipment Failure Prediction</h4>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">HVAC Systems at Risk</span>
                        <Badge variant="outline" className="text-red-400 border-red-600">
                          342 units
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Prevention Success Rate</span>
                        <span className="text-green-400">68.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Cost Savings</span>
                        <span className="text-green-400">$1.8M annually</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Market Opportunities</h4>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Expansion Readiness</span>
                        <span className="text-green-400 font-bold">87% ready</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">ROI Prediction</span>
                        <span className="text-blue-400">156% in 18 months</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Risk Assessment</span>
                        <span className="text-yellow-400">Medium risk</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-white font-medium">Workforce Planning</h4>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Hiring Needs (Q2)</span>
                        <span className="text-blue-400">+89 technicians</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Training Requirements</span>
                        <span className="text-purple-400">267 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Retention Risk</span>
                        <span className="text-yellow-400">12.3% turnover</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geographic Tab */}
        <TabsContent value="geographic" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                Geographic Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-gray-900 p-6 rounded-lg h-80 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-white font-medium mb-2">Interactive Heat Map</h3>
                      <p className="text-gray-400 text-sm">
                        Real-time performance across 430 planning areas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Top Performing Areas</h4>
                  {[
                    { area: "Dallas Metro", performance: 97.2, revenue: "$89K" },
                    { area: "Phoenix Valley", performance: 94.8, revenue: "$76K" },
                    { area: "Chicago North", performance: 93.1, revenue: "$82K" },
                    { area: "Austin Central", performance: 91.7, revenue: "$71K" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium text-sm">{item.area}</span>
                        <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                          {item.performance}%
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400">Revenue: {item.revenue}</div>
                    </div>
                  ))}

                  <h4 className="text-white font-medium mt-6">Expansion Opportunities</h4>
                  {[
                    { area: "Seattle Metro", potential: "High", market: "$45M" },
                    { area: "Denver Region", potential: "Medium", market: "$32M" },
                    { area: "Nashville Area", potential: "Medium", market: "$28M" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium text-sm">{item.area}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            item.potential === 'High' ? 'text-green-400 border-green-600' :
                            'text-yellow-400 border-yellow-600'
                          }`}
                        >
                          {item.potential}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400">Market: {item.market}</div>
                    </div>
                  ))}
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