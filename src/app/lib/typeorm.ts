import { User, UserFeed } from '@/entities';
import { Channel } from '@/entities/Channel';
import { ChannelFeed } from '@/entities/ChannelFeed';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  database: process.env.DB_NAME,
  synchronize: true, // Syncs database schema, turn off in production
  logging: false,
  entities: [User, UserFeed, Channel, ChannelFeed],
};

export const AppDataSource = new DataSource(dataSourceOptions);
