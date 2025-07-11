"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VendorHeroSection } from "@/components/VendorHero";
import completedTourIcon from "../assets/completed-tour.png";

import pendingTourIcon from "../assets/pending-tour.png";
import tourBookingPoster from "../assets/vendor-tour-booking-poster.jpg";
import { type ITour, VendorTourCard } from "./VendorTourCard";

export default function ToursPage() {
  const t = useTranslations("toursPage");
  const [selectedTab, setSelectedTab] = useState("upcoming");

  // Mock data for tours
  const tours: ITour[] = [
    // Completed tours
    {
      id: "1",
      date: "08-May, 2025 Mon",
      time: "09:00 AM",
      requestId: "1662979452",
      address: "76 Whitly Way, 22079",
      location: "Virginia Safari Park",
      status: "completed",
    },
    {
      id: "2",
      date: "09-May, 2025 Tue",
      time: "10:00 AM",
      requestId: "1662979453",
      address: "12 Main St, 22080",
      location: "Blue Ridge Parkway",
      status: "completed",
    },
    {
      id: "3",
      date: "10-May, 2025 Wed",
      time: "11:00 AM",
      requestId: "1662979454",
      address: "34 Oak Ave, 22081",
      location: "Luray Caverns",
      status: "completed",
    },
    {
      id: "4",
      date: "11-May, 2025 Thu",
      time: "12:00 PM",
      requestId: "1662979455",
      address: "56 Pine Rd, 22082",
      location: "Monticello",
      status: "completed",
    },
    {
      id: "5",
      date: "12-May, 2025 Fri",
      time: "01:00 PM",
      requestId: "1662979456",
      address: "78 Maple St, 22083",
      location: "Colonial Williamsburg",
      status: "completed",
    },
    {
      id: "6",
      date: "13-May, 2025 Sat",
      time: "02:00 PM",
      requestId: "1662979457",
      address: "90 Cedar Ln, 22084",
      location: "Mount Vernon",
      status: "completed",
    },
    {
      id: "7",
      date: "14-May, 2025 Sun",
      time: "03:00 PM",
      requestId: "1662979458",
      address: "102 Birch Blvd, 22085",
      location: "Shenandoah National Park",
      status: "completed",
    },
    {
      id: "8",
      date: "15-May, 2025 Mon",
      time: "04:00 PM",
      requestId: "1662979459",
      address: "114 Elm St, 22086",
      location: "Virginia Beach Boardwalk",
      status: "completed",
    },
    // Upcoming tours
    {
      id: "9",
      date: "16-May, 2025 Tue",
      time: "09:00 AM",
      requestId: "1662979460",
      address: "126 Spruce St, 22087",
      location: "Busch Gardens Williamsburg",
      status: "upcoming",
    },
    {
      id: "10",
      date: "17-May, 2025 Wed",
      time: "10:00 AM",
      requestId: "1662979461",
      address: "138 Willow Ave, 22088",
      location: "Historic Jamestowne",
      status: "upcoming",
    },
    {
      id: "11",
      date: "18-May, 2025 Thu",
      time: "11:00 AM",
      requestId: "1662979462",
      address: "150 Chestnut Rd, 22089",
      location: "Arlington National Cemetery",
      status: "upcoming",
    },
    {
      id: "12",
      date: "19-May, 2025 Fri",
      time: "12:00 PM",
      requestId: "1662979463",
      address: "162 Poplar St, 22090",
      location: "Manassas National Battlefield Park",
      status: "upcoming",
    },
    {
      id: "13",
      date: "20-May, 2025 Sat",
      time: "01:00 PM",
      requestId: "1662979464",
      address: "174 Aspen Ln, 22091",
      location: "Natural Bridge State Park",
      status: "upcoming",
    },
    {
      id: "14",
      date: "21-May, 2025 Sun",
      time: "02:00 PM",
      requestId: "1662979465",
      address: "186 Redwood Blvd, 22092",
      location: "Virginia Museum of Fine Arts",
      status: "upcoming",
    },
    {
      id: "15",
      date: "22-May, 2025 Mon",
      time: "03:00 PM",
      requestId: "1662979466",
      address: "198 Cypress St, 22093",
      location: "Lewis Ginter Botanical Garden",
      status: "upcoming",
    },
    {
      id: "16",
      date: "23-May, 2025 Tue",
      time: "04:00 PM",
      requestId: "1662979467",
      address: "210 Magnolia Ave, 22094",
      location: "Virginia Aquarium & Marine Science Center",
      status: "upcoming",
    },
  ];

  const upcomingTours = tours.filter((tour) => tour.status === "upcoming");
  const completedTours = tours.filter((tour) => tour.status === "completed");

  return (
    <div className="">
      <VendorHeroSection
        className="pb-28"
        title={
          selectedTab === "upcoming"
            ? t("ongoingTourRequestsTitle")
            : t("completedTourRequestsTitle")
        }
        subtitle={t("tourRequestsSubtitle")}
        poster={tourBookingPoster}
      />
      <div className="relative max-w-5xl mx-auto px-4 -mt-22">
        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-15 w-full grid grid-cols-2 gap-5 bg-transparent">
            <TabsTrigger
              className="bg-white rounded data-[state=active]:bg-primary data-[state=active]:text-white h-12 gap-2 data-[state=active]:[&>img]:invert data-[state=active]:[&>img]:brightness-0"
              value="upcoming"
            >
              <Image
                src={pendingTourIcon}
                alt={t("pendingTourIconAlt")}
                width={24}
                height={24}
              />
              {t("upcomingTours")}
            </TabsTrigger>
            <TabsTrigger
              className="bg-white rounded data-[state=active]:bg-primary data-[state=active]:text-white h-12 gap-2 data-[state=active]:[&>img]:invert data-[state=active]:[&>img]:brightness-0"
              value="past"
            >
              <Image
                src={completedTourIcon}
                alt={t("completedTourIconAlt")}
                width={24}
                height={24}
              />
              {t("pastTours")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={selectedTab} className="">
            {selectedTab === "upcoming" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {upcomingTours.map((tour) => (
                  <VendorTourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
            {selectedTab === "past" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {completedTours.map((tour) => (
                  <VendorTourCard
                    key={tour.id}
                    tour={tour}
                    status="completed"
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
