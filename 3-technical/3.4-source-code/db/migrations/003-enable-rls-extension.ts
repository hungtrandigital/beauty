import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnableRlsExtension1702000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable uuid extension for PostgreSQL
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    
    // Note: Row-Level Security is enabled per-table in individual migrations
    // This migration ensures the uuid extension is available
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Note: We don't drop the extension as it might be used by other tables
    // If needed, drop with: DROP EXTENSION IF EXISTS "uuid-ossp";
  }
}

