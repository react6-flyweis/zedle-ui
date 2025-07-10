import type { ICategory } from "@/constants/categories";
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
  const category = params.category as ICategory["key"];

  if (type === "delivery") {
    return <div>Delivery partner signup is not implemented yet.</div>;
  }

  if (type === "vendor") {
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
        return (
          <div>Travel and Tourism vendor signup is not implemented yet.</div>
        );
      default:
        return <div>Unsupported vendor category: {category}</div>;
    }
  }
}
