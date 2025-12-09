import { IsString, MinLength, IsOptional, IsObject, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class AddressDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ward?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  postalCode?: string;
}

export class CreateBranchDto {
  @ApiProperty({ example: 'BR001' })
  @IsString()
  @MinLength(1)
  code: string;

  @ApiProperty({ example: 'Branch 1' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: '0901234567', required: false })
  @IsOptional()
  @IsString()
  hotline?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  googleMapsUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  parkingInfo?: string;
}

