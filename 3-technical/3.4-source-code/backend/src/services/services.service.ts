import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity, ServiceType } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private servicesRepository: Repository<ServiceEntity>,
  ) {}

  async create(createServiceDto: CreateServiceDto, tenantId: string): Promise<ServiceEntity> {
    // Validate commission split totals 100% if provided
    if (createServiceDto.commissionSplit?.splits) {
      const total = createServiceDto.commissionSplit.splits.reduce(
        (sum, split) => sum + split.percentage,
        0,
      );
      if (total !== 100) {
        throw new Error('Commission split percentages must total 100%');
      }
    }

    const service = this.servicesRepository.create({
      ...createServiceDto,
      tenantId,
    });

    return this.servicesRepository.save(service);
  }

  async findAll(tenantId: string, type?: ServiceType): Promise<ServiceEntity[]> {
    const where: any = { tenantId };
    if (type) {
      where.type = type;
    }

    return this.servicesRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, tenantId: string): Promise<ServiceEntity> {
    const service = await this.servicesRepository.findOne({
      where: { id, tenantId },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
    tenantId: string,
  ): Promise<ServiceEntity> {
    const service = await this.findOne(id, tenantId);

    // Validate commission split if being updated
    if (updateServiceDto.commissionSplit?.splits) {
      const total = updateServiceDto.commissionSplit.splits.reduce(
        (sum, split) => sum + split.percentage,
        0,
      );
      if (total !== 100) {
        throw new Error('Commission split percentages must total 100%');
      }
    }

    Object.assign(service, updateServiceDto);
    return this.servicesRepository.save(service);
  }

  async remove(id: string, tenantId: string): Promise<void> {
    const service = await this.findOne(id, tenantId);
    await this.servicesRepository.remove(service);
  }
}

