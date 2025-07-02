import { Testimonials } from "@/components/testimonials";
import { LocatorMap } from "./components/LocatorMap";
import { NewOrders } from "./components/NewOrders";

export default function page() {
  return (
    <div>
      <div className="h-[85vh] w-full">
        <LocatorMap />
      </div>
      <div className="flex-1 p-8 mt-5">
        <NewOrders />
      </div>
      <Testimonials />
    </div>
  );
}
