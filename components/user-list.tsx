"use client";

import formatTimeAgo from "@/lib/formatDate/formatTimeAgo";
import { cn } from "@/lib/utils";
import { ROUTE } from "@/types/constant/route";
import { IConversation } from "@/types/interaface/conversation.interface";
import { IUser } from "@/types/interaface/user.interface";
import Link from "next/link";
import { useState } from "react";
import AppImage from "./image/AppImage";

interface Props {
  params: { id: string[] };
  data: IConversation[];
  user: IUser;
  onUpdateStatus: (idMessage: number) => void;
}

const UserList: React.FC<Props> = ({ params, data, user, onUpdateStatus }) => {
  if (data.length === 0) {
    return (
      <p className="text-center text-muted-foreground h-screen w-full flex justify-center items-center">
        Không có dữ liệu
      </p>
    );
  }

  const idConversation = params.id ? params.id[1] : "0";

  return (
    <div className="flex-1 overflow-y-auto">
      {data.map((conversation) => {
        const [isSeenTemp, setIsSeenTemp] = useState<boolean>(true);
        const isSeen = conversation.message?.status === "SENT";
        return (
          <Link
            key={conversation.id}
            href={ROUTE.CONVERSATION(
              conversation.user.id.toString(),
              conversation.id.toString(),
            )}
            className="w-full border-b transition text-left"
            onClick={() => {
              onUpdateStatus(conversation.message.id);
              setIsSeenTemp(false);
            }}
          >
            <div
              className={cn(
                "flex items-center p-4 hover:bg-gray-100 gap-3",
                conversation.id === Number(idConversation) && "bg-gray-100",
              )}
            >
              <div className="relative">
                <AppImage
                  src={conversation.user.avatar}
                  classNameContainer="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl shrink-0"
                  className="rounded-full"
                  alt={conversation.user.userName}
                />
                {/* <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div> */}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {conversation.user.userName}
                  </h3>
                  <span className="text-xs text-muted-foreground ml-2">
                    {formatTimeAgo(conversation.message.createAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p
                    className={cn(
                      "w-full text-sm text-muted-foreground truncate overflow-hidden text-ellipsis whitespace-nowrap",
                      isSeen && "font-medium",
                    )}
                  >
                    {user.id === conversation.user.id && "Đã gửi: "}
                    {conversation.message.message}
                  </p>
                  {isSeenTemp && isSeen && (
                    <div className="w-2 h-2 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold shrink-0" />
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default UserList;
