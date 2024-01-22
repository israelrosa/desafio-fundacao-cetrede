import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { FindAllSchoolQueryDto } from './dto/find-all-school-query.dto';

@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schoolsService.findOne(id);
  }

  @Get()
  findAll(@Query() findAllSchoolQueryDto: FindAllSchoolQueryDto) {
    return this.schoolsService.findAll(findAllSchoolQueryDto);
  }
}
