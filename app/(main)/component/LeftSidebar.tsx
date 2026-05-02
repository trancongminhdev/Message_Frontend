"use client";

import AppImage from "@/components/image/AppImage";
import InputSearch from "@/components/input/InputSearch";
import ModalSearchUser from "@/components/modal/ModalSearchUser";
import UserList from "@/components/user-list";
import { getSocket } from "@/config/socket/socket";
import { SOCKET_EVENT } from "@/config/socket/type.socket";
import { IMAGE_SOUCE } from "@/public/assets/images";
import { conversationService } from "@/service/convertasion.service";
import { messageService } from "@/service/message.service";
import QUERY_KEY from "@/types/constant/queryKey.constant";
import { IResponseListData } from "@/types/interaface/api.interface";
import { IConversation } from "@/types/interaface/conversation.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const LeftSidebar = () => {
  const params = useParams() as { id: string[] };

  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  //list user khi search
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: [QUERY_KEY.LIST_SEARCH_USER, searchQuery],
    queryFn: () => conversationService.getListUserConversation(searchQuery),
    enabled: !!searchQuery,
  });

  //list conversation
  const { data: conversations, isLoading: isLoadingConversations } = useQuery({
    queryKey: [QUERY_KEY.LIST_CONVERSATIONS],
    queryFn: () => conversationService.getListConversation(),
    enabled: !!session?.user?.id && !searchQuery,
  });

  const { mutate } = useMutation({
    mutationFn: messageService.updateStatusMessage,
  });

  const data = useMemo(() => {
    return searchQuery.trim().length > 0
      ? users?.data?.items
      : conversations?.data?.items;
  }, [searchQuery, users, conversations]);

  useEffect(() => {
    const socket = getSocket();

    //add new conversation
    const addNewConversation = (conversation: IConversation) => {
      queryClient.setQueryData(
        [QUERY_KEY.LIST_CONVERSATIONS],
        (oldData: IResponseListData<IConversation>) => {
          if (!oldData.data?.items) return oldData;

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
    };

    //update conversation
    const updateConversation = (conversation: IConversation) => {
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
      }

    socket.on(SOCKET_EVENT.ADD_NEW_CONVERSATION, addNewConversation);
    socket.on(SOCKET_EVENT.UPDATE_CONVERSATION, updateConversation);

    return () => {
      socket.off(SOCKET_EVENT.ADD_NEW_CONVERSATION, addNewConversation);
      socket.off(SOCKET_EVENT.UPDATE_CONVERSATION, updateConversation);
    };
  }, []);

  return (
    <div
      className={`flex sm:flex w-full sm:w-96 bg-card border-r border-border flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-4">Messages</h1>

        {/* Search Bar */}
        <InputSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Action Buttons */}
        <ModalSearchUser />
      </div>

      {/* User List */}
      {isLoadingConversations ||
        (isLoadingUsers && (
          <AppImage
            src={IMAGE_SOUCE.LOADING}
            alt=""
            classNameContainer="h-[20px] w-[20px]"
            unoptimized
          />
        ))}

      {!isLoadingConversations && !isLoadingUsers && (
        <UserList
          data={data || []}
          user={session?.user}
          params={params}
          onUpdateStatus={(idMessage) =>
            mutate({ id: idMessage, status: "SEEN" })
          }
        />
      )}
    </div>
  );
};

export default LeftSidebar;
