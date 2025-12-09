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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceType } from './entities/service.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TenantGuard } from '../common/guards/tenant.guard';
import { TenantId } from '../common/decorators/tenant.decorator';

@ApiTags('Services')
@Controller('services')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @TenantId() tenantId: string,
  ) {
    return this.servicesService.create(createServiceDto, tenantId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all services in tenant' })
  @ApiQuery({ name: 'type', enum: ServiceType, required: false })
  async findAll(@TenantId() tenantId: string, @Query('type') type?: ServiceType) {
    return this.servicesService.findAll(tenantId, type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get service by ID' })
  async findOne(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.servicesService.findOne(id, tenantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update service' })
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @TenantId() tenantId: string,
  ) {
    return this.servicesService.update(id, updateServiceDto, tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete service' })
  async remove(@Param('id') id: string, @TenantId() tenantId: string) {
    return this.servicesService.remove(id, tenantId);
  }
}

