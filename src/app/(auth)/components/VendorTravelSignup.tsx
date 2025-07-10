"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { BusinessTypeCard } from "@/components/BusinessTypeCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import adventureCategory from "../assets/adventure-category.jpg";
import carRentalCategory from "../assets/car-rental-category.jpg";
import guideCategory from "../assets/guide-category.jpg";
import hotelLodgeCategory from "../assets/hotel-lodge-category.jpg";
import tourBookingCategory from "../assets/tour-booking-category.jpg";
import { CarRentalSignup } from "./CarRentalSignup";
import { VendorHotelLodgeSignup } from "./HotelLodgeSignup";
import { TourBookingSignup } from "./TourBookingSignup";

const businessTypes = [
  {
    key: "hotelLodge",
    image: hotelLodgeCategory,
  },
  {
    key: "tourBooking",
    image: tourBookingCategory,
  },
  {
    key: "transportCar",
    image: carRentalCategory,
  },
  {
    key: "adventure",
    image: adventureCategory,
  },
  {
    key: "localGuides",
    image: guideCategory,
  },
] as const;

export default function VendorTravelSignup() {
  const t = useTranslations("businessTypeSelector");
  const [selected, setSelected] = useState<
    (typeof businessTypes)[number]["key"] | undefined
  >();
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<"select" | "form">("select");

  // Render the signup form for the selected business type
  const renderSignupForm = () => {
    switch (selected) {
      case "hotelLodge":
        return <VendorHotelLodgeSignup />;
      case "tourBooking":
        return <TourBookingSignup />;
      case "transportCar":
        return <CarRentalSignup />;
      case "adventure":
        return <TourBookingSignup />;
      default:
        return null;
    }
  };

  if (step === "form" && selected) {
    return <div>{renderSignupForm()}</div>;
  }

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-6">{t("title")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 justify-items-center">
        {businessTypes.map((type) => (
          <button
            key={type.key}
            type="button"
            onClick={() => setSelected(type.key)}
            aria-pressed={selected === type.key}
          >
            <BusinessTypeCard
              label={t(type.key)}
              image={type.image}
              highlighted={selected === type.key}
            />
          </button>
        ))}
      </div>
      <div className="flex items-center mb-6">
        <Checkbox
          id="agree"
          checked={agreed}
          onCheckedChange={() => setAgreed((v) => !v)}
          className="mr-2"
        />
        <label
          htmlFor="agree"
          className="text-sm text-muted-foreground select-none"
        >
          {t.rich("termsAgreement", {
            termsOfUse: () => (
              <a
                href="/terms"
                className="underline hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("termsOfUse")}
              </a>
            ),
            privacyPolicy: () => (
              <a
                href="/privacy-policy"
                className="underline hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("privacyPolicy")}
              </a>
            ),
          })}
        </label>
      </div>
      <div className="flex gap-4 mt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 rounded-full"
          onClick={() => setSelected(undefined)}
          disabled={!selected}
        >
          {t("back")}
        </Button>
        <Button
          type="button"
          className="flex-1 rounded-full"
          disabled={!selected || !agreed}
          onClick={() => setStep("form")}
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
}
