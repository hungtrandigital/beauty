import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateProductsTable1702000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
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
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['PRODUCT', 'DYE'],
            default: "'PRODUCT'",
          },
          {
            name: 'customerPrice',
            type: 'decimal',
            precision: 15,
            scale: 2,
          },
          {
            name: 'staffPrice',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'images',
            type: 'text',
            isArray: true,
            default: "'{}'",
          },
          {
            name: 'commissionSplit',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'products',
      new Index({
        name: 'IDX_products_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'products',
      new Index({
        name: 'IDX_products_tenantId_name',
        columnNames: ['tenantId', 'name'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE products ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY products_tenant_isolation ON products
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS products_tenant_isolation ON products;`);
    await queryRunner.query(`ALTER TABLE products DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('products');
  }
}

