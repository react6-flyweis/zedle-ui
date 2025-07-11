"use client";
import { ChevronDown, Settings2Icon } from "lucide-react";
import Image from "next/image";
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
import { TransactionsTable } from "@/components/wallet/TransactionsTable";
import { WithdrawDialog } from "@/components/wallet/WithdrawDialog";
import { cn } from "@/lib/utils";
import type { ITransaction } from "@/types/transaction";

const transactions: ITransaction[] = [
  {
    id: 1,
    name: "Anika Workman",
    date: "2024-12-19",
    time: "2024-12-19T12:50:00Z",
    amount: -10200,
    type: "debit",
  },
  {
    id: 2,
    name: "Maria Curtis",
    date: "2024-12-17",
    time: "2024-12-17T12:50:00Z",
    amount: -10200,
    type: "debit",
  },
  {
    id: 3,
    name: "Mira Kenter",
    date: "2024-12-18",
    time: "2024-12-18T12:50:00Z",
    amount: -10200,
    type: "debit",
  },
  {
    id: 4,
    name: "Tatiana Passaquindici Arcand",
    date: "2024-12-19",
    time: "2024-12-19T12:50:00Z",
    amount: -10200,
    type: "debit",
  },
  {
    id: 5,
    name: "Card **** **** **** 1234",
    date: "2024-12-20",
    time: "2024-12-20T12:50:00Z",
    amount: 20000,
    type: "credit",
  },
  {
    id: 6,
    name: "Tatiana Donn",
    date: "2024-12-21",
    time: "2024-12-21T12:50:00Z",
    amount: -10200,
    type: "debit",
  },
  {
    id: 7,
    name: "Anika Saris",
    date: "2024-12-22",
    time: "2024-12-22T12:50:00Z",
    amount: -10200,
    type: "debit",
  },
];

export default function CarRentalWalletPage() {
  const [filterValue, setFilterValue] = useState<string>("Daily");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

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
              <WithdrawDialog>
                <Button variant="outline" className="border-primary">
                  Withdraw
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
          <TransactionsTable transactions={transactions} />
        </CardContent>
      </Card>
    </div>
  );
}
