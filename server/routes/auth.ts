import { Router } from 'express';
import { db } from '../db';
import { users, userPermissions, insertUserSchema } from '@shared/schema';
import { hashPassword, verifyPassword, generateToken, getUserWithPermissions, authenticateToken, requireAdmin, createSession } from '../auth';
import { eq } from 'drizzle-orm';
import { PERMISSIONS, ROLE_PERMISSIONS } from '@shared/permissions';
import { z } from 'zod';

const router = Router();

// Login schema
const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

// Register schema
const registerSchema = insertUserSchema.extend({
  password: z.string().min(6),
}).omit({
  id: true,
  passwordHash: true,
  createdAt: true,
  updatedAt: true,
  lastLoginAt: true,
});

// User update schema
const updateUserSchema = z.object({
  role: z.enum(['admin', 'executive', 'manager', 'operator', 'viewer']).optional(),
  isActive: z.boolean().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  permissions: z.array(z.string()).optional()
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = await db.query.users.findFirst({
      where: eq(users.username, username)
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await db.update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id));

    const userWithPermissions = await getUserWithPermissions(user.id);
    if (!userWithPermissions) {
      return res.status(500).json({ error: 'Failed to load user permissions' });
    }

    const token = generateToken(userWithPermissions);
    const sessionToken = await createSession(user.id);

    res.json({
      user: userWithPermissions,
      token,
      sessionToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register endpoint (admin only)
router.post('/register', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userData = registerSchema.parse(req.body);
    const { password, ...userInfo } = userData;

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, userData.username)
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await db.query.users.findFirst({
      where: eq(users.email, userData.email)
    });

    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const passwordHash = await hashPassword(password);

    const [newUser] = await db.insert(users).values({
      ...userInfo,
      passwordHash
    }).returning();

    const userWithPermissions = await getUserWithPermissions(newUser.id);

    res.status(201).json({ user: userWithPermissions });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  res.json({ user: req.user });
});

// Get all users (admin only)
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const allUsers = await db.query.users.findMany({
      with: {
        permissions: true
      }
    });

    const usersWithPermissions = await Promise.all(
      allUsers.map(async (user) => {
        const userWithPerms = await getUserWithPermissions(user.id);
        return userWithPerms;
      })
    );

    res.json({ users: usersWithPermissions.filter(Boolean) });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user (admin only)
router.put('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updates = updateUserSchema.parse(req.body);
    const { permissions: newPermissions, ...userUpdates } = updates;

    // Update user info
    if (Object.keys(userUpdates).length > 0) {
      await db.update(users)
        .set({
          ...userUpdates,
          updatedAt: new Date()
        })
        .where(eq(users.id, userId));
    }

    // Update permissions if provided
    if (newPermissions) {
      // Remove existing custom permissions (keep role-based ones)
      await db.delete(userPermissions)
        .where(eq(userPermissions.userId, userId));

      // Add new custom permissions
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId)
      });

      if (user) {
        const rolePermissions = getRolePermissions(user.role as UserRole);
        const customPermissions = newPermissions.filter(p => !rolePermissions.includes(p));

        if (customPermissions.length > 0) {
          await db.insert(userPermissions).values(
            customPermissions.map(permissionId => ({
              userId,
              permissionId,
              grantedBy: req.user!.id
            }))
          );
        }
      }
    }

    const updatedUser = await getUserWithPermissions(userId);
    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user (admin only)
router.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Don't allow deleting yourself
    if (userId === req.user!.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    // Soft delete - set as inactive
    await db.update(users)
      .set({ 
        isActive: false,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId));

    res.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Get all permissions
router.get('/permissions', authenticateToken, requireAdmin, async (req, res) => {
  res.json({ permissions: PERMISSIONS });
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
  // In a real app, you'd invalidate the session/token here
  res.json({ success: true });
});

export default router;