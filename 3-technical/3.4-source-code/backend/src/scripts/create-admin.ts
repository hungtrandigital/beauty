import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TenantsService } from '../tenants/tenants.service';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import * as readline from 'readline';

async function createAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tenantsService = app.get(TenantsService);
  const usersService = app.get(UsersService);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(query, resolve);
    });
  };

  try {
    console.log('\n=== Create System Admin Account ===\n');

    // Check if tenant exists, if not create default tenant
    let tenant;
    const existingTenants = await tenantsService.findAll();
    
    if (existingTenants.length === 0) {
      console.log('No tenant found. Creating default tenant...');
      tenant = await tenantsService.create({
        name: 'Default Tenant',
        slug: 'default',
      });
      console.log(`✅ Created tenant: ${tenant.name} (ID: ${tenant.id})\n`);
    } else {
      tenant = existingTenants[0];
      console.log(`Using existing tenant: ${tenant.name} (ID: ${tenant.id})\n`);
    }

    // Get admin details
    const email = await question('Admin email: ');
    const name = await question('Admin name: ');
    const password = await question('Admin password (min 6 characters): ');

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Check if admin already exists
    const existingUser = await usersService.findByEmail(email);
    if (existingUser) {
      console.log(`\n⚠️  User with email ${email} already exists.`);
      const update = await question('Update to admin role? (y/n): ');
      if (update.toLowerCase() === 'y') {
        await usersService.update(existingUser.id, {
          role: UserRole.ADMIN,
          isActive: true,
        });
        console.log(`\n✅ Updated user ${email} to ADMIN role.`);
      } else {
        console.log('Cancelled.');
      }
    } else {
      // Create admin user
      const admin = await usersService.create({
        email,
        name,
        password,
        role: UserRole.ADMIN,
        tenantId: tenant.id,
      });

      console.log(`\n✅ Admin account created successfully!`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Name: ${admin.name}`);
      console.log(`   Role: ${admin.role}`);
      console.log(`   Tenant: ${tenant.name}`);
      console.log(`   ID: ${admin.id}\n`);
    }

    rl.close();
    await app.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin account:', error.message);
    rl.close();
    await app.close();
    process.exit(1);
  }
}

createAdmin();

