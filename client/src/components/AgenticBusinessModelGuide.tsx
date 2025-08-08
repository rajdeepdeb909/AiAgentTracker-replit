import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Brain,
  Zap,
  Building2,
  Users,
  LineChart,
  PieChart,
  Calculator,
  Crown,
  Lightbulb,
  Activity,
  BarChart3,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function AgenticBusinessModelGuide() {
  return (
    <div className="space-y-6">
      {/* Framework Overview */}
      <Card className="bg-gradient-to-r from-green-900 to-emerald-900 border-green-500">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Crown className="h-6 w-6 mr-3 text-yellow-400" />
            Agentic Business Model Framework
          </CardTitle>
          <CardDescription className="text-green-200">
            Complete integration of AI agents into sustainable business models with measurable financial returns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-green-800/30 p-4 rounded-lg">
              <h4 className="text-green-200 font-medium mb-2 flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                Agent Value Creation
              </h4>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• Revenue Attribution Tracking</li>
                <li>• Cost Optimization Analysis</li>
                <li>• Performance ROI Measurement</li>
                <li>• Competitive Advantage Quantification</li>
              </ul>
            </div>
            <div className="bg-emerald-800/30 p-4 rounded-lg">
              <h4 className="text-emerald-200 font-medium mb-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Financial Integration
              </h4>
              <ul className="text-sm text-emerald-100 space-y-1">
                <li>• Real-time P&L Impact</li>
                <li>• Agent-specific Revenue Streams</li>
                <li>• Dynamic Cost Allocation</li>
                <li>• Investment Prioritization</li>
              </ul>
            </div>
            <div className="bg-blue-800/30 p-4 rounded-lg">
              <h4 className="text-blue-200 font-medium mb-2 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Strategic Outcomes
              </h4>
              <ul className="text-sm text-blue-100 space-y-1">
                <li>• Market Valuation Growth</li>
                <li>• Operational Leverage</li>
                <li>• Scalable Business Model</li>
                <li>• Investor Confidence</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Implementation */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
            How to Incorporate Financial Results into Agentic Framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</div>
                <h3 className="text-white text-lg font-semibold">Agent Revenue Attribution</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-blue-300 font-medium mb-2">Direct Revenue Tracking</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Customer Communication Hub: Track conversations → conversions</li>
                    <li>• Advanced Scheduling Agent: Measure booking optimization impact</li>
                    <li>• Quality Assurance Inspector: Quantify retention from quality improvements</li>
                    <li>• Route Optimization Engine: Calculate fuel savings and efficiency gains</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-green-300 font-medium mb-2">Indirect Value Creation</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Gamification Agent: Measure engagement → performance improvements</li>
                    <li>• Training Agent: Calculate reduced onboarding costs and time-to-productivity</li>
                    <li>• Emergency Response: Quantify customer satisfaction and loyalty impact</li>
                    <li>• Parts Prediction: Track inventory optimization and waste reduction</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</div>
                <h3 className="text-white text-lg font-semibold">Financial Metrics Integration</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-800/20 p-3 rounded-lg">
                  <h4 className="text-green-300 font-medium mb-2 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Revenue Metrics
                  </h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Revenue per agent per month</li>
                    <li>• Customer lifetime value impact</li>
                    <li>• Conversion rate improvements</li>
                    <li>• Upselling success rates</li>
                  </ul>
                </div>
                <div className="bg-red-800/20 p-3 rounded-lg">
                  <h4 className="text-red-300 font-medium mb-2 flex items-center">
                    <Calculator className="h-4 w-4 mr-1" />
                    Cost Metrics
                  </h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Agent development and maintenance costs</li>
                    <li>• Training cost reductions</li>
                    <li>• Operational efficiency savings</li>
                    <li>• Error prevention cost avoidance</li>
                  </ul>
                </div>
                <div className="bg-blue-800/20 p-3 rounded-lg">
                  <h4 className="text-blue-300 font-medium mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    ROI Metrics
                  </h4>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Return on investment per agent</li>
                    <li>• Payback period analysis</li>
                    <li>• Net present value calculations</li>
                    <li>• Risk-adjusted returns</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</div>
                <h3 className="text-white text-lg font-semibold">Business Model Innovation</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-purple-300 font-medium mb-2">New Revenue Streams</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Agent-as-a-Service:</strong> License AI capabilities to competitors</li>
                    <li>• <strong>Data Monetization:</strong> Sell anonymized insights to industry</li>
                    <li>• <strong>Performance Guarantees:</strong> Success-based pricing models</li>
                    <li>• <strong>Platform Fees:</strong> SaaS model for contractor management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-orange-300 font-medium mb-2">Cost Structure Transformation</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong>Variable Cost Reduction:</strong> Agents scale without proportional cost increase</li>
                    <li>• <strong>Fixed Cost Leverage:</strong> Spread development costs across growing user base</li>
                    <li>• <strong>Operational Efficiency:</strong> Reduce manual processes by 67%</li>
                    <li>• <strong>Quality Improvements:</strong> Prevent costly errors and rework</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Framework Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
              Agent Financial Dashboard Components
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  component: "Real-time Revenue Attribution",
                  description: "Track revenue generated by each agent in real-time",
                  metrics: ["Revenue per interaction", "Conversion rates", "Customer lifetime value impact"]
                },
                {
                  component: "Cost Center Analysis",
                  description: "Monitor agent operational costs and optimization opportunities",
                  metrics: ["Development costs", "Maintenance expenses", "Infrastructure usage"]
                },
                {
                  component: "ROI Tracking",
                  description: "Calculate return on investment for each agent",
                  metrics: ["Payback period", "Net present value", "Risk-adjusted returns"]
                },
                {
                  component: "Business Model Impact",
                  description: "Measure how agents transform business economics",
                  metrics: ["Market valuation impact", "Competitive advantage", "Scalability metrics"]
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-900 p-3 rounded-lg">
                  <h4 className="text-white font-medium mb-1">{item.component}</h4>
                  <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.metrics.map((metric, mIndex) => (
                      <Badge key={mIndex} variant="outline" className="text-blue-400 border-blue-600 text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Crown className="h-5 w-5 mr-2 text-yellow-400" />
              Strategic Financial Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  benefit: "Predictable Revenue Growth",
                  impact: "+23.4% YoY",
                  description: "AI agents create repeatable processes that scale revenue predictably"
                },
                {
                  benefit: "Operational Leverage",
                  impact: "63.1% Gross Margin",
                  description: "Fixed agent costs spread across growing user base"
                },
                {
                  benefit: "Competitive Moats",
                  impact: "423% Agent ROI",
                  description: "Proprietary AI capabilities create sustainable advantages"
                },
                {
                  benefit: "Market Valuation Premium",
                  impact: "$1.2B Valuation",
                  description: "Technology-first approach commands premium valuations"
                },
                {
                  benefit: "Investment Efficiency",
                  impact: "67% Cost Reduction",
                  description: "Targeted investments in high-ROI agents maximize returns"
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-900 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-medium text-sm">{item.benefit}</h4>
                    <Badge variant="outline" className="text-green-400 border-green-600 text-xs">
                      {item.impact}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Roadmap */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2 text-blue-400" />
            Implementation Roadmap
          </CardTitle>
          <CardDescription className="text-gray-400">
            Step-by-step approach to integrate financial modeling into your agentic framework
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                phase: "Phase 1: Foundation (Weeks 1-4)",
                tasks: [
                  "Implement agent performance tracking",
                  "Set up revenue attribution system",
                  "Create cost allocation framework",
                  "Build basic ROI calculations"
                ]
              },
              {
                phase: "Phase 2: Integration (Weeks 5-8)",
                tasks: [
                  "Connect agents to financial metrics",
                  "Deploy real-time dashboards",
                  "Implement automated reporting",
                  "Set up alert systems for key metrics"
                ]
              },
              {
                phase: "Phase 3: Optimization (Weeks 9-12)",
                tasks: [
                  "Analyze agent performance patterns",
                  "Optimize resource allocation",
                  "Fine-tune business model components",
                  "Scale high-ROI agents"
                ]
              },
              {
                phase: "Phase 4: Innovation (Weeks 13-16)",
                tasks: [
                  "Develop new revenue streams",
                  "Create competitive moats",
                  "Build investor presentation",
                  "Plan market expansion"
                ]
              }
            ].map((phase, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                  {phase.phase}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {phase.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center text-sm text-gray-300">
                      <ArrowRight className="h-3 w-3 mr-2 text-blue-400" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}