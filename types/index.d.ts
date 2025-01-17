import { userFormSchema } from "./constansts";

export interface User {
    id: string;
    fullname: string
    firstname: string;
    lastname: string;
    email: string;
    email_verified_at: string;
}

export type UserData = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    identification: string;
    phone: string;
}

export type SheetEntityStore = {
    isOpen: boolean,
    identificator: string,
    setIdentificator: (id:string) => void,
    setIsOpen: () => void,
    data: null,
    loading:boolean,
    execute: (identificator:string, settinData:Function, path:string) => Promise<void>,
    reset: () => void
}

