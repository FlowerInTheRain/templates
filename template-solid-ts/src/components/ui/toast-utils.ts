import {showToast} from "./toast.tsx";

const showSuccessToaster = (title:string, description: string) => {
    showToast({
        title: title,
        description: description,
        variant: "success",
        duration:3500
    })
}

const showWarningToaster = (title:string, description: string) => {
    showToast({
        title: title,
        description: description,
        variant: "warning",
        duration:3500
    })
}

const showErrorToaster = (title:string, description: string) => {
    showToast({
        title: title,
        description: description,
        variant: "error",
        duration:5500
    })
}

export {
    showSuccessToaster,
    showWarningToaster,
    showErrorToaster
}