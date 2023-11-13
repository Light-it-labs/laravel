import axios from "axios";

import { env } from "@/env";
import { errorResponse, privateRequest } from "./interceptors";

const baseConfig = {
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const publicAPI = axios.create(baseConfig);
const privateAPI = axios.create(baseConfig);

privateAPI.interceptors.request.use(privateRequest);
privateAPI.interceptors.response.use((response) => response, errorResponse);

export const getAPI = ({ isPrivate } = { isPrivate: true }) =>
  isPrivate ? privateAPI : publicAPI;
