import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Database, Calculator, TrendingUp } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: string;
  badgeText?: string;
  badgeColor?: string;
}

function StatCard({ icon, label, value, subtitle, subtitleColor, badgeText, badgeColor }: StatCardProps) {
  return (
    <Card className="flex h-[168px] flex-1 items-center gap-[18px] border border-[rgba(145,158,171,0.20)] px-6 shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]">
      <div className="flex h-14 w-14 items-center justify-center gap-2.5 rounded-[28px]">
        {icon}
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">{label}</div>
        <div className="text-2xl font-bold leading-8 tracking-[-0.48px] text-[#404040]">{value}</div>
        {subtitle && (
          <div className={cn('text-xs font-bold leading-5 tracking-[-0.24px]', subtitleColor)}>
            {subtitle}
          </div>
        )}
        {badgeText && (
          <Badge
            variant="outline"
            className={cn('mt-1 w-fit border-0 text-xs font-normal', badgeColor)}
          >
            {badgeText}
          </Badge>
        )}
      </div>
    </Card>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function StatsCards() {
  const stats = [
    {
      icon: <FileText className="h-[30px] w-[30px] text-[#332687]" />,
      label: 'Total Vouchers',
      value: '4',
      subtitle: '/30',
      subtitleColor: 'text-[#05CD99]',
      badgeText: 'Draft',
      badgeColor: 'text-[#A3AED0]',
    },
    {
      icon: <Database className="h-[30px] w-[30px] text-[#332687]" />,
      label: 'Chart of Accounts',
      value: '14',
      subtitle: '14 active accounts',
      subtitleColor: 'text-[#096]',
      badgeText: 'Active',
      badgeColor: 'text-[#007A55]',
    },
    {
      icon: <Calculator className="h-[30px] w-[30px] text-[#332687]" />,
      label: 'Trial Balance',
      value: 'Balanced',
      subtitle: 'As of 3/10/2025',
      subtitleColor: 'text-[#7F22FE]',
      badgeText: 'OK',
      badgeColor: 'text-[#7008E7]',
    },
    {
      icon: <TrendingUp className="h-[30px] w-[30px] text-[#332687]" />,
      label: 'Journal Value',
      value: 'Rp 165.500.000',
      subtitle: 'Posted vouchers only',
      subtitleColor: 'text-[#E17100]',
      badgeText: 'YTD',
      badgeColor: 'text-[#BB4D00]',
    },
  ];

  return (
    <div className="flex items-center gap-[30px] self-stretch">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
