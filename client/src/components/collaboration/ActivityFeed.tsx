import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, User, Edit, Eye, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import type { CollaborationActivity } from "@shared/collaboration-schema";
import { formatDistanceToNow } from "date-fns";

interface ActivityFeedProps {
  activities: CollaborationActivity[];
  showUserNames?: boolean;
  maxItems?: number;
}

export function ActivityFeed({ activities, showUserNames = true, maxItems = 20 }: ActivityFeedProps) {
  const getActivityIcon = (activityType: string) => {
    switch (activityType.toLowerCase()) {
      case 'view':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'edit':
        return <Edit className="h-4 w-4 text-orange-500" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'approve':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityColor = (activityType: string) => {
    switch (activityType.toLowerCase()) {
      case 'view':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'edit':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'comment':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'approve':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'alert':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const displayedActivities = activities.slice(0, maxItems);

  if (displayedActivities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Demo CEO Activities */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">Executive User (CEO)</span>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">execute</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  CEO executing: Immediate Capacity Expansion - 1099 Contractor Network
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>2 minutes ago</span>
                  <span>•</span>
                  <span className="capitalize">CEO Action</span>
                  <span className="font-mono">#capacity-crisis-1</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <div className="flex-shrink-0 mt-0.5">
                <AlertCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">Executive User (CEO)</span>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">approve</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Strategic decision: Priority Escalation for Series A funding round
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>5 minutes ago</span>
                  <span>•</span>
                  <span className="capitalize">Strategic Decision</span>
                  <span className="font-mono">#series-a-funding</span>
                </div>
              </div>
            </div>

            <div className="text-center py-4 text-muted-foreground border-t">
              <Activity className="h-6 w-6 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Click "Execute Action" in CEO Actions tab to broadcast live activities</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Activity className="h-4 w-4" />
          Recent Activity
          <Badge variant="secondary" className="text-xs">
            {activities.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64">
          <div className="space-y-1 p-4">
            {displayedActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getActivityIcon(activity.activityType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {showUserNames && (
                      <span className="font-medium text-sm">{activity.userName}</span>
                    )}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getActivityColor(activity.activityType)}`}
                    >
                      {activity.activityType}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-1">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </span>
                    {activity.targetEntity && (
                      <>
                        <span>•</span>
                        <span className="capitalize">{activity.targetEntity}</span>
                        {activity.targetId && (
                          <span className="font-mono">#{activity.targetId}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}