import { axiosInstance } from "../utils/axiosInstance";
import { apiPaths } from "../utils/apiPath";
import type { ApiResponse } from "../types/api.type";
import type { Genders, User, UserRole } from "../types/user.type";



export type UserPayload = {
    email: string,
    name: string,
    role: UserRole,
    gender: Genders,
    dob: string,
    avatar: string | null
}

export const authService = {
    syncProfile: async (payload: UserPayload) => {
        const res = await axiosInstance.post<ApiResponse<User>>(
            apiPaths.users.register,
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
