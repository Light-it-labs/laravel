import { useState } from "react";
import { useOutlet } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const outlet = useOutlet();

  return (
    <div>
      <Sidebar show={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        <NavBar setSidebarOpen={setSidebarOpen} />

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{outlet}</div>
        </main>
      </div>
    </div>
  );
};
