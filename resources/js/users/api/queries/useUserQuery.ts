import { useQuery } from "@tanstack/react-query";

import { privateAPI } from "@/shared/services/http";
import type { ServiceResponse } from "@/shared/services/http";
import { userKeys } from "@/users/api";
import type { UserResponse } from "@/users/types";

const getUser = async (userId: UserResponse["id"]) => {
  const response = await privateAPI.get<ServiceResponse<UserResponse>>(
    `/users/${userId}`,
  );
  return response.data.payload;
};

export function useUserQuery(userId: UserResponse["id"]) {
  return useQuery({
    queryKey: userKeys.user(userId),
    queryFn: () => getUser(userId),
  });
}
