import { useTranslations } from "next-intl";
import { Avatar } from "@/components/ui/avatar";
// import { Phone, MoreVertical } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import type { Contact } from "./ContactList";

interface ChatHeaderProps {
  contact: Contact;
}

const ChatHeader = ({ contact }: ChatHeaderProps) => {
  const t = useTranslations("messages");

  return (
    <div className="p-2 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="w-10 h-10">
            <div
              className="w-full h-full rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${contact.avatar})` }}
            />
          </Avatar>
          {contact.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">{contact.name}</h2>
          <p className="text-sm text-gray-500">
            {contact.isOnline ? t("online") : t("offline")}
          </p>
        </div>
      </div>

      {/* <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Phone className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t("viewProfile")}</DropdownMenuItem>
            <DropdownMenuItem>{t("muteNotifications")}</DropdownMenuItem>
            <DropdownMenuItem>{t("clearChat")}</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              {t("block")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </div>
  );
};

export default ChatHeader;
