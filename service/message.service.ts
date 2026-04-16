import { IResponseListData } from "@/types/interaface/api.interface";
import HttpClient from "./index.service";
import { URLS } from "./urls.service";
import { IMessage } from "@/types/interaface/message.interface";

class MessageService {
  async getMessages(idreceiver: number): Promise<IResponseListData<IMessage>> {
    try {
      const res = await HttpClient.get<IResponseListData<IMessage>>(
        URLS.GET_LIST_MESSAGES(idreceiver),
      );
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export const messageService = new MessageService();
