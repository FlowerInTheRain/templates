import {createStore} from "solid-js/store";
import {StoreContent} from "../models/Store.ts";
import displayText from "../constants/static-text-values.ts";

const [appStore, setAppSore] = createStore<StoreContent>({
    token: null,
    isLogged: false,
    user: null,
    theme: localStorage.getItem("theme") || displayText.themeNameLight
});


export {appStore, setAppSore}