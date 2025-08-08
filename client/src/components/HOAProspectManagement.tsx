import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Plus, Target, Users, MapPin, DollarSign, TrendingUp, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { HOAProspect, InsertHOAProspect, HOAProspectStrategy, InsertHOAProspectStrategy } from "@shared/schema";

interface ProspectWithStrategies extends HOAProspect {
  strategies?: HOAProspectStrategy[];
}

export default function HOAProspectManagement() {
  const [showCreateProspect, setShowCreateProspect] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<ProspectWithStrategies | null>(null);
  const [newProspect, setNewProspect] = useState<Partial<InsertHOAProspect>>({
    communityName: '',
    location: '',
    communityType: 'Single Family',
    communitySize: 0,
    homeValueRange: '300-500K',
    contactInfo: {},
    communityCharacteristics: {},
    status: 'new',
    priority: 'medium'
  });

  const queryClient = useQueryClient();

  // Fetch prospects
  const { data: prospects = [], isLoading } = useQuery({
    queryKey: ['/api/hoa-prospects'],
  });

  // Create prospect mutation
  const createProspectMutation = useMutation({
    mutationFn: (prospectData: InsertHOAProspect) => 
      apiRequest('/api/hoa-prospects', 'POST', prospectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/hoa-prospects'] });
      setShowCreateProspect(false);
      setNewProspect({
        communityName: '',
        location: '',
        communityType: 'Single Family',
        communitySize: 0,   
        homeValueRange: '300-500K',
        contactInfo: {},
        communityCharacteristics: {},
        status: 'new',
        priority: 'medium'
      });
    },
  });

  // Generate strategy mutation
  const generateStrategyMutation = useMutation({
    mutationFn: (prospectId: number) => 
      apiRequest(`/api/hoa-prospects/${prospectId}/generate-strategy`, 'POST'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/hoa-prospects'] });
      if (selectedProspect) {
        // Refresh prospect strategies
        fetchProspectStrategies(selectedProspect.id);
      }
    },
  });

  const fetchProspectStrategies = async (prospectId: number) => {
    try {
      const strategies = await apiRequest(`/api/hoa-prospects/${prospectId}/strategies`, 'GET');
      setSelectedProspect(prev => prev ? { ...prev, strategies } : null);
    } catch (error) {
      console.error('Error fetching strategies:', error);
    }
  };

  const handleCreateProspect = () => {
    if (newProspect.communityName && newProspect.location && newProspect.communitySize) {
      createProspectMutation.mutate(newProspect as InsertHOAProspect);
    }
  };

  const handleGenerateStrategy = (prospectId: number) => {
    generateStrategyMutation.mutate(prospectId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'proposal-sent': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'negotiating': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'won': return 'bg-green-100 text-green-800 border-green-200';
      case 'lost': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">HOA Prospect Management</h1>
          <p className="text-gray-400 mt-2">Strategic community prospecting with AI-powered targeting</p>
        </div>
        <Dialog open={showCreateProspect} onOpenChange={setShowCreateProspect}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Prospect
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Create New HOA Prospect</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Community Name</Label>
                  <Input
                    value={newProspect.communityName}
                    onChange={(e) => setNewProspect({ ...newProspect, communityName: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="e.g., Sunset Ridge HOA"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Location</Label>
                  <Input
                    value={newProspect.location}
                    onChange={(e) => setNewProspect({ ...newProspect, location: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="e.g., Miami, FL"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Community Type</Label>
                  <Select value={newProspect.communityType} onValueChange={(value) => setNewProspect({ ...newProspect, communityType: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Single Family">Single Family</SelectItem>
                      <SelectItem value="Condos">Condos</SelectItem>
                      <SelectItem value="Townhomes">Townhomes</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Community Size (units)</Label>
                  <Input
                    type="number"
                    value={newProspect.communitySize}
                    onChange={(e) => setNewProspect({ ...newProspect, communitySize: parseInt(e.target.value) || 0 })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="e.g., 150"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Home Value Range</Label>
                  <Select value={newProspect.homeValueRange} onValueChange={(value) => setNewProspect({ ...newProspect, homeValueRange: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Under 300K">Under $300K</SelectItem>
                      <SelectItem value="300-500K">$300K - $500K</SelectItem>
                      <SelectItem value="500-800K">$500K - $800K</SelectItem>
                      <SelectItem value="800K-1M">$800K - $1M</SelectItem>
                      <SelectItem value="1M+">$1M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Priority</Label>
                  <Select value={newProspect.priority} onValueChange={(value) => setNewProspect({ ...newProspect, priority: value as 'high' | 'medium' | 'low' })}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Notes</Label>
                <Textarea
                  value={newProspect.notes || ''}
                  onChange={(e) => setNewProspect({ ...newProspect, notes: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Additional notes about the community"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateProspect(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateProspect}
                  disabled={!newProspect.communityName || !newProspect.location || !newProspect.communitySize || createProspectMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {createProspectMutation.isPending ? 'Creating...' : 'Create Prospect'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Prospects</p>
                <p className="text-2xl font-bold text-white">{prospects.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Prospects</p>
                <p className="text-2xl font-bold text-white">
                  {(prospects as HOAProspect[]).filter((p) => ['new', 'contacted', 'proposal-sent', 'negotiating'].includes(p.status)).length}
                </p>
              </div>
              <Target className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Won Prospects</p>
                <p className="text-2xl font-bold text-white">
                  {(prospects as HOAProspect[]).filter((p) => p.status === 'won').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-white">
                  {(prospects as HOAProspect[]).filter((p) => p.priority === 'high').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prospects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(prospects as HOAProspect[]).map((prospect) => (
          <Card key={prospect.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors cursor-pointer" onClick={() => {
            setSelectedProspect(prospect);
            fetchProspectStrategies(prospect.id);
          }}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-white text-lg">{prospect.communityName}</CardTitle>
                <div className="flex space-x-1">
                  <Badge className={`text-xs ${getStatusColor(prospect.status)}`}>
                    {prospect.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <Badge className={`text-xs ${getPriorityColor(prospect.priority)}`}>
                    {prospect.priority.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{prospect.location}</span>
              </div>
              
              <div className="flex items-center text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">{prospect.communitySize} units • {prospect.communityType}</span>
              </div>
              
              <div className="flex items-center text-gray-400">
                <DollarSign className="w-4 h-4 mr-2" />
                <span className="text-sm">{prospect.homeValueRange}</span>
              </div>

              {prospect.notes && (
                <div className="text-xs text-gray-500">
                  Notes: {prospect.notes}
                </div>
              )}

              <div className="pt-2">
                <Button 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGenerateStrategy(prospect.id);
                  }}
                  disabled={generateStrategyMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Target className="w-4 h-4 mr-2" />
                  {generateStrategyMutation.isPending ? 'Generating...' : 'Generate Strategy'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prospect Detail Modal */}
      {selectedProspect && (
        <Dialog open={!!selectedProspect} onOpenChange={() => setSelectedProspect(null)}>
          <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">{selectedProspect.communityName}</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="strategies" className="text-gray-300 data-[state=active]:text-white">Strategies</TabsTrigger>
                <TabsTrigger value="activities" className="text-gray-300 data-[state=active]:text-white">Activities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400">Location</Label>
                      <p className="text-white">{selectedProspect.location}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Community Type</Label>
                      <p className="text-white">{selectedProspect.communityType}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Community Size</Label>
                      <p className="text-white">{selectedProspect.communitySize} units</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-400">Home Value Range</Label>
                      <p className="text-white">{selectedProspect.homeValueRange}</p>
                    </div>
                    <div>
                      <Label className="text-gray-400">Status</Label>
                      <Badge className={`${getStatusColor(selectedProspect.status)}`}>
                        {selectedProspect.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-gray-400">Priority</Label>
                      <Badge className={`${getPriorityColor(selectedProspect.priority)}`}>
                        {selectedProspect.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {selectedProspect.notes && (
                  <div>
                    <Label className="text-gray-400">Notes</Label>
                    <p className="text-white">{selectedProspect.notes}</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="strategies" className="space-y-4">
                {selectedProspect.strategies && selectedProspect.strategies.length > 0 ? (
                  <div className="space-y-4">
                    {selectedProspect.strategies.map((strategy: HOAProspectStrategy) => (
                      <Card key={strategy.id} className="bg-gray-800 border-gray-700">
                        <CardHeader>
                          <CardTitle className="text-white text-lg">{strategy.strategyName}</CardTitle>
                          <p className="text-gray-400">{strategy.valueProposition}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-gray-400">Target Audience</Label>
                              <p className="text-white">{strategy.targetAudience}</p>
                            </div>
                            <div>
                              <Label className="text-gray-400">Timeline</Label>
                              <p className="text-white">{strategy.timeline}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-gray-400">Expected Revenue</Label>
                              <p className="text-white">${strategy.expectedRevenue?.toLocaleString()}</p>
                            </div>
                            <div>
                              <Label className="text-gray-400">Success Probability</Label>
                              <p className="text-white">{strategy.successProbability}%</p>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-gray-400">Key Messages</Label>
                            <ul className="text-white space-y-1 mt-1">
                              {(strategy.keyMessages as string[] || []).map((message, index) => (
                                <li key={index} className="text-sm">• {message}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <Label className="text-gray-400">Proposed Services</Label>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {(strategy.proposedServices as string[] || []).map((service, index) => (
                                <Badge key={index} variant="outline" className="text-blue-400 border-blue-400">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-gray-400">Next Steps</Label>
                            <ul className="text-white space-y-1 mt-1">
                              {(strategy.nextSteps as string[] || []).map((step, index) => (
                                <li key={index} className="text-sm">• {step}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No strategies generated yet</p>
                    <Button 
                      onClick={() => handleGenerateStrategy(selectedProspect.id)}
                      disabled={generateStrategyMutation.isPending}
                      className="mt-4 bg-blue-600 hover:bg-blue-700"
                    >
                      Generate Strategy
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="activities" className="space-y-4">
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Activity tracking coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}