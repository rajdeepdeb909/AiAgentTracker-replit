import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Calendar, Star, CheckCircle, AlertTriangle, XCircle, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Sidebar";
import EvaluationSection from "@/components/EvaluationSection";
import DynamicEvaluationSystem from "@/components/DynamicEvaluationSystem";
import type { Evaluation, Feedback, Agent } from "@shared/schema";

export default function Evaluations() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: agents = [], isLoading: agentsLoading } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  const { data: evaluations = [], isLoading: evaluationsLoading } = useQuery<Evaluation[]>({
    queryKey: ["/api/evaluations"],
  });

  const { data: feedback = [], isLoading: feedbackLoading } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
  });

  if (agentsLoading || evaluationsLoading || feedbackLoading) {
    return (
      <div className="flex min-h-screen bg-dark">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const getAgentName = (agentId: number) => {
    const names: { [key: number]: string } = {
      1: "Customer Support Agent",
      2: "Data Analysis Agent",
      3: "Code Review Agent",
      4: "Marketing Content Agent",
      5: "Email Response Agent",
      6: "Sales Assistant Agent",
    };
    return names[agentId] || `Agent ${agentId}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { color: "bg-green-500", icon: CheckCircle };
    if (score >= 75) return { color: "bg-yellow-500", icon: AlertTriangle };
    return { color: "bg-red-500", icon: XCircle };
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  const formatTimeAgo = (date: Date | string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const avgEvaluationScore = evaluations.length > 0 
    ? evaluations.reduce((sum, evaluation) => sum + parseFloat(evaluation.score), 0) / evaluations.length 
    : 0;

  const avgFeedbackRating = feedback.length > 0
    ? feedback.reduce((sum, fb) => sum + fb.rating, 0) / feedback.length
    : 0;

  return (
    <div className="flex min-h-screen bg-dark text-gray-200">
      <Sidebar />
      
      <main className="flex-1 overflow-x-hidden">
        <header className="bg-dark-card border-b border-dark-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Evaluations & Feedback</h1>
              <p className="text-gray-400 mt-1">Monitor agent performance and user satisfaction</p>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/80"
              onClick={() => {
                // Get first agent if available
                if (agents.length > 0) {
                  const firstAgent = agents[0];
                  // Navigate to dynamic evaluation system
                  const dynamicTab = document.querySelector('[value="dynamic"]') as HTMLElement;
                  if (dynamicTab) {
                    dynamicTab.click();
                  }
                }
              }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Evaluation
            </Button>
          </div>
        </header>

        <div className="p-6">
          <Tabs defaultValue="dynamic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="dynamic" className="flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                Dynamic Evaluation System
              </TabsTrigger>
              <TabsTrigger value="legacy" className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Legacy Evaluations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dynamic">
              <DynamicEvaluationSystem agents={agents} />
            </TabsContent>

            <TabsContent value="legacy" className="space-y-6">
              {/* Evaluation Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-dark-card border-dark-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Evaluations</p>
                        <p className="text-3xl font-bold text-white">{evaluations.length}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">Completed this month</p>
                  </CardContent>
                </Card>

                <Card className="bg-dark-card border-dark-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Avg Score</p>
                        <p className={`text-3xl font-bold ${getScoreColor(avgEvaluationScore)}`}>
                          {avgEvaluationScore.toFixed(1)}%
                        </p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-yellow-400" />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">Across all agents</p>
                  </CardContent>
                </Card>

                <Card className="bg-dark-card border-dark-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">User Rating</p>
                        <div className="flex items-center">
                          <p className="text-3xl font-bold text-white mr-2">{avgFeedbackRating.toFixed(1)}</p>
                          <div className="flex">
                            {renderStars(Math.round(avgFeedbackRating))}
                          </div>
                        </div>
                      </div>
                      <Star className="w-8 h-8 text-yellow-400" />
                    </div>
                    <p className="text-gray-400 text-sm mt-2">{feedback.length} total reviews</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Evaluations */}
              <EvaluationSection />

              {/* Detailed Evaluation History */}
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="text-white">Detailed Evaluation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {evaluations.map((evaluation) => {
                      const score = parseFloat(evaluation.score);
                      const scoreBadge = getScoreBadge(score);
                      const ScoreIcon = scoreBadge.icon;
                      
                      return (
                        <div key={evaluation.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 ${scoreBadge.color} rounded-full flex items-center justify-center mr-4`}>
                              <ScoreIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{getAgentName(evaluation.agentId)}</p>
                              <p className="text-gray-400 text-sm">
                                Completed {formatTimeAgo(evaluation.completedAt!)}
                              </p>
                              {evaluation.feedback && (
                                <p className="text-gray-300 text-sm mt-1 italic">"{evaluation.feedback}"</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${scoreBadge.color} text-white mb-2`}>
                              {score}% Score
                            </Badge>
                            <div className="w-32 h-2 bg-gray-700 rounded-full">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  score >= 90 ? 'bg-green-500' : 
                                  score >= 75 ? 'bg-yellow-500' : 
                                  score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${score}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* User Feedback Details */}
              <Card className="bg-dark-card border-dark-border">
                <CardHeader>
                  <CardTitle className="text-white">User Feedback Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {feedback.map((fb) => (
                      <div key={fb.id} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-white font-medium">{getAgentName(fb.agentId)}</p>
                            <p className="text-gray-400 text-sm">User ID: {fb.userId}</p>
                          </div>
                          <div className="flex items-center">
                            {renderStars(fb.rating)}
                            <span className="text-white ml-2 font-medium">{fb.rating}/5</span>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-2">"{fb.comment}"</p>
                        <p className="text-gray-500 text-xs">
                          Submitted {formatTimeAgo(fb.createdAt!)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}