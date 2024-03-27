import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearActiveUser } from "../redux/user.slice";

export default function AdminPageUser() {
  const [users, setUsers] = useState(null);
  const user = useSelector((state) => state.user.activeUser);
  const dispatch = useDispatch();

  const handleDelete = async (userId) => {
    const verified = confirm("Delete Account?");
    if (verified && userId) {
      try {
        const data = await fetch(`/api/user/delete/${userId}`, {
          method: "POST",
        });
        if (data.ok) {
          alert("Account deleted successfully");
          if (userId === user?._id) {
            dispatch(clearActiveUser());
            navigate("/signin");
          } else { 
            setUsers(users.filter((user) => user._id !== userId));
          }
        } else {
          alert("Failed to delete account now try again later");
        }
      } catch (err) {
        alert("Error deleting account now try again later");
        console.log(err.message);
      }
    }
  };

  const getUsers = async () => {
    try {
      const data = await fetch("/api/user/getusers");
      const res = await data.json();
      if (!data.ok) {
        throw new Error(res.errorMessage);
      }
      setUsers(res.users);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-4 grow md:max-w-[60%] md:mx-auto">
      <div className="flex rounded-md gap-3 bg-gray-100/80 py-2 text-sm font-medium justify-between px-4">
        <h2 className="w-[15%]">IMAGE</h2>
        <h2 className="w-[50%]">USERNAME</h2>
        <h2 className="w-[10%]">ADMIN</h2>
        <h2 className="w-[10%] pl-1">DEL</h2>
      </div>

      {users &&
        users.map((user, i) => {
          return (
            <div
              key={i}
              className="flex gap-3 rounded-md py-2 text-sm font-medium justify-between items-center px-3"
            >
              <h2 className="w-[15%] rounded-lg overflow-hidden">
                <img
                  className="rounded-full object-cover h-10 w-10"
                  src={user.imageUrl}
                />
              </h2>
              <h2 className="w-[50%] font-thin text-sm overflow-hidden">
                {user.username}
              </h2>
              <div className="w-[10%]">
                {user.anAdmin ? (
                  <IoMdCheckmark className="text-xl text-green-500" />
                ) : (
                  <IoMdClose className="text-xl text-red-500" />
                )}
              </div>
              <div onClick={() => handleDelete(user._id)} className="w-[10%]">
                <MdDeleteForever className="text-red-500 cursor-pointer text-lg" />
              </div>
            </div>
          );
        })}
    </div>
  );
}
