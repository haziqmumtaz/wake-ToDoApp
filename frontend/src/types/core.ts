export type PaginatedResponse<T> = {
  data: T[];
  totalPages: number;
};

export type PaginatedRequest = {
  _page: number;
  _limit: number;
};
