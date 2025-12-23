'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface KurangBayarItem {
  id: string;
  description: string;
  value: string;
  number: string;
  isHighlight?: boolean;
}

interface PphKurangBayarSectionProps {
  data: KurangBayarItem[];
}

export function PphKurangBayarSection({ data }: PphKurangBayarSectionProps) {
  const [items, setItems] = useState(data);

  const handleValueChange = (id: string, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-red-50 p-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">F. PPh KURANG BAYAR</h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0 ${
              item.isHighlight
                ? 'bg-orange-50 p-4 -mx-4 -mb-4 px-4 rounded border-b-0'
                : ''
            }`}
          >
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700">
                    {item.number}. {item.description}
                  </Label>
                  <Input
                    value={item.value}
                    onChange={(e) => handleValueChange(item.id, e.target.value)}
                    className={`mt-2 ${
                      item.isHighlight ? 'bg-white border-orange-300 font-bold' : ''
                    }`}
                    placeholder="Rp 0"
                    type={item.value === '-' ? 'text' : 'number'}
                    readOnly={item.value === '-'}
                    disabled={item.value === '-'}
                  />
                </div>
                <div className="text-xs text-gray-500 pt-6">({item.number})</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-xs text-gray-600">
            <strong>Catatan:</strong> Jika ada PPh Kurang Bayar, anda harus melakukan pembayaran
            atau melakukan permohonan restitusi sesuai dengan ketentuan yang berlaku.
          </p>
        </div>
      </div>
    </Card>
  );
}
