import { useTranslations } from "next-intl";
import { TravelTourismPersonalised } from "../../components/TravelTourismPersonalised";
import { ServicesHero } from "../components/ServicesHero";
import { TourCard } from "../components/TourCard";

export default function page() {
  const t = useTranslations("tour");

  return (
    <div>
      <ServicesHero />
      {/* Tour Booking & Reservations Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-2">{t("bookingTitle")}</h2>
        <p className="text-muted-foreground mb-8">{t("bookingSubtitle")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              key: "guidedTours",
              unsplash:
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
            },
            {
              key: "safaris",
              unsplash:
                "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
            },
            {
              key: "cityExplorations",
              unsplash:
                "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80",
            },
            {
              key: "adventureExperiences",
              unsplash:
                "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
            },
          ].map((item) => (
            <TourCard
              key={item.key}
              image={item.unsplash}
              title={t(item.key)}
              rating={4.9}
            />
          ))}
        </div>
      </section>
      {/* End Section */}
      <TravelTourismPersonalised />
    </div>
  );
}
