"use client";

import saleAdImage from "@/assets/images/sale-ad.jpg";
import fashionAdImage from "@/assets/images/fashion-ad.jpg";
import houseAdImage from "@/assets/images/house-ad.png";
import Image from "next/image";

const carouselItems = [
  {
    id: 1,
    image: saleAdImage,
    alt: "Shopping Sale",
  },
  {
    id: 2,
    image: houseAdImage,
    alt: "Modern House",
  },
  {
    id: 3,
    image: fashionAdImage,
    alt: "Fashion Sale",
  },
];

export function AdCarousel() {
  // Create multiple copies for seamless infinite scroll
  const repeatedItems = [...carouselItems, ...carouselItems, ...carouselItems];

  return (
    <section className="py-8">
      <h3 className="text-center text-2xl font-bold mb-4">
        Advertisement goes here
      </h3>
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll">
          {repeatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[40%] flex-shrink-0 mr-4"
            >
              <Image
                src={item.image}
                alt={item.alt}
                className="w-full h-[200px] md:h-[250px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${carouselItems.length * 44}%);
          }
        }
        .animate-scroll {
          animation: scroll 12s linear infinite;
        }
      `}</style>
    </section>
  );
}
