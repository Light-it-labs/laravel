import { useUserStore } from "@/shared/services/stores";

export const logout = () => {
  const { clearUser } = useUserStore.getState();
  clearUser();
};
