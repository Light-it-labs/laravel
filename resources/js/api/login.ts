import { useUserStore } from "~/stores";
import { api } from "./axios";
import type { ServiceResponse } from "./axios";

export interface UserToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}
export interface GoogleLoginRequest {
  email: string;
  name: string;
  googleToken: string;
}

export const googleLogin = async ({
  email,
  name,
  googleToken,
}: GoogleLoginRequest) => {
  const googleLoginPayload = { email, name, googleToken };
  const response = await api.post<ServiceResponse<UserToken>>("/auth/google", {
    ...googleLoginPayload,
  });
  return response.data;
};

export const logout = () => {
  const { setUser, setToken } = useUserStore.getState();

  setUser(null);
  setToken(null);
};
