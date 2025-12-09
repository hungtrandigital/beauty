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
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { TenantId } from '../common/decorators/tenant.decorator';

@ApiTags('Promotions')
@Controller('promotions')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new promotion' })
  async create(
    @Body() createDto: CreatePromotionDto,
    @TenantId() tenantId: string,
  ) {
    return this.promotionsService.create(createDto, tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all promotions' })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  async findAll(
    @TenantId() tenantId: string,
    @Query('isActive') isActive?: boolean,
  ) {
    return this.promotionsService.findAll(tenantId, isActive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get promotion by ID' })
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.promotionsService.findOne(id, tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update promotion' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePromotionDto,
    @TenantId() tenantId: string,
  ) {
    return this.promotionsService.update(id, updateDto, tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete promotion' })
  async remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.promotionsService.remove(id, tenantId);
  }

  @Post('vouchers')
  @ApiOperation({ summary: 'Create a voucher' })
  async createVoucher(
    @Body() createDto: CreateVoucherDto,
    @TenantId() tenantId: string,
  ) {
    return this.promotionsService.createVoucher(createDto, tenantId);
  }

  @Get('vouchers/:code')
  @ApiOperation({ summary: 'Get voucher by code' })
  async findVoucherByCode(
    @Param('code') code: string,
    @TenantId() tenantId: string,
  ) {
    return this.promotionsService.findVoucherByCode(code, tenantId);
  }
}

