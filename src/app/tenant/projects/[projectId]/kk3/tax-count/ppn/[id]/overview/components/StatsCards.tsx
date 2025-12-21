import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardsProps {
  ppnKeluaran: {
    amount: number;
    dpp: number;
  };
  ppnMasukan: {
    amount: number;
    description: string;
  };
}

export function StatsCards({ ppnKeluaran, ppnMasukan }: StatsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex w-[370px] flex-col gap-5">
      <Card className="rounded-[14px] border-[0.8px] border-black/10">
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#00A63E]" />
            <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
              PPN Keluaran
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-arial text-2xl font-bold leading-8 text-[#00A63E]">
              {formatCurrency(ppnKeluaran.amount)}
            </p>
            <p className="font-arial text-xs leading-4 text-[#717182]">
              DPP: {formatCurrency(ppnKeluaran.dpp)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[14px] border-[0.8px] border-black/10">
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-[#155DFC]" />
            <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
              PPN Masukan
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-arial text-2xl font-bold leading-8 text-[#155DFC]">
              {formatCurrency(ppnMasukan.amount)}
            </p>
            <p className="font-arial text-xs leading-4 text-[#717182]">
              {ppnMasukan.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
