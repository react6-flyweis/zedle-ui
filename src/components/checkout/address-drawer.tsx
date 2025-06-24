"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Home, MapPin, MapPinIcon } from "lucide-react";
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

const addressFormSchema = z.object({
  address: z.string().min(1, "Address is required"),
  doorNumber: z.string().min(1, "Door/Flat number is required"),
  area: z.string().min(1, "Area is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
  type: z.enum(["home", "work", "other"]),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

interface AddressDrawerProps {
  children: React.ReactNode;
  onSubmit?: (data: AddressFormValues) => void;
}

export function AddressDrawer({ children, onSubmit }: AddressDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address: "",
      doorNumber: "",
      area: "",
      zipCode: "",
      type: "home",
    },
  });

  const handleSubmit = (data: AddressFormValues) => {
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
              <div className="relative h-64 bg-gray-100 overflow-hidden mb-4">
                {/* Simulated Google Maps */}
                <div className="absolute inset-0">
                  {/* Map background with streets pattern */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 relative">
                    {/* Street lines */}
                    <div className="absolute inset-0">
                      {/* Horizontal streets */}
                      <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white opacity-60"></div>
                      <div className="absolute top-2/4 left-0 right-0 h-0.5 bg-white opacity-60"></div>
                      <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-white opacity-60"></div>
                      {/* Vertical streets */}
                      <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-white opacity-60"></div>
                      <div className="absolute left-2/4 top-0 bottom-0 w-0.5 bg-white opacity-60"></div>
                      <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-white opacity-60"></div>
                    </div>

                    {/* Location pin */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <MapPinIcon className="h-10 w-10 text-red-500 drop-shadow-lg" />
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full opacity-30"></div>
                      </div>
                    </div>

                    {/* Some colored areas to simulate map regions */}
                    <div className="absolute top-1/3 left-1/4 w-16 h-12 bg-green-200 opacity-40 rounded"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-20 h-16 bg-blue-200 opacity-40 rounded"></div>
                    <div className="absolute top-1/6 right-1/4 w-12 h-8 bg-yellow-200 opacity-40 rounded"></div>
                  </div>
                </div>
              </div>

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

            {/* Form Section */}
            <div className="flex-1 border border-gray-500">
              <FormField
                control={form.control}
                name="doorNumber"
                render={({ field }) => (
                  <FormItem className=" border-gray-500">
                    <FormLabel className="text-sm font-medium text-gray-700 px-2">
                      Door / Flat No.
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter here..."
                        className="rounded-none border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className=" border-y border-gray-500">
                    <FormLabel className="text-sm font-medium text-gray-700 px-2">
                      Area
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter here..."
                        className="rounded-none border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className=" border-gray-500">
                    <FormLabel className="text-sm font-medium text-gray-700 px-2">
                      Zip Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter here..."
                        className="rounded-none border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Type Selection */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="h-12 grid grid-cols-3 border-t border-gray-500 gap-0">
                    <Button
                      type="button"
                      variant={field.value === "home" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => field.onChange("home")}
                      className="h-full rounded-none"
                    >
                      <Home className="h-4 w-4" />
                      Home
                    </Button>
                    <Button
                      type="button"
                      variant={field.value === "work" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => field.onChange("work")}
                      className="h-full rounded-none border-x"
                    >
                      <Briefcase className="h-4 w-4" />
                      Work
                    </Button>
                    <Button
                      type="button"
                      variant={field.value === "other" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => field.onChange("other")}
                      className="h-full rounded-none"
                    >
                      <MapPin className="h-4 w-4" />
                      Other
                    </Button>
                  </FormItem>
                )}
              />
            </div>

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
