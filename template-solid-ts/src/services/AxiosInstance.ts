import axios from "axios";

const axiosInstance = axios.create(
    {
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    }
)

const axiosInstance2 = axios.create(
    {
        baseURL: "https://fake-store-api.mock.beeceptor.com",
        headers: {
            'Content-Type': 'application/json',
        },
    }
)

const addAuthorizationHeader = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


const removeAuthorizationHeader = () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
}
export {
    axiosInstance,
    axiosInstance2,
    addAuthorizationHeader,
    removeAuthorizationHeader
}