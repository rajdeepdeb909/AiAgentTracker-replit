import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Award,
  BookOpen,
  Cog,
  BarChart3,
  Users,
  Calendar
} from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import type { 
  Agent, 
  DynamicEvaluation, 
  AgentMaturity, 
  AgentDataFeedback, 
  ImprovementAction,
  EvaluationTemplate 
} from "@shared/schema";

interface DynamicEvaluationSystemProps {
  agents: Agent[];
}

export default function DynamicEvaluationSystem({ agents }: DynamicEvaluationSystemProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Set selected agent when agents are loaded
  useEffect(() => {
    if (agents && agents.length > 0 && !selectedAgent) {
      setSelectedAgent(agents[0]);
    }
  }, [agents, selectedAgent]);

  const { data: evaluationTemplates = [] } = useQuery<EvaluationTemplate[]>({
    queryKey: ["/api/evaluation-templates"],
  });

  const { data: agentMaturity } = useQuery<AgentMaturity>({
    queryKey: ["/api/agent-maturity", selectedAgent?.id],
    enabled: !!selectedAgent,
  });

  const { data: dynamicEvaluations = [] } = useQuery<DynamicEvaluation[]>({
    queryKey: ["/api/dynamic-evaluations"],
    enabled: !!selectedAgent,
  });

  const { data: agentDataFeedback = [] } = useQuery<AgentDataFeedback[]>({
    queryKey: ["/api/agent-data-feedback"],
    enabled: !!selectedAgent,
  });

  const { data: improvementActions = [] } = useQuery<ImprovementAction[]>({
    queryKey: ["/api/improvement-actions"],
    enabled: !!selectedAgent,
  });

  const createEvaluationMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/dynamic-evaluations", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dynamic-evaluations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/agent-maturity", selectedAgent?.id] });
    },
    onError: (error) => {
      console.error("Error submitting evaluation:", error);
    }
  });

  const createImprovementActionMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/improvement-actions", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/improvement-actions"] });
    }
  });

  const getMaturityLevelColor = (level: string) => {
    switch (level) {
      case "novice": return "text-blue-400 bg-blue-900/20";
      case "intermediate": return "text-yellow-400 bg-yellow-900/20";
      case "advanced": return "text-green-400 bg-green-900/20";
      case "expert": return "text-purple-400 bg-purple-900/20";
      default: return "text-gray-400 bg-gray-900/20";
    }
  };

  const getExperienceLevel = (points: number) => {
    if (points < 500) return { level: "novice", next: 500, progress: (points / 500) * 100 };
    if (points < 1500) return { level: "intermediate", next: 1500, progress: ((points - 500) / 1000) * 100 };
    if (points < 3000) return { level: "advanced", next: 3000, progress: ((points - 1500) / 1500) * 100 };
    return { level: "expert", next: points + 1000, progress: 100 };
  };

  const getMaturityLevelString = (currentLevel: any) => {
    // Handle both numeric and string maturity levels
    if (typeof currentLevel === 'number') {
      switch (currentLevel) {
        case 1:
        case 2: return "novice";
        case 3:
        case 4:
        case 5: return "intermediate";  // Level 5 should be intermediate to match Field Coordinator template
        case 6:
        case 7: return "advanced";
        case 8:
        case 9:
        case 10: return "expert";
        default: return "novice";
      }
    }
    return currentLevel || "novice";
  };

  const handleRunEvaluation = async (templateId: number) => {
    if (!selectedAgent) {
      console.log("No selected agent");
      return;
    }

    console.log("Running evaluation for agent:", selectedAgent.id, "template:", templateId);

    // Simulate running an evaluation
    const mockEvaluation = {
      agentId: selectedAgent.id,
      templateId,
      overallScore: (Math.random() * 20 + 80).toFixed(2), // Keep as string for Drizzle decimal schema
      criteriaScores: {
        "Response Accuracy": Math.round(Math.random() * 20 + 80),
        "Context Awareness": Math.round(Math.random() * 20 + 80),
        "Processing Speed": Math.round(Math.random() * 20 + 80)
      },
      feedback: "Automated evaluation completed successfully",
      recommendations: [
        "Consider additional training on edge cases",
        "Monitor performance with increased load"
      ],
      evaluatorType: "automated",
      evaluatorId: "system"
      // Remove nextEvaluationDue as it's optional and causing date parsing issues
    };

    try {
      console.log("Submitting evaluation:", mockEvaluation);
      const response = await createEvaluationMutation.mutateAsync(mockEvaluation);
      console.log("Evaluation submitted successfully:", response);
      
      // Show success message
      alert("Evaluation completed successfully!");
    } catch (error) {
      console.error("Error submitting evaluation:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      alert("Failed to submit evaluation. Please check console for details.");
    }
  };

  const filteredEvaluations = dynamicEvaluations.filter(evaluation => 
    selectedAgent ? evaluation.agentId === selectedAgent.id : true
  );

  const filteredFeedback = agentDataFeedback.filter(feedback => 
    selectedAgent ? feedback.agentId === selectedAgent.id : true
  );

  const filteredActions = improvementActions.filter(action => 
    selectedAgent ? action.agentId === selectedAgent.id : true
  );

  if (!selectedAgent) {
    return (
      <Card className="bg-dark-card border-dark-border">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">No agents available. Please add agents to use the evaluation system.</p>
        </CardContent>
      </Card>
    );
  }

  const experienceData = getExperienceLevel(agentMaturity?.experiencePoints || 0);

  return (
    <div className="space-y-6">
      {/* Agent Selection */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Users className="w-5 h-5 mr-2" />
            Select Agent for Evaluation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {agents.map((agent) => (
              <Button
                key={agent.id}
                variant={selectedAgent?.id === agent.id ? "default" : "outline"}
                onClick={() => setSelectedAgent(agent)}
                className={selectedAgent?.id === agent.id 
                  ? "bg-primary text-primary-foreground" 
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                {agent.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Maturity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Maturity Level</p>
                <Badge className={`mt-1 ${getMaturityLevelColor(getMaturityLevelString(agentMaturity?.currentLevel))}`}>
                  {getMaturityLevelString(agentMaturity?.currentLevel)}
                </Badge>
              </div>
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Experience Points</p>
                <p className="text-2xl font-bold text-white">
                  {agentMaturity?.experiencePoints || 0}
                </p>
                <Progress value={experienceData.progress} className="mt-2 h-2" />
              </div>
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Evaluations</p>
                <p className="text-2xl font-bold text-white">
                  {agentMaturity?.totalEvaluations || 0}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className="text-2xl font-bold text-green-400">
                  {parseFloat(agentMaturity?.avgScore || "0").toFixed(1)}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="evaluations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="evaluations">Dynamic Evaluations</TabsTrigger>
          <TabsTrigger value="feedback">Data Feedback</TabsTrigger>
          <TabsTrigger value="improvements">Improvement Actions</TabsTrigger>
          <TabsTrigger value="templates">Evaluation Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="evaluations" className="space-y-6">
          {/* Run New Evaluation */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Zap className="w-5 h-5 mr-2" />
                Run New Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  console.log("Evaluation templates:", evaluationTemplates);
                  console.log("Selected agent:", selectedAgent);
                  console.log("Agent maturity:", agentMaturity);
                  
                  const currentMaturityString = getMaturityLevelString(agentMaturity?.currentLevel);
                  
                  // Try to find exact matches first
                  let filteredTemplates = evaluationTemplates.filter(template => {
                    const agentTypeMatch = template.agentType === selectedAgent.type;
                    const maturityMatch = template.maturityLevel === currentMaturityString;
                    console.log("Filtering template:", template.name, "agentType match:", agentTypeMatch, "maturity match:", maturityMatch, "expected maturity:", currentMaturityString, "template maturity:", template.maturityLevel);
                    return agentTypeMatch && maturityMatch;
                  });
                  
                  // If no exact matches, use Universal templates that match maturity level
                  if (filteredTemplates.length === 0) {
                    console.log("No exact matches found, looking for Universal templates");
                    filteredTemplates = evaluationTemplates.filter(template => {
                      const isUniversal = template.agentType === "Universal";
                      const maturityMatch = template.maturityLevel === currentMaturityString;
                      console.log("Universal template check:", template.name, "isUniversal:", isUniversal, "maturity match:", maturityMatch);
                      return isUniversal && maturityMatch;
                    });
                  }
                  
                  // If still no matches, use any Universal template as last resort
                  if (filteredTemplates.length === 0) {
                    console.log("No maturity matches found, using any Universal template");
                    filteredTemplates = evaluationTemplates.filter(template => 
                      template.agentType === "Universal"
                    );
                  }
                  
                  console.log("Filtered templates:", filteredTemplates);
                  
                  if (filteredTemplates.length === 0) {
                    if (evaluationTemplates.length === 0) {
                      return <p className="text-gray-400">No evaluation templates available</p>;
                    } else {
                      return (
                        <div className="text-gray-400">
                          <p>No evaluation templates match this agent's type ({selectedAgent.type}) and maturity level ({getMaturityLevelString(agentMaturity?.currentLevel)})</p>
                          <p className="text-sm mt-2">Available templates:</p>
                          <ul className="text-sm">
                            {evaluationTemplates.slice(0, 3).map(t => (
                              <li key={t.id}>• {t.name} (Type: {t.agentType}, Level: {t.maturityLevel})</li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">For testing - all available templates:</p>
                            {evaluationTemplates.map((template) => (
                              <Button
                                key={template.id}
                                onClick={() => {
                                  console.log("Debug button clicked for template:", template.id, template.name);
                                  handleRunEvaluation(template.id || 0);
                                }}
                                disabled={createEvaluationMutation.isPending}
                                className="bg-gray-600 hover:bg-gray-500 mr-2 mb-2 text-xs"
                                size="sm"
                              >
                                <Calendar className="w-3 h-3 mr-1" />
                                {template.name} ({template.agentType}, {template.maturityLevel})
                              </Button>
                            ))}
                            
                            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded">
                              <p className="text-blue-400 text-sm font-medium">Agent Details:</p>
                              <p className="text-gray-300 text-xs">Type: {selectedAgent.type}</p>
                              <p className="text-gray-300 text-xs">Maturity: Level {agentMaturity?.currentLevel} = "{getMaturityLevelString(agentMaturity?.currentLevel)}"</p>
                              <p className="text-gray-300 text-xs">Experience: {agentMaturity?.experiencePoints} points</p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                  
                  return filteredTemplates.map((template) => {
                    console.log("Rendering button for template:", template);
                    return (
                      <Button
                        key={template.id}
                        onClick={() => {
                          console.log("Button clicked for template:", template.id);
                          handleRunEvaluation(template.id || 0);
                        }}
                        disabled={createEvaluationMutation.isPending}
                        className="bg-primary hover:bg-primary/80"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {template.name}
                      </Button>
                    );
                  });
                })()}
              </div>
            </CardContent>
          </Card>

          {/* Recent Evaluations */}
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Recent Evaluations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEvaluations.slice(0, 5).map((evaluation) => (
                  <div key={evaluation.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white font-medium">
                          Evaluation #{evaluation.id}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {evaluation.evaluatorType} • {new Date(evaluation.completedAt!).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={`${
                        parseFloat(evaluation.overallScore) >= 90 ? 'bg-green-500' :
                        parseFloat(evaluation.overallScore) >= 80 ? 'bg-yellow-500' :
                        'bg-red-500'
                      } text-white`}>
                        {evaluation.overallScore}%
                      </Badge>
                    </div>
                    
                    {evaluation.feedback && (
                      <p className="text-gray-300 text-sm mb-2">{evaluation.feedback}</p>
                    )}
                    
                    {evaluation.recommendations && Array.isArray(evaluation.recommendations) && (
                      <div className="flex flex-wrap gap-1">
                        {(evaluation.recommendations as string[]).map((rec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {rec}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Lightbulb className="w-5 h-5 mr-2" />
                Agent Data Feedback Loop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFeedback.map((feedback) => (
                  <div key={feedback.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Badge className="bg-blue-500 text-white mb-2">
                          {feedback.dataType}
                        </Badge>
                        <p className="text-gray-400 text-sm">
                          Created: {new Date(feedback.createdAt!).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={
                        feedback.status === 'applied' ? 'bg-green-500' :
                        feedback.status === 'processing' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }>
                        {feedback.status || 'N/A'}
                      </Badge>
                    </div>
                    
                    {feedback.insights && Array.isArray(feedback.insights) && (
                      <div className="mb-3">
                        <p className="text-white text-sm font-medium mb-1">Insights:</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {(feedback.insights as string[]).map((insight, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {feedback.actionItems && Array.isArray(feedback.actionItems) && (
                      <div>
                        <p className="text-white text-sm font-medium mb-1">Action Items:</p>
                        <ul className="text-gray-300 text-sm space-y-1">
                          {(feedback.actionItems as string[]).map((item, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="w-3 h-3 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvements" className="space-y-6">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Cog className="w-5 h-5 mr-2" />
                Improvement Actions Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActions.map((action) => (
                  <div key={action.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white font-medium">{action.title}</p>
                        <p className="text-gray-400 text-sm">{action.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          action.priority === 'critical' ? 'bg-red-500' :
                          action.priority === 'high' ? 'bg-orange-500' :
                          action.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }>
                          {action.priority}
                        </Badge>
                        <Badge className={
                          action.status === 'completed' ? 'bg-green-500' :
                          action.status === 'in_progress' ? 'bg-blue-500' :
                          'bg-gray-500'
                        }>
                          {action.status?.replace('_', ' ') || 'N/A'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-white text-sm font-medium mb-1">Type:</p>
                        <Badge variant="outline" className="text-xs">
                          {action.actionType?.replace('_', ' ') || 'N/A'}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium mb-1">Estimated Impact:</p>
                        <p className="text-green-400 font-medium">
                          +{action.estimatedImpact}% improvement
                        </p>
                      </div>
                    </div>
                    
                    {action.assignedTo && (
                      <div className="mt-3">
                        <p className="text-gray-400 text-sm">
                          Assigned to: <span className="text-white">{action.assignedTo}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BookOpen className="w-5 h-5 mr-2" />
                Evaluation Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {evaluationTemplates.map((template) => (
                  <div key={template.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="mb-3">
                      <p className="text-white font-medium">{template.name}</p>
                      <p className="text-gray-400 text-sm">{template.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getMaturityLevelColor(template.maturityLevel)}>
                        {template.maturityLevel}
                      </Badge>
                      <Badge variant="outline">
                        {template.agentType}
                      </Badge>
                    </div>
                    
                    {template.criteria && Array.isArray(template.criteria) && (
                      <div>
                        <p className="text-white text-sm font-medium mb-1">Criteria:</p>
                        <div className="flex flex-wrap gap-1">
                          {(template.criteria as { name: string; weight: number }[]).map((criterion, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {criterion.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
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