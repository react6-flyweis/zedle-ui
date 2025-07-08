"use client";
import { VendorHeroSection } from "@/components/VendorHero";

import vendorEnterprisePoster from "../assets/vendor-enterprise-poster.jpg";
import { ClientCard } from "../components/ClientCard";

type ClientType = "recurring" | "new";

interface Client {
  name: string;
  phone: string;
  email: string;
  imageUrl: string;
  type: ClientType;
}

const mockClients: Client[] = [
  {
    name: "Talan Dokidis",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2",
    type: "recurring",
  },
  {
    name: "Craig Mango",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2",
    type: "recurring",
  },
  {
    name: "Mira Dias",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2",
    type: "recurring",
  },
  {
    name: "Alena Schleifer",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&h=256&facepad=2",
    type: "new",
  },
  {
    name: "Emerson Vetrovs",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=256&h=256&facepad=2",
    type: "recurring",
  },
  {
    name: "Erin Dias",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=facearea&w=256&h=256&facepad=2",
    type: "recurring",
  },
  {
    name: "Charlie Arcand",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=256&h=256&facepad=2",
    type: "recurring",
  },
  {
    name: "Gretchen Bothman",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&facepad=2",
    type: "new",
  },
  {
    name: "Aspen Bergson",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&w=256&h=256&facepad=2",
    type: "recurring",
  },
  {
    name: "Chance Vetrovs",
    phone: "+1 1234567890",
    email: "example@gmail.com",
    imageUrl:
      "https://images.unsplash.com/photo-1502378735452-bc7d86632805?auto=format&fit=facearea&w=256&h=256&facepad=2",
    type: "new",
  },
];

export default function page() {
  // const t = useTranslations("enterpriseHero");

  return (
    <div className="space-y-8">
      <VendorHeroSection
        title={"Display all the clients who have visited your shop."}
        subtitle={
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed"
        }
        poster={vendorEnterprisePoster}
        onAdd={() => {}}
        addButtonText="Add Client"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto p-8 pt-0 max-w-5xl gap-6">
        {mockClients.map((client) => (
          <ClientCard key={client.name} {...client} />
        ))}
      </div>
    </div>
  );
}
