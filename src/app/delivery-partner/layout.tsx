import Footer from "@/components/footer";
import Header from "@/components/header";
import type { NavigationItem } from "@/components/nav-menu";
import { DeliveryPartnerPersonalized } from "./components/DeliveryPartnerPersonalized";

const deliveryPartnerNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/delivery-partner",
    type: "link",
  },
  {
    title: "Orders",
    href: "/delivery-partner/orders",
    type: "link",
  },
  {
    title: "Wallet",
    href: "/delivery-partner/wallet",
    type: "link",
  },
];

export default function DeliveryPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header navigation={deliveryPartnerNavigation} />
      <main>{children}</main>
      <DeliveryPartnerPersonalized />
      <Footer />
    </>
  );
}
