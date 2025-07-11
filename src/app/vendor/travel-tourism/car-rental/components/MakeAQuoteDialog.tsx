"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Input } from "@/components/ui/input";
import { toast } from "@/store/toastStore";

const quoteSchema = z.object({
  price: z.string().min(1),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

interface MakeAQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MakeAQuoteDialog({
  open,
  onOpenChange,
}: MakeAQuoteDialogProps) {
  const { date, time, pickupPoint, dropPoint } = {
    date: "2023-10-01",
    time: "14:00",
    pickupPoint: "76 Whitly Way, 22079",
    dropPoint: "Virginia Safari Park",
  }; // Replace with actual props or context values

  const t = useTranslations("sendQuoteDialog");
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { price: "" },
  });

  const onSubmit = (_quote: QuoteFormValues) => {
    toast(t("quoteSuccess"));
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold flex-1">
            {format(new Date(`${date}T${time}`), "dd MMM yyyy, HH:mm")}
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="text-sm flex flex-col gap-1 mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-600 inline-block" />
              <span className="text-foreground">{pickupPoint}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-600 inline-block" />
              <span className="text-foreground">{dropPoint}</span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-foreground">
                      {t("price")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("pricePlaceholder")}
                        className="bg-accent border-0 h-12 text-lg"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-3 rounded-full ">
                {t("sendQuote")}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
