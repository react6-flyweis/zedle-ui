"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface SendMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendMessageDialog({
  open,
  onOpenChange,
}: SendMessageDialogProps) {
  const t = useTranslations("sendMessage");
  const messageSchema = z.object({
    message: z.string().min(1, t("messageRequired")),
  });
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: { message: "" },
  });

  const onSubmit = () => {
    // handle send message (mock)
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-0">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-semibold mb-1">
              {t("title")}
            </DialogTitle>
            <DialogDescription className="text-gray-700 text-sm">
              {t("description")}
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-0">
            <Textarea
              {...form.register("message")}
              placeholder={t("messagePlaceholder")}
              className="w-full min-h-[120px] rounded-lg border border-gray-200 bg-gray-100 p-3 text-base resize-none"
            />
            {form.formState.errors.message && (
              <div className="text-sm text-red-500 mt-1">
                {form.formState.errors.message.message}
              </div>
            )}
          </div>
          <DialogFooter className="sm:flex-col gap-2 px-6 pt-4 pb-6">
            <div className="w-full">
              <Button
                type="submit"
                className="w-full font-semibold text-lg rounded-full"
              >
                {t("send")}
              </Button>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs font-medium">
                {t("or")}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <Button
              type="button"
              className="rounded-full"
              onClick={() => {
                /* mock call action */
              }}
            >
              {t("call")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
