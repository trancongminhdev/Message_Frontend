import { getSocket } from "./socket";
import { SOCKET_EVENT } from "./type.socket";

export const JoinConversation = (idRoom: number) => {
  const socket = getSocket();
  socket?.emit(SOCKET_EVENT.JOIN_CONVERSATION, idRoom.toString());
};

export const LeaveConversation = (idRoom: number) => {
  const socket = getSocket();
  socket?.emit(SOCKET_EVENT.LEAVE_CONVERSATION, idRoom.toString());
};
