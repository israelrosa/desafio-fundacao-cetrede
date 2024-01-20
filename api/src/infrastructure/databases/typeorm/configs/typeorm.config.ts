import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const configService = new ConfigService();

const options: DataSourceOptions = {
  url: configService.get('DATABASE_URL'),
  ssl: false,
  useUTC: true,
  type: 'postgres',
  entities: [],
  synchronize: false,
  logging: false,
};

export default new DataSource(options);
