import axios from "axios";

import {
  errorResponse,
  privateRequest,
} from "@/shared/services/http/interceptors";
import { env } from "@/shared/utils/env";

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
