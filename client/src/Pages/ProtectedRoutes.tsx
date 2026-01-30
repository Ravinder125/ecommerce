import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null; // 👈 MUST return null
  }
  if (isSignedIn) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
}
