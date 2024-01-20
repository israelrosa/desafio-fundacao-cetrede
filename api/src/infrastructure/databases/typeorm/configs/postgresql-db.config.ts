import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export class PostgreSQLDBConfig {
  static createTypeOrmOptions(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      url: configService.get('DATABASE_URL'),
      ssl: false,
      useUTC: true,
      type: 'postgres',
      entities: [join(__dirname, '../../../../**/**/**.entity.js')],
      synchronize: true,
      logging: false,
      migrationsRun: true,
    };
  }
}
