import { SelectQueryBuilder } from 'typeorm';

export default async function paginationTemplateQueryBuilderHelper<T>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number = 1,
  limit?: number,
) {
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
