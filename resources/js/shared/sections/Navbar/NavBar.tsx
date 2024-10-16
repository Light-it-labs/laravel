import React from "react";

export interface NavBarProps {
  setSidebarOpen?: (v: boolean) => void;
}

export const Navbar = ({ setSidebarOpen }: NavBarProps) => {
  return (
    <div className='sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
      {setSidebarOpen && (
        <button
          type='button'
          className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
          onClick={() => setSidebarOpen(true)}
        >
          <span className='sr-only'>Open sidebar</span>
        </button>
      )}

      {/* Separator */}
      <div className='h-6 w-px bg-gray-900/10 lg:hidden' aria-hidden='true' />

      <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
        <form className='relative flex flex-1' action='#' method='GET'>
          <label htmlFor='search-field' className='sr-only'>
            Search
          </label>

          <input
            id='search-field'
            className='block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
            placeholder='Search...'
            type='search'
            name='search'
          />
        </form>

        <div className='flex items-center gap-x-4 lg:gap-x-6'>
          <button
            type='button'
            className='-m-2.5 p-2.5 text-gray-400 hover:text-gray-500'
          >
            <span className='sr-only'>View notifications</span>
          </button>

          {/* Separator */}
          <div
            className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10'
            aria-hidden='true'
          />
        </div>
      </div>
    </div>
  );
};
