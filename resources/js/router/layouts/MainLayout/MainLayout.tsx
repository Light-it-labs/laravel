import { Outlet } from "react-router-dom";

import { Navbar, Sidebar } from "~/sections";

export const MainLayout = () => {
  return (
    <section>
      <Sidebar />
      <section className='lg:pl-72'>
        <Navbar />
        <main className='py-10'>
          <section className='px-4 sm:px-6 lg:px-8'>
            <Outlet />
          </section>
        </main>
      </section>
    </section>
  );
};
