"use client";

import { formatGetTime } from "@/lib/formatDate/formatGetTIme";
import { cn } from "@/lib/utils";
import { IMessage } from "@/types/interaface/message.interface";
import { IUser } from "@/types/interaface/user.interface";

const StatusMessage = ({
  messageUserSend,
  text,
}: {
  messageUserSend: boolean;
  text: string;
}) => {
  return (
    <p
      className={cn(
        "text-xs text-muted-foreground",
        messageUserSend ? "text-end" : "hidden",
      )}
    >
      {text}
    </p>
  );
};

interface Props {
  messages: IMessage[];
  user: IUser;
}

const ChatArea: React.FC<Props> = ({ messages, user }) => {
  if (messages === undefined || messages.length === 0)
    return <div className="flex-1" />;

  const lastMessage = messages[messages.length - 1];
  const messageUserSend = lastMessage.userSend === user.id;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((item) => (
        <div
          key={item.id}
          className={`flex ${item.userSend === user.id ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-2xl ${
              item.userSend === user.id
                ? "bg-primary text-primary-foreground rounded-br-none"
                : "bg-secondary text-foreground rounded-bl-none"
            }`}
          >
            <p className="text-sm">{item.message}</p>
            <span
              className={`text-xs mt-1 block ${
                item.userSend === user.id
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              }`}
            >
              {formatGetTime(item.createAt)}
            </span>
          </div>
        </div>
      ))}

      {lastMessage.status === "SENT" &&
        StatusMessage({ messageUserSend, text: "Đã gửi" })}
      {lastMessage.status === "SEEN" &&
        StatusMessage({ messageUserSend, text: "Đã xem" })}
    </div>
  );
};

export default ChatArea;
