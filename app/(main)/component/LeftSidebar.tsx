"use client";

import AppImage from "@/components/image/AppImage";
import InputSearch from "@/components/input/InputSearch";
import ModalSearchUser from "@/components/modal/ModalSearchUser";
import UserList from "@/components/user-list";
import { AddNewConversation, UpdateConversation } from "@/config/socket/conversation.socket";
import { getSocket, SocketOff } from "@/config/socket/socket";
import { SOCKET_EVENT } from "@/config/socket/type.socket";
import { IMAGE_SOUCE } from "@/public/assets/images";
import { conversationService } from "@/service/convertasion.service";
import { messageService } from "@/service/message.service";
import QUERY_KEY from "@/types/constant/queryKey.constant";
import { ROUTE } from "@/types/constant/route";
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

    socket.on(SOCKET_EVENT.CONNECT, () => {
      AddNewConversation(queryClient);
    });

    socket.on(SOCKET_EVENT.CONNECT, () => {
      console.log("UpdateConversation");
      
      UpdateConversation(queryClient);
    });
    
    return () => {
      SocketOff(SOCKET_EVENT.ADD_NEW_CONVERSATION);
      SocketOff(SOCKET_EVENT.UPDATE_CONVERSATION);
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
