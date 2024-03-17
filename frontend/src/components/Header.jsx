import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";

export default function Header() {
  const [theme, setTheme] = useState("light");
  return (
    <nav className="flex justify-between py-3 px-2 sm:px-10 border-b-2 items-center">
      <div className="cursor-pointer">
        <span className="text-white p-2 rounded-md bg-gradient-to-r from-orange-500 to-purple-500">
          Yowale's
        </span>
        Blog
      </div>
      <div className="rounded-full border px-3 py-2 cursor-pointer">
        <CiSearch />
      </div>
      <ul className="hidden sm:flex gap-3">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
      </ul>
      <div className="flex items-center gap-2">
        <div
          className="bg-[rgba(0,0,0,.01)] border-orange-500 rounded-full border px-3 py-2 cursor-pointer"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </div>
        <button className="bg-[rgba(0,0,0,.01)] rounded-xl border-2 border-purple-500 px-3 py-2 cursor-pointer">
          Sign in
        </button>
        <LuMenu className="text-3xl cursor-pointer sm:hidden" />
      </div>
    </nav>
  );
}
