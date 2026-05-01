import QUERY_KEY from "@/types/constant/queryKey.constant";
import { IResponseListData } from "@/types/interaface/api.interface";
import { IConversation } from "@/types/interaface/conversation.interface";
import { QueryClient } from "@tanstack/react-query";
import { getSocket } from "./socket";
import { SOCKET_EVENT } from "./type.socket";

export const JoinConversation = (idRoom: number) => {
  const socket = getSocket();
  socket?.emit(SOCKET_EVENT.JOIN_CONVERSATION, idRoom.toString());
};

export const UpdateConversation = (queryClient: QueryClient) => {
  const socket = getSocket();

  socket?.on(
    SOCKET_EVENT.UPDATE_CONVERSATION,
    (conversation: IConversation) => {
      queryClient.setQueryData(
        [QUERY_KEY.LIST_CONVERSATIONS],
        (oldData: IResponseListData<IConversation>) => {
          if (!oldData.data?.items) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              items: [conversation, ...oldData.data.items],
            },
          };
        },
      );
    },
  );
};

export const AddNewConversation = (
  queryClient: QueryClient,
  callback?: (conversation: IConversation) => void,
) => {
  const socket = getSocket();

  socket?.on(
    SOCKET_EVENT.ADD_NEW_CONVERSATION,
    (conversation: IConversation) => {
      queryClient.setQueryData(
        [QUERY_KEY.LIST_CONVERSATIONS],
        (oldData: IResponseListData<IConversation>) => {
          if (!oldData.data?.items) return oldData;

          if (callback) {
            callback(conversation);
            return oldData;
          }
          
          const newData = {
            ...oldData,
            data: {
              ...oldData.data,
              items: [conversation, ...oldData.data.items],
            },
          };
          return newData;
        },
      );
    },
  );
};

export const LeaveConversation = (idRoom: number) => {
  const socket = getSocket();
  socket?.emit(SOCKET_EVENT.LEAVE_CONVERSATION, idRoom.toString());
};
