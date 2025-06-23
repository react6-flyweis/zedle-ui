import Image from "next/image";
import { SearchIcon } from "lucide-react";

import cartIcon from "@/assets/icons/cart-icon.png";
import Footer from "@/components/footer";
import Header from "@/components/header";

import type { NavigationItem } from "@/components/nav-menu";

const groceryNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/users/grocery",
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
    icon: (
      <Image
        src={cartIcon}
        alt="Cart Icon"
        width={24}
        height={24}
        className="size-4"
      />
    ),
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
