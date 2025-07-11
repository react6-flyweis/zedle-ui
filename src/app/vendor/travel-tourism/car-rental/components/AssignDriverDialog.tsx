"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { type PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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

const assignDriverSchema = z.object({
  driverName: z.string().min(1),
  driverPhone: z.string().min(1),
  driverLicense: z.string().min(1),
  carLicense: z.string().min(1),
});

type AssignDriverFormValues = z.infer<typeof assignDriverSchema>;

export function AssignDriverDialog({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("assignDriverDialog");
  const form = useForm<AssignDriverFormValues>({
    resolver: zodResolver(assignDriverSchema),
    defaultValues: {
      driverName: "",
      driverPhone: "",
      driverLicense: "",
      carLicense: "",
    },
  });

  function onAssign(data: AssignDriverFormValues) {
    // Handle the assignment logic here
    console.log("Assigning driver with data:", data);
    toast("assignSuccess");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl rounded-xl p-6">
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <DialogTitle className="text-center w-full text-xl font-semibold">
            {t("title")}
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onAssign)} className="space-y-4">
            <FormField
              control={form.control}
              name="driverName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("driverName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("driverNamePlaceholder")}
                      className="bg-accent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driverPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("driverPhone")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("driverPhonePlaceholder")}
                      className="bg-accent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driverLicense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("driverLicense")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("driverLicensePlaceholder")}
                      className="bg-accent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carLicense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("carLicense")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("carLicensePlaceholder")}
                      className="bg-accent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-900"
            >
              {t("assignOrder")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
