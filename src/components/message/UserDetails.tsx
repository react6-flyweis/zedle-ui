import { useTranslations } from "next-intl";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Contact } from "./ContactList";

interface UserDetailsProps {
  contact: Contact;
}

const UserDetails = ({ contact }: UserDetailsProps) => {
  const t = useTranslations("messages");

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 rounded m-1 flex-shrink-0">
      <div className="h-full flex flex-col items-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <div
            className="w-full h-full rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${contact.avatar})` }}
          />
        </Avatar>
        <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
        <p className="text-sm text-gray-500 mb-4">
          {contact.isOnline ? t("online") : t("offline")}
        </p>

        <div className="space-y-4 flex-1">
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              User Details
            </h4>
            <div className="space-y-2">
              <div className="flex gap-1">
                <span className="text-xs text-gray-500">Phone No:</span>
                <p className="text-sm text-gray-900 break-all">
                  {contact.phone}
                </p>
              </div>
              <div className="flex gap-1">
                <span className="text-xs text-gray-500">Email ID:</span>
                <p className="text-sm text-gray-900 break-all">
                  {contact.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-destructive text-destructive"
        >
          {t("block")}
        </Button>
      </div>
    </div>
  );
};

export default UserDetails;
