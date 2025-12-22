'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator } from 'lucide-react';
import { useState } from 'react';

interface PphItem {
  id: string;
  description: string;
  value: string;
  selected: boolean;
}

interface PphTerutangSectionProps {
  data: PphItem[];
}

export function PphTerutangSection({ data }: PphTerutangSectionProps) {
  const [items, setItems] = useState(data);

  const handleCheckChange = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleValueChange = (id: string, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-orange-50 p-2">
          <Calculator className="h-5 w-5 text-orange-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">D. PPh TERUTANG</h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex items-start gap-4">
              <Checkbox
                checked={item.selected}
                onCheckedChange={() => handleCheckChange(item.id)}
                className="mt-3"
              />
              <div className="flex-1">
                <Label className="text-sm font-medium text-gray-700">
                  {item.description}
                </Label>
                <Input
                  value={item.value}
                  onChange={(e) => handleValueChange(item.id, e.target.value)}
                  className="mt-2"
                  placeholder="Rp 0"
                  type={item.value === '-' ? 'text' : 'number'}
                  disabled={!item.selected && item.value === '-'}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-green-200 bg-green-50 p-4 rounded">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">
              4. PPh TERUTANG (4 + 5)
            </Label>
            <div className="mt-2 rounded bg-white px-3 py-2">
              <span className="text-sm font-bold text-gray-900">Rp 4.906.000</span>
            </div>
          </div>
          <div className="text-right pt-8">
            <span className="text-sm text-gray-600">4</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
