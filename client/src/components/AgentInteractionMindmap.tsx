import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Zap, Users, ArrowRight, Network, MessageSquare, Calendar, Route, Package, BarChart3, MapPin, Settings, Brain,
  Navigation, AlertTriangle, BarChart, CheckCircle, DollarSign, Wrench, Thermometer, FileText, 
  ShoppingCart, Droplets, UserCheck
} from "lucide-react";
import { useState } from "react";

export default function AgentInteractionMindmap() {
  const [selectedInteraction, setSelectedInteraction] = useState<string | null>(null);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  const agents = [
    // Core Operations Agents
    {
      id: "scheduling",
      name: "Advanced Scheduling Agent",
      type: "Core Operations",
      position: { x: 400, y: 100 },
      icon: <Calendar className="w-4 h-4" />,
      color: "bg-blue-500/20 border-blue-500/40 text-blue-400"
    },
    {
      id: "communication",
      name: "Customer Communication Hub",
      type: "Customer Interface",
      position: { x: 100, y: 200 },
      icon: <MessageSquare className="w-4 h-4" />,
      color: "bg-green-500/20 border-green-500/40 text-green-400"
    },
    {
      id: "routing",
      name: "Route Optimization Engine",
      type: "Logistics",
      position: { x: 700, y: 150 },
      icon: <Route className="w-4 h-4" />,
      color: "bg-purple-500/20 border-purple-500/40 text-purple-400"
    },
    {
      id: "technician",
      name: "Technician Interaction Hub",
      type: "Workforce",
      position: { x: 400, y: 300 },
      icon: <Users className="w-4 h-4" />,
      color: "bg-orange-500/20 border-orange-500/40 text-orange-400"
    },
    {
      id: "emergency",
      name: "Emergency Response Coordinator",
      type: "Critical Operations",
      position: { x: 200, y: 50 },
      icon: <Zap className="w-4 h-4" />,
      color: "bg-pink-500/20 border-pink-500/40 text-pink-400"
    },
    // Parts & Inventory Agents
    {
      id: "parts-prediction",
      name: "Parts Prediction Engine",
      type: "Predictive AI",
      position: { x: 100, y: 400 },
      icon: <Brain className="w-4 h-4" />,
      color: "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
    },
    {
      id: "inventory",
      name: "Inventory Management Assistant",
      type: "Supply Chain",
      position: { x: 400, y: 500 },
      icon: <Package className="w-4 h-4" />,
      color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-400"
    },
    {
      id: "parts-ordering",
      name: "Parts Ordering Specialist",
      type: "Procurement",
      position: { x: 700, y: 500 },
      icon: <Package className="w-4 h-4" />,
      color: "bg-amber-500/20 border-amber-500/40 text-amber-400"
    },
    // Analysis & Intelligence Agents
    {
      id: "analytics",
      name: "Performance Analytics AI",
      type: "Intelligence",
      position: { x: 800, y: 300 },
      icon: <BarChart3 className="w-4 h-4" />,
      color: "bg-red-500/20 border-red-500/40 text-red-400"
    },
    {
      id: "regional",
      name: "Regional Performance Monitor",
      type: "Geographic Analytics",
      position: { x: 900, y: 200 },
      icon: <MapPin className="w-4 h-4" />,
      color: "bg-indigo-500/20 border-indigo-500/40 text-indigo-400"
    },
    // Service Specialization Agents
    // Marketing & Customer Acquisition Agents
    {
      id: "d2c-marketing",
      name: "D2C Marketing Intelligence Agent", 
      type: "Marketing AI",
      position: { x: 50, y: 50 },
      icon: <BarChart className="w-4 h-4" />,
      color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
    },
    {
      id: "b2b-relationship",
      name: "B2B Relationship Manager Agent",
      type: "B2B Marketing AI", 
      position: { x: 850, y: 50 },
      icon: <Users className="w-4 h-4" />,
      color: "bg-violet-500/20 border-violet-500/40 text-violet-400"
    },
    {
      id: "geo-marketing",
      name: "Geographic Performance Marketing Agent",
      type: "Geo-Marketing AI",
      position: { x: 950, y: 100 },
      icon: <MapPin className="w-4 h-4" />,
      color: "bg-rose-500/20 border-rose-500/40 text-rose-400"
    },
    {
      id: "hvac-diagnostics",
      name: "HVAC System Diagnostics AI",
      type: "Technical Specialist",
      position: { x: 50, y: 100 },
      icon: <Settings className="w-4 h-4" />,
      color: "bg-teal-500/20 border-teal-500/40 text-teal-400"
    },
    {
      id: "electrical-safety",
      name: "Electrical Safety Compliance Agent",
      type: "Safety Specialist",
      position: { x: 150, y: 300 },
      icon: <Zap className="w-4 h-4" />,
      color: "bg-yellow-600/20 border-yellow-600/40 text-yellow-600"
    },
    {
      id: "quality-assurance",
      name: "Quality Assurance Inspector",
      type: "Quality Control",
      position: { x: 600, y: 250 },
      icon: <Settings className="w-4 h-4" />,
      color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
    },
    // Order & Dispatch Management
    {
      id: "outstanding-orders",
      name: "Outstanding Orders Manager",
      type: "Order Management",
      position: { x: 300, y: 200 },
      icon: <Package className="w-4 h-4" />,
      color: "bg-violet-500/20 border-violet-500/40 text-violet-400"
    },
    {
      id: "plumbing-dispatch",
      name: "Plumbing Dispatch Coordinator",
      type: "Service Dispatch",
      position: { x: 550, y: 100 },
      icon: <Users className="w-4 h-4" />,
      color: "bg-blue-600/20 border-blue-600/40 text-blue-600"
    },
    // Business Operations
    {
      id: "pricing-estimation",
      name: "Pricing & Estimation Specialist",
      type: "Financial Operations",
      position: { x: 800, y: 150 },
      icon: <BarChart3 className="w-4 h-4" />,
      color: "bg-green-600/20 border-green-600/40 text-green-600"
    },
    {
      id: "maintenance-scheduler",
      name: "Maintenance Scheduler Pro",
      type: "Preventive Maintenance",
      position: { x: 250, y: 400 },
      icon: <Calendar className="w-4 h-4" />,
      color: "bg-slate-500/20 border-slate-500/40 text-slate-400"
    },
    {
      id: "technician-management",
      name: "Technician Management Agent",
      type: "Workforce Intelligence",
      position: { x: 550, y: 350 },
      icon: <Brain className="w-4 h-4" />,
      color: "bg-rose-500/20 border-rose-500/40 text-rose-400"
    },
    // Technician Lifecycle Agents
    {
      id: "technician-recruiting",
      name: "Technician Recruiting Agent",
      type: "Talent Acquisition",
      position: { x: 650, y: 350 },
      icon: <Users className="w-4 h-4" />,
      color: "bg-indigo-500/20 border-indigo-500/40 text-indigo-400"
    },
    {
      id: "technician-training",
      name: "Technician Training & Development Agent",
      type: "Learning & Development",
      position: { x: 750, y: 350 },
      icon: <UserCheck className="w-4 h-4" />,
      color: "bg-blue-500/20 border-blue-500/40 text-blue-400"
    },
    {
      id: "technician-retention",
      name: "Technician Retention Intelligence Agent",
      type: "Retention Analytics",
      position: { x: 850, y: 350 },
      icon: <Brain className="w-4 h-4" />,
      color: "bg-purple-500/20 border-purple-500/40 text-purple-400"
    },
    // LLM Marketing Intelligence Agents
    {
      id: "llm-recommendation",
      name: "LLM Recommendation Dominance Agent",
      type: "LLM Marketing",
      position: { x: 100, y: 550 },
      icon: <Brain className="w-4 h-4" />,
      color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
    },
    {
      id: "ai-b2b-intelligence",
      name: "AI-Powered B2B Intelligence Agent",
      type: "B2B AI",
      position: { x: 300, y: 550 },
      icon: <BarChart3 className="w-4 h-4" />,
      color: "bg-violet-500/20 border-violet-500/40 text-violet-400"
    },
    {
      id: "hyper-local-llm",
      name: "Hyper-Local LLM Market Intelligence Agent",
      type: "Local AI Marketing",
      position: { x: 500, y: 550 },
      icon: <MapPin className="w-4 h-4" />,
      color: "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
    },
    {
      id: "conversational-commerce",
      name: "Conversational Commerce Agent",
      type: "Voice Commerce",
      position: { x: 700, y: 550 },
      icon: <MessageSquare className="w-4 h-4" />,
      color: "bg-green-500/20 border-green-500/40 text-green-400"
    },
    {
      id: "llm-content-intelligence",
      name: "LLM Content Intelligence Agent",
      type: "Content AI",
      position: { x: 900, y: 550 },
      icon: <FileText className="w-4 h-4" />,
      color: "bg-amber-500/20 border-amber-500/40 text-amber-400"
    }
  ];

  const interactions = [
    // Core Scheduling & Operations
    {
      id: "emergency-scheduling",
      from: "emergency",
      to: "scheduling",
      trigger: "Emergency appointment needed",
      frequency: "As needed",
      dataFlow: "Priority level, location, technician requirements",
      color: "stroke-red-400"
    },
    {
      id: "communication-scheduling", 
      from: "communication",
      to: "scheduling",
      trigger: "New appointment request",
      frequency: "Continuous",
      dataFlow: "Customer preferences, timing, service type",
      color: "stroke-green-400"
    },
    {
      id: "scheduling-routing",
      from: "scheduling",
      to: "routing",
      trigger: "Schedule changes",
      frequency: "Real-time",
      dataFlow: "Updated appointments, technician assignments",
      color: "stroke-blue-400"
    },
    {
      id: "scheduling-technician",
      from: "scheduling",
      to: "technician",
      trigger: "Schedule updates",
      frequency: "Continuous",
      dataFlow: "Job assignments, timing changes, customer info",
      color: "stroke-blue-400"
    },
    // Parts & Inventory Flow
    {
      id: "parts-prediction-technician-mgmt",
      from: "parts-prediction",
      to: "technician-management",
      trigger: "Low-frequency parts verification needed",
      frequency: "As needed",
      dataFlow: "Circumstance-specific prompts, accuracy tracking",
      color: "stroke-cyan-400"
    },
    {
      id: "technician-mgmt-technician",
      from: "technician-management",
      to: "technician",
      trigger: "Field verification prompts",
      frequency: "During jobs",
      dataFlow: "Condition checks, performance guidance",
      color: "stroke-rose-400"
    },
    {
      id: "parts-prediction-inventory",
      from: "parts-prediction",
      to: "inventory",
      trigger: "High-turnover parts identification",
      frequency: "Weekly",
      dataFlow: "Truck inventory recommendations (30-day turnover)",
      color: "stroke-cyan-400"
    },
    {
      id: "parts-prediction-ordering",
      from: "parts-prediction",
      to: "parts-ordering",
      trigger: "Direct-ship order generation",
      frequency: "Real-time",
      dataFlow: "Parts list, supplier selection, customer address",
      color: "stroke-cyan-400"
    },
    {
      id: "hvac-parts-prediction",
      from: "hvac-diagnostics",
      to: "parts-prediction",
      trigger: "Diagnostic completion with job code",
      frequency: "Continuous",
      dataFlow: "Job codes, equipment models, failure patterns",
      color: "stroke-teal-400"
    },
    // Order Management & Tracking
    {
      id: "outstanding-orders-communication",
      from: "outstanding-orders",
      to: "communication",
      trigger: "Order status updates needed",
      frequency: "Continuous",
      dataFlow: "Order status, delivery timelines, completion notifications",
      color: "stroke-violet-400"
    },
    {
      id: "technician-outstanding-orders",
      from: "technician",
      to: "outstanding-orders",
      trigger: "Job progress updates",
      frequency: "Real-time",
      dataFlow: "Progress reports, completion status, issues encountered",
      color: "stroke-orange-400"
    },
    {
      id: "parts-ordering-outstanding-orders",
      from: "parts-ordering",
      to: "outstanding-orders",
      trigger: "Parts delivery updates",
      frequency: "Daily",
      dataFlow: "Delivery confirmations, tracking info, delays",
      color: "stroke-amber-400"
    },
    // Analytics & Performance
    {
      id: "technician-analytics",
      from: "technician",
      to: "analytics",
      trigger: "Job completion",
      frequency: "After each job",
      dataFlow: "Time logs, performance data, customer feedback",
      color: "stroke-orange-400"
    },
    {
      id: "analytics-technician-mgmt",
      from: "analytics",
      to: "technician-management",
      trigger: "Performance insights available",
      frequency: "Weekly",
      dataFlow: "Individual performance metrics, accuracy trends",
      color: "stroke-red-400"
    },
    {
      id: "analytics-regional",
      from: "analytics",
      to: "regional",
      trigger: "Geographic performance analysis",
      frequency: "Monthly",
      dataFlow: "Area-specific metrics, market opportunities",
      color: "stroke-red-400"
    },
    {
      id: "regional-analytics",
      from: "regional",
      to: "analytics",
      trigger: "Planning area performance data",
      frequency: "Daily",
      dataFlow: "430 planning area metrics, regional trends, benchmarking data",
      color: "stroke-indigo-400"
    },
    {
      id: "parts-prediction-analytics",
      from: "parts-prediction",
      to: "analytics",
      trigger: "Parts demand analysis",
      frequency: "Continuous",
      dataFlow: "Parts usage patterns, demand forecasting, inventory optimization",
      color: "stroke-cyan-400"
    },
    {
      id: "communication-analytics",
      from: "communication",
      to: "analytics",
      trigger: "Customer interaction completion",
      frequency: "Real-time",
      dataFlow: "Customer satisfaction, call resolution data, communication effectiveness",
      color: "stroke-green-400"
    },
    {
      id: "hvac-analytics",
      from: "hvac-diagnostics",
      to: "analytics",
      trigger: "Diagnostic completion",
      frequency: "After each diagnosis",
      dataFlow: "System performance data, energy efficiency metrics, failure patterns",
      color: "stroke-teal-400"
    },
    // New connections for missing agents
    {
      id: "parts-prediction-regional",
      from: "parts-prediction",
      to: "regional",
      trigger: "Regional demand patterns",
      frequency: "Weekly",
      dataFlow: "Area-specific parts demand, seasonal variations, supply optimization",
      color: "stroke-cyan-400"
    },
    {
      id: "hvac-to-parts-prediction",
      from: "hvac-diagnostics",
      to: "parts-prediction",
      trigger: "Equipment diagnosis",
      frequency: "After each diagnosis",
      dataFlow: "Equipment failure patterns, parts replacement schedules, warranty data",
      color: "stroke-teal-400"
    },
    {
      id: "communication-parts-prediction",
      from: "communication",
      to: "parts-prediction",
      trigger: "Customer service requests",
      frequency: "Real-time",
      dataFlow: "Service type patterns, customer equipment data, urgency levels",
      color: "stroke-green-400"
    },
    // Quality & Safety
    {
      id: "quality-assurance-analytics",
      from: "quality-assurance",
      to: "analytics",
      trigger: "Quality assessments completed",
      frequency: "After each job",
      dataFlow: "Quality scores, compliance data, improvement recommendations",
      color: "stroke-emerald-400"
    },
    {
      id: "electrical-safety-technician-mgmt",
      from: "electrical-safety",
      to: "technician-management",
      trigger: "Safety compliance checks",
      frequency: "Before electrical jobs",
      dataFlow: "Certification verification, safety protocols",
      color: "stroke-yellow-600"
    },
    // Dispatch & Coordination
    {
      id: "plumbing-dispatch-technician",
      from: "plumbing-dispatch",
      to: "technician",
      trigger: "Plumbing job assignments",
      frequency: "Continuous",
      dataFlow: "Job details, customer info, service updates",
      color: "stroke-blue-600"
    },
    {
      id: "maintenance-scheduler-scheduling",
      from: "maintenance-scheduler",
      to: "scheduling",
      trigger: "Preventive maintenance scheduling",
      frequency: "Daily",
      dataFlow: "Maintenance windows, customer schedules, equipment history",
      color: "stroke-slate-400"
    },
    // Marketing & Customer Acquisition Connections
    {
      id: "d2c-marketing-communication",
      from: "d2c-marketing",
      to: "communication",
      trigger: "Lead qualification and handoff",
      frequency: "Continuous",
      dataFlow: "Qualified leads, customer acquisition sources, conversion data",
      color: "stroke-emerald-400"
    },
    {
      id: "d2c-marketing-analytics",
      from: "d2c-marketing",
      to: "analytics",
      trigger: "Marketing ROI analysis",
      frequency: "Daily",
      dataFlow: "SEO rankings, LLM visibility metrics, conversion rates, customer acquisition costs",
      color: "stroke-emerald-400"
    },
    {
      id: "d2c-marketing-geo-marketing",
      from: "d2c-marketing",
      to: "geo-marketing",
      trigger: "Area-specific marketing insights",
      frequency: "Daily",
      dataFlow: "Geographic search trends, local SEO performance, area-specific conversion data",
      color: "stroke-emerald-400"
    },
    {
      id: "b2b-relationship-regional",
      from: "b2b-relationship",
      to: "regional",
      trigger: "Area-specific relationship insights",
      frequency: "Daily",
      dataFlow: "Territory performance impact on client relationships, retention metrics",
      color: "stroke-violet-400"
    },
    {
      id: "b2b-relationship-analytics",
      from: "b2b-relationship",
      to: "analytics",
      trigger: "Client performance reporting",
      frequency: "Weekly",
      dataFlow: "B2B client satisfaction, relationship health metrics, territory-based revenue",
      color: "stroke-violet-400"
    },
    {
      id: "b2b-relationship-communication",
      from: "b2b-relationship",
      to: "communication",
      trigger: "B2B client communication coordination",
      frequency: "Continuous",
      dataFlow: "Client relationship updates, communication preferences, escalation protocols",
      color: "stroke-violet-400"
    },
    {
      id: "geo-marketing-analytics",
      from: "geo-marketing",
      to: "analytics",
      trigger: "Geographic performance analysis",
      frequency: "Daily",
      dataFlow: "430 planning area marketing metrics, ROI by region, market opportunity analysis",
      color: "stroke-rose-400"
    },
    {
      id: "geo-marketing-regional",
      from: "geo-marketing",
      to: "regional",
      trigger: "Territory performance coordination",
      frequency: "Continuous",
      dataFlow: "Marketing spend optimization by area, geographic performance correlation",
      color: "stroke-rose-400"
    },
    {
      id: "b2b-relationship-geo-marketing",
      from: "b2b-relationship",
      to: "geo-marketing",
      trigger: "Territory performance impact on relationships",
      frequency: "Daily",
      dataFlow: "Geographic relationship impact, area-specific client retention data",
      color: "stroke-violet-400"
    },
    // Technician Lifecycle Interactions
    {
      id: "recruiting-training",
      from: "technician-recruiting",
      to: "technician-training",
      trigger: "New hire onboarding",
      frequency: "Per new hire",
      dataFlow: "Candidate profiles, skill assessments, training plans",
      color: "stroke-indigo-400"
    },
    {
      id: "training-retention",
      from: "technician-training",
      to: "technician-retention",
      trigger: "Training completion analysis",
      frequency: "Weekly",
      dataFlow: "Learning progress, performance predictions, engagement metrics",
      color: "stroke-blue-400"
    },
    {
      id: "retention-recruiting",
      from: "technician-retention",
      to: "technician-recruiting",
      trigger: "Retention insights for hiring",
      frequency: "Monthly",
      dataFlow: "Successful hire profiles, retention factors, recruitment optimization",
      color: "stroke-purple-400"
    },
    {
      id: "analytics-recruiting",
      from: "analytics",
      to: "technician-recruiting",
      trigger: "Performance data for hiring criteria",
      frequency: "Weekly",
      dataFlow: "Top performer characteristics, skill gap analysis, regional needs",
      color: "stroke-red-400"
    },
    // LLM Marketing Intelligence Interactions
    {
      id: "llm-recommendation-analytics",
      from: "llm-recommendation",
      to: "analytics",
      trigger: "LLM performance tracking",
      frequency: "Real-time",
      dataFlow: "Recommendation effectiveness, conversion rates, platform dominance metrics",
      color: "stroke-emerald-400"
    },
    {
      id: "ai-b2b-regional",
      from: "ai-b2b-intelligence",
      to: "regional",
      trigger: "B2B opportunity analysis",
      frequency: "Daily",
      dataFlow: "B2B performance by region, relationship intelligence, market penetration",
      color: "stroke-violet-400"
    },
    {
      id: "hyper-local-regional",
      from: "hyper-local-llm",
      to: "regional",
      trigger: "Local market intelligence",
      frequency: "Continuous",
      dataFlow: "Hyper-local performance, competitive analysis, market opportunities",
      color: "stroke-cyan-400"
    },
    {
      id: "conversational-communication",
      from: "conversational-commerce",
      to: "communication",
      trigger: "Voice commerce integration",
      frequency: "Real-time",
      dataFlow: "Voice interaction optimization, conversation flow data, customer preferences",
      color: "stroke-green-400"
    },
    {
      id: "content-intelligence-analytics",
      from: "llm-content-intelligence",
      to: "analytics",
      trigger: "Content performance analysis",
      frequency: "Daily",
      dataFlow: "Content effectiveness, discovery metrics, prompt optimization data",
      color: "stroke-amber-400"
    }
  ];

  const getPath = (from: any, to: any) => {
    const fromAgent = agents.find(a => a.id === from);
    const toAgent = agents.find(a => a.id === to);
    if (!fromAgent || !toAgent) return "";

    // Calculate curved path with proper SVG coordinates
    const startX = fromAgent.position.x + 60; // Center of node
    const startY = fromAgent.position.y + 30;
    const endX = toAgent.position.x + 60;
    const endY = toAgent.position.y + 30;
    
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const controlY = midY - Math.abs(endX - startX) * 0.2; // Dynamic curve based on distance

    return `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;
  };

  const triggers = [
    {
      category: "Real-time Triggers",
      items: [
        { name: "Emergency Service Request", agents: ["Emergency Response", "Advanced Scheduling"], impact: "Immediate rescheduling and resource allocation" },
        { name: "Customer Appointment Change", agents: ["Customer Communication", "Advanced Scheduling", "Route Optimization"], impact: "Schedule adjustment and route recalculation" },
        { name: "Technician Status Update", agents: ["Technician Hub", "Advanced Scheduling"], impact: "Real-time availability updates" },
        { name: "Parts Stock Alert", agents: ["Inventory Management", "Parts Prediction"], impact: "Automatic reorder and demand adjustment" }
      ]
    },
    {
      category: "Scheduled Triggers", 
      items: [
        { name: "Daily Performance Analysis", agents: ["Performance Analytics", "All Agents"], impact: "Performance optimization recommendations" },
        { name: "Weekly Route Optimization", agents: ["Route Optimization", "Analytics"], impact: "Efficiency improvements and cost reduction" },
        { name: "Monthly Demand Forecasting", agents: ["Parts Prediction", "Regional Monitor"], impact: "Long-term inventory and capacity planning" },
        { name: "Customer Satisfaction Review", agents: ["Communication Hub", "Quality Assurance"], impact: "Service quality improvements" }
      ]
    },
    {
      category: "Event-driven Triggers",
      items: [
        { name: "Job Completion", agents: ["Technician Hub", "Quality Assurance", "Analytics"], impact: "Quality review and performance tracking" },
        { name: "Equipment Failure Pattern", agents: ["HVAC Diagnostics", "Parts Prediction"], impact: "Proactive maintenance scheduling" },
        { name: "Customer Complaint", agents: ["Communication Hub", "Quality Assurance"], impact: "Service recovery and process improvement" },
        { name: "Technician Skill Update", agents: ["Technician Hub", "Advanced Scheduling"], impact: "Optimized job assignments based on capabilities" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Interactive Mindmap */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Network className="w-5 h-5 mr-2 text-blue-400" />
            Agent Interaction Network
          </CardTitle>
          <p className="text-gray-400">Interactive diagram showing real-time agent communications and data flows</p>
        </CardHeader>
        <CardContent>
          <div className="relative w-full bg-gray-900/50 rounded-lg overflow-hidden" style={{ height: "600px" }}>
            {/* Agent Nodes as HTML elements */}
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`absolute w-32 h-16 rounded-lg border-2 p-2 cursor-pointer transition-all hover:scale-105 ${agent.color} ${
                  hoveredAgent === agent.id ? 'ring-2 ring-white/50 z-20' : 'z-10'
                }`}
                style={{
                  left: `${(agent.position.x / 1000) * 100}%`,
                  top: `${(agent.position.y / 600) * 100}%`,
                }}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
                onClick={() => {
                  const relatedConnections = interactions.filter(i => i.from === agent.id || i.to === agent.id);
                  if (relatedConnections.length > 0) {
                    setSelectedInteraction(relatedConnections[0].id);
                  }
                }}
              >
                <div className="flex items-center mb-1">
                  {agent.icon}
                  <span className="ml-1 text-xs font-medium text-white truncate">
                    {agent.name.split(' ')[0]}
                  </span>
                </div>
                <p className="text-xs text-gray-300 truncate">{agent.type.split(' ')[0]}</p>
              </div>
            ))}

            {/* Connection Lines as SVG overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    className="fill-blue-400"
                  />
                </marker>
              </defs>
              
              {/* Connection Lines */}
              {interactions.map((interaction) => (
                <path
                  key={interaction.id}
                  d={getPath(interaction.from, interaction.to)}
                  className={`${interaction.color} fill-none stroke-2 ${
                    hoveredAgent && (hoveredAgent === interaction.from || hoveredAgent === interaction.to) 
                      ? 'opacity-100' 
                      : 'opacity-40'
                  } pointer-events-auto cursor-pointer`}
                  markerEnd="url(#arrowhead)"
                  strokeDasharray="5,5"
                  onClick={() => setSelectedInteraction(interaction.id)}
                />
              ))}
            </svg>
          </div>

          {/* Interaction Details */}
          {(selectedInteraction || hoveredAgent) && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
              {selectedInteraction ? (() => {
                const interaction = interactions.find(i => i.id === selectedInteraction);
                const fromAgent = agents.find(a => a.id === interaction?.from);
                const toAgent = agents.find(a => a.id === interaction?.to);
                
                return (
                  <div>
                    <h4 className="text-white font-medium mb-2">Connection Details</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">From</p>
                        <p className="text-white">{fromAgent?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">To</p>
                        <p className="text-white">{toAgent?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Trigger</p>
                        <p className="text-white">{interaction?.trigger}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Frequency</p>
                        <p className="text-white">{interaction?.frequency}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-400">Data Flow</p>
                      <p className="text-white">{interaction?.dataFlow}</p>
                    </div>
                  </div>
                );
              })() : hoveredAgent && (() => {
                const agent = agents.find(a => a.id === hoveredAgent);
                const relatedConnections = interactions.filter(i => i.from === hoveredAgent || i.to === hoveredAgent);
                
                return (
                  <div>
                    <h4 className="text-white font-medium mb-2">Agent Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-400">Name</p>
                        <p className="text-white">{agent?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Type</p>
                        <p className="text-white">{agent?.type}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Connected to {relatedConnections.length} other agents</p>
                      <p className="text-white text-xs mt-1">Click connection lines for detailed interaction information</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trigger Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {triggers.map((category, index) => (
          <Card key={index} className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white text-lg">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{item.name}</h4>
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Involved Agents</p>
                      <div className="flex flex-wrap gap-1">
                        {item.agents.map((agent, agentIndex) => (
                          <Badge key={agentIndex} variant="outline" className="text-xs">
                            {agent}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Impact</p>
                      <p className="text-xs text-gray-300">{item.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Flow Legend */}
      <Card className="bg-dark-card border-dark-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="w-5 h-5 mr-2 text-gray-400" />
            Data Flow Types & Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="text-blue-400 font-medium mb-2">Real-time Updates</h4>
              <p className="text-xs text-gray-400">Immediate data synchronization for critical operations like emergency dispatch and schedule changes.</p>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="text-green-400 font-medium mb-2">Customer Data</h4>
              <p className="text-xs text-gray-400">Secure customer information flow including preferences, history, and communication logs.</p>
            </div>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <h4 className="text-purple-400 font-medium mb-2">Performance Metrics</h4>
              <p className="text-xs text-gray-400">Analytics data including efficiency scores, completion times, and quality assessments.</p>
            </div>
            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <h4 className="text-orange-400 font-medium mb-2">Predictive Insights</h4>
              <p className="text-xs text-gray-400">Machine learning predictions for parts demand, scheduling optimization, and resource allocation.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}