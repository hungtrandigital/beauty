import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PricingService } from './pricing.service';
import { CreateBranchPricingDto } from './dto/create-branch-pricing.dto';
import { UpdateBranchPricingDto } from './dto/update-branch-pricing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { TenantId } from '../common/decorators/tenant.decorator';

@ApiTags('Pricing')
@Controller('pricing')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  @ApiOperation({ summary: 'Create branch-specific pricing' })
  async create(
    @Body() createDto: CreateBranchPricingDto,
    @TenantId() tenantId: string,
  ) {
    return this.pricingService.create(createDto, tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all branch pricing' })
  @ApiQuery({ name: 'branchId', required: false })
  async findAll(@TenantId() tenantId: string, @Query('branchId') branchId?: string) {
    return this.pricingService.findAll(tenantId, branchId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get branch pricing by ID' })
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.pricingService.findOne(id, tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update branch pricing' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateBranchPricingDto,
    @TenantId() tenantId: string,
  ) {
    return this.pricingService.update(id, updateDto, tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete branch pricing' })
  async remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.pricingService.remove(id, tenantId);
  }
}

