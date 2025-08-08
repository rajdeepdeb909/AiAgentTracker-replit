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
  Target,
  Award,
  MapPin,
  ArrowRight,
  Star,
  UserPlus,
  GraduationCap,
  Zap
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

export default function TechnicianLifecycle() {
  const [selectedStage, setSelectedStage] = useState("recruitment");

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

  const lifecycleStages = [
    {
      id: "recruitment",
      title: "Talent Acquisition",
      icon: UserPlus,
      description: "AI-powered recruiting that identifies success predictors and matches technicians to planning areas",
      agent: recruitingAgent,
      features: [
        "Geographic targeting by planning area",
        "Success prediction modeling",
        "Skills assessment and matching",
        "Diversity and inclusion metrics",
        "16-day average time to fill",
        "87.3% retention prediction accuracy"
      ],
      metrics: {
        "Hiring Accuracy": "94.2%",
        "Time to Fill": "16 days",
        "Candidate Quality": "89.7%",
        "Cost Per Hire": "$2,180"
      }
    },
    {
      id: "onboarding",
      title: "Training & Development",
      icon: GraduationCap,
      description: "Personalized learning paths that adapt to individual technician skills and career goals",
      agent: trainingAgent,
      features: [
        "Adaptive learning modules",
        "Cross-training coordination",
        "Certification tracking",
        "AR-assisted training",
        "94% knowledge retention rate",
        "Performance coaching integration"
      ],
      metrics: {
        "Training Effectiveness": "92.6%",
        "Skills Improvement": "89.1%",
        "Certification Success": "93.8%",
        "Career Progression": "78.4%"
      }
    },
    {
      id: "development",
      title: "Career Advancement",
      icon: TrendingUp,
      description: "Continuous skill development and career pathing that empowers technicians at every stage",
      agent: trainingAgent,
      features: [
        "Individual skill gap analysis",
        "Career pathway recommendations",
        "Leadership development programs",
        "Specialization opportunities",
        "Mentorship matching",
        "Performance advancement tracking"
      ],
      metrics: {
        "Promotion Rate": "34%",
        "Skill Advancement": "91.2%",
        "Leadership Development": "76.8%",
        "Technician Satisfaction": "4.7/5"
      }
    }
  ];

  const currentStage = lifecycleStages.find(stage => stage.id === selectedStage);

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
          <h1 className="text-3xl font-bold text-white">Technician Lifecycle Management</h1>
        </div>
        <p className="text-gray-400 text-lg">
          Empowering home service technicians at all career stages through AI-powered recruitment, 
          training, and development programs designed to make professional growth accessible and affordable.
        </p>
      </div>

      {/* Dual Mandate Banner */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30 mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Technician Empowerment</h3>
                <p className="text-gray-300">
                  Supporting technicians at every career stage with AI-powered training, 
                  career advancement, and skill development opportunities.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-500 p-3 rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Accessible Home Management</h3>
                <p className="text-gray-300">
                  Making home management excellence accessible and affordable to a much larger 
                  proportion of homeowners, not just the most affluent.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedStage} onValueChange={setSelectedStage} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          {lifecycleStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <TabsTrigger
                key={stage.id}
                value={stage.id}
                className="flex items-center space-x-2 data-[state=active]:bg-blue-600"
              >
                <Icon className="h-4 w-4" />
                <span>{stage.title}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {lifecycleStages.map((stage) => (
          <TabsContent key={stage.id} value={stage.id} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agent Details */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <stage.icon className="h-5 w-5 mr-2 text-blue-400" />
                      {stage.agent?.name || "Agent Initializing..."}
                    </CardTitle>
                    <Badge variant="outline" className="bg-green-900 text-green-300 border-green-600">
                      {stage.agent?.status || "Active"}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400">
                    {stage.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Performance</div>
                      <div className="text-lg font-semibold text-white">
                        {stage.agent?.performance || "94.2"}%
                      </div>
                    </div>
                    <div className="bg-gray-900 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Daily Tasks</div>
                      <div className="text-lg font-semibold text-white">
                        {stage.agent?.dailyInteractions || 128}
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Key Capabilities</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {stage.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(stage.metrics).map(([metric, value]) => (
                      <div key={metric} className="flex items-center justify-between">
                        <span className="text-gray-300">{metric}</span>
                        <Badge variant="outline" className="bg-blue-900 text-blue-300 border-blue-600">
                          {value}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Tasks */}
            {stage.agent?.dailyTasks && (
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-orange-400" />
                    Daily Operations Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stage.agent.dailyTasks.map((task: any, index: number) => (
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

            {/* Success Stories */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400" />
                  Success Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stage.id === "recruitment" && (
                    <>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">87.3%</div>
                        <div className="text-sm text-gray-400">Retention Prediction Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">16 days</div>
                        <div className="text-sm text-gray-400">Average Time to Fill</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">$2,180</div>
                        <div className="text-sm text-gray-400">Cost Per Hire</div>
                      </div>
                    </>
                  )}
                  {stage.id === "onboarding" && (
                    <>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">94%</div>
                        <div className="text-sm text-gray-400">Knowledge Retention Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">93.8%</div>
                        <div className="text-sm text-gray-400">Certification Success</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">89.1%</div>
                        <div className="text-sm text-gray-400">Skills Improvement</div>
                      </div>
                    </>
                  )}
                  {stage.id === "development" && (
                    <>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">34%</div>
                        <div className="text-sm text-gray-400">Annual Promotion Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">4.7/5</div>
                        <div className="text-sm text-gray-400">Technician Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">91.2%</div>
                        <div className="text-sm text-gray-400">Skill Advancement Rate</div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
        >
          ← Back to Dashboard
        </Button>
        
        <div className="flex space-x-2">
          {lifecycleStages.map((stage, index) => (
            <Button
              key={stage.id}
              variant={selectedStage === stage.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStage(stage.id)}
              className={selectedStage === stage.id ? 
                "bg-blue-600 text-white" : 
                "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
              }
            >
              {index + 1}. {stage.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}