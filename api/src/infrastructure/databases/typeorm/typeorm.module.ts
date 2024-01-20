import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgreSQLDBConfig } from './configs/postgresql-db.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        PostgreSQLDBConfig.createTypeOrmOptions(configService),
      inject: [ConfigService],
    }),
  ],
})
export class CustomTypeormModule {}
