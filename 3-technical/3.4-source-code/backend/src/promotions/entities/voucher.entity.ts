import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PromotionEntity } from './promotion.entity';

@Entity('vouchers')
@Index(['tenantId', 'code'], { unique: true })
@Index(['promotionId'])
export class VoucherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column('uuid', { nullable: true })
  promotionId: string | null;

  @ManyToOne(() => PromotionEntity, { nullable: true })
  @JoinColumn({ name: 'promotionId' })
  promotion: PromotionEntity | null;

  @Column()
  code: string;

  @Column({ type: 'int', default: 0 })
  usageCount: number;

  @Column({ type: 'int', nullable: true })
  maxUsage: number | null; // null = unlimited

  @Column('uuid', { nullable: true })
  customerId: string | null; // If voucher is customer-specific

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date | null;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

