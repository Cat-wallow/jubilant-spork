'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Percent } from 'lucide-react';
import { useState } from 'react';

interface KreditItem {
  id: string;
  description: string;
  value: string;
  number: string;
  isSummary?: boolean;
}

interface KreditPajakSectionProps {
  data: KreditItem[];
}

export function KreditPajakSection({ data }: KreditPajakSectionProps) {
  const [items, setItems] = useState(data);

  const handleValueChange = (id: string, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-amber-50 p-2">
          <Percent className="h-5 w-5 text-amber-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">E. KREDIT PAJAK</h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0 ${
              item.isSummary ? 'bg-blue-50 p-4 -mx-4 -mb-4 px-4 rounded' : ''
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
                    className="mt-2"
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
    </Card>
  );
}
