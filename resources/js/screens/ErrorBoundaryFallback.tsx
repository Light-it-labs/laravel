import { Logo } from "../../../public/build/assets";

export const ErrorBoundaryFallback = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="mb-20">
        <img src={Logo} alt="logo" />
      </div>
      <h2 className="mb-10 text-2xl">Something went terribly wrong!</h2>
    </main>
  );
};
