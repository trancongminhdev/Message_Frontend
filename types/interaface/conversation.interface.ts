import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export interface IConversation {
  id: number;
  members: number[];
  status: boolean;
  createAt: Date;
  updateAt: Date;
  message: IMessage;
  user: IUser;
}

export interface IBodyCheckConversation {
  idConversation: number;
}
