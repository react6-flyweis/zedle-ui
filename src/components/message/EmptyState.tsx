import { Send } from "lucide-react";
import { useTranslations } from "next-intl";

const EmptyState = () => {
  const t = useTranslations("messages");

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t("selectContact")}
        </h3>
        <p className="text-gray-500">{t("startConversation")}</p>
      </div>
    </div>
  );
};

export default EmptyState;
