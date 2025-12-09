import {
  IsString,
  MinLength,
  IsOptional,
  IsUUID,
  IsNumber,
  IsDateString,
  IsBoolean,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVoucherDto {
  @ApiProperty({ example: 'SUMMER2025', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  code?: string; // Auto-generated if not provided

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsOptional()
  @IsUUID()
  promotionId?: string;

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUsage?: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsOptional()
  @IsUUID()
  customerId?: string;

  @ApiProperty({ example: '2025-12-31T23:59:59Z', required: false })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

