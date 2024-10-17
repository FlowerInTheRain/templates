import {Alert} from "@suid/material";

export default function Alerts({type, message, opened, setIsAlertOpen}){
    const closeAlert = () => {
        setIsAlertOpen(false)
    }
    return (
            <>
                {opened() &&
	                <Alert severity={type()} class={"alerts"}
	                       action={
                               () => setTimeout(
                                   closeAlert, 2500
                               )
                           }>{message()}</Alert>
                }

            </>

        )
}