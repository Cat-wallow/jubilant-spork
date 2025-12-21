"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { affiliateData, getTotalInvestment, getCompanyCount } from "../_data/mock-data";

export function AffiliateTable() {
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "-";
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  const totalInvestment = getTotalInvestment();
  const companyCount = getCompanyCount();

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100/50">
            <TableHead className="w-12 text-center font-normal">No</TableHead>
            <TableHead className="font-normal">
              <div>Nama</div>
              <div className="text-xs text-gray-500">(2)</div>
            </TableHead>
            <TableHead className="font-normal">
              <div>Alamat</div>
              <div className="text-xs text-gray-500">(3)</div>
            </TableHead>
            <TableHead className="font-normal">
              <div>NPWP</div>
              <div className="text-xs text-gray-500">(4)</div>
            </TableHead>
            <TableHead className="text-right font-normal">
              <div>Jumlah Penyertaan Modal</div>
              <div>per Saham (Rupiah)</div>
              <div className="text-xs text-gray-500">(5)</div>
            </TableHead>
            <TableHead className="text-center font-normal">
              <div>Persentase</div>
              <div className="text-xs text-gray-500">(6)</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {affiliateData.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="text-center">{entry.id}</TableCell>
              <TableCell className={entry.name ? "" : "text-gray-400"}>
                {entry.name || "-"}
              </TableCell>
              <TableCell className={entry.address ? "" : "text-gray-400"}>
                {entry.address || "-"}
              </TableCell>
              <TableCell className={entry.npwp ? "font-mono text-sm" : "text-gray-400"}>
                {entry.npwp || "-"}
              </TableCell>
              <TableCell className={entry.investmentAmount ? "text-right font-mono text-sm" : "text-right text-gray-400"}>
                {formatCurrency(entry.investmentAmount)}
              </TableCell>
              <TableCell className="text-center">
                {entry.percentage ? (
                  <Badge variant="outline" className="rounded-lg border-gray-300">
                    {entry.percentage}%
                  </Badge>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}

          {/* Total */}
          <TableRow className="bg-blue-50/50 font-medium">
            <TableCell colSpan={4}>JUMLAH BAGIAN A</TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCurrency(totalInvestment)}
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="secondary" className="rounded-lg bg-gray-200">
                {companyCount} Entitas
              </Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
