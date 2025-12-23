'use client';

import { StatsCard } from './components/StatsCard';
import { OverviewSection } from './components/OverviewSection';
import { ChecklistItemCard } from './components/ChecklistItemCard';
import data from './data.json';

export default function QCPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatsCard
          label={data.stats.qcProgress.label}
          value={`${data.stats.qcProgress.percentage}%`}
          sublabel={`${data.stats.qcProgress.completed}/${data.stats.qcProgress.total} items`}
          bgColor={data.stats.qcProgress.bgColor}
          iconColor={data.stats.qcProgress.iconColor}
        />
        <StatsCard
          label={data.stats.bastApproved.label}
          value={data.stats.bastApproved.count.toString()}
          sublabel={data.stats.bastApproved.sublabel}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          label={data.stats.invoiceApproved.label}
          value={data.stats.invoiceApproved.count.toString()}
          sublabel={data.stats.invoiceApproved.sublabel}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Overview Section */}
      <OverviewSection data={data.overview} />

      {/* Checklist Items */}
      <div className="space-y-4">
        {data.checklistItems.map((item) => (
          <ChecklistItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Summary Footer */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">QC Checklist Summary</h3>
          <p className="text-sm text-gray-600">
            {data.stats.qcProgress.completed} dari {data.stats.qcProgress.total} item telah diselesaikan
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{data.stats.qcProgress.percentage}%</div>
          <div className="text-sm text-gray-600">Complete</div>
        </div>
      </div>
    </div>
  );
}
