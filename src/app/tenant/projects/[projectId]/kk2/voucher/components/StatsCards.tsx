import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, AlertCircle, DollarSign, Workflow } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle: string;
  subtitleColor: string;
}

function StatCard({ icon, label, value, subtitle, subtitleColor }: StatCardProps) {
  return (
    <Card className="flex h-[97px] flex-1 items-center gap-[18px] border border-[rgba(145,158,171,0.20)] px-6 shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]">
      <div className="flex h-14 w-14 items-center justify-center gap-2.5 rounded-[28px]">
        {icon}
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">{label}</div>
        <div className="text-2xl font-bold leading-8 tracking-[-0.48px] text-[#404040]">{value}</div>
        <div className={`text-xs font-normal leading-5 tracking-[-0.24px] ${subtitleColor}`}>
          {subtitle}
        </div>
      </div>
    </Card>
  );
}

export function StatsCards() {
  const stats = [
    {
      icon: <FileText className="h-[30px] w-[30px] text-[#332687]" />,
      label: 'Total Voucher',
      value: '20',
      subtitle: '/30 Draft',
      subtitleColor: 'text-[#A3AED0]',
    },
    {
      icon: <CheckCircle className="h-[30px] w-[30px] text-[#332687]" />,
      label: 'Posted',
      value: '20',
      subtitle: 'Final',
      subtitleColor: 'text-[#05CD99]',
    },
    {
      icon: <AlertCircle className="h-[30px] w-[30px] text-[#332687]" />,
      label: 'Unbalanced',
      value: '5',
      subtitle: 'Need Fixing',
      subtitleColor: 'text-[#A3AED0]',
    },
    {
      icon: <DollarSign className="h-[30px] w-[30px] text-[#332687]" />,
      label: 'Total Value',
      value: 'Rp. 20.000.000',
      subtitle: 'Posted vouchers only',
      subtitleColor: 'text-[#A3AED0]',
    },
    {
      icon: <Workflow className="h-[30px] w-[30px] text-[#332687]" />,
      label: 'Auto Journal',
      value: '20',
      subtitle: 'As of 29/09/2025',
      subtitleColor: 'text-[#A3AED0]',
    },
  ];

  return (
    <div className="flex items-start gap-[30px] self-stretch">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
