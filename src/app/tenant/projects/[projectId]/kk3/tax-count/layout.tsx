'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { label: 'PPN 1111', path: 'ppn' },
  { label: 'P2PPh (21/23/25/29)', path: 'p2pph' },
  { label: 'PPh Badan 1771', path: 'pph' },
];

export default function TaxCountLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const projectId = params.projectId as string;

  return (
    <div className="flex flex-col gap-[30px]">
      {/* Tabs */}
      <div className="flex h-[42px] items-center gap-5 rounded-[5px] bg-[#F4F7FE] p-[5px]">
        {tabs.map((tab) => {
          const href = `/tenant/projects/${projectId}/kk3/tax-count/${tab.path}`;
          const isActive = pathname.includes(`/tax-count/${tab.path}`);

          return (
            <Link
              key={tab.path}
              href={href}
              className={cn(
                'flex flex-1 items-center justify-center gap-2.5 self-stretch rounded-[5px] px-[15px] py-[3px] text-sm font-semibold leading-[22px] transition-colors',
                isActive
                  ? 'bg-white text-[#757575]'
                  : 'bg-transparent text-[#757575] hover:bg-white/50'
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
