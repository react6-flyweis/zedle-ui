"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { AddCardDialog, type CardFormData } from "./add-card-dialog";
import Image from "next/image";

import visaIcon from "@/assets/icons/visa.png";
import mastercardIcon from "@/assets/icons/master-card.png";
import amexIcon from "@/assets/icons/amex.png";

interface PaymentCard {
  id: string;
  type: "mastercard" | "visa" | "amex";
  lastFourDigits: string;
  holderName: string;
}

interface PaymentMethodProps {
  isAddressSelected: boolean;
  onCardSelect?: (cardId: string) => void;
}

export default function PaymentMethod({
  isAddressSelected,
  onCardSelect,
}: PaymentMethodProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: "1",
      type: "mastercard",
      lastFourDigits: "436",
      holderName: "John Doe",
    },
  ]);
  const [selectedCardId, setSelectedCardId] = useState<string>("1");

  // Notify parent component about initial card selection
  useEffect(() => {
    if (onCardSelect && isAddressSelected) {
      onCardSelect(selectedCardId);
    }
  }, [onCardSelect, selectedCardId, isAddressSelected]);

  const handleAddCard = (data: CardFormData) => {
    const newCard: PaymentCard = {
      id: Date.now().toString(),
      type: "mastercard", // You can determine this from the card number
      lastFourDigits: data.cardNumber.slice(-4),
      holderName: data.nameOnCard,
    };

    setCards((prev) => [...prev, newCard]);
    setIsDialogOpen(false);
  };

  const handleCardSelect = (cardId: string) => {
    setSelectedCardId(cardId);
    onCardSelect?.(cardId);
  };

  const getCardIcon = (type: PaymentCard["type"]) => {
    switch (type) {
      case "mastercard":
        return (
          <Image
            src={mastercardIcon}
            alt="Master Card"
            width={32}
            height={20}
            className="w-8 h-5 object-contain"
          />
        );
      case "visa":
        return (
          <Image
            src={visaIcon}
            alt="Visa"
            width={32}
            height={20}
            className="w-8 h-5 object-contain"
          />
        );
      case "amex":
        return (
          <Image
            src={amexIcon}
            alt="American Express"
            width={32}
            height={20}
            className="w-8 h-5 object-contain"
          />
        );
      default:
        return <CreditCard className="size-5 text-gray-500" />;
    }
  };

  return (
    <Card className="rounded-none shadow-none gap-0">
      <CardHeader className="relative">
        <div className="absolute size-12 bg-black -left-10 top-0 flex items-center justify-center">
          <CreditCard className="size-6 text-white" />
        </div>
      </CardHeader>
      <CardContent className="">
        <h3 className="font-semibold text-lg mb-4">Payment</h3>

        {isAddressSelected ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Add your card to make payment
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Map through existing cards */}
              {cards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className={`border-2 border-dashed rounded-lg p-4 bg-white cursor-pointer transition-colors text-left w-full ${
                    selectedCardId === card.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => handleCardSelect(card.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getCardIcon(card.type)}
                      <div>
                        <p className="font-medium text-sm capitalize">
                          {card.type === "mastercard"
                            ? "Master Card"
                            : card.type.charAt(0).toUpperCase() +
                              card.type.slice(1)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          **** **** **** {card.lastFourDigits}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        selectedCardId === card.id
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </button>
              ))}

              {/* Add New Card */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="size-6 text-primary" />
                    <span className="font-medium text-sm text-primary">
                      Add New Card
                    </span>
                  </div>
                  <AddCardDialog
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onAddCard={handleAddCard}
                    trigger={
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-teal-500 px-4 py-1 text-sm rounded-none text-teal-500 hover:bg-teal-50 hover:text-teal-600"
                      >
                        ADD NEW
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Please select a delivery address first to proceed with payment
            options.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
