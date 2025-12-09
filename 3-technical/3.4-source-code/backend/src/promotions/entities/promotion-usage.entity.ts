import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PromotionEntity } from './promotion.entity';

@Entity('promotion_usage')
@Index(['promotionId', 'billId'])
@Index(['tenantId', 'customerId'])
export class PromotionUsageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column('uuid')
  @Index()
  promotionId: string;

  @ManyToOne(() => PromotionEntity)
  @JoinColumn({ name: 'promotionId' })
  promotion: PromotionEntity;

  @Column('uuid')
  @Index()
  billId: string;

  @Column('uuid', { nullable: true })
  customerId: string | null;

  @Column('decimal', { precision: 15, scale: 2 })
  discountAmount: number;

  @CreateDateColumn()
  createdAt: Date;
}

