import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
  name: string;
  picture: string;
  role: "standard" | "admin";
}

export interface UserStoreState {
  user: User | null;
  token: string | null;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (_set) => ({
      user: null,
      token: null,
    }),
    {
      name: "userStore",
    },
  ),
);

export const useUser = () => useUserStore((state) => state.user);
export const useToken = () => useUserStore((state) => state.token);

export const setUser = (user: User | null) =>
  useUserStore.setState(() => ({ user }));
export const setToken = (token: string | null) =>
  useUserStore.setState(() => ({ token }));
export const clearUser = () =>
  useUserStore.setState(() => ({
    user: null,
    token: null,
  }));
