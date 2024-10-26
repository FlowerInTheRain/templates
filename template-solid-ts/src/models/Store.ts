import {User} from "./Users.ts"

interface StoreContent {
    token : string | null;
    user: User | null;
    theme: string;
    profilePicture: string;
}

export type {
    StoreContent,
}