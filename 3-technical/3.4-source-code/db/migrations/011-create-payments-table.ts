import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreatePaymentsTable1702000000011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'billId',
            type: 'uuid',
          },
          {
            name: 'method',
            type: 'enum',
            enum: ['CASH', 'CARD', 'OTHER'],
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 15,
            scale: 2,
          },
          {
            name: 'change',
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0,
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
      'payments',
      new Index({
        name: 'IDX_payments_billId',
        columnNames: ['billId'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy (inherits from bills via billId)
    await queryRunner.query(`
      CREATE POLICY payments_tenant_isolation ON payments
        FOR ALL
        USING (
          EXISTS (
            SELECT 1 FROM bills
            WHERE bills.id = payments.bill_id
            AND bills.tenant_id = current_setting('app.current_tenant_id', true)::uuid
          )
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS payments_tenant_isolation ON payments;`);
    await queryRunner.query(`ALTER TABLE payments DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('payments');
  }
}

