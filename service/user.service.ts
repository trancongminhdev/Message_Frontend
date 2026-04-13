import HttpClient from "./index.service";
import { IRegisterUser } from "@/types/interaface/user.interface";
import { URLS } from "@/service/urls.service";

export class UserService {
    async register(body: IRegisterUser) {
        try {
            const res = await HttpClient.post(URLS.REGISTER, body);
            return res;
        } catch (error) {
            throw error
        }
    }
}

export const userService = new UserService();