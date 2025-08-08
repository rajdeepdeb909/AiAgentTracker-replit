import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useCollaboration } from "@/hooks/useCollaboration";
import { 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  Building,
  MessageSquare
} from "lucide-react";

interface CEOAction {
  id: string;
  title: string;
  description: string;
  impact: string;
  urgency: 'critical' | 'high' | 'medium';
  category: 'capacity' | 'financial' | 'strategic' | 'operational';
  agents: string[];
  estimatedValue: string;
  timeline: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface CEOActionCenterProps {
  userId: string;
  userName: string;
  userRole: string;
  currentPage: string;
  currentSection: string;
}

export function CEOActionCenter({
  userId,
  userName,
  userRole,
  currentPage,
  currentSection
}: CEOActionCenterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { sendActivityBroadcast } = useCollaboration({
    userId,
    userName,
    userRole,
    currentPage,
    currentSection
  });

  const ceoActions: CEOAction[] = [
    {
      id: 'capacity-crisis-1',
      title: 'Immediate Capacity Expansion - 1099 Contractor Network',
      description: 'Scale contractor network from 2 to 50+ companies to handle 2,000 daily reschedules',
      impact: 'Eliminate $496K daily revenue at risk from reschedules',
      urgency: 'critical',
      category: 'capacity',
      agents: ['CEO/COO Agent', 'Technician Recruiting Agent', 'B2B Relationship Manager'],
      estimatedValue: '$15.4M monthly revenue protection',
      timeline: '2 weeks',
      status: 'in-progress'
    },
    {
      id: 'series-a-funding',
      title: 'Series A Funding Round - $50M Capital Raise',
      description: 'Secure Series A funding to accelerate growth and market expansion',
      impact: 'Enable aggressive scaling and competitive positioning',
      urgency: 'critical',
      category: 'financial',
      agents: ['Financial Intelligence Agent', 'Performance Analytics AI'],
      estimatedValue: '$50M capital infusion',
      timeline: '6 weeks',
      status: 'in-progress'
    },
    {
      id: 'market-expansion',
      title: 'Geographic Market Expansion Strategy',
      description: 'Optimize performance across all 430 planning areas and identify new markets',
      impact: 'Accelerate market penetration and revenue growth',
      urgency: 'high',
      category: 'strategic',
      agents: ['Regional Performance Monitor', 'Geographic Performance Marketing Agent', 'D2C Marketing Intelligence'],
      estimatedValue: '$25M annual revenue potential',
      timeline: '3 months',
      status: 'pending'
    },
    {
      id: 'board-governance',
      title: 'Board of Directors Strategic Alignment',
      description: 'Present capacity expansion strategy and secure board approval for aggressive scaling',
      impact: 'Governance approval for major strategic initiatives',
      urgency: 'high',
      category: 'strategic',
      agents: ['Financial Intelligence Agent', 'Performance Analytics AI'],
      estimatedValue: 'Strategic alignment',
      timeline: '1 week',
      status: 'pending'
    },
    {
      id: 'customer-retention',
      title: 'D2C Customer Retention Crisis Response',
      description: 'Address 250 daily D2C reschedules causing 125 cancellations and $31K daily loss',
      impact: 'Protect customer lifetime value and reduce churn',
      urgency: 'critical',
      category: 'operational',
      agents: ['CX Agent', 'Customer Communication Hub', 'D2C Marketing Intelligence'],
      estimatedValue: '$11.3M annual retention',
      timeline: '2 weeks',
      status: 'in-progress'
    },
    {
      id: 'technology-roadmap',
      title: 'AI Agent Enhancement & Platform Scaling',
      description: 'Review and enhance all 26 AI agents for improved performance and scalability',
      impact: 'Operational efficiency and automated decision-making',
      urgency: 'medium',
      category: 'strategic',
      agents: ['All 26 AI Agents'],
      estimatedValue: '$8.7M efficiency gains',
      timeline: '6 weeks',
      status: 'pending'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'capacity': return <Users className="h-4 w-4" />;
      case 'financial': return <DollarSign className="h-4 w-4" />;
      case 'strategic': return <Target className="h-4 w-4" />;
      case 'operational': return <BarChart3 className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleExecuteAction = (action: CEOAction) => {
    // Broadcast the CEO action to collaboration system
    sendActivityBroadcast({
      activityType: 'execute',
      targetEntity: 'CEO Action',
      targetId: action.id,
      description: `CEO executing: ${action.title}`,
      metadata: { 
        actionTitle: action.title,
        impact: action.impact,
        estimatedValue: action.estimatedValue,
        urgency: action.urgency,
        agents: action.agents,
        timestamp: new Date().toISOString()
      }
    });

    // Show immediate feedback to user
    alert(`✅ CEO Action Executed: ${action.title}\n\n📡 Broadcasting to all executives...\n💼 Impact: ${action.impact}\n💰 Value: ${action.estimatedValue}`);
  };

  const handleReviewAction = (action: CEOAction) => {
    sendActivityBroadcast({
      activityType: 'view',
      targetEntity: 'CEO Action Review',
      targetId: action.id,
      description: `CEO reviewing strategic action: ${action.title}`,
      metadata: { 
        actionTitle: action.title,
        category: action.category,
        status: action.status,
        timestamp: new Date().toISOString()
      }
    });
  };

  const handleStrategicDecision = (actionId: string, decision: string) => {
    const action = ceoActions.find(a => a.id === actionId);
    if (action) {
      sendActivityBroadcast({
        activityType: 'approve',
        targetEntity: 'Strategic Decision',
        targetId: actionId,
        description: `CEO strategic decision: ${decision} for ${action.title}`,
        metadata: { 
          decision,
          actionTitle: action.title,
          impact: action.impact,
          estimatedValue: action.estimatedValue,
          timestamp: new Date().toISOString()
        }
      });
    }
  };

  const filteredActions = selectedCategory === 'all' 
    ? ceoActions 
    : ceoActions.filter(action => action.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">CEO Action Center</h2>
          <p className="text-gray-400">Strategic actions and live collaboration broadcasting</p>
        </div>
        <Badge variant="outline" className="text-green-400 border-green-400">
          Live Collaboration Active
        </Badge>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-4">
        <span className="text-white font-medium">Category:</span>
        <div className="flex gap-2">
          {['all', 'capacity', 'financial', 'strategic', 'operational'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'All Actions' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Actions Grid */}
      <div className="space-y-4">
        {filteredActions.map((action) => (
          <Card key={action.id} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getCategoryIcon(action.category)}
                    <CardTitle className="text-lg text-white">{action.title}</CardTitle>
                    <Badge className={getUrgencyColor(action.urgency)}>
                      {action.urgency.toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(action.status)}
                      <span className="text-sm capitalize text-gray-400">{action.status}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Impact & Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-white mb-1">Business Impact</div>
                  <p className="text-sm text-green-400">{action.impact}</p>
                </div>
                <div>
                  <div className="text-sm font-medium text-white mb-1">Estimated Value</div>
                  <p className="text-sm text-blue-400">{action.estimatedValue}</p>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Agents & Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-white mb-2">Responsible Agents</div>
                  <div className="flex flex-wrap gap-1">
                    {action.agents.slice(0, 3).map((agent, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {agent}
                      </Badge>
                    ))}
                    {action.agents.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{action.agents.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white mb-1">Timeline</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{action.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  size="sm"
                  onClick={() => handleExecuteAction(action)}
                  className="bg-green-600 hover:bg-green-700 gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Execute Action
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReviewAction(action)}
                  className="gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Review Details
                </Button>

                {action.urgency === 'critical' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStrategicDecision(action.id, 'Priority Escalation')}
                    className="gap-2 text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Escalate Priority
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            CEO Action Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {ceoActions.filter(a => a.urgency === 'critical').length}
              </div>
              <div className="text-sm text-gray-400">Critical Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {ceoActions.filter(a => a.status === 'in-progress').length}
              </div>
              <div className="text-sm text-gray-400">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {ceoActions.filter(a => a.category === 'capacity').length}
              </div>
              <div className="text-sm text-gray-400">Capacity Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">$90M+</div>
              <div className="text-sm text-gray-400">Total Value Impact</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}