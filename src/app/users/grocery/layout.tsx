import Footer from "@/components/footer";
import Header from "@/components/header";
import { NavigationItem } from "@/components/nav-menu";
import { SearchIcon, ShoppingBagIcon } from "lucide-react";

export const groceryNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
    type: "link",
  },
  {
    title: "Search",
    href: "/users/grocery/search",
    type: "link",
    icon: <SearchIcon />,
  },
  {
    title: "Products",
    href: "/users/grocery/products",
    type: "link",
  },
  {
    title: "Cart",
    href: "/users/grocery/cart",
    type: "link",
    icon: <ShoppingBagIcon />,
  },
  {
    title: "My Orders",
    href: "/users/grocery/orders",
    type: "link",
  },
  {
    title: "Categories",
    type: "dropdown" as const,
    items: [
      {
        title: "Grocery Delivery",
        href: "/users/grocery",
      },

      {
        title: "Logistics",
        href: "/users/logistics",
      },
      {
        title: "Food Delivery",
        href: "/users/food",
      },
      {
        title: "Travel & Tourism",
        href: "/users/travel-tourism",
      },
      {
        title: "Enterprise Hub",
        href: "/users/enterprise-hub",
      },
    ],
  },
];

export default function GroceryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header navigation={groceryNavigation} chipMenuStyle />
      <main>{children}</main>
      <Footer />
    </>
  );
}
