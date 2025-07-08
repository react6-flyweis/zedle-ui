import React from "react";
import { Testimonials } from "@/components/testimonials";
import { VendorEnterpriseHero } from "./components/VendorEnterpriseHero";
import { VendorEnterprisePersonalized } from "./components/VendorEnterprisePersonalized";

export default function page() {
  return (
    <div>
      <VendorEnterpriseHero />
      <Testimonials />
      <VendorEnterprisePersonalized />
    </div>
  );
}
