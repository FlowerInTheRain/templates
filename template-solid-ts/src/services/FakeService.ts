import AxiosInstance from "./AxiosInstance.ts";



const getMockData = async () => {
    return await AxiosInstance.get("/api/products")
}

export {
    getMockData
}