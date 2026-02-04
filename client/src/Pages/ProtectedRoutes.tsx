import { useUser } from "@clerk/clerk-react";
import { useAppSelector } from "../store/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes() {
  const { isSignedIn, isLoaded } = useUser();
  const { user, isLoading } = useAppSelector(state => state.auth);
  const location = useLocation()

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) return null;
  console.log(user?.role)
  if (!user?.role && location.pathname !== "/complete-profile") {
    return <Navigate to="/complete-profile" replace />;
  }

  return <Outlet />;
}
