import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Eye, Lock, Play, Database, Users, ArrowRight, Zap, MessageSquare, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

// Helper function for secondary scenarios
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
            <span>3. Creates dynamic priority matrix: life safety {'>'}property damage {'>'} convenience</span>
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

function getSecondaryScenario(agentName: string) {
  const scenarios: { [key: string]: JSX.Element } = {
    "Advanced Scheduling Agent": (
      <div>
        <p className="text-gray-300 mb-4">Multi-technician coordination for large commercial installation requiring specialized skills across HVAC, electrical, and plumbing.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Process Steps:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>1. Analyzes job requirements: 200-amp electrical, HVAC ductwork, and water system connection</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>2. Identifies certified technicians for each specialty within 25-mile radius</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>3. Coordinates sequential scheduling: electrical foundation → plumbing rough-in → HVAC installation</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>4. Reserves 3-day window with built-in weather/delay buffers</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>5. Creates real-time coordination channel between technicians</span>
          </div>
        </div>
      </div>
    ),
    "Customer Communication Hub": (
      <div>
        <p className="text-gray-300 mb-4">Multi-channel customer crisis management: angry customer calls, social media complaints, and service recovery coordination.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">Process Steps:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>1. Detects escalation signals across phone, email, and social media channels</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>2. Consolidates complaint data and identifies root cause: faulty part installation</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>3. Automatically authorizes service credit and priority re-service</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>4. Dispatches senior technician with replacement parts within 2 hours</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
            <span>5. Proactively follows up across all channels with resolution confirmation</span>
          </div>
        </div>
      </div>
    )
  };
  
  return scenarios[agentName] || (
    <div>
      <p className="text-gray-300 mb-4">Advanced coordination scenario showcasing multi-agent collaboration and complex decision-making processes.</p>
      <div className="space-y-2">
        <h5 className="text-white font-medium">Process Steps:</h5>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
          <span>1. Analyzes complex multi-variable scenario requirements</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
          <span>2. Coordinates with multiple agent systems for optimal outcome</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
          <span>3. Implements real-time monitoring and adaptive adjustments</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
          <span>4. Validates outcomes and captures learnings for system improvement</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
          <span>5. Reports results and optimization recommendations to relevant stakeholders</span>
        </div>
      </div>
    </div>
  );
}

// Helper function for advanced scenarios
function getAdvancedScenario(agentName: string) {
  const scenarios: { [key: string]: JSX.Element } = {
    "Advanced Scheduling Agent": (
      <div>
        <p className="text-gray-300 mb-4">AI-driven predictive scheduling using machine learning to optimize technician routes, minimize cancellations, and maximize customer satisfaction across 47 concurrent jobs.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">AI Process Steps:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>1. ML model analyzes 18 factors: weather, traffic, customer history, technician performance</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>2. Predicts 12% higher cancellation risk for 2-4 PM slots during school pickup hours</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>3. Dynamically adjusts scheduling algorithm to favor morning slots for family customers</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>4. Continuously learns from outcomes: 94.2% customer satisfaction, 8% cancellation reduction</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>5. Updates predictive models weekly based on performance data and seasonal trends</span>
          </div>
        </div>
      </div>
    ),
    "Customer Communication Hub": (
      <div>
        <p className="text-gray-300 mb-4">Advanced conversational AI managing simultaneous multi-language customer interactions while providing personalized service recommendations based on home profile analysis.</p>
        <div className="space-y-2">
          <h5 className="text-white font-medium">AI Process Steps:</h5>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>1. Processes 23 simultaneous conversations in English, Spanish, and Mandarin</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>2. Analyzes home age, system history, and maintenance patterns for predictive recommendations</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>3. Identifies opportunity: customer's 8-year HVAC system due for efficiency upgrade</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>4. Calculates personalized ROI: $847 annual savings with new system installation</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
            <span>5. Seamlessly transitions to scheduling consultation with certified HVAC specialist</span>
          </div>
        </div>
      </div>
    )
  };
  
  return scenarios[agentName] || (
    <div>
      <p className="text-gray-300 mb-4">Cutting-edge AI implementation showcasing machine learning, predictive analytics, and autonomous decision-making capabilities.</p>
      <div className="space-y-2">
        <h5 className="text-white font-medium">AI Process Steps:</h5>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
          <span>1. Deploys advanced machine learning algorithms for pattern recognition</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
          <span>2. Processes massive datasets with real-time predictive analytics</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
          <span>3. Implements autonomous decision-making with confidence scoring</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
          <span>4. Continuously optimizes performance through reinforcement learning</span>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
          <span>5. Validates AI predictions with outcome tracking and model refinement</span>
        </div>
      </div>
    </div>
  );
}

export default function AgentTutorials() {
  const [selectedAgent, setSelectedAgent] = useState(4); // Default to Outstanding Orders Manager

  const agentProfiles = [
    {
      name: "Advanced Scheduling Agent",
      type: "Scheduling AI",
      description: "Manages technician schedules, appointment optimization, and resource allocation across all trades",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from scheduling conflicts and technician preferences to optimize future appointments" },
        context: { enabled: true, description: "Maintains awareness of technician skills, location, availability, and customer preferences" },
        security: { enabled: true, description: "Protects customer data and technician personal information with encryption" }
      },
      tasks: [
        "Optimize daily technician schedules across multiple service areas",
        "Minimize travel time between appointments",
        "Balance workload distribution among technicians",
        "Handle emergency appointment rescheduling",
        "Coordinate multi-technician jobs",
        "Track technician certifications and specializations",
        "Monitor schedule adherence and performance"
      ],
      dataUsed: [
        "Technician availability calendars",
        "Customer appointment preferences",
        "Geographic locations and travel times",
        "Job complexity estimates",
        "Technician skill matrices",
        "Historical performance data",
        "Traffic and weather conditions"
      ],
      interactions: [
        { agent: "Customer Communication Hub", trigger: "Appointment confirmations and changes", frequency: "Continuous" },
        { agent: "Route Optimization Engine", trigger: "Schedule changes requiring route updates", frequency: "Real-time" },
        { agent: "Technician Interaction Hub", trigger: "Schedule updates and notifications", frequency: "Continuous" },
        { agent: "Emergency Response Coordinator", trigger: "Emergency appointments requiring schedule adjustment", frequency: "As needed" }
      ],
      demoScenario: "Emergency plumbing call comes in at 2 PM. Agent analyzes available technicians, considers travel time, current workload, and reschedules non-urgent appointments to accommodate the emergency within 30 minutes."
    },
    {
      name: "Customer Communication Hub",
      type: "Customer Service AI",
      description: "Primary conversational AI handling customer inquiries, appointment scheduling, and service follow-ups",
      coreFeatures: {
        learning: { enabled: true, description: "Learns customer communication preferences and improves response quality from interactions" },
        context: { enabled: true, description: "Remembers entire conversation history and customer service history across all channels" },
        security: { enabled: true, description: "Encrypts all customer communications and protects personal information" }
      },
      tasks: [
        "Handle incoming customer calls, emails, and SMS",
        "Schedule and reschedule service appointments",
        "Provide service quotes and estimates",
        "Send appointment confirmations and reminders",
        "Follow up on completed services",
        "Handle customer complaints and feedback",
        "Manage multi-channel communication preferences"
      ],
      dataUsed: [
        "Customer contact information and preferences",
        "Service history and past interactions",
        "Appointment availability windows",
        "Pricing databases and service catalogs",
        "Technician schedules and capabilities",
        "Customer satisfaction scores",
        "Communication channel preferences"
      ],
      interactions: [
        { agent: "Advanced Scheduling Agent", trigger: "New appointment requests or changes", frequency: "Continuous" },
        { agent: "Pricing & Estimation Specialist", trigger: "Quote requests requiring detailed pricing", frequency: "Daily" },
        { agent: "Outstanding Orders Manager", trigger: "Service order status inquiries", frequency: "Continuous" },
        { agent: "Quality Assurance Inspector", trigger: "Customer feedback and satisfaction reports", frequency: "After each job" }
      ],
      demoScenario: "Customer calls about HVAC not working. Agent checks service history, identifies previous maintenance, schedules emergency appointment, sends SMS confirmation, and coordinates with technician for parts needed."
    },
    {
      name: "Parts Prediction Engine",
      type: "Predictive AI",
      description: "Combines technician recommendations with data from 2000+ technicians to predict parts needs with advanced accuracy",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from 2000+ technician patterns, parts usage data, and unused parts analysis to continuously improve accuracy" },
        context: { enabled: true, description: "Analyzes specific circumstances for low-frequency parts usage (even 10% cases) to understand exact requirements" },
        security: { enabled: true, description: "Protects technician performance data and prediction algorithms with role-based access" }
      },
      tasks: [
        "Weight technician part recommendations heavily while augmenting with fleet data",
        "Analyze parts ordered vs parts used across 2000+ technicians",
        "Identify specific circumstances when low-frequency parts (10% usage) are needed",
        "Generate feedback loops to Technician Management Agent for field verification",
        "Predict secondary parts needed after primary installation (compressors, PCBs)",
        "Track accuracy improvements from technician recommendation + data fusion",
        "Optimize prediction confidence levels based on job complexity"
      ],
      dataUsed: [
        "Technician parts recommendations (primary input)",
        "Parts ordered vs used data across entire fleet",
        "Unused parts return analysis and reasons",
        "Specific circumstances data for low-frequency part usage",
        "Sequential parts needs (post-installation requirements)",
        "Technician performance and accuracy metrics",
        "Equipment failure patterns requiring secondary parts"
      ],
      interactions: [
        { agent: "Technician Management Agent", trigger: "Low-frequency parts circumstance verification prompts", frequency: "When needed" },
        { agent: "Technician Interaction Hub", trigger: "Parts recommendation collection and validation", frequency: "Every diagnosis" },
        { agent: "Parts Ordering Specialist", trigger: "Confidence-weighted parts orders with technician input", frequency: "Real-time" },
        { agent: "Quality Assurance Inspector", trigger: "Parts accuracy validation and unused parts analysis", frequency: "Post-completion" }
      ],
      demoScenario: "Technician recommends compressor + gaskets for HC-401. Agent analyzes 2000+ similar jobs, finds capacitor needed 12% of cases when original compressor age >8 years. Alerts Technician Management Agent to prompt field check for capacitor age before ordering."
    },
    {
      name: "Performance Analytics AI",
      type: "Analytics AI",
      description: "Analyzes job codes, profit margins, technician efficiency, and service area performance",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from performance patterns to identify optimization opportunities" },
        context: { enabled: true, description: "Considers market conditions, seasonal factors, and competitive landscape" },
        security: { enabled: true, description: "Protects financial data and performance metrics with strict access controls" }
      },
      tasks: [
        "Analyze profit margins by job type and technician",
        "Track performance metrics across service areas",
        "Identify high-value vs. low-value service opportunities",
        "Monitor technician efficiency and productivity",
        "Generate profitability reports by region",
        "Analyze customer lifetime value trends",
        "Recommend pricing optimizations"
      ],
      dataUsed: [
        "Job completion times and costs",
        "Revenue data by service type",
        "Technician labor costs and productivity",
        "Parts costs and markup analysis",
        "Customer payment patterns",
        "Market pricing intelligence",
        "Competitive analysis data"
      ],
      interactions: [
        { agent: "Pricing & Estimation Specialist", trigger: "Pricing optimization recommendations", frequency: "Weekly" },
        { agent: "Regional Performance Monitor", trigger: "Geographic performance analysis", frequency: "Monthly" },
        { agent: "Quality Assurance Inspector", trigger: "Quality impact on profitability analysis", frequency: "Weekly" },
        { agent: "Technician Interaction Hub", trigger: "Performance feedback and coaching insights", frequency: "Weekly" }
      ],
      demoScenario: "Agent discovers electrical jobs in downtown area have 15% higher profit margins due to premium pricing acceptance. It recommends targeting similar high-value customers and adjusting technician assignments accordingly."
    },
    {
      name: "Outstanding Orders Manager",
      type: "Order Management AI",
      description: "Tracks outstanding service orders, proactive customer updates, and completion follow-ups",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from order patterns and customer feedback to improve tracking and communication" },
        context: { enabled: true, description: "Maintains complete order lifecycle awareness including dependencies and customer expectations" },
        security: { enabled: true, description: "Protects order information and customer data with role-based access controls" }
      },
      tasks: [
        "Track all outstanding service orders across all service types",
        "Monitor order status changes and completion progress",
        "Send proactive updates to customers about order status",
        "Identify orders at risk of delays or issues",
        "Coordinate completion follow-ups and quality checks",
        "Manage order dependencies and technician assignments",
        "Generate order completion reports and metrics"
      ],
      dataUsed: [
        "Service order details and current status",
        "Technician assignment and progress reports",
        "Customer communication preferences",
        "Parts availability and delivery schedules",
        "Quality check requirements and results",
        "Historical completion time patterns",
        "Customer satisfaction feedback"
      ],
      interactions: [
        { agent: "Customer Communication Hub", trigger: "Order status updates and customer inquiries", frequency: "Continuous" },
        { agent: "Technician Interaction Hub", trigger: "Order progress updates from field technicians", frequency: "Real-time" },
        { agent: "Parts Ordering Specialist", trigger: "Parts availability changes affecting order completion", frequency: "Daily" },
        { agent: "Quality Assurance Inspector", trigger: "Quality check requirements and completion verification", frequency: "After each job" }
      ],
      demoScenario: "Customer calls asking about HVAC repair status. Agent checks order #4521, sees technician is waiting for parts, proactively contacts parts specialist, gets delivery ETA, and updates customer with specific completion timeline."
    },
    {
      name: "Technician Interaction Hub",
      type: "Workforce AI", 
      description: "Facilitates technician communications, job updates, and mobile workforce coordination",
      coreFeatures: {
        learning: { enabled: true, description: "Learns technician communication patterns and preferences to optimize interactions" },
        context: { enabled: true, description: "Maintains awareness of technician location, current job status, and skill capabilities" },
        security: { enabled: true, description: "Protects technician personal information and job data with secure mobile protocols" }
      },
      tasks: [
        "Facilitate real-time communication between technicians and dispatch",
        "Receive and process job status updates from field technicians",
        "Coordinate mobile workforce across multiple service areas",
        "Manage technician availability and schedule changes",
        "Provide technical support and procedural guidance",
        "Track technician performance and completion metrics",
        "Handle emergency communication and rapid response coordination"
      ],
      dataUsed: [
        "Technician location and status data",
        "Job assignment details and updates",
        "Mobile app interaction logs",
        "Performance metrics and completion times",
        "Technical procedure databases",
        "Emergency contact protocols",
        "Training and certification records"
      ],
      interactions: [
        { agent: "Advanced Scheduling Agent", trigger: "Schedule updates and technician availability changes", frequency: "Continuous" },
        { agent: "Outstanding Orders Manager", trigger: "Job progress updates and completion notifications", frequency: "Real-time" },
        { agent: "Emergency Response Coordinator", trigger: "Emergency assignments and rapid response needs", frequency: "As needed" },
        { agent: "Quality Assurance Inspector", trigger: "Job completion reports and quality documentation", frequency: "After each job" }
      ],
      demoScenario: "Field technician discovers additional electrical issues during routine maintenance. Agent facilitates communication with customer about expanded scope, coordinates with scheduling for extended time, and updates parts ordering for additional materials needed."
    },
    {
      name: "Technician Management Agent",
      type: "Workforce Intelligence AI",
      description: "Manages 2000+ technician performance, provides predictive prompts, and optimizes field decision-making",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from technician accuracy patterns, decision contexts, and field performance to personalize guidance" },
        context: { enabled: true, description: "Maintains individual technician profiles, specializations, and historical decision accuracy across all job types" },
        security: { enabled: true, description: "Protects individual performance data while enabling fleet-wide learning and improvement" }
      },
      tasks: [
        "Prompt technicians to check specific conditions based on Parts Prediction insights",
        "Track individual technician parts prediction accuracy vs fleet average",
        "Provide contextual field prompts for low-frequency parts scenarios",
        "Manage technician specialization and expertise development",
        "Coordinate cross-technician learning from unusual parts scenarios",
        "Monitor and improve diagnostic consistency across the 2000+ workforce",
        "Generate personalized training recommendations based on parts accuracy"
      ],
      dataUsed: [
        "Individual technician performance and accuracy metrics",
        "Parts Prediction Engine insights and low-frequency scenarios",
        "Field decision outcomes and accuracy validation",
        "Technician specialization areas and certification levels",
        "Comparative performance data across similar job types",
        "Training completion and skill development tracking",
        "Customer feedback correlated with technician decisions"
      ],
      interactions: [
        { agent: "Parts Prediction Engine", trigger: "Low-frequency parts circumstance verification requests", frequency: "As needed" },
        { agent: "Technician Interaction Hub", trigger: "Real-time field prompts and guidance delivery", frequency: "During jobs" },
        { agent: "Quality Assurance Inspector", trigger: "Performance validation and improvement recommendations", frequency: "Post-completion" },
        { agent: "Advanced Scheduling Agent", trigger: "Technician specialization-based assignment optimization", frequency: "Daily" }
      ],
      demoScenario: "Parts Prediction finds capacitors needed 12% of time for compressor jobs on 8+ year units. Agent prompts specific technician: 'Check capacitor age - fleet data shows 88% accuracy when you verify this step.' Technician confirms capacitor failure, improving job completion rate."
    },
    {
      name: "HVAC System Diagnostics AI",
      type: "Technical Specialist AI",
      description: "Advanced AI for HVAC system diagnosis, energy optimization, and predictive maintenance scheduling",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from diagnostic patterns and equipment failure modes to improve accuracy" },
        context: { enabled: true, description: "Maintains full system context including age, maintenance history, and usage patterns" },
        security: { enabled: true, description: "Protects system data and customer information with enterprise encryption" }
      },
      tasks: ["Remote HVAC diagnostics", "Energy efficiency optimization", "Predictive maintenance scheduling", "Equipment failure analysis"],
      dataUsed: ["System telemetry", "Energy usage patterns", "Equipment specifications", "Maintenance history"],
      interactions: [
        { agent: "Parts Prediction Engine", trigger: "Diagnostic completion", frequency: "After each diagnosis" },
        { agent: "Maintenance Scheduler Pro", trigger: "Predictive maintenance needed", frequency: "Weekly analysis" }
      ],
      demoScenario: "Customer reports high energy bills. AI remotely analyzes HVAC system, identifies 15% efficiency loss from dirty coils, schedules maintenance, and predicts compressor replacement needed in 6 months."
    },
    {
      name: "Electrical Safety Compliance Agent",
      type: "Safety Specialist AI",
      description: "AI ensuring electrical work compliance with safety codes, regulations, and certification requirements",
      coreFeatures: {
        learning: { enabled: true, description: "Continuously updates safety protocols and learns from incident patterns" },
        context: { enabled: true, description: "Maintains awareness of local codes, technician certifications, and safety history" },
        security: { enabled: true, description: "Secures compliance data and safety records with audit trails" }
      },
      tasks: ["Safety compliance verification", "Code requirement checking", "Technician certification tracking", "Risk assessment"],
      dataUsed: ["Local electrical codes", "Technician certifications", "Safety incident history", "Equipment specifications"],
      interactions: [
        { agent: "Technician Management Agent", trigger: "Pre-job safety verification", frequency: "Before electrical jobs" },
        { agent: "Quality Assurance Inspector", trigger: "Post-completion safety audit", frequency: "After major electrical work" }
      ],
      demoScenario: "Before 200-amp panel upgrade, agent verifies technician has current electrical license, checks local permit requirements, and provides safety checklist. Flags need for inspection scheduling."
    },
    {
      name: "Quality Assurance Inspector",
      type: "Quality Control AI",
      description: "AI-powered quality inspection system using photo analysis and performance validation",
      coreFeatures: {
        learning: { enabled: true, description: "Improves inspection accuracy from photo analysis and feedback patterns" },
        context: { enabled: true, description: "Considers job complexity, technician experience, and customer expectations" },
        security: { enabled: true, description: "Protects quality data and customer photos with secure processing" }
      },
      tasks: ["Photo-based quality inspection", "Work completion verification", "Performance scoring", "Improvement recommendations"],
      dataUsed: ["Job completion photos", "Work standards", "Customer feedback", "Technician performance history"],
      interactions: [
        { agent: "Performance Analytics AI", trigger: "Quality assessment completed", frequency: "After each job" },
        { agent: "Technician Management Agent", trigger: "Training needs identified", frequency: "Weekly review" }
      ],
      demoScenario: "Technician submits installation photos. AI analyzes pipe alignment, joint quality, and code compliance. Identifies minor issue, provides feedback, and schedules follow-up inspection."
    },
    {
      name: "D2C Marketing Intelligence Agent",
      type: "Marketing AI",
      description: "AI agent managing direct-to-consumer marketing, SEO optimization, LLM recommendation visibility, and digital presence to attract homeowners searching for home services",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from customer search patterns and optimizes SEO strategies for better visibility" },
        context: { enabled: true, description: "Understands local market conditions, seasonal trends, and customer search behaviors" },
        security: { enabled: true, description: "Protects customer data and marketing analytics with secure data handling" }
      },
      tasks: [
        "Optimize website SEO for local home services searches",
        "Monitor and improve LLM recommendation visibility", 
        "Manage digital presence across multiple platforms",
        "Track and analyze customer acquisition metrics",
        "Optimize content for homeowner search intent",
        "Coordinate with local search optimization",
        "Monitor competitor digital presence"
      ],
      dataUsed: [
        "Search engine ranking data",
        "LLM recommendation metrics",
        "Customer acquisition sources",
        "Website analytics and conversion rates",
        "Local search trends",
        "Competitor analysis data",
        "Customer journey mapping"
      ],
      interactions: [
        { agent: "B2B Relationship Manager Agent", trigger: "Cross-marketing opportunities", frequency: "Weekly" },
        { agent: "Geographic Performance Marketing Agent", trigger: "Area-specific marketing insights", frequency: "Daily" },
        { agent: "Customer Communication Hub", trigger: "Lead qualification and handoff", frequency: "Continuous" },
        { agent: "Performance Analytics AI", trigger: "Marketing ROI analysis", frequency: "Daily" }
      ],
      demoScenario: "Homeowner searches 'emergency plumbing near me' on Google. Agent ensures company appears in top 3 results, optimizes LLM recommendations, and tracks the customer journey from search to service booking."
    },
    {
      name: "B2B Relationship Manager Agent", 
      type: "B2B Marketing AI",
      description: "AI agent focused on building and maintaining relationships with B2B clients, tracking performance by planning area, and identifying opportunities for increased business partnerships",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from client interaction patterns and relationship development strategies" },
        context: { enabled: true, description: "Maintains comprehensive relationship history and performance context by planning area" },
        security: { enabled: true, description: "Protects sensitive business relationship data and client information" }
      },
      tasks: [
        "Track and nurture B2B client relationships",
        "Monitor performance by planning area for client retention",
        "Identify upselling and cross-selling opportunities",
        "Coordinate with territory-based performance data",
        "Manage client communication scheduling",
        "Track competitor activity in B2B space",
        "Optimize relationship-building strategies"
      ],
      dataUsed: [
        "Client interaction history",
        "Planning area performance metrics",
        "Service quality scores by territory",
        "Client satisfaction and retention data",
        "Revenue per client analytics",
        "Territory expansion opportunities",
        "Competitive intelligence"
      ],
      interactions: [
        { agent: "Geographic Performance Marketing Agent", trigger: "Territory performance impact on relationships", frequency: "Daily" },
        { agent: "Performance Analytics AI", trigger: "Client performance reporting", frequency: "Weekly" },
        { agent: "Regional Performance Monitor", trigger: "Area-specific relationship insights", frequency: "Daily" },
        { agent: "Customer Communication Hub", trigger: "B2B client communication coordination", frequency: "Continuous" }
      ],
      demoScenario: "Property management company in Planning Area 127 shows declining satisfaction. Agent proactively schedules relationship review, identifies service quality issues, and coordinates with performance team to prevent contract loss."
    },
    {
      name: "Geographic Performance Marketing Agent",
      type: "Geo-Marketing AI", 
      description: "AI agent analyzing performance by planning area to optimize marketing spend, identify high-potential regions, and prevent business loss due to poor performance in specific geographic areas",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from geographic performance patterns and marketing effectiveness by area" },
        context: { enabled: true, description: "Understands local market dynamics, demographic patterns, and area-specific business drivers" },
        security: { enabled: true, description: "Protects geographic performance data and marketing strategy information" }
      },
      tasks: [
        "Analyze performance metrics across 430+ planning areas",
        "Identify high-potential geographic markets",
        "Prevent business loss due to poor area performance",
        "Optimize marketing spend by geographic region", 
        "Track territory expansion opportunities",
        "Monitor local competition and market conditions",
        "Coordinate area-specific marketing strategies"
      ],
      dataUsed: [
        "Planning area performance metrics",
        "Geographic revenue and cost data",
        "Local market demographics",
        "Area-specific customer satisfaction scores",
        "Territory-based service quality metrics",
        "Local competitor analysis",
        "Marketing ROI by geographic area"
      ],
      interactions: [
        { agent: "Performance Analytics AI", trigger: "Geographic performance analysis", frequency: "Daily" },
        { agent: "Regional Performance Monitor", trigger: "Territory performance coordination", frequency: "Continuous" },
        { agent: "B2B Relationship Manager Agent", trigger: "Geographic relationship impact", frequency: "Daily" },
        { agent: "D2C Marketing Intelligence Agent", trigger: "Area-specific marketing optimization", frequency: "Daily" }
      ],
      demoScenario: "Planning Area 089 shows declining performance threatening B2B relationships. Agent identifies root causes, reallocates marketing budget to retention campaigns, and prevents loss of $250K annual contract."
    },
    {
      name: "Pricing & Estimation Specialist",
      type: "Financial Operations AI",
      description: "AI for accurate pricing, competitive analysis, and profit optimization across all service types",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from pricing success rates and market dynamics to optimize quotes" },
        context: { enabled: true, description: "Considers customer history, job complexity, and competitive landscape" },
        security: { enabled: true, description: "Protects pricing strategies and customer financial data securely" }
      },
      tasks: ["Dynamic pricing calculation", "Competitive quote analysis", "Profit margin optimization", "Customer pricing history"],
      dataUsed: ["Labor rates", "Material costs", "Competitor pricing", "Customer value analysis"],
      interactions: [
        { agent: "Customer Communication Hub", trigger: "Quote request received", frequency: "Continuous" },
        { agent: "Performance Analytics AI", trigger: "Quote acceptance analysis", frequency: "Daily review" }
      ],
      demoScenario: "Customer requests HVAC replacement quote. AI analyzes similar jobs, checks competitor pricing, considers customer loyalty, and provides optimized quote with 85% win probability."
    },
    {
      name: "Maintenance Scheduler Pro",
      type: "Preventive Maintenance AI",
      description: "Advanced scheduling system for preventive maintenance, warranty tracking, and customer retention",
      coreFeatures: {
        learning: { enabled: true, description: "Learns optimal maintenance intervals from equipment performance and failure patterns" },
        context: { enabled: true, description: "Tracks equipment age, usage patterns, warranty status, and customer preferences" },
        security: { enabled: true, description: "Secures maintenance schedules and customer equipment data" }
      },
      tasks: ["Preventive maintenance scheduling", "Warranty expiration tracking", "Customer retention campaigns", "Equipment lifecycle management"],
      dataUsed: ["Equipment installation dates", "Maintenance history", "Warranty information", "Customer preferences"],
      interactions: [
        { agent: "Advanced Scheduling Agent", trigger: "Maintenance window needed", frequency: "Daily scheduling" },
        { agent: "Customer Communication Hub", trigger: "Maintenance reminders", frequency: "Scheduled intervals" }
      ],
      demoScenario: "HVAC system installed 18 months ago approaches first maintenance. AI schedules appointment, checks warranty status, and offers customer service package for continued coverage."
    },
    {
      name: "Regional Performance Monitor",
      type: "Analytics Intelligence AI",
      description: "Regional performance analytics and cross-market optimization for multi-location operations",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from regional performance patterns and market dynamics to optimize operations" },
        context: { enabled: true, description: "Maintains regional context including local regulations, weather patterns, and market conditions" },
        security: { enabled: true, description: "Protects regional performance data and competitive information with encryption" }
      },
      tasks: ["Regional performance analysis", "Cross-market optimization", "Local regulation tracking", "Weather impact assessment"],
      dataUsed: ["Regional performance metrics", "Local regulations", "Weather data", "Market conditions"],
      interactions: [
        { agent: "Performance Analytics AI", trigger: "Regional data aggregation", frequency: "Daily" },
        { agent: "Advanced Scheduling Agent", trigger: "Regional optimization needs", frequency: "Weekly planning" }
      ],
      demoScenario: "Winter storm affects 3 regions. AI analyzes performance impact, reallocates resources, adjusts scheduling, and provides regional managers with recovery recommendations."
    },
    {
      name: "Inventory Management Assistant",
      type: "Supply Chain AI",
      description: "Smart inventory optimization, stock level monitoring, and automated reordering for efficient operations",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from usage patterns and seasonal demands to optimize inventory levels" },
        context: { enabled: true, description: "Maintains context of job requirements, supplier lead times, and storage constraints" },
        security: { enabled: true, description: "Secures inventory data and supplier information with access controls" }
      },
      tasks: ["Stock level monitoring", "Automated reordering", "Usage pattern analysis", "Supplier performance tracking"],
      dataUsed: ["Current inventory levels", "Usage history", "Supplier data", "Job requirements"],
      interactions: [
        { agent: "Parts Prediction Engine", trigger: "Parts demand forecasting", frequency: "Continuous monitoring" },
        { agent: "Parts Ordering Specialist", trigger: "Reorder triggers", frequency: "As needed" }
      ],
      demoScenario: "AI detects unusual water heater part demand increase, analyzes regional patterns, automatically reorders before stockout, and alerts managers about potential supply chain issues."
    },
    {
      name: "Performance Analytics AI",
      type: "Business Intelligence AI",
      description: "Comprehensive performance analytics, KPI tracking, and business intelligence for data-driven decisions",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from performance trends and business patterns to provide predictive insights" },
        context: { enabled: true, description: "Maintains comprehensive business context including goals, benchmarks, and market conditions" },
        security: { enabled: true, description: "Protects business intelligence data and strategic information securely" }
      },
      tasks: ["KPI tracking and analysis", "Performance trend analysis", "Predictive business insights", "ROI optimization"],
      dataUsed: ["Performance metrics", "Financial data", "Customer satisfaction scores", "Operational efficiency data"],
      interactions: [
        { agent: "Regional Performance Monitor", trigger: "Analytics aggregation", frequency: "Daily reporting" },
        { agent: "Pricing & Estimation Specialist", trigger: "Performance-based pricing optimization", frequency: "Weekly review" }
      ],
      demoScenario: "AI identifies 15% efficiency drop in plumbing jobs, correlates with new technician training program, recommends adjustments, and predicts 3-month recovery timeline with specific interventions."
    },
    {
      name: "Route Optimization Engine",
      type: "Logistics Intelligence AI",
      description: "Advanced route planning, traffic optimization, and fuel efficiency management for field operations",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from traffic patterns, job completion times, and route efficiency to optimize paths" },
        context: { enabled: true, description: "Maintains real-time context of traffic, weather, job priorities, and technician locations" },
        security: { enabled: true, description: "Protects route data and location information with secure processing" }
      },
      tasks: ["Dynamic route optimization", "Traffic pattern analysis", "Fuel efficiency tracking", "Emergency response routing"],
      dataUsed: ["Real-time traffic data", "Job locations and priorities", "Technician locations", "Vehicle specifications"],
      interactions: [
        { agent: "Advanced Scheduling Agent", trigger: "Route planning coordination", frequency: "Continuous optimization" },
        { agent: "Emergency Response Coordinator", trigger: "Emergency routing needs", frequency: "As needed" }
      ],
      demoScenario: "Morning traffic jam affects 12 scheduled jobs. AI dynamically reroutes technicians, reschedules appointments, saves 2 hours travel time, and maintains customer satisfaction."
    },
    {
      name: "Outstanding Orders Manager",
      type: "Order Management AI",
      description: "Tracks and manages outstanding service orders, ensuring timely completion and customer satisfaction",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from order completion patterns and delay factors to improve management" },
        context: { enabled: true, description: "Maintains order context including customer priorities, technician capacity, and resource availability" },
        security: { enabled: true, description: "Protects order data and customer information with secure access controls" }
      },
      tasks: ["Order status tracking", "Completion timeline management", "Resource allocation optimization", "Customer communication coordination"],
      dataUsed: ["Service order details", "Technician schedules", "Customer priorities", "Resource availability"],
      interactions: [
        { agent: "Advanced Scheduling Agent", trigger: "Schedule adjustments needed", frequency: "Continuous monitoring" },
        { agent: "Customer Communication Hub", trigger: "Status update requirements", frequency: "Regular intervals" }
      ],
      demoScenario: "Customer calls about delayed furnace repair. AI immediately provides status, identifies cause (parts delay), reschedules with priority technician, and offers compensation for inconvenience."
    },
    {
      name: "Parts Ordering Specialist",
      type: "Procurement Intelligence AI",
      description: "Automated parts ordering, supplier management, and procurement optimization for seamless operations",
      coreFeatures: {
        learning: { enabled: true, description: "Learns from supplier performance and ordering patterns to optimize procurement" },
        context: { enabled: true, description: "Maintains supplier relationships, pricing data, and delivery performance context" },
        security: { enabled: true, description: "Secures procurement data and supplier information with encryption" }
      },
      tasks: ["Automated parts ordering", "Supplier performance monitoring", "Price comparison and negotiation", "Delivery tracking"],
      dataUsed: ["Supplier catalogs", "Pricing data", "Delivery performance", "Quality metrics"],
      interactions: [
        { agent: "Parts Prediction Engine", trigger: "Parts requirement forecasting", frequency: "Continuous coordination" },
        { agent: "Inventory Management Assistant", trigger: "Stock level coordination", frequency: "Daily monitoring" }
      ],
      demoScenario: "Parts Prediction Engine forecasts high demand for AC capacitors. AI automatically orders from 3 suppliers, negotiates bulk pricing, arranges direct-ship deliveries, and tracks arrival times."
    }
  ];

  const renderCoreFeatureButton = (feature: string, data: any) => {
    const icons: Record<string, JSX.Element> = {
      learning: <Brain className="w-4 h-4" />,
      context: <Eye className="w-4 h-4" />,
      security: <Lock className="w-4 h-4" />
    };

    const colors: Record<string, string> = {
      learning: data.enabled ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30",
      context: data.enabled ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30",
      security: data.enabled ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : "bg-gray-500/20 text-gray-400 border-gray-500/30"
    };

    return (
      <div className={`p-3 rounded-lg border ${colors[feature]} transition-all hover:scale-105`}>
        <div className="flex items-center mb-2">
          {icons[feature]}
          <span className="ml-2 font-medium capitalize">{feature}</span>
          <Badge variant={data.enabled ? "default" : "outline"} className="ml-auto text-xs">
            {data.enabled ? "Active" : "Inactive"}
          </Badge>
        </div>
        <p className="text-xs text-gray-300">{data.description}</p>
      </div>
    );
  };

  const currentAgent = agentProfiles[selectedAgent];

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-white">AI Agent Training Center</h1>
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>
      
      {/* Agent Selection */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
            AI Agent Tutorials & Demonstrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {agentProfiles.map((agent, index) => (
              <Button
                key={index}
                variant={selectedAgent === index ? "default" : "outline"}
                className="text-left p-2 h-auto"
                onClick={() => setSelectedAgent(index)}
              >
                <div>
                  <p className="font-medium text-sm">{agent.name.length > 20 ? agent.name.substring(0, 18) + "..." : agent.name}</p>
                  <p className="text-xs text-gray-400">{agent.type}</p>
                </div>
              </Button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Currently showing all {agentProfiles.length} agents out of {agentProfiles.length} total agents. Select an agent above to explore their capabilities.
          </div>
        </CardContent>
      </Card>

      {/* Selected Agent Details */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>{currentAgent.name}</span>
            <Badge className="bg-blue-500/20 text-blue-400">{currentAgent.type}</Badge>
          </CardTitle>
          <p className="text-gray-400">{currentAgent.description}</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="features">Core Features</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="data">Data Sources</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
              <TabsTrigger value="demo">Demo</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-4">
              <h4 className="text-white font-medium mb-3">Learning, Context & Security Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(currentAgent.coreFeatures).map(([feature, data]) => (
                  <div key={feature}>
                    {renderCoreFeatureButton(feature, data)}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <h4 className="text-white font-medium mb-3">Primary Tasks & Responsibilities</h4>
              <div className="space-y-2">
                {currentAgent.tasks.map((task, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-400 text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-300">{task}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <h4 className="text-white font-medium mb-3">Data Sources & Information Used</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentAgent.dataUsed.map((data, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-800/50 rounded-lg">
                    <Database className="w-4 h-4 text-green-400 mr-3" />
                    <p className="text-gray-300">{data}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interactions" className="space-y-4">
              <h4 className="text-white font-medium mb-3">Agent Interactions & Triggers</h4>
              <div className="space-y-3">
                {currentAgent.interactions.map((interaction, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-purple-400 mr-2" />
                        <span className="text-white font-medium">{interaction.agent}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {interaction.frequency}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Zap className="w-3 h-3 mr-2" />
                      <span>Trigger: {interaction.trigger}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="demo" className="space-y-4">
              <h4 className="text-white font-medium mb-3">Live Demonstration Scenarios by Maturity Level</h4>
              
              {/* Novice Level Demo */}
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-4">
                <div className="flex items-center mb-3">
                  <Play className="w-5 h-5 text-green-400 mr-2" />
                  <span className="text-green-400 font-medium">Novice Level: Basic Operations</span>
                </div>
                {getNoviceLevelDemo(currentAgent.name)}
              </div>

              {/* Intermediate Level Demo */}
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
                <div className="flex items-center mb-3">
                  <Play className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-blue-400 font-medium">Intermediate Level: Coordinated Operations</span>
                </div>
                {getIntermediateLevelDemo(currentAgent.name)}
              </div>

              {/* Advanced Level Demo */}
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg mb-4">
                <div className="flex items-center mb-3">
                  <Play className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-purple-400 font-medium">Advanced Level: Complex Coordination</span>
                </div>
                {getAdvancedLevelDemo(currentAgent.name)}
              </div>

              {/* Expert Level Demo */}
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg mb-4">
                <div className="flex items-center mb-3">
                  <Play className="w-5 h-5 text-orange-400 mr-2" />
                  <span className="text-orange-400 font-medium">Expert Level: Autonomous Intelligence</span>
                </div>
                {getExpertLevelDemo(currentAgent.name)}
              </div>

              {/* Original Primary Demo for Reference */}
              <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-lg mb-4">
                <div className="flex items-center mb-3">
                  <Play className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-400 font-medium">Reference: Standard Operation</span>
                </div>
                <p className="text-gray-300 mb-4">{currentAgent.demoScenario}</p>
                
                <div className="space-y-2">
                  <h5 className="text-white font-medium">Step-by-step Process:</h5>
                  <div className="space-y-2">
                    {currentAgent.name === "Advanced Scheduling Agent" && (
                      <>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
                          <span>1. Receives emergency request with priority flag</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
                          <span>2. Analyzes available technicians within 15-mile radius</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
                          <span>3. Calculates optimal rescheduling to minimize disruption</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
                          <span>4. Automatically reschedules and notifies affected customers</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-blue-400" />
                          <span>5. Dispatches technician with emergency protocols</span>
                        </div>
                      </>
                    )}
                    {currentAgent.name === "Customer Communication Hub" && (
                      <>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
                          <span>1. Receives customer call and identifies caller from database</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
                          <span>2. Reviews service history and previous HVAC maintenance</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
                          <span>3. Coordinates with scheduling agent for emergency slot</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
                          <span>4. Sends SMS confirmation and technician details</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-green-400" />
                          <span>5. Alerts parts team about likely replacement needs</span>
                        </div>
                      </>
                    )}
                    {currentAgent.name === "Parts Prediction Engine" && (
                      <>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
                          <span>1. Receives technician recommendation: compressor + gaskets for HC-401</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
                          <span>2. Analyzes 2000+ similar jobs: capacitor needed 12% when unit &gt;8 years old</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
                          <span>3. Alerts Technician Management: prompt field check for capacitor age</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
                          <span>4. Orders technician-recommended parts + conditional capacitor based on verification</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-purple-400" />
                          <span>5. Tracks accuracy improvement from technician+data fusion approach</span>
                        </div>
                      </>
                    )}
                    {currentAgent.name === "Technician Management Agent" && (
                      <>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-emerald-400" />
                          <span>1. Receives alert from Parts Prediction: check capacitor age for 8+ year units</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-emerald-400" />
                          <span>2. Sends field prompt: "Check capacitor age - fleet data shows 88% accuracy when verified"</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-emerald-400" />
                          <span>3. Technician confirms capacitor failure needs replacement</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-emerald-400" />
                          <span>4. Updates Parts Prediction and orders additional capacitor</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-emerald-400" />
                          <span>5. Records successful intervention improving job completion rate</span>
                        </div>
                      </>
                    )}
                    {currentAgent.name === "Performance Analytics AI" && (
                      <>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
                          <span>1. Analyzes electrical job profitability by location and customer type</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
                          <span>2. Identifies downtown premium pricing acceptance (15% higher margins)</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
                          <span>3. Correlates customer demographics with pricing tolerance patterns</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
                          <span>4. Generates targeting recommendations for marketing team</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-orange-400" />
                          <span>5. Adjusts technician assignments to optimize high-value areas</span>
                        </div>
                      </>
                    )}
                    {currentAgent.name === "Outstanding Orders Manager" && (
                      <>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-cyan-400" />
                          <span>1. Receives customer inquiry about order #4521 status</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-cyan-400" />
                          <span>2. Accesses order database and identifies current status: "Waiting for parts"</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-cyan-400" />
                          <span>3. Automatically contacts Parts Ordering Specialist for delivery ETA</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-cyan-400" />
                          <span>4. Updates customer via preferred channel with specific completion timeline</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-cyan-400" />
                          <span>5. Sets automated follow-up reminder for parts arrival and completion</span>
                        </div>
                      </>
                    )}
                    {currentAgent.name === "Technician Interaction Hub" && (
                      <>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-indigo-400" />
                          <span>1. Receives technician report of additional electrical issues found</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-indigo-400" />
                          <span>2. Coordinates with Customer Communication Hub for scope expansion approval</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-indigo-400" />
                          <span>3. Updates Advanced Scheduling Agent to extend appointment time</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-indigo-400" />
                          <span>4. Alerts Parts Ordering Specialist for additional materials needed</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <ArrowRight className="w-3 h-3 mr-2 text-indigo-400" />
                          <span>5. Provides real-time updates to technician and updates order status</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>


            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}