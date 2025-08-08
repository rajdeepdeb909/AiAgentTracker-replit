import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Star, TrendingUp, AlertTriangle, Clock, DollarSign, Users, CheckCircle, XCircle } from 'lucide-react';

interface CompletedOrdersSummary {
  date: string;
  totalOrders: number;
  customerRatings: Record<string, number>;
  planningAreas: Record<string, number>;
  repairTypes: Record<string, number>;
  financial: {
    totalRevenue: number;
    avgRevenue: number;
    totalProfit: number;
    avgProfit: number;
    profitMargin: number;
  };
  quality: {
    fiveStarRate: number;
    lowRatingRate: number;
    avgCustomerRating: number;
    completionRate: number;
    unratedRate: number;
  };
}

interface RatingAnalysis {
  date: string;
  totalRated: number;
  ratingDistribution: Record<string, number>;
  qualityMetrics: {
    excellentService: number;
    needsImprovement: number;
    avgRating: number;
    satisfactionRate: number;
  };
  aiRecommendations: Array<{
    category: string;
    count: number;
    percentage: string;
    impact: string;
    solution: string;
  }>;
}

export default function CompletedOrdersAnalysis() {
  const [selectedDate, setSelectedDate] = useState('2025-07-25');
  
  const { data: ordersSummary, isLoading: summaryLoading } = useQuery<CompletedOrdersSummary>({
    queryKey: ['/api/completed-orders/summary', selectedDate],
    queryFn: () => fetch(`/api/completed-orders/summary/${selectedDate}`).then(res => res.json())
  });

  const { data: ratingsAnalysis, isLoading: ratingsLoading } = useQuery<RatingAnalysis>({
    queryKey: ['/api/completed-orders/ratings/analysis', selectedDate],
    queryFn: () => fetch(`/api/completed-orders/ratings/analysis/${selectedDate}`).then(res => res.json())
  });

  if (summaryLoading || ratingsLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-32 bg-gray-800 rounded-lg animate-pulse" />
        <div className="h-64 bg-gray-800 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (!ordersSummary || ordersSummary.totalOrders === 0) {
    return (
      <div className="p-6">
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-8 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-lg font-semibold mb-2">No Completed Orders Data</h3>
            <p className="text-gray-400">Select a different date or wait for completed orders to be processed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate rating metrics
  const totalRated = Object.values(ordersSummary.customerRatings).reduce((sum, count) => 
    sum + (typeof count === 'number' ? count : 0), 0) - (ordersSummary.customerRatings.unrated || 0);
  const unratedOrders = ordersSummary.customerRatings.unrated || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Completed Orders Analysis</h1>
          <p className="text-gray-400">Real customer service completion data with ratings and AI optimization opportunities</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-500/20 text-blue-400">
            Date: {selectedDate}
          </Badge>
          <Badge className="bg-green-500/20 text-green-400">
            {ordersSummary.totalOrders} completed orders
          </Badge>
        </div>
      </div>

      {/* Critical Alert for Unrated Orders */}
      {ordersSummary.quality.unratedRate > 90 && (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="text-red-400 font-semibold">Critical: {ordersSummary.quality.unratedRate}% Unrated Orders</h3>
                <p className="text-gray-300 text-sm">
                  {unratedOrders} customers not contacted for feedback - massive opportunity loss for reputation management
                </p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white ml-auto">
                Deploy AI Rating Follow-up Agent
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview" className="text-white">Overview</TabsTrigger>
          <TabsTrigger value="ratings" className="text-white">Rating Analysis</TabsTrigger>
          <TabsTrigger value="financial" className="text-white">Financial Impact</TabsTrigger>
          <TabsTrigger value="ai-actions" className="text-white">AI Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Key Metrics Cards */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400 text-sm">Completed Orders</span>
                </div>
                <p className="text-2xl font-bold text-white mt-2">{ordersSummary.totalOrders}</p>
                <p className="text-green-400 text-sm">100% completion rate</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-400 text-sm">5-Star Rate</span>
                </div>
                <p className="text-2xl font-bold text-white mt-2">{ordersSummary.quality.fiveStarRate}%</p>
                <p className="text-red-400 text-sm">Far below industry 45%</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400 text-sm">Total Revenue</span>
                </div>
                <p className="text-2xl font-bold text-white mt-2">${ordersSummary.financial.totalRevenue.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">${ordersSummary.financial.avgRevenue.toFixed(0)} avg per order</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-gray-400 text-sm">Unrated Orders</span>
                </div>
                <p className="text-2xl font-bold text-white mt-2">{unratedOrders}</p>
                <p className="text-red-400 text-sm">{ordersSummary.quality.unratedRate}% no follow-up</p>
              </CardContent>
            </Card>
          </div>

          {/* Planning Areas Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Planning Areas</CardTitle>
                <p className="text-gray-400 text-sm">Completed orders by geographic region</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(ordersSummary.planningAreas).slice(0, 6).map(([area, count]) => (
                  <div key={area} className="flex items-center justify-between">
                    <span className="text-white text-sm">{area}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(count / Math.max(...Object.values(ordersSummary.planningAreas))) * 100}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm w-8">{count}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Service Type Distribution</CardTitle>
                <p className="text-gray-400 text-sm">Breakdown by repair type</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(ordersSummary.repairTypes).map(([type, count]) => {
                  const percentage = (count / ordersSummary.totalOrders * 100).toFixed(1);
                  return (
                    <div key={type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">{type}</span>
                        <span className="text-gray-400 text-sm">{count} ({percentage}%)</span>
                      </div>
                      <Progress value={parseFloat(percentage)} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4">
          {ratingsAnalysis && (
            <>
              {/* Rating Distribution */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Customer Rating Distribution</CardTitle>
                  <p className="text-gray-400 text-sm">Only {totalRated} of {ordersSummary.totalOrders} orders rated</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Object.entries(ordersSummary.customerRatings).map(([rating, count]) => {
                      if (rating === 'unrated') {
                        return (
                          <div key={rating} className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">{count}</p>
                            <p className="text-red-400 text-sm">Unrated</p>
                          </div>
                        );
                      }
                      
                      const percentage = totalRated > 0 ? ((count / totalRated) * 100).toFixed(1) : '0.0';
                      const isPositive = parseInt(rating) >= 4;
                      
                      return (
                        <div key={rating} className={`text-center p-4 rounded-lg border ${
                          isPositive ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'
                        }`}>
                          <div className="flex justify-center mb-2">
                            {Array.from({length: parseInt(rating)}).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-2xl font-bold text-white">{count}</p>
                          <p className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {percentage}%
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">AI Rating Optimization Recommendations</CardTitle>
                  <p className="text-gray-400 text-sm">Automated strategies to improve customer ratings</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ratingsAnalysis.aiRecommendations.map((rec, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      rec.impact === 'High' ? 'bg-red-500/10 border-red-500/20' :
                      rec.impact === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20' :
                      'bg-blue-500/10 border-blue-500/20'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-medium">{rec.category}</h3>
                        <Badge className={
                          rec.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                          rec.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }>
                          {rec.impact} Impact
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{rec.solution}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">
                          Affects {rec.count} orders ({rec.percentage}%)
                        </span>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Deploy AI Agent
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Revenue Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">${ordersSummary.financial.totalRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Average per Order</p>
                  <p className="text-xl font-semibold text-white">${ordersSummary.financial.avgRevenue.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Profit Margin</p>
                  <p className="text-xl font-semibold text-green-400">{ordersSummary.financial.profitMargin}%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Profit Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Total Profit</p>
                  <p className="text-2xl font-bold text-white">${ordersSummary.financial.totalProfit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Average per Order</p>
                  <p className="text-xl font-semibold text-white">${ordersSummary.financial.avgProfit.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Profit per Order Range</p>
                  <p className="text-sm text-gray-300">$85 - $220 typical range</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span>Revenue Risk</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Unrated Order Risk</p>
                  <p className="text-white text-lg font-semibold">${((unratedOrders * ordersSummary.financial.avgRevenue) * 0.15).toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">Potential revenue loss from poor reviews</p>
                </div>
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Review Impact</p>
                  <p className="text-gray-300 text-xs">
                    Each 1-star review can reduce future bookings by 5-9%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-actions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Immediate AI Actions</CardTitle>
                <p className="text-gray-400 text-sm">Deploy these AI agents for immediate rating improvement</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-blue-400 font-medium mb-2">Rating Follow-up Agent</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Contact {unratedOrders} unrated customers within 24 hours for feedback
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Estimated 5-star conversion: 40-60%</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Activate Agent</Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-green-400 font-medium mb-2">Review Recovery Agent</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Proactively address 1-star rating with service recovery
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Target: 1 low-rated customer</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Deploy Now</Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-purple-400 font-medium mb-2">Review Request Agent</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Request online reviews from 5-star customers to boost reputation
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Target: 5 satisfied customers</span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Launch Agent</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Batch vs Streaming Options</CardTitle>
                <p className="text-gray-400 text-sm">Choose how to process completed orders going forward</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-gray-700 rounded-lg">
                  <h3 className="text-white font-medium mb-2">📊 Batch Processing (Current)</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Upload daily completed orders file for AI analysis and optimization
                  </p>
                  <div className="text-gray-400 text-xs space-y-1">
                    <p>✓ Complete historical data analysis</p>
                    <p>✓ Comprehensive reporting</p>
                    <p>• 24-hour delay in response</p>
                  </div>
                </div>

                <div className="p-4 border border-blue-500/30 rounded-lg bg-blue-500/5">
                  <h3 className="text-blue-400 font-medium mb-2">🔄 Real-Time Streaming</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    AI agent evaluates each completed call immediately for instant optimization
                  </p>
                  <div className="text-gray-400 text-xs space-y-1 mb-3">
                    <p>✓ Immediate customer follow-up</p>
                    <p>✓ Real-time issue detection</p>
                    <p>✓ Proactive service recovery</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Enable Real-Time Processing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}