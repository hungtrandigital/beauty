import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateExportRequestsTable1702000000008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'export_requests',
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
            name: 'requesterId',
            type: 'uuid',
          },
          {
            name: 'branchId',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'APPROVED', 'REJECTED', 'CONFIRMED', 'CANCELLED'],
            default: "'PENDING'",
          },
          {
            name: 'products',
            type: 'jsonb',
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'approvedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'approverId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'confirmedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'confirmerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'rejectionReason',
            type: 'text',
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
      'export_requests',
      new Index({
        name: 'IDX_export_requests_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'export_requests',
      new Index({
        name: 'IDX_export_requests_tenantId_status',
        columnNames: ['tenantId', 'status'],
      }),
    );

    await queryRunner.createIndex(
      'export_requests',
      new Index({
        name: 'IDX_export_requests_tenantId_branchId',
        columnNames: ['tenantId', 'branchId'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE export_requests ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY export_requests_tenant_isolation ON export_requests
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS export_requests_tenant_isolation ON export_requests;`);
    await queryRunner.query(`ALTER TABLE export_requests DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('export_requests');
  }
}

