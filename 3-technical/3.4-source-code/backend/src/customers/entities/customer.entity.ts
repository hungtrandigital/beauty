import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum MembershipTier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
}

@Entity('customers')
@Index(['tenantId', 'phone'], { unique: true })
@Index(['tenantId', 'email'])
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string | null;

  @Column()
  phone: string;

  @Column('text', { nullable: true })
  address: string | null;

  @Column('date', { nullable: true })
  dateOfBirth: Date | null;

  @Column('int', { default: 0 })
  points: number;

  @Column({
    type: 'enum',
    enum: MembershipTier,
    default: MembershipTier.BRONZE,
  })
  membershipTier: MembershipTier;

  @Column('text', { nullable: true })
  qrCode: string | null; // QR code for customer identification

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

