import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Building2, 
  Building,
  TrendingUp, 
  Shield, 
  DollarSign, 
  Users, 
  BarChart3, 
  Zap,
  Globe,
  Command,
  Target,
  AlertTriangle,
  CheckCircle,
  Activity,
  Star,
  MapPin,
  Clock,
  Wrench,
  Brain,
  ArrowLeft,
  MessageSquare,
  Calendar,
  Monitor
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function AmericasHomeManager() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // National Infrastructure Metrics
  const nationalMetrics = {
    totalMarketCoverage: 85.7, // % of US households covered
    activeMarketPods: 387,
    totalTechnicians: 1847,
    dailyJobsCompleted: 12456,
    annualRevenue: 320.0, // millions (Q3 2025 $80M * 4)
    grossMargin: 42.8,
    netMargin: 18.4,
    customerNPS: 78,
    technicianRetention: 91.3
  };

  // Market Expansion Status
  const marketExpansion = [
    {
      region: "Tier 1 Metro",
      markets: 45,
      coverage: 94.2,
      status: "saturated",
      growth: "optimization"
    },
    {
      region: "Tier 2 Metro", 
      markets: 127,
      coverage: 87.5,
      status: "scaling",
      growth: "aggressive"
    },
    {
      region: "Suburban/Rural",
      markets: 215,
      coverage: 76.3,
      status: "expanding",
      growth: "measured"
    },
    {
      region: "Premium Markets",
      markets: 28,
      coverage: 98.1,
      status: "premium",
      growth: "margin-focused"
    }
  ];

  // Revenue Growth Trajectory
  const revenueGrowth = [
    { 
      period: "Q3 2025 (Current)", 
      revenue: 80.0, 
      margin: 18.4,
      highlights: ["387 active market pods", "1,847 technicians deployed", "12.4k daily jobs completed"]
    },
    { 
      period: "Q4 2025 (Forecast)", 
      revenue: 92.0, 
      margin: 22.1,
      highlights: ["430 market pods target", "2,100 technicians", "15k+ daily capacity"] 
    },
    { 
      period: "Q1 2026 (Forecast)", 
      revenue: 95.0, 
      margin: 25.8,
      highlights: ["Series A funding deployed", "50+ new markets", "Advanced AI rollout"]
    },
    { 
      period: "Q2 2026 (Forecast)", 
      revenue: 91.0, 
      margin: 28.4,
      highlights: ["Premium service expansion", "B2B partnerships scaled", "Category diversification"]
    }
  ];

  // Strategic Advantages
  const competitiveAdvantages = [
    {
      icon: Brain,
      color: "#3b82f6",
      title: "AI-First Architecture",
      description: "95% autonomous execution vs 30% industry standard",
      benefits: [
        "60% lower operational costs",
        "Proprietary ML models with 5+ years training data",
        "Real-time decision optimization across 387 markets",
        "Predictive maintenance reducing failures by 73%"
      ]
    },
    {
      icon: Globe,
      color: "#10b981",
      title: "Network Effects",
      description: "Each new market pod improves routing for all pods",
      benefits: [
        "23% faster response times at scale",
        "Winner-take-all market dynamics",
        "Cross-market optimization algorithms",
        "Shared learning from 1.8M+ service interactions"
      ]
    },
    {
      icon: Shield,
      color: "#8b5cf6",
      title: "Full-Stack Solution",
      description: "End-to-end platform from customer booking to payment",
      benefits: [
        "45% higher customer lifetime value",
        "Integrated ecosystem switching costs",
        "Complete data visibility across service lifecycle",
        "Unified quality and compliance management"
      ]
    },
    {
      icon: BarChart3,
      color: "#f59e0b",
      title: "Distribution Innovation",
      description: "Run business by percentiles, not averages",
      benefits: [
        "40% improvement in outlier performance",
        "Advanced statistical operation model",
        "Tail risk management across all markets",
        "Performance optimization at population scale"
      ]
    }
  ];

  // Investment Thesis
  const investmentHighlights = [
    {
      metric: "Total Addressable Market",
      value: "$600B",
      color: "#3b82f6",
      description: "US home services market growing 8% annually"
    },
    {
      metric: "Funding Target",
      value: "$200M",
      color: "#10b981",
      description: "Growth, technology, acquisitions, category expansion at $1B valuation"
    },
    {
      metric: "Technology Superiority",
      value: "3-5 years",
      color: "#8b5cf6",
      description: "Lead over traditional competitors"
    },
    {
      metric: "Market Share Opportunity",
      value: "15-20%",
      color: "#f59e0b",
      description: "In targeted metro markets by 2027"
    }
  ];

  // Operational Excellence Metrics
  const operationalMetrics = [
    {
      category: "Efficiency",
      metrics: [
        { name: "Travel Time Reduction", value: "35%", benchmark: "vs traditional dispatch" },
        { name: "Parts Delivery Success", value: "85%", benchmark: "direct-ship model" },
        { name: "First-Time Fix Rate", value: "89.2%", benchmark: "industry avg: 76%" },
        { name: "Customer Satisfaction", value: "92%", benchmark: "vs 73% industry" }
      ]
    },
    {
      category: "Technology",
      metrics: [
        { name: "Autonomous Execution", value: "95%", benchmark: "human oversight minimal" },
        { name: "AI Response Accuracy", value: "94.1%", benchmark: "conversational AI" },
        { name: "Predictive Maintenance", value: "78%", benchmark: "failure prevention" },
        { name: "App Engagement", value: "96.5%", benchmark: "technician adoption" }
      ]
    },
    {
      category: "Financial",
      metrics: [
        { name: "Gross Margin", value: "42.8%", benchmark: "vs 28% traditional" },
        { name: "Customer Acquisition Cost", value: "$47", benchmark: "vs $180 industry" },
        { name: "Lifetime Value", value: "$2,340", benchmark: "LTV:CAC = 49.8:1" },
        { name: "Monthly Recurring Revenue", value: "$38.2M", benchmark: "97% retention" }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Home className="w-8 h-8 text-blue-400" />
            America's Home Manager
          </h1>
          <p className="text-gray-400 mt-1">
            National AI Infrastructure • $600B Market Opportunity • Funding: $200M at $1B Valuation
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-green-400 border-green-400">
            387 Market Pods Active  
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            $80M Q3 2025
          </Badge>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            $200M Funding Ready
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="national" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="national" className="text-white">National Infrastructure</TabsTrigger>
          <TabsTrigger value="growth" className="text-white">Revenue Growth</TabsTrigger>
          <TabsTrigger value="competitive" className="text-white">Competitive Moats</TabsTrigger>
        </TabsList>

        {/* National Infrastructure Tab */}
        <TabsContent value="national" className="space-y-6">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-400">{nationalMetrics.totalMarketCoverage}%</div>
                <div className="text-sm text-gray-400">US Household Coverage</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-400">{nationalMetrics.activeMarketPods}</div>
                <div className="text-sm text-gray-400">Active Market Pods</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-400">{nationalMetrics.totalTechnicians.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Field Technicians</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-400">{nationalMetrics.dailyJobsCompleted.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Daily Jobs Completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Market Expansion Status */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                Market Expansion Status
              </CardTitle>
              <CardDescription className="text-gray-400">
                Strategic market penetration across 415 total markets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketExpansion.map((region, idx) => (
                  <div key={idx} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-white font-medium">{region.region}</h4>
                        <p className="text-gray-400 text-sm">{region.markets} markets • {region.coverage}% coverage</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline"
                          className={
                            region.status === 'saturated' ? 'text-blue-400 border-blue-400' :
                            region.status === 'scaling' ? 'text-green-400 border-green-400' :
                            region.status === 'expanding' ? 'text-orange-400 border-orange-400' :
                            'text-purple-400 border-purple-400'
                          }
                        >
                          {region.status}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {region.growth}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={region.coverage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Annual Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  ${nationalMetrics.annualRevenue}M
                </div>
                <div className="text-sm text-gray-400">
                  Growing 127% YoY
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Gross Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {nationalMetrics.grossMargin}%
                </div>
                <div className="text-sm text-gray-400">
                  vs 28% industry avg
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Net Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {nationalMetrics.netMargin}%
                </div>
                <div className="text-sm text-gray-400">
                  vs 8% industry avg
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>



        {/* Revenue Growth Tab */}
        <TabsContent value="growth" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Revenue Growth Trajectory
              </CardTitle>
              <CardDescription className="text-gray-400">
                Path to $50M ARR with Series A funding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueGrowth.map((period, idx) => (
                  <div key={idx} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">{period.period}</h4>
                        <div className="text-2xl font-bold text-green-400 mt-1">
                          ${period.revenue}M Revenue
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-400">
                          {period.margin}% Margin
                        </div>
                        {idx > 0 && (
                          <div className="text-sm text-gray-400">
                            +{((period.revenue / revenueGrowth[idx-1].revenue - 1) * 100).toFixed(0)}% QoQ
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-300">
                      {period.highlights.join(" • ")}
                    </div>
                  </div>
                ))}

                {/* Series A Funding Card */}
                <div className="p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Series A Funding Strategy</h3>
                    <Badge variant="outline" className="text-blue-400 border-blue-400">
                      Target: $200M at $1B Valuation
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Use of Funds</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Growth acceleration in 50+ new markets</li>
                        <li>• AI technology and infrastructure</li>
                        <li>• Strategic acquisitions</li>
                        <li>• Category expansion beyond home services</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Key Metrics</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• 35% YoY revenue growth</li>
                        <li>• 85% customer retention</li>
                        <li>• $3.2M ARR per planning area</li>
                        <li>• 94.8% AI autonomous execution</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitive Moats Tab */}
        <TabsContent value="competitive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {competitiveAdvantages.map((advantage, idx) => (
              <Card key={idx} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <advantage.icon className="w-5 h-5" style={{color: advantage.color}} />
                    {advantage.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {advantage.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {advantage.benefits.map((benefit, benefitIdx) => (
                      <div key={benefitIdx} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
