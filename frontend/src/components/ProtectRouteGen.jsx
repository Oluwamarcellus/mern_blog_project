import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectRouteGen({ children }) {
  const user = useSelector((state) => state.user.activeUser);

  console.log(!!user);
    return <>{user ? children : <Navigate to={"/signin"} />}</>;
}
