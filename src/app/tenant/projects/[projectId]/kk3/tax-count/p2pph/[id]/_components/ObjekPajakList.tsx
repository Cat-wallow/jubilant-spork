'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building } from 'lucide-react';

interface ObjekPajakItem {
  name: string;
  transactions: number;
  percentage: string;
  amount: string;
  pph: string;
}

interface ObjekPajakListProps {
  data: ObjekPajakItem[];
}

export function ObjekPajakList({ data }: ObjekPajakListProps) {
  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10 bg-white p-6">
      <CardHeader className="p-0 pb-[30px]">
        <CardTitle className="flex items-center gap-2 font-arial text-base text-[#0A0A0A]">
          <Building className="h-5 w-5" />
          Objek Pajak
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-[10px] border-[0.8px] border-black/10 bg-[#ECECF0]/30 px-3 py-4"
          >
            <div className="flex flex-col gap-2">
              <p className="font-arial text-base text-[#0A0A0A]">{item.name}</p>
              <div className="flex items-center gap-4">
                <p className="font-arial text-sm text-[#717182]">{item.transactions} transaksi</p>
                <Badge variant="outline" className="rounded-lg border-black/10 font-arial text-xs">
                  {item.percentage}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="font-arial text-base font-bold text-[#0A0A0A]">{item.amount}</p>
              <p className="font-arial text-xs text-[#717182]">{item.pph}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
