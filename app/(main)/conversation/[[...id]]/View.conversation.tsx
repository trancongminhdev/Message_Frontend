"use client";

import ChatArea from "@/components/chat-area";
import UserOptionsMenu from "@/components/user-options-menu";
import { getSocket } from "@/config/socket/socket";
import { SOCKET_EVENT } from "@/config/socket/type.socket";
import { IMAGE_SOUCE } from "@/public/assets/images";
import { conversationService } from "@/service/convertasion.service";
import { messageService } from "@/service/message.service";
import { userService } from "@/service/user.service";
import QUERY_KEY from "@/types/constant/queryKey.constant";
import { IResponseListData } from "@/types/interaface/api.interface";
import { IConversation } from "@/types/interaface/conversation.interface";
import { IMessage } from "@/types/interaface/message.interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, MoreVertical, Phone, Send, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Props {
  ids: string[]; //[idUser, idConversation]
}

const ConversationUserChat: React.FC<Props> = ({ ids }) => {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [message, setMessage] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  //check conversation
  const { data: conversation, isLoading: isLoadingConversation } = useQuery({
    queryKey: [QUERY_KEY.CHECK_CONVERSATION, ids[1]],
    queryFn: () =>
      conversationService.checkConversation({
        idConversation: Number(ids[1]),
      }),
    enabled: !!ids[1],
  });

  //lấy thông tin người nhận
  const { data: userReceiver, isLoading } = useQuery({
    queryKey: [QUERY_KEY.USER_RECEIVE, ids[0]],
    queryFn: () => userService.getUserById(Number(ids[0])),
    enabled: !!ids[0] && !!conversation,
  });

  //Lấy danh sách tin nhắn
  const { data: messages } = useQuery({
    queryKey: [QUERY_KEY.LIST_MESSAGES, ids[1]],
    queryFn: () => messageService.getMessages(Number(ids[1])),
    enabled: !!ids[1] && !!conversation,
  });

  const buttonSendMessage = useCallback((message: string) => {
    const socket = getSocket();

    socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
      idReceiver: Number(ids[0]),
      message,
    });

    setInputMessage("");
  }, []);

  useEffect(() => {
    //set tin nhắn ban đầu
    setMessage(messages?.data?.items || []);
  }, [messages]);

  useEffect(() => {
    const socket = getSocket();

    const receiverMessageConversation = (message: IMessage) => {
      setMessage((prev) => [...prev, message]);
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
    };

    const joinConversation = () => {
      socket?.emit(SOCKET_EVENT.JOIN_CONVERSATION, ids[1]);
    };

    joinConversation();

    socket.on(SOCKET_EVENT.CONNECT, joinConversation);

    //on
    socket.on(SOCKET_EVENT.UPDATE_CONVERSATION, updateConversation);
    socket.on(
      SOCKET_EVENT.RECEIVE_MESSAGE_CONVERSATION,
      receiverMessageConversation,
    );

    return () => {
      socket.off(
        SOCKET_EVENT.RECEIVE_MESSAGE_CONVERSATION,
        receiverMessageConversation,
      );
      socket.off(SOCKET_EVENT.CONNECT, joinConversation);
      socket.off(SOCKET_EVENT.UPDATE_CONVERSATION, updateConversation);
    };
  }, [ids[1]]);

  if (isLoadingConversation) return <p>Loading...</p>;
  if (!conversation) return notFound();

  if (
    !isLoading &&
    !messages?.data?.items &&
    messages?.data?.items?.length === 0
  )
    return notFound();

  return (
    <div className="flex h-screen bg-background flex-col sm:flex-row">
      <div className="flex-1 flex flex-col bg-background">
        {/* Chat Header */}
        <div className="bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button
              // onClick={() => setSelectedUser(null)}
              className="sm:hidden p-2 hover:bg-secondary rounded-lg transition text-foreground -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Image
              src={userReceiver?.data?.avatar || IMAGE_SOUCE.AVATAR}
              alt="avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-foreground truncate">
                {userReceiver?.data?.userName}
              </h2>
              <p className="text-sm text-muted-foreground">
                {userReceiver?.data?.isOnline
                  ? "Đang hoạt động"
                  : "Không hoạt động"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-lg transition text-foreground hidden sm:block">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition text-foreground hidden sm:block">
              <Video className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 hover:bg-secondary rounded-lg transition text-foreground"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              {showUserMenu && userReceiver?.data && (
                <UserOptionsMenu
                  user={userReceiver?.data}
                  onClose={() => setShowUserMenu(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <ChatArea messages={message} user={data?.user} />

        {/* Input Area */}
        <div className="bg-card border-t border-border p-4">
          <div className="flex gap-2 items-end">
            <input
              type="text"
              placeholder="Aa"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2 bg-secondary border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition cursor-pointer"
              onClick={() => {
                buttonSendMessage(inputMessage);
              }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationUserChat;
