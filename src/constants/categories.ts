export const CATEGORIES = [
  {
    title: "Grocery Delivery",
    key: "grocery",
  },
  {
    title: "Logistics",
    key: "logistics",
  },
  {
    title: "Food Delivery",
    key: "food",
  },
  {
    title: "Travel & Tourism",
    key: "travel-tourism",
  },
  {
    title: "Enterprise Hub",
    key: "enterprise",
  },
] as const;

export type ICategory = (typeof CATEGORIES)[number];
