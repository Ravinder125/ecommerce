import axios from "axios";


const baseURL = import.meta.env.BASE_URL

export const AxiosInstance = axios.create({
    baseURL,
    withCredentials: true
})