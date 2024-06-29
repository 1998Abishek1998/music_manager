export interface Pagination<T> {
  data: Array<T>;
  meta: {
    total: number;
    offset: number;
    limit: number;
  };
}

export interface PaginationFilter {
  query?: string;
  limit?: number;
  offset?: number;
}

export const paginateResponse = <T>(records: T[], offset: number, limit: number, total: number): Pagination<T> => {
  return {
    data: records,
    meta: {
      limit,
      total,
      offset,
    },
  };
};
