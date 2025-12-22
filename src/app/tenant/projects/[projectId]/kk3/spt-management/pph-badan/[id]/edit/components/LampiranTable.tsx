'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface LampiranRow {
  [key: string]: string | number;
}

interface LampiranTableProps {
  title: string;
  description: string;
  columns: string[];
  data: LampiranRow[];
  total?: string;
  onDataChange?: (data: LampiranRow[]) => void;
}

export function LampiranTable({
  title,
  description,
  columns,
  data: initialData,
  total,
  onDataChange,
}: LampiranTableProps) {
  const [data, setData] = useState(initialData);

  const handleCellChange = (rowIndex: number, columnKey: string, value: string | number) => {
    const newData = [...data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnKey]: value,
    };
    setData(newData);
    onDataChange?.(newData);
  };

  const handleAddRow = () => {
    const newRow: LampiranRow = {};
    columns.forEach((col) => {
      newRow[col.toLowerCase()] = '';
    });
    const newData = [...data, newRow];
    setData(newData);
    onDataChange?.(newData);
  };

  const handleDeleteRow = (rowIndex: number) => {
    const newData = data.filter((_, idx) => idx !== rowIndex);
    setData(newData);
    onDataChange?.(newData);
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
              {columns.map((col) => (
                <TableHead key={col} className="text-xs font-semibold text-gray-900 py-3">
                  {col}
                </TableHead>
              ))}
              <TableHead className="w-10 text-center py-3">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-b hover:bg-gray-50">
                {columns.map((col) => {
                  const columnKey = col.toLowerCase();
                  const value = row[columnKey] ?? '';
                  return (
                    <TableCell key={`${rowIndex}-${col}`} className="py-2">
                      <Input
                        value={value}
                        onChange={(e) =>
                          handleCellChange(rowIndex, columnKey, e.target.value)
                        }
                        className="h-8 text-sm"
                        placeholder={col}
                      />
                    </TableCell>
                  );
                })}
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

      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddRow}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Tambah Baris
        </Button>
        {total && (
          <div className="text-right">
            <p className="text-xs text-gray-600">Total</p>
            <p className="text-lg font-bold text-gray-900">{total}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
