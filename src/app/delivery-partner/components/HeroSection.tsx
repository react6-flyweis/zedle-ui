import Image from "next/image";
import { useTranslations } from "next-intl";
import ordersHeroPoster from "../assets/bookings-hero.jpg";

const HeroSection = () => {
  const t = useTranslations("orders");
  return (
    <section className="relative w-full h-[340px] md:h-[420px] flex items-center justify-center overflow-hidden rounded-xl">
      <Image
        src={ordersHeroPoster}
        alt={t("heroImageAlt")}
        fill
        className="object-cover object-center z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
          {t("ongoingRequestsTitle")}
        </h1>
        <p className="text-white/80 text-base md:text-lg max-w-2xl">
          {t("ongoingRequestsDescription")}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
