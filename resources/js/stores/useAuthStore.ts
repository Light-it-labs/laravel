/**
 * This file represents an alternative pattern when using Zustand's `persist` middleware.
 * In this case, we include actions within the store itself, as `persist` handles state persistence
 * across sessions. Unlike our standard approach where actions are externalized, here we centralize
 * state and actions for ease of persistence management.
 *
 * The `persist` middleware automatically saves the `token` to localStorage under the key "authStore".
 * We only store the `token` here to comply with HIPAA regulations, ensuring that no sensitive user information
 * beyond authentication tokens is persisted.
 *
 * This pattern is specifically used when persistence is required, overriding our standard practice of separating state and actions.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthStoreState {
  token: string | null;
  setToken(token: string | null): void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string | null) => {
        set(() => ({ token }));
      },
    }),
    {
      name: "authStore",
    },
  ),
);
