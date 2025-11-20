'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, FolderOpen, TrendingUp } from 'lucide-react';

interface SummaryCardsProps {
  totalClients: number;
  activeClients: number;
  totalProjects: number;
  complianceRate: number;
}

export function SummaryCards({
  totalClients,
  activeClients,
  totalProjects,
  complianceRate,
}: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Client',
      value: totalClients.toLocaleString('id-ID'),
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Client',
      value: activeClients.toLocaleString('id-ID'),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Project',
      value: totalProjects.toLocaleString('id-ID'),
      icon: FolderOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Compliance Rate',
      value: `${complianceRate}%`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
