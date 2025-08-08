import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  MapPin,
  Users,
  Wrench,
  Shield,
  Activity,
  CheckCircle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  warningType: string;
  planningArea: string;
  initialConditions: string[];
  timeline: DemoEvent[];
  agentResponses: AgentResponse[];
  outcome: {
    revenueProtected: number;
    customerImpact: string;
    operationalEfficiency: string;
  };
}

interface DemoEvent {
  timestamp: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
  agentAction?: string;
  dataPoint?: string;
}

interface AgentResponse {
  agent: string;
  action: string;
  timing: string;
  result: string;
  effectiveness: number;
}

interface PredictiveWarningDemonstrationsProps {
  onNavigateBack: () => void;
}

export function PredictiveWarningDemonstrations({ onNavigateBack }: PredictiveWarningDemonstrationsProps) {
  const [activeDemo, setActiveDemo] = useState<string>('demo1');
  const [playbackPosition, setPlaybackPosition] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const demoScenarios: DemoScenario[] = [
    {
      id: 'demo1',
      title: 'Hurricane-Driven Emergency Surge',
      description: 'AI predicts 250% increase in emergency calls due to approaching storm system in Miami Metro area',
      warningType: 'weather_impact',
      planningArea: 'Miami Metro',
      initialConditions: [
        'Hurricane Category 2 forecasted to make landfall in 18 hours',
        'Current technician staffing: 45 available for emergency response',
        'Historical data shows 3x increase in electrical/HVAC emergency calls during storms',
        'Parts inventory at 85% capacity for emergency repair items'
      ],
      timeline: [
        {
          timestamp: '14:00',
          title: 'Predictive Warning Generated',
          description: 'AI detects weather pattern correlation with historical emergency surge data',
          severity: 'warning',
          agentAction: 'Regional Performance Monitor',
          dataPoint: '87% confidence of 250% demand increase'
        },
        {
          timestamp: '14:05',
          title: 'Emergency Response Coordinator Activated',
          description: 'Automatic pre-positioning of emergency response teams initiated',
          severity: 'info',
          agentAction: 'Emergency Response Coordinator',
          dataPoint: 'Deploying 15 additional technicians to high-risk zones'
        },
        {
          timestamp: '14:15',
          title: 'Parts Prediction Engine Response',
          description: 'Emergency parts shipment expedited from regional warehouse',
          severity: 'info',
          agentAction: 'Parts Prediction Engine',
          dataPoint: 'Emergency generator parts, electrical supplies pre-positioned'
        },
        {
          timestamp: '14:30',
          title: 'Customer Communication Activated',
          description: 'Proactive safety communications sent to 15,000 customers',
          severity: 'info',
          agentAction: 'Customer Communication Hub',
          dataPoint: 'Storm preparation tips, emergency contact info distributed'
        },
        {
          timestamp: '16:00',
          title: 'Technician Recruiting Response',
          description: 'Contractor network activated for emergency support',
          severity: 'info',
          agentAction: 'Technician Recruiting Agent',
          dataPoint: '12 contractor firms on standby, 8-hour response guarantee'
        },
        {
          timestamp: '18:00',
          title: 'Advanced Scheduling Optimization',
          description: 'Emergency routing protocols activated for storm response',
          severity: 'warning',
          agentAction: 'Advanced Scheduling Agent',
          dataPoint: 'Emergency-only scheduling, 2-hour response target'
        },
        {
          timestamp: '22:00',
          title: 'Storm Makes Landfall',
          description: 'Hurricane impact begins, emergency calls surge as predicted',
          severity: 'critical',
          dataPoint: 'Emergency calls increased 240% - within prediction range'
        },
        {
          timestamp: '06:00+1',
          title: 'Response Success Validated',
          description: 'Pre-positioned resources handle surge effectively',
          severity: 'success',
          dataPoint: '94% of emergency calls responded to within 4 hours'
        }
      ],
      agentResponses: [
        {
          agent: 'Emergency Response Coordinator',
          action: 'Pre-positioned 15 emergency technicians across flood-prone areas',
          timing: '18 hours before storm impact',
          result: '94% emergency response rate maintained vs 67% without prediction',
          effectiveness: 94
        },
        {
          agent: 'Parts Prediction Engine',
          action: 'Expedited emergency parts to local distribution points',
          timing: '16 hours before storm impact',
          result: 'Zero service delays due to parts shortage',
          effectiveness: 100
        },
        {
          agent: 'Customer Communication Hub',
          action: 'Sent proactive storm preparation communications',
          timing: '15 hours before storm impact',
          result: '23% reduction in preventable emergency calls',
          effectiveness: 89
        },
        {
          agent: 'Advanced Scheduling Agent',
          action: 'Switched to emergency-only scheduling protocols',
          timing: '8 hours before storm impact',
          result: 'Maintained 2-hour average response time during peak',
          effectiveness: 92
        }
      ],
      outcome: {
        revenueProtected: 425000,
        customerImpact: '94% of emergency calls resolved within 4 hours vs 67% historical average',
        operationalEfficiency: '23% reduction in overtime costs through proactive staffing'
      }
    },
    {
      id: 'demo2',
      title: 'Memorial Day Weekend Capacity Shortage',
      description: 'AI predicts technician shortage during holiday weekend with simultaneous high demand for AC services',
      warningType: 'capacity_shortage',
      planningArea: 'Phoenix Central',
      initialConditions: [
        'Memorial Day weekend approaching with forecasted 110°F+ temperatures',
        'Historical data shows 180% increase in HVAC emergency calls during holiday heat waves',
        '35% of technicians scheduled for vacation during holiday weekend',
        'Current staffing: 28 available technicians vs normal 45'
      ],
      timeline: [
        {
          timestamp: 'Wed 10:00',
          title: 'Capacity Warning Generated',
          description: 'AI identifies staffing gap vs predicted demand surge',
          severity: 'warning',
          agentAction: 'Regional Performance Monitor',
          dataPoint: '78% probability of 40+ hour service delays'
        },
        {
          timestamp: 'Wed 10:15',
          title: 'Technician Recruiting Activated',
          description: 'Emergency overtime incentives offered to available staff',
          severity: 'info',
          agentAction: 'Technician Recruiting Agent',
          dataPoint: '$150/day holiday premium, 8 technicians accept overtime'
        },
        {
          timestamp: 'Wed 11:00',
          title: 'Contractor Network Engagement',
          description: 'Local contractor firms contacted for holiday coverage',
          severity: 'info',
          agentAction: 'Technician Recruiting Agent',
          dataPoint: '5 contractor firms commit 12 certified HVAC technicians'
        },
        {
          timestamp: 'Wed 14:00',
          title: 'Advanced Scheduling Optimization',
          description: 'Holiday scheduling algorithm activated for efficiency',
          severity: 'info',
          agentAction: 'Advanced Scheduling Agent',
          dataPoint: 'Route optimization for 25% longer service windows'
        },
        {
          timestamp: 'Thu 09:00',
          title: 'Customer Communication Strategy',
          description: 'Proactive communication about holiday scheduling',
          severity: 'info',
          agentAction: 'Customer Communication Hub',
          dataPoint: 'Holiday service expectations set for 8,500 customers'
        },
        {
          timestamp: 'Fri 16:00',
          title: 'Parts Pre-Positioning',
          description: 'High-demand HVAC parts distributed to service vehicles',
          severity: 'info',
          agentAction: 'Parts Prediction Engine',
          dataPoint: 'Emergency HVAC parts loaded on 100% of active vehicles'
        },
        {
          timestamp: 'Sat 08:00',
          title: 'Holiday Weekend Begins',
          description: 'Temperature reaches 112°F, HVAC calls surge as predicted',
          severity: 'warning',
          dataPoint: 'HVAC emergency calls up 175% - within prediction range'
        },
        {
          timestamp: 'Tue 17:00',
          title: 'Holiday Response Success',
          description: 'Weekend handled with minimal service delays',
          severity: 'success',
          dataPoint: 'Average service delay: 6 hours vs predicted 40+ hours'
        }
      ],
      agentResponses: [
        {
          agent: 'Technician Recruiting Agent',
          action: 'Secured 8 overtime technicians + 12 contractor technicians',
          timing: '4 days before holiday weekend',
          result: 'Increased available workforce by 71% during critical period',
          effectiveness: 87
        },
        {
          agent: 'Advanced Scheduling Agent',
          action: 'Implemented holiday optimization with extended service windows',
          timing: '3 days before holiday weekend',
          result: 'Maintained 6-hour average response vs 40+ hour prediction',
          effectiveness: 91
        },
        {
          agent: 'Customer Communication Hub',
          action: 'Set realistic expectations for 8,500 customers proactively',
          timing: '2 days before holiday weekend',
          result: '34% reduction in customer complaints vs previous holiday',
          effectiveness: 85
        },
        {
          agent: 'Parts Prediction Engine',
          action: 'Pre-positioned critical HVAC parts on all service vehicles',
          timing: '1 day before holiday weekend',
          result: 'Zero service delays due to parts availability issues',
          effectiveness: 98
        }
      ],
      outcome: {
        revenueProtected: 290000,
        customerImpact: '6-hour average response time vs 40+ hour predicted delays',
        operationalEfficiency: '71% workforce increase through proactive recruiting'
      }
    },
    {
      id: 'demo3',
      title: 'Supply Chain Parts Delay Crisis',
      description: 'AI predicts critical HVAC parts shortage due to supplier disruption affecting 200+ pending jobs',
      warningType: 'parts_delay',
      planningArea: 'Dallas Fort Worth',
      initialConditions: [
        'Major HVAC parts supplier reports 2-week manufacturing delay',
        '247 scheduled HVAC installations requiring affected parts',
        'Current inventory: 3 days supply of critical compressor units',
        'Alternative suppliers typically require 5-7 days delivery time'
      ],
      timeline: [
        {
          timestamp: 'Mon 08:00',
          title: 'Parts Delay Warning Generated',
          description: 'AI correlates supplier alert with scheduled job requirements',
          severity: 'critical',
          agentAction: 'Parts Prediction Engine',
          dataPoint: '95% confidence of service disruption for 247 jobs'
        },
        {
          timestamp: 'Mon 08:10',
          title: 'Emergency Parts Sourcing Initiated',
          description: 'Automatic alternative supplier contact system activated',
          severity: 'warning',
          agentAction: 'Parts Ordering Specialist',
          dataPoint: 'Contacting 8 alternative suppliers for expedited delivery'
        },
        {
          timestamp: 'Mon 09:30',
          title: 'Regional Inventory Redistribution',
          description: 'Parts moved from lower-demand regions to Dallas area',
          severity: 'info',
          agentAction: 'Parts Prediction Engine',
          dataPoint: '45 compressor units transferred from Austin, Houston'
        },
        {
          timestamp: 'Mon 11:00',
          title: 'Customer Communication Strategy',
          description: 'Proactive communication to affected customers initiated',
          severity: 'info',
          agentAction: 'Customer Communication Hub',
          dataPoint: 'Transparent updates sent to 247 customers with options'
        },
        {
          timestamp: 'Mon 14:00',
          title: 'Alternative Parts Secured',
          description: 'Emergency supplier delivers compatible units overnight',
          severity: 'info',
          agentAction: 'Parts Ordering Specialist',
          dataPoint: '180 compatible units secured for 2-day delivery'
        },
        {
          timestamp: 'Tue 06:00',
          title: 'Advanced Scheduling Optimization',
          description: 'Job scheduling reordered based on parts availability',
          severity: 'info',
          agentAction: 'Advanced Scheduling Agent',
          dataPoint: 'Jobs with available parts prioritized, others rescheduled'
        },
        {
          timestamp: 'Wed 10:00',
          title: 'Emergency Parts Arrive',
          description: 'Alternative supplier delivers as promised',
          severity: 'success',
          agentAction: 'Parts Ordering Specialist',
          dataPoint: '180 units received, distributed to technician vehicles'
        },
        {
          timestamp: 'Fri 17:00',
          title: 'Crisis Resolution Complete',
          description: 'All affected jobs completed with minimal delay',
          severity: 'success',
          dataPoint: 'Average delay: 2.3 days vs predicted 14 days'
        }
      ],
      agentResponses: [
        {
          agent: 'Parts Ordering Specialist',
          action: 'Secured alternative supplier with 180 emergency units',
          timing: 'Within 6 hours of warning',
          result: '73% of affected jobs completed within 3 days vs 14-day delay',
          effectiveness: 95
        },
        {
          agent: 'Parts Prediction Engine',
          action: 'Redistributed 45 units from other regions immediately',
          timing: 'Within 90 minutes of warning',
          result: '18% of jobs completed without any delay',
          effectiveness: 92
        },
        {
          agent: 'Customer Communication Hub',
          action: 'Transparent communication with 247 affected customers',
          timing: 'Within 3 hours of warning',
          result: '89% customer satisfaction despite delays',
          effectiveness: 89
        },
        {
          agent: 'Advanced Scheduling Agent',
          action: 'Optimized job sequence based on parts availability',
          timing: 'Continuous optimization over 4 days',
          result: 'Minimized customer impact through smart rescheduling',
          effectiveness: 88
        }
      ],
      outcome: {
        revenueProtected: 850000,
        customerImpact: '2.3-day average delay vs 14-day predicted disruption',
        operationalEfficiency: '89% customer satisfaction maintained despite supply crisis'
      }
    }
  ];

  const currentDemo = demoScenarios.find(d => d.id === activeDemo) || demoScenarios[0];
  const currentEvent = currentDemo.timeline[Math.min(playbackPosition, currentDemo.timeline.length - 1)];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && playbackPosition < currentDemo.timeline.length - 1) {
      interval = setInterval(() => {
        setPlaybackPosition(prev => prev + 1);
      }, 2000);
    } else if (playbackPosition >= currentDemo.timeline.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackPosition, currentDemo.timeline.length]);

  const handlePlay = () => {
    if (playbackPosition >= currentDemo.timeline.length - 1) {
      setPlaybackPosition(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setPlaybackPosition(0);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warning': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'success': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getProgressColor = (effectiveness: number) => {
    if (effectiveness >= 90) return 'bg-green-500';
    if (effectiveness >= 80) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onNavigateBack}>
            ← Back to Predictive Warnings
          </Button>
          <Play className="h-8 w-8 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold">Predictive Warning System Demonstrations</h1>
            <p className="text-gray-600">
              Interactive scenarios showing real-world AI-powered early warning interventions
            </p>
          </div>
        </div>
      </div>

      {/* Demo Selection */}
      <Tabs value={activeDemo} onValueChange={setActiveDemo}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demo1">Hurricane Response</TabsTrigger>
          <TabsTrigger value="demo2">Holiday Capacity</TabsTrigger>
          <TabsTrigger value="demo3">Supply Chain Crisis</TabsTrigger>
        </TabsList>

        <TabsContent value={activeDemo} className="space-y-6">
          {/* Scenario Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{currentDemo.title}</CardTitle>
                  <p className="text-gray-400 mt-2">{currentDemo.description}</p>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400">
                  {currentDemo.planningArea}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Initial Conditions</h4>
                  <ul className="space-y-2">
                    {currentDemo.initialConditions.map((condition, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-start">
                        <span className="mr-2 text-blue-400">•</span>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Expected Outcome</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-green-400">
                      <strong>Revenue Protected:</strong> {formatCurrency(currentDemo.outcome.revenueProtected)}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Customer Impact:</strong> {currentDemo.outcome.customerImpact}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Efficiency:</strong> {currentDemo.outcome.operationalEfficiency}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Playback Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Timeline Playback</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Button onClick={handlePlay} variant="outline" size="sm">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button onClick={handleReset} variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
                <div className="flex-1">
                  <Progress 
                    value={(playbackPosition / Math.max(1, currentDemo.timeline.length - 1)) * 100} 
                    className="w-full"
                  />
                </div>
                <span className="text-sm text-gray-400">
                  {playbackPosition + 1} / {currentDemo.timeline.length}
                </span>
              </div>

              {/* Current Event Display */}
              <Alert className={getSeverityColor(currentEvent.severity)}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <strong>{currentEvent.timestamp} - {currentEvent.title}</strong>
                      {currentEvent.agentAction && (
                        <Badge variant="outline" className="text-xs">
                          {currentEvent.agentAction}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{currentEvent.description}</p>
                    {currentEvent.dataPoint && (
                      <p className="text-xs font-mono bg-black/20 p-2 rounded">
                        📊 {currentEvent.dataPoint}
                      </p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Agent Response Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>AI Agent Response Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentDemo.agentResponses.map((response, index) => (
                  <div key={index} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{response.agent}</h4>
                      <Badge className={getSeverityColor('success')}>
                        {response.effectiveness}% effective
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">
                        <strong>Action:</strong> {response.action}
                      </p>
                      <p className="text-sm text-gray-300">
                        <strong>Timing:</strong> {response.timing}
                      </p>
                      <p className="text-sm text-gray-300">
                        <strong>Result:</strong> {response.result}
                      </p>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Effectiveness</span>
                          <span>{response.effectiveness}%</span>
                        </div>
                        <Progress 
                          value={response.effectiveness} 
                          className={`h-2 ${getProgressColor(response.effectiveness)}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Full Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Complete Event Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentDemo.timeline.map((event, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                      index <= playbackPosition 
                        ? 'border-blue-500/30 bg-blue-500/5' 
                        : 'border-gray-700 opacity-40'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-1 ${
                      index <= playbackPosition ? 'bg-blue-500' : 'bg-gray-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{event.timestamp} - {event.title}</h4>
                        <div className="flex items-center space-x-2">
                          {event.agentAction && (
                            <Badge variant="outline" className="text-xs">
                              {event.agentAction}
                            </Badge>
                          )}
                          <Badge className={getSeverityColor(event.severity)}>
                            {event.severity}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">{event.description}</p>
                      {event.dataPoint && (
                        <p className="text-xs font-mono bg-black/20 p-2 rounded mt-2">
                          📊 {event.dataPoint}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}