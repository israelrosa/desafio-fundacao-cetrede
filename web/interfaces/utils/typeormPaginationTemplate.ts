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
