"use client";
import { ChevronDown, Settings2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import walletIcon from "@/assets/icons/wallet.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center justify-between">
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
              <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-primary">
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader className="space-y-4">
                    <DialogTitle className="text-xl font-semibold text-left">
                      Enter Your withdraw Amount
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="redeem-amount"
                        className="text-sm font-medium text-gray-700"
                      >
                        Enter your amount
                      </label>
                      <Input
                        id="redeem-amount"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="h-12 text-base"
                      />
                    </div>
                    <Button
                      onClick={handleWithDraw}
                      className="w-full h-12 font-medium"
                      disabled={!withdrawAmount.trim()}
                    >
                      NEXT
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Breakdown */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Wallet Balance Breakdown
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
                    Filter by
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
                {["Daily", "Weekly", "Monthly", "Yearly"].map((option) => {
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
              <div>Transactions</div>
              <div>Date</div>
              <div>Time</div>
              <div className="text-right">Amount</div>
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
