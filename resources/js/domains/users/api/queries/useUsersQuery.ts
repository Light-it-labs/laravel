import { useQuery } from "@tanstack/react-query";

import { userKeys } from "@/domains/users/api/keys/UserKeyFactory";
import { userResponseTransformer } from "@/domains/users/api/transformers/UserResponseTransformer";
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
