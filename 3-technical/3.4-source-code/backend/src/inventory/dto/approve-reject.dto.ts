import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApproveRejectDto {
  @ApiProperty({ example: 'Insufficient budget' })
  @IsString()
  @MinLength(1)
  reason: string;
}

