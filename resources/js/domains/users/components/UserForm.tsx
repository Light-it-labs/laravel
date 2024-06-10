import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateUserMutation } from "@/domains/users/mutations/useCreateUserMutation";
import { showErrorToast } from "@/shared/services/notifications";
import { Button, icons, Input } from "@/shared/ui";
import { handleAxiosFieldErrors } from "@/shared/utils";

const userSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password needs at least 8 characters" }),
    passwordConfirmation: z.string().trim(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });
type UserFormValues = z.infer<typeof userSchema>;

export const UserForm = ({ onClose }: { onClose: () => void }) => {
  const {
    formState: { errors, isDirty },
    handleSubmit,
    register,
    setError,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const { mutate: createUser, isPending: isPendingCreateUser } =
    useCreateUserMutation();

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit((value) =>
          createUser(value, {
            onSuccess() {
              onClose();
            },
            onError: (err) => {
              showErrorToast(err);
              handleAxiosFieldErrors(err, setError);
            },
          }),
        )(e);
      }}
      className="flex flex-col gap-7"
    >
      <div className="flex flex-col">
        <Input
          id="name"
          label="Name"
          placeholder="Enter Name"
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          type="email"
          id="email"
          label="Email"
          placeholder="Enter Email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Enter Password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Input
          type="password"
          id="passwordConfirmation"
          label="Password Confirmation"
          placeholder="Re-enter your password"
          {...register("passwordConfirmation")}
          error={errors.passwordConfirmation?.message}
        />
      </div>

      <div className="flex justify-end gap-2.5">
        <Button onClick={onClose} variant="outline" className="min-w-[7rem]">
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={!isDirty || isPendingCreateUser}
          className="min-w-[7rem]"
        >
          {isPendingCreateUser ? (
            <icons.SpinnerIcon className="h-5 w-5" />
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
};
