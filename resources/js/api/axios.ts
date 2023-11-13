import axios from "axios";

import { env } from "@/env";
import { useUserStore } from "@/stores";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthHeaders = () => {
  const userToken = useUserStore.getState().token;

  return {
    Authorization: `Bearer ${userToken}`,
  };
};
