import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import Dashboard from "@/pages/Dashboard";
import AgentRoster from "@/pages/AgentRoster";
import Performance from "@/pages/Performance";
import Evaluations from "@/pages/Evaluations";
import Financials from "@/pages/Financials";
import Documentation from "@/pages/Documentation";
import HomeServices from "@/pages/HomeServices";
import NotFound from "@/pages/not-found";
import AmericasHomeManager from "@/components/AmericasHomeManager";
import ExecutiveOrchestration from "@/components/ExecutiveOrchestration";
import TechnicianLifecycle from "@/pages/TechnicianLifecycle";
import TechnicianEmpowerment from "@/pages/TechnicianEmpowerment";
import AccessibleHomeManagement from "@/pages/AccessibleHomeManagement";
import ContractorManagement from "@/pages/ContractorManagement";
import ContractorOnboardingGamification from "@/pages/ContractorOnboardingGamification";
import GamificationAgent from "@/pages/GamificationAgent";
import FinancialIntelligenceAgent from "@/pages/FinancialIntelligenceAgent";
import CallCenterSchedulingAgent from "@/pages/CallCenterSchedulingAgent";
import ProjectManagement from "@/pages/ProjectManagement";
import DataVisualization from "@/pages/DataVisualization";
import { PerformanceAlertSystem } from "@/components/PerformanceAlertSystem";
import BusinessExcellenceFramework from "@/components/BusinessExcellenceFramework";
import AdaptiveOnboardingWizard from "@/components/AdaptiveOnboardingWizard";
import { BusinessKnowledgeSystem } from "@/components/BusinessKnowledgeSystem";
import { PredictiveSchedulingWarnings } from "@/components/PredictiveSchedulingWarnings";
import { PredictiveWarningDemonstrations } from "@/components/PredictiveWarningDemonstrations";
import PromptPerformanceAnalytics from "@/components/PromptPerformanceAnalytics";
import PromptPerformanceHeatmap from "@/components/PromptPerformanceHeatmap";
import PlanningAreaAgentDashboard from "@/components/PlanningAreaAgentDashboard";
import ExecutiveOperationsCenter from "@/components/ExecutiveOperationsCenter";
import BoardPresentations from "@/components/BoardPresentations";
import SimulatedBoardPresentation from "@/components/SimulatedBoardPresentation";
import LLMMarketing from "@/pages/LLMMarketing";
import TechnicianManagementSystem from "@/components/TechnicianManagementSystem";
import FinancialIntelligenceDashboard from "@/components/FinancialIntelligenceDashboard";
import InteractiveFinancialGoalSetting from "@/components/InteractiveFinancialGoalSetting";
import PersonalizedFinancialJourneyProgressRibbon from "@/components/PersonalizedFinancialJourneyProgressRibbon";
import TechnicianRetentionIntelligence from "@/components/TechnicianRetentionIntelligence";
import MagikButtonShowcase from "@/components/MagikButtonShowcase";
import TechnicianMagikAnalytics from "@/pages/TechnicianMagikAnalytics";
import TechnicianManagement from "@/components/TechnicianManagement";
import MagikButtonCrossSystemMonitoring from "@/components/MagikButtonCrossSystemMonitoring";
import MagikButtonTemplateManager from "@/pages/MagikButtonTemplateManager";
import { PartsOrderManagement } from "@/components/PartsOrderManagement";
import WeeklyAutomatedReporting from "@/components/WeeklyAutomatedReporting";
import AgentMetricsGuidePage from "@/pages/AgentMetricsGuide";
import CallDispositionDashboard from "@/components/CallDispositionDashboard";
import CompletedOrdersManagement from "@/components/CompletedOrdersManagement";
import PersonalizedCoachingEngine from "@/components/PersonalizedCoachingEngine";
import PersonWorkTracker from "@/pages/PersonWorkTracker";
import JobCodePerformance from "@/pages/JobCodePerformance";
import HOAProgram from "@/pages/HOAProgram";
import ContractorRecruitment from "@/pages/ContractorRecruitment";
import B2BClientManagement from "@/components/B2BClientManagement";
import LiveActivityFeed from "@/pages/LiveActivityFeed";
import LiveActivityTutorial from "@/pages/LiveActivityTutorial";
import TechnicianManagementTutorial from "@/pages/TechnicianManagementTutorial";
import NavigationTutorials from "@/pages/NavigationTutorials";

function BusinessKnowledgeRoute() {
  const [, setLocation] = useLocation();
  return <BusinessKnowledgeSystem onNavigateBack={() => setLocation('/dashboard')} />;
}

function SmartHomeRoute() {
  const { canAccessRoute } = useAuth();
  
  // Try dashboard first
  if (canAccessRoute('/dashboard')) {
    return (
      <ProtectedRoute routePath="/dashboard">
        <Dashboard />
      </ProtectedRoute>
    );
  }
  
  // Then try agents
  if (canAccessRoute('/agents')) {
    return (
      <ProtectedRoute routePath="/agents">
        <AgentRoster />
      </ProtectedRoute>
    );
  }
  
  // Then try performance
  if (canAccessRoute('/performance')) {
    return (
      <ProtectedRoute routePath="/performance">
        <Performance />
      </ProtectedRoute>
    );
  }
  
  // If no access to major areas, show welcome screen
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to America's Home Manager</h2>
        <p className="text-gray-400">Contact your administrator for access to system features.</p>
      </div>
    </div>
  );
}

function ProtectedRouter() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Switch>
      <Route path="/" component={() => (
        <SmartHomeRoute />
      )} />
      
      <Route path="/user-management" component={() => (
        <ProtectedRoute routePath="/user-management">
          <UserManagement />
        </ProtectedRoute>
      )} />
      
      <Route path="/dashboard" component={() => (
        <ProtectedRoute routePath="/dashboard">
          <Dashboard />
        </ProtectedRoute>
      )} />
      
      <Route path="/technician-lifecycle" component={() => (
        <ProtectedRoute routePath="/technician-lifecycle">
          <TechnicianLifecycle />
        </ProtectedRoute>
      )} />
      
      <Route path="/technician-empowerment" component={() => (
        <ProtectedRoute routePath="/technician-empowerment">
          <TechnicianEmpowerment />
        </ProtectedRoute>
      )} />
      
      <Route path="/contractor-management" component={() => (
        <ProtectedRoute routePath="/contractor-management">
          <ContractorManagement />
        </ProtectedRoute>
      )} />
      
      <Route path="/financials" component={() => (
        <ProtectedRoute routePath="/financials">
          <Financials />
        </ProtectedRoute>
      )} />
      
      <Route path="/evaluations" component={() => (
        <ProtectedRoute routePath="/evaluations">
          <Evaluations />
        </ProtectedRoute>
      )} />
      
      <Route path="/performance" component={() => (
        <ProtectedRoute routePath="/performance">
          <Performance />
        </ProtectedRoute>
      )} />
      
      <Route path="/job-code-performance" component={() => (
        <ProtectedRoute routePath="/job-code-performance">
          <JobCodePerformance />
        </ProtectedRoute>
      )} />
      
      <Route path="/hoa-program" component={() => (
        <ProtectedRoute routePath="/hoa-program">
          <HOAProgram />
        </ProtectedRoute>
      )} />
      
      <Route path="/contractor-recruitment" component={() => (
        <ProtectedRoute routePath="/contractor-management">
          <ContractorRecruitment />
        </ProtectedRoute>
      )} />
      
      <Route path="/parts-order-management" component={() => (
        <ProtectedRoute routePath="/parts-order-management">
          <PartsOrderManagement />
        </ProtectedRoute>
      )} />
      
      <Route path="/live-activity" component={() => (
        <ProtectedRoute routePath="/live-activity">
          <LiveActivityFeed />
        </ProtectedRoute>
      )} />
      
      <Route path="/tutorials/live-activity" component={() => (
        <ProtectedRoute routePath="/tutorials">
          <LiveActivityTutorial />
        </ProtectedRoute>
      )} />
      
      <Route path="/tutorials/technician-management" component={() => (
        <ProtectedRoute routePath="/tutorials">
          <TechnicianManagementTutorial />
        </ProtectedRoute>
      )} />
      
      <Route path="/navigation-tutorials" component={() => (
        <ProtectedRoute routePath="/navigation-tutorials">
          <NavigationTutorials />
        </ProtectedRoute>
      )} />

      {/* Open routes - no specific permissions required */}
      <Route path="/americas-home-manager" component={AmericasHomeManager} />
      <Route path="/executive-orchestration" component={ExecutiveOrchestration} />
      <Route path="/accessible-home-management" component={AccessibleHomeManagement} />
      <Route path="/contractor-onboarding-gamification" component={ContractorOnboardingGamification} />
      <Route path="/gamification-agent" component={GamificationAgent} />
      <Route path="/financial-intelligence" component={FinancialIntelligenceAgent} />
      <Route path="/financial-intelligence-agent" component={FinancialIntelligenceAgent} />
      <Route path="/llm-marketing" component={LLMMarketing} />
      <Route path="/call-center-scheduling" component={CallCenterSchedulingAgent} />
      <Route path="/business-knowledge" component={BusinessKnowledgeRoute} />
      <Route path="/predictive-warnings" component={() => <PredictiveSchedulingWarnings onNavigateBack={() => window.history.back()} />} />
      <Route path="/predictive-demos" component={() => <PredictiveWarningDemonstrations onNavigateBack={() => window.history.back()} />} />
      <Route path="/prompt-analytics" component={() => <PromptPerformanceAnalytics onNavigateBack={() => window.history.back()} />} />
      <Route path="/prompt-performance-heatmap" component={() => <PromptPerformanceHeatmap onNavigateBack={() => window.history.back()} />} />
      <Route path="/prompt-heatmap" component={() => <PromptPerformanceHeatmap onNavigateBack={() => window.history.back()} />} />
      <Route path="/planning-area-agents" component={() => <PlanningAreaAgentDashboard onNavigateBack={() => window.history.back()} />} />
      <Route path="/planning-area-dashboard" component={() => <PlanningAreaAgentDashboard onNavigateBack={() => window.history.back()} />} />
      <Route path="/executive-operations" component={() => <ExecutiveOperationsCenter />} />
      <Route path="/board-presentations" component={() => <BoardPresentations />} />
      <Route path="/simulated-board-presentation" component={() => <SimulatedBoardPresentation />} />
      <Route path="/comprehensive-presentation" component={() => {
        window.open('/comprehensive-board-presentation-2025.html', '_blank');
        return <div className="p-6 text-white">Opening comprehensive presentation...</div>;
      }} />
      <Route path="/technician-management-system" component={() => <TechnicianManagementSystem onNavigateBack={() => window.history.back()} />} />
      <Route path="/technician-management" component={() => <TechnicianManagement onNavigateBack={() => window.history.back()} />} />
      <Route path="/magik-button-cross-system" component={() => <MagikButtonCrossSystemMonitoring />} />
      <Route path="/financial-intelligence-dashboard" component={() => <FinancialIntelligenceDashboard onNavigateBack={() => window.history.back()} />} />
      <Route path="/financial-goal-setting" component={() => <InteractiveFinancialGoalSetting onNavigateBack={() => window.history.back()} />} />
      <Route path="/financial-journey-progress" component={() => <PersonalizedFinancialJourneyProgressRibbon />} />
      <Route path="/technician-retention" component={() => <TechnicianRetentionIntelligence />} />
      <Route path="/magik-button" component={() => <MagikButtonShowcase />} />
      <Route path="/magik-button-showcase" component={() => <MagikButtonShowcase />} />
      <Route path="/technician-magik-analytics" component={() => <TechnicianMagikAnalytics onNavigateBack={() => window.history.back()} />} />
      <Route path="/magik-button-templates" component={() => (
        <ProtectedRoute routePath="/magik-button-templates">
          <MagikButtonTemplateManager />
        </ProtectedRoute>
      )} />
      <Route path="/weekly-automated-reporting" component={() => <WeeklyAutomatedReporting onNavigateBack={() => window.history.back()} />} />
      <Route path="/project-management" component={ProjectManagement} />
      <Route path="/data-visualization" component={DataVisualization} />
      <Route path="/agents" component={AgentRoster} />
      <Route path="/agent-roster" component={AgentRoster} />
      <Route path="/performance" component={Performance} />
      <Route path="/evaluations" component={Evaluations} />
      <Route path="/alerts" component={() => <PerformanceAlertSystem />} />
      <Route path="/business-excellence" component={BusinessExcellenceFramework} />
      <Route path="/financials" component={Financials} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/home-services" component={HomeServices} />
      <Route path="/agent-metrics-guide" component={AgentMetricsGuidePage} />
      <Route path="/call-disposition" component={CallDispositionDashboard} />
      <Route path="/completed-orders" component={CompletedOrdersManagement} />
      <Route path="/coaching-engine" component={PersonalizedCoachingEngine} />
      <Route path="/job-code-performance" component={JobCodePerformance} />
      <Route path="/b2b-client-management" component={B2BClientManagement} />
      <Route path="/hoa-program" component={HOAProgram} />
      <Route path="/contractor-recruitment" component={ContractorRecruitment} />
      <Route path="/person-work-tracker" component={PersonWorkTracker} />
      <Route component={NotFound} />
    </Switch>
  );
}



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="dark">
            <Toaster />
            <ProtectedRouter />
            <AdaptiveOnboardingWizard />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
