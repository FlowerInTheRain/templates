import AxiosInstance from "./AxiosInstance.ts";
import {showErrorToaster} from "../components/ui/toast-utils.ts";
import {AxiosError} from "axios";

const getMockData = async () => {
    try {
        return await AxiosInstance.get("/api/products")
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
    getMockData
}