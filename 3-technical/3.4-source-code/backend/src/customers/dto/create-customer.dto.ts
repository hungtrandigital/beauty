import {
  IsString,
  MinLength,
  IsOptional,
  IsEmail,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Nguyen Van A' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'customer@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '0901234567' })
  @IsString()
  @MinLength(1)
  phone: string;

  @ApiProperty({ example: '123 Main St, Ho Chi Minh City', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}

