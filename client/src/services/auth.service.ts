// import { useAxiosWithAuth } from "../hooks/useAxiosWithAuth";
import type { ApiResponse } from "../types/api.type";
import type { User } from "../types/user.type";
import { apiPaths } from "../utils/apiPath";
import { axiosInstance } from "../utils/axiosInstance";
import type { UserPayload } from "../validations/completeProfile.validation";





// const axiosInstanceWithAuth = useAxiosWithAuth()

export const authService = {
    syncProfile: async (payload: UserPayload) => {
        const res = await axiosInstance.post<ApiResponse<User>>(
            apiPaths.users.syncProfile,
            payload
        );
        return res.data;
    },

    getProfile: async () => {
        const res = await axiosInstance.get<ApiResponse<User>>(
            apiPaths.users.profile
        );
        return res.data;
    },
};
