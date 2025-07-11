export interface ITransaction {
  id: number;
  name: string;
  date: string;
  time: string;
  amount: number;
  type: "credit" | "debit";
}
