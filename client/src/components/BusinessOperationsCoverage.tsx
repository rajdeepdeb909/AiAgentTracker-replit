import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Route, Users, ClipboardCheck, Package, ShoppingCart, BarChart3, MapPin, Settings, CheckCircle, TrendingUp } from "lucide-react";

export default function BusinessOperationsCoverage() {
  const operationalAreas = [
    {
      category: "Scheduling & Resource Management",
      icon: <Calendar className="w-5 h-5 text-blue-400" />,
      coverage: 95,
      agents: [
        { name: "Advanced Scheduling Agent", role: "Primary", performance: "93.7%", specialization: "Technician schedules, appointment optimization, resource allocation" },
        { name: "Customer Communication Hub", role: "Support", performance: "89.8%", specialization: "Appointment scheduling, customer coordination" },
        { name: "Maintenance Scheduler Pro", role: "Support", performance: "88.9%", specialization: "Preventive maintenance, warranty tracking" }
      ],
      metrics: {
        dailyScheduledJobs: 285,
        utilizationRate: "94.1%",
        conflictReduction: "45%",
        customerSatisfaction: "92.8%"
      }
    },
    {
      category: "Routing & Logistics",
      icon: <Route className="w-5 h-5 text-green-400" />,
      coverage: 92,
      agents: [
        { name: "Route Optimization Engine", role: "Primary", performance: "94.2%", specialization: "Technician routes, travel time minimization, capacity maximization" },
        { name: "Regional Performance Monitor", role: "Support", performance: "92.8%", specialization: "Geographic analysis, territorial optimization" }
      ],
      metrics: {
        avgTravelTimeReduction: "28%",
        fuelCostSavings: "$42,000/mo",
        dailyRoutesOptimized: 65,
        onTimePerformance: "96.3%"
      }
    },
    {
      category: "Technician Interactions & Workforce",
      icon: <Users className="w-5 h-5 text-purple-400" />,
      coverage: 88,
      agents: [
        { name: "Technician Interaction Hub", role: "Primary", performance: "90.4%", specialization: "Mobile workforce coordination, job updates, communication" },
        { name: "Electrical Safety Compliance Agent", role: "Support", performance: "96.7%", specialization: "Safety protocols, regulatory compliance" },
        { name: "Quality Assurance Inspector", role: "Support", performance: "85.2%", specialization: "Work quality review, technician feedback" }
      ],
      metrics: {
        dailyInteractions: 340,
        mobileUpdateTime: "30s avg",
        complianceRate: "98.5%",
        qualityScore: "94.2%"
      }
    },
    {
      category: "Outstanding Service Orders",
      icon: <ClipboardCheck className="w-5 h-5 text-orange-400" />,
      coverage: 91,
      agents: [
        { name: "Outstanding Orders Manager", role: "Primary", performance: "88.2%", specialization: "Order tracking, proactive updates, completion follow-ups" },
        { name: "Plumbing Dispatch Coordinator", role: "Support", performance: "92.1%", specialization: "Emergency coordination, multi-trade scheduling" },
        { name: "Emergency Response Coordinator", role: "Support", performance: "96.8%", specialization: "Priority classification, rapid response" }
      ],
      metrics: {
        activeOrders: 198,
        completionRate: "94.7%",
        proactiveUpdates: "247/day",
        avgResolutionTime: "42.5 min"
      }
    },
    {
      category: "Parts Prediction & Inventory",
      icon: <Package className="w-5 h-5 text-cyan-400" />,
      coverage: 94,
      agents: [
        { name: "Parts Prediction Engine", role: "Primary", performance: "91.6%", specialization: "Job code analysis, direct-ship predictions, supplier coordination" },
        { name: "Inventory Management Assistant", role: "Primary", performance: "87.6%", specialization: "Minimal truck inventory (30-day turnover), high-frequency parts" },
        { name: "HVAC System Diagnostics AI", role: "Support", performance: "95.3%", specialization: "Diagnostic job coding for parts prediction" }
      ],
      metrics: {
        directShipAccuracy: "92.4%",
        truckInventoryTurnover: "30 days",
        supplierResponseTime: "24h avg",
        diagnosticToParts: "95.3%"
      }
    },
    {
      category: "Parts Ordering & Procurement",
      icon: <ShoppingCart className="w-5 h-5 text-yellow-400" />,
      coverage: 96,
      agents: [
        { name: "Parts Ordering Specialist", role: "Primary", performance: "94.8%", specialization: "Direct-ship automation, supplier APIs, customer delivery coordination" },
        { name: "Pricing & Estimation Specialist", role: "Support", performance: "91.3%", specialization: "Supplier cost comparisons, delivery optimization" }
      ],
      metrics: {
        directShipAutomation: "95.2%",
        avgDeliveryTime: "24-48h",
        supplierCoverage: "99.1%",
        orderToDelivery: "97.8%"
      }
    },
    {
      category: "Performance & Profit Analysis",
      icon: <BarChart3 className="w-5 h-5 text-red-400" />,
      coverage: 93,
      agents: [
        { name: "Performance Analytics AI", role: "Primary", performance: "95.1%", specialization: "Job codes, profit margins, technician efficiency analysis" },
        { name: "Pricing & Estimation Specialist", role: "Support", performance: "91.3%", specialization: "Competitive pricing, market analysis" }
      ],
      metrics: {
        profitMarginOptimization: "12.4%",
        jobCodeAnalysis: "Real-time",
        revenueImpact: "$45,200/mo",
        insightGeneration: "85/day"
      }
    },
    {
      category: "Planning Area Performance",
      icon: <MapPin className="w-5 h-5 text-indigo-400" />,
      coverage: 89,
      agents: [
        { name: "Regional Performance Monitor", role: "Primary", performance: "92.8%", specialization: "Local market analysis, area-specific metrics, territorial optimization" },
        { name: "Performance Analytics AI", role: "Support", performance: "95.1%", specialization: "Geographic performance data analysis" }
      ],
      metrics: {
        territoriesTracked: 12,
        marketInsights: "Real-time",
        growthOpportunities: "17 identified",
        localPerformance: "Variable by region"
      }
    }
  ];

  const getPerformanceColor = (coverage: number) => {
    if (coverage >= 95) return "text-green-400";
    if (coverage >= 90) return "text-blue-400";
    if (coverage >= 85) return "text-yellow-400";
    return "text-red-400";
  };

  const getCoverageStatus = (coverage: number) => {
    if (coverage >= 95) return { status: "Excellent", color: "bg-green-500/20 text-green-400" };
    if (coverage >= 90) return { status: "Strong", color: "bg-blue-500/20 text-blue-400" };
    if (coverage >= 85) return { status: "Good", color: "bg-yellow-500/20 text-yellow-400" };
    return { status: "Needs Attention", color: "bg-red-500/20 text-red-400" };
  };

  const overallCoverage = operationalAreas.reduce((sum, area) => sum + area.coverage, 0) / operationalAreas.length;

  return (
    <div className="space-y-6">
      {/* Overall Coverage Summary */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span className="flex items-center">
              <Settings className="w-5 h-5 mr-2 text-blue-400" />
              Business Operations Coverage Summary
            </span>
            <Badge className="bg-blue-500/20 text-blue-400 text-lg px-4 py-2">
              {Math.round(overallCoverage)}% Overall Coverage
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">26</p>
              <p className="text-sm text-gray-400">Total AI Agents</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">8</p>
              <p className="text-sm text-gray-400">Operational Areas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">25</p>
              <p className="text-sm text-gray-400">Active Agents</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-400">92.4%</p>
              <p className="text-sm text-gray-400">Avg Performance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Operations Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {operationalAreas.map((area, index) => {
          const coverageStatus = getCoverageStatus(area.coverage);
          
          return (
            <Card key={index} className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center">
                    {area.icon}
                    <span className="ml-2">{area.category}</span>
                  </span>
                  <Badge className={coverageStatus.color}>
                    {coverageStatus.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coverage Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Coverage Level</span>
                    <span className={`font-semibold ${getPerformanceColor(area.coverage)}`}>
                      {area.coverage}%
                    </span>
                  </div>
                  <Progress value={area.coverage} className="h-2" />
                </div>

                {/* Agents Responsible */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Responsible Agents</h4>
                  <div className="space-y-2">
                    {area.agents.map((agent, agentIndex) => (
                      <div key={agentIndex} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                        <div>
                          <p className="text-white text-sm font-medium">{agent.name}</p>
                          <p className="text-xs text-gray-400">{agent.specialization}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={agent.role === "Primary" ? "default" : "outline"} className="text-xs">
                            {agent.role}
                          </Badge>
                          <p className="text-xs text-gray-400 mt-1">{agent.performance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Key Metrics</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(area.metrics).map(([key, value], metricIndex) => (
                      <div key={metricIndex} className="bg-gray-800/30 p-2 rounded">
                        <p className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-white font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Coverage Gaps & Recommendations */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-yellow-400" />
            Coverage Analysis & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Strongest Coverage Areas</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-500/10 border border-green-500/20 rounded">
                  <span className="text-green-400">Parts Ordering & Procurement</span>
                  <span className="text-green-400 font-semibold">96%</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                  <span className="text-blue-400">Scheduling & Resource Management</span>
                  <span className="text-blue-400 font-semibold">95%</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                  <span className="text-blue-400">Parts Prediction & Inventory</span>
                  <span className="text-blue-400 font-semibold">94%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Improvement Opportunities</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                  <span className="text-yellow-400">Technician Interactions</span>
                  <span className="text-yellow-400 font-semibold">88%</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                  <span className="text-yellow-400">Planning Area Performance</span>
                  <span className="text-yellow-400 font-semibold">89%</span>
                </div>
                <div className="text-xs text-gray-400 mt-3">
                  <p>• Enhance technician mobile app integration</p>
                  <p>• Expand regional performance analytics</p>
                  <p>• Improve quality assessment automation</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}