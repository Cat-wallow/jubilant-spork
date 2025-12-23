'use client';

import { Card } from '@/components/ui/card';
import { FileText, Edit3, CheckCircle, CheckSquare } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
}

interface StatsCardsProps {
  stats: Stat[];
}

export function StatsCards({ stats }: StatsCardsProps) {
  const iconMap: Record<string, React.ReactNode> = {
    file: <FileText className="h-8 w-8 text-blue-600" />,
    edit: <Edit3 className="h-8 w-8 text-orange-600" />,
    check: <CheckCircle className="h-8 w-8 text-green-600" />,
    approve: <CheckSquare className="h-8 w-8 text-purple-600" />,
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.id} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              {iconMap[stat.icon] || <FileText className="h-8 w-8" />}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
