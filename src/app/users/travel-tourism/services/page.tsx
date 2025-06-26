import { HeroComponent } from "@/components/HeroComponent";

import tourTravelsServicesCharacter from "../assets/tour-travels-services-character.png";
import tourTravelsBg from "../assets/travel-tourism-bg.jpg";
import { ServiceCard } from "../components/ServiceCard";

const services = [
  {
    title: "Tour Booking & Reservations",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    alt: "Tour Booking",
  },
  {
    title: "Hotel & Lodge Listings",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    alt: "Hotel Listings",
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
      <HeroComponent
        title={["Your Trusted Partner", "In Every Journey"]}
        subtitle="Request for any travel you need"
        inputTitle="Enter a postcode to see what we deliver"
        characterImage={tourTravelsServicesCharacter}
        backgroundImage={tourTravelsBg}
      />
      <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </div>
  );
}

export default page;
