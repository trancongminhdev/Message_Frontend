import { IConversation } from "@/types/interaface/conversation.interface";
import { getSocket } from "./socket";
import { SOCKET_EVENT } from "./type.socket";

export const JoinConversation = (idRoom: number) => {
  const socket = getSocket();
  socket?.emit(SOCKET_EVENT.JOIN_CONVERSATION, idRoom.toString());
};

export const RetryConversation = (callback: (room: IConversation) => void) => {
  const socket = getSocket();
  socket?.on(SOCKET_EVENT.RETRY_CONVERSATION, callback);
};

export const LeaveConversation = (idRoom: number) => {
  const socket = getSocket();
  socket?.emit(SOCKET_EVENT.LEAVE_CONVERSATION, idRoom.toString());
};
