import type { InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "~/stores";

export const authHeaderInterceptor = (config: InternalAxiosRequestConfig) => {
  const { token } = useAuthStore.getState();

  config.headers.Authorization = token ? `Bearer ${token}` : undefined;

  return config;
};
