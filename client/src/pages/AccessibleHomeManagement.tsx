import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  DollarSign, 
  Users, 
  CheckCircle, 
  Clock, 
  Target,
  TrendingDown,
  Heart,
  Shield,
  Wrench,
  Phone,
  Calendar
} from "lucide-react";

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
}

export default function AccessibleHomeManagement() {
  const [selectedTab, setSelectedTab] = useState("affordability");

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(res => res.json()),
  });

  // Key agents that make home management accessible
  const customerCommunicationAgent = agents.find((agent: Agent) => 
    agent.name === "Customer Communication Hub"
  );

  const pricingAgent = agents.find((agent: Agent) => 
    agent.name === "Pricing & Estimation Specialist"
  );

  const schedulingAgent = agents.find((agent: Agent) => 
    agent.name === "Advanced Scheduling Agent"
  );

  const maintenanceAgent = agents.find((agent: Agent) => 
    agent.name === "Maintenance Scheduler Pro"
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
          <Home className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-3xl font-bold text-white">Accessible Home Management</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Making home management excellence accessible and affordable to a much larger proportion 
          of homeowners, not just the most affluent. AI-powered solutions that democratize quality home care.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/30 mb-8">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Democratizing Home Excellence</h3>
              <p className="text-gray-300 mb-4">
                Our mission is to make professional home management accessible to everyday homeowners, 
                not just the wealthy. Through AI optimization, predictive maintenance, and smart scheduling, 
                we reduce costs while improving service quality, making home excellence affordable for 
                middle-class families and first-time homeowners.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">35%</div>
                  <div className="text-sm text-gray-400">Cost Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">92%</div>
                  <div className="text-sm text-gray-400">Customer Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">68%</div>
                  <div className="text-sm text-gray-400">Preventive Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger
            value="affordability"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <DollarSign className="h-4 w-4" />
            <span>Affordability</span>
          </TabsTrigger>
          <TabsTrigger
            value="accessibility"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <Users className="h-4 w-4" />
            <span>Accessibility</span>
          </TabsTrigger>
          <TabsTrigger
            value="prevention"
            className="flex items-center space-x-2 data-[state=active]:bg-green-600"
          >
            <Shield className="h-4 w-4" />
            <span>Prevention</span>
          </TabsTrigger>
        </TabsList>

        {/* Affordability Tab */}
        <TabsContent value="affordability" className="space-y-6">
          {/* Affordability Workflow */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                Smart Pricing Workflow: Analysis → Optimization → Implementation → Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">1. ANALYSIS: Market Intelligence</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Income demographics by area</li>
                    <li>• Service demand patterns</li>
                    <li>• Competitor pricing analysis</li>
                    <li>• Cost structure optimization</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">2. OPTIMIZE: Dynamic Pricing</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• AI-powered price modeling</li>
                    <li>• Income-based tier creation</li>
                    <li>• Bundle optimization</li>
                    <li>• Payment plan structuring</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">3. IMPLEMENT: Smart Delivery</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Route optimization savings</li>
                    <li>• Bulk parts procurement</li>
                    <li>• Preventive maintenance scheduling</li>
                    <li>• Technician efficiency maximization</li>
                  </ul>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-sm font-semibold text-orange-300 mb-2">4. SAVINGS: Customer Impact</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• 35% average cost reduction</li>
                    <li>• Flexible payment options</li>
                    <li>• Emergency prevention savings</li>
                    <li>• Long-term relationship value</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                  Income-Responsive Pricing Engine
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI adjusts service pricing based on local income demographics while maintaining quality standards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Cost Reduction</div>
                    <div className="text-lg font-semibold text-green-400">35%</div>
                    <div className="text-xs text-green-400">↓ vs traditional providers</div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Market Expansion</div>
                    <div className="text-lg font-semibold text-white">68%</div>
                    <div className="text-xs text-green-400">New customer segments</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Tiered Pricing Strategy</h4>
                  <div className="space-y-2">
                    {[
                      { tier: "Essential Care ($89/month)", target: "Households earning $35K-50K", savings: "42% vs standard" },
                      { tier: "Standard Care ($139/month)", target: "Households earning $50K-75K", savings: "28% vs standard" },
                      { tier: "Premium Care ($189/month)", target: "Households earning $75K+", savings: "15% vs competitors" },
                      { tier: "First-Time Homeowner ($69/month)", target: "New homeowners under 35", savings: "55% first year" },
                      { tier: "Senior Care ($99/month)", target: "Households 65+ years", savings: "38% with added safety" },
                      { tier: "Student/Military ($79/month)", target: "Students and military families", savings: "47% with ID verification" }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-900 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">{item.tier}</span>
                          <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                            {item.savings}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400">{item.target}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2 text-green-400" />
                  Cost Optimization Feedback Loop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <h5 className="text-sm font-medium text-white mb-2">Monthly Optimization Cycle</h5>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Week 1: Customer affordability feedback collection</div>
                      <div>• Week 2: Cost structure analysis and adjustment</div>
                      <div>• Week 3: Service delivery optimization implementation</div>
                      <div>• Week 4: Pricing model refinement and validation</div>
                    </div>
                  </div>
                  
                  {[
                    { metric: "Average Service Cost", current: "-35%", previous: "-28%", improvement: "7% additional savings" },
                    { metric: "Customer Acquisition Cost", current: "-42%", previous: "-35%", improvement: "Better targeting efficiency" },
                    { metric: "Service Accessibility Index", current: "68%", previous: "52%", improvement: "16% more households served" },
                    { metric: "Customer Satisfaction", current: "92%", previous: "89%", improvement: "Quality maintained with savings" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-300">{item.metric}</span>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-white">{item.current}</div>
                          <div className="text-xs text-green-400">↑ from {item.previous}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{item.improvement}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Accessibility Tab */}
        <TabsContent value="accessibility" className="space-y-6">
          {/* Accessibility Workflow */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-400" />
                Accessibility Workflow: Outreach → Simplification → Support → Empowerment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">1. OUTREACH: Community Connection</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Multi-language marketing campaigns</li>
                    <li>• Community partnership programs</li>
                    <li>• First-time homeowner education</li>
                    <li>• Senior-focused communication</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">2. SIMPLIFY: User Experience</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• One-click scheduling interface</li>
                    <li>• Plain-language service descriptions</li>
                    <li>• Visual progress tracking</li>
                    <li>• Mobile-first design approach</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">3. SUPPORT: 24/7 Assistance</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Multi-channel communication</li>
                    <li>• Real-time human backup</li>
                    <li>• Educational resource library</li>
                    <li>• Emergency response protocols</li>
                  </ul>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-sm font-semibold text-orange-300 mb-2">4. EMPOWER: Self-Service</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Home care knowledge transfer</li>
                    <li>• DIY guidance and tutorials</li>
                    <li>• Maintenance reminder systems</li>
                    <li>• Budget planning tools</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-400" />
                  Universal Access Communication Hub
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI adapts communication style and complexity based on user demographics and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Response Time</div>
                    <div className="text-lg font-semibold text-white">0.8s</div>
                    <div className="text-xs text-green-400">Any language, any time</div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">User Satisfaction</div>
                    <div className="text-lg font-semibold text-white">92%</div>
                    <div className="text-xs text-green-400">Across all demographics</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Adaptive Communication Features</h4>
                  <div className="space-y-2">
                    {[
                      { feature: "Auto-detect language preference", adoption: "94% accuracy" },
                      { feature: "Simplify technical explanations", adoption: "89% comprehension" },
                      { feature: "Visual scheduling interface", adoption: "85% completion rate" },
                      { feature: "Voice-to-text for seniors", adoption: "78% preference" },
                      { feature: "Text/SMS for millennials", adoption: "91% preferred method" },
                      { feature: "Educational content delivery", adoption: "73% engagement rate" }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-900 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-300">{item.feature}</span>
                          <Badge variant="outline" className="text-blue-400 border-blue-600 text-xs">
                            {item.adoption}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-400" />
                  Demographic Success Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <h5 className="text-sm font-medium text-white mb-2">Weekly Accessibility Review</h5>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Monday: User experience feedback analysis</div>
                      <div>• Tuesday: Language and communication optimization</div>
                      <div>• Wednesday: Interface simplification updates</div>
                      <div>• Thursday: Community outreach program review</div>
                      <div>• Friday: Accessibility metrics and improvement planning</div>
                    </div>
                  </div>
                  
                  {[
                    { demographic: "First-time Homeowners", current: "68%", previous: "52%", improvement: "16% increase in service adoption" },
                    { demographic: "Middle-income Families", current: "74%", previous: "61%", improvement: "Cost-effective service access" },
                    { demographic: "Senior Citizens (65+)", current: "85%", previous: "67%", improvement: "Simplified interface success" },
                    { demographic: "Non-English Speakers", current: "79%", previous: "43%", improvement: "Multi-language support impact" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-300">{item.demographic}</span>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-white">{item.current}</div>
                          <div className="text-xs text-green-400">↑ from {item.previous}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">{item.improvement}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Prevention Tab */}
        <TabsContent value="prevention" className="space-y-6">
          {/* Prevention Workflow */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-400" />
                Preventive Care Workflow: Monitor → Predict → Schedule → Prevent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">1. MONITOR: System Health</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• IoT sensor data collection</li>
                    <li>• Performance pattern analysis</li>
                    <li>• Age and usage tracking</li>
                    <li>• Environmental factor assessment</li>
                  </ul>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-300 mb-2">2. PREDICT: Failure Probability</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• AI-powered failure prediction</li>
                    <li>• Risk assessment modeling</li>
                    <li>• Cost-benefit analysis</li>
                    <li>• Optimal timing calculation</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">3. SCHEDULE: Proactive Service</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Automated appointment booking</li>
                    <li>• Customer-friendly timing</li>
                    <li>• Bundled service optimization</li>
                    <li>• Affordable payment scheduling</li>
                  </ul>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                  <h4 className="text-sm font-semibold text-orange-300 mb-2">4. PREVENT: Emergency Avoidance</h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• System maintenance execution</li>
                    <li>• Component replacement</li>
                    <li>• Performance optimization</li>
                    <li>• Long-term cost savings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                  Predictive Maintenance Intelligence
                </CardTitle>
                <CardDescription className="text-gray-400">
                  AI prevents emergencies by predicting failures and scheduling affordable preventive care
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Prevention Success</div>
                    <div className="text-lg font-semibold text-white">68%</div>
                    <div className="text-xs text-green-400">↑ Emergency avoidance</div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">Avg Annual Savings</div>
                    <div className="text-lg font-semibold text-green-400">$1,850</div>
                    <div className="text-xs text-green-400">Per household</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Smart Prevention Programs</h4>
                  <div className="space-y-2">
                    {[
                      { program: "HVAC Seasonal Optimization", schedule: "Quarterly", savings: "$1,200/year", adoption: "89%" },
                      { program: "Plumbing System Health Check", schedule: "Bi-annual", savings: "$850/year", adoption: "76%" },
                      { program: "Electrical Safety Inspection", schedule: "Annual", savings: "$650/year", adoption: "82%" },
                      { program: "Appliance Lifecycle Management", schedule: "Monthly monitoring", savings: "$480/year", adoption: "71%" },
                      { program: "Home Weatherization Service", schedule: "Seasonal", savings: "$320/year", adoption: "68%" },
                      { program: "Smart Home Integration Setup", schedule: "One-time + updates", savings: "$290/year", adoption: "64%" }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-900 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">{item.program}</span>
                          <div className="flex space-x-1">
                            <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                              {item.savings}
                            </Badge>
                            <Badge variant="outline" className="text-blue-400 border-blue-600 text-xs">
                              {item.adoption}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">{item.schedule}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-400" />
                  Prevention Impact Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-900 p-3 rounded-lg">
                    <h5 className="text-sm font-medium text-white mb-2">Continuous Prevention Cycle</h5>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>• Week 1: System health data collection and analysis</div>
                      <div>• Week 2: Failure prediction and risk assessment</div>
                      <div>• Week 3: Customer scheduling and service delivery</div>
                      <div>• Week 4: Impact measurement and algorithm refinement</div>
                    </div>
                  </div>
                  
                  {[
                    { system: "HVAC Systems", prevented: "68%", current_savings: "$1,200", trend: "↑ 8% vs last year", households: "12,400 protected" },
                    { system: "Plumbing Systems", prevented: "71%", current_savings: "$850", trend: "↑ 12% vs last year", households: "9,800 protected" },
                    { system: "Electrical Systems", prevented: "64%", current_savings: "$650", trend: "↑ 6% vs last year", households: "11,200 protected" },
                    { system: "Appliance Systems", prevented: "59%", current_savings: "$480", trend: "↑ 15% vs last year", households: "8,600 protected" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-300">{item.system}</span>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-white">{item.prevented} prevented</div>
                          <div className="text-xs text-green-400">{item.current_savings} saved</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{item.households}</span>
                        <span className="text-green-400">{item.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Key Success Stories */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-yellow-400" />
            Accessibility Success Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Home className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="text-sm font-semibold text-white">First-Time Homeowners</h4>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Young families now access professional HVAC maintenance for $89/month vs $300+ traditional services
              </p>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">68%</div>
                <div className="text-xs text-gray-500">now afford professional care</div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Heart className="h-5 w-5 text-red-400 mr-2" />
                <h4 className="text-sm font-semibold text-white">Senior Citizens</h4>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Simplified scheduling and 24/7 support helps seniors maintain homes independently
              </p>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">85%</div>
                <div className="text-xs text-gray-500">report improved access</div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 text-purple-400 mr-2" />
                <h4 className="text-sm font-semibold text-white">Middle-Income Families</h4>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Preventive maintenance programs reduce emergency costs by $1,850 annually per household
              </p>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">74%</div>
                <div className="text-xs text-gray-500">achieve cost-effective care</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
}