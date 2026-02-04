import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) return null;

    if (isSignedIn) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
