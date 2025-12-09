/**
 * Auto-create admin user script
 * 
 * This script automatically creates an admin user for local development.
 * Usage: npm run script:create-admin-auto
 * 
 * [GUESS: Admin creation script - creates default admin for local testing]
 */

import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity, UserRole } from '../users/entities/user.entity';
import { TenantEntity } from '../tenants/entities/tenant.entity';
import { DatabaseConfig } from '../config/database.config';

async function createAdminAuto() {
  const dataSource = new DataSource(DatabaseConfig);

  try {
    await dataSource.initialize();
    console.log('Database connected');

    // Create or get default tenant
    const tenantRepository = dataSource.getRepository(TenantEntity);
    let tenant = await tenantRepository.findOne({ where: { name: 'Default Tenant' } });

    if (!tenant) {
      tenant = tenantRepository.create({
        name: 'Default Tenant',
        domain: 'localhost',
      });
      tenant = await tenantRepository.save(tenant);
      console.log('Default tenant created');
    }

    // Create admin user
    const userRepository = dataSource.getRepository(UserEntity);
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@localhost', tenantId: tenant.id },
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = userRepository.create({
      email: 'admin@localhost',
      name: 'System Administrator',
      password: hashedPassword,
      role: UserRole.ADMIN,
      tenantId: tenant.id,
      isActive: true,
    });

    await userRepository.save(admin);
    console.log('Admin user created successfully');
    console.log('Email: admin@localhost');
    console.log('Password: admin123');
    console.log('⚠️  Change password in production!');

    await dataSource.destroy();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdminAuto();
