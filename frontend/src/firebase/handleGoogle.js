import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "./firbase";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../redux/user.slice";


const handleGoogleAuth = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

  provider.setCustomParameters({ prompt: "select_account" });
  try {
    const result = await signInWithPopup(auth, provider);
    const data = await fetch("/api/user/google_auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      }),
    });
      const res = await data.json();
      if (data.ok) { 
          console.log(res);         
      }
  } catch (error) {
    console.log(error);
  }
};

export default handleGoogleAuth;
