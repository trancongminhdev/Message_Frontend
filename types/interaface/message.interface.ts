import { StatusMessage } from "../constant/message.constant";

export interface IMessage {
  id?: number;
  idRoom: number;
  userSend: number;
  message: string;
  status?: StatusMessage;
  createAt?: string;
  updateAt?: string;
}
