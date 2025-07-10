import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BusinessTypeCardProps {
  label: string;
  image: string;
  highlighted: boolean;
}

export function BusinessTypeCard({
  label,
  image,
  highlighted,
}: BusinessTypeCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 border border-primary rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-background",
        highlighted ? "bg-primary shadow-lg" : "",
        "relative",
      )}
    >
      <Image
        src={image}
        alt={label}
        width={80}
        height={80}
        className={cn(
          "object-cover w-20 h-20 transition-all",
          highlighted ? "rounded-md scale-110" : "rounded-full",
        )}
      />
      <span
        className={cn(
          "mt-2 text-sm font-medium text-center block w-[120px] truncate",
          highlighted ? "text-primary" : "text-foreground",
        )}
      >
        {label}
      </span>
    </div>
  );
}
