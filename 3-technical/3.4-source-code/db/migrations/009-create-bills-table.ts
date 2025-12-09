import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateBillsTable1702000000009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bills',
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
            name: 'billNumber',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'customerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['DRAFT', 'CONFIRMED', 'CANCELLED'],
            default: "'DRAFT'",
          },
          {
            name: 'paymentStatus',
            type: 'enum',
            enum: ['PENDING', 'PARTIAL', 'PAID'],
            default: "'PENDING'",
          },
          {
            name: 'subtotal',
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: 'discount',
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: 'appliedPromotions',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'total',
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0,
          },
          {
            name: 'isOffline',
            type: 'boolean',
            default: false,
          },
          {
            name: 'syncedAt',
            type: 'timestamp',
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
      'bills',
      new Index({
        name: 'IDX_bills_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'bills',
      new Index({
        name: 'IDX_bills_tenantId_billNumber',
        columnNames: ['tenantId', 'billNumber'],
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'bills',
      new Index({
        name: 'IDX_bills_tenantId_branchId',
        columnNames: ['tenantId', 'branchId'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY bills_tenant_isolation ON bills
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS bills_tenant_isolation ON bills;`);
    await queryRunner.query(`ALTER TABLE bills DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('bills');
  }
}

