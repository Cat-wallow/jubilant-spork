'use client';

import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { calculationStats } from '../_data/dummy-data';
import { Card } from '@/components/ui/card';

interface CalculationLayoutProps {
  children: React.ReactNode;
}

const subTabs = [
  { label: 'Per Pasal', path: 'by-article' },
  { label: 'Per Objek Pajak', path: 'by-object' },
  { label: 'Trend Analysis', path: 'trend' },
];

export default function CalculationLayout({ children }: CalculationLayoutProps) {
  const pathname = usePathname();
  const params = useParams();
  const baseUrl = `/tenant/projects/${params.projectId}/kk3/tax-count/p2pph/${params.id}/calculation`;

  const isSubTabActive = (tabPath: string) => {
    return pathname.endsWith(`/${tabPath}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {calculationStats.map((stat, index) => (
          <Card key={index} className="flex items-center gap-3 rounded-[14px] border-[0.8px] border-black/10 bg-white p-4">
            <div className={cn('flex h-9 w-9 items-center justify-center rounded-[10px]', stat.iconBg)}>
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <p className="font-arial text-sm leading-5 text-[#717182]">{stat.label}</p>
              <p className="font-arial text-lg font-bold leading-7 text-[#0A0A0A]">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex h-[42px] items-center gap-5 self-stretch rounded-[5px] bg-[#F4F7FE] p-[5px]">
        {subTabs.map((tab) => (
          <Link
            key={tab.path}
            href={`${baseUrl}/${tab.path}`}
            className={cn(
              'flex flex-1 items-center justify-center gap-2.5 self-stretch rounded-[5px] px-[15px] py-[3px]',
              isSubTabActive(tab.path) ? 'bg-white' : 'bg-transparent'
            )}
          >
            <span className="font-['Public_Sans'] text-sm font-semibold leading-[22px] text-[#757575]">
              {tab.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}
