import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from '../main.seeder';
import { Seeder } from '@/shared/providers/seeders/entities/seeder.entity';

const configService = new ConfigService();

const options: DataSourceOptions & SeederOptions = {
  url: configService.get('DATABASE_URL'),
  ssl: false,
  useUTC: true,
  type: 'postgres',
  entities: [join(__dirname, '../../../../**/**/**.entity.js'), Seeder],
  synchronize: false,
  logging: false,
  seeds: [MainSeeder],
};

export default new DataSource(options);
