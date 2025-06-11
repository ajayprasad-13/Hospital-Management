import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  if (!userStr) {
    return <Navigate to={`/`} replace />;
  }

  if (user.role === "patient") {
    return <Navigate to={`/${user.id}`} />;
  }

  if (user.role === "doctor") {
    toast.error(`You're not supposed to  visit Dr.${user.username}`);
    return <Navigate to={`/doctorhomepage/${user.id}`} replace />;
  }

  return children;
};
