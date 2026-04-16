"use client";

import { ROUTE } from "@/types/constant/route";
import { IConversation } from "@/types/interaface/conversation.interface";
import Link from "next/link";
import AppImage from "./image/AppImage";
import formatTimeAgo from "@/lib/formatDate/formatTimeAgo";

interface Props {
  data: IConversation[];
}

const UserList: React.FC<Props> = ({ data }) => {
  if (data.length === 0) {
    return (
      <p className="text-center text-muted-foreground h-screen w-full flex justify-center items-center">
        Không có dữ liệu
      </p>
    );
  }
  // const date = new Date(data[0].message.createAt);
  // console.log(data[0].message.createAt);
  // console.log(date.getDate(), date.getMonth() + 1, date.getFullYear());

  // console.log(formatTimeAgo(data[0].message.createAt));
  return (
    <div className="flex-1 overflow-y-auto">
      {data.map((conversation) => (
        <Link
          href={ROUTE.CONVERSATION(conversation.id.toString())}
          className="w-full border-b transition text-left"
        >
          <div className="flex items-center p-4 hover:bg-gray-100 gap-3">
            <div className="relative">
              <AppImage
                src={conversation.user.avatar}
                classNameContainer="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl shrink-0"
                className="rounded-full"
                alt={conversation.user.userName}
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
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
              <p className="text-sm text-muted-foreground truncate">
                {conversation.message.message}
              </p>
            </div>
            {/* {user.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold flex-shrink-0">
                {user.unread}
              </div>
            )} */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
