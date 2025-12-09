import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReportingService } from './reporting.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { TenantId } from '../common/decorators/tenant.decorator';

@ApiTags('Reporting')
@Controller('reporting')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class ReportingController {
  constructor(private readonly reportingService: ReportingService) {}

  @Get('revenue')
  @ApiOperation({ summary: 'Get revenue report' })
  @ApiQuery({ name: 'startDate', required: true, type: String })
  @ApiQuery({ name: 'endDate', required: true, type: String })
  @ApiQuery({ name: 'branchId', required: false, type: String })
  async getRevenueReport(
    @TenantId() tenantId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.reportingService.getRevenueReport(
      tenantId,
      new Date(startDate),
      new Date(endDate),
      branchId,
    );
  }

  @Get('top-products')
  @ApiOperation({ summary: 'Get top products' })
  @ApiQuery({ name: 'startDate', required: true, type: String })
  @ApiQuery({ name: 'endDate', required: true, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopProducts(
    @TenantId() tenantId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.reportingService.getTopProducts(
      tenantId,
      new Date(startDate),
      new Date(endDate),
      limit,
    );
  }

  @Get('top-services')
  @ApiOperation({ summary: 'Get top services' })
  @ApiQuery({ name: 'startDate', required: true, type: String })
  @ApiQuery({ name: 'endDate', required: true, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopServices(
    @TenantId() tenantId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.reportingService.getTopServices(
      tenantId,
      new Date(startDate),
      new Date(endDate),
      limit,
    );
  }

  @Get('inventory-recommendations')
  @ApiOperation({ summary: 'Get inventory recommendations (logic-based)' })
  @ApiQuery({ name: 'branchId', required: false, type: String })
  async getInventoryRecommendations(
    @TenantId() tenantId: string,
    @Query('branchId') branchId?: string,
  ) {
    return this.reportingService.getInventoryRecommendations(tenantId, branchId);
  }

  @Get('revenue-trends')
  @ApiOperation({ summary: 'Get revenue trends' })
  @ApiQuery({ name: 'days', required: false, type: Number })
  @ApiQuery({ name: 'branchId', required: false, type: String })
  async getRevenueTrends(
    @TenantId() tenantId: string,
    @Query('days', new ParseIntPipe({ optional: true })) days?: number,
    @Query('branchId') branchId?: string,
  ) {
    return this.reportingService.getRevenueTrends(tenantId, days, branchId);
  }

  @Get('revenue-source-breakdown')
  @ApiOperation({ summary: 'Get revenue source breakdown' })
  @ApiQuery({ name: 'startDate', required: true, type: String })
  @ApiQuery({ name: 'endDate', required: true, type: String })
  async getRevenueSourceBreakdown(
    @TenantId() tenantId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportingService.getRevenueSourceBreakdown(
      tenantId,
      new Date(startDate),
      new Date(endDate),
    );
  }
}

