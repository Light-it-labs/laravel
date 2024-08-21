import { useOutlet } from "react-router-dom";

export const Layout = () => {
  const outlet = useOutlet();

  return (
    <div className="flex min-h-screen flex-col bg-[#FCFCFC]">
      <header className=" p-4 "></header>
      <main>
        <div className="grid min-h-screen px-16">{outlet}</div>
      </main>
      <footer className=" p-4 text-center"></footer>
    </div>
  );
};
