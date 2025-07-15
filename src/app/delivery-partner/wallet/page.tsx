"use client";
import { ChevronDown, Settings2Icon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import walletIcon from "@/assets/icons/wallet.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WithdrawDialog } from "@/components/wallet/WithdrawDialog";
import { cn } from "@/lib/utils";

// Mock transaction data
const transactions = [
  {
    id: 1,
    name: "Anika Workman",
    date: "Dec 19th, 2024",
    time: "12:50 PM",
    amount: -10200,
    type: "debit",
  },
  {
    id: 2,
    name: "Maria Curtis",
    date: "Dec 17th, 2024",
    time: "12:50 PM",
    amount: -10200,
    type: "debit",
  },
  {
    id: 3,
    name: "Mira Kenter",
    date: "Dec 18th, 2024",
    time: "12:50 PM",
    amount: -10200,
    type: "debit",
  },
  {
    id: 4,
    name: "Tatiana Passaquindici Arcand",
    date: "Dec 19th, 2024",
    time: "12:50 PM",
    amount: -10200,
    type: "debit",
  },
  {
    id: 5,
    name: "Card **** **** **** 1234",
    date: "Dec 20th, 2024",
    time: "12:50 PM",
    amount: 20000,
    type: "credit",
  },
  {
    id: 6,
    name: "Tatiana Donn",
    date: "Dec 21st, 2024",
    time: "12:50 PM",
    amount: -10200,
    type: "debit",
  },
  {
    id: 7,
    name: "Anika Saris",
    date: "Dec 22nd, 2024",
    time: "12:50 PM",
    amount: -10200,
    type: "debit",
  },
];

export default function WalletPage() {
  const t = useTranslations("wallet");
  const [filterValue, setFilterValue] = useState<string>("Daily");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const formatAmount = (amount: number) => {
    const formattedAmount = Math.abs(amount).toLocaleString();
    return amount < 0 ? `-$${formattedAmount}` : `+$${formattedAmount}`;
  };

  const handleWithDraw = () => {
    // Handle withdraw logic here
    console.log("Withdraw amount:", withdrawAmount);
    setWithdrawOpen(false);
    setWithdrawAmount("");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Wallet Balance Card */}
      <Card className="border-0 p-0 gap-0">
        <CardHeader className="pt-4">
          <CardTitle className="text-lg font-semibold">
            {t("walletBalanceTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center flex-col md:flex-row gap-3 justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={walletIcon}
                alt="Wallet Icon"
                className="max-h-10 max-w-10"
                width={50}
                height={50}
              />
              <span className="text-3xl font-bold">$14,235.34</span>
              <span className="text-lg opacity-90">USD</span>
            </div>
            <div className="flex gap-2">
              {/* Withdraw Dialog */}
              <WithdrawDialog>
                <Button variant="outline" className="border-primary">
                  {t("withdraw")}
                </Button>
              </WithdrawDialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {t("walletBreakdownTitle")}
            </CardTitle>
            <DropdownMenu
              open={filterMenuOpen}
              onOpenChange={setFilterMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 h-12 bg-primary text-white hover:bg-primary/90 hover:text-white px-4 py-2 shadow-none border-none min-w-[140px] justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Settings2Icon className="w-4 h-4" />
                    {t("filterBy")}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 ml-2 transition-transform duration-200",
                      filterMenuOpen && "rotate-180",
                    )}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-primary text-white p-0 min-w-[140px] border-0 shadow-lg rounded-lg origin-top animate-slideDown"
              >
                {[
                  t("filterByOptions.daily"),
                  t("filterByOptions.weekly"),
                  t("filterByOptions.monthly"),
                  t("filterByOptions.yearly"),
                ].map((option) => {
                  return (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setFilterValue(option)}
                      className={`px-4 py-2 cursor-pointer hover:bg-primary/80 transition-colors ${
                        filterValue === option
                          ? "bg-primary/80 font-semibold"
                          : ""
                      }`}
                    >
                      {option}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="">
          {/* Table Header */}
          <div className="bg-primary text-white px-6 py-4 rounded-md">
            <div className="grid grid-cols-4 gap-4 font-medium">
              <div>{t("tableHeaders.transactions")}</div>
              <div>{t("tableHeaders.date")}</div>
              <div>{t("tableHeaders.time")}</div>
              <div className="text-right">{t("tableHeaders.amount")}</div>
            </div>
          </div>

          {/* Transaction Rows */}
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={cn(
                  "px-6 py-4 hover:bg-gray-50 transition-colors",
                  index % 2 === 1 && "bg-gray-50/50",
                )}
              >
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="font-medium text-gray-900">
                    {transaction.name}
                  </div>
                  <div className="text-gray-600">{transaction.date}</div>
                  <div className="text-gray-600">{transaction.time}</div>
                  <div className="text-right">
                    <span
                      className={cn(
                        "font-semibold",
                        transaction.type === "credit"
                          ? "text-green-600"
                          : "text-red-600",
                      )}
                    >
                      {formatAmount(transaction.amount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
