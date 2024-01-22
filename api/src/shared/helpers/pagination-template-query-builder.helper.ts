import { SelectQueryBuilder } from 'typeorm';

export interface TypeOrmPaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  info?: any;
}

export interface TypeOrmPaginationTemplate<T> {
  data: T[];
  meta: TypeOrmPaginationMeta;
}

export default async function paginationTemplateQueryBuilderHelper<T>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number = 1,
  limit?: number,
): Promise<TypeOrmPaginationTemplate<T>> {
  if (page && limit) {
    queryBuilder.skip((+page - 1) * +limit).take(+limit);
  }
  const [data, count] = await queryBuilder.getManyAndCount();

  const totalPages = Math.ceil(count / +limit);

  const from = (+page - 1) * +limit + 1;
  const to = (+page - 1) * +limit + data.length;

  return {
    data,
    meta: {
      current_page: +page,
      from: from > count ? count : from,
      last_page: totalPages,
      per_page: +limit,
      to: to > count ? count : to,
      total: count,
    },
  };
}
