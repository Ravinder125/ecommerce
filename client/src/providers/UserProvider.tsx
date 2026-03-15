import { useAppDispatch } from "../store/hooks";
import { useGetProfileQuery } from "../store/api/syncProfileAPI";
import { getUser } from "../store/reducers/authSlice";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { isLoading, data } = useGetProfileQuery();
    if (isLoading) return <div>Loading...</div>
    dispatch(getUser(data?.data ?? null))
    return <>{children}</>
};

export default UserProvider;
