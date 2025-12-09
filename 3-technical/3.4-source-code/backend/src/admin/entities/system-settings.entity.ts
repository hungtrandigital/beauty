import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum SettingsCategory {
  GENERAL = 'GENERAL',
  NOTIFICATIONS = 'NOTIFICATIONS',
  SECURITY = 'SECURITY',
  BUSINESS = 'BUSINESS',
}

@Entity('system_settings')
@Index(['tenantId', 'category'], { unique: true })
export class SystemSettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column({
    type: 'enum',
    enum: SettingsCategory,
  })
  category: SettingsCategory;

  @Column('jsonb')
  settings: Record<string, any>;

  @Column('uuid')
  updatedBy: string;

  @UpdateDateColumn()
  updatedAt: Date;
}

