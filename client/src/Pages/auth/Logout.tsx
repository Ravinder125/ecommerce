import { useEffect } from "react";
import { signOut } from 'firebase/auth'
import { auth } from "../../config/firebase";
import { Navigate } from "react-router-dom";

const Logout = () => {
    useEffect(() => {
        const logout = async () => {
            try {
                await signOut(auth)
            } catch (error) {

            }
        }

        logout()
    }, [signOut]);

    return <Navigate to="/login" />;
};

export default Logout;
