import { EnterpriseHero } from "./components/EnterpriseHero";
import { EnterprisePersonalized } from "./components/EnterpriseHubPersonalized";
import { OurServicesTray } from "./components/OurServicesTray";
import SalonGrid from "./components/SalonGrid";

export default function page() {
  return (
    <div>
      <EnterpriseHero />
      <OurServicesTray />
      <SalonGrid />
      <EnterprisePersonalized />
    </div>
  );
}
