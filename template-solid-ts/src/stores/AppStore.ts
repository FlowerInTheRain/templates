import {createStore} from "solid-js/store";
import {StoreContent} from "../models/Store.ts";
import {makePersisted} from "@solid-primitives/storage";

const [appStore, setAppStore] = makePersisted(createStore<StoreContent>({
    token: null,
    isLogged: false,
    user: null,
    theme: 'light'
}), {name: "app-data"});



export {appStore, setAppStore}