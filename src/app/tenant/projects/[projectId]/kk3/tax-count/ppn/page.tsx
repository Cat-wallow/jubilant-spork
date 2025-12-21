'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';
import { StatsCards } from './components/StatsCards';
import { ppnListData } from './data/ppn-list-data';

export default function PPNPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-[#DBEAFE] text-[#193CB8]';
      case 'Completed':
        return 'bg-[#D0FAE5] text-[#006045]';
      default:
        return 'bg-[#F3F4F6] text-[#1E2939]';
    }
  };

  return (
    <div className="flex flex-col gap-[30px]">
      {/* Stats Cards */}
      <StatsCards />

      {/* PPN List Table */}
      <Card className="rounded-[20px] border-[0.8px] border-black/10">
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-6">
          <div className="flex flex-col gap-1">
            <CardTitle className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
              Daftar PPN 1111
            </CardTitle>
            <p className="font-roboto text-xs font-normal leading-4 tracking-[0.4px] text-[#2B3674]">
              Detail perhitungan PPN untuk setiap periode
            </p>
          </div>
          <Button className="gap-1 rounded-lg bg-[#08F] px-3 py-1.5">
            <Download className="h-5 w-5" />
            <span className="font-roboto text-sm font-medium leading-5 tracking-[0.1px]">
              Export
            </span>
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[rgba(0,0,0,0.10)]">
                  <TableHead className="font-arial text-sm font-semibold text-[#0A0A0A]">
                    PPN ID
                  </TableHead>
                  <TableHead className="font-arial text-sm font-semibold text-[#0A0A0A]">
                    Periode
                  </TableHead>
                  <TableHead className="font-arial text-sm font-semibold text-[#0A0A0A]">
                    Status
                  </TableHead>
                  <TableHead className="text-center font-arial text-sm font-semibold text-[#0A0A0A]">
                    Kelengkapan
                  </TableHead>
                  <TableHead className="text-right font-arial text-sm font-semibold text-[#0A0A0A]">
                    PPN Keluaran
                  </TableHead>
                  <TableHead className="text-right font-arial text-sm font-semibold text-[#0A0A0A]">
                    PPN Masukan
                  </TableHead>
                  <TableHead className="text-right font-arial text-sm font-semibold text-[#0A0A0A]">
                    Net PPN
                  </TableHead>
                  <TableHead className="text-center font-arial text-sm font-semibold text-[#0A0A0A]">
                    Effective Rate
                  </TableHead>
                  <TableHead className="text-center font-arial text-sm font-semibold text-[#0A0A0A]">
                    Total Transaksi
                  </TableHead>
                  <TableHead className="text-center font-arial text-sm font-semibold text-[#0A0A0A]">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ppnListData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-[rgba(0,0,0,0.10)] hover:bg-[#F9FAFB] transition-colors"
                  >
                    <TableCell className="font-[Consolas] text-sm font-bold text-[#0A0A0A]">
                      {item.id}
                    </TableCell>
                    <TableCell className="font-arial text-sm text-[#0A0A0A]">
                      {item.periode}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`rounded-lg border-0 px-2 py-0.5 font-arial text-xs font-normal ${getStatusBadgeColor(item.status)}`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-arial text-sm text-[#0A0A0A]">
                      {item.completeness}%
                    </TableCell>
                    <TableCell className="text-right font-[Consolas] text-sm text-[#00A63E]">
                      {formatCurrency(item.ppnKeluaran)}
                    </TableCell>
                    <TableCell className="text-right font-[Consolas] text-sm text-[#155DFC]">
                      {formatCurrency(item.ppnMasukan)}
                    </TableCell>
                    <TableCell className="text-right font-[Consolas] text-sm text-[#E7000B]">
                      {formatCurrency(item.netPPN)}
                    </TableCell>
                    <TableCell className="text-center font-arial text-sm text-[#0A0A0A]">
                      {item.effectiveRate}%
                    </TableCell>
                    <TableCell className="text-center font-arial text-sm text-[#0A0A0A]">
                      {item.totalTransaction}
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        href={`/tenant/projects/${projectId}/kk3/tax-count/ppn/${item.id}/overview`}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-[#F4F7FE]"
                        >
                          <Eye className="h-4 w-4 text-[#0A0A0A]" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
