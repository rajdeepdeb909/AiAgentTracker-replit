import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentTutorials from "@/components/AgentTutorialsFixed";
import AgentInteractionMindmap from "@/components/AgentInteractionMindmap";
import PartsWorkflowDiagram from "@/components/PartsWorkflowDiagram";
import { AgentDailyPerformance } from "@/components/AgentDailyPerformance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Network, BookOpen, Package, Home, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

export default function AgentRoster() {
  const { user, hasPermission } = useAuth();

  // Check if user has permission to view agents
  const canViewAgents = hasPermission('view_agents');
  
  console.log('AgentRoster - User:', user?.username, 'canViewAgents:', canViewAgents);

  // Fetch agents for the daily performance selector (only if user has permission)
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(res => res.json()),
    enabled: canViewAgents, // Only fetch if user has permission
  });

  // Define agent importance ranking (1 = highest priority)
  const agentPriority: { [key: string]: number } = {
    "Customer Communication Hub": 1, // Primary customer interface
    "Emergency Response Coordinator": 2, // Critical safety and emergency
    "Advanced Scheduling Agent": 3, // Core scheduling operations
    "Route Optimization Engine": 4, // Efficiency and cost optimization
    "Parts Prediction Engine": 5, // Critical for inventory management
    "Technician Interaction Hub": 6, // Field operations support
    "Technician Recruiting Agent": 7, // Critical talent acquisition
    "Technician Training & Development Agent": 8, // Essential workforce development
    "Quality Assurance Inspector": 9, // Service quality control
    "Outstanding Orders Manager": 10, // Order completion tracking
    "Plumbing Dispatch Coordinator": 11, // Specialized dispatch
    "Performance Analytics AI": 12, // Business intelligence
    "Regional Performance Monitor": 13, // Geographic performance
    "Parts Ordering Specialist": 14, // Parts procurement
    "Inventory Management Assistant": 15, // Inventory control
    "Maintenance Scheduler Pro": 16, // Preventive maintenance
    "D2C Marketing Intelligence Agent": 17, // Customer acquisition
    "B2B Relationship Manager Agent": 18, // Business partnerships
    "Geographic Performance Marketing Agent": 19, // Marketing optimization
    "Electrical Safety Compliance Agent": 20, // Safety compliance
    "HVAC System Diagnostics AI": 21, // Specialized diagnostics
    "Pricing & Estimation Specialist": 22, // Pricing strategy
    "Performance Intelligence Agent": 23, // Performance insights
  };

  // Sort agents by importance (high to low priority)
  const sortedAgents = [...agents].sort((a, b) => {
    const priorityA = agentPriority[a.name] || 999;
    const priorityB = agentPriority[b.name] || 999;
    return priorityA - priorityB;
  });

  // Default to highest priority agent (Customer Communication Hub)
  const highestPriorityAgent = sortedAgents.find(agent => agent.name === "Customer Communication Hub");
  const [selectedAgentId, setSelectedAgentId] = useState<number>(
    highestPriorityAgent?.id || sortedAgents[0]?.id || 1
  );

  const selectedAgent = agents.find((agent: any) => agent.id === selectedAgentId);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-dark-bg text-white">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden pt-16 lg:pt-0">
          <div className="p-6 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-dark-bg text-white">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden pt-16 lg:pt-0">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Access Denied Check */}
            {!canViewAgents ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold text-white">AI Agent Training Center</h1>
                </div>
                
                <Alert className="bg-red-500/10 border-red-500/20 text-red-400">
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Access Denied: You don't have permission to view AI agents. Contact your administrator to request access.
                  </AlertDescription>
                </Alert>
                
                <div className="bg-dark-card border-dark-border rounded-lg p-6">
                  <h3 className="text-white font-medium mb-3">Available Actions</h3>
                  <p className="text-gray-400 mb-4">You can navigate to other sections you have access to:</p>
                  <div className="flex flex-wrap gap-3">
                    {hasPermission('view_dashboard') && (
                      <Link href="/">
                        <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600">
                          <Home className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                    {hasPermission('view_performance_metrics') && (
                      <Link href="/performance">
                        <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white border-green-600">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Performance
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Normal content when user has access
              <div className="space-y-6">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">AI Agent Training Center</h1>
            <p className="text-gray-400 mt-2">
              Comprehensive tutorials, demonstrations, and interaction maps for all {agents.length} home services AI agents
            </p>
          </div>
          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="tutorials" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="tutorials" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Agent Tutorials
            </TabsTrigger>
            <TabsTrigger value="interactions" className="flex items-center">
              <Network className="w-4 h-4 mr-2" />
              Interaction Network
            </TabsTrigger>
            <TabsTrigger value="parts-workflow" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Parts Workflow
            </TabsTrigger>
            <TabsTrigger value="daily-performance" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Daily Performance
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              System Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tutorials">
            <AgentTutorials />
          </TabsContent>

          <TabsContent value="interactions">
            <AgentInteractionMindmap />
          </TabsContent>

          <TabsContent value="parts-workflow">
            <PartsWorkflowDiagram />
          </TabsContent>

          <TabsContent value="daily-performance" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Agent Daily Performance Tracking</h2>
                <p className="text-gray-400">Real-time daily and intra-day performance monitoring with self-evaluation capabilities</p>
              </div>
              <div className="w-64">
                <Select 
                  value={selectedAgentId.toString()} 
                  onValueChange={(value) => setSelectedAgentId(parseInt(value))}
                >
                  <SelectTrigger className="bg-dark-card border-gray-700 text-white">
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent 
                    className="bg-dark-card border-gray-700 max-h-[300px] overflow-y-auto" 
                    position="popper"
                    sideOffset={5}
                    style={{ zIndex: 9999 }}
                  >
                    {sortedAgents.map((agent: any) => {
                      const priority = agentPriority[agent.name];
                      const priorityLabel = priority <= 5 ? "🔥 High" : priority <= 10 ? "⚡ Medium" : "📊 Standard";
                      return (
                        <SelectItem key={agent.id} value={agent.id.toString()}>
                          <div className="flex items-center justify-between w-full">
                            <span>{agent.name}</span>
                            <span className="text-xs text-gray-400 ml-2">{priorityLabel}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {selectedAgent && (
              <AgentDailyPerformance 
                agentId={selectedAgentId} 
                agentName={selectedAgent.name} 
              />
            )}
          </TabsContent>

          <TabsContent value="overview">
            <Card className="bg-dark-card border-dark-border">
              <CardHeader>
                <CardTitle className="text-white">Complete AI Agent Ecosystem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Core Operations */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h3 className="text-blue-400 font-medium mb-3">Core Operations (5 Agents)</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Advanced Scheduling Agent</li>
                      <li>• Customer Communication Hub</li>
                      <li>• Technician Interaction Hub</li>
                      <li>• Outstanding Orders Manager</li>
                      <li>• Emergency Response Coordinator</li>
                    </ul>
                  </div>

                  {/* Marketing & Customer Acquisition */}
                  <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                    <h3 className="text-pink-400 font-medium mb-3">Marketing & Acquisition (3 Agents)</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• D2C Marketing Intelligence Agent</li>
                      <li>• B2B Relationship Manager Agent</li>
                      <li>• Geographic Performance Marketing Agent</li>
                    </ul>
                  </div>

                  {/* Logistics & Optimization */}
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h3 className="text-green-400 font-medium mb-3">Logistics & Optimization (3 Agents)</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Route Optimization Engine</li>
                      <li>• Regional Performance Monitor</li>
                      <li>• Maintenance Scheduler Pro</li>
                    </ul>
                  </div>

                  {/* Parts & Inventory */}
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <h3 className="text-purple-400 font-medium mb-3">Parts & Inventory (4 Agents)</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Parts Prediction Engine</li>
                      <li>• Inventory Management Assistant</li>
                      <li>• Parts Ordering Specialist</li>
                      <li>• HVAC System Diagnostics AI</li>
                    </ul>
                  </div>

                  {/* Quality & Compliance */}
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <h3 className="text-orange-400 font-medium mb-3">Quality & Compliance (2 Agents)</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Quality Assurance Inspector</li>
                      <li>• Electrical Safety Compliance Agent</li>
                    </ul>
                  </div>

                  {/* Analytics & Intelligence */}
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h3 className="text-red-400 font-medium mb-3">Analytics & Intelligence (2 Agents)</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Performance Analytics AI</li>
                      <li>• Pricing & Estimation Specialist</li>
                    </ul>
                  </div>

                  {/* Specialized Services */}
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <h3 className="text-cyan-400 font-medium mb-3">Specialized Services (2 Agents)</h3>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Plumbing Dispatch Coordinator</li>
                      <li>• Performance Intelligence Agent</li>
                    </ul>
                  </div>
                </div>

                {/* System Architecture */}
                <div className="space-y-4">
                  <h3 className="text-white font-medium text-lg">System Architecture Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-gray-300 font-medium">Core AI Features (All Agents)</h4>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span>Conversational Interface: Natural language processing</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                          <span>Learning & Adaptation: Continuous improvement</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                          <span>Context Awareness: Situational understanding</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                          <span>Multi-modal Communication: Email, SMS, Voice, Chat</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                          <span>Error Handling & Recovery: Graceful failure management</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                          <span>Performance Monitoring: Real-time health checks</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                          <span>Security & Compliance: Data protection</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-gray-300 font-medium">Communication Channels</h4>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div>
                          <span className="text-white font-medium">Primary Conversational Agents:</span>
                          <ul className="mt-1 ml-4">
                            <li>• Customer Communication Hub (Email, SMS, Chat, Voice)</li>
                            <li>• Emergency Response Coordinator (Voice, SMS, Dispatch)</li>
                            <li>• Plumbing Dispatch Coordinator (SMS, Email, Voice)</li>
                          </ul>
                        </div>
                        <div>
                          <span className="text-white font-medium">Integration Points:</span>
                          <ul className="mt-1 ml-4">
                            <li>• Real-time API connections between all agents</li>
                            <li>• Shared data repository with role-based access</li>
                            <li>• Event-driven triggers for automatic workflows</li>
                            <li>• Machine learning feedback loops for improvement</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">92.4%</p>
                    <p className="text-sm text-gray-400">Overall Coverage</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">21</p>
                    <p className="text-sm text-gray-400">AI Agents</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-400">9</p>
                    <p className="text-sm text-gray-400">Operation Areas</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-400">24/7</p>
                    <p className="text-sm text-gray-400">Availability</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h4 className="text-yellow-400 font-medium mb-2">Marketing & Customer Acquisition</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    Complete AI agent ecosystem covering every aspect of home services business operations from customer acquisition through service delivery. Our 21 specialized agents handle D2C and B2B marketing, geographic performance optimization, scheduling, routing, parts management, quality assurance, and performance analytics.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• <strong>D2C Marketing:</strong> SEO optimization, LLM recommendation visibility, digital presence management</li>
                    <li>• <strong>B2B Relationship Management:</strong> Client relationship tracking, territory performance monitoring</li>
                    <li>• <strong>Geographic Performance Marketing:</strong> Area-specific performance analysis, marketing ROI optimization</li>
                    <li>• <strong>Performance-Based Growth:</strong> Territory expansion based on service quality, client retention optimization</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}