import Image from "next/image";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { Button } from "@/components/ui/button";

export type Room = {
  id: string;
  type: string;
  number: string;
  size: string;
  features: string;
  image: string;
  capacity: number;
};

interface RoomCardProps {
  room: Room;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const RoomCard: FC<RoomCardProps> = ({ room, onEdit, onDelete }) => {
  const t = useTranslations("roomCard");
  return (
    <div className="bg-background rounded-2xl shadow p-0 overflow-hidden flex flex-col border border-border">
      <div className="flex flex-row items-start gap-6 px-6 pt-6 pb-2">
        <div className="relative w-28 h-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={room.image}
            alt={t(room.type)}
            fill
            className="object-cover rounded-xl"
            sizes="112px"
            priority
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-2xl mb-1 text-primary">
            {t(room.type)}
          </div>
          <div className="text-base text-foreground font-semibold mb-1">
            {t("roomNo")} <span className="font-normal">{room.number}</span>
          </div>
          <div className="text-sm text-muted-foreground mb-1">
            {t("roomSizeLabel")} {room.size.replace(/x/gi, "X")}
          </div>
          <div className="text-sm text-muted-foreground">
            {room.features},{" "}
            <span className="font-bold text-primary">+{room.capacity}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-5">
        <Button
          type="button"
          className="rounded-none rounded-bl-2xl flex-1 py-4 text-lg"
          onClick={() => onEdit?.(room.id)}
        >
          {t("edit")}
        </Button>
        <Button
          type="button"
          variant="destructive"
          className="rounded-none rounded-br-2xl flex-1 py-4 text-lg font-semibold"
          onClick={() => onDelete?.(room.id)}
        >
          {t("delete")}
        </Button>
      </div>
    </div>
  );
};
