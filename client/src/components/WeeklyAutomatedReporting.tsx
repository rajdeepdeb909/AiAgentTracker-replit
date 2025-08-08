import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Clock, FileText, Bot, Zap, TrendingUp, Users, DollarSign, Settings, Eye, Play, Pause, Calendar, Download, ArrowLeft, Activity, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NavigationBreadcrumbsProps {
  onNavigateBack: () => void;
}

function NavigationBreadcrumbs({ onNavigateBack }: NavigationBreadcrumbsProps) {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onNavigateBack}
        className="text-blue-400 hover:text-blue-300"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </Button>
      <span>/</span>
      <span>Weekly Automated Reporting</span>
    </div>
  );
}

interface WeeklyAutomatedReportingProps {
  onNavigateBack: () => void;
}

interface AgentReport {
  id: string;
  name: string;
  status: 'generating' | 'completed' | 'error' | 'pending';
  sections: string[];
  progress: number;
  lastRun: string;
  nextRun: string;
  actionsExecuted: number;
  keyFindings: string[];
}

interface AutomationMetrics {
  totalReports: number;
  automationRate: number;
  timeSaved: number;
  actionsExecuted: number;
  issuesResolved: number;
}

export default function WeeklyAutomatedReporting({ onNavigateBack }: WeeklyAutomatedReportingProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [reportGenerationStatus, setReportGenerationStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [selectedAgentForConfig, setSelectedAgentForConfig] = useState<string | null>(null);
  const [showFullReport, setShowFullReport] = useState<string | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // Mock data for agent reports
  const agentReports: AgentReport[] = [
    {
      id: 'workforce-intelligence',
      name: 'Technician Workforce Intelligence Agent',
      status: 'completed',
      sections: ['Tech Count Analysis', '1099 Contractor Performance', 'Retention Metrics', 'LOA Management'],
      progress: 100,
      lastRun: '2025-07-28T06:00:00Z',
      nextRun: '2025-08-04T06:00:00Z',
      actionsExecuted: 12,
      keyFindings: [
        'Tech count increased to 1,629 active techs (+20 new starts)',
        '1099 contractors deployed for 21 jobs (70% completion rate)',
        '2 technicians saved through retention programs',
        'LOA population down to 112 technicians'
      ]
    },
    {
      id: 'financial-intelligence',
      name: 'Financial Intelligence Agent',
      status: 'completed',
      sections: ['IHR Financial Performance', 'Revenue Analysis', 'Cost Center Performance', 'Budget Variance'],
      progress: 100,
      lastRun: '2025-07-28T06:15:00Z',
      nextRun: '2025-08-04T06:15:00Z',
      actionsExecuted: 8,
      keyFindings: [
        'IHR July BOP $(2.6)M, $(0.6)M vs forecast',
        'D2C completions down 2.4K, B2B down 3.6K vs target',
        'Lower advertising expense +$0.5M favorable variance',
        'Parts unaccounted variance +$0.2M requiring attention'
      ]
    },
    {
      id: 'route-optimization',
      name: 'Route Optimization & Capacity Agent',
      status: 'generating',
      sections: ['Routing Metrics', 'Reschedule Analysis', 'D2C Cycle Time', 'Capacity Utilization'],
      progress: 65,
      lastRun: '2025-07-28T06:30:00Z',
      nextRun: '2025-08-04T06:30:00Z',
      actionsExecuted: 15,
      keyFindings: [
        'Same-day URAL reschedules down 38% to 4,794',
        'D2C cycle time increased to 5.39 days (+0.23)',
        'Oahu unresourced reduced by 86% (270 → 37 jobs)',
        'Assigns metric at 5.86 vs target 8.0'
      ]
    },
    {
      id: 'parts-supply-chain',
      name: 'Parts Supply Chain Intelligence Agent',
      status: 'completed',
      sections: ['Parts Ordering', 'EAD Accuracy', 'Backorder Management', 'Recovery Metrics'],
      progress: 100,
      lastRun: '2025-07-28T06:45:00Z',
      nextRun: '2025-08-04T06:45:00Z',
      actionsExecuted: 22,
      keyFindings: [
        'Parts loss $128K for week (+13.29% increase)',
        'Backorders >15 days increased 157.9% to 988',
        'EAD logic fix for PDC 8998 reducing aged orders',
        'Aged orders >30 days at 10,337 (+6.0%)'
      ]
    },
    {
      id: 'technician-recruiting',
      name: 'Technician Recruiting & Onboarding Agent',
      status: 'completed',
      sections: ['Hiring Pipeline', 'Interview Metrics', 'Onboarding Success', 'Capacity Planning'],
      progress: 100,
      lastRun: '2025-07-28T07:00:00Z',
      nextRun: '2025-08-04T07:00:00Z',
      actionsExecuted: 18,
      keyFindings: [
        '20 new tech starts this week (July avg 17/week)',
        '70 interviews completed (up from 48 avg)',
        '26 offers extended, pipeline strong for Aug',
        'Joy Bot driving increased interview volume'
      ]
    },
    {
      id: 'b2b-partnership',
      name: 'B2B Partnership Management Agent',
      status: 'generating',
      sections: ['Partner Performance', 'Contract Status', 'Revenue Analysis', 'Satisfaction Metrics'],
      progress: 40,
      lastRun: '2025-07-28T07:15:00Z',
      nextRun: '2025-08-04T07:15:00Z',
      actionsExecuted: 11,
      keyFindings: [
        'B2B profit per job up to $64 from $59',
        'Job volume down to 8,421 creates (-7.1%)',
        'Samsung rates effective 7/25, LG contract updates',
        'AHS survey scores barrier to growth resolved'
      ]
    }
  ];

  const automationMetrics: AutomationMetrics = {
    totalReports: 11,
    automationRate: 94.8,
    timeSaved: 42.5,
    actionsExecuted: 86,
    issuesResolved: 23
  };

  const startWeeklyReportGeneration = () => {
    setReportGenerationStatus('running');
    // Simulate report generation
    setTimeout(() => {
      setReportGenerationStatus('completed');
    }, 3000);
  };

  const handleViewFullReport = (agentId: string) => {
    setShowFullReport(agentId);
    setShowReportModal(true);
  };

  const handleConfigureAgent = (agentId: string) => {
    setSelectedAgentForConfig(agentId);
    setShowConfigModal(true);
  };

  const closeModals = () => {
    setShowReportModal(false);
    setShowConfigModal(false);
    setShowFullReport(null);
    setSelectedAgentForConfig(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'generating':
        return <Activity className="h-5 w-5 text-blue-400 animate-pulse" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/20 text-green-400 border-green-400/20';
      case 'generating':
        return 'bg-blue-900/20 text-blue-400 border-blue-400/20';
      case 'error':
        return 'bg-red-900/20 text-red-400 border-red-400/20';
      default:
        return 'bg-gray-900/20 text-gray-400 border-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="container mx-auto px-6 py-8">
        <NavigationBreadcrumbs onNavigateBack={onNavigateBack} />
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-900/20 rounded-xl border border-blue-400/20">
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Weekly Automated Reporting System</h1>
              <p className="text-gray-400">AI agents generate comprehensive weekly updates and execute improvement actions</p>
            </div>
          </div>

          {/* Control Panel */}
          <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
            <Button 
              onClick={startWeeklyReportGeneration}
              disabled={reportGenerationStatus === 'running'}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {reportGenerationStatus === 'running' ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-pulse" />
                  Generating Reports...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Weekly Report Generation
                </>
              )}
            </Button>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <span>Next scheduled: Sunday 6:00 AM</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Last run: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">Overview</TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-blue-600">Agent Reports</TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-blue-600">Actions Executed</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Automation Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Total Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">{automationMetrics.totalReports}</div>
                  <div className="text-xs text-gray-500">Agent domains</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Automation Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{automationMetrics.automationRate}%</div>
                  <div className="text-xs text-gray-500">Autonomous execution</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Time Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">{automationMetrics.timeSaved}h</div>
                  <div className="text-xs text-gray-500">Per week</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Actions Executed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">{automationMetrics.actionsExecuted}</div>
                  <div className="text-xs text-gray-500">This week</div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-400">Issues Resolved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-400">{automationMetrics.issuesResolved}</div>
                  <div className="text-xs text-gray-500">Automatically</div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Report Status */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">Weekly Report Generation Status</CardTitle>
                <CardDescription>Real-time status of automated report generation by AI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentReports.slice(0, 6).map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(agent.status)}
                        <div>
                          <h4 className="font-medium text-gray-200">{agent.name}</h4>
                          <p className="text-sm text-gray-400">{agent.sections.join(', ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-300">{agent.progress}% Complete</div>
                          <div className="text-xs text-gray-500">{agent.actionsExecuted} actions executed</div>
                        </div>
                        <Progress value={agent.progress} className="w-20" />
                        <Badge className={getStatusColor(agent.status)}>{agent.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {agentReports.map((agent) => (
                <Card key={agent.id} className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-blue-400">{agent.name}</CardTitle>
                      <Badge className={getStatusColor(agent.status)}>{agent.status}</Badge>
                    </div>
                    <CardDescription>Report sections and current status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-300 mb-2">Report Sections:</h5>
                      <div className="flex flex-wrap gap-2">
                        {agent.sections.map((section) => (
                          <Badge key={section} variant="outline" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-300 mb-2">Key Findings:</h5>
                      <ul className="space-y-1 text-sm text-gray-400">
                        {agent.keyFindings.map((finding, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="text-sm text-gray-400">
                        <div>Actions: {agent.actionsExecuted}</div>
                        <div>Progress: {agent.progress}%</div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                        onClick={() => handleViewFullReport(agent.id)}
                      >
                        View Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">Automated Actions Executed This Week</CardTitle>
                <CardDescription>AI agents automatically executed these improvement actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { agent: 'Workforce Intelligence', action: 'Deployed SMS recruiting campaign to 571 technicians', impact: '+2,640 capacity hours', timestamp: '6:30 AM' },
                    { agent: 'Financial Intelligence', action: 'Adjusted pricing strategy based on margin analysis', impact: '+$67.80 PPT profit', timestamp: '6:45 AM' },
                    { agent: 'Route Optimization', action: 'Optimized Oahu routing algorithms', impact: '-86% unresourced jobs', timestamp: '7:00 AM' },
                    { agent: 'Parts Supply Chain', action: 'Fixed EAD logic for PDC 8998', impact: '-20% aged orders', timestamp: '7:15 AM' },
                    { agent: 'Technician Performance', action: 'Launched Parts Returns Bot to full population', impact: '171 compliance notifications', timestamp: '7:30 AM' },
                    { agent: 'Service Operations', action: 'Automated NAD order rescheduling logic', impact: 'Prevented premature closures', timestamp: '7:45 AM' }
                  ].map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center space-x-4">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        <div>
                          <h4 className="font-medium text-gray-200">{action.action}</h4>
                          <p className="text-sm text-gray-400">by {action.agent}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-400">{action.impact}</div>
                        <div className="text-xs text-gray-500">{action.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-400">Report Generation Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Manual Process (Before)</span>
                      <span className="text-red-400">40+ hours/week</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Automated Process (Current)</span>
                      <span className="text-green-400">2.5 hours/week</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-gray-300">Time Savings</span>
                      <span className="text-blue-400">93.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-400">Action Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Actions Executed</span>
                      <span className="text-yellow-400">86 this week</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Successful Outcomes</span>
                      <span className="text-green-400">81 completed</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-gray-300">Success Rate</span>
                      <span className="text-blue-400">94.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">Weekly Reporting ROI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">$2.4M</div>
                    <div className="text-sm text-gray-400">Annual cost savings</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">$8.7M</div>
                    <div className="text-sm text-gray-400">Revenue impact</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">450%</div>
                    <div className="text-sm text-gray-400">ROI within 18 months</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">Report Configuration</CardTitle>
                <CardDescription>Configure automated reporting schedule and agent assignments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-300 mb-4">Report Schedule</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="text-sm text-gray-400">Generation Time</div>
                      <div className="text-lg font-medium text-gray-200">Sunday 6:00 AM EST</div>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="text-sm text-gray-400">Distribution Time</div>
                      <div className="text-lg font-medium text-gray-200">Sunday 9:00 AM EST</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-300 mb-4">Agent Assignments</h4>
                  <div className="space-y-3">
                    {agentReports.map((agent) => (
                      <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div>
                          <div className="font-medium text-gray-200">{agent.name}</div>
                          <div className="text-sm text-gray-400">{agent.sections.length} sections assigned</div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10"
                          onClick={() => handleConfigureAgent(agent.id)}
                        >
                          Configure
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Report Modal */}
        <Dialog open={showReportModal} onOpenChange={closeModals}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center justify-between">
                <span>Weekly Report - {agentReports.find(a => a.id === showFullReport)?.name}</span>
                <Button variant="ghost" size="sm" onClick={closeModals}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Automated weekly report generated by AI agent analysis
              </DialogDescription>
            </DialogHeader>
            
            {showFullReport && (
              <div className="space-y-6 text-white">
                {getReportContent(showFullReport)}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Configuration Modal */}
        <Dialog open={showConfigModal} onOpenChange={closeModals}>
          <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center justify-between">
                <span>Configure - {agentReports.find(a => a.id === selectedAgentForConfig)?.name}</span>
                <Button variant="ghost" size="sm" onClick={closeModals}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Modify agent settings, reporting schedule, and automation parameters
              </DialogDescription>
            </DialogHeader>
            
            {selectedAgentForConfig && (
              <div className="space-y-6 text-white">
                {getConfigurationContent(selectedAgentForConfig)}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

  // Helper function to generate report content based on agent
  function getReportContent(agentId: string) {
    const agent = agentReports.find(a => a.id === agentId);
    if (!agent) return null;

    switch (agent.name) {
      case "Workforce Intelligence Agent":
        return (
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Workforce Intelligence Weekly Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Technician Capacity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Active Technicians:</span>
                      <span className="font-bold">1,629</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New Starts This Week:</span>
                      <span className="font-bold text-green-400">+20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>On Leave of Absence:</span>
                      <span className="font-bold text-yellow-400">112</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Extra Hours Added:</span>
                      <span className="font-bold text-blue-400">2,640 hrs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-purple-400">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Participation Rate:</span>
                      <span className="font-bold">8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Top District (Atlanta):</span>
                      <span className="font-bold text-green-400">399 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SMS Outreach:</span>
                      <span className="font-bold">571 technicians</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gray-800 border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-blue-400">Key Actions Executed</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li>• Launched SMS notifications for extra hours approval/denial</li>
                  <li>• Targeted outreach to 571 technicians for availability submission</li>
                  <li>• Identified top contributing districts for capacity expansion</li>
                  <li>• Implemented day-before reminder system to reduce no-shows</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case "Financial Intelligence Agent":
        return (
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Financial Intelligence Weekly Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Revenue Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">91.6K</div>
                    <div className="text-sm text-gray-400">Completed Calls</div>
                    <div className="text-red-400">Down 5.4K vs Forecast</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-purple-400">Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">$(2.6)M</div>
                    <div className="text-sm text-gray-400">July BOP Impact</div>
                    <div className="text-red-400">$(0.6)M vs Forecast</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-orange-400">Efficiency Gains</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">+$0.5M</div>
                    <div className="text-sm text-gray-400">Marketing Optimization</div>
                    <div className="text-green-400">Advertising Savings</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gray-800 border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-blue-400">Automated Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li>• Optimized advertising spend resulting in $0.5M savings</li>
                  <li>• Identified service payroll efficiency opportunities (+$0.2M)</li>
                  <li>• Flagged truck expense increases for management review</li>
                  <li>• Analyzed parts cost variance and circuit board return credits</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case "Parts Supply Chain Agent":
        return (
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Parts Supply Chain Weekly Report</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-green-400">Parts Returns Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>SMS Notifications Sent:</span>
                      <span className="font-bold">171</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overdue Parts:</span>
                      <span className="font-bold text-yellow-400">71</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unprocessed Deletes:</span>
                      <span className="font-bold text-orange-400">100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unique Technicians:</span>
                      <span className="font-bold">159</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-purple-400">Inventory Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Bot Deployment:</span>
                      <span className="font-bold text-green-400">Full Production</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compliance Rate:</span>
                      <span className="font-bold">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prevention Focus:</span>
                      <span className="font-bold text-blue-400">Inventory Loss</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gray-800 border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-blue-400">Automated Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li>• Launched Parts Returns Bot to full technician population</li>
                  <li>• Implemented dual-notification approach for comprehensive coverage</li>
                  <li>• Refined exclusion logic based on supervisor pilot feedback</li>
                  <li>• Established daily monitoring for parts compliance violations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">{agent.name} - Weekly Report</h3>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-green-400">Report Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Actions Executed</div>
                      <div className="text-2xl font-bold text-green-400">{agent.actionsExecuted}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Progress</div>
                      <div className="text-2xl font-bold text-blue-400">{agent.progress}%</div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-300 mb-2">Key Findings:</h5>
                    <ul className="space-y-1 text-gray-400">
                      {agent.keyFindings.map((finding, index) => (
                        <li key={index}>• {finding}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-300 mb-2">Report Sections Covered:</h5>
                    <div className="flex flex-wrap gap-2">
                      {agent.sections.map((section) => (
                        <Badge key={section} variant="outline" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  }

  // Helper function to generate configuration content based on agent
  function getConfigurationContent(agentId: string) {
    const agent = agentReports.find(a => a.id === agentId);
    if (!agent) return null;

    return (
      <div className="space-y-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Agent Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Report Generation Schedule
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-700 rounded border">
                  <div className="text-sm text-gray-400">Current Schedule</div>
                  <div className="font-medium">Sunday 6:00 AM EST</div>
                </div>
                <div className="p-3 bg-gray-700 rounded border">
                  <div className="text-sm text-gray-400">Distribution</div>
                  <div className="font-medium">Sunday 9:00 AM EST</div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Assigned Report Sections
              </label>
              <div className="space-y-2">
                {agent.sections.map((section, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <span className="text-gray-300">{section}</span>
                    <Badge variant="outline" className="text-xs">Active</Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Automation Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-blue-900/30 border border-blue-600 rounded text-center">
                  <div className="text-sm font-medium text-blue-400">High</div>
                  <div className="text-xs text-gray-400">Auto-execute</div>
                </div>
                <div className="p-2 bg-gray-700 border border-gray-600 rounded text-center">
                  <div className="text-sm font-medium">Medium</div>
                  <div className="text-xs text-gray-400">Review first</div>
                </div>
                <div className="p-2 bg-gray-700 border border-gray-600 rounded text-center">
                  <div className="text-sm font-medium">Manual</div>
                  <div className="text-xs text-gray-400">Human approval</div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Performance Thresholds
              </label>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                  <span className="text-gray-300">Success Rate Minimum:</span>
                  <span className="font-medium text-green-400">85%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                  <span className="text-gray-300">Response Time Target:</span>
                  <span className="font-medium text-blue-400">&lt; 2 seconds</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                  <span className="text-gray-300">Error Rate Maximum:</span>
                  <span className="font-medium text-yellow-400">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={closeModals}>Cancel</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Configuration</Button>
        </div>
      </div>
    );
  }
}