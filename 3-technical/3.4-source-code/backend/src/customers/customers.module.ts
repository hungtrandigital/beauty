import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerEntity } from './entities/customer.entity';
import { PointsTransactionEntity } from './entities/points-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, PointsTransactionEntity])],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}

