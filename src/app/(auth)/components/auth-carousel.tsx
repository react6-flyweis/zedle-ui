"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ICategory } from "@/constants/categories";

const authCarouselImages = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/login-carousel-1.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 2",
    image: "/assets/login-carousel-2.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 3",
    image: "/assets/login-carousel-3.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 4",
    image: "/assets/login-carousel-4.jpg",
  },
];

const foodCarouselImages = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/food-carousel-1.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 2",
    image: "/assets/food-carousel-2.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 3",
    image: "/assets/food-carousel-3.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 4",
    image: "/assets/food-carousel-4.jpg",
  },
];

const grocerCarouselImages = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/grocery-carousel-1.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 2",
    image: "/assets/grocery-carousel-2.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 3",
    image: "/assets/grocery-carousel-3.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 4",
    image: "/assets/grocery-carousel-4.jpg",
  },
];

const logisticsCarouselImages = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/logistic-carousel-1.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 2",
    image: "/assets/logistic-carousel-2.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 3",
    image: "/assets/logistic-carousel-3.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 4",
    image: "/assets/logistic-carousel-4.jpg",
  },
];

const travelTourismCarouselImages = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/travel-carousel-1.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 2",
    image: "/assets/travel-carousel-2.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 3",
    image: "/assets/travel-carousel-3.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 4",
    image: "/assets/travel-carousel-4.jpg",
  },
];

const enterpriseCarouselImages = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/enterprise-carousel-1.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 2",
    image: "/assets/enterprise-carousel-2.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 3",
    image: "/assets/enterprise-carousel-3.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 4",
    image: "/assets/enterprise-carousel-4.jpg",
  },
];

const deliveryCarouselImages = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/delivery-carousel-1.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/delivery-carousel-2.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/delivery-carousel-3.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/delivery-carousel-4.jpg",
  },
];

const vendorFoodCarouselImages = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: "/assets/vendor-food-carousel-1.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 2",
    image: "/assets/vendor-food-carousel-2.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 3",
    image: "/assets/vendor-food-carousel-3.jpg",
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 4",
    image: "/assets/vendor-food-carousel-4.jpg",
  },
];

export function AuthCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const searchParams = useSearchParams();

  // Memoize carousel images to prevent re-computation on every render
  const carouselImages = useMemo(() => {
    const type = searchParams.get("type");
    const category = searchParams.get("category") as ICategory["key"];

    switch (type) {
      case "delivery":
        return deliveryCarouselImages;
      case "user":
        switch (category) {
          case "food":
            return foodCarouselImages;
          case "grocery":
            return grocerCarouselImages;
          case "logistics":
            return logisticsCarouselImages;
          case "travel-tourism":
            return travelTourismCarouselImages;
          case "enterprise":
            return enterpriseCarouselImages;
        }
        return authCarouselImages;
      case "vendor":
        switch (category) {
          case "food":
            return vendorFoodCarouselImages;
        }
        return authCarouselImages;
      default:
        return authCarouselImages;
    }
  }, [searchParams]);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex-1 relative w-full h-full overflow-hidden rounded-r-3xl shadow-lg">
      {/* Background slides */}
      {carouselImages.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Text overlay */}
      <div className="absolute w-4/5 bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-500/50 backdrop-blur-sm rounded-lg p-6 z-10">
        <p className="text-white text-center leading-relaxed">
          {carouselImages[currentSlide].title}
        </p>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-around z-10 shadow-lg p-3 border-2 border-gray-600/50 rounded-full w-1/3">
        {carouselImages.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goToSlide(index)}
            className={`size-2 rounded-full transition-all duration-200 border ${
              index === currentSlide ? "bg-white scale-110 " : ""
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
