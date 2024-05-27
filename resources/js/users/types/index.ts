// This is the type of the user payload from the backend
export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

/**
 * This is the type of the user request from the frontend
 * Must match the shape expected by a backend endpoint
 */
export interface UserRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

/**
 * This is the type of the user to be rendered by the frontend
 * This is the result of passing a UserResponse through a UserResponseTransformer
 */
export interface UserModel extends UserResponse {
  emailProvider: string | undefined;
}
