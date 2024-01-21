import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InseRecord } from './entities/inse-record.entity';
import { FindAllInseRecordsQueryDto } from './dto/find-all-inse-records-query.dto';
import paginationTemplateQueryBuilderHelper from '@/shared/helpers/pagination-template-query-builder.helper';

@Injectable()
export class InseRecordsService {
  constructor(
    @InjectRepository(InseRecord)
    private readonly inseRecordsRepository: Repository<InseRecord>,
  ) {}

  async findAll(findAllInseRecordsQueryDto: FindAllInseRecordsQueryDto) {
    const queryBuilder = this.inseRecordsRepository
      .createQueryBuilder('inse_record')
      .leftJoinAndSelect('inse_record.school', 'school')
      .leftJoinAndSelect('school.city', 'city')
      .leftJoinAndSelect('city.state', 'state');

    if (findAllInseRecordsQueryDto.search) {
      queryBuilder.where(
        'concat(classificacao, school.nome, city.nome, state.nome, state.sigla) ILIKE :search',
        {
          search: `%${findAllInseRecordsQueryDto.search}%`,
        },
      );
    }

    if (findAllInseRecordsQueryDto.capital_type) {
      queryBuilder.andWhere('school.tipo_capital = :capital_type', {
        capital_type: findAllInseRecordsQueryDto.capital_type,
      });
    }

    if (findAllInseRecordsQueryDto.location_type) {
      queryBuilder.andWhere('school.tipo_localizacao = :location_type', {
        location_type: findAllInseRecordsQueryDto.location_type,
      });
    }

    if (findAllInseRecordsQueryDto.network_type) {
      queryBuilder.andWhere('school.tipo_rede = :network_type', {
        network_type: findAllInseRecordsQueryDto.network_type,
      });
    }

    if (findAllInseRecordsQueryDto.state_id) {
      queryBuilder.andWhere('state.id = :state_id', {
        state_id: findAllInseRecordsQueryDto.state_id,
      });
    }

    if (findAllInseRecordsQueryDto.city_id) {
      queryBuilder.andWhere('city.id = :city_id', {
        city_id: findAllInseRecordsQueryDto.city_id,
      });
    }

    if (findAllInseRecordsQueryDto.sorts) {
      const sorts = findAllInseRecordsQueryDto.sorts.split(',');
      const sortsAndOrders = sorts.map((item) => item.trim().split(':'));
      sortsAndOrders.forEach(([column, order]) => {
        queryBuilder.orderBy(
          `inse_record.${column}`,
          order.toUpperCase() as 'ASC' | 'DESC',
        );
      });
    }

    return paginationTemplateQueryBuilderHelper(
      queryBuilder,
      findAllInseRecordsQueryDto.page,
      findAllInseRecordsQueryDto.limit,
    );
  }
}
