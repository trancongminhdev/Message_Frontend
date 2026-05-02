import { io, Socket } from "socket.io-client";
import { SOCKET_EVENT } from "./type.socket";
import { IConversation } from "@/types/interaface/conversation.interface";

let socket: Socket | null = null;

export const initSocket = (accessToken: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: {
        token: accessToken,
      },
      autoConnect: true,
    });
  } else {
    socket.auth = { token: accessToken };
    if (socket.disconnected) {
      socket.connect();
    }
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      autoConnect: false,
    });
  }
  return socket;
};

export const SocketOff = (event: string) => {
  socket?.off(event);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const SocketNavigation = (callback: (conversation:IConversation) => void) => {
  const socket = getSocket();

  socket.on(SOCKET_EVENT.SOCKET_NAVIGATION, callback);
};
