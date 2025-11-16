import { Users, Briefcase, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TenantStatsProps {
  stats: {
    totalClients: number;
    pkpClients: number;
    nonPkpClients: number;
    activeClients: number;
    totalProjects: number;
    complianceRate: number;
    complianceChange: number;
  };
}

export default function TenantStats({ stats }: TenantStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {/* Total Client */}
      <Card className="flex items-center gap-4 p-5">
        <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-lg">
          <Users className="text-primary h-7 w-7" />
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-semibold">
            Total Client
          </p>
          <p className="text-2xl font-bold">{stats.totalClients}</p>
          <p className="text-muted-foreground text-xs">
            {stats.pkpClients} PKP / {stats.nonPkpClients} Non-PKP
          </p>
        </div>
      </Card>

      {/* Active Client */}
      <Card className="flex items-center gap-4 p-5">
        <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-lg">
          <Briefcase className="text-primary h-7 w-7" />
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-semibold">
            Active Client
          </p>
          <p className="text-2xl font-bold">{stats.activeClients}</p>
        </div>
      </Card>

      {/* Total Project */}
      <Card className="flex items-center gap-4 p-5">
        <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-lg">
          <Briefcase className="text-primary h-7 w-7" />
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-semibold">
            Total Project
          </p>
          <p className="text-2xl font-bold">{stats.totalProjects}</p>
          <p className="text-muted-foreground text-xs">Dari semua klien</p>
        </div>
      </Card>

      {/* Compliance Rate */}
      <Card className="flex items-center gap-4 p-5">
        <div className="bg-muted flex h-14 w-14 items-center justify-center rounded-lg">
          <TrendingUp className="text-primary h-7 w-7" />
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-semibold">
            Compliance Rate
          </p>
          <p className="text-2xl font-bold">{stats.complianceRate}%</p>
          <div className="flex gap-1">
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">
              +{stats.complianceChange}%
            </span>
            <span className="text-muted-foreground text-xs">
              from last quarter
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
