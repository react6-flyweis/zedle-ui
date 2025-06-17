import { Hero } from "@/components/hero";
import { LogisticsBooking } from "@/components/logistics-booking";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <LogisticsBooking />
    </div>
  );
}
