import { useQuery } from "@tanstack/react-query";

import { userKeys, userResponseTransformer } from "@/domains/users/api";
import type { UserResponse } from "@/domains/users/types";
import { privateAPI } from "@/services/http";
import type { ServiceResponse } from "@/services/http";

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
