import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InseRecordsService } from './inse-records.service';
import { CreateInseRecordDto } from './dto/create-inse-record.dto';
import { UpdateInseRecordDto } from './dto/update-inse-record.dto';

@Controller('inse-records')
export class InseRecordsController {
  constructor(private readonly inseRecordsService: InseRecordsService) {}

  @Post()
  create(@Body() createInseRecordDto: CreateInseRecordDto) {
    return this.inseRecordsService.create(createInseRecordDto);
  }

  @Get()
  findAll() {
    return this.inseRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inseRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInseRecordDto: UpdateInseRecordDto) {
    return this.inseRecordsService.update(+id, updateInseRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inseRecordsService.remove(+id);
  }
}
