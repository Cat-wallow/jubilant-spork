import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

interface CalculationHeaderProps {
  title: string;
  period: string;
  tariff: number;
}

export function CalculationHeader({
  title,
  period,
  tariff,
}: CalculationHeaderProps) {
  return (
    <Card className="rounded-[20px] border-[0.8px] border-black/10">
      <CardHeader className="pb-1.5">
        <CardTitle className="flex items-center gap-2 font-arial text-base font-bold leading-4 text-[#0A0A0A]">
          <Calculator className="h-5 w-5 text-[#155DFC]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-arial text-sm leading-5 text-[#717182]">
          Periode {period} • Tarif PPN {tariff}%
        </p>
      </CardContent>
    </Card>
  );
}
