'use client';

import { Check } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  sublabel: string;
  bgColor: string;
  iconColor: string;
}

export function StatsCard({
  label,
  value,
  sublabel,
  bgColor,
  iconColor,
}: StatsCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6">
      <div className={`rounded-xl ${bgColor} p-3`}>
        <Check className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-normal text-gray-600">{label}</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{sublabel}</p>
      </div>
    </div>
  );
}
