import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Target, FileText, Zap } from 'lucide-react';

interface MetricCardsProps {
  netPPN: {
    amount: number;
    description: string;
  };
  effectiveRate: {
    rate: number;
    target: number;
  };
  totalTransaction: {
    total: number;
    keluaran: number;
    masukan: number;
  };
  autoFill: {
    percentage: number;
    source: string;
  };
}

export function MetricCards({
  netPPN,
  effectiveRate,
  totalTransaction,
  autoFill,
}: MetricCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-4 gap-[30px]">
      <Card className="rounded-[14px] border-[0.8px] border-black/10">
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-[#9810FA]" />
            <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
              Net PPN
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-arial text-2xl font-bold leading-8 text-[#E7000B]">
              {formatCurrency(netPPN.amount)}
            </p>
            <p className="font-arial text-xs leading-4 text-[#717182]">
              {netPPN.description}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[14px] border-[0.8px] border-black/10">
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[#F54900]" />
            <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
              Effective Rate
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-arial text-2xl font-bold leading-8 text-[#F54900]">
              {effectiveRate.rate}%
            </p>
            <p className="font-arial text-xs leading-4 text-[#717182]">
              Target: {effectiveRate.target}%
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[14px] border-[0.8px] border-black/10">
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#4A5565]" />
            <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
              Total Transaksi
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-arial text-2xl font-bold leading-8 text-[#4A5565]">
              {totalTransaction.total}
            </p>
            <p className="font-arial text-xs leading-4 text-[#717182]">
              K:{totalTransaction.keluaran} • M:{totalTransaction.masukan}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[14px] border-[0.8px] border-black/10">
        <CardContent className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#155DFC]" />
            <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
              Auto-Fill
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-arial text-2xl font-bold leading-8 text-[#155DFC]">
              {autoFill.percentage}%
            </p>
            <p className="font-arial text-xs leading-4 text-[#717182]">
              {autoFill.source}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
