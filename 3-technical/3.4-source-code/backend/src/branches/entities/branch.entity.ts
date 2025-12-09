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

  @Column({ nullable: true })
  hotline: string;

  @Column('jsonb', { nullable: true })
  address: {
    street?: string;
    ward?: string;
    district?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  };

  @Column({ nullable: true })
  googleMapsUrl: string;

  @Column({ nullable: true })
  parkingInfo: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

