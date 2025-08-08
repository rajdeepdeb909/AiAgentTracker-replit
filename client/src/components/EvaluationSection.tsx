import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import type { Evaluation, Feedback } from "@shared/schema";

export default function EvaluationSection() {
  const { data: evaluations = [] } = useQuery<Evaluation[]>({
    queryKey: ["/api/evaluations"],
  });

  const { data: feedback = [] } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
  });

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    return "text-red-400";
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

  // Mock agent names for display since we don't have joins
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Evaluations</h3>
        <div className="space-y-4">
          {evaluations.slice(0, 3).map((evaluation) => {
            const score = parseFloat(evaluation.score);
            return (
              <div key={evaluation.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">{getAgentName(evaluation.agentId)}</p>
                  <p className="text-gray-400 text-sm">
                    Evaluation completed {formatTimeAgo(evaluation.completedAt!)}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-2 bg-gray-700 rounded-full mr-3">
                    <div 
                      className="h-2 bg-green-500 rounded-full transition-all duration-500" 
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                  <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
        <h3 className="text-xl font-semibold text-white mb-4">User Feedback</h3>
        <div className="space-y-4">
          {feedback.slice(0, 3).map((fb) => (
            <div key={fb.id} className="p-4 bg-gray-800 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <p className="text-white font-medium">{getAgentName(fb.agentId)}</p>
                <div className="flex">
                  {renderStars(fb.rating)}
                </div>
              </div>
              <p className="text-gray-400 text-sm">"{fb.comment}"</p>
              <p className="text-gray-500 text-xs mt-2">
                - User ID: {fb.userId}, {formatTimeAgo(fb.createdAt!)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
