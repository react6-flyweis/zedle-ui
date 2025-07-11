import type { ITransaction } from "@/types/transaction";
import { DataTable } from "../DataTable";
import { transactionColumns } from "./TransactionsTableColumns";

export function TransactionsTable({
  transactions,
}: {
  transactions: ITransaction[];
}) {
  return <DataTable columns={transactionColumns} data={transactions} />;
}
