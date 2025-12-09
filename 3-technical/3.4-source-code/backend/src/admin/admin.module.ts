import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { RoleEntity } from './entities/role.entity';
import { SystemSettingsEntity } from './entities/system-settings.entity';
import { ActivityLogEntity } from './entities/activity-log.entity';
import { UsersModule } from '../users/users.module';
import { BranchesModule } from '../branches/branches.module';
import { TenantsModule } from '../tenants/tenants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, SystemSettingsEntity, ActivityLogEntity]),
    UsersModule,
    BranchesModule,
    TenantsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

