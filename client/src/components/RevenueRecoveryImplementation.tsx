import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  Target,
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  Lightbulb,
  Settings,
  PlayCircle,
  BarChart3,
  Refrigerator,
  Waves,
  Wind,
  ChefHat,
  AlertCircle,
  Calendar,
  Users,
  Phone,
  ChevronRight,
  Home
} from "lucide-react";
import Phase1Implementation from "@/components/Phase1Implementation";
import MultiDimensionalPerformanceSystem from "@/components/MultiDimensionalPerformanceSystem";

export default function RevenueRecoveryImplementation() {
  const [, setLocation] = useLocation();
  const [selectedImplementation, setSelectedImplementation] = useState("overview");

  // Navigation breadcrumb
  const Breadcrumb = () => (
    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setLocation('/call-center-scheduling')}
        className="text-gray-400 hover:text-white p-1"
      >
        Call Center Scheduling
      </Button>
      <ChevronRight className="w-4 h-4" />
      <span className="text-white">Revenue Recovery Implementation</span>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setLocation('/planning-area-agents')}
        className="ml-4"
      >
        <Home className="w-4 h-4 mr-2" />
        Planning Area Dashboard
      </Button>
    </div>
  );

  // Implementation roadmap for revenue recovery
  const implementationPhases = [
    {
      phase: "Phase 1: Immediate Wins",
      duration: "2 weeks",
      revenueImpact: "$127,500",
      implementation: "Active",
      initiatives: [
        {
          name: "Intelligent Call Routing Optimization",
          serviceAreas: ["All Services"],
          impact: "$35,721",
          complexity: "Low",
          timeframe: "1 week",
          status: "Active",
          description: "AI classifies calls by appliance type and urgency, routing to specialized technicians",
          kpis: ["67% reduction in hold times", "23% customer satisfaction increase", "2.3% → 1.6% dropout rate"],
          implementation: [
            "Deploy natural language processing for call classification",
            "Integrate appliance-specific routing algorithms",
            "Implement real-time technician availability matching"
          ]
        },
        {
          name: "HVAC Emergency Response Optimization",
          serviceAreas: ["HVAC Systems"],
          impact: "$67,250",
          complexity: "Medium",
          timeframe: "2 weeks",
          status: "Testing",
          description: "Seasonal demand prediction and emergency response optimization for heating/cooling failures",
          kpis: ["45% friction reduction", "31% customer satisfaction increase", "16.4% → 9.0% dropout rate"],
          implementation: [
            "Deploy weather-based demand forecasting",
            "Implement emergency technician pool management",
            "Create transparent emergency pricing communication"
          ]
        },
        {
          name: "Appliance Diagnostic Simplification",
          serviceAreas: ["Refrigerators", "Washers", "Dryers"],
          impact: "$24,529",
          complexity: "Low",
          timeframe: "1 week",
          status: "Development",
          description: "Visual diagnostic tools guide customers through appliance problem identification",
          kpis: ["52% assessment friction reduction", "Faster problem identification", "Better technician preparation"],
          implementation: [
            "Create visual symptom matching interfaces",
            "Deploy appliance-specific troubleshooting flows",
            "Integrate with technician dispatch system"
          ]
        }
      ]
    },
    {
      phase: "Phase 2: Service Area Specialization",
      duration: "4 weeks",
      revenueImpact: "$156,750",
      implementation: "Planning",
      initiatives: [
        {
          name: "Kitchen Appliance Transparent Pricing",
          serviceAreas: ["Dishwashers", "Stoves/Ovens", "Microwaves"],
          impact: "$68,839",
          complexity: "Medium",
          timeframe: "3 weeks",
          status: "Development",
          description: "Instant repair estimates based on appliance model and common issues",
          kpis: ["52% pricing friction reduction", "28% customer satisfaction increase", "Increased upfront transparency"],
          implementation: [
            "Build appliance model database with common repair costs",
            "Deploy instant pricing estimation engine",
            "Create transparent fee structure communication"
          ]
        },
        {
          name: "Multi-Appliance Service Bundling",
          serviceAreas: ["All Appliances"],
          impact: "$41,912",
          complexity: "High",
          timeframe: "4 weeks",
          status: "Planning",
          description: "Cross-selling optimization when multiple appliances need service",
          kpis: ["38% friction reduction", "19% customer satisfaction increase", "Increased average order value"],
          implementation: [
            "Develop cross-appliance diagnostic workflows",
            "Create bundled service pricing models",
            "Implement scheduling optimization for multiple services"
          ]
        },
        {
          name: "Parts Availability Real-Time Integration",
          serviceAreas: ["All Services"],
          impact: "$45,999",
          complexity: "High",
          timeframe: "4 weeks",
          status: "Planning",
          description: "Real-time parts availability checking to prevent scheduling disappointments",
          kpis: ["Direct-ship optimization", "26% parts margin improvement", "Reduced shipping costs"],
          implementation: [
            "Integrate with supplier inventory systems",
            "Deploy predictive parts ordering",
            "Create customer communication for parts timelines"
          ]
        }
      ]
    },
    {
      phase: "Phase 3: Advanced AI Optimization",
      duration: "6 weeks",
      revenueImpact: "$213,892",
      implementation: "Future",
      initiatives: [
        {
          name: "Predictive Maintenance Scheduling",
          serviceAreas: ["All Services"],
          impact: "$89,450",
          complexity: "High",
          timeframe: "6 weeks",
          status: "Research",
          description: "AI predicts appliance failures and proactively schedules maintenance",
          kpis: ["Preventive revenue streams", "Customer lifetime value increase", "Reduced emergency calls"],
          implementation: [
            "Deploy IoT integration for appliance monitoring",
            "Build failure prediction algorithms",
            "Create proactive customer outreach workflows"
          ]
        },
        {
          name: "Dynamic Labor Rate Optimization",
          serviceAreas: ["All Services"],
          impact: "$78,231",
          complexity: "High",
          timeframe: "5 weeks",
          status: "Research",
          description: "AI optimizes labor rates based on complexity, urgency, and market conditions",
          kpis: ["$285 → $320 average labor revenue", "Margin optimization", "Competitive positioning"],
          implementation: [
            "Build market rate analysis algorithms",
            "Deploy complexity-based pricing models",
            "Create transparent rate communication"
          ]
        },
        {
          name: "Customer Journey Personalization",
          serviceAreas: ["All Services"],
          impact: "$46,211",
          complexity: "High",
          timeframe: "6 weeks",
          status: "Research",
          description: "Personalized scheduling experience based on customer history and preferences",
          kpis: ["Personalized conversion optimization", "Customer loyalty increase", "Reduced friction"],
          implementation: [
            "Build customer preference learning algorithms",
            "Deploy personalized communication flows",
            "Create adaptive scheduling interfaces"
          ]
        }
      ]
    }
  ];

  // Service area specific revenue recovery potential
  const serviceAreaRecovery = [
    {
      serviceArea: "Refrigerators",
      icon: Refrigerator,
      currentDropout: 11.2,
      targetDropout: 6.7,
      revenueAtRisk: "$153,924",
      recoveryPotential: "$107,747",
      recoveryPercentage: 70,
      keyInitiatives: [
        "Temperature-based diagnostic AI",
        "Food spoilage urgency algorithms", 
        "Preventive maintenance scheduling"
      ],
      implementationTimeline: "2-4 weeks",
      priority: "High"
    },
    {
      serviceArea: "Washers & Dryers",
      icon: Waves,
      currentDropout: 13.8,
      targetDropout: 8.3,
      revenueAtRisk: "$178,243",
      recoveryPotential: "$124,770",
      recoveryPercentage: 70,
      keyInitiatives: [
        "Urgency classification AI",
        "Load capacity visual guides",
        "Instant warranty lookup"
      ],
      implementationTimeline: "1-3 weeks",
      priority: "Critical"
    },
    {
      serviceArea: "HVAC Systems",
      icon: Wind,
      currentDropout: 16.4,
      targetDropout: 9.8,
      revenueAtRisk: "$213,156",
      recoveryPotential: "$149,209",
      recoveryPercentage: 70,
      keyInitiatives: [
        "Seasonal pricing transparency",
        "System age and efficiency AI",
        "Energy savings calculators"
      ],
      implementationTimeline: "2-6 weeks",
      priority: "Critical"
    },
    {
      serviceArea: "Kitchen Appliances",
      icon: ChefHat,
      currentDropout: 9.7,
      targetDropout: 5.8,
      revenueAtRisk: "$98,341",
      recoveryPotential: "$68,839",
      recoveryPercentage: 70,
      keyInitiatives: [
        "Multi-appliance service bundling",
        "Real-time parts availability",
        "Cooking disruption minimization"
      ],
      implementationTimeline: "3-4 weeks",
      priority: "Medium"
    }
  ];

  // ROI Analysis
  const roiAnalysis = {
    totalInvestment: "$145,000",
    implementationCost: "$89,000",
    trainingCost: "$32,000",
    technologyCost: "$24,000",
    totalRecovery: "$450,565",
    netROI: "310%",
    paybackPeriod: "3.2 months",
    annualizedBenefit: "$1,689,212"
  };

  const getIconColor = (priority: string) => {
    return priority === "Critical" ? "text-red-400" : 
           priority === "High" ? "text-yellow-400" : "text-green-400";
  };

  const getPriorityColor = (priority: string) => {
    return priority === "Critical" ? "bg-red-600" : 
           priority === "High" ? "bg-yellow-600" : "bg-green-600";
  };

  return (
    <div className="space-y-6">
      <Breadcrumb />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Target className="h-6 w-6 mr-3 text-green-400" />
            Revenue Recovery Implementation Plan
          </h2>
          <p className="text-gray-400 mt-1">
            Comprehensive roadmap to recover $899,775 in lost revenue through AI optimization
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-green-400">$450,565</div>
          <div className="text-sm text-gray-400">Immediate Recovery Potential</div>
          <Badge className="bg-green-600 mt-1">310% ROI</Badge>
        </div>
      </div>

      <Tabs value={selectedImplementation} onValueChange={setSelectedImplementation} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-green-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="service-areas" className="data-[state=active]:bg-green-600">
            <Settings className="h-4 w-4 mr-2" />
            By Service Area
          </TabsTrigger>
          <TabsTrigger value="implementation" className="data-[state=active]:bg-green-600">
            <PlayCircle className="h-4 w-4 mr-2" />
            Implementation
          </TabsTrigger>
          <TabsTrigger value="roi-analysis" className="data-[state=active]:bg-green-600">
            <DollarSign className="h-4 w-4 mr-2" />
            ROI Analysis
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Phase1Implementation />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {implementationPhases.map((phase, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>{phase.phase}</span>
                    <Badge className={`${
                      phase.implementation === 'Active' ? 'bg-green-600' :
                      phase.implementation === 'Planning' ? 'bg-yellow-600' : 'bg-blue-600'
                    }`}>
                      {phase.implementation}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {phase.duration} • {phase.revenueImpact} recovery potential
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{phase.revenueImpact}</div>
                      <div className="text-sm text-gray-400">Revenue Recovery</div>
                    </div>
                    
                    <div className="space-y-3">
                      {phase.initiatives.map((initiative, idx) => (
                        <div key={idx} className="bg-gray-900 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">{initiative.name}</span>
                            <Badge className={`text-xs ${
                              initiative.status === 'Active' ? 'bg-green-600' :
                              initiative.status === 'Testing' ? 'bg-yellow-600' :
                              initiative.status === 'Development' ? 'bg-blue-600' : 'bg-gray-600'
                            }`}>
                              {initiative.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-400 mb-2">
                            {initiative.serviceAreas.join(", ")} • {initiative.impact}
                          </div>
                          <div className="text-xs text-gray-300">{initiative.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Wins Summary */}
          <Card className="bg-gradient-to-r from-green-900 to-blue-900 border-green-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                Immediate Quick Wins (Next 2 Weeks)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">$127,500</div>
                  <div className="text-sm text-green-200">Phase 1 Recovery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">67%</div>
                  <div className="text-sm text-blue-200">Hold Time Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">45%</div>
                  <div className="text-sm text-purple-200">HVAC Friction Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">310%</div>
                  <div className="text-sm text-yellow-200">Expected ROI</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Areas Tab */}
        <TabsContent value="service-areas" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {serviceAreaRecovery.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center">
                        <IconComponent className={`h-5 w-5 mr-2 ${getIconColor(area.priority)}`} />
                        {area.serviceArea}
                      </span>
                      <Badge className={getPriorityColor(area.priority)}>
                        {area.priority} Priority
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-400">{area.currentDropout}%</div>
                        <div className="text-sm text-gray-400">Current Dropout</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-400">{area.targetDropout}%</div>
                        <div className="text-sm text-gray-400">Target Dropout</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{area.recoveryPotential}</div>
                      <div className="text-sm text-gray-400">Recovery Potential</div>
                      <Progress value={area.recoveryPercentage} className="mt-2" />
                      <div className="text-xs text-gray-400 mt-1">{area.recoveryPercentage}% of revenue at risk</div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Key Initiatives</h4>
                      <div className="space-y-2">
                        {area.keyInitiatives.map((initiative, idx) => (
                          <div key={idx} className="bg-gray-900 p-2 rounded text-sm text-gray-200 flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                            {initiative}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Timeline:</span>
                      <Badge variant="outline" className="text-blue-400 border-blue-600">
                        {area.implementationTimeline}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Implementation Tab */}
        <TabsContent value="implementation" className="space-y-6">
          <div className="space-y-6">
            {implementationPhases.map((phase, phaseIndex) => (
              <Card key={phaseIndex} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>{phase.phase}</span>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${
                        phase.implementation === 'Active' ? 'bg-green-600' :
                        phase.implementation === 'Planning' ? 'bg-yellow-600' : 'bg-blue-600'
                      }`}>
                        {phase.implementation}
                      </Badge>
                      <Badge variant="outline" className="text-gray-400 border-gray-600">
                        {phase.duration}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {phase.initiatives.map((initiative, idx) => (
                      <div key={idx} className="bg-gray-900 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-medium text-white">{initiative.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-600">{initiative.impact}</Badge>
                            <Badge className={`${
                              initiative.complexity === 'Low' ? 'bg-green-600' :
                              initiative.complexity === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
                            }`}>
                              {initiative.complexity}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-gray-300 mb-3">{initiative.description}</p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-400 mb-2">Key Performance Indicators</h5>
                            <ul className="space-y-1">
                              {initiative.kpis.map((kpi, kpiIdx) => (
                                <li key={kpiIdx} className="text-sm text-green-400 flex items-start">
                                  <TrendingUp className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                                  {kpi}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium text-gray-400 mb-2">Implementation Steps</h5>
                            <ul className="space-y-1">
                              {initiative.implementation.map((step, stepIdx) => (
                                <li key={stepIdx} className="text-sm text-blue-400 flex items-start">
                                  <Settings className="h-3 w-3 mr-2 mt-1 flex-shrink-0" />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
                          <span className="text-sm text-gray-400">Service Areas: {initiative.serviceAreas.join(", ")}</span>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-400">{initiative.timeframe}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ROI Analysis Tab */}
        <TabsContent value="roi-analysis" className="space-y-6">
          <MultiDimensionalPerformanceSystem />
          
          <Card className="bg-gradient-to-r from-green-900 to-blue-900 border-green-500">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-yellow-400" />
                ROI Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">310%</div>
                  <div className="text-sm text-green-200">Net ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">3.2 months</div>
                  <div className="text-sm text-blue-200">Payback Period</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">$1,689,212</div>
                  <div className="text-sm text-purple-200">Annualized Benefit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">$899K</div>
                  <div className="text-sm text-yellow-200">Total Addressable Loss</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}