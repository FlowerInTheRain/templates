/* @refresh reload */
import {render} from 'solid-js/web'
import './index.css'
import Home from './Home.tsx'
import {Route, Router} from "@solidjs/router";
import {createSignal} from "solid-js";
import {ColorModeProvider, ColorModeScript, createLocalStorageManager} from "@kobalte/core";
import {Toaster} from "solid-sonner";
import Navbar from "./render/Navbar.tsx"
import {appStore} from "./stores/AppStore.ts";

const root = document.getElementById('root')
const [themeName, setThemeName] = createSignal(appStore.theme);
const storageManager = createLocalStorageManager("vite-ui-theme")

render(() => (
    <>
        <ColorModeScript storageType={storageManager.type}/>
        <ColorModeProvider storageManager={storageManager}>
            <Toaster/>
            <Navbar themeName={themeName} setThemeName={setThemeName}/>
        </ColorModeProvider>
        <Router>
            <Route path="/" component={Home}/>
        </Router>
    </>

), root!)
