import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('branches')
@Index(['tenantId', 'code'], { unique: true })
export class BranchEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  hotline: string | null;

  @Column('jsonb', { nullable: true })
  address: {
    street?: string;
    ward?: string;
    district?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  } | null;

  @Column({ type: 'varchar', nullable: true })
  googleMapsUrl: string | null;

  @Column({ type: 'text', nullable: true })
  parkingInfo: string | null;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

