import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Target,
  Lightbulb,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface CoachingRecommendations {
  lowPerformerActions: string[];
  averagePerformerActions: string[];
  goodPerformerActions: string[];
  highPerformerActions: string[];
  topPerformerActions: string[];
  magikButtonCertificationPath: string[];
}

export default function CoachingRecommendations() {
  const { data: coaching, isLoading } = useQuery<CoachingRecommendations>({
    queryKey: ['/api/coaching-recommendations'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading coaching recommendations...</p>
      </div>
    );
  }

  if (!coaching) {
    return (
      <Card className="bg-white/10 border-white/20">
        <CardContent className="text-center p-8">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Coaching Data Not Available</h3>
          <p className="text-gray-400">Unable to load coaching recommendations.</p>
        </CardContent>
      </Card>
    );
  }

  const performerCategories = [
    {
      title: "Low Performers (0-5 jobs)",
      actions: coaching.lowPerformerActions,
      icon: AlertTriangle,
      color: "text-red-400",
      badgeColor: "bg-red-500/20 text-red-300",
      count: "187 technicians"
    },
    {
      title: "Average Performers (6-10 jobs)",
      actions: coaching.averagePerformerActions,
      icon: Users,
      color: "text-yellow-400",
      badgeColor: "bg-yellow-500/20 text-yellow-300",
      count: "240 technicians"
    },
    {
      title: "Good Performers (11-15 jobs)",
      actions: coaching.goodPerformerActions,
      icon: TrendingUp,
      color: "text-green-400",
      badgeColor: "bg-green-500/20 text-green-300",
      count: "406 technicians"
    },
    {
      title: "High Performers (16-20 jobs)",
      actions: coaching.highPerformerActions,
      icon: Target,
      color: "text-blue-400",
      badgeColor: "bg-blue-500/20 text-blue-300",
      count: "382 technicians"
    },
    {
      title: "Top Performers (21+ jobs)",
      actions: coaching.topPerformerActions,
      icon: Award,
      color: "text-purple-400",
      badgeColor: "bg-purple-500/20 text-purple-300",
      count: "255 technicians"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance-Based Coaching */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {performerCategories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <Card key={index} className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${category.color}`}>
                  <IconComponent className="w-5 h-5" />
                  {category.title}
                </CardTitle>
                <CardDescription>
                  <Badge className={category.badgeColor}>{category.count}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.actions.map((action, actionIndex) => (
                    <div key={actionIndex} className="flex items-start gap-2">
                      <CheckCircle className={`w-4 h-4 ${category.color} mt-1 flex-shrink-0`} />
                      <p className="text-sm">{action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Magik Button Certification Path */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Award className="w-5 h-5" />
            Magik Button Certification Path
          </CardTitle>
          <CardDescription>
            Structured progression pathway for technician development through Magik Button mastery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coaching.magikButtonCertificationPath.map((level, index) => {
              const [levelName, description] = level.split(': ');
              const colors = [
                'text-orange-400 border-orange-400/30 bg-orange-500/10',
                'text-gray-400 border-gray-400/30 bg-gray-500/10',
                'text-yellow-400 border-yellow-400/30 bg-yellow-500/10',
                'text-purple-400 border-purple-400/30 bg-purple-500/10',
                'text-blue-400 border-blue-400/30 bg-blue-500/10'
              ];
              
              return (
                <div key={index} className={`p-4 rounded-lg border ${colors[index] || colors[0]}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <h4 className="font-semibold">{levelName}</h4>
                  </div>
                  <p className="text-sm text-gray-300">{description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}