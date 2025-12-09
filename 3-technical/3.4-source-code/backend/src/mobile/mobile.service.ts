import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity, ServiceType } from '../services/entities/service.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { PointsTransactionEntity } from '../customers/entities/points-transaction.entity';
import { BranchEntity } from '../branches/entities/branch.entity';

@Injectable()
export class MobileService {
  constructor(
    @InjectRepository(ServiceEntity)
    private servicesRepository: Repository<ServiceEntity>,
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
    @InjectRepository(PointsTransactionEntity)
    private pointsTransactionRepository: Repository<PointsTransactionEntity>,
    @InjectRepository(BranchEntity)
    private branchesRepository: Repository<BranchEntity>,
  ) {}

  async getServices(tenantId: string, type?: ServiceType): Promise<ServiceEntity[]> {
    const where: any = { tenantId, isActive: true };
    if (type) {
      where.type = type;
    }

    return this.servicesRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async getCustomerByQrCode(qrCode: string, tenantId: string): Promise<CustomerEntity | null> {
    return this.customersRepository.findOne({
      where: { qrCode, tenantId },
    });
  }

  async getCustomerPoints(customerId: string, tenantId: string): Promise<{
    points: number;
    membershipTier: string;
    transactions: PointsTransactionEntity[];
  }> {
    const customer = await this.customersRepository.findOne({
      where: { id: customerId, tenantId },
    });

    if (!customer) {
      return null;
    }

    const transactions = await this.pointsTransactionRepository.find({
      where: { customerId, tenantId },
      order: { createdAt: 'DESC' },
      take: 20, // Last 20 transactions
    });

    return {
      points: customer.points,
      membershipTier: customer.membershipTier,
      transactions,
    };
  }

  async getBranches(tenantId: string): Promise<BranchEntity[]> {
    return this.branchesRepository.find({
      where: { tenantId, isActive: true },
      order: { name: 'ASC' },
    });
  }
}

