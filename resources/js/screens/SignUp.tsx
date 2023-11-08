import Input from "../components/Input"
import { MailIcon } from "@/icons/MailIcon"
import { UserIcon } from "@/icons/UserIcon"
import { PadlockIcon } from "@/icons/PadlockIcon"
import { Button } from "@/components/Button"

export const SignUp = () => {
    return(
        <div className="flex flex-col text-sm md:flex-row md:gap-16 md:h-screen md:text-base">
            <div className="h-96 w-full bg-cover bg-center bg-no-repeat bg-[url('/images/logo.jpg')] md:w-[950px] md:h-auto"
                style={{
                    backgroundImage: `url('/images/logo.jpg')`,
                  }}
            ></div>

            <div className="flex flex-col gap-10 p-16 w-[1fr]">

                <h1 className=" text-xl font-semibold">Sign Up</h1>
                <p>If you already have an account register <br />
                    You can <a href="#" className="text-red-500 ">Login here!</a>
                </p>

                <Input info="Mail"><MailIcon /></Input>
                <Input info="Username" type="text"><UserIcon /></Input>
                <Input info="Password" type="password"><PadlockIcon /></Input>
                <Input info="Confirmation password" type="password"><PadlockIcon /></Input>
                <Button text="Register"/>
            </div>
        </div>
    );
}
