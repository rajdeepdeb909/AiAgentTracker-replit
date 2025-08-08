import { useQuery } from "@tanstack/react-query";
import { DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import type { Agent } from "@shared/schema";

export default function Financials() {
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

  const totalCost = stats?.monthlyCost || 0;
  const totalRevenue = stats?.totalRevenue || 0;
  const netProfit = totalRevenue - totalCost;
  const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

  const topRevenueAgents = agents
    .sort((a, b) => parseFloat(b.revenueImpact) - parseFloat(a.revenueImpact))
    .slice(0, 5);

  const costBreakdown = agents.map(agent => ({
    name: agent.name,
    cost: parseFloat(agent.monthlyCost),
    revenue: parseFloat(agent.revenueImpact),
    profit: parseFloat(agent.revenueImpact) - parseFloat(agent.monthlyCost)
  }));

  return (
    <div className="flex min-h-screen bg-dark text-gray-200">
      <Sidebar />
      
      <main className="flex-1 overflow-x-hidden">
        <header className="bg-dark-card border-b border-dark-border p-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Financial Metrics</h1>
            <p className="text-gray-400 mt-1">Track costs, revenue, and ROI across your AI agents</p>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Monthly Cost</p>
                    <p className="text-3xl font-bold text-red-400">
                      ${totalCost.toLocaleString()}
                    </p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-400" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-red-400 mr-1" />
                  <span className="text-red-400">+8.3% vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-400">
                      ${totalRevenue.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400">+15.6% vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Net Profit</p>
                    <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${netProfit.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400">+22.1% vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">ROI</p>
                    <p className={`text-3xl font-bold ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {roi.toFixed(1)}%
                    </p>
                  </div>
                  <PieChart className="w-8 h-8 text-blue-400" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400">+18.5% vs last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Revenue Generators */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Top Revenue Generators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRevenueAgents.map((agent, index) => {
                    const revenue = parseFloat(agent.revenueImpact);
                    const cost = parseFloat(agent.monthlyCost);
                    const profit = revenue - cost;
                    
                    return (
                      <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 text-sm font-bold text-black">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-white font-medium">{agent.name}</p>
                            <p className="text-gray-400 text-sm">Cost: ${cost}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">${revenue.toLocaleString()}</p>
                          <p className={`text-sm ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {profit >= 0 ? '+' : ''}${profit.toLocaleString()} profit
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <PieChart className="w-5 h-5 mr-2 text-blue-400" />
                  Cost Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costBreakdown
                    .sort((a, b) => b.cost - a.cost)
                    .slice(0, 6)
                    .map((agent, index) => {
                      const costPercentage = totalCost > 0 ? (agent.cost / totalCost) * 100 : 0;
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white text-sm">{agent.name}</span>
                            <span className="text-gray-400 text-sm">
                              ${agent.cost} ({costPercentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${costPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Financial Table */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Detailed Financial Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400">Agent</th>
                      <th className="text-right py-3 px-4 text-gray-400">Monthly Cost</th>
                      <th className="text-right py-3 px-4 text-gray-400">Revenue Impact</th>
                      <th className="text-right py-3 px-4 text-gray-400">Net Profit</th>
                      <th className="text-right py-3 px-4 text-gray-400">ROI</th>
                      <th className="text-right py-3 px-4 text-gray-400">Daily Interactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costBreakdown.map((agent, index) => {
                      const roi = agent.cost > 0 ? ((agent.profit / agent.cost) * 100) : 0;
                      const agentData = agents.find(a => a.name === agent.name);
                      
                      return (
                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-white font-medium">{agent.name}</p>
                              <p className="text-gray-400 text-sm">{agentData?.type}</p>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4 text-red-400 font-medium">
                            ${agent.cost.toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-4 text-green-400 font-medium">
                            ${agent.revenue.toLocaleString()}
                          </td>
                          <td className={`text-right py-3 px-4 font-medium ${agent.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {agent.profit >= 0 ? '+' : ''}${agent.profit.toLocaleString()}
                          </td>
                          <td className={`text-right py-3 px-4 font-medium ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {roi.toFixed(1)}%
                          </td>
                          <td className="text-right py-3 px-4 text-gray-300">
                            {agentData?.dailyInteractions.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}