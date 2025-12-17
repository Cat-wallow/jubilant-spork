'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { label: 'Dashboard', path: 'dashboard' },
  { label: 'Voucher List', path: 'voucher' },
  { label: 'Journal', path: 'journal' },
  { label: 'Reports', path: 'reports' },
];

export default function KK2Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const projectId = params.projectId as string;

  return (
    <div className="flex flex-col gap-[30px] p-6">
      <div className="flex flex-col gap-[5px]">
        <div className="text-sm font-medium leading-6 text-[#707EAE]">KK 2.0</div>
        <h1 className="text-[34px] font-bold leading-[42px] tracking-[-0.68px] text-[#0B1437]">
          Kelola KK 2.0 (Manajemen Akuntansi)
        </h1>
      </div>

      <div className="flex h-[42px] items-center gap-5 rounded-[5px]">
        {tabs.map((tab) => {
          const href = `/tenant/projects/${projectId}/kk2/${tab.path}`;
          const isActive = pathname.includes(tab.path);

          return (
            <Link
              key={tab.path}
              href={href}
              className={cn(
                'flex flex-1 items-center justify-center gap-2.5 self-stretch rounded-[5px] px-4 py-2 text-sm font-semibold leading-[22px] transition-colors',
                isActive
                  ? 'bg-[#332687] text-white'
                  : 'text-[#757575] hover:bg-gray-100'
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
