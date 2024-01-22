import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { FindAllSchoolQueryDto } from './dto/find-all-school-query.dto';
import paginationTemplateQueryBuilderHelper from '@/shared/helpers/pagination-template-query-builder.helper';
import { SchoolNotFoundException } from './exceptions/school-not-found.exception';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  async findOne(id: number) {
    try {
      return await this.schoolRepository.findOneOrFail({
        where: { id: Number(id) },
        relations: ['city', 'city.state', 'inse_records'],
      });
    } catch (error) {
      throw new SchoolNotFoundException();
    }
  }

  async findAll(findAllSchoolQueryDto: FindAllSchoolQueryDto) {
    const queryBuilder = this.schoolRepository
      .createQueryBuilder('school')
      .leftJoin('school.inse_records', 'inse_records')
      .leftJoinAndSelect('school.city', 'city')
      .leftJoinAndSelect('city.state', 'state');

    if (findAllSchoolQueryDto?.search) {
      queryBuilder.where(
        `
            concat(
              inse_records.classificacao, 
              school.nome, 
              city.nome, 
              state.nome, 
              state.sigla
            ) ILIKE :search
          `,
        {
          search: `%${findAllSchoolQueryDto.search}%`,
        },
      );
    }

    if (findAllSchoolQueryDto.capital_type) {
      queryBuilder.andWhere('school.tipo_capital = :capital_type', {
        capital_type: findAllSchoolQueryDto.capital_type,
      });
    }

    if (findAllSchoolQueryDto.location_type) {
      queryBuilder.andWhere('school.tipo_localizacao = :location_type', {
        location_type: findAllSchoolQueryDto.location_type,
      });
    }

    if (findAllSchoolQueryDto.network_type) {
      queryBuilder.andWhere('school.tipo_rede = :network_type', {
        network_type: findAllSchoolQueryDto.network_type,
      });
    }

    if (findAllSchoolQueryDto.state_id) {
      queryBuilder.andWhere('state.id = :state_id', {
        state_id: findAllSchoolQueryDto.state_id,
      });
    }

    if (findAllSchoolQueryDto.city_id) {
      queryBuilder.andWhere('city.id = :city_id', {
        city_id: findAllSchoolQueryDto.city_id,
      });
    }

    if (findAllSchoolQueryDto.region) {
      queryBuilder.andWhere('state.region = :region', {
        region: findAllSchoolQueryDto.region,
      });
    }

    if (findAllSchoolQueryDto.sorts) {
      const sorts = findAllSchoolQueryDto.sorts.split(',');
      const sortsAndOrders = sorts.map((item) => item.trim().split(':'));
      sortsAndOrders.forEach(([column, order]) => {
        queryBuilder.orderBy(
          `school.${column}`,
          order.toUpperCase() as 'ASC' | 'DESC',
        );
      });
    }

    return paginationTemplateQueryBuilderHelper(
      queryBuilder,
      findAllSchoolQueryDto.page,
      findAllSchoolQueryDto.limit,
    );
  }
}
