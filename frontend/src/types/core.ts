export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type PaginatedRequest = {
  _page: number;
  _limit: number;
};
