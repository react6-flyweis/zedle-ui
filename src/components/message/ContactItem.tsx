import { CheckCheck, MoreVertical } from "lucide-react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Contact } from "./ContactList";

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactItem = ({ contact, isSelected, onClick }: ContactItemProps) => {
  const t = useTranslations("messages");

  const formatTime = (time: string) => {
    if (time === "Yesterday") return t("yesterday");
    if (time === "Today") return t("today");
    return time;
  };

  return (
    <Card
      className={`p-0 w-full cursor-pointer hover:bg-primary/5 border-0 shadow-none rounded transition-colors ${
        isSelected ? "bg-primary/5 border border-primary/10" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center px-3 py-2 gap-3 w-full">
        <div className="relative flex-shrink-0">
          {/* Avatar */}
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={contact.avatar}
              alt={contact.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <AvatarFallback className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              {contact.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {contact.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col min-w-0 w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate text-base w-full flex items-center gap-2">
                {contact.name}
                {/* Optionally, you can add a status icon here */}
              </h3>
              <div className="flex items-center gap-2 w-full">
                <p
                  className={`text-xs truncate mt-1 w-full ${
                    contact.isTyping
                      ? "text-green-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {contact.isTyping ? t("typing") : contact.lastMessage}
                </p>
                {/* Read option icon */}
                {contact.isRead && (
                  <CheckCheck className="text-green-500 w-4 h-4" />
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col items-end ml-2 flex-shrink-0">
                <span className="text-xs text-gray-500 mb-1">
                  {formatTime(contact.time)}
                </span>
                {contact.unreadCount > 0 && (
                  <Badge
                    variant="default"
                    className="bg-red-500 text-white rounded-full min-w-[18px] h-[18px] text-xs flex items-center justify-center p-0"
                  >
                    {contact.unreadCount}
                  </Badge>
                )}
              </div>
              {/* Three dot button */}
              <button
                type="button"
                className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label={t("moreOptions")}
              >
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactItem;
