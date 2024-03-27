import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveUser, clearActiveUser } from "../redux/user.slice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase/firbase";
import { CiEdit } from "react-icons/ci";

export default function UserProfile({ user, handleSignout }) {
  const [disabled, setDisabled] = useState(true);
  const [inputData, setInputData] = useState({});
  const [imageData, setImageData] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [imageTempUrl, setImageTempUrl] = useState("");
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState("");
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

  useEffect(() => {
    if (imageData) {
      uploadImage();
    }
  }, [imageData]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = imageData.name + new Date().getTime();
    const storageRef = ref(storage, fileName);
    const task = uploadBytesResumable(storageRef, imageData);
    task.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setImageUploadProgress(progress);
      },
      (error) => {
        setImageUploadError("Error uploading image, try again later");
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          setInputData({ ...inputData, imageUrl: downloadURL });
        });
      }
    );
  };

  const handleUpdate = async () => {
    setUpdateStatus("");
    if (Object.keys(inputData).length === 0) {
      setDisabled(true);
      return;
    }

    if (inputData.email && !emailRegex.test(inputData.email)) {
      setUpdateStatus("Invalid Email Format");
      setDisabled(true);
      return;
    }

    if (inputData.password && inputData.password.length < 8) {
      setUpdateStatus("Password must be at least 8 characters");
      setDisabled(true);
      return;
    }

    try {
      const inputDataSieved = {
        ...(inputData?.username ? { username: inputData.username } : {}),
        ...(inputData?.email ? { email: inputData.email } : {}),
        ...(inputData?.password ? { password: inputData.password } : {}),
        ...(inputData?.imageUrl ? { imageUrl: inputData.imageUrl } : {}),
      };
      const data = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputDataSieved),
      });
      const res = await data.json();
      if (data.ok) {
        setDisabled(true);
        dispatch(setActiveUser(res));
        setUpdateStatus("Profile Updated Successfully");
      } else {
        setUpdateStatus(res.errorMessage);
        setDisabled(true);
      }
    } catch (err) {
      setUpdateStatus(err.message || "Can't update profile, try again");
      setDisabled(true);
    }
  };

  const handleImage = (e) => {
    const fileData = e.target.files[0];
    if (fileData) {
      setImageUploadError("");
      setImageData(fileData);
      setImageTempUrl(URL.createObjectURL(fileData));
    }
  };

  const handleDelete = async (userId) => {
    const verified = confirm("Delete Account?");
    if (verified && userId) {
      try {
        const data = await fetch(`/api/user/delete/${userId}`, {
          method: "POST",
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
  };

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  return (
    <div className="grow py-10 px-3 md:grow-0 md:mx-auto">
      <h2 className="text-center text-3xl font-medium">Profile</h2>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleImage}
      />
      <div className="relative">
        <img
          src={imageTempUrl || user?.imageUrl}
          className="cursor-pointer mt-6 h-32 w-32 mx-auto rounded-full border-8 object-cover"
        />
        {!disabled && <CiEdit onClick={() => fileRef.current.click()} className="absolute bg-gray-100/70 border rounded-full cursor-pointer text-red-600 p-10 w-32 h-32 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />}
      </div>
      {imageUploadError && (
        <p className="text-red-500 text-center text-sm mt-2">
          {imageUploadError}
        </p>
      )}
      <form className="pt-6">
        <input
          disabled={disabled}
          onChange={handleInputChange}
          className={`${
            disabled ? "opacity-60" : ""
          } w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-4 focus:border-2 focus:border-purple-500`}
          type="text"
          id="username"
          placeholder={user?.username}
        />
        <input
          disabled={disabled}
          onChange={handleInputChange}
          className={`${
            disabled ? "opacity-60" : ""
          } w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-4 focus:border-2 focus:border-purple-500`}
          type="text"
          id="email"
          placeholder={user?.email}
        />
        <input
          disabled={disabled}
          onChange={handleInputChange}
          className={`${
            disabled ? "opacity-60" : ""
          } w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-4 focus:border-2 focus:border-purple-500`}
          type="password"
          id="password"
          placeholder="password"
        />

        {updateStatus && (
          <p className="text-red-500 text-center text-sm pb-2">
            {updateStatus}
          </p>
        )}
        {disabled && (
          <button
            onClick={() => { setDisabled(false);  setUpdateStatus(""); setImageUploadError(""); }}
            type="button"
            className={`flex justify-center items-center gap-3 border-2 border-purple-500/50 rounded-xl px-3 py-2 cursor-pointer w-full mb-4`}
          >
            Edit Profile
          </button>
        )}
        {!disabled && (
          <button
            disabled={!(imageUploadProgress == 0 || imageUploadProgress >= 99)}
            onClick={handleUpdate}
            type="button"
            className={`${
              !(imageUploadProgress == 0 || imageUploadProgress >= 99)
                ? "opacity-50"
                : ""
            } flex justify-center items-center gap-3 border-2 border-purple-500/50 rounded-xl px-3 py-2 cursor-pointer w-full mb-4`}
          >
            Save
          </button>
        )}
      </form>

      {user?.anAdmin && (
        <Link to="/create-post">
        <button
          type="button"
          className={`bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl px-3 py-2 cursor-pointer w-full text-white mb-5`}
        >
          Create a post
          </button>
          </Link>
      )}
      <div className="flex justify-between px-2 mt-2">
        <span
          onClick={() => handleDelete(user?._id)}
          className="text-red-500 text-sm cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignout}
          className="text-red-500 text-sm cursor-pointer"
        >
          Sign Out
        </span>
      </div>
    </div>
  );
}
