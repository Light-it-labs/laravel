import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MailIcon } from "@/icons/MailIcon";
import { UserIcon } from "@/icons/UserIcon";
import { signUpUser } from "@/services/authService";
import { Button } from "./Button";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

const SignUpForm = () => {
  const userSchema = z
    .object({
      mail: z.string().email(),
      username: z.string().min(1, "Field required!"),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      passwordConfirmation: z.string().min(1, "Field required!"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      path: ["passwordConfirmation"],
      message: "Password don't match",
    });

  type UserFormValues = z.infer<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const registerUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit: SubmitHandler<UserFormValues> = (data) =>
    registerUserMutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <Input id="mail" label="Mail" {...register("mail")}>
        <MailIcon />
      </Input>
      {errors.mail && (
        <span className="text-xs text-red-500">{errors.mail.message}</span>
      )}

      <Input id="username" label="Username" {...register("username")}>
        <UserIcon />
      </Input>
      {errors.username && (
        <span className="text-xs text-red-500">{errors.username.message}</span>
      )}

      <PasswordInput id="password" label="Password" {...register("password")} />
      {errors.password && (
        <span className="text-xs text-red-500">{errors.password.message}</span>
      )}

      <PasswordInput
        id="passwordConfirmation"
        label="Confirmation password"
        {...register("passwordConfirmation")}
      />
      {errors.passwordConfirmation && (
        <span className="text-xs text-red-500">
          {errors.passwordConfirmation.message}
        </span>
      )}

      <Button text="Register" />
    </form>
  );
};

export default SignUpForm;
