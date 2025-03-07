"use client"
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const data = [
    {
        id: 1,
        href: "/",
        name: "Initial Demo"
    },
    {
        id: 2,
        href: "/demo-1",
        name: "Demo-1"
    },
];

const NavigationBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname()
  
  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800 dark:text-white">Forms</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {data.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === item.href
                      ? "border-white text-gray-900 dark:text-white"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* You can add profile, notifications, etc. here */}
          </div>
          <div className="flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu open/close */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {data.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium 
                ${
                router.pathname === item.href
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-gray-700 dark:border-indigo-500 dark:text-white"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              }
                  `}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Forms = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Forms;