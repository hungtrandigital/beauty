import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateBranchPricingTable1702000000013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'branch_pricing',
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
            name: 'branchId',
            type: 'uuid',
          },
          {
            name: 'itemType',
            type: 'enum',
            enum: ['PRODUCT', 'SERVICE'],
          },
          {
            name: 'itemId',
            type: 'uuid',
          },
          {
            name: 'customerPrice',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'staffPrice',
            type: 'decimal',
            precision: 15,
            scale: 2,
            isNullable: true,
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
      'branch_pricing',
      new Index({
        name: 'IDX_branch_pricing_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'branch_pricing',
      new Index({
        name: 'IDX_branch_pricing_branchId',
        columnNames: ['branchId'],
      }),
    );

    await queryRunner.createIndex(
      'branch_pricing',
      new Index({
        name: 'IDX_branch_pricing_tenant_branch_item',
        columnNames: ['tenantId', 'branchId', 'itemType', 'itemId'],
        isUnique: true,
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE branch_pricing ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY branch_pricing_tenant_isolation ON branch_pricing
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS branch_pricing_tenant_isolation ON branch_pricing;`);
    await queryRunner.query(`ALTER TABLE branch_pricing DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('branch_pricing');
  }
}

