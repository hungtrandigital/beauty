import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreatePromotionUsageTable1702000000016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'promotion_usage',
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
            name: 'promotionId',
            type: 'uuid',
          },
          {
            name: 'billId',
            type: 'uuid',
          },
          {
            name: 'customerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'discountAmount',
            type: 'decimal',
            precision: 15,
            scale: 2,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'promotion_usage',
      new Index({
        name: 'IDX_promotion_usage_promotionId_billId',
        columnNames: ['promotionId', 'billId'],
      }),
    );

    await queryRunner.createIndex(
      'promotion_usage',
      new Index({
        name: 'IDX_promotion_usage_tenantId_customerId',
        columnNames: ['tenantId', 'customerId'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE promotion_usage ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY promotion_usage_tenant_isolation ON promotion_usage
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS promotion_usage_tenant_isolation ON promotion_usage;`);
    await queryRunner.query(`ALTER TABLE promotion_usage DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('promotion_usage');
  }
}

