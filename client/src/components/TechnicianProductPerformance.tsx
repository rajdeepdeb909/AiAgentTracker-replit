import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Star,
  Wrench,
  BarChart3,
  Target,
  Lightbulb
} from 'lucide-react';

interface TechnicianProductPerformanceProps {
  technicianId: string;
  technicianName: string;
}

export function TechnicianProductPerformance({ technicianId, technicianName }: TechnicianProductPerformanceProps) {
  const [selectedProductType, setSelectedProductType] = useState<string>('ALL');
  const [selectedJobCode, setSelectedJobCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('products');

  // Fetch product type performance
  const { data: productTypeData, isLoading: productLoading } = useQuery({
    queryKey: [`/api/coaching/technician/${technicianId}/product-types`],
    enabled: !!technicianId
  });

  // Fetch job code performance
  const { data: jobCodeData, isLoading: jobCodeLoading } = useQuery({
    queryKey: [`/api/coaching/technician/${technicianId}/job-codes/${selectedProductType}`],
    enabled: !!technicianId && selectedProductType !== 'ALL'
  });

  // Fetch Magik Button recommendations
  const { data: magikData } = useQuery({
    queryKey: [`/api/coaching/magik-button/${selectedJobCode}`, selectedProductType],
    enabled: !!selectedJobCode
  });

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getPerformanceColor = (value: number, thresholds: { good: number; fair: number }) => {
    if (value >= thresholds.good) return 'text-green-500';
    if (value >= thresholds.fair) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getComplexityBadge = (complexity: string) => {
    const colors = {
      'Low': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'High': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'Expert': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return <Badge className={colors[complexity as keyof typeof colors] || colors.Medium}>{complexity}</Badge>;
  };

  if (productLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{technicianName}</h2>
          <p className="text-gray-400">Product Type & Job Code Performance Analysis</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedProductType} onValueChange={setSelectedProductType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Product Types</SelectItem>
              {productTypeData?.productTypeBreakdown?.map((product: any) => (
                <SelectItem key={product.productType} value={product.productType}>
                  {product.productType} ({product.totalJobs} jobs)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overall Metrics */}
      {productTypeData?.overallMetrics && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">First-Time Fix</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(productTypeData.overallMetrics.firstTimeFixRate, { good: 85, fair: 75 })}`}>
                    {productTypeData.overallMetrics.firstTimeFixRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-400">Recall Rate</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(20 - productTypeData.overallMetrics.recallRate, { good: 15, fair: 10 })}`}>
                    {productTypeData.overallMetrics.recallRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-400">Diagnostic Accuracy</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(productTypeData.overallMetrics.diagnosticAccuracy, { good: 90, fair: 80 })}`}>
                    {productTypeData.overallMetrics.diagnosticAccuracy.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-400">Avg Job Duration</p>
                  <p className="text-lg font-bold text-white">
                    {productTypeData.overallMetrics.avgJobDuration.toFixed(1)} days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">Revenue/Job</p>
                  <p className="text-lg font-bold text-white">
                    ${productTypeData.overallMetrics.revenuePerJob.toFixed(0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-400">Profit Margin</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(productTypeData.overallMetrics.profitMargin, { good: 25, fair: 15 })}`}>
                    {productTypeData.overallMetrics.profitMargin.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Product Types</TabsTrigger>
          <TabsTrigger value="jobcodes">Job Codes</TabsTrigger>
          <TabsTrigger value="magik">Magik Button</TabsTrigger>
        </TabsList>

        {/* Product Types Tab */}
        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4">
            {productTypeData?.productTypeBreakdown?.map((product: any) => (
              <Card key={product.productType} className="bg-white/10 border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{product.productType}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-white">
                        {product.totalJobs} jobs
                      </Badge>
                      {getTrendIcon(product.trends.weekOverWeek)}
                      <span className="text-sm text-gray-400">
                        {product.trends.weekOverWeek > 0 ? '+' : ''}{product.trends.weekOverWeek.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">First-Time Fix</p>
                      <div className="flex items-center gap-2">
                        <Progress value={product.firstTimeFixRate} className="flex-1" />
                        <span className={`text-sm font-medium ${getPerformanceColor(product.firstTimeFixRate, { good: 85, fair: 75 })}`}>
                          {product.firstTimeFixRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Recall Rate</p>
                      <div className="flex items-center gap-2">
                        <Progress value={20 - product.recallRate} className="flex-1" />
                        <span className={`text-sm font-medium ${getPerformanceColor(20 - product.recallRate, { good: 15, fair: 10 })}`}>
                          {product.recallRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Customer Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-white">
                          {product.customerRating.toFixed(1)}/5.0
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Avg Revenue</p>
                      <span className="text-sm font-medium text-green-400">
                        ${product.avgRevenue.toFixed(0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedProductType(product.productType);
                        setActiveTab('jobcodes');
                      }}
                      className="text-white border-white/20"
                    >
                      View Job Codes for {product.productType}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Job Codes Tab */}
        <TabsContent value="jobcodes" className="space-y-4">
          {selectedProductType === 'ALL' ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Please select a specific product type to view job codes</p>
              <Button 
                onClick={() => setActiveTab('products')}
                variant="outline"
                className="text-white border-white/20"
              >
                Go to Product Types
              </Button>
            </div>
          ) : jobCodeLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Job Codes for {selectedProductType}
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedProductType('ALL')}
                  className="text-white border-white/20"
                >
                  View All Product Types
                </Button>
              </div>
              <div className="grid gap-4">
                {jobCodeData?.jobCodeBreakdown?.map((jobCode: any) => (
                <Card key={jobCode.jobCode} className="bg-white/10 border-white/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white">{jobCode.jobCode}</CardTitle>
                        <p className="text-gray-400">{jobCode.jobDescription}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getComplexityBadge(jobCode.complexity)}
                        <Badge variant="outline" className="text-white">
                          {jobCode.totalJobs} jobs
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400">First-Time Fix</p>
                        <p className={`text-lg font-bold ${getPerformanceColor(jobCode.firstTimeFixRate, { good: 85, fair: 75 })}`}>
                          {jobCode.firstTimeFixRate.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400">Recall Rate</p>
                        <p className={`text-lg font-bold ${getPerformanceColor(20 - jobCode.recallRate, { good: 15, fair: 10 })}`}>
                          {jobCode.recallRate.toFixed(1)}%
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400">Diagnostic Time</p>
                        <p className="text-lg font-bold text-white">
                          {jobCode.diagnosticTime.toFixed(1)}d
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400">Repair Time</p>
                        <p className="text-lg font-bold text-white">
                          {jobCode.repairTime.toFixed(1)}d
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400">Profitability</p>
                        <p className={`text-lg font-bold ${getPerformanceColor(jobCode.profitability, { good: 25, fair: 15 })}`}>
                          {jobCode.profitability.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedJobCode(jobCode.jobCode);
                          setActiveTab('magik');
                        }}
                        className="text-white border-white/20"
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        View Magik Button Recommendations
                      </Button>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>Performance Trend:</span>
                        {jobCode.trends.performance === 'improving' && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {jobCode.trends.performance === 'declining' && <TrendingDown className="w-4 h-4 text-red-500" />}
                        {jobCode.trends.performance === 'stable' && <Minus className="w-4 h-4 text-gray-500" />}
                        <span className="capitalize">{jobCode.trends.performance}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Magik Button Tab */}
        <TabsContent value="magik" className="space-y-4">
          {!selectedJobCode ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">Please select a job code to view Magik Button recommendations</p>
              <Button 
                onClick={() => setActiveTab('jobcodes')}
                variant="outline"
                className="text-white border-white/20"
              >
                Go to Job Codes
              </Button>
            </div>
          ) : magikData?.magikButtonRecommendations?.length > 0 ? (
              <div className="grid gap-4">
                {magikData.magikButtonRecommendations.map((recommendation: any) => (
                  <Card key={recommendation.id} className="bg-white/10 border-white/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{recommendation.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                            {recommendation.category}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            {recommendation.successProbability}% success
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-400">{recommendation.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold text-white mb-2">Instructions</h4>
                          <ul className="space-y-1">
                            {recommendation.instructions.map((instruction: string, index: number) => (
                              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {instruction}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-white mb-2">Warning Signals</h4>
                          <ul className="space-y-1">
                            {recommendation.warningSignals.map((signal: string, index: number) => (
                              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                {signal}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-white mb-2">Common Mistakes</h4>
                          <ul className="space-y-1">
                            {recommendation.commonMistakes.map((mistake: string, index: number) => (
                              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                {mistake}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm text-gray-400">Estimated Time Reduction</p>
                            <p className="text-lg font-bold text-blue-400">-{recommendation.estimatedTimeReduction} minutes</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Impact Area</p>
                            <p className="text-lg font-bold text-white capitalize">{recommendation.impactArea.replace('_', ' ')}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-8 text-center">
                  <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-white">No Magik Button recommendations available for {selectedJobCode}</p>
                  <p className="text-gray-400 mt-2">This job code may not have specific Magik Button protocols available.</p>
                </CardContent>
              </Card>
            )
          }
        </TabsContent>
      </Tabs>
    </div>
  );
}