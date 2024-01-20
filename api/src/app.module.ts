import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { winstonConfig } from './shared/utils/logger';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
