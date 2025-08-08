import bcrypt from 'bcrypt';
import { generateId } from './utils';
import { 
  User, 
  InsertUser, 
  UserSession, 
  InsertUserSession,
  UserActivityLog,
  InsertUserActivityLog,
  AgentCredentials,
  InsertAgentCredentials,
  UserRole,
  AgentType,
  HumanRoleType
} from '@shared/user-schema';
import { ROLE_PERMISSIONS } from '@shared/permissions';

/**
 * Comprehensive User Management Service for AI-Agentic Organization
 * Handles both human users and AI agent credentials
 */
export class UserManagementService {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, UserSession> = new Map();
  private activityLog: UserActivityLog[] = [];
  private agentCredentials: Map<string, AgentCredentials> = new Map();

  constructor() {
    this.initializeDefaultUsers();
  }

  /**
   * Initialize default users for all AI agents and human roles
   */
  private async initializeDefaultUsers() {
    console.log('Initializing comprehensive user management system...');
    
    // Create AI Agent users
    await this.createAIAgentUsers();
    
    // Create Human role users
    await this.createHumanRoleUsers();
    
    // Create system admin
    await this.createSystemAdmin();
    
    console.log(`User management initialized with ${this.users.size} users`);
  }

  /**
   * Create users for all 26 AI agents
   */
  private async createAIAgentUsers() {
    const aiAgents = [
      // Core Operational Agents
      { name: 'Advanced Scheduling Agent', type: 'scheduling', department: 'Operations' },
      { name: 'Customer Communication Hub', type: 'customer_communication', department: 'Customer Service' },
      { name: 'Route Optimization Engine', type: 'route_optimization', department: 'Logistics' },
      { name: 'Field Service Coordinator', type: 'field_service', department: 'Operations' },
      { name: 'HVAC System Diagnostics AI', type: 'hvac_diagnostics', department: 'Technical' },
      { name: 'Inventory Management Assistant', type: 'inventory_management', department: 'Supply Chain' },
      { name: 'Emergency Response Coordinator', type: 'emergency_response', department: 'Operations' },
      { name: 'Quality Assurance Inspector', type: 'quality_assurance', department: 'Quality' },
      { name: 'Pricing & Estimation Specialist', type: 'pricing_estimation', department: 'Finance' },
      { name: 'Maintenance Scheduler Pro', type: 'maintenance_scheduler', department: 'Operations' },
      
      // Advanced Intelligence Agents
      { name: 'Technician Interaction Hub', type: 'technician_interaction', department: 'Human Resources' },
      { name: 'Parts Prediction Engine', type: 'parts_prediction', department: 'Supply Chain' },
      { name: 'LLM Recommendation Dominance Agent', type: 'recommendation_dominance', department: 'AI/ML' },
      { name: 'AI-Powered B2B Intelligence Agent', type: 'b2b_intelligence', department: 'Business Development' },
      { name: 'Hyper-Local LLM Market Intelligence Agent', type: 'market_intelligence', department: 'Strategy' },
      { name: 'Parts Ordering Specialist', type: 'parts_ordering', department: 'Supply Chain' },
      { name: 'Performance Analytics AI', type: 'performance_analytics', department: 'Analytics' },
      { name: 'Regional Performance Monitor', type: 'regional_performance', department: 'Analytics' },
      
      // Human-AI Coordination Agents
      { name: 'Technician Management Agent', type: 'technician_management', department: 'Human Resources' },
      { name: 'Technician Recruiting Agent', type: 'technician_recruiting', department: 'Human Resources' },
      { name: 'Technician Training & Development Agent', type: 'technician_training', department: 'Human Resources' },
      { name: 'Conversational Commerce Agent', type: 'conversational_commerce', department: 'Sales' },
      { name: 'LLM Content Intelligence Agent', type: 'content_intelligence', department: 'Marketing' },
      { name: 'Technician Retention Intelligence Agent', type: 'retention_intelligence', department: 'Human Resources' },
      { name: 'Financial Intelligence Agent', type: 'financial_intelligence', department: 'Finance' },
      { name: 'Parts Supply Chain Agent', type: 'supply_chain', department: 'Supply Chain' }
    ];

    for (const agent of aiAgents) {
      const agentUser = await this.createUser({
        id: `agent_${agent.type}`,
        username: agent.type.replace(/_/g, '.'),
        email: `${agent.type}@ai.company.com`,
        passwordHash: await bcrypt.hash(`${agent.type}_key_2025`, 12),
        role: 'agent',
        userType: 'ai_agent',
        agentType: agent.type as AgentType,
        displayName: agent.name,
        firstName: agent.name.split(' ')[0],
        lastName: agent.name.split(' ').slice(1).join(' '),
        department: agent.department,
        title: 'AI Agent',
        permissions: ['execute_actions', 'view_dashboard', 'export_data'],
        agentStatus: 'active',
        isActive: true,
        isApproved: true
      });

      // Create API credentials for each agent
      await this.createAgentCredentials({
        agentId: agent.type,
        userId: agentUser.id,
        apiKey: `ak_${agent.type}_${generateId()}`,
        serviceEndpoint: `https://api.company.com/agents/${agent.type}`,
        serviceCredentials: {
          clientId: `client_${agent.type}`,
          scope: ['read', 'write', 'execute'],
          rateLimit: 1000
        },
        isActive: true
      });
    }
  }

  /**
   * Create users for all human roles in the organization
   */
  private async createHumanRoleUsers() {
    // C-Level Executives
    const executives = [
      { role: 'ceo', name: 'Chief Executive Officer', email: 'ceo@company.com', agents: ['executive_coordination', 'performance_analytics'] },
      { role: 'coo', name: 'Chief Operating Officer', email: 'coo@company.com', agents: ['scheduling', 'field_service', 'emergency_response'] },
      { role: 'cfo', name: 'Chief Financial Officer', email: 'cfo@company.com', agents: ['financial_intelligence', 'pricing_estimation'] },
      { role: 'cto', name: 'Chief Technology Officer', email: 'cto@company.com', agents: ['hvac_diagnostics', 'recommendation_dominance'] },
      { role: 'cmo', name: 'Chief Marketing Officer', email: 'cmo@company.com', agents: ['customer_communication', 'content_intelligence'] },
      { role: 'cdo', name: 'Chief Data Officer', email: 'cdo@company.com', agents: ['performance_analytics', 'market_intelligence'] },
      { role: 'cao', name: 'Chief Administrative Officer', email: 'cao@company.com', agents: ['route_optimization', 'inventory_management'] },
      { role: 'cpo', name: 'Chief Product Officer', email: 'cpo@company.com', agents: ['quality_assurance', 'b2b_intelligence'] },
      { role: 'cro', name: 'Chief Revenue Officer', email: 'cro@company.com', agents: ['conversational_commerce', 'b2b_intelligence'] }
    ];

    for (const exec of executives) {
      await this.createUser({
        id: `exec_${exec.role}`,
        username: exec.role,
        email: exec.email,
        passwordHash: await bcrypt.hash(`${exec.role}_secure_2025`, 12),
        role: 'executive',
        userType: 'human',
        humanRoleType: exec.role as HumanRoleType,
        displayName: exec.name,
        firstName: exec.name.split(' ')[1],
        lastName: exec.name.split(' ')[2],
        department: 'Executive',
        title: exec.name,
        permissions: ROLE_PERMISSIONS.executive,
        coordinatedAgents: exec.agents,
        planningAreas: ['All Areas'],
        isActive: true,
        isApproved: true
      });
    }

    // Department Managers and Staff
    const staff = [
      // Recruitment Department
      { role: 'recruitment_manager', name: 'Sarah Chen', email: 'sarah.chen@company.com', department: 'Recruitment', title: 'Senior Recruitment Manager', agents: ['technician_recruiting'] },
      { role: 'field_specialist', name: 'Marcus Rodriguez', email: 'marcus.rodriguez@company.com', department: 'Recruitment', title: 'Field Recruitment Specialist', agents: ['technician_recruiting'] },
      { role: 'partnership_lead', name: 'Jennifer Walsh', email: 'jennifer.walsh@company.com', department: 'Recruitment', title: 'Partnership Development Lead', agents: ['b2b_intelligence'] },
      { role: 'trade_show_coordinator', name: 'David Kim', email: 'david.kim@company.com', department: 'Recruitment', title: 'Trade Show Coordinator', agents: ['content_intelligence'] },
      
      // Operations Department
      { role: 'operations_manager', name: 'Amanda Thompson', email: 'amanda.thompson@company.com', department: 'Operations', title: 'Operations Manager', agents: ['scheduling', 'field_service'] },
      { role: 'quality_assurance_lead', name: 'Robert Zhang', email: 'robert.zhang@company.com', department: 'Operations', title: 'Quality Assurance Lead', agents: ['quality_assurance'] },
      { role: 'scheduling_coordinator', name: 'Lisa Park', email: 'lisa.park@company.com', department: 'Operations', title: 'Scheduling Coordinator', agents: ['scheduling', 'route_optimization'] },
      
      // Analytics Department
      { role: 'analytics_manager', name: 'Michael Davis', email: 'michael.davis@company.com', department: 'Analytics', title: 'Performance Analytics Manager', agents: ['performance_analytics', 'regional_performance'] },
      { role: 'data_intelligence_specialist', name: 'Emily Johnson', email: 'emily.johnson@company.com', department: 'Analytics', title: 'Data Intelligence Specialist', agents: ['market_intelligence'] },
      
      // Training Department
      { role: 'training_lead', name: 'Chris Martinez', email: 'chris.martinez@company.com', department: 'Training', title: 'Training & Development Lead', agents: ['technician_training', 'technician_retention'] }
    ];

    for (const person of staff) {
      await this.createUser({
        id: `staff_${person.role}`,
        username: person.email.split('@')[0],
        email: person.email,
        passwordHash: await bcrypt.hash(`${person.role}_2025`, 12),
        role: person.department === 'Operations' || person.department === 'Analytics' ? 'manager' : 'operator',
        userType: 'human',
        humanRoleType: person.role as HumanRoleType,
        displayName: person.name,
        firstName: person.name.split(' ')[0],
        lastName: person.name.split(' ')[1],
        department: person.department,
        title: person.title,
        permissions: person.department === 'Operations' || person.department === 'Analytics' ? ROLE_PERMISSIONS.manager : ROLE_PERMISSIONS.operator,
        coordinatedAgents: person.agents,
        planningAreas: ['Dallas Metro', 'Houston Metro', 'Austin Metro'], // Sample planning areas
        isActive: true,
        isApproved: true
      });
    }
  }

  /**
   * Create system administrator
   */
  private async createSystemAdmin() {
    await this.createUser({
      id: 'admin_001',
      username: 'admin',
      email: 'admin@company.com',
      passwordHash: await bcrypt.hash('SecureAdmin2025!', 12),
      role: 'admin',
      userType: 'human',
      displayName: 'System Administrator',
      firstName: 'System',
      lastName: 'Administrator',
      department: 'IT',
      title: 'System Administrator',
      permissions: ROLE_PERMISSIONS.admin,
      coordinatedAgents: [], // Admin coordinates with all agents
      planningAreas: ['All Areas'],
      isActive: true,
      isApproved: true
    });
  }

  /**
   * Create a new user
   */
  async createUser(userData: InsertUser): Promise<User> {
    const id = userData.id || generateId();
    const user: User = {
      ...userData,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      permissions: userData.permissions || [],
      customPermissions: userData.customPermissions || [],
      coordinatedAgents: userData.coordinatedAgents || [],
      humanCollaborators: userData.humanCollaborators || [],
      planningAreas: userData.planningAreas || [],
    };

    this.users.set(id, user);
    
    // Log user creation
    await this.logActivity({
      userId: user.createdBy || 'system',
      action: 'create',
      resource: 'user',
      resourceId: id,
      details: { userType: user.userType, role: user.role }
    });

    return user;
  }

  /**
   * Create agent credentials
   */
  async createAgentCredentials(credentialsData: InsertAgentCredentials): Promise<AgentCredentials> {
    const id = generateId();
    const credentials: AgentCredentials = {
      ...credentialsData,
      id: parseInt(id),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.agentCredentials.set(id, credentials);
    return credentials;
  }

  /**
   * Authenticate user
   */
  async authenticateUser(username: string, password: string): Promise<{ user: User; sessionToken: string } | null> {
    const user = Array.from(this.users.values()).find(u => u.username === username);
    if (!user || !user.isActive) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return null;
    }

    // Create session
    const sessionToken = generateId();
    const session: UserSession = {
      id: generateId(),
      userId: user.id,
      sessionToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      createdAt: new Date(),
      lastAccessedAt: new Date(),
    };

    // Ensure sessionToken is a string
    const tokenStr = String(sessionToken);
    this.sessions.set(tokenStr, session);

    // Update last login
    user.lastLoginAt = new Date();
    this.users.set(user.id, user);

    // Log login
    await this.logActivity({
      userId: user.id,
      action: 'login',
      resource: 'auth',
      details: { userType: user.userType }
    });

    return { user, sessionToken: tokenStr };
  }

  /**
   * Get user by session token
   */
  async getUserBySession(sessionToken: string): Promise<User | null> {
    const tokenStr = String(sessionToken);
    const session = this.sessions.get(tokenStr);
    if (!session || session.expiresAt < new Date()) {
      return null;
    }
    // Update last accessed
    session.lastAccessedAt = new Date();
    this.sessions.set(tokenStr, session);

    return this.users.get(session.userId) || null;
  }

  /**
   * Log user activity
   */
  async logActivity(activityData: InsertUserActivityLog): Promise<void> {
    const activity: UserActivityLog = {
      ...activityData,
      id: this.activityLog.length + 1,
      timestamp: new Date(),
      details: activityData.details || {},
    };

    this.activityLog.push(activity);
  }

  /**
   * Get all users
   */
  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  /**
   * Get users by type
   */
  async getUsersByType(userType: 'human' | 'ai_agent' | 'system'): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.userType === userType);
  }

  /**
   * Get AI agents
   */
  async getAIAgents(): Promise<User[]> {
    return this.getUsersByType('ai_agent');
  }

  /**
   * Get human users
   */
  async getHumanUsers(): Promise<User[]> {
    return this.getUsersByType('human');
  }

  /**
   * Get user by ID
   */
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  /**
   * Update user
   */
  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) {
      return undefined;
    }

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };

    this.users.set(id, updatedUser);

    // Log update
    await this.logActivity({
      userId: updates.lastModifiedBy || 'system',
      action: 'update',
      resource: 'user',
      resourceId: id,
      details: { updatedFields: Object.keys(updates) }
    });

    return updatedUser;
  }

  /**
   * Update user permissions
   */
  async updateUserPermissions(userId: string, permissions: string[]): Promise<User | null> {
    const user = this.users.get(userId);
    if (!user) {
      return null;
    }

    // OVERRIDE the user's permissions completely with custom permissions
    user.permissions = permissions;
    user.customPermissions = []; // Clear custom permissions since we're setting main permissions
    user.lastModifiedAt = new Date();
    
    this.users.set(userId, user);

    // Log the permission update
    await this.logActivity({
      userId: userId,
      action: 'update_permissions',
      resource: 'user_permissions',
      details: { 
        newPermissionsCount: permissions.length,
        permissions: permissions 
      }
    });

    return user;
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) {
      return false;
    }

    this.users.delete(id);

    // Remove sessions
    for (const [token, session] of this.sessions.entries()) {
      if (session.userId === id) {
        this.sessions.delete(token);
      }
    }

    // Log deletion
    await this.logActivity({
      userId: 'system',
      action: 'delete',
      resource: 'user',
      resourceId: id,
      details: { userType: user.userType }
    });

    return true;
  }

  /**
   * Generate user credentials summary
   */
  async getUserCredentialsSummary(): Promise<any> {
    const users = await this.getUsers();
    const aiAgents = users.filter(u => u.userType === 'ai_agent');
    const humans = users.filter(u => u.userType === 'human');

    return {
      totalUsers: users.length,
      aiAgents: {
        count: aiAgents.length,
        byType: aiAgents.reduce((acc, agent) => {
          const type = agent.agentType || 'unknown';
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      },
      humans: {
        count: humans.length,
        byRole: humans.reduce((acc, human) => {
          acc[human.role] = (acc[human.role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        byDepartment: humans.reduce((acc, human) => {
          const dept = human.department || 'unknown';
          acc[dept] = (acc[dept] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      },
      credentials: {
        total: this.agentCredentials.size,
        active: Array.from(this.agentCredentials.values()).filter(c => c.isActive).length
      }
    };
  }
}

// Export singleton instance
export const userManagementService = new UserManagementService();