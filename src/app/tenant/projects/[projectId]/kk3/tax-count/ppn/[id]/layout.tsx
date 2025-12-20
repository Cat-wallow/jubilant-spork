'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { label: 'Overview', path: 'overview' },
  { label: 'Perhitungan PPN', path: 'calculation' },
  { label: 'List Transaksi', path: 'transaction' },
  { label: 'Data Sumber', path: 'data-sumber' },
];

export default function PPNDetailLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const projectId = params.projectId as string;
  const id = params.id as string;

  return (
    <div className="flex flex-col gap-[30px]">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-1.5">
        <p className="font-dm text-sm font-medium leading-6 text-[#707EAE]">
          KK 3.0 &gt; Perhitungan Pajak
        </p>
        <h1 className="font-dm text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
          Detail PPN {id}
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex h-[42px] items-center gap-5 rounded-[5px] bg-[#F4F7FE] p-[5px]">
        {tabs.map((tab) => {
          const href = `/tenant/projects/${projectId}/kk3/tax-count/ppn/${id}/${tab.path}`;
          const isActive = pathname.endsWith(`/${tab.path}`);

          return (
            <Link
              key={tab.path}
              href={href}
              className={cn(
                'flex flex-1 items-center justify-center gap-2.5 self-stretch rounded-[5px] px-[15px] py-[3px] font-[Public_Sans] text-sm font-semibold leading-[22px] text-[#757575] transition-colors',
                isActive
                  ? 'bg-white'
                  : 'bg-transparent hover:bg-white/50'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
