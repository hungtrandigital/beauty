import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'beauty_user',
  password: process.env.DATABASE_PASSWORD || 'beauty_password',
  database: process.env.DATABASE_NAME || 'beauty_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../db/migrations/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development' || process.env.FORCE_SYNC === 'true',
  logging: process.env.NODE_ENV === 'development',
});

