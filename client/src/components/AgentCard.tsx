import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Target, TrendingUp, MessageSquare, Mail, Smartphone, Brain, Eye, Lock, Zap } from "lucide-react";
import type { Agent } from "@shared/schema";
import CommunicationInterface from "./CommunicationInterface";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const [showCommunicationInterface, setShowCommunicationInterface] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'training': return 'status-training';
      case 'maintenance': return 'status-maintenance';
      case 'error': return 'status-error';
      default: return 'status-active';
    }
  };

  const formatNumber = (num: number | string) => {
    const value = typeof num === 'string' ? parseFloat(num) : num;
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const performancePercentage = parseFloat(agent.performance);
  
  // Generate home services-specific roadmap based on agent type
  const getAgentRoadmap = (agentType: string, performance: number) => {
    const baseRoadmaps: Record<string, { milestones: Array<{ title: string; completed: boolean; target: string }> }> = {
      "Field Coordinator": {
        milestones: [
          { title: "Emergency Response Protocol", completed: true, target: "Q1 2024" },
          { title: "Multi-Trade Coordination", completed: true, target: "Q2 2024" },
          { title: "Predictive Scheduling", completed: performance > 90, target: "Q3 2024" },
          { title: "AI-Powered Resource Allocation", completed: false, target: "Q4 2024" }
        ]
      },
      "Diagnostics AI": {
        milestones: [
          { title: "Remote System Analysis", completed: true, target: "Q1 2024" },
          { title: "Predictive Maintenance", completed: true, target: "Q2 2024" },
          { title: "Energy Efficiency Optimization", completed: performance > 95, target: "Q3 2024" },
          { title: "IoT Integration Expansion", completed: false, target: "Q4 2024" }
        ]
      },
      "Compliance AI": {
        milestones: [
          { title: "Safety Protocol Automation", completed: true, target: "Q1 2024" },
          { title: "Permit Management Integration", completed: true, target: "Q2 2024" },
          { title: "Real-time Code Compliance", completed: performance > 96, target: "Q3 2024" },
          { title: "Regulatory Update Automation", completed: false, target: "Q4 2024" }
        ]
      },
      "Customer Service AI": {
        milestones: [
          { title: "Multi-Channel Communication", completed: true, target: "Q1 2024" },
          { title: "Intelligent Appointment Scheduling", completed: true, target: "Q2 2024" },
          { title: "Proactive Service Reminders", completed: performance > 85, target: "Q3 2024" },
          { title: "Sentiment Analysis Integration", completed: false, target: "Q4 2024" }
        ]
      },
      "Logistics AI": {
        milestones: [
          { title: "Basic Route Optimization", completed: true, target: "Q1 2024" },
          { title: "Real-time Traffic Integration", completed: true, target: "Q2 2024" },
          { title: "Dynamic Re-routing", completed: performance > 93, target: "Q3 2024" },
          { title: "Fuel Efficiency Optimization", completed: false, target: "Q4 2024" }
        ]
      },
      "Emergency AI": {
        milestones: [
          { title: "Priority Classification", completed: true, target: "Q1 2024" },
          { title: "Rapid Response Coordination", completed: true, target: "Q2 2024" },
          { title: "Resource Allocation Optimization", completed: performance > 95, target: "Q3 2024" },
          { title: "Predictive Emergency Detection", completed: false, target: "Q4 2024" }
        ]
      }
    };
    
    // Default roadmap for other types
    return baseRoadmaps[agentType] || {
      milestones: [
        { title: "Core Functionality", completed: true, target: "Q1 2024" },
        { title: "Performance Optimization", completed: performance > 85, target: "Q2 2024" },
        { title: "Advanced Features", completed: performance > 90, target: "Q3 2024" },
        { title: "Next-Gen Capabilities", completed: false, target: "Q4 2024" }
      ]
    };
  };

  const roadmap = getAgentRoadmap(agent.type, performancePercentage);
  const completedMilestones = roadmap.milestones.filter(m => m.completed).length;
  const roadmapProgress = (completedMilestones / roadmap.milestones.length) * 100;

  // Define core AI features for each agent
  const getCoreFeatures = (agentName: string) => {
    const conversationalAgents = ["Customer Communication Hub", "Emergency Response Coordinator", "Plumbing Dispatch Coordinator"];
    const isConversational = conversationalAgents.includes(agentName);
    
    return {
      conversational: isConversational,
      learning: true, // All agents have learning capability
      contextAware: isConversational || agentName.includes("Diagnostics") || agentName.includes("Quality"),
      multiModal: isConversational,
      errorRecovery: isConversational || agentName.includes("Emergency"),
      security: true, // All agents have security features
      channels: isConversational ? getCommChannels(agentName) : []
    };
  };

  const getCommChannels = (agentName: string) => {
    switch (agentName) {
      case "Customer Communication Hub":
        return ["Email", "SMS", "Chat", "Voice"];
      case "Emergency Response Coordinator":
        return ["Voice", "SMS", "Dispatch"];
      case "Plumbing Dispatch Coordinator":
        return ["SMS", "Email", "Voice"];
      default:
        return [];
    }
  };

  const coreFeatures = getCoreFeatures(agent.name);

  return (
    <Card className="agent-card bg-dark-card border-dark-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-white">{agent.name}</CardTitle>
            <p className="text-gray-400 text-sm mt-1">{agent.type}</p>
          </div>
          <Badge className={`status-badge ${getStatusColor(agent.status)}`}>
            {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{agent.accuracy}%</p>
            <p className="text-xs text-gray-400">Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{agent.responseTime}s</p>
            <p className="text-xs text-gray-400">Response Time</p>
          </div>
        </div>
        
        {/* Core AI Features */}
        {coreFeatures.conversational && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-blue-400 font-medium text-sm">Conversational AI</span>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-xs bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
                onClick={() => setShowCommunicationInterface(true)}
              >
                Open Interface
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {coreFeatures.channels.map((channel, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="text-xs bg-blue-500/10 border-blue-500/20 text-blue-300 cursor-help" 
                  title={`Agent supports ${channel} communication`}
                >
                  {channel === "Email" && <Mail className="w-3 h-3 mr-1" />}
                  {channel === "SMS" && <Smartphone className="w-3 h-3 mr-1" />}
                  {channel === "Chat" && <MessageSquare className="w-3 h-3 mr-1" />}
                  {channel === "Voice" && <Brain className="w-3 h-3 mr-1" />}
                  {channel === "Dispatch" && <Zap className="w-3 h-3 mr-1" />}
                  {channel}
                </Badge>
              ))}
            </div>
            <div className="flex items-center mt-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-400">
                {coreFeatures.channels.length} active communication channels
              </span>
            </div>
          </div>
        )}

        {/* Core Features Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className={`text-center p-2 rounded ${coreFeatures.learning ? 'bg-green-500/10 border border-green-500/20' : 'bg-gray-700/50'}`}>
            <Brain className={`w-4 h-4 mx-auto mb-1 ${coreFeatures.learning ? 'text-green-400' : 'text-gray-500'}`} />
            <p className="text-xs text-gray-400">Learning</p>
          </div>
          <div className={`text-center p-2 rounded ${coreFeatures.contextAware ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-gray-700/50'}`}>
            <Eye className={`w-4 h-4 mx-auto mb-1 ${coreFeatures.contextAware ? 'text-purple-400' : 'text-gray-500'}`} />
            <p className="text-xs text-gray-400">Context</p>
          </div>
          <div className={`text-center p-2 rounded ${coreFeatures.security ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-gray-700/50'}`}>
            <Lock className={`w-4 h-4 mx-auto mb-1 ${coreFeatures.security ? 'text-orange-400' : 'text-gray-500'}`} />
            <p className="text-xs text-gray-400">Security</p>
          </div>
        </div>

        {/* Performance */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Performance
            </span>
            <span className="text-white">{agent.performance}%</span>
          </div>
          <Progress value={performancePercentage} className="h-2" />
        </div>
        
        {/* Roadmap Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400 flex items-center">
              <Target className="w-4 h-4 mr-1" />
              Roadmap Progress
            </span>
            <span className="text-white">{completedMilestones}/{roadmap.milestones.length}</span>
          </div>
          <Progress value={roadmapProgress} className="h-2" />
          
          {/* Recent Milestone */}
          <div className="mt-2 text-xs">
            {roadmap.milestones.slice(0, 2).map((milestone, index) => (
              <div key={index} className="flex items-center text-gray-400 mb-1">
                {milestone.completed ? (
                  <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                ) : (
                  <Clock className="w-3 h-3 mr-2 text-yellow-500" />
                )}
                <span className="truncate">{milestone.title}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Financial Metrics */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-gray-700/50 p-2 rounded text-center">
            <p className="text-white font-medium">{formatNumber(agent.dailyInteractions)}</p>
            <p className="text-gray-400">Daily Tasks</p>
          </div>
          <div className="bg-gray-700/50 p-2 rounded text-center">
            <p className="text-white font-medium">${agent.monthlyCost}</p>
            <p className="text-gray-400">Monthly Cost</p>
          </div>
          <div className="bg-gray-700/50 p-2 rounded text-center">
            <p className="text-white font-medium">${formatNumber(agent.revenueImpact)}</p>
            <p className="text-gray-400">Revenue Impact</p>
          </div>
        </div>
      </CardContent>
      
      {/* Communication Interface Modal */}
      {showCommunicationInterface && (
        <CommunicationInterface
          agentName={agent.name}
          channels={coreFeatures.channels}
          onClose={() => setShowCommunicationInterface(false)}
        />
      )}
    </Card>
  );
}
