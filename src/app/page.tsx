import { Categories } from "@/components/categories";
import { Hero } from "@/components/hero";
import { LogisticsBooking } from "@/components/logistics-booking";
import { Cities } from "@/components/cities";
import { PartnerSignup } from "@/components/partner-signup";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <LogisticsBooking />
      <Categories />
      <Cities />
      <PartnerSignup />
    </div>
  );
}
