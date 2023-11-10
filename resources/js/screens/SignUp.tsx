import SignUpForm from "@/components/SignUpForm";

export const SignUp = () => {
  return (
    <div className="flex flex-col text-sm md:h-screen md:flex-row md:gap-16 md:text-base">
      <div
        className="h-96 w-full bg-[url('/images/logo.jpg')] bg-cover bg-center bg-no-repeat md:h-screen md:w-[950px]"
        style={{
          backgroundImage: `url('/images/logo.jpg')`,
        }}
      ></div>

      <div className="flex w-[1fr] flex-col gap-10 p-16">
        <h1 className=" text-xl font-semibold">Sign Up</h1>
        <p>
          If you already have an account register <br />
          You can {/* <a className="text-red-500 "> */}
          Login here!
          {/* </a> */}
        </p>

        <SignUpForm />
      </div>
    </div>
  );
};
