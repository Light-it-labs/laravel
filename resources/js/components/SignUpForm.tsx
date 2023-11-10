import { SubmitHandler, useForm } from "react-hook-form";
import { MailIcon } from "@/icons/MailIcon";
import Input from "./Input";
import { UserIcon } from "@/icons/UserIcon";
import { PadlockIcon } from "@/icons/PadlockIcon";
import { Button } from "./Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const SignUpForm = () => {
    interface User  {
        mail: string,
        username: string,
        password: string,
        password_confirmation: string
    }

    const userSchema = z
    .object({
        mail: z.string().min(1, "Field required!"),
        username: z.string().min(1, "Field required!"),
        password: z
            .string()
            .min(6, { message: "Password must be atleast 6 characters" }),
        password_confirmation: z
            .string()
            .min(1, "Field required!"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        path: ["passwordConfirmation"],
        message: "Password don't match",
    });

    type UserFormValues = z.infer<typeof userSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
    });

    // const {mutate: registerUser} = useMutation({
    //     mutationFn: (newUser) => axios.post('/api/signup', newUser)
    // });
    // const onSubmit: SubmitHandler<UserFormValues> = () =>  registerUser();

    const mutation = useMutation((newUser: User) => {
        // console.log(newUser);
        return axios.post('/api/signup', newUser)
    });

    // const onSubmit: SubmitHandler<UserFormValues> = (data) => console.log(data);
    const onSubmit: SubmitHandler<UserFormValues> = (data) => mutation.mutate(data);


    // const queryClient = useQueryClient();

    // const {mutate: createUserMutation} = useMutation({
    //     mutationFn: createUser.mutation,
    //     onSuccess: (data) => {createUser.invalidates(queryClient)}
    // });

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
        >
            <Input
                id="mail"
                label="Mail"
                {...register("mail")}
            ><MailIcon /></Input>
            {errors.mail && <span className="text-xs text-red-500">{errors.mail.message}</span>}

            <Input
                id="username"
                label="Username"
                {...register("username")}
            ><UserIcon /></Input>
            {errors.username && <span className="text-xs text-red-500">{errors.username.message}</span>}

            <Input
                id="password"
                label="Password"
                type="password"
                {...register("password")}
            ><PadlockIcon /></Input>
            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}

            <Input
                id="passwordConfirmation"
                label="Confirmation password"
                type="password"
                {...register("password_confirmation")}
            ><PadlockIcon /></Input>
            {errors.password_confirmation && <span className="text-xs text-red-500">{errors.password_confirmation.message}</span>}

            <Button text="Register"/>
        </form>
    )
}

export default SignUpForm;



