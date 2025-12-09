import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateVouchersTable1702000000015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vouchers',
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
            isNullable: true,
          },
          {
            name: 'code',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'usageCount',
            type: 'int',
            default: 0,
          },
          {
            name: 'maxUsage',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'customerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'expiresAt',
            type: 'timestamp',
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
      'vouchers',
      new Index({
        name: 'IDX_vouchers_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'vouchers',
      new Index({
        name: 'IDX_vouchers_tenantId_code',
        columnNames: ['tenantId', 'code'],
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'vouchers',
      new Index({
        name: 'IDX_vouchers_promotionId',
        columnNames: ['promotionId'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY vouchers_tenant_isolation ON vouchers
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS vouchers_tenant_isolation ON vouchers;`);
    await queryRunner.query(`ALTER TABLE vouchers DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('vouchers');
  }
}

