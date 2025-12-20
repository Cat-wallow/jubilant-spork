'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface PasalData {
  pasal: string;
  amount: number;
}

interface PemotonganByPasalChartProps {
  data: PasalData[];
}

export function PemotonganByPasalChart({ data }: PemotonganByPasalChartProps) {
  const maxAmount = Math.max(...data.map(d => d.amount));

  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10 bg-white p-6">
      <CardHeader className="p-0 pb-[30px]">
        <CardTitle className="flex items-center gap-2 font-arial text-base text-[#0A0A0A]">
          <FileText className="h-5 w-5" />
          Pemotongan Berdasarkan Pasal
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex h-[445px] flex-col justify-end gap-4 p-4">
          <div className="flex h-full items-end justify-around gap-8">
            {data.map((item, index) => {
              const heightPercentage = (item.amount / maxAmount) * 100;
              return (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end justify-center">
                    <div
                      className="w-full rounded-t-sm bg-[#3B82F6]"
                      style={{ height: `${heightPercentage}%` }}
                    />
                  </div>
                  <p className="font-inter text-xs text-[#666666]">{item.pasal}</p>
                </div>
              );
            })}
          </div>
          <div className="border-t border-[#666666]" />
        </div>
      </CardContent>
    </Card>
  );
}
