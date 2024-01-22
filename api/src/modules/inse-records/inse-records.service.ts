import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
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

    if (findAllInseRecordsQueryDto.region) {
      queryBuilder.andWhere('state.region = :region', {
        region: findAllInseRecordsQueryDto.region,
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

    const paginated = await paginationTemplateQueryBuilderHelper(
      queryBuilder,
      findAllInseRecordsQueryDto.page,
      findAllInseRecordsQueryDto.limit,
    );

    const info = await this.getInseRecordsInfo(queryBuilder.clone());

    paginated.meta.info = info;

    return paginated;
  }

  private async getInseRecordsInfo(
    queryBuilder: SelectQueryBuilder<InseRecord>,
  ) {
    const { average } = await queryBuilder
      .clone()
      .select('AVG(inse_record.media) as average')
      .getRawOne();

    const studentsCount = await queryBuilder
      .clone()
      .select('SUM(inse_record.quantidade_alunos) as students_quantity')
      .getRawOne();

    const numberOfSchoolsPerClassification = await queryBuilder
      .clone()
      .select(
        'COUNT(inse_record.id) as data, inse_record.classificacao as label',
      )
      .groupBy('inse_record.classificacao')
      .getRawMany();

    const studentsPercentagePerLevel = await queryBuilder
      .clone()
      .select(
        `
        AVG(inse_record.pc_nivel_1) as level_1, 
        AVG(inse_record.pc_nivel_2) as level_2, 
        AVG(inse_record.pc_nivel_3) as level_3, 
        AVG(inse_record.pc_nivel_4) as level_4, 
        AVG(inse_record.pc_nivel_5) as level_5,
        AVG(inse_record.pc_nivel_6) as level_6,
        AVG(inse_record.pc_nivel_7) as level_7,
        AVG(inse_record.pc_nivel_8) as level_8`,
      )
      .getRawOne();

    return {
      average: +average,
      students_count: +studentsCount.students_quantity,
      number_of_schools_per_classification:
        numberOfSchoolsPerClassification.map((item) => ({
          data: +item.data,
          label: item.label,
        })),
      students_percentage_per_level: Object.keys(
        studentsPercentagePerLevel,
      ).map((key) => ({
        data: +studentsPercentagePerLevel[key],
        label: key,
      })),
    };
  }
}
