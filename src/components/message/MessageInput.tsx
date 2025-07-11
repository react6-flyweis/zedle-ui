import { Paperclip, Send, Smile } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const t = useTranslations("messages");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 flex-shrink-0">
      <div className="flex items-center space-x-2 px-4 rounded-full bg-primary">
        <Button
          variant="ghost"
          className="text-white rounded-full "
          size="icon"
        >
          <Paperclip className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <Textarea
            placeholder={t("typeMessage")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="resize-none min-h-10 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-none bg-transparent placeholder:text-white/70"
            rows={1}
            onKeyPress={handleKeyPress}
          />
        </div>
        <Button
          variant="ghost"
          className="text-white rounded-full "
          size="icon"
        >
          <Smile className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white rounded-full "
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
