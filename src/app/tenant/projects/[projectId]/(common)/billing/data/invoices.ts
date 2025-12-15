export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  termin: string;
  terminPercentage: number;
  amount: number;
  status: "paid" | "unpaid";
  dueDate: string;
  aging: number;
}

export const invoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV/PRJ-2024-12-1",
    date: "2024-10-10",
    termin: "Termin 1",
    terminPercentage: 20,
    amount: 20000000,
    status: "paid",
    dueDate: "2024-10-10",
    aging: 200,
  },
  {
    id: "2",
    invoiceNumber: "INV/PRJ-2024-12-1",
    date: "2024-10-10",
    termin: "Termin 2",
    terminPercentage: 30,
    amount: 40000000,
    status: "unpaid",
    dueDate: "2024-10-10",
    aging: 200,
  },
  {
    id: "3",
    invoiceNumber: "INV/PRJ-2024-12-1",
    date: "2024-10-10",
    termin: "Termin 3",
    terminPercentage: 25,
    amount: 30000000,
    status: "unpaid",
    dueDate: "2024-10-10",
    aging: 200,
  },
  {
    id: "4",
    invoiceNumber: "INV/PRJ-2024-12-1",
    date: "2024-10-10",
    termin: "Termin 4",
    terminPercentage: 20,
    amount: 20000000,
    status: "paid",
    dueDate: "2024-10-10",
    aging: 200,
  },
  {
    id: "5",
    invoiceNumber: "INV/PRJ-2024-12-1",
    date: "2024-10-10",
    termin: "Termin 5",
    terminPercentage: 5,
    amount: 5000000,
    status: "unpaid",
    dueDate: "2024-10-10",
    aging: 200,
  },
];

export interface AgingData {
  label: string;
  count: number;
  amount: number;
  percentage: number;
}

export const agingAnalysis: AgingData[] = [
  {
    label: "0-30 Days",
    count: 1,
    amount: 100000000,
    percentage: 100,
  },
  {
    label: "31-60 Days",
    count: 1,
    amount: 100000000,
    percentage: 32,
  },
  {
    label: "61-90 Days",
    count: 1,
    amount: 100000000,
    percentage: 32,
  },
  {
    label: ">90 Days",
    count: 1,
    amount: 100000000,
    percentage: 35,
  },
];
