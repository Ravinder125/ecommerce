import { useUser } from "@clerk/clerk-react"
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const { isLoaded, isSignedIn,user } = useUser()

    if (!isLoaded) {
        return null;
    }
    console.log(user)

    if (!isSignedIn) {
        return <Outlet />
    }

    return <Navigate to="/" />
}

export default PublicRoutes