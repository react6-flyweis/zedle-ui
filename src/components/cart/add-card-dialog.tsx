"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CardNumberInput,
  CardCvcInput,
  CardExpiryInput,
} from "@/components/ui/card-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

import visaIcon from "@/assets/icons/visa.png";
import mastercardIcon from "@/assets/icons/master-card.png";
import amexIcon from "@/assets/icons/amex.png";
import discoverIcon from "@/assets/icons/discover.png";

const cardFormSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .refine(
      (value) => {
        // Remove spaces and check if it's a valid card number length
        const cleaned = value.replace(/\s/g, "");
        return (
          cleaned.length >= 13 && cleaned.length <= 19 && /^\d+$/.test(cleaned)
        );
      },
      {
        message: "Please enter a valid card number",
      },
    ),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .refine(
      (value) => {
        // Trim any whitespace and normalize the value
        const trimmedValue = value.trim();

        // Check MM/YY format and validate date - allow for spaces around the slash
        // Supports formats like "12/25", "12 / 25", "01/25", "1/25"
        const match = trimmedValue.match(
          /^(0[1-9]|1[0-2]|[1-9])\s*\/\s*(\d{2})$/,
        );
        if (!match) {
          return false;
        }

        const [, month, year] = match;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        const expYear = parseInt(year, 10);
        const expMonth = parseInt(month, 10);

        // Check if the card is not expired (card expires at the END of the expiry month)
        if (expYear < currentYear) {
          return false;
        }
        if (expYear === currentYear && expMonth < currentMonth) {
          return false;
        }

        return true;
      },
      {
        message: "Please enter a valid expiry date",
      },
    ),
  securityCode: z
    .string()
    .min(1, "Security code is required")
    .refine(
      (value) => {
        return value.length >= 3 && value.length <= 4 && /^\d+$/.test(value);
      },
      {
        message: "Please enter a valid security code",
      },
    ),
  nameOnCard: z
    .string()
    .min(1, "Name on card is required")
    .min(2, "Name must be at least 2 characters")
    .refine((value) => /^[a-zA-Z\s.',-]+$/.test(value.trim()), {
      message: "Name can only contain letters, spaces, and common punctuation",
    }),
  zipCode: z
    .string()
    .min(1, "Zip code is required")
    .refine(
      (value) => {
        // Support both US (5 digits or 5+4) and international postal codes
        const usZip = /^\d{5}(-\d{4})?$/.test(value);
        const intlZip = /^[A-Za-z0-9\s-]{3,10}$/.test(value);
        return usZip || intlZip;
      },
      {
        message: "Please enter a valid zip/postal code",
      },
    ),
});

export type CardFormData = z.infer<typeof cardFormSchema>;

interface AddCardDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCard: (data: CardFormData) => void;
  trigger?: React.ReactNode;
}

export function AddCardDialog({
  isOpen,
  onOpenChange,
  onAddCard,
  trigger,
}: AddCardDialogProps) {
  const form = useForm<CardFormData>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      securityCode: "",
      nameOnCard: "",
      zipCode: "",
    },
  });

  const onSubmit = (data: CardFormData) => {
    onAddCard(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add Your Card
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum is simply dummy text
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <CardNumberInput {...field} />
                  </FormControl>
                  <div className="flex gap-1 mt-2">
                    <Image
                      src={visaIcon}
                      alt="Visa"
                      width={100}
                      height={100}
                      className="size-8"
                    />
                    <Image
                      src={mastercardIcon}
                      alt="MasterCard"
                      width={100}
                      height={100}
                      className="size-8"
                    />
                    <Image
                      src={amexIcon}
                      alt="American Express"
                      width={100}
                      height={100}
                      className="size-8"
                    />
                    <Image
                      src={discoverIcon}
                      alt="Discover"
                      width={100}
                      height={100}
                      className="size-8"
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <CardExpiryInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="securityCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security code</FormLabel>
                    <FormControl>
                      <CardCvcInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nameOnCard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name On Card</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Randy Lipshutz" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="12345" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 mt-6"
            >
              Add Card
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
