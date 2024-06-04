import type { AxiosError } from "axios";

import type { ErrorPayload, ServiceResponse } from "@/services/http";
import { privateAPI } from "@/services/http";
import { useUserStore } from "@/services/stores";
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
