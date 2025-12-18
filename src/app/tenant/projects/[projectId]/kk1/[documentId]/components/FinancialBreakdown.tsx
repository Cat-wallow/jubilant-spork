import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DollarSign, Receipt } from 'lucide-react';

interface FinancialBreakdownProps {
  financial: {
    totalAmount: number;
    baseAmount: number;
    currency: string;
    taxes: {
      ppn11: number;
      pph21: number;
      pph23: number;
      pph42: number;
    };
    totalTaxImpact: number;
  };
}

function formatCurrency(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function FinancialBreakdown({ financial }: FinancialBreakdownProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <DollarSign className="h-4 w-4" />
          Breakdown Keuangan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(financial.totalAmount)}
          </p>
          <p className="text-xs text-gray-500">Including all taxes and charges</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Base Amount</p>
            <p className="font-mono text-sm">{formatCurrency(financial.baseAmount)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Currency</p>
            <p className="text-sm">{financial.currency}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            <h4 className="font-medium">Tax Breakdown</h4>
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1 rounded border border-gray-200 p-3">
              <p className="text-sm text-gray-600">PPN (11%)</p>
              <p className="font-mono text-sm">{formatCurrency(financial.taxes.ppn11)}</p>
            </div>
            <div className="space-y-1 rounded border border-gray-200 p-3">
              <p className="text-sm text-gray-600">PPh 21</p>
              <p className="font-mono text-sm">{formatCurrency(financial.taxes.pph21)}</p>
            </div>
            <div className="space-y-1 rounded border border-gray-200 p-3">
              <p className="text-sm text-gray-600">PPh 23 (2%)</p>
              <p className="font-mono text-sm">{formatCurrency(financial.taxes.pph23)}</p>
            </div>
            <div className="space-y-1 rounded border border-gray-200 p-3">
              <p className="text-sm text-gray-600">PPh 42</p>
              <p className="font-mono text-sm">{formatCurrency(financial.taxes.pph42)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded bg-gray-50 p-3">
            <span className="font-medium">Total Tax Impact:</span>
            <span className="font-mono font-bold">{formatCurrency(financial.totalTaxImpact)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
