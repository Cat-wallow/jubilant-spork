'use client';

import { TrendChart } from './_components/TrendChart';
import { InsightCards } from './_components/InsightCards';
import { TaxRateSummary } from './_components/TaxRateSummary';

export default function TrendPage() {
  return (
    <div className="space-y-[30px]">
      {/* Trend Chart */}
      <TrendChart />

      {/* Insight and Summary Section */}
      <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2">
        <InsightCards />
        <TaxRateSummary />
      </div>
    </div>
  );
}
