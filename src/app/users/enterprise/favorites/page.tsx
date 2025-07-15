import Image from "next/image";
import { useTranslations } from "next-intl";
import enterpriseFavoritesPoster from "../assets/enterprise-favorites-poster.jpg";
import { SalonCard } from "../components/SalonCard";

// Sample salon data
const salons = [
  {
    id: 1,
    name: "Luxe Hair Studio",
    address: "123 Fifth Avenue, New York, NY 10003",
    avgPrice: 75,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Bliss Beauty Lounge",
    address: "456 Madison Avenue, New York, NY 10022",
    avgPrice: 120,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "The Hair Sanctuary",
    address: "789 Broadway, New York, NY 10003",
    avgPrice: 95,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Elite Nail & Spa",
    address: "321 Park Avenue, New York, NY 10016",
    avgPrice: 80,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Modern Cuts Salon",
    address: "654 Lexington Avenue, New York, NY 10022",
    avgPrice: 110,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Serenity Spa & Salon",
    address: "987 Third Avenue, New York, NY 10022",
    avgPrice: 140,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Urban Chic Hair Studio",
    address: "147 West 42nd Street, New York, NY 10036",
    avgPrice: 130,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Glamour Beauty Bar",
    address: "258 Columbus Avenue, New York, NY 10023",
    avgPrice: 100,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Radiant Wellness Spa",
    address: "369 Amsterdam Avenue, New York, NY 10024",
    avgPrice: 160,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Page() {
  const t = useTranslations("enterpriseFavorites");
  return (
    <div>
      <section
        className="relative flex flex-col md:flex-row items-center justify-between p-10 h-[50vh]"
        style={{
          background: `url(${enterpriseFavoritesPoster.src}) center center / cover no-repeat`,
        }}
      >
        {/* White overlay */}
        <div className="absolute inset-0 bg-white/90 pointer-events-none z-0" />
        <div className="relative flex-1 mb-6 md:mb-0 md:mr-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("description")}
          </p>
        </div>
        <div className="relative flex-1 flex justify-center">
          <div className="rounded-xl overflow-hidden shadow-lg w-[320px] h-[200px] md:w-[400px] md:h-[250px]">
            <Image
              src={enterpriseFavoritesPoster}
              alt={t("posterAlt")}
              width={400}
              height={250}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 ">
        {salons.map((salon) => (
          <SalonCard
            key={salon.id}
            id={salon.id.toString()}
            name={salon.name}
            address={salon.address}
            avgPrice={salon.avgPrice}
            rating={salon.rating}
            image={salon.image}
            isFavorite
          />
        ))}
      </div>
    </div>
  );
}
