import { MigrationInterface, QueryRunner, Table, Index, ForeignKey } from 'typeorm';

export class CreateInventoryTable1702000000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inventory',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'tenantId',
            type: 'uuid',
          },
          {
            name: 'productId',
            type: 'uuid',
          },
          {
            name: 'locationType',
            type: 'enum',
            enum: ['CENTRAL_WAREHOUSE', 'BRANCH'],
          },
          {
            name: 'locationId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: 'reservedQuantity',
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: 'lowStockThreshold',
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: 'lastUpdated',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'inventory',
      new Index({
        name: 'IDX_inventory_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'inventory',
      new Index({
        name: 'IDX_inventory_productId',
        columnNames: ['productId'],
      }),
    );

    await queryRunner.createIndex(
      'inventory',
      new Index({
        name: 'IDX_inventory_locationId',
        columnNames: ['locationId'],
      }),
    );

    await queryRunner.createIndex(
      'inventory',
      new Index({
        name: 'IDX_inventory_tenant_product_location',
        columnNames: ['tenantId', 'productId', 'locationType', 'locationId'],
        isUnique: true,
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY inventory_tenant_isolation ON inventory
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS inventory_tenant_isolation ON inventory;`);
    await queryRunner.query(`ALTER TABLE inventory DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('inventory');
  }
}

