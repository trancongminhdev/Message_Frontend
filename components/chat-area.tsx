"use client";

import { IMessage } from "@/types/interaface/message.interface";
import { useSession } from "next-auth/react";

interface Props {
  messages: IMessage[];
}

const ChatArea: React.FC<Props> = ({ messages }) => {
  const { data } = useSession();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((item) => (
        <div
          key={item.id}
          className={`flex ${item.userSend === data?.user.id ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-2xl ${
              item.userSend === data?.user.id
                ? "bg-primary text-primary-foreground rounded-br-none"
                : "bg-secondary text-foreground rounded-bl-none"
            }`}
          >
            <p className="text-sm">{item.message}</p>
            <span
              className={`text-xs mt-1 block ${
                item.userSend === data?.user.id
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              }`}
            >
              {item.updateAt}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatArea;
