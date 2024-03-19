import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
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
          Welcome to Yowale's Blog. You can trustfully sign up with your email
          and password or with Google
        </p>
      </div>
      <div className="md:flex-1">
        <form>
          <label className="block font-medium text-sm" for="username">Username</label>
          <input className="w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-5 focus:border-2 focus:border-purple-500" type="text" id="username" />
          <label className="block font-medium text-sm" for="email">Email</label>
          <input className="w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-5 focus:border-2 focus:border-purple-500 placeholder:text-sm" type="email" id="email" placeholder="yowale@gmail.com" />
          <label className="block font-medium text-sm" for="password">Password</label>
          <input className="w-full outline-none border rounded-md bg-[rgba(0,0,0,.02)] p-2 mb-5 focus:border-2 focus:border-purple-500" type="password" id="password" />
        </form>
        <button type="button" className="bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl px-3 py-2 cursor-pointer w-full text-white mb-3">Sign Up</button>
        <button type="button" className="flex justify-center items-center gap-3 border-2 border-purple-500/50 rounded-xl px-3 py-2 cursor-pointer w-full mb-4"><FcGoogle/><h1 className="text-sm font-medium">Sign Up With Google</h1></button>
        <p className="text-xs">
          Have an accont? <Link to="/signin" className="text-blue-500">Sign In</Link>
        </p>
      </div>
    </div>
  );
}