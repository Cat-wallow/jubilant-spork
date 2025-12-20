'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BottomStatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  subtitle: string;
}

interface BottomStatsCardsProps {
  stats: BottomStatCardProps[];
}

export function BottomStatsCards({ stats }: BottomStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="flex h-[153.588px] flex-col items-center justify-center rounded-[14px] border-[0.8px] border-black/10 bg-white p-6"
        >
          <div className="flex flex-col items-center gap-4">
            <div className={cn('flex h-8 w-8 items-center justify-center rounded-[10px]', stat.iconBg)}>
              {stat.icon}
            </div>
            <p className="text-center font-arial text-sm leading-5 text-[#717182]">{stat.label}</p>
            <p className="text-center font-arial text-xl font-bold leading-7 text-[#0A0A0A]">{stat.value}</p>
            <p className="text-center font-arial text-xs leading-4 text-[#717182]">{stat.subtitle}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
