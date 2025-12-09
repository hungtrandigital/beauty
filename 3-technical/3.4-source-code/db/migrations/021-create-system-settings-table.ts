import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateSystemSettingsTable1702000000021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'system_settings',
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
            name: 'category',
            type: 'enum',
            enum: ['GENERAL', 'NOTIFICATIONS', 'SECURITY', 'BUSINESS'],
          },
          {
            name: 'settings',
            type: 'jsonb',
          },
          {
            name: 'updatedBy',
            type: 'uuid',
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
      'system_settings',
      new Index({
        name: 'IDX_system_settings_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'system_settings',
      new Index({
        name: 'IDX_system_settings_tenantId_category',
        columnNames: ['tenantId', 'category'],
        isUnique: true,
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY system_settings_tenant_isolation ON system_settings
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS system_settings_tenant_isolation ON system_settings;`);
    await queryRunner.query(`ALTER TABLE system_settings DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('system_settings');
  }
}

