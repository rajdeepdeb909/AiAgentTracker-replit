import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, TrendingDown, BarChart3, Clock, Filter, TableIcon, BarChart2 } from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart
} from "recharts";

interface HistoricalMetric {
  id: number;
  date: string;
  time?: string;
  period: string;
  totalAgents: number;
  activeAgents: number;
  avgPerformance: number;
  totalRevenue: number;
  totalCost: number;
  profitMargin: number;
  customerSatisfaction: number;
  callVolume: number;
  conversionRate: number;
  techniciansDeployed: number;
  activeJobs: number;
  openOrders: number;
  planningArea?: string;
  productType?: string;
  callType?: string;
  jobCode?: string;
  orderStatuses?: {
    waitingService: number;
    waitingParts: number;
    rescheduleNeeded: number;
    assignedToday: number;
    tentative: number;
  };
  additionalMetrics?: Record<string, any>;
}

interface AgentPerformanceHistory {
  id: number;
  agentId: number;
  date: string;
  time?: string;
  performance: number;
  interactions: number;
  successRate: number;
  averageResponseTime: number;
  errorCount: number;
  userSatisfaction?: number;
  revenueGenerated?: number;
  costIncurred?: number;
  planningArea?: string;
  contextData?: Record<string, any>;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

interface FilterOptions {
  planningAreas: string[];
  productTypes: string[];
  callTypes: string[];
  jobCodes: string[];
}

export default function HistoricalDataDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [dateRange, setDateRange] = useState("30");
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"charts" | "tables">("charts");
  
  // Filters
  const [selectedPlanningArea, setSelectedPlanningArea] = useState<string>("All Areas");
  const [selectedProductType, setSelectedProductType] = useState<string>("All Products");
  const [selectedCallType, setSelectedCallType] = useState<string>("All Calls");
  const [selectedJobCode, setSelectedJobCode] = useState<string>("All Jobs");

  // Calculate date range for API calls
  const getDateRange = () => {
    const days = parseInt(dateRange);
    const to = format(new Date(), 'yyyy-MM-dd');
    const from = format(subDays(new Date(), days), 'yyyy-MM-dd');
    return { from, to };
  };

  // Fetch filter options
  const { data: filterOptions } = useQuery({
    queryKey: ['/api/historical/filter-options'],
    queryFn: async () => {
      const response = await fetch('/api/historical/filter-options');
      if (!response.ok) throw new Error('Failed to fetch filter options');
      return response.json() as FilterOptions;
    }
  });

  // Fetch historical metrics
  const { data: historicalMetrics = [], isLoading: metricsLoading } = useQuery({
    queryKey: ['/api/historical/metrics', selectedPeriod, dateRange, selectedPlanningArea, selectedProductType, selectedCallType, selectedJobCode],
    queryFn: async () => {
      const { from, to } = getDateRange();
      const params = new URLSearchParams({
        period: selectedPeriod,
        from,
        to,
      });
      
      if (selectedPlanningArea !== "All Areas") params.append('planningArea', selectedPlanningArea);
      if (selectedProductType !== "All Products") params.append('productType', selectedProductType);
      if (selectedCallType !== "All Calls") params.append('callType', selectedCallType);
      if (selectedJobCode !== "All Jobs") params.append('jobCode', selectedJobCode);
      
      const response = await fetch(`/api/historical/metrics?${params}`);
      if (!response.ok) throw new Error('Failed to fetch historical metrics');
      return response.json() as HistoricalMetric[];
    }
  });

  // Fetch agent performance history
  const { data: agentHistory = [], isLoading: historyLoading } = useQuery({
    queryKey: ['/api/historical/agent-performance', selectedAgent, dateRange, selectedPlanningArea, selectedProductType, selectedCallType, selectedJobCode],
    queryFn: async () => {
      const { from, to } = getDateRange();
      const params = new URLSearchParams({
        from,
        to,
      });
      
      if (selectedAgent !== "all") params.append('agentId', selectedAgent);
      if (selectedPlanningArea !== "All Areas") params.append('planningArea', selectedPlanningArea);
      if (selectedProductType !== "All Products") params.append('productType', selectedProductType);
      if (selectedCallType !== "All Calls") params.append('callType', selectedCallType);
      if (selectedJobCode !== "All Jobs") params.append('jobCode', selectedJobCode);
      
      const response = await fetch(`/api/historical/agent-performance?${params}`);
      if (!response.ok) throw new Error('Failed to fetch agent history');
      return response.json() as AgentPerformanceHistory[];
    }
  });

  // Calculate trends and aggregations
  const calculateTrends = () => {
    if (historicalMetrics.length < 2) return null;
    
    const latest = historicalMetrics[historicalMetrics.length - 1];
    const previous = historicalMetrics[historicalMetrics.length - 2];
    
    return {
      revenue: {
        current: latest.totalRevenue,
        change: latest.totalRevenue - previous.totalRevenue,
        percentage: ((latest.totalRevenue - previous.totalRevenue) / previous.totalRevenue) * 100
      },
      performance: {
        current: latest.avgPerformance,
        change: latest.avgPerformance - previous.avgPerformance,
        percentage: ((latest.avgPerformance - previous.avgPerformance) / previous.avgPerformance) * 100
      },
      callVolume: {
        current: latest.callVolume,
        change: latest.callVolume - previous.callVolume,
        percentage: ((latest.callVolume - previous.callVolume) / previous.callVolume) * 100
      }
    };
  };

  const trends = calculateTrends();

  // Prepare chart data
  const chartData = historicalMetrics.map(metric => ({
    ...metric,
    date: selectedPeriod === 'hour' ? 
      `${metric.date} ${metric.time}` : 
      format(new Date(metric.date), 'MMM dd'),
    profit: metric.totalRevenue - metric.totalCost
  }));

  // Agent performance aggregation
  const agentPerformanceData = agentHistory.reduce((acc, history) => {
    const existing = acc.find(item => item.agentId === history.agentId);
    if (existing) {
      existing.totalInteractions += history.interactions;
      existing.totalRevenue += history.revenueGenerated || 0;
      existing.avgPerformance = (existing.avgPerformance + history.performance) / 2;
      existing.count += 1;
    } else {
      acc.push({
        agentId: history.agentId,
        agentName: `Agent ${history.agentId}`,
        totalInteractions: history.interactions,
        totalRevenue: history.revenueGenerated || 0,
        avgPerformance: history.performance,
        count: 1
      });
    }
    return acc;
  }, [] as any[]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Historical Data Analytics</h3>
          <p className="text-gray-400 text-sm">Comprehensive performance analysis across time and dimensions</p>
        </div>
        
        <div className="flex gap-3 flex-wrap">
          <div className="flex gap-2">
            <Button
              variant={viewMode === "charts" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("charts")}
              className="bg-gray-800 border-gray-700"
            >
              <BarChart2 className="w-4 h-4 mr-1" />
              Charts
            </Button>
            <Button
              variant={viewMode === "tables" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("tables")}
              className="bg-gray-800 border-gray-700"
            >
              <TableIcon className="w-4 h-4 mr-1" />
              Tables
            </Button>
          </div>
          
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[120px] bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hour">Hourly</SelectItem>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics Summary */}
      {trends && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gray-800/50 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(trends.revenue.current)}</p>
              </div>
              <div className={`flex items-center ${trends.revenue.percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trends.revenue.percentage >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                <span className="text-sm font-medium">{Math.abs(trends.revenue.percentage).toFixed(1)}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gray-800/50 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Performance</p>
                <p className="text-2xl font-bold text-white">{trends.performance.current.toFixed(1)}%</p>
              </div>
              <div className={`flex items-center ${trends.performance.percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trends.performance.percentage >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                <span className="text-sm font-medium">{Math.abs(trends.performance.percentage).toFixed(1)}%</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gray-800/50 border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Call Volume</p>
                <p className="text-2xl font-bold text-white">{formatNumber(trends.callVolume.current)}</p>
              </div>
              <div className={`flex items-center ${trends.callVolume.percentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trends.callVolume.percentage >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                <span className="text-sm font-medium">{Math.abs(trends.callVolume.percentage).toFixed(1)}%</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Advanced Filters */}
      <Card className="p-4 bg-gray-800/50 border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <h4 className="text-sm font-medium text-white">Filters</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Planning Area</label>
            <Select value={selectedPlanningArea} onValueChange={setSelectedPlanningArea}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions?.planningAreas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Product Type</label>
            <Select value={selectedProductType} onValueChange={setSelectedProductType}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions?.productTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Call Type</label>
            <Select value={selectedCallType} onValueChange={setSelectedCallType}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions?.callTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Job Code</label>
            <Select value={selectedJobCode} onValueChange={setSelectedJobCode}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions?.jobCodes.slice(0, 20).map(code => (
                  <SelectItem key={code} value={code}>{code}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="tables">Data Tables</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue & Performance Chart */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Revenue & Performance Trends</h4>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis yAxisId="left" stroke="#9CA3AF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar yAxisId="left" dataKey="totalRevenue" fill="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="avgPerformance" stroke="#82ca9d" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>

            {/* Call Volume & Conversion */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Call Volume & Conversion Rate</h4>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis yAxisId="left" stroke="#9CA3AF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar yAxisId="left" dataKey="callVolume" fill="#ffc658" />
                  <Line yAxisId="right" type="monotone" dataKey="conversionRate" stroke="#ff7300" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Over Time */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics Over Time</h4>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="avgPerformance" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="customerSatisfaction" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Agent Activity */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Agent Activity</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="activeAgents" fill="#8dd1e1" />
                  <Bar dataKey="techniciansDeployed" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Performance */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Financial Performance</h4>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="totalRevenue" fill="#8884d8" />
                  <Bar dataKey="totalCost" fill="#ff7300" />
                  <Line type="monotone" dataKey="profit" stroke="#82ca9d" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>

            {/* Profit Margin Trend */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Profit Margin Trend</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="profitMargin" stroke="#82ca9d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <div className="mb-4">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-[200px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Agents</SelectItem>
                <SelectItem value="1">Agent 1</SelectItem>
                <SelectItem value="2">Agent 2</SelectItem>
                <SelectItem value="3">Agent 3</SelectItem>
                <SelectItem value="4">Agent 4</SelectItem>
                <SelectItem value="5">Agent 5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Agent Performance Comparison */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Agent Performance Comparison</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={agentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="agentName" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="avgPerformance" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Agent Revenue Distribution */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Agent Revenue Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={agentPerformanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="totalRevenue"
                  >
                    {agentPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Historical Metrics Table */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Historical Metrics</h4>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Planning Area</TableHead>
                      <TableHead className="text-gray-300">Product Type</TableHead>
                      <TableHead className="text-gray-300">Call Type</TableHead>
                      <TableHead className="text-gray-300">Revenue</TableHead>
                      <TableHead className="text-gray-300">Active Jobs</TableHead>
                      <TableHead className="text-gray-300">Open Orders</TableHead>
                      <TableHead className="text-gray-300">Performance</TableHead>
                      <TableHead className="text-gray-300">Conversion Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historicalMetrics.slice(0, 50).map((metric) => (
                      <TableRow key={metric.id} className="border-gray-700">
                        <TableCell className="text-gray-300">
                          {metric.time ? `${metric.date} ${metric.time}` : metric.date}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                            {metric.planningArea || 'N/A'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                            {metric.productType || 'N/A'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                            {metric.callType || 'N/A'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatCurrency(metric.totalRevenue)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatNumber(metric.activeJobs)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatNumber(metric.openOrders)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              (metric.avgPerformance || 0) >= 90 ? 'bg-green-400' :
                              (metric.avgPerformance || 0) >= 80 ? 'bg-yellow-400' : 'bg-red-400'
                            }`}></div>
                            {metric.avgPerformance?.toFixed(1) || '0.0'}%
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {metric.conversionRate?.toFixed(1) || '0.0'}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Order Status Breakdown Table */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Order Status Breakdown</h4>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Planning Area</TableHead>
                      <TableHead className="text-gray-300">Waiting Service (WS)</TableHead>
                      <TableHead className="text-gray-300">Waiting Parts (WP)</TableHead>
                      <TableHead className="text-gray-300">Reschedule Needed (RN)</TableHead>
                      <TableHead className="text-gray-300">Assigned Today (AT)</TableHead>
                      <TableHead className="text-gray-300">Tentative</TableHead>
                      <TableHead className="text-gray-300">Total Orders</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {historicalMetrics.filter(m => m.orderStatuses).slice(0, 20).map((metric) => (
                      <TableRow key={`orders-${metric.id}`} className="border-gray-700">
                        <TableCell className="text-gray-300">{metric.date}</TableCell>
                        <TableCell className="text-gray-300">
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                            {metric.planningArea}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                            {formatNumber(metric.orderStatuses?.waitingService || 0)}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-orange-400 mr-2"></div>
                            {formatNumber(metric.orderStatuses?.waitingParts || 0)}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-400 mr-2"></div>
                            {formatNumber(metric.orderStatuses?.rescheduleNeeded || 0)}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                            {formatNumber(metric.orderStatuses?.assignedToday || 0)}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                            {formatNumber(metric.orderStatuses?.tentative || 0)}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300 font-semibold">
                          {formatNumber(metric.openOrders)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Agent Performance Table */}
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Agent Performance History</h4>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Agent</TableHead>
                      <TableHead className="text-gray-300">Planning Area</TableHead>
                      <TableHead className="text-gray-300">Performance</TableHead>
                      <TableHead className="text-gray-300">Interactions</TableHead>
                      <TableHead className="text-gray-300">Success Rate</TableHead>
                      <TableHead className="text-gray-300">Revenue Generated</TableHead>
                      <TableHead className="text-gray-300">Response Time</TableHead>
                      <TableHead className="text-gray-300">Satisfaction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agentHistory.slice(0, 30).map((history) => (
                      <TableRow key={history.id} className="border-gray-700">
                        <TableCell className="text-gray-300">{history.date}</TableCell>
                        <TableCell className="text-gray-300">
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                            Agent {history.agentId}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                            {history.planningArea}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              history.performance >= 90 ? 'bg-green-400' :
                              history.performance >= 80 ? 'bg-yellow-400' : 'bg-red-400'
                            }`}></div>
                            {typeof history.performance === 'string' ? parseFloat(history.performance).toFixed(1) : (history.performance || 0).toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatNumber(history.interactions)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {history.successRate.toFixed(1)}%
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {formatCurrency(history.revenueGenerated || 0)}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {history.averageResponseTime.toFixed(2)}s
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              (history.userSatisfaction || 0) >= 90 ? 'bg-green-400' :
                              (history.userSatisfaction || 0) >= 80 ? 'bg-yellow-400' : 'bg-red-400'
                            }`}></div>
                            {(history.userSatisfaction || 0).toFixed(1)}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {(metricsLoading || historyLoading) && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-400">Loading historical data...</span>
        </div>
      )}
    </div>
  );
}