'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface PenghasilanData {
  penghasilanNetoFiskal: string;
  kompensasiKerugian: string;
  penghasilanKenaPajak: string;
}

interface PenghasilanSectionProps {
  data: PenghasilanData;
}

export function PenghasilanSection({ data }: PenghasilanSectionProps) {
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
        <div className="rounded-lg bg-teal-50 p-2">
          <TrendingUp className="h-5 w-5 text-teal-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">C. PENGHASILAN DAN PENYESUAIAN FISKAL</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="penghasilanNetoFiskal" className="text-sm font-medium text-gray-700">
              1. PENGHASILAN NETO FISKAL
            </Label>
            <Input
              id="penghasilanNetoFiskal"
              name="penghasilanNetoFiskal"
              value={formData.penghasilanNetoFiskal}
              onChange={handleChange}
              className="mt-1"
              placeholder="Rp 0"
              type="number"
            />
          </div>
          <div className="text-right pt-8">
            <span className="text-sm text-gray-600">1</span>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label htmlFor="kompensasiKerugian" className="text-sm font-medium text-gray-700">
              2. KOMPENSASI KERUGIAN FISKAL
            </Label>
            <Input
              id="kompensasiKerugian"
              name="kompensasiKerugian"
              value={formData.kompensasiKerugian}
              onChange={handleChange}
              className="mt-1 bg-gray-50"
              placeholder="-"
              disabled
            />
          </div>
          <div className="text-right pt-8">
            <span className="text-sm text-gray-600">2</span>
          </div>
        </div>

        <div className="border-t border-blue-200 bg-blue-50 p-4 rounded">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="penghasilanKenaPajak" className="text-sm font-medium text-gray-700">
                3. PENGHASILAN KENA PAJAK (1-2)
              </Label>
              <Input
                id="penghasilanKenaPajak"
                name="penghasilanKenaPajak"
                value={formData.penghasilanKenaPajak}
                onChange={handleChange}
                className="mt-1 bg-white font-bold"
                placeholder="Rp 0"
                type="number"
              />
            </div>
            <div className="text-right pt-8">
              <span className="text-sm text-gray-600">3</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
