import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserPresenceIndicator } from "./UserPresenceIndicator";
import { ActivityFeed } from "./ActivityFeed";
import { NotificationCenter } from "./NotificationCenter";
import { CEOActionCenter } from "./CEOActionCenter";
import { useCollaboration } from "@/hooks/useCollaboration";
import { Users, Activity, Bell, Wifi, WifiOff, Target } from "lucide-react";

interface CollaborationDashboardProps {
  userId: string;
  userName: string;
  userRole: string;
  currentPage: string;
  currentSection?: string;
}

export function CollaborationDashboard({
  userId,
  userName,
  userRole,
  currentPage,
  currentSection
}: CollaborationDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const {
    isConnected,
    activeUsers,
    recentActivities,
    notifications,
    unreadCount,
    sendActivityBroadcast,
    markNotificationsAsRead
  } = useCollaboration({
    userId,
    userName,
    userRole,
    currentPage,
    currentSection
  });

  const handleTestActivity = () => {
    sendActivityBroadcast({
      activityType: 'view',
      targetEntity: currentPage,
      targetId: currentSection,
      description: `${userName} is reviewing the ${currentSection || currentPage} section`,
      metadata: { section: currentSection, timestamp: new Date().toISOString() }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Connection Status */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Real-Time Collaboration</h2>
          <p className="text-muted-foreground">
            Live collaboration and user presence tracking
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-600">Connecting...</span>
              </>
            )}
          </div>
          
          <NotificationCenter
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAsRead={markNotificationsAsRead}
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently viewing this page
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentActivities.length}</div>
            <p className="text-xs text-muted-foreground">
              Actions in the last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">
              Unread notifications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Active Users</TabsTrigger>
          <TabsTrigger value="activity">Activity Feed</TabsTrigger>
          {userRole === 'CEO' && <TabsTrigger value="ceo-actions">CEO Actions</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Presence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Presence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UserPresenceIndicator
                  users={activeUsers}
                  currentUserId={userId}
                  showDetails={true}
                  maxVisible={8}
                />
                
                {activeUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No other users currently viewing this page</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleTestActivity}
                  disabled={!isConnected}
                  className="w-full"
                >
                  Broadcast Activity
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => markNotificationsAsRead()}
                  disabled={unreadCount === 0}
                  className="w-full"
                >
                  Mark All Notifications Read
                </Button>

                <div className="pt-4 space-y-2">
                  <div className="text-sm font-medium">Current Session</div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>User: {userName}</div>
                    <div>Role: <Badge variant="outline">{userRole}</Badge></div>
                    <div>Page: {currentPage}</div>
                    {currentSection && <div>Section: {currentSection}</div>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Users on {currentPage}</CardTitle>
            </CardHeader>
            <CardContent>
              {activeUsers.length > 0 ? (
                <div className="space-y-4">
                  {activeUsers.map((user) => (
                    <div key={user.userId} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                          {user.userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background"></div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.userName}</span>
                          <Badge variant="secondary">{user.userRole}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.currentSection ? `Viewing: ${user.currentSection}` : 'On this page'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last active: {new Date(user.lastActivity).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No other users currently on this page</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <ActivityFeed
            activities={recentActivities}
            showUserNames={true}
            maxItems={50}
          />
        </TabsContent>

        {userRole === 'CEO' && (
          <TabsContent value="ceo-actions" className="space-y-6">
            <CEOActionCenter
              userId={userId}
              userName={userName}
              userRole={userRole}
              currentPage={currentPage}
              currentSection="CEO Actions"
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}