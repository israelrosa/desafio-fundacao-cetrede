import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InseRecordsService } from './inse-records.service';
import { InseRecordsController } from './inse-records.controller';
import { InseRecord } from './entities/inse-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InseRecord])],
  controllers: [InseRecordsController],
  providers: [InseRecordsService],
})
export class InseRecordsModule {}
