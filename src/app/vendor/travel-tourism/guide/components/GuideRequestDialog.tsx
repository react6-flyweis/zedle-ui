"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MakeAQuoteDialog } from "@/components/MakeAQuoteDialog";
import { RequestRescheduleDialog } from "@/components/RequestRescheduleDialog";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/store/toastStore";
import type { IGuideRequest } from "./GuideRequestCard";

export interface GuideRequestDialogProps {
  request: IGuideRequest;
  children: React.ReactNode;
}

export function GuideRequestDialog({
  request,
  children,
}: GuideRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const { name, email, phone, imageUrl, needHelpIn, date, time, requestId } =
    request;
  const t = useTranslations("requestDialog");

  const formSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    needHelpIn: z.string(),
    date: z.string(),
    time: z.string(),
    requestId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      email,
      phone,
      needHelpIn,
      date,
      time,
      requestId,
    },
    mode: "onChange",
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    // TODO: handle submit logic (API call, state update, etc.)
    toast(
      "You Successfully Accept The Request.You Successfully Accept The Request.",
    );
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="">
            <DialogTitle className="text-center">
              {t("serviceRequestTitle")}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              className=""
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="font-bold text-base mb-4 text-black">
                {t("customerDetails")}
              </div>
              <div className="flex gap-8 items-start">
                <div className="relative size-56 rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0 border border-gray-300">
                  <Image
                    src={imageUrl}
                    alt={name}
                    className="object-cover h-full w-full"
                    height={400}
                    width={400}
                    priority
                  />
                </div>
                <div className="space-y-3 flex-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-black">
                          {t("name")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-accent w-full"
                            {...field}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-black">
                          {t("email")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-accent w-full"
                            {...field}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-black">
                          {t("phone")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-accent w-full"
                            {...field}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="mt-5">
                <div className="font-bold text-base mb-4 text-black">
                  {t("serviceDetails")}
                </div>

                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="needHelpIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-black">
                          {t("needHelpIn")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-accent w-full"
                            {...field}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-black">
                          {t("date")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-accent w-full"
                            {...field}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-black">
                          {t("time")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-accent w-full"
                            {...field}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="requestId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-black">
                          {t("requestId")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="bg-accent w-full"
                            {...field}
                            readOnly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-gray-200 text-black font-semibold hover:bg-gray-300"
                  onClick={() => {
                    setOpen(false);
                    setRescheduleDialogOpen(true);
                  }}
                >
                  {t("requestReschedule")}
                </Button>
                <Button
                  type="button"
                  className="flex-1 bg-black text-white font-semibold rounded-full"
                  onClick={() => {
                    setOpen(false);
                    setQuoteDialogOpen(true);
                  }}
                >
                  {t("makeAQuote")}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <RequestRescheduleDialog
        open={rescheduleDialogOpen}
        onOpenChange={setRescheduleDialogOpen}
      />
      <MakeAQuoteDialog
        open={quoteDialogOpen}
        onOpenChange={setQuoteDialogOpen}
      />
    </>
  );
}
