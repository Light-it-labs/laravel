export interface ErrorPayload {
  code: string;
  message: string;
  fields?: [];
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ErrorPayload;
  }
}

export interface ServiceResponse<T> {
  status: number;
  success: boolean;
  payload: T;
  pagination?: {
    count: number;
    total: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    links: {
      previous: string;
      next: string;
    };
  };
}
