import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const PatientRoute = ({ children }: { children: JSX.Element }) => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  if (!userStr) {
    return <Navigate to={`/`} replace />;
  }

  if (user.role === "admin") {
    return <Navigate to={`/admin`} replace />;
  }

  if (user.role === "doctor") {
    return <Navigate to={`/doctorhomepage/${user.id}`} />;
  }

  return children;
};
