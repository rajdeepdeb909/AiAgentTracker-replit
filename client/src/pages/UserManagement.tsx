import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest } from "@/lib/queryClient";
import { Users, Plus, Edit, Trash2, Shield, Bot, User, ArrowLeft, Check, X } from "lucide-react";
import { useLocation } from "wouter";
import { PERMISSIONS_BY_CATEGORY, ROLE_PERMISSIONS } from "@shared/permissions";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  userType: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  department?: string;
  title?: string;
  permissions: string[];
  coordinatedAgents?: string[];
  planningAreas?: string[];
  isActive: boolean;
  lastLoginAt?: string;
  createdAt?: string;
}

interface CreateUserData {
  username: string;
  email: string;
  password: string;
  role: string;
  userType: string;
  firstName?: string;
  lastName?: string;
  department?: string;
  title?: string;
  agentType?: string;
  humanRoleType?: string;
  planningAreas?: string[];
}

export default function UserManagement() {
  const [, setLocation] = useLocation();
  const { user: currentUser, hasPermission } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Helper functions
  const togglePermission = (permission: string) => {
    setEditingPermissions(prev => 
      prev.includes(permission) 
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const applyRoleTemplate = (role: string) => {
    const rolePermissions = ROLE_PERMISSIONS[role] as string[];
    if (rolePermissions) {
      setEditingPermissions([...rolePermissions]);
      toast({
        title: "Role Template Applied",
        description: `Applied ${role} permissions template (${rolePermissions.length} permissions)`,
      });
    }
  };
  const [selectedTab, setSelectedTab] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingPermissions, setEditingPermissions] = useState<string[]>([]);
  const [createUserData, setCreateUserData] = useState<CreateUserData>({
    username: '',
    email: '',
    password: '',
    role: 'operator',
    userType: 'human',
    firstName: '',
    lastName: '',
    department: '',
    title: '',
    planningAreas: []
  });

  // Check if user has permission to access this page
  if (!hasPermission('manage_users')) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Card className="bg-gray-900 border-gray-700 max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-gray-400 mb-4">You don't have permission to access user management.</p>
            <Button onClick={() => setLocation('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fetch all users
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ['/api/auth/users'],
  });

  // Fetch AI agents
  const { data: aiAgentsData, isLoading: agentsLoading } = useQuery({
    queryKey: ['/api/auth/ai-agents'],
  });

  // Fetch human users
  const { data: humanUsersData, isLoading: humansLoading } = useQuery({
    queryKey: ['/api/auth/human-users'],
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData: CreateUserData) => {
      const response = await apiRequest('/api/auth/users', 'POST', userData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/ai-agents'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/human-users'] });
      setShowCreateDialog(false);
      setCreateUserData({
        username: '',
        email: '',
        password: '',
        role: 'operator',
        userType: 'human',
        firstName: '',
        lastName: '',
        department: '',
        title: '',
        planningAreas: []
      });
      toast({
        title: "User Created",
        description: "New user has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create user.",
        variant: "destructive",
      });
    }
  });

  // Update permissions mutation
  const updatePermissionsMutation = useMutation({
    mutationFn: async ({ userId, permissions }: { userId: string; permissions: string[] }) => {
      const response = await apiRequest(`/api/auth/users/${userId}/permissions`, 'PATCH', { permissions });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/users'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/ai-agents'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/human-users'] });
      setShowEditDialog(false);
      toast({
        title: "Permissions Updated",
        description: `Successfully updated permissions for ${editingUser?.displayName}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update permissions.",
        variant: "destructive",
      });
    }
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(createUserData);
  };

  const handleSavePermissions = () => {
    if (editingUser) {
      updatePermissionsMutation.mutate({
        userId: editingUser.id,
        permissions: editingPermissions
      });
    }
  };

  // Get password for a specific user (demo credentials)
  const getPasswordForUser = (username: string): string => {
    const credentialsMap: { [key: string]: string } = {
      'admin': 'SecureAdmin2025!',
      'ceo': 'ceo_secure_2025',
      'amanda.thompson': 'operations_manager_2025',
      'scheduling': 'scheduling_key_2025',
      'agent_scheduling': 'agent_scheduling_2025',
      'agent_dispatch': 'agent_dispatch_2025',
      'agent_customer_service': 'agent_customer_service_2025',
      'agent_parts_ordering': 'agent_parts_ordering_2025',
      'agent_inventory': 'agent_inventory_2025',
      'agent_emergency': 'agent_emergency_2025',
      'agent_quality': 'agent_quality_2025',
      'agent_pricing': 'agent_pricing_2025',
      'agent_maintenance': 'agent_maintenance_2025',
      'agent_advanced_scheduling': 'agent_advanced_scheduling_2025',
      'agent_technician_hub': 'agent_technician_hub_2025',
      'agent_outstanding_orders': 'agent_outstanding_orders_2025',
      'agent_parts_prediction': 'agent_parts_prediction_2025',
      'agent_llm_recommendation': 'agent_llm_recommendation_2025',
      'agent_b2b_intelligence': 'agent_b2b_intelligence_2025',
      'agent_local_market': 'agent_local_market_2025',
      'agent_parts_specialist': 'agent_parts_specialist_2025',
      'agent_performance_analytics': 'agent_performance_analytics_2025',
      'agent_regional_monitor': 'agent_regional_monitor_2025',
      'agent_technician_management': 'agent_technician_management_2025',
      'agent_technician_recruiting': 'agent_technician_recruiting_2025',
      'agent_technician_training': 'agent_technician_training_2025',
      'agent_conversational_commerce': 'agent_conversational_commerce_2025',
      'agent_llm_content': 'agent_llm_content_2025',
      'agent_retention_intelligence': 'agent_retention_intelligence_2025',
      'john.miller': 'john_manager_2025',
      'sarah.davis': 'sarah_coordinator_2025',
      'mike.wilson': 'mike_operator_2025',
      'lisa.brown': 'lisa_specialist_2025',
      'david.jones': 'david_analyst_2025',
      'jennifer.garcia': 'jennifer_manager_2025',
      'robert.martinez': 'robert_supervisor_2025',
      'emily.rodriguez': 'emily_coordinator_2025',
      'michael.anderson': 'michael_operator_2025',
      'jessica.taylor': 'jessica_specialist_2025',
      'william.thomas': 'william_analyst_2025',
      'ashley.hernandez': 'ashley_manager_2025',
      'christopher.moore': 'christopher_supervisor_2025',
      'amanda.martin': 'amanda_coordinator_2025',
      'matthew.jackson': 'matthew_operator_2025',
      'lauren.thompson': 'lauren_specialist_2025',
      'daniel.white': 'daniel_analyst_2025',
      'stephanie.lopez': 'stephanie_manager_2025',
      'joshua.lee': 'joshua_supervisor_2025',
      'michelle.gonzalez': 'michelle_coordinator_2025',
    };
    
    return credentialsMap[username] || 'default_password_2025';
  };

  const getUsersByType = () => {
    switch (selectedTab) {
      case 'humans':
        return humanUsersData?.humans || [];
      case 'agents':
        return aiAgentsData?.agents || [];
      default:
        return usersData?.users || [];
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'ai_agent':
        return <Bot className="w-4 h-4" />;
      case 'human':
        return <User className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-900 text-red-300';
      case 'executive':
        return 'bg-purple-900 text-purple-300';
      case 'manager':
        return 'bg-blue-900 text-blue-300';
      case 'operator':
        return 'bg-green-900 text-green-300';
      case 'agent':
        return 'bg-orange-900 text-orange-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  if (usersLoading || agentsLoading || humansLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/dashboard')}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                User Management
              </h1>
              <p className="text-gray-400">Manage users, AI agents, and access permissions</p>
            </div>
          </div>
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">Create New User</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Add a new user, AI agent, or coordinator to the platform
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <Input
                      id="username"
                      value={createUserData.username}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, username: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={createUserData.email}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={createUserData.password}
                    onChange={(e) => setCreateUserData(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="userType" className="text-white">User Type</Label>
                    <Select
                      value={createUserData.userType}
                      onValueChange={(value) => setCreateUserData(prev => ({ ...prev, userType: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="human">Human</SelectItem>
                        <SelectItem value="ai_agent">AI Agent</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="role" className="text-white">Role</Label>
                    <Select
                      value={createUserData.role}
                      onValueChange={(value) => setCreateUserData(prev => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="operator">Operator</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="human_coordinator">Human Coordinator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="department" className="text-white">Department</Label>
                    <Input
                      id="department"
                      value={createUserData.department}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, department: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="Operations, Finance, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input
                      id="firstName"
                      value={createUserData.firstName}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input
                      id="lastName"
                      value={createUserData.lastName}
                      onChange={(e) => setCreateUserData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title" className="text-white">Title</Label>
                  <Input
                    id="title"
                    value={createUserData.title}
                    onChange={(e) => setCreateUserData(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Operations Manager, AI Agent, etc."
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                    className="border-gray-600 text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={createUserMutation.isPending}
                  >
                    {createUserMutation.isPending ? 'Creating...' : 'Create User'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Edit User Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Edit User Permissions</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Modify access permissions and settings for {editingUser?.displayName || editingUser?.username}
                </DialogDescription>
              </DialogHeader>
              
              {editingUser && (
                <div className="space-y-6">
                  {/* User Info */}
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {editingUser.userType === 'ai_agent' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                        <div>
                          <h3 className="text-white font-medium">{editingUser.displayName}</h3>
                          <p className="text-gray-400 text-sm">@{editingUser.username} • {editingUser.role}</p>
                        </div>
                      </div>
                      <Badge className={getRoleBadgeColor(editingUser.role)}>
                        {editingUser.role}
                      </Badge>
                    </div>
                  </div>

                  {/* Current Permissions */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Current Permissions ({editingPermissions.length})</h4>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {editingPermissions.map((permission) => (
                          <div 
                            key={permission} 
                            className="flex items-center justify-between p-2 bg-gray-700 rounded text-sm cursor-pointer hover:bg-gray-600"
                            onClick={() => togglePermission(permission)}
                          >
                            <div className="flex items-center gap-2">
                              <Check className="w-3 h-3 text-green-500" />
                              <span className="text-gray-300">{permission.replace(/_/g, ' ')}</span>
                            </div>
                            <X className="w-3 h-3 text-red-400 opacity-0 hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Available Permissions to Add */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Available Permissions</h4>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(PERMISSIONS_BY_CATEGORY).map(([category, permissions]) => (
                          <div key={category} className="space-y-2">
                            <h5 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                              {category.replace(/_/g, ' ')}
                            </h5>
                            <div className="space-y-1">
                              {(permissions as string[]).map((permission: string) => {
                                const hasPermission = editingPermissions.includes(permission);
                                return (
                                  <div
                                    key={permission}
                                    className={`flex items-center justify-between p-2 rounded text-sm cursor-pointer hover:bg-gray-600 transition-colors ${
                                      hasPermission ? 'bg-green-900/20 border border-green-500/30' : 'bg-gray-700'
                                    }`}
                                    onClick={() => togglePermission(permission)}
                                  >
                                    <span className="text-gray-300">{permission.replace(/_/g, ' ')}</span>
                                    {hasPermission ? (
                                      <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                      <Plus className="w-4 h-4 text-gray-500" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Role-based Permission Templates */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Quick Role Templates</h4>
                    <div className="flex gap-2 flex-wrap">
                      {Object.entries(ROLE_PERMISSIONS).map(([role, permissions]) => (
                        <Button
                          key={role}
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          onClick={() => applyRoleTemplate(role)}
                        >
                          Apply {role} Template ({(permissions as string[]).length})
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-700">
                    <Button
                      variant="outline"
                      onClick={() => setShowEditDialog(false)}
                      className="border-gray-600 text-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleSavePermissions}
                      disabled={updatePermissionsMutation.isPending}
                    >
                      {updatePermissionsMutation.isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{usersData?.users.length || 0}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">AI Agents</p>
                  <p className="text-2xl font-bold text-white">{aiAgentsData?.agents.length || 0}</p>
                </div>
                <Bot className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Human Users</p>
                  <p className="text-2xl font-bold text-white">{humanUsersData?.humans.length || 0}</p>
                </div>
                <User className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-white">
                    {usersData?.users.filter(u => u.isActive).length || 0}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User List */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">User Directory</CardTitle>
            <CardDescription className="text-gray-400">
              Manage all users, AI agents, and their permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="bg-gray-800 mb-6">
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">All Users</TabsTrigger>
                <TabsTrigger value="humans" className="data-[state=active]:bg-gray-700">Human Users</TabsTrigger>
                <TabsTrigger value="agents" className="data-[state=active]:bg-gray-700">AI Agents</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab}>
                <div className="space-y-4">
                  {getUsersByType().map((user) => (
                    <div key={user.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {getUserTypeIcon(user.userType)}
                            <div>
                              <h3 className="text-white font-medium">
                                {user.displayName || `${user.firstName} ${user.lastName}`.trim() || user.username}
                              </h3>
                              <p className="text-gray-400 text-sm">@{user.username}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge className={getRoleBadgeColor(user.role)}>
                              {user.role}
                            </Badge>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {user.userType.replace('_', ' ')}
                            </Badge>
                            {user.department && (
                              <Badge variant="outline" className="border-gray-600 text-gray-300">
                                {user.department}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="text-right text-sm">
                            <p className="text-gray-400">
                              {user.permissions.length} permissions
                            </p>
                            {user.lastLoginAt && (
                              <p className="text-gray-500">
                                Last login: {new Date(user.lastLoginAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-gray-400 hover:text-white"
                              onClick={() => {
                                setEditingUser(user);
                                setEditingPermissions([...user.permissions]);
                                setShowEditDialog(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-gray-400 hover:text-red-400"
                              onClick={() => {
                                // TODO: Implement delete functionality
                                toast({
                                  title: "Delete User",
                                  description: "Delete functionality will be implemented soon.",
                                });
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {user.title && (
                        <p className="text-gray-400 text-sm mt-2">{user.title}</p>
                      )}
                      
                      {/* Credentials Section */}
                      <div className="bg-gray-800 p-3 rounded-lg mt-3 border border-gray-700">
                        <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Login Credentials
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Username:</span>
                            <span className="text-white font-mono">{user.username}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Password:</span>
                            <span className="text-white font-mono">
                              {getPasswordForUser(user.username)}
                            </span>
                          </div>
                          {user.email && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Email:</span>
                              <span className="text-white font-mono">{user.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}