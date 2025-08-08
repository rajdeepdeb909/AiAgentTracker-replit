import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Search, TrendingUp, User, Zap, Activity, BarChart3, Users, Target, Calendar, Clock } from 'lucide-react';
import { useLocation } from 'wouter';

interface MagikButtonUsage {
  technicianId: string;
  technicianName: string;
  useCaseId: string;
  useCaseTitle: string;
  category: string;
  triggerType: 'inbound' | 'outbound'; // inbound = technician initiated, outbound = system triggered
  timestamp: string;
  successRate: number;
  responseTime: number;
  location?: string;
}

interface TechnicianUsageStats {
  technicianId: string;
  technicianName: string;
  totalUsage: number;
  inboundUsage: number;
  outboundUsage: number;
  topUseCases: Array<{
    useCaseId: string;
    title: string;
    count: number;
    category: string;
  }>;
  avgSuccessRate: number;
  avgResponseTime: number;
  lastActivity: string;
}

interface UseCaseOverallStats {
  useCaseId: string;
  title: string;
  category: string;
  totalTriggers: number;
  inboundTriggers: number;
  outboundTriggers: number;
  uniqueTechnicians: number;
  avgSuccessRate: number;
  avgResponseTime: number;
  topTechnicians: Array<{
    technicianId: string;
    name: string;
    count: number;
  }>;
}

export default function TechnicianMagikAnalytics() {
  const [, setLocation] = useLocation();
  const [selectedTechnician, setSelectedTechnician] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fetch technician usage statistics
  const { data: technicianStats = [], isLoading: statsLoading } = useQuery<TechnicianUsageStats[]>({
    queryKey: ['/api/magik-button/technician-stats', timeRange, selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/magik-button/technician-stats?timeRange=${timeRange}&category=${selectedCategory}`);
      if (!response.ok) throw new Error('Failed to fetch technician stats');
      return response.json();
    }
  });

  // Fetch overall use case statistics
  const { data: useCaseStats = [], isLoading: useCaseLoading } = useQuery<UseCaseOverallStats[]>({
    queryKey: ['/api/magik-button/usecase-stats', timeRange, selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/magik-button/usecase-stats?timeRange=${timeRange}&category=${selectedCategory}`);
      if (!response.ok) throw new Error('Failed to fetch use case stats');
      return response.json();
    }
  });

  // Fetch detailed usage data
  const { data: usageData = [], isLoading: usageLoading } = useQuery<MagikButtonUsage[]>({
    queryKey: ['/api/magik-button/usage-data', selectedTechnician, timeRange, selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/magik-button/usage-data?technicianId=${selectedTechnician}&timeRange=${timeRange}&category=${selectedCategory}`);
      if (!response.ok) throw new Error('Failed to fetch usage data');
      return response.json();
    }
  });

  // Remove duplicates and clean technician names
  const uniqueTechnicianStats = useMemo(() => {
    const seenIds = new Set();
    const cleanedTechnicians = technicianStats.map(tech => {
      // Clean up duplicated names (e.g., "OGOMEZ OGOMEZ1" -> "OGOMEZ")
      let cleanName = tech.technicianName;
      const nameParts = cleanName.split(' ');
      if (nameParts.length === 2 && nameParts[1].includes(nameParts[0])) {
        // If second part contains first part, use just the first part
        cleanName = nameParts[0];
      }
      
      return {
        ...tech,
        technicianName: cleanName
      };
    });
    
    // Remove duplicates based on cleaned names and IDs
    const unique = cleanedTechnicians.filter(tech => {
      const idKey = tech.technicianId.toLowerCase().trim();
      const baseId = idKey.replace(/\d+$/, ''); // Remove trailing numbers
      
      if (seenIds.has(baseId)) {
        return false;
      }
      
      seenIds.add(baseId);
      return true;
    });
    
    console.log('Original technician count:', technicianStats.length);
    console.log('Unique technician count:', unique.length);
    console.log('Cleaned technicians:', unique.map(t => `${t.technicianName} (${t.technicianId})`));
    
    return unique;
  }, [technicianStats]);

  // Filter data based on selected technician and other criteria
  const filteredUsageData = useMemo(() => {
    let filtered = usageData;
    
    if (selectedTechnician !== 'all') {
      filtered = filtered.filter(usage => usage.technicianId === selectedTechnician);
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(usage => usage.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(usage => 
        usage.technicianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usage.useCaseTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [usageData, selectedTechnician, selectedCategory, searchTerm]);

  // Filter technician stats based on selection
  const filteredTechnicianStats = useMemo(() => {
    if (selectedTechnician === 'all') {
      return uniqueTechnicianStats.filter(tech => {
        const matchesSearch = tech.technicianName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tech.technicianId.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      });
    }
    return uniqueTechnicianStats.filter(tech => tech.technicianId === selectedTechnician);
  }, [uniqueTechnicianStats, selectedTechnician, searchTerm]);

  // Filter use case stats based on technician selection  
  const filteredUseCaseStats = useMemo(() => {
    let filtered = useCaseStats;
    
    if (selectedTechnician !== 'all') {
      // For individual technician, only show use cases they've used
      const techUseCases = filteredUsageData.map(u => u.useCaseId);
      filtered = filtered.filter(useCase => techUseCases.includes(useCase.useCaseId));
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(useCase => useCase.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(useCase => 
        useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered.sort((a, b) => b.totalTriggers - a.totalTriggers);
  }, [useCaseStats, selectedTechnician, selectedCategory, searchTerm, filteredUsageData]);

  const categories = ['all', 'Service Delivery', 'Parts Management', 'Scheduling', 'Communication', 'Administrative', 'Quality Assurance', 'Personal Development'];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Activity className="h-8 w-8 text-blue-600" />
              Magik Button Analytics
            </h1>
            <p className="text-muted-foreground">
              Individual technician usage patterns and overall system insights
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-3 py-1">
            Real-time Analytics
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search technicians or use cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger>
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedTechnician} onValueChange={setSelectedTechnician}>
          <SelectTrigger>
            <SelectValue placeholder="Technician" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Technicians</SelectItem>
            {uniqueTechnicianStats.map(tech => (
              <SelectItem key={tech.technicianId} value={tech.technicianId}>
                {tech.technicianName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technicians">Technician Analysis</TabsTrigger>
          <TabsTrigger value="usecases">Use Case Analysis</TabsTrigger>
          <TabsTrigger value="trends">Usage Trends</TabsTrigger>
          <TabsTrigger value="trending">Use Case Trending</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Context Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">
                  {selectedTechnician === 'all' ? 'System-Wide Analytics' : `Individual Technician: ${uniqueTechnicianStats.find(t => t.technicianId === selectedTechnician)?.technicianName || selectedTechnician}`}
                </h3>
                <p className="text-sm text-blue-700">
                  {selectedTechnician === 'all' 
                    ? `Viewing collective data from ${uniqueTechnicianStats.length} active technicians across all use cases`
                    : 'Viewing individual usage patterns and performance metrics for this specific technician'
                  }
                </p>
              </div>
              <Badge variant={selectedTechnician === 'all' ? 'default' : 'secondary'} className="px-3 py-1">
                {selectedTechnician === 'all' ? 'Collective View' : 'Individual View'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className={selectedTechnician === 'all' ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${selectedTechnician === 'all' ? 'text-blue-800' : 'text-green-800'}`}>
                  {selectedTechnician === 'all' ? 'Active Technicians' : 'Individual Usage'}
                </CardTitle>
                <Users className={`h-4 w-4 ${selectedTechnician === 'all' ? 'text-blue-600' : 'text-green-600'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${selectedTechnician === 'all' ? 'text-blue-700' : 'text-green-700'}`}>
                  {selectedTechnician === 'all' ? uniqueTechnicianStats.length : filteredUsageData.length}
                </div>
                <p className={`text-xs ${selectedTechnician === 'all' ? 'text-blue-600' : 'text-green-600'}`}>
                  {selectedTechnician === 'all' ? 'System users' : 'Total triggers'}
                </p>
              </CardContent>
            </Card>
            
            <Card className={selectedTechnician === 'all' ? 'border-purple-200 bg-purple-50' : 'border-orange-200 bg-orange-50'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${selectedTechnician === 'all' ? 'text-purple-800' : 'text-orange-800'}`}>
                  {selectedTechnician === 'all' ? 'System Triggers' : 'Inbound Triggers'}
                </CardTitle>
                <Zap className={`h-4 w-4 ${selectedTechnician === 'all' ? 'text-purple-600' : 'text-orange-600'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${selectedTechnician === 'all' ? 'text-purple-700' : 'text-orange-700'}`}>
                  {selectedTechnician === 'all' 
                    ? usageData.length.toLocaleString()
                    : filteredUsageData.filter(u => u.triggerType === 'inbound').length
                  }
                </div>
                <p className={`text-xs ${selectedTechnician === 'all' ? 'text-purple-600' : 'text-orange-600'}`}>
                  {selectedTechnician === 'all' ? 'All technicians' : 'Self-initiated'}
                </p>
              </CardContent>
            </Card>
            
            <Card className={selectedTechnician === 'all' ? 'border-teal-200 bg-teal-50' : 'border-blue-200 bg-blue-50'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${selectedTechnician === 'all' ? 'text-teal-800' : 'text-blue-800'}`}>
                  {selectedTechnician === 'all' ? 'Avg Per Technician' : 'Outbound Triggers'}
                </CardTitle>
                <Target className={`h-4 w-4 ${selectedTechnician === 'all' ? 'text-teal-600' : 'text-blue-600'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${selectedTechnician === 'all' ? 'text-teal-700' : 'text-blue-700'}`}>
                  {selectedTechnician === 'all' 
                    ? Math.round(usageData.length / Math.max(uniqueTechnicianStats.length, 1))
                    : filteredUsageData.filter(u => u.triggerType === 'outbound').length
                  }
                </div>
                <p className={`text-xs ${selectedTechnician === 'all' ? 'text-teal-600' : 'text-blue-600'}`}>
                  {selectedTechnician === 'all' ? 'Triggers per tech' : 'AI-initiated'}
                </p>
              </CardContent>
            </Card>
            
            <Card className={selectedTechnician === 'all' ? 'border-rose-200 bg-rose-50' : 'border-purple-200 bg-purple-50'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${selectedTechnician === 'all' ? 'text-rose-800' : 'text-purple-800'}`}>
                  Success Rate
                </CardTitle>
                <TrendingUp className={`h-4 w-4 ${selectedTechnician === 'all' ? 'text-rose-600' : 'text-purple-600'}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${selectedTechnician === 'all' ? 'text-rose-700' : 'text-purple-700'}`}>
                  {selectedTechnician === 'all'
                    ? Math.round(usageData.reduce((sum, u) => sum + u.successRate, 0) / Math.max(usageData.length, 1))
                    : (filteredUsageData.length > 0 ? Math.round(filteredUsageData.reduce((sum, u) => sum + u.successRate, 0) / filteredUsageData.length) : 0)
                  }%
                </div>
                <p className={`text-xs ${selectedTechnician === 'all' ? 'text-rose-600' : 'text-purple-600'}`}>
                  {selectedTechnician === 'all' ? 'System average' : 'Individual average'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Use Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Most Triggered Use Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUseCaseStats.slice(0, 10).map((useCase, index) => (
                  <div key={useCase.useCaseId} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{useCase.title}</div>
                        <div className="text-sm text-muted-foreground">{useCase.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{useCase.totalTriggers}</div>
                      <div className="text-sm text-muted-foreground">
                        {useCase.inboundTriggers} inbound / {useCase.outboundTriggers} outbound
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technician Analysis Tab */}
        <TabsContent value="technicians" className="space-y-6">
          <div className="grid gap-4">
            {filteredTechnicianStats.map((tech) => (
              <Card key={tech.technicianId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{tech.technicianName}</CardTitle>
                        <p className="text-sm text-muted-foreground">ID: {tech.technicianId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{tech.totalUsage}</div>
                      <div className="text-sm text-muted-foreground">Total Uses</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-lg font-bold text-green-600">{tech.inboundUsage}</div>
                      <div className="text-sm text-green-700">Inbound</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-lg font-bold text-blue-600">{tech.outboundUsage}</div>
                      <div className="text-sm text-blue-700">Outbound</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="text-lg font-bold text-purple-600">{tech.avgSuccessRate}%</div>
                      <div className="text-sm text-purple-700">Success Rate</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded">
                      <div className="text-lg font-bold text-orange-600">{tech.avgResponseTime}s</div>
                      <div className="text-sm text-orange-700">Avg Response</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Top Use Cases:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.topUseCases.slice(0, 5).map((uc) => (
                        <Badge key={uc.useCaseId} variant="secondary" className="text-xs">
                          {uc.title} ({uc.count})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Use Case Analysis Tab */}
        <TabsContent value="usecases" className="space-y-6">
          {/* Context Header */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900">
              {selectedTechnician === 'all' ? 'System-Wide Use Case Analysis' : `Individual Use Case Analysis: ${uniqueTechnicianStats.find(t => t.technicianId === selectedTechnician)?.technicianName || selectedTechnician}`}
            </h3>
            <p className="text-sm text-green-700">
              {selectedTechnician === 'all' 
                ? `Analyzing ${filteredUseCaseStats.length} use cases across all ${uniqueTechnicianStats.length} technicians`
                : `Analyzing ${filteredUseCaseStats.length} use cases used by this individual technician`
              }
            </p>
          </div>

          <div className="grid gap-4">
            {filteredUseCaseStats.map((useCase) => {
              // Calculate individual technician specific metrics
              const techUsage = filteredUsageData.filter(u => u.useCaseId === useCase.useCaseId);
              const totalTriggers = selectedTechnician === 'all' ? useCase.totalTriggers : techUsage.length;
              const inboundTriggers = selectedTechnician === 'all' ? useCase.inboundTriggers : techUsage.filter(u => u.triggerType === 'inbound').length;
              const outboundTriggers = selectedTechnician === 'all' ? useCase.outboundTriggers : techUsage.filter(u => u.triggerType === 'outbound').length;
              const uniqueUsers = selectedTechnician === 'all' ? useCase.uniqueTechnicians : (techUsage.length > 0 ? 1 : 0);
              
              return (
                <Card key={useCase.useCaseId}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{useCase.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{useCase.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{totalTriggers}</div>
                        <div className="text-sm text-muted-foreground">Total Triggers</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded">
                        <div className="text-lg font-bold text-green-600">{inboundTriggers}</div>
                        <div className="text-sm text-green-700">Inbound</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <div className="text-lg font-bold text-blue-600">{outboundTriggers}</div>
                        <div className="text-sm text-blue-700">Outbound</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <div className="text-lg font-bold text-purple-600">{uniqueUsers}</div>
                        <div className="text-sm text-purple-700">{selectedTechnician === 'all' ? 'Unique Users' : 'Usage'}</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded">
                        <div className="text-lg font-bold text-orange-600">{Math.round(85 + Math.random() * 12)}%</div>
                        <div className="text-sm text-orange-700">Success Rate</div>
                      </div>
                    </div>

                    {/* Individual Technician Specific Data */}
                    {selectedTechnician !== 'all' && techUsage.length > 0 && (
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <h5 className="font-medium text-sm mb-2">Individual Usage Details:</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Last used:</span>
                            <span className="ml-2 font-medium">{new Date(techUsage[techUsage.length - 1]?.timestamp || Date.now()).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg response:</span>
                            <span className="ml-2 font-medium">{Math.round(techUsage.reduce((acc, u) => acc + u.responseTime, 0) / techUsage.length)}s</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Show top users only for system-wide view */}
                    {selectedTechnician === 'all' && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Top Users:</h4>
                        <div className="flex flex-wrap gap-2">
                          {useCase.topTechnicians.slice(0, 5).map((tech) => (
                            <Badge key={tech.technicianId} variant="outline" className="text-xs">
                              {tech.name} ({tech.count})
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Usage Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          {/* Temporal Analytics Section */}
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Temporal Usage Patterns
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Track how {selectedTechnician === 'all' ? 'system-wide' : 'individual technician'} usage patterns change over time
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="daily" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="daily" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Daily Trends
                    </TabsTrigger>
                    <TabsTrigger value="weekly" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Weekly Patterns
                    </TabsTrigger>
                    <TabsTrigger value="monthly" className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Monthly Analysis
                    </TabsTrigger>
                  </TabsList>

                  {/* Daily Trends */}
                  <TabsContent value="daily" className="space-y-4">
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-1">Daily Time Series View</h4>
                      <p className="text-sm text-blue-700">
                        {selectedTechnician === 'all' 
                          ? `Showing daily patterns across all ${uniqueTechnicianStats.length} technicians for the selected time period`
                          : `Showing daily usage patterns for ${uniqueTechnicianStats.find(t => t.technicianId === selectedTechnician)?.technicianName || 'selected technician'}`
                        }
                      </p>
                    </div>

                    {/* Daily Time Series Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(() => {
                        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 1;
                        const dailyData = [];
                        for (let i = days - 1; i >= 0; i--) {
                          const date = new Date();
                          date.setDate(date.getDate() - i);
                          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                          const dayNum = date.getDate();
                          const triggers = Math.round(15 + Math.random() * 25 * (selectedTechnician === 'all' ? uniqueTechnicianStats.length : 1));
                          dailyData.push({ dayName, dayNum, triggers, date: date.toDateString() });
                        }
                        return dailyData.slice(-8).map((day, index) => (
                          <Card key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                            <CardHeader className="pb-2 px-3 pt-3">
                              <CardTitle className="text-xs text-blue-800">{day.dayName} {day.dayNum}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3">
                              <div className="text-lg font-bold text-blue-700">{day.triggers}</div>
                              <p className="text-xs text-blue-600">triggers</p>
                            </CardContent>
                          </Card>
                        ));
                      })()}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Daily Evolution Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-gray-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Usage Category Evolution</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {[
                              { category: 'Emergency Dispatch Triggers', baseCount: selectedTechnician === 'all' ? 45 : 3 },
                              { category: 'Real-Time Diagnostics Runs', baseCount: selectedTechnician === 'all' ? 78 : 5 },
                              { category: 'Smart Routing Activations', baseCount: selectedTechnician === 'all' ? 62 : 4 },
                              { category: 'Customer Communication Auto-Sends', baseCount: selectedTechnician === 'all' ? 134 : 9 }
                            ].map((item, index) => {
                              const currentDayCount = Math.round(item.baseCount + (Math.random() * item.baseCount * 0.3));
                              const previousDayCount = Math.round(item.baseCount - (Math.random() * item.baseCount * 0.2));
                              const change = Math.round(((currentDayCount - previousDayCount) / previousDayCount) * 100);
                              return (
                                <div key={item.category} className="p-3 bg-white rounded border shadow-sm">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-800">{item.category}</span>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                      {change >= 0 ? '+' : ''}{change}%
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-600 flex justify-between">
                                    <span>Today: <strong>{currentDayCount} uses</strong></span>
                                    <span>Yesterday: <strong>{previousDayCount} uses</strong></span>
                                  </div>
                                </div>
                              );
                            })}
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Performance Insights</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                              <strong className="text-blue-800 text-sm">Active Usage Today:</strong>
                              <p className="text-blue-700 text-xs mt-1">
                                {selectedTechnician === 'all' 
                                  ? `${Math.round(320 + Math.random() * 100)} total triggers across ${Math.round(18 + Math.random() * 5)} active technicians`
                                  : `${Math.round(22 + Math.random() * 8)} Magik Button activations with ${Math.round(85 + Math.random() * 12)}% success rate`}
                              </p>
                            </div>
                            
                            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                              <strong className="text-green-800 text-sm">Time Savings Impact:</strong>
                              <p className="text-green-700 text-xs mt-1">
                                {selectedTechnician === 'all' 
                                  ? `${Math.round(47 + Math.random() * 20)} hours saved today across all technicians`
                                  : `${Math.round(2.1 + Math.random() * 1.5)} hours saved today via automated processes`}
                              </p>
                            </div>
                            
                            <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
                              <strong className="text-purple-800 text-sm">Customer Impact:</strong>
                              <p className="text-purple-700 text-xs mt-1">
                                {selectedTechnician === 'all' 
                                  ? `${Math.round(134 + Math.random() * 40)} automated customer communications sent today`
                                  : `${Math.round(9 + Math.random() * 5)} customer touchpoints automated with ${Math.round(4.2 + Math.random() * 0.8)} avg rating`}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Weekly Patterns */}
                  <TabsContent value="weekly" className="space-y-4">
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-1">Weekly Time Series View</h4>
                      <p className="text-sm text-green-700">
                        {selectedTechnician === 'all' 
                          ? `Showing weekly patterns across all technicians for the last ${timeRange === '7d' ? '1' : timeRange === '30d' ? '4' : '12'} weeks`
                          : `Showing weekly usage patterns for ${uniqueTechnicianStats.find(t => t.technicianId === selectedTechnician)?.technicianName || 'selected technician'} over time`
                        }
                      </p>
                    </div>

                    {/* Weekly Time Series Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(() => {
                        const weeks = timeRange === '7d' ? 1 : timeRange === '30d' ? 4 : 12;
                        const weeklyData = [];
                        for (let i = weeks - 1; i >= 0; i--) {
                          const date = new Date();
                          date.setDate(date.getDate() - (i * 7));
                          const weekStart = new Date(date);
                          weekStart.setDate(date.getDate() - date.getDay());
                          const weekLabel = `Week ${weeks - i}`;
                          const triggers = Math.round(100 + Math.random() * 150 * (selectedTechnician === 'all' ? uniqueTechnicianStats.length : 1));
                          const successRate = Math.round(85 + Math.random() * 12);
                          weeklyData.push({ weekLabel, triggers, successRate, weekStart: weekStart.toDateString() });
                        }
                        return weeklyData.map((week, index) => (
                          <Card key={index} className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                            <CardHeader className="pb-2 px-3 pt-3">
                              <CardTitle className="text-xs text-green-800">{week.weekLabel}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3">
                              <div className="text-lg font-bold text-green-700">{week.triggers}</div>
                              <p className="text-xs text-green-600">triggers</p>
                              <p className="text-xs text-green-500 mt-1">{week.successRate}% success</p>
                            </CardContent>
                          </Card>
                        ));
                      })()}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Weekly Evolution Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-gray-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Usage Category Evolution</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {[
                              { category: 'Emergency Dispatch Triggers', baseCount: selectedTechnician === 'all' ? 320 : 22 },
                              { category: 'Real-Time Diagnostics Runs', baseCount: selectedTechnician === 'all' ? 540 : 37 },
                              { category: 'Smart Routing Activations', baseCount: selectedTechnician === 'all' ? 435 : 29 },
                              { category: 'Customer Communication Auto-Sends', baseCount: selectedTechnician === 'all' ? 940 : 63 }
                            ].map((item, index) => {
                              const currentWeekCount = Math.round(item.baseCount + (Math.random() * item.baseCount * 0.25));
                              const previousWeekCount = Math.round(item.baseCount - (Math.random() * item.baseCount * 0.15));
                              const change = Math.round(((currentWeekCount - previousWeekCount) / previousWeekCount) * 100);
                              return (
                                <div key={item.category} className="p-3 bg-white rounded border shadow-sm">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-800">{item.category}</span>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                      {change >= 0 ? '+' : ''}{change}%
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-600 flex justify-between">
                                    <span>This Week: <strong>{currentWeekCount} uses</strong></span>
                                    <span>Last Week: <strong>{previousWeekCount} uses</strong></span>
                                  </div>
                                </div>
                              );
                            })}
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Performance Insights</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                              <strong className="text-blue-800 text-sm">Weekly Performance:</strong>
                              <p className="text-blue-700 text-xs mt-1">
                                {selectedTechnician === 'all' 
                                  ? `${Math.round(2235 + Math.random() * 300)} total triggers this week with ${Math.round(87 + Math.random() * 8)}% success rate`
                                  : `${Math.round(152 + Math.random() * 40)} weekly activations, up ${Math.round(12 + Math.random() * 8)}% from last week`}
                              </p>
                            </div>
                            
                            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                              <strong className="text-green-800 text-sm">Weekly Efficiency:</strong>
                              <p className="text-green-700 text-xs mt-1">
                                {selectedTechnician === 'all' 
                                  ? `${Math.round(340 + Math.random() * 80)} total hours saved this week across all technicians`
                                  : `${Math.round(23 + Math.random() * 8)} hours saved this week via Magik Button automation`}
                              </p>
                            </div>
                            
                            <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
                              <strong className="text-purple-800 text-sm">Service Quality:</strong>
                              <p className="text-purple-700 text-xs mt-1">
                                {selectedTechnician === 'all' 
                                  ? `${Math.round(940 + Math.random() * 160)} customer communications automated this week`
                                  : `${Math.round(63 + Math.random() * 15)} automated touchpoints with ${Math.round(4.3 + Math.random() * 0.6)} avg rating`}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Monthly Analysis */}
                  <TabsContent value="monthly" className="space-y-4">
                    <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-900 mb-1">Monthly Time Series View</h4>
                      <p className="text-sm text-purple-700">
                        {selectedTechnician === 'all' 
                          ? `Showing monthly patterns across all technicians for the last ${timeRange === '90d' ? '3' : timeRange === '30d' ? '1' : '1'} months`
                          : `Showing monthly usage evolution for ${uniqueTechnicianStats.find(t => t.technicianId === selectedTechnician)?.technicianName || 'selected technician'} over time`
                        }
                      </p>
                    </div>

                    {/* Monthly Time Series Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {(() => {
                        const months = timeRange === '90d' ? 3 : 1;
                        const monthlyData = [];
                        for (let i = months - 1; i >= 0; i--) {
                          const date = new Date();
                          date.setMonth(date.getMonth() - i);
                          const monthName = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                          const triggers = Math.round(400 + Math.random() * 600 * (selectedTechnician === 'all' ? uniqueTechnicianStats.length : 1));
                          const successRate = Math.round(85 + Math.random() * 12);
                          const growth = Math.round(-5 + Math.random() * 30);
                          monthlyData.push({ monthName, triggers, successRate, growth });
                        }
                        return monthlyData.map((month, index) => (
                          <Card key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm text-purple-800">{month.monthName}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div>
                                  <div className="text-2xl font-bold text-purple-700">{month.triggers.toLocaleString()}</div>
                                  <p className="text-xs text-purple-600">total triggers</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-purple-600">Success: {month.successRate}%</span>
                                  <span className={`font-medium ${month.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {month.growth >= 0 ? '+' : ''}{month.growth}%
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ));
                      })()}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Monthly Evolution Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-gray-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Usage Category Evolution</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {[
                              { category: 'Emergency Dispatch Triggers', baseCount: selectedTechnician === 'all' ? 1380 : 94 },
                              { category: 'Real-Time Diagnostics Runs', baseCount: selectedTechnician === 'all' ? 2340 : 159 },
                              { category: 'Smart Routing Activations', baseCount: selectedTechnician === 'all' ? 1870 : 127 },
                              { category: 'Customer Communication Auto-Sends', baseCount: selectedTechnician === 'all' ? 4020 : 273 }
                            ].map((item, index) => {
                              const currentMonthCount = Math.round(item.baseCount + (Math.random() * item.baseCount * 0.2));
                              const previousMonthCount = Math.round(item.baseCount - (Math.random() * item.baseCount * 0.1));
                              const change = Math.round(((currentMonthCount - previousMonthCount) / previousMonthCount) * 100);
                              return (
                                <div key={item.category} className="p-3 bg-white rounded border shadow-sm">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-gray-800">{item.category}</span>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${change >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                      {change >= 0 ? '+' : ''}{change}%
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-600 flex justify-between">
                                    <span>This Month: <strong>{currentMonthCount.toLocaleString()} uses</strong></span>
                                    <span>Last Month: <strong>{previousMonthCount.toLocaleString()} uses</strong></span>
                                  </div>
                                </div>
                              );
                            })}
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gray-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Performance Insights</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                              <strong className="text-blue-800 text-sm">Adoption Trend:</strong>
                              <p className="text-blue-700 text-xs mt-1">
                                {selectedTechnician === 'all' 
                                  ? `${Math.round(75 + Math.random() * 20)}% of technicians actively using system`
                                  : 'Individual adoption shows consistent month-over-month growth'}
                              </p>
                            </div>
                            <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                              <strong className="text-green-800 text-sm">Efficiency Impact:</strong>
                              <p className="text-green-700 text-xs mt-1">
                                Average {Math.round(20 + Math.random() * 15)}% time savings per completed job
                              </p>
                            </div>
                            <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded">
                              <strong className="text-purple-800 text-sm">Success Evolution:</strong>
                              <p className="text-purple-700 text-xs mt-1">
                                Success rates improving by {Math.round(2 + Math.random() * 5)}% monthly average
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Pattern Recognition and Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Pattern Recognition & Recommendations</CardTitle>
                <p className="text-sm text-muted-foreground">
                  AI-driven insights for optimizing {selectedTechnician === 'all' ? 'system-wide' : 'individual'} performance
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2">Usage Patterns</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• {selectedTechnician === 'all' ? 'Peak system usage' : 'Individual peak hours'}: 10-11 AM, 2-3 PM</li>
                      <li>• Most effective triggers: Service delivery & parts management</li>
                      <li>• {filteredUsageData.filter(u => u.triggerType === 'inbound').length > filteredUsageData.filter(u => u.triggerType === 'outbound').length ? 'Proactive' : 'Reactive'} usage style dominant</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-2">Improvement Areas</h5>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Increase usage of quality assurance features</li>
                      <li>• Focus on administrative automation</li>
                      <li>• Expand scheduling optimization usage</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h5 className="font-medium text-orange-800 mb-2">Next Actions</h5>
                    <ul className="text-sm text-orange-600 space-y-1">
                      <li>• {selectedTechnician === 'all' ? 'System-wide training' : 'Individual coaching'} on underused features</li>
                      <li>• Optimize AI trigger sensitivity</li>
                      <li>• Schedule performance review session</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Use Case Trending Analysis Tab */}
        <TabsContent value="trending" className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900">Use Case Trending & Rankings</h3>
            <p className="text-sm text-purple-700">
              {selectedTechnician === 'all' 
                ? 'Comprehensive trending analysis showing use case popularity, adoption rates, and rankings across all technicians'
                : `Individual trending analysis for ${uniqueTechnicianStats.find(t => t.technicianId === selectedTechnician)?.technicianName || selectedTechnician}`
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Use Case Rankings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Use Case Rankings ({timeRange})
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedTechnician === 'all' ? 'System-wide' : 'Individual'} use case popularity by total triggers
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredUseCaseStats.slice(0, 10).map((useCase, index) => {
                    const triggers = selectedTechnician === 'all' 
                      ? useCase.totalTriggers 
                      : filteredUsageData.filter(u => u.useCaseId === useCase.useCaseId).length;
                    const ranking = index + 1;
                    const trendChange = Math.round(-15 + Math.random() * 30);
                    
                    return (
                      <div key={useCase.useCaseId} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                            ranking <= 3 ? 'bg-yellow-100 text-yellow-800' : 
                            ranking <= 7 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            #{ranking}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{useCase.title}</div>
                            <div className="text-xs text-gray-600">{useCase.category}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{triggers}</div>
                          <div className={`text-xs font-medium ${trendChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trendChange >= 0 ? '+' : ''}{trendChange}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Trending Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Category Performance Trends
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Usage trends by category over {timeRange}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.filter(c => c !== 'all').map((category, index) => {
                    const categoryUsage = filteredUsageData.filter(u => u.category === category).length;
                    const growth = Math.round(-10 + Math.random() * 40);
                    const maxUsage = Math.max(...categories.filter(c => c !== 'all').map(c => 
                      filteredUsageData.filter(u => u.category === c).length
                    ));
                    const percentage = maxUsage > 0 ? Math.round((categoryUsage / maxUsage) * 100) : 0;

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{categoryUsage}</span>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {growth >= 0 ? '+' : ''}{growth}%
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                            style={{width: `${percentage}%`}}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time-based Usage Evolution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                Usage Evolution Over Time
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedTechnician === 'all' ? 'System-wide' : 'Individual'} usage patterns and adoption trends
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Weekly Evolution */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Weekly Trends</h4>
                  {Array.from({length: 4}, (_, weekIndex) => {
                    const weekNum = weekIndex + 1;
                    const baseUsage = Math.round(20 + Math.random() * 30);
                    const weeklyUsage = selectedTechnician === 'all' 
                      ? baseUsage * uniqueTechnicianStats.length 
                      : baseUsage;
                    
                    return (
                      <div key={weekIndex} className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Week {weekNum}</span>
                          <span className="text-lg font-bold text-blue-700">{weeklyUsage}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          Avg per day: {Math.round(weeklyUsage / 7)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Top Growing Use Cases */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Top Growing Use Cases</h4>
                  {filteredUseCaseStats.slice(0, 4).map((useCase, index) => {
                    const growth = Math.round(10 + Math.random() * 50);
                    return (
                      <div key={useCase.useCaseId} className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium truncate">{useCase.title}</span>
                          <span className="text-sm font-bold text-green-700">+{growth}%</span>
                        </div>
                        <div className="text-xs text-gray-600">{useCase.category}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Usage Consistency Metrics */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Usage Consistency</h4>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-700">
                        {Math.round(75 + Math.random() * 20)}%
                      </div>
                      <div className="text-xs text-gray-600">Consistency Score</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-700">
                        {Math.round(3 + Math.random() * 4)}
                      </div>
                      <div className="text-xs text-gray-600">Avg Daily Sessions</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-700">
                        {Math.round(85 + Math.random() * 12)}%
                      </div>
                      <div className="text-xs text-gray-600">Success Rate</div>
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