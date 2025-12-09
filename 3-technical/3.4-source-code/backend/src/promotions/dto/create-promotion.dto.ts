import {
  IsString,
  MinLength,
  IsEnum,
  IsObject,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PromotionType } from '../entities/promotion.entity';

class PromotionRulesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  minInvoiceAmount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxInvoiceAmount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  discountPercentage?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  giftProductId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  giftQuantity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  voucherCode?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  productIds?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  serviceIds?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxUsage?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxUsagePerCustomer?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  customerTier?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  branchIds?: string[];
}

export class CreatePromotionDto {
  @ApiProperty({ enum: PromotionType })
  @IsEnum(PromotionType)
  type: PromotionType;

  @ApiProperty({ example: 'Summer Sale' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'Get 20% off on all services', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: PromotionRulesDto })
  @IsObject()
  @ValidateNested()
  @Type(() => PromotionRulesDto)
  rules: PromotionRulesDto;

  @ApiProperty({ example: '2025-01-01T00:00:00Z' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-12-31T23:59:59Z' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

