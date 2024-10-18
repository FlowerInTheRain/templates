import {showToast} from "./toast.tsx";

const showSuccessToaster = (title:string, description: string) => {
    showToast({
        title: title,
        description: description,
        variant: "success",
        duration:2500
    })
}

const showWarningToaster = (title:string, description: string) => {
    showToast({
        title: title,
        description: description,
        variant: "warning",
        duration:2500
    })
}

const showErrorToaster = (title:string, description: string) => {
    showToast({
        title: title,
        description: description,
        variant: "warning",
        duration:2500
    })
}

export {
    showSuccessToaster,
    showWarningToaster,
    showErrorToaster
}