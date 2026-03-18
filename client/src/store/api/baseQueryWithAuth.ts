// // baseQueryWithClerk.ts
// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { auth } from '../../config/firebase'



// const rawBaseQuery = fetchBaseQuery({
//   baseUrl,
//   credentials: "include"
// })

// export const baseQueryWithClerk =
//   () =>
//     async (args: any, api: any, extraOptions: any) => {

//       let token: string | null = null;
//       if (auth?.currentUser) {
//         token = await auth.currentUser.getIdToken()
//       }

//       const headers = {
//         ...(args.headers || {}),
//         ...(token ? { Authorization: `Bearer ${token}` } : {})
//       }

//       const result = await rawBaseQuery(
//         { ...args, headers },
//         api,
//         extraOptions
//       )

//       return result
//     }