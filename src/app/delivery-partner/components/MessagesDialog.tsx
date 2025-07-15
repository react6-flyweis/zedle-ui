"use client";

import { ArrowLeftIcon, Mic, PaperclipIcon, Play, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { type PropsWithChildren, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function MessagesDialog({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(true);
  const t = useTranslations("messages");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-3xl w-full bg-background rounded-xl p-6"
        showCloseButton={false}
      >
        <DialogHeader className="flex-row items-center justify-between">
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black size-7"
            >
              <ArrowLeftIcon size={20} className="text-white" />
            </Button>
          </DialogClose>
          <DialogTitle className="text-center text-lg font-semibold">
            {t("title")}
          </DialogTitle>
          <div className=""></div>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          {/* Message 1 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              {/* Empty avatar circle as per image */}
            </div>
            <div>
              <div className="bg-[#8e186b] text-white rounded-xl px-6 py-3 max-w-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </div>
              <div className="text-xs text-right text-[#8e186b] mt-1">
                01:15 PM
              </div>
            </div>
          </div>
          {/* Voice Message */}
          <div className="self-end flex items-center gap-3">
            <div className="w-10"></div>
            <div className="flex flex-col">
              <div className="bg-[#8e186b] rounded-xl px-6 py-3 flex items-center gap-4 min-w-[300px]">
                {/* Voice waveform mock */}
                <div className="flex items-center gap-1">
                  <div className="w-1 h-6 bg-white rounded"></div>
                  <div className="w-1 h-4 bg-white rounded"></div>
                  <div className="w-1 h-8 bg-white rounded"></div>
                  <div className="w-1 h-5 bg-white rounded"></div>
                  <div className="w-1 h-7 bg-white rounded"></div>
                  <div className="w-1 h-3 bg-white rounded"></div>
                  <div className="w-1 h-6 bg-white rounded"></div>
                  <div className="w-1 h-4 bg-white rounded"></div>
                  <div className="w-1 h-8 bg-white rounded"></div>
                  <div className="w-1 h-5 bg-white rounded"></div>
                  <div className="w-1 h-7 bg-white rounded"></div>
                  <div className="w-1 h-3 bg-white rounded"></div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  aria-label={t("playVoice")}
                >
                  <Play size={28} />
                </Button>
              </div>
              <div className="text-xs text-right text-[#8e186b] mt-1">
                01:18 PM
              </div>
              <div className="text-xs text-[#8e186b]">
                Quiche has been listening your voice
              </div>
            </div>
          </div>
          {/* Message 2 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              {/* Empty avatar circle as per image */}
            </div>
            <div>
              <div className="bg-[#8e186b] text-white rounded-xl px-6 py-3 max-w-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </div>
              <div className="text-xs text-right text-[#8e186b] mt-1">
                01:20 PM
              </div>
            </div>
          </div>
        </div>
        {/* Input Bar */}
        <div className="flex items-center gap-2 bg-black rounded-full py-1 px-4 mt-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground"
            aria-label={t("attachImage")}
          >
            <PaperclipIcon size={25} className="size-6" />
          </Button>
          <Input
            className="flex-1 bg-transparent text-primary-foreground border-none focus:ring-0"
            placeholder={t("typeMessage")}
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground"
            aria-label={t("recordVoice")}
          >
            <Mic size={25} className="size-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground"
            aria-label={t("sendMessage")}
          >
            <Send size={25} className="size-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
