import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateActivityLogsTable1702000000022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activity_logs',
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
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'actionType',
            type: 'enum',
            enum: [
              'CREATE',
              'UPDATE',
              'DELETE',
              'LOGIN',
              'LOGOUT',
              'APPROVE',
              'REJECT',
              'EXPORT',
              'IMPORT',
            ],
          },
          {
            name: 'resourceType',
            type: 'enum',
            enum: [
              'USER',
              'BRANCH',
              'PRODUCT',
              'SERVICE',
              'BILL',
              'INVENTORY',
              'PROMOTION',
              'CUSTOMER',
              'SETTINGS',
              'ROLE',
            ],
          },
          {
            name: 'resourceId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'details',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'ipAddress',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'userAgent',
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
      'activity_logs',
      new Index({
        name: 'IDX_activity_logs_tenantId_createdAt',
        columnNames: ['tenantId', 'createdAt'],
      }),
    );

    await queryRunner.createIndex(
      'activity_logs',
      new Index({
        name: 'IDX_activity_logs_tenantId_userId',
        columnNames: ['tenantId', 'userId'],
      }),
    );

    await queryRunner.createIndex(
      'activity_logs',
      new Index({
        name: 'IDX_activity_logs_tenantId_actionType',
        columnNames: ['tenantId', 'actionType'],
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY activity_logs_tenant_isolation ON activity_logs
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS activity_logs_tenant_isolation ON activity_logs;`);
    await queryRunner.query(`ALTER TABLE activity_logs DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('activity_logs');
  }
}

