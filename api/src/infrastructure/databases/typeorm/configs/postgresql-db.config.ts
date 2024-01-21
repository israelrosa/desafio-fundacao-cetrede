import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Seeder } from '@/shared/providers/seeders/entities/seeder.entity';

export class PostgreSQLDBConfig {
  static createTypeOrmOptions(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      url: configService.get('DATABASE_URL'),
      ssl: false,
      useUTC: true,
      type: 'postgres',
      entities: [join(__dirname, '../../../../**/**/**.entity.js'), Seeder],
      synchronize: true,
      logging: false,
      migrationsRun: true,
    };
  }
}
