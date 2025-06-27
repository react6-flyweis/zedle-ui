import type React from "react";
import { TravelTourismPersonalised } from "../components/TravelTourismPersonalised";
import { ServicesHero } from "./components/ServicesHero";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ServicesHero />
      {children}
      <TravelTourismPersonalised />
    </div>
  );
}
