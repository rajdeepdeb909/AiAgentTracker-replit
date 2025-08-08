import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { storage } from './storage';
import type { User } from '@shared/schema';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  try {
    const user = await storage.getUserByUsername(username);
    if (!user || !user.isActive) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function generateToken(user: User): string {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      role: user.role,
      permissions: user.permissions
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Additional auth functions for compatibility with existing routes
export const authenticateToken = verifyToken;
export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);
export const getUserWithPermissions = (user: User) => user;
export const requireAdmin = (req: any, res: any, next: any) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};
export const createSession = (user: User) => generateToken(user);