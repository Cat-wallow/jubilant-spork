'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';
import { useState } from 'react';

interface IdentitasData {
  npwp: string;
  namaWajibPajak: string;
  alamat: string;
  telepon: string;
  faks: string;
  periodePembukuan: string;
  negara: string;
}

interface IdentitasSectionProps {
  data: IdentitasData;
}

export function IdentitasSection({ data }: IdentitasSectionProps) {
  const [formData, setFormData] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-blue-50 p-2">
          <Users className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">A. IDENTITAS</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <Label htmlFor="npwp" className="text-sm font-medium text-gray-700">
              N.P.W.P *
            </Label>
            <Input
              id="npwp"
              name="npwp"
              value={formData.npwp}
              onChange={handleChange}
              className="mt-1"
              placeholder="xx.xxx.xxx.x-xxx.xxx"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="namaWajibPajak" className="text-sm font-medium text-gray-700">
              NAMA WAJIB PAJAK *
            </Label>
            <Input
              id="namaWajibPajak"
              name="namaWajibPajak"
              value={formData.namaWajibPajak}
              onChange={handleChange}
              className="mt-1"
              placeholder="Nama perusahaan"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="alamat" className="text-sm font-medium text-gray-700">
            ALAMAT *
          </Label>
          <Textarea
            id="alamat"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="mt-1"
            rows={3}
            placeholder="Alamat lengkap perusahaan"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="telepon" className="text-sm font-medium text-gray-700">
              NO. TELEPON
            </Label>
            <Input
              id="telepon"
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              className="mt-1"
              placeholder="021-XXXXXXXX"
            />
          </div>
          <div>
            <Label htmlFor="faks" className="text-sm font-medium text-gray-700">
              NO. FAKS
            </Label>
            <Input
              id="faks"
              name="faks"
              value={formData.faks}
              onChange={handleChange}
              className="mt-1"
              placeholder="021-XXXXXXXX"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="periodePembukuan" className="text-sm font-medium text-gray-700">
              PERIODE PEMBUKUAN
            </Label>
            <Input
              id="periodePembukuan"
              name="periodePembukuan"
              value={formData.periodePembukuan}
              onChange={handleChange}
              className="mt-1"
              placeholder="1 Januari - 31 Desember 2024"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="negara" className="text-sm font-medium text-gray-700">
              NEGARA DOMISILI
            </Label>
            <Input
              id="negara"
              name="negara"
              value={formData.negara}
              onChange={handleChange}
              className="mt-1"
              placeholder="INDONESIA"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
