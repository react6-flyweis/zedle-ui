import { Categories } from "@/components/categories";
import { Hero } from "@/components/hero";
import { LogisticsBooking } from "@/components/logistics-booking";
import { Cities } from "@/components/cities";
import { PartnerSignup } from "@/components/partner-signup";
import { Statistics } from "@/components/statistics";
import { MobileAppDownload } from "@/components/mobile-app-download";
import { AdCarousel } from "@/components/ad-carousel";

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
    </div>
  );
}
