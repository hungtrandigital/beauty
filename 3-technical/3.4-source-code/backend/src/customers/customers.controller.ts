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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { TenantId } from '../common/decorators/tenant.decorator';

@ApiTags('Customers')
@Controller('customers')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  async create(
    @Body() createDto: CreateCustomerDto,
    @TenantId() tenantId: string,
  ) {
    return this.customersService.create(createDto, tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all customers' })
  @ApiQuery({ name: 'search', required: false })
  async findAll(@TenantId() tenantId: string, @Query('search') search?: string) {
    return this.customersService.findAll(tenantId, search);
  }

  @Get('search/qr/:qrCode')
  @ApiOperation({ summary: 'Find customer by QR code' })
  async findByQrCode(@Param('qrCode') qrCode: string, @TenantId() tenantId: string) {
    return this.customersService.findByQrCode(qrCode, tenantId);
  }

  @Get('search/phone/:phone')
  @ApiOperation({ summary: 'Find customer by phone' })
  async findByPhone(@Param('phone') phone: string, @TenantId() tenantId: string) {
    return this.customersService.findByPhone(phone, tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get customer by ID' })
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.customersService.findOne(id, tenantId);
  }

  @Get(':id/history')
  @ApiOperation({ summary: 'Get customer history' })
  async getHistory(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.customersService.getCustomerHistory(id, tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCustomerDto,
    @TenantId() tenantId: string,
  ) {
    return this.customersService.update(id, updateDto, tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete customer' })
  async remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.customersService.remove(id, tenantId);
  }
}

