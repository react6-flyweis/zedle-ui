import Image from "next/image";
import { useTranslations } from "next-intl";
import vendorLogisticsHeroPoster from "../assets/vendor-logistics-hero-poster.jpg";
import { LogisticOrdersTabs } from "../components/LogisticOrdersTabs";

export default function OrdersPage() {
  const t = useTranslations("logisticsHero");

  return (
    <div className="">
      <div className="relative py-20 flex flex-col w-full">
        <div className="absolute inset-0 -z-10">
          <Image
            src={vendorLogisticsHeroPoster}
            alt={t("ongoingOrdersTitle")}
            fill
            className="object-cover w-full h-full brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="max-w-xl mx-auto mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {t("ongoingOrdersTitle")}
          </h1>
          <p className="text-white/80 text-base md:text-lg mb-6">
            {t("ongoingOrdersSubtitle")}
          </p>
        </div>
      </div>
      <div className="-mt-28 mb-16 relative">
        <LogisticOrdersTabs />
      </div>
    </div>
  );
}
