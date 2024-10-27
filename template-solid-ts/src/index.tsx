/* @refresh reload */
import {render} from 'solid-js/web'
import './index.css'
import Home from './Home.tsx'
import {Route, Router} from "@solidjs/router";
import {onMount} from "solid-js";
import {appStore} from "./stores/AppStore.ts";
import InvoiceDetail from "./components/invoices/InvoiceDetails.tsx";
import ErrorPage from "./components/error/404.tsx";
import Profile from "./components/profile/Profile.tsx";
import {addAuthorizationHeader} from "./services/AxiosInstance.ts";
import MainLayout from "./MainLayout.tsx";


const root = document.getElementById('root')

const filters = {
    reference: (v: string) => v.length === 6
};

onMount(() => {
    if (appStore.token) {
        addAuthorizationHeader(appStore.token);
    }
})

render(() => (
    <Router root={MainLayout}>
        <Route path="/" component={Home}/>
        <Route path="/profile" component={Profile}/>
        <Route
            path="/invoice-details/:reference"
            component={InvoiceDetail}
            matchFilters={filters}
        />
        <Route path="*" component={ErrorPage}/>
    </Router>
), root!)
