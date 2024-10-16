export interface RequestParams<T> {
  searchText?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: T;
  with?: string | string[];
}

export interface ServicePagination {
  count: number;
  currentPage: number;
  links: { next: string; previous: string };
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ServiceResponse<T> {
  data: T;
  pagination: ServicePagination;
  status: number;
  success: boolean;
}
