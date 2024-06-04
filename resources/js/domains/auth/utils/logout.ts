import { useUserStore } from "@/services/stores";

export const logout = () => {
  const { clearUser } = useUserStore.getState();
  clearUser();
};
