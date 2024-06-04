import axios from "axios";

import { errorResponse, privateRequest } from "@/services/http/interceptors";
import { env } from "@/shared/utils/env";

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

const baseConfig = {
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
};

export const publicAPI = axios.create(baseConfig);
export const privateAPI = axios.create(baseConfig);

privateAPI.interceptors.request.use(privateRequest);
privateAPI.interceptors.response.use((response) => response, errorResponse);
