import { Router } from 'express';
import bcrypt from 'bcrypt';
import { userManagementService } from './user-management-service';
import { PERMISSIONS, ROLE_PERMISSIONS } from '@shared/permissions';
import { z } from 'zod';

const router = Router();

// Middleware to verify authentication
export const requireAuth = async (req: any, res: any, next: any) => {
  const sessionToken = req.headers.authorization?.replace('Bearer ', '');
  
  if (!sessionToken) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const user = await userManagementService.getUserBySession(sessionToken);
  if (!user) {
    return res.status(401).json({ message: 'Invalid or expired session' });
  }

  req.user = user;
  next();
};

// Middleware to require specific permission
export const requirePermission = (permission: string) => {
  return (req: any, res: any, next: any) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userPermissions = req.user.permissions; // Use the user's current permissions only
    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

// Login endpoint
const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    
    const result = await userManagementService.authenticateUser(username, password);
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { user, sessionToken } = result;

    // Return user without sensitive data
    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      userType: user.userType,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      title: user.title,
      permissions: user.permissions, // Use only the user's current permissions (which may have been overridden)
      coordinatedAgents: user.coordinatedAgents,
      planningAreas: user.planningAreas,
      isActive: user.isActive,
    };

    res.json({
      user: safeUser,
      sessionToken,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ message: 'Invalid request' });
  }
});

// Logout endpoint
router.post('/logout', requireAuth, async (req: any, res) => {
  // In a full implementation, we would invalidate the session
  // For now, we just log the activity
  await userManagementService.logActivity({
    userId: req.user.id,
    action: 'logout',
    resource: 'auth',
    details: {}
  });

  res.json({ message: 'Logout successful' });
});

// Get current user
router.get('/user', requireAuth, async (req: any, res) => {
  const user = req.user;
  
  const safeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    userType: user.userType,
    displayName: user.displayName,
    firstName: user.firstName,
    lastName: user.lastName,
    department: user.department,
    title: user.title,
    permissions: [...(user.permissions || []), ...(user.customPermissions || [])],
    coordinatedAgents: user.coordinatedAgents,
    planningAreas: user.planningAreas,
    isActive: user.isActive,
  };

  res.json(safeUser);
});

// Get all users (admin only)
router.get('/users', requireAuth, requirePermission('manage_users'), async (req: any, res) => {
  try {
    const users = await userManagementService.getUsers();
    
    const safeUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      userType: user.userType,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.department,
      title: user.title,
      permissions: [...(user.permissions || []), ...(user.customPermissions || [])],
      coordinatedAgents: user.coordinatedAgents,
      planningAreas: user.planningAreas,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
    }));

    res.json({ users: safeUsers });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get AI agents
router.get('/ai-agents', requireAuth, async (req: any, res) => {
  try {
    const aiAgents = await userManagementService.getUsersByType('ai_agent');
    
    const safeAgents = aiAgents.map(agent => ({
      id: agent.id,
      username: agent.username,
      email: agent.email,
      role: agent.role,
      userType: agent.userType,
      agentType: agent.agentType,
      displayName: agent.displayName,
      department: agent.department,
      title: agent.title,
      agentStatus: agent.agentStatus,
      coordinatedAgents: agent.coordinatedAgents,
      permissions: [...(agent.permissions || []), ...(agent.customPermissions || [])],
      isActive: agent.isActive,
      createdAt: agent.createdAt,
    }));

    res.json({ agents: safeAgents });
  } catch (error) {
    console.error('Get AI agents error:', error);
    res.status(500).json({ message: 'Failed to fetch AI agents' });
  }
});

// Get human users
router.get('/human-users', requireAuth, async (req: any, res) => {
  try {
    const humans = await userManagementService.getUsersByType('human');
    
    const safeHumans = humans.map(human => ({
      id: human.id,
      username: human.username,
      email: human.email,
      role: human.role,
      userType: human.userType,
      displayName: human.displayName,
      firstName: human.firstName,
      lastName: human.lastName,
      department: human.department,
      title: human.title,
      permissions: [...(human.permissions || []), ...(human.customPermissions || [])],
      coordinatedAgents: human.coordinatedAgents,
      planningAreas: human.planningAreas,
      isActive: human.isActive,
      lastLoginAt: human.lastLoginAt,
      createdAt: human.createdAt,
    }));

    res.json({ humans: safeHumans });
  } catch (error) {
    console.error('Get human users error:', error);
    res.status(500).json({ message: 'Failed to fetch human users' });
  }
});

// Create new user (admin only)
const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'executive', 'manager', 'operator', 'agent', 'human_coordinator']),
  userType: z.enum(['human', 'ai_agent', 'system']),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  department: z.string().optional(),
  title: z.string().optional(),
  agentType: z.string().optional(),
  humanRoleType: z.string().optional(),
  planningAreas: z.array(z.string()).optional(),
});

router.post('/users', requireAuth, requirePermission('manage_users'), async (req: any, res) => {
  try {
    const userData = createUserSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(userData.password, 12);
    
    const newUser = await userManagementService.createUser({
      ...userData,
      passwordHash,
      permissions: ROLE_PERMISSIONS[userData.role] || [],
      customPermissions: [],
      coordinatedAgents: [],
      humanCollaborators: [],
      planningAreas: userData.planningAreas || [],
      isActive: true,
      isApproved: true,
      createdBy: req.user.id,
    });

    // Return user without sensitive data
    const safeUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      userType: newUser.userType,
      displayName: newUser.displayName,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      department: newUser.department,
      title: newUser.title,
      isActive: newUser.isActive,
    };

    res.status(201).json({ user: safeUser, message: 'User created successfully' });
  } catch (error) {
    console.error('Create user error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid user data', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Update user (admin only)
router.put('/users/:id', requireAuth, requirePermission('manage_users'), async (req: any, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Hash password if provided
    if (updates.password) {
      updates.passwordHash = await bcrypt.hash(updates.password, 12);
      delete updates.password;
    }

    updates.lastModifiedBy = req.user.id;

    const updatedUser = await userManagementService.updateUser(id, updates);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user without sensitive data
    const safeUser = {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      userType: updatedUser.userType,
      displayName: updatedUser.displayName,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      department: updatedUser.department,
      title: updatedUser.title,
      isActive: updatedUser.isActive,
    };

    res.json({ user: safeUser, message: 'User updated successfully' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// Delete user (admin only)
router.delete('/users/:id', requireAuth, requirePermission('manage_users'), async (req: any, res) => {
  try {
    const { id } = req.params;
    
    const success = await userManagementService.deleteUser(id);
    if (!success) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// Get available permissions
router.get('/permissions', requireAuth, async (req: any, res) => {
  res.json({ permissions: PERMISSIONS });
});

// Get user credentials summary
router.get('/credentials-summary', requireAuth, requirePermission('manage_users'), async (req: any, res) => {
  try {
    const summary = await userManagementService.getUserCredentialsSummary();
    res.json(summary);
  } catch (error) {
    console.error('Get credentials summary error:', error);
    res.status(500).json({ message: 'Failed to fetch credentials summary' });
  }
});

// Add user credentials endpoint to show credential information
router.get('/user-credentials', requireAuth, requirePermission('manage_users'), async (req: any, res) => {
  try {
    const credentialsSummary = await userManagementService.getUserCredentialsSummary();
    res.json(credentialsSummary);
  } catch (error) {
    console.error('Get user credentials error:', error);
    res.status(500).json({ message: 'Failed to fetch user credentials' });
  }
});

// Update user permissions
router.patch('/users/:userId/permissions', requireAuth, requirePermission('manage_permissions'), async (req: any, res) => {
  try {
    const { userId } = req.params;
    const { permissions } = req.body;

    if (!permissions || !Array.isArray(permissions)) {
      return res.status(400).json({ message: 'Invalid permissions data' });
    }

    const updatedUser = await userManagementService.updateUserPermissions(userId, permissions);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return safe user data
    const safeUser = {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      userType: updatedUser.userType,
      displayName: updatedUser.displayName,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      department: updatedUser.department,
      title: updatedUser.title,
      permissions: [...(updatedUser.permissions || []), ...(updatedUser.customPermissions || [])],
      coordinatedAgents: updatedUser.coordinatedAgents,
      planningAreas: updatedUser.planningAreas,
      isActive: updatedUser.isActive,
      lastLoginAt: updatedUser.lastLoginAt,
      createdAt: updatedUser.createdAt,
    };

    res.json({ user: safeUser });
  } catch (error) {
    console.error('Error updating user permissions:', error);
    res.status(500).json({ message: 'Failed to update permissions' });
  }
});

export default router;