import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

export function ServiceCard({
  title,
  description,
  price,
  imageUrl,
}: ServiceCardProps) {
  return (
    <Card className="bg-white shadow-sm overflow-hidden py-3">
      <CardContent className="flex px-3">
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <p className="font-semibold text-lg">{price}</p>
        </div>
        <div className="w-24 h-full relative flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
