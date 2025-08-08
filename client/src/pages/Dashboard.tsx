import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/Sidebar";
import KPIGrid from "@/components/KPIGrid";
import AgentCard from "@/components/AgentCard";
import PerformanceCharts from "@/components/PerformanceCharts";
import EvaluationSection from "@/components/EvaluationSection";
import DocumentationBrowser from "@/components/DocumentationBrowser";
import ProgressTrackingDashboard from "@/components/ProgressTrackingDashboard";
import ConversationalMetrics from "@/components/ConversationalMetrics";
import BusinessOperationsCoverage from "@/components/BusinessOperationsCoverage";
import { LLMMetricsDashboard } from "@/components/LLMMetricsDashboard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Plus, Download, User, ClipboardList } from "lucide-react";
import { Link } from "wouter";
import OnboardingSettings from "@/components/OnboardingSettings";
import HistoricalDataDashboard from "@/components/HistoricalDataDashboard";
import type { Agent } from "@shared/schema";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const [showAddAgentForm, setShowAddAgentForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const agentsRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  const { data: agents = [], isLoading: agentsLoading } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  const { data: stats, isLoading: statsLoading } = useQuery<{
    totalAgents: number;
    activeAgents: number;
    avgPerformance: number;
    monthlyCost: number;
    totalRevenue: number;
  }>({
    queryKey: ["/api/dashboard/stats"],
  });

  // Filter agents based on search term and status
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Scroll to agents section when search/filter changes and there are results
  useEffect(() => {
    if ((searchTerm || statusFilter !== "all") && filteredAgents.length > 0 && agentsRef.current) {
      setTimeout(() => {
        agentsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [searchTerm, statusFilter, filteredAgents.length]);

  if (agentsLoading || statsLoading) {
    return (
      <div className="flex min-h-screen bg-dark">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const handleAddAgent = () => {
    setShowAddAgentForm(true);
    // In a real implementation, this would open a modal or navigate to agent creation form
    alert("Add Agent functionality - In a real implementation, this would open a form to create new AI agents with customizable parameters, training data, and operational roles.");
  };

  const handleExportData = () => {
    // In a real implementation, this would export agent performance data
    alert("Export Data functionality - In a real implementation, this would generate and download comprehensive agent performance reports, metrics, and analytics data in CSV or Excel format.");
  };

  return (
    <div className="flex min-h-screen bg-dark text-gray-200">
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden pt-16 lg:pt-0">
        {/* Header */}
        <header className="bg-dark-card border-b border-dark-border p-responsive animate-fade-in">
          <div className="container-responsive">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="animate-slide-up">
                <h1 className="text-responsive-xl font-bold text-white">Home Services AI Management</h1>
                <p className="text-gray-400 mt-1 text-sm sm:text-base">Monitor field operations, track performance, and optimize your home services AI agents</p>
              </div>
            
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-slide-down">
                {/* Search Bar */}
                <div className="relative flex-1 sm:flex-initial">
                  <Input 
                    type="text" 
                    placeholder="Search agents..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-primary w-full sm:w-64 transition-all-smooth focus:scale-105"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                
                {/* Filter Dropdown */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-700 text-white border-gray-600 w-full sm:w-32 transition-all-smooth hover:scale-105">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* User Profile & Settings */}
                <div className="flex items-center gap-3">
                  <OnboardingSettings />
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
                      <User className="text-white w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-white">
                        {user?.displayName || `${user?.firstName} ${user?.lastName}`.trim() || user?.username}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">{user?.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-responsive">
          <div className="container-responsive space-y-6 animate-fade-in">
            {/* KPI Overview */}
            <div className="animate-slide-up">
              <KPIGrid stats={stats} />
            </div>

            {/* Home Services Operations Overview */}
            <div className="grid grid-responsive-3 gap-responsive animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="lg:col-span-2 kpi-card">
                <h3 className="text-responsive-lg font-semibold text-white mb-4">Field Operations Metrics</h3>
                <div className="grid grid-responsive-4 gap-4">
                  <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <p className="text-xl sm:text-2xl font-bold text-blue-400">28</p>
                    <p className="text-xs sm:text-sm text-gray-400">Emergency Calls Today</p>
                  </div>
                  <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <p className="text-xl sm:text-2xl font-bold text-green-400">94.2%</p>
                    <p className="text-xs sm:text-sm text-gray-400">Schedule Efficiency</p>
                  </div>
                  <div className="text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
                    <p className="text-xl sm:text-2xl font-bold text-purple-400">6.8 min</p>
                    <p className="text-xs sm:text-sm text-gray-400">Avg Response Time</p>
                  </div>
                  <div className="text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
                    <p className="text-xl sm:text-2xl font-bold text-orange-400">$42K</p>
                    <p className="text-xs sm:text-sm text-gray-400">Daily Revenue</p>
                  </div>
                </div>
              </div>
              
              <div className="kpi-card animate-slide-right" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-responsive-lg font-semibold text-white mb-4">Service Areas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center transition-colors-smooth hover:bg-gray-700/30 p-2 rounded">
                    <span className="text-gray-400">Plumbing</span>
                    <span className="text-white font-medium">42 active jobs</span>
                  </div>
                  <div className="flex justify-between items-center transition-colors-smooth hover:bg-gray-700/30 p-2 rounded">
                    <span className="text-gray-400">HVAC</span>
                    <span className="text-white font-medium">28 active jobs</span>
                  </div>
                  <div className="flex justify-between items-center transition-colors-smooth hover:bg-gray-700/30 p-2 rounded">
                    <span className="text-gray-400">Electrical</span>
                    <span className="text-white font-medium">19 active jobs</span>
                  </div>
                  <div className="flex justify-between items-center transition-colors-smooth hover:bg-gray-700/30 p-2 rounded">
                    <span className="text-gray-400">Emergency</span>
                    <span className="text-red-400 font-medium animate-pulse">5 urgent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Charts */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <PerformanceCharts />
            </div>

            {/* Agents Grid */}
            <div ref={agentsRef} className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-responsive-lg font-semibold text-white">AI Agents</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Showing {filteredAgents.length} of {agents.length} agents
                    {searchTerm && ` • Searching for "${searchTerm}"`}
                    {statusFilter !== "all" && ` • Status: ${statusFilter}`}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/completed-orders">
                    <Button className="bg-green-600 hover:bg-green-700 text-white transition-all-smooth transform hover:scale-105">
                      <ClipboardList className="w-4 h-4 mr-2" />
                      Completed Orders
                    </Button>
                  </Link>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white transition-all-smooth transform hover:scale-105"
                    onClick={handleAddAgent}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Agent
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 transition-all-smooth transform hover:scale-105"
                    onClick={handleExportData}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-responsive-3 gap-responsive">
                {filteredAgents.length > 0 ? (
                  filteredAgents.map((agent, index) => (
                    <div 
                      key={agent.id} 
                      className="animate-slide-up"
                      style={{ animationDelay: `${0.5 + (index * 0.05)}s` }}
                    >
                      <AgentCard agent={agent} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-400 text-lg">No agents found matching your search criteria</p>
                    <p className="text-gray-500 text-sm mt-2">Try adjusting your search term or status filter</p>
                  </div>
                )}
              </div>
            </div>

            {/* LLM Marketing Intelligence Preview */}
            <div className="kpi-card animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h3 className="text-responsive-lg font-semibold text-white">LLM Marketing Intelligence</h3>
                <Link href="/llm-marketing" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View Full Dashboard →
                </Link>
              </div>
              <LLMMetricsDashboard />
            </div>

            {/* Conversational AI & Core Features */}
            <div className="kpi-card animate-slide-up" style={{ animationDelay: '0.7s' }}>
              <h3 className="text-responsive-lg font-semibold text-white mb-4">AI Agent Communication & Core Features</h3>
              <ConversationalMetrics />
            </div>

            {/* Business Operations Coverage */}
            <div className="kpi-card animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <h3 className="text-responsive-lg font-semibold text-white mb-4">Complete Business Operations Coverage</h3>
              <BusinessOperationsCoverage />
            </div>

            {/* Progress Tracking & Feedback Loops */}
            <div className="kpi-card animate-slide-up" style={{ animationDelay: '0.9s' }}>
              <h3 className="text-responsive-lg font-semibold text-white mb-4">Lifecycle Management & Improvement Tracking</h3>
              <ProgressTrackingDashboard />
            </div>

            {/* Historical Data Analytics Section */}
            <div className="kpi-card animate-slide-up" style={{ animationDelay: '1.0s' }}>
              <HistoricalDataDashboard />
            </div>

            {/* Documentation Browser */}
            <div className="animate-slide-up" style={{ animationDelay: '1.1s' }}>
              <DocumentationBrowser />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}