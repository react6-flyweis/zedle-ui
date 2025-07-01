"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MapInput } from "./map/MapInput";
import { WeekDatePicker } from "./WeekDatePicker";

const dateFormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  address: z.string().min(1, "Address is required"),
  coordinates: z.object({
    latitude: z
      .number()
      .min(-90, "Invalid latitude")
      .max(90, "Invalid latitude"),
    longitude: z
      .number()
      .min(-180, "Invalid longitude")
      .max(180, "Invalid longitude"),
  }),
});

type DateFormValues = z.infer<typeof dateFormSchema>;

interface AddressDrawerProps {
  children: React.ReactNode;
  onSubmit?: (data: DateFormValues) => void;
}

export function SelectDateDrawer({ children, onSubmit }: AddressDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<DateFormValues>({
    resolver: zodResolver(dateFormSchema),
    defaultValues: {
      coordinates: {
        latitude: 51.505,
        longitude: -0.09,
      },
    },
  });

  const handleSubmit = (data: DateFormValues) => {
    console.log("Saving address:", data);
    if (onSubmit) {
      onSubmit(data);
    }
    // Reset form and close sheet after successful submission
    form.reset();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="w-full max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Save delivery address</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col h-full px-4 space-y-6"
          >
            <div className="border border-gray-500">
              {/* Map Section */}

              <FormField
                control={form.control}
                name="coordinates"
                render={({ field }) => (
                  <FormItem className="h-56">
                    <MapInput {...field} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 px-2">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Address here..."
                        className="rounded-none border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date Select Section */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Select Date</FormLabel>
                  <FormControl>
                    <WeekDatePicker {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* <div className="">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Select Date</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center border border-gray-200 rounded-lg p-4">
                        {/* Calendar UI */}
            {/* <div className="w-full max-w-xs">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-semibold text-foreground">
                              22 October
                            </span>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 p-0"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <title>Previous month</title>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                  />
                                </svg>
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 p-0"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <title>Next month</title>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
                            <span className="font-medium">S</span>
                            <span className="font-medium">M</span>
                            <span className="font-medium">T</span>
                            <span className="font-medium">W</span>
                            <span className="font-medium">T</span>
                            <span className="font-medium">F</span>
                            <span className="font-medium">S</span>
                          </div>
                          <div className="grid grid-cols-7 gap-1 mt-1">
                            {/* Days, hardcoded for visual match */}
            {/* <span className="text-muted-foreground">18</span>
                            <span className="text-muted-foreground">19</span>
                            <span className="text-muted-foreground">20</span>
                            <span className="text-muted-foreground">21</span>
                            <Button
                              type="button"
                              variant="ghost"
                              className="rounded-lg bg-primary text-primary-foreground font-bold h-8 w-8 p-0 mx-auto"
                            >
                              22
                            </Button>
                            <span className="text-muted-foreground">23</span>
                            <span className="text-muted-foreground">24</span>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>   */}

            {/* Save Button */}
            <div className="mt-4 flex justify-center py-5">
              <Button type="submit" className="rounded-none h-12">
                SAVE ADDRESS & PROCEED
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
