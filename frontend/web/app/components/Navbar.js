"use client";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const navLi = [
    { id: "home", title: "Home" },
    { id: "resources", title: "Resources" },
  ];

  const [Open, setOpen] = useState(false);

  return (
    <>
      <nav className=" py-5 fixed top-0 left-0 right-0 z-50 bg-black ">
        <div className="text-white flex md:items-baseline items-center  m-auto justify-between w-[80%] lg:w-[80%] md:w-[85%] ">
          {/* logo */}
          <div className="flex gap-2 cursor-pointer ">
            <h1 className="text-2xl">Books Store</h1>
          </div>

          {/* ul */}
          <div
            className={`md:gap-12 md:static text-xl flex flex-col w-full  md:w-auto gap-8  md:items-start text-center  md:h-0 h-screen   bg-black absolute  left-0 
          ${
            Open
              ? "top-12 visibility-visible justify-center"
              : "top-[-790px] visibility-hidden"
          }`}
          >
            {/* ul for large screens */}
            <ul className="font-pop_1 lg:gap-8 xl:gap-12 md:gap-6 md:flex-row md:flex flex-col hidden gap-5 ">
              {navLi.map(({ id, title, offset }) => (
                <li
                  className="text-xl md:text-lg lg:text-xl cursor-pointer"
                  key={id}
                >
                  {title}
                </li>
              ))}
            </ul>
            {/* ul for mobile devices */}
            <ul className="font-pop_1 lg:gap-8 xl:gap-12 md:gap-6 md:flex-row flex flex-col md:hidden gap-5 ">
              {navLi.map(({ id, title, offset }) => (
                <li
                  className="text-2xl md:text-lg lg:text-xl cursor-pointer"
                  key={id}
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
          {/* hamburger */}
          <div
            onClick={() => setOpen(!Open)}
            className="cursor-pointer md:hidden"
          >
            {Open ? (
              <HiX className="text-3xl" />
            ) : (
              <HiMenuAlt3 className="text-3xl" />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
