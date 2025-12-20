'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, FileText, AlertTriangle } from 'lucide-react';
import { insights } from '../_data/mock-data';
import { cn } from '@/lib/utils';

export function InsightCards() {
  const getInsightStyle = (type: string) => {
    switch (type) {
      case 'info':
        return {
          bg: 'bg-[#EFF6FF]',
          icon: <AlertCircle className="h-[18px] w-[18px] text-[#155DFC]" />,
          titleColor: 'text-[#1C398E]',
          descColor: 'text-[#1447E6]',
        };
      case 'success':
        return {
          bg: 'bg-[#F0FDF4]',
          icon: <FileText className="h-5 w-5 text-[#00A63E]" />,
          titleColor: 'text-[#0D542B]',
          descColor: 'text-[#008236]',
        };
      case 'warning':
        return {
          bg: 'bg-[#FFF7ED]',
          icon: <AlertTriangle className="h-5 w-5 text-[#F54900]" />,
          titleColor: 'text-[#7E2A0C]',
          descColor: 'text-[#CA3500]',
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: <AlertCircle className="h-5 w-5" />,
          titleColor: 'text-gray-900',
          descColor: 'text-gray-600',
        };
    }
  };

  return (
    <Card className="rounded-[14px] border-[0.8px] border-black/10">
      <CardHeader className="p-6">
        <CardTitle className="text-base font-normal text-[#0A0A0A]">
          Insight Perhitungan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-6 pt-0">
        {insights.map((insight, index) => {
          const style = getInsightStyle(insight.type);
          return (
            <div key={index} className={cn('rounded-[10px] p-3', style.bg)}>
              <div className="mb-2 flex items-start gap-3">
                {style.icon}
                <div className="flex-1">
                  <h4 className={cn('mb-1 text-base font-normal', style.titleColor)}>
                    {insight.title}
                  </h4>
                  <p className={cn('text-sm font-normal', style.descColor)}>
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
