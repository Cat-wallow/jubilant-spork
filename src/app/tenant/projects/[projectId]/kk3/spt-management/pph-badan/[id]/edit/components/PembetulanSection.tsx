'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import { useState } from 'react';

interface PembetulanData {
  namaKantor: string;
  npwpKantor: string;
  tglLaporan: string;
  namaAkuntan: string;
  npwpAkuntan: string;
  noSeriKap: string;
}

interface PembetulanSectionProps {
  data: PembetulanData;
}

export function PembetulanSection({ data }: PembetulanSectionProps) {
  const [formData, setFormData] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-purple-50 p-2">
          <FileText className="h-5 w-5 text-purple-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">PEMBETULAN / LAPORAN KEUANGAN</h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <Label htmlFor="namaKantor" className="text-sm font-medium text-gray-700">
              NAMA KANTOR/AKUNTAN PUBLIK
            </Label>
            <Input
              id="namaKantor"
              name="namaKantor"
              value={formData.namaKantor}
              onChange={handleChange}
              className="mt-1"
              placeholder="Nama kantor"
            />
          </div>
          <div>
            <Label htmlFor="npwpKantor" className="text-sm font-medium text-gray-700">
              NPWP KANTOR/AKUNTAN PUBLIK
            </Label>
            <Input
              id="npwpKantor"
              name="npwpKantor"
              value={formData.npwpKantor}
              onChange={handleChange}
              className="mt-1 font-mono"
              placeholder="xx.xxx.xxx.x-xxx.xxx"
            />
          </div>
          <div>
            <Label htmlFor="tglLaporan" className="text-sm font-medium text-gray-700">
              TGL LAPORAN
            </Label>
            <Input
              id="tglLaporan"
              name="tglLaporan"
              value={formData.tglLaporan}
              onChange={handleChange}
              className="mt-1"
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <Label htmlFor="namaAkuntan" className="text-sm font-medium text-gray-700">
              NAMA AKUNTAN PUBLIK
            </Label>
            <Input
              id="namaAkuntan"
              name="namaAkuntan"
              value={formData.namaAkuntan}
              onChange={handleChange}
              className="mt-1"
              placeholder="Nama akuntan"
            />
          </div>
          <div>
            <Label htmlFor="npwpAkuntan" className="text-sm font-medium text-gray-700">
              NPWP AKUNTAN PUBLIK
            </Label>
            <Input
              id="npwpAkuntan"
              name="npwpAkuntan"
              value={formData.npwpAkuntan}
              onChange={handleChange}
              className="mt-1 font-mono"
              placeholder="xx.xxx.xxx.x-xxx.xxx"
            />
          </div>
          <div>
            <Label htmlFor="noSeriKap" className="text-sm font-medium text-gray-700">
              NO. SERI KAP
            </Label>
            <Input
              id="noSeriKap"
              name="noSeriKap"
              value={formData.noSeriKap}
              onChange={handleChange}
              className="mt-1"
              placeholder="KAP-XXX/YYYY"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
