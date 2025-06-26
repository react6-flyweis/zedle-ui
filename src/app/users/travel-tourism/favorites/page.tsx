import Image from "next/image";
import { HotelCard } from "../components/HotelCard";

// Sample hotel data
const hotels = [
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

export default function Page() {
  const image =
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80";
  return (
    <div>
      <section
        className="relative flex flex-col md:flex-row items-center justify-between p-10 h-[50vh]"
        style={{
          background: `url(${image}) center center / cover no-repeat`,
        }}
      >
        {/* White overlay */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm pointer-events-none z-0" />
        <div className="relative flex-1 mb-6 md:mb-0 md:mr-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            We know you love it!
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="relative flex-1 flex justify-center">
          <div className="rounded-xl overflow-hidden shadow-lg w-[320px] h-[200px] md:w-[400px] md:h-[250px]">
            <Image
              src={image}
              alt="Mountain landscape"
              width={400}
              height={250}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 ">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} isFavorite />
        ))}
      </div>
    </div>
  );
}
