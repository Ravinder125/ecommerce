import { useAppDispatch } from "../store/hooks";
import { useGetProfileQuery } from "../store/api/syncProfileAPI";
import { getUser } from "../store/reducers/authSlice";
import { useEffect } from "react";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { isLoading, data } = useGetProfileQuery();

    useEffect(() => {
        if (data?.data) {
            dispatch(getUser(data.data));
        }
    }, [data, dispatch]);

    if (!data?.data) return null;

    if (isLoading) return <div>Loading...</div>
    return <>{children}</>;
};

export default UserProvider;
