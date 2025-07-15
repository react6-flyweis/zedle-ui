import type { ICategory } from "@/constants/categories";
import { DeliverySignup } from "../components/DeliverySignup";
import { VendorEnterpriseSignup } from "../components/VendorEnterpriseSignup";
import { VendorFoodSignup } from "../components/VendorFoodSignup";
import VendorGrocerySignup from "../components/VendorGrocerySignup";
import { VendorLogisticsSignup } from "../components/VendorLogisticsSignup";
import VendorTravelSignup from "../components/VendorTravelSignup";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  if (!params || !params.type) {
    return null;
  }
  const type = params.type;
  const category = params.category as ICategory["key"];

  if (type === "delivery") {
    return <DeliverySignup />;
  }

  if (type === "vendor") {
    const VendorComponent = (() => {
      switch (category) {
        case "grocery":
          return <VendorGrocerySignup />;
        case "food":
          return <VendorFoodSignup />;
        case "logistics":
          return <VendorLogisticsSignup />;
        case "enterprise":
          return <VendorEnterpriseSignup />;
        case "travel-tourism":
          return <VendorTravelSignup />;
        default:
          return <div>Unsupported vendor category: {category}</div>;
      }
    })();

    return (
      <div className="w-full max-w-[100vw] sm:max-w-full overflow-hidden">
        {VendorComponent}
      </div>
    );
  }
}
