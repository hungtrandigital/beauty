import {
  IsString,
  MinLength,
  IsArray,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'Branch Manager' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'Manages branch operations', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: ['bills.create', 'bills.update', 'inventory.view'] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  permissions: string[];
}

