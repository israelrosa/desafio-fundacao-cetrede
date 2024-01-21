import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { FindAllCitiesQueryDto } from './dto/find-all-cities-query.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  findAll(@Query() findAllCitiesQueryDto: FindAllCitiesQueryDto) {
    return this.citiesService.findAll(findAllCitiesQueryDto);
  }
}
