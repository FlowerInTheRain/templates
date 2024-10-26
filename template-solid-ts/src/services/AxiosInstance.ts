import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    }
)

const addAuthorizationHeader = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export {
    axiosInstance,
    addAuthorizationHeader
}