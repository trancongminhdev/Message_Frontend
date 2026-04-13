import { boolean, number } from "yup"

export interface IUser {
    id: number;
    avatar: string;
    userName: string;
    email: string;
    isOneline: boolean;
    lastOnline: string;
    status: boolean;
    createAt: string;
    updateAt: string;
}

export interface IRegisterUser {
    userName: string;
    email: string;
    password: string;
}

export interface ILoginUser {
    userName: string;
    password: string;
}

export interface IResponseLogin {
    user: IUser;
    accessToken: string;
}

