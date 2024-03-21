import { IoPersonCircle } from "react-icons/io5";
import { MdInsertComment } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdPostAdd } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { RiDashboard2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Sidebar({ user, handleSignout }) {
  console.log(user);
  return (
    <div className="md:basis-56 p-4 bg-[rgba(0,0,0,.02)]">
      {user && user.anAdmin && (
        <Link to="/profile?action=dashboard">
          <div className="hover:bg-[rgba(0,0,0,.05)] p-2 rounded-md cursor-pointer mb-3">
            <div className="flex items-center gap-2">
              <RiDashboard2Fill className="text-2xl text-gray-600" />
              <h2 className="text-sm">Dashboard</h2>
            </div>
          </div>
        </Link>
      )}

      <Link to="/profile?action=profile">
        <div className="flex justify-between items-center hover:bg-[rgba(0,0,0,.05)] p-2 rounded-md cursor-pointer">
          <div className="flex items-center gap-2">
            <IoPersonCircle className="text-2xl text-gray-600" />
            <h2 className="text-sm">Profile</h2>
          </div>

          <h2 className="text-white text-xs bg-gray-600 rounded-md py-1 px-2">
            {user && user.anAdmin ? "Admin" : "User"}
          </h2>
        </div>
      </Link>

      {user && user.anAdmin && (
        <>
          <Link to="/profile?action=comments">
            <div className="hover:bg-[rgba(0,0,0,.05)] p-2 rounded-md cursor-pointer mt-3">
              <div className="flex items-center gap-2">
                <MdInsertComment className="text-2xl text-gray-600" />
                <h2 className="text-sm">Comments</h2>
              </div>
            </div>
          </Link>
          <Link to="/profile?action=users">
            <div className="hover:bg-[rgba(0,0,0,.05)] p-2 rounded-md cursor-pointer mt-3">
              <div className="flex items-center gap-2">
                <PiUsersThreeFill className="text-2xl text-gray-600" />
                <h2 className="text-sm">Users</h2>
              </div>
            </div>
          </Link>
          <Link to="/profile?action=posts">
            <div className="hover:bg-[rgba(0,0,0,.05)] p-2 rounded-md cursor-pointer mt-3">
              <div className="flex items-center gap-2">
                <MdPostAdd className="text-2xl text-gray-600" />
                <h2 className="text-sm">Posts</h2>
              </div>
            </div>
          </Link>
        </>
      )}

      <div
        onClick={handleSignout}
        className="hover:bg-[rgba(0,0,0,.05)] p-2 rounded-md cursor-pointer mt-3"
      >
        <div className="flex items-center gap-2">
          <FaSignOutAlt className="text-2xl text-gray-600" />
          <h2 className="text-sm">Sign Out</h2>
        </div>
      </div>
    </div>
  );
}
