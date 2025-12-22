'use client';

import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileSignature } from 'lucide-react';
import { useState } from 'react';

interface SignatureData {
  wajaibPajak: boolean;
  kuasa: boolean;
  tempat: string;
  tanggal: string;
  bulan: string;
  tahun: string;
}

interface PernyataanSectionProps {
  data: {
    disclaimer: string;
    signature: SignatureData;
    direstitusikan: boolean;
    diperhitungkan: boolean;
  };
}

export function PernyataanSection({ data }: PernyataanSectionProps) {
  const [formData, setFormData] = useState(data);

  const handleSignerChange = (type: 'wajaibPajak' | 'kuasa') => {
    setFormData((prev) => ({
      ...prev,
      signature: {
        ...prev.signature,
        [type]: type === 'wajaibPajak' ? !prev.signature.wajaibPajak : !prev.signature.kuasa,
      },
    }));
  };

  const handleSignatureChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SignatureData
  ) => {
    setFormData((prev) => ({
      ...prev,
      signature: {
        ...prev.signature,
        [field]: e.target.value,
      },
    }));
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-green-50 p-2">
          <FileSignature className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">PERNYATAAN DAN TANDA TANGAN</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm text-gray-700 leading-relaxed">{formData.disclaimer}</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            PILIHAN PERLAKUAN PPh LEBIH BAYAR (Jika ada)
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={formData.direstitusikan}
                onCheckedChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    direstitusikan: !prev.direstitusikan,
                  }))
                }
              />
              <Label className="text-sm text-gray-700">DIRESTITUSIKAN</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                checked={formData.diperhitungkan}
                onCheckedChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    diperhitungkan: !prev.diperhitungkan,
                  }))
                }
              />
              <Label className="text-sm text-gray-700">DIPERHITUNGKAN DENGAN UTANG PAJAK</Label>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">PENANDA TANGAN</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={formData.signature.wajaibPajak}
                onCheckedChange={() => handleSignerChange('wajaibPajak')}
              />
              <Label className="text-sm text-gray-700">WAJIB PAJAK</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox checked={formData.signature.kuasa} onCheckedChange={() => handleSignerChange('kuasa')} />
              <Label className="text-sm text-gray-700">KUASA</Label>
            </div>
            <div />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="tempat" className="text-sm font-medium text-gray-700">
                TEMPAT
              </Label>
              <Input
                id="tempat"
                value={formData.signature.tempat}
                onChange={(e) => handleSignatureChange(e, 'tempat')}
                className="mt-1"
                placeholder="Tempat"
              />
            </div>
            <div>
              <Label htmlFor="tanggal" className="text-sm font-medium text-gray-700">
                TANGGAL
              </Label>
              <Input
                id="tanggal"
                value={formData.signature.tanggal}
                onChange={(e) => handleSignatureChange(e, 'tanggal')}
                className="mt-1"
                placeholder="DD"
              />
            </div>
            <div>
              <Label htmlFor="bulan" className="text-sm font-medium text-gray-700">
                BULAN
              </Label>
              <Input
                id="bulan"
                value={formData.signature.bulan}
                onChange={(e) => handleSignatureChange(e, 'bulan')}
                className="mt-1"
                placeholder="MM"
              />
            </div>
          </div>
          <div className="mt-4 w-full sm:w-1/3">
            <Label htmlFor="tahun" className="text-sm font-medium text-gray-700">
              TAHUN
            </Label>
            <Input
              id="tahun"
              value={formData.signature.tahun}
              onChange={(e) => handleSignatureChange(e, 'tahun')}
              className="mt-1"
              placeholder="YYYY"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="text-xs text-gray-500 mb-4">TANDA TANGAN DAN CAP PERUSAHAAN</p>
          <div className="h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
            <span className="text-sm text-gray-400">Tanda Tangan Penanda Tangan</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
