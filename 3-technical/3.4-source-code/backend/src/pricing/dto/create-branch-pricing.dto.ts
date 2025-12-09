import {
  IsEnum,
  IsUUID,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PricingItemType } from '../entities/branch-pricing.entity';

export class CreateBranchPricingDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  branchId: string;

  @ApiProperty({ enum: PricingItemType })
  @IsEnum(PricingItemType)
  itemType: PricingItemType;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  itemId: string;

  @ApiProperty({ example: 150000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  customerPrice?: number;

  @ApiProperty({ example: 120000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  staffPrice?: number;
}

