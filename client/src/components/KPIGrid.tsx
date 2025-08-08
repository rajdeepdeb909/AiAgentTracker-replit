import { Bot, CheckCircle, TrendingUp, DollarSign, ArrowUp10 } from "lucide-react";

interface KPIGridProps {
  stats?: {
    totalAgents: number;
    activeAgents: number;
    avgPerformance: number;
    monthlyCost: number;
    totalRevenue: number;
  };
}

export default function KPIGrid({ stats }: KPIGridProps) {
  const kpis = [
    {
      label: "AI Agents",
      value: stats?.totalAgents || 0,
      change: "100%",
      changeLabel: "operational",
      icon: Bot,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      label: "Field Efficiency",
      value: `${stats?.avgPerformance || 0}%`,
      change: "+12.4%",
      changeLabel: "vs last month",
      icon: TrendingUp,
      color: "bg-green-500/20 text-green-400",
    },
    {
      label: "Active Jobs",
      value: "8,500",
      change: "+8",
      changeLabel: "today",
      icon: CheckCircle,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      label: "Monthly Cost",
      value: `$${stats?.monthlyCost?.toLocaleString() || "20,400,000"}`,
      change: "-5.2%",
      changeLabel: "optimization",
      icon: DollarSign,
      color: "bg-orange-500/20 text-orange-400",
      changeColor: "text-green-400",
    },
    {
      label: "Revenue Impact",
      value: `$${stats?.totalRevenue?.toLocaleString() || "30,000,000"}`,
      change: "+28.6%",
      changeLabel: "vs last month",
      icon: ArrowUp10,
      color: "bg-green-500/20 text-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div key={index} className="kpi-card animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{kpi.label}</p>
                <p className="text-3xl font-bold text-white">{kpi.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${kpi.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={kpi.changeColor || "text-green-400"}>{kpi.change}</span>
              <span className="text-gray-400 ml-1">{kpi.changeLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
