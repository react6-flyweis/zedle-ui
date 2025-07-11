"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ITransaction } from "@/types/transaction";
import { DataTableColumnHeader } from "../DataTableColumnHeader";

// {
// <div>Date</div>
// <div>Time</div>
// <div className="text-right">Amount</div> */
// }

export const transactionColumns: ColumnDef<ITransaction>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       className="h-5 w-5 rounded-md border-2 border-primary bg-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:border-primary/80 transition-colors"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       className="h-5 w-5 rounded-md border-2 border-primary bg-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:border-primary/80 transition-colors"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transactions" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => {
      const time = new Date(row.getValue("time"));
      return (
        <div>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="font-medium">{formatAmount(amount)}</div>;
    },
  },
];

const formatAmount = (amount: number) => {
  const formattedAmount = Math.abs(amount).toLocaleString();
  return amount < 0 ? `-$${formattedAmount}` : `+$${formattedAmount}`;
};
