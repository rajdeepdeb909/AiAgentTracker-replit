import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Monitor, 
  Users, 
  TrendingUp, 
  Share2, 
  Database, 
  Zap, 
  Target,
  BarChart3,
  Network,
  Brain,
  ArrowRight,
  ArrowLeft,
  Clock,
  Star,
  AlertTriangle
} from 'lucide-react';

interface CrossSystemUsageData {
  technicianId: string;
  name: string;
  managementPlatformUsage: {
    totalInteractions: number;
    categoryUsage: { [key: string]: number };
    lastActiveTime: string;
  };
  techHubUsage: {
    totalInteractions: number;
    categoryUsage: { [key: string]: number };
    lastActiveTime: string;
  };
  app1099Usage: {
    totalInteractions: number;
    categoryUsage: { [key: string]: number };
    lastActiveTime: string;
  };
  crowdsourcedBenefits: {
    sharedSolutions: number;
    receivedRecommendations: number;
    contributedData: number;
  };
}

const mockCrossSystemData: CrossSystemUsageData[] = [
  {
    technicianId: 'CSKWARC',
    name: 'Chris Skwarc',
    managementPlatformUsage: {
      totalInteractions: 47,
      categoryUsage: { service: 12, parts: 8, schedule: 15, technical: 7, admin: 5 },
      lastActiveTime: '2 hours ago'
    },
    techHubUsage: {
      totalInteractions: 156,
      categoryUsage: { service: 45, parts: 32, schedule: 38, technical: 28, admin: 13 },
      lastActiveTime: '15 minutes ago'
    },
    app1099Usage: {
      totalInteractions: 89,
      categoryUsage: { service: 23, parts: 18, schedule: 24, technical: 16, admin: 8 },
      lastActiveTime: '1 hour ago'
    },
    crowdsourcedBenefits: {
      sharedSolutions: 12,
      receivedRecommendations: 34,
      contributedData: 28
    }
  },
  {
    technicianId: 'DGEIGE',
    name: 'David Geiger',
    managementPlatformUsage: {
      totalInteractions: 23,
      categoryUsage: { service: 6, parts: 4, schedule: 8, technical: 3, admin: 2 },
      lastActiveTime: '4 hours ago'
    },
    techHubUsage: {
      totalInteractions: 198,
      categoryUsage: { service: 52, parts: 41, schedule: 48, technical: 35, admin: 22 },
      lastActiveTime: '8 minutes ago'
    },
    app1099Usage: {
      totalInteractions: 134,
      categoryUsage: { service: 34, parts: 28, schedule: 36, technical: 24, admin: 12 },
      lastActiveTime: '25 minutes ago'
    },
    crowdsourcedBenefits: {
      sharedSolutions: 18,
      receivedRecommendations: 45,
      contributedData: 41
    }
  }
];

export default function MagikButtonCrossSystemMonitoring() {
  const [, setLocation] = useLocation();
  const [selectedTechnician, setSelectedTechnician] = useState<CrossSystemUsageData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const totalInteractions = mockCrossSystemData.reduce((sum, tech) => 
    sum + tech.managementPlatformUsage.totalInteractions + tech.techHubUsage.totalInteractions + tech.app1099Usage.totalInteractions, 0
  );

  const avgCrowdsourcingBenefit = mockCrossSystemData.reduce((sum, tech) => 
    sum + tech.crowdsourcedBenefits.receivedRecommendations, 0
  ) / mockCrossSystemData.length;

  return (
    <div className="p-6 space-y-6 bg-gray-950 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Magik Button Cross-System Integration</h1>
            <p className="text-gray-400 mt-2">Monitor usage patterns across Management Platform, Tech Hub, and 1099 Tech Hub App</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500 text-white">Live Sync Active</Badge>
          <Badge className="bg-blue-500 text-white">{totalInteractions} Total Interactions</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview" className="text-white">Cross-System Overview</TabsTrigger>
          <TabsTrigger value="crowdsourcing" className="text-white">Crowdsourced Intelligence</TabsTrigger>
          <TabsTrigger value="individual" className="text-white">Individual Tracking</TabsTrigger>
          <TabsTrigger value="integration" className="text-white">System Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Platform Usage Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-400" />
                  Management Platform
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-white">
                    {mockCrossSystemData.reduce((sum, tech) => sum + tech.managementPlatformUsage.totalInteractions, 0)}
                  </div>
                  <p className="text-sm text-gray-400">Strategic oversight & monitoring</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Service</span>
                      <span className="text-white">
                        {mockCrossSystemData.reduce((sum, tech) => sum + tech.managementPlatformUsage.categoryUsage.service, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Technical</span>
                      <span className="text-white">
                        {mockCrossSystemData.reduce((sum, tech) => sum + tech.managementPlatformUsage.categoryUsage.technical, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  Tech Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-white">
                    {mockCrossSystemData.reduce((sum, tech) => sum + tech.techHubUsage.totalInteractions, 0)}
                  </div>
                  <p className="text-sm text-gray-400">Field operations & daily workflow</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Schedule</span>
                      <span className="text-white">
                        {mockCrossSystemData.reduce((sum, tech) => sum + tech.techHubUsage.categoryUsage.schedule, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Service</span>
                      <span className="text-white">
                        {mockCrossSystemData.reduce((sum, tech) => sum + tech.techHubUsage.categoryUsage.service, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-purple-400" />
                  1099 Tech Hub App
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-white">
                    {mockCrossSystemData.reduce((sum, tech) => sum + tech.app1099Usage.totalInteractions, 0)}
                  </div>
                  <p className="text-sm text-gray-400">Mobile contractor operations</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Parts</span>
                      <span className="text-white">
                        {mockCrossSystemData.reduce((sum, tech) => sum + tech.app1099Usage.categoryUsage.parts, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Admin</span>
                      <span className="text-white">
                        {mockCrossSystemData.reduce((sum, tech) => sum + tech.app1099Usage.categoryUsage.admin, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cross-System Data Flow */}
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-orange-400" />
                Real-Time Data Flow & Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">Data Flow Direction</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded border border-blue-500/30">
                      <Smartphone className="w-5 h-5 text-blue-400" />
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <Monitor className="w-5 h-5 text-green-400" />
                      <div className="ml-2">
                        <p className="text-white text-sm font-medium">Field → Management</p>
                        <p className="text-gray-400 text-xs">Usage patterns, performance data</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded border border-green-500/30">
                      <Monitor className="w-5 h-5 text-green-400" />
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <Users className="w-5 h-5 text-blue-400" />
                      <div className="ml-2">
                        <p className="text-white text-sm font-medium">Management → Tech Hub</p>
                        <p className="text-gray-400 text-xs">Policy updates, new features</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-purple-500/10 rounded border border-purple-500/30">
                      <Share2 className="w-5 h-5 text-purple-400" />
                      <div className="ml-2">
                        <p className="text-white text-sm font-medium">Cross-Platform Sync</p>
                        <p className="text-gray-400 text-xs">Shared solutions, crowdsourced data</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">Impact Metrics</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-yellow-400 font-medium">Cross-System Learning</span>
                        <span className="text-white">94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />
                      <p className="text-xs text-gray-400 mt-1">Solutions shared across platforms</p>
                    </div>
                    
                    <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-400 font-medium">Usage Optimization</span>
                        <span className="text-white">87.6%</span>
                      </div>
                      <Progress value={87.6} className="h-2" />
                      <p className="text-xs text-gray-400 mt-1">Efficiency gains from data sharing</p>
                    </div>
                    
                    <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-blue-400 font-medium">Predictive Accuracy</span>
                        <span className="text-white">91.3%</span>
                      </div>
                      <Progress value={91.3} className="h-2" />
                      <p className="text-xs text-gray-400 mt-1">AI recommendations based on crowd data</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crowdsourcing" className="space-y-6">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                Crowdsourced Intelligence Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">Knowledge Sharing Impact</h4>
                  <div className="space-y-3">
                    {mockCrossSystemData.map((tech) => (
                      <div key={tech.technicianId} className="p-3 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{tech.name}</span>
                          <Badge className="bg-cyan-500 text-white">
                            {tech.crowdsourcedBenefits.receivedRecommendations} benefits
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="text-green-400 font-medium">{tech.crowdsourcedBenefits.sharedSolutions}</div>
                            <div className="text-gray-400">Shared</div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-400 font-medium">{tech.crowdsourcedBenefits.receivedRecommendations}</div>
                            <div className="text-gray-400">Received</div>
                          </div>
                          <div className="text-center">
                            <div className="text-purple-400 font-medium">{tech.crowdsourcedBenefits.contributedData}</div>
                            <div className="text-gray-400">Contributed</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">AI Learning Patterns</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-500/10 rounded border border-green-500/30">
                      <h5 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Popular Solutions Propagating
                      </h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">HVAC diagnostic shortcut</span>
                          <span className="text-white">89% adoption</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Parts ordering workflow</span>
                          <span className="text-white">76% adoption</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Customer communication template</span>
                          <span className="text-white">83% adoption</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-500/10 rounded border border-blue-500/30">
                      <h5 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Cross-System Data Benefits
                      </h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Response time improvement</span>
                          <span className="text-green-400">+23%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Solution accuracy increase</span>
                          <span className="text-green-400">+31%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Technician satisfaction</span>
                          <span className="text-green-400">+18%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 md:col-span-1">
              <CardHeader>
                <CardTitle className="text-white">Select Technician</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockCrossSystemData.map((tech) => (
                    <Button
                      key={tech.technicianId}
                      variant={selectedTechnician?.technicianId === tech.technicianId ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedTechnician(tech)}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      {tech.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {selectedTechnician && (
              <Card className="bg-white/10 border-white/20 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-400" />
                    {selectedTechnician.name} - Cross-System Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-500/10 rounded border border-blue-500/30">
                        <Monitor className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <div className="text-xl font-bold text-white">
                          {selectedTechnician.managementPlatformUsage.totalInteractions}
                        </div>
                        <div className="text-xs text-gray-400">Management Platform</div>
                        <div className="text-xs text-blue-400 mt-1">
                          {selectedTechnician.managementPlatformUsage.lastActiveTime}
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-500/10 rounded border border-green-500/30">
                        <Users className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <div className="text-xl font-bold text-white">
                          {selectedTechnician.techHubUsage.totalInteractions}
                        </div>
                        <div className="text-xs text-gray-400">Tech Hub</div>
                        <div className="text-xs text-green-400 mt-1">
                          {selectedTechnician.techHubUsage.lastActiveTime}
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-500/10 rounded border border-purple-500/30">
                        <Smartphone className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                        <div className="text-xl font-bold text-white">
                          {selectedTechnician.app1099Usage.totalInteractions}
                        </div>
                        <div className="text-xs text-gray-400">1099 Tech Hub App</div>
                        <div className="text-xs text-purple-400 mt-1">
                          {selectedTechnician.app1099Usage.lastActiveTime}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-cyan-500/10 rounded border border-cyan-500/30">
                      <h5 className="text-cyan-400 font-medium mb-3 flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Crowdsourcing Impact for {selectedTechnician.name}
                      </h5>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-400">
                            {selectedTechnician.crowdsourcedBenefits.sharedSolutions}
                          </div>
                          <div className="text-xs text-gray-400">Solutions Shared</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-400">
                            {selectedTechnician.crowdsourcedBenefits.receivedRecommendations}
                          </div>
                          <div className="text-xs text-gray-400">Recommendations Received</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-400">
                            {selectedTechnician.crowdsourcedBenefits.contributedData}
                          </div>
                          <div className="text-xs text-gray-400">Data Points Contributed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card className="bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                System Integration Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Integration Benefits</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                        <h5 className="text-green-400 font-medium mb-1">Unified Learning</h5>
                        <p className="text-gray-300 text-sm">Solutions discovered in any system instantly available across all platforms</p>
                      </div>
                      
                      <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                        <h5 className="text-blue-400 font-medium mb-1">Performance Tracking</h5>
                        <p className="text-gray-300 text-sm">Complete technician journey tracking across management, field, and mobile interfaces</p>
                      </div>
                      
                      <div className="p-3 bg-purple-500/10 rounded border border-purple-500/30">
                        <h5 className="text-purple-400 font-medium mb-1">Intelligent Recommendations</h5>
                        <p className="text-gray-300 text-sm">AI learns from all technician interactions to provide contextual suggestions</p>
                      </div>
                      
                      <div className="p-3 bg-orange-500/10 rounded border border-orange-500/30">
                        <h5 className="text-orange-400 font-medium mb-1">Real-Time Sync</h5>
                        <p className="text-gray-300 text-sm">Updates in one system immediately reflect across all connected platforms</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Data Flow Architecture</h4>
                    <div className="p-4 bg-gray-800/50 rounded border border-gray-600">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Monitor className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">Management Platform</div>
                            <div className="text-gray-400 text-sm">Strategic oversight, policy distribution</div>
                          </div>
                        </div>
                        
                        <div className="ml-4 border-l border-gray-600 pl-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <div className="text-gray-300 text-sm">Usage patterns, performance metrics</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">Tech Hub</div>
                            <div className="text-gray-400 text-sm">Daily operations, field workflows</div>
                          </div>
                        </div>
                        
                        <div className="ml-4 border-l border-gray-600 pl-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <div className="text-gray-300 text-sm">Real-time usage, solution effectiveness</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <Smartphone className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">1099 Tech Hub App</div>
                            <div className="text-gray-400 text-sm">Mobile contractor operations</div>
                          </div>
                        </div>
                        
                        <div className="ml-4 border-l border-gray-600 pl-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <Database className="w-4 h-4 text-cyan-400" />
                            <div className="text-cyan-400 text-sm font-medium">Crowdsourced Intelligence Pool</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-500/10 rounded border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-medium mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    AI-Powered Cross-System Learning
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{avgCrowdsourcingBenefit.toFixed(0)}</div>
                      <div className="text-xs text-gray-400">Avg recommendations per technician</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">94.8%</div>
                      <div className="text-xs text-gray-400">Cross-system solution accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">3.2s</div>
                      <div className="text-xs text-gray-400">Avg sync time across platforms</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}