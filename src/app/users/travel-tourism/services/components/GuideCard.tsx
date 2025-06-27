import { Mail, Phone, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface GuideCardProps {
  name: string;
  email: string;
  phone: string;
  rating: number;
  image: string;
}

export function GuideCard({
  name,
  email,
  phone,
  rating,
  image,
}: GuideCardProps) {
  const t = useTranslations("GuideCard");
  return (
    <Card className="relative overflow-hidden rounded-xl shadow-md group p-0">
      <div className="relative">
        <Image
          src={image}
          alt={t("avatarAlt", { name })}
          width={400}
          height={300}
          className="object-cover w-full h-56"
        />
        {/* Rating Badge */}
        <div className="absolute top-0 right-3 z-10">
          <Badge className="bg-black text-white border-0 p-2 py-3 text-sm font-medium flex items-center rounded-t-none">
            <Star className="w-3 h-3 fill-current mr-1" />
            {rating.toFixed(1)}
          </Badge>
        </div>
      </div>
      <CardContent className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-lg">{name}</span>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> {email}
          </span>
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> {phone}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
