import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Calculator,
  Target,
  Building2,
  Users,
  Award,
  AlertTriangle,
  CheckCircle,
  Zap,
  Brain,
  Activity,
  Crown,
  LineChart,
  Wallet,
  CreditCard,
  Banknote,
  Receipt,
  TrendingDown,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";
import AgenticBusinessModelGuide from "@/components/AgenticBusinessModelGuide";
import OperationalDataIntegration from "@/components/OperationalDataIntegration";
import PlayfulMetricsDemo from "@/components/PlayfulMetricsDemo";

interface FinancialMetric {
  category: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  impact: string;
}

interface RevenueStream {
  name: string;
  amount: string;
  percentage: number;
  growth: string;
  agents: string[];
}

interface CostCenter {
  category: string;
  amount: string;
  percentage: number;
  optimization: string;
  agents: string[];
}

export default function FinancialIntelligenceAgent() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(res => res.json()),
  });

  // Financial metrics data
  const financialMetrics: FinancialMetric[] = [
    {
      category: "Total Revenue",
      value: "$268.0M",
      change: "+23.4%",
      trend: "up",
      impact: "AI optimization driving 15% efficiency gain"
    },
    {
      category: "Operating Costs",
      value: "$98.8M",
      change: "-8.2%",
      trend: "down",
      impact: "Gamification reducing training costs by $3.8M"
    },
    {
      category: "Gross Margin",
      value: "63.1%",
      change: "+5.8%",
      trend: "up",
      impact: "Dynamic pricing increasing margin by 4.2%"
    },
    {
      category: "Customer LTV",
      value: "$18,450",
      change: "+34.7%",
      trend: "up",
      impact: "Loyalty program extending relationships"
    },
    {
      category: "Agent ROI",
      value: "423%",
      change: "+67%",
      trend: "up",
      impact: "AI agents generating $4.23 per $1 invested"
    },
    {
      category: "Market Cap Impact",
      value: "$1.2B",
      change: "+89%",
      trend: "up",
      impact: "Platform valuation from operational excellence"
    }
  ];

  // Revenue streams analysis - corrected to reflect $268M annual run rate
  const revenueStreams: RevenueStream[] = [
    {
      name: "Service Revenue (W2 Technicians)",
      amount: "$146.4M",
      percentage: 54.7,
      growth: "+18.3%",
      agents: ["Advanced Scheduling Agent", "Customer Communication Hub", "Quality Assurance Inspector"]
    },
    {
      name: "Contractor Network Revenue (1099)",
      amount: "$90.8M",
      percentage: 33.9,
      growth: "+42.1%",
      agents: ["Technician Recruiting Agent", "Gamification Intelligence Agent", "Route Optimization Engine"]
    },
    {
      name: "Subscription & Platform Fees",
      amount: "$21.4M",
      percentage: 8.0,
      growth: "+156%",
      agents: ["Customer Communication Hub", "Performance Analytics AI"]
    },
    {
      name: "Parts & Materials Markup",
      amount: "$9.1M",
      percentage: 3.4,
      growth: "+23.7%",
      agents: ["Parts Prediction Engine", "Inventory Management Assistant", "Parts Ordering Specialist"]
    }
  ];

  // Cost center optimization - corrected to reflect $98.8M operating costs
  const costCenters: CostCenter[] = [
    {
      category: "Labor Costs",
      amount: "$38.2M",
      percentage: 38.7,
      optimization: "-12% through AI scheduling",
      agents: ["Advanced Scheduling Agent", "Technician Training Agent", "Route Optimization Engine"]
    },
    {
      category: "Parts & Materials",
      amount: "$24.7M",
      percentage: 25.0,
      optimization: "-18% through predictive ordering",
      agents: ["Parts Prediction Engine", "Inventory Management Assistant", "Parts Ordering Specialist"]
    },
    {
      category: "Fleet & Truck Operations",
      amount: "$16.8M",
      percentage: 17.0,
      optimization: "-28% through route optimization",
      agents: ["Route Optimization Engine", "Fleet Management AI", "Fuel Efficiency Monitor"]
    },
    {
      category: "Technology Infrastructure",
      amount: "$9.9M",
      percentage: 10.0,
      optimization: "+15% investment in AI capabilities",
      agents: ["All 26 AI Agents", "Performance Analytics AI", "Gamification Intelligence Agent"]
    },
    {
      category: "Marketing & Acquisition",
      amount: "$5.9M",
      percentage: 6.0,
      optimization: "-23% through referral programs",
      agents: ["D2C Marketing Intelligence", "B2B Relationship Manager", "Customer Communication Hub"]
    },
    {
      category: "Training & Development",
      amount: "$2.0M",
      percentage: 2.0,
      optimization: "-43% through gamification",
      agents: ["Technician Training Agent", "Gamification Intelligence Agent", "Quality Assurance Inspector"]
    },
    {
      category: "Operations & Admin",
      amount: "$1.3M",
      percentage: 1.3,
      optimization: "-67% through automation",
      agents: ["Customer Communication Hub", "Parts Ordering Specialist", "Emergency Response Coordinator"]
    }
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUpRight className="h-4 w-4 text-green-400" />;
      case "down": return <ArrowDownRight className="h-4 w-4 text-red-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-white">Financial Intelligence Agent</h1>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>
        <p className="text-gray-400 text-lg">
          Comprehensive financial modeling and business intelligence across all agentic operations, 
          tracking ROI, optimizing costs, and maximizing revenue through AI-driven insights.
        </p>
      </div>

      {/* Agent Status */}
      <Card className="bg-gradient-to-r from-green-900 to-emerald-900 border-green-500 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-3 text-green-400" />
            Agent #25: Financial Intelligence Agent - ACTIVE
          </CardTitle>
          <CardDescription className="text-green-200">
            Real-time financial modeling integrating data from all 24 operational agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-300">$268.0M</div>
              <div className="text-sm text-green-200">Annual Revenue</div>
            </div>
            <div className="bg-emerald-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-emerald-300">63.1%</div>
              <div className="text-sm text-emerald-200">Gross Margin</div>
            </div>
            <div className="bg-blue-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-300">423%</div>
              <div className="text-sm text-blue-200">Agent ROI</div>
            </div>
            <div className="bg-purple-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-300">$1.2B</div>
              <div className="text-sm text-purple-200">Market Valuation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8 bg-gray-800">
          <TabsTrigger
            value="overview"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="live-data"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <Activity className="h-4 w-4" />
            <span>Live Data</span>
          </TabsTrigger>
          <TabsTrigger
            value="revenue"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Revenue</span>
          </TabsTrigger>
          <TabsTrigger
            value="costs"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <Calculator className="h-4 w-4" />
            <span>Cost Centers</span>
          </TabsTrigger>
          <TabsTrigger
            value="roi"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <Target className="h-4 w-4" />
            <span>Agent ROI</span>
          </TabsTrigger>
          <TabsTrigger
            value="business-model"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <Crown className="h-4 w-4" />
            <span>Business Model</span>
          </TabsTrigger>
          <TabsTrigger
            value="guide"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <Lightbulb className="h-4 w-4" />
            <span>How to Integrate</span>
          </TabsTrigger>
          <TabsTrigger
            value="demo"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <Sparkles className="h-4 w-4" />
            <span>Demo</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {financialMetrics.map((metric, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm flex items-center justify-between">
                    <span>{metric.category}</span>
                    {getTrendIcon(metric.trend)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs mb-2 ${
                      metric.trend === 'up' ? 'text-green-400 border-green-600' :
                      metric.trend === 'down' ? 'text-red-400 border-red-600' :
                      'text-gray-400 border-gray-600'
                    }`}
                  >
                    {metric.change}
                  </Badge>
                  <p className="text-xs text-gray-400">{metric.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Financial Intelligence Core Functions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="h-5 w-5 mr-2 text-green-400" />
                Financial Intelligence Core Functions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">ANALYZE: Revenue Attribution</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Real-time revenue tracking by agent</li>
                    <li>• Customer lifetime value optimization</li>
                    <li>• Margin analysis by service category</li>
                    <li>• Predictive revenue forecasting</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">OPTIMIZE: Cost Management</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• AI agent cost-benefit analysis</li>
                    <li>• Resource allocation optimization</li>
                    <li>• Training cost reduction through gamification</li>
                    <li>• Operational efficiency maximization</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">PREDICT: Financial Modeling</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Multi-scenario business modeling</li>
                    <li>• Investment ROI projections</li>
                    <li>• Market valuation optimization</li>
                    <li>• Strategic financial planning</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Data Integration Tab */}
        <TabsContent value="live-data" className="space-y-6">
          <OperationalDataIntegration />
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                Revenue Stream Analysis
              </CardTitle>
              <CardDescription className="text-gray-400">
                Revenue attribution by source with supporting AI agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueStreams.map((stream, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{stream.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                          {stream.growth}
                        </Badge>
                        <span className="text-xl font-bold text-green-400">{stream.amount}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Revenue Share</span>
                        <span className="text-white">{stream.percentage}%</span>
                      </div>
                      <Progress value={stream.percentage} className="mb-2" />
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">Supporting Agents:</div>
                      <div className="flex flex-wrap gap-1">
                        {stream.agents.map((agent, agentIndex) => (
                          <Badge key={agentIndex} variant="outline" className="text-blue-400 border-blue-600 text-xs">
                            {agent}
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

        {/* Costs Tab */}
        <TabsContent value="costs" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-red-400" />
                Cost Center Optimization
              </CardTitle>
              <CardDescription className="text-gray-400">
                Cost analysis and optimization opportunities by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costCenters.map((center, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{center.category}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            center.optimization.startsWith('+') ? 'text-yellow-400 border-yellow-600' :
                            'text-green-400 border-green-600'
                          }`}
                        >
                          {center.optimization}
                        </Badge>
                        <span className="text-xl font-bold text-red-400">{center.amount}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Cost Share</span>
                        <span className="text-white">{center.percentage}%</span>
                      </div>
                      <Progress value={center.percentage} className="mb-2" />
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">Optimizing Agents:</div>
                      <div className="flex flex-wrap gap-1">
                        {center.agents.map((agent, agentIndex) => (
                          <Badge key={agentIndex} variant="outline" className="text-purple-400 border-purple-600 text-xs">
                            {agent}
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

        {/* ROI Tab */}
        <TabsContent value="roi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-yellow-400" />
                  Top Performing Agents (ROI)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Customer Communication Hub", roi: "567%", impact: "$23.4M revenue attributed" },
                    { name: "Advanced Scheduling Agent", roi: "489%", impact: "$18.7M in efficiency gains" },
                    { name: "Gamification Intelligence Agent", roi: "445%", impact: "$15.2M in retention value" },
                    { name: "Route Optimization Engine", roi: "423%", impact: "$12.8M in cost savings" },
                    { name: "Technician Recruiting Agent", roi: "398%", impact: "$11.3M in hiring efficiency" }
                  ].map((agent, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-white">{agent.name}</h4>
                        <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                          {agent.roi}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400">{agent.impact}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-400" />
                  Investment Allocation Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      category: "High-ROI Agent Expansion",
                      allocation: "$45M",
                      percentage: 45,
                      focus: "Scale top-performing agents to new markets"
                    },
                    {
                      category: "Gamification Platform",
                      allocation: "$25M",
                      percentage: 25,
                      focus: "Expand engagement systems across all verticals"
                    },
                    {
                      category: "AI Infrastructure",
                      allocation: "$20M",
                      percentage: 20,
                      focus: "Advanced analytics and predictive capabilities"
                    },
                    {
                      category: "Market Expansion",
                      allocation: "$10M",
                      percentage: 10,
                      focus: "Geographic expansion and new service categories"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-white">{item.category}</h4>
                        <span className="text-sm font-bold text-blue-400">{item.allocation}</span>
                      </div>
                      <div className="mb-2">
                        <Progress value={item.percentage} />
                      </div>
                      <div className="text-xs text-gray-400">{item.focus}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Business Model Tab */}
        <TabsContent value="business-model" className="space-y-6">
          <Card className="bg-gradient-to-r from-purple-900 to-blue-900 border-purple-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Crown className="h-6 w-6 mr-3 text-yellow-400" />
                Agentic Business Model Framework
              </CardTitle>
              <CardDescription className="text-purple-200">
                How AI agents create sustainable competitive advantages and financial returns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-purple-800/30 p-4 rounded-lg">
                    <h4 className="text-purple-200 font-medium mb-2 flex items-center">
                      <LineChart className="h-4 w-4 mr-2" />
                      Revenue Model Integration
                    </h4>
                    <ul className="text-sm text-purple-100 space-y-2">
                      <li>• <strong>Service Revenue:</strong> Agents optimize scheduling and quality, increasing billable hours by 34%</li>
                      <li>• <strong>Platform Fees:</strong> SaaS model for contractor management generates recurring revenue</li>
                      <li>• <strong>Performance Bonuses:</strong> Success-based pricing tied to agent optimization results</li>
                      <li>• <strong>Data Monetization:</strong> Anonymized insights sold to industry partners</li>
                    </ul>
                  </div>

                  <div className="bg-blue-800/30 p-4 rounded-lg">
                    <h4 className="text-blue-200 font-medium mb-2 flex items-center">
                      <Wallet className="h-4 w-4 mr-2" />
                      Cost Structure Optimization
                    </h4>
                    <ul className="text-sm text-blue-100 space-y-2">
                      <li>• <strong>Labor Efficiency:</strong> AI scheduling reduces labor costs by $45M annually</li>
                      <li>• <strong>Training Automation:</strong> Gamification cuts training costs by 43%</li>
                      <li>• <strong>Predictive Maintenance:</strong> Reduces emergency calls by 67%</li>
                      <li>• <strong>Route Optimization:</strong> Saves $12.8M in fuel and time costs</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-800/30 p-4 rounded-lg">
                    <h4 className="text-green-200 font-medium mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Competitive Moats
                    </h4>
                    <ul className="text-sm text-green-100 space-y-2">
                      <li>• <strong>Network Effects:</strong> More participants improve AI training data</li>
                      <li>• <strong>Data Advantage:</strong> Proprietary datasets create performance barriers</li>
                      <li>• <strong>Switching Costs:</strong> Integrated systems create customer lock-in</li>
                      <li>• <strong>Scale Economics:</strong> Fixed AI costs spread across growing user base</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-800/30 p-4 rounded-lg">
                    <h4 className="text-yellow-200 font-medium mb-2 flex items-center">
                      <Crown className="h-4 w-4 mr-2" />
                      Valuation Drivers
                    </h4>
                    <ul className="text-sm text-yellow-100 space-y-2">
                      <li>• <strong>Revenue Multiple:</strong> 4.2x on $268M revenue = $1.1B</li>
                      <li>• <strong>Technology Premium:</strong> AI-first architecture adds 2x multiplier</li>
                      <li>• <strong>Market Leadership:</strong> Category creation justifies premium valuation</li>
                      <li>• <strong>Growth Trajectory:</strong> 156% platform revenue growth rate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Projections */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
                5-Year Financial Projections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {[
                  { year: "2025", revenue: "$268M", margin: "63.1%", valuation: "$1.2B" },
                  { year: "2026", revenue: "$456M", margin: "67.3%", valuation: "$2.1B" },
                  { year: "2027", revenue: "$692M", margin: "71.8%", valuation: "$3.8B" },
                  { year: "2028", revenue: "$948M", margin: "74.2%", valuation: "$6.2B" },
                  { year: "2029", revenue: "$1.3B", margin: "76.9%", valuation: "$10.5B" }
                ].map((year, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg text-center">
                    <h4 className="text-white font-bold mb-2">{year.year}</h4>
                    <div className="space-y-1">
                      <div className="text-green-400 font-medium">{year.revenue}</div>
                      <div className="text-blue-400 text-sm">{year.margin}</div>
                      <div className="text-purple-400 text-sm">{year.valuation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Guide Tab */}
        <TabsContent value="guide" className="space-y-6">
          <AgenticBusinessModelGuide />
        </TabsContent>

        {/* Playful Demo Tab */}
        <TabsContent value="demo" className="space-y-6">
          <PlayfulMetricsDemo />
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
        
        <div className="space-x-4">
          <Link href="/financial-journey-progress">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              <Sparkles className="h-4 w-4 mr-2" />
              Financial Journey Progress
            </Button>
          </Link>
          <Link href="/gamification-agent">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              View Gamification ROI
            </Button>
          </Link>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => {
              // Generate comprehensive financial report
              const reportContent = `FINANCIAL INTELLIGENCE REPORT
Generated: ${new Date().toLocaleString()}

=== EXECUTIVE SUMMARY ===
Total Annual Revenue: $268.0M
Agent ROI: 423%
Cost Savings: $98.8M
Gross Margin: 63.1%

=== TOP PERFORMING AGENTS ===
1. Customer Communication Hub
   - Revenue Generated: $23.4M
   - Conversion Rate: +34%
   - Customer Satisfaction: 92%

2. Parts Prediction Engine  
   - Cost Savings: $5.8M
   - Inventory Efficiency: +67%
   - Waste Reduction: 67%

3. Route Optimization Engine
   - Efficiency Gains: $5.0M
   - Travel Time Reduction: 35%
   - Fuel Cost Savings: 28%

4. Advanced Scheduling Agent
   - Operational Efficiency: $3.9M
   - Completion Rate: +45%
   - Resource Optimization: 38%

5. Quality Assurance Inspector
   - Quality Improvements: $2.8M
   - Customer Satisfaction: +92%
   - Service Excellence: 96%

=== BUSINESS MODEL TRANSFORMATION ===
- Technology-first approach driving $1.2B valuation
- Fixed agent costs spread across growing user base
- New revenue streams from AI-powered services
- Competitive moats through data network effects

=== FINANCIAL PROJECTIONS (5-Year) ===
2025: $268M revenue, 63.1% margin, $1.2B valuation
2026: $456M revenue, 67.3% margin, $2.1B valuation
2027: $692M revenue, 71.8% margin, $3.8B valuation
2028: $948M revenue, 74.2% margin, $6.2B valuation
2029: $1.3B revenue, 76.9% margin, $10.5B valuation

=== INVESTMENT RECOMMENDATIONS ===
- Continue expanding agent capabilities across all operational areas
- Scale to additional market verticals and geographic regions
- Invest in predictive analytics and machine learning infrastructure
- Develop customer self-service AI interfaces for scalability
- Expand contractor network integration for workforce flexibility

=== RISK ANALYSIS ===
- Technology disruption risk: Mitigated by continuous innovation
- Competition risk: Protected by data moats and network effects
- Regulatory risk: Managed through compliance automation
- Market risk: Diversified across multiple service categories

=== CONCLUSION ===
America's Home Manager platform demonstrates exceptional financial performance
with 423% agent ROI and $1.2B valuation trajectory. The AI-first architecture
creates sustainable competitive advantages while delivering measurable value
across all operational metrics.
`;
              
              const blob = new Blob([reportContent], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `financial-intelligence-report-${new Date().toISOString().split('T')[0]}.txt`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Financial Report
            </Button>
        </div>
      </div>
    </div>
  );
}