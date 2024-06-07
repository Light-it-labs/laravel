import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userKeys } from "@/domains/users/api/keys/UserKeyFactory";
import type { UserResponse } from "@/domains/users/types";
import { privateAPI } from "@/shared/services/http";
import { showErrorToast } from "@/shared/services/notifications";
import { useToastStore } from "@/shared/services/stores";

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
    onError: showErrorToast,
  });
}
