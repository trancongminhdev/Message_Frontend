import { getSocket } from "./socket";
import { SOCKET_EVENT } from "./type.socket";

export const UserOnline = () => {
  const socket = getSocket();
  socket.emit(SOCKET_EVENT.ONLINE);
};

export const UserOffline = () => {
  const socket = getSocket();
  socket.emit(SOCKET_EVENT.OFFLINE);
};
