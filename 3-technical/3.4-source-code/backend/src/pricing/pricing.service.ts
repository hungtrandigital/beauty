import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchPricingEntity, PricingItemType } from './entities/branch-pricing.entity';
import { CreateBranchPricingDto } from './dto/create-branch-pricing.dto';
import { UpdateBranchPricingDto } from './dto/update-branch-pricing.dto';
import { BranchesService } from '../branches/branches.service';

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(BranchPricingEntity)
    private branchPricingRepository: Repository<BranchPricingEntity>,
    private branchesService: BranchesService,
  ) {}

  async create(
    createDto: CreateBranchPricingDto,
    tenantId: string,
  ): Promise<BranchPricingEntity> {
    // Validate branch exists
    await this.branchesService.findOne(createDto.branchId, tenantId);

    // Check if pricing already exists
    const existing = await this.branchPricingRepository.findOne({
      where: {
        tenantId,
        branchId: createDto.branchId,
        itemType: createDto.itemType,
        itemId: createDto.itemId,
      },
    });

    if (existing) {
      throw new Error(
        `Pricing already exists for ${createDto.itemType} ${createDto.itemId} in branch ${createDto.branchId}`,
      );
    }

    const pricing = this.branchPricingRepository.create({
      ...createDto,
      tenantId,
    });

    return this.branchPricingRepository.save(pricing);
  }

  async findAll(tenantId: string, branchId?: string): Promise<BranchPricingEntity[]> {
    const where: any = { tenantId };
    if (branchId) {
      where.branchId = branchId;
    }

    return this.branchPricingRepository.find({
      where,
      relations: ['branch'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, tenantId: string): Promise<BranchPricingEntity> {
    const pricing = await this.branchPricingRepository.findOne({
      where: { id, tenantId },
      relations: ['branch'],
    });

    if (!pricing) {
      throw new NotFoundException(`Branch pricing with ID ${id} not found`);
    }

    return pricing;
  }

  async findByItem(
    tenantId: string,
    branchId: string,
    itemType: PricingItemType,
    itemId: string,
  ): Promise<BranchPricingEntity | null> {
    return this.branchPricingRepository.findOne({
      where: {
        tenantId,
        branchId,
        itemType,
        itemId,
      },
    });
  }

  async update(
    id: string,
    updateDto: UpdateBranchPricingDto,
    tenantId: string,
  ): Promise<BranchPricingEntity> {
    const pricing = await this.findOne(id, tenantId);
    Object.assign(pricing, updateDto);
    return this.branchPricingRepository.save(pricing);
  }

  async remove(id: string, tenantId: string): Promise<void> {
    const pricing = await this.findOne(id, tenantId);
    await this.branchPricingRepository.remove(pricing);
  }

  async getEffectivePrice(
    tenantId: string,
    branchId: string,
    itemType: PricingItemType,
    itemId: string,
    defaultCustomerPrice: number,
    defaultStaffPrice?: number,
  ): Promise<{ customerPrice: number; staffPrice: number | null }> {
    const branchPricing = await this.findByItem(tenantId, branchId, itemType, itemId);

    if (branchPricing) {
      return {
        customerPrice: branchPricing.customerPrice ?? defaultCustomerPrice,
        staffPrice: branchPricing.staffPrice ?? defaultStaffPrice ?? null,
      };
    }

    return {
      customerPrice: defaultCustomerPrice,
      staffPrice: defaultStaffPrice ?? null,
    };
  }
}

