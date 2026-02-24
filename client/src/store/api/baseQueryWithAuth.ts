// baseQueryWithClerk.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = import.meta.env.VITE_BASE_URL
if (!baseUrl) {
  throw new Error("Base url is missing")
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include"
})

export const baseQueryWithClerk =
  (getToken: () => Promise<string | null>) =>
    async (args: any, api: any, extraOptions: any) => {

      const token = await getToken()

      const headers = {
        ...(args.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }

      const result = await rawBaseQuery(
        { ...args, headers },
        api,
        extraOptions
      )

      return result
    }