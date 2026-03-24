import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../config/firebase";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL
})

export const baseQueryWithAuth =
    async (args: any, api: any, extraOptions: any) => {
        let token = null;

        if (auth.currentUser) {
            token = await auth.currentUser.getIdToken()
        }

        const headers = {
            ...(args.headers || {}),
            ...(token && {

                Authorization:
                    `Bearer ${token}`

            })
        }

        return rawBaseQuery(
            { ...args, headers },
            api,
            extraOptions
        )
    }