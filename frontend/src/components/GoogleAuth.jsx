import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase/firbase";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../redux/user.slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GoogleAuth({ val }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleAuthError, setGoogleError] = useState("");

  const handleGoogleAuth = async () => {
      const auth = getAuth(app);
      setGoogleError("");

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      const data = await fetch("/api/user/google_auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          imageUrl: result.user.photoURL,
        }),
      });
      const res = await data.json();
      if (!data.ok) {
        setGoogleError(res.errorMessage);
      } else {
        dispatch(setActiveUser(res.user));
        navigate("/");
      }
    } catch (error) {
      setGoogleError(error.message);
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleAuth}
        type="button"
        className="flex justify-center items-center gap-3 border-2 border-purple-500/50 rounded-xl px-3 py-2 cursor-pointer w-full mb-1"
      >
        <FcGoogle />
        <h1 className="text-sm font-medium">{val}</h1>
      </button>
      {googleAuthError && (
        <p className="text-red-500 text-center text-sm italic">
          {googleAuthError}
        </p>
      )}
    </>
  );
}
