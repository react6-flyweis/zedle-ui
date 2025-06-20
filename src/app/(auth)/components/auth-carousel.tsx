"use client";
import { useEffect, useState } from "react";

import carouselImage1 from "../assets/login-carousel-1.jpg";
import carouselImage2 from "../assets/login-carousel-2.jpg";
import carouselImage3 from "../assets/login-carousel-3.jpg";
import carouselImage4 from "../assets/login-carousel-4.jpg";

const carouselImages = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 1",
    image: carouselImage1,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 2",
    image: carouselImage2,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 3",
    image: carouselImage3,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry 4",
    image: carouselImage4,
  },
];

export function AuthCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
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
            backgroundImage: `url('${slide.image.src}')`,
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
