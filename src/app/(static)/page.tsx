import Image from "next/image";
import personalisedLogisticsImage from "@/assets/images/personalised-logistics.png";
import { AdCarousel } from "@/components/ad-carousel";
import { Categories } from "@/components/categories";
import { Cities } from "@/components/cities";
import { Hero } from "@/components/hero";
import { LogisticsBooking } from "@/components/logistics-booking";
import { MobileAppDownload } from "@/components/mobile-app-download";
import { PartnerSignup } from "@/components/partner-signup";
import { Statistics } from "@/components/statistics";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <LogisticsBooking />
      <Categories />
      <Cities />
      <PartnerSignup />
      <Statistics />
      <MobileAppDownload />
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
