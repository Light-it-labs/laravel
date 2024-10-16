import axios from "axios";

import { env } from "~/env";
import {
  authHeaderInterceptor,
  errorResponseInterceptor,
} from "./interceptors";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(authHeaderInterceptor);

// interceptor was based on this article
// https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d
api.interceptors.response.use((response) => response, errorResponseInterceptor);
