import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useAppDispatch } from "../store/hooks";
import { fetchUser } from "../features/auth/authThunk";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoaded } = useUser();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoaded) return;
        if (user) dispatch(fetchUser());
    }, [isLoaded, user]);

    return <>{children}</>
};

export default UserProvider;
