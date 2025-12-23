'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';

interface IdentitasData {
  npwp: string;
  namaWajibPajak: string;
  kodeKlu: string;
  alamat: string;
  email: string;
  telepon: string;
  periode: string;
  tahun: string;
}

interface IdentitasSectionProps {
  data: IdentitasData;
}

export function IdentitasSection({ data }: IdentitasSectionProps) {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-blue-50 p-2">
          <Users className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Identitas Wajib Pajak</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label className="text-sm font-medium text-gray-700">NPWP *</Label>
          <Input
            defaultValue={data.npwp}
            className="mt-1"
            readOnly
            disabled
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Periode *</Label>
          <Input
            defaultValue={data.periode}
            className="mt-1"
            readOnly
            disabled
          />
        </div>

        <div className="sm:col-span-2">
          <Label className="text-sm font-medium text-gray-700">
            Nama Wajib Pajak *
          </Label>
          <Input
            defaultValue={data.namaWajibPajak}
            className="mt-1"
            readOnly
            disabled
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Kode KLU</Label>
          <Input
            defaultValue={data.kodeKlu}
            className="mt-1"
            readOnly
            disabled
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Telepon</Label>
          <Input
            defaultValue={data.telepon}
            className="mt-1"
            readOnly
            disabled
          />
        </div>

        <div className="sm:col-span-2">
          <Label className="text-sm font-medium text-gray-700">Alamat</Label>
          <Input
            defaultValue={data.alamat}
            className="mt-1"
            readOnly
            disabled
          />
        </div>

        <div className="sm:col-span-2">
          <Label className="text-sm font-medium text-gray-700">Email</Label>
          <Input
            defaultValue={data.email}
            className="mt-1"
            readOnly
            disabled
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700">Tahun</Label>
          <Input
            defaultValue={data.tahun}
            className="mt-1"
            readOnly
            disabled
          />
        </div>
      </div>
    </Card>
  );
}
