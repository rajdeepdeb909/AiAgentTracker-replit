import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Award, 
  Wrench, 
  Star,
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  Zap,
  Building2,
  DollarSign,
  ArrowRight,
  PhoneCall,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function CustomerJourneyFlow() {
  const [selectedTechnician, setSelectedTechnician] = useState<string | null>(null);

  // Technician Lifecycle Data
  const technicianMetrics = {
    totalTechnicians: 1847,
    newHires: 147,
    retentionRate: 91.3,
    avgEarnings: 67420,
    topPerformers: 342,
    coachingActive: 1456
  };

  // Customer Journey Stages
  const journeyStages = [
    {
      stage: "Service Request",
      avgTime: "2.3 min",
      satisfaction: 94.2,
      channel: "App/Web/Phone",
      agentInvolved: "Customer Communication Hub",
      improvements: [
        "AI pre-diagnosis reduces call time by 35%",
        "Smart scheduling prevents conflicts",
        "Real-time pricing transparency"
      ]
    },
    {
      stage: "Dispatch & Routing",
      avgTime: "18 min",
      satisfaction: 89.7,
      channel: "Mobile App",
      agentInvolved: "Route Optimization Engine",
      improvements: [
        "Dynamic routing saves 35% travel time",
        "Parts prediction 85% accurate", 
        "Weather/traffic integration"
      ]
    },
    {
      stage: "Arrival & Diagnosis",
      avgTime: "24 min", 
      satisfaction: 87.4,
      channel: "On-site",
      agentInvolved: "Technician Interaction Hub",
      improvements: [
        "AR-assisted diagnostics",
        "Asset history via QR codes",
        "Real-time expert consultation"
      ]
    },
    {
      stage: "Parts & Repair",
      avgTime: "67 min",
      satisfaction: 91.8,
      channel: "Direct-ship Model",
      agentInvolved: "Parts Prediction Engine",
      improvements: [
        "85% parts ship direct to customer",
        "Same-day for critical repairs",
        "15% truck inventory for immediacy"
      ]
    },
    {
      stage: "Quality & Payment",
      avgTime: "8 min",
      satisfaction: 96.1,
      channel: "Mobile App",
      agentInvolved: "Quality Assurance Inspector",
      improvements: [
        "Automated quality checks",
        "Instant digital payment",
        "Customer feedback integration"
      ]
    },
    {
      stage: "Follow-up & Retention",
      avgTime: "3 days",
      satisfaction: 88.9,
      channel: "SMS/Email/App",
      agentInvolved: "Customer Communication Hub",
      improvements: [
        "Predictive maintenance alerts",
        "Warranty tracking automation",
        "Proactive service recommendations"
      ]
    }
  ];

  // Technician Performance Profiles
  const technicianProfiles = [
    {
      id: "TECH-001",
      name: "Marcus Rodriguez",
      area: "North Dallas",
      onboardingType: "Experienced Hire",
      weeklyEarnings: 1847,
      firstTimeFixRate: 94.2,
      customerSatisfaction: 4.8,
      techPowerScore: 847,
      rank: 7,
      streak: 23,
      badges: ["HVAC Expert", "Customer Champion", "Efficiency Master"],
      appUsage: 97.3,
      coachingAcceptance: 89.4,
      status: "active"
    },
    {
      id: "TECH-002", 
      name: "Sarah Chen",
      area: "Austin Central",
      onboardingType: "New Graduate",
      weeklyEarnings: 1423,
      firstTimeFixRate: 87.6,
      customerSatisfaction: 4.6,
      techPowerScore: 623,
      rank: 45,
      streak: 12,
      badges: ["Rising Star", "Tech Savvy", "Team Player"],
      appUsage: 94.7,
      coachingAcceptance: 96.2,
      status: "active"
    },
    {
      id: "TECH-003",
      name: "James Wilson",
      area: "Houston West", 
      onboardingType: "Career Change",
      weeklyEarnings: 1289,
      firstTimeFixRate: 82.1,
      customerSatisfaction: 4.4,
      techPowerScore: 456,
      rank: 127,
      streak: 8,
      badges: ["Learning Path", "Safety First"],
      appUsage: 91.2,
      coachingAcceptance: 94.8,
      status: "coaching"
    }
  ];

  // Customer Experience Metrics
  const experienceMetrics = {
    avgResponseTime: 18.4, // minutes
    avgCycleTime: 126.7, // minutes  
    avgSatisfactionScore: 4.7,
    npsScore: 78,
    firstTimeFixRate: 89.2,
    cancelRate: 2.8,
    escalationRate: 1.4,
    averageJobValue: 347
  };

  // Cancellation Dynamics
  const cancellationData = [
    {
      stage: "Pre-arrival",
      cancelRate: 1.2,
      primaryReasons: ["Schedule conflict", "Price concern"],
      prevention: "Smart scheduling + transparent pricing"
    },
    {
      stage: "Diagnosis phase",
      cancelRate: 0.8,
      primaryReasons: ["Sticker shock", "Scope creep"],
      prevention: "Upfront estimates + approval process"
    },
    {
      stage: "Parts waiting",
      cancelRate: 0.6,
      primaryReasons: ["Wait time too long", "Found alternative"],
      prevention: "Real-time updates + expedited options"
    },
    {
      stage: "During repair",
      cancelRate: 0.2,
      primaryReasons: ["Quality concerns", "Time overrun"],
      prevention: "Progress updates + quality guarantees"
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400" />
            Technician Lifecycle & Customer Journey
          </h1>
          <p className="text-gray-400 mt-1">
            End-to-End Experience Optimization • Real-Time Performance Tracking
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-green-400 border-green-400">
            {technicianMetrics.totalTechnicians} Active Technicians
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            {experienceMetrics.avgSatisfactionScore}/5.0 Satisfaction
          </Badge>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            {experienceMetrics.firstTimeFixRate}% First-Time Fix
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="journey" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="journey" className="text-white">Customer Journey</TabsTrigger>
          <TabsTrigger value="technicians" className="text-white">Technician Profiles</TabsTrigger>
          <TabsTrigger value="lifecycle" className="text-white">Lifecycle Tracking</TabsTrigger>
          <TabsTrigger value="cancellation" className="text-white">Cancellation Dynamics</TabsTrigger>
        </TabsList>

        {/* Customer Journey Tab */}
        <TabsContent value="journey" className="space-y-6">
          {/* Journey Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-400">{experienceMetrics.avgResponseTime}min</div>
                <div className="text-sm text-gray-400">Avg Response Time</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-400">{experienceMetrics.avgCycleTime}min</div>
                <div className="text-sm text-gray-400">Avg Cycle Time</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-400">{experienceMetrics.npsScore}</div>
                <div className="text-sm text-gray-400">Net Promoter Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-400">${experienceMetrics.averageJobValue}</div>
                <div className="text-sm text-gray-400">Avg Job Value</div>
              </CardContent>
            </Card>
          </div>

          {/* Journey Stages */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-blue-400" />
                Customer Journey Flow
              </CardTitle>
              <CardDescription className="text-gray-400">
                End-to-end customer experience with AI-powered optimizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {journeyStages.map((stage, idx) => (
                  <div key={idx} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-900/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-400 font-bold text-sm">{idx + 1}</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{stage.stage}</h4>
                          <p className="text-gray-400 text-sm">{stage.channel} • {stage.agentInvolved}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{stage.avgTime}</div>
                        <div className="text-green-400 text-sm">{stage.satisfaction}% satisfaction</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 text-sm">
                      {stage.improvements.map((improvement, improvementIdx) => (
                        <div key={improvementIdx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technicians Tab */}
        <TabsContent value="technicians" className="space-y-6">
          {/* Technician Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-400">{technicianMetrics.totalTechnicians}</div>
                <div className="text-sm text-gray-400">Total Technicians</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-400">{technicianMetrics.retentionRate}%</div>
                <div className="text-sm text-gray-400">Retention Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-400">${technicianMetrics.avgEarnings.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Avg Annual Earnings</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-400">{technicianMetrics.topPerformers}</div>
                <div className="text-sm text-gray-400">Top Performers</div>
              </CardContent>
            </Card>
          </div>

          {/* Technician Profiles */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {technicianProfiles.map((tech) => (
              <Card key={tech.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div>
                      <div className="text-lg">{tech.name}</div>
                      <div className="text-sm text-gray-400 font-normal">{tech.area}</div>
                    </div>
                    <Badge 
                      variant="outline"
                      className={
                        tech.status === 'active' ? 'text-green-400 border-green-400' :
                        'text-orange-400 border-orange-400'
                      }
                    >
                      {tech.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {tech.onboardingType} • Rank #{tech.rank} • {tech.streak} day streak
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-400">Weekly Earnings</div>
                      <div className="text-white font-bold">${tech.weeklyEarnings}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">First-Time Fix</div>
                      <div className="text-white font-bold">{tech.firstTimeFixRate}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Customer Rating</div>
                      <div className="text-white font-bold">{tech.customerSatisfaction}/5.0</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Power Score</div>
                      <div className="text-white font-bold">{tech.techPowerScore}</div>
                    </div>
                  </div>

                  {/* Skill Badges */}
                  <div>
                    <div className="text-gray-400 text-sm mb-2">Skill Badges</div>
                    <div className="flex flex-wrap gap-1">
                      {tech.badges.map((badge, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* AI Engagement */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400 text-sm">App Usage</span>
                        <span className="text-white text-sm">{tech.appUsage}%</span>
                      </div>
                      <Progress value={tech.appUsage} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400 text-sm">AI Coaching Acceptance</span>
                        <span className="text-white text-sm">{tech.coachingAcceptance}%</span>
                      </div>
                      <Progress value={tech.coachingAcceptance} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Lifecycle Tracking Tab */}
        <TabsContent value="lifecycle" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Order Lifecycle */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-blue-400" />
                  Service Order Lifecycle
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Complete tracking from request to completion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white">Initial Request</span>
                    </div>
                    <span className="text-green-400">100%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-white">Technician Assigned</span>
                    </div>
                    <span className="text-green-400">97.3%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-blue-400" />
                      <span className="text-white">Diagnosis Complete</span>
                    </div>
                    <span className="text-blue-400">89.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-orange-400" />
                      <span className="text-white">Parts Delivered</span>
                    </div>
                    <span className="text-orange-400">85.7%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-purple-400" />
                      <span className="text-white">Job Completed</span>
                    </div>
                    <span className="text-purple-400">91.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technician Performance Tracking */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Performance & Compliance
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time technician performance monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Safety Compliance</span>
                      <span className="text-white">98.7%</span>
                    </div>
                    <Progress value={98.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Certification Status</span>
                      <span className="text-white">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Training Completion</span>
                      <span className="text-white">87.9%</span>
                    </div>
                    <Progress value={87.9} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Quality Scores</span>
                      <span className="text-white">91.4%</span>
                    </div>
                    <Progress value={91.4} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Parts Order Lifecycle */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-400" />
                Parts Order Integration
              </CardTitle>
              <CardDescription className="text-gray-400">
                Complete parts lifecycle from diagnosis to installation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">85%</div>
                  <div className="text-sm text-gray-300">Direct-Ship Success</div>
                  <div className="text-xs text-gray-400 mt-1">Parts ship directly to customer</div>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">24-48h</div>
                  <div className="text-sm text-gray-300">Avg Delivery Time</div>
                  <div className="text-xs text-gray-400 mt-1">Standard delivery window</div>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-2">15%</div>
                  <div className="text-sm text-gray-300">Truck Inventory</div>
                  <div className="text-xs text-gray-400 mt-1">High-turnover parts</div>
                </div>
                <div className="p-4 bg-gray-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">3.2%</div>
                  <div className="text-sm text-gray-300">Return Rate</div>
                  <div className="text-xs text-gray-400 mt-1">Wrong/defective parts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cancellation Dynamics Tab */}
        <TabsContent value="cancellation" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Cancellation Analysis & Prevention
              </CardTitle>
              <CardDescription className="text-gray-400">
                Understanding and preventing service cancellations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cancellationData.map((cancel, idx) => (
                  <div key={idx} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{cancel.stage}</h4>
                      <Badge variant="outline" className="text-red-400 border-red-400">
                        {cancel.cancelRate}% Cancel Rate
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-2">Primary Reasons</div>
                        <div className="space-y-1">
                          {cancel.primaryReasons.map((reason, reasonIdx) => (
                            <div key={reasonIdx} className="text-gray-300 text-sm">
                              • {reason}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-2">Prevention Strategy</div>
                        <div className="text-green-400 text-sm">{cancel.prevention}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Overall Cancellation Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Overall Cancel Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-400 mb-2">
                  {experienceMetrics.cancelRate}%
                </div>
                <div className="text-sm text-gray-400">
                  Industry avg: 8.2%
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Response Time Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  65%
                </div>
                <div className="text-sm text-gray-400">
                  Cancel reduction vs industry
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Escalation Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-400 mb-2">
                  {experienceMetrics.escalationRate}%
                </div>
                <div className="text-sm text-gray-400">
                  Escalations to management
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}