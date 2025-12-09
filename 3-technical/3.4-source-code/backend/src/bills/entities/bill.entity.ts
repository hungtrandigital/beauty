import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BranchEntity } from '../../branches/entities/branch.entity';
import { PaymentEntity } from './payment.entity';
import { BillItemEntity } from './bill-item.entity';

export enum BillStatus {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
  PAID = 'PAID',
}

@Entity('bills')
@Index(['tenantId', 'billNumber'], { unique: true })
@Index(['tenantId', 'branchId'])
export class BillEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column('uuid')
  @Index()
  branchId: string;

  @ManyToOne(() => BranchEntity)
  @JoinColumn({ name: 'branchId' })
  branch: BranchEntity;

  @Column()
  billNumber: string;

  @Column('uuid', { nullable: true })
  customerId: string | null;

  @Column({
    type: 'enum',
    enum: BillStatus,
    default: BillStatus.DRAFT,
  })
  status: BillStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @OneToMany(() => BillItemEntity, (item) => item.bill, { cascade: true })
  items: BillItemEntity[];

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  subtotal: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  discount: number;

  @Column('jsonb', { nullable: true })
  appliedPromotions: Array<{
    promotionId: string;
    discount: number;
    name: string;
  }>;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  total: number;

  @OneToMany(() => PaymentEntity, (payment) => payment.bill, { cascade: true })
  payments: PaymentEntity[];

  @Column({ default: false })
  isOffline: boolean;

  @Column({ type: 'timestamp', nullable: true })
  syncedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

