import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Refrigerator, 
  Waves, 
  Zap, 
  ChefHat, 
  Wind, 
  TrendingDown,
  DollarSign,
  Users,
  AlertCircle
} from "lucide-react";

export default function ServiceAreaFrictionAnalysis() {
  // Service area specific friction data
  const serviceAreaFriction = [
    {
      serviceArea: "Refrigerators",
      icon: Refrigerator,
      color: "blue",
      totalCalls: 1247,
      dropoutRate: 11.2,
      revenueImpact: "$153,924",
      avgTicketValue: "$392",
      commonIssues: [
        { issue: "Not cooling properly", percentage: 34.2, urgency: "high" },
        { issue: "Strange noises", percentage: 28.1, urgency: "medium" },
        { issue: "Ice maker problems", percentage: 22.7, urgency: "low" },
        { issue: "Door seal issues", percentage: 15.0, urgency: "medium" }
      ],
      frictionPoints: [
        { point: "Complex diagnostic questions", impact: 42.3 },
        { point: "Scheduling urgency confusion", impact: 31.7 },
        { point: "Food spoilage concern pricing", impact: 26.0 }
      ],
      aiOptimization: {
        potentialRecovery: "$107,747",
        improvementRate: 70,
        solutions: [
          "Temperature-based diagnostic AI",
          "Food spoilage urgency algorithms",
          "Preventive maintenance scheduling"
        ]
      }
    },
    {
      serviceArea: "Washers & Dryers",
      icon: Waves,
      color: "cyan",
      totalCalls: 1089,
      dropoutRate: 13.8,
      revenueImpact: "$178,243",
      avgTicketValue: "$385",
      commonIssues: [
        { issue: "Won't start/power issues", percentage: 38.5, urgency: "high" },
        { issue: "Not draining properly", percentage: 24.3, urgency: "high" },
        { issue: "Excessive noise/vibration", percentage: 21.2, urgency: "medium" },
        { issue: "Clothes not drying", percentage: 16.0, urgency: "medium" }
      ],
      frictionPoints: [
        { point: "Emergency vs routine confusion", impact: 45.8 },
        { point: "Load capacity questions", impact: 32.1 },
        { point: "Warranty status uncertainty", impact: 22.1 }
      ],
      aiOptimization: {
        potentialRecovery: "$124,770",
        improvementRate: 70,
        solutions: [
          "Urgency classification AI",
          "Load capacity visual guides",
          "Instant warranty lookup"
        ]
      }
    },
    {
      serviceArea: "HVAC Systems",
      icon: Wind,
      color: "green",
      totalCalls: 892,
      dropoutRate: 16.4,
      revenueImpact: "$213,156",
      avgTicketValue: "$445",
      commonIssues: [
        { issue: "No heating/cooling", percentage: 41.2, urgency: "high" },
        { issue: "Poor airflow", percentage: 26.8, urgency: "medium" },
        { issue: "Strange smells", percentage: 18.9, urgency: "high" },
        { issue: "High energy bills", percentage: 13.1, urgency: "low" }
      ],
      frictionPoints: [
        { point: "Seasonal emergency pricing", impact: 48.3 },
        { point: "System complexity assessment", impact: 34.7 },
        { point: "Energy efficiency expectations", impact: 17.0 }
      ],
      aiOptimization: {
        potentialRecovery: "$149,209",
        improvementRate: 70,
        solutions: [
          "Seasonal pricing transparency",
          "System age and efficiency AI",
          "Energy savings calculators"
        ]
      }
    },
    {
      serviceArea: "Kitchen Appliances",
      icon: ChefHat,
      color: "orange",
      totalCalls: 743,
      dropoutRate: 9.7,
      revenueImpact: "$98,341",
      avgTicketValue: "$351",
      commonIssues: [
        { issue: "Dishwasher not cleaning", percentage: 35.6, urgency: "medium" },
        { issue: "Oven temperature issues", percentage: 28.4, urgency: "medium" },
        { issue: "Microwave not heating", percentage: 21.8, urgency: "low" },
        { issue: "Stove burner problems", percentage: 14.2, urgency: "high" }
      ],
      frictionPoints: [
        { point: "Multiple appliance scheduling", impact: 38.9 },
        { point: "Brand-specific part availability", impact: 32.4 },
        { point: "Cooking disruption timeline", impact: 28.7 }
      ],
      aiOptimization: {
        potentialRecovery: "$68,839",
        improvementRate: 70,
        solutions: [
          "Multi-appliance service bundling",
          "Real-time parts availability",
          "Cooking disruption minimization"
        ]
      }
    }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: "text-blue-400",
      cyan: "text-cyan-400", 
      green: "text-green-400",
      orange: "text-orange-400"
    };
    return colors[color as keyof typeof colors] || "text-gray-400";
  };

  const getBgColor = (color: string) => {
    const colors = {
      blue: "bg-blue-900/30",
      cyan: "bg-cyan-900/30",
      green: "bg-green-900/30", 
      orange: "bg-orange-900/30"
    };
    return colors[color as keyof typeof colors] || "bg-gray-900/30";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {serviceAreaFriction.map((area, index) => {
          const IconComponent = area.icon;
          return (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center text-lg">
                  <IconComponent className={`h-5 w-5 mr-2 ${getIconColor(area.color)}`} />
                  {area.serviceArea}
                </CardTitle>
                <div className="flex justify-between items-center">
                  <Badge className={`${area.dropoutRate > 15 ? 'bg-red-600' : area.dropoutRate > 10 ? 'bg-yellow-600' : 'bg-green-600'}`}>
                    {area.dropoutRate}% Dropout
                  </Badge>
                  <span className="text-sm text-gray-400">{area.totalCalls} calls</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-red-400">{area.revenueImpact}</div>
                  <div className="text-xs text-gray-400">Revenue at Risk</div>
                </div>

                <div className={`${getBgColor(area.color)} p-3 rounded-lg`}>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Top Issue</h4>
                  <div className="text-sm text-white">{area.commonIssues[0].issue}</div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-400">{area.commonIssues[0].percentage}% of calls</span>
                    <Badge className={`text-xs ${
                      area.commonIssues[0].urgency === 'high' ? 'bg-red-600' :
                      area.commonIssues[0].urgency === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                    }`}>
                      {area.commonIssues[0].urgency}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">AI Recovery Potential</h4>
                  <div className="text-lg font-bold text-green-400">{area.aiOptimization.potentialRecovery}</div>
                  <Progress value={area.aiOptimization.improvementRate} className="mt-1" />
                  <div className="text-xs text-gray-400 mt-1">{area.aiOptimization.improvementRate}% improvement potential</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Service Area Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {serviceAreaFriction.slice(0, 2).map((area, index) => {
          const IconComponent = area.icon;
          return (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <IconComponent className={`h-5 w-5 mr-2 ${getIconColor(area.color)}`} />
                  {area.serviceArea} - Detailed Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{area.dropoutRate}%</div>
                    <div className="text-sm text-gray-400">Dropout Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{area.avgTicketValue}</div>
                    <div className="text-sm text-gray-400">Avg Ticket Value</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Common Issues</h4>
                  <div className="space-y-2">
                    {area.commonIssues.map((issue, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm text-white">{issue.issue}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">{issue.percentage}%</span>
                          <Badge className={`text-xs ${
                            issue.urgency === 'high' ? 'bg-red-600' :
                            issue.urgency === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                          }`}>
                            {issue.urgency}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Friction Points</h4>
                  <div className="space-y-2">
                    {area.frictionPoints.map((friction, idx) => (
                      <div key={idx} className="bg-gray-900 p-2 rounded">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-white">{friction.point}</span>
                          <span className="text-xs text-red-400">{friction.impact}% impact</span>
                        </div>
                        <Progress value={friction.impact} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${getBgColor(area.color)} p-3 rounded-lg`}>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">AI Solutions</h4>
                  <div className="space-y-1">
                    {area.aiOptimization.solutions.map((solution, idx) => (
                      <div key={idx} className="text-sm text-gray-200 flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {solution}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}