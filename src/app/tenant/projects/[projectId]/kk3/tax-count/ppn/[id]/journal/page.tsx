'use client';

import { StatsCard } from '../_components/StatsCard';
import { JournalVoucherList } from '../_components/JournalVoucherList';
import { journalStats, journalVouchers } from '../_data/dummy-data';

export default function JournalPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {journalStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Journal Vouchers */}
      <JournalVoucherList vouchers={journalVouchers} />
    </div>
  );
}
