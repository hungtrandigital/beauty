import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { TenantsService } from '../tenants/tenants.service';
import { UsersService } from '../users/users.service';
import { BranchesService } from '../branches/branches.service';
import { ProductsService } from '../products/products.service';
import { ServicesService } from '../services/services.service';
import { CustomersService } from '../customers/customers.service';
import { UserRole } from '../users/entities/user.entity';
import { ProductType } from '../products/entities/product.entity';
import { ServiceType } from '../services/entities/service.entity';

async function seedDatabase() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tenantsService = app.get(TenantsService);
  const usersService = app.get(UsersService);
  const branchesService = app.get(BranchesService);
  const productsService = app.get(ProductsService);
  const servicesService = app.get(ServicesService);
  const customersService = app.get(CustomersService);

  try {
    console.log('\n=== Seeding Database ===\n');

    // 1. Create Tenants
    console.log('1. Creating tenants...');
    const tenant1 = await tenantsService.create({
      name: 'Vu Tri Barbershop',
      slug: 'vutri-barbershop',
    });
    console.log(`   ✅ Created tenant: ${tenant1.name} (${tenant1.id})`);

    const tenant2 = await tenantsService.create({
      name: 'Beauty Chain Demo',
      slug: 'beauty-chain-demo',
    });
    console.log(`   ✅ Created tenant: ${tenant2.name} (${tenant2.id})\n`);

    // 2. Create Users for Tenant 1
    console.log('2. Creating users for Vu Tri Barbershop...');
    const admin1 = await usersService.create({
      email: 'admin@vutri.local',
      name: 'System Administrator',
      password: 'Admin123!',
      role: UserRole.ADMIN,
      tenantId: tenant1.id,
    } as any);
    console.log(`   ✅ Created admin: ${admin1.email}`);

    const cashier1 = await usersService.create({
      email: 'cashier@vutri.local',
      name: 'Nguyen Van A',
      password: 'Cashier123!',
      role: UserRole.CASHIER,
      tenantId: tenant1.id,
    } as any);
    console.log(`   ✅ Created cashier: ${cashier1.email}`);

    const warehouse1 = await usersService.create({
      email: 'warehouse@vutri.local',
      name: 'Tran Thi B',
      password: 'Warehouse123!',
      role: UserRole.WAREHOUSE_MANAGER,
      tenantId: tenant1.id,
    } as any);
    console.log(`   ✅ Created warehouse manager: ${warehouse1.email}\n`);

    // 3. Create Users for Tenant 2
    console.log('3. Creating users for Beauty Chain Demo...');
    const admin2 = await usersService.create({
      email: 'admin@beauty.local',
      name: 'Demo Administrator',
      password: 'Admin123!',
      role: UserRole.ADMIN,
      tenantId: tenant2.id,
    } as any);
    console.log(`   ✅ Created admin: ${admin2.email}`);

    const cashier2 = await usersService.create({
      email: 'cashier@beauty.local',
      name: 'Demo Cashier',
      password: 'Cashier123!',
      role: UserRole.CASHIER,
      tenantId: tenant2.id,
    } as any);
    console.log(`   ✅ Created cashier: ${cashier2.email}\n`);

    // 4. Create Branches for Tenant 1
    console.log('4. Creating branches for Vu Tri Barbershop...');
    const branch1 = await branchesService.create({
      code: 'VT001',
      name: 'Vu Tri - Quan 1',
      hotline: '02812345678',
      address: {
        street: '123 Nguyen Hue',
        ward: 'Ben Nghe',
        district: 'Quan 1',
        city: 'Ho Chi Minh',
        country: 'Vietnam',
      },
      googleMapsUrl: 'https://maps.google.com/?q=123+Nguyen+Hue',
      parkingInfo: 'Parking available',
    }, tenant1.id);
    console.log(`   ✅ Created branch: ${branch1.name} (${branch1.code})`);

    const branch2 = await branchesService.create({
      code: 'VT002',
      name: 'Vu Tri - Quan 3',
      hotline: '02812345679',
      address: {
        street: '456 Le Van Sy',
        ward: 'Ward 1',
        district: 'Quan 3',
        city: 'Ho Chi Minh',
        country: 'Vietnam',
      },
    }, tenant1.id);
    console.log(`   ✅ Created branch: ${branch2.name} (${branch2.code})\n`);

    // 5. Create Products for Tenant 1
    console.log('5. Creating products for Vu Tri Barbershop...');
    const product1 = await productsService.create({
      name: 'Pomade Premium',
      type: ProductType.PRODUCT,
      customerPrice: 250000,
      staffPrice: 200000,
      images: ['https://example.com/pomade.jpg'],
      commissionSplit: {
        type: 'RATIO',
        splits: [
          { role: 'stylist', percentage: 60 },
          { role: 'assistant', percentage: 40 },
        ],
      },
    }, tenant1.id);
    console.log(`   ✅ Created product: ${product1.name}`);

    const product2 = await productsService.create({
      name: 'Hair Dye - Black',
      type: ProductType.DYE,
      customerPrice: 150000,
      staffPrice: 120000,
    }, tenant1.id);
    console.log(`   ✅ Created product: ${product2.name}`);

    const product3 = await productsService.create({
      name: 'Shampoo Professional',
      type: ProductType.PRODUCT,
      customerPrice: 180000,
      staffPrice: 150000,
    }, tenant1.id);
    console.log(`   ✅ Created product: ${product3.name}\n`);

    // 6. Create Services for Tenant 1
    console.log('6. Creating services for Vu Tri Barbershop...');
    const service1 = await servicesService.create({
      name: 'Haircut - Male',
      type: ServiceType.MALE,
      price: 100000,
      duration: 30,
      description: 'Professional male haircut',
      commissionSplit: {
        type: 'RATIO',
        splits: [
          { role: 'stylist', percentage: 70 },
          { role: 'assistant', percentage: 30 },
        ],
      },
    }, tenant1.id);
    console.log(`   ✅ Created service: ${service1.name}`);

    const service2 = await servicesService.create({
      name: 'Haircut - Female',
      type: ServiceType.FEMALE,
      price: 200000,
      duration: 60,
      description: 'Professional female haircut',
      commissionSplit: {
        type: 'RATIO',
        splits: [
          { role: 'stylist', percentage: 65 },
          { role: 'assistant', percentage: 35 },
        ],
      },
    }, tenant1.id);
    console.log(`   ✅ Created service: ${service2.name}`);

    const service3 = await servicesService.create({
      name: 'Hair Dye Service',
      type: ServiceType.BOTH,
      price: 300000,
      duration: 90,
      description: 'Full hair dye service',
      associatedProductIds: [product2.id],
    }, tenant1.id);
    console.log(`   ✅ Created service: ${service3.name}\n`);

    // 7. Create Customers for Tenant 1
    console.log('7. Creating customers for Vu Tri Barbershop...');
    const customer1 = await customersService.create({
      name: 'Le Van C',
      email: 'levanc@example.com',
      phone: '0901234567',
      address: '789 Le Loi, Quan 1, HCMC',
      dateOfBirth: '1990-01-15',
    }, tenant1.id);
    console.log(`   ✅ Created customer: ${customer1.name} (${customer1.phone})`);

    const customer2 = await customersService.create({
      name: 'Pham Thi D',
      email: 'phamthid@example.com',
      phone: '0901234568',
      address: '321 Tran Hung Dao, Quan 5, HCMC',
    }, tenant1.id);
    console.log(`   ✅ Created customer: ${customer2.name} (${customer2.phone})`);

    const customer3 = await customersService.create({
      name: 'Hoang Van E',
      email: 'hoangvane@example.com',
      phone: '0901234569',
    }, tenant1.id);
    console.log(`   ✅ Created customer: ${customer3.name} (${customer3.phone})\n`);

    // 8. Create Branch for Tenant 2
    console.log('8. Creating branch for Beauty Chain Demo...');
    const branch3 = await branchesService.create({
      code: 'BC001',
      name: 'Beauty Chain - Main Branch',
      hotline: '02898765432',
      address: {
        street: '999 Dong Khoi',
        ward: 'Ben Nghe',
        district: 'Quan 1',
        city: 'Ho Chi Minh',
        country: 'Vietnam',
      },
    }, tenant2.id);
    console.log(`   ✅ Created branch: ${branch3.name} (${branch3.code})\n`);

    // Summary
    console.log('=== Seeding Complete ===\n');
    console.log('📊 Summary:');
    console.log(`   Tenants: 2`);
    console.log(`   Users: 5 (2 admins, 2 cashiers, 1 warehouse manager)`);
    console.log(`   Branches: 3`);
    console.log(`   Products: 3`);
    console.log(`   Services: 3`);
    console.log(`   Customers: 3\n`);

    console.log('🔑 Admin Accounts:');
    console.log(`   Tenant 1 (Vu Tri): admin@vutri.local / Admin123!`);
    console.log(`   Tenant 2 (Beauty Chain): admin@beauty.local / Admin123!\n`);

    console.log('👤 Cashier Accounts:');
    console.log(`   Tenant 1: cashier@vutri.local / Cashier123!`);
    console.log(`   Tenant 2: cashier@beauty.local / Cashier123!\n`);

    console.log('📦 Warehouse Manager:');
    console.log(`   Tenant 1: warehouse@vutri.local / Warehouse123!\n`);

    await app.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message);
    console.error(error.stack);
    await app.close();
    process.exit(1);
  }
}

seedDatabase();

