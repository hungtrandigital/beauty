import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSystemSettingsDto {
  @ApiProperty({ example: { organizationName: 'My Company', timezone: 'Asia/Ho_Chi_Minh' } })
  @IsObject()
  settings: Record<string, any>;
}

