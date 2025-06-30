import { Clock, Contact, Info } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import contactInfoIcon from "../assets/contact-info.png";
import deliverInfoIcon from "../assets/delivery-info.png";
import timeIcon from "../assets/time.png";

export function RestaurantInfoSection() {
  const t = useTranslations("RestaurantInfoSection");
  return (
    <div className="flex flex-col md:flex-row gap-0 md:gap-0 bg-background my-8">
      {/* Left: Delivery & Contact */}
      <div className="flex-1 flex flex-col md:flex-row bg-background p-8 gap-8 py-20">
        {/* Delivery info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src={deliverInfoIcon}
              alt="Delivery Info Icon"
              width={40}
              height={40}
              className="max-h-8 max-w-8 text-primary"
            />
            <h2 className="font-bold text-xl">{t("deliveryInfo")}</h2>
          </div>
          <ul className="space-y-1">
            <li>
              <span className="font-semibold">{t("monday")}: </span>12:00
              AM–3:00 AM, 8:00 AM–3:00 AM
            </li>
            <li>
              <span className="font-semibold">{t("tuesday")}: </span>8:00
              AM–3:00 AM
            </li>
            <li>
              <span className="font-semibold">{t("wednesday")}: </span>8:00
              AM–3:00 AM
            </li>
            <li>
              <span className="font-semibold">{t("thursday")}: </span>8:00
              AM–3:00 AM
            </li>
            <li>
              <span className="font-semibold">{t("friday")}: </span>8:00 AM–3:00
              AM
            </li>
            <li>
              <span className="font-semibold">{t("saturday")}: </span>8:00
              AM–3:00 AM
            </li>
            <li>
              <span className="font-semibold">{t("sunday")}: </span>8:00
              AM–12:00 AM
            </li>
            <li className="font-semibold mt-2">
              {t("estimatedTime")}: <span className="font-normal">20 min</span>
            </li>
          </ul>
        </div>
        {/* Contact info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src={contactInfoIcon}
              alt="Contact Info Icon"
              width={40}
              height={40}
              className="max-h-8 max-w-8 text-primary"
            />
            <h2 className="font-bold text-xl">{t("contactInfo")}</h2>
          </div>
          <div className="space-y-2">
            <p>{t("contactDescription")}</p>
            <div>
              <span className="font-semibold">{t("phoneNumber")}</span>
              <br />
              <span className="text-lg font-bold">+934443-43</span>
            </div>
          </div>
        </div>
      </div>
      {/* Right: Operational Times */}
      <div className="bg-[#4A4A4A] text-white flex flex-col p-8 py-20 w-1/3">
        <div className="flex items-center gap-2 mb-4">
          <Image
            src={timeIcon}
            alt="Operational Times Icon"
            width={40}
            height={40}
            className="max-h-8 max-w-8 text-primary"
          />
          <h2 className="font-bold text-xl text-white">
            {t("operationalTimes")}
          </h2>
        </div>
        <ul className="space-y-1 text-white">
          <li>
            <span className="font-semibold">{t("monday")}: </span>8:00 AM–3:00
            AM
          </li>
          <li>
            <span className="font-semibold">{t("tuesday")}: </span>8:00 AM–3:00
            AM
          </li>
          <li>
            <span className="font-semibold">{t("wednesday")}: </span>8:00
            AM–3:00 AM
          </li>
          <li>
            <span className="font-semibold">{t("thursday")}: </span>8:00 AM–3:00
            AM
          </li>
          <li>
            <span className="font-semibold">{t("friday")}: </span>8:00 AM–3:00
            AM
          </li>
          <li>
            <span className="font-semibold">{t("saturday")}: </span>8:00 AM–3:00
            AM
          </li>
          <li>
            <span className="font-semibold">{t("sunday")}: </span>8:00 AM–3:00
            AM
          </li>
        </ul>
      </div>
    </div>
  );
}
