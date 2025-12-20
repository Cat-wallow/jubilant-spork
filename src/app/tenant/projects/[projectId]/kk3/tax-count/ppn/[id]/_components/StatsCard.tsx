'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  valueColor?: string;
}

export function StatsCard({ icon, label, value, subtitle, valueColor }: StatsCardProps) {
  return (
    <Card className="border-[0.8px] border-black/10 bg-white">
      <CardContent className="flex flex-col gap-2 p-4">
        {/* Icon and Label */}
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-['Arial'] text-sm leading-5 text-[#0A0A0A]">{label}</span>
        </div>

        {/* Value */}
        <div className="flex flex-col gap-1">
          <span
            className={cn(
              "font-['Arial'] text-2xl font-bold leading-8",
              valueColor || 'text-[#0A0A0A]'
            )}
          >
            {value}
          </span>
          {subtitle && (
            <span className="font-['Arial'] text-xs leading-4 text-[#717182]">{subtitle}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
