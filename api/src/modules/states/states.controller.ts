import { Controller, Get, Query } from '@nestjs/common';
import { StatesService } from './states.service';
import { FindAllStatesQueryDto } from './dto/find-all-states-query.dto';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get()
  findAll(@Query() findAllStatesQueryDto: FindAllStatesQueryDto) {
    return this.statesService.findAll(findAllStatesQueryDto);
  }
}
