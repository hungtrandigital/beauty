import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobileService } from './mobile.service';
import { MobileController } from './mobile.controller';
import { ServiceEntity } from '../services/entities/service.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { PointsTransactionEntity } from '../customers/entities/points-transaction.entity';
import { BranchEntity } from '../branches/entities/branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceEntity,
      CustomerEntity,
      PointsTransactionEntity,
      BranchEntity,
    ]),
  ],
  controllers: [MobileController],
  providers: [MobileService],
  exports: [MobileService],
})
export class MobileModule {}

