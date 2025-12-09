import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TenantsService } from '../tenants/tenants.service';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

async function createAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tenantsService = app.get(TenantsService);
  const usersService = app.get(UsersService);

  try {
    console.log('\n=== Creating System Admin Account ===\n');

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

    // Default admin credentials (can be overridden via environment variables)
    const email = process.env.ADMIN_EMAIL || 'admin@beauty.local';
    const name = process.env.ADMIN_NAME || 'System Administrator';
    const password = process.env.ADMIN_PASSWORD || 'Admin123!';

    // Check if admin already exists
    const existingUser = await usersService.findByEmail(email);
    if (existingUser) {
      console.log(`⚠️  User with email ${email} already exists.`);
      if (existingUser.role === UserRole.ADMIN) {
        console.log(`✅ User is already an ADMIN.`);
        console.log(`   Email: ${existingUser.email}`);
        console.log(`   Name: ${existingUser.name}`);
        console.log(`   Role: ${existingUser.role}`);
        console.log(`   Tenant: ${tenant.name}`);
        console.log(`   ID: ${existingUser.id}\n`);
      } else {
        console.log(`Updating user to ADMIN role...`);
        await usersService.update(existingUser.id, {
          role: UserRole.ADMIN,
          isActive: true,
        });
        console.log(`✅ Updated user ${email} to ADMIN role.\n`);
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

      console.log(`✅ Admin account created successfully!`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Name: ${admin.name}`);
      console.log(`   Role: ${admin.role}`);
      console.log(`   Tenant: ${tenant.name}`);
      console.log(`   ID: ${admin.id}\n`);
    }

    await app.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin account:', error.message);
    await app.close();
    process.exit(1);
  }
}

createAdmin();

