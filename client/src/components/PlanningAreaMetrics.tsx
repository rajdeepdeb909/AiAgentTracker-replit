import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, TrendingDown, MapPin, Users, Package, DollarSign, 
  Clock, Target, BarChart3, AlertTriangle, CheckCircle, Filter
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface PlanningAreaData {
  id: string;
  name: string;
  region: string;
  rank: number;
  metrics: {
    daily: any[];
    weekly: any[];
    monthly: any[];
    quarterly: any[];
  };
  supply: {
    technicians: number;
    skillScore: number;
    utilization: number;
    partsAvailability: number;
  };
  demand: {
    d2c: number;
    b2b: number;
    emergency: number;
    maintenance: number;
  };
  performance: {
    responseTime: number;
    completion: number;
    satisfaction: number;
    firstCall: number;
  };
  financial: {
    revenue: number;
    costs: number;
    profit: number;
    margin: number;
    avgTicket: number;
  };
  keyVariables: {
    drivers: string[];
    constraints: string[];
    opportunities: string[];
  };
}

export default function PlanningAreaMetrics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  // Mock data for 430 planning areas
  const planningAreas = useMemo(() => {
    const areas: PlanningAreaData[] = [];
    const regions = ["TX-North", "TX-South", "FL-Central", "FL-South", "CA-LA", "CA-Bay", "NY-Metro", "IL-Chicago"];
    const cities = ["Dallas", "Houston", "Austin", "Miami", "Tampa", "Los Angeles", "San Francisco", "New York", "Chicago"];
    
    for (let i = 1; i <= 430; i++) {
      const region = regions[i % regions.length];
      const city = cities[i % cities.length];
      const areaName = `${city} Area ${String(i).padStart(3, '0')}`;
      
      // Generate performance data with realistic variations
      const basePerformance = 75 + Math.random() * 25;
      const seasonalVariation = Math.sin((i / 430) * Math.PI * 2) * 10;
      
      areas.push({
        id: `PA${String(i).padStart(3, '0')}`,
        name: areaName,
        region: region,
        rank: i,
        metrics: {
          daily: Array.from({ length: 30 }, (_, day) => ({
            date: new Date(2025, 0, day + 1).toISOString().split('T')[0],
            revenue: 15000 + Math.random() * 10000,
            calls: 25 + Math.random() * 15,
            satisfaction: 4.0 + Math.random() * 1.0,
            utilization: 70 + Math.random() * 25
          })),
          weekly: Array.from({ length: 12 }, (_, week) => ({
            week: `Week ${week + 1}`,
            revenue: 75000 + Math.random() * 50000,
            calls: 150 + Math.random() * 75,
            satisfaction: 4.0 + Math.random() * 1.0,
            utilization: 70 + Math.random() * 25
          })),
          monthly: Array.from({ length: 12 }, (_, month) => ({
            month: new Date(2024, month).toLocaleDateString('en-US', { month: 'short' }),
            revenue: 300000 + Math.random() * 200000,
            calls: 600 + Math.random() * 300,
            satisfaction: 4.0 + Math.random() * 1.0,
            utilization: 70 + Math.random() * 25
          })),
          quarterly: [
            { quarter: "Q1 2024", revenue: 900000 + Math.random() * 300000, calls: 1800 + Math.random() * 600 },
            { quarter: "Q2 2024", revenue: 950000 + Math.random() * 300000, calls: 1900 + Math.random() * 600 },
            { quarter: "Q3 2024", revenue: 1000000 + Math.random() * 300000, calls: 2000 + Math.random() * 600 },
            { quarter: "Q4 2024", revenue: 1100000 + Math.random() * 300000, calls: 2100 + Math.random() * 600 }
          ]
        },
        supply: {
          technicians: 8 + Math.floor(Math.random() * 15),
          skillScore: 70 + Math.random() * 30,
          utilization: 65 + Math.random() * 30,
          partsAvailability: 80 + Math.random() * 20
        },
        demand: {
          d2c: Math.floor(100 + Math.random() * 200),
          b2b: Math.floor(50 + Math.random() * 150),
          emergency: Math.floor(10 + Math.random() * 30),
          maintenance: Math.floor(80 + Math.random() * 120)
        },
        performance: {
          responseTime: 2.5 + Math.random() * 3,
          completion: basePerformance + seasonalVariation,
          satisfaction: 4.0 + Math.random() * 1.0,
          firstCall: 75 + Math.random() * 20
        },
        financial: {
          revenue: 300000 + Math.random() * 200000,
          costs: 200000 + Math.random() * 100000,
          profit: 100000 + Math.random() * 100000,
          margin: 25 + Math.random() * 20,
          avgTicket: 450 + Math.random() * 200
        },
        keyVariables: {
          drivers: ["Technician skill level", "Parts availability", "Weather patterns", "Local regulations"],
          constraints: ["Limited technician capacity", "Parts supply delays", "Geographic coverage"],
          opportunities: ["Cross-training technicians", "Inventory optimization", "Route efficiency"]
        }
      });
    }
    
    return areas.sort((a, b) => b.performance.completion - a.performance.completion);
  }, []);

  const filteredAreas = useMemo(() => {
    return selectedRegion === "all" 
      ? planningAreas 
      : planningAreas.filter(area => area.region === selectedRegion);
  }, [planningAreas, selectedRegion]);

  const topPerformers = filteredAreas.slice(0, 10);
  const needsImprovement = filteredAreas.slice(-10).reverse();
  
  const selectedAreaData = selectedArea ? planningAreas.find(area => area.id === selectedArea) : null;

  const regions = [...new Set(planningAreas.map(area => area.region))];

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Planning Area Performance</h2>
          <p className="text-gray-400">430 planning areas with comprehensive metrics and key variable analysis</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Areas</p>
                <p className="text-2xl font-bold text-white">{filteredAreas.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Performance</p>
                <p className="text-2xl font-bold text-white">
                  {(filteredAreas.reduce((sum, area) => sum + area.performance.completion, 0) / filteredAreas.length).toFixed(1)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">
                  ${(filteredAreas.reduce((sum, area) => sum + area.financial.revenue, 0) / 1000000).toFixed(1)}M
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Response Time</p>
                <p className="text-2xl font-bold text-white">
                  {(filteredAreas.reduce((sum, area) => sum + area.performance.responseTime, 0) / filteredAreas.length).toFixed(1)}h
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="supply-demand">Supply & Demand</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="variables">Key Variables</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Top 10 Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((area, index) => (
                    <div 
                      key={area.id} 
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50"
                      onClick={() => setSelectedArea(area.id)}
                    >
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-3">#{index + 1}</Badge>
                        <div>
                          <p className="text-white font-medium">{area.name}</p>
                          <p className="text-gray-400 text-sm">{area.region}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-medium">{area.performance.completion.toFixed(1)}%</p>
                        <p className="text-gray-400 text-sm">${(area.financial.revenue/1000).toFixed(0)}K</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Needs Improvement */}
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
                  Improvement Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {needsImprovement.map((area, index) => (
                    <div 
                      key={area.id} 
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg cursor-pointer hover:bg-gray-700/50"
                      onClick={() => setSelectedArea(area.id)}
                    >
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-3">#{area.rank}</Badge>
                        <div>
                          <p className="text-white font-medium">{area.name}</p>
                          <p className="text-gray-400 text-sm">{area.region}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-400 font-medium">{area.performance.completion.toFixed(1)}%</p>
                        <p className="text-gray-400 text-sm">${(area.financial.revenue/1000).toFixed(0)}K</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {selectedAreaData && (
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="text-white">
                  {selectedAreaData.name} - {selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)} Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={selectedAreaData.metrics[selectedTimeframe as keyof typeof selectedAreaData.metrics]}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                    <XAxis 
                      dataKey={selectedTimeframe === 'daily' ? 'date' : selectedTimeframe === 'weekly' ? 'week' : selectedTimeframe === 'monthly' ? 'month' : 'quarter'} 
                      stroke="#9CA3AF" 
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="utilization" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="supply-demand" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="text-white">Supply Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={topPerformers.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                    <Bar dataKey="supply.technicians" fill="#3B82F6" />
                    <Bar dataKey="supply.skillScore" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="text-white">Demand Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={topPerformers.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                    <Bar dataKey="demand.d2c" fill="#8B5CF6" />
                    <Bar dataKey="demand.b2b" fill="#F59E0B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Financial Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topPerformers}>
                  <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                  <Bar dataKey="financial.revenue" fill="#10B981" />
                  <Bar dataKey="financial.profit" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variables" className="space-y-6">
          {selectedAreaData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Performance Drivers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedAreaData.keyVariables.drivers.map((driver, index) => (
                      <div key={index} className="p-2 bg-green-500/10 border border-green-500/20 rounded">
                        <p className="text-green-400 text-sm">{driver}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
                    Supply Constraints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedAreaData.keyVariables.constraints.map((constraint, index) => (
                      <div key={index} className="p-2 bg-orange-500/10 border border-orange-500/20 rounded">
                        <p className="text-orange-400 text-sm">{constraint}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-400" />
                    Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedAreaData.keyVariables.opportunities.map((opportunity, index) => (
                      <div key={index} className="p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                        <p className="text-blue-400 text-sm">{opportunity}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {!selectedAreaData && (
            <Card className="bg-dark-card border-dark-border">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400">Select a planning area from the Overview tab to view detailed key variables analysis</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}