import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface JournalDetailData {
  total_debit: number;
  total_credit: number;
}

interface BalanceSummaryProps {
  data: JournalDetailData;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const BalanceSummary: React.FC<BalanceSummaryProps> = ({ data }) => {
  const balance = data.total_debit - data.total_credit;
  const isBalanced = balance === 0;

  return (
    <Card className="flex-1 flex flex-col p-6 gap-6 shadow-none">
      <CardHeader className="flex flex-row justify-between items-center p-0">
        <CardTitle className="text-xl font-bold text-[#404040]">Balance Summary</CardTitle>
        <Badge
          className={`px-3 py-1 text-xs font-semibold ${
            isBalanced
              ? 'bg-[#E6FFFA] text-[#00B37F]'
              : 'bg-[#FFF2E6] text-[#FA541C]'
          }`}
        >
          {isBalanced ? 'Balanced' : 'Unbalanced'}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex justify-between text-base font-medium text-[#637381]">
          <span>Total Debits</span>
          <span className="text-[#212B36] font-semibold">{formatCurrency(data.total_debit)}</span>
        </div>
        <div className="flex justify-between text-base font-medium text-[#637381]">
          <span>Total Credits</span>
          <span className="text-[#212B36] font-semibold">{formatCurrency(data.total_credit)}</span>
        </div>
        <div className="border-t border-dashed border-[#E7E9EC] pt-4 flex justify-between text-lg font-bold">
          <span>Balance</span>
          <span
            className={`${
              isBalanced ? 'text-[#00B37F]' : 'text-[#FA541C]'
            }`}
          >
            {formatCurrency(balance)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
