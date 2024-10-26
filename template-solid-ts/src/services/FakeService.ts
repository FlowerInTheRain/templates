import {axiosInstance as AxiosInstance}  from "./AxiosInstance.ts";
import {showErrorToaster} from "../components/ui/toast-utils.ts";
import {AxiosError} from "axios";

const getMockData = async () => {
    try {
        return await AxiosInstance.get("/api/products")
    } catch (error) {
        mapErrors(error as AxiosError);
    }
}

const updateProfilePic = async (request: any) => {
    try {
        return await AxiosInstance.post("/profile-pictures/update-profile-picture/client/0764017528",request, {
            headers : {
                "Content-Type": "multipart/form-data",
            }
        })
    } catch (error) {
        mapErrors(error as AxiosError);
    }
}

const mapErrors= (error:AxiosError) => {
    if(error.code === "ERR_NETWORK"){
        showErrorToaster("Erreur réseau", "Veuillez vérifier votre connexion à internet");
    }
}

export {
    getMockData,
    updateProfilePic
}