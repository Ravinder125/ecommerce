import { createApi } from '@reduxjs/toolkit/query/react';
import type { Genders, UserRole } from '../../types/user.type';
import type { ApiResponse } from '../../types/api.type';
import { apiPaths } from '../../utils/apiPath';
import { getToken } from '../../utils/tokenManager';
import { baseQueryWithClerk } from './baseQueryWithAuth';

export const baseUrl = import.meta.env.VITE_BASE_URL
if (!baseUrl) {
    throw new Error("Base url is missing in User Api")
}

export type UserPayload = {
    email: string,
    name: string,
    role: UserRole,
    gender: Genders,
    dob: string,
    avatar: string | null
}

// async (headers) => {
//     const token = await getToken()
//     headers.set("Authorization", `Bearer ${token}`)

//     if (token) {
//         headers.set("Authorization", `Bearer ${token}`)
//     }
// }

export const syncProfileAPI = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithClerk(getToken),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        syncProfile: builder.mutation<ApiResponse<UserPayload>, UserPayload>({
            query: (user) => ({
                url: apiPaths.users.syncProfile,
                method: "POST",
                body: user
            })
        }),

        deleteUser: builder.mutation<ApiResponse<null>, null>({
            query: () => ({
                url: apiPaths.users.profile,
                method: "GET",
            })
        }),

        allUsers: builder.mutation<ApiResponse<UserPayload[]>, null>({
            query: () => ({
                url: apiPaths.users.allUsers,
                method: "GET"
            })
        })
    }),
})

export const {
    useSyncProfileMutation,
    useAllUsersMutation,
    useDeleteUserMutation,
} = syncProfileAPI;