import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { clearActiveUser } from "../redux/user.slice";
import Dashboard from "../components/Dashboard";
import AdminPagePost from "../components/AdminPagePost";
import AdminPageComment from "../components/AdminPageComment";
import AdminPageUser from "../components/AdminPageUser";

export default function Profile() {
  const location = useLocation();
  const [param, setParam] = useState("");
  const user = useSelector((state) => state.user.activeUser);
  const dispatch = useDispatch();

  useEffect(() => { 
    const urlParam = new URLSearchParams(location.search);
    setParam(urlParam.get("action"));
  }, [location.search]);

  const handleSignout = async () => { 
    try {
      const data = await fetch("/api/user/signout");
      if (data.ok) {
        dispatch(clearActiveUser());
      }
    } catch (err) { 
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar user={user} handleSignout={ handleSignout } />
      { param === "profile" && <UserProfile user={user} handleSignout={ handleSignout } />}
      { param === "dashboard" && <Dashboard />}
      { param === "posts" && <AdminPagePost />}
      { param === "comments" && <AdminPageComment />}
      { param === "users" && <AdminPageUser />}
    </div>
  )
}
