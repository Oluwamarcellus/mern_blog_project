import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { Link } from "react-router-dom";
import { setTheme } from "../redux/theme.slice";
import { useSelector, useDispatch } from "react-redux";
import { clearActiveUser } from "../redux/user.slice"

export default function Header() {
  const [navMenu, setNavMenu] = useState(false);
  const dispatch = useDispatch();
  const themeState = useSelector((state) => state.theme);
  const userState = useSelector((state) => state.user);
  const [profileToggle, setProfileToggle] = useState(false);

  // useEffect(() => {
  //   console.log(themeState);
  // }, [themeState])
  const handleSignout = async () => { 
    try {
      const data = await fetch("/api/user/signout");
      if (data.ok) {
        dispatch(clearActiveUser());
        setProfileToggle(false);
      }
    } catch (err) { 
      console.error(err);
    }
  }

  return (
    <nav className="border-b-2">
      <div className="flex justify-between py-3 px-2 sm:px-10 items-center">
        <Link to="/">
          <div className="cursor-pointer font-medium">
            <span className="text-white p-2 rounded-md bg-gradient-to-r from-orange-500 to-purple-500">
              Yowale's
            </span>
            Blog
          </div>
        </Link>
        <div className="rounded-full border px-3 py-2 cursor-pointer">
          <CiSearch />
        </div>
        <ul className="hidden sm:flex gap-3 cursor-pointer font-medium text-sm">
          <Link to="/" className="hover:opacity-50">
            Home
          </Link>
          <Link to="/about" className="hover:opacity-50">
            About
          </Link>
          <Link to="/profile?action=profile" className="hover:opacity-50">
            Profile
          </Link>
        </ul>
        <div className="flex items-center gap-2">
          <div
            className="bg-[rgba(0,0,0,.01)] border-orange-500 rounded-full border px-3 py-2 cursor-pointer"
            onClick={() => dispatch(setTheme())}
          >
            {themeState.mode === "light" ? <FaMoon /> : <FaSun />}
          </div>
          {!userState.activeUser ? (
            <Link to="/signin">
              <button className="bg-[rgba(0,0,0,.01)] rounded-xl border-2 border-purple-500 px-3 py-2 cursor-pointer">
                Sign in
              </button>
            </Link>
          ) : (
            <div className="relative">
                <img
                  onClick={() => setProfileToggle(!profileToggle)}
                src={userState.activeUser.imageUrl}
                className="h-10 w-10 rounded-full cursor-pointer"
                />
                {profileToggle && <div className="absolute border right-0 top-12 rounded-md bg-white">
                  <div className="p-4">
                    <h1 className="text-xs mb-1">@{userState.activeUser.username}</h1>
                    <h1 className="text-sm font-medium">{userState.activeUser.email}</h1>
                  </div>
                  <hr />
                  {userState.activeUser?.anAdmin && <><Link to="/profile?action=dashboard" onClick={ () => setProfileToggle(false) } className="hover:bg-gray-200 text-sm cursor-pointer px-4 py-3 block">Dashboard</Link>
                  <hr /></>
                  }
                  <Link to="/profile?action=profile" onClick={ () => setProfileToggle(false) } className="hover:bg-gray-200 text-sm cursor-pointer px-4 py-3 block">Profile</Link>
                  <hr />
                  <Link onClick={ handleSignout } className="hover:bg-gray-100 text-sm cursor-pointer px-4 py-3 block">Signout</Link>
                </div>}
            </div>
          )}
          <LuMenu
            className="text-3xl cursor-pointer sm:hidden"
            onClick={() => setNavMenu(!navMenu)}
          />
        </div>
      </div>
      <ul
        className={`${
          navMenu ? "h-full" : "h-0 opacity-0"
        } flex justify-center sm:hidden gap-10 transition-all ease-in delay-150 cursor-pointer font-medium text-sm`}
      >
        <Link to="/" className="hover:opacity-50">
          Home
        </Link>
        <Link to="/about" className="hover:opacity-50">
          About
        </Link>
        <Link to="/profile?action=profile" className="hover:opacity-50">
          Profile
        </Link>
      </ul>
    </nav>
  );
}
