"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bagianAData, getTotalBagianA } from "../_data/mock-data";

export function BagianATable() {
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "-";
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  const total = getTotalBagianA();

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100/50">
            <TableHead className="w-12 font-normal">No</TableHead>
            <TableHead className="font-normal">Jenis Penghasilan</TableHead>
            <TableHead className="text-right font-normal">
              <div>Jumlah Penghasilan</div>
              <div className="text-xs text-gray-500">(Rupiah)</div>
            </TableHead>
            <TableHead className="text-right font-normal">
              <div>PPh Terutang</div>
              <div className="text-xs text-gray-500">(Rupiah)</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bagianAData.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="text-center">{entry.id}</TableCell>
              <TableCell>{entry.incomeType}</TableCell>
              <TableCell className="text-right font-mono text-sm text-gray-500">
                {formatCurrency(entry.incomeAmount)}
              </TableCell>
              <TableCell className="text-right font-mono text-sm text-gray-500">
                {formatCurrency(entry.pphAmount)}
              </TableCell>
            </TableRow>
          ))}

          {/* Total */}
          <TableRow className="bg-blue-50/50 font-medium">
            <TableCell colSpan={2}>JUMLAH BAGIAN A</TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCurrency(total.incomeAmount)}
            </TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCurrency(total.pphAmount)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
