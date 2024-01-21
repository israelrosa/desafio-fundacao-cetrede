import { Controller, Get, Query } from '@nestjs/common';
import { InseRecordsService } from './inse-records.service';
import { FindAllInseRecordsQueryDto } from './dto/find-all-inse-records-query.dto';

@Controller('inse-records')
export class InseRecordsController {
  constructor(private readonly inseRecordsService: InseRecordsService) {}

  @Get()
  findAll(@Query() findAllInseRecordsQueryDto: FindAllInseRecordsQueryDto) {
    return this.inseRecordsService.findAll(findAllInseRecordsQueryDto);
  }
}
