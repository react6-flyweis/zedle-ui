import Image from "next/image";
import personalisedLogisticsImage from "@/assets/images/personalised-logistics.png";
import { AdCarousel } from "@/components/ad-carousel";
import { Cities } from "@/components/cities";
import { LogisticsBooking } from "@/components/logistics-booking";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <LogisticsBooking withMap />
      <Cities />
      <AdCarousel />
      <Testimonials />
      <div className="px-10">
        <Image
          src={personalisedLogisticsImage}
          alt="Personalised Recommendations"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
