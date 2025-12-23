import { ReactNode } from 'react';

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  bgColor: string;
}

export function StatsCard({ icon, label, value, bgColor }: StatsCardProps) {
  return (
    <div className="flex h-[89.6px] flex-col rounded-2xl border border-black/10 bg-white p-4 pt-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bgColor} p-2`}>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-sm leading-5 text-[#717182]">{label}</span>
          <span className="text-lg font-bold leading-7 text-[#0A0A0A]">{value}</span>
        </div>
      </div>
    </div>
  );
}
