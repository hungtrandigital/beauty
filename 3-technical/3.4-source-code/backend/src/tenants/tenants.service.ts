import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(TenantEntity)
    private tenantsRepository: Repository<TenantEntity>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<TenantEntity> {
    const tenant = this.tenantsRepository.create(createTenantDto);
    return this.tenantsRepository.save(tenant);
  }

  async findAll(): Promise<TenantEntity[]> {
    return this.tenantsRepository.find();
  }

  async findOne(id: string): Promise<TenantEntity> {
    const tenant = await this.tenantsRepository.findOne({
      where: { id },
    });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
    return tenant;
  }

  async update(id: string, updateData: Partial<TenantEntity>): Promise<TenantEntity> {
    const tenant = await this.findOne(id);
    Object.assign(tenant, updateData);
    return this.tenantsRepository.save(tenant);
  }

  async remove(id: string): Promise<void> {
    const result = await this.tenantsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
  }
}

