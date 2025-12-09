import { MigrationInterface, QueryRunner, Table, Index } from 'typeorm';

export class CreateUserBranchesTable1702000000019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_branches',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'branchId',
            type: 'uuid',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'user_branches',
      new Index({
        name: 'IDX_user_branches_userId_branchId',
        columnNames: ['userId', 'branchId'],
        isUnique: true,
      }),
    );

    // Enable Row-Level Security
    await queryRunner.query(`
      ALTER TABLE user_branches ENABLE ROW LEVEL SECURITY;
    `);

    // Create RLS policy (inherits from users via userId)
    await queryRunner.query(`
      CREATE POLICY user_branches_tenant_isolation ON user_branches
        FOR ALL
        USING (
          EXISTS (
            SELECT 1 FROM users
            WHERE users.id = user_branches.user_id
            AND users.tenant_id = current_setting('app.current_tenant_id', true)::uuid
          )
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP POLICY IF EXISTS user_branches_tenant_isolation ON user_branches;`);
    await queryRunner.query(`ALTER TABLE user_branches DISABLE ROW LEVEL SECURITY;`);
    await queryRunner.dropTable('user_branches');
  }
}

