import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.role === "admin") return <Navigate to="/admin" replace />;

  if (user.role === "patient") return <Navigate to={`/${user.id}`} replace />;

  if (user.role === "doctor")
    return <Navigate to={`/doctorhomepage/${user.id}`} />;

  return children;
};
