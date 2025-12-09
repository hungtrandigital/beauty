import {
  IsString,
  MinLength,
  IsEnum,
  IsNumber,
  IsArray,
  IsOptional,
  IsObject,
  ValidateNested,
  Min,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ServiceType } from '../entities/service.entity';

class CommissionSplitDto {
  @ApiProperty({ enum: ['RATIO', 'SALARY_LEVEL'] })
  @IsEnum(['RATIO', 'SALARY_LEVEL'])
  type: 'RATIO' | 'SALARY_LEVEL';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  ratio?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  salaryLevel?: string;

  @ApiProperty({ required: false, type: [Object] })
  @IsOptional()
  @IsArray()
  splits?: Array<{
    role: string;
    percentage: number;
  }>;
}

export class CreateServiceDto {
  @ApiProperty({ example: 'Haircut' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'Professional haircut service', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ServiceType, example: ServiceType.BOTH })
  @IsEnum(ServiceType)
  type: ServiceType;

  @ApiProperty({ example: 200000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;

  @ApiProperty({ example: ['https://example.com/image1.jpg'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CommissionSplitDto)
  commissionSplit?: CommissionSplitDto;

  @ApiProperty({ example: ['product-id-1', 'product-id-2'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  associatedProductIds?: string[];
}

