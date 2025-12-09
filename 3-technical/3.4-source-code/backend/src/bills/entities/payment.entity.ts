import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BillEntity } from './bill.entity';

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  OTHER = 'OTHER',
}

@Entity('payments')
@Index(['billId'])
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  billId: string;

  @ManyToOne(() => BillEntity, (bill) => bill.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'billId' })
  bill: BillEntity;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  change: number; // For cash payments

  @CreateDateColumn()
  createdAt: Date;
}

