"use client";

import InputSearch from "@/components/input/InputSearch";
import ModalSearchUser from "@/components/modal/ModalSearchUser";
import UserList from "@/components/user-list";
import { conversationService } from "@/service/convertasion.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

const LeftSidebar = () => {
  const { data } = useSession();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // const { data } = useQuery({
  //     queryKey: ['list-user-search', searchQuery],
  //     queryFn: () => userService.getListUser(searchQuery),
  //     enabled: !!searchQuery
  // })
  // data?.data?.items ||

  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => conversationService.getListConversation(),
  });

  return (
    <div
      className={`${selectedUser ? "hidden" : "flex"} sm:flex w-full sm:w-96 bg-card border-r border-border flex-col`}
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
      <UserList data={conversations?.data?.items || []} user={data?.user} />
    </div>
  );
};

export default LeftSidebar;
