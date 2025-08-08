import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function ProgressTrackingDashboard() {
  const serviceOrderMetrics = {
    totalOrders: 247,
    completedOrders: 231,
    averageCompletionTime: 42.5,
    customerSatisfaction: 94.2,
    trends: {
      completionTime: -8.3, // Improvement (negative is better)
      satisfaction: +2.1,   // Improvement  
      efficiency: +12.4     // Improvement
    }
  };

  const technicianPerformance = {
    totalTechnicians: 34,
    certifiedTechnicians: 31,
    averageRating: 4.7,
    complianceRate: 98.5,
    trends: {
      skillLevel: +5.2,
      compliance: +1.8,
      customerRating: +0.3
    }
  };

  const partsLifecycle = {
    ordersProcessed: 156,
    accurateForecasts: 144,
    wasteReduction: 22.3,
    supplierEfficiency: 89.7,
    trends: {
      forecastAccuracy: +7.4,
      wasteReduction: +15.2,
      supplierResponse: +4.8
    }
  };

  const feedbackLoops = [
    {
      agent: "Plumbing Dispatch Coordinator",
      dataSource: "Service Order Completion",
      lastUpdate: "2 minutes ago",
      improvementTrend: +12.4,
      status: "optimizing",
      feedback: "Response time decreased 35% through routing optimization"
    },
    {
      agent: "Electrical Safety Compliance",
      dataSource: "Technician Performance",
      lastUpdate: "15 minutes ago", 
      improvementTrend: +1.8,
      status: "stable",
      feedback: "100% compliance maintained, expanding to plumbing permits"
    },
    {
      agent: "Inventory Management",
      dataSource: "Parts Lifecycle Tracking",
      lastUpdate: "1 hour ago",
      improvementTrend: +15.2,
      status: "improving",
      feedback: "Diagnostic accuracy reducing over-ordering by 15%"
    },
    {
      agent: "Quality Assurance Inspector",
      dataSource: "Photo Analysis & Reviews",
      lastUpdate: "3 hours ago",
      improvementTrend: -2.1,
      status: "training",
      feedback: "Photo analysis accuracy needs enhancement for complex installations"
    }
  ];

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Target className="w-4 h-4 text-gray-400" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimizing':
        return <Badge className="bg-blue-500/20 text-blue-400">Optimizing</Badge>;
      case 'improving':
        return <Badge className="bg-green-500/20 text-green-400">Improving</Badge>;
      case 'stable':
        return <Badge className="bg-gray-500/20 text-gray-400">Stable</Badge>;
      case 'training':
        return <Badge className="bg-yellow-500/20 text-yellow-400">Training</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Service Order Lifecycle Progress */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            Service Order Lifecycle Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-2xl font-bold text-white">{serviceOrderMetrics.completedOrders}/{serviceOrderMetrics.totalOrders}</p>
              <p className="text-sm text-gray-400">Orders Completed</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(serviceOrderMetrics.trends.efficiency)}
                <span className="text-green-400 text-sm ml-1">+{serviceOrderMetrics.trends.efficiency}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{serviceOrderMetrics.averageCompletionTime}min</p>
              <p className="text-sm text-gray-400">Avg Completion</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm ml-1">{serviceOrderMetrics.trends.completionTime}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{serviceOrderMetrics.customerSatisfaction}%</p>
              <p className="text-sm text-gray-400">Customer Satisfaction</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(serviceOrderMetrics.trends.satisfaction)}
                <span className="text-green-400 text-sm ml-1">+{serviceOrderMetrics.trends.satisfaction}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">94%</p>
              <p className="text-sm text-gray-400">First-Call Resolution</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm ml-1">+6.2%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technician Performance & Compliance */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-400" />
            Technician Performance & Compliance Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-2xl font-bold text-white">{technicianPerformance.certifiedTechnicians}/{technicianPerformance.totalTechnicians}</p>
              <p className="text-sm text-gray-400">Certified Technicians</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(technicianPerformance.trends.skillLevel)}
                <span className="text-green-400 text-sm ml-1">+{technicianPerformance.trends.skillLevel}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{technicianPerformance.averageRating}/5.0</p>
              <p className="text-sm text-gray-400">Avg Rating</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(technicianPerformance.trends.customerRating)}
                <span className="text-green-400 text-sm ml-1">+{technicianPerformance.trends.customerRating}</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{technicianPerformance.complianceRate}%</p>
              <p className="text-sm text-gray-400">Compliance Rate</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(technicianPerformance.trends.compliance)}
                <span className="text-green-400 text-sm ml-1">+{technicianPerformance.trends.compliance}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-gray-400">Safety Violations</p>
              <div className="flex items-center mt-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm ml-1">Zero incidents</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parts Order Lifecycle */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-400" />
            Parts Order Lifecycle (Diagnosis → Order → Install → Return)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-2xl font-bold text-white">{partsLifecycle.accurateForecasts}/{partsLifecycle.ordersProcessed}</p>
              <p className="text-sm text-gray-400">Accurate Forecasts</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(partsLifecycle.trends.forecastAccuracy)}
                <span className="text-green-400 text-sm ml-1">+{partsLifecycle.trends.forecastAccuracy}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{partsLifecycle.wasteReduction}%</p>
              <p className="text-sm text-gray-400">Waste Reduction</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(partsLifecycle.trends.wasteReduction)}
                <span className="text-green-400 text-sm ml-1">+{partsLifecycle.trends.wasteReduction}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{partsLifecycle.supplierEfficiency}%</p>
              <p className="text-sm text-gray-400">Supplier Efficiency</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(partsLifecycle.trends.supplierResponse)}
                <span className="text-green-400 text-sm ml-1">+{partsLifecycle.trends.supplierResponse}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">18min</p>
              <p className="text-sm text-gray-400">Avg Order Time</p>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm ml-1">-22%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Agent Feedback Loops */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            AI Agent Learning & Improvement Feedback Loops
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackLoops.map((loop, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="text-white font-medium mr-3">{loop.agent}</h4>
                      {getStatusBadge(loop.status)}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Data Source: {loop.dataSource}</p>
                    <p className="text-sm text-gray-300">{loop.feedback}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center mb-1">
                      {getTrendIcon(loop.improvementTrend)}
                      <span className={`text-sm ml-1 ${loop.improvementTrend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {loop.improvementTrend > 0 ? '+' : ''}{loop.improvementTrend}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{loop.lastUpdate}</p>
                  </div>
                </div>
                
                {/* Progress bar showing improvement over time */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Learning Progress</span>
                    <span>{Math.max(0, 75 + loop.improvementTrend)}%</span>
                  </div>
                  <Progress value={Math.max(0, 75 + loop.improvementTrend)} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}