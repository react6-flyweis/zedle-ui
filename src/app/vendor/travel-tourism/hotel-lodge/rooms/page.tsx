"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { VendorHeroSection } from "@/components/VendorHero";
import hotelLodgePoster from "../assets/hotel-lodge-poster.jpg";
import { type Room, RoomCard } from "../components/RoomCard";
import { RoomEditorDialog } from "../components/RoomEditorDialog";

// Mock data for rooms
const rooms: Room[] = [
  {
    id: "1",
    type: "singleRoom",
    number: "101",
    size: "12 x 18 = 216",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    capacity: 4,
  },
  {
    id: "2",
    type: "doubleRoom",
    number: "110",
    size: "24 x 30 = 360",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    capacity: 6,
  },
  {
    id: "3",
    type: "singleRoom",
    number: "102",
    size: "12 x 18 = 216",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    capacity: 4,
  },
  {
    id: "4",
    type: "deluxeRoom",
    number: "120",
    size: "24 x 30 = 720",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    capacity: 8,
  },
  {
    id: "5",
    type: "singleRoom",
    number: "103",
    size: "12 x 18 = 216",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    capacity: 4,
  },
  {
    id: "6",
    type: "doubleRoom",
    number: "111",
    size: "24 x 30 = 360",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
    capacity: 6,
  },
  {
    id: "7",
    type: "singleRoom",
    number: "104",
    size: "12 x 18 = 216",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    capacity: 4,
  },
  {
    id: "8",
    type: "deluxeRoom",
    number: "121",
    size: "24 x 30 = 720",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=400&q=80",
    capacity: 8,
  },
  {
    id: "9",
    type: "singleRoom",
    number: "105",
    size: "12 x 18 = 216",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    capacity: 4,
  },
  {
    id: "10",
    type: "doubleRoom",
    number: "112",
    size: "24 x 30 = 360",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
    capacity: 6,
  },
  {
    id: "11",
    type: "singleRoom",
    number: "106",
    size: "12 x 18 = 216",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    capacity: 4,
  },
  {
    id: "12",
    type: "deluxeRoom",
    number: "122",
    size: "24 x 30 = 720",
    features: "Bathroom, TV, Internet, Pool, Fire Exit",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    capacity: 8,
  },
];

export default function Page() {
  const t = useTranslations("rooms");

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleEdit = useCallback((_id: string) => {
    // handle edit logic
  }, []);

  const handleDelete = useCallback((_id: string) => {
    // handle delete logic
  }, []);

  const handleAddRoom = (data: any) => {
    // handle add room logic (e.g., API call or update state)
    setAddDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      <VendorHeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        poster={hotelLodgePoster}
        onAdd={() => setAddDialogOpen(true)}
        showCalendar={true}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto p-6 pt-0 max-w-5xl gap-6">
        <RoomEditorDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onSubmit={handleAddRoom}
        />
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
