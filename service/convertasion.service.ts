import { IResponseListData } from "@/types/interaface/api.interface";
import HttpClient from "./index.service";
import { URLS } from "./urls.service";
import { IConversation } from "@/types/interaface/conversation.interface";

class ConvertasionService {
  async getListConversation(): Promise<IResponseListData<IConversation>> {
    try {
      const res = await HttpClient.get<IResponseListData<IConversation>>(
        URLS.GET_LIST_CONVERSATION,
      );
      return res;
    } catch (err) {
      throw err;
    }
  }

  async getListUserConversation(userName: string) {
    try {
      const res = await HttpClient.get<IResponseListData<any>>(
        URLS.GET_LIST_USER_CONVERSATION,
        { params: { userName } },
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
}

export const conversationService = new ConvertasionService();
