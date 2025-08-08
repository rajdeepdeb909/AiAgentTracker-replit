import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { 
  MessageSquare, 
  Bot, 
  Mic, 
  TrendingUp, 
  Target, 
  Brain,
  Zap,
  Globe,
  CheckCircle
} from "lucide-react";

interface DashboardStats {
  llmMetrics: {
    totalLLMAgents: number;
    avgChatGPTRecommendations: number;
    avgPerplexityReferrals: number;
    avgVoiceAssistantQueries: number;
    avgLLMConversionRate: number;
    totalLLMRevenue: number;
    llmROI: number;
    aiPlatformPartnerships: number;
    contentInclusionRate: number;
    voiceCommerceSuccess: number;
    llmDominanceRate: number;
    knowledgeBaseAccuracy: number;
    conversationalConversionRate: number;
  };
}

export function LLMMetricsDashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
  });

  if (isLoading || !stats?.llmMetrics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const { llmMetrics } = stats;

  const MetricCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    progress, 
    badgeText, 
    badgeVariant = "default",
    trend 
  }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle: string;
    progress?: number;
    badgeText?: string;
    badgeVariant?: "default" | "secondary" | "destructive" | "outline";
    trend?: "up" | "down";
  }) => (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon className="h-4 w-4 text-blue-600" />
          {title}
        </CardTitle>
        {badgeText && (
          <Badge variant={badgeVariant} className="text-xs">
            {badgeText}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <TrendingUp className={`h-4 w-4 ${trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
          )}
        </div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        {progress !== undefined && (
          <Progress value={progress} className="mt-2 h-2" />
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">LLM Marketing Intelligence</h2>
          <p className="text-muted-foreground">
            Real-time performance metrics from AI platform integrations
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {llmMetrics.totalLLMAgents} LLM Agents Active
        </Badge>
      </div>

      {/* Primary LLM Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={MessageSquare}
          title="ChatGPT Recommendations"
          value={llmMetrics.avgChatGPTRecommendations}
          subtitle="Daily referrals from ChatGPT"
          progress={73}
          badgeText="Target: 200/day"
          badgeVariant="secondary"
          trend="up"
        />
        
        <MetricCard
          icon={Brain}
          title="Perplexity Referrals"
          value={llmMetrics.avgPerplexityReferrals}
          subtitle="Daily referrals from Perplexity"
          progress={59}
          badgeText="Growing"
          badgeVariant="default"
          trend="up"
        />
        
        <MetricCard
          icon={Mic}
          title="Voice Assistant Queries"
          value={llmMetrics.avgVoiceAssistantQueries}
          subtitle="Daily voice commerce interactions"
          progress={85}
          badgeText="Excellent"
          badgeVariant="default"
          trend="up"
        />
        
        <MetricCard
          icon={Target}
          title="LLM Conversion Rate"
          value={`${llmMetrics.avgLLMConversionRate}%`}
          subtitle="LLM platform to service booking"
          progress={llmMetrics.avgLLMConversionRate}
          badgeText="Above Target"
          badgeVariant="default"
          trend="up"
        />
      </div>

      {/* Revenue and ROI Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          icon={TrendingUp}
          title="LLM Revenue Impact"
          value={`$${(llmMetrics.totalLLMRevenue / 1000).toFixed(0)}K`}
          subtitle="Monthly revenue from LLM platforms"
          badgeText={`${llmMetrics.llmROI}% ROI`}
          badgeVariant="default"
          trend="up"
        />
        
        <MetricCard
          icon={Globe}
          title="AI Platform Partnerships"
          value={llmMetrics.aiPlatformPartnerships}
          subtitle="Active integrations & partnerships"
          progress={67}
          badgeText="Expanding"
          badgeVariant="secondary"
        />
        
        <MetricCard
          icon={CheckCircle}
          title="Content Inclusion Rate"
          value={`${llmMetrics.contentInclusionRate}%`}
          subtitle="Our content in LLM knowledge bases"
          progress={llmMetrics.contentInclusionRate}
          badgeText="High Quality"
          badgeVariant="default"
        />
      </div>

      {/* Advanced LLM Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={Zap}
          title="Voice Commerce Success"
          value={`${llmMetrics.voiceCommerceSuccess}%`}
          subtitle="Voice-initiated service completion"
          progress={llmMetrics.voiceCommerceSuccess}
          badgeText="Strong"
          badgeVariant="default"
        />
        
        <MetricCard
          icon={Target}
          title="LLM Dominance Rate"
          value={`${llmMetrics.llmDominanceRate}%`}
          subtitle="Planning areas with top-3 LLM ranking"
          progress={llmMetrics.llmDominanceRate}
          badgeText="Excellent"
          badgeVariant="default"
        />
        
        <MetricCard
          icon={Brain}
          title="Knowledge Base Accuracy"
          value={`${llmMetrics.knowledgeBaseAccuracy}%`}
          subtitle="Accuracy of LLM responses about us"
          progress={llmMetrics.knowledgeBaseAccuracy}
          badgeText="High Precision"
          badgeVariant="default"
        />
        
        <MetricCard
          icon={MessageSquare}
          title="Conversational Conversion"
          value={`${llmMetrics.conversationalConversionRate}%`}
          subtitle="Chat to service booking rate"
          progress={llmMetrics.conversationalConversionRate}
          badgeText="Optimized"
          badgeVariant="default"
        />
      </div>

      {/* Strategic Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            LLM Strategy Performance Summary
          </CardTitle>
          <CardDescription>
            Key insights from our AI platform integration strategy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-700">Success Metrics</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• {llmMetrics.llmDominanceRate}% of planning areas achieve top-3 LLM rankings</li>
                <li>• {llmMetrics.avgChatGPTRecommendations + llmMetrics.avgPerplexityReferrals} daily AI platform referrals</li>
                <li>• {llmMetrics.llmROI}% ROI from LLM-focused marketing investments</li>
                <li>• {llmMetrics.contentInclusionRate}% content inclusion rate across AI platforms</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-700">Growth Opportunities</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Target 300+ daily ChatGPT recommendations by Q2</li>
                <li>• Expand to 12+ AI platform partnerships</li>
                <li>• Increase voice commerce success to 90%+</li>
                <li>• Achieve 95%+ knowledge base accuracy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}