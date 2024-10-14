"use client";
import { useState, useEffect } from "react"; // Make sure this is here
import "../globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navatas() {
  // Gunakan usePathname dari next/navigation
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("/");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Update currentPath ketika pathname sudah tersedia
    if (pathname) {
      setCurrentPath(pathname);
    }
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to get the className based on the current path
  const getClassName = (path) => {
    return currentPath === path
      ? "block py-2 px-3 md:p-0 text-blue-700 font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      : "block py-2 px-3 md:p-0 text-white font-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
  };

  return (
    <nav className="border-gray-200 bg-blue-950 dark:bg-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
            Flowbite
          </span>
        </a>
        <button
          onClick={toggleMenu} // Call the toggle function
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded={isOpen} // Update aria-expanded based on state
        >
          <span className="sr-only bg-blue-700 ">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link href="/" className={getClassName("/")} aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link href="/service" className={getClassName("/service")}>
                Services
              </Link>
            </li>
            <li>
              <a
                href="#"
                className={getClassName("/Pricing")}
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className={getClassName("/Pricing")}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
