"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { VendorHeroSection } from "@/components/VendorHero";
import type { IUser } from "@/types/user";
import vendorEnterprisePoster from "../assets/vendor-enterprise-poster.jpg";
import { AddClientDialog } from "../components/AddClientDialog";
import { CheckoutCard } from "../components/CheckoutCard";

const mockClients: IUser[] = [
  {
    name: "Talan Dokidis",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2",
    id: "",
    createdAt: "",
    updatedAt: "",
    role: "admin",
    isActive: false,
    address: "",
  },
  {
    name: "Craig Mango",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2",
    id: "",
    createdAt: "",
    updatedAt: "",
    role: "admin",
    isActive: false,
    address: "",
  },
  {
    name: "Mira Dias",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2",
    id: "",
    createdAt: "",
    updatedAt: "",
    role: "admin",
    isActive: false,
    address: "",
  },
  {
    name: "Alena Schleifer",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&h=256&facepad=2",
    id: "",
    createdAt: "",
    updatedAt: "",
    role: "admin",
    isActive: false,
    address: "",
  },
  {
    name: "Emerson Vetrovs",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&facepad=2",
    id: "",
    createdAt: "",
    updatedAt: "",
    role: "admin",
    isActive: false,
    address: "",
  },
  {
    name: "Erin Dias",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=facearea&w=256&h=256&facepad=2",
    id: "",
    createdAt: "",
    updatedAt: "",
    role: "admin",
    isActive: false,
    address: "",
  },
  {
    name: "Charlie Arcand",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=256&h=256&facepad=2",
    id: "",
    createdAt: "",
    updatedAt: "",
    role: "admin",
    isActive: false,
    address: "",
  },
  {
    name: "Gretchen Bothman",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&facepad=2",
    id: "",
    createdAt: "",
    updatedAt: "",
    role: "admin",
    isActive: false,
    address: "",
  },
  {
    name: "Aspen Bergson",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=256&h=256&facepad=2",
    id: "",
    createdAt: "",
    updatedAt: "",
    role: "admin",
    isActive: false,
    address: "",
  },
  {
    name: "Chance Vetrovs",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1502378735452-bc7d86632805?auto=format&fit=facearea&w=256&h=256&facepad=2",
    id: "",
    createdAt: "",
    updatedAt: "",
    role: "admin",
    isActive: false,
    address: "",
  },
];

export default function Page() {
  const t = useTranslations("enterprise.checkout");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <VendorHeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        poster={vendorEnterprisePoster}
        onAdd={() => setDialogOpen(true)}
        addButtonText={t("addClientButton")}
      />
      <AddClientDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto p-8 pt-0 max-w-5xl gap-6">
        {mockClients.map((client) => (
          <CheckoutCard key={client.name} client={client} />
        ))}
      </div>
    </div>
  );
}
