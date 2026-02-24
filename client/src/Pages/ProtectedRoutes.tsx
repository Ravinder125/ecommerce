import { useUser } from "@clerk/clerk-react";
// import { useAppSelector } from "../store/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function ProtectedRoutes() {
  const { isSignedIn, isLoaded } = useUser();
  const { user, isLoading } = useAppSelector(state => state.user);
  const location = useLocation()
  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) return null;


  if (!user?.role && location.pathname !== "/complete-profile") {
    return <Navigate to="/complete-profile" replace />;
  }

  if (user?.role && location.pathname === "/complete-profile") {
    return <Navigate to="/" replace />
  }

  return <Outlet />;

}
