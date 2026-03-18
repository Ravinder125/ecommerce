import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export default function PublicRoutes() {
    const { isLoading, user } = useAppSelector(state => state.user)
    if (isLoading) return null
    if (user) return <Navigate to="/" />

    return <Outlet />
}