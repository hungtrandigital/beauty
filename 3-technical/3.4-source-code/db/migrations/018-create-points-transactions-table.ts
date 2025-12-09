import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreatePointsTransactionsTable1702000000018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'points_transactions',
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
            name: 'customerId',
            type: 'uuid',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['EARNED', 'REDEEMED', 'ADJUSTED'],
          },
          {
            name: 'points',
            type: 'int',
          },
          {
            name: 'billId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
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
      'points_transactions',
      new Index({
        name: 'IDX_points_transactions_customerId_createdAt',
        columnNames: ['customerId', 'createdAt'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE points_transactions ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY points_transactions_tenant_isolation ON points_transactions
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS points_transactions_tenant_isolation ON points_transactions;`);
    await queryRunner.query(`ALTER TABLE points_transactions DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('points_transactions');
  }
}

