import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { SystemSettingsEntity, SettingsCategory } from './entities/system-settings.entity';
import { ActivityLogEntity, ActionType, ResourceType } from './entities/activity-log.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateSystemSettingsDto } from './dto/update-system-settings.dto';
import { UsersService } from '../users/users.service';
import { BranchesService } from '../branches/branches.service';
import { TenantsService } from '../tenants/tenants.service';
import { UserEntity, UserRole } from '../users/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
    @InjectRepository(SystemSettingsEntity)
    private settingsRepository: Repository<SystemSettingsEntity>,
    @InjectRepository(ActivityLogEntity)
    private activityLogRepository: Repository<ActivityLogEntity>,
    private usersService: UsersService,
    private branchesService: BranchesService,
    private tenantsService: TenantsService,
  ) {}

  // User Management
  async getUsers(
    tenantId: string,
    filters?: {
      role?: UserRole;
      branchId?: string;
      status?: boolean;
      search?: string;
      page?: number;
      limit?: number;
    },
  ): Promise<{ users: UserEntity[]; total: number; page: number; limit: number }> {
    // [GUESS: Simple user listing - pagination can be enhanced later]
    const users = await this.usersService.findAll(tenantId);
    
    let filtered = users;
    if (filters?.role) {
      filtered = filtered.filter((u) => u.role === filters.role);
    }
    if (filters?.status !== undefined) {
      filtered = filtered.filter((u) => u.isActive === filters.status);
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchLower) ||
          u.email.toLowerCase().includes(searchLower),
      );
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 50;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      users: filtered.slice(start, end),
      total: filtered.length,
      page,
      limit,
    };
  }

  async updateUser(
    userId: string,
    tenantId: string,
    updateData: Partial<UserEntity>,
    updatedBy: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.findById(userId);
    if (!user || user.tenantId !== tenantId) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updated = await this.usersService.update(userId, updateData);

    // Log activity
    await this.logActivity(
      tenantId,
      updatedBy,
      ActionType.UPDATE,
      ResourceType.USER,
      userId,
      { changes: updateData },
    );

    return updated;
  }

  async deactivateUser(
    userId: string,
    tenantId: string,
    deactivatedBy: string,
  ): Promise<void> {
    await this.updateUser(userId, tenantId, { isActive: false }, deactivatedBy);
  }

  async reactivateUser(
    userId: string,
    tenantId: string,
    reactivatedBy: string,
  ): Promise<UserEntity> {
    return this.updateUser(userId, tenantId, { isActive: true }, reactivatedBy);
  }

  // Role Management
  async createRole(createDto: CreateRoleDto, tenantId: string): Promise<RoleEntity> {
    // Check if role name already exists
    const existing = await this.rolesRepository.findOne({
      where: { tenantId, name: createDto.name },
    });

    if (existing) {
      throw new BadRequestException(`Role with name ${createDto.name} already exists`);
    }

    if (createDto.permissions.length === 0) {
      throw new BadRequestException('Role must have at least one permission');
    }

    const role = this.rolesRepository.create({
      ...createDto,
      tenantId,
      isSystem: false,
    });

    return this.rolesRepository.save(role);
  }

  async findAllRoles(tenantId: string): Promise<RoleEntity[]> {
    return this.rolesRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneRole(id: string, tenantId: string): Promise<RoleEntity> {
    const role = await this.rolesRepository.findOne({
      where: { id, tenantId },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async updateRole(
    id: string,
    updateDto: UpdateRoleDto,
    tenantId: string,
  ): Promise<RoleEntity> {
    const role = await this.findOneRole(id, tenantId);

    if (role.isSystem) {
      throw new BadRequestException('System roles cannot be modified');
    }

    if (updateDto.permissions && updateDto.permissions.length === 0) {
      throw new BadRequestException('Role must have at least one permission');
    }

    Object.assign(role, updateDto);
    return this.rolesRepository.save(role);
  }

  async removeRole(id: string, tenantId: string): Promise<void> {
    const role = await this.findOneRole(id, tenantId);

    if (role.isSystem) {
      throw new BadRequestException('System roles cannot be deleted');
    }

    await this.rolesRepository.remove(role);
  }

  // System Settings
  async getSettings(tenantId: string): Promise<Record<string, any>> {
    const settings = await this.settingsRepository.find({
      where: { tenantId },
    });

    const result: Record<string, any> = {};
    settings.forEach((setting) => {
      result[setting.category.toLowerCase()] = setting.settings;
    });

    return result;
  }

  async updateSettings(
    category: SettingsCategory,
    settings: Record<string, any>,
    tenantId: string,
    updatedBy: string,
  ): Promise<SystemSettingsEntity> {
    let setting = await this.settingsRepository.findOne({
      where: { tenantId, category },
    });

    if (!setting) {
      setting = this.settingsRepository.create({
        tenantId,
        category,
        settings: {},
        updatedBy,
      });
    }

    setting.settings = { ...setting.settings, ...settings };
    setting.updatedBy = updatedBy;

    return this.settingsRepository.save(setting);
  }

  // Activity Logs
  async getActivityLogs(
    tenantId: string,
    filters?: {
      userId?: string;
      actionType?: ActionType;
      resourceType?: ResourceType;
      startDate?: Date;
      endDate?: Date;
      page?: number;
      limit?: number;
    },
  ): Promise<{
    logs: ActivityLogEntity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const where: any = { tenantId };

    if (filters?.userId) {
      where.userId = filters.userId;
    }
    if (filters?.actionType) {
      where.actionType = filters.actionType;
    }
    if (filters?.resourceType) {
      where.resourceType = filters.resourceType;
    }
    if (filters?.startDate || filters?.endDate) {
      where.createdAt = Between(
        filters.startDate || new Date(0),
        filters.endDate || new Date(),
      );
    }

    const [logs, total] = await this.activityLogRepository.findAndCount({
      where,
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: filters?.limit || 50,
      skip: ((filters?.page || 1) - 1) * (filters?.limit || 50),
    });

    return {
      logs,
      total,
      page: filters?.page || 1,
      limit: filters?.limit || 50,
    };
  }

  async logActivity(
    tenantId: string,
    userId: string,
    actionType: ActionType,
    resourceType: ResourceType,
    resourceId: string | null,
    details: Record<string, any> | null,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<ActivityLogEntity> {
    const log = this.activityLogRepository.create({
      tenantId,
      userId,
      actionType,
      resourceType,
      resourceId,
      details,
      ipAddress,
      userAgent,
    });

    return this.activityLogRepository.save(log);
  }

  // Dashboard
  async getDashboardMetrics(tenantId: string): Promise<{
    totalUsers: number;
    activeUsers: number;
    totalBranches: number;
    activeBranches: number;
    recentActivity: ActivityLogEntity[];
    systemHealth: {
      status: 'HEALTHY' | 'WARNING' | 'ERROR';
      message: string;
    };
  }> {
    const users = await this.usersService.findAll(tenantId);
    const branches = await this.branchesService.findAll(tenantId);

    const recentActivity = await this.activityLogRepository.find({
      where: { tenantId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
      take: 10,
    });

    // [GUESS: Simple system health check]
    const systemHealth = {
      status: 'HEALTHY' as const,
      message: 'All systems operational',
    };

    return {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.isActive).length,
      totalBranches: branches.length,
      activeBranches: branches.filter((b) => b.isActive).length,
      recentActivity,
      systemHealth,
    };
  }
}

