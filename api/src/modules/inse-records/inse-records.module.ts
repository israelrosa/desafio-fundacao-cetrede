import { Module } from '@nestjs/common';
import { InseRecordsService } from './inse-records.service';
import { InseRecordsController } from './inse-records.controller';

@Module({
  controllers: [InseRecordsController],
  providers: [InseRecordsService],
})
export class InseRecordsModule {}
