import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
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
import { Input } from "@/components/ui/input";
import { toast } from "@/store/toastStore";

const quoteSchema = z.object({
  price: z.string().min(1),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

interface SendQuoteDialogProps {
  orderDetails: {
    date: string;
    pickupPoint: string;
    dropPoint: string;
    dimension1: string;
    dimension2: string;
    paymentMethod: string;
    customer: string;
    phone: string;
    status: string;
  };
}

export function SendQuoteDialog({
  orderDetails,
  children,
}: PropsWithChildren<SendQuoteDialogProps>) {
  const t = useTranslations("sendQuoteDialog");
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { price: "" },
  });

  const onSubmit = (_quote: QuoteFormValues) => {
    // handle quote submit
    toast(t("quoteSuccess"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold">
            {orderDetails.date}
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-2">
          <div className="text-sm flex flex-col gap-1 mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success inline-block" />
              <span className="text-foreground">
                {orderDetails.pickupPoint}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success inline-block" />
              <span className="text-foreground">{orderDetails.dropPoint}</span>
            </div>
          </div>
          <div className="border border-border rounded-lg divide-y divide-border mt-4">
            <div className="grid grid-cols-2 text-xs text-muted-foreground">
              <div className="p-3">
                <div className="font-semibold uppercase text-muted-foreground">
                  {t("itemsDimensions")}
                </div>
                <div className="text-foreground mt-1">
                  {orderDetails.dimension1} : {orderDetails.dimension2} CM
                </div>
              </div>
              <div className="p-3 border-l border-border">
                <div className="font-semibold uppercase text-muted-foreground">
                  {t("paymentMethod")}
                </div>
                <div className="text-foreground mt-1">
                  {orderDetails.paymentMethod}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 text-xs text-muted-foreground">
              <div className="p-3">
                <div className="font-semibold uppercase text-muted-foreground">
                  {t("customerName")}
                </div>
                <div className="text-foreground mt-1">
                  {orderDetails.customer}
                  <br />
                  {orderDetails.phone}
                </div>
              </div>
              <div className="p-3 border-l border-border">
                <div className="font-semibold uppercase text-muted-foreground">
                  {t("shipmentStatus")}
                </div>
                <div className="text-foreground mt-1">
                  {orderDetails.status}
                </div>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
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
                        className="bg-muted h-12 text-lg"
                        type="number"
                        min="0"
                        step="0.01"
                        inputMode="decimal"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full mt-6 bg-primary text-primary-foreground text-lg font-semibold h-12 rounded-full"
              >
                {t("sendQuote")}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
