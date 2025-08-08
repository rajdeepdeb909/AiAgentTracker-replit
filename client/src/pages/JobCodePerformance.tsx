import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown, DollarSign, BarChart3, Package, AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface JobCodeRecord {
  jobCode: string;
  jobDescription: string;
  segment: 'Total' | 'D2C' | 'B2B';
  period: string;
  callVolume: number;
  pptProfitPerCall: number;
  totalRevenuePerCall: number;
  pptCostPerCall: number;
  laborRevenuePerCall: number;
  payrollCostPerCall: number;
  benefitCostPerCall: number;
  partsRevenuePerCall: number;
  partsCostPerCall: number;
  profitablePercentage: number;
  unprofitablePercentage: number;
  totalRevenue: number;
  pptProfit: number;
  edCount: number;
  edRate: number;
  recallCount: number;
  recallRate: number;
}

interface JobCodeSummary {
  totalJobCodes: number;
  totalCallVolume: number;
  averageProfitPerCall: number;
  averageRevenuePerCall: number;
  totalRevenue: number;
  totalProfit: number;
  topPerformingJobCodes: JobCodeRecord[];
  profitabilityBreakdown: {
    profitable: number;
    unprofitable: number;
    averageProfitability: number;
  };
}

interface JobCodeComparison {
  jobCode: string;
  jobDescription: string;
  segments: {
    total: JobCodeRecord | null;
    d2c: JobCodeRecord | null;
    b2b: JobCodeRecord | null;
  };
  bestPerformingSegment: 'Total' | 'D2C' | 'B2B' | null;
  profitabilityGap: number;
  revenueGap: number;
}

interface CategoryAnalysis {
  category: string;
  jobCodeCount: number;
  totalVolume: number;
  totalRevenue: number;
  totalProfit: number;
  averageProfitPerCall: number;
  averageProfitability: number;
  topJobCodes: Array<{
    jobCode: string;
    description: string;
    profitPerCall: number;
    segment: string;
  }>;
}

// Cost Breakdown Interfaces  
interface JobCodeCostBreakdown {
  jobCode: string;
  jobDescription: string;
  segment: 'Total' | 'D2C' | 'B2B';
  period: string;
  callVolume: number;
  
  // Revenue Components
  totalRevenuePerCall: number;
  laborRevenuePerCall: number;
  partsRevenuePerCall: number;
  
  // Cost Components
  totalCostPerCall: number;
  laborCostPerCall: number;
  partsCostPerCall: number;
  operationalCostPerCall: number;
  
  // Profit Analysis
  totalProfitPerCall: number;
  laborProfitPerCall: number;
  partsProfitPerCall: number;
  
  // Margin Analysis
  totalMarginPercent: number;
  laborMarginPercent: number;
  partsMarginPercent: number;
  
  // Profitability Indicators
  profitablePercentage: number;
  isProfitable: boolean;
  isLaborProfitable: boolean;
  isPartsProfitable: boolean;
}

export default function JobCodePerformance() {
  const [selectedSegment, setSelectedSegment] = useState<'Total' | 'D2C' | 'B2B' | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobCode, setSelectedJobCode] = useState<string>("");

  // Build query URLs with proper query parameters
  const buildQueryUrl = (baseUrl: string, params: Record<string, any> = {}) => {
    const filteredParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    return filteredParams ? `${baseUrl}?${filteredParams}` : baseUrl;
  };

  // Fetch job code summary
  const { data: summary, isLoading: summaryLoading } = useQuery<JobCodeSummary>({
    queryKey: ['job-codes-summary', selectedSegment],
    queryFn: () => fetch(buildQueryUrl('/api/job-codes/summary', { segment: selectedSegment })).then(res => res.json()),
    enabled: true
  });

  // Fetch job codes with filtering
  const { data: jobCodes, isLoading: jobCodesLoading } = useQuery<JobCodeRecord[]>({
    queryKey: ['job-codes', selectedSegment, searchQuery],
    queryFn: () => fetch(buildQueryUrl('/api/job-codes', { segment: selectedSegment, search: searchQuery })).then(res => res.json()),
    enabled: true
  });

  // Fetch comparisons across segments
  const { data: comparisons, isLoading: comparisonsLoading } = useQuery<JobCodeComparison[]>({
    queryKey: ['job-codes-comparisons'],
    queryFn: () => fetch('/api/job-codes/comparisons').then(res => res.json()),
    enabled: true
  });

  // Fetch category analysis
  const { data: categories, isLoading: categoriesLoading } = useQuery<CategoryAnalysis[]>({
    queryKey: ['job-codes-categories'],
    queryFn: () => fetch('/api/job-codes/categories/analysis').then(res => res.json()),
    enabled: true
  });

  // Fetch cost breakdown data
  const { data: costBreakdowns, isLoading: costBreakdownsLoading } = useQuery<JobCodeCostBreakdown[]>({
    queryKey: ['job-codes-cost-breakdown', selectedSegment],
    queryFn: () => fetch(buildQueryUrl('/api/job-codes/cost-breakdown', { segment: selectedSegment })).then(res => res.json()),
    enabled: true
  });

  const { data: costSummary, isLoading: costSummaryLoading } = useQuery({
    queryKey: ['job-codes-cost-summary', selectedSegment],
    queryFn: () => fetch(buildQueryUrl('/api/job-codes/cost-summary', { segment: selectedSegment })).then(res => res.json()),
    enabled: true
  });

  // Fetch top performers by different metrics
  const { data: topProfit } = useQuery<JobCodeRecord[]>({
    queryKey: ['job-codes-top-profit', selectedSegment],
    queryFn: () => fetch(buildQueryUrl('/api/job-codes/top/profit', { segment: selectedSegment })).then(res => res.json()),
    enabled: true
  });

  const { data: topRevenue } = useQuery<JobCodeRecord[]>({
    queryKey: ['job-codes-top-revenue', selectedSegment],
    queryFn: () => fetch(buildQueryUrl('/api/job-codes/top/revenue', { segment: selectedSegment })).then(res => res.json()),
    enabled: true
  });

  const { data: topVolume } = useQuery<JobCodeRecord[]>({
    queryKey: ['job-codes-top-volume', selectedSegment],
    queryFn: () => fetch(buildQueryUrl('/api/job-codes/top/volume', { segment: selectedSegment })).then(res => res.json()),
    enabled: true
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'Total': return 'bg-blue-500';
      case 'D2C': return 'bg-green-500';
      case 'B2B': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getProfitColor = (profit: number) => {
    if (profit > 50) return 'text-green-600';
    if (profit > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredJobCodes = jobCodes?.filter(job => 
    searchQuery === "" || 
    job.jobCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.jobDescription.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (summaryLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Job Code Performance Analytics</h1>
            <p className="text-gray-400">Comprehensive analysis across Total, D2C, and B2B segments</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Select value={selectedSegment || "all"} onValueChange={(value) => setSelectedSegment(value === "all" ? undefined : value as any)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Segments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="Total">Total</SelectItem>
              <SelectItem value="D2C">D2C</SelectItem>
              <SelectItem value="B2B">B2B</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search job codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Job Codes</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{summary.totalJobCodes.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Active job codes</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Call Volume</CardTitle>
              <Package className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{summary.totalCallVolume.toLocaleString()}</div>
              <p className="text-xs text-gray-400">Service calls</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Average Profit/Call</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(summary.averageProfitPerCall)}</div>
              <p className="text-xs text-gray-400">Per service call</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(summary.totalRevenue)}</div>
              <p className="text-xs text-gray-400">Across all segments</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ranking">Performance Ranking</TabsTrigger>
          <TabsTrigger value="comparisons">Segment Comparison</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
          <TabsTrigger value="cost-breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profitability Breakdown */}
            {summary && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Profitability Breakdown</CardTitle>
                  <CardDescription>Distribution of profitable vs unprofitable job codes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Profitable Job Codes</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {summary.profitabilityBreakdown.profitable}
                        </Badge>
                        <span className="text-green-400">
                          {((summary.profitabilityBreakdown.profitable / summary.totalJobCodes) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Unprofitable Job Codes</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-red-400 border-red-400">
                          {summary.profitabilityBreakdown.unprofitable}
                        </Badge>
                        <span className="text-red-400">
                          {((summary.profitabilityBreakdown.unprofitable / summary.totalJobCodes) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-600">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Average Profitability</span>
                        <span className="text-white font-semibold">
                          {formatPercentage(summary.profitabilityBreakdown.averageProfitability)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Top Performing Job Codes */}
            {summary && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Job Codes</CardTitle>
                  <CardDescription>Highest profit per call across all segments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {summary.topPerformingJobCodes.slice(0, 5).map((jobCode, index) => (
                      <div key={jobCode.jobCode} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-mono text-gray-300">
                            #{index + 1}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{jobCode.jobCode}</div>
                            <div className="text-sm text-gray-400 truncate max-w-48">
                              {jobCode.jobDescription}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${getProfitColor(jobCode.pptProfitPerCall)}`}>
                            {formatCurrency(jobCode.pptProfitPerCall)}
                          </div>
                          <Badge variant="outline" className={`text-xs ${getSegmentColor(jobCode.segment)}`}>
                            {jobCode.segment}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ranking" className="space-y-6">
          {/* Enhanced Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {summary && (
              <>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{summary.totalJobCodes}</div>
                      <div className="text-sm text-gray-300">Job Codes</div>
                      <div className="text-xs text-gray-400 mt-1">{selectedSegment || 'Total'} segment</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{summary.totalCallVolume.toLocaleString()}</div>
                      <div className="text-sm text-gray-300">Total Calls</div>
                      <div className="text-xs text-gray-400 mt-1">Service volume</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{summary.profitabilityBreakdown.profitable}</div>
                      <div className="text-sm text-gray-300">Profitable</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {((summary.profitabilityBreakdown.profitable / summary.totalJobCodes) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{summary.profitabilityBreakdown.unprofitable}</div>
                      <div className="text-sm text-gray-300">Unprofitable</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {((summary.profitabilityBreakdown.unprofitable / summary.totalJobCodes) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Performance Ranking Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Job Code Performance Ranking
              </CardTitle>
              <CardDescription>
                Sortable comparison across all key metrics ({selectedSegment || 'Total'} segment)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {jobCodesLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-12 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-3 px-2 text-gray-300 font-medium">Rank</th>
                        <th className="text-left py-3 px-2 text-gray-300 font-medium">Job Code</th>
                        <th className="text-left py-3 px-2 text-gray-300 font-medium">Description</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Calls</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Revenue/Call</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Profit/Call</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Margin %</th>
                        <th className="text-center py-3 px-2 text-gray-300 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJobCodes
                        .sort((a, b) => b.pptProfitPerCall - a.pptProfitPerCall)
                        .slice(0, 20)
                        .map((jobCode, index) => {
                          const marginPercent = jobCode.totalRevenuePerCall > 0 
                            ? (jobCode.pptProfitPerCall / jobCode.totalRevenuePerCall) * 100 
                            : 0;
                          const isProfitable = jobCode.profitablePercentage > 0.5 || jobCode.pptProfitPerCall > 0;

                          return (
                            <tr key={`${jobCode.jobCode}-${index}`} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                              <td className="py-3 px-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  index < 3 ? 'bg-yellow-600 text-yellow-100' : 
                                  index < 10 ? 'bg-blue-600 text-blue-100' : 
                                  'bg-gray-600 text-gray-100'
                                }`}>
                                  {index + 1}
                                </div>
                              </td>
                              <td className="py-3 px-2">
                                <span className="font-mono text-white font-semibold">{jobCode.jobCode}</span>
                              </td>
                              <td className="py-3 px-2">
                                <span className="text-gray-300 text-sm max-w-xs truncate block">
                                  {jobCode.jobDescription}
                                </span>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className="text-blue-400 font-semibold">{jobCode.callVolume.toLocaleString()}</span>
                                <div className="text-xs text-gray-500">calls</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className="text-white font-semibold">{formatCurrency(jobCode.totalRevenuePerCall)}</span>
                                <div className="text-xs text-gray-500">per call</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className={`font-semibold ${getProfitColor(jobCode.pptProfitPerCall)}`}>
                                  {formatCurrency(jobCode.pptProfitPerCall)}
                                </span>
                                <div className="text-xs text-gray-500">profit</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className={`font-semibold ${getProfitColor(marginPercent)}`}>
                                  {marginPercent.toFixed(1)}%
                                </span>
                                <div className="text-xs text-gray-500">margin</div>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <Badge 
                                  variant={isProfitable ? "default" : "destructive"}
                                  className={isProfitable ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
                                >
                                  {isProfitable ? "✓" : "✗"}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Profit Performers */}
            {topProfit && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Top Profit Leaders
                  </CardTitle>
                  <CardDescription>Highest profit per call</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topProfit.slice(0, 5).map((job, index) => (
                      <div key={job.jobCode} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-600 text-yellow-100' : 'bg-gray-600 text-gray-100'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-mono text-white text-sm">{job.jobCode}</span>
                        </div>
                        <span className="text-green-400 font-semibold">{formatCurrency(job.pptProfitPerCall)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Top Revenue Performers */}
            {topRevenue && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-400" />
                    Revenue Champions
                  </CardTitle>
                  <CardDescription>Highest revenue per call</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topRevenue.slice(0, 5).map((job, index) => (
                      <div key={job.jobCode} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-blue-600 text-blue-100' : 'bg-gray-600 text-gray-100'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-mono text-white text-sm">{job.jobCode}</span>
                        </div>
                        <span className="text-blue-400 font-semibold">{formatCurrency(job.totalRevenuePerCall)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Volume Leaders */}
            {topVolume && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Package className="w-5 h-5 mr-2 text-purple-400" />
                    Volume Leaders
                  </CardTitle>
                  <CardDescription>Highest call volume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topVolume.slice(0, 5).map((job, index) => (
                      <div key={job.jobCode} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-purple-600 text-purple-100' : 'bg-gray-600 text-gray-100'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-mono text-white text-sm">{job.jobCode}</span>
                        </div>
                        <span className="text-purple-400 font-semibold">{job.callVolume.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="comparisons" className="space-y-6">
          {/* Segment Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">Total</div>
                  <div className="text-sm text-gray-300">2,284 Job Codes</div>
                  <div className="text-xs text-gray-400 mt-1">Complete Dataset</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">D2C</div>
                  <div className="text-sm text-gray-300">1,578 Job Codes</div>
                  <div className="text-xs text-gray-400 mt-1">Direct Consumer</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">B2B</div>
                  <div className="text-sm text-gray-300">1,682 Job Codes</div>
                  <div className="text-xs text-gray-400 mt-1">Business Partners</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Segment Comparison Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Cross-Segment Performance Analysis
              </CardTitle>
              <CardDescription>
                Job codes with significant performance differences across segments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {comparisonsLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-16 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-3 px-2 text-gray-300 font-medium">Job Code</th>
                        <th className="text-left py-3 px-2 text-gray-300 font-medium">Description</th>
                        <th className="text-center py-3 px-2 text-gray-300 font-medium">Total</th>
                        <th className="text-center py-3 px-2 text-gray-300 font-medium">D2C</th>
                        <th className="text-center py-3 px-2 text-gray-300 font-medium">B2B</th>
                        <th className="text-center py-3 px-2 text-gray-300 font-medium">Best Segment</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Gap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisons
                        ?.sort((a, b) => b.profitabilityGap - a.profitabilityGap)
                        .slice(0, 15)
                        .map((comparison, index) => (
                          <tr key={comparison.jobCode} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                            <td className="py-3 px-2">
                              <span className="font-mono text-white font-semibold">{comparison.jobCode}</span>
                            </td>
                            <td className="py-3 px-2">
                              <span className="text-gray-300 text-sm max-w-xs truncate block">
                                {comparison.jobDescription}
                              </span>
                            </td>
                            {['total', 'd2c', 'b2b'].map((segment) => {
                              const data = comparison.segments[segment as keyof typeof comparison.segments];
                              const isWinner = comparison.bestPerformingSegment.toLowerCase() === segment;
                              return (
                                <td key={segment} className="py-3 px-2 text-center">
                                  {data ? (
                                    <div className={`p-2 rounded ${isWinner ? 'bg-green-600/20 border border-green-600/50' : 'bg-gray-600'}`}>
                                      <div className={`font-semibold text-sm ${getProfitColor(data.pptProfitPerCall)}`}>
                                        {formatCurrency(data.pptProfitPerCall)}
                                      </div>
                                      <div className="text-xs text-gray-400">
                                        {data.callVolume.toLocaleString()}
                                      </div>
                                      {isWinner && (
                                        <div className="text-xs text-green-400 font-semibold mt-1">BEST</div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-gray-500 text-sm">No data</div>
                                  )}
                                </td>
                              );
                            })}
                            <td className="py-3 px-2 text-center">
                              <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                                {comparison.bestPerformingSegment}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 text-right">
                              <span className="text-yellow-400 font-semibold">
                                {formatCurrency(comparison.profitabilityGap)}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Category Performance Ranking */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Service Category Performance Ranking
              </CardTitle>
              <CardDescription>
                Categories ranked by average profit per call ({selectedSegment || 'Total'} segment)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {categoriesLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-16 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-3 px-2 text-gray-300 font-medium">Rank</th>
                        <th className="text-left py-3 px-2 text-gray-300 font-medium">Category</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Job Codes</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Total Volume</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Total Revenue</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Avg Profit/Call</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Margin %</th>
                        <th className="text-center py-3 px-2 text-gray-300 font-medium">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories
                        ?.sort((a, b) => b.averageProfitPerCall - a.averageProfitPerCall)
                        .map((category, index) => {
                          const marginPercent = category.totalRevenue > 0 
                            ? (category.totalProfit / category.totalRevenue) * 100 
                            : 0;
                          const isTopPerformer = index < 3;
                          const isGoodPerformer = index < Math.ceil(categories.length / 2);

                          return (
                            <tr key={category.category} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                              <td className="py-3 px-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  isTopPerformer ? 'bg-yellow-600 text-yellow-100' : 
                                  isGoodPerformer ? 'bg-blue-600 text-blue-100' : 
                                  'bg-gray-600 text-gray-100'
                                }`}>
                                  {index + 1}
                                </div>
                              </td>
                              <td className="py-3 px-2">
                                <div className="font-semibold text-white">{category.category}</div>
                                <div className="text-xs text-gray-400">Service category</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <Badge variant="outline" className="text-blue-400 border-blue-400">
                                  {category.jobCodeCount}
                                </Badge>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className="text-blue-400 font-semibold">{category.totalVolume.toLocaleString()}</span>
                                <div className="text-xs text-gray-500">calls</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className="text-white font-semibold">{formatCurrency(category.totalRevenue)}</span>
                                <div className="text-xs text-gray-500">revenue</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className={`font-semibold ${getProfitColor(category.averageProfitPerCall)}`}>
                                  {formatCurrency(category.averageProfitPerCall)}
                                </span>
                                <div className="text-xs text-gray-500">avg profit</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className={`font-semibold ${getProfitColor(marginPercent)}`}>
                                  {marginPercent.toFixed(1)}%
                                </span>
                                <div className="text-xs text-gray-500">margin</div>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <Badge 
                                  variant={isTopPerformer ? "default" : isGoodPerformer ? "secondary" : "outline"}
                                  className={
                                    isTopPerformer ? "bg-green-600 hover:bg-green-700" :
                                    isGoodPerformer ? "bg-blue-600 hover:bg-blue-700" :
                                    "bg-gray-600 hover:bg-gray-700"
                                  }
                                >
                                  {isTopPerformer ? "Excellent" : isGoodPerformer ? "Good" : "Average"}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories
              ?.sort((a, b) => b.averageProfitPerCall - a.averageProfitPerCall)
              .slice(0, 6)
              .map((category, index) => (
                <Card key={category.category} className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white text-sm">{category.category}</CardTitle>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index < 2 ? 'bg-yellow-600 text-yellow-100' : 'bg-blue-600 text-blue-100'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Job Codes</span>
                      <Badge variant="outline" className="text-blue-400 border-blue-400 text-xs">
                        {category.jobCodeCount}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Volume</span>
                      <span className="text-blue-400 font-semibold text-sm">{category.totalVolume.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">Revenue</span>
                      <span className="text-white font-semibold text-sm">{formatCurrency(category.totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-600">
                      <span className="text-gray-300 text-sm">Avg Profit</span>
                      <span className={`font-semibold text-sm ${getProfitColor(category.averageProfitPerCall)}`}>
                        {formatCurrency(category.averageProfitPerCall)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="top-performers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top by Profit */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                  Top by Profit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topProfit?.slice(0, 5).map((job, index) => (
                    <div key={job.jobCode} className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white text-sm">{job.jobCode}</div>
                        <div className="text-xs text-gray-400 truncate max-w-32">
                          {job.jobDescription}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-semibold">
                          {formatCurrency(job.pptProfitPerCall)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {job.segment}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top by Revenue */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-yellow-400" />
                  Top by Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topRevenue?.slice(0, 5).map((job, index) => (
                    <div key={job.jobCode} className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white text-sm">{job.jobCode}</div>
                        <div className="text-xs text-gray-400 truncate max-w-32">
                          {job.jobDescription}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-yellow-400 font-semibold">
                          {formatCurrency(job.totalRevenuePerCall)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {job.segment}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top by Volume */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Package className="h-5 w-5 mr-2 text-blue-400" />
                  Top by Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topVolume?.slice(0, 5).map((job, index) => (
                    <div key={job.jobCode} className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white text-sm">{job.jobCode}</div>
                        <div className="text-xs text-gray-400 truncate max-w-32">
                          {job.jobDescription}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400 font-semibold">
                          {job.callVolume.toLocaleString()}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {job.segment}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cost-breakdown" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Structure Summary */}
            {costSummary && !costSummaryLoading && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Cost Structure Analysis</CardTitle>
                  <CardDescription>Labor, parts, and operational cost breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Labor Cost Share</span>
                      <span className="text-blue-400 font-semibold">
                        {costSummary.costStructureAnalysis.laborCostPercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Parts Cost Share</span>
                      <span className="text-green-400 font-semibold">
                        {costSummary.costStructureAnalysis.partsCostPercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Operational Cost Share</span>
                      <span className="text-purple-400 font-semibold">
                        {costSummary.costStructureAnalysis.operationalCostPercent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-600">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Average Labor Margin</span>
                        <span className={`font-semibold ${costSummary.averageLaborMargin > 20 ? 'text-green-400' : costSummary.averageLaborMargin > 10 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {costSummary.averageLaborMargin.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Average Parts Margin</span>
                        <span className={`font-semibold ${costSummary.averagePartsMargin > 20 ? 'text-green-400' : costSummary.averagePartsMargin > 10 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {costSummary.averagePartsMargin.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profitability Analysis */}
            {costSummary && !costSummaryLoading && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Profitability Analysis</CardTitle>
                  <CardDescription>Job code profitability by component</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Profitable Jobs</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {costSummary.totalProfitableJobs}
                        </Badge>
                        <span className="text-green-400">
                          {((costSummary.totalProfitableJobs / costSummary.totalJobCodes) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Labor Profitable Jobs</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-blue-400 border-blue-400">
                          {costSummary.laborProfitableJobs}
                        </Badge>
                        <span className="text-blue-400">
                          {((costSummary.laborProfitableJobs / costSummary.totalJobCodes) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Parts Profitable Jobs</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-purple-400 border-purple-400">
                          {costSummary.partsProfitableJobs}
                        </Badge>
                        <span className="text-purple-400">
                          {((costSummary.partsProfitableJobs / costSummary.totalJobCodes) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Detailed Cost Breakdown Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Detailed Cost Breakdown by Job Code</CardTitle>
              <CardDescription>Labor revenues, parts revenues, labor costs, parts costs breakdown for each job code</CardDescription>
            </CardHeader>
            <CardContent>
              {costBreakdownsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-20 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {costBreakdowns?.filter(job => 
                    searchQuery === "" || 
                    job.jobCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.jobDescription.toLowerCase().includes(searchQuery.toLowerCase())
                  ).slice(0, 20).map((job, index) => (
                    <div key={`${job.jobCode}-${job.segment}-${job.period}-${index}`} className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-semibold text-white">{job.jobCode}</span>
                            <Badge variant="outline" className={`text-xs ${getSegmentColor(job.segment)}`}>
                              {job.segment}
                            </Badge>
                            <Badge variant={job.isProfitable ? "default" : "destructive"} className="text-xs">
                              {job.isProfitable ? 'Profitable' : 'Unprofitable'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mb-3 max-w-md">{job.jobDescription}</p>
                          
                          {/* Cost Breakdown Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                            <div className="bg-gray-600 p-2 rounded">
                              <div className="text-gray-300">Labor Revenue</div>
                              <div className="text-blue-400 font-semibold">{formatCurrency(job.laborRevenuePerCall)}</div>
                            </div>
                            <div className="bg-gray-600 p-2 rounded">
                              <div className="text-gray-300">Parts Revenue</div>
                              <div className="text-green-400 font-semibold">{formatCurrency(job.partsRevenuePerCall)}</div>
                            </div>
                            <div className="bg-gray-600 p-2 rounded">
                              <div className="text-gray-300">Labor Cost</div>
                              <div className="text-red-400 font-semibold">{formatCurrency(job.laborCostPerCall)}</div>
                            </div>
                            <div className="bg-gray-600 p-2 rounded">
                              <div className="text-gray-300">Parts Cost</div>
                              <div className="text-red-400 font-semibold">{formatCurrency(job.partsCostPerCall)}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right ml-4">
                          <div className="text-sm text-gray-400">Volume</div>
                          <div className="text-white font-semibold">{job.callVolume.toLocaleString()}</div>
                          <div className="text-sm text-gray-400 mt-2">Total Profit</div>
                          <div className={`font-bold ${job.totalProfitPerCall > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {formatCurrency(job.totalProfitPerCall)}
                          </div>
                          <div className="text-sm text-gray-400">Margin</div>
                          <div className={`text-sm font-semibold ${job.totalMarginPercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {job.totalMarginPercent.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                      
                      {/* Profit Component Analysis */}
                      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-600">
                        <div className="text-center">
                          <div className="text-xs text-gray-400">Labor Profit</div>
                          <div className={`font-semibold ${job.isLaborProfitable ? 'text-green-400' : 'text-red-400'}`}>
                            {formatCurrency(job.laborProfitPerCall)}
                          </div>
                          <div className="text-xs text-gray-400">({job.laborMarginPercent.toFixed(1)}% margin)</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-400">Parts Profit</div>
                          <div className={`font-semibold ${job.isPartsProfitable ? 'text-green-400' : 'text-red-400'}`}>
                            {formatCurrency(job.partsProfitPerCall)}
                          </div>
                          <div className="text-xs text-gray-400">({job.partsMarginPercent.toFixed(1)}% margin)</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Performance Distribution Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {filteredJobCodes.filter(job => job.pptProfitPerCall > 50).length}
                  </div>
                  <div className="text-sm text-gray-300">High Profit</div>
                  <div className="text-xs text-gray-400 mt-1">&gt;$50 profit/call</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {filteredJobCodes.filter(job => job.pptProfitPerCall > 0 && job.pptProfitPerCall <= 50).length}
                  </div>
                  <div className="text-sm text-gray-300">Moderate Profit</div>
                  <div className="text-xs text-gray-400 mt-1">$0-$50 profit/call</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {filteredJobCodes.filter(job => job.pptProfitPerCall <= 0).length}
                  </div>
                  <div className="text-sm text-gray-300">Unprofitable</div>
                  <div className="text-xs text-gray-400 mt-1">≤$0 profit/call</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {filteredJobCodes.filter(job => job.callVolume > 100).length}
                  </div>
                  <div className="text-sm text-gray-300">High Volume</div>
                  <div className="text-xs text-gray-400 mt-1">&gt;100 calls</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Detailed Analysis Table */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Complete Job Code Database
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of all {filteredJobCodes.length} job codes with sortable metrics ({selectedSegment || 'Total'} segment)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {jobCodesLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-16 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-3 px-2 text-gray-300 font-medium">#</th>
                        <th className="text-left py-3 px-2 text-gray-300 font-medium">Job Code</th>
                        <th className="text-left py-3 px-2 text-gray-300 font-medium">Description</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Volume</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Revenue/Call</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Profit/Call</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Margin</th>
                        <th className="text-right py-3 px-2 text-gray-300 font-medium">Profitability</th>
                        <th className="text-center py-3 px-2 text-gray-300 font-medium">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="max-h-96 overflow-y-auto">
                      {filteredJobCodes
                        .sort((a, b) => b.pptProfitPerCall - a.pptProfitPerCall)
                        .slice(0, 50)
                        .map((job, index) => {
                          const marginPercent = job.totalRevenuePerCall > 0 
                            ? (job.pptProfitPerCall / job.totalRevenuePerCall) * 100 
                            : 0;
                          const grade = job.pptProfitPerCall > 50 ? 'A' : 
                                       job.pptProfitPerCall > 25 ? 'B' : 
                                       job.pptProfitPerCall > 0 ? 'C' : 
                                       job.pptProfitPerCall > -25 ? 'D' : 'F';
                          const gradeColor = grade === 'A' ? 'bg-green-600' :
                                           grade === 'B' ? 'bg-blue-600' :
                                           grade === 'C' ? 'bg-yellow-600' :
                                           grade === 'D' ? 'bg-orange-600' : 'bg-red-600';

                          return (
                            <tr key={`${job.jobCode}-${job.segment}-${job.period}-${index}`} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                              <td className="py-3 px-2">
                                <span className="text-gray-400 font-mono text-sm">{index + 1}</span>
                              </td>
                              <td className="py-3 px-2">
                                <span className="font-mono text-white font-semibold">{job.jobCode}</span>
                                <div className="text-xs text-gray-500">{job.segment}</div>
                              </td>
                              <td className="py-3 px-2">
                                <span className="text-gray-300 text-sm max-w-xs truncate block">
                                  {job.jobDescription}
                                </span>
                                {(job.recallRate > 0.1 || job.edRate > 0.1) && (
                                  <div className="flex space-x-1 mt-1">
                                    {job.recallRate > 0.1 && (
                                      <Badge variant="outline" className="text-red-400 border-red-400 text-xs">
                                        Recall
                                      </Badge>
                                    )}
                                    {job.edRate > 0.1 && (
                                      <Badge variant="outline" className="text-yellow-400 border-yellow-400 text-xs">
                                        ED
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className="text-blue-400 font-semibold">{job.callVolume.toLocaleString()}</span>
                                <div className="text-xs text-gray-500">calls</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className="text-white font-semibold">{formatCurrency(job.totalRevenuePerCall)}</span>
                                <div className="text-xs text-gray-500">per call</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className={`font-semibold ${getProfitColor(job.pptProfitPerCall)}`}>
                                  {formatCurrency(job.pptProfitPerCall)}
                                </span>
                                <div className="text-xs text-gray-500">profit</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className={`font-semibold ${getProfitColor(marginPercent)}`}>
                                  {marginPercent.toFixed(1)}%
                                </span>
                                <div className="text-xs text-gray-500">margin</div>
                              </td>
                              <td className="py-3 px-2 text-right">
                                <span className="text-gray-300 font-semibold">
                                  {formatPercentage(job.profitablePercentage)}
                                </span>
                                <div className="text-xs text-gray-500">profitable</div>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${gradeColor}`}>
                                  {grade}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  
                  {filteredJobCodes.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No job codes found matching your search criteria.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Grade Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {['A', 'B', 'C', 'D', 'F'].map((grade, index) => {
              const count = filteredJobCodes.filter(job => {
                const jobGrade = job.pptProfitPerCall > 50 ? 'A' : 
                               job.pptProfitPerCall > 25 ? 'B' : 
                               job.pptProfitPerCall > 0 ? 'C' : 
                               job.pptProfitPerCall > -25 ? 'D' : 'F';
                return jobGrade === grade;
              }).length;
              
              const gradeColor = grade === 'A' ? 'bg-green-600' :
                               grade === 'B' ? 'bg-blue-600' :
                               grade === 'C' ? 'bg-yellow-600' :
                               grade === 'D' ? 'bg-orange-600' : 'bg-red-600';
              
              const gradeLabel = grade === 'A' ? 'Excellent (>$50)' :
                               grade === 'B' ? 'Good ($26-$50)' :
                               grade === 'C' ? 'Fair ($1-$25)' :
                               grade === 'D' ? 'Poor ($-24-$0)' : 'Failing (<-$25)';

              return (
                <Card key={grade} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2 ${gradeColor}`}>
                        {grade}
                      </div>
                      <div className="text-2xl font-bold text-white">{count}</div>
                      <div className="text-sm text-gray-300">{gradeLabel}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {filteredJobCodes.length > 0 ? ((count / filteredJobCodes.length) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}