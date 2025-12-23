'use client';

import { FileText } from 'lucide-react';

interface StatCard {
  label: string;
  value: string | number;
  sublabel: string;
  bgColor: string;
  labelColor: string;
  valueColor: string;
  sublabelColor: string;
}

interface StatsData {
  totalBast: StatCard;
  approved: StatCard;
  totalValue: StatCard;
}

interface InfoCardsProps {
  stats: StatsData;
}

export function InfoCards({ stats }: InfoCardsProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-start gap-4">
        <FileText className="h-5 w-5 text-gray-900 flex-shrink-0" />
        <div>
          <h1 className="text-base font-bold text-gray-900">BAST Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Pengelolaan Berita Acara Serah Terima untuk deliverable layanan konsultan pajak
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total BAST */}
        <div className={`rounded-xl ${stats.totalBast.bgColor} p-4`}>
          <p className={`text-sm font-normal ${stats.totalBast.labelColor}`}>
            {stats.totalBast.label}
          </p>
          <p className={`mt-2 text-3xl font-bold ${stats.totalBast.valueColor}`}>
            {stats.totalBast.value}
          </p>
          <p className={`mt-1 text-xs font-normal ${stats.totalBast.sublabelColor}`}>
            {stats.totalBast.sublabel}
          </p>
        </div>

        {/* Approved */}
        <div className={`rounded-xl ${stats.approved.bgColor} p-4`}>
          <p className={`text-sm font-normal ${stats.approved.labelColor}`}>
            {stats.approved.label}
          </p>
          <p className={`mt-2 text-3xl font-bold ${stats.approved.valueColor}`}>
            {stats.approved.value}
          </p>
          <p className={`mt-1 text-xs font-normal ${stats.approved.sublabelColor}`}>
            {stats.approved.sublabel}
          </p>
        </div>

        {/* Total Value */}
        <div className={`rounded-xl ${stats.totalValue.bgColor} p-4`}>
          <p className={`text-sm font-normal ${stats.totalValue.labelColor}`}>
            {stats.totalValue.label}
          </p>
          <p className={`mt-2 text-xl font-bold ${stats.totalValue.valueColor}`}>
            {stats.totalValue.value}
          </p>
          <p className={`mt-1 text-xs font-normal ${stats.totalValue.sublabelColor}`}>
            {stats.totalValue.sublabel}
          </p>
        </div>
      </div>
    </div>
  );
}
