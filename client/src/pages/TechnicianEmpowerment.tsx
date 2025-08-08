import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Award,
  UserPlus,
  GraduationCap,
  Star,
  ArrowUp,
  Shield,
  Target,
  Building,
  Trophy,
  User
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Agent {
  id: number;
  name: string;
  description: string;
  type: string;
  model: string;
  status: string;
  performance: string;
  accuracy: string;
  responseTime: string;
  dailyInteractions: number;
  monthlyCost: string;
  revenueImpact: string;
  dailyTasks?: Array<{
    task: string;
    frequency: string;
    time: string;
  }>;
  evaluationCriteria?: {
    primary: Array<{
      metric: string;
      target: string;
      weight: number;
    }>;
    secondary: Array<{
      metric: string;
      target: string;
      weight: number;
    }>;
  };
}

export default function TechnicianEmpowerment() {
  const [selectedTab, setSelectedTab] = useState("recruitment");
  const [showW2RecruitmentKit, setShowW2RecruitmentKit] = useState(false);
  const [showW2CaseStudies, setShowW2CaseStudies] = useState(false);
  const [showW2Templates, setShowW2Templates] = useState(false);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(res => res.json()),
  });

  const recruitingAgent = agents.find((agent: Agent) => 
    agent.name === "Technician Recruiting Agent"
  );

  const trainingAgent = agents.find((agent: Agent) => 
    agent.name === "Technician Training & Development Agent"
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Users className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-white">Technician Empowerment</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Empowering home service technicians at all career stages through AI-powered recruiting, 
          training, development, and advancement programs that build professional expertise and career growth.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-green-900/50 border-blue-500/30 mb-8">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Technician-First Mission</h3>
              <p className="text-gray-300 mb-4">
                Our core mission is empowering technicians at every career stage - from entry-level hiring 
                through expert specialization. We provide AI-powered tools for career advancement, skill 
                development, and professional growth that make high-quality training accessible to all 
                technicians regardless of background or experience level.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">87.3%</div>
                  <div className="text-sm text-gray-400">Success Prediction Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">94%</div>
                  <div className="text-sm text-gray-400">Knowledge Retention Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">34%</div>
                  <div className="text-sm text-gray-400">Annual Promotion Rate</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger
            value="recruitment"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <UserPlus className="h-4 w-4" />
            <span>Talent Acquisition</span>
          </TabsTrigger>
          <TabsTrigger
            value="training"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <GraduationCap className="h-4 w-4" />
            <span>Training & Development</span>
          </TabsTrigger>
          <TabsTrigger
            value="advancement"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
          >
            <ArrowUp className="h-4 w-4" />
            <span>Career Advancement</span>
          </TabsTrigger>
        </TabsList>

        {/* Talent Acquisition Tab */}
        <TabsContent value="recruitment" className="space-y-6">
          {/* Recruitment Workflow */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <UserPlus className="h-5 w-5 mr-2 text-blue-400" />
                Complete Recruitment Workflow: Idea → Action → Result → Iteration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">1. IDEA: Market Analysis</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Identify skill gaps by planning area</li>
                    <li>• Analyze technician demand patterns</li>
                    <li>• Review competitor hiring practices</li>
                    <li>• Define success predictors</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">2. ACTION: AI-Powered Sourcing</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Deploy targeted job postings</li>
                    <li>• Screen with predictive algorithms</li>
                    <li>• Conduct AI-assisted interviews</li>
                    <li>• Match skills to planning areas</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">3. RESULT: Quality Hires</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• 87.3% retention prediction accuracy</li>
                    <li>• 16-day average time to fill</li>
                    <li>• 94.2% hiring accuracy rate</li>
                    <li>• $2,180 cost per quality hire</li>
                  </ul>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-sm font-semibold text-orange-300 mb-2">4. ITERATION: Continuous Improvement</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Track 6-month retention rates</li>
                    <li>• Refine success predictors</li>
                    <li>• Adjust geographic targeting</li>
                    <li>• Optimize diversity metrics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <UserPlus className="h-5 w-5 mr-2 text-blue-400" />
                  Predictive Hiring Intelligence
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI analyzes 47 candidate variables to predict long-term success and career advancement potential
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Success Prediction</div>
                    <div className="text-lg font-semibold text-white">87.3%</div>
                    <div className="text-xs text-green-400">↑ 12% vs last quarter</div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Time to Fill</div>
                    <div className="text-lg font-semibold text-white">16 days</div>
                    <div className="text-xs text-green-400">↓ 8 days improvement</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Success Prediction Factors</h4>
                  <div className="space-y-2">
                    {[
                      { factor: "Previous certification history", weight: "25%" },
                      { factor: "Customer service ratings", weight: "20%" },
                      { factor: "Technical skill assessments", weight: "18%" },
                      { factor: "Geographic proximity to jobs", weight: "15%" },
                      { factor: "Career advancement motivation", weight: "12%" },
                      { factor: "Team collaboration scores", weight: "10%" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-900 p-2 rounded">
                        <span className="text-sm text-gray-300">{item.factor}</span>
                        <Badge variant="outline" className="text-blue-400 border-blue-600 text-xs">
                          {item.weight}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-400" />
                  Real-Time Feedback Loop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <h5 className="text-sm font-medium text-white mb-2">Weekly Iteration Cycle</h5>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Monday: Analyze previous week's hires performance</div>
                      <div>• Tuesday: Update success prediction algorithms</div>
                      <div>• Wednesday: Adjust geographic targeting strategy</div>
                      <div>• Thursday: Refine candidate screening criteria</div>
                      <div>• Friday: Generate insights for next week's sourcing</div>
                    </div>
                  </div>
                  
                  {[
                    { metric: "Hiring Accuracy", current: "94.2%", target: "95%", trend: "↑" },
                    { metric: "6-Month Retention", current: "87.3%", target: "90%", trend: "↑" },
                    { metric: "Candidate Quality", current: "89.7%", target: "92%", trend: "↑" },
                    { metric: "Diversity Index", current: "76.8%", target: "80%", trend: "↑" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-900 p-2 rounded">
                      <div>
                        <span className="text-sm text-gray-300">{item.metric}</span>
                        <div className="text-xs text-gray-500">Target: {item.target}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">{item.current}</div>
                        <div className="text-xs text-green-400">{item.trend} Improving</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Training & Development Tab */}
        <TabsContent value="training" className="space-y-6">
          {/* Training Workflow */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-400" />
                Adaptive Learning Workflow: Assessment → Personalization → Development → Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">1. ASSESS: Skills Gap Analysis</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Individual competency mapping</li>
                    <li>• Performance data analysis</li>
                    <li>• Career goal identification</li>
                    <li>• Learning style assessment</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">2. PERSONALIZE: Custom Learning</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• AI-generated learning paths</li>
                    <li>• AR-assisted modules</li>
                    <li>• Peer mentorship matching</li>
                    <li>• Real-time progress tracking</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">3. DEVELOP: Active Learning</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Hands-on practice sessions</li>
                    <li>• Cross-training opportunities</li>
                    <li>• Leadership skill building</li>
                    <li>• Certification preparation</li>
                  </ul>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-sm font-semibold text-orange-300 mb-2">4. VALIDATE: Performance Tracking</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Skills demonstration testing</li>
                    <li>• Customer feedback integration</li>
                    <li>• Career advancement metrics</li>
                    <li>• Continuous improvement loop</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-blue-400" />
                  Personalized Learning Engine
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI adapts training content based on individual learning patterns, skill gaps, and career goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Knowledge Retention</div>
                    <div className="text-lg font-semibold text-white">94%</div>
                    <div className="text-xs text-green-400">↑ 6% vs traditional</div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Learning Efficiency</div>
                    <div className="text-lg font-semibold text-white">2.3x</div>
                    <div className="text-xs text-green-400">Faster skill acquisition</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Adaptive Learning Features</h4>
                  <div className="space-y-2">
                    {[
                      { feature: "Real-time difficulty adjustment", impact: "32% faster learning" },
                      { feature: "Multi-modal content delivery", impact: "94% retention rate" },
                      { feature: "AR/VR hands-on simulations", impact: "78% skill transfer" },
                      { feature: "Peer collaboration matching", impact: "85% engagement" },
                      { feature: "Microlearning bite-sized modules", impact: "67% completion rate" },
                      { feature: "Performance-based progression", impact: "89% mastery level" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-900 p-2 rounded">
                        <span className="text-sm text-gray-300">{item.feature}</span>
                        <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                          {item.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-green-400" />
                  Learning Impact Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <h5 className="text-sm font-medium text-white mb-2">Monthly Learning Cycle</h5>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Week 1: Individual skill assessment and gap identification</div>
                      <div>• Week 2: Personalized learning path deployment</div>
                      <div>• Week 3: Active learning with AR/peer collaboration</div>
                      <div>• Week 4: Skills validation and performance tracking</div>
                    </div>
                  </div>
                  
                  {[
                    { metric: "Skill Mastery Rate", current: "89.1%", previous: "82.4%", change: "+6.7%" },
                    { metric: "Certification Success", current: "93.8%", previous: "87.2%", change: "+6.6%" },
                    { metric: "Cross-Training Adoption", current: "78.4%", previous: "65.1%", change: "+13.3%" },
                    { metric: "Performance Improvement", current: "92.6%", previous: "86.9%", change: "+5.7%" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-900 p-2 rounded">
                      <div>
                        <span className="text-sm text-gray-300">{item.metric}</span>
                        <div className="text-xs text-gray-500">Previous: {item.previous}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-white">{item.current}</div>
                        <div className="text-xs text-green-400">{item.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Career Advancement Tab */}
        <TabsContent value="advancement" className="space-y-6">
          {/* Career Advancement Workflow */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <ArrowUp className="h-5 w-5 mr-2 text-blue-400" />
                Career Advancement Pipeline: Recognition → Development → Opportunity → Leadership
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">1. RECOGNIZE: Performance Excellence</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Track customer satisfaction scores</li>
                    <li>• Monitor technical expertise growth</li>
                    <li>• Identify leadership potential</li>
                    <li>• Recognize innovation contributions</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">2. DEVELOP: Leadership Skills</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Enroll in management training</li>
                    <li>• Assign mentorship roles</li>
                    <li>• Cross-functional project leadership</li>
                    <li>• Customer relationship management</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">3. OPPORTUNITY: Strategic Placement</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Match to advancement openings</li>
                    <li>• Specialized trade leadership</li>
                    <li>• Regional territory management</li>
                    <li>• Training program development</li>
                  </ul>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-sm font-semibold text-orange-300 mb-2">4. LEADERSHIP: Strategic Impact</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Team performance optimization</li>
                    <li>• Process improvement initiatives</li>
                    <li>• Strategic decision participation</li>
                    <li>• Next-generation mentoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ArrowUp className="h-5 w-5 mr-2 text-blue-400" />
                  Multi-Path Career Development
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI identifies optimal career paths based on individual strengths, interests, and market opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Promotion Rate</div>
                    <div className="text-lg font-semibold text-white">34%</div>
                    <div className="text-xs text-green-400">↑ 18% vs industry</div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Satisfaction Score</div>
                    <div className="text-lg font-semibold text-white">4.7/5</div>
                    <div className="text-xs text-green-400">Top 5% in industry</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Career Advancement Pathways</h4>
                  <div className="space-y-2">
                    {[
                      { path: "Technical Specialist Track", success: "89% advancement", focus: "Deep expertise in HVAC/Electrical/Plumbing" },
                      { path: "Team Leadership Track", success: "76% to supervisor", focus: "People management and coordination" },
                      { path: "Training & Development Track", success: "82% to trainer", focus: "Knowledge transfer and mentoring" },
                      { path: "Operations Management Track", success: "68% to manager", focus: "Process optimization and strategy" },
                      { path: "Customer Relations Track", success: "71% to account mgr", focus: "Client relationship and business development" }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-900 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">{item.path}</span>
                          <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                            {item.success}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400">{item.focus}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-400" />
                  Real-Time Performance Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <h5 className="text-sm font-medium text-white mb-2">Quarterly Advancement Review</h5>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Month 1: Performance data collection and analysis</div>
                      <div>• Month 2: Skills gap assessment and development planning</div>
                      <div>• Month 3: Career pathway recommendations and matching</div>
                      <div>• Ongoing: Mentorship, training, and opportunity placement</div>
                    </div>
                  </div>
                  
                  {[
                    { metric: "Leadership Readiness Score", current: "76.8%", target: "80%", projects: "12 active mentorships" },
                    { metric: "Technical Mastery Level", current: "91.2%", target: "95%", projects: "8 specialization certifications" },
                    { metric: "Career Advancement Rate", current: "34%", target: "40%", projects: "23 promotions this quarter" },
                    { metric: "Retention After Promotion", current: "89.4%", target: "92%", projects: "Enhanced onboarding program" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-300">{item.metric}</span>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-white">{item.current}</div>
                          <div className="text-xs text-blue-400">Target: {item.target}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{item.projects}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* W2 Technician Recruitment Tools & Resources */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">W2 Employee Recruitment Tools & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => setShowW2RecruitmentKit(true)}
                  className="h-auto p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30"
                >
                  <div className="text-left">
                    <p className="font-semibold text-white">W2 Employee Recruitment Kit</p>
                    <p className="text-sm text-blue-300">Complete toolkit for full-time employee recruitment</p>
                  </div>
                </Button>

                <Button className="h-auto p-4 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30">
                  <div className="text-left">
                    <p className="font-semibold text-white">Career Development Paths</p>
                    <p className="text-sm text-green-300">Comprehensive career progression frameworks</p>
                  </div>
                </Button>

                <Button 
                  onClick={() => setShowW2CaseStudies(true)}
                  className="h-auto p-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30"
                >
                  <div className="text-left">
                    <p className="font-semibold text-white">Employee Success Stories</p>
                    <p className="text-sm text-purple-300">Case studies from high-performing W2 technicians</p>
                  </div>
                </Button>

                <Button 
                  onClick={() => setShowW2Templates(true)}
                  className="h-auto p-4 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30"
                >
                  <div className="text-left">
                    <p className="font-semibold text-white">Employment Documents</p>
                    <p className="text-sm text-yellow-300">W2 contracts and onboarding materials</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Daily Operations */}
      {(selectedTab === "recruitment" && recruitingAgent?.dailyTasks) && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange-400" />
              Daily Recruitment Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recruitingAgent.dailyTasks.map((task: any, index: number) => (
                <div key={index} className="bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">{task.task}</h4>
                    <Badge variant="outline" className="text-xs">
                      {task.frequency}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {task.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {(selectedTab === "training" && trainingAgent?.dailyTasks) && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-orange-400" />
              Daily Training Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainingAgent.dailyTasks.map((task: any, index: number) => (
                <div key={index} className="bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-white">{task.task}</h4>
                    <Badge variant="outline" className="text-xs">
                      {task.frequency}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {task.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* W2 Employee Recruitment Kit Modal */}
      <Dialog open={showW2RecruitmentKit} onOpenChange={setShowW2RecruitmentKit}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              W2 Employee Recruitment Kit
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete recruitment toolkit for sourcing, evaluating, and onboarding full-time technician employees
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Sourcing Materials */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Sourcing & Recruitment Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Employee Job Descriptions</h4>
                    <p className="text-sm text-gray-300 mb-3">Comprehensive job descriptions for full-time technician positions</p>
                    <div className="space-y-2">
                      <div className="text-xs text-blue-300">• Entry-Level Technician (0-2 years)</div>
                      <div className="text-xs text-blue-300">• Experienced Technician (3-5 years)</div>
                      <div className="text-xs text-blue-300">• Senior Technician (5+ years)</div>
                      <div className="text-xs text-blue-300">• Lead Technician/Team Lead</div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                      Download Templates
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Benefits Package Presentations</h4>
                    <p className="text-sm text-gray-300 mb-3">Complete benefits overview for candidate attraction</p>
                    <div className="space-y-2">
                      <div className="text-xs text-green-300">• Health, dental, vision insurance</div>
                      <div className="text-xs text-green-300">• 401(k) with company matching</div>
                      <div className="text-xs text-green-300">• Paid time off and holidays</div>
                      <div className="text-xs text-green-300">• Professional development opportunities</div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                      Download Package
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Assessment & Interview Tools */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Assessment & Interview Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Skills Assessment Battery</h4>
                    <p className="text-sm text-gray-300 mb-3">Comprehensive technical and soft skills evaluation</p>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      Open Assessment
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Structured Interview Guide</h4>
                    <p className="text-sm text-gray-300 mb-3">Behavioral and technical interview frameworks</p>
                    <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                      View Guide
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Reference Check Process</h4>
                    <p className="text-sm text-gray-300 mb-3">Standardized reference verification procedures</p>
                    <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                      Download Process
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Onboarding & Training */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Onboarding & Training Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">90-Day Onboarding Program</h4>
                    <p className="text-sm text-gray-300 mb-3">Structured training program for new employees</p>
                    <div className="space-y-2">
                      <div className="text-xs text-blue-300">• Week 1-2: Company orientation & safety training</div>
                      <div className="text-xs text-blue-300">• Week 3-8: Technical skills development</div>
                      <div className="text-xs text-blue-300">• Week 9-12: Advanced procedures & certifications</div>
                      <div className="text-xs text-blue-300">• Month 3: Performance review & advancement planning</div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                      Download Program
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Performance Standards</h4>
                    <p className="text-sm text-gray-300 mb-3">Clear expectations and career advancement metrics</p>
                    <div className="space-y-2">
                      <div className="text-xs text-green-300">• Quality standards and safety compliance</div>
                      <div className="text-xs text-green-300">• Customer service excellence (4.5+ rating)</div>
                      <div className="text-xs text-green-300">• Productivity targets and efficiency metrics</div>
                      <div className="text-xs text-green-300">• Professional development requirements</div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                      View Standards
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* W2 Employee Case Studies Modal */}
      <Dialog open={showW2CaseStudies} onOpenChange={setShowW2CaseStudies}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              W2 Employee Success Stories
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Career success stories from high-performing W2 technician employees across different planning areas
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Featured Success Stories */}
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Jessica Martinez - Senior HVAC Technician</h3>
                      <p className="text-sm text-gray-400">Houston Metro • 4 years with company</p>
                    </div>
                    <Badge className="bg-green-600">Employee of the Year</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">94%</div>
                      <div className="text-xs text-gray-400">Completion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">$89K</div>
                      <div className="text-xs text-gray-400">Annual Salary + Bonuses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">4.9/5</div>
                      <div className="text-xs text-gray-400">Customer Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">2</div>
                      <div className="text-xs text-gray-400">Promotions</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white mb-1">Career Journey</h4>
                      <p className="text-sm text-gray-300">Started as entry-level apprentice, promoted to Lead Technician within 18 months, now Senior Technician mentoring new hires.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Key Achievements</h4>
                      <p className="text-sm text-gray-300">Led implementation of new HVAC diagnostic procedures, reduced average repair time by 23%, consistently exceeds customer satisfaction targets.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Career Development</h4>
                      <p className="text-sm text-gray-300">Completed EPA 608 certification, NATE certification, and company leadership training. Now on track for Field Supervisor role.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-700 border-gray-600">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">David Thompson - Multi-Trade Specialist</h3>
                      <p className="text-sm text-gray-400">Dallas Metro • 3.2 years with company</p>
                    </div>
                    <Badge className="bg-blue-600">Top Performer</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">91%</div>
                      <div className="text-xs text-gray-400">Completion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">$76K</div>
                      <div className="text-xs text-gray-400">Annual Salary + Benefits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">4.7/5</div>
                      <div className="text-xs text-gray-400">Customer Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">8</div>
                      <div className="text-xs text-gray-400">Certifications</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-white mb-1">Background</h4>
                      <p className="text-sm text-gray-300">Former military maintenance specialist seeking stable career with growth opportunities. Joined as experienced hire with transferable skills.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Professional Growth</h4>
                      <p className="text-sm text-gray-300">Leveraged military discipline and technical background to excel in residential services. Cross-trained in plumbing, electrical, and appliance repair.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Work-Life Balance</h4>
                      <p className="text-sm text-gray-300">Appreciates predictable schedule, comprehensive benefits, and paid training opportunities. Plans to pursue supervisory role within next 2 years.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* W2 Employee Performance Overview */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">W2 Employee Program Performance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">942</div>
                    <div className="text-xs text-gray-400">W2 Employees</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">$68K</div>
                    <div className="text-xs text-gray-400">Average Annual Compensation</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">89%</div>
                    <div className="text-xs text-gray-400">Employee Retention Rate</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-400">73%</div>
                    <div className="text-xs text-gray-400">Internal Promotion Rate</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* W2 Employee Templates Modal */}
      <Dialog open={showW2Templates} onOpenChange={setShowW2Templates}>
        <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-yellow-400" />
              W2 Employment Document Templates
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Comprehensive employment agreements and HR documents for full-time technician positions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Employment Agreements */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Employment Agreement Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Standard Employment Agreement</h4>
                    <p className="text-sm text-gray-300 mb-3">Comprehensive employment contract for full-time technician positions</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-yellow-300">• Compensation and benefits structure</div>
                      <div className="text-xs text-yellow-300">• Performance expectations and metrics</div>
                      <div className="text-xs text-yellow-300">• Professional development opportunities</div>
                      <div className="text-xs text-yellow-300">• Termination and disciplinary procedures</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Leadership Track Agreement</h4>
                    <p className="text-sm text-gray-300 mb-3">Enhanced contract for senior technicians and supervisory roles</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-blue-300">• Leadership development programs</div>
                      <div className="text-xs text-blue-300">• Advanced compensation tiers</div>
                      <div className="text-xs text-blue-300">• Mentorship and training responsibilities</div>
                      <div className="text-xs text-blue-300">• Stock option and bonus eligibility</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Download PDF
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* HR Documentation */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">HR & Administrative Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Employee Handbook</h4>
                    <p className="text-sm text-gray-300 mb-3">Complete employee policies and procedures guide</p>
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      Download Handbook
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Benefits Enrollment</h4>
                    <p className="text-sm text-gray-300 mb-3">Health insurance, 401(k), and benefits registration forms</p>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      Download Forms
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">Performance Review Forms</h4>
                    <p className="text-sm text-gray-300 mb-3">Quarterly and annual performance evaluation templates</p>
                    <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                      Download Templates
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Compliance Information */}
            <div>
              <Alert className="bg-blue-900/30 border-blue-500/30">
                <AlertDescription className="text-blue-300">
                  <strong>Employment Compliance:</strong> All W2 employment documents comply with federal and state labor laws, including FLSA overtime provisions, workers' compensation requirements, and equal employment opportunity regulations.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}