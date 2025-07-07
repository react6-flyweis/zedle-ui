"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/footer";
import Header from "@/components/header";

import type { NavigationItem } from "@/components/nav-menu";

const groceryNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/vendor/grocery",
    type: "link",
  },
  {
    title: "Products",
    href: "/vendor/grocery/products",
    type: "link",
  },
  {
    title: "Earning",
    href: "/vendor/grocery/earning",
    type: "link",
  },
];

const logisticsNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/vendor/logistics",
    type: "link",
  },
  {
    title: "Orders",
    href: "/vendor/logistics/orders",
    type: "link",
  },
  {
    title: "Wallet",
    href: "/vendor/logistics/wallet",
    type: "link",
  },
];

const foodNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/vendor/food-delivery",
    type: "link",
  },
  {
    title: "Food menu",
    href: "/vendor/food-delivery/menu",
    type: "link",
  },
  {
    title: "Earning",
    href: "/vendor/food-delivery/earning",
    type: "link",
  },
];

// const travelNavigation: NavigationItem[] = [
//   {
//     title: "Home",
//     href: "/vendor/travel-tourism",
//     type: "link",
//   },
//   {
//     title: "Search",
//     href: "/vendor/travel-tourism/search",
//     type: "link",
//   },

//   {
//     title: "Services",
//     href: "/vendor/travel-tourism/services",
//     type: "link",
//   },
//   {
//     title: "Favorites",
//     href: "/vendor/travel-tourism/favorites",
//     type: "link",
//   },
// ];

// const enterpriseNavigation: NavigationItem[] = [
//   {
//     title: "Home",
//     href: "/vendor/enterprise",
//     type: "link",
//   },
//   {
//     title: "Search",
//     href: "/vendor/enterprise/search",
//     type: "link",
//     icon: <SearchIcon />,
//   },
//   {
//     title: "Services",
//     href: "/vendor/enterprise/services",
//     type: "link",
//   },
//   {
//     title: "Favorites",
//     href: "/vendor/enterprise/favorites",
//     type: "link",
//   },
// ];

function getNavigationForPath(pathname: string): NavigationItem[] {
  if (pathname.startsWith("/vendor/grocery")) {
    return groceryNavigation;
  }
  if (pathname.startsWith("/vendor/logistics")) {
    return logisticsNavigation;
  }
  if (pathname.startsWith("/vendor/food")) {
    return foodNavigation;
  }
  //   if (pathname.startsWith("/vendor/travel-tourism")) {
  //     return [...travelNavigation];
  //   }
  //   if (pathname.startsWith("/vendor/enterprise")) {
  //     return [...enterpriseNavigation];
  //   }

  // Default to grocery navigation
  return groceryNavigation;
}

export default function VendorLayout({
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
