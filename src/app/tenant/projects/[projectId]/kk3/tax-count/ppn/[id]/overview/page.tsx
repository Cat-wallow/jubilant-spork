'use client';

import { StatsCard } from '../_components/StatsCard';
import { overviewStats } from '../_data/dummy-data';

export default function OverviewPage() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewStats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
