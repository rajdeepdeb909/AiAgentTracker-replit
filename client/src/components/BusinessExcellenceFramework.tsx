import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Note: Progress component not available, using custom progress bars
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Home,
  Building2,
  Settings,
  Zap,
  Award,
  Clock,
  MapPin
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function BusinessExcellenceFramework() {
  const [selectedArea, setSelectedArea] = useState<string>("supply");

  // Supply Chain Excellence Metrics
  const supplyMetrics = {
    partsAvailability: 98.5,
    directShipSuccess: 85,
    inventoryTurnRate: 12,
    supplierPerformance: 95,
    costOptimization: 15
  };

  // Demand Generation Metrics  
  const demandMetrics = {
    leadResponseTime: 1.8, // minutes
    conversionRate: 78,
    customerLifetimeValue: 3200,
    repeatCustomerRate: 65,
    referralRate: 35
  };

  // Sears Protect Warranty Metrics
  const warrantyMetrics = {
    warrantyPenetration: 25,
    claimResolutionTime: 24, // hours
    customerRetention: 85,
    revenueGrowth: 40,
    crossSellSuccess: 60
  };

  const excellenceAreas = [
    {
      id: "supply",
      title: "Supply Chain Excellence",
      icon: Package,
      description: "Parts and technician management optimization",
      metrics: supplyMetrics,
      initiatives: [
        "AI-Powered Parts Prediction",
        "Direct-Ship Optimization (85%)",
        "Technician Skills Matrix",
        "Quality Assurance Protocol"
      ]
    },
    {
      id: "demand",
      title: "Demand Generation",
      icon: TrendingUp,
      description: "D2C, B2B, and partnership growth strategies",
      metrics: demandMetrics,
      initiatives: [
        "SEO & Local Search Dominance",
        "B2B Partnership Programs",
        "Customer Lifecycle Management",
        "Multi-Channel Lead Capture"
      ]
    },
    {
      id: "warranty",
      title: "Sears Protect Integration",
      icon: Shield,
      description: "Home warranty program for long-term relationships",
      metrics: warrantyMetrics,
      initiatives: [
        "10-12 Appliance Coverage",
        "Priority Service Delivery",
        "Proactive System Monitoring",
        "Annual Health Reports"
      ]
    }
  ];

  const keyRecommendations = [
    {
      category: "Supply Chain",
      priority: "Critical",
      recommendation: "Implement AI-powered parts prediction system to achieve 30-45 day demand forecasting with 94.3% accuracy",
      impact: "Reduce emergency calls by 76% and improve first-time fix rate to 92%",
      timeline: "3 months",
      investment: "$2.5M"
    },
    {
      category: "Technician Excellence",
      priority: "High", 
      recommendation: "Deploy skills-based technician matching with AR assistance and real-time technical support",
      impact: "Increase technician productivity by 25% and customer satisfaction to 4.8/5.0",
      timeline: "4 months",
      investment: "$1.8M"
    },
    {
      category: "Sears Protect Partnership",
      priority: "Critical",
      recommendation: "Integrate comprehensive 10-12 appliance warranty program with proactive IoT monitoring",
      impact: "Build long-term relationships with $3,200 average CLV and 85% retention rate",
      timeline: "2 months", 
      investment: "$3.2M"
    },
    {
      category: "B2B Expansion",
      priority: "High",
      recommendation: "Establish property management partnerships with portfolio service agreements and SLA guarantees",
      impact: "Capture enterprise customers with 40% higher margins and predictable revenue",
      timeline: "6 months",
      investment: "$1.5M"
    },
    {
      category: "Digital Marketing",
      priority: "Medium",
      recommendation: "Dominate local search and LLM recommendations across all 430 service areas",
      impact: "Increase lead generation by 60% and improve conversion rate to 78%",
      timeline: "5 months",
      investment: "$2.0M"
    }
  ];

  const operationalKPIs = {
    supply: [
      { metric: "Parts Availability", current: 94.2, target: 98.5, unit: "%" },
      { metric: "First-Time Fix Rate", current: 88.7, target: 92.0, unit: "%" },
      { metric: "Direct-Ship Success", current: 78.3, target: 85.0, unit: "%" },
      { metric: "Inventory Turn Rate", current: 9.2, target: 12.0, unit: "x" },
      { metric: "Supplier Performance", current: 92.1, target: 95.0, unit: "%" }
    ],
    demand: [
      { metric: "Lead Response Time", current: 2.4, target: 2.0, unit: "min" },
      { metric: "Conversion Rate", current: 71.5, target: 78.0, unit: "%" },
      { metric: "Customer Lifetime Value", current: 2847, target: 3200, unit: "$" },
      { metric: "Repeat Customer Rate", current: 58.3, target: 65.0, unit: "%" },
      { metric: "Referral Rate", current: 28.7, target: 35.0, unit: "%" }
    ],
    warranty: [
      { metric: "Warranty Penetration", current: 18.4, target: 25.0, unit: "%" },
      { metric: "Claim Resolution Time", current: 28.5, target: 24.0, unit: "hrs" },
      { metric: "Customer Retention", current: 79.2, target: 85.0, unit: "%" },
      { metric: "Revenue Growth", current: 32.6, target: 40.0, unit: "%" },
      { metric: "Cross-Sell Success", current: 52.1, target: 60.0, unit: "%" }
    ]
  };

  const implementationPhases = [
    {
      phase: "Phase 1: Foundation",
      timeline: "Months 1-3",
      focus: "Core Systems Implementation",
      initiatives: [
        "Advanced parts prediction system deployment",
        "Technician excellence program launch",
        "Sears Protect partnership integration",
        "Real-time performance dashboards"
      ],
      investment: "$4.2M",
      expectedROI: "185%"
    },
    {
      phase: "Phase 2: Optimization", 
      timeline: "Months 4-6",
      focus: "Program Expansion & Enhancement",
      initiatives: [
        "B2B partnership program rollout",
        "Comprehensive warranty sales campaigns",
        "AI-powered customer success programs",
        "Quality assurance automation"
      ],
      investment: "$3.8M",
      expectedROI: "220%"
    },
    {
      phase: "Phase 3: Scale",
      timeline: "Months 7-12", 
      focus: "Market Expansion & Advanced Features",
      initiatives: [
        "All 430 service areas expansion",
        "Enterprise customer programs",
        "IoT-based predictive maintenance",
        "Target KPI achievement"
      ],
      investment: "$5.1M",
      expectedROI: "275%"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <div className="border-b border-dark-border bg-dark-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Business Excellence Framework</h1>
                <p className="text-gray-400">Supply Chain & Demand Generation Excellence Strategy</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400">
              $200M Funding at $1B Valuation
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Executive Summary */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-6 h-6 mr-2 text-blue-400" />
              Strategic Excellence Focus Areas
            </CardTitle>
            <CardDescription>
              Comprehensive framework ensuring operational excellence across supply chain management and demand generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {excellenceAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div 
                    key={area.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedArea === area.id 
                        ? 'border-blue-500 bg-blue-500/10' 
                        : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                    }`}
                    onClick={() => setSelectedArea(area.id)}
                  >
                    <div className="flex items-center mb-3">
                      <Icon className="w-5 h-5 mr-2 text-blue-400" />
                      <h3 className="font-semibold">{area.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{area.description}</p>
                    <div className="space-y-1">
                      {area.initiatives.slice(0, 2).map((initiative, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                          {initiative}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Key Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-400" />
              Strategic Recommendations for Excellence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {keyRecommendations.map((rec, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={rec.priority === "Critical" ? "destructive" : rec.priority === "High" ? "default" : "secondary"}
                      >
                        {rec.priority}
                      </Badge>
                      <span className="text-sm text-gray-400">{rec.category}</span>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div>{rec.timeline}</div>
                      <div className="text-green-400">{rec.investment}</div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-white mb-2">{rec.recommendation}</h4>
                  <p className="text-gray-300 text-sm">{rec.impact}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics Dashboard */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-green-400" />
              Operational Excellence KPIs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedArea} onValueChange={setSelectedArea}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="supply">Supply Chain</TabsTrigger>
                <TabsTrigger value="demand">Demand Generation</TabsTrigger>
                <TabsTrigger value="warranty">Sears Protect</TabsTrigger>
              </TabsList>

              {Object.entries(operationalKPIs).map(([key, kpis]) => (
                <TabsContent key={key} value={key} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kpis.map((kpi, index) => {
                      const progress = kpi.unit === "min" || kpi.unit === "hrs" 
                        ? ((kpi.target / kpi.current) * 100) 
                        : ((kpi.current / kpi.target) * 100);
                      const isOnTarget = progress >= 95;
                      
                      return (
                        <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{kpi.metric}</h4>
                            {isOnTarget ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                          <div className="flex items-baseline space-x-2 mb-2">
                            <span className="text-2xl font-bold text-white">
                              {kpi.current.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-400">{kpi.unit}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                            <span>Target: {kpi.target.toLocaleString()}{kpi.unit}</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                isOnTarget ? 'bg-green-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Implementation Roadmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-6 h-6 mr-2 text-purple-400" />
              Implementation Roadmap
            </CardTitle>
            <CardDescription>
              Three-phase approach to achieving operational excellence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {implementationPhases.map((phase, index) => (
                <div key={index} className="relative">
                  {index < implementationPhases.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-24 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{phase.phase}</h3>
                        <div className="text-right">
                          <div className="text-sm text-gray-400">{phase.timeline}</div>
                          <div className="text-green-400 font-semibold">{phase.expectedROI} ROI</div>
                        </div>
                      </div>
                      <p className="text-gray-400 mb-3">{phase.focus}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        {phase.initiatives.map((initiative, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-300">
                            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
                            {initiative}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Investment: {phase.investment}</span>
                        <Badge variant="outline" className="text-blue-400 border-blue-400">
                          {phase.focus.split(' ')[0]} Priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}