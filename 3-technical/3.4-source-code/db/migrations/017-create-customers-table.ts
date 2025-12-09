import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateCustomersTable1702000000017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
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
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'address',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'dateOfBirth',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'points',
            type: 'int',
            default: 0,
          },
          {
            name: 'membershipTier',
            type: 'enum',
            enum: ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'],
            default: "'BRONZE'",
          },
          {
            name: 'qrCode',
            type: 'varchar',
            length: '255',
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
      'customers',
      new Index({
        name: 'IDX_customers_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'customers',
      new Index({
        name: 'IDX_customers_tenantId_phone',
        columnNames: ['tenantId', 'phone'],
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'customers',
      new Index({
        name: 'IDX_customers_tenantId_email',
        columnNames: ['tenantId', 'email'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY customers_tenant_isolation ON customers
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS customers_tenant_isolation ON customers;`);
    await queryRunner.query(`ALTER TABLE customers DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('customers');
  }
}

