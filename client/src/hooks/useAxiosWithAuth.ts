import { useAuth } from '@clerk/clerk-react';
import { axiosInstance } from '../utils/axiosInstance';
import { useEffect } from 'react';

export const useAxiosWithAuth = () => {
    const { getToken } = useAuth()

    useEffect(() => {
        axiosInstance.interceptors.request.use(
            async (config) => {
                const token =await getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }

                return config
            }
        )
    }, [getToken])

    return axiosInstance
}