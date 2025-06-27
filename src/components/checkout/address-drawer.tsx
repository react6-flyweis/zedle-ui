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
import { MapInput } from "../MapInput";

const addressFormSchema = z.object({
  address: z.string().min(1, "Address is required"),
  doorNumber: z.string().min(1, "Door/Flat number is required"),
  area: z.string().min(1, "Area is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
  type: z.enum(["home", "work", "other"]),
  location: z.object({
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
      location: {
        latitude: 0,
        longitude: 0,
      },
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

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="h-56">
                    <FormControl>
                      <MapInput {...field} />
                    </FormControl>
                    <FormMessage />
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
