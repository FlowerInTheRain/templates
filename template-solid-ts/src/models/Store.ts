import {User} from "./Users.ts"
interface StoreContent {
    token : string | null;
    isLogged: boolean;
    // @ts-ignore
    user: User | null;

    theme: string;
}

export type {
    StoreContent,
}