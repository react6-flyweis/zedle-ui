import { useTranslations } from "next-intl";
import { SalonCard } from "./SalonCard";

const mockSalons = [
  {
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    rating: 5.0,
    name: "Company Name",
    address: "371 7th Ave, New York, NY 10001",
    avgPrice: 100,
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    name: "Beauty Studio",
    address: "123 Main St, Brooklyn, NY 11201",
    avgPrice: 85,
  },
  {
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    name: "Glamour Hub",
    address: "456 Park Ave, New York, NY 10022",
    avgPrice: 120,
  },
  {
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    name: "Urban Cuts",
    address: "789 Broadway, New York, NY 10003",
    avgPrice: 90,
  },
  {
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    name: "Chic Styles",
    address: "321 5th Ave, New York, NY 10016",
    avgPrice: 110,
  },
  {
    image:
      "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80",
    rating: 4.5,
    name: "Salon Luxe",
    address: "654 Madison Ave, New York, NY 10065",
    avgPrice: 95,
  },
  {
    image:
      "https://images.unsplash.com/photo-1519415943484-cfbdfb486052?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    name: "Trendy Tresses",
    address: "987 Lexington Ave, New York, NY 10021",
    avgPrice: 105,
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    name: "The Hair Room",
    address: "246 8th Ave, New York, NY 10011",
    avgPrice: 115,
  },
  {
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    rating: 5.0,
    name: "Shear Genius",
    address: "135 9th Ave, New York, NY 10014",
    avgPrice: 130,
  },
];

export default function SalonGrid() {
  const t = useTranslations("popularSalons");

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-1">{t("heading")}</h2>
      <p className="text-gray-500 mb-6">{t("description")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockSalons.map((salon) => (
          <SalonCard
            key={`${salon.name}-${salon.address}`}
            image={salon.image}
            rating={salon.rating}
            name={salon.name}
            address={salon.address}
            avgPrice={salon.avgPrice}
          />
        ))}
      </div>
    </section>
  );
}
