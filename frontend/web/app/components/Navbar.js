"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const navLi = [
    { id: "/", title: "Home" },
    { id: "../addBooks", title: "Add Book" },
  ];
  const [Open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <nav className="py-5 top-0 left-0 fixed right-0 z-50 bg-black">
        <div className="text-white flex md:items-baseline items-center m-auto justify-between w-[80%] lg:w-[80%] md:w-[85%]">
          {/* logo */}
          <div className="flex gap-2 cursor-pointer">
            <Link href="/" className="text-2xl">
              Bookshelf
            </Link>
          </div>
          <div className="flex lg:gap-16 md:gap-10 md:items-baseline items-center">
            {/* ul */}
            <div
              className={`md:gap-12 md:static text-xl flex flex-col w-full md:w-auto gap-8 md:items-start text-center bg-black absolute left-0 ${
                Open
                  ? "top-[5rem] visibility-visible justify-center md:h-0 h-screen"
                  : "top-[-790px] visibility-hidden "
              }`}
            >
              {/* ul for large screens */}
              <ul className="font-pop_1 lg:gap-8 xl:gap-12 md:gap-6 md:flex-row md:flex flex-col hidden gap-5">
                {navLi.map(({ id, title }) => (
                  <Link
                    href={id}
                    className="text-xl md:text-lg lg:text-xl cursor-pointer"
                    key={id}
                  >
                    {title}
                  </Link>
                ))}
              </ul>
              {/* ul for mobile devices */}
              <ul className="font-pop_1 lg:gap-8 xl:gap-12 md:gap-6 md:flex-row flex flex-col md:hidden gap-5 mb-40">
                {navLi.map(({ id, title }) => (
                  <Link
                    onClick={() => setOpen(!Open)}
                    href={id}
                    className="text-2xl md:text-lg lg:text-xl cursor-pointer"
                    key={id}
                  >
                    {title}
                  </Link>
                ))}
              </ul>
            </div>
            {/* profile */}
            {session && (
              <div className="relative ml-auto md:ml-0">
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white text-xl cursor-pointer"
                >
                  {session.user.email[0].toUpperCase()}
                </div>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 bg-gray-900 text-white p-4 rounded shadow-lg z-50">
                    <p className="text-gray-400 mb-2">{session.user.email}</p>
                    <button
                      onClick={() => signOut()}
                      className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
            <div
              onClick={() => setOpen(!Open)}
              className="cursor-pointer md:hidden ml-4"
            >
              {Open ? (
                <HiX className="text-3xl" />
              ) : (
                <HiMenuAlt3 className="text-3xl" />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
