'use client';

import { Card } from '@/components/ui/card';
import { 
  overviewStats, 
  statusBuktiPotong, 
  pemotonganByPasal, 
  trendPemotongan, 
  objekPajak, 
  bottomStats 
} from '../_data/dummy-data';
import { StatsCards } from '../_components/StatsCards';
import { StatusBuktiPotongCard } from '../_components/StatusBuktiPotongCard';
import { PemotonganByPasalChart } from '../_components/PemotonganByPasalChart';
import { TrendPemotonganChart } from '../_components/TrendPemotonganChart';
import { ObjekPajakList } from '../_components/ObjekPajakList';
import { BottomStatsCards } from '../_components/BottomStatsCards';

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      {/* Top Stats Cards */}
      <StatsCards stats={overviewStats} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pemotongan Berdasarkan Pasal */}
        <PemotonganByPasalChart data={pemotonganByPasal} />

        {/* Status Bukti Potong */}
        <StatusBuktiPotongCard data={statusBuktiPotong} />
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Trend Pemotongan Bulanan */}
        <TrendPemotonganChart data={trendPemotongan} />

        {/* Objek Pajak */}
        <ObjekPajakList data={objekPajak} />
      </div>

      {/* Bottom Stats Cards */}
      <BottomStatsCards stats={bottomStats} />
    </div>
  );
}
