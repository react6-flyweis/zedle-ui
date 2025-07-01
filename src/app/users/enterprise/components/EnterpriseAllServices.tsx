"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Pagination } from "@/components/Pagination";
import { SalonCard } from "./SalonCard";
import { ServicesCategories } from "./ServicesCategories";

const categories = [
  {
    id: 1,
    name: "Hair Saloon",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Barbershop",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Nail Saloon",
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Massage",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Makeup",
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    name: "Pet Service",
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 7,
    name: "Piercing",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    name: "Health & Fitness",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 9,
    name: "Skin Care",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
  },
];

const salons = [
  {
    id: 1,
    name: "Company Name",
    address: "371 7th Ave, New York, NY 10001",
    avgPrice: 100,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Company Name",
    address: "371 7th Ave, New York, NY 10001",
    avgPrice: 100,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Company Name",
    address: "371 7th Ave, New York, NY 10001",
    avgPrice: 100,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Company Name",
    address: "371 7th Ave, New York, NY 10001",
    avgPrice: 100,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Company Name",
    address: "371 7th Ave, New York, NY 10001",
    avgPrice: 100,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Company Name",
    address: "371 7th Ave, New York, NY 10001",
    avgPrice: 100,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
  },
];

export function EnterpriseAllServices() {
  const t = useTranslations("services");
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 3; // mock total pages

  const handleCategoryClick = (id: number) => {
    setActiveCategory(id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="p-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ServicesCategories
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
            title={t("ourServices")}
          />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {salons.map((salon) => (
              <SalonCard
                key={salon.id}
                name={salon.name}
                address={salon.address}
                avgPrice={salon.avgPrice}
                rating={salon.rating}
                image={salon.image}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
}
