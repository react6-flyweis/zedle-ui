import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  additionalDescription?: string;
  image: StaticImageData | string;
  reverse?: boolean;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  additionalDescription,
  image,
  reverse = false,
  className,
}: ServiceCardProps) {
  return (
    <div className={cn("grid grid-cols-8 gap-0 mb-16 relative", className)}>
      {/* Image Section - 6 columns */}
      <div
        className={cn(
          "col-span-5 row-start-1 relative z-10",
          reverse ? "col-start-4" : "col-start-1",
        )}
      >
        <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      </div>

      {/* Text Section - 4 columns overlapping */}
      <div
        className={cn(
          "col-span-4 row-start-1 flex flex-col justify-center",
          reverse ? "col-start-1" : "col-start-5",
        )}
      >
        <div className="flex flex-col justify-center space-y-6 bg-[#4A4A4A] p-8 rounded-2xl shadow-lg relative z-20">
          <h3 className="text-3xl font-bold text-white">{title}</h3>
          <div className="space-y-4 text-gray-50">
            <p className="leading-relaxed">{description}</p>
            {additionalDescription && (
              <p className="leading-relaxed">{additionalDescription}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
