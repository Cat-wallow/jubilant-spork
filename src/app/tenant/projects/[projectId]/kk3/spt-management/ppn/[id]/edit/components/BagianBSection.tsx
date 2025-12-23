'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Item {
  label: string;
  value: string;
  subLabel?: string;
  color?: string;
}

interface Section {
  subtitle: string;
  items: Item[];
}

interface BagianBData {
  title: string;
  sections: Section[];
}

interface BagianBSectionProps {
  data: BagianBData;
}

const colorMap: Record<string, string> = {
  purple: 'bg-purple-50',
  pink: 'bg-pink-50',
  yellow: 'bg-yellow-50',
};

export function BagianBSection({ data }: BagianBSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">{data.title}</h2>

      <div className="space-y-8">
        {data.sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="mb-4 text-base font-medium text-gray-800">
              {section.subtitle}
            </h3>

            <div className="space-y-4">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`rounded-lg p-4 ${
                    item.color ? colorMap[item.color] : 'bg-gray-50'
                  }`}
                >
                  <Label className="text-sm font-medium text-gray-700">
                    {item.label}
                  </Label>
                  <Input
                    defaultValue={item.value}
                    type="number"
                    className="mt-1 border-0 bg-white"
                  />
                  {item.subLabel && (
                    <p className="mt-1 text-xs text-gray-500">{item.subLabel}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
