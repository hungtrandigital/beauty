import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ example: 'Vu Tri Barbershop' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'vutri-barbershop', required: false })
  @IsString()
  @MinLength(1)
  slug?: string;
}

