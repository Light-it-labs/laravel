import React from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge as tw } from "tailwind-merge";

import { ROUTES } from "~/router";

export const Sidebar = () => {
  const location = useLocation();
  const current = location.pathname;
  const navigation = [{ name: "Home", href: ROUTES.home }];

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col'>
        <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4'>
          <div className='flex h-16 shrink-0 items-center'>
            <img
              className='h-8 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
              alt='Your Company'
            />
          </div>

          <nav className='flex flex-1 flex-col'>
            <ul className='-mx-2 space-y-1'>
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={tw(
                      current === item.href
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
