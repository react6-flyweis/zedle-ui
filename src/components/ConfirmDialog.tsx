"use client";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  title: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function ConfirmDialog({
  title,
  onConfirm,
  children,
  confirmLabel,
  cancelLabel,
}: PropsWithChildren<ConfirmDialogProps>) {
  const t = useTranslations("common");
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm rounded-2xl p-6">
        <DialogHeader className="flex flex-row justify-between items-center mb-2">
          <div />
          <DialogClose asChild>
            <button
              type="button"
              className="text-2xl text-foreground/80 hover:text-foreground absolute right-4 top-4"
            >
              <X size={24} />
            </button>
          </DialogClose>
        </DialogHeader>
        <DialogTitle className="text-center text-xl font-semibold mb-6">
          {title}
        </DialogTitle>
        <DialogFooter className="flex flex-row gap-4 justify-center">
          <Button
            className="flex-1 h-12 rounded-full bg-foreground text-background font-bold text-base"
            onClick={onConfirm}
          >
            {confirmLabel || t("yes")}
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-full border-2 border-foreground text-foreground font-bold text-base bg-background"
            >
              {cancelLabel || t("no")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
