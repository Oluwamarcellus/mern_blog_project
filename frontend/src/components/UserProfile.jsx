import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearActiveUser } from "../redux/user.slice";

export default function UserProfile({ user, handleSignout }) {
  const [disabled, setDisabled] = useState(true);
  const [inputData, setInputData] = useState({});
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdate = () => {
    

    setDisabled(true);
  }

  const handleDelete = async () => { 
    const verified = confirm("Delete Account?");
    if (verified) {
      try {
        const data = await fetch("/api/user/delete", {
          method: "POST"
        });
        if (data.ok) {
          alert("Account deleted successfully");
          dispatch(clearActiveUser());
          navigate("/signin");
        } else { 
          alert("Failed to delete account now try again later");
        }
      } catch (err) { 
        alert("Error deleting account now try again later");
        console.log(err.message);
      }  
    }
  }

  const handleInputChange = (e) => {
    setInputData({...inputData, [e.target.id]: e.target.value });
  }

  return (
    <div className="grow py-10 px-3 md:grow-0 md:mx-auto">
      <h2 className="text-center text-3xl font-medium">Profile</h2>
      <img
        src={user?.imageUrl}
        className="mt-6 h-32 w-32 mx-auto rounded-full border-8 object-cover"
      />
      <form className="pt-6">
        <input
          ref={inputRef}
          disabled={disabled}
          onChange={handleInputChange}
          className={`${disabled ? "opacity-60" : ""} w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-4 focus:border-2 focus:border-purple-500`}
          type="text"
          id="username"
          value={user?.username}
        />
        <input
          disabled={disabled}
          onChange={handleInputChange}
          className={`${disabled ? "opacity-60" : ""} w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-4 focus:border-2 focus:border-purple-500`}
          type="text"
          id="email"
          value={user?.email}
        />
        <input
          disabled={disabled}
          onChange={handleInputChange}
          className={`${disabled ? "opacity-60" : ""} w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-4 focus:border-2 focus:border-purple-500`}
          type="password"
          id="password"
          placeholder="password"
        />
        
          {disabled && <button
            onClick={() => setDisabled(false)}
            type="button"
            className={`flex justify-center items-center gap-3 border-2 border-purple-500/50 rounded-xl px-3 py-2 cursor-pointer w-full mb-4`}
          >
            Edit Profile
          </button>}
          {!disabled && <button
            onClick={handleUpdate}
            type="button"
            className={`flex justify-center items-center gap-3 border-2 border-purple-500/50 rounded-xl px-3 py-2 cursor-pointer w-full mb-4`}
          >
            Save
          </button>}
      </form>

      {user?.anAdmin && <button
        type="button"
        className={`bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl px-3 py-2 cursor-pointer w-full text-white mb-5`}
      >
        Create a post
      </button>}
      <div className="flex justify-between px-2 mt-2">
        <span onClick={handleDelete} className="text-red-500 text-sm cursor-pointer">Delete Account</span>
        <span onClick={ handleSignout } className="text-red-500 text-sm cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
