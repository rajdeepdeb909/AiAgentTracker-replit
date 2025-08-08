import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Users, Clock, Activity, Bot, Search, Filter, Eye, Plus, ArrowRight } from 'lucide-react';

// Generate realistic team members across departments
const TEAM_MEMBERS = [
  // Recruitment Team
  { id: 1, name: 'Sarah Chen', role: 'Senior Recruitment Manager', department: 'Recruitment', planningArea: 'TX Metro Region', status: 'active' },
  { id: 2, name: 'Marcus Rodriguez', role: 'Field Recruitment Specialist', department: 'Recruitment', planningArea: 'CA Metro Region', status: 'active' },
  { id: 3, name: 'Jennifer Walsh', role: 'Partnership Development Lead', department: 'Recruitment', planningArea: 'FL Metro Region', status: 'active' },
  { id: 4, name: 'David Kim', role: 'Trade Show Coordinator', department: 'Recruitment', planningArea: 'NY Metro Region', status: 'active' },
  
  // Operations Team
  { id: 5, name: 'Amanda Thompson', role: 'Operations Manager', department: 'Operations', planningArea: 'IL Metro Region', status: 'active' },
  { id: 6, name: 'Robert Zhang', role: 'Quality Assurance Lead', department: 'Operations', planningArea: 'PA Metro Region', status: 'active' },
  { id: 7, name: 'Lisa Park', role: 'Scheduling Coordinator', department: 'Operations', planningArea: 'OH Metro Region', status: 'active' },
  
  // Analytics Team
  { id: 8, name: 'Michael Davis', role: 'Performance Analytics Manager', department: 'Analytics', planningArea: 'GA Metro Region', status: 'active' },
  { id: 9, name: 'Emily Johnson', role: 'Data Intelligence Specialist', department: 'Analytics', planningArea: 'NC Metro Region', status: 'active' },
  
  // Training Team
  { id: 10, name: 'Chris Martinez', role: 'Training & Development Lead', department: 'Training', planningArea: 'MI Metro Region', status: 'active' }
];

const AI_AGENTS = [
  'Technician Recruiting Agent', 'Partnership Development Agent', 'Skills Assessment AI', 'Background Verification Agent',
  'Onboarding Automation Agent', 'Contract Intelligence Agent', 'Equipment Management Agent', 'Training Delivery Agent',
  'Performance Analytics Agent', 'Follow-up Coordination Agent', 'Network Expansion Agent', 'Certification Tracking Agent',
  'Competitive Intelligence Agent', 'Community Engagement Agent', 'Social Media Recruitment Agent', 'Retention Strategy Agent'
];

const ACTIVITY_TYPES = [
  'contractor_outreach', 'interview_coordination', 'skills_assessment', 'background_verification', 'contract_negotiation',
  'equipment_setup', 'training_delivery', 'performance_review', 'follow_up_coordination', 'partnership_development',
  'trade_show_planning', 'community_engagement', 'social_media_campaign', 'competitive_analysis', 'retention_program'
];

export default function PersonWorkTracker() {
  const [activeTab, setActiveTab] = useState('individual');
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showActivityDetails, setShowActivityDetails] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  // Generate realistic current work items for each person
  const generatePersonWork = (personId: number) => {
    const person = TEAM_MEMBERS.find(p => p.id === personId);
    if (!person) return [];

    const workItems = [];
    const baseActivities = Math.floor(Math.random() * 5) + 3; // 3-7 active work items

    for (let i = 0; i < baseActivities; i++) {
      const activityType = ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)];
      const assignedAgent = AI_AGENTS[Math.floor(Math.random() * AI_AGENTS.length)];
      
      workItems.push({
        id: `${personId}-${i}`,
        title: getWorkItemTitle(activityType, person.role),
        activityType,
        assignedAgent,
        status: ['in_progress', 'pending_review', 'waiting_response', 'completed'][Math.floor(Math.random() * 4)],
        priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        startTime: new Date(Date.now() - Math.random() * 8 * 60 * 60 * 1000), // Started within last 8 hours
        estimatedCompletion: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000), // Complete within 24 hours
        contractorsInvolved: Math.floor(Math.random() * 8) + 1,
        planningArea: person.planningArea,
        description: getWorkItemDescription(activityType, person.role),
        aiAgentActions: generateAgentActions(assignedAgent, activityType)
      });
    }

    return workItems;
  };

  const getWorkItemTitle = (activityType: string, role: string): string => {
    const titles = {
      'contractor_outreach': [
        'LinkedIn outreach campaign to certified HVAC technicians',
        'Direct email campaign to independent contractors',
        'Phone outreach to qualified plumbing contractors',
        'Referral network activation for electrical technicians'
      ],
      'interview_coordination': [
        'Schedule group interviews for Dallas Metro contractors',
        'Coordinate video interviews with California candidates',
        'Arrange skills assessment sessions for Florida applicants',
        'Set up panel interviews for New York technicians'
      ],
      'skills_assessment': [
        'Conduct HVAC certification verification for 5 candidates',
        'Evaluate electrical troubleshooting skills for contractors',
        'Review plumbing expertise for Chicago Metro applicants',
        'Assess multi-trade capabilities for Boston candidates'
      ],
      'partnership_development': [
        'Negotiate partnership with Regional Contractors Association',
        'Develop relationship with Local Trade School network',
        'Establish connection with Equipment Supplier partners',
        'Create alliance with Industry Certification Board'
      ]
    };

    const typeList = (titles as any)[activityType] || [`${activityType.replace('_', ' ')} coordination for planning area`];
    return typeList[Math.floor(Math.random() * typeList.length)];
  };

  const getWorkItemDescription = (activityType: string, role: string): string => {
    return `Currently executing ${activityType.replace('_', ' ')} activities as ${role}. Working with AI agents to optimize process efficiency and candidate quality.`;
  };

  const generateAgentActions = (agentName: string, activityType: string) => {
    const actions = [];
    const actionCount = Math.floor(Math.random() * 6) + 3; // 3-8 actions

    for (let i = 0; i < actionCount; i++) {
      actions.push({
        id: `action-${i}`,
        timestamp: new Date(Date.now() - Math.random() * 4 * 60 * 60 * 1000), // Within last 4 hours
        action: getAgentAction(agentName, activityType, i),
        status: i === 0 ? 'active' : 'completed',
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
        nextAction: i === 0 ? getNextAgentAction(agentName, activityType) : null
      });
    }

    return actions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const getAgentAction = (agentName: string, activityType: string, index: number): string => {
    const agentActions = {
      'Technician Recruiting Agent': [
        'Analyzed LinkedIn profiles of 47 certified technicians',
        'Identified 12 high-potential candidates in target planning area',
        'Generated personalized outreach messages for top candidates',
        'Scheduled follow-up sequences for interested contractors',
        'Updated candidate scoring based on response patterns'
      ],
      'Partnership Development Agent': [
        'Researched 23 potential industry partnerships',
        'Initiated contact with Regional Contractors Association',
        'Drafted partnership proposal with value proposition analysis',
        'Scheduled discovery calls with association leadership',
        'Created partnership pipeline tracking system'
      ],
      'Skills Assessment AI': [
        'Evaluated technical certifications for 8 candidates',
        'Analyzed skill gap patterns across planning areas',
        'Generated competency reports for hiring managers',
        'Recommended additional training for borderline candidates',
        'Updated skills assessment criteria based on market trends'
      ]
    };

    const actions = (agentActions as any)[agentName] || [
      'Processed candidate data and generated insights',
      'Optimized workflow efficiency for assigned tasks',
      'Coordinated with other AI agents for seamless execution',
      'Generated performance metrics and success indicators',
      'Updated knowledge base with latest market information'
    ];

    return actions[index % actions.length];
  };

  const getNextAgentAction = (agentName: string, activityType: string): string => {
    return `Continue ${activityType.replace('_', ' ')} optimization and prepare status update for human coordinator`;
  };

  // Generate AI agent activity feed
  const generateAgentActivityFeed = () => {
    const activities = [];
    const totalActivities = 50;

    for (let i = 0; i < totalActivities; i++) {
      const agent = AI_AGENTS[Math.floor(Math.random() * AI_AGENTS.length)];
      const person = TEAM_MEMBERS[Math.floor(Math.random() * TEAM_MEMBERS.length)];
      const activityType = ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)];
      
      activities.push({
        id: `feed-${i}`,
        timestamp: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000), // Within last 12 hours
        agentName: agent,
        personName: person.name,
        activityType,
        action: getAgentAction(agent, activityType, Math.floor(Math.random() * 5)),
        status: ['completed', 'active', 'pending'][Math.floor(Math.random() * 3)],
        planningArea: person.planningArea,
        impact: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        contractorsAffected: Math.floor(Math.random() * 15) + 1
      });
    }

    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const filteredMembers = TEAM_MEMBERS.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const agentActivityFeed = generateAgentActivityFeed();

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Individual Work Tracking & AI Agent Activity Feed</h1>
          <p className="text-gray-400">Monitor what each person is working on and trace AI agent activities with timestamps</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="individual" className="text-white">Individual Work</TabsTrigger>
            <TabsTrigger value="ai-activity" className="text-white">AI Agent Feed</TabsTrigger>
            <TabsTrigger value="overview" className="text-white">Team Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Team Members List */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Team Members ({filteredMembers.length})
                    </CardTitle>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            placeholder="Search team members..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      
                      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                        <SelectTrigger className="bg-gray-700 border-gray-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="all" className="text-white">All Departments</SelectItem>
                          <SelectItem value="Recruitment" className="text-white">Recruitment</SelectItem>
                          <SelectItem value="Operations" className="text-white">Operations</SelectItem>
                          <SelectItem value="Analytics" className="text-white">Analytics</SelectItem>
                          <SelectItem value="Training" className="text-white">Training</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredMembers.map((member) => (
                        <div
                          key={member.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedPerson === member.id
                              ? 'bg-blue-900/20 border-blue-500'
                              : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                          }`}
                          onClick={() => setSelectedPerson(member.id)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-medium">{member.name}</h4>
                            <Badge className={
                              member.department === 'Recruitment' ? 'bg-green-600' :
                              member.department === 'Operations' ? 'bg-blue-600' :
                              member.department === 'Analytics' ? 'bg-purple-600' :
                              'bg-orange-600'
                            }>
                              {member.department}
                            </Badge>
                          </div>
                          <p className="text-gray-400 text-sm">{member.role}</p>
                          <p className="text-gray-500 text-xs mt-1">{member.planningArea}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Individual Work Details */}
              <div className="lg:col-span-2">
                {selectedPerson ? (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">
                        {TEAM_MEMBERS.find(m => m.id === selectedPerson)?.name} - Current Work
                      </CardTitle>
                      <p className="text-gray-400">
                        {TEAM_MEMBERS.find(m => m.id === selectedPerson)?.role} • {TEAM_MEMBERS.find(m => m.id === selectedPerson)?.planningArea}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {generatePersonWork(selectedPerson).map((workItem) => (
                          <div key={workItem.id} className="bg-gray-700 rounded-lg p-4 border-l-4 border-blue-500">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="text-white font-medium mb-1">{workItem.title}</h4>
                                <p className="text-gray-400 text-sm mb-2">{workItem.description}</p>
                                
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge className={
                                    workItem.priority === 'high' ? 'bg-red-600' :
                                    workItem.priority === 'medium' ? 'bg-yellow-600' :
                                    'bg-green-600'
                                  }>
                                    {workItem.priority} priority
                                  </Badge>
                                  <Badge className={
                                    workItem.status === 'completed' ? 'bg-green-600' :
                                    workItem.status === 'in_progress' ? 'bg-blue-600' :
                                    'bg-gray-600'
                                  }>
                                    {workItem.status.replace('_', ' ')}
                                  </Badge>
                                  <Badge className="bg-indigo-600">
                                    <Bot className="w-3 h-3 mr-1" />
                                    {workItem.assignedAgent}
                                  </Badge>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-400">Started:</span>
                                    <p className="text-white">{formatTimeAgo(workItem.startTime)}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Est. Complete:</span>
                                    <p className="text-white">{formatTimeAgo(workItem.estimatedCompletion)}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Contractors:</span>
                                    <p className="text-white">{workItem.contractorsInvolved}</p>
                                  </div>
                                  <div>
                                    <Button
                                      size="sm"
                                      className="bg-purple-600 hover:bg-purple-700"
                                      onClick={() => {
                                        setSelectedActivity(workItem);
                                        setShowActivityDetails(true);
                                      }}
                                    >
                                      <Eye className="w-3 h-3 mr-1" />
                                      AI Trace
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-white text-lg font-medium mb-2">Select a Team Member</h3>
                      <p className="text-gray-400">Choose a team member from the list to see their current work and AI agent activities</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-activity" className="mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  AI Agent Activity Feed - Live Trace
                </CardTitle>
                <p className="text-gray-400">Real-time activity trace showing all AI agent actions with timestamps</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {agentActivityFeed.map((activity) => (
                    <div key={activity.id} className="bg-gray-700 rounded-lg p-4 border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-indigo-600">
                              <Bot className="w-3 h-3 mr-1" />
                              {activity.agentName}
                            </Badge>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <Badge className="bg-blue-600">{activity.personName}</Badge>
                            <Badge className={
                              activity.status === 'completed' ? 'bg-green-600' :
                              activity.status === 'active' ? 'bg-yellow-600' :
                              'bg-gray-600'
                            }>
                              {activity.status}
                            </Badge>
                          </div>
                          
                          <p className="text-white font-medium mb-1">{activity.action}</p>
                          <p className="text-gray-400 text-sm mb-2">
                            Activity: {activity.activityType.replace('_', ' ')} • Area: {activity.planningArea}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-400">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {formatTimeAgo(activity.timestamp)}
                            </span>
                            <span className="text-gray-400">
                              Impact: <span className={
                                activity.impact === 'high' ? 'text-red-400' :
                                activity.impact === 'medium' ? 'text-yellow-400' :
                                'text-green-400'
                              }>{activity.impact}</span>
                            </span>
                            <span className="text-gray-400">
                              Contractors: {activity.contractorsAffected}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{TEAM_MEMBERS.length}</div>
                    <div className="text-gray-400 text-sm">Active Team Members</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{AI_AGENTS.length}</div>
                    <div className="text-gray-400 text-sm">AI Agents Active</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {agentActivityFeed.filter(a => a.status === 'active').length}
                    </div>
                    <div className="text-gray-400 text-sm">Active AI Actions</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">
                      {agentActivityFeed.filter(a => a.timestamp > new Date(Date.now() - 60 * 60 * 1000)).length}
                    </div>
                    <div className="text-gray-400 text-sm">Actions Last Hour</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Department Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Recruitment', 'Operations', 'Analytics', 'Training'].map((dept) => {
                    const deptMembers = TEAM_MEMBERS.filter(m => m.department === dept);
                    const deptActivities = agentActivityFeed.filter(a => 
                      deptMembers.some(m => m.name === a.personName)
                    );
                    
                    return (
                      <div key={dept} className="bg-gray-700 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-3">{dept} Department</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Team Members:</span>
                            <span className="text-white">{deptMembers.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">AI Activities Today:</span>
                            <span className="text-white">{deptActivities.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Active Now:</span>
                            <span className="text-green-400">
                              {deptActivities.filter(a => a.status === 'active').length}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Activity Details Modal */}
        <Dialog open={showActivityDetails} onOpenChange={setShowActivityDetails}>
          <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">AI Agent Activity Trace</DialogTitle>
              <DialogDescription className="text-gray-400">
                Detailed timeline of AI agent actions for this work item
              </DialogDescription>
            </DialogHeader>
            {selectedActivity && (
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">{selectedActivity.title}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-indigo-600">
                      <Bot className="w-3 h-3 mr-1" />
                      {selectedActivity.assignedAgent}
                    </Badge>
                    <Badge className="bg-blue-600">{selectedActivity.planningArea}</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-white font-medium">Agent Action Timeline</h5>
                  {selectedActivity.aiAgentActions?.map((action: any) => (
                    <div key={action.id} className="bg-gray-700 rounded-lg p-4 border-l-4 border-purple-500">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={
                              action.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                            }>
                              {action.status}
                            </Badge>
                            <span className="text-gray-400 text-sm">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {formatTimeAgo(action.timestamp)}
                            </span>
                            <Badge className="bg-purple-600">
                              {action.confidence}% confidence
                            </Badge>
                          </div>
                          
                          <p className="text-white font-medium mb-1">{action.action}</p>
                          {action.nextAction && (
                            <p className="text-gray-400 text-sm">
                              Next: {action.nextAction}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setShowActivityDetails(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}