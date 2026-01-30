import { AxiosInstance } from "../../utils/AxiosInstance";
import { apiPaths } from "../../utils/apiPath";
import type { ApiResponse } from "../../types/api.type";
import type { User } from "../../types/user.type";

export const authService = {
    syncProfile: async (payload: {
        name: string | null;
        email: string;
        avatar?: string;
    }) => {
        const res = await AxiosInstance.post<ApiResponse<User>>(
            apiPaths.auth.profile,
            payload
        );
        return res.data;
    },

    getProfile: async () => {
        const res = await AxiosInstance.get<ApiResponse<User>>(
            apiPaths.users.profile
        );
        return res.data;
    },
};
