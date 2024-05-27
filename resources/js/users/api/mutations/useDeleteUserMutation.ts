import { useMutation, useQueryClient } from "@tanstack/react-query";

import { privateAPI } from "@/shared/services/http";
import { errorToast, useToastStore } from "@/shared/ui";
import { userKeys } from "@/users/api";
import type { UserResponse } from "@/users/types";

const deleteUser = async (userId: UserResponse["id"]) => {
  await privateAPI.delete(`/users/${userId}`);
};

export function useDeleteUserMutation() {
  const { pushToast } = useToastStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess(_, requestedId) {
      void queryClient.invalidateQueries({ queryKey: userKeys.all });
      void queryClient.invalidateQueries({
        queryKey: userKeys.user(requestedId),
      });
      void pushToast({
        type: "success",
        title: "Success",
        message: "User successfully deleted!",
      });
    },
    onError: errorToast,
  });
}
