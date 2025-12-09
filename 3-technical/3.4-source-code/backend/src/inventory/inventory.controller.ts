import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { CreateImportRequestDto } from './dto/create-import-request.dto';
import { CreateExportRequestDto } from './dto/create-export-request.dto';
import { ApproveRejectDto } from './dto/approve-reject.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { TenantId } from '../common/decorators/tenant.decorator';

@ApiTags('Inventory')
@Controller('inventory')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  // Import Requests
  @Post('import-requests')
  @ApiOperation({ summary: 'Create import request' })
  async createImportRequest(
    @Body() createDto: CreateImportRequestDto,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.inventoryService.createImportRequest(createDto, tenantId, user.id);
  }

  @Get('import-requests')
  @ApiOperation({ summary: 'List import requests' })
  async getImportRequests(@TenantId() tenantId: string) {
    // [GUESS: Simple list implementation, filtering can be added later]
    return { message: 'Import requests list - to be implemented' };
  }

  @Post('import-requests/:id/approve')
  @ApiOperation({ summary: 'Approve import request (Admin only)' })
  async approveImportRequest(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.inventoryService.approveImportRequest(id, tenantId, user.id);
  }

  @Post('import-requests/:id/reject')
  @ApiOperation({ summary: 'Reject import request (Admin only)' })
  async rejectImportRequest(
    @Param('id') id: string,
    @Body() rejectDto: ApproveRejectDto,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.inventoryService.rejectImportRequest(
      id,
      tenantId,
      user.id,
      rejectDto.reason,
    );
  }

  // Export Requests
  @Post('export-requests')
  @ApiOperation({ summary: 'Create export request' })
  async createExportRequest(
    @Body() createDto: CreateExportRequestDto,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.inventoryService.createExportRequest(createDto, tenantId, user.id);
  }

  @Get('export-requests')
  @ApiOperation({ summary: 'List export requests' })
  async getExportRequests(@TenantId() tenantId: string) {
    // [GUESS: Simple list implementation, filtering can be added later]
    return { message: 'Export requests list - to be implemented' };
  }

  @Post('export-requests/:id/approve')
  @ApiOperation({ summary: 'Approve export request (Admin only)' })
  async approveExportRequest(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.inventoryService.approveExportRequest(id, tenantId, user.id);
  }

  @Post('export-requests/:id/confirm-receipt')
  @ApiOperation({ summary: 'Confirm export receipt at branch' })
  async confirmExportReceipt(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.inventoryService.confirmExportReceipt(id, tenantId, user.id);
  }

  @Post('export-requests/:id/reject')
  @ApiOperation({ summary: 'Reject export request (Admin only)' })
  async rejectExportRequest(
    @Param('id') id: string,
    @Body() rejectDto: ApproveRejectDto,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.inventoryService.rejectExportRequest(
      id,
      tenantId,
      user.id,
      rejectDto.reason,
    );
  }

  // Inventory Viewing
  @Get('central-warehouse')
  @ApiOperation({ summary: 'Get central warehouse inventory' })
  @ApiQuery({ name: 'productId', required: false })
  async getCentralWarehouseInventory(
    @TenantId() tenantId: string,
    @Query('productId') productId?: string,
  ) {
    return this.inventoryService.getCentralWarehouseInventory(tenantId, productId);
  }

  @Get('branches/:branchId')
  @ApiOperation({ summary: 'Get branch inventory' })
  @ApiQuery({ name: 'productId', required: false })
  async getBranchInventory(
    @Param('branchId') branchId: string,
    @TenantId() tenantId: string,
    @Query('productId') productId?: string,
  ) {
    return this.inventoryService.getBranchInventory(tenantId, branchId, productId);
  }

  @Get('all-locations')
  @ApiOperation({ summary: 'Get inventory across all locations' })
  @ApiQuery({ name: 'productId', required: false })
  async getAllLocationsInventory(
    @TenantId() tenantId: string,
    @Query('productId') productId?: string,
  ) {
    return this.inventoryService.getAllLocationsInventory(tenantId, productId);
  }
}

