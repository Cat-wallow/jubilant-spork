'use client';

import { StatsCard } from '../_components/StatsCard';
import { TransactionsTable } from '../_components/TransactionsTable';
import { transactionStats, transactions } from '../_data/dummy-data';

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {transactionStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Transactions Table */}
      <TransactionsTable transactions={transactions} />
    </div>
  );
}
