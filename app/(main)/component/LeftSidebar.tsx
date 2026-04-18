"use client";

import AppImage from "@/components/image/AppImage";
import InputSearch from "@/components/input/InputSearch";
import ModalSearchUser from "@/components/modal/ModalSearchUser";
import UserList from "@/components/user-list";
import { IMAGE_SOUCE } from "@/public/assets/images";
import { conversationService } from "@/service/convertasion.service";
import { messageService } from "@/service/message.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const LeftSidebar = () => {
  const params = useParams() as { id: string[] };

  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["list-user-search", searchQuery],
    queryFn: () => conversationService.getListUserConversation(searchQuery),
    enabled: !!searchQuery,
  });

  const { data: conversations, isLoading: isLoadingConversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => conversationService.getListConversation(),
  });

  const { mutate } = useMutation({
    mutationFn: messageService.updateStatusMessage,
  });

  const data = useMemo(() => {
    return searchQuery.trim().length > 0
      ? users?.data?.items
      : conversations?.data?.items;
  }, [searchQuery, users, conversations]);

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
