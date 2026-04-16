"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { initSocket } from "./socket";
import { SOCKET_EVENT } from "./type.socket";

export const SocketProvider = () => {
  const { data } = useSession();

  useEffect(() => {
    const token = data?.accessToken;
    if (!token) return;

    const socket = initSocket(token);

    socket.on(SOCKET_EVENT.CONNECT, () => {
      console.log(SOCKET_EVENT.CONNECT, socket.id);
    });
    return () => {
      // socket.off();
      // disconnectSocket();
    };
  }, [data]);

  return null;
};
