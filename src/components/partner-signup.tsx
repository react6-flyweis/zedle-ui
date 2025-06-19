import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

import partnerWithUsBg from "@/assets/images/partner-with-us.png";
import rideWithUsBg from "@/assets/images/ride-with-us.png";

export function PartnerSignup() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Partner with us",
              description: "Signup as a business",
              image: partnerWithUsBg,
              buttonText: "Get Started",
            },
            {
              title: "Ride with us",
              description: "Signup as a rider",
              image: rideWithUsBg,
              buttonText: "Join Now",
            },
          ].map((card, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-xl"
            >
              <CardHeader className="absolute inset-0 z-0">
                <Image
                  src={card.image}
                  alt={`${card.title} background`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/10 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>
                <div
                  className={cn(
                    "inline-flex items-center rounded-b-md px-3 py-2 text-sm font-medium absolute top-0 left-10",
                    "bg-white text-black"
                  )}
                >
                  {card.description}
                </div>
              </CardHeader>

              <CardContent className="relative z-10 flex flex-col justify-end min-h-60 p-6">
                <div className="">
                  <h2 className="text-3xl font-bold mb-5 text-shadow-lg text-white">
                    {card.title}
                  </h2>
                  <Button
                    size="lg"
                    className=" transition-all duration-200 hover:shadow-xl hover:scale-105 rounded-full"
                  >
                    {card.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
