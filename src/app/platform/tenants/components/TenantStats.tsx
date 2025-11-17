import { Users, Briefcase, TrendingUp } from 'lucide-react';

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
    <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-4">
      {/* Total Client */}
      <div className="flex items-center gap-[18px] rounded-[20px] bg-white p-5 dark:bg-navy-800">
        <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-lightPrimary dark:bg-navy-700">
          <Users className="h-[30px] w-[30px] text-brand-500" />
        </div>
        <div className="flex flex-col">
          <p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Total Client
          </p>
          <p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-navy-700 dark:text-white">
            {stats.totalClients}
          </p>
          <p className="font-dm text-xs leading-5 tracking-[-0.24px] text-gray-600 dark:text-gray-400">
            {stats.pkpClients} PKP / {stats.nonPkpClients} Non-PKP
          </p>
        </div>
      </div>

      {/* Active Client */}
      <div className="flex items-center gap-[18px] rounded-[20px] bg-white p-5 dark:bg-navy-800">
        <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-lightPrimary dark:bg-navy-700">
          <Briefcase className="h-[30px] w-[30px] text-brand-500" />
        </div>
        <div className="flex flex-col">
          <p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Active Client
          </p>
          <p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-navy-700 dark:text-white">
            {stats.activeClients}
          </p>
        </div>
      </div>

      {/* Total Project */}
      <div className="flex items-center gap-[18px] rounded-[20px] bg-white p-5 dark:bg-navy-800">
        <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-lightPrimary dark:bg-navy-700">
          <Briefcase className="h-[30px] w-[30px] text-brand-500" />
        </div>
        <div className="flex flex-col">
          <p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Total Project
          </p>
          <p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-navy-700 dark:text-white">
            {stats.totalProjects}
          </p>
          <p className="font-dm text-xs leading-5 tracking-[-0.24px] text-gray-600 dark:text-gray-400">
            Dari semua klien
          </p>
        </div>
      </div>

      {/* Compliance Rate */}
      <div className="flex items-center gap-[18px] rounded-[20px] bg-white p-5 dark:bg-navy-800">
        <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-lightPrimary dark:bg-navy-700">
          <TrendingUp className="h-[30px] w-[30px] text-brand-500" />
        </div>
        <div className="flex flex-col">
          <p className="font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-gray-600 dark:text-gray-400">
            Compliance Rate
          </p>
          <p className="font-dm text-2xl font-bold leading-8 tracking-[-0.48px] text-navy-700 dark:text-white">
            {stats.complianceRate}%
          </p>
          <div className="flex items-center gap-1">
            <span className="font-dm text-xs font-bold leading-5 tracking-[-0.24px] text-green-500">
              +{stats.complianceChange}%
            </span>
            <span className="font-dm text-xs leading-5 tracking-[-0.24px] text-gray-600 dark:text-gray-400">
              from last quarter
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
