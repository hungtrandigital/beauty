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

export enum ImportRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

@Entity('import_requests')
@Index(['tenantId', 'status'])
export class ImportRequestEntity {
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

  @Column({
    type: 'enum',
    enum: ImportRequestStatus,
    default: ImportRequestStatus.PENDING,
  })
  status: ImportRequestStatus;

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

  @Column('text', { nullable: true })
  rejectionReason: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

