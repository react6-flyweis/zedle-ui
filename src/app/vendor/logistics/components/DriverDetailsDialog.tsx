"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { PropsWithChildren } from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { IDriver } from "./DriverCard";

export interface DriverDetailsDialogProps {
  driver: IDriver;
  onAssign?: () => void;
}

import { useState } from "react";

export function DriverDetailsDialog({
  driver,
  onAssign,
  children,
}: PropsWithChildren<DriverDetailsDialogProps>) {
  const t = useTranslations("availableDrivers");
  const [open, setOpen] = useState(false);

  // Zod schema for form (all fields readonly for now)
  const schema = z.object({
    name: z.string(),
    mobile: z.string().optional(),
    email: z.string().optional(),
    id: z.string(),
    joiningDate: z.string().optional(),
    language: z.string().optional(),
    serviceZone: z.string().optional(),
    carBrand: z.string(),
    carNumber: z.string().optional(),
    carModel: z.string(),
    vehicleYear: z.string().optional(),
    vehiclePhotos: z.array(z.string()).optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: driver.name,
      mobile: driver.mobile || "",
      email: driver.email || "",
      id: driver.id,
      joiningDate: driver.joiningDate || "",
      language: driver.language || "",
      serviceZone: driver.serviceZone || "",
      carBrand: driver.carBrand,
      carNumber: driver.carNumber || "",
      carModel: driver.carModel,
      vehicleYear: driver.vehicleYear || "",
      vehiclePhotos: driver.vehiclePhotos || [],
    },
  });

  const onSubmit = (_data: z.infer<typeof schema>) => {
    setOpen(false);
    if (onAssign) {
      onAssign();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-5xl max-h-[90vh] w-full rounded-2xl p-0"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row justify-between p-5 items-center">
          <DialogClose asChild>
            <Button size="icon" className="rounded-full  p-1 size-5 bg-black">
              <ArrowLeftIcon className="text-white" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
          <DialogTitle className="text-center text-2xl font-bold mb-2">
            {driver.name} {t("details")}
          </DialogTitle>
          <div className=""></div>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[70vh] p-5">
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("driverName")}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("mobileNumber")}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emailAddress")}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("id")}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="joiningDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("joiningDate")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} readOnly className="bg-muted pr-10" />
                        <CalendarIcon className="absolute right-2 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("preferredLanguage")}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceZone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("serviceZone")}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carBrand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("carBrand")}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("carNumber")}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("carModel")}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("vehicleYear")}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly className="bg-muted" />
                    </FormControl>
                  </FormItem>
                )}
              />
              {driver.vehiclePhotos && driver.vehiclePhotos.length > 0 && (
                <FormItem className="">
                  <FormLabel>{t("vehiclePhotos")}</FormLabel>
                  <div className="gap-3 grid grid-cols-2">
                    {driver.vehiclePhotos.map((photo) => (
                      <div
                        key={photo}
                        className="relative h-40 rounded-md border border-dashed overflow-hidden"
                      >
                        <Image
                          src={photo}
                          alt="Vehicle Photo"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
              <Button className="w-full mt-6 bg-black text-white hover:bg-gray-900">
                {t("assignDriver")}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
