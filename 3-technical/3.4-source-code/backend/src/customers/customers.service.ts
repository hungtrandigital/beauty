import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CustomerEntity, MembershipTier } from './entities/customer.entity';
import { PointsTransactionEntity, PointsTransactionType } from './entities/points-transaction.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
    @InjectRepository(PointsTransactionEntity)
    private pointsTransactionRepository: Repository<PointsTransactionEntity>,
    private dataSource: DataSource,
  ) {}

  async create(createDto: CreateCustomerDto, tenantId: string): Promise<CustomerEntity> {
    // Check if phone already exists
    const existing = await this.customersRepository.findOne({
      where: { tenantId, phone: createDto.phone },
    });

    if (existing) {
      throw new BadRequestException(`Customer with phone ${createDto.phone} already exists`);
    }

    // Generate QR code
    const qrCode = uuidv4();

    const customer = this.customersRepository.create({
      ...createDto,
      tenantId,
      qrCode,
      points: 0,
      membershipTier: MembershipTier.BRONZE,
    });

    return this.customersRepository.save(customer);
  }

  async findAll(tenantId: string, search?: string): Promise<CustomerEntity[]> {
    const queryBuilder = this.customersRepository
      .createQueryBuilder('customer')
      .where('customer.tenantId = :tenantId', { tenantId });

    if (search) {
      queryBuilder.andWhere(
        '(customer.name ILIKE :search OR customer.phone ILIKE :search OR customer.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    return queryBuilder.orderBy('customer.createdAt', 'DESC').getMany();
  }

  async findOne(id: string, tenantId: string): Promise<CustomerEntity> {
    const customer = await this.customersRepository.findOne({
      where: { id, tenantId },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async findByPhone(phone: string, tenantId: string): Promise<CustomerEntity | null> {
    return this.customersRepository.findOne({
      where: { phone, tenantId },
    });
  }

  async findByQrCode(qrCode: string, tenantId: string): Promise<CustomerEntity | null> {
    return this.customersRepository.findOne({
      where: { qrCode, tenantId },
    });
  }

  async update(
    id: string,
    updateDto: UpdateCustomerDto,
    tenantId: string,
  ): Promise<CustomerEntity> {
    const customer = await this.findOne(id, tenantId);

    // Check phone uniqueness if being updated
    if (updateDto.phone && updateDto.phone !== customer.phone) {
      const existing = await this.findByPhone(updateDto.phone, tenantId);
      if (existing) {
        throw new BadRequestException(`Customer with phone ${updateDto.phone} already exists`);
      }
    }

    Object.assign(customer, updateDto);
    return this.customersRepository.save(customer);
  }

  async remove(id: string, tenantId: string): Promise<void> {
    const customer = await this.findOne(id, tenantId);
    await this.customersRepository.remove(customer);
  }

  async addPoints(
    customerId: string,
    tenantId: string,
    points: number,
    billId?: string,
    description?: string,
  ): Promise<CustomerEntity> {
    return await this.dataSource.transaction(async (manager) => {
      const customer = await manager.findOne(CustomerEntity, {
        where: { id: customerId, tenantId },
      });

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${customerId} not found`);
      }

      // Add points transaction
      const transaction = manager.create(PointsTransactionEntity, {
        tenantId,
        customerId,
        type: PointsTransactionType.EARNED,
        points,
        billId,
        description,
      });
      await manager.save(transaction);

      // Update customer points
      customer.points += points;

      // Update membership tier based on total points
      customer.membershipTier = this.calculateMembershipTier(customer.points);

      return manager.save(customer);
    });
  }

  async redeemPoints(
    customerId: string,
    tenantId: string,
    points: number,
    description?: string,
  ): Promise<CustomerEntity> {
    return await this.dataSource.transaction(async (manager) => {
      const customer = await manager.findOne(CustomerEntity, {
        where: { id: customerId, tenantId },
      });

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${customerId} not found`);
      }

      if (customer.points < points) {
        throw new BadRequestException('Insufficient points');
      }

      // Add points transaction
      const transaction = manager.create(PointsTransactionEntity, {
        tenantId,
        customerId,
        type: PointsTransactionType.REDEEMED,
        points: -points,
        description,
      });
      await manager.save(transaction);

      // Update customer points
      customer.points -= points;

      // Update membership tier
      customer.membershipTier = this.calculateMembershipTier(customer.points);

      return manager.save(customer);
    });
  }

  private calculateMembershipTier(points: number): MembershipTier {
    // [GUESS: Tier thresholds - can be made configurable later]
    if (points >= 10000) return MembershipTier.PLATINUM;
    if (points >= 5000) return MembershipTier.GOLD;
    if (points >= 1000) return MembershipTier.SILVER;
    return MembershipTier.BRONZE;
  }

  async getCustomerHistory(
    customerId: string,
    tenantId: string,
  ): Promise<{
    customer: CustomerEntity;
    pointsTransactions: PointsTransactionEntity[];
  }> {
    const customer = await this.findOne(customerId, tenantId);

    const pointsTransactions = await this.pointsTransactionRepository.find({
      where: { customerId, tenantId },
      order: { createdAt: 'DESC' },
      take: 50, // Last 50 transactions
    });

    return { customer, pointsTransactions };
  }
}

