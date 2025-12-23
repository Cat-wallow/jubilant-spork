'use client';

import { Card } from '@/components/ui/card';
import { DollarSign, Calculator, TrendingUp, AlertCircle } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface StatsCardsProps {
  stats: Stat[];
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  teal: 'bg-teal-50 text-teal-600',
  purple: 'bg-purple-50 text-purple-600',
  red: 'bg-red-50 text-red-600',
};

const iconMap: Record<string, React.ReactNode> = {
  money: <DollarSign className="h-6 w-6" />,
  calculator: <Calculator className="h-6 w-6" />,
  trending: <TrendingUp className="h-6 w-6" />,
  alert: <AlertCircle className="h-6 w-6" />,
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">{stat.label}</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`rounded-lg p-2 ${colorMap[stat.color]}`}>
              {iconMap[stat.icon]}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
