import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryEntity } from './entities/inventory.entity';
import { ImportRequestEntity } from './entities/import-request.entity';
import { ExportRequestEntity } from './entities/export-request.entity';
import { ProductsModule } from '../products/products.module';
import { BranchesModule } from '../branches/branches.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntity, ImportRequestEntity, ExportRequestEntity]),
    ProductsModule,
    BranchesModule,
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}

