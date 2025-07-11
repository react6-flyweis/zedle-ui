import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  type: "text" | "image" | "file";
}

interface MessageBubbleProps {
  message: Message;
  isFromUser: boolean;
  showAvatar?: boolean;
}

const MessageBubble = ({
  message,
  isFromUser,
  showAvatar,
}: MessageBubbleProps) => {
  return (
    <div
      className={`flex flex-col items-end ${isFromUser ? "justify-end" : "justify-start"}`}
    >
      {showAvatar && (
        <span
          className={cn(
            "text-xs text-gray-500",
            isFromUser ? " self-end mr-12" : "self-start ml-12",
          )}
        >
          {message.timestamp}
        </span>
      )}

      {/* Message bubble */}
      <div className={`flex ${isFromUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar with fallback */}

        <Avatar
          className={cn(
            "size-9 -mt-5",
            isFromUser ? "ml-2" : "mr-2",
            showAvatar ? "" : "invisible",
          )}
        >
          <AvatarImage src={message.avatar} alt={message.senderId} />
          <AvatarFallback>
            {message.senderName ? message.senderName[0] : "U"}
          </AvatarFallback>
        </Avatar>

        <div
          className={cn("max-w-xs lg:max-w-md px-4 py-2 rounded-xl", {
            "bg-primary text-white": isFromUser,
            "bg-gray-100 text-gray-900": !isFromUser,
            "rounded-tl-none": showAvatar && !isFromUser,
            "rounded-tr-none": showAvatar && isFromUser,
          })}
        >
          <p className="text-sm break-words">{message.content}</p>
          <div
            className={`flex items-center justify-end space-x-1 mt-1 ${
              isFromUser ? "text-purple-200" : "text-gray-500"
            }`}
          >
            {/* {isFromUser && (
              <div className="flex">
                {message.status === "sent" && <Check className="w-3 h-3" />}
                {message.status === "delivered" && (
                  <CheckCheck className="w-3 h-3" />
                )}
                {message.status === "read" && (
                  <CheckCheck className="w-3 h-3 text-blue-400" />
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
