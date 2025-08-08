import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MapPin,
  Users,
  Building2,
  Wrench,
  Phone,
  DollarSign,
  TrendingUp,
  Target,
  Filter,
  BarChart3,
  Layers,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Refrigerator,
  Waves,
  Wind,
  ChefHat,
  Zap,
  Settings
} from "lucide-react";

interface HistoricalMetric {
  id: number;
  date: string;
  totalRevenue: number;
  totalCost: number;
  avgPerformance: number;
  callVolume: number;
  conversionRate: number;
  customerSatisfaction: number;
  techniciansDeployed: number;
  activeJobs: number;
  openOrders: number;
  planningArea?: string;
  productType?: string;
  callType?: string;
  jobCode?: string;
}

interface FilterOptions {
  planningAreas: string[];
  productTypes: string[];
  callTypes: string[];
  jobCodes: string[];
}

export default function MultiDimensionalPerformanceSystem() {
  const [, setLocation] = useLocation();
  const [selectedPlanningArea, setSelectedPlanningArea] = useState("All Areas");
  const [selectedCallType, setSelectedCallType] = useState("all");
  const [selectedProductType, setSelectedProductType] = useState("all");
  const [selectedJobCode, setSelectedJobCode] = useState("all");
  const [selectedTechnician, setSelectedTechnician] = useState("all");

  // Fetch filter options
  const { data: filterOptions } = useQuery({
    queryKey: ['/api/historical/filter-options'],
    queryFn: async (): Promise<FilterOptions> => {
      const response = await fetch('/api/historical/filter-options');
      if (!response.ok) throw new Error('Failed to fetch filter options');
      return response.json();
    }
  });

  // Fetch historical metrics with filters
  const { data: historicalMetrics = [] } = useQuery({
    queryKey: ['/api/historical/metrics', 'day', selectedPlanningArea, selectedProductType, selectedCallType, selectedJobCode],
    queryFn: async (): Promise<HistoricalMetric[]> => {
      const params = new URLSearchParams({
        period: 'day',
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
      });
      
      if (selectedPlanningArea !== "All Areas") params.append('planningArea', selectedPlanningArea);
      if (selectedProductType !== "all" && selectedProductType !== "All Products") params.append('productType', selectedProductType);
      if (selectedCallType !== "all" && selectedCallType !== "All Calls") params.append('callType', selectedCallType);
      if (selectedJobCode !== "all" && selectedJobCode !== "All Jobs") params.append('jobCode', selectedJobCode);
      
      const response = await fetch(`/api/historical/metrics?${params}`);
      if (!response.ok) throw new Error('Failed to fetch historical metrics');
      return response.json();
    }
  });

  // Calculate performance metrics from filtered data
  const performanceMatrix = useMemo(() => {
    if (historicalMetrics.length === 0) {
      return {
        metrics: {
          totalCalls: 0,
          conversionRate: 0,
          avgTicketValue: 0,
          revenueImpact: "$0",
          dropoutRate: 0,
          customerSatisfaction: 0,
          technicianUtilization: 0,
          partsMargin: 0,
          routingEfficiency: 0
        }
      };
    }

    const totalCalls = historicalMetrics.reduce((sum, m) => sum + m.callVolume, 0);
    const avgConversion = historicalMetrics.reduce((sum, m) => sum + m.conversionRate, 0) / historicalMetrics.length;
    const totalRevenue = historicalMetrics.reduce((sum, m) => sum + m.totalRevenue, 0);
    const totalCost = historicalMetrics.reduce((sum, m) => sum + m.totalCost, 0);
    const avgSatisfaction = historicalMetrics.reduce((sum, m) => sum + m.customerSatisfaction, 0) / historicalMetrics.length;
    const avgPerformance = historicalMetrics.reduce((sum, m) => sum + m.avgPerformance, 0) / historicalMetrics.length;
    const totalJobs = historicalMetrics.reduce((sum, m) => sum + m.activeJobs, 0);
    const totalTechnicains = historicalMetrics.reduce((sum, m) => sum + m.techniciansDeployed, 0);

    const avgTicketValue = totalCalls > 0 ? Math.round(totalRevenue / totalCalls) : 0;
    const dropoutRate = Math.max(0, 100 - avgConversion);
    const technicianUtilization = totalTechnicains > 0 ? Math.round((totalJobs / totalTechnicains) * 100) / 100 : 0;
    const partsMargin = totalCost > 0 ? Math.round(((totalRevenue - totalCost) / totalRevenue) * 100 * 100) / 100 : 0;

    return {
      metrics: {
        totalCalls: Math.round(totalCalls),
        conversionRate: Math.round(avgConversion * 100) / 100,
        avgTicketValue,
        revenueImpact: `$${Math.round(totalRevenue).toLocaleString()}`,
        dropoutRate: Math.round(dropoutRate * 100) / 100,
        customerSatisfaction: Math.round(avgSatisfaction * 100) / 100,
        technicianUtilization: Math.round(technicianUtilization * 100) / 100,
        partsMargin,
        routingEfficiency: Math.round(avgPerformance * 100) / 100
      }
    };
  }, [historicalMetrics]);

  // Sample Planning Areas (430+ total)
  const planningAreas = [
    { id: "atlanta-metro", name: "Atlanta Metro", state: "GA", population: "6.1M", technicians: 47 },
    { id: "dallas-fort-worth", name: "Dallas-Fort Worth", state: "TX", population: "7.6M", technicians: 52 },
    { id: "chicago-northwest", name: "Chicago Northwest", state: "IL", population: "3.2M", technicians: 38 },
    { id: "phoenix-east", name: "Phoenix East", state: "AZ", population: "2.8M", technicians: 31 },
    { id: "miami-dade", name: "Miami-Dade", state: "FL", population: "2.7M", technicians: 29 }
  ];

  // Call Types (D2C vs B2B breakdown)
  const callTypes = [
    { id: "d2c", name: "Direct to Consumer (D2C)", volume: 4247, conversion: 51.8, avgValue: 285 },
    { id: "b2b", name: "Business to Business (B2B)", volume: 1769, conversion: 67.3, avgValue: 445 },
    { id: "warranty", name: "Warranty Claims", volume: 892, conversion: 78.1, avgValue: 195 },
    { id: "maintenance", name: "Maintenance Contracts", volume: 634, conversion: 89.2, avgValue: 320 }
  ];

  // Product Types (Your 7 Service Areas)
  const productTypes = [
    { id: "refrigerators", name: "Refrigerators", icon: Refrigerator, jobCodes: ["REF-01", "REF-02", "REF-03"], avgTicket: 392 },
    { id: "washers", name: "Washers", icon: Waves, jobCodes: ["WAS-01", "WAS-02", "WAS-03"], avgTicket: 367 },
    { id: "dryers", name: "Dryers", icon: Waves, jobCodes: ["DRY-01", "DRY-02", "DRY-03"], avgTicket: 349 },
    { id: "hvac", name: "HVAC Systems", icon: Wind, jobCodes: ["HVA-01", "HVA-02", "HVA-03"], avgTicket: 445 },
    { id: "dishwashers", name: "Dishwashers", icon: ChefHat, jobCodes: ["DIS-01", "DIS-02", "DIS-03"], avgTicket: 324 },
    { id: "stoves", name: "Stoves/Ovens", icon: ChefHat, jobCodes: ["STO-01", "STO-02", "STO-03"], avgTicket: 356 },
    { id: "microwaves", name: "Microwaves", icon: ChefHat, jobCodes: ["MIC-01", "MIC-02", "MIC-03"], avgTicket: 278 }
  ];

  // Job Codes with complexity and parts requirements
  const jobCodes = [
    { code: "REF-01", name: "Cooling System Repair", complexity: "High", avgTime: 2.3, partsRate: 78, avgCost: 125 },
    { code: "REF-02", name: "Ice Maker Service", complexity: "Medium", avgTime: 1.8, partsRate: 45, avgCost: 89 },
    { code: "REF-03", name: "Door Seal Replacement", complexity: "Low", avgTime: 1.2, partsRate: 95, avgCost: 67 },
    { code: "WAS-01", name: "Drain Pump Repair", complexity: "High", avgTime: 2.1, partsRate: 67, avgCost: 156 },
    { code: "HVA-01", name: "System Diagnostic", complexity: "High", avgTime: 1.9, partsRate: 34, avgCost: 89 },
    { code: "DIS-01", name: "Motor Replacement", complexity: "Medium", avgTime: 1.6, partsRate: 89, avgCost: 134 }
  ];

  // Technician Performance Levels
  const technicianLevels = [
    { level: "Expert", count: 89, efficiency: 94, satisfaction: 4.8, specializations: ["HVAC", "Refrigeration"] },
    { level: "Advanced", count: 147, efficiency: 87, satisfaction: 4.6, specializations: ["Appliances", "Electronics"] },
    { level: "Intermediate", count: 213, efficiency: 79, satisfaction: 4.3, specializations: ["General Repair"] },
    { level: "Entry", count: 78, efficiency: 71, satisfaction: 4.1, specializations: ["Basic Service"] }
  ];

  // Use filterOptions for dropdowns with fallbacks for the static data
  const availablePlanningAreas = filterOptions?.planningAreas || ["All Areas"];
  const availableProductTypes = filterOptions?.productTypes || ["all"];
  const availableCallTypes = filterOptions?.callTypes || ["all"];
  const availableJobCodes = filterOptions?.jobCodes || ["all"];

  // Dimensional Impact Analysis
  const dimensionalImpacts = [
    {
      dimension: "Planning Area",
      factor: "Geographic Density",
      impact: "High",
      description: "Urban areas show 23% higher conversion rates due to technician availability",
      optimization: "Increase technician density in high-potential suburban areas"
    },
    {
      dimension: "Call Type",
      factor: "D2C vs B2B Mix",
      impact: "Critical",
      description: "B2B calls convert 15.5% higher but require specialized technicians",
      optimization: "Dedicate expert-level technicians to B2B accounts"
    },
    {
      dimension: "Product Type",
      factor: "Complexity Variation",
      impact: "High", 
      description: "HVAC generates 14% higher revenue but 23% longer service times",
      optimization: "Pre-schedule HVAC calls during off-peak hours"
    },
    {
      dimension: "Job Code",
      factor: "Parts Availability",
      impact: "Medium",
      description: "67% of high-parts jobs face scheduling delays",
      optimization: "Predictive parts ordering based on job code patterns"
    },
    {
      dimension: "Technician Level",
      factor: "Skill Matching",
      impact: "Critical",
      description: "Expert technicians achieve 27% higher satisfaction on complex jobs",
      optimization: "AI-powered skill-to-job matching algorithm"
    }
  ];

  const getSelectedArea = () => ({ 
    name: selectedPlanningArea === "All Areas" ? "All Areas" : selectedPlanningArea,
    population: "N/A", 
    technicians: "N/A" 
  });
  const getSelectedProduct = () => ({ 
    name: selectedProductType === "all" ? "All Products" : selectedProductType 
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Layers className="h-6 w-6 mr-3 text-blue-400" />
            Multi-Dimensional Performance System
          </h2>
          <p className="text-gray-400 mt-1">
            Analyze performance across planning areas, call types, products, job codes, and technician levels
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setLocation('/planning-area-agents')}
            >
              Back to Planning Area Dashboard
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLocation('/prompt-heatmap')}
              className="text-gray-400 hover:text-white"
            >
              View Prompt Heatmap
            </Button>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-400">{performanceMatrix.metrics.conversionRate}%</div>
            <div className="text-sm text-gray-400">Current Conversion Rate</div>
            <Badge className="bg-blue-600 mt-1">430 Planning Areas</Badge>
          </div>
        </div>
      </div>

      {/* Multi-Dimensional Filters */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Filter className="h-5 w-5 mr-2 text-blue-400" />
            Performance Dimension Filters
          </CardTitle>
          <CardDescription>
            Select specific dimensions to analyze how they combine to drive performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Planning Area</label>
              <Select value={selectedPlanningArea} onValueChange={setSelectedPlanningArea}>
                <SelectTrigger className="bg-gray-900 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availablePlanningAreas.map(area => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Call Type</label>
              <Select value={selectedCallType} onValueChange={setSelectedCallType}>
                <SelectTrigger className="bg-gray-900 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Call Types</SelectItem>
                  {availableCallTypes.filter(type => type !== "All Calls").map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Product Type</label>
              <Select value={selectedProductType} onValueChange={setSelectedProductType}>
                <SelectTrigger className="bg-gray-900 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {availableProductTypes.filter(type => type !== "All Products").map(product => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Job Code</label>
              <Select value={selectedJobCode} onValueChange={setSelectedJobCode}>
                <SelectTrigger className="bg-gray-900 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Codes</SelectItem>
                  {availableJobCodes.filter(code => code !== "All Jobs").map(job => (
                    <SelectItem key={job} value={job}>
                      {job}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Technician Level</label>
              <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
                <SelectTrigger className="bg-gray-900 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {technicianLevels.map(level => (
                    <SelectItem key={level.level.toLowerCase()} value={level.level.toLowerCase()}>
                      {level.level} ({level.count} techs)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <Phone className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-blue-400">{performanceMatrix.metrics.totalCalls}</div>
            <div className="text-sm text-gray-400">Total Calls</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-green-400">{performanceMatrix.metrics.conversionRate}%</div>
            <div className="text-sm text-gray-400">Conversion Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-yellow-400">${performanceMatrix.metrics.avgTicketValue}</div>
            <div className="text-sm text-gray-400">Avg Ticket</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-purple-400">{performanceMatrix.metrics.technicianUtilization}%</div>
            <div className="text-sm text-gray-400">Tech Utilization</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-red-400" />
            <div className="text-2xl font-bold text-red-400">{performanceMatrix.metrics.dropoutRate}%</div>
            <div className="text-sm text-gray-400">Dropout Rate</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            Performance Matrix
          </TabsTrigger>
          <TabsTrigger value="optimization" className="data-[state=active]:bg-blue-600">
            <Settings className="h-4 w-4 mr-2" />
            Optimization
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="data-[state=active]:bg-blue-600">
            <Layers className="h-4 w-4 mr-2" />
            Dimensional Breakdown
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-blue-600">
            <Activity className="h-4 w-4 mr-2" />
            Performance Insights
          </TabsTrigger>
        </TabsList>

        {/* Performance Matrix Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                  Selected Planning Area: {getSelectedArea()?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-lg font-bold text-blue-400">{getSelectedArea()?.population}</div>
                    <div className="text-sm text-gray-400">Population</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-400">{getSelectedArea()?.technicians}</div>
                    <div className="text-sm text-gray-400">Technicians</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300">Selected Filters</h4>
                  <div className="bg-gray-900 p-3 rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Call Type:</span>
                      <span className="text-sm text-white">{selectedCallType === "all" ? "All Types" : selectedCallType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Product:</span>
                      <span className="text-sm text-white">{selectedProductType === "all" ? "All Products" : selectedProductType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Job Code:</span>
                      <span className="text-sm text-white">{selectedJobCode === "all" ? "All Jobs" : selectedJobCode}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-yellow-400" />
                  Product & Job Code Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedProductType !== "all" && (
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-white font-medium">{getSelectedProduct()?.name}</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      Performance metrics calculated from filtered data
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300">Job Code Performance</h4>
                  {jobCodes.slice(0, 4).map((job, idx) => (
                    <div key={idx} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white">{job.code}</span>
                        <Badge className={`${
                          job.complexity === 'High' ? 'bg-red-600' :
                          job.complexity === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                        }`}>
                          {job.complexity}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-300 mb-2">{job.name}</div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-gray-400">Time: {job.avgTime}h</div>
                        <div className="text-gray-400">Parts: {job.partsRate}%</div>
                        <div className="text-gray-400">Cost: ${job.avgCost}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Optimization Tab */}
        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dimensionalImpacts.slice(0, 4).map((impact, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>{impact.dimension}</span>
                    <Badge className={`${
                      impact.impact === 'Critical' ? 'bg-red-600' :
                      impact.impact === 'High' ? 'bg-yellow-600' : 'bg-green-600'
                    }`}>
                      {impact.impact} Impact
                    </Badge>
                  </CardTitle>
                  <CardDescription>{impact.factor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <div className="text-sm text-blue-200 mb-2">Current Impact:</div>
                    <div className="text-sm text-white">{impact.description}</div>
                  </div>
                  
                  <div className="bg-green-900/30 p-3 rounded-lg">
                    <div className="text-sm text-green-200 mb-2">Optimization Strategy:</div>
                    <div className="text-sm text-white">{impact.optimization}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Dimensional Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Layers className="h-5 w-5 mr-2 text-purple-400" />
                Technician Level Performance Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {technicianLevels.map((level, index) => (
                  <div key={index} className="bg-gray-900 p-4 rounded-lg">
                    <div className="text-center mb-3">
                      <div className="text-lg font-bold text-purple-400">{level.level}</div>
                      <div className="text-sm text-gray-400">{level.count} technicians</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Efficiency</span>
                        <span className="text-sm text-green-400">{level.efficiency}%</span>
                      </div>
                      <Progress value={level.efficiency} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Satisfaction</span>
                        <span className="text-sm text-blue-400">{level.satisfaction}/5</span>
                      </div>
                      <Progress value={level.satisfaction * 20} className="h-2" />
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-xs text-gray-400 mb-1">Specializations:</div>
                      <div className="flex flex-wrap gap-1">
                        {level.specializations.map((spec, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {spec}
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

        {/* Performance Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2 text-yellow-400" />
                Multi-Dimensional Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">Optimal Combinations</h4>
                  <div className="space-y-3">
                    <div className="bg-green-900/30 p-3 rounded-lg">
                      <div className="text-sm text-green-200 font-medium">Best Performance</div>
                      <div className="text-xs text-green-300 mt-1">
                        B2B + HVAC + Expert Tech + Urban Area = 78.3% conversion
                      </div>
                    </div>
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <div className="text-sm text-blue-200 font-medium">Highest Revenue</div>
                      <div className="text-xs text-blue-300 mt-1">
                        D2C + Commercial Appliances + Advanced Tech = $523 avg ticket
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">Improvement Opportunities</h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-900/30 p-3 rounded-lg">
                      <div className="text-sm text-yellow-200 font-medium">Skill Gaps</div>
                      <div className="text-xs text-yellow-300 mt-1">
                        Entry-level techs on complex HVAC jobs: 34% lower satisfaction
                      </div>
                    </div>
                    <div className="bg-red-900/30 p-3 rounded-lg">
                      <div className="text-sm text-red-200 font-medium">Geographic Mismatches</div>
                      <div className="text-xs text-red-300 mt-1">
                        Rural areas with B2B demand lack expert technicians
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">AI Recommendations</h4>
                  <div className="space-y-3">
                    <div className="bg-purple-900/30 p-3 rounded-lg">
                      <div className="text-sm text-purple-200 font-medium">Dynamic Routing</div>
                      <div className="text-xs text-purple-300 mt-1">
                        Route complex jobs to expert techs regardless of planning area
                      </div>
                    </div>
                    <div className="bg-cyan-900/30 p-3 rounded-lg">
                      <div className="text-sm text-cyan-200 font-medium">Predictive Staffing</div>
                      <div className="text-xs text-cyan-300 mt-1">
                        Increase expert coverage in high-value B2B planning areas
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}