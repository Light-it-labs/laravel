import { Outlet } from "react-router-dom";

import { Navbar } from "@/shared/components/Navbar";

export const LeftNavbarLayout = () => {
  return (
    <div className="h-screen flex-col overflow-hidden bg-gray-900 md:flex md:flex-row">
      <Navbar />
      <main className="h-full grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
