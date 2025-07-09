"use client";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VendorHeroSection } from "@/components/VendorHero";
import vendorEnterprisePoster from "../assets/vendor-enterprise-poster.jpg";
import type { IStaff } from "../components/StaffCard";
import { StaffCard } from "../components/StaffCard";

export default function Page() {
  const t = useTranslations("staffs");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock staff data (use unsplash images for demo)
  const staffList: IStaff[] = [
    {
      name: "Marilyn Korsgaard",
      phone: "+1 234567890",
      email: "marilyn.korsgaard@example.com",
      image:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&facepad=2",
      profession: "Hairdresser",
      yearsOfExperience: 5,
    },
    {
      name: "Corey Lipshutz",
      phone: "+1 234567890",
      email: "corey.lipshutz@example.com",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400&facepad=2",
      profession: "Hairdresser",
      yearsOfExperience: 5,
    },
    {
      name: "Cheyenne Dorwart",
      phone: "+1 234567890",
      email: "cheyenne.dorwart@example.com",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400&facepad=2",
      profession: "Hairdresser",
      yearsOfExperience: 5,
    },
    {
      name: "Alfonso Dorwart",
      phone: "+1 234567890",
      email: "alfonso.dorwart@example.com",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=400&facepad=2",
      profession: "Hairdresser",
      yearsOfExperience: 5,
    },
    {
      name: "Ruben Septimus",
      phone: "+1 234567890",
      email: "ruben.septimus@example.com",
      image:
        "https://images.unsplash.com/photo-1519340333755-c1aa5571fd46?auto=format&fit=facearea&w=400&h=400&facepad=2",
      profession: "Hairdresser",
      yearsOfExperience: 5,
    },
    {
      name: "Paityn Rosser",
      phone: "+1 234567890",
      email: "paityn.rosser@example.com",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=400&facepad=2",
      profession: "Hairdresser",
      yearsOfExperience: 5,
    },
    {
      name: "Carla Riel Madsen",
      phone: "+1 234567890",
      email: "carla.riel@example.com",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400&facepad=2",
      profession: "Hairdresser",
      yearsOfExperience: 5,
    },
    {
      name: "Aspen Curtis",
      phone: "+1 234567890",
      email: "aspen.curtis@example.com",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=400&h=400&facepad=2",
      profession: "Hairdresser",
      yearsOfExperience: 5,
    },
    {
      name: "Emery Bergson",
      phone: "+1 234567890",
      email: "emery.bergson@example.com",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=400&facepad=2",
      profession: "Hairdresser",
      yearsOfExperience: 5,
    },
    {
      name: "Kaiya Lubin",
      phone: "+1 234567890",
      email: "kaiya.lubin@example.com",
      image:
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&h=400&facepad=2",
      profession: "Hairdresser",
      yearsOfExperience: 5,
    },
  ];

  return (
    <div className="space-y-8">
      <VendorHeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        poster={vendorEnterprisePoster}
        onAdd={() => setDialogOpen(true)}
        addButtonText={t("addStaffButton")}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto p-8 pt-0 max-w-5xl gap-6">
        {staffList.map((staff) => (
          <div key={staff.email} className="relative">
            <StaffCard staff={staff} />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 z-10 text-primary-foreground bg-primary/80 hover:bg-primary"
              aria-label="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
