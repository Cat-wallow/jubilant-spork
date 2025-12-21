'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface Item {
  label: string;
  value: string;
  subLabel?: string;
  color?: string;
  summary?: {
    label: string;
    value: string;
    color: string;
  };
}

interface Section {
  subtitle: string;
  items: Item[];
}

interface BagianAData {
  title: string;
  sections: Section[];
}

interface BagianASectionProps {
  data: BagianAData;
}

export function BagianASection({ data }: BagianASectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">{data.title}</h2>

      <div className="space-y-8">
        {data.sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="mb-4 text-base font-medium text-gray-800">
              {section.subtitle}
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx}>
                  <Label className="text-sm font-medium text-gray-700">
                    {item.label}
                  </Label>
                  <Input
                    defaultValue={item.value}
                    type="number"
                    className="mt-1"
                  />
                  {item.subLabel && (
                    <p className="mt-1 text-xs text-gray-500">{item.subLabel}</p>
                  )}
                </div>
              ))}

              {section.items.length > 0 && section.items[0].summary && (
                <div className={`rounded-lg p-4 sm:col-span-2 ${
                  section.items[0].summary.color === 'green'
                    ? 'bg-green-50'
                    : 'bg-gray-50'
                }`}>
                  <p className="text-sm font-medium text-gray-700">
                    {section.items[0].summary.label}
                  </p>
                  <p className={`mt-1 text-xl font-bold ${
                    section.items[0].summary.color === 'green'
                      ? 'text-green-600'
                      : 'text-gray-900'
                  }`}>
                    {section.items[0].summary.value}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
