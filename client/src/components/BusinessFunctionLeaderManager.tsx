import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Users, Target, Calendar, Zap, Save, RefreshCw } from 'lucide-react';

interface BusinessFunctionLeader {
  id: number;
  name: string;
  title: string;
  department: string;
  executiveLevel: string;
  weeklyOperations: Record<string, any>;
  responsibleAgents: string[];
  kpis: string[];
  objectives: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface BusinessFunctionLeaderManagerProps {
  selectedExecutive: string;
}

const BusinessFunctionLeaderManager: React.FC<BusinessFunctionLeaderManagerProps> = ({ selectedExecutive }) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<BusinessFunctionLeader | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    department: '',
    responsibleAgents: [] as string[],
    kpis: [] as string[],
    objectives: [] as string[]
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch business function leaders for the selected executive
  const { data: leaders = [], isLoading } = useQuery({
    queryKey: ['/api/business-function-leaders', selectedExecutive],
    queryFn: () => apiRequest(`/api/business-function-leaders?executiveLevel=${selectedExecutive}`)
  });

  // Fetch templates for creating new leaders
  const { data: templates = [] } = useQuery({
    queryKey: ['/api/business-function-templates', selectedExecutive],
    queryFn: () => apiRequest(`/api/business-function-templates/${selectedExecutive}`)
  });

  // Create mutation
  const createLeaderMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/business-function-leaders', {
      method: 'POST',
      body: JSON.stringify({
        ...data,
        executiveLevel: selectedExecutive,
        weeklyOperations: {},
        isActive: true
      })
    }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Business function leader created successfully"
      });
      setShowCreateDialog(false);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['/api/business-function-leaders'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create business function leader",
        variant: "destructive"
      });
    }
  });

  // Update mutation
  const updateLeaderMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => 
      apiRequest(`/api/business-function-leaders/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Business function leader updated successfully"
      });
      setShowEditDialog(false);
      setSelectedLeader(null);
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['/api/business-function-leaders'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update business function leader",
        variant: "destructive"
      });
    }
  });

  // Delete mutation
  const deleteLeaderMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/business-function-leaders/${id}`, {
      method: 'DELETE'
    }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Business function leader deleted successfully"
      });
      queryClient.invalidateQueries({ queryKey: ['/api/business-function-leaders'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete business function leader",
        variant: "destructive"
      });
    }
  });

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      department: '',
      responsibleAgents: [],
      kpis: [],
      objectives: []
    });
  };

  const handleEdit = (leader: BusinessFunctionLeader) => {
    setSelectedLeader(leader);
    setFormData({
      name: leader.name,
      title: leader.title,
      department: leader.department,
      responsibleAgents: leader.responsibleAgents,
      kpis: leader.kpis,
      objectives: leader.objectives
    });
    setShowEditDialog(true);
  };

  const handleCreateFromTemplate = (template: any) => {
    setFormData({
      name: template.name,
      title: template.title,
      department: template.department,
      responsibleAgents: template.responsibleAgents || [],
      kpis: template.kpis || [],
      objectives: template.objectives || []
    });
    setShowCreateDialog(true);
  };

  const handleSubmit = () => {
    if (selectedLeader) {
      updateLeaderMutation.mutate({ id: selectedLeader.id, data: formData });
    } else {
      createLeaderMutation.mutate(formData);
    }
  };

  const handleArrayFieldUpdate = (field: 'responsibleAgents' | 'kpis' | 'objectives', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  const getExecutiveName = (level: string) => {
    const names = {
      'ceo': 'CEO',
      'coo': 'COO', 
      'cfo': 'CFO',
      'cto': 'CTO',
      'cmo': 'CMO',
      'cdo': 'CDO',
      'cao': 'CAO',
      'cpo': 'CPO',
      'cro': 'CRO'
    };
    return names[level as keyof typeof names] || level.toUpperCase();
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Loading business function leaders...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Business Function Leaders</h2>
          <p className="text-gray-400">Manage business function leaders for {getExecutiveName(selectedExecutive)}</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Leader
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Business Function Leader</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter leader name"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter job title"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Enter department"
                />
              </div>

              <div>
                <Label htmlFor="responsibleAgents">Responsible Agents (comma-separated)</Label>
                <Textarea
                  id="responsibleAgents"
                  value={formData.responsibleAgents.join(', ')}
                  onChange={(e) => handleArrayFieldUpdate('responsibleAgents', e.target.value)}
                  placeholder="Enter AI agent names"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="kpis">Key Performance Indicators (comma-separated)</Label>
                <Textarea
                  id="kpis"
                  value={formData.kpis.join(', ')}
                  onChange={(e) => handleArrayFieldUpdate('kpis', e.target.value)}
                  placeholder="Enter KPIs"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="objectives">Strategic Objectives (comma-separated)</Label>
                <Textarea
                  id="objectives"
                  value={formData.objectives.join(', ')}
                  onChange={(e) => handleArrayFieldUpdate('objectives', e.target.value)}
                  placeholder="Enter strategic objectives"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={createLeaderMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {createLeaderMutation.isPending ? 'Creating...' : 'Create Leader'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Templates Section */}
      {templates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Leader Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {templates.map((template, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">{template.title}</h4>
                      <p className="text-sm text-gray-400">{template.department}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.responsibleAgents?.slice(0, 2).map((agent: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {agent}
                          </Badge>
                        ))}
                        {template.responsibleAgents?.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.responsibleAgents.length - 2} more
                          </Badge>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCreateFromTemplate(template)}
                        className="w-full mt-2"
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Leaders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Current Business Function Leaders</CardTitle>
        </CardHeader>
        <CardContent>
          {leaders.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No business function leaders found for {getExecutiveName(selectedExecutive)}</p>
              <p className="text-sm">Create your first leader using the templates above</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {leaders.map((leader: BusinessFunctionLeader) => (
                <Card key={leader.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">{leader.name}</h4>
                          <Badge variant={leader.isActive ? "default" : "secondary"}>
                            {leader.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-gray-400">{leader.title}</p>
                        <p className="text-sm text-gray-500">Department: {leader.department}</p>
                        
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-gray-300">Responsible Agents:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {leader.responsibleAgents.map((agent, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  <Zap className="h-3 w-3 mr-1" />
                                  {agent}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-sm font-medium text-gray-300">KPIs:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {leader.kpis.map((kpi, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  <Target className="h-3 w-3 mr-1" />
                                  {kpi}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(leader)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteLeaderMutation.mutate(leader.id)}
                          disabled={deleteLeaderMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Business Function Leader</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter leader name"
                />
              </div>
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter job title"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-department">Department</Label>
              <Input
                id="edit-department"
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                placeholder="Enter department"
              />
            </div>

            <div>
              <Label htmlFor="edit-responsibleAgents">Responsible Agents (comma-separated)</Label>
              <Textarea
                id="edit-responsibleAgents"
                value={formData.responsibleAgents.join(', ')}
                onChange={(e) => handleArrayFieldUpdate('responsibleAgents', e.target.value)}
                placeholder="Enter AI agent names"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-kpis">Key Performance Indicators (comma-separated)</Label>
              <Textarea
                id="edit-kpis"
                value={formData.kpis.join(', ')}
                onChange={(e) => handleArrayFieldUpdate('kpis', e.target.value)}
                placeholder="Enter KPIs"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-objectives">Strategic Objectives (comma-separated)</Label>
              <Textarea
                id="edit-objectives"
                value={formData.objectives.join(', ')}
                onChange={(e) => handleArrayFieldUpdate('objectives', e.target.value)}
                placeholder="Enter strategic objectives"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={updateLeaderMutation.isPending}
              >
                <Save className="h-4 w-4 mr-2" />
                {updateLeaderMutation.isPending ? 'Updating...' : 'Update Leader'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BusinessFunctionLeaderManager;