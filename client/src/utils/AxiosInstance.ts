// import axios from "axios";
// import { getToken } from "./tokenManager";
// // import { useAuth } from '@clerk/clerk-react'
// // import {clerk} from '@clerk/clerk-react'

// const baseURL = import.meta.env.VITE_BASE_URL

// export const axiosInstance = axios.create({
//     baseURL,
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//     }
// })

// axiosInstance.interceptors.request.use(
//     async (config) => {
//         const token = await getToken()
//         if (token) {
//             console.log(token)
//             // const token = await getTokenFn();
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     },
//     (err: any) => {
//         return err
//     }
// )