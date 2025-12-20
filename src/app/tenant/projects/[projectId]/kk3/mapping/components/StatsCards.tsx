'use client';

import { Card } from '@/components/ui/card';
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  Workflow,
} from 'lucide-react';

interface MappingStat {
  label: string;
  value: string;
  subValue?: string;
  subLabel: string;
  icon: 'file' | 'check' | 'warning' | 'money' | 'workflow';
  subValueColor?: string; // Optional color for subValue (e.g., green for /30)
}

const statsData: MappingStat[] = [
  {
    label: 'Total Voucher',
    value: '20',
    subValue: '/30',
    subLabel: 'Draft',
    icon: 'file',
    subValueColor: 'text-[#05CD99]',
  },
  {
    label: 'Posted',
    value: '20',
    subLabel: 'Final',
    icon: 'check',
    subValueColor: 'text-[#05CD99]',
  },
  {
    label: 'Unbalanced',
    value: '5',
    subLabel: 'Need Fixing',
    icon: 'warning',
  },
  {
    label: 'Total Value',
    value: 'Rp. 20.000.000',
    subLabel: 'Posted vouchers only',
    icon: 'money',
  },
  {
    label: 'Auto Journal',
    value: '20',
    subLabel: 'As of 29/09/2025',
    icon: 'workflow',
  },
];

const iconMap = {
  file: FileCheck,
  check: CheckCircle2,
  warning: AlertTriangle,
  money: DollarSign,
  workflow: Workflow,
};

export function StatsCards() {
  return (
    <div className="flex items-start gap-[30px] self-stretch">
      {statsData.map((stat, index) => {
        const Icon = iconMap[stat.icon];
        return (
          <Card
            key={index}
            className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] border border-[rgba(145,158,171,0.20)] bg-white px-5 py-1.5 shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE]">
              <Icon className="h-[30px] w-[30px] text-[#332687]" />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-dm-sans text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
                {stat.label}
              </span>
              <span className="font-dm-sans text-2xl font-bold leading-8 tracking-[-0.48px] text-[#404040]">
                {stat.value}
              </span>
              <div className="flex items-center gap-1 font-dm-sans text-xs leading-5 tracking-[-0.24px]">
                {stat.subValue && (
                  <span className={`font-bold ${stat.subValueColor || 'text-[#A3AED0]'}`}>
                    {stat.subValue}
                  </span>
                )}
                <span className={`font-normal ${stat.subValueColor && !stat.subValue ? stat.subValueColor : 'text-[#A3AED0]'}`}>
                  {stat.subLabel}
                </span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
