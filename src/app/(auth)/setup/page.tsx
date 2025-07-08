import { VendorEnterpriseSignup } from "../components/VendorEnterpriseSignup";
import { VendorFoodSignup } from "../components/VendorFoodSignup";
import VendorGrocerySignup from "../components/VendorGrocerySignup";
import { VendorLogisticsSignup } from "../components/VendorLogisticsSignup";

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
  const category = params.category;

  // if (type === "delivery") {
  //   return < />;
  // }

  if (type === "vendor") {
    switch (category) {
      case "Grocery":
        return <VendorGrocerySignup />;
      case "Food Delivery":
        return <VendorFoodSignup />;
      case "Logistics":
        return <VendorLogisticsSignup />;
      case "Enterprise Hub":
        return <VendorEnterpriseSignup />;
      default:
        return <div>Unsupported vendor category: {category}</div>;
    }
  }
}
