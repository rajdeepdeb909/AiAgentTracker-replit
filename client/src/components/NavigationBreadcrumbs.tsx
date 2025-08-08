import React from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavigationBreadcrumbsProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
}

const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = ({ 
  items = [],
  showHome = true 
}) => {
  const [location] = useLocation();
  
  const routeLabels: Record<string, string> = {
    '/': 'Dashboard',
    '/dashboard': 'Dashboard',
    '/executive-operations': 'Executive Operations Center',
    '/board-presentations': 'Board Presentations',
    '/planning-area-agents': 'Planning Area Agent Dashboard',
    '/americas-home-manager': "America's Home Manager",
    '/predictive-warnings': 'Predictive Warnings',
    '/agents': 'Agent Roster',
    '/call-center-scheduling': 'Call Center Scheduling',
    '/executive-orchestration': 'Executive Orchestration',
    '/performance': 'Performance',
    '/financial-intelligence': 'Financial Intelligence',
    '/technician-empowerment': 'Technician Empowerment',
    '/accessible-home-management': 'Accessible Home Management',
    '/contractor-management': '1099 Contractor Management',
    '/home-services': 'Home Services',
    '/prompt-heatmap': 'Prompt Performance Heatmap',
    '/business-knowledge': 'Business Knowledge System',
    '/data-visualization': 'Data Visualization',
    '/financials': 'Financial Metrics',
    '/gamification-agent': 'Gamification Intelligence',
    '/project-management': 'Strategic Projects',
    '/evaluations': 'Evaluations',
    '/business-excellence': 'Business Excellence',
    '/documentation': 'Documentation',
    '/magik-button-templates': 'Magik Button Template Manager'
  };

  // Generate breadcrumbs from current route if no custom items provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items.length > 0) return items;
    
    const pathSegments = location.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [];
    
    if (showHome && location !== '/') {
      breadcrumbs.push({ label: 'Dashboard', href: '/dashboard' });
    }
    
    if (location !== '/' && location !== '/dashboard') {
      const currentLabel = routeLabels[location] || 'Current Page';
      breadcrumbs.push({ label: currentLabel });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
      {showHome && (
        <>
          <Link href="/dashboard">
            <span className="flex items-center hover:text-white transition-colors cursor-pointer">
              <Home className="w-4 h-4" />
            </span>
          </Link>
          {breadcrumbs.length > 0 && <ChevronRight className="w-4 h-4" />}
        </>
      )}
      
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link href={item.href}>
              <span className="hover:text-white transition-colors cursor-pointer">
                {item.label}
              </span>
            </Link>
          ) : (
            <span className="text-white font-medium">
              {item.label}
            </span>
          )}
          
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="w-4 h-4" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default NavigationBreadcrumbs;