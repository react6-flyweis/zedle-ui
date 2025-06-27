import { Send, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TourCardProps {
  image: string;
  title: string;
  rating: number;
}

export function TourCard({ image, title, rating }: TourCardProps) {
  const t = useTranslations("tour");
  return (
    <Card className="relative overflow-hidden rounded-md shadow-md group gap-1 p-0">
      <div className="relative h-52 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardContent className="absolute bottom-0 left-0 w-full p-4 z-10 flex flex-col items-center">
        <span className="text-lg font-semibold text-white drop-shadow mb-1">
          {title}
        </span>
        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
          <span className="text-white text-sm font-medium">{rating}</span>
        </div>
        <Button
          size="sm"
          variant="secondary"
          className="mt-auto px-4 py-2 text-sm font-medium rounded"
        >
          <Send className="w-4 h-4 mr-2" />
          {t("showButton")}
        </Button>
      </CardContent>
    </Card>
  );
}
