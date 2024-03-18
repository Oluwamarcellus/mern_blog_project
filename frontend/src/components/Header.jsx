import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const [navMenu, setNavMenu] = useState(false);
  return (
    <nav className="border-b-2">
      <div className="flex justify-between py-3 px-2 sm:px-10 items-center">
        <div className="cursor-pointer">
          <span className="text-white p-2 rounded-md bg-gradient-to-r from-orange-500 to-purple-500">
            Yowale's
          </span>
          Blog
        </div>
        <div className="rounded-full border px-3 py-2 cursor-pointer">
          <CiSearch />
        </div>
        <ul className="hidden sm:flex gap-3 cursor-pointer font-medium text-sm">
          <Link to="/" className="hover:opacity-50">Home</Link>
          <Link to="/about" className="hover:opacity-50">About</Link>
          <Link to="/" className="hover:opacity-50">Projects</Link>
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
          <LuMenu className="text-3xl cursor-pointer sm:hidden" onClick={() => setNavMenu(!navMenu)} />
        </div>
      </div>
      <ul className={`${navMenu ? "h-full" : "h-0 opacity-0"} flex justify-center sm:hidden gap-10 transition-all ease-in delay-150 cursor-pointer font-medium text-sm`}>
        <Link to="/" className="hover:opacity-50">Home</Link>
        <Link to="/about" className="hover:opacity-50">About</Link>
        <Link to="/" className="hover:opacity-50">Projects</Link>
      </ul>
    </nav>
  );
}
