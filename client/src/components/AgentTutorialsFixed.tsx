import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  ArrowRight, 
  Play, 
  Users, 
  Calendar, 
  Phone, 
  Package, 
  ShieldCheck, 
  TrendingUp, 
  MessageSquare,
  Eye
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

// Novice Level Demonstrations - Basic Operations with Simple Processes
function getNoviceLevelDemo(agentName: string): JSX.Element {
  const demos: { [key: string]: JSX.Element } = {
    "Advanced Scheduling Agent": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Single appointment scheduling with basic conflict detection. Agent handles one request at a time with standard business rules.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Step-by-step Process:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>1. Receives service request for water heater repair at 123 Oak Street</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>2. Checks technician availability using simple calendar lookup</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>3. Finds available slot: Thursday 2:00-4:00 PM with Tech #127</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>4. Books appointment and sends basic confirmation to customer</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>5. Updates technician schedule with new appointment details</span>
          </div>
        </div>
      </div>
    ),
    "Customer Communication Hub": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Single-channel customer service handling basic inquiries with template responses and standard procedures.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Step-by-step Process:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>1. Customer calls asking about appointment status</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>2. Looks up appointment using phone number in database</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>3. Reads appointment details: Thursday 2-4 PM with Tech #127</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>4. Provides standard confirmation and technician contact info</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>5. Documents call with basic notes in customer record</span>
          </div>
        </div>
      </div>
    ),
    "Parts Prediction Engine": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Basic parts ordering based on technician requests with standard inventory rules and simple approval process.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Step-by-step Process:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>1. Technician requests water heater thermostat via mobile app</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>2. Checks inventory: 3 units available in local warehouse</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>3. Verifies part compatibility with water heater make/model</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>4. Approves order and schedules delivery to job site</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>5. Sends delivery confirmation to technician and updates inventory</span>
          </div>
        </div>
      </div>
    )
  };
  
  return demos[agentName] || (
    <div>
      <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Basic agent operation with simple task execution, standard procedures, and single-step processes.</p>
      <div className="space-y-2">
        <h5 className="text-white font-medium">Step-by-step Process:</h5>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
          <span>1. Receives simple request following standard protocol</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
          <span>2. Processes request using basic business rules</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
          <span>3. Executes single action based on request type</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
          <span>4. Provides basic confirmation and status update</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
          <span>5. Documents action in system with standard fields</span>
        </div>
      </div>
    </div>
  );
}

// Intermediate Level Demonstrations - Coordinated Operations with Cross-Agent Communication
function getIntermediateLevelDemo(agentName: string): JSX.Element {
  const demos: { [key: string]: JSX.Element } = {
    "Advanced Scheduling Agent": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Emergency rescheduling with 3-agent coordination. Morning burst pipe creates cascading schedule changes across 8 appointments while maintaining customer satisfaction.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Cross-Agent Coordination Process:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>1. Receives emergency request: burst pipe flooding basement</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>2. Coordinates with Customer Communication Hub to contact 8 affected customers</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>3. Works with Parts Prediction Engine to prepare emergency repair kit</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>4. Reschedules appointments with 15-minute buffer times and customer approval</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>5. Dispatches senior technician immediately with estimated 45-minute arrival</span>
          </div>
        </div>
      </div>
    ),
    "Customer Communication Hub": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Multi-channel complaint resolution coordinating with 4 agents. Social media complaint escalates to service recovery involving scheduling, parts, and billing coordination.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Cross-Agent Coordination Process:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>1. Detects negative Facebook review about incomplete repair</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>2. Coordinates with Advanced Scheduling Agent for priority return visit</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>3. Works with Parts Prediction Engine to pre-order missing components</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>4. Alerts Quality Assurance Inspector for service quality review</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>5. Proactively responds on social media with resolution timeline</span>
          </div>
        </div>
      </div>
    ),
    "Parts Prediction Engine": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Predictive ordering with historical analysis. HVAC maintenance season approaching, coordinates with 3 agents to pre-position inventory based on 500+ job patterns.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Cross-Agent Coordination Process:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>1. Analyzes 500+ similar HVAC jobs from previous summers</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>2. Coordinates with Advanced Scheduling Agent on upcoming maintenance bookings</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>3. Works with Inventory Management to optimize warehouse placement</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>4. Alerts Performance Analytics AI about forecasted demand patterns</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
            <span>5. Pre-orders 75 air filters, 40 capacitors based on predictive model</span>
          </div>
        </div>
      </div>
    )
  };
  
  return demos[agentName] || (
    <div>
      <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Multi-agent coordination handling complex scenarios with cross-communication, shared decision making, and collaborative problem-solving.</p>
      <div className="space-y-2">
        <h5 className="text-white font-medium">Cross-Agent Coordination Process:</h5>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
          <span>1. Initiates cross-agent communication for complex task</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
          <span>2. Coordinates with 2-3 related agents for optimal solution</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
          <span>3. Negotiates shared resources and timeline coordination</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
          <span>4. Executes coordinated actions with real-time status sharing</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
          <span>5. Validates results across all participating agents</span>
        </div>
      </div>
    </div>
  );
}

// Advanced Level Demonstrations - Complex Multi-Agent Orchestration with Machine Learning
function getAdvancedLevelDemo(agentName: string): JSX.Element {
  const demos: { [key: string]: JSX.Element } = {
    "Advanced Scheduling Agent": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Storm damage crisis with 47 concurrent emergencies. ML-driven triage and resource allocation across 6 agents, processing 200+ variables for optimal outcomes.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Complex Multi-Agent Orchestration:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>1. ML model processes 200+ variables: severity, location, resources, weather forecast</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>2. Orchestrates 6 agents: Communication, Parts, Quality, Emergency, Analytics, Technician</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>3. Creates dynamic priority matrix: life safety {'>'} property damage {'>'} convenience</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>4. Deploys 23 technicians using AI route optimization saving 4.2 hours total</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>5. Continuously re-optimizes based on completion data and emerging priorities</span>
          </div>
        </div>
      </div>
    ),
    "Customer Communication Hub": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Multi-language crisis communication managing 89 simultaneous interactions across 7 channels while orchestrating service recovery with 5 specialized agents.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Complex Multi-Agent Orchestration:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>1. Processes 89 simultaneous conversations: phone, chat, email, social (3 languages)</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>2. ML sentiment analysis identifies 12 high-risk escalation cases</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>3. Orchestrates specialized recovery: Emergency Coordinator, Quality Inspector, Scheduling</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>4. Proactively creates personalized resolution plans with timeline commitments</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>5. Tracks resolution success: 94% satisfaction recovery, 8% escalation prevention</span>
          </div>
        </div>
      </div>
    ),
    "Parts Prediction Engine": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Predictive supply chain orchestration analyzing 15,000+ historical patterns to coordinate 4 specialized agents in preventing $125K inventory shortage.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Complex Multi-Agent Orchestration:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>1. ML analysis of 15,000+ jobs predicts 67% spike in compressor failures</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>2. Orchestrates 4 agents: Inventory, Scheduling, Quality, Performance Analytics</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>3. Negotiates emergency supplier agreements for 200+ critical parts</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>4. Pre-positions inventory across 12 planning areas based on risk assessment</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>5. Prevents $125K shortage crisis with 94.2% accuracy rate</span>
          </div>
        </div>
      </div>
    )
  };
  
  return demos[agentName] || (
    <div>
      <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Complex multi-agent orchestration using machine learning to coordinate 4-6 specialized agents in solving enterprise-level challenges.</p>
      <div className="space-y-2">
        <h5 className="text-white font-medium">Complex Multi-Agent Orchestration:</h5>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
          <span>1. ML-driven analysis of complex multi-variable scenarios</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
          <span>2. Orchestrates 4-6 specialized agents for comprehensive solution</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
          <span>3. Creates predictive models and risk assessment frameworks</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
          <span>4. Executes coordinated intervention with continuous optimization</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
          <span>5. Measures outcomes and updates predictive capabilities</span>
        </div>
      </div>
    </div>
  );
}

// Expert Level Demonstrations - Autonomous Enterprise Intelligence with Self-Learning Systems
function getExpertLevelDemo(agentName: string): JSX.Element {
  const demos: { [key: string]: JSX.Element } = {
    "Advanced Scheduling Agent": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Autonomous national optimization across 430 planning areas. Self-learning system orchestrates 26 agents to prevent $2.1M revenue loss through predictive intervention and autonomous decision-making.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Autonomous Enterprise Intelligence:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>1. Autonomous pattern recognition identifies capacity crisis 14 days in advance</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>2. Self-learning system orchestrates all 26 agents for coordinated response</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>3. Automatically negotiates contractor partnerships and resource allocation</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>4. Prevents $2.1M revenue loss through predictive capacity scaling</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>5. Continuously evolves prediction models achieving 97.3% accuracy</span>
          </div>
        </div>
      </div>
    ),
    "Customer Communication Hub": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Autonomous customer experience orchestration managing 2,000+ daily interactions while self-optimizing satisfaction algorithms and preventing churn through predictive intervention.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Autonomous Enterprise Intelligence:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>1. Autonomous management of 2,000+ daily interactions across all channels</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>2. Self-learning satisfaction algorithms identify churn risk 30 days early</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>3. Orchestrates personalized retention campaigns across agent network</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>4. Autonomously prevents 847 customer cancellations worth $1.2M annually</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>5. Evolves communication strategies achieving 96.8% satisfaction rate</span>
          </div>
        </div>
      </div>
    ),
    "Parts Prediction Engine": (
      <div>
        <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Autonomous supply chain intelligence managing $15M inventory across 430 areas, self-optimizing prediction models and preventing disruptions through autonomous vendor partnerships.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Autonomous Enterprise Intelligence:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>1. Autonomous management of $15M inventory across 430 planning areas</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>2. Self-learning prediction models achieve 98.7% accuracy on 50,000+ orders</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>3. Autonomously negotiates supplier contracts and emergency partnerships</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>4. Prevents supply disruptions saving $3.2M annually through predictive ordering</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
            <span>5. Continuously evolves supply chain optimization reducing costs by 23%</span>
          </div>
        </div>
      </div>
    )
  };
  
  return demos[agentName] || (
    <div>
      <p className="text-gray-300 mb-4"><strong>Real Example:</strong> Autonomous enterprise intelligence with self-learning capabilities, managing complex systems independently while continuously improving performance.</p>
      <div className="space-y-2">
        <h5 className="text-white font-medium">Autonomous Enterprise Intelligence:</h5>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
          <span>1. Autonomous operation with minimal human oversight required</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
          <span>2. Self-learning systems continuously improve without programming updates</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
          <span>3. Orchestrates entire agent network for enterprise-level solutions</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
          <span>4. Prevents major business disruptions through predictive intelligence</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
          <span>5. Evolves capabilities achieving exceptional performance benchmarks</span>
        </div>
      </div>
    </div>
  );
}

export default function AgentTutorials() {
  // Fetch real agents from API
  const { data: realAgents = [] } = useQuery({
    queryKey: ["/api/agents"],
    queryFn: () => fetch("/api/agents").then(res => res.json()),
  });

  const [selectedAgent, setSelectedAgent] = useState(0);

  // Create agent-specific content based on real agents
  const getAgentSpecificContent = (agentName: string) => {
    const agentContentMap: { [key: string]: any } = {
      "Advanced Scheduling Agent": {
        tasks: ["Optimize appointment scheduling", "Manage technician assignments", "Handle scheduling conflicts", "Predict optimal time slots"],
        dataUsed: ["Technician availability", "Customer preferences", "Service complexity", "Geographic data"],
        demoScenario: "Automatically schedules 500+ appointments daily, reducing conflicts by 85% and improving customer satisfaction",
        learningDesc: "Learns from historical scheduling patterns to optimize future appointments",
        contextDesc: "Maintains awareness of technician skills, locations, and customer history",
        securityDesc: "Protects sensitive customer scheduling information with encryption"
      },
      "Customer Communication Hub": {
        tasks: ["Manage customer inquiries", "Send service updates", "Handle complaints", "Coordinate follow-ups"],
        dataUsed: ["Customer history", "Service status", "Communication preferences", "Satisfaction scores"],
        demoScenario: "Processes 1,000+ customer interactions daily with 95% satisfaction rate",
        learningDesc: "Adapts communication style based on customer preferences and feedback",
        contextDesc: "Remembers full customer history for personalized interactions",
        securityDesc: "Ensures customer data privacy in all communications"
      },
      "Parts Prediction Engine": {
        tasks: ["Predict part failures", "Optimize inventory levels", "Automate procurement", "Reduce stockouts"],
        dataUsed: ["Equipment history", "Failure patterns", "Vendor data", "Seasonal trends"],
        demoScenario: "Reduces parts-related delays by 70% through predictive analytics",
        learningDesc: "Continuously refines failure predictions using machine learning",
        contextDesc: "Understands equipment lifecycles and usage patterns",
        securityDesc: "Protects vendor and pricing information"
      },
      "Technician Interaction Hub": {
        tasks: ["Support field technicians", "Provide real-time guidance", "Coordinate with dispatch", "Track performance"],
        dataUsed: ["Job details", "Technician location", "Performance metrics", "Customer feedback"],
        demoScenario: "Assists 200+ technicians daily with real-time support and guidance",
        learningDesc: "Learns from successful repair patterns to guide technicians",
        contextDesc: "Maintains context of ongoing jobs and technician capabilities",
        securityDesc: "Secures technician communications and sensitive job data"
      }
    };

    return agentContentMap[agentName] || {
      tasks: ["Process service requests", "Coordinate operations", "Optimize workflows", "Provide insights"],
      dataUsed: ["Service data", "Performance metrics", "Customer information", "Operational data"],
      demoScenario: "Enhances operational efficiency through intelligent automation",
      learningDesc: "Continuously improves performance through machine learning",
      contextDesc: "Maintains context awareness across all interactions",
      securityDesc: "Enterprise-grade security and data protection"
    };
  };

  // Convert real agents to compatible format with unique content
  const agentProfiles = realAgents.map((agent: any) => {
    const specificContent = getAgentSpecificContent(agent.name);
    return {
      name: agent.name,
      type: agent.category || "AI Agent",
      description: agent.description || "Intelligent automation for home services operations",
      coreFeatures: {
        learning: { enabled: true, description: specificContent.learningDesc },
        context: { enabled: true, description: specificContent.contextDesc },
        security: { enabled: true, description: specificContent.securityDesc }
      },
      tasks: specificContent.tasks,
      dataUsed: specificContent.dataUsed,
      interactions: [
        { agent: "System Coordinator", trigger: "Data synchronization", frequency: "Real-time" }
      ],
      demoScenario: specificContent.demoScenario
    };
  });

  // Use first agent if available
  const currentAgent = agentProfiles[selectedAgent] || {
    name: "Loading...",
    type: "AI Agent",
    description: "Loading agent information...",
    coreFeatures: {
      learning: { enabled: false, description: "Loading..." },
      context: { enabled: false, description: "Loading..." },
      security: { enabled: false, description: "Loading..." }
    },
    tasks: ["Loading..."],
    dataUsed: ["Loading..."],
    interactions: [],
    demoScenario: "Loading agent scenario..."
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 flex items-center mb-4">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">AI Agent Training Center</h1>
        <p className="text-gray-400">Interactive tutorials and live demonstrations for {agentProfiles.length} AI agents</p>
      </div>

      {/* Agent Selection */}
      <Card className="bg-dark-card border-dark-border mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
            AI Agent Tutorials & Demonstrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {agentProfiles.map((agent: any, index: number) => (
              <button
                key={index}
                className={`text-left p-3 h-auto rounded border transition-colors ${
                  selectedAgent === index 
                    ? "bg-blue-600 border-blue-500 text-white" 
                    : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setSelectedAgent(index)}
              >
                <div>
                  <p className="font-medium text-sm">{agent.name.length > 25 ? agent.name.substring(0, 23) + "..." : agent.name}</p>
                  <p className="text-xs text-gray-400">{agent.type}</p>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Details */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white">{currentAgent.name}</CardTitle>
          <p className="text-gray-400">{currentAgent.description}</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="demo">Live Demo</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-purple-400" />
                    Learning Capability
                  </h4>
                  <p className="text-gray-300 text-sm">{currentAgent.coreFeatures.learning.description}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Eye className="w-4 h-4 mr-2 text-green-400" />
                    Context Awareness
                  </h4>
                  <p className="text-gray-300 text-sm">{currentAgent.coreFeatures.context.description}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-2 text-blue-400" />
                    Security & Privacy
                  </h4>
                  <p className="text-gray-300 text-sm">{currentAgent.coreFeatures.security.description}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="demo" className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-3">Real-World Scenario</h4>
                <p className="text-gray-300 text-sm mb-4">{currentAgent.demoScenario}</p>
                {getNoviceLevelDemo(currentAgent.name)}
              </div>
            </TabsContent>
            
            <TabsContent value="tasks" className="space-y-4">
              <h4 className="text-white font-medium mb-3">Core Tasks & Capabilities</h4>
              <div className="space-y-2">
                {currentAgent.tasks.map((task: string, index: number) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
                    <span className="text-sm">{task}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="interactions" className="space-y-4">
              <h4 className="text-white font-medium mb-3">Agent Interactions</h4>
              <div className="space-y-3">
                {currentAgent.interactions.map((interaction: any, index: number) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-blue-400 mr-2" />
                        <span className="text-white font-medium">{interaction.agent}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">{interaction.frequency}</Badge>
                    </div>
                    <p className="text-gray-300 text-sm">{interaction.trigger}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
