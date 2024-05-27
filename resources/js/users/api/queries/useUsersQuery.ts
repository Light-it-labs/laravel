import { useQuery } from "@tanstack/react-query";

import { privateAPI } from "@/shared/services/http";
import type { ServiceResponse } from "@/shared/services/http";
import { userKeys, userResponseTransformer } from "@/users/api";
import type { UserResponse } from "@/users/types";

const getUsers = async () => {
  const response =
    await privateAPI.get<ServiceResponse<UserResponse[]>>("/users");
  return response.data.payload.map((user) => userResponseTransformer(user));
};

export function useUsersQuery() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getUsers,
  });
}
