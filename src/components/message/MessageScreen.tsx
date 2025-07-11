"use client";

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ContactList, { type Contact } from "./ContactList";
import EmptyState from "./EmptyState";
import MessageArea from "./MessageArea";
import type { Message } from "./MessageBubble";
import MessageInput from "./MessageInput";
import UserDetails from "./UserDetails";

export const MessageScreen = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Chance Septimus",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      lastMessage:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      time: "10:12 AM",
      unreadCount: 2,
      isOnline: true,
      phone: "+1 987654-2210",
      email: "example@gmail.com",
      isTyping: false,
      isRead: false,
    },
    {
      id: "2",
      name: "Design Team",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3847ae2e4ae0?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Lorem Ipsum is simply dummy 😊",
      time: "9:36 AM",
      unreadCount: 0,
      isOnline: false,
      phone: "+1 987654-2211",
      email: "design@example.com",
      isTyping: true,
      isRead: true,
    },
    {
      id: "3",
      name: "Killian James",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      lastMessage: "xyz",
      time: "Yesterday",
      unreadCount: 1,
      isOnline: true,
      phone: "+1 987654-2212",
      email: "killian@example.com",
      isTyping: false,
      isRead: false,
    },
    {
      id: "4",
      name: "Claudia Maudi",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b167?w=100&h=100&fit=crop&crop=face",
      lastMessage: "lorem",
      time: "4:32 PM",
      unreadCount: 0,
      isOnline: false,
      phone: "+1 987654-2213",
      email: "claudia@example.com",
      isTyping: false,
      isRead: true,
    },
    {
      id: "5",
      name: "Novita",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      lastMessage: "yes, use design",
      time: "Yesterday",
      unreadCount: 1,
      isOnline: true,
      phone: "+1 987654-2214",
      email: "novita@example.com",
      isTyping: false,
      isRead: false,
    },
    {
      id: "6",
      name: "Millie Rose",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Lorem",
      time: "Yesterday",
      unreadCount: 1,
      isOnline: false,
      phone: "+1 987654-2215",
      email: "millie@example.com",
      isTyping: false,
      isRead: false,
    },
    {
      id: "7",
      name: "Ikhwan SO",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      lastMessage: "Woala message",
      time: "Yesterday",
      unreadCount: 0,
      isOnline: true,
      phone: "+1 987654-2216",
      email: "ikhwan@example.com",
      isTyping: false,
      isRead: true,
    },
    {
      id: "8",
      name: "Aditya",
      avatar:
        "https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=100&h=100&fit=crop&crop=face",
      lastMessage: "online now",
      time: "Yesterday",
      unreadCount: 0,
      isOnline: false,
      phone: "+1 987654-2217",
      email: "aditya@example.com",
      isTyping: false,
      isRead: true,
    },
  ];

  const messages: Message[] = selectedContact
    ? [
        {
          id: "1",
          senderId: selectedContact.id,
          content: "Lorem Ipsum is simply dummy text",
          timestamp: "10:12 AM",
          status: "read",
          type: "text",
          avatar: selectedContact.avatar,
          senderName: selectedContact.name,
        },
        {
          id: "2",
          senderId: selectedContact.id,
          content: "Lorem Ipsum is simply dummy 😊",
          timestamp: "10:12 AM",
          status: "read",
          type: "text",
          avatar: selectedContact.avatar,
          senderName: selectedContact.name,
        },
        {
          id: "3",
          senderId: selectedContact.id,
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          timestamp: "10:50 AM",
          status: "read",
          type: "text",
          avatar: selectedContact.avatar,
          senderName: selectedContact.name,
        },
        {
          id: "4",
          senderId: selectedContact.id,
          content: "Lorem Ipsum is simply dummy text of",
          timestamp: "10:50 AM",
          status: "read",
          type: "text",
          avatar: selectedContact.avatar,
          senderName: selectedContact.name,
        },
        {
          id: "5",
          senderId: "me",
          content: "Great! 😊 There's a nice design idea. 😊",
          timestamp: "10:50 AM",
          status: "read",
          type: "text",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          senderName: "You",
        },
      ]
    : [];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSendMessage = (message: string) => {
    // Add message logic here
    console.log("Sending message:", message);
  };

  return (
    <div className="flex h-full w-full">
      {/* Contact List */}
      <ContactList
        contacts={filteredContacts}
        selectedContact={selectedContact}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onContactSelect={setSelectedContact}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedContact ? (
          <>
            <ChatHeader contact={selectedContact} />
            <MessageArea messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* User Details */}
      {selectedContact && <UserDetails contact={selectedContact} />}
    </div>
  );
};
