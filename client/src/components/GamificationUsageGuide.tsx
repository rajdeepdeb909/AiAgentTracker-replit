import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Eye, 
  Target, 
  Users, 
  Trophy, 
  Zap,
  Activity,
  TrendingUp,
  Settings,
  Lightbulb,
  Rocket,
  Crown
} from "lucide-react";

export default function GamificationUsageGuide() {
  return (
    <div className="space-y-6">
      {/* What is the Gamification Intelligence Agent */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-6 w-6 mr-3 text-purple-400" />
            What is the Gamification Intelligence Agent?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            The Gamification Intelligence Agent (Agent #24) is a sophisticated behavioral psychology AI that manages 
            engagement across your entire platform. It operates 6 distinct gamification engines simultaneously, 
            analyzing behavior patterns and optimizing reward systems to maximize participation and performance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-400" />
                Who It Manages
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• 287 active 1099 contractors</li>
                <li>• 342 W2 employees</li>
                <li>• 8,420 customers in loyalty program</li>
                <li>• 23 AI agents (performance optimization)</li>
                <li>• 430 planning areas (geographic competition)</li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2 flex items-center">
                <Target className="h-4 w-4 mr-2 text-green-400" />
                What It Optimizes
              </h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Onboarding completion speed (+43%)</li>
                <li>• Employee retention rates (+34%)</li>
                <li>• Customer referral generation (+67%)</li>
                <li>• AI agent efficiency (+28%)</li>
                <li>• Cross-platform engagement (+89%)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Use Each Tab */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="h-5 w-5 mr-2 text-blue-400" />
            How to Use Each Dashboard Section
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Activity className="h-4 w-4 mr-2 text-green-400" />
                  <h4 className="text-white font-medium">Overview Tab</h4>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Monitor real-time engagement metrics across all 6 gamification engines
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• View core AI functions and behavioral insights</li>
                  <li>• Track engagement trends and optimization results</li>
                  <li>• Monitor participant activity across all engines</li>
                  <li>• Review AI-driven performance improvements</li>
                </ul>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Rocket className="h-4 w-4 mr-2 text-purple-400" />
                  <h4 className="text-white font-medium">Engines Tab</h4>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Manage individual gamification engines and their performance
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Configure engine-specific settings</li>
                  <li>• Monitor participant counts and engagement</li>
                  <li>• Adjust difficulty and reward parameters</li>
                  <li>• Enable/disable specific engines as needed</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Activity className="h-4 w-4 mr-2 text-orange-400" />
                  <h4 className="text-white font-medium">Live Feed Tab</h4>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Watch real-time achievements and participant activity
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• See live achievements as they happen</li>
                  <li>• Monitor cross-engine participation</li>
                  <li>• Track point awards and badge unlocks</li>
                  <li>• Identify high-performing participants</li>
                </ul>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-400" />
                  <h4 className="text-white font-medium">Intelligence Tab</h4>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Review AI insights and optimization recommendations
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Review behavioral insights and patterns</li>
                  <li>• See AI optimization recommendations</li>
                  <li>• Monitor performance improvement queue</li>
                  <li>• Track confidence levels and impact predictions</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global Challenges Explained */}
      <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-500">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Crown className="h-6 w-6 mr-3 text-yellow-400" />
            What Are Global Challenges?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-purple-100">
            Global Challenges are platform-wide competitions that span across all 6 gamification engines 
            simultaneously. They create massive engagement spikes and drive exceptional performance improvements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-800/30 p-4 rounded-lg">
              <h4 className="text-blue-200 font-medium mb-2 flex items-center">
                <Trophy className="h-4 w-4 mr-2" />
                Challenge Types
              </h4>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• <strong>Speed Mastery:</strong> Complete tasks faster than average</li>
                <li>• <strong>Quality Excellence:</strong> Maintain highest ratings</li>
                <li>• <strong>Cross-Platform Champion:</strong> Excel across multiple engines</li>
                <li>• <strong>Innovation Sprint:</strong> Suggest process improvements</li>
              </ul>
            </div>

            <div className="bg-purple-800/30 p-4 rounded-lg">
              <h4 className="text-purple-200 font-medium mb-2 flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Expected Impact
              </h4>
              <ul className="text-sm text-purple-100 space-y-1">
                <li>• <strong>Participation:</strong> 85% of eligible participants</li>
                <li>• <strong>Performance:</strong> 35% average improvement</li>
                <li>• <strong>Engagement:</strong> 45% boost during challenge</li>
                <li>• <strong>Retention:</strong> 28% improvement post-challenge</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2 flex items-center">
              <Settings className="h-4 w-4 mr-2 text-green-400" />
              How Global Challenges Work
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-gray-300">
              <div className="text-center">
                <div className="text-blue-400 font-medium">1. Launch</div>
                <div>Configure challenge parameters and reward pool</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-medium">2. Notify</div>
                <div>All 9,525 participants get instant notifications</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-medium">3. Compete</div>
                <div>Real-time tracking across all engines</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-medium">4. Reward</div>
                <div>Automatic distribution of prizes and recognition</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Benefits */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
            Key Business Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Faster Onboarding",
                metric: "43% improvement",
                description: "New contractors and employees complete training faster through gamified learning paths"
              },
              {
                title: "Higher Retention", 
                metric: "34% improvement",
                description: "Engaged participants are more likely to stay long-term with the platform"
              },
              {
                title: "Quality Improvements",
                metric: "28% performance gain",
                description: "Competition drives higher standards and better customer outcomes"
              },
              {
                title: "Cost Reduction",
                metric: "$2.3M managed efficiently",
                description: "Automated reward distribution and engagement tracking reduces manual overhead"
              },
              {
                title: "Revenue Growth",
                metric: "67% more referrals",
                description: "Engaged participants become brand advocates, driving organic growth"
              },
              {
                title: "Data Insights",
                metric: "96% prediction accuracy",
                description: "Behavioral data helps predict and prevent performance issues before they occur"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-1">{benefit.title}</h4>
                <Badge variant="outline" className="text-green-400 border-green-600 mb-2">
                  {benefit.metric}
                </Badge>
                <p className="text-sm text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}