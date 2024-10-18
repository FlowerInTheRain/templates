import {User} from "./Users.ts"

interface StoreContent {
    token : string | null;
    isLogged: boolean;
    user: User | null;
    theme: string;
}

export type {
    StoreContent,
}