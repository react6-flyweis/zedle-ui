import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble, { type Message } from "./MessageBubble";

interface MessageAreaProps {
  messages: Message[];
}

import { groupBy } from "lodash-es";

const MessageArea = ({ messages }: MessageAreaProps) => {
  const t = useTranslations("messages");

  // Group messages by date
  const groupedMessages = groupBy(messages, "timestamp");
  const sortedDates = Object.keys(groupedMessages).sort();

  return (
    <div className="flex-1 min-h-0 bg-gray-50">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-8">
          {sortedDates.map((date) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center gap-2 my-2">
                <div className="flex-1 border-t border-gray-300" />
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {date === "2025-03-24" ? t("today") : date}
                </span>
                <div className="flex-1 border-t border-gray-300" />
              </div>
              {groupedMessages[date].map((message, idx, arr) => {
                const prev = arr[idx - 1];
                const showAvatar =
                  idx === 0 ||
                  message.senderId !== prev?.senderId ||
                  message.timestamp !== prev?.timestamp;
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2 ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <MessageBubble
                      message={{
                        ...message,
                        avatar: message.avatar,
                        timestamp: message.timestamp,
                      }}
                      isFromUser={message.senderId === "me"}
                      showAvatar={showAvatar}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageArea;
