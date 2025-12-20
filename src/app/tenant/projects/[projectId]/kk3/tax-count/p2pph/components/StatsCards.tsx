'use client';

import { Card } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const statsData = [
  {
    label: 'PPh 21',
    badge: '6',
    objek: 'Rp. 1.800.000.000',
    pph: 'Rp. 107.200.000',
    pphColor: 'text-[#34C759]',
  },
  {
    label: 'PPh 23',
    badge: '6',
    objek: 'Rp. 1.800.000.000',
    pph: 'Rp. 107.200.000',
    pphColor: 'text-[#34C759]',
  },
  {
    label: 'PPh 25',
    badge: '6',
    objek: 'Rp. 1.800.000.000',
    pph: 'Rp. 107.200.000',
    pphColor: 'text-[#34C759]',
  },
  {
    label: 'PPh 29',
    badge: '6',
    objek: 'Rp. 1.800.000.000',
    pph: 'Rp. 107.200.000',
    pphColor: 'text-[#34C759]',
  },
];

export function StatsCards() {
  return (
    <div className="flex items-start gap-[30px]">
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className="flex flex-1 items-center gap-[18px] rounded-[20px] border border-[rgba(145,158,171,0.20)] bg-white p-[10px_20px] shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F7FE] p-[15px]">
            <Calculator className="h-[30px] w-[30px] text-[#332687]" />
          </div>
          <div className="flex flex-1 flex-col items-start">
            <div className="flex items-center justify-between self-stretch">
              <div className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
                {stat.label}
              </div>
              <Badge className="h-[21.587px] w-[24.3px] rounded-lg border-0 bg-[#DBEAFE] px-2 py-0.5 font-arial text-xs font-normal text-[#193CB8]">
                {stat.badge}
              </Badge>
            </div>
            <div className="flex items-center justify-between self-stretch">
              <div className="font-dm text-base font-bold leading-8 tracking-[-0.32px] text-[#404040]">
                Objek:
              </div>
              <div className="font-dm text-base font-bold leading-8 tracking-[-0.32px] text-[#404040]">
                {stat.objek}
              </div>
            </div>
            <div className="flex items-center justify-between self-stretch">
              <div className="font-dm text-base font-bold leading-8 tracking-[-0.32px] text-[#404040]">
                PPh:
              </div>
              <div className={`font-dm text-base font-bold leading-8 tracking-[-0.32px] ${stat.pphColor}`}>
                {stat.pph}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
