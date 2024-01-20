import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { winstonConfig } from './shared/utils/logger';
import { CustomTypeormModule } from './infrastructure/databases/typeorm/typeorm.module';
import { EscolasModule } from './modules/escolas/escolas.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { StatesModule } from './modules/states/states.module';
import { CitiesModule } from './modules/cities/cities.module';

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
    ConfigModule.forRoot(),
    CustomTypeormModule,
    EscolasModule,
    SchoolsModule,
    StatesModule,
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
