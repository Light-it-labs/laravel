import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userKeys } from "@/domains/users/api/keys/UserKeyFactory";
import type { UserRequest, UserResponse } from "@/domains/users/types";
import { privateAPI } from "@/services/http";
import type { ServiceResponse } from "@/services/http";
import { useToastStore } from "@/services/notifications";

const createUser = async (params: UserRequest) => {
  const { passwordConfirmation, ...rest } = params;
  const response = await privateAPI.post<ServiceResponse<UserResponse>>(
    "/users",
    {
      ...rest,
      password_confirmation: passwordConfirmation,
    },
  );

  return response.data.payload;
};

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  const { pushToast } = useToastStore();
  return useMutation({
    mutationFn: createUser,
    onSuccess(data) {
      void queryClient.invalidateQueries({ queryKey: userKeys.all });
      void pushToast({
        type: "success",
        title: "Success",
        message: `User "${data.name}" successfully created!`,
      });
    },
  });
}
