import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';

interface TrendAnalysisProps {
  trends: Array<{
    month: string;
    ppnKeluaran: number;
    ppnMasukan: number;
    net: number;
  }>;
  growth: {
    ppnKeluaran: number;
    ppnMasukan: number;
    period: string;
  };
}

export function TrendAnalysis({ trends, growth }: TrendAnalysisProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 font-arial text-base font-bold leading-4 text-[#0A0A0A]">
          <BarChart3 className="h-5 w-5" />
          Trend Analysis - 3 Bulan Terakhir
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-[30px]">
        <div className="flex items-start gap-4">
          {trends.map((trend) => (
            <div key={trend.month} className="flex flex-1 flex-col gap-2.5">
              <div className="text-center font-arial text-sm leading-5 text-[#0A0A0A]">
                {trend.month}
              </div>

              <div className="flex flex-col gap-0">
                <div className="rounded bg-[#DCFCE7] p-2">
                  <p className="text-center font-arial text-xs leading-4 text-[#008236]">
                    PPN Keluaran
                  </p>
                  <p className="text-center font-[Consolas] text-sm font-bold leading-5 text-[#016630]">
                    {formatCurrency(trend.ppnKeluaran)}
                  </p>
                </div>

                <div className="rounded bg-[#DBEAFE] p-2">
                  <p className="text-center font-arial text-xs leading-4 text-[#1447E6]">
                    PPN Masukan
                  </p>
                  <p className="text-center font-[Consolas] text-sm font-bold leading-5 text-[#193CB8]">
                    {formatCurrency(trend.ppnMasukan)}
                  </p>
                </div>

                <div className="rounded bg-[#FFE2E2] p-2">
                  <p className="text-center font-arial text-xs leading-4 text-[#C10007]">
                    Net
                  </p>
                  <p className="text-center font-[Consolas] text-sm font-bold leading-5 text-[#9F0712]">
                    {formatCurrency(trend.net)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-[30px]">
          <div className="flex flex-1 flex-col gap-2 rounded-[10px] bg-[#F0FDF4] p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#00A63E]" />
              <span className="font-arial text-sm leading-5 text-[#016630]">
                Pertumbuhan PPN Keluaran
              </span>
            </div>
            <p className="font-arial text-2xl font-bold leading-8 text-[#008236]">
              +{growth.ppnKeluaran}%
            </p>
            <p className="font-arial text-xs leading-4 text-[#00A63E]">
              {growth.period}
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-2 rounded-[10px] bg-[#EFF6FF] p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#155DFC]" />
              <span className="font-arial text-sm leading-5 text-[#193CB8]">
                Pertumbuhan PPN Masukan
              </span>
            </div>
            <p className="font-arial text-2xl font-bold leading-8 text-[#1447E6]">
              +{growth.ppnMasukan}%
            </p>
            <p className="font-arial text-xs leading-4 text-[#155DFC]">
              {growth.period}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
