import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BagianAProps {
  title: string;
  items: Array<{
    label: string;
    description: string;
    amount: number;
    percentage: number;
    color: 'green' | 'blue' | 'gray' | 'orange';
  }>;
  total: number;
}

const colorStyles = {
  green: 'bg-[#F0FDF4] text-[#008236]',
  blue: 'bg-[#EFF6FF] text-[#1447E6]',
  gray: 'bg-[#F9FAFB] text-[#364153]',
  orange: 'bg-[#FFF7ED] text-[#CA3500]',
};

export function BagianA({ title, items, total }: BagianAProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10">
      <CardContent className="flex flex-col gap-[30px] p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 font-arial text-lg font-bold leading-7 text-[#0A0A0A]">
            <TrendingUp className="h-4 w-4 text-[#00A63E]" />
            {title}
          </CardTitle>
        </CardHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center justify-between rounded-[10px] p-3',
                  colorStyles[item.color]
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
                    {item.label}
                  </span>
                  <span className="font-arial text-xs leading-4 text-[#717182]">
                    {item.description}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-0.5">
                  <span className="font-[Consolas] text-base font-bold leading-6">
                    {formatCurrency(item.amount)}
                  </span>
                  <span className="font-arial text-xs leading-4 text-[#717182]">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-[10px] border-2 border-[#B9F8CF] bg-gradient-to-r from-[#DCFCE7] to-[#DBEAFE] p-4">
            <span className="font-arial text-base font-bold leading-6 text-[#0D542B]">
              Total Penyerahan
            </span>
            <span className="font-[Consolas] text-2xl font-bold leading-8 text-[#0D542B]">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
