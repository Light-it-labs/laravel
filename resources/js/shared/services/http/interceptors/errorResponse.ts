import type { AxiosError } from "axios";

import { privateAPI } from "@/shared/services/http";
import type {
  ErrorPayload,
  ServiceResponse,
} from "@/shared/services/http/types";
import { useUserStore } from "@/shared/services/stores";
import { memoizedRefreshToken } from "./refreshToken";

export const errorResponse = async (
  error: AxiosError<ServiceResponse<ErrorPayload>>,
) => {
  const config = error?.config;

  if (error?.response?.status === 401) {
    const refreshWasSuccessful = await memoizedRefreshToken();
    if (refreshWasSuccessful) {
      const refreshedToken = useUserStore.getState().token;
      return privateAPI({
        ...config,
        headers: { Authorization: `Bearer ${refreshedToken}` },
      });
    } else {
      useUserStore.getState().clearUser();
      window.location.href = "/login";
    }
  }
  return Promise.reject(error.response?.data.payload);
};
