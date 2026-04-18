import { StatusMessage } from "@/types/constant/message.constant";
import { getSocket } from "./socket";
import { SOCKET_EVENT } from "./type.socket";
import { IMessage } from "@/types/interaface/message.interface";

export const SendMessage = (data: { idReceiver: number; message: string }) => {
  const socket = getSocket();
  socket?.emit(SOCKET_EVENT.SEND_MESSAGE, data);
};

export const ReceiveMessageUser = (callback: (message: IMessage) => void) => {
  const socket = getSocket();
  socket?.on(SOCKET_EVENT.RECEIVE_MESSAGE_USER, (message: IMessage) => {
    callback(message);
  });
};

export const ReceiveMessageConversation = (
  callback: (message: IMessage) => void,
) => {
  const socket = getSocket();
  socket?.on(SOCKET_EVENT.RECEIVE_MESSAGE_CONVERSATION, (message: IMessage) =>
    callback(message),
  );
};

export const UpdateStatusMessage = (
  messageId: string,
  status: StatusMessage,
) => {
  const socket = getSocket();
  socket?.emit("update_status_message", messageId, status);
};
