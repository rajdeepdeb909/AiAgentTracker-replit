import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import PerformanceCharts from "@/components/PerformanceCharts";
import PlanningAreaMetrics from "@/components/PlanningAreaMetrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Activity, DollarSign, MapPin, BarChart3 } from "lucide-react";
import type { Agent } from "@shared/schema";

export default function Performance() {
  const { data: agents = [], isLoading: agentsLoading } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  const { data: stats, isLoading: statsLoading } = useQuery<{
    totalAgents: number;
    activeAgents: number;
    avgPerformance: number;
    monthlyCost: number;
    totalRevenue: number;
  }>({
    queryKey: ["/api/dashboard/stats"],
  });

  if (agentsLoading || statsLoading) {
    return (
      <div className="flex min-h-screen bg-dark">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const topPerformers = agents
    .sort((a, b) => parseFloat(b.performance) - parseFloat(a.performance))
    .slice(0, 5);

  const revenueEfficient = agents
    .map(agent => ({
      ...agent,
      efficiency: parseFloat(agent.revenueImpact) / parseFloat(agent.monthlyCost)
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-dark text-gray-200">
      <Sidebar />
      
      <main className="flex-1 overflow-x-hidden">
        <header className="bg-dark-card border-b border-dark-border p-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
            <p className="text-gray-400 mt-1">Comprehensive performance insights and trends</p>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <Tabs defaultValue="agent-performance" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="agent-performance" className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Agent Performance
              </TabsTrigger>
              <TabsTrigger value="planning-areas" className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Planning Area Metrics (430)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="agent-performance" className="space-y-6">
              {/* Performance Charts */}
              <PerformanceCharts />

              {/* Performance Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((agent, index) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white font-medium">{agent.name}</p>
                          <p className="text-gray-400 text-sm">{agent.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-bold">{agent.performance}%</p>
                        <p className="text-gray-400 text-sm">{agent.accuracy}% accuracy</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Efficiency */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
                  Revenue Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueEfficient.map((agent, index) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold text-black">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white font-medium">{agent.name}</p>
                          <p className="text-gray-400 text-sm">${agent.monthlyCost}/month</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 font-bold">{agent.efficiency.toFixed(1)}x</p>
                        <p className="text-gray-400 text-sm">${agent.revenueImpact} revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Response Time</p>
                    <p className="text-2xl font-bold text-white">
                      {(agents.reduce((sum, a) => sum + parseFloat(a.responseTime), 0) / agents.length).toFixed(1)}s
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-400" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400">-12% vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Interactions</p>
                    <p className="text-2xl font-bold text-white">
                      {agents.reduce((sum, a) => sum + a.dailyInteractions, 0).toLocaleString()}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400">+8.2% vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Success Rate</p>
                    <p className="text-2xl font-bold text-white">
                      {(agents.reduce((sum, a) => sum + parseFloat(a.accuracy), 0) / agents.length).toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400">+2.4% vs last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">ROI</p>
                    <p className="text-2xl font-bold text-white">
                      {((stats?.totalRevenue || 0) / (stats?.monthlyCost || 1)).toFixed(1)}x
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400">+18.5% vs last month</span>
                </div>
              </CardContent>
            </Card>
              </div>
            </TabsContent>

            <TabsContent value="planning-areas" className="space-y-6">
              <PlanningAreaMetrics />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}