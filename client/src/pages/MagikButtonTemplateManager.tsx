import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Zap, 
  Plus, 
  Search, 
  Settings2, 
  Clock, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Timer,
  Brain,
  Wrench,
  MessageSquare,
  Calendar,
  Shield,
  BookOpen,
  FileText,
  Eye,
  Edit,
  Trash2,
  Star,
  Filter,
  ArrowLeft,
  Home
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import NavigationBreadcrumbs from "@/components/NavigationBreadcrumbs";

const categoryIcons = {
  service_delivery: Wrench,
  parts_management: Settings2,
  scheduling: Calendar,
  quality_assurance: Shield,
  customer_communication: MessageSquare,
  safety: AlertCircle,
  training: BookOpen,
  administrative: FileText
} as const;

const urgencyColors = {
  critical: "bg-red-500",
  high: "bg-orange-500", 
  medium: "bg-yellow-500",
  low: "bg-green-500"
} as const;

const statusColors = {
  pending: "bg-yellow-500",
  reviewing: "bg-blue-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
  implemented: "bg-purple-500"
} as const;

const templateFormSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  triggerPhrase: z.string().min(1, "Trigger phrase is required"),
  businessImpact: z.string().min(1, "Business impact is required"),
  estimatedTimeSavings: z.number().min(0, "Time savings must be positive"),
  frequency: z.enum(["high", "medium", "low"]),
  createdBy: z.string().min(1, "Creator is required")
});

const requestFormSchema = z.object({
  technicianId: z.string().min(1, "Technician ID is required"),
  technicianName: z.string().min(1, "Technician name is required"),
  requestText: z.string().min(1, "Request description is required"),
  urgency: z.enum(["critical", "high", "medium", "low"]),
  frequency: z.string().min(1, "Frequency is required"),
  currentWorkaround: z.string().optional(),
  estimatedTimeSpent: z.number().min(0).optional(),
  businessJustification: z.string().optional()
});

type TemplateFormData = z.infer<typeof templateFormSchema>;
type RequestFormData = z.infer<typeof requestFormSchema>;

export default function MagikButtonTemplateManager() {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isViewTemplateOpen, setIsViewTemplateOpen] = useState(false);
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false);
  const [showImplementationInstructions, setShowImplementationInstructions] = useState(false);

  const queryClient = useQueryClient();

  // Fetch templates
  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ["/api/magik-button/templates", selectedCategory],
    queryFn: () => apiRequest(`/api/magik-button/templates?category=${selectedCategory}`)
  });

  // Fetch capability requests
  const { data: requests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["/api/magik-button/capability-requests", selectedStatus, selectedCategory],
    queryFn: () => apiRequest(`/api/magik-button/capability-requests?status=${selectedStatus}&category=${selectedCategory}`)
  });

  // Fetch analytics
  const { data: analytics = {}, isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/magik-button/analytics"],
    queryFn: () => apiRequest("/api/magik-button/analytics")
  });

  // Fetch implementation instructions
  const { data: implementationInstructions = {}, isLoading: instructionsLoading } = useQuery({
    queryKey: ["/api/magik-button/templates", selectedTemplate?.id, "implementation"],
    queryFn: () => apiRequest(`/api/magik-button/templates/${selectedTemplate?.id}/implementation`),
    enabled: !!selectedTemplate?.id && showImplementationInstructions
  });

  // Create template mutation
  const createTemplateMutation = useMutation({
    mutationFn: async (data: TemplateFormData) => {
      const response = await fetch("/api/magik-button/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create template');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/magik-button/templates"] });
      setIsCreateTemplateOpen(false);
    }
  });

  // Create request mutation
  const createRequestMutation = useMutation({
    mutationFn: async (data: RequestFormData) => {
      const response = await fetch("/api/magik-button/capability-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create request');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/magik-button/capability-requests"] });
      setIsCreateRequestOpen(false);
    }
  });

  // Update template mutation
  const updateTemplateMutation = useMutation({
    mutationFn: async (data: { id: number; updates: Partial<TemplateFormData> }) => {
      const response = await fetch(`/api/magik-button/templates/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.updates)
      });
      if (!response.ok) throw new Error('Failed to update template');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/magik-button/templates"] });
      setIsEditTemplateOpen(false);
      setSelectedTemplate(null);
    }
  });

  // Handlers
  const handleViewTemplate = (template: any) => {
    setSelectedTemplate(template);
    setIsViewTemplateOpen(true);
  };

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template);
    setIsEditTemplateOpen(true);
  };

  const handleShowImplementationInstructions = (template: any) => {
    setSelectedTemplate(template);
    setShowImplementationInstructions(true);
  };

  const templateForm = useForm<TemplateFormData>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      frequency: "medium"
    }
  });

  const requestForm = useForm<RequestFormData>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      urgency: "medium"
    }
  });

  const filteredTemplates = templates.filter((template: any) => {
    if (!searchQuery || searchQuery.trim() === "") return true;
    const query = searchQuery.toLowerCase();
    return (
      (template.name || "").toLowerCase().includes(query) ||
      (template.description || "").toLowerCase().includes(query)
    );
  });

  const filteredRequests = requests.filter((request: any) => {
    if (!searchQuery || searchQuery.trim() === "") return true;
    const query = searchQuery.toLowerCase();
    return (
      (request.technicianName || "").toLowerCase().includes(query) ||
      (request.requestText || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
        <NavigationBreadcrumbs 
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Magik Button Template Manager' }
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap className="w-8 h-8 text-blue-500" />
            Magik Button Template Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create and manage dynamic AI capabilities based on technician requests
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Magik Button Template</DialogTitle>
                <DialogDescription>
                  Create a new automated capability template for technicians
                </DialogDescription>
              </DialogHeader>
              <Form {...templateForm}>
                <form onSubmit={templateForm.handleSubmit((data) => createTemplateMutation.mutate(data))} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={templateForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Template Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Emergency Dispatch Trigger" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={templateForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="service_delivery">Service Delivery</SelectItem>
                              <SelectItem value="parts_management">Parts Management</SelectItem>
                              <SelectItem value="scheduling">Scheduling</SelectItem>
                              <SelectItem value="quality_assurance">Quality Assurance</SelectItem>
                              <SelectItem value="customer_communication">Customer Communication</SelectItem>
                              <SelectItem value="safety">Safety</SelectItem>
                              <SelectItem value="training">Training</SelectItem>
                              <SelectItem value="administrative">Administrative</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={templateForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what this template automates..."
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={templateForm.control}
                      name="triggerPhrase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trigger Phrase</FormLabel>
                          <FormControl>
                            <Input placeholder="emergency situation" {...field} />
                          </FormControl>
                          <FormDescription>
                            What technicians say to activate this capability
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={templateForm.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Usage Frequency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="high">High (Daily)</SelectItem>
                              <SelectItem value="medium">Medium (Weekly)</SelectItem>
                              <SelectItem value="low">Low (Monthly)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={templateForm.control}
                    name="businessImpact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Impact</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the business value and benefits..."
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={templateForm.control}
                      name="estimatedTimeSavings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Time Savings (minutes)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="30"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={templateForm.control}
                      name="createdBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Created By</FormLabel>
                          <FormControl>
                            <Input placeholder="Operations Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsCreateTemplateOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createTemplateMutation.isPending}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {createTemplateMutation.isPending ? "Creating..." : "Create Template"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateRequestOpen} onOpenChange={setIsCreateRequestOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Submit Capability Request</DialogTitle>
                <DialogDescription>
                  Request a new automated capability for field operations
                </DialogDescription>
              </DialogHeader>
              <Form {...requestForm}>
                <form onSubmit={requestForm.handleSubmit((data) => createRequestMutation.mutate(data))} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={requestForm.control}
                      name="technicianId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technician ID</FormLabel>
                          <FormControl>
                            <Input placeholder="TECH-1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={requestForm.control}
                      name="technicianName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technician Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={requestForm.control}
                    name="requestText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Request Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what you need automated and why..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={requestForm.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Urgency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="critical">Critical</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={requestForm.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How Often Needed</FormLabel>
                          <FormControl>
                            <Input placeholder="Daily, Weekly, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={requestForm.control}
                    name="currentWorkaround"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Workaround</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How do you currently handle this task?"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={requestForm.control}
                      name="estimatedTimeSpent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Spent (minutes per occurrence)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="15"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div></div>
                  </div>

                  <FormField
                    control={requestForm.control}
                    name="businessJustification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Justification</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Why should this be automated? What's the business impact?"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsCreateRequestOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createRequestMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {createRequestMutation.isPending ? "Submitting..." : "Submit Request"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Analytics Overview */}
      {!analyticsLoading && analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Templates</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics.activeTemplates || 0}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Usages</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics.totalUsages?.toLocaleString() || 0}
                  </p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Time Saved (hours)</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round((analytics.totalTimeSaved || 0) / 60)}
                  </p>
                </div>
                <Timer className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics.successRate || 0}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search templates and requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="service_delivery">Service Delivery</SelectItem>
              <SelectItem value="parts_management">Parts Management</SelectItem>
              <SelectItem value="scheduling">Scheduling</SelectItem>
              <SelectItem value="quality_assurance">Quality Assurance</SelectItem>
              <SelectItem value="customer_communication">Customer Communication</SelectItem>
              <SelectItem value="safety">Safety</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="administrative">Administrative</SelectItem>
            </SelectContent>
          </Select>

          {activeTab === "requests" && (
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="implemented">Implemented</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Settings2 className="w-4 h-4" />
            Active Templates ({filteredTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Capability Requests ({filteredRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          {templatesLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTemplates.map((template: any) => {
                const CategoryIcon = categoryIcons[template.category as keyof typeof categoryIcons] || Settings2;
                
                return (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <CategoryIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {template.category.replace('_', ' ')}
                              </Badge>
                              <Badge 
                                variant={template.frequency === 'high' ? 'destructive' : template.frequency === 'medium' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {template.frequency} usage
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewTemplate(template)}
                            title="View Template Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditTemplate(template)}
                            title="Edit Template"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm mb-4">
                        {template.description}
                      </CardDescription>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <MessageSquare className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Trigger:</span>
                          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                            "{template.triggerPhrase}"
                          </code>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Timer className="w-4 h-4 text-green-500" />
                          <span className="font-medium">Saves:</span>
                          <span>{template.estimatedTimeSavings} minutes per use</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Brain className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">AI Agents:</span>
                          <span className="text-xs">
                            {template.aiAgents?.length || 0} agents involved
                          </span>
                        </div>
                        
                        <div className="text-sm">
                          <span className="font-medium text-blue-600 dark:text-blue-400">Impact:</span>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {template.businessImpact}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-xs text-gray-500">
                            Created by {template.createdBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400">Active</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          {requestsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request: any) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                          <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {request.technicianName} ({request.technicianId})
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              className={`text-xs text-white ${urgencyColors[request.urgency as keyof typeof urgencyColors]}`}
                            >
                              {request.urgency} urgency
                            </Badge>
                            <Badge 
                              className={`text-xs text-white ${statusColors[request.status as keyof typeof statusColors]}`}
                            >
                              {request.status}
                            </Badge>
                            {request.suggestedCategory && (
                              <Badge variant="outline" className="text-xs">
                                {request.suggestedCategory.replace('_', ' ')}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Request Description:</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          {request.requestText}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">Frequency:</span>
                          <p className="text-gray-600 dark:text-gray-400">{request.frequency}</p>
                        </div>
                        {request.estimatedTimeSpent && (
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Time Spent:</span>
                            <p className="text-gray-600 dark:text-gray-400">{request.estimatedTimeSpent} min</p>
                          </div>
                        )}
                        {request.assignedTo && (
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">Assigned To:</span>
                            <p className="text-gray-600 dark:text-gray-400">{request.assignedTo}</p>
                          </div>
                        )}
                      </div>
                      
                      {request.currentWorkaround && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Current Workaround:</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {request.currentWorkaround}
                          </p>
                        </div>
                      )}
                      
                      {request.businessJustification && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Business Justification:</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {request.businessJustification}
                          </p>
                        </div>
                      )}
                      
                      {request.reviewNotes && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <h4 className="font-medium text-blue-900 dark:text-blue-400 mb-1">Review Notes:</h4>
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            {request.reviewNotes}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="text-xs text-gray-500">
                          Last updated: {new Date(request.updatedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          {request.status === 'pending' && (
                            <>
                              <Button size="sm" variant="outline" className="text-xs">
                                Review
                              </Button>
                              <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                                Approve
                              </Button>
                            </>
                          )}
                          {request.status === 'approved' && (
                            <Button size="sm" className="text-xs bg-purple-600 hover:bg-purple-700">
                              Create Template
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* View Template Dialog */}
      <Dialog open={isViewTemplateOpen} onOpenChange={setIsViewTemplateOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
          <DialogHeader className="pb-6 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              {selectedTemplate?.name}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 dark:text-gray-400 mt-2">
              Comprehensive template details and implementation guidance
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-8 py-6">
              {console.log('Selected template AI agents:', selectedTemplate.aiAgents)}
              {/* Template Overview */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-blue-700 dark:text-blue-300">Category</h3>
                    <Badge variant="secondary" className="text-sm font-medium">
                      {selectedTemplate.category?.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-purple-700 dark:text-purple-300">Frequency</h3>
                    <Badge 
                      variant={selectedTemplate.frequency === 'high' ? 'destructive' : selectedTemplate.frequency === 'medium' ? 'default' : 'secondary'}
                      className="text-sm font-medium"
                    >
                      {selectedTemplate.frequency} usage
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-bold text-sm uppercase tracking-wide text-green-700 dark:text-green-300">Created By</h3>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {selectedTemplate.createdBy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description and Trigger */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Description</h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedTemplate.description}
                  </p>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-3">TRIGGER PHRASE</h4>
                    <code className="bg-gray-800 dark:bg-gray-100 text-green-400 dark:text-gray-800 px-4 py-3 rounded-lg text-base block font-mono">
                      "{selectedTemplate.triggerPhrase}"
                    </code>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl border border-green-200 dark:border-green-800">
                        <div className="text-sm font-medium text-green-700 dark:text-green-300">Time Savings</div>
                        <div className="text-2xl font-bold text-green-800 dark:text-green-200">{selectedTemplate.estimatedTimeSavings}min</div>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Usage Count</div>
                        <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{selectedTemplate.usageCount || 0}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-3">AI AGENTS INVOLVED</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.aiAgents && Array.isArray(selectedTemplate.aiAgents) && selectedTemplate.aiAgents.length > 0 ? (
                        selectedTemplate.aiAgents.map((agent: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-sm px-3 py-1 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
                            <Brain className="w-3 h-3 mr-2 text-blue-600 dark:text-blue-400" />
                            <span className="text-blue-700 dark:text-blue-300">{agent}</span>
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500 italic">No AI agents specified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Impact */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <h3 className="font-bold text-lg text-yellow-800 dark:text-yellow-200 mb-3">Business Impact</h3>
                <p className="text-base text-yellow-700 dark:text-yellow-300 leading-relaxed">
                  {selectedTemplate.businessImpact}
                </p>
              </div>
              
              {/* Implementation Preview */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white">Implementation Preview</h3>
                  <Button 
                    onClick={() => handleShowImplementationInstructions(selectedTemplate)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 text-base font-medium"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    View Complete Instructions
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-base text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Required Fields
                    </h4>
                    <ul className="space-y-3">
                      {selectedTemplate.requiredFields?.map((field: string, index: number) => (
                        <li key={index} className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">{field}</span>
                        </li>
                      )) || <li className="text-gray-500 italic">No required fields specified</li>}
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-base text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Settings2 className="w-5 h-5 text-blue-500" />
                      Automation Steps
                    </h4>
                    <ol className="space-y-3">
                      {selectedTemplate.automationSteps?.map((step: string, index: number) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-sm rounded-full flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                        </li>
                      )) || <li className="text-gray-500 italic">No automation steps specified</li>}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Implementation Instructions Dialog */}
      <Dialog open={showImplementationInstructions} onOpenChange={setShowImplementationInstructions}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
          <DialogHeader className="pb-6 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              Implementation Guide: {selectedTemplate?.name}
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 dark:text-gray-400 mt-2">
              Complete step-by-step implementation guide for Magik Button and Tech Hub integration
            </DialogDescription>
          </DialogHeader>
          
          {!instructionsLoading && implementationInstructions && (
            <div className="space-y-8 py-6">
              {/* Implementation Overview */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500 rounded-full">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">Magik Button Integration</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {implementationInstructions.magikButtonIntegration?.estimatedTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500 rounded-full">
                      <Settings2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">Tech Hub Integration</h3>
                      <p className="text-green-600 dark:text-green-400 font-medium">
                        {implementationInstructions.techHubIntegration?.estimatedTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Magik Button Integration */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-blue-800 dark:text-blue-200">
                      {implementationInstructions.magikButtonIntegration?.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400">
                      Primary technician interface implementation
                    </p>
                  </div>
                </div>
                
                <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Timer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-blue-800 dark:text-blue-200">
                      Estimated Implementation Time: {implementationInstructions.magikButtonIntegration?.estimatedTime}
                    </span>
                  </div>
                </div>
                
                <ol className="space-y-4">
                  {implementationInstructions.magikButtonIntegration?.steps?.map((step: string, index: number) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white text-base rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              
              {/* Tech Hub Integration */}
              <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Settings2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-green-800 dark:text-green-200">
                      {implementationInstructions.techHubIntegration?.title}
                    </h3>
                    <p className="text-green-600 dark:text-green-400">
                      Backend systems and administrative interface
                    </p>
                  </div>
                </div>
                
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Timer className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      Estimated Implementation Time: {implementationInstructions.techHubIntegration?.estimatedTime}
                    </span>
                  </div>
                </div>
                
                <ol className="space-y-4">
                  {implementationInstructions.techHubIntegration?.steps?.map((step: string, index: number) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white text-base rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              
              {/* Deployment Checklist */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-yellow-800 dark:text-yellow-200">Deployment Checklist</h3>
                    <p className="text-yellow-600 dark:text-yellow-400">
                      Essential verification steps before going live
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {implementationInstructions.deploymentChecklist?.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <span className="text-base text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Metrics */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-8 rounded-xl border border-purple-200 dark:border-purple-800">
                <h3 className="font-bold text-xl text-purple-800 dark:text-purple-200 mb-4 flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  Expected Outcomes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {selectedTemplate?.estimatedTimeSavings}min
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Time Saved Per Use</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {selectedTemplate?.frequency?.toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Expected Usage Frequency</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {selectedTemplate?.aiAgents?.length || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI Agents Involved</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {instructionsLoading && (
            <div className="flex items-center justify-center h-48">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                <p className="text-lg text-gray-500 mt-4">Loading implementation instructions...</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}