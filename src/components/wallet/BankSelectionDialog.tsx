import { PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import americanBank from "@/assets/icons/american-bank.png";
import unionBank from "@/assets/icons/union-bank.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface BankSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

const banks = [
  {
    id: "1",
    name: "UN Bank",
    logo: unionBank,
    account: "**** **** **** 7868",
  },
  {
    id: "2",
    name: "American Bank",
    logo: americanBank,
    account: "**** **** **** 7868",
  },
];

export function BankSelectionDialog({
  open,
  onClose,
  onSelect,
}: BankSelectionDialogProps) {
  const t = useTranslations("withdraw");
  const [localSelected, setLocalSelected] = useState<string | null>(null);

  const handleWithdraw = () => {
    // Handle withdraw logic here
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl rounded-2xl bg-white">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold text-left">
            {t("selectBankTitle")}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {t("selectBankDescription")}
          </p>
        </DialogHeader>
        <div className="space-y-3">
          {banks.map((bank) => (
            <button
              key={bank.id}
              type="button"
              className={cn(
                "flex items-center justify-between rounded-xl border px-4 py-3 cursor-pointer transition-all w-full text-left",
                { "bg-green-300": localSelected === bank.id },
              )}
              onClick={() => {
                setLocalSelected(bank.id);
                onSelect(bank.id);
              }}
              aria-pressed={localSelected === bank.id}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={bank.logo}
                  alt={bank.name}
                  width={48}
                  height={48}
                  className="rounded-md object-contain"
                />
                <div>
                  <div className="font-medium text-base text-gray-900">
                    {bank.name}
                  </div>
                  <div className="text-xs text-gray-500">{bank.account}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          <Button
            className="w-full rounded-full  text-white"
            onClick={handleWithdraw}
            disabled={!localSelected}
          >
            {t("withdraw")}
          </Button>
          <Button className="w-full rounded-full ">
            <PlusCircle className="w-5 h-5" />
            {t("addNewBank")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
