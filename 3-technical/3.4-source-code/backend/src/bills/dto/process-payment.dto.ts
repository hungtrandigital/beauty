import {
  IsArray,
  ValidateNested,
  IsEnum,
  IsNumber,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaymentMethod } from '../entities/payment.entity';

class PaymentDto {
  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({ example: 150000 })
  @IsNumber()
  @Min(0.01)
  amount: number;
}

export class ProcessPaymentDto {
  @ApiProperty({ type: [PaymentDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PaymentDto)
  payments: PaymentDto[];
}

