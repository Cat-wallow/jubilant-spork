'use client';

import { Card, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltip } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  FileText,
  DollarSign,
  PieChart as PieChartIcon,
  CheckCircle2,
  Calendar,
  Clock,
  AlertCircle
} from 'lucide-react';

interface PphDistributionData {
  totalPph: string;
  breakdown: Array<{
    label: string;
    value: string;
    percentage: string;
    color: string;
    rawValue: number; // for chart
  }>;
  stats: {
    largestContribution: {
      label: string;
      percentage: string;
    };
    averagePerType: string;
    diversification: string;
  };
  compliance: {
    status: string;
    description: string;
    details: Array<{
      type: string;
      status: 'On Time' | 'Planned' | 'Late';
      dateLabel: string;
      date: string;
    }>;
  };
}

interface PpnDistributionAnalysisProps {
  data: PphDistributionData;
}

export function PpnDistributionAnalysis({ data }: PpnDistributionAnalysisProps) {
  return (
    <Card className="flex flex-1 flex-col gap-[30px] rounded-[14px] border-[0.8px] border-[rgba(0,0,0,0.10)] bg-white p-5">
      {/* Header */}
      <div className="flex items-center justify-between self-stretch">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-[#0A0A0A]" />
            <h3 className="font-arial text-base font-normal leading-4 text-[#0A0A0A]">
              PPh Distribution Analysis
            </h3>
          </div>
          <p className="font-arial text-sm font-normal leading-5 text-[#717182]">
            Distribusi dan komposisi berbagai jenis Pajak Penghasilan
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-arial text-lg font-bold leading-7 text-[#1C398E]">
            {data.totalPph}
          </span>
          <span className="font-arial text-sm font-normal leading-5 text-[#717182]">
            Total PPh
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 self-stretch">
        {/* Chart and Breakdown */}
        <div className="flex items-start justify-between">
          {/* Chart */}
          <div className="flex h-[300px] w-[300px] items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.breakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="rawValue"
                >
                  {data.breakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown List */}
          <div className="flex w-[252px] flex-col gap-3">
            <h4 className="font-arial text-base font-bold leading-6 text-[#0A0A0A]">
              Breakdown by Type
            </h4>
            <div className="flex flex-col gap-2">
              {data.breakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-[10px] bg-[#F9FAFB] p-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-arial text-sm font-normal text-[#717182]">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-arial text-base font-bold text-[#0A0A0A]">
                      {item.value}
                    </span>
                    <span className="font-arial text-sm font-normal text-[#717182]">
                      {item.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="flex items-center justify-between rounded-[10px] bg-gradient-to-r from-[#EFF6FF] to-[#EEF2FF] p-4">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-[#1C398E]">
              <TrendingUp className="h-4 w-4" />
              <span className="font-arial text-sm font-normal">
                Kontribusi Terbesar
              </span>
            </div>
            <span className="font-arial text-base font-bold text-[#193CB8]">
              {data.stats.largestContribution.label} ({data.stats.largestContribution.percentage})
            </span>
          </div>
          <div className="h-10 w-[1px] bg-[#CDD5DF]" />
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-[#0D542B]">
              <DollarSign className="h-4 w-4" />
              <span className="font-arial text-sm font-normal">
                Rata-rata per Jenis
              </span>
            </div>
            <span className="font-arial text-base font-bold text-[#016630]">
              {data.stats.averagePerType}
            </span>
          </div>
          <div className="h-10 w-[1px] bg-[#CDD5DF]" />
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 text-[#59168B]">
              <FileText className="h-4 w-4" />
              <span className="font-arial text-sm font-normal">
                Diversifikasi
              </span>
            </div>
            <span className="font-arial text-base font-bold text-[#6E11B0]">
              {data.stats.diversification}
            </span>
          </div>
        </div>

        {/* Status Kepatuhan */}
        <div className="flex flex-col gap-4 rounded-[10px] border-[0.8px] border-[#B9F8CF] bg-[#F0FDF4] p-4">
          <div className="flex gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-[#0D542B]" />
            <div className="flex flex-col gap-1">
              <h4 className="font-arial text-base font-bold leading-6 text-[#0D542B]">
                {data.compliance.status}
              </h4>
              <p className="font-arial text-sm font-normal leading-5 text-[#016630]">
                {data.compliance.description}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {data.compliance.details.map((detail, index) => (
              <div key={index} className="flex flex-col gap-1">
                <span className={`font-arial text-base font-normal leading-6 ${detail.status === 'On Time' ? 'text-[#008236]' : 'text-[#008236]'}`}>
                  {detail.type}: {detail.status}
                </span>
                <span className={`font-arial text-base font-normal leading-6 ${detail.status === 'On Time' ? 'text-[#00A63E]' : 'text-[#00A63E]'}`}>
                  {detail.dateLabel}: {detail.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
