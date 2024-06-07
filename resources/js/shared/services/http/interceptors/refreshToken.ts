import mem from "mem";

import { privateAPI } from "@/shared/services/http";
import type { ServiceResponse } from "@/shared/services/http/types";
import { useUserStore } from "@/shared/services/stores";

export interface UserToken {
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

const refreshToken = async () => {
  const { setToken, clearUser } = useUserStore.getState();
  let refreshWasSuccessful = false;

  try {
    const response =
      await privateAPI.post<ServiceResponse<UserToken>>("/auth/refresh");

    const { payload: userToken } = response.data;
    if (!userToken.refreshToken) {
      clearUser();
    } else {
      refreshWasSuccessful = true;
      setToken(userToken.refreshToken);
    }
  } catch (error) {
    clearUser();
  }

  return refreshWasSuccessful;
};

const MAX_AGE = 10000;

export const memoizedRefreshToken = mem(refreshToken, { maxAge: MAX_AGE });
