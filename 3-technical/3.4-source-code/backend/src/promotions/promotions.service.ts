import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { PromotionEntity, PromotionType } from './entities/promotion.entity';
import { VoucherEntity } from './entities/voucher.entity';
import { PromotionUsageEntity } from './entities/promotion-usage.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { BillEntity } from '../bills/entities/bill.entity';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(PromotionEntity)
    private promotionsRepository: Repository<PromotionEntity>,
    @InjectRepository(VoucherEntity)
    private vouchersRepository: Repository<VoucherEntity>,
    @InjectRepository(PromotionUsageEntity)
    private promotionUsageRepository: Repository<PromotionUsageEntity>,
  ) {}

  async create(createDto: CreatePromotionDto, tenantId: string): Promise<PromotionEntity> {
    const promotion = this.promotionsRepository.create({
      ...createDto,
      tenantId,
    });

    return this.promotionsRepository.save(promotion);
  }

  async findAll(tenantId: string, isActive?: boolean): Promise<PromotionEntity[]> {
    const where: any = { tenantId };
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    return this.promotionsRepository.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, tenantId: string): Promise<PromotionEntity> {
    const promotion = await this.promotionsRepository.findOne({
      where: { id, tenantId },
    });

    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }

    return promotion;
  }

  async update(
    id: string,
    updateDto: UpdatePromotionDto,
    tenantId: string,
  ): Promise<PromotionEntity> {
    const promotion = await this.findOne(id, tenantId);
    Object.assign(promotion, updateDto);
    return this.promotionsRepository.save(promotion);
  }

  async remove(id: string, tenantId: string): Promise<void> {
    const promotion = await this.findOne(id, tenantId);
    await this.promotionsRepository.remove(promotion);
  }

  async getEligiblePromotions(
    tenantId: string,
    bill: BillEntity,
    customerId?: string | null,
  ): Promise<PromotionEntity[]> {
    const now = new Date();
    const promotions = await this.promotionsRepository.find({
      where: {
        tenantId,
        isActive: true,
        startDate: Between(new Date(0), now),
        endDate: Between(now, new Date('2099-12-31')),
      },
    });

    return promotions.filter((promotion) =>
      this.isPromotionEligible(promotion, bill, customerId),
    );
  }

  private isPromotionEligible(
    promotion: PromotionEntity,
    bill: BillEntity,
    customerId?: string | null,
  ): boolean {
    const { rules } = promotion;

    // Check date range
    const now = new Date();
    if (now < promotion.startDate || now > promotion.endDate) {
      return false;
    }

    // Check invoice amount
    if (rules.minInvoiceAmount && bill.subtotal < rules.minInvoiceAmount) {
      return false;
    }
    if (rules.maxInvoiceAmount && bill.subtotal > rules.maxInvoiceAmount) {
      return false;
    }

    // Check branch
    if (rules.branchIds && !rules.branchIds.includes(bill.branchId)) {
      return false;
    }

    // Check usage limits
    // [GUESS: Usage limit checking - will be implemented with usage tracking]

    return true;
  }

  async applyPromotion(
    promotion: PromotionEntity,
    bill: BillEntity,
    tenantId: string,
    customerId?: string | null,
  ): Promise<number> {
    // Calculate discount based on promotion type
    let discount = 0;

    switch (promotion.type) {
      case PromotionType.INVOICE_DISCOUNT:
      case PromotionType.PURCHASE_DISCOUNT:
        if (promotion.rules.discountAmount) {
          discount = promotion.rules.discountAmount;
        } else if (promotion.rules.discountPercentage) {
          discount = (bill.subtotal * promotion.rules.discountPercentage) / 100;
        }
        break;

      case PromotionType.DISCOUNT_BY_INVOICE_AMOUNT:
        if (promotion.rules.discountAmount) {
          discount = promotion.rules.discountAmount;
        } else if (promotion.rules.discountPercentage) {
          discount = (bill.subtotal * promotion.rules.discountPercentage) / 100;
        }
        break;

      case PromotionType.INVOICE_PRODUCT_DISCOUNT:
      case PromotionType.PRODUCT_DISCOUNT_BY_INVOICE_AMOUNT:
        // [GUESS: Product discount - apply to specific products in bill]
        if (promotion.rules.productIds && promotion.rules.discountPercentage) {
          const productItems = bill.items.filter(
            (item) => item.type === 'PRODUCT' && promotion.rules.productIds?.includes(item.itemId),
          );
          discount = productItems.reduce(
            (sum, item) => sum + (item.total * promotion.rules.discountPercentage!) / 100,
            0,
          );
        }
        break;

      default:
        // Gift promotions don't add discount, they add items
        discount = 0;
    }

    // Track usage
    await this.trackPromotionUsage(promotion.id, bill.id, tenantId, customerId || null, discount);

    return discount;
  }

  private async trackPromotionUsage(
    promotionId: string,
    billId: string,
    tenantId: string,
    customerId: string | null,
    discountAmount: number,
  ): Promise<void> {
    const usage = this.promotionUsageRepository.create({
      tenantId,
      promotionId,
      billId,
      customerId,
      discountAmount,
    });

    await this.promotionUsageRepository.save(usage);
  }

  // Voucher methods
  async createVoucher(createDto: CreateVoucherDto, tenantId: string): Promise<VoucherEntity> {
    const voucher = this.vouchersRepository.create({
      ...createDto,
      tenantId,
    });

    return this.vouchersRepository.save(voucher);
  }

  async findVoucherByCode(code: string, tenantId: string): Promise<VoucherEntity | null> {
    return this.vouchersRepository.findOne({
      where: { code, tenantId },
      relations: ['promotion'],
    });
  }

  async useVoucher(voucherId: string, tenantId: string): Promise<void> {
    const voucher = await this.vouchersRepository.findOne({
      where: { id: voucherId, tenantId },
    });

    if (!voucher) {
      throw new NotFoundException(`Voucher not found`);
    }

    if (voucher.maxUsage && voucher.usageCount >= voucher.maxUsage) {
      throw new Error('Voucher usage limit exceeded');
    }

    if (voucher.expiresAt && new Date() > voucher.expiresAt) {
      throw new Error('Voucher has expired');
    }

    voucher.usageCount += 1;
    await this.vouchersRepository.save(voucher);
  }
}

