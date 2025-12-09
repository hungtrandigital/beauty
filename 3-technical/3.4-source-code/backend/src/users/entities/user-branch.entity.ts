import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BranchEntity } from '../../branches/entities/branch.entity';

@Entity('user_branches')
@Index(['userId', 'branchId'], { unique: true })
export class UserBranchEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid')
  @Index()
  branchId: string;

  @ManyToOne(() => BranchEntity)
  @JoinColumn({ name: 'branchId' })
  branch: BranchEntity;
}

