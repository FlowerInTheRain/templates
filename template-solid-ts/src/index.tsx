/* @refresh reload */
import {render} from 'solid-js/web'
import './index.css'
import Home from './Home.tsx'
import {Route, Router} from "@solidjs/router";
import {createSignal} from "solid-js";
import {ColorModeProvider, ColorModeScript, createLocalStorageManager} from "@kobalte/core";
import Navbar from "./components/menu/Navbar.tsx"
import {appStore} from "./stores/AppStore.ts";
import InvoiceDetail from "./components/invoices/InvoiceDetails.tsx";
import {Toaster} from "./components/ui/toast.tsx";
import ErrorPage from "./components/error/404.tsx";
import Profile from "./components/profile/Profile.tsx";


const root = document.getElementById('root')

const [themeName, setThemeName] = createSignal<string>(appStore.theme);
const storageManager = createLocalStorageManager("vite-ui-theme")
const filters = {
    reference: (v: string) => v.length === 6
};

render(() => (
    <>
        <Toaster/>
        <ColorModeScript storageType={storageManager.type}/>
        <ColorModeProvider storageManager={storageManager}>
            <Navbar themeName={themeName} setThemeName={setThemeName}/>
        </ColorModeProvider>
        <Router>
            <Route path="/" component={Home}/>
            <Route path="/profile" component={Profile}/>
            <Route
                path="/invoice-details/:reference"
                component={InvoiceDetail}
                matchFilters={filters}
            />
            <Route path="*" component={ErrorPage} />
        </Router>
    </>
), root!)
