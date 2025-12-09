import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { TenantId } from '../common/decorators/tenant.decorator';

@ApiTags('Branches')
@Controller('branches')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new branch' })
  async create(
    @Body() createBranchDto: CreateBranchDto,
    @TenantId() tenantId: string,
  ) {
    return this.branchesService.create(createBranchDto, tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all branches in tenant' })
  async findAll(@TenantId() tenantId: string) {
    return this.branchesService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get branch by ID' })
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.branchesService.findOne(id, tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update branch' })
  async update(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
    @TenantId() tenantId: string,
  ) {
    return this.branchesService.update(id, updateBranchDto, tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete branch' })
  async remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.branchesService.remove(id, tenantId);
  }
}

