import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum ProductType {
  PRODUCT = 'PRODUCT',
  DYE = 'DYE',
}

@Entity('products')
@Index(['tenantId', 'name'])
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.PRODUCT,
  })
  type: ProductType;

  @Column('decimal', { precision: 15, scale: 2 })
  customerPrice: number;

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  staffPrice: number;

  @Column('text', { array: true, default: [] })
  images: string[];

  @Column('jsonb', { nullable: true })
  commissionSplit: {
    type: 'RATIO' | 'SALARY_LEVEL';
    ratio?: number;
    salaryLevel?: string;
    splits?: Array<{
      role: string;
      percentage: number;
    }>;
  };

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

