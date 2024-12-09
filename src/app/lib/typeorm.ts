import { User, UserFeed } from '@/entities';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  database: process.env.DB_NAME,
  synchronize: true, // Syncs database schema, turn off in production
  logging: false,
  entities: [User, UserFeed],
};

export const AppDataSource = new DataSource(dataSourceOptions);
