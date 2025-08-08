import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle,
  Users,
  Target,
  Clock,
  Lightbulb
} from 'lucide-react';

interface TrendAnalysis {
  workforceChanges: string[];
  performanceShifts: string[];
  predictiveInsights: string[];
  interventionOpportunities: string[];
}

export default function TrendAnalysis() {
  const { data: trends, isLoading } = useQuery<TrendAnalysis>({
    queryKey: ['/api/trend-analysis'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Analyzing workforce trends...</p>
      </div>
    );
  }

  if (!trends) {
    return (
      <Card className="bg-white/10 border-white/20">
        <CardContent className="text-center p-8">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Trend Data Not Available</h3>
          <p className="text-gray-400">Unable to load trend analysis.</p>
        </CardContent>
      </Card>
    );
  }

  const trendCategories = [
    {
      title: "Workforce Changes",
      data: trends.workforceChanges,
      icon: Users,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-400/30"
    },
    {
      title: "Performance Shifts",
      data: trends.performanceShifts,
      icon: TrendingDown,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-400/30"
    },
    {
      title: "Predictive Insights",
      data: trends.predictiveInsights,
      icon: Lightbulb,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30"
    },
    {
      title: "Intervention Opportunities",
      data: trends.interventionOpportunities,
      icon: Target,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {trendCategories.map((category, index) => {
        const IconComponent = category.icon;
        return (
          <Card key={index} className={`bg-white/10 border-white/20 ${category.bgColor} ${category.borderColor}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${category.color}`}>
                <IconComponent className="w-5 h-5" />
                {category.title}
              </CardTitle>
              <CardDescription>
                Analysis based on 12 weeks of real technician performance data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.data.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full ${category.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`}></div>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}