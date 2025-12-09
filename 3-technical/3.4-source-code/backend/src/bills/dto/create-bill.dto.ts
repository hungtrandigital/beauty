import {
  IsArray,
  ValidateNested,
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BillItemType } from '../entities/bill-item.entity';
import { BillStatus } from '../entities/bill.entity';

class BillItemDto {
  @ApiProperty({ enum: BillItemType })
  @IsEnum(BillItemType)
  type: BillItemType;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  itemId: string;

  @ApiProperty({ example: 'Hair Gel', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 150000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number;
}

export class CreateBillDto {
  @ApiProperty({ type: [BillItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => BillItemDto)
  items: BillItemDto[];

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;

  @ApiProperty({ required: false, type: [Object] })
  @IsOptional()
  @IsArray()
  appliedPromotions?: Array<{
    promotionId: string;
    discount: number;
    name: string;
  }>;

  @ApiProperty({ enum: BillStatus, required: false })
  @IsOptional()
  @IsEnum(BillStatus)
  status?: BillStatus;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  isOffline?: boolean;
}

