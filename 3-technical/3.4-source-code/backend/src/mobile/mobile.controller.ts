import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MobileService } from './mobile.service';
import { ServiceType } from '../services/entities/service.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { TenantId } from '../common/decorators/tenant.decorator';

@ApiTags('Mobile')
@Controller('mobile')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  @Get('services')
  @ApiOperation({ summary: 'Get services for mobile app' })
  @ApiQuery({ name: 'type', enum: ServiceType, required: false })
  async getServices(
    @TenantId() tenantId: string,
    @Query('type') type?: ServiceType,
  ) {
    return this.mobileService.getServices(tenantId, type);
  }

  @Get('branches')
  @ApiOperation({ summary: 'Get branches for mobile app' })
  async getBranches(@TenantId() tenantId: string) {
    return this.mobileService.getBranches(tenantId);
  }

  @Get('customer/qr/:qrCode')
  @ApiOperation({ summary: 'Get customer by QR code (for mobile app)' })
  async getCustomerByQrCode(
    @Param('qrCode') qrCode: string,
    @TenantId() tenantId: string,
  ) {
    return this.mobileService.getCustomerByQrCode(qrCode, tenantId);
  }

  @Get('customer/:customerId/points')
  @ApiOperation({ summary: 'Get customer points and history' })
  async getCustomerPoints(
    @Param('customerId') customerId: string,
    @TenantId() tenantId: string,
  ) {
    return this.mobileService.getCustomerPoints(customerId, tenantId);
  }
}

