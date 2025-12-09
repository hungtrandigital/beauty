import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { TenantId } from '../common/decorators/tenant.decorator';

@ApiTags('Bills')
@Controller('bills')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bill' })
  async create(
    @Body() createBillDto: CreateBillDto,
    @TenantId() tenantId: string,
    @Query('branchId') branchId: string,
  ) {
    if (!branchId) {
      throw new Error('branchId is required');
    }
    return this.billsService.create(createBillDto, tenantId, branchId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bills' })
  @ApiQuery({ name: 'branchId', required: false })
  async findAll(@TenantId() tenantId: string, @Query('branchId') branchId?: string) {
    return this.billsService.findAll(tenantId, branchId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bill by ID' })
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.billsService.findOne(id, tenantId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update bill (draft only)' })
  async update(
    @Param('id') id: string,
    @Body() updateBillDto: UpdateBillDto,
    @TenantId() tenantId: string,
  ) {
    return this.billsService.update(id, updateBillDto, tenantId);
  }

  @Post(':id/pay')
  @ApiOperation({ summary: 'Process payment for bill' })
  async processPayment(
    @Param('id') id: string,
    @Body() processPaymentDto: ProcessPaymentDto,
    @TenantId() tenantId: string,
  ) {
    return this.billsService.processPayment(id, processPaymentDto, tenantId);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel bill' })
  async cancel(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.billsService.cancel(id, tenantId);
  }
}

