import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TenantsModule } from './tenants/tenants.module';
import { BranchesModule } from './branches/branches.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { BillsModule } from './bills/bills.module';
import { ServicesModule } from './services/services.module';
import { PricingModule } from './pricing/pricing.module';
import { PromotionsModule } from './promotions/promotions.module';
import { CustomersModule } from './customers/customers.module';
import { ReportingModule } from './reporting/reporting.module';
import { MobileModule } from './mobile/mobile.module';
import { AdminModule } from './admin/admin.module';
import { HealthModule } from './health/health.module';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UsersModule,
    TenantsModule,
    BranchesModule,
    ProductsModule,
    InventoryModule,
    BillsModule,
    ServicesModule,
    PricingModule,
    PromotionsModule,
    CustomersModule,
    ReportingModule,
    MobileModule,
    AdminModule,
    HealthModule,
  ],
})
export class AppModule {}

