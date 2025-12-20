import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Info } from 'lucide-react';

interface AnalysisSectionProps {
  analysis: {
    effectiveTaxRate: {
      actual: number;
      target: number;
    };
    creditUtilizationRatio: {
      ratio: number;
      description: string;
    };
    insight: string;
  };
}

export function AnalysisSection({ analysis }: AnalysisSectionProps) {
  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10">
      <CardContent className="flex flex-col gap-2.5 p-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2 font-arial text-lg leading-7 text-[#0A0A0A]">
            <Info className="h-4 w-4 text-[#155DFC]" />
            Analisis Efisiensi Pajak
          </CardTitle>
        </CardHeader>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
              Effective Tax Rate
            </span>
            <span className="font-[Consolas] text-sm leading-5 text-[#0A0A0A]">
              {analysis.effectiveTaxRate.actual.toFixed(2)}%
            </span>
          </div>
          <Progress value={100} className="h-2" />
          <p className="font-arial text-xs leading-4 text-[#717182]">
            Target: {analysis.effectiveTaxRate.target}% • Actual:{' '}
            {analysis.effectiveTaxRate.actual.toFixed(2)}%
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-arial text-sm leading-5 text-[#0A0A0A]">
              Credit Utilization Ratio
            </span>
            <span className="font-[Consolas] text-sm leading-5 text-[#0A0A0A]">
              {analysis.creditUtilizationRatio.ratio}%
            </span>
          </div>
          <Progress value={analysis.creditUtilizationRatio.ratio} className="h-2" />
          <p className="font-arial text-xs leading-4 text-[#717182]">
            {analysis.creditUtilizationRatio.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-[10px] bg-[#EFF6FF] p-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-[#155DFC]" />
            <span className="font-arial text-sm leading-5 text-[#193CB8]">
              Tax Insight
            </span>
          </div>
          <p className="font-arial text-sm leading-5 text-[#1447E6]">
            {analysis.insight}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
