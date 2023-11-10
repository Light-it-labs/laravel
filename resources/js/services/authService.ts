import type { AxiosResponse } from "axios";
import axios from "axios";

export interface User {
  mail: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface UserData {
  data: User;
}

export const signUpUser = async (newUser: User): Promise<User> => {
  const response: AxiosResponse<UserData> = await axios.post("/api/signup", {
    ...newUser,
    password_confirmation: newUser.passwordConfirmation,
  });
  return response.data.data;
};
