import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum ServiceType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  BOTH = 'BOTH',
}

@Entity('services')
@Index(['tenantId', 'name'])
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ServiceType,
    default: ServiceType.BOTH,
  })
  type: ServiceType;

  @Column('decimal', { precision: 15, scale: 2 })
  price: number;

  @Column('int', { nullable: true })
  duration: number; // Duration in minutes

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

  @Column('uuid', { array: true, default: [] })
  associatedProductIds: string[]; // Products/dye associated with this service

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

