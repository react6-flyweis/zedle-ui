import { Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface OfferCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  title,
  description,
  price,
  image,
}) => {
  return (
    <Card className="flex flex-row items-stretch rounded-2xl shadow-md p-0 overflow-hidden bg-white/90 border border-gray-100">
      <div className="flex flex-col justify-between flex-1 p-6">
        <div>
          <h4 className="font-bold text-lg leading-snug mb-2 text-gray-900">
            {title}
          </h4>
          <p className="text-gray-500 text-sm leading-snug mb-4">
            {description}
          </p>
        </div>
        <span className="font-bold text-xl text-gray-900">
          ${price.toFixed(2)}
        </span>
      </div>
      <div className="relative w-44 h-full flex-shrink-0 flex items-center justify-center p-5">
        <Image
          src={image}
          alt={title}
          width={120}
          height={120}
          className="object-cover w-full h-full object-center rounded-lg drop-shadow-md"
          priority
        />
        <div className="absolute bottom-5 right-5 rounded-tl-3xl p-2 flex justify-center items-center bg-white/80">
          <Button
            size="icon"
            variant="secondary"
            className="bg-gray-800  rounded-full"
          >
            <Plus className="size-5 text-white" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
