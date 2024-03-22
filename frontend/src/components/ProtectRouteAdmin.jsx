import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectRouteAdmin({ children }) {
  const user = useSelector((state) => state.user.activeUser);

    return <>{user && user.anAdmin ? children : <Navigate to={"/"} />}</>;
}