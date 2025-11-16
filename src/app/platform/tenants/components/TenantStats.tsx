import { Users, Briefcase, TrendingUp } from 'lucide-react';
import { Card } from 'components/ui/card';

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
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
          <Users className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-muted-foreground">
            Total Client
          </p>
          <p className="text-2xl font-bold">{stats.totalClients}</p>
          <p className="text-xs text-muted-foreground">
            {stats.pkpClients} PKP / {stats.nonPkpClients} Non-PKP
          </p>
        </div>
      </Card>

      {/* Active Client */}
      <Card className="flex items-center gap-4 p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
          <Briefcase className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-muted-foreground">
            Active Client
          </p>
          <p className="text-2xl font-bold">{stats.activeClients}</p>
        </div>
      </Card>

      {/* Total Project */}
      <Card className="flex items-center gap-4 p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
          <Briefcase className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-muted-foreground">
            Total Project
          </p>
          <p className="text-2xl font-bold">{stats.totalProjects}</p>
          <p className="text-xs text-muted-foreground">Dari semua klien</p>
        </div>
      </Card>

      {/* Compliance Rate */}
      <Card className="flex items-center gap-4 p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
          <TrendingUp className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-muted-foreground">
            Compliance Rate
          </p>
          <p className="text-2xl font-bold">{stats.complianceRate}%</p>
          <div className="flex gap-1">
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">
              +{stats.complianceChange}%
            </span>
            <span className="text-xs text-muted-foreground">
              from last quarter
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
