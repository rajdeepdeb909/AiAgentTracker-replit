import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Award,
  Users,
  CheckCircle,
  Clock,
  Gamepad2,
  Medal,
  Crown,
  Gift,
  Flame,
  TrendingUp,
  Calendar,
  FileCheck,
  Shield
} from "lucide-react";

interface ContractorProgress {
  id: number;
  firmName: string;
  progress: number;
  level: number;
  points: number;
  badges: string[];
  currentChallenge: string;
  completionTime: string;
  rank: number;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
}

export default function ContractorOnboardingGamification() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(res => res.json()),
  });

  // Mock data for contractor progress
  const contractorProgress: ContractorProgress[] = [
    {
      id: 1,
      firmName: "Elite Home Services LLC",
      progress: 85,
      level: 4,
      points: 2850,
      badges: ["Speed Demon", "Quality Champion", "Team Player"],
      currentChallenge: "Complete 10 Service Calls",
      completionTime: "5 days ahead",
      rank: 1
    },
    {
      id: 2,
      firmName: "Precision Plumbing Co",
      progress: 72,
      level: 3,
      points: 2240,
      badges: ["First Responder", "Quality Champion"],
      currentChallenge: "Achieve 4.8+ Rating",
      completionTime: "On schedule",
      rank: 2
    },
    {
      id: 3,
      firmName: "Metro Maintenance Group",
      progress: 94,
      level: 5,
      points: 3420,
      badges: ["Speed Demon", "Quality Champion", "Team Player", "Innovation Leader"],
      currentChallenge: "Mentor New Contractor",
      completionTime: "3 days ahead",
      rank: 1
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete profile setup and documentation",
      icon: "🎯",
      points: 100,
      rarity: 'common',
      unlocked: true
    },
    {
      id: 2,
      name: "Speed Demon",
      description: "Complete onboarding 50% faster than average",
      icon: "⚡",
      points: 250,
      rarity: 'rare',
      unlocked: true
    },
    {
      id: 3,
      name: "Quality Champion",
      description: "Maintain 4.8+ rating throughout onboarding",
      icon: "🏆",
      points: 300,
      rarity: 'epic',
      unlocked: true
    },
    {
      id: 4,
      name: "Team Player",
      description: "Complete collaborative training modules",
      icon: "🤝",
      points: 200,
      rarity: 'rare',
      unlocked: false
    },
    {
      id: 5,
      name: "Innovation Leader",
      description: "Suggest 3+ process improvements",
      icon: "💡",
      points: 500,
      rarity: 'legendary',
      unlocked: false
    }
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400 border-yellow-600';
      case 'epic': return 'text-purple-400 border-purple-600';
      case 'rare': return 'text-blue-400 border-blue-600';
      case 'common': return 'text-green-400 border-green-600';
      default: return 'text-gray-400 border-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Gamepad2 className="h-8 w-8 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold text-white">Contractor Onboarding Gamification</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Making contractor integration engaging, competitive, and rewarding through 
          gamified onboarding experiences with achievements, leaderboards, and incentives.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Participants</p>
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-green-400 text-xs">100% participation rate</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Completion Time</p>
                <p className="text-2xl font-bold text-white">12 days</p>
                <p className="text-green-400 text-xs">↓ 43% vs traditional</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Engagement Score</p>
                <p className="text-2xl font-bold text-white">94%</p>
                <p className="text-green-400 text-xs">Highly engaged</p>
              </div>
              <Flame className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Achievement Rate</p>
                <p className="text-2xl font-bold text-white">87%</p>
                <p className="text-green-400 text-xs">Badge completion</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger
            value="overview"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Trophy className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Crown className="h-4 w-4" />
            <span>Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Medal className="h-4 w-4" />
            <span>Achievements</span>
          </TabsTrigger>
          <TabsTrigger
            value="challenges"
            className="flex items-center space-x-2 data-[state=active]:bg-purple-600"
          >
            <Target className="h-4 w-4" />
            <span>Challenges</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Gamification Framework */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Gamepad2 className="h-5 w-5 mr-2 text-purple-400" />
                Gamified Onboarding Framework: Engage → Compete → Achieve → Reward
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">1. ENGAGE: Interactive Learning</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Interactive training modules</li>
                    <li>• Progress tracking with XP points</li>
                    <li>• Real-time feedback systems</li>
                    <li>• Visual progress indicators</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">2. COMPETE: Friendly Competition</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Real-time leaderboards</li>
                    <li>• Speed completion challenges</li>
                    <li>• Quality score competitions</li>
                    <li>• Team collaboration events</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">3. ACHIEVE: Milestone Recognition</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Tiered achievement system</li>
                    <li>• Rare badge collections</li>
                    <li>• Level progression unlocks</li>
                    <li>• Special recognition ceremonies</li>
                  </ul>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-sm font-semibold text-orange-300 mb-2">4. REWARD: Tangible Benefits</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Bonus payment tiers</li>
                    <li>• Priority job assignments</li>
                    <li>• Equipment upgrade credits</li>
                    <li>• Partner recognition program</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Progress Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                  Engagement Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Daily Active Participants</span>
                      <span className="text-green-400 font-bold">21/23</span>
                    </div>
                    <Progress value={91} className="mb-2" />
                    <div className="text-xs text-gray-400">91% daily engagement rate</div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Avg Session Duration</span>
                      <span className="text-blue-400 font-bold">34 min</span>
                    </div>
                    <Progress value={85} className="mb-2" />
                    <div className="text-xs text-gray-400">↑ 67% vs non-gamified</div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Module Completion Rate</span>
                      <span className="text-purple-400 font-bold">94%</span>
                    </div>
                    <Progress value={94} className="mb-2" />
                    <div className="text-xs text-gray-400">Excellent retention</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-yellow-400" />
                  Reward System Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "Onboarding Speed", improvement: "+43%", reward: "Speed bonus: $500" },
                    { metric: "Quality Scores", improvement: "+28%", reward: "Quality bonus: $300" },
                    { metric: "Engagement Level", improvement: "+67%", reward: "Engagement bonus: $200" },
                    { metric: "Retention Rate", improvement: "+34%", reward: "Loyalty bonus: $400" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-300">{item.metric}</span>
                        <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                          {item.improvement}
                        </Badge>
                      </div>
                      <div className="text-xs text-yellow-400">{item.reward}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Crown className="h-5 w-5 mr-2 text-yellow-400" />
                Contractor Onboarding Leaderboard
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time rankings based on completion speed, quality scores, and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractorProgress
                  .sort((a, b) => b.points - a.points)
                  .map((contractor, index) => (
                  <div key={contractor.id} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-amber-600' :
                          'bg-gray-600'
                        }`}>
                          {index < 3 ? (
                            <Crown className={`h-5 w-5 ${
                              index === 0 ? 'text-white' : 'text-gray-800'
                            }`} />
                          ) : (
                            <span className="text-white font-bold">{index + 1}</span>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="text-white font-medium">{contractor.firmName}</h4>
                          <div className="flex items-center space-x-2 text-sm">
                            <Badge variant="outline" className="text-blue-400 border-blue-600">
                              Level {contractor.level}
                            </Badge>
                            <span className="text-gray-400">{contractor.points} points</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-green-400">{contractor.progress}%</div>
                        <div className="text-xs text-gray-400">{contractor.completionTime}</div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-300">Current Challenge:</span>
                        <span className="text-sm text-blue-400">{contractor.currentChallenge}</span>
                      </div>
                      <Progress value={contractor.progress} className="mb-2" />
                      
                      <div className="flex flex-wrap gap-1">
                        {contractor.badges.map((badge, badgeIndex) => (
                          <Badge key={badgeIndex} variant="outline" className="text-xs text-purple-400 border-purple-600">
                            <Star className="h-3 w-3 mr-1" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Medal className="h-5 w-5 mr-2 text-purple-400" />
                Achievement System & Badge Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`bg-gray-900 p-4 rounded-lg border-2 ${
                      achievement.unlocked ? 'border-green-600' : 'border-gray-600'
                    } ${achievement.unlocked ? 'opacity-100' : 'opacity-60'}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={achievement.unlocked ? 'text-green-400 border-green-600' : 'text-gray-400 border-gray-600'}>
                          {achievement.points} pts
                        </Badge>
                        <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                    
                    <h4 className={`font-medium mb-2 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${achievement.unlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                    
                    {achievement.unlocked && (
                      <div className="mt-3 flex items-center text-green-400 text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Unlocked
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Achievement Stats */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-400">87%</div>
                  <div className="text-sm text-gray-400">Achievement Rate</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-400">23</div>
                  <div className="text-sm text-gray-400">Total Badges Available</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">2,847</div>
                  <div className="text-sm text-gray-400">Avg Points Earned</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">4.2</div>
                  <div className="text-sm text-gray-400">Avg Level Reached</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-400" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Speed Challenge",
                      description: "Complete onboarding in under 10 days",
                      reward: "$1,000 bonus",
                      participants: 8,
                      deadline: "3 days left",
                      difficulty: "Hard"
                    },
                    {
                      name: "Quality Master",
                      description: "Maintain 4.9+ rating throughout process",
                      reward: "$750 bonus + Priority status",
                      participants: 12,
                      deadline: "1 week left",
                      difficulty: "Medium"
                    },
                    {
                      name: "Team Builder",
                      description: "Help 3 other contractors complete modules",
                      reward: "$500 bonus + Mentor badge",
                      participants: 5,
                      deadline: "2 weeks left",
                      difficulty: "Medium"
                    }
                  ].map((challenge, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{challenge.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            challenge.difficulty === 'Hard' ? 'text-red-400 border-red-600' :
                            challenge.difficulty === 'Medium' ? 'text-yellow-400 border-yellow-600' :
                            'text-green-400 border-green-600'
                          }`}
                        >
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{challenge.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-400">{challenge.reward}</span>
                        <span className="text-gray-400">{challenge.participants} participating</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-blue-400 text-xs">{challenge.deadline}</span>
                        <Button size="sm" variant="outline" className="text-xs">
                          Join Challenge
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      event: "Monthly Recognition Ceremony",
                      date: "January 31, 2025",
                      description: "Celebrate top performers and award special badges",
                      type: "Recognition"
                    },
                    {
                      event: "Speed Onboarding Tournament",
                      date: "February 5-7, 2025",
                      description: "3-day intensive challenge with $5K grand prize",
                      type: "Competition"
                    },
                    {
                      event: "Innovation Showcase",
                      date: "February 15, 2025",
                      description: "Present process improvements for bonus rewards",
                      type: "Innovation"
                    },
                    {
                      event: "Mentorship Program Launch",
                      date: "February 20, 2025",
                      description: "Senior contractors mentor newcomers for extra points",
                      type: "Program"
                    }
                  ].map((event, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{event.event}</h4>
                        <Badge variant="outline" className="text-blue-400 border-blue-600 text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{event.description}</p>
                      <div className="text-xs text-purple-400">{event.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
        >
          ← Back to Contractor Management
        </Button>
      </div>
    </div>
  );
}