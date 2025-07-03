import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SuccessToast } from "../SuccessToast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { BankSelectionDialog } from "./BankSelectionDialog";

export function WithdrawDialog({ children }: { children: React.ReactNode }) {
  const t = useTranslations("withdraw");
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [showBankDialog, setShowBankDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleWithdrawConfirm = () => {
    setWithdrawAmount("");
    setSelectedBank(null);
    setShowBankDialog(false);
    setWithdrawOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <>
      <Dialog
        open={withdrawOpen}
        onOpenChange={(open) => {
          setWithdrawOpen(open);
        }}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-xl font-semibold text-left">
              {t("enterAmountTitle")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <label
                htmlFor="redeem-amount"
                className="text-sm font-medium text-gray-700"
              >
                {t("enterAmountLabel")}
              </label>
              <Input
                id="redeem-amount"
                placeholder={t("enterAmountPlaceholder")}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <Button
              onClick={() => setShowBankDialog(true)}
              className="w-full h-12 font-medium"
              disabled={!withdrawAmount.trim()}
            >
              {t("next")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <BankSelectionDialog
        open={showBankDialog}
        onClose={handleWithdrawConfirm}
        onSelect={setSelectedBank}
      />
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
          <SuccessToast
            title={t("successTitle")}
            description={t("successDescription")}
          />
        </div>
      )}
    </>
  );
}
