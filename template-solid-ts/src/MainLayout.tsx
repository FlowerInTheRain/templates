import {Toaster} from "./components/ui/toast.tsx";
import {ColorModeProvider, ColorModeScript, createLocalStorageManager} from "@kobalte/core";
import {createSignal} from "solid-js";
import {appStore} from "./stores/AppStore.ts";
import Navbar from "./components/menu/Navbar.tsx"
import {Flex} from "./components/ui/flex.tsx";

function MainLayout(props: any) {

    const [themeName, setThemeName] = createSignal<string>(appStore.theme);
    const storageManager = createLocalStorageManager("vite-ui-theme")
    return (
        <>
            <Toaster/>
            <ColorModeScript storageType={storageManager.type}/>
            <ColorModeProvider storageManager={storageManager}>
                <Navbar themeName={themeName} setThemeName={setThemeName}/>
                <Flex>
                    {props.children}
                </Flex>
            </ColorModeProvider>
        </>

)
    ;
}

export default MainLayout;