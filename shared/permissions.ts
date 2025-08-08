/**
 * Comprehensive Permission System for AI-Agentic Organization
 * Defines all permissions and role-based access control for the platform
 */

// Core permissions for the platform
export const PERMISSIONS = [
  // Dashboard and Overview
  'view_dashboard',
  'view_analytics',
  'export_data',
  
  // Agent Management
  'view_agents',
  'create_agents',
  'edit_agents',
  'delete_agents',
  'execute_agent_actions',
  
  // User Management
  'view_users',
  'create_users',
  'edit_users',
  'delete_users',
  'manage_users',
  'manage_permissions',
  
  // Evaluations and Performance
  'view_evaluations',
  'create_evaluations',
  'edit_evaluations',
  'delete_evaluations',
  'view_performance_metrics',
  'edit_performance_metrics',
  
  // Financial and Business Intelligence
  'view_financials',
  'edit_financial_goals',
  'view_job_codes',
  'edit_business_settings',
  'view_revenue_analytics',
  
  // Operations and Planning
  'view_planning_areas',
  'edit_planning_areas',
  'view_service_orders',
  'edit_service_orders',
  'manage_operations',
  
  // Human Resources and Technicians
  'view_technicians',
  'edit_technicians',
  'manage_recruitment',
  'view_coaching_data',
  'edit_coaching_plans',
  
  // B2B and Client Management
  'view_b2b_clients',
  'edit_b2b_relationships',
  'manage_partnerships',
  'view_hoa_programs',
  'edit_hoa_programs',
  
  // System Administration
  'system_admin',
  'manage_alerts',
  'view_system_logs',
  'edit_system_settings',
  
  // AI Agent Coordination
  'coordinate_agents',
  'view_agent_activities',
  'edit_agent_configurations',
  'view_live_activity'
] as const;

export type Permission = typeof PERMISSIONS[number];

// Permissions organized by category for UI display
export const PERMISSIONS_BY_CATEGORY = {
  DASHBOARD: [
    'view_dashboard',
    'view_analytics',
    'export_data'
  ],
  AGENT_MANAGEMENT: [
    'view_agents',
    'create_agents',
    'edit_agents',
    'delete_agents',
    'execute_agent_actions',
    'coordinate_agents',
    'view_agent_activities',
    'edit_agent_configurations'
  ],
  USER_MANAGEMENT: [
    'view_users',
    'create_users',
    'edit_users',
    'delete_users',
    'manage_users',
    'manage_permissions'
  ],
  EVALUATIONS: [
    'view_evaluations',
    'create_evaluations',
    'edit_evaluations',
    'delete_evaluations',
    'view_performance_metrics',
    'edit_performance_metrics'
  ],
  FINANCIAL: [
    'view_financials',
    'edit_financial_goals',
    'view_job_codes',
    'edit_business_settings',
    'view_revenue_analytics'
  ],
  OPERATIONS: [
    'view_planning_areas',
    'edit_planning_areas',
    'view_service_orders',
    'edit_service_orders',
    'manage_operations'
  ],
  HUMAN_RESOURCES: [
    'view_technicians',
    'edit_technicians',
    'manage_recruitment',
    'view_coaching_data',
    'edit_coaching_plans'
  ],
  B2B_CLIENTS: [
    'view_b2b_clients',
    'edit_b2b_relationships',
    'manage_partnerships',
    'view_hoa_programs',
    'edit_hoa_programs'
  ],
  SYSTEM_ADMIN: [
    'system_admin',
    'manage_alerts',
    'view_system_logs',
    'edit_system_settings'
  ]
} as const;

// Role-based permission assignments
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    // Full system access
    ...PERMISSIONS
  ],
  
  executive: [
    'view_dashboard',
    'view_analytics',
    'export_data',
    'view_agents',
    'execute_agent_actions',
    'view_users',
    'view_evaluations',
    'view_performance_metrics',
    'view_financials',
    'edit_financial_goals',
    'view_job_codes',
    'view_revenue_analytics',
    'view_planning_areas',
    'view_service_orders',
    'manage_operations',
    'view_technicians',
    'view_coaching_data',
    'view_b2b_clients',
    'edit_b2b_relationships',
    'manage_partnerships',
    'view_hoa_programs',
    'manage_alerts',
    'coordinate_agents',
    'view_agent_activities',
    'view_live_activity'
  ],
  
  manager: [
    'view_dashboard',
    'view_analytics',
    'export_data',
    'view_agents',
    'execute_agent_actions',
    'view_users',
    'view_evaluations',
    'create_evaluations',
    'edit_evaluations',
    'view_performance_metrics',
    'edit_performance_metrics',
    'view_financials',
    'view_job_codes',
    'view_planning_areas',
    'edit_planning_areas',
    'view_service_orders',
    'edit_service_orders',
    'view_technicians',
    'edit_technicians',
    'manage_recruitment',
    'view_coaching_data',
    'edit_coaching_plans',
    'view_b2b_clients',
    'view_hoa_programs',
    'edit_hoa_programs',
    'coordinate_agents',
    'view_agent_activities',
    'view_live_activity'
  ],
  
  operator: [
    'view_dashboard',
    'view_analytics',
    'export_data',
    'view_agents',
    'execute_agent_actions',
    'view_evaluations',
    'view_performance_metrics',
    'view_planning_areas',
    'view_service_orders',
    'edit_service_orders',
    'view_technicians',
    'view_coaching_data',
    'view_b2b_clients',
    'view_hoa_programs',
    'view_agent_activities',
    'view_live_activity'
  ],
  
  agent: [
    'view_dashboard',
    'execute_agent_actions',
    'view_performance_metrics',
    'view_planning_areas',
    'view_service_orders',
    'view_agent_activities'
  ],
  
  human_coordinator: [
    'view_dashboard',
    'view_analytics',
    'view_agents',
    'execute_agent_actions',
    'view_evaluations',
    'view_performance_metrics',
    'view_planning_areas',
    'view_service_orders',
    'view_technicians',
    'view_coaching_data',
    'coordinate_agents',
    'view_agent_activities',
    'view_live_activity'
  ],
  
  // Limited access role for testing permission enforcement
  field_technician: [
    'view_analytics',
    'view_agents',
    'view_service_orders',
    'view_technicians'
    // Note: NO view_dashboard permission - this is the key for testing
  ]
};

// Tab-specific permissions for navigation access control
export const TAB_PERMISSIONS: Record<string, Permission> = {
  '/dashboard': 'view_dashboard',
  '/agents': 'view_agents',
  '/agent-roster': 'view_agents',
  '/performance': 'view_performance_metrics',
  '/evaluations': 'view_evaluations',
  '/financials': 'view_financials',
  '/financial-intelligence': 'view_financials',
  '/financial-intelligence-dashboard': 'view_financials',
  '/financial-goal-setting': 'edit_financial_goals',
  '/job-code-performance': 'view_job_codes',
  '/technician-management': 'view_technicians',
  '/technician-empowerment': 'view_technicians',
  '/coaching-engine': 'view_coaching_data',
  '/contractor-recruitment': 'manage_recruitment',
  '/b2b-client-management': 'view_b2b_clients',
  '/hoa-program': 'view_hoa_programs',
  '/completed-orders': 'view_service_orders',
  '/planning-area-agents': 'view_planning_areas',
  '/executive-operations': 'view_performance_metrics',
  '/user-management': 'manage_users',
  '/alerts': 'manage_alerts',
  '/system-admin': 'system_admin'
};

// Helper functions for permission checking
export function hasPermission(userPermissions: Permission[], requiredPermission: Permission): boolean {
  return userPermissions.includes(requiredPermission);
}

export function hasAnyPermission(userPermissions: Permission[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
}

export function hasAllPermissions(userPermissions: Permission[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
}



export function canAccessTab(userPermissions: Permission[], tabPath: string): boolean {
  const requiredPermission = TAB_PERMISSIONS[tabPath];
  if (!requiredPermission) return true; // Allow access if no specific permission required
  return hasPermission(userPermissions, requiredPermission);
}

// AI Agent specific permissions
export const AGENT_PERMISSIONS = {
  scheduling: ['execute_agent_actions', 'view_service_orders', 'edit_service_orders'],
  customer_communication: ['execute_agent_actions', 'view_service_orders', 'view_b2b_clients'],
  route_optimization: ['execute_agent_actions', 'view_planning_areas', 'view_service_orders'],
  field_service: ['execute_agent_actions', 'view_technicians', 'view_service_orders'],
  hvac_diagnostics: ['execute_agent_actions', 'view_service_orders'],
  inventory_management: ['execute_agent_actions', 'view_service_orders'],
  emergency_response: ['execute_agent_actions', 'view_service_orders', 'manage_operations'],
  quality_assurance: ['execute_agent_actions', 'view_performance_metrics'],
  pricing_estimation: ['execute_agent_actions', 'view_financials'],
  maintenance_scheduler: ['execute_agent_actions', 'view_service_orders'],
  technician_interaction: ['execute_agent_actions', 'view_technicians'],
  parts_prediction: ['execute_agent_actions', 'view_service_orders'],
  recommendation_dominance: ['execute_agent_actions', 'view_analytics'],
  b2b_intelligence: ['execute_agent_actions', 'view_b2b_clients'],
  market_intelligence: ['execute_agent_actions', 'view_analytics'],
  parts_ordering: ['execute_agent_actions', 'view_service_orders'],
  performance_analytics: ['execute_agent_actions', 'view_performance_metrics'],
  regional_performance: ['execute_agent_actions', 'view_planning_areas'],
  technician_management: ['execute_agent_actions', 'view_technicians'],
  technician_recruiting: ['execute_agent_actions', 'manage_recruitment'],
  technician_training: ['execute_agent_actions', 'view_technicians'],
  conversational_commerce: ['execute_agent_actions', 'view_b2b_clients'],
  content_intelligence: ['execute_agent_actions', 'view_analytics'],
  retention_intelligence: ['execute_agent_actions', 'view_technicians'],
  financial_intelligence: ['execute_agent_actions', 'view_financials'],
  supply_chain: ['execute_agent_actions', 'view_service_orders'],
  executive_coordination: ['execute_agent_actions', 'coordinate_agents']
} as const;

export type AgentType = keyof typeof AGENT_PERMISSIONS;