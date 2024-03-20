import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setActiveUser } from "../redux/user.slice";
import { useSelector, useDispatch } from "react-redux";
import GoogleAuth from "../components/GoogleAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
  const dispatch = useDispatch();

  const formDataHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setFormError("");
    
    if (!formData.email || !formData.password) {
      setFormError("Incomplete Credentials");
      return;
    }

    const isValidEmail = emailRegex.test(formData.email);
    if (!isValidEmail) {
      setFormError("Invalid Email Format");
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await data.json();
      if (!data.ok) {
        setIsLoading(false);
        setFormError(res.errorMessage);
        return;
      }

      setIsLoading(false);
      dispatch(setActiveUser(res.user));
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setFormError(err.message);
    }
  };


  return (
    <div className="py-24 px-4 flex flex-col md:flex-row gap-8 md:items-center mx-auto w-full max-w-3xl">
      <div className="md:flex-1">
        <div className="select-none text-3xl font-semibold mb-4">
          <span className=" text-white px-3 py-1 rounded-md bg-gradient-to-r from-orange-500 to-purple-500">
            Yowale's
          </span>
          Blog
        </div>
        <p className="text-sm ">
          Welcome to Yowale's Blog. You can trustfully sign in with your email
          and password or with Google
        </p>
      </div>
      <div className="md:flex-1">
        <form>
          <label className="block font-medium text-sm" htmlFor="email">
            Email
          </label>
          <input
            onChange={formDataHandler}
            className="w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-5 focus:border-2 focus:border-purple-500 placeholder:text-sm"
            type="email"
            id="email"
            placeholder="yowale@gmail.com"
          />
          <label className="block font-medium text-sm" htmlFor="password">
            Password
          </label>
          <input
            onChange={formDataHandler}
            className="w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-5 focus:border-2 focus:border-purple-500"
            type="password"
            id="password"
          />
        </form>
        {formError && (
          <p className="text-center text-red-500 text-sm pb-2 italic">
            {formError}
          </p>
        )}
        <button
          disabled={isLoading ? true : false}
          onClick={handleSubmit}
          type="button"
          className={`${isLoading ? "opacity-70" : ""} bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl px-3 py-2 cursor-pointer w-full text-white mb-3`}
        >
          {isLoading ? "..." : "Sign In"}
        </button>
        <GoogleAuth val={"Sign In With Google"}/>
        <p className="text-xs">
          Don't have an accont?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
