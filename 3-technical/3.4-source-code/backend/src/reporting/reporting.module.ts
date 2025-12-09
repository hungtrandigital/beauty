import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportingService } from './reporting.service';
import { ReportingController } from './reporting.controller';
import { BillEntity } from '../bills/entities/bill.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { InventoryEntity } from '../inventory/entities/inventory.entity';
import { PromotionUsageEntity } from '../promotions/entities/promotion-usage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BillEntity,
      CustomerEntity,
      InventoryEntity,
      PromotionUsageEntity,
    ]),
  ],
  controllers: [ReportingController],
  providers: [ReportingService],
  exports: [ReportingService],
})
export class ReportingModule {}

