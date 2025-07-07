"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  RulerIcon,
  WeightIcon,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const packageDetailsSchema = z.object({
  pickupPoint: z.string().min(1),
  dropPoint: z.string().min(1),
  description: z.string().min(1),
  dimensions1: z.string().min(1),
  dimensions2: z.string().min(1),
  weight: z.string().min(1),
  pickupDate: z.string().min(1),
  pickupTime: z.string().min(1),
});

type PackageDetailsFormValues = z.infer<typeof packageDetailsSchema>;

export function PackageDetailsForm() {
  const t = useTranslations("packageForm");
  const form = useForm<PackageDetailsFormValues>({
    resolver: zodResolver(packageDetailsSchema),
    defaultValues: {
      pickupPoint: "1901 Thornridge Cir. Shiloh, Hawaii",
      dropPoint: "2464 Royal Ln. Mesa, New Jersey",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
      dimensions1: "60 : 96 CM",
      dimensions2: "60 : 96 CM",
      weight: "80 : 20 KG",
      pickupDate: "22 / 12 / 2024",
      pickupTime: "04 : 30 PM",
    },
  });

  function onSubmit(data: PackageDetailsFormValues) {
    // handle submit
    // eslint-disable-next-line no-console
    console.log(data);
  }

  return (
    <div>
      {/* User Info Section */}
      <div className="flex items-center gap-4 bg-muted p-4 rounded-t-lg mb-6">
        <Avatar className="size-20 border border-zinc-300">
          <AvatarImage
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=128&q=80"
            alt="User profile"
          />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-xl font-semibold text-zinc-900">
            Chance Septimus
          </div>
          <div className="flex items-center gap-2 text-zinc-700 text-sm mt-1">
            <MailIcon className="h-4 w-4" aria-label="Email" />
            <span>Email: chanceseptimus@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-700 text-sm mt-1">
            <PhoneIcon className="h-4 w-4" aria-label="Phone" />
            <span>Phone: +19876543210</span>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Pickup Point */}
          <FormField
            control={form.control}
            name="pickupPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-zinc-400">
                  {t("pickupPoint")}
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-background rounded h-14" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Drop Point */}
          <FormField
            control={form.control}
            name="dropPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-zinc-400">
                  {t("dropPoint")}
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-background rounded h-14" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-zinc-400">
                  {t("description")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="bg-background rounded min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Photos / videos & Dimensions */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormLabel className="text-lg text-zinc-400">
                {t("photosVideos")}
              </FormLabel>
              <div className="flex gap-2 mt-2">
                <Image
                  src="https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=400&q=80"
                  alt="Goods 1"
                  width={120}
                  height={80}
                  className="rounded object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80"
                  alt="Goods 2"
                  width={120}
                  height={80}
                  className="rounded object-cover"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <FormLabel className="text-lg text-zinc-400">
                {t("dimensionsOfGoods")}
              </FormLabel>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="dimensions1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            className="bg-background rounded h-14 pr-10"
                          />
                          <RulerIcon className="absolute right-2 top-2.5 h-5 w-5 text-zinc-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dimensions2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            className="bg-background rounded h-14 pr-10"
                          />
                          <RulerIcon className="absolute right-2 top-2.5 h-5 w-5 text-zinc-400 rotate-90" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          {/* Weight */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-zinc-400">
                  {t("weight")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className="bg-background rounded h-14 pr-10"
                    />
                    <WeightIcon className="absolute right-2 top-2.5 h-5 w-5 text-zinc-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Pick Up date & time */}
          <div className="flex flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg text-zinc-400">
                    {t("pickupDate")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="bg-background rounded h-14 pr-10"
                      />
                      <CalendarIcon className="absolute right-2 top-2.5 h-5 w-5 text-zinc-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg text-zinc-400">
                    {t("pickupTime")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="bg-background rounded h-14 pr-10"
                      />
                      <ClockIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pickup Point */}
          <FormField
            control={form.control}
            name="pickupPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-zinc-400">
                  {t("pickupPoint")}
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-background rounded h-14" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Drop Point */}
          <FormField
            control={form.control}
            name="dropPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-zinc-400">
                  {t("dropPoint")}
                </FormLabel>
                <FormControl>
                  <Input {...field} className="bg-background rounded h-14" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-zinc-400">
                  {t("description")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="bg-background rounded min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Photos / videos & Dimensions */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormLabel className="text-lg text-zinc-400">
                {t("photosVideos")}
              </FormLabel>
              <div className="flex gap-2 mt-2">
                <Image
                  src="https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=400&q=80"
                  alt="Goods 1"
                  width={120}
                  height={80}
                  className="rounded object-cover"
                />
                <Image
                  src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80"
                  alt="Goods 2"
                  width={120}
                  height={80}
                  className="rounded object-cover"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <FormLabel className="text-lg text-zinc-400">
                {t("dimensionsOfGoods")}
              </FormLabel>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="dimensions1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            className="bg-background rounded h-14 pr-10"
                          />
                          <RulerIcon className="absolute right-2 top-2.5 h-5 w-5 text-zinc-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dimensions2"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            className="bg-background rounded h-14 pr-10"
                          />
                          <RulerIcon className="absolute right-2 top-2.5 h-5 w-5 text-zinc-400 rotate-90" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          {/* Weight */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-zinc-400">
                  {t("weight")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className="bg-background rounded h-14 pr-10"
                    />
                    <WeightIcon className="absolute right-2 top-2.5 h-5 w-5 text-zinc-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Pick Up date & time */}
          <div className="flex flex-col md:flex-row gap-2">
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg text-zinc-400">
                    {t("pickupDate")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className="bg-background rounded h-14 pr-10"
                      />
                      <CalendarIcon className="absolute right-2 top-2.5 h-5 w-5 text-zinc-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg text-zinc-400">
                    {t("pickupTime")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} className="bg-white text-black pr-10" />
                      <ClockIcon className="absolute right-2 top-2.5 h-5 w-5 text-zinc-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className=" px-8 py-3 rounded-lg text-lg font-semibold"
            >
              {t("makeAQuote")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
