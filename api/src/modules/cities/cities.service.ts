import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { FindAllCitiesQueryDto } from './dto/find-all-cities-query.dto';
import paginationTemplateQueryBuilderHelper from '@/shared/helpers/pagination-template-query-builder.helper';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
  ) {}

  async findAll(findAllCitiesQueryDto: FindAllCitiesQueryDto) {
    const queryBuilder = this.citiesRepository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.state', 'state');

    if (findAllCitiesQueryDto.search) {
      queryBuilder.where(
        'concat(city.nome, state.nome, state.sigla) ILIKE :search',
        {
          search: `%${findAllCitiesQueryDto.search}%`,
        },
      );
    }

    if (findAllCitiesQueryDto.state_id) {
      queryBuilder.andWhere('state.id = :state_id', {
        state_id: findAllCitiesQueryDto.state_id,
      });
    }

    if (findAllCitiesQueryDto.region) {
      queryBuilder.andWhere('state.regiao = :region', {
        region: findAllCitiesQueryDto.region,
      });
    }

    if (findAllCitiesQueryDto.sorts) {
      const sorts = findAllCitiesQueryDto.sorts.split(',');
      const sortsAndOrders = sorts.map((item) => item.trim().split(':'));
      sortsAndOrders.forEach(([column, order]) => {
        queryBuilder.orderBy(
          `city.${column}`,
          order.toUpperCase() as 'ASC' | 'DESC',
        );
      });
    }

    return paginationTemplateQueryBuilderHelper(
      queryBuilder,
      findAllCitiesQueryDto.page,
      findAllCitiesQueryDto.limit,
    );
  }
}
