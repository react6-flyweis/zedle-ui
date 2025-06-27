import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  alt,
}) => (
  <div className="relative rounded-xl overflow-hidden shadow-lg group h-72 flex items-end bg-muted">
    <Image
      src={image}
      alt={alt}
      fill
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority={false}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
    <div className="relative z-10 p-6 w-full flex flex-col items-center">
      <h3 className="text-white text-2xl font-bold text-center">{title}</h3>
      <p className="text-white text-center mt-2">{description}</p>
      <Button
        type="button"
        variant="secondary"
        className="mt-4 bg-white/90 hover:bg-white text-black font-medium rounded-md px-4 py-2 flex items-center gap-2 transition-colors"
      >
        Show
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  </div>
);
