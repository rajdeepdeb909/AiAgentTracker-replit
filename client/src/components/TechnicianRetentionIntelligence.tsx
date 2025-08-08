import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Users, Clock, DollarSign, Star, TrendingUp, TrendingDown, Target, MessageSquare, Phone, Mail, Calendar, Shield, Award, Settings, Activity, Brain, X, Send, Plus, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import SystemWideActivityFeed from './SystemWideActivityFeed';

export default function TechnicianRetentionIntelligence() {
  const [, setLocation] = useLocation();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [filterPeriod, setFilterPeriod] = useState("30d");
  const [selectedPlanningArea, setSelectedPlanningArea] = useState("all");
  const [retentionRiskFilter, setRetentionRiskFilter] = useState("all");
  const [selectedTechnician, setSelectedTechnician] = useState<any>(null);
  const [messageDialog, setMessageDialog] = useState(false);
  const [programDialog, setProgramDialog] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const [programType, setProgramType] = useState("");

  // Mock data for demonstration - in real implementation, this would come from API
  const retentionStats = {
    totalTechnicians: 1730,
    atRiskTechnicians: 127,
    activePrograms: 8,
    monthlyTurnover: 3.2,
    avgTenure: 2.8,
    satisfactionScore: 4.2,
    retentionRate: 96.8,
    costPerTurnover: 12500
  };

  const riskLevels = [
    { level: "Critical", count: 23, color: "bg-red-500", percentage: 87 },
    { level: "High", count: 41, color: "bg-orange-500", percentage: 73 },
    { level: "Medium", count: 63, color: "bg-yellow-500", percentage: 58 },
    { level: "Low", count: 1603, color: "bg-green-500", percentage: 92 }
  ];

  const retentionPrograms = [
    {
      id: 1,
      name: "Skills Development Pathway",
      type: "cross_training",
      status: "active",
      participants: 234,
      completionRate: 78,
      impactScore: 4.6,
      description: "Advanced cross-training program for HVAC/Plumbing specialists"
    },
    {
      id: 2,
      name: "Performance Bonus Initiative",
      type: "compensation",
      status: "active", 
      participants: 412,
      completionRate: 94,
      impactScore: 4.8,
      description: "Merit-based bonus system tied to customer satisfaction"
    },
    {
      id: 3,
      name: "Work-Life Balance Optimization",
      type: "scheduling",
      status: "active",
      participants: 187,
      completionRate: 85,
      impactScore: 4.3,
      description: "Flexible scheduling and route optimization for better work-life balance"
    },
    {
      id: 4,
      name: "Career Advancement Track",
      type: "career_development",
      status: "active",
      participants: 89,
      completionRate: 67,
      impactScore: 4.7,
      description: "Leadership development and promotion pathway program"
    }
  ];

  const atRiskTechnicians = [
    {
      id: 1,
      name: "Marcus Rodriguez",
      employeeId: "TECH-2847",
      planningArea: "PA-127",
      tenure: 1.2,
      riskLevel: "Critical",
      hourlyRate: 28.50,
      weeklyHours: 42,
      satisfactionScore: 2.1,
      lastCommunication: "2025-01-25",
      primaryConcerns: ["Compensation Below Market", "Limited Growth Opportunities"],
      skillsUtilization: 67
    },
    {
      id: 2,
      name: "Sarah Chen",
      employeeId: "TECH-1923",
      planningArea: "PA-089",
      tenure: 0.8,
      riskLevel: "High",
      hourlyRate: 26.75,
      weeklyHours: 38,
      satisfactionScore: 2.8,
      lastCommunication: "2025-01-26",
      primaryConcerns: ["Work-Life Balance", "Route Inefficiency"],
      skillsUtilization: 82
    },
    {
      id: 3,
      name: "David Thompson",
      employeeId: "TECH-3156",
      planningArea: "PA-203",
      tenure: 2.1,
      riskLevel: "High", 
      hourlyRate: 31.25,
      weeklyHours: 45,
      satisfactionScore: 3.1,
      lastCommunication: "2025-01-24",
      primaryConcerns: ["Skills Underutilization", "Career Stagnation"],
      skillsUtilization: 54
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "Pay Threshold Alert",
      severity: "Critical",
      technicianId: 1,
      technicianName: "Marcus Rodriguez",
      message: "Hourly rate 23% below market average for experience level",
      triggeredAt: "2025-01-27 08:15",
      actionRequired: "Compensation Review",
      estimatedCost: 8400
    },
    {
      id: 2,
      type: "Hours Imbalance",
      severity: "High",
      technicianId: 2,
      technicianName: "Sarah Chen",
      message: "Consistently working 6+ hours overtime per week",
      triggeredAt: "2025-01-27 09:30",
      actionRequired: "Schedule Optimization",
      estimatedCost: 0
    },
    {
      id: 3,
      type: "Skills Underutilization",
      severity: "High",
      technicianId: 3,
      technicianName: "David Thompson", 
      message: "Advanced HVAC skills utilized only 54% of available capacity",
      triggeredAt: "2025-01-27 10:45",
      actionRequired: "Work Assignment Review",
      estimatedCost: 3200
    }
  ];

  const communicationHistory = [
    {
      id: 1,
      technicianId: 1,
      type: "retention_check_in",
      method: "phone",
      timestamp: "2025-01-25 14:30",
      outcome: "Positive",
      notes: "Discussed career development opportunities and compensation review",
      followUpRequired: true,
      followUpDate: "2025-02-08"
    },
    {
      id: 2,
      technicianId: 2,
      type: "satisfaction_survey",
      method: "sms",
      timestamp: "2025-01-26 16:45",
      outcome: "Neutral",
      notes: "Moderate satisfaction with schedule, requesting flexibility improvements",
      followUpRequired: true,
      followUpDate: "2025-02-01"
    }
  ];

  return (
    <div className="space-y-6 p-6">
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
              <Brain className="h-8 w-8 text-blue-600" />
              Technician Retention Intelligence
            </h1>
            <p className="text-muted-foreground">
              AI-powered retention monitoring and intervention system for technician workforce stability
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="365d">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPlanningArea} onValueChange={setSelectedPlanningArea}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="PA-001">PA-001 Metro</SelectItem>
              <SelectItem value="PA-089">PA-089 South</SelectItem>
              <SelectItem value="PA-127">PA-127 North</SelectItem>
              <SelectItem value="PA-203">PA-203 West</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Technicians</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{retentionStats.totalTechnicians.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Technicians</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{retentionStats.atRiskTechnicians}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+1.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{retentionStats.retentionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{retentionStats.satisfactionScore}/5.0</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.3</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="at-risk">At-Risk</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Live Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Retention Risk Distribution</CardTitle>
                <CardDescription>
                  Technician distribution across risk levels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskLevels.map((level) => (
                  <div key={level.level} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${level.color}`} />
                        <span className="font-medium">{level.level} Risk</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {level.count} technicians
                      </div>
                    </div>
                    <Progress value={(level.count / retentionStats.totalTechnicians) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>
                  Critical retention metrics and trends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Avg Tenure</span>
                    </div>
                    <div className="text-2xl font-bold">{retentionStats.avgTenure} years</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Monthly Turnover</span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">{retentionStats.monthlyTurnover}%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Active Programs</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{retentionStats.activePrograms}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Cost per Turnover</span>
                    </div>
                    <div className="text-2xl font-bold">${retentionStats.costPerTurnover.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="at-risk" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">At-Risk Technicians</h2>
            <div className="flex items-center gap-2">
              <Select value={retentionRiskFilter} onValueChange={setRetentionRiskFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {atRiskTechnicians.map((technician) => (
              <Card key={technician.id} className={`border-l-4 ${technician.riskLevel === "Critical" ? "border-l-red-500 bg-red-50 dark:bg-red-950/20" : "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20"}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">{technician.name}</CardTitle>
                      <CardDescription className="text-base">{technician.employeeId} • {technician.planningArea}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={technician.riskLevel === "Critical" ? "destructive" : "secondary"} className="text-sm px-3 py-1">
                        {technician.riskLevel} Risk
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        Tenure: {technician.tenure} years
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">Hourly Rate</div>
                        <DollarSign className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-green-600">${technician.hourlyRate}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {technician.riskLevel === "Critical" ? "23% below market" : "Within range"}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">Weekly Hours</div>
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{technician.weeklyHours}h</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Target: 40h
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">Satisfaction</div>
                        <Star className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div className="text-2xl font-bold text-yellow-600">{technician.satisfactionScore}/5.0</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {technician.satisfactionScore < 3.0 ? "Critical" : technician.satisfactionScore < 4.0 ? "Below target" : "Good"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">Skills Utilization</div>
                        <div className="text-sm font-bold text-blue-600">{technician.skillsUtilization}%</div>
                      </div>
                      <Progress value={technician.skillsUtilization} className="h-3" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {technician.skillsUtilization < 60 ? "⚠️ Underutilized - High risk factor" : technician.skillsUtilization < 80 ? "⚡ Moderate utilization" : "✅ Well utilized"}
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">🚨 Primary Risk Factors</div>
                      <div className="flex flex-wrap gap-2">
                        {technician.primaryConcerns.map((concern, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">{concern}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Last Communication: {technician.lastCommunication}
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={messageDialog} onOpenChange={setMessageDialog}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedTechnician(technician);
                              setMessageContent(`Hi ${technician.name}, I wanted to check in with you about your recent experience and see how we can better support your career development...`);
                            }}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Send Retention Message</DialogTitle>
                            <DialogDescription>
                              Send a personalized message to {selectedTechnician?.name} to address retention concerns.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="message">Message Content</Label>
                              <Textarea
                                id="message"
                                placeholder="Enter your message..."
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                                rows={4}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="channel">Communication Channel</Label>
                              <Select defaultValue="sms">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="sms">SMS</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="phone">Phone Call</SelectItem>
                                  <SelectItem value="in_person">In-Person</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setMessageDialog(false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => {
                                // Simulate sending message
                                setMessageDialog(false);
                                // Show success message
                                setTimeout(() => {
                                  alert(`✅ Retention message sent to ${selectedTechnician?.name} via SMS. Follow-up scheduled for next week.`);
                                }, 300);
                              }}>
                                <Send className="h-4 w-4 mr-1" />
                                Send Message
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={programDialog} onOpenChange={setProgramDialog}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm"
                            onClick={() => {
                              setSelectedTechnician(technician);
                              setProgramName(`${technician.name} Personalized Retention Plan`);
                              setProgramDescription(`Customized retention program addressing ${technician.primaryConcerns.join(', ').toLowerCase()}`);
                              setProgramType("personalized");
                            }}
                          >
                            <Settings className="h-4 w-4 mr-1" />
                            Create Program
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Create Retention Program</DialogTitle>
                            <DialogDescription>
                              Design a personalized retention program for {selectedTechnician?.name}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="programName">Program Name</Label>
                              <Input
                                id="programName"
                                value={programName}
                                onChange={(e) => setProgramName(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="programType">Program Type</Label>
                              <Select value={programType} onValueChange={setProgramType}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="compensation">Compensation Adjustment</SelectItem>
                                  <SelectItem value="skills_development">Skills Development</SelectItem>
                                  <SelectItem value="schedule_flexibility">Schedule Flexibility</SelectItem>
                                  <SelectItem value="career_advancement">Career Advancement</SelectItem>
                                  <SelectItem value="personalized">Personalized Plan</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="programDescription">Program Description</Label>
                              <Textarea
                                id="programDescription"
                                value={programDescription}
                                onChange={(e) => setProgramDescription(e.target.value)}
                                rows={3}
                              />
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
                              <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Recommended Actions</div>
                              <div className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                                {selectedTechnician?.primaryConcerns.includes("Compensation Below Market") && 
                                  <div>• Pay rate adjustment to market level (+$3.50/hour)</div>
                                }
                                {selectedTechnician?.primaryConcerns.includes("Limited Growth Opportunities") && 
                                  <div>• Enroll in advanced certification program</div>
                                }
                                {selectedTechnician?.skillsUtilization < 70 && 
                                  <div>• Increase advanced skill assignments by 40%</div>
                                }
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setProgramDialog(false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => {
                                setProgramDialog(false);
                                setTimeout(() => {
                                  alert(`✅ Retention program "${programName}" created for ${selectedTechnician?.name}. Expected ROI: 285%. Implementation starts Monday.`);
                                }, 300);
                              }}>
                                <Plus className="h-4 w-4 mr-1" />
                                Create Program
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Retention Programs</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Target className="h-4 w-4 mr-2" />
                  Create Program
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Retention Program</DialogTitle>
                  <DialogDescription>
                    Design a new retention program to improve technician satisfaction and reduce turnover.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Program Name</Label>
                    <Input placeholder="e.g., Skills Development Initiative" />
                  </div>
                  <div className="space-y-2">
                    <Label>Program Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compensation">Compensation Package</SelectItem>
                        <SelectItem value="training">Training & Development</SelectItem>
                        <SelectItem value="wellness">Wellness Program</SelectItem>
                        <SelectItem value="recognition">Recognition Program</SelectItem>
                        <SelectItem value="flexibility">Work Flexibility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Group</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Technicians</SelectItem>
                        <SelectItem value="at_risk">At-Risk Technicians</SelectItem>
                        <SelectItem value="high_performers">High Performers</SelectItem>
                        <SelectItem value="new_hires">New Hires</SelectItem>
                        <SelectItem value="veterans">Veteran Technicians</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">$5K - $15K</SelectItem>
                        <SelectItem value="medium">$15K - $50K</SelectItem>
                        <SelectItem value="high">$50K - $100K</SelectItem>
                        <SelectItem value="enterprise">$100K+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Describe the program goals and implementation..." rows={3} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Program</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {retentionPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{program.type.replace('_', ' ')}</Badge>
                      <Badge variant={program.status === "active" ? "default" : "secondary"}>
                        {program.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Participants</div>
                      <div className="text-2xl font-bold">{program.participants}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Completion Rate</div>
                      <div className="text-2xl font-bold">{program.completionRate}%</div>
                      <Progress value={program.completionRate} className="mt-2 h-2" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Impact Score</div>
                      <div className="text-2xl font-bold flex items-center gap-1">
                        {program.impactScore}/5.0
                        <div className="flex">
                          {[...Array(Math.floor(program.impactScore))].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{program.name} - Program Details</DialogTitle>
                          <DialogDescription>
                            Complete overview of program performance and impact metrics
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                              <div className="text-sm font-medium text-blue-800 dark:text-blue-300">Program Status</div>
                              <div className="text-2xl font-bold text-blue-600">{program.status}</div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
                              <div className="text-sm font-medium text-green-800 dark:text-green-300">ROI</div>
                              <div className="text-2xl font-bold text-green-600">285%</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-2">Participants</div>
                            <div className="text-lg">{program.participants} technicians enrolled</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-2">Program Timeline</div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Started: January 15, 2025</span>
                                <span>Expected End: June 15, 2025</span>
                              </div>
                              <Progress value={65} className="h-2" />
                              <div className="text-xs text-muted-foreground">65% complete</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-2">Key Metrics</div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Retention Rate</div>
                                <div className="font-semibold">97.2% (+3.1%)</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Satisfaction</div>
                                <div className="font-semibold">4.3/5.0 (+0.4)</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Cost per Tech</div>
                                <div className="font-semibold">$1,247/month</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button>Close</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Configure {program.name}</DialogTitle>
                          <DialogDescription>
                            Modify program settings and parameters
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Program Budget</Label>
                            <Input defaultValue="$45,000" />
                          </div>
                          <div className="space-y-2">
                            <Label>Target Participants</Label>
                            <Input type="number" defaultValue={program.participants} />
                          </div>
                          <div className="space-y-2">
                            <Label>Program Duration</Label>
                            <Select defaultValue="6months">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3months">3 Months</SelectItem>
                                <SelectItem value="6months">6 Months</SelectItem>
                                <SelectItem value="12months">12 Months</SelectItem>
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Success Metrics</Label>
                            <Textarea 
                              placeholder="Define success criteria and KPIs..."
                              rows={3}
                              defaultValue="Increase retention rate by 5%, improve satisfaction scores by 0.5 points, reduce turnover costs by 25%"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Changes</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Retention Alerts</h2>
            <div className="text-sm text-muted-foreground">
              {alerts.length} active alerts requiring attention
            </div>
          </div>

          <div className="grid gap-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">{alert.type}</CardTitle>
                        <div className="text-sm text-muted-foreground">Technician: {alert.technicianName}</div>
                      </div>
                      <Badge variant="destructive" className="ml-2">{alert.severity}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground bg-white dark:bg-gray-800 px-2 py-1 rounded">
                      {alert.triggeredAt}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                      <div className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Alert Details</div>
                      <div className="text-sm">{alert.message}</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
                        <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">Action Required</div>
                        <div className="text-sm text-blue-700 dark:text-blue-400">{alert.actionRequired}</div>
                        {alert.estimatedCost > 0 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            💰 Estimated Cost: ${alert.estimatedCost.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              Schedule Action
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Schedule Retention Action</DialogTitle>
                              <DialogDescription>
                                Schedule action for {alert.technicianName}: {alert.actionRequired}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Action Type</Label>
                                <Input value={alert.actionRequired} readOnly />
                              </div>
                              <div className="space-y-2">
                                <Label>Scheduled Date</Label>
                                <Input type="date" defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]} />
                              </div>
                              <div className="space-y-2">
                                <Label>Priority</Label>
                                <Select defaultValue={alert.severity.toLowerCase()}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="critical">Critical</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Schedule Action</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Shield className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Resolve Alert</DialogTitle>
                              <DialogDescription>
                                Mark this alert as resolved for {alert.technicianName}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Resolution Notes</Label>
                                <Textarea placeholder="Describe how this issue was resolved..." rows={3} />
                              </div>
                              <div className="space-y-2">
                                <Label>Follow-up Required</Label>
                                <Select defaultValue="none">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">No Follow-up</SelectItem>
                                    <SelectItem value="1week">1 Week Follow-up</SelectItem>
                                    <SelectItem value="2weeks">2 Week Follow-up</SelectItem>
                                    <SelectItem value="1month">1 Month Follow-up</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Mark Resolved</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Communication History</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Communication
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>New Communication Campaign</DialogTitle>
                  <DialogDescription>
                    Create a new communication campaign to engage technicians and improve retention.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Campaign Name</Label>
                    <Input placeholder="e.g., Monthly Team Check-in" />
                  </div>
                  <div className="space-y-2">
                    <Label>Communication Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select communication type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="survey">Satisfaction Survey</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                        <SelectItem value="meeting">Team Meeting</SelectItem>
                        <SelectItem value="one_on_one">One-on-One Check-in</SelectItem>
                        <SelectItem value="announcement">Company Announcement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Audience</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Technicians</SelectItem>
                        <SelectItem value="at_risk">At-Risk Technicians</SelectItem>
                        <SelectItem value="planning_area">Specific Planning Area</SelectItem>
                        <SelectItem value="skill_level">By Skill Level</SelectItem>
                        <SelectItem value="tenure">By Tenure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">One-time</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Message Content</Label>
                    <Textarea placeholder="Enter your communication message..." rows={4} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button>Send Communication</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {communicationHistory.map((comm) => (
              <Card key={comm.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {comm.method === "phone" && <Phone className="h-4 w-4" />}
                      {comm.method === "sms" && <MessageSquare className="h-4 w-4" />}
                      {comm.method === "email" && <Mail className="h-4 w-4" />}
                      <CardTitle className="text-lg">{comm.type.replace('_', ' ')}</CardTitle>
                      <Badge variant={comm.outcome === "Positive" ? "default" : comm.outcome === "Neutral" ? "secondary" : "destructive"}>
                        {comm.outcome}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {comm.timestamp}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">{comm.notes}</div>
                    {comm.followUpRequired && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Follow-up scheduled: {comm.followUpDate}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <h2 className="text-xl font-semibold">Retention Analytics</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Turnover Trends</CardTitle>
                <CardDescription>
                  Monthly turnover rates and predictive analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Month</span>
                    <span className="text-lg font-bold text-red-600">3.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Previous Month</span>
                    <span className="text-lg font-bold">2.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">3-Month Average</span>
                    <span className="text-lg font-bold">3.0%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Predicted Next Month</span>
                    <span className="text-lg font-bold text-orange-600">2.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Impact Analysis</CardTitle>
                <CardDescription>
                  Financial impact of retention initiatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Monthly Turnover Cost</span>
                    <span className="text-lg font-bold text-red-600">$623K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Program Investment</span>
                    <span className="text-lg font-bold">$147K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Net Savings</span>
                    <span className="text-lg font-bold text-green-600">$289K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">ROI</span>
                    <span className="text-lg font-bold text-green-600">196%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          {/* Live Activity Feed focused on Retention */}
          <SystemWideActivityFeed 
            category="retention" 
            showHeader={true} 
            maxItems={25}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}