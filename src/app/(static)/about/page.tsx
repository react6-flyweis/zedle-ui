import enterpriseBg from "./assets/enterprise-bg.jpg";
import foodDeliveryBg from "./assets/food-delivery-bg.jpg";
import groceryDeliveryBg from "./assets/grocery-delivery-bg.jpg";
import logisticBg from "./assets/logistic-bg.jpg";
import travelTourismBg from "./assets/travel-tourism-bg.jpg";

import HeroGrid from "./components/HeroGrid";
import { ServiceCard } from "./components/ServiceCard";
import { WhyChoose } from "./components/WhyChoose";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <HeroGrid />

      {/* Why Choose Zedle Section */}
      <WhyChoose />

      <div className="p-10">
        {[
          {
            title: "Grocery Delivery",
            image: groceryDeliveryBg,
          },
          {
            title: "Logistics",
            image: logisticBg,
          },
          {
            title: "Food Delivery",
            image: foodDeliveryBg,
          },
          {
            title: "Travel & Tourism",
            image: travelTourismBg,
          },
          {
            title: "Enterprise Solutions",
            image: enterpriseBg,
          },
        ].map((service, index) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            additionalDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            image={service.image}
            reverse={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
