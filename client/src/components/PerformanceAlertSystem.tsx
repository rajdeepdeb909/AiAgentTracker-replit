import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Bell, CheckCircle, Clock, Plus, Settings, X, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertPerformanceAlertSchema, type PerformanceAlert, type AlertTrigger, type Agent } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const alertFormSchema = insertPerformanceAlertSchema.extend({
  agentId: z.number().positive("Please select an agent"),
  alertName: z.string().min(1, "Alert name is required"),
  metricType: z.string().min(1, "Metric type is required"),
  condition: z.string().min(1, "Condition is required"),
  threshold: z.string().min(1, "Threshold is required"),
  severity: z.string().min(1, "Severity is required"),
  notificationChannels: z.array(z.string()).default([]),
  createdBy: z.string().min(1, "Created by is required"),
});

type AlertFormData = z.infer<typeof alertFormSchema>;

interface PerformanceAlertSystemProps {
  selectedAgentId?: number;
}

export function PerformanceAlertSystem({ selectedAgentId }: PerformanceAlertSystemProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [location, setLocation] = useLocation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<PerformanceAlert | null>(null);

  const { data: agents = [] } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  const { data: alerts = [] } = useQuery<PerformanceAlert[]>({
    queryKey: ["/api/alerts", selectedAgentId],
    queryFn: async () => {
      const response = await fetch(`/api/alerts${selectedAgentId ? `?agentId=${selectedAgentId}` : ""}`);
      return response.json();
    },
  });

  const { data: alertTriggers = [] } = useQuery<AlertTrigger[]>({
    queryKey: ["/api/alert-triggers", selectedAgentId],
    queryFn: async () => {
      const response = await fetch(`/api/alert-triggers${selectedAgentId ? `?agentId=${selectedAgentId}` : ""}`);
      return response.json();
    },
  });

  const createAlertMutation = useMutation({
    mutationFn: async (data: AlertFormData) => {
      const response = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Alert Created",
        description: "Performance alert has been created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create performance alert.",
        variant: "destructive",
      });
    },
  });

  const deleteAlertMutation = useMutation({
    mutationFn: async (alertId: number) => {
      const response = await fetch(`/api/alerts/${alertId}`, {
        method: "DELETE",
      });
      return response.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alerts"] });
      toast({
        title: "Alert Deleted",
        description: "Performance alert has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete performance alert.",
        variant: "destructive",
      });
    },
  });

  const acknowledgeTriggerMutation = useMutation({
    mutationFn: async ({ triggerId, acknowledgedBy, notes }: { triggerId: number; acknowledgedBy: string; notes?: string }) => {
      const response = await fetch(`/api/alert-triggers/${triggerId}/acknowledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acknowledgedBy, notes }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alert-triggers"] });
      toast({
        title: "Alert Acknowledged",
        description: "Alert trigger has been acknowledged.",
      });
    },
  });

  const resolveTriggerMutation = useMutation({
    mutationFn: async ({ triggerId, notes }: { triggerId: number; notes?: string }) => {
      const response = await fetch(`/api/alert-triggers/${triggerId}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alert-triggers"] });
      toast({
        title: "Alert Resolved",
        description: "Alert trigger has been resolved.",
      });
    },
  });

  const form = useForm<AlertFormData>({
    resolver: zodResolver(alertFormSchema),
    defaultValues: {
      agentId: selectedAgentId || 0,
      alertName: "",
      metricType: "",
      condition: "",
      threshold: "",
      severity: "medium",
      isActive: true,
      notificationChannels: ["dashboard"],
      createdBy: "System Administrator",
    },
  });

  const onSubmit = (data: AlertFormData) => {
    createAlertMutation.mutate(data);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "acknowledged": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "resolved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const activeTriggers = (alertTriggers as AlertTrigger[]).filter(trigger => trigger.status === "active");
  const acknowledgedTriggers = (alertTriggers as AlertTrigger[]).filter(trigger => trigger.status === "acknowledged");
  const resolvedTriggers = (alertTriggers as AlertTrigger[]).filter(trigger => trigger.status === "resolved");

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        onClick={() => setLocation('/dashboard')}
        variant="outline"
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Performance Alert System</h2>
          <p className="text-muted-foreground">Monitor and manage agent performance alerts</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Performance Alert</DialogTitle>
              <DialogDescription>
                Set up a new performance alert to monitor agent metrics automatically.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="agentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select agent" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {agents.map((agent) => (
                              <SelectItem key={agent.id} value={agent.id.toString()}>
                                {agent.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="alertName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alert Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Performance threshold alert" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="metricType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Metric Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select metric" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="performance">Performance Score</SelectItem>
                            <SelectItem value="response_time">Response Time</SelectItem>
                            <SelectItem value="accuracy">Accuracy</SelectItem>
                            <SelectItem value="customer_satisfaction">Customer Satisfaction</SelectItem>
                            <SelectItem value="daily_interactions">Daily Interactions</SelectItem>
                            <SelectItem value="monthly_cost">Monthly Cost</SelectItem>
                            <SelectItem value="revenue_impact">Revenue Impact</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="below">Below threshold</SelectItem>
                            <SelectItem value="above">Above threshold</SelectItem>
                            <SelectItem value="equals">Equals threshold</SelectItem>
                            <SelectItem value="change_percentage">Change percentage</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="threshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Threshold Value</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="85.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity Level</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createAlertMutation.isPending}>
                    {createAlertMutation.isPending ? "Creating..." : "Create Alert"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Alert Configuration</TabsTrigger>
          <TabsTrigger value="active">Active Alerts ({activeTriggers.length})</TabsTrigger>
          <TabsTrigger value="acknowledged">Acknowledged ({acknowledgedTriggers.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedTriggers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {(alerts as PerformanceAlert[]).map((alert) => {
              const agent = agents.find(a => a.id === alert.agentId);
              return (
                <Card key={alert.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{alert.alertName}</CardTitle>
                        <CardDescription>
                          {agent?.name} - {alert.metricType} {alert.condition} {alert.threshold}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                        <Badge variant={alert.isActive ? "default" : "secondary"}>
                          {alert.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteAlertMutation.mutate(alert.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <Label className="text-muted-foreground">Trigger Count</Label>
                        <p className="font-medium">{alert.triggerCount || 0}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Last Triggered</Label>
                        <p className="font-medium">
                          {alert.lastTriggered 
                            ? new Date(alert.lastTriggered).toLocaleDateString()
                            : "Never"
                          }
                        </p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Created By</Label>
                        <p className="font-medium">{alert.createdBy}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {(alerts as PerformanceAlert[]).length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No performance alerts configured</p>
                  <p className="text-sm text-muted-foreground">Create your first alert to start monitoring</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <AlertTriggersTab 
            triggers={activeTriggers} 
            agents={agents}
            onAcknowledge={(triggerId, notes) => 
              acknowledgeTriggerMutation.mutate({ triggerId, acknowledgedBy: "System Administrator", notes })
            }
            onResolve={(triggerId, notes) => 
              resolveTriggerMutation.mutate({ triggerId, notes })
            }
          />
        </TabsContent>

        <TabsContent value="acknowledged" className="space-y-4">
          <AlertTriggersTab 
            triggers={acknowledgedTriggers} 
            agents={agents}
            onResolve={(triggerId, notes) => 
              resolveTriggerMutation.mutate({ triggerId, notes })
            }
          />
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <AlertTriggersTab triggers={resolvedTriggers} agents={agents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AlertTriggersTabProps {
  triggers: AlertTrigger[];
  agents: Agent[];
  onAcknowledge?: (triggerId: number, notes?: string) => void;
  onResolve?: (triggerId: number, notes?: string) => void;
}

function AlertTriggersTab({ triggers, agents, onAcknowledge, onResolve }: AlertTriggersTabProps) {
  const [notes, setNotes] = useState<{ [key: number]: string }>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "acknowledged": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "resolved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="grid gap-4">
      {triggers.map((trigger) => {
        const agent = agents.find(a => a.id === trigger.agentId);
        return (
          <Card key={trigger.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                    {agent?.name || `Agent ${trigger.agentId}`}
                  </CardTitle>
                  <CardDescription>
                    Triggered: {new Date(trigger.triggeredAt!).toLocaleString()}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(trigger.status)}>
                  {trigger.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">Metric Value</Label>
                  <p className="font-medium">{trigger.metricValue}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Threshold</Label>
                  <p className="font-medium">{trigger.threshold}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Severity</Label>
                  <p className="font-medium capitalize">{trigger.severity}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="font-medium capitalize">{trigger.status}</p>
                </div>
              </div>

              {trigger.notes && (
                <div className="mb-4">
                  <Label className="text-muted-foreground">Notes</Label>
                  <p className="text-sm bg-muted p-2 rounded">{trigger.notes}</p>
                </div>
              )}

              {(onAcknowledge || onResolve) && (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Add notes..."
                    value={notes[trigger.id] || ""}
                    onChange={(e) => setNotes(prev => ({ ...prev, [trigger.id]: e.target.value }))}
                  />
                  <div className="flex space-x-2">
                    {onAcknowledge && trigger.status === "active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onAcknowledge(trigger.id, notes[trigger.id])}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Acknowledge
                      </Button>
                    )}
                    {onResolve && trigger.status !== "resolved" && (
                      <Button
                        size="sm"
                        onClick={() => onResolve(trigger.id, notes[trigger.id])}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
      {triggers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No alerts in this category</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}