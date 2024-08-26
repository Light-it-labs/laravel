import { LibreHeaderLogo } from "~/components/logos/LibreHeaderLogo";
import { VmgHeaderLogo } from "~/components/logos/VmgHeaderLogo";
import { useOutlet } from "react-router-dom";

export const Layout = ({ className }: { className: string }) => {
  const outlet = useOutlet();

  return (
    <div className={`flex min-h-screen flex-col ${className}`}>
      <header className="flex justify-between px-16 pt-8 ">
        <LibreHeaderLogo />
        <VmgHeaderLogo />
      </header>
      <main>
        <div className="grid min-h-screen px-16">{outlet}</div>
      </main>
      <footer className=" p-4 text-center"></footer>
    </div>
  );
};
