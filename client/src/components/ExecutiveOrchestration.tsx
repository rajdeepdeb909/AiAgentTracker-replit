import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Command, 
  Brain, 
  Target, 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Activity,
  Star,
  Clock,
  Building2,
  Shield,
  ArrowLeft,
  Wrench
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function ExecutiveOrchestration() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Executive Agent Data
  const executiveAgents = [
    {
      id: "ceo",
      name: "Strategic CEO Agent",
      type: "CXO",
      role: "Chief Executive Officer",
      status: "active",
      computeBudget: 2.5,
      lastDecision: "2025-01-24T10:30:00Z",
      kpis: {
        marketExpansion: 94.2,
        revenueGrowth: 127.3,
        operationalEfficiency: 89.7,
        technicianRetention: 91.3
      },
      okaObjectives: {
        q1: "Launch 45 new market pods",
        q2: "Achieve $50M ARR milestone", 
        q3: "Complete Series A funding",
        q4: "Enter 5 new metropolitan areas"
      },
      decisions: [
        { time: "10:30 AM", decision: "Approved 13 pod expansions in Texas markets", impact: "$2.1M ARR" },
        { time: "09:45 AM", decision: "Reallocated compute resources to high-growth pods", impact: "15% efficiency gain" },
        { time: "08:20 AM", decision: "Initiated premium service rollout", impact: "28% margin improvement" }
      ]
    },
    {
      id: "coo",
      name: "Operations Excellence Agent",
      type: "CXO", 
      role: "Chief Operating Officer",
      status: "active",
      computeBudget: 2.2,
      lastDecision: "2025-01-24T11:15:00Z",
      kpis: {
        technicianUtilization: 87.4,
        firstTimeFixRate: 89.2,
        customerSatisfaction: 92.1,
        routeOptimization: 94.8
      },
      okaObjectives: {
        q1: "Achieve 92% first-time fix rate",
        q2: "Deploy AI coaching to all technicians",
        q3: "Reduce travel time by 40%",
        q4: "Scale to 2000+ technicians"
      },
      decisions: [
        { time: "11:15 AM", decision: "Optimized routing algorithms for winter conditions", impact: "22% time savings" },
        { time: "10:50 AM", decision: "Deployed emergency response protocols", impact: "35% faster response" },
        { time: "09:30 AM", decision: "Automated parts prediction for HVAC repairs", impact: "85% accuracy" }
      ]
    },
    {
      id: "cfo",
      name: "Financial Strategy Agent",
      type: "Finance",
      role: "Chief Financial Officer", 
      status: "active",
      computeBudget: 1.8,
      lastDecision: "2025-01-24T10:45:00Z",
      kpis: {
        grossMargin: 42.8,
        netMargin: 18.4,
        cashFlow: 94.2,
        unitEconomics: 97.1
      },
      okaObjectives: {
        q1: "Optimize pricing across all markets",
        q2: "Reduce customer acquisition costs by 35%",
        q3: "Achieve 45% gross margins",
        q4: "Complete Series A fundraising"
      },
      decisions: [
        { time: "10:45 AM", decision: "Adjusted pricing in 23 high-demand markets", impact: "$1.2M ARR increase" },
        { time: "10:20 AM", decision: "Optimized parts procurement terms", impact: "3.2% margin improvement" },
        { time: "09:15 AM", decision: "Reallocated marketing spend to high-ROI channels", impact: "67% better CAC" }
      ]
    },
    {
      id: "cto",
      name: "Technology Innovation Agent",
      type: "Technology",
      role: "Chief Technology Officer",
      status: "active", 
      computeBudget: 3.1,
      lastDecision: "2025-01-24T11:00:00Z",
      kpis: {
        systemUptime: 99.97,
        aiAccuracy: 94.1,
        automationRate: 95.2,
        techDebt: 12.3
      },
      okaObjectives: {
        q1: "Deploy conversational AI to all customer touchpoints",
        q2: "Achieve 96% autonomous execution",
        q3: "Launch predictive maintenance platform",
        q4: "Scale infrastructure to 1M+ jobs/month"
      },
      decisions: [
        { time: "11:00 AM", decision: "Scaled inference capacity for peak demand", impact: "Zero latency impact" },
        { time: "10:35 AM", decision: "Deployed new ML models for parts prediction", impact: "7% accuracy gain" },
        { time: "09:40 AM", decision: "Optimized database queries for reporting", impact: "45% faster dashboards" }
      ]
    }
  ];

  // Cross-Agent Coordination
  const coordinationMetrics = {
    dailyDecisions: 847,
    crossAgentAlignments: 94.2,
    conflictResolutions: 12,
    resourceOptimization: 89.7,
    systemEfficiency: 96.1
  };

  // Strategic Initiatives
  const strategicInitiatives = [
    {
      name: "National Expansion Acceleration",
      owner: "CEO Agent",
      status: "in-progress",
      progress: 73,
      timeline: "Q1 2025",
      impact: "$15M ARR opportunity",
      keyMilestones: [
        "45 new market pods launched",
        "Technician recruitment scaled",
        "Local partnership established",
        "Operations standardized"
      ]
    },
    {
      name: "AI-First Customer Experience",
      owner: "CTO Agent", 
      status: "in-progress",
      progress: 89,
      timeline: "Q1 2025",
      impact: "30% efficiency gains",
      keyMilestones: [
        "Conversational AI deployed",
        "Predictive maintenance active",
        "Smart diagnostics live",
        "Customer self-service enabled"
      ]
    },
    {
      name: "Premium Service Tier Launch", 
      owner: "COO Agent",
      status: "planning",
      progress: 45,
      timeline: "Q2 2025", 
      impact: "12% margin improvement",
      keyMilestones: [
        "Premium pricing model finalized",
        "Elite technician certification",
        "Premium customer onboarding",
        "Service guarantee program"
      ]
    },
    {
      name: "Series A Fundraising",
      owner: "CFO Agent",
      status: "active",
      progress: 67,
      timeline: "Q1 2025",
      impact: "$25M capital raise",
      keyMilestones: [
        "Investor materials completed",
        "Due diligence preparation",
        "Management presentations",
        "Term sheet negotiation"
      ]
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
            <Command className="w-8 h-8 text-blue-400" />
            Executive Orchestration Layer
          </h1>
          <p className="text-gray-400 mt-1">
            AI-Powered Strategic Decision Making • Real-Time Business Intelligence
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-green-400 border-green-400">
            {coordinationMetrics.dailyDecisions} Daily Decisions
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            {coordinationMetrics.crossAgentAlignments}% Alignment Score
          </Badge>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            {coordinationMetrics.systemEfficiency}% System Efficiency
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
          <TabsTrigger value="agents" className="text-white">Executive Agents</TabsTrigger>
          <TabsTrigger value="activities" className="text-white">Live Activities</TabsTrigger>
          <TabsTrigger value="coordination" className="text-white">Agent Coordination</TabsTrigger>
          <TabsTrigger value="initiatives" className="text-white">Strategic Initiatives</TabsTrigger>
          <TabsTrigger value="decisions" className="text-white">Decision Intelligence</TabsTrigger>
        </TabsList>

        {/* Executive Agents Tab */}
        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {executiveAgents.map((agent) => (
              <Card 
                key={agent.id} 
                className={`bg-gray-800 border-gray-700 cursor-pointer transition-all ${
                  selectedAgent === agent.id ? 'ring-2 ring-blue-400' : ''
                }`}
                onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
              >
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-900/20 rounded-lg">
                        <Brain className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-lg">{agent.name}</div>
                        <div className="text-sm text-gray-400 font-normal">{agent.role}</div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={agent.status === 'active' ? 'text-green-400 border-green-400' : 'text-gray-400 border-gray-400'}
                    >
                      {agent.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Compute Budget: ${agent.computeBudget}M/month • Last Decision: {new Date(agent.lastDecision).toLocaleTimeString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* KPIs */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Key Performance Indicators</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(agent.kpis).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-white font-medium">{value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* OKRs Preview */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Quarterly Objectives</h4>
                    <div className="space-y-2">
                      {Object.entries(agent.okaObjectives).slice(0, 2).map(([quarter, objective]) => (
                        <div key={quarter} className="text-sm">
                          <span className="text-blue-400 font-medium">{quarter.toUpperCase()}:</span>
                          <span className="text-gray-300 ml-2">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Decisions (if selected) */}
                  {selectedAgent === agent.id && (
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-white font-medium mb-3">Recent Decisions</h4>
                      <div className="space-y-3">
                        {agent.decisions.map((decision, idx) => (
                          <div key={idx} className="p-3 bg-gray-700 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-blue-400 text-sm font-medium">{decision.time}</span>
                              <span className="text-green-400 text-sm">{decision.impact}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{decision.decision}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Live Activities Tab */}
        <TabsContent value="activities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* CEO/COO Agent Activities */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Command className="w-5 h-5 text-blue-400" />
                  CEO/COO Agent
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Executive decisions across 387 planning areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-y-auto space-y-2 pr-2">
                  <div className="text-xs text-gray-500 mb-2">Live Activity Feed</div>
                  
                  <div className="p-3 bg-blue-900/20 border border-blue-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-blue-400 font-medium">Strategic Decision</span>
                      <span className="text-gray-500 text-xs">Just now</span>
                    </div>
                    <div className="text-gray-300">Approved $2.8M investment in Dallas market pod expansion - ROI projection 187%</div>
                  </div>

                  <div className="p-3 bg-emerald-900/20 border border-emerald-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-emerald-400 font-medium">Strategic Initiative</span>
                      <span className="text-gray-500 text-xs">10 mins ago</span>
                    </div>
                    <div className="text-gray-300">Approved $15M expansion into Phoenix and Charlotte markets</div>
                  </div>

                  <div className="p-3 bg-rose-900/20 border border-rose-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-rose-400 font-medium">Executive Hiring</span>
                      <span className="text-gray-500 text-xs">12 mins ago</span>
                    </div>
                    <div className="text-gray-300">Approved VP of Technology hire - AI capabilities expansion</div>
                  </div>

                  <div className="p-3 bg-indigo-900/20 border border-indigo-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-indigo-400 font-medium">Partnership Decision</span>
                      <span className="text-gray-500 text-xs">15 mins ago</span>
                    </div>
                    <div className="text-gray-300">Approved strategic partnership with HomeDepot - $50M revenue potential</div>
                  </div>

                  <div className="p-3 bg-teal-900/20 border border-teal-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-teal-400 font-medium">Technology Investment</span>
                      <span className="text-gray-500 text-xs">18 mins ago</span>
                    </div>
                    <div className="text-gray-300">Approved $8M AI infrastructure upgrade - 40% efficiency gain expected</div>
                  </div>

                  <div className="p-3 bg-cyan-900/20 border border-cyan-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-cyan-400 font-medium">Quality Initiative</span>
                      <span className="text-gray-500 text-xs">20 mins ago</span>
                    </div>
                    <div className="text-gray-300">Launched company-wide quality program - targeting 99.5% satisfaction</div>
                  </div>

                  <div className="p-3 bg-amber-900/20 border border-amber-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-amber-400 font-medium">Acquisition Analysis</span>
                      <span className="text-gray-500 text-xs">22 mins ago</span>
                    </div>
                    <div className="text-gray-300">Evaluated 3 acquisition targets - prioritizing Southeast expansion</div>
                  </div>

                  <div className="p-3 bg-lime-900/20 border border-lime-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-lime-400 font-medium">Financial Strategy</span>
                      <span className="text-gray-500 text-xs">25 mins ago</span>
                    </div>
                    <div className="text-gray-300">Optimized capital allocation - increased R&D budget by $12M</div>
                  </div>

                  <div className="p-3 bg-violet-900/20 border border-violet-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-violet-400 font-medium">Risk Management</span>
                      <span className="text-gray-500 text-xs">28 mins ago</span>
                    </div>
                    <div className="text-gray-300">Implemented new insurance strategy - reduced liability exposure 35%</div>
                  </div>

                  <div className="p-3 bg-slate-800/20 border border-slate-600 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-slate-400 font-medium">Board Communication</span>
                      <span className="text-gray-500 text-xs">30 mins ago</span>
                    </div>
                    <div className="text-gray-300">Prepared board presentation - showcasing 45% YoY growth metrics</div>
                  </div>

                  <div className="p-3 bg-pink-900/20 border border-pink-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-pink-400 font-medium">Sustainability Initiative</span>
                      <span className="text-gray-500 text-xs">32 mins ago</span>
                    </div>
                    <div className="text-gray-300">Approved green technology initiative - carbon neutral by 2026</div>
                  </div>

                  <div className="p-3 bg-orange-900/20 border border-orange-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-orange-400 font-medium">Competitive Response</span>
                      <span className="text-gray-500 text-xs">35 mins ago</span>
                    </div>
                    <div className="text-gray-300">Analyzed competitor moves - adjusted pricing strategy in 12 markets</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CX Agent Activities */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  CX Agent
                </CardTitle>
                <CardDescription className="text-gray-400">
                  24/7 multimodal customer experience management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-y-auto space-y-2 pr-2">
                  <div className="text-xs text-gray-500 mb-2">Live Activity Feed</div>
                  
                  <div className="p-3 bg-green-900/20 border border-green-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-green-400 font-medium">Customer Resolution</span>
                      <span className="text-gray-500 text-xs">Just now</span>
                    </div>
                    <div className="text-gray-300">Resolved billing dispute for Premium customer - $2.4k value retained</div>
                  </div>

                  <div className="p-3 bg-emerald-900/20 border border-emerald-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-emerald-400 font-medium">Voice Analytics</span>
                      <span className="text-gray-500 text-xs">23 mins ago</span>
                    </div>
                    <div className="text-gray-300">Analyzed 347 voice calls - sentiment improved 23% with proactive responses</div>
                  </div>

                  <div className="p-3 bg-rose-900/20 border border-rose-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-rose-400 font-medium">Escalation Prevention</span>
                      <span className="text-gray-500 text-xs">25 mins ago</span>
                    </div>
                    <div className="text-gray-300">Prevented 12 escalations through preemptive service adjustments</div>
                  </div>

                  <div className="p-3 bg-indigo-900/20 border border-indigo-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-indigo-400 font-medium">Multi-modal Coordination</span>
                      <span className="text-gray-500 text-xs">27 mins ago</span>
                    </div>
                    <div className="text-gray-300">Coordinated across email, SMS, chat, voice - seamless experience for 567 customers</div>
                  </div>

                  <div className="p-3 bg-teal-900/20 border border-teal-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-teal-400 font-medium">Personalization Engine</span>
                      <span className="text-gray-500 text-xs">30 mins ago</span>
                    </div>
                    <div className="text-gray-300">Personalized experiences for 1,234 customers - satisfaction increased 34%</div>
                  </div>

                  <div className="p-3 bg-amber-900/20 border border-amber-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-amber-400 font-medium">Predictive Support</span>
                      <span className="text-gray-500 text-xs">32 mins ago</span>
                    </div>
                    <div className="text-gray-300">Predicted 89 customer needs before requests - proactive engagement 95%</div>
                  </div>

                  <div className="p-3 bg-lime-900/20 border border-lime-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-lime-400 font-medium">Journey Optimization</span>
                      <span className="text-gray-500 text-xs">35 mins ago</span>
                    </div>
                    <div className="text-gray-300">Optimized customer journeys for 456 touchpoints - friction reduced 67%</div>
                  </div>

                  <div className="p-3 bg-violet-900/20 border border-violet-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-violet-400 font-medium">Loyalty Program</span>
                      <span className="text-gray-500 text-xs">37 mins ago</span>
                    </div>
                    <div className="text-gray-300">Activated loyalty rewards for 234 premium customers - retention up 45%</div>
                  </div>

                  <div className="p-3 bg-slate-800/20 border border-slate-600 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-slate-400 font-medium">Feedback Analysis</span>
                      <span className="text-gray-500 text-xs">40 mins ago</span>
                    </div>
                    <div className="text-gray-300">Analyzed 789 feedback responses - identified 5 improvement opportunities</div>
                  </div>

                  <div className="p-3 bg-pink-900/20 border border-pink-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-pink-400 font-medium">Emergency Communication</span>
                      <span className="text-gray-500 text-xs">42 mins ago</span>
                    </div>
                    <div className="text-gray-300">Managed emergency communications for 67 customers - anxiety reduced, trust maintained</div>
                  </div>

                  <div className="p-3 bg-sky-900/20 border border-sky-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sky-400 font-medium">Service Recovery</span>
                      <span className="text-gray-500 text-xs">45 mins ago</span>
                    </div>
                    <div className="text-gray-300">Executed service recovery for 8 dissatisfied customers - NPS improved to 4.9</div>
                  </div>

                  <div className="p-3 bg-green-900/20 border border-green-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-green-400 font-medium">Sentiment Monitoring</span>
                      <span className="text-gray-500 text-xs">50 mins ago</span>
                    </div>
                    <div className="text-gray-300">Real-time sentiment monitoring across 2,847 interactions - 94.2% positive</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parts Supply Chain Agent Activities */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-orange-400" />
                  Parts Supply Chain Agent
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Central procurement brain with 85% delivery efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 overflow-y-auto space-y-2 pr-2">
                  <div className="text-xs text-gray-500 mb-2">Live Activity Feed</div>
                  
                  <div className="p-3 bg-orange-900/20 border border-orange-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-orange-400 font-medium">Procurement Decision</span>
                      <span className="text-gray-500 text-xs">Just now</span>
                    </div>
                    <div className="text-gray-300">Negotiated 18% discount on HVAC parts - $47k monthly savings secured</div>
                  </div>

                  <div className="p-3 bg-purple-900/20 border border-purple-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-purple-400 font-medium">Emergency Stock</span>
                      <span className="text-gray-500 text-xs">25 mins ago</span>
                    </div>
                    <div className="text-gray-300">Activated emergency stock protocols for winter storm - 100% parts availability maintained</div>
                  </div>

                  <div className="p-3 bg-indigo-900/20 border border-indigo-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-indigo-400 font-medium">Quality Control</span>
                      <span className="text-gray-500 text-xs">28 mins ago</span>
                    </div>
                    <div className="text-gray-300">Quality-checked 456 parts shipments - 99.8% passed inspection standards</div>
                  </div>

                  <div className="p-3 bg-teal-900/20 border border-teal-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-teal-400 font-medium">Vendor Performance</span>
                      <span className="text-gray-500 text-xs">30 mins ago</span>
                    </div>
                    <div className="text-gray-300">Evaluated 47 vendor performances - terminated 2 underperforming suppliers</div>
                  </div>

                  <div className="p-3 bg-amber-900/20 border border-amber-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-amber-400 font-medium">Cost Analytics</span>
                      <span className="text-gray-500 text-xs">32 mins ago</span>
                    </div>
                    <div className="text-gray-300">Analyzed parts costs across 430 markets - identified $156k savings opportunity</div>
                  </div>

                  <div className="p-3 bg-lime-900/20 border border-lime-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-lime-400 font-medium">Seasonal Planning</span>
                      <span className="text-gray-500 text-xs">35 mins ago</span>
                    </div>
                    <div className="text-gray-300">Completed winter inventory planning - 15% increase in heating parts stock</div>
                  </div>

                  <div className="p-3 bg-violet-900/20 border border-violet-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-violet-400 font-medium">Logistics Optimization</span>
                      <span className="text-gray-500 text-xs">37 mins ago</span>
                    </div>
                    <div className="text-gray-300">Optimized delivery routes - reduced transportation costs by $34k monthly</div>
                  </div>

                  <div className="p-3 bg-slate-800/20 border border-slate-600 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-slate-400 font-medium">Contract Negotiation</span>
                      <span className="text-gray-500 text-xs">40 mins ago</span>
                    </div>
                    <div className="text-gray-300">Negotiated new contract terms - secured 22% volume discount on electrical parts</div>
                  </div>

                  <div className="p-3 bg-pink-900/20 border border-pink-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-pink-400 font-medium">Demand Forecasting</span>
                      <span className="text-gray-500 text-xs">42 mins ago</span>
                    </div>
                    <div className="text-gray-300">Updated demand forecasts based on weather patterns - accuracy improved to 96.4%</div>
                  </div>

                  <div className="p-3 bg-sky-900/20 border border-sky-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sky-400 font-medium">Cross-dock Operations</span>
                      <span className="text-gray-500 text-xs">45 mins ago</span>
                    </div>
                    <div className="text-gray-300">Coordinated cross-dock operations for 1,234 parts - zero delays recorded</div>
                  </div>

                  <div className="p-3 bg-emerald-900/20 border border-emerald-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-emerald-400 font-medium">Return Processing</span>
                      <span className="text-gray-500 text-xs">47 mins ago</span>
                    </div>
                    <div className="text-gray-300">Processed 89 parts returns - 94% restocked, $12k value recovered</div>
                  </div>

                  <div className="p-3 bg-rose-900/20 border border-rose-700 rounded text-sm">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-rose-400 font-medium">Compliance Monitoring</span>
                      <span className="text-gray-500 text-xs">50 mins ago</span>
                    </div>
                    <div className="text-gray-300">Monitored regulatory compliance for 2,847 parts - 100% certification maintained</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Executive Performance Summary */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Executive Performance Summary
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time executive decision metrics across all strategic agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">2,847</div>
                  <div className="text-sm text-gray-400">Daily Decisions</div>
                  <div className="text-xs text-green-400 mt-1">↑ 23% vs yesterday</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">$180k</div>
                  <div className="text-sm text-gray-400">Value Created Today</div>
                  <div className="text-xs text-green-400 mt-1">↑ $47k vs avg</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">1.2s</div>
                  <div className="text-sm text-gray-400">Avg Decision Time</div>
                  <div className="text-xs text-green-400 mt-1">↓ 0.3s optimization</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">94.8%</div>
                  <div className="text-sm text-gray-400">Autonomous Execution</div>
                  <div className="text-xs text-green-400 mt-1">↑ 2.1% efficiency</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agent Coordination Tab */}
        <TabsContent value="coordination" className="space-y-6">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coordination Metrics */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  Coordination Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Cross-Agent Alignment</span>
                      <span className="text-white">{coordinationMetrics.crossAgentAlignments}%</span>
                    </div>
                    <Progress value={coordinationMetrics.crossAgentAlignments} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">Resource Optimization</span>
                      <span className="text-white">{coordinationMetrics.resourceOptimization}%</span>
                    </div>
                    <Progress value={coordinationMetrics.resourceOptimization} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 text-sm">System Efficiency</span>
                      <span className="text-white">{coordinationMetrics.systemEfficiency}%</span>
                    </div>
                    <Progress value={coordinationMetrics.systemEfficiency} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Activity */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Daily Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {coordinationMetrics.dailyDecisions}
                  </div>
                  <div className="text-sm text-gray-400">Total Decisions</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conflict Resolutions</span>
                    <span className="text-white">{coordinationMetrics.conflictResolutions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Auto-Alignments</span>
                    <span className="text-white">823</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Strategic Reviews</span>
                    <span className="text-white">47</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Communication Flow */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  Communication Flow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 text-sm">CEO ↔ COO: Market Expansion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 text-sm">CFO ↔ CTO: Resource Allocation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 text-sm">ALL: Strategic Alignment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300 text-sm">COO ↔ CTO: Operations Sync</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agent Interaction Network */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-400" />
                Executive Agent Network
              </CardTitle>
              <CardDescription className="text-gray-400">
                Real-time decision coordination and strategic alignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {executiveAgents.map((agent) => (
                  <div key={agent.id} className="p-4 bg-gray-700 rounded-lg text-center">
                    <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-white font-medium text-sm mb-1">{agent.type}</div>
                    <div className="text-gray-400 text-xs">${agent.computeBudget}M budget</div>
                    <div className="mt-2">
                      <div className={`text-xs px-2 py-1 rounded ${
                        agent.status === 'active' ? 'bg-green-900/20 text-green-400' : 'bg-gray-900/20 text-gray-400'
                      }`}>
                        {agent.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategic Initiatives Tab */}
        <TabsContent value="initiatives" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {strategicInitiatives.map((initiative, idx) => (
              <Card key={idx} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-400" />
                      {initiative.name}
                    </div>
                    <Badge 
                      variant="outline"
                      className={
                        initiative.status === 'active' ? 'text-green-400 border-green-400' :
                        initiative.status === 'in-progress' ? 'text-orange-400 border-orange-400' :
                        'text-blue-400 border-blue-400'
                      }
                    >
                      {initiative.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Owner: {initiative.owner} • Timeline: {initiative.timeline} • Impact: {initiative.impact}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400 text-sm">Progress</span>
                      <span className="text-white">{initiative.progress}%</span>
                    </div>
                    <Progress value={initiative.progress} className="h-2" />
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Key Milestones</h4>
                    <div className="space-y-2">
                      {initiative.keyMilestones.map((milestone, milestoneIdx) => (
                        <div key={milestoneIdx} className="flex items-center gap-2">
                          {milestoneIdx < Math.floor(initiative.keyMilestones.length * initiative.progress / 100) ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
                          )}
                          <span className="text-gray-300 text-sm">{milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Decision Intelligence Tab */}
        <TabsContent value="decisions" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Real-Time Decision Stream
              </CardTitle>
              <CardDescription className="text-gray-400">
                Live feed of executive agent decisions with business impact analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {executiveAgents.flatMap(agent => 
                  agent.decisions.map((decision, idx) => ({
                    ...decision,
                    agentName: agent.name,
                    agentType: agent.type,
                    timestamp: `${decision.time} - ${agent.name}`
                  }))
                ).sort().map((decision, idx) => (
                  <div key={idx} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {decision.agentType}
                        </Badge>
                        <span className="text-blue-400 text-sm font-medium">
                          {decision.timestamp}
                        </span>
                      </div>
                      <span className="text-green-400 text-sm font-medium">
                        {decision.impact}
                      </span>
                    </div>
                    <p className="text-gray-300">{decision.decision}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}