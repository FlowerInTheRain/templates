import {createStore} from "solid-js/store";
import {StoreContent} from "../models/Store.ts";
import {makePersisted} from "@solid-primitives/storage";

const [appStore, setAppStore] = makePersisted(createStore<StoreContent>({
    token: null,
    user: null,
    theme: 'light',
    profilePicture:''
}), {name: "app-data"});



export {appStore, setAppStore}