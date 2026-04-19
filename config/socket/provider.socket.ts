"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { disconnectSocket, initSocket, SocketOff } from "./socket";
import { SOCKET_EVENT } from "./type.socket";
import { JoinConversation } from "./conversation.socket";
import { useQueryClient } from "@tanstack/react-query";
import { IMessage } from "@/types/interaface/message.interface";
import { IResponseListData } from "@/types/interaface/api.interface";
import { IConversation } from "@/types/interaface/conversation.interface";

export const SocketProvider = () => {
  const { data } = useSession();
  const queryClient = useQueryClient();
  useEffect(() => {
    const token = data?.accessToken;
    if (!token) return;

    const socket = initSocket(token);

    socket.on(SOCKET_EVENT.CONNECT, () => {
      JoinConversation(Number(data?.user.id));
    });

    socket.on(SOCKET_EVENT.RECEIVE_MESSAGE_USER, (message: IMessage) => {
      console.log("message 123 12312", message);
      queryClient.setQueryData(
        ["conversations"],
        (oldData: IResponseListData<IConversation>) => {
          if (!oldData?.data?.items) return oldData;

          const items = oldData.data.items;

          // tìm conversation
          const index = items.findIndex(
            (item) => item.id === message.idConversation,
          );
          console.log("index === -1", index === -1);

          if (index === -1) return oldData;

          const updatedItem = {
            ...items[index],
            message: message,
          };

          // remove + đưa lên đầu
          const newItems = [
            updatedItem,
            ...items.slice(0, index),
            ...items.slice(index + 1),
          ];
          console.log("newItems", {
            ...oldData,
            data: {
              ...oldData.data,
              items: newItems,
            },
          });

          return {
            ...oldData,
            data: {
              ...oldData.data,
              items: newItems,
            },
          };
        },
      );
    });
    return () => {
      SocketOff(SOCKET_EVENT.JOIN_CONVERSATION);
      disconnectSocket();
    };
  }, [data]);

  return null;
};
