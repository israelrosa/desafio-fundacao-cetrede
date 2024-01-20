import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class PostgreSQLDBConfig {
  static createTypeOrmOptions(
    configService: ConfigService,
  ): TypeOrmModuleOptions {
    return {
      url: configService.get('DATABASE_URL'),
      ssl: false,
      useUTC: true,
      type: 'postgres',
      entities: [],
      synchronize: false,
      logging: false,
      migrationsRun: true,
    };
  }
}
