import { useMutation } from "@tanstack/react-query";

import { publicAPI } from "@/shared/services/http";
import type { ServiceResponse } from "@/shared/services/http/types";

interface GoogleLoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

interface GoogleLoginRequest {
  email: string;
  name: string;
  googleToken: string;
}

const loginWithGoogle = async (params: GoogleLoginRequest) => {
  const response = await publicAPI.post<ServiceResponse<GoogleLoginResponse>>(
    "/auth/google",
    {
      ...params,
    },
  );
  return response.data.payload;
};

export function useGoogleLoginMutation() {
  return useMutation({
    mutationFn: loginWithGoogle,
  });
}
