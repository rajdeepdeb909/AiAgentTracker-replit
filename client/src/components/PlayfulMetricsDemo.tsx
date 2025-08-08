import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAnimatedTooltip } from "@/components/AnimatedMetricsTooltip";
import { 
  Rocket, 
  Trophy, 
  Target, 
  Crown,
  Sparkles,
  Zap,
  Star,
  Heart
} from "lucide-react";

export default function PlayfulMetricsDemo() {
  const { showTooltip, hideTooltip, TooltipComponent } = useAnimatedTooltip();

  const demoMetrics = [
    {
      name: "Revenue per Call",
      value: "$231.85",
      change: "+20.98%",
      agent: "Customer Communication Hub",
      icon: <Crown className="h-6 w-6 text-gold-400" />,
      color: "from-green-600 to-emerald-600"
    },
    {
      name: "Paid Completes", 
      value: "3,900",
      change: "-38.72%",
      agent: "Advanced Scheduling Agent",
      icon: <Trophy className="h-6 w-6 text-yellow-400" />,
      color: "from-blue-600 to-cyan-600"
    },
    {
      name: "Profit Margin",
      value: "32.75%",
      change: "+5.40%", 
      agent: "Route Optimization Engine",
      icon: <Target className="h-6 w-6 text-blue-400" />,
      color: "from-purple-600 to-pink-600"
    },
    {
      name: "PPT Cost",
      value: "$608,076",
      change: "-26.38%",
      agent: "Parts Prediction Engine", 
      icon: <Zap className="h-6 w-6 text-purple-400" />,
      color: "from-orange-600 to-red-600"
    }
  ];

  const animationTypes: ("bounce" | "pulse" | "slide" | "glow")[] = ["bounce", "pulse", "slide", "glow"];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900 to-pink-900 border-purple-500">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Sparkles className="h-6 w-6 mr-3 text-yellow-400" />
            Playful Metrics Tooltips Demo
          </CardTitle>
          <CardDescription className="text-purple-200">
            Hover over any metric to see animated tooltips with fun explanations and agent personalities!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoMetrics.map((metric, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${metric.color} p-6 rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const animation = animationTypes[index % animationTypes.length];
                  
                  showTooltip(
                    metric.name,
                    metric.value,
                    metric.change,
                    `${metric.agent} is working its magic on this metric!`,
                    metric.agent,
                    { x: rect.right, y: rect.top },
                    animation
                  );
                }}
                onMouseLeave={hideTooltip}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {metric.icon}
                    <h3 className="text-white font-bold text-lg">{metric.name}</h3>
                  </div>
                  <Badge 
                    className={`${metric.change.startsWith('+') ? 'bg-green-500' : 'bg-red-500'} text-white animate-pulse`}
                  >
                    {metric.change}
                  </Badge>
                </div>

                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-200">Current Performance</div>
                </div>

                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                  <div className="text-white text-sm font-medium mb-1">Powered by:</div>
                  <div className="text-gray-200 text-xs">{metric.agent}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Instructions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-400" />
            How the Playful Tooltips Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30">
                <h4 className="text-blue-300 font-medium mb-2 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Fun Explanations
                </h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Each metric gets a playful, memorable explanation</li>
                  <li>• Real-world analogies make complex data relatable</li>
                  <li>• Agent personalities add humor and engagement</li>
                  <li>• Visual icons and animations draw attention</li>
                </ul>
              </div>

              <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                <h4 className="text-green-300 font-medium mb-2 flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Engagement Features
                </h4>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• 4 different animation types (bounce, pulse, slide, glow)</li>
                  <li>• Hover effects with scaling and shadows</li>
                  <li>• Color-coded change indicators</li>
                  <li>• Auto-hide tooltips after 5 seconds</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                <h4 className="text-purple-300 font-medium mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Agent Personalities
                </h4>
                <ul className="text-purple-200 text-sm space-y-1">
                  <li>• Customer Communication Hub: "I talk the talk and walk the walk!"</li>
                  <li>• Parts Prediction Engine: "I predict, therefore I save!"</li>
                  <li>• Route Optimization Engine: "I find treasure maps to profitability!"</li>
                  <li>• Advanced Scheduling Agent: "I schedule, therefore I am!"</li>
                </ul>
              </div>

              <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
                <h4 className="text-orange-300 font-medium mb-2 flex items-center">
                  <Rocket className="h-4 w-4 mr-2" />
                  Technical Magic
                </h4>
                <ul className="text-orange-200 text-sm space-y-1">
                  <li>• Dynamic positioning based on hover location</li>
                  <li>• Real-time trend analysis and color coding</li>
                  <li>• Responsive design for all screen sizes</li>
                  <li>• Smooth CSS transitions and animations</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          onClick={() => {
            // Demo all tooltips in sequence
            demoMetrics.forEach((metric, index) => {
              setTimeout(() => {
                showTooltip(
                  metric.name,
                  metric.value, 
                  metric.change,
                  `${metric.agent} is demonstrating its playful personality!`,
                  metric.agent,
                  { x: 400 + (index * 50), y: 200 + (index * 30) },
                  animationTypes[index % animationTypes.length]
                );
              }, index * 1000);
            });
          }}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Demo All Tooltips
        </Button>
      </div>

      {/* Tooltip Component */}
      <TooltipComponent />
    </div>
  );
}