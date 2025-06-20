"use client";

import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "lucide-react";
import Image from "next/image";
import quoteIcon from "@/assets/icons/quote.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const testimonials = [
  {
    name: "Dede Georgiana",
    role: "User",
    rating: 66,
    feedback:
      "Be welcomed and every all pairs avoided. But in certain and owing to the claims of duty or business it frequently occur.",
    avatar: "/assets/images/user-1.jpg", // placeholder path
  },
  {
    name: "Luca Theodore",
    role: "Delivery Partner",
    rating: 68,
    feedback:
      "The principle of selection he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
    avatar: "/assets/images/user-2.jpg", // placeholder path
  },
  {
    name: "Lucian Manroe",
    role: "Vendor",
    rating: 66,
    feedback:
      "Love or pursues desires obtain pain itself, because pain because occasionally circumstances occur some great pleasure.",
    avatar: "/assets/images/user-3.jpg", // placeholder path
  },
];

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Appreciation From People
            </h2>
            <div className="flex gap-2 items-center">
              <div className="flex -space-x-1">
                <div className="size-3 rounded-full border-primary border"></div>
                <div className="size-3 rounded-full bg-primary"></div>
                <div className="size-3 rounded-full border-primary border"></div>
              </div>
              <div className="w-12 h-1 bg-primary"></div>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex space-x-2">
            <Button
              className="rounded-none bg-transparent border-primary"
              variant="outline"
              size="icon"
            >
              <ChevronLeftIcon className="size-5 text-primary" />
            </Button>
            <Button
              className="rounded-none bg-transparent border-primary"
              variant="outline"
              size="icon"
            >
              <ChevronRightIcon className="size-5 text-primary" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative flex">
              {/* Pink vertical line on the left */}

              <div className="flex justify-center items-center">
                <Avatar className="size-14 z-10">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback className="bg-primary text-white font-semibold text-lg">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 h-full w-1 bg-primary"></div>
              </div>

              <div className="p-8 px-5 h-full flex flex-col">
                {/* Large quotation marks */}
                <div className="mb-5">
                  <Image
                    src={quoteIcon}
                    alt="Quote Icon"
                    className="max-w-10 max-h-10 text-primary"
                  />
                </div>

                {/* Feedback */}
                <p className="text-gray-600 text-base leading-relaxed mb-5 flex-grow">
                  {testimonial.feedback}
                </p>

                {/* User Info */}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-primary font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
