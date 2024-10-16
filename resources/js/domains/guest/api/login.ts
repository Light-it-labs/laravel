import { api } from "~/api";
import type { ServiceResponse } from "~/api";
import { useAuthStore } from "~/stores";

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

// This is just an example of how we solve this in Lightranet, you should replace this with your own implementation
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
  const { setToken } = useAuthStore.getState();

  setToken(null);
};
