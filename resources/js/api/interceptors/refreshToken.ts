import mem from "mem";

import { useUserStore } from "~/stores/useUserStore";
import { api, getAuthHeaders } from "../axios";
import type { ServiceResponse } from "../axios";

const { setUser, setToken } = useUserStore.getState();

export interface UserToken {
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// refresh token was based on this article
// https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d
const refreshToken = async () => {
  let refreshWasSuccessful = false;
  try {
    const response = await api.post<ServiceResponse<UserToken>>(
      "/auth/refresh",
      {},
      {
        headers: getAuthHeaders(),
      },
    );
    const { data: userToken } = response.data;
    if (!userToken.refresh_token) {
      setUser(null);
      setToken(null);
    } else {
      refreshWasSuccessful = true;
      setToken(userToken.refresh_token);
    }
  } catch (error) {
    setUser(null);
    setToken(null);
  }
  return refreshWasSuccessful;
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshToken, {
  maxAge,
});
