import { Link, useLocation } from "wouter";
import { 
  BarChart3, 
  Bot, 
  ChartBar, 
  ClipboardCheck, 
  DollarSign, 
  Book,
  BookOpen,
  Home,
  Circle,
  Command,
  Users,
  Building2,
  Building,
  AlertTriangle,
  Heart,
  Shield,
  Target,
  Eye,
  Gamepad2,
  Phone,
  Database,
  MapPin,
  Settings,
  ChevronDown,
  ChevronRight,
  Presentation,
  FileText,
  Menu,
  X,
  Brain,
  MessageSquare,
  Zap,
  Package,
  Network,
  HelpCircle,
  GraduationCap,
  LogOut,
  UserCog
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  href: string;
  icon: any;
  label: string;
  permission?: string;
}

export default function Sidebar() {
  const [location] = useLocation();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['core', 'executive', 'operations', 'analytics', 'strategic']));
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout, hasPermission } = useAuth();

  // Check if mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSection = (sectionKey: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionKey)) {
      newExpanded.delete(sectionKey);
    } else {
      newExpanded.add(sectionKey);
    }
    setExpandedSections(newExpanded);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  const navSections = [
    {
      key: 'core',
      title: 'Core Operations',
      icon: Home,
      items: [
        { href: "/dashboard", icon: BarChart3, label: "Dashboard", permission: "view_dashboard" },
        { href: "/executive-operations", icon: Settings, label: "Executive Operations Center", permission: "view_executive_operations" },
        { href: "/live-activity", icon: Zap, label: "Live AI Agent Activity Feed", permission: "view_live_activity" },
        { href: "/planning-area-agents", icon: MapPin, label: "Planning Area Agent Dashboard", permission: "view_planning_areas" },
        { href: "/technician-management", icon: Users, label: "Technician Management", permission: "view_technician_mgmt" },
        { href: "/technician-retention", icon: Brain, label: "Technician Retention Intelligence", permission: "view_retention" },
        { href: "/coaching-engine", icon: GraduationCap, label: "Coaching Engine", permission: "view_coaching" },
        { href: "/magik-button", icon: Zap, label: "Magik Button Use Cases", permission: "view_magik_button" },
        { href: "/magik-button-cross-system", icon: Network, label: "Magik Button Cross-System", permission: "view_magik_button" },
        { href: "/magik-button-templates", icon: Settings, label: "Magik Button Template Manager", permission: "view_magik_button" },
        { href: "/agents", icon: Bot, label: "Agent Roster", permission: "view_agents" },
        { href: "/americas-home-manager", icon: Home, label: "Americas Home Manager", permission: "view_home_manager" },
        { href: "/predictive-warnings", icon: AlertTriangle, label: "Predictive Warnings", permission: "view_predictive_warnings" },
      ]
    },
    {
      key: 'executive',
      title: 'Executive Leadership',
      icon: Command,
      items: [
        { href: "/board-presentations", icon: Presentation, label: "Board Presentations", permission: "view_board_presentations" },
        { href: "/executive-orchestration", icon: Command, label: "Executive Orchestration", permission: "view_executive_orchestration" },
        { href: "/financial-intelligence", icon: DollarSign, label: "Financial Intelligence", permission: "view_financial_intelligence" },
        { href: "/financial-intelligence-dashboard", icon: BarChart3, label: "Financial P&L Dashboard", permission: "view_financial_dashboard" },
        { href: "/financial-goal-setting", icon: Target, label: "Financial Goal Setting", permission: "view_financial_goals" },
        { href: "/llm-marketing", icon: Brain, label: "LLM Marketing Intelligence", permission: "view_llm_marketing" },
        { href: "/call-center-scheduling", icon: Phone, label: "Call Center Scheduling", permission: "view_call_center" },
        { href: "/call-disposition", icon: Phone, label: "Call Disposition Analysis", permission: "view_call_disposition" },
        { href: "/completed-orders", icon: ClipboardCheck, label: "Completed Orders Management", permission: "view_completed_orders" },
      ]
    },
    {
      key: 'operations',
      title: 'Business Operations',
      icon: Building2,
      items: [
        { href: "/performance", icon: ChartBar, label: "Performance Analytics" },
        { href: "/technician-empowerment", icon: Users, label: "Technician Empowerment" },
        { href: "/parts-order-management", icon: Package, label: "Parts Order Management" },
        { href: "/job-code-performance", icon: BarChart3, label: "Job Code Performance" },
        { href: "/b2b-client-management", icon: Building2, label: "B2B Client Management" },
        { href: "/weekly-automated-reporting", icon: FileText, label: "Weekly Automated Reporting" },
        { href: "/accessible-home-management", icon: Heart, label: "Accessible Home Management" },
        { href: "/contractor-management", icon: Building2, label: "1099 Contractor Management" },
        { href: "/home-services", icon: Building2, label: "Home Services" },
        { href: "/hoa-program", icon: Building, label: "HOA Partnership Program" },
        { href: "/contractor-recruitment", icon: Users, label: "🔧 1099 Contractor Recruitment" },
        { href: "/alerts", icon: AlertTriangle, label: "Performance Alerts" },
      ]
    },
    {
      key: 'analytics',
      title: 'Analytics & Intelligence',
      icon: Eye,
      items: [
        { href: "/prompt-heatmap", icon: BarChart3, label: "Prompt Performance Heatmap", permission: "view_prompt_heatmap" },
        { href: "/prompt-analytics", icon: BarChart3, label: "Prompt Performance Analytics", permission: "view_prompt_analytics" },
        { href: "/business-knowledge", icon: Database, label: "Business Knowledge System", permission: "view_business_knowledge" },
        { href: "/agent-metrics-guide", icon: HelpCircle, label: "Agent Metrics Guide", permission: "view_agent_metrics" },
        { href: "/data-visualization", icon: Eye, label: "Data Visualization", permission: "view_data_visualization" },
        { href: "/financials", icon: DollarSign, label: "Financial Metrics", permission: "view_financial_metrics" },
      ]
    },
    {
      key: 'strategic',
      title: 'Strategic & Administrative',
      icon: Target,
      items: [
        { href: "/documentation", icon: FileText, label: "Operations Documentation", permission: "view_documentation" },
        { href: "/navigation-tutorials", icon: BookOpen, label: "Navigation Tutorials", permission: "view_documentation" },
        { href: "/gamification-agent", icon: Gamepad2, label: "Gamification Intelligence", permission: "view_gamification" },
        { href: "/project-management", icon: Target, label: "Strategic Projects", permission: "view_project_management" },
        { href: "/evaluations", icon: ClipboardCheck, label: "Evaluations", permission: "view_evaluations" },
        { href: "/business-excellence", icon: Shield, label: "Business Excellence", permission: "view_business_excellence" },
        { href: "/predictive-demos", icon: AlertTriangle, label: "Warning Demonstrations", permission: "view_predictive_demos" },
      ]
    }
  ];

  // Add admin section if user has admin permissions
  if (hasPermission && hasPermission('manage_users')) {
    navSections.push({
      key: 'admin',
      title: 'System Administration',
      icon: Shield,
      items: [
        { href: "/user-management", icon: UserCog, label: "User Management", permission: "manage_users" },
      ]
    });
  }

  return (
    <>
      {/* Mobile Header with Menu Button */}
      {isMobile && (
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-dark-card border-b border-dark-border p-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold gradient-text">America's Home Manager</h1>
          </div>
          <button
            onClick={toggleMobile}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors-smooth"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300" onClick={closeMobile}>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-dark-card border-r border-dark-border p-6 hidden lg:block transition-all-smooth h-screen overflow-y-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold gradient-text">America's Home Manager</h1>
          <p className="text-gray-400 text-sm mt-1">AI-First National Infrastructure</p>
        </div>
        
        <nav className="space-y-1 flex-1">
          {navSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            const isExpanded = expandedSections.has(section.key);
            
            return (
              <div key={section.key} className="space-y-1 animate-slide-up" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between p-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all-smooth transform hover:scale-105"
                >
                  <div className="flex items-center">
                    <SectionIcon className="w-4 h-4 mr-2" />
                    {section.title}
                  </div>
                  <div className={`transition-transform-smooth ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="ml-6 space-y-1 pt-1">
                    {section.items
                      .map((item, itemIndex) => {
                        const Icon = item.icon;
                        const isActive = location === item.href || (item.href === "/dashboard" && location === "/");
                        
                        return (
                          <Link key={item.href} href={item.href}>
                            <span 
                              className={`sidebar-link ${isActive ? 'active' : ''} text-sm animate-slide-left`}
                              style={{ animationDelay: `${(sectionIndex * 0.1) + (itemIndex * 0.05)}s` }}
                              title={item.label}
                            >
                              <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                              {item.label}
                            </span>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        
        {/* User Profile Section */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg transition-all-smooth animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-md transition-colors-smooth"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-800 rounded-lg transition-all-smooth hover:bg-gray-750 animate-fade-in">
          <h3 className="text-sm font-medium text-gray-300 mb-2">System Status</h3>
          <div className="flex items-center">
            <Circle className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse fill-current text-green-500" />
            <span className="text-sm text-gray-400">All Systems Operational</span>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-dark-card border-r border-dark-border z-50 transform transition-transform-smooth ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-bold gradient-text">America's Home Manager</h1>
              <p className="text-gray-400 text-sm mt-1">AI-First National Infrastructure</p>
            </div>
            <button
              onClick={closeMobile}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors-smooth"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
            {navSections.map((section, sectionIndex) => {
              const SectionIcon = section.icon;
              const isExpanded = expandedSections.has(section.key);
              
              return (
                <div key={section.key} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="w-full flex items-center justify-between p-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-all-smooth"
                  >
                    <div className="flex items-center">
                      <SectionIcon className="w-4 h-4 mr-2" />
                      {section.title}
                    </div>
                    <div className={`transition-transform-smooth ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-6 space-y-1 pt-1">
                      {section.items
                        .map((item) => {
                          const Icon = item.icon;
                          const isActive = location === item.href || (item.href === "/dashboard" && location === "/");
                          
                          return (
                            <Link key={item.href} href={item.href} onClick={closeMobile}>
                              <span className={`sidebar-link ${isActive ? 'active' : ''} text-sm`}>
                                <Icon className="w-4 h-4 mr-3" />
                                {item.label}
                              </span>
                            </Link>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
          
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-sm font-medium text-gray-300 mb-2">System Status</h3>
            <div className="flex items-center">
              <Circle className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse fill-current text-green-500" />
              <span className="text-sm text-gray-400">All Systems Operational</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
