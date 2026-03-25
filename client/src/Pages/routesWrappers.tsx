import { Navigate, Outlet } from "react-router-dom";

type AdminRoutesProps = {
    authenticated: boolean;
    profileCompleted: boolean;
    isAdmin: boolean;
}

type UserRoutes = Omit<
    AdminRoutesProps, "isAdmin"
>

const AdminRoutes = ({
    authenticated,
    isAdmin,
    profileCompleted
}: AdminRoutesProps) => {
    // console.log(authenticated, profileCompleted, isAdmin)
    if (!authenticated) return <Navigate to="/login" replace />
    if (!profileCompleted) return <Navigate to="/complete-profile" replace />
    if (!isAdmin) return <Navigate to="/" replace />
    return <Outlet />
}

const UserRoutes = ({
    authenticated,
    profileCompleted
}: UserRoutes) => {
    if (!authenticated) return <Navigate to="/login" replace />
    if (!profileCompleted) return <Navigate to="/complete-profile" replace />
    return <Outlet />
}

const PublicRoutes = ({ authenticated, profileCompleted }: UserRoutes) => {
    if (authenticated && profileCompleted) return <Navigate to="/" replace />
    if (authenticated && !profileCompleted) return <Navigate to="/complete-profile" replace />
    return <Outlet />
}

export { PublicRoutes, AdminRoutes, UserRoutes }