import {createStore} from "solid-js/store";
import {StoreContent} from "../models/Store.ts";


const [appStore, setAppSore] = createStore<StoreContent>({
    token: null,
    isLogged: false,
    user: null,
});


export {appStore, setAppSore}