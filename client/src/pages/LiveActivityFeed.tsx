import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SystemWideActivityFeed from "@/components/SystemWideActivityFeed";
import NavigationBreadcrumbs from "@/components/NavigationBreadcrumbs";

export default function LiveActivityFeed() {
  return (
    <div className="p-6 space-y-6">
      <NavigationBreadcrumbs 
        items={[
          { label: "Dashboard", href: "/" },
          { label: "Live AI Agent Activity Feed", href: "/live-activity" }
        ]}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Live AI Agent Activity Feed</h1>
            <p className="text-gray-400 mt-2">
              Real-time monitoring of all AI agent activities, alerts, and human-in-the-loop approvals across America's Home Manager platform
            </p>
          </div>
        </div>

        {/* Real-Time Activity Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm text-gray-400">Active Agents</p>
                  <p className="text-xl font-semibold text-white">26/28</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm text-gray-400">Pending Approvals</p>
                  <p className="text-xl font-semibold text-white">7</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm text-gray-400">Activities Today</p>
                  <p className="text-xl font-semibold text-white">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm text-gray-400">Autonomous Rate</p>
                  <p className="text-xl font-semibold text-white">94.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Activity Feed */}
        <SystemWideActivityFeed 
          showHeader={true}
          maxItems={100}
          compact={false}
        />
      </div>
    </div>
  );
}