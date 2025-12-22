'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BagianARow {
  no: number;
  jenisnya: string;
  jumlah: string;
  tarif: string;
  pphTerutang: string;
}

interface BagianBRow {
  no: number;
  jenisnya: string;
  penghasilan: string;
}

interface LampiranIVSectionProps {
  title: string;
  bagianA: {
    title: string;
    data: BagianARow[];
    summary: { total: string; totalTax: string };
  };
  bagianB: {
    title: string;
    data: BagianBRow[];
    summary: { total: string };
  };
}

export function LampiranIVSection({
  title,
  bagianA,
  bagianB,
}: LampiranIVSectionProps) {
  const [bagianAData, setBagianAData] = useState(bagianA.data);
  const [bagianBData, setBagianBData] = useState(bagianB.data);

  const handleBagianAChange = (
    rowIndex: number,
    field: keyof BagianARow,
    value: string | number
  ) => {
    const newData = [...bagianAData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [field]: value,
    };
    setBagianAData(newData);
  };

  const handleBagianBChange = (
    rowIndex: number,
    field: keyof BagianBRow,
    value: string
  ) => {
    const newData = [...bagianBData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [field]: value,
    };
    setBagianBData(newData);
  };

  const handleAddRowA = () => {
    const newRow: BagianARow = {
      no: bagianAData.length + 1,
      jenisnya: '',
      jumlah: '',
      tarif: '',
      pphTerutang: '',
    };
    setBagianAData([...bagianAData, newRow]);
  };

  const handleAddRowB = () => {
    const newRow: BagianBRow = {
      no: bagianBData.length + 1,
      jenisnya: '',
      penghasilan: '',
    };
    setBagianBData([...bagianBData, newRow]);
  };

  const handleDeleteRowA = (rowIndex: number) => {
    setBagianAData(bagianAData.filter((_, idx) => idx !== rowIndex));
  };

  const handleDeleteRowB = (rowIndex: number) => {
    setBagianBData(bagianBData.filter((_, idx) => idx !== rowIndex));
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>

      <Tabs defaultValue="bagian-a" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bagian-a">BAGIAN A: PPh FINAL</TabsTrigger>
          <TabsTrigger value="bagian-b">BAGIAN B: Penghasilan Tidak Kena Pajak</TabsTrigger>
        </TabsList>

        <TabsContent value="bagian-a" className="mt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-12 text-xs font-semibold text-gray-900 py-3 text-center">
                    No
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-900 py-3">
                    Jenis Penghasilan
                  </TableHead>
                  <TableHead className="w-32 text-xs font-semibold text-gray-900 py-3 text-right">
                    Jumlah (Rp)
                  </TableHead>
                  <TableHead className="w-24 text-xs font-semibold text-gray-900 py-3 text-center">
                    Tarif
                  </TableHead>
                  <TableHead className="w-32 text-xs font-semibold text-gray-900 py-3 text-right">
                    PPh Terutang (Rp)
                  </TableHead>
                  <TableHead className="w-10 text-center py-3">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bagianAData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="border-b hover:bg-gray-50">
                    <TableCell className="py-2 text-center text-sm">{row.no}</TableCell>
                    <TableCell className="py-2">
                      <Input
                        value={row.jenisnya}
                        onChange={(e) =>
                          handleBagianAChange(rowIndex, 'jenisnya', e.target.value)
                        }
                        className="h-8 text-sm"
                        placeholder="Jenis penghasilan"
                      />
                    </TableCell>
                    <TableCell className="py-2">
                      <Input
                        value={row.jumlah}
                        onChange={(e) =>
                          handleBagianAChange(rowIndex, 'jumlah', e.target.value)
                        }
                        className="h-8 text-sm text-right"
                        type="number"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell className="py-2">
                      <Input
                        value={row.tarif}
                        onChange={(e) =>
                          handleBagianAChange(rowIndex, 'tarif', e.target.value)
                        }
                        className="h-8 text-sm text-center"
                        placeholder="%"
                      />
                    </TableCell>
                    <TableCell className="py-2">
                      <Input
                        value={row.pphTerutang}
                        onChange={(e) =>
                          handleBagianAChange(rowIndex, 'pphTerutang', e.target.value)
                        }
                        className="h-8 text-sm text-right"
                        type="number"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell className="text-center py-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRowA(rowIndex)}
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
              onClick={handleAddRowA}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Tambah Baris
            </Button>
            <div className="flex gap-8">
              <div className="text-right bg-blue-50 px-4 py-2 rounded">
                <p className="text-xs text-gray-600">Total</p>
                <p className="text-lg font-bold text-gray-900">{bagianA.summary.total}</p>
              </div>
              <div className="text-right bg-blue-50 px-4 py-2 rounded">
                <p className="text-xs text-gray-600">Total PPh</p>
                <p className="text-lg font-bold text-gray-900">{bagianA.summary.totalTax}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bagian-b" className="mt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-12 text-xs font-semibold text-gray-900 py-3 text-center">
                    No
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-gray-900 py-3">
                    Jenis Penghasilan
                  </TableHead>
                  <TableHead className="w-32 text-xs font-semibold text-gray-900 py-3 text-right">
                    Penghasilan Diterima (Rp)
                  </TableHead>
                  <TableHead className="w-10 text-center py-3">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bagianBData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="border-b hover:bg-gray-50">
                    <TableCell className="py-2 text-center text-sm">{row.no}</TableCell>
                    <TableCell className="py-2">
                      <Input
                        value={row.jenisnya}
                        onChange={(e) =>
                          handleBagianBChange(rowIndex, 'jenisnya', e.target.value)
                        }
                        className="h-8 text-sm"
                        placeholder="Jenis penghasilan"
                      />
                    </TableCell>
                    <TableCell className="py-2">
                      <Input
                        value={row.penghasilan}
                        onChange={(e) =>
                          handleBagianBChange(rowIndex, 'penghasilan', e.target.value)
                        }
                        className="h-8 text-sm text-right"
                        type="number"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell className="text-center py-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRowB(rowIndex)}
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
              onClick={handleAddRowB}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Tambah Baris
            </Button>
            <div className="text-right bg-green-50 px-4 py-2 rounded">
              <p className="text-xs text-gray-600">Total</p>
              <p className="text-lg font-bold text-gray-900">{bagianB.summary.total || '-'}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
