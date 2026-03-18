import { useAppDispatch } from "../store/hooks";
import { useGetProfileQuery } from "../store/api/syncProfileAPI";
import { clearUser, getUser } from "../store/reducers/authSlice";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useAppDispatch();
    const [firebaseUser, setFirebaseUser] = useState(auth.currentUser);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setFirebaseUser(user);
            setAuthLoading(false);
        });

        return unsubscribe;

    }, []);

    const { isLoading, data } = useGetProfileQuery(undefined, {
        skip: !firebaseUser
    });

    useEffect(() => {
        if (data?.data) {
            dispatch(getUser(data.data));
        } else dispatch(clearUser())
    }, [data, dispatch]);

    if (authLoading) return <div>Loading...</div>;

    if (isLoading) return <div>Loading...</div>;

    return <>{children}</>;
};

export default UserProvider;