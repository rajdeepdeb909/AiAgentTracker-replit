import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, ClockIcon, TrendingUpIcon, TrendingDownIcon, TargetIcon, BrainIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface AgentDailyPerformanceProps {
  agentId: number;
  agentName: string;
}

export function AgentDailyPerformance({ agentId, agentName }: AgentDailyPerformanceProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewType, setViewType] = useState<"today" | "trends" | "goals" | "self-eval">("today");

  // Fetch daily goals
  const { data: dailyGoals = [] } = useQuery({
    queryKey: ["/api/agents", agentId, "daily-goals", selectedDate],
    queryFn: () => fetch(`/api/agents/${agentId}/daily-goals?date=${selectedDate}`).then(res => res.json()),
  });

  // Fetch hourly performance for today
  const { data: hourlyPerformance = [] } = useQuery({
    queryKey: ["/api/agents", agentId, "hourly-performance", selectedDate],
    queryFn: () => fetch(`/api/agents/${agentId}/hourly-performance?date=${selectedDate}`).then(res => res.json()),
  });

  // Fetch daily performance trends (last 7 days)
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const { data: dailyTrends = [] } = useQuery({
    queryKey: ["/api/agents", agentId, "daily-performance", startDate, endDate],
    queryFn: () => fetch(`/api/agents/${agentId}/daily-performance?startDate=${startDate}&endDate=${endDate}`).then(res => res.json()),
  });

  // Fetch self-evaluations
  const { data: selfEvaluations = [] } = useQuery({
    queryKey: ["/api/agents", agentId, "self-evaluations", selectedDate],
    queryFn: () => fetch(`/api/agents/${agentId}/self-evaluations?date=${selectedDate}`).then(res => res.json()),
  });

  // Fetch goal achievements
  const { data: goalAchievements = [] } = useQuery({
    queryKey: ["/api/agents", agentId, "goal-achievements"],
    queryFn: () => fetch(`/api/agents/${agentId}/goal-achievements`).then(res => res.json()),
  });

  // Calculate current progress towards goals
  const calculateGoalProgress = (goal: any) => {
    const latestHourly = hourlyPerformance[hourlyPerformance.length - 1];
    if (!latestHourly) return 0;

    const progress = latestHourly.progressTowardsGoals[goal.goalType];
    if (typeof progress === 'object') return progress.percentage || 0;
    
    const current = typeof progress === 'string' ? parseFloat(progress) : progress;
    const target = parseFloat(goal.targetValue);
    
    if (goal.goalType === 'response_time') {
      // Lower is better for response time
      return Math.max(0, Math.min(100, ((target - current) / target) * 100));
    }
    
    return Math.max(0, Math.min(100, (current / target) * 100));
  };

  // Get status color for goals
  const getGoalStatus = (progress: number) => {
    if (progress >= 100) return { color: "text-green-600", bg: "bg-green-100", status: "Achieved" };
    if (progress >= 80) return { color: "text-blue-600", bg: "bg-blue-100", status: "On Track" };
    if (progress >= 60) return { color: "text-yellow-600", bg: "bg-yellow-100", status: "Behind" };
    return { color: "text-red-600", bg: "bg-red-100", status: "At Risk" };
  };

  // Process hourly data for charts
  const hourlyChartData = hourlyPerformance.map((hour: any) => ({
    hour: `${hour.hour}:00`,
    tasks: hour.tasksCompleted,
    success: parseFloat(hour.successRate),
    response: parseFloat(hour.avgResponseTime),
    satisfaction: parseFloat(hour.satisfactionScore),
    errors: hour.errorsEncountered,
  }));

  // Process daily trends for charts
  const trendsChartData = dailyTrends.map((day: any) => ({
    date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: parseFloat(day.overallScore),
    tasks: day.completedTasks,
    success: parseFloat(day.overallSuccessRate),
    response: parseFloat(day.avgResponseTime),
    goals: day.goalsAchieved,
  }));

  const pieData = hourlyPerformance.length > 0 ? [
    { name: 'Completed Tasks', value: hourlyPerformance.reduce((sum: number, h: any) => sum + h.tasksCompleted, 0) },
    { name: 'Errors', value: hourlyPerformance.reduce((sum: number, h: any) => sum + h.errorsEncountered, 0) },
    { name: 'Customer Interactions', value: hourlyPerformance.reduce((sum: number, h: any) => sum + h.customerInteractions, 0) },
  ] : [];

  const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Daily Performance - {agentName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time performance tracking and self-evaluation
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
                const dateStr = date.toISOString().split('T')[0];
                const label = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : date.toLocaleDateString();
                return (
                  <SelectItem key={dateStr} value={dateStr}>{label}</SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={viewType} onValueChange={(value: any) => setViewType(value)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today's Performance</TabsTrigger>
          <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
          <TabsTrigger value="trends">7-Day Trends</TabsTrigger>
          <TabsTrigger value="self-eval">Self-Evaluation</TabsTrigger>
        </TabsList>

        {/* Today's Performance */}
        <TabsContent value="today" className="space-y-6">
          {/* Real-time Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                <CheckCircleIcon className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {hourlyPerformance.reduce((sum: number, h: any) => sum + h.tasksCompleted, 0)}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Across {hourlyPerformance.length} hours today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {hourlyPerformance.length > 0 
                    ? (hourlyPerformance.reduce((sum: number, h: any) => sum + parseFloat(h.successRate), 0) / hourlyPerformance.length).toFixed(1)
                    : '0.0'
                  }%
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Average across all hours
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <ClockIcon className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {hourlyPerformance.length > 0 
                    ? (hourlyPerformance.reduce((sum: number, h: any) => sum + parseFloat(h.avgResponseTime), 0) / hourlyPerformance.length).toFixed(2)
                    : '0.00'
                  }s
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Current day average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {hourlyPerformance.length > 0 
                    ? (hourlyPerformance.reduce((sum: number, h: any) => sum + parseFloat(h.satisfactionScore), 0) / hourlyPerformance.length).toFixed(1)
                    : '0.0'
                  }
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Out of 5.0 rating
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Hourly Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Task Completion</CardTitle>
                <CardDescription>Tasks completed per hour throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={hourlyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Rate & Response Time</CardTitle>
                <CardDescription>Performance quality metrics by hour</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={hourlyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} name="Success Rate %" />
                    <Line yAxisId="right" type="monotone" dataKey="response" stroke="#f59e0b" strokeWidth={2} name="Response Time (s)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Task Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>Breakdown of today's activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction Trend</CardTitle>
                <CardDescription>Hourly customer satisfaction scores</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={hourlyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis domain={[4.0, 5.0]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="satisfaction" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Goals & Progress */}
        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dailyGoals.map((goal: any) => {
              const progress = calculateGoalProgress(goal);
              const status = getGoalStatus(progress);
              
              return (
                <Card key={goal.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{goal.description}</CardTitle>
                      <Badge variant="outline" className={`${status.color} ${status.bg}`}>
                        {status.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Priority: <span className="font-medium">{goal.priority}</span> | 
                      Target: <span className="font-medium">{goal.targetValue}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <TargetIcon className="h-4 w-4" />
                        <span>Goal Type: {goal.goalType.replace('_', ' ').toUpperCase()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Goal Achievements History */}
          {goalAchievements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Goal Achievements</CardTitle>
                <CardDescription>Historical goal performance and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goalAchievements.slice(0, 5).map((achievement: any) => (
                    <div key={achievement.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {achievement.status === 'achieved' ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                        ) : achievement.status === 'failed' ? (
                          <XCircleIcon className="h-5 w-5 text-red-600" />
                        ) : (
                          <AlertCircleIcon className="h-5 w-5 text-yellow-600" />
                        )}
                        <div>
                          <p className="font-medium">Goal Achievement Rate: {achievement.achievementRate}%</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Final Value: {achievement.finalValue} | Status: {achievement.status}
                          </p>
                        </div>
                      </div>
                      <Badge variant={achievement.status === 'achieved' ? 'default' : 'destructive'}>
                        {achievement.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 7-Day Trends */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Performance Score</CardTitle>
                <CardDescription>Daily performance score trend over the last week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trendsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Completion Trend</CardTitle>
                <CardDescription>Daily completed tasks over the last week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={trendsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Rate & Response Time Trends</CardTitle>
                <CardDescription>Quality metrics over the last week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trendsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} name="Success Rate %" />
                    <Line yAxisId="right" type="monotone" dataKey="response" stroke="#f59e0b" strokeWidth={2} name="Response Time (s)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goals Achievement Trend</CardTitle>
                <CardDescription>Daily goals achieved over the last week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={trendsChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="goals" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Self-Evaluation */}
        <TabsContent value="self-eval" className="space-y-6">
          {selfEvaluations.length > 0 ? (
            <div className="space-y-6">
              {selfEvaluations.map((evaluation: any) => (
                <Card key={evaluation.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BrainIcon className="h-5 w-5 text-purple-600" />
                        Self-Evaluation: {evaluation.evaluationType.replace('_', ' ').toUpperCase()}
                      </CardTitle>
                      <Badge variant="outline">
                        {new Date(evaluation.timestamp).toLocaleTimeString()}
                      </Badge>
                    </div>
                    <CardDescription>
                      Context: {evaluation.context} | Confidence: {(parseFloat(evaluation.confidenceLevel) * 100).toFixed(0)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Self-Assessment</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                        {evaluation.selfAssessment}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Current Performance State</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(evaluation.currentState as any).map(([key, value]: [string, any]) => (
                          <div key={key} className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center">
                            <p className="text-xs text-gray-600 dark:text-gray-400">{key.replace(/([A-Z])/g, ' $1')}</p>
                            <p className="font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Goal Progress Analysis</h4>
                      <div className="space-y-2">
                        {Object.entries(evaluation.goalProgress as any).map(([goalType, progress]: [string, any]) => (
                          <div key={goalType} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                            <span className="text-sm">{goalType.replace('_', ' ')}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{progress.current} / {progress.target}</span>
                              {progress.achieved && <CheckCircleIcon className="h-4 w-4 text-green-600" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {evaluation.identifiedIssues && evaluation.identifiedIssues.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Identified Issues</h4>
                        <ul className="space-y-1">
                          {(evaluation.identifiedIssues as string[]).map((issue, index) => (
                            <li key={index} className="text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
                              <AlertCircleIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evaluation.plannedActions && evaluation.plannedActions.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Planned Improvement Actions</h4>
                        <ul className="space-y-1">
                          {(evaluation.plannedActions as string[]).map((action, index) => (
                            <li key={index} className="text-sm text-blue-600 dark:text-blue-400 flex items-start gap-2">
                              <TargetIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {evaluation.learningInsights && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Learning Insights</h4>
                        <p className="text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          {evaluation.learningInsights}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Confidence: </span>
                          <span className="font-medium">{(parseFloat(evaluation.confidenceLevel) * 100).toFixed(0)}%</span>
                        </div>
                        {evaluation.moodScore && (
                          <div className="text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Mood Score: </span>
                            <span className="font-medium">{(parseFloat(evaluation.moodScore) * 100).toFixed(0)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <BrainIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Self-Evaluations Found</h3>
                  <p className="text-gray-600 dark:text-gray-400">This agent hasn't completed any self-evaluations for the selected date.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}