'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface LampiranRow {
  no: number;
  keterangan: string;
  jml: string;
  keterangan2: string;
  total: number;
}

interface LampiranIISectionProps {
  title: string;
  description: string;
  data: LampiranRow[];
  summary: { total: string };
}

export function LampiranIISection({
  title,
  description,
  data: initialData,
  summary,
}: LampiranIISectionProps) {
  const [data, setData] = useState(initialData);

  const handleCellChange = (rowIndex: number, field: keyof LampiranRow, value: string | number) => {
    const newData = [...data];
    if (field === 'total' || field === 'no') {
      newData[rowIndex] = {
        ...newData[rowIndex],
        [field]: Number(value),
      };
    } else {
      newData[rowIndex] = {
        ...newData[rowIndex],
        [field]: value,
      };
    }
    setData(newData);
  };

  const handleAddRow = () => {
    const newRow: LampiranRow = {
      no: data.length + 1,
      keterangan: '',
      jml: '',
      keterangan2: '',
      total: 0,
    };
    setData([...data, newRow]);
  };

  const handleDeleteRow = (rowIndex: number) => {
    setData(data.filter((_, idx) => idx !== rowIndex));
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-12 text-xs font-semibold text-gray-900 py-3 text-center">
                No
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-900 py-3">Keterangan</TableHead>
              <TableHead className="w-32 text-xs font-semibold text-gray-900 py-3">Jml</TableHead>
              <TableHead className="text-xs font-semibold text-gray-900 py-3">Keterangan</TableHead>
              <TableHead className="w-24 text-xs font-semibold text-gray-900 py-3 text-right">Total</TableHead>
              <TableHead className="w-10 text-center py-3">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-b hover:bg-gray-50">
                <TableCell className="py-2 text-center">{row.no}</TableCell>
                <TableCell className="py-2">
                  <Input
                    value={row.keterangan}
                    onChange={(e) => handleCellChange(rowIndex, 'keterangan', e.target.value)}
                    className="h-8 text-sm"
                    placeholder="Keterangan"
                  />
                </TableCell>
                <TableCell className="py-2">
                  <Input
                    value={row.jml}
                    onChange={(e) => handleCellChange(rowIndex, 'jml', e.target.value)}
                    className="h-8 text-sm"
                    placeholder="Jumlah"
                  />
                </TableCell>
                <TableCell className="py-2">
                  <Input
                    value={row.keterangan2}
                    onChange={(e) => handleCellChange(rowIndex, 'keterangan2', e.target.value)}
                    className="h-8 text-sm"
                    placeholder="Keterangan"
                  />
                </TableCell>
                <TableCell className="py-2 text-right">
                  <Input
                    value={row.total}
                    onChange={(e) => handleCellChange(rowIndex, 'total', e.target.value)}
                    className="h-8 text-sm text-right"
                    type="number"
                    placeholder="0"
                  />
                </TableCell>
                <TableCell className="text-center py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRow(rowIndex)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddRow}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Tambah Baris
        </Button>
        <div className="text-right bg-gray-50 px-4 py-2 rounded">
          <p className="text-xs text-gray-600">JUMLAH</p>
          <p className="text-lg font-bold text-gray-900">{summary.total}</p>
        </div>
      </div>
    </Card>
  );
}
