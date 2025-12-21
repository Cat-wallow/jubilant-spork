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
import { taxCreditData, getSubtotalByCode, getTotalAmount } from "../_data/mock-data";

export function TaxCreditTable() {
  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`;
  };

  const code7Subtotal = getSubtotalByCode(7);
  const code15Subtotal = getSubtotalByCode(15);
  const totalAmount = getTotalAmount();

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100/50">
            <TableHead className="text-center font-normal">No</TableHead>
            <TableHead className="font-normal">
              <div>Nama</div>
              <div className="text-xs text-gray-500">(Pemotong/Pemungut Pajak)</div>
            </TableHead>
            <TableHead className="font-normal">NPWP</TableHead>
            <TableHead className="font-normal">
              <div>Jenis Penghasilan yang</div>
              <div>Dipotong/Dipungut</div>
              <div className="text-xs text-gray-500">(1)</div>
            </TableHead>
            <TableHead className="text-center font-normal">
              <div>Kode Penghasilan</div>
              <div>yang Dipotong/Dipungut</div>
              <div className="text-xs text-gray-500">(2)</div>
            </TableHead>
            <TableHead className="text-right font-normal">
              <div>PPh yang</div>
              <div>Dipotong/Dipungut</div>
              <div className="text-xs text-gray-500">(Rupiah) (3)</div>
            </TableHead>
            <TableHead className="text-right font-normal">
              <div>Sub Jumlah per Jenis</div>
              <div>Penghasilan dengan</div>
              <div>Kode yang Sama</div>
              <div className="text-xs text-gray-500">(Rupiah)</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taxCreditData.map((entry, index) => (
            <TableRow key={entry.id}>
              <TableCell className="text-center">{entry.id}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell className="font-mono text-sm">{entry.npwp}</TableCell>
              <TableCell>{entry.incomeType}</TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="rounded-lg border-gray-300">
                  {entry.incomeCode}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-mono text-sm">
                {formatCurrency(entry.pphAmount)}
              </TableCell>
              <TableCell className="text-right font-mono text-sm">-</TableCell>
            </TableRow>
          ))}
          
          {/* Subtotal Kode 7 */}
          <TableRow className="bg-blue-50/50">
            <TableCell colSpan={4}>
              Sub Total - Jasa Konsultasi & Teknik (Kode 7)
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="secondary" className="rounded-lg bg-gray-200">
                7
              </Badge>
            </TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCurrency(code7Subtotal)}
            </TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCurrency(code7Subtotal)}
            </TableCell>
          </TableRow>

          {/* Subtotal Kode 15 */}
          <TableRow className="bg-green-50/50">
            <TableCell colSpan={4}>
              Sub Total - Jasa Lainnya (Kode 15)
            </TableCell>
            <TableCell className="text-center">
              <Badge variant="secondary" className="rounded-lg bg-gray-200">
                15
              </Badge>
            </TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCurrency(code15Subtotal)}
            </TableCell>
            <TableCell className="text-right font-mono text-sm">
              {formatCurrency(code15Subtotal)}
            </TableCell>
          </TableRow>

          {/* Total */}
          <TableRow className="bg-orange-50/50">
            <TableCell colSpan={4}>JUMLAH TOTAL</TableCell>
            <TableCell className="text-center">
              <Badge variant="outline" className="rounded-lg border-gray-300">
                ALL
              </Badge>
            </TableCell>
            <TableCell className="text-right font-mono text-sm font-medium">
              {formatCurrency(totalAmount)}
            </TableCell>
            <TableCell className="text-right font-mono text-sm font-medium">
              {formatCurrency(totalAmount)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
