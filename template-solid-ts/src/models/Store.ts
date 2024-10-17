import {User} from "./Users.ts"
interface StoreContent {
    token : string | null;
    isLogged: boolean;
    // @ts-ignore
    user: User | null;
}

export type {
    StoreContent,
}