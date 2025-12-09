import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchEntity } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(BranchEntity)
    private branchesRepository: Repository<BranchEntity>,
  ) {}

  async create(createBranchDto: CreateBranchDto, tenantId: string): Promise<BranchEntity> {
    // Check if code already exists for this tenant
    const existing = await this.branchesRepository.findOne({
      where: { tenantId, code: createBranchDto.code },
    });

    if (existing) {
      throw new Error(`Branch with code ${createBranchDto.code} already exists`);
    }

    const branch = this.branchesRepository.create({
      ...createBranchDto,
      tenantId,
    });

    return this.branchesRepository.save(branch);
  }

  async findAll(tenantId: string): Promise<BranchEntity[]> {
    return this.branchesRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, tenantId: string): Promise<BranchEntity> {
    const branch = await this.branchesRepository.findOne({
      where: { id, tenantId },
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }

    return branch;
  }

  async update(
    id: string,
    updateBranchDto: UpdateBranchDto,
    tenantId: string,
  ): Promise<BranchEntity> {
    const branch = await this.findOne(id, tenantId);

    // If code is being updated, check uniqueness
    if (updateBranchDto.code && updateBranchDto.code !== branch.code) {
      const existing = await this.branchesRepository.findOne({
        where: { tenantId, code: updateBranchDto.code },
      });

      if (existing) {
        throw new Error(`Branch with code ${updateBranchDto.code} already exists`);
      }
    }

    Object.assign(branch, updateBranchDto);
    return this.branchesRepository.save(branch);
  }

  async remove(id: string, tenantId: string): Promise<void> {
    const branch = await this.findOne(id, tenantId);
    await this.branchesRepository.remove(branch);
  }
}

