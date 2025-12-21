'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';

interface LampiranData {
  no: string;
  namaPerpajakan: string;
  npwp: string;
  kodeNo: string;
  seriPp: string;
  tanggal: string;
  dpp: string;
  ppn: string;
  ppnBM: string;
  aksi: string;
}

interface Total {
  dpp: string;
  ppn: string;
  ppnBM: string;
}

interface LampiranTableProps {
  title: string;
  description: string;
  data: LampiranData[];
  total: Total;
}

const formatCurrency = (value: string) => {
  const num = parseInt(value) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(num);
};

export function LampiranTable({ title, description, data, total }: LampiranTableProps) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Tambah Entry
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="min-w-12">No.</TableHead>
              <TableHead className="min-w-40">Nama Perpajakan</TableHead>
              <TableHead className="min-w-36">NPWP</TableHead>
              <TableHead className="min-w-24">Kode/No. Seri FP</TableHead>
              <TableHead className="min-w-24">Tanggal</TableHead>
              <TableHead className="min-w-24 text-right">DPP</TableHead>
              <TableHead className="min-w-24 text-right">PPN</TableHead>
              <TableHead className="min-w-24 text-right">PPN BM</TableHead>
              <TableHead className="min-w-20 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{row.no}</TableCell>
                <TableCell className="text-gray-600">{row.namaPerpajakan}</TableCell>
                <TableCell className="text-gray-600">{row.npwp}</TableCell>
                <TableCell className="text-gray-600">
                  <span>{row.kodeNo}</span>
                  <span className="ml-2 text-gray-400">-</span>
                  <span className="ml-2 text-gray-600">{row.seriPp}</span>
                </TableCell>
                <TableCell className="text-gray-600">{row.tanggal}</TableCell>
                <TableCell className="text-right text-gray-900">
                  {row.dpp !== '0' ? formatCurrency(row.dpp) : '0'}
                </TableCell>
                <TableCell className="text-right text-gray-900">
                  {row.ppn !== '0' ? formatCurrency(row.ppn) : '0'}
                </TableCell>
                <TableCell className="text-right text-gray-900">
                  {row.ppnBM ? formatCurrency(row.ppnBM) : '0'}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Total Row */}
      <div className="mt-4 flex justify-end gap-6 border-t pt-4">
        <div>
          <p className="text-sm font-medium text-gray-700">Total DPP</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{total.dpp}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Total PPN</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{total.ppn}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Total PPN BM</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{total.ppnBM}</p>
        </div>
      </div>
    </Card>
  );
}
