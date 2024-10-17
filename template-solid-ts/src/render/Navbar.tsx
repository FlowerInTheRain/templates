import MenuIcon from "@suid/icons-material/Menu";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@suid/material";
import {appStore} from "../stores/AppStore.ts";
import {createSignal} from "solid-js";
import Drawer from "./Drawer.tsx"


export default function BasicAppBar() {
    const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);
    console.log(appStore.token)
    const openDrawer = () => {
        setIsDrawerOpen(
            true
        )
    }


    const closeDrawer = () => {
        console.log("euh ?")
        if(isDrawerOpen){
            setIsDrawerOpen(
                false
            )
        }
    }
    return (
        <Box sx={{flexGrow: 1}}>

            <Drawer isDrawerOpen={isDrawerOpen}  closeDrawer={closeDrawer}/>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={() => openDrawer()}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        ouai
                    </Typography>
                    {appStore.token == null &&
	                    <Button color="inherit">Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
