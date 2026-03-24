import { Navigate, Outlet } from "react-router-dom";

type PrivateRoutesProps = {
  isAdmin: boolean,
  authenticated: boolean,
  profileCompleted: boolean
}

export default function ProtectedRoutes({
  authenticated,
  isAdmin,
  profileCompleted
}: PrivateRoutesProps) {
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!profileCompleted) {
    return <Navigate to="/complete-profile" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;

}