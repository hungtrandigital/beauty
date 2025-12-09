import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateRolesTable1702000000020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
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
            name: 'permissions',
            type: 'text',
            isArray: true,
            default: "'{}'",
          },
          {
            name: 'isSystem',
            type: 'boolean',
            default: false,
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
      'roles',
      new Index({
        name: 'IDX_roles_tenantId',
        columnNames: ['tenantId'],
      }),
    );

    await queryRunner.createIndex(
      'roles',
      new Index({
        name: 'IDX_roles_tenantId_name',
        columnNames: ['tenantId', 'name'],
        isUnique: true,
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy
    await queryRunner.query(`
      CREATE POLICY roles_tenant_isolation ON roles
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);
    `);

    // Insert default system roles
    await queryRunner.query(`
      INSERT INTO roles (id, tenant_id, name, description, permissions, "isSystem", "createdAt", "updatedAt")
      SELECT 
        gen_random_uuid(),
        t.id,
        'ADMIN',
        'System administrator with full access',
        ARRAY['*'],
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      FROM tenants t
      ON CONFLICT DO NOTHING;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS roles_tenant_isolation ON roles;`);
    await queryRunner.query(`ALTER TABLE roles DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('roles');
  }
}

