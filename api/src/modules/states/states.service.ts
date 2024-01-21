import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllStatesQueryDto } from './dto/find-all-states-query.dto';
import { State } from './entities/state.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private readonly statesRepository: Repository<State>,
  ) {}

  async findAll(findAllStatesQueryDto: FindAllStatesQueryDto) {
    const queryBuilder = this.statesRepository
      .createQueryBuilder('state')
      .leftJoin('state.cities', 'city');

    if (findAllStatesQueryDto.search) {
      queryBuilder.where(
        'concat(state.nome, state.sigla, city.nome) ILIKE :search',
        {
          search: `%${findAllStatesQueryDto.search}%`,
        },
      );
    }

    if (findAllStatesQueryDto.city_id) {
      queryBuilder.andWhere('city.id = :city_id', {
        city_id: findAllStatesQueryDto.city_id,
      });
    }

    if (findAllStatesQueryDto.sorts) {
      const sorts = findAllStatesQueryDto.sorts.split(',');
      const sortsAndOrders = sorts.map((item) => item.trim().split(':'));
      sortsAndOrders.forEach(([column, order]) => {
        queryBuilder.orderBy(
          `state.${column}`,
          order.toUpperCase() as 'ASC' | 'DESC',
        );
      });
    }

    return queryBuilder.getMany();
  }
}
