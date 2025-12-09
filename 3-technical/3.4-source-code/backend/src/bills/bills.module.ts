import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { BillEntity } from './entities/bill.entity';
import { BillItemEntity } from './entities/bill-item.entity';
import { PaymentEntity } from './entities/payment.entity';
import { ProductsModule } from '../products/products.module';
import { BranchesModule } from '../branches/branches.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillEntity, BillItemEntity, PaymentEntity]),
    ProductsModule,
    BranchesModule,
    InventoryModule,
  ],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}

