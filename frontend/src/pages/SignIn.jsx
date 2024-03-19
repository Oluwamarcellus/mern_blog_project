import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function SignIn() {
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
            className="w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-5 focus:border-2 focus:border-purple-500 placeholder:text-sm"
            type="email"
            id="email"
            placeholder="yowale@gmail.com"
          />
          <label className="block font-medium text-sm" htmlFor="password">
            Password
          </label>
          <input
            className="w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-5 focus:border-2 focus:border-purple-500"
            type="password"
            id="password"
          />
        </form>
        <button
          type="button"
          className="bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl px-3 py-2 cursor-pointer w-full text-white mb-3"
        >
          Sign In
        </button>
        <button
          type="button"
          className="flex justify-center items-center gap-3 border-2 border-purple-500/50 rounded-xl px-3 py-2 cursor-pointer w-full mb-4"
        >
          <FcGoogle />
          <h1 className="text-sm font-medium">Sign In With Google</h1>
        </button>
        <p className="text-xs">
          Don't have an accont? {" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
