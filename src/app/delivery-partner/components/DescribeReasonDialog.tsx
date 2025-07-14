import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { type PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/store/toastStore";

interface DescribeReasonDialogProps {
  selectedIssue: string;
  onClose?: () => void;
}

export const DescribeReasonDialog = ({
  selectedIssue,
  children,
  onClose,
}: PropsWithChildren<DescribeReasonDialogProps>) => {
  const t = useTranslations("issueDialog");
  const [open, setOpen] = useState(false);

  const reasonSchema = z.object({
    reason: z.string().min(1, t("describeReasonRequired")),
  });

  const form = useForm<z.infer<typeof reasonSchema>>({
    resolver: zodResolver(reasonSchema),
    defaultValues: { reason: "" },
  });

  const handleClose = () => {
    setOpen(false);
    onClose?.();
    form.reset();
  };

  const handleSubmit = (_values: z.infer<typeof reasonSchema>) => {
    toast("Your Issue is submitted successfully.");
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>{t("describeReasonTitle")}</DialogTitle>
        </DialogHeader>
        {/* {selectedIssue && (
          <div className="mb-2 text-base font-semibold text-primary">
            {selectedIssue}
          </div>
        )} */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("describeReasonLabel")}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="reason-textarea"
                      placeholder={t("describeReasonPlaceholder")}
                      className="h-60 bg-accent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="default"
                disabled={!form.watch("reason").trim()}
                className="w-full rounded-full"
              >
                {t("submit")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
