import { NewRequestGrid } from "./components/NewRequestGrid";
import { VendorLogisticsHeroSection } from "./components/VendorLogisticsHeroSection";

export default function Page() {
  return (
    <div className="flex flex-col gap-10">
      <VendorLogisticsHeroSection />
      <div className="-mt-28">
        <NewRequestGrid />
      </div>
    </div>
  );
}
