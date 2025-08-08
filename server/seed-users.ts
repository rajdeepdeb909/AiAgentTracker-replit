// Script to create initial admin and demo users
import { db } from './db';
import { users } from '@shared/schema';
import { hashPassword } from './auth';

async function seedUsers() {
  try {
    console.log('Creating demo users...');

    // Create admin user
    const adminPasswordHash = await hashPassword('admin123');
    await db.insert(users).values({
      username: 'admin',
      email: 'admin@americashomemanager.com',
      passwordHash: adminPasswordHash,
      role: 'admin',
      firstName: 'System',
      lastName: 'Administrator',
      isActive: true,
    }).onConflictDoNothing();

    // Create executive user
    const executivePasswordHash = await hashPassword('executive123');
    await db.insert(users).values({
      username: 'executive',
      email: 'executive@americashomemanager.com',
      passwordHash: executivePasswordHash,
      role: 'executive',
      firstName: 'John',
      lastName: 'Executive',
      isActive: true,
    }).onConflictDoNothing();

    // Create manager user
    const managerPasswordHash = await hashPassword('manager123');
    await db.insert(users).values({
      username: 'manager',
      email: 'manager@americashomemanager.com',
      passwordHash: managerPasswordHash,
      role: 'manager',
      firstName: 'Sarah',
      lastName: 'Manager',
      isActive: true,
    }).onConflictDoNothing();

    // Create operator user
    const operatorPasswordHash = await hashPassword('operator123');
    await db.insert(users).values({
      username: 'operator',
      email: 'operator@americashomemanager.com',
      passwordHash: operatorPasswordHash,
      role: 'operator',
      firstName: 'Mike',
      lastName: 'Operator',
      isActive: true,
    }).onConflictDoNothing();

    // Create viewer user
    const viewerPasswordHash = await hashPassword('viewer123');
    await db.insert(users).values({
      username: 'viewer',
      email: 'viewer@americashomemanager.com',
      passwordHash: viewerPasswordHash,
      role: 'viewer',
      firstName: 'Jane',
      lastName: 'Viewer',
      isActive: true,
    }).onConflictDoNothing();

    console.log('Demo users created successfully!');
    console.log('Login credentials:');
    console.log('- Admin: admin / admin123');
    console.log('- Executive: executive / executive123');
    console.log('- Manager: manager / manager123');
    console.log('- Operator: operator / operator123');
    console.log('- Viewer: viewer / viewer123');

  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

// Run if called directly
seedUsers().then(() => process.exit(0));

export { seedUsers };