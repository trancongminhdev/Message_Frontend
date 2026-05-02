"use client";

import ChatArea from "@/components/chat-area";
import UserOptionsMenu from "@/components/user-options-menu";
import { SendMessage } from "@/config/socket/chat.socket";
import {
  getSocket,
  SocketOff
} from "@/config/socket/socket";
import { SOCKET_EVENT } from "@/config/socket/type.socket";
import { IMAGE_SOUCE } from "@/public/assets/images";
import { userService } from "@/service/user.service";
import QUERY_KEY from "@/types/constant/queryKey.constant";
import { ROUTE } from "@/types/constant/route";
import { IConversation } from "@/types/interaface/conversation.interface";
import { IMessage } from "@/types/interaface/message.interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, MoreVertical, Phone, Send, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Props {
  idReceiver: string;
}

const ViewUserChat: React.FC<Props> = ({ idReceiver }) => {
  const navigation = useRouter();
  const { data } = useSession();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [message, setMessage] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  //lấy thông tin người nhận
  const { data: userReceiver, isLoading } = useQuery({
    queryKey: [QUERY_KEY.USER_RECEIVE, idReceiver],
    queryFn: () => userService.getUserById(Number(idReceiver)),
    enabled: !!idReceiver,
  });

  const buttonSendMessage = useCallback(() => {
    SendMessage({ idReceiver: Number(idReceiver), message: inputMessage });
    setInputMessage("");
  }, [idReceiver, inputMessage]);

  useEffect(() => {
    const socket = getSocket();

    //Nhận tin nhắn
    const receiverMessage = (message: IMessage) => {
      setMessage((prev) => [...prev, message]);
    };

    //chuyển hướng sang conversation
    const socketNavagation = (conversation: IConversation) => {
      if (!conversation.id) return;
      const route = ROUTE.CONVERSATION(idReceiver, conversation.id.toString());
      navigation.push(route);
    };

    socket.on(SOCKET_EVENT.RECEIVE_MESSAGE_USER, receiverMessage);
    socket.on(SOCKET_EVENT.SOCKET_NAVIGATION, socketNavagation);

    return () => {
      socket.off(SOCKET_EVENT.RECEIVE_MESSAGE_USER, receiverMessage);
      socket.off(SOCKET_EVENT.SOCKET_NAVIGATION, socketNavagation);
    };
  }, []);

  if (!isLoading && !userReceiver?.data) return notFound();

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
              <p className="text-sm text-muted-foreground">Active now</p>
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
                buttonSendMessage();
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

export default ViewUserChat;
