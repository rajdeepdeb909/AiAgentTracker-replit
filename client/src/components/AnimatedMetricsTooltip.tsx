import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target,
  Zap,
  Brain,
  Heart,
  Star,
  Crown,
  Rocket,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Sparkles
} from "lucide-react";

interface MetricTooltipProps {
  metricName: string;
  value: string;
  change: string;
  explanation: string;
  agentResponsible: string;
  isVisible: boolean;
  position?: { x: number; y: number };
  animationType?: "bounce" | "pulse" | "slide" | "glow";
}

interface PlayfulExplanation {
  icon: React.ReactNode;
  title: string;
  funFact: string;
  impact: string;
  agentPersonality: string;
}

export default function AnimatedMetricsTooltip({ 
  metricName, 
  value, 
  change, 
  explanation, 
  agentResponsible,
  isVisible,
  position = { x: 0, y: 0 },
  animationType = "bounce"
}: MetricTooltipProps) {
  const [animationClass, setAnimationClass] = useState("");
  const [playfulData, setPlayfulData] = useState<PlayfulExplanation | null>(null);

  useEffect(() => {
    if (isVisible) {
      // Set animation based on type
      switch (animationType) {
        case "bounce":
          setAnimationClass("animate-bounce");
          break;
        case "pulse":
          setAnimationClass("animate-pulse");
          break;
        case "slide":
          setAnimationClass("animate-slide-in");
          break;
        case "glow":
          setAnimationClass("animate-glow");
          break;
        default:
          setAnimationClass("animate-bounce");
      }

      // Generate playful explanation based on metric
      setPlayfulData(generatePlayfulExplanation(metricName, agentResponsible));

      // Clear animation after 3 seconds
      const timer = setTimeout(() => {
        setAnimationClass("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, metricName, agentResponsible, animationType]);

  const generatePlayfulExplanation = (metric: string, agent: string): PlayfulExplanation => {
    const explanations: Record<string, PlayfulExplanation> = {
      "Revenue per Call": {
        icon: <DollarSign className="h-6 w-6 text-green-400" />,
        title: "💰 Money Talks!",
        funFact: "Each conversation is like a golden ticket - our Customer Communication Hub turns chats into cash!",
        impact: "Every call now generates 20.98% more revenue. That's like finding money in your couch cushions, but way more reliable!",
        agentPersonality: "🎭 Customer Communication Hub says: 'I don't just talk the talk, I walk the walk... straight to the bank!'"
      },
      "Paid Completes": {
        icon: <Trophy className="h-6 w-6 text-yellow-400" />,
        title: "🏆 Mission Accomplished!",
        funFact: "3,900 completed jobs! That's like finishing a jigsaw puzzle... 3,900 times!",
        impact: "Our Advanced Scheduling Agent is the ultimate task master, orchestrating completions like a symphony conductor.",
        agentPersonality: "⚡ Advanced Scheduling Agent says: 'I schedule, therefore I am... incredibly efficient!'"
      },
      "Profit Margin": {
        icon: <Target className="h-6 w-6 text-blue-400" />,
        title: "🎯 Bullseye Profits!",
        funFact: "32.75% margin means we're not just making money, we're making it rain... responsibly!",
        impact: "Route Optimization Engine found the secret sauce: efficiency + smart routing = profit perfection!",
        agentPersonality: "🗺️ Route Optimization Engine says: 'I don't just find routes, I find treasure maps to profitability!'"
      },
      "PPT Cost": {
        icon: <Target className="h-6 w-6 text-purple-400" />,
        title: "🔧 Parts Whisperer!",
        funFact: "Saved 26.38% on parts costs! That's like getting a bulk discount from the universe!",
        impact: "Parts Prediction Engine can see into the future... well, at least for inventory needs!",
        agentPersonality: "🔮 Parts Prediction Engine says: 'I predict, therefore I save! Crystal ball not included.'"
      },
      "Total Revenue": {
        icon: <Crown className="h-6 w-6 text-gold-400" />,
        title: "👑 Revenue Royalty!",
        funFact: "$904,227 in revenue! That's enough to buy approximately 180,845 fancy coffee drinks!",
        impact: "Multiple agents working together like a money-making Avengers team!",
        agentPersonality: "🚀 Team Effort says: 'Together we're unstoppable, individually we're pretty great too!'"
      }
    };

    return explanations[metric] || {
      icon: <Sparkles className="h-6 w-6 text-cyan-400" />,
      title: "✨ Magical Metrics!",
      funFact: "This metric is doing something amazing in the background!",
      impact: "Our AI agents are working their magic to optimize this performance indicator.",
      agentPersonality: "🎪 Mystery Agent says: 'The magic happens behind the scenes... like a really good magic show!'"
    };
  };

  const getTrendIcon = () => {
    const isPositive = change.startsWith('+') || (!change.startsWith('-') && parseFloat(change) > 0);
    return isPositive ? 
      <ArrowUpRight className="h-5 w-5 text-green-400" /> : 
      <ArrowDownRight className="h-5 w-5 text-red-400" />;
  };

  const getTrendColor = () => {
    const isPositive = change.startsWith('+') || (!change.startsWith('-') && parseFloat(change) > 0);
    return isPositive ? 'text-green-400' : 'text-red-400';
  };

  if (!isVisible || !playfulData) return null;

  return (
    <div 
      className={`fixed z-50 ${animationClass}`}
      style={{ 
        left: Math.min(position.x + 20, window.innerWidth - 400), 
        top: Math.max(position.y - 10, 20),
        transform: isVisible ? 'scale(1)' : 'scale(0)',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-500 shadow-2xl max-w-sm">
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {playfulData.icon}
              <h4 className="text-white font-bold text-sm">{metricName}</h4>
            </div>
            <div className="flex items-center space-x-2">
              {getTrendIcon()}
              <Badge className={`${getTrendColor()} border-current text-xs`}>
                {change}
              </Badge>
            </div>
          </div>

          {/* Value Display */}
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-gray-400">Current Performance</div>
          </div>

          {/* Playful Title */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg mb-3">
            <h5 className="text-white font-bold text-sm mb-1">{playfulData.title}</h5>
            <p className="text-purple-100 text-xs">{playfulData.funFact}</p>
          </div>

          {/* Impact Explanation */}
          <div className="bg-blue-900/30 p-3 rounded-lg mb-3 border border-blue-500/30">
            <h6 className="text-blue-300 font-medium text-xs mb-1">🎯 Impact Analysis</h6>
            <p className="text-blue-200 text-xs">{playfulData.impact}</p>
          </div>

          {/* Agent Personality */}
          <div className="bg-green-900/30 p-3 rounded-lg border border-green-500/30">
            <h6 className="text-green-300 font-medium text-xs mb-1">🤖 Agent Says:</h6>
            <p className="text-green-200 text-xs italic">{playfulData.agentPersonality}</p>
          </div>

          {/* Animation Sparkles */}
          <div className="absolute -top-2 -right-2">
            <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" />
          </div>
          <div className="absolute -bottom-1 -left-1">
            <Star className="h-4 w-4 text-pink-400 animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Hook for easy tooltip management
export function useAnimatedTooltip() {
  const [tooltip, setTooltip] = useState<{
    isVisible: boolean;
    metricName: string;
    value: string;
    change: string;
    explanation: string;
    agentResponsible: string;
    position: { x: number; y: number };
    animationType: "bounce" | "pulse" | "slide" | "glow";
  }>({
    isVisible: false,
    metricName: "",
    value: "",
    change: "",
    explanation: "",
    agentResponsible: "",
    position: { x: 0, y: 0 },
    animationType: "bounce"
  });

  const showTooltip = (
    metricName: string,
    value: string,
    change: string,
    explanation: string,
    agentResponsible: string,
    position: { x: number; y: number },
    animationType: "bounce" | "pulse" | "slide" | "glow" = "bounce"
  ) => {
    setTooltip({
      isVisible: true,
      metricName,
      value,
      change,
      explanation,
      agentResponsible,
      position,
      animationType
    });

    // Auto-hide after 8 seconds (increased duration)
    setTimeout(() => {
      hideTooltip();
    }, 8000);
  };

  const hideTooltip = () => {
    setTooltip(prev => ({ ...prev, isVisible: false }));
  };

  return {
    tooltip,
    showTooltip,
    hideTooltip,
    TooltipComponent: () => (
      <AnimatedMetricsTooltip
        metricName={tooltip.metricName}
        value={tooltip.value}
        change={tooltip.change}
        explanation={tooltip.explanation}
        agentResponsible={tooltip.agentResponsible}
        isVisible={tooltip.isVisible}
        position={tooltip.position}
        animationType={tooltip.animationType}
      />
    )
  };
}