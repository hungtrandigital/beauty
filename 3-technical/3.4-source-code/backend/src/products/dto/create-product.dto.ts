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
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductType } from '../entities/product.entity';

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

export class CreateProductDto {
  @ApiProperty({ example: 'Hair Gel Premium' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ enum: ProductType, example: ProductType.PRODUCT })
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({ example: 150000 })
  @IsNumber()
  @Min(0)
  customerPrice: number;

  @ApiProperty({ example: 120000, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  staffPrice?: number;

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
}

