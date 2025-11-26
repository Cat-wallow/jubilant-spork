import { FileText, Users, HardDrive, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsCardsProps {
  stats: {
    activeProjects: {
      current: number;
      total: number;
    };
    totalUsers: {
      current: number;
      total: number;
      label: string;
    };
    storageUsage: {
      percentage: number;
      used: string;
      total: string;
    };
    uptimeSLA: {
      percentage: number;
    };
  };
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="flex h-[120px] items-start gap-[30px] self-stretch">
      {/* Project Aktif */}
      <Card className="flex flex-1 items-center gap-[18px] self-stretch rounded-[20px] bg-white p-5 px-5 py-[6px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE] p-[15px]">
          <FileText className="h-[30px] w-[30px] text-[#332687]" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
            Project Aktif
          </p>
          <p className="text-2xl font-bold leading-8 tracking-[-0.48px] text-[#0B1437]">
            {stats.activeProjects.current}
          </p>
          <p className="text-xs font-normal leading-5 tracking-[-0.24px] text-[#A3AED0]">
            dari {stats.activeProjects.total} total
          </p>
        </div>
      </Card>

      {/* Total Users */}
      <Card className="flex flex-1 items-center gap-[18px] self-stretch rounded-[20px] bg-white p-5 px-5 py-[6px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE] p-[15px]">
          <Users className="h-[30px] w-[30px] text-[#332687]" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
            Total Users
          </p>
          <p className="text-2xl leading-8 tracking-[-0.48px] text-[#0B1437]">
            <span className="font-bold">{stats.totalUsers.current}</span>
            <span className="font-normal">/{stats.totalUsers.total}</span>
          </p>
          <p className="text-xs font-bold leading-5 tracking-[-0.24px] text-[#05CD99]">
            {stats.totalUsers.label}
          </p>
        </div>
      </Card>

      {/* Storage Usage */}
      <Card className="flex flex-1 items-center gap-[18px] self-stretch rounded-[20px] bg-white p-5 px-5 py-[6px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE] p-[15px]">
          <HardDrive className="h-[30px] w-[30px] text-[#332687]" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
            Storage Usage
          </p>
          <p className="text-2xl font-bold leading-8 tracking-[-0.48px] text-[#0B1437]">
            {stats.storageUsage.percentage}%
          </p>
          <p className="text-xs leading-5 tracking-[-0.24px]">
            <span className="font-bold text-[#05CD99]">{stats.storageUsage.used}</span>
            <span className="font-normal text-[#A3AED0]"> / {stats.storageUsage.total}</span>
          </p>
        </div>
      </Card>

      {/* Uptime SLA */}
      <Card className="flex flex-1 items-center gap-[18px] self-stretch rounded-[20px] bg-white p-5 px-5 py-[6px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-[#F4F7FE] p-[15px]">
          <CheckCircle className="h-[30px] w-[30px] text-[#332687]" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
            Uptime SLA
          </p>
          <p className="text-2xl font-bold leading-8 tracking-[-0.48px] text-[#0B1437]">
            {stats.uptimeSLA.percentage}%
          </p>
        </div>
      </Card>
    </div>
  );
}
