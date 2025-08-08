import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Award,
  Users,
  CheckCircle,
  Clock,
  Medal,
  Crown,
  Gift,
  Flame,
  TrendingUp,
  Activity,
  Lightbulb,
  Shield,
  Brain,
  Rocket,
  Bot,
  Building2,
  UserCheck,
  Heart,
  Sparkles
} from "lucide-react";
import { Link, useLocation } from "wouter";
import GlobalChallengeModal from "@/components/GlobalChallengeModal";
import GamificationUsageGuide from "@/components/GamificationUsageGuide";

interface GamificationEngine {
  id: string;
  name: string;
  type: string;
  participantCount: number;
  engagementScore: number;
  achievements: number;
  status: string;
}

interface LiveActivity {
  id: number;
  timestamp: string;
  participantName: string;
  action: string;
  points: number;
  achievement?: string;
  category: string;
}

export default function GamificationAgent() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [, setLocation] = useLocation();

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(res => res.json()),
  });

  // Mock data for gamification engines
  const gamificationEngines: GamificationEngine[] = [
    {
      id: "contractor-onboarding",
      name: "1099 Contractor Onboarding",
      type: "Recruitment & Integration",
      participantCount: 23,
      engagementScore: 94,
      achievements: 87,
      status: "active"
    },
    {
      id: "contractor-engagement",
      name: "Active Contractor Engagement",
      type: "Performance & Retention",
      participantCount: 287,
      engagementScore: 89,
      achievements: 73,
      status: "active"
    },
    {
      id: "w2-employee-development",
      name: "W2 Employee Development",
      type: "Career Advancement",
      participantCount: 342,
      engagementScore: 91,
      achievements: 82,
      status: "active"
    },
    {
      id: "customer-loyalty",
      name: "Customer Loyalty Program",
      type: "Customer Retention",
      participantCount: 8420,
      engagementScore: 78,
      achievements: 65,
      status: "active"
    },
    {
      id: "agent-performance",
      name: "AI Agent Performance",
      type: "Agent Optimization",
      participantCount: 23,
      engagementScore: 96,
      achievements: 91,
      status: "active"
    },
    {
      id: "planning-area-competition",
      name: "Planning Area Competition",
      type: "Geographic Performance",
      participantCount: 430,
      engagementScore: 85,
      achievements: 78,
      status: "active"
    }
  ];

  // Mock live activity feed
  const liveActivities: LiveActivity[] = [
    {
      id: 1,
      timestamp: "2 min ago",
      participantName: "Elite Home Services LLC",
      action: "Completed Speed Challenge",
      points: 500,
      achievement: "Speed Demon",
      category: "contractor-onboarding"
    },
    {
      id: 2,
      timestamp: "5 min ago",
      participantName: "Mike Rodriguez (W2)",
      action: "Achieved 5-star customer rating streak",
      points: 300,
      achievement: "Quality Champion",
      category: "w2-employee-development"
    },
    {
      id: 3,
      timestamp: "8 min ago",
      participantName: "Phoenix Planning Area",
      action: "Exceeded efficiency targets",
      points: 750,
      achievement: "Regional Excellence",
      category: "planning-area-competition"
    },
    {
      id: 4,
      timestamp: "12 min ago",
      participantName: "Customer Communication Hub (Agent #2)",
      action: "Processed 100 interactions with 98% satisfaction",
      points: 400,
      achievement: "AI Excellence",
      category: "agent-performance"
    },
    {
      id: 5,
      timestamp: "15 min ago",
      participantName: "Metro Maintenance Group",
      action: "Completed monthly training modules",
      points: 250,
      category: "contractor-engagement"
    },
    {
      id: 6,
      timestamp: "18 min ago",
      participantName: "Sarah Chen (Customer)",
      action: "Referred 3 new customers",
      points: 600,
      achievement: "Super Advocate",
      category: "customer-loyalty"
    }
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "contractor-onboarding": return <UserCheck className="h-4 w-4 text-blue-400" />;
      case "contractor-engagement": return <Building2 className="h-4 w-4 text-green-400" />;
      case "w2-employee-development": return <Users className="h-4 w-4 text-purple-400" />;
      case "customer-loyalty": return <Heart className="h-4 w-4 text-red-400" />;
      case "agent-performance": return <Bot className="h-4 w-4 text-yellow-400" />;
      case "planning-area-competition": return <Target className="h-4 w-4 text-orange-400" />;
      default: return <Star className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Brain className="h-8 w-8 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold text-white">Gamification Intelligence Agent</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Comprehensive engagement orchestration across all platform participants - contractors, employees, 
          customers, AI agents, and planning areas through adaptive gamification systems.
        </p>
      </div>

      {/* Agent Status */}
      <Card className="bg-gradient-to-r from-purple-900 to-indigo-900 border-purple-500 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bot className="h-6 w-6 mr-3 text-purple-400" />
            Agent #24: Gamification Intelligence Agent - ACTIVE
          </CardTitle>
          <CardDescription className="text-purple-200">
            Advanced behavioral psychology AI managing engagement across 6 distinct gamification engines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-purple-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-300">9,525</div>
              <div className="text-sm text-purple-200">Total Participants</div>
            </div>
            <div className="bg-indigo-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-indigo-300">89%</div>
              <div className="text-sm text-indigo-200">Avg Engagement Score</div>
            </div>
            <div className="bg-blue-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-300">79%</div>
              <div className="text-sm text-blue-200">Achievement Rate</div>
            </div>
            <div className="bg-green-800/30 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-300">$2.3M</div>
              <div className="text-sm text-green-200">Incentive Pool</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
          <TabsTrigger
            value="overview"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Activity className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="engines"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Rocket className="h-4 w-4" />
            <span>Engines</span>
          </TabsTrigger>
          <TabsTrigger
            value="live-feed"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Flame className="h-4 w-4" />
            <span>Live Feed</span>
          </TabsTrigger>
          <TabsTrigger
            value="intelligence"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Lightbulb className="h-4 w-4" />
            <span>Intelligence</span>
          </TabsTrigger>
          <TabsTrigger
            value="guide"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Shield className="h-4 w-4" />
            <span>How to Use</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Agent Core Functions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-400" />
                Gamification Intelligence Core Functions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">ANALYZE: Behavioral Intelligence</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Real-time engagement pattern recognition</li>
                    <li>• Predictive motivation modeling</li>
                    <li>• Cross-platform behavior correlation</li>
                    <li>• Performance psychology analysis</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">OPTIMIZE: Dynamic Adjustment</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Personalized challenge calibration</li>
                    <li>• Reward system optimization</li>
                    <li>• Achievement difficulty balancing</li>
                    <li>• Engagement loop refinement</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">ORCHESTRATE: Multi-Engine Management</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Cross-engine competition coordination</li>
                    <li>• Unified achievement systems</li>
                    <li>• Incentive pool distribution</li>
                    <li>• Platform-wide leaderboards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Dashboard Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                  Real-Time Engagement Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "1099 Contractor Engagement", score: 94, trend: "+12%" },
                    { metric: "W2 Employee Participation", score: 91, trend: "+8%" },
                    { metric: "Customer Loyalty Activity", score: 78, trend: "+15%" },
                    { metric: "AI Agent Performance", score: 96, trend: "+5%" },
                    { metric: "Planning Area Competition", score: 85, trend: "+18%" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">{item.metric}</span>
                        <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                          {item.trend}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={item.score} className="flex-1" />
                        <span className="text-sm font-medium text-white">{item.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
                  AI-Driven Optimization Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      category: "Contractor Onboarding", 
                      improvement: "43% faster completion",
                      mechanism: "Adaptive challenge difficulty"
                    },
                    { 
                      category: "Employee Retention", 
                      improvement: "34% higher satisfaction",
                      mechanism: "Personalized career paths"
                    },
                    { 
                      category: "Customer Engagement", 
                      improvement: "67% more referrals",
                      mechanism: "Social recognition system"
                    },
                    { 
                      category: "Agent Performance", 
                      improvement: "28% efficiency gain",
                      mechanism: "Competition-based learning"
                    }
                  ].map((result, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-white">{result.category}</h4>
                        <Badge variant="outline" className="text-blue-400 border-blue-600 text-xs">
                          {result.improvement}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400">{result.mechanism}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engines Tab */}
        <TabsContent value="engines" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Rocket className="h-5 w-5 mr-2 text-blue-400" />
                Active Gamification Engines
              </CardTitle>
              <CardDescription className="text-gray-400">
                6 specialized engagement systems managing different participant categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {gamificationEngines.map((engine) => (
                  <div key={engine.id} className="bg-gray-900 p-4 rounded-lg border border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{engine.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          engine.status === 'active' ? 'text-green-400 border-green-600' :
                          'text-yellow-400 border-yellow-600'
                        }`}
                      >
                        {engine.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-blue-400">{engine.type}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Participants:</span>
                        <span className="text-white font-medium">{engine.participantCount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Engagement Score</span>
                        <span className="text-green-400">{engine.engagementScore}%</span>
                      </div>
                      <Progress value={engine.engagementScore} className="mb-2" />
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Achievement Rate</span>
                        <span className="text-blue-400">{engine.achievements}%</span>
                      </div>
                      <Progress value={engine.achievements} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Feed Tab */}
        <TabsContent value="live-feed" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Flame className="h-5 w-5 mr-2 text-orange-400" />
                Live Gamification Activity Feed
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time participant achievements and engagement across all systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {liveActivities.map((activity) => (
                  <div key={activity.id} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getCategoryIcon(activity.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-white font-medium">{activity.participantName}</span>
                            <span className="text-xs text-gray-400">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{activity.action}</p>
                          
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-yellow-400 border-yellow-600 text-xs">
                              +{activity.points} points
                            </Badge>
                            {activity.achievement && (
                              <Badge variant="outline" className="text-purple-400 border-purple-600 text-xs">
                                <Trophy className="h-3 w-3 mr-1" />
                                {activity.achievement}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Intelligence Tab */}
        <TabsContent value="intelligence" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                  AI Behavioral Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      insight: "Competition drives 73% higher engagement",
                      confidence: 94,
                      recommendation: "Increase cross-engine leaderboards"
                    },
                    {
                      insight: "Social recognition outperforms monetary rewards",
                      confidence: 87,
                      recommendation: "Expand peer nomination systems"
                    },
                    {
                      insight: "Morning challenges show 45% better completion",
                      confidence: 91,
                      recommendation: "Schedule key activities before 10 AM"
                    },
                    {
                      insight: "Team-based achievements boost retention by 38%",
                      confidence: 89,
                      recommendation: "Create more collaborative challenges"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-white flex-1">{item.insight}</h4>
                        <Badge variant="outline" className="text-green-400 border-green-600 text-xs ml-2">
                          {item.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="text-xs text-blue-400">→ {item.recommendation}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-400" />
                  Performance Optimization Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Recalibrate contractor challenge difficulty",
                      priority: "High",
                      impact: "Expected +15% engagement",
                      eta: "2 hours"
                    },
                    {
                      action: "Deploy seasonal achievement themes",
                      priority: "Medium",
                      impact: "Expected +8% participation",
                      eta: "4 hours"
                    },
                    {
                      action: "Optimize reward distribution timing",
                      priority: "Medium",
                      impact: "Expected +12% satisfaction",
                      eta: "6 hours"
                    },
                    {
                      action: "Launch cross-platform mega-challenge",
                      priority: "Low",
                      impact: "Expected +25% engagement",
                      eta: "1 week"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-white">{item.action}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            item.priority === 'High' ? 'text-red-400 border-red-600' :
                            item.priority === 'Medium' ? 'text-yellow-400 border-yellow-600' :
                            'text-green-400 border-green-600'
                          }`}
                        >
                          {item.priority}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">{item.impact}</div>
                      <div className="text-xs text-blue-400">ETA: {item.eta}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Usage Guide Tab */}
        <TabsContent value="guide" className="space-y-6">
          <GamificationUsageGuide />
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setLocation('/dashboard')}
          className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Button>
        
        <div className="space-x-4">
          <Link href="/contractor-onboarding-gamification">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Trophy className="h-4 w-4 mr-2" />
              View Contractor Dashboard
            </Button>
          </Link>
          <GlobalChallengeModal>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Rocket className="h-4 w-4 mr-2" />
              Run Global Challenge
            </Button>
          </GlobalChallengeModal>
        </div>
      </div>
    </div>
  );
}