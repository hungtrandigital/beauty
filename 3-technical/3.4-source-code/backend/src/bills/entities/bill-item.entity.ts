import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BillEntity } from './bill.entity';

export enum BillItemType {
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
}

@Entity('bill_items')
@Index(['billId'])
export class BillItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  billId: string;

  @ManyToOne(() => BillEntity, (bill) => bill.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'billId' })
  bill: BillEntity;

  @Column({
    type: 'enum',
    enum: BillItemType,
  })
  type: BillItemType;

  @Column('uuid')
  itemId: string; // productId or serviceId

  @Column()
  name: string;

  @Column('decimal', { precision: 15, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 15, scale: 2 })
  unitPrice: number;

  @Column('decimal', { precision: 15, scale: 2 })
  total: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  discount: number;
}

