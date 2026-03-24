import { createApi } from '@reduxjs/toolkit/query/react';
import type { ApiResponse } from '../../types/api.type';
import type { User } from '../../types/user.type';
import { apiPaths } from '../../utils/apiPath';
import type { UserPayload } from '../../validations/completeProfileSchema';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const baseUrl = import.meta.env.VITE_BASE_URL

if (!baseUrl) {
    throw new Error("Base url is missing")
}

export type Customer = Omit<UserPayload, "role" | "avatar"> & { avatar: string | null, _id: string }

export const syncProfileAPI = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["users"],

    endpoints: (builder) => ({
        syncProfile: builder.mutation<ApiResponse<UserPayload>, UserPayload>({
            query: (user) => ({
                url: apiPaths.users.syncProfile,
                method: "POST",
                body: user
            })
        }),

        deleteUser: builder.mutation<ApiResponse<null>, void>({
            query: () => ({
                url: apiPaths.users.profile,
                method: "DELETE",
            })
        }),

        allUsers: builder.query<ApiResponse<Customer[]>, void>({
            query: () => ({
                url: apiPaths.users.allUsers,
                method: "GET"
            })
        }),
        getProfile: builder.query<ApiResponse<User>, void>({
            query: () => ({
                url: apiPaths.users.profile,
                method: "GET"
            })
        })
    }),
})

export const {
    useSyncProfileMutation,
    useAllUsersQuery,
    useDeleteUserMutation,
    useGetProfileQuery
} = syncProfileAPI;