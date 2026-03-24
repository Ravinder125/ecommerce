import { Navigate, Outlet } from "react-router-dom";

type PublicRoutesProps = {
    authenticated: boolean,
    profileCompleted: boolean
}

export default function PublicRoutes({ authenticated, profileCompleted }: PublicRoutesProps) {
    if (!authenticated) {
        return <Navigate to="/login" replace />
    }

    if (!profileCompleted) {
        console.log(profileCompleted)
        return <Navigate to="/complete-profile" replace />
    }

    return <Outlet />
}