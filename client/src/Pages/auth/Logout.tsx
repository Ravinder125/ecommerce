import { useEffect } from "react";
import { useAuth, useClerk } from "@clerk/clerk-react";

const Logout = () => {
    //   const { signOut, sessionId, isLoaded } = useAuth();
    const { signOut } = useClerk()

    useEffect(() => {
        // if (!isLoaded) return;
        // if (!sessionId) return;

        signOut({ redirectUrl: "/login" });
    }, [signOut]);

    return null;
};

export default Logout;
