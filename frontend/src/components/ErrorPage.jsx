import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-5xl py-10">Error 404</h1>
      <p className="text-xl py-2">PAGE NOT FOUND</p>
      <p>
        Go back <Link to="/" className="text-red-600 opacity-50 px-1 hover:opacity-100">home</Link>
      </p>
    </div>
  );
}
