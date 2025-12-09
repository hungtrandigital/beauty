import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateSystemSettingsDto } from './dto/update-system-settings.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { AdminGuard } from './guards/admin.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { TenantId } from '../common/decorators/tenant.decorator';
import { UserRole } from '../users/entities/user.entity';
import { ActionType as LogActionType, ResourceType as LogResourceType } from './entities/activity-log.entity';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, TenantGuard, AdminGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // User Management
  @Get('users')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiQuery({ name: 'role', enum: UserRole, required: false })
  @ApiQuery({ name: 'branchId', required: false })
  @ApiQuery({ name: 'status', required: false, type: Boolean })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getUsers(
    @TenantId() tenantId: string,
    @Query('role') role?: UserRole,
    @Query('branchId') branchId?: string,
    @Query('status') status?: boolean,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getUsers(tenantId, {
      role,
      branchId,
      status,
      search,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @Put('users/:id')
  @ApiOperation({ summary: 'Update user (Admin only)' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: any,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.adminService.updateUser(id, tenantId, updateData, user.id);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Deactivate user (Admin only)' })
  async deactivateUser(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.adminService.deactivateUser(id, tenantId, user.id);
  }

  @Post('users/:id/reactivate')
  @ApiOperation({ summary: 'Reactivate user (Admin only)' })
  async reactivateUser(
    @Param('id') id: string,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.adminService.reactivateUser(id, tenantId, user.id);
  }

  // Role Management
  @Get('roles')
  @ApiOperation({ summary: 'Get all roles (Admin only)' })
  async getRoles(@TenantId() tenantId: string) {
    return this.adminService.findAllRoles(tenantId);
  }

  @Get('roles/:id')
  @ApiOperation({ summary: 'Get role by ID (Admin only)' })
  async getRole(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.adminService.findOneRole(id, tenantId);
  }

  @Post('roles')
  @ApiOperation({ summary: 'Create custom role (Admin only)' })
  async createRole(
    @Body() createDto: CreateRoleDto,
    @TenantId() tenantId: string,
  ) {
    return this.adminService.createRole(createDto, tenantId);
  }

  @Put('roles/:id')
  @ApiOperation({ summary: 'Update role (Admin only)' })
  async updateRole(
    @Param('id') id: string,
    @Body() updateDto: UpdateRoleDto,
    @TenantId() tenantId: string,
  ) {
    return this.adminService.updateRole(id, updateDto, tenantId);
  }

  @Delete('roles/:id')
  @ApiOperation({ summary: 'Delete role (Admin only)' })
  async deleteRole(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.adminService.removeRole(id, tenantId);
  }

  @Get('permissions')
  @ApiOperation({ summary: 'Get all available permissions (Admin only)' })
  async getPermissions() {
    // [GUESS: Permission list - can be expanded later]
    return {
      permissions: [
        { id: 'users.create', name: 'Create Users', category: 'USERS' },
        { id: 'users.update', name: 'Update Users', category: 'USERS' },
        { id: 'users.delete', name: 'Delete Users', category: 'USERS' },
        { id: 'bills.create', name: 'Create Bills', category: 'BILLS' },
        { id: 'bills.update', name: 'Update Bills', category: 'BILLS' },
        { id: 'inventory.manage', name: 'Manage Inventory', category: 'INVENTORY' },
        { id: 'inventory.approve', name: 'Approve Inventory', category: 'INVENTORY' },
        { id: 'products.manage', name: 'Manage Products', category: 'PRODUCTS' },
        { id: 'services.manage', name: 'Manage Services', category: 'SERVICES' },
        { id: 'promotions.manage', name: 'Manage Promotions', category: 'PROMOTIONS' },
        { id: 'customers.manage', name: 'Manage Customers', category: 'CUSTOMERS' },
        { id: 'reports.view', name: 'View Reports', category: 'REPORTS' },
        { id: 'settings.manage', name: 'Manage Settings', category: 'SETTINGS' },
      ],
    };
  }

  // System Settings
  @Get('settings')
  @ApiOperation({ summary: 'Get all system settings (Admin only)' })
  async getSettings(@TenantId() tenantId: string) {
    return this.adminService.getSettings(tenantId);
  }

  @Put('settings/general')
  @ApiOperation({ summary: 'Update general settings (Admin only)' })
  async updateGeneralSettings(
    @Body() updateDto: UpdateSystemSettingsDto,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.adminService.updateSettings(
      'GENERAL',
      updateDto.settings,
      tenantId,
      user.id,
    );
  }

  @Put('settings/notifications')
  @ApiOperation({ summary: 'Update notification settings (Admin only)' })
  async updateNotificationSettings(
    @Body() updateDto: UpdateSystemSettingsDto,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.adminService.updateSettings(
      'NOTIFICATIONS',
      updateDto.settings,
      tenantId,
      user.id,
    );
  }

  @Put('settings/security')
  @ApiOperation({ summary: 'Update security settings (Admin only)' })
  async updateSecuritySettings(
    @Body() updateDto: UpdateSystemSettingsDto,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.adminService.updateSettings(
      'SECURITY',
      updateDto.settings,
      tenantId,
      user.id,
    );
  }

  @Put('settings/business')
  @ApiOperation({ summary: 'Update business settings (Admin only)' })
  async updateBusinessSettings(
    @Body() updateDto: UpdateSystemSettingsDto,
    @TenantId() tenantId: string,
    @CurrentUser() user: any,
  ) {
    return this.adminService.updateSettings(
      'BUSINESS',
      updateDto.settings,
      tenantId,
      user.id,
    );
  }

  // Activity Logs
  @Get('activity-logs')
  @ApiOperation({ summary: 'Get activity logs (Admin only)' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiQuery({ name: 'actionType', enum: LogActionType, required: false })
  @ApiQuery({ name: 'resourceType', enum: LogResourceType, required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getActivityLogs(
    @TenantId() tenantId: string,
    @Query('userId') userId?: string,
    @Query('actionType') actionType?: LogActionType,
    @Query('resourceType') resourceType?: LogResourceType,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.adminService.getActivityLogs(tenantId, {
      userId,
      actionType,
      resourceType,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  // Dashboard
  @Get('dashboard')
  @ApiOperation({ summary: 'Get admin dashboard metrics (Admin only)' })
  async getDashboard(@TenantId() tenantId: string) {
    return this.adminService.getDashboardMetrics(tenantId);
  }
}

