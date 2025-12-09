import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { PromotionEntity } from './entities/promotion.entity';
import { VoucherEntity } from './entities/voucher.entity';
import { PromotionUsageEntity } from './entities/promotion-usage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PromotionEntity, VoucherEntity, PromotionUsageEntity]),
  ],
  controllers: [PromotionsController],
  providers: [PromotionsService],
  exports: [PromotionsService],
})
export class PromotionsModule {}

