import CloseIcon from '@suid/icons-material/Close';

export default function Alerts({type, message, opened, setIsAlertOpen}){
    const closeAlert = () => {
        setIsAlertOpen(false)
    }
    return (
            <>
                {opened() &&
	                <Alert severity={type()} class={"alerts"}
                            action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={closeAlert} ><CloseIcon/></IconButton>
                    }
                    >{message()}</Alert>
                }

            </>

        )
}