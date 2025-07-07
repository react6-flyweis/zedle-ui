import { VendorFoodSignup } from "../components/VendorFoodSignup";
import VendorGrocerySignup from "../components/VendorGrocerySignup";

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
      // Add more categories as needed
      default:
        return <div>Unsupported vendor category: {category}</div>;
    }
  }
}
