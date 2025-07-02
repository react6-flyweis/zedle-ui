import Footer from "@/components/footer";
import Header from "@/components/header";
import { DeliveryPartnerPersonalized } from "./components/DeliveryPartnerPersonalized";

export default function DeliveryPartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <DeliveryPartnerPersonalized />
      <Footer />
    </>
  );
}
