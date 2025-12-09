/**
 * Interactive admin user creation script
 * 
 * This script prompts for admin details and creates an admin user.
 * Usage: npm run script:create-admin
 * 
 * [GUESS: Interactive admin creation - prompts for email, name, password]
 */

import * as readline from 'readline';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity, UserRole } from '../users/entities/user.entity';
import { TenantEntity } from '../tenants/entities/tenant.entity';
import { DatabaseConfig } from '../config/database.config';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function createAdmin() {
  const dataSource = new DataSource(DatabaseConfig);

  try {
    await dataSource.initialize();
    console.log('Database connected');

    // Get tenant
    const tenantRepository = dataSource.getRepository(TenantEntity);
    const tenants = await tenantRepository.find();
    
    if (tenants.length === 0) {
      console.log('No tenants found. Please create a tenant first.');
      process.exit(1);
    }

    console.log('\nAvailable tenants:');
    tenants.forEach((t, i) => {
      console.log(`${i + 1}. ${t.name} (${t.id})`);
    });

    const tenantChoice = await question('\nSelect tenant (number): ');
    const tenant = tenants[parseInt(tenantChoice) - 1];

    if (!tenant) {
      console.log('Invalid tenant selection');
      process.exit(1);
    }

    // Get admin details
    const email = await question('Email: ');
    const name = await question('Name: ');
    const password = await question('Password: ');

    // Check if user exists
    const userRepository = dataSource.getRepository(UserEntity);
    const existing = await userRepository.findOne({
      where: { email, tenantId: tenant.id },
    });

    if (existing) {
      console.log('User with this email already exists');
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = userRepository.create({
      email,
      name,
      password: hashedPassword,
      role: UserRole.ADMIN,
      tenantId: tenant.id,
      isActive: true,
    });

    await userRepository.save(admin);
    console.log('\n✅ Admin user created successfully!');

    rl.close();
    await dataSource.destroy();
  } catch (error) {
    console.error('Error creating admin:', error);
    rl.close();
    process.exit(1);
  }
}

createAdmin();
