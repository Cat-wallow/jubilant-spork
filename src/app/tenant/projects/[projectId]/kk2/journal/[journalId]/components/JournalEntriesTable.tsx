import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface JournalEntry {
  id: string;
  account_number: string;
  account_name: string;
  description: string;
  debit: number;
  credit: number;
}

interface JournalEntriesTableProps {
  entries: JournalEntry[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const JournalEntriesTable: React.FC<JournalEntriesTableProps> = ({ entries }) => {
  return (
    <div className="w-full rounded-[20px] border border-[rgba(145,158,171,0.20)] shadow-[0_2px_2px_0_rgba(0,0,0,0.10)] overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[100px]">Account No.</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right w-[150px]">Debits</TableHead>
            <TableHead className="text-right w-[150px]">Credits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries?.length > 0 ? (
            entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.account_number}</TableCell>
                <TableCell>{entry.account_name}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.debit)}</TableCell>
                <TableCell className="text-right">{formatCurrency(entry.credit)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                No journal entries found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
