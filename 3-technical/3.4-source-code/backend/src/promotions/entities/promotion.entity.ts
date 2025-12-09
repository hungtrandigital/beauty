import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum PromotionType {
  INVOICE_DISCOUNT = 'INVOICE_DISCOUNT',
  INVOICE_GIFT = 'INVOICE_GIFT',
  INVOICE_PRODUCT_DISCOUNT = 'INVOICE_PRODUCT_DISCOUNT',
  INVOICE_VOUCHER_GIFT = 'INVOICE_VOUCHER_GIFT',
  PURCHASE_DISCOUNT = 'PURCHASE_DISCOUNT',
  PURCHASE_GIFT = 'PURCHASE_GIFT',
  PURCHASE_VOUCHER_GIFT = 'PURCHASE_VOUCHER_GIFT',
  DISCOUNT_BY_INVOICE_AMOUNT = 'DISCOUNT_BY_INVOICE_AMOUNT',
  GIFT_BY_INVOICE_AMOUNT = 'GIFT_BY_INVOICE_AMOUNT',
  PRODUCT_DISCOUNT_BY_INVOICE_AMOUNT = 'PRODUCT_DISCOUNT_BY_INVOICE_AMOUNT',
}

@Entity('promotions')
@Index(['tenantId', 'isActive'])
@Index(['tenantId', 'startDate', 'endDate'])
export class PromotionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column({
    type: 'enum',
    enum: PromotionType,
  })
  type: PromotionType;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('jsonb')
  rules: {
    // Common rules
    minInvoiceAmount?: number;
    maxInvoiceAmount?: number;
    discountAmount?: number;
    discountPercentage?: number;
    giftProductId?: string;
    giftQuantity?: number;
    voucherCode?: string;
    productIds?: string[];
    serviceIds?: string[];
    // Usage limits
    maxUsage?: number;
    maxUsagePerCustomer?: number;
    // Conditions
    customerTier?: string[];
    branchIds?: string[];
  };

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

