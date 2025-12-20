'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  subtitle: string;
  badge?: boolean;
}

interface StatsCardsProps {
  stats: StatCardProps[];
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="flex h-[117.575px] flex-col items-start rounded-[14px] border-[0.8px] border-black/10 bg-white p-6 pt-6"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-arial text-sm leading-5 text-[#717182]">{stat.label}</p>
              <div className="flex items-center gap-2">
                <p className="font-arial text-2xl font-bold leading-8 text-[#0A0A0A]">{stat.value}</p>
                {stat.badge && (
                  <Check className="h-5 w-5 text-[#00A63E]" />
                )}
              </div>
              <p className="font-arial text-xs leading-4 text-[#717182]">{stat.subtitle}</p>
            </div>
            <div className={cn('flex h-8 w-8 items-center justify-center', stat.iconBg)}>
              {stat.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
