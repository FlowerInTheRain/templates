import {axiosInstance as AxiosInstance, axiosInstance2 as AxiosInstance2}  from "./AxiosInstance.ts";
import {showErrorToaster} from "../components/ui/toast-utils.ts";
import {AxiosError} from "axios";
import {appStore} from "../stores/AppStore.ts";

const getMockData = async () => {
    try {
        return await AxiosInstance2.get("/api/products")
    } catch (error) {
        mapErrors(error as AxiosError);
    }
}

const updateProfilePic = async (request: any) => {
    const phoneNumber = appStore.user?.phoneNumber
    try {
        return await AxiosInstance.put(`/profile-pictures/update-profile-picture/client/${phoneNumber}`,request, {
            headers : {
                "Content-Type": "multipart/form-data",
            }
        })
    } catch (error) {
        mapErrors(error as AxiosError);
    }
}
const signIn = async (signInRequest: any) => {
    return await AxiosInstance.post("/users-create",signInRequest)
}

const logIn = async (logInRequest: any) => {
    return await AxiosInstance.post("/connection/login/client",logInRequest)
}

const createNewOtpCode = async () => {
    return await AxiosInstance.put("/verify-account/new-otp")
}

const verifyUserAccount = async (otpRequest: any) => {
    return await AxiosInstance.put("/verify-account/client", otpRequest)
}

const mapErrors= (error:AxiosError) => {
    if(error.code === "ERR_NETWORK"){
        return showErrorToaster("Erreur réseau", "Veuillez vérifier votre connexion à internet");
    }
}

export {
    getMockData,
    mapErrors,
    updateProfilePic,
    signIn,
    logIn,
    createNewOtpCode,
    verifyUserAccount
}