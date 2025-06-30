"use client";

import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
];

const logisticsNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/users/logistics",
    type: "link",
  },
  {
    title: "Bookings",
    href: "/users/logistics/bookings",
    type: "link",
  },
  {
    title: "Wallet",
    href: "/users/logistics/wallet",
    type: "link",
  },
];

const foodNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/users/food",
    type: "link",
  },
  {
    title: "Search",
    href: "/users/food/search",
    type: "link",
    icon: <SearchIcon />,
  },
  {
    title: "Restaurants",
    href: "/users/food/restaurants",
    type: "link",
  },
  {
    title: "Cart",
    href: "/users/food/cart",
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
    title: "Orders",
    href: "/users/food/orders",
    type: "link",
  },
];

const travelNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/users/travel-tourism",
    type: "link",
  },
  {
    title: "Search",
    href: "/users/travel-tourism/search",
    type: "link",
  },
  {
    title: "Services",
    href: "/users/travel-tourism/services",
    type: "link",
  },
  {
    title: "Favorites",
    href: "/users/travel-tourism/favorites",
    type: "link",
  },
];

const enterpriseNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/users/enterprise-hub",
    type: "link",
  },
  {
    title: "Dashboard",
    href: "/users/enterprise-hub/dashboard",
    type: "link",
  },
  {
    title: "Analytics",
    href: "/users/enterprise-hub/analytics",
    type: "link",
  },
];

const categories = {
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
};

function getNavigationForPath(pathname: string): NavigationItem[] {
  if (pathname.startsWith("/users/grocery")) {
    return [...groceryNavigation, categories];
  }
  if (pathname.startsWith("/users/logistics")) {
    return [...logisticsNavigation, categories];
  }
  if (pathname.startsWith("/users/food")) {
    return [...foodNavigation, categories];
  }
  if (pathname.startsWith("/users/travel-tourism")) {
    return [...travelNavigation, categories];
  }
  if (pathname.startsWith("/users/enterprise-hub")) {
    return [...enterpriseNavigation, categories];
  }

  // Default to grocery navigation
  return [...groceryNavigation, categories];
}

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navigation = getNavigationForPath(pathname);

  return (
    <>
      <Header navigation={navigation} chipMenuStyle />
      <main>{children}</main>
      <Footer />
    </>
  );
}
