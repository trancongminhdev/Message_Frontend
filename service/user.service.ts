import { URLS } from "@/service/urls.service";
import { IResponse, IResponseListData } from "@/types/interaface/api.interface";
import { IRegisterUser, IUser } from "@/types/interaface/user.interface";
import HttpClient from "./index.service";

class UserService {
  async register(body: IRegisterUser) {
    try {
      const res = await HttpClient.post(URLS.REGISTER, body);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getListUser(userName: string): Promise<IResponseListData<IUser>> {
    try {
      const res = await HttpClient.get<IResponseListData<IUser>>(
        URLS.GET_LIST_USER,
        { params: { userName } },
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<IResponse<IUser>> {
    try {
      const res = await HttpClient.get<IResponse<IUser>>(
        URLS.GET_USER_BY_ID(id),
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
