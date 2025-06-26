import Image from "next/image";
import Link from "next/link";
import { HeroComponent } from "@/components/HeroComponent";
import personalisedTourTravelImage from "./assets/tour-travels-personalised-app.png";
import travelTourismBackground from "./assets/travel-tourism-bg.jpg";
import travelTourismCharacter from "./assets/travel-tourism-charecter.png";
import { HotelCard, type IHotel } from "./components/HotelCard";
import { PopularTray } from "./components/PopularTray";

// Sample hotel data
const hotels: IHotel[] = [
  {
    id: 1,
    name: "Swiss-Belhotel Rainforest Kuta",
    address: "Jl. Sunset Road No. 101, Kuta, Bali, Indonesia",
    price: 50,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    name: "The Ubud Village Resort & Spa",
    address: "Jl. Raya Nyuh Kuning, Ubud, Bali, Indonesia",
    price: 120,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80",
  },
  {
    id: 3,
    name: "Padma Resort Legian",
    address: "Jl. Padma No. 1, Legian, Bali, Indonesia",
    price: 95,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 4,
    name: "Alila Seminyak",
    address: "Jl. Taman Ganesha No. 9, Seminyak, Bali, Indonesia",
    price: 180,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "The Trans Resort Bali",
    address: "Jl. Sunset Road, Kerobokan Kelod, Bali, Indonesia",
    price: 110,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Grand Hyatt Bali",
    address: "Kawasan Wisata Nusa Dua BTDC, Bali, Indonesia",
    price: 200,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Mulia Resort",
    address: "Jl. Raya Nusa Dua Selatan, Nusa Dua, Bali, Indonesia",
    price: 220,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "The Stones Hotel",
    address: "Jl. Raya Pantai Kuta, Kuta, Bali, Indonesia",
    price: 130,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Ayana Resort and Spa",
    address: "Jl. Karang Mas Sejahtera, Jimbaran, Bali, Indonesia",
    price: 250,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export default function TravelTourismPage() {
  return (
    <div className="">
      <HeroComponent
        title={["Your Trusted Partner", "In Every Journey"]}
        subtitle="Request for any travel you need"
        inputTitle="Enter a postcode to see what we deliver"
        characterImage={travelTourismCharacter}
        backgroundImage={travelTourismBackground}
      />
      <PopularTray />
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recommended Hotels
          </h1>
          <p className="text-gray-600">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <Link
              href={`/users/travel-tourism/hotel/${hotel.id}`}
              key={hotel.id}
            >
              <HotelCard hotel={hotel} />
            </Link>
          ))}
        </div>
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
