"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/store/toastStore";

interface CancellationDialogCardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CancellationDialogCard: React.FC<CancellationDialogCardProps> = ({
  open,
  setOpen,
}) => {
  const t = useTranslations("cancel");

  const cancelSchema = z.object({
    reason: z.string().min(1, t("reasonRequired")),
    description: z.string().optional(),
  });
  type CancelFormValues = z.infer<typeof cancelSchema>;
  const cancelForm = useForm<CancelFormValues>({
    resolver: zodResolver(cancelSchema),
    defaultValues: { reason: "", description: "" },
  });

  // Reasons from screenshot
  const cancelReasons = [
    { key: "reasonTraffic", label: t("reasonTraffic") },
    { key: "reasonWeather", label: t("reasonWeather") },
    { key: "reasonEmergency", label: t("reasonEmergency") },
    { key: "reasonBreakdown", label: t("reasonBreakdown") },
    { key: "reasonAccident", label: t("reasonAccident") },
    { key: "reasonRestaurant", label: t("reasonRestaurant") },
    { key: "reasonOther", label: t("reasonOther") },
  ];

  const handleCancelSubmit = (_data: CancelFormValues) => {
    setOpen(false);
    cancelForm.reset();
    toast(t("successMessage"));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-xl p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-lg font-semibold">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 pb-6">
          <Form {...cancelForm}>
            <form
              onSubmit={cancelForm.handleSubmit(handleCancelSubmit)}
              className="space-y-4"
            >
              <FormField
                control={cancelForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      {t("reasonLabel")}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        required
                      >
                        <SelectTrigger className="w-full bg-muted">
                          <SelectValue placeholder={t("reasonPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {cancelReasons.map((reason) => (
                            <SelectItem key={reason.key} value={reason.key}>
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={cancelForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      {t("describeLabel")}
                      <span className="text-xs text-muted-foreground ml-1">
                        {t("optional")}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("describePlaceholder")}
                        className="bg-muted"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-primary text-white rounded-full py-2 text-base font-semibold"
                >
                  {t("submit")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
