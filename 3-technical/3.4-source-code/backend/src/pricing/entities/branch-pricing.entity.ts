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
import { BranchEntity } from '../../branches/entities/branch.entity';

export enum PricingItemType {
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
}

@Entity('branch_pricing')
@Index(['tenantId', 'branchId', 'itemType', 'itemId'], { unique: true })
export class BranchPricingEntity {
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

  @Column({
    type: 'enum',
    enum: PricingItemType,
  })
  itemType: PricingItemType;

  @Column('uuid')
  @Index()
  itemId: string; // productId or serviceId

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  customerPrice: number | null; // Override customer price (null = use default)

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  staffPrice: number | null; // Override staff price (null = use default)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

