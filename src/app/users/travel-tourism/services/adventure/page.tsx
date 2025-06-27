import Link from "next/link";
import { useTranslations } from "next-intl";
import { TourCard } from "../components/TourCard";

export default function AdventurePage() {
  const t = useTranslations("adventure");

  const adventures = [
    {
      title: "Mountain Climbing",
      image:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Scuba Diving",
      image:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Desert Safari",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Sky Diving",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-2">{t("bookingTitle")}</h2>
      <p className="text-muted-foreground mb-8">{t("bookingSubtitle")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adventures.map((item) => (
          <Link
            href={`/users/travel-tourism/select-tour`}
            passHref
            key={item.title}
          >
            <TourCard image={item.image} title={item.title} rating={4.9} />
          </Link>
        ))}
      </div>
    </section>
  );
}
