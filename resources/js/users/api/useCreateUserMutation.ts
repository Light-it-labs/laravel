import { useMutation, useQueryClient } from "@tanstack/react-query";

import { privateAPI } from "@/shared/services/http";
import type { ServiceResponse } from "@/shared/services/http";
import { useToastStore } from "@/shared/ui";
import { userKeys } from "@/users/api";
import type { UserRequest, UserResponse } from "@/users/types";

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
