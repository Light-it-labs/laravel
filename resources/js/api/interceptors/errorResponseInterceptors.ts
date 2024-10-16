import type { AxiosError } from "axios";

import { api } from "../axios";
import { memoizedRefreshToken } from "./refreshToken";

// interceptor was based on this article
// https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d
export const errorResponseInterceptor = async (error: AxiosError) => {
  const { config } = error;

  if (error.response?.status === 401) {
    const refreshWasSuccessful = await memoizedRefreshToken();
    if (refreshWasSuccessful) return api({ ...(config ?? {}) });
  }

  return Promise.reject(error);
};
