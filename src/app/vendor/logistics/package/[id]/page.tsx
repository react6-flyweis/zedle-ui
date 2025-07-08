import Image from "next/image";
import { useTranslations } from "next-intl";
import mailIcon from "@/assets/icons/email.png";
import phoneIcon from "@/assets/icons/phone.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import packagesBgImage from "../../assets/package-bg.jpg";
import { PackageDetailsForm } from "../../components/PackageDetailsForm";

export default function PackageDetailsPage() {
  const t = useTranslations("");
  return (
    <div className="">
      <div
        className="h-72 bg-cover flex flex-col justify-center items-center bg-center text-white"
        style={{ backgroundImage: `url(${packagesBgImage.src})` }}
      >
        <h1 className="text-5xl font-bold ">{t("packageDetails.title")}</h1>
        <p className="text-xl mt-2">{t("packageDetails.description")}</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full p-8 max-w-5xl">
          {/* User Info Section */}
          <div className="flex items-center gap-4 bg-muted rounded-t-lg mb-6">
            <Avatar className="size-24 border border-zinc-300">
              <AvatarImage
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&q=80"
                alt={t("availableDrivers.driverName")}
              />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xl font-semibold text-foreground mb-3">
                Chance Septimus
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <Image
                  src={mailIcon}
                  alt={t("availableDrivers.emailAddress")}
                  width={50}
                  height={50}
                  className="inline-block max-h-5 max-w-5"
                />
                <span className="font-bold">
                  {t("availableDrivers.emailAddress")}: chanceseptimus@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <Image
                  src={phoneIcon}
                  alt={t("availableDrivers.mobileNumber")}
                  width={50}
                  height={50}
                  className="inline-block max-h-5 max-w-5"
                />
                <span className="font-bold">
                  {t("availableDrivers.mobileNumber")}: +19876543210
                </span>
              </div>
            </div>
          </div>
          <PackageDetailsForm />
        </div>
      </div>
    </div>
  );
}
