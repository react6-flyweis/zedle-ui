import { ParcelPickupDropMap } from "../components/ParcelPickupDropMap";
import ParcelRouteCard from "../components/ParcelRouteCard";

const pickupCoords = {
  longitude: 77.326, // Longitude for Noida
  latitude: 28.5355, // Latitude for Noida
};
const dropoffCoords = {
  longitude: 77.209, // Longitude for New Delhi
  latitude: 28.6139, // Latitude for New Delhi
};

export default function RoutePage() {
  return (
    <div className="relative h-[85vh]">
      <ParcelPickupDropMap
        pickupCoords={pickupCoords}
        dropoffCoords={dropoffCoords}
      />
      <section className="absolute bottom-5 left-0 w-full z-10">
        <div className="container mx-auto px-8">
          <ParcelRouteCard />
        </div>
      </section>
    </div>
  );
}
