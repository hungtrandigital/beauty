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
import { UserEntity } from '../../users/entities/user.entity';
import { BranchEntity } from '../../branches/entities/branch.entity';

export enum ExportRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

@Entity('export_requests')
@Index(['tenantId', 'status'])
@Index(['tenantId', 'branchId'])
export class ExportRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column('uuid')
  requesterId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'requesterId' })
  requester: UserEntity;

  @Column('uuid')
  @Index()
  branchId: string;

  @ManyToOne(() => BranchEntity)
  @JoinColumn({ name: 'branchId' })
  branch: BranchEntity;

  @Column({
    type: 'enum',
    enum: ExportRequestStatus,
    default: ExportRequestStatus.PENDING,
  })
  status: ExportRequestStatus;

  @Column('jsonb')
  products: Array<{
    productId: string;
    quantity: number;
  }>;

  @Column('text', { nullable: true })
  notes: string;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date | null;

  @Column('uuid', { nullable: true })
  approverId: string | null;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'approverId' })
  approver: UserEntity | null;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date | null;

  @Column('uuid', { nullable: true })
  confirmerId: string | null;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'confirmerId' })
  confirmer: UserEntity | null;

  @Column('text', { nullable: true })
  rejectionReason: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

