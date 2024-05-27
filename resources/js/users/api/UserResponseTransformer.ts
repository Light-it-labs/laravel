import type { UserModel, UserResponse } from "@/users/types";

export function userResponseTransformer(user: UserResponse): UserModel {
  return {
    ...user,
    get emailProvider(): string | undefined {
      return this.email.split("@")[1]?.split(".")[0];
    },
  };
}
