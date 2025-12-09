import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateServicesTable1702000000012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'services',
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
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['MALE', 'FEMALE', 'BOTH'],
            default: "'BOTH'",
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 15,
            scale: 2,
          },
          {
            name: 'duration',
            type: 'int',
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
            name: 'associatedProductIds',
            type: 'uuid',
            isArray: true,
            default: "'{}'",
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
      'services',
      new Index({
        name: 'IDX_services_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'services',
      new Index({
        name: 'IDX_services_tenantId_name',
        columnNames: ['tenantId', 'name'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE services ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY services_tenant_isolation ON services
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS services_tenant_isolation ON services;`);
    await queryRunner.query(`ALTER TABLE services DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('services');
  }
}

