import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Target,
  Clock,
  Users
} from 'lucide-react';

interface JobAllocationData {
  d2cRepairEstimates: number;
  searsProtectOpportunities: number;
  revenueOptimization: string[];
  weeklyAllocationTrends: Array<{
    week: string;
    d2cJobs: number;
    b2bJobs: number;
    emergencyJobs: number;
    maintenanceJobs: number;
  }>;
}

export default function JobAllocationAnalysis() {
  const { data: jobData, isLoading } = useQuery<JobAllocationData>({
    queryKey: ['/api/job-allocation-analysis'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Analyzing job allocation data...</p>
      </div>
    );
  }

  if (!jobData) {
    return (
      <Card className="bg-white/10 border-white/20">
        <CardContent className="text-center p-8">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Job Allocation Data Not Available</h3>
          <p className="text-gray-400">Unable to load job allocation analysis.</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate totals for current week
  const currentWeek = jobData.weeklyAllocationTrends[jobData.weeklyAllocationTrends.length - 1];
  const totalJobs = currentWeek.d2cJobs + currentWeek.b2bJobs + currentWeek.emergencyJobs + currentWeek.maintenanceJobs;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-gray-300">D2C Repair Estimates</p>
                <p className="text-2xl font-bold">{jobData.d2cRepairEstimates.toLocaleString()}</p>
                <Badge className="bg-green-500/20 text-green-300 text-xs">23% higher revenue</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-sm text-gray-300">Sears Protect Opportunities</p>
                <p className="text-2xl font-bold">{jobData.searsProtectOpportunities.toLocaleString()}</p>
                <Badge className="bg-purple-500/20 text-purple-300 text-xs">$93,600 potential</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm text-gray-300">Total Jobs This Week</p>
                <p className="text-2xl font-bold">{totalJobs.toLocaleString()}</p>
                <Badge className="bg-blue-500/20 text-blue-300 text-xs">{currentWeek.week}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-sm text-gray-300">Emergency Jobs</p>
                <p className="text-2xl font-bold">{currentWeek.emergencyJobs.toLocaleString()}</p>
                <Badge className="bg-orange-500/20 text-orange-300 text-xs">34% premium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Allocation Trends */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Weekly Job Allocation Trends
          </CardTitle>
          <CardDescription>
            Job distribution across D2C, B2B, Emergency, and Maintenance categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={jobData.weeklyAllocationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="week" 
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="d2cJobs" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="D2C Jobs"
                />
                <Line 
                  type="monotone" 
                  dataKey="b2bJobs" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="B2B Jobs"
                />
                <Line 
                  type="monotone" 
                  dataKey="emergencyJobs" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Emergency Jobs"
                />
                <Line 
                  type="monotone" 
                  dataKey="maintenanceJobs" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Maintenance Jobs"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Optimization Insights */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <DollarSign className="w-5 h-5" />
            Revenue Optimization Insights
          </CardTitle>
          <CardDescription>
            Magik Button opportunities based on real job allocation data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobData.revenueOptimization.map((insight, index) => {
              const icons = [DollarSign, Target, Clock, Users];
              const colors = ['text-green-400', 'text-purple-400', 'text-orange-400', 'text-blue-400'];
              const bgColors = ['bg-green-500/10', 'bg-purple-500/10', 'bg-orange-500/10', 'bg-blue-500/10'];
              const borderColors = ['border-green-400/30', 'border-purple-400/30', 'border-orange-400/30', 'border-blue-400/30'];
              
              const IconComponent = icons[index % icons.length];
              
              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${bgColors[index % bgColors.length]} ${borderColors[index % borderColors.length]}`}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent className={`w-5 h-5 ${colors[index % colors.length]} mt-1 flex-shrink-0`} />
                    <p className="text-sm">{insight}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}