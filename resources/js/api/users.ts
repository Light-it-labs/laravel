// import { QueryClient } from "@tanstack/react-query";
// import { ServiceResponse, api } from "./axios";
// import { invalidateDomains, generateQueryKey } from "./config";

// export const createUser = {
//     mutation: async (user: PostUserRequest) => {
//       const response = await api.post<ServiceResponse<User>>("/users", {
//         ...user,
//       });
//       return response.data.data;
//     },
//     invalidates: (queryClient: QueryClient, { userId }: { userId: string }) => {
//       invalidateDomains(queryClient, ["user", userId]);
//     },
//   };

//   export const getUserQuery = (id: string | null) => ({
//     enabled: !!id,
//     queryKey: generateQueryKey("getUserQuery", { domain: "user", id }),
//     queryFn: async () => {
//       const response = await api.get<ServiceResponse<User>>(
//         `/users/${id}`,
//       );
//       return response.data.data;
//     },
//   });
