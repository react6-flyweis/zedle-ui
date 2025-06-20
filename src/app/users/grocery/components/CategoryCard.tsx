import Image, { type StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  image: string | StaticImageData;
  bgColor: string;
  textColor: string;
}

export default function CategoryCard({
  title,
  image,
  bgColor,
  textColor,
}: CategoryCardProps) {
  return (
    <Card
      className={`${bgColor} border-0 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group relative overflow-hidden h-48 p-0`}
    >
      <CardContent className="p-6 h-full relative">
        {/* Gradient overlay for top left */}
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-tr from-black/10 via-transparent to-transparent z-5"></div>

        {/* Title positioned at top left */}
        <div className="absolute top-4 left-4 z-10">
          <h3
            className={`text-xl font-bold ${textColor} leading-tight max-w-[70%]`}
          >
            {title}
          </h3>
        </div>

        {/* Image positioned at bottom right, extending 2/3 out */}
        <div className="absolute -bottom-24 -right-7 size-60 group-hover:scale-105 transition-transform duration-300">
          <Image
            src={image}
            alt={title}
            className="object-contain max-h-full max-w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
