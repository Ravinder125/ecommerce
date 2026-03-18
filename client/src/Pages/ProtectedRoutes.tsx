import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { auth } from "../config/firebase";

export default function ProtectedRoutes() {
  const { isLoading, user } = useAppSelector(state => state.user)
  const location = useLocation()


  if (isLoading) return null;
  if (!auth.currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (
    auth.currentUser &&
    location.pathname !== "/complete-profile" &&
    !user
  ) {
    return <Navigate to="/complete-profile" replace />;
  }

  if (user?.role && location.pathname === "/complete-profile") {
    return <Navigate to="/" replace />
  }



  return <Outlet />

}