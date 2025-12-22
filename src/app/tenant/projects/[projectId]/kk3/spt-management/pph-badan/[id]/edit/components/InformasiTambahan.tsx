'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

interface InformasiTambahanProps {
  tanggalPembuatan: string;
  deadlinePenyampaian: string;
  autoFillStatus: string;
  dataSource: string;
  terakhirDiubah: string;
}

export function InformasiTambahan({
  tanggalPembuatan,
  deadlinePenyampaian,
  autoFillStatus,
  dataSource,
  terakhirDiubah,
}: InformasiTambahanProps) {
  return (
    <Card className="p-6 bg-gray-50">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">INFORMASI TAMBAHAN</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Tanggal Pembuatan</h3>
          <p className="mt-2 text-base text-gray-900">{tanggalPembuatan}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Deadline Penyampaian</h3>
          <p className="mt-2 text-base font-bold text-red-600">{deadlinePenyampaian}</p>
        </div>

        <div className="sm:col-span-2">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Auto-Fill Status</h3>
          <div className="flex flex-col gap-3">
            <Badge className="w-fit bg-green-100 text-green-800 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              {autoFillStatus}
            </Badge>
            <p className="text-xs text-gray-600">{dataSource}</p>
          </div>
        </div>

        <div className="sm:col-span-2">
          <h3 className="text-sm font-medium text-gray-700">Terakhir Diubah</h3>
          <p className="mt-2 text-base text-gray-900">{terakhirDiubah}</p>
        </div>
      </div>
    </Card>
  );
}
