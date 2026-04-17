import { IResponseListData } from "@/types/interaface/api.interface";
import HttpClient from "./index.service";
import { URLS } from "./urls.service";
import { IMessage } from "@/types/interaface/message.interface";
import { StatusMessage } from "@/types/constant/message.constant";

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

  async updateStatusMessage({
    id,
    status,
  }: {
    id: number;
    status: StatusMessage;
  }) {
    try {
      const res = await HttpClient.patch(URLS.UPDATE_STATUS_MESSAGE(id), {
        status,
      });
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export const messageService = new MessageService();
