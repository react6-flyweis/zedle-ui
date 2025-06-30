import { TourBooking } from "../components/TourBooking";
import { TravelTourismPersonalised } from "../components/TravelTourismPersonalised";

export default function Page() {
  return (
    <div className="">
      <div className="h-[90vh] relative">
        <TourBooking />
      </div>
      <TravelTourismPersonalised />
    </div>
  );
}
