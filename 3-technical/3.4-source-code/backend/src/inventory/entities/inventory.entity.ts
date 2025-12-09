import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { BranchEntity } from '../../branches/entities/branch.entity';

export enum LocationType {
  CENTRAL_WAREHOUSE = 'CENTRAL_WAREHOUSE',
  BRANCH = 'BRANCH',
}

@Entity('inventory')
@Index(['tenantId', 'productId', 'locationType', 'locationId'], { unique: true })
export class InventoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  @Index()
  tenantId: string;

  @Column('uuid')
  @Index()
  productId: string;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column({
    type: 'enum',
    enum: LocationType,
  })
  locationType: LocationType;

  @Column('uuid', { nullable: true })
  @Index()
  locationId: string | null; // branchId or null for central warehouse

  @ManyToOne(() => BranchEntity, { nullable: true })
  @JoinColumn({ name: 'locationId' })
  branch: BranchEntity | null;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  quantity: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  reservedQuantity: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  lowStockThreshold: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;
}

