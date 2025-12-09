import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreatePromotionsTable1702000000014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'promotions',
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
            name: 'type',
            type: 'enum',
            enum: [
              'INVOICE_DISCOUNT',
              'INVOICE_GIFT',
              'INVOICE_PRODUCT_DISCOUNT',
              'INVOICE_VOUCHER_GIFT',
              'PURCHASE_DISCOUNT',
              'PURCHASE_GIFT',
              'PURCHASE_VOUCHER_GIFT',
              'DISCOUNT_BY_INVOICE_AMOUNT',
              'GIFT_BY_INVOICE_AMOUNT',
              'PRODUCT_DISCOUNT_BY_INVOICE_AMOUNT',
            ],
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'rules',
            type: 'jsonb',
          },
          {
            name: 'startDate',
            type: 'timestamp',
          },
          {
            name: 'endDate',
            type: 'timestamp',
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
      'promotions',
      new Index({
        name: 'IDX_promotions_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'promotions',
      new Index({
        name: 'IDX_promotions_tenantId_isActive',
        columnNames: ['tenantId', 'isActive'],
      }),
    );

    await queryRunner.createIndex(
      'promotions',
      new Index({
        name: 'IDX_promotions_tenantId_dates',
        columnNames: ['tenantId', 'startDate', 'endDate'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY promotions_tenant_isolation ON promotions
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS promotions_tenant_isolation ON promotions;`);
    await queryRunner.query(`ALTER TABLE promotions DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('promotions');
  }
}

