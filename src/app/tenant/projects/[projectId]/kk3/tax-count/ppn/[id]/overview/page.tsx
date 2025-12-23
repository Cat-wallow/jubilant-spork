import { DashboardCard } from './components/DashboardCard';
import { StatsCards } from './components/StatsCards';
import { MetricCards } from './components/MetricCards';
import { TrendAnalysis } from './components/TrendAnalysis';
import { overviewData } from './data';

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex items-start gap-[30px]">
        <DashboardCard data={overviewData.dashboard} />
        <StatsCards
          ppnKeluaran={overviewData.ppnKeluaran}
          ppnMasukan={overviewData.ppnMasukan}
        />
      </div>

      <MetricCards
        netPPN={overviewData.netPPN}
        effectiveRate={overviewData.effectiveRate}
        totalTransaction={overviewData.totalTransaction}
        autoFill={overviewData.autoFill}
      />

      <TrendAnalysis
        trends={overviewData.trendAnalysis}
        growth={overviewData.growth}
      />
    </div>
  );
}
