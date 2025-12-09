import { MigrationInterface, QueryRunner, Table, Index, ForeignKey } from 'typeorm';

export class CreateBillItemsTable1702000000010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bill_items',
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
            name: 'type',
            type: 'enum',
            enum: ['PRODUCT', 'SERVICE'],
          },
          {
            name: 'itemId',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'quantity',
            type: 'decimal',
            precision: 15,
            scale: 2,
          },
          {
            name: 'unitPrice',
            type: 'decimal',
            precision: 15,
            scale: 2,
          },
          {
            name: 'total',
            type: 'decimal',
            precision: 15,
            scale: 2,
          },
          {
            name: 'discount',
            type: 'decimal',
            precision: 15,
            scale: 2,
            default: 0,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'bill_items',
      new Index({
        name: 'IDX_bill_items_billId',
        columnNames: ['billId'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE bill_items ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy (inherits from bills via billId)
    await queryRunner.query(`
      CREATE POLICY bill_items_tenant_isolation ON bill_items
        FOR ALL
        USING (
          EXISTS (
            SELECT 1 FROM bills
            WHERE bills.id = bill_items.bill_id
            AND bills.tenant_id = current_setting('app.current_tenant_id', true)::uuid
          )
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS bill_items_tenant_isolation ON bill_items;`);
    await queryRunner.query(`ALTER TABLE bill_items DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('bill_items');
  }
}

