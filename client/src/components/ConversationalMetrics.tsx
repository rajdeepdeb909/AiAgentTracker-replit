import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Smartphone, Mic, Brain, Shield, TrendingUp, AlertTriangle } from "lucide-react";

export default function ConversationalMetrics() {
  const coreAgentFeatures = [
    {
      feature: "Natural Language Processing",
      agents: ["Customer Communication Hub", "Emergency Response Coordinator", "Plumbing Dispatch Coordinator"],
      averageScore: 94.2,
      trend: +2.1,
      status: "optimal"
    },
    {
      feature: "Context Awareness",
      agents: ["Customer Communication Hub", "HVAC System Diagnostics AI", "Quality Assurance Inspector"],
      averageScore: 89.7,
      trend: +5.3,
      status: "improving"
    },
    {
      feature: "Learning & Adaptation",
      agents: ["All Agents"],
      averageScore: 91.8,
      trend: +3.7,
      status: "optimal"
    },
    {
      feature: "Error Recovery",
      agents: ["Customer Communication Hub", "Emergency Response Coordinator"],
      averageScore: 87.4,
      trend: +1.2,
      status: "stable"
    },
    {
      feature: "Security & Compliance",
      agents: ["Electrical Safety Compliance Agent", "All Agents"],
      averageScore: 98.1,
      trend: +0.8,
      status: "excellent"
    },
    {
      feature: "Performance Monitoring",
      agents: ["All Agents"],
      averageScore: 95.6,
      trend: +2.9,
      status: "optimal"
    }
  ];

  const communicationChannels = [
    {
      channel: "Email",
      primaryAgent: "Customer Communication Hub",
      dailyVolume: 847,
      responseTime: "2.3 min",
      satisfactionRate: 92.8,
      trend: +4.2,
      automationRate: 78.5
    },
    {
      channel: "SMS/Text",
      primaryAgent: "Customer Communication Hub",
      dailyVolume: 542,
      responseTime: "45 sec",
      satisfactionRate: 94.1,
      trend: +6.1,
      automationRate: 85.2
    },
    {
      channel: "Emergency Calls",
      primaryAgent: "Emergency Response Coordinator",
      dailyVolume: 38,
      responseTime: "18 sec",
      satisfactionRate: 97.8,
      trend: +1.4,
      automationRate: 92.3
    },
    {
      channel: "Appointment Confirmations",
      primaryAgent: "Plumbing Dispatch Coordinator",
      dailyVolume: 156,
      responseTime: "1.1 min",
      satisfactionRate: 89.4,
      trend: +2.8,
      automationRate: 89.7
    }
  ];

  const conversationalAgents = [
    {
      name: "Customer Communication Hub",
      type: "Primary Conversational AI",
      channels: ["Email", "SMS", "Chat", "Voice"],
      dailyInteractions: 420,
      avgResponseTime: "1.8 min",
      contextRetention: "95.2%",
      languageCapabilities: ["English", "Spanish", "Technical"],
      emotionalIntelligence: 88.4,
      escalationRate: 4.2,
      customerSatisfaction: 91.5
    },
    {
      name: "Emergency Response Coordinator", 
      type: "Critical Communications AI",
      channels: ["Voice", "SMS", "Dispatch"],
      dailyInteractions: 38,
      avgResponseTime: "18 sec",
      contextRetention: "98.7%",
      languageCapabilities: ["English", "Emergency Protocols"],
      emotionalIntelligence: 94.8,
      escalationRate: 2.1,
      customerSatisfaction: 97.8
    },
    {
      name: "Plumbing Dispatch Coordinator",
      type: "Service Communications AI",
      channels: ["SMS", "Email", "Voice"],
      dailyInteractions: 180,
      avgResponseTime: "52 sec",
      contextRetention: "92.8%",
      languageCapabilities: ["English", "Technical Plumbing"],
      emotionalIntelligence: 85.7,
      escalationRate: 6.8,
      customerSatisfaction: 92.1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500/20 text-green-400';
      case 'optimal': return 'bg-blue-500/20 text-blue-400';
      case 'improving': return 'bg-purple-500/20 text-purple-400';
      case 'stable': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms/text': return <Smartphone className="w-4 h-4" />;
      case 'emergency calls': return <AlertTriangle className="w-4 h-4" />;
      case 'appointment confirmations': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Core AI Agent Features */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-400" />
            Core AI Agent Features Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreAgentFeatures.map((feature, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{feature.feature}</h4>
                  <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Performance</span>
                    <span>{feature.averageScore}%</span>
                  </div>
                  <Progress value={feature.averageScore} className="h-2" />
                </div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
                  <span className="text-green-400">+{feature.trend}%</span>
                  <span className="text-gray-400 ml-1">this week</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {feature.agents.length > 3 ? "All Agents" : feature.agents.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Channels Performance */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-green-400" />
            Multi-Channel Communication Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communicationChannels.map((channel, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center mb-3">
                  {getChannelIcon(channel.channel)}
                  <h4 className="text-white font-medium ml-2">{channel.channel}</h4>
                  <Badge className="ml-auto bg-blue-500/20 text-blue-400">
                    {channel.automationRate}% Auto
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Daily Volume</p>
                    <p className="text-white font-semibold">{channel.dailyVolume}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Response Time</p>
                    <p className="text-white font-semibold">{channel.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Satisfaction</p>
                    <p className="text-white font-semibold">{channel.satisfactionRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Trend</p>
                    <div className="flex items-center">
                      <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                      <span className="text-green-400 font-semibold">+{channel.trend}%</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-3">
                  Handled by: {channel.primaryAgent}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Conversational Agents Detail */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Mic className="w-5 h-5 mr-2 text-purple-400" />
            Conversational AI Agents Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {conversationalAgents.map((agent, index) => (
              <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-white font-medium">{agent.name}</h4>
                    <p className="text-sm text-gray-400">{agent.type}</p>
                    <div className="flex gap-1 mt-2">
                      {agent.channels.map((channel, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{agent.customerSatisfaction}%</p>
                    <p className="text-xs text-gray-400">Customer Satisfaction</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Daily Interactions</p>
                    <p className="text-white font-semibold">{agent.dailyInteractions}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Avg Response Time</p>
                    <p className="text-white font-semibold">{agent.avgResponseTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Context Retention</p>
                    <p className="text-white font-semibold">{agent.contextRetention}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Escalation Rate</p>
                    <p className="text-white font-semibold">{agent.escalationRate}%</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Emotional Intelligence</span>
                    <span>{agent.emotionalIntelligence}%</span>
                  </div>
                  <Progress value={agent.emotionalIntelligence} className="h-2" />
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  <span>Languages: {agent.languageCapabilities.join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security & Compliance */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2 text-orange-400" />
            Security & Compliance Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-400">100%</p>
              <p className="text-sm text-gray-400">Data Encryption</p>
              <Badge className="mt-2 bg-green-500/20 text-green-400">Compliant</Badge>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-400">98.7%</p>
              <p className="text-sm text-gray-400">Privacy Protection</p>
              <Badge className="mt-2 bg-green-500/20 text-green-400">Excellent</Badge>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-400">24/7</p>
              <p className="text-sm text-gray-400">Threat Monitoring</p>
              <Badge className="mt-2 bg-blue-500/20 text-blue-400">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}