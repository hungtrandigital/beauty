import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

export enum PointsTransactionType {
  EARNED = 'EARNED',
  REDEEMED = 'REDEEMED',
  ADJUSTED = 'ADJUSTED',
}

@Entity('points_transactions')
@Index(['customerId', 'createdAt'])
export class PointsTransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column('uuid')
  @Index()
  customerId: string;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @Column({
    type: 'enum',
    enum: PointsTransactionType,
  })
  type: PointsTransactionType;

  @Column('int')
  points: number; // Positive for earned, negative for redeemed

  @Column('uuid', { nullable: true })
  billId: string | null; // Reference to bill if points from purchase

  @Column('text', { nullable: true })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;
}

