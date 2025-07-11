"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactItem from "./ContactItem";

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
  phone: string;
  email: string;
  isTyping?: boolean;
  isRead?: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onContactSelect: (contact: Contact) => void;
}

const ContactList = ({
  contacts,
  selectedContact,
  searchTerm,
  onSearchChange,
  onContactSelect,
}: ContactListProps) => {
  const t = useTranslations("messages");

  return (
    <div className="w-80 border-r border-border flex flex-col max-h-full bg-background">
      {/* Header */}
      <div className="p-4 flex-shrink-0 border-b border-border bg-background">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          {t("title")}
        </h1>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-border border-0 rounded-lg"
          />
        </div>
      </div>

      {/* Contact List with Scroll */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="p-0">
            {/* All Messages Label */}
            <div className="py-2 px-4">
              <span className="text-sm font-medium text-muted-foreground">
                {t("allMessages")}
              </span>
            </div>

            {/* Contact List */}
            <div className="space-y-1 max-w-full px-2">
              {contacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  isSelected={selectedContact?.id === contact.id}
                  onClick={() => onContactSelect(contact)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ContactList;
