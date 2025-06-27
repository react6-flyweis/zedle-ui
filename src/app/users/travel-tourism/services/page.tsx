import Image from "next/image";
import Link from "next/link";
import personalisedTourTravelImage from "../assets/tour-travels-personalised-app.png";

import { ServiceCard } from "../components/ServiceCard";
import { ServicesHero } from "./components/ServicesHero";

const services = [
  {
    title: "Tour Booking & Reservations",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    alt: "Tour Booking",
    href: "/users/travel-tourism/services/tour",
  },
  {
    title: "Hotel & Lodge Listings",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    alt: "Hotel Listings",
    href: "/users/travel-tourism/services/hotel-lodge",
  },
  {
    title: "Transport & Car Rentals",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    alt: "Transport Rentals",
  },
  {
    title: "Adventure & Experience Packages",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
    alt: "Adventure Packages",
  },
  {
    title: "Local Guides & Translators",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    alt: "Local Guides",
  },
];

function page() {
  return (
    <div>
      <ServicesHero />
      <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service) => (
          <Link href={service.href || "#"} key={service.title}>
            <ServiceCard key={service.title} {...service} />
          </Link>
        ))}
      </div>
      <div className="px-10">
        <Image
          src={personalisedTourTravelImage}
          alt="Personalised Recommendations"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}

export default page;
