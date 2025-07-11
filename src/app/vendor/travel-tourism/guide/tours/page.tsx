"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VendorHeroSection } from "@/components/VendorHero";
import completedTourIcon from "../../assets/completed-tour.png";
import pendingTourIcon from "../../assets/pending-tour.png";
import vendorLocalGuideHeroPoster from "../assets/local-guide-poster.jpg";

import { GuideTourCard, type ITour } from "../components/GuideTourCard";

export default function ToursPage() {
  const t = useTranslations("toursPage");
  const [selectedTab, setSelectedTab] = useState("upcoming");

  // Mock data for tours
  const tours: ITour[] = [
    // Upcoming tours
    {
      id: "1",
      date: "08-May, 2025 Mon",
      time: "09:00 AM",
      requestId: "1662979452",
      location: "Virginia City Tour",
      status: "upcoming",
      price: "100",
    },
    {
      id: "2",
      date: "09-May, 2025 Tue",
      time: "10:00 AM",
      requestId: "1662979453",
      location: "Virginia City Tour",
      status: "upcoming",
      price: "100",
    },
    {
      id: "3",
      date: "10-May, 2025 Wed",
      time: "11:00 AM",
      requestId: "1662979454",
      location: "Virginia City Tour",
      status: "upcoming",
      price: "100",
    },
    // ...existing upcoming tours...
    {
      id: "16",
      date: "23-May, 2025 Tue",
      time: "04:00 PM",
      requestId: "1662979467",
      location: "Virginia City Tour",
      status: "upcoming",
      price: "100",
    },
    // Completed tours
    {
      id: "17",
      date: "01-May, 2025 Thu",
      time: "09:00 AM",
      requestId: "1662979401",
      location: "Virginia City Tour",
      status: "completed",
      price: "100",
    },
    {
      id: "18",
      date: "02-May, 2025 Fri",
      time: "10:00 AM",
      requestId: "1662979402",
      location: "Virginia City Tour",
      status: "completed",
      price: "100",
    },
    {
      id: "19",
      date: "03-May, 2025 Sat",
      time: "11:00 AM",
      requestId: "1662979403",
      location: "Virginia City Tour",
      status: "completed",
      price: "100",
    },
    {
      id: "20",
      date: "04-May, 2025 Sun",
      time: "12:00 PM",
      requestId: "1662979404",
      location: "Virginia City Tour",
      status: "completed",
      price: "100",
    },
    {
      id: "21",
      date: "05-May, 2025 Mon",
      time: "01:00 PM",
      requestId: "1662979405",
      location: "Virginia City Tour",
      status: "completed",
      price: "100",
    },
    // Additional completed tours
    {
      id: "22",
      date: "06-May, 2025 Tue",
      time: "02:00 PM",
      requestId: "1662979406",
      location: "Washington Monument Tour",
      status: "completed",
      price: "120",
    },
    {
      id: "23",
      date: "07-May, 2025 Wed",
      time: "03:00 PM",
      requestId: "1662979407",
      location: "New York City Tour",
      status: "completed",
      price: "150",
    },
    {
      id: "24",
      date: "08-May, 2025 Thu",
      time: "04:00 PM",
      requestId: "1662979408",
      location: "San Francisco Bay Tour",
      status: "completed",
      price: "130",
    },
    {
      id: "25",
      date: "09-May, 2025 Fri",
      time: "05:00 PM",
      requestId: "1662979409",
      location: "Chicago Architecture Tour",
      status: "completed",
      price: "110",
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
        poster={vendorLocalGuideHeroPoster}
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
                  <GuideTourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
            {selectedTab === "past" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {completedTours.map((tour) => (
                  <GuideTourCard key={tour.id} tour={tour} status="completed" />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
