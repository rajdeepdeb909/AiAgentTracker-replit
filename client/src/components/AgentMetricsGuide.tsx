import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, Target, Clock, Brain, Eye, Lock, TrendingUp, Calendar, DollarSign, Activity, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function AgentMetricsGuide() {
  const [, setLocation] = useLocation();
  const metricExplanations = [
    {
      metric: "Accuracy",
      icon: <Target className="w-5 h-5 text-blue-400" />,
      description: "Percentage of correct decisions and predictions made by the AI agent",
      howToUse: "Monitor for consistent performance above 85%. If accuracy drops below 80%, investigate data quality or retrain the agent.",
      actionItems: [
        "Review recent agent decisions for patterns in errors",
        "Check if agent needs additional training data",
        "Validate input data quality and consistency",
        "Consider adjusting agent parameters if consistently low"
      ],
      goodRange: "85-95%",
      warningRange: "70-85%", 
      criticalRange: "Below 70%"
    },
    {
      metric: "Response Time",
      icon: <Clock className="w-5 h-5 text-green-400" />,
      description: "Average time (in seconds) for the agent to process requests and provide responses",
      howToUse: "Ensure response times meet business requirements. Customer-facing agents should respond within 2-3 seconds.",
      actionItems: [
        "Optimize agent algorithms if response time is consistently high",
        "Check system resources and scaling requirements",
        "Review complexity of agent tasks and consider simplification",
        "Monitor during peak usage times for performance degradation"
      ],
      goodRange: "0.5-2.0s",
      warningRange: "2.0-5.0s",
      criticalRange: "Above 5.0s"
    },
    {
      metric: "Learning",
      icon: <Brain className="w-5 h-5 text-purple-400" />,
      description: "Agent's ability to improve performance through continuous learning from new data and feedback",
      howToUse: "Indicates whether the agent is actively learning and adapting. All agents should have learning enabled.",
      actionItems: [
        "Ensure continuous data flow for learning algorithms",
        "Review learning model performance and update frequency",
        "Validate that feedback loops are functioning properly",
        "Monitor learning effectiveness through accuracy improvements"
      ],
      goodRange: "Enabled",
      warningRange: "Limited",
      criticalRange: "Disabled"
    },
    {
      metric: "Context",
      icon: <Eye className="w-5 h-5 text-orange-400" />,
      description: "Agent's ability to understand and maintain context across conversations and interactions",
      howToUse: "Critical for conversational agents. Ensures continuity in customer interactions and complex problem-solving.",
      actionItems: [
        "Test multi-turn conversations for context retention",
        "Review conversation logs for context-related errors",
        "Validate context window size meets business needs",
        "Ensure proper session management and memory allocation"
      ],
      goodRange: "Full Context",
      warningRange: "Limited Context",
      criticalRange: "No Context"
    },
    {
      metric: "Security",
      icon: <Lock className="w-5 h-5 text-red-400" />,
      description: "Implementation of security protocols including data encryption, access controls, and compliance measures",
      howToUse: "Must always be enabled. Monitor for security incidents and ensure compliance with data protection regulations.",
      actionItems: [
        "Regular security audits and vulnerability assessments",
        "Verify encryption of all sensitive data transmissions",
        "Review access logs and authentication protocols",
        "Ensure compliance with GDPR, CCPA, and industry standards"
      ],
      goodRange: "Fully Secured",
      warningRange: "Partially Secured",
      criticalRange: "Unsecured"
    },
    {
      metric: "Performance",
      icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
      description: "Overall performance score combining accuracy, efficiency, and business impact metrics",
      howToUse: "Comprehensive health indicator. Target 90%+ for critical business agents. Use for prioritizing agent improvements.",
      actionItems: [
        "Identify specific areas dragging down overall performance",
        "Compare performance across similar agents for benchmarking",
        "Set improvement targets and track progress over time",
        "Escalate agents below 70% performance for immediate attention"
      ],
      goodRange: "85-100%",
      warningRange: "70-85%",
      criticalRange: "Below 70%"
    },
    {
      metric: "Roadmap Progress",
      icon: <Calendar className="w-5 h-5 text-yellow-400" />,
      description: "Progress toward completing planned milestones and feature implementations",
      howToUse: "Track agent evolution and capability expansion. Ensures agents meet business roadmap requirements.",
      actionItems: [
        "Review upcoming milestones and resource requirements",
        "Adjust timeline expectations based on current progress",
        "Prioritize critical milestones for business continuity",
        "Coordinate cross-agent dependencies and integrations"
      ],
      goodRange: "75-100%",
      warningRange: "50-75%",
      criticalRange: "Below 50%"
    },
    {
      metric: "Daily Tasks",
      icon: <Activity className="w-5 h-5 text-indigo-400" />,
      description: "Number of tasks, interactions, or decisions processed by the agent each day",
      howToUse: "Monitor workload distribution and agent capacity. High-performing agents should handle more critical tasks.",
      actionItems: [
        "Balance workload across agents to prevent bottlenecks",
        "Scale agent capacity during peak business periods",
        "Analyze task complexity and processing efficiency",
        "Identify opportunities for task automation and optimization"
      ],
      goodRange: "Within Capacity",
      warningRange: "Near Capacity",
      criticalRange: "Over Capacity"
    },
    {
      metric: "Monthly Cost",
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
      description: "Total monthly operational cost including compute resources, data processing, and maintenance",
      howToUse: "Monitor cost efficiency and ROI. Compare against revenue impact to ensure positive business value.",
      actionItems: [
        "Optimize resource usage during low-demand periods",
        "Review cost trends and identify expensive operations",
        "Calculate ROI by comparing cost to revenue impact",
        "Consider agent consolidation or efficiency improvements"
      ],
      goodRange: "Positive ROI",
      warningRange: "Break-even",
      criticalRange: "Negative ROI"
    },
    {
      metric: "Revenue Impact",
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      description: "Measurable revenue generated or protected through agent actions and decisions",
      howToUse: "Primary business value indicator. Track trends and optimize high-impact agents for maximum revenue generation.",
      actionItems: [
        "Identify specific revenue-generating agent actions",
        "Optimize high-impact workflows and decision paths",
        "Scale successful agent strategies across similar use cases",
        "Track revenue attribution and validate impact measurements"
      ],
      goodRange: "Growing Impact",
      warningRange: "Stable Impact",
      criticalRange: "Declining Impact"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        onClick={() => setLocation('/dashboard')}
        variant="outline"
        className="mb-4 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-blue-400" />
            AI Agent Metrics Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-4">
            Comprehensive guide to understanding and using the 10 key metrics displayed for each AI agent in America's Home Manager platform.
          </p>
          
          <div className="grid gap-6">
            {metricExplanations.map((metric, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white flex items-center">
                    {metric.icon}
                    <span className="ml-2">{metric.metric}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{metric.description}</p>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <h4 className="text-blue-400 font-medium mb-2">How to Use:</h4>
                    <p className="text-gray-300 text-sm">{metric.howToUse}</p>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Performance Ranges:</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Badge className="bg-green-500/20 text-green-400 justify-center py-1">
                        Good: {metric.goodRange}
                      </Badge>
                      <Badge className="bg-yellow-500/20 text-yellow-400 justify-center py-1">
                        Warning: {metric.warningRange}
                      </Badge>
                      <Badge className="bg-red-500/20 text-red-400 justify-center py-1">
                        Critical: {metric.criticalRange}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Action Items:</h4>
                    <div className="space-y-1">
                      {metric.actionItems.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          <p className="text-gray-400 text-sm">{action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}