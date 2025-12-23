import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, CheckCircle, Plus, X } from 'lucide-react';

interface SummaryCardsProps {
  totalSuggestions: number;
  stagedAdjustments: number;
  positiveCorrection: number;
  negativeCorrection: number;
}

export function SummaryCards({
  totalSuggestions,
  stagedAdjustments,
  positiveCorrection,
  negativeCorrection
}: SummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Saran Card */}
      <Card className="p-6 border-none shadow-md bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-blue-200/40">
            <Calculator className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-none">
            Auto
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-600">Total Saran</p>
          <p className="text-2xl font-bold text-blue-900">{totalSuggestions}</p>
          <p className="text-xs text-blue-600">Dari rule engine</p>
        </div>
      </Card>

      {/* Staged Adjustments Card */}
      <Card className="p-6 border-none shadow-md bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-purple-200/40">
            <CheckCircle className="h-5 w-5 text-purple-700" strokeWidth={1.5} />
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-none">
            Ready
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-600">Staged Adjustments</p>
          <p className="text-2xl font-bold text-purple-900">{stagedAdjustments}</p>
          <p className="text-xs text-purple-700">Siap untuk review</p>
        </div>
      </Card>

      {/* Koreksi Positif Card */}
      <Card className="p-6 border-none shadow-md bg-gradient-to-br from-red-50 via-red-100 to-red-200">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-red-200/40">
            <Plus className="h-5 w-5 text-red-700" strokeWidth={1.5} />
          </div>
          <Badge variant="secondary" className="bg-red-100 text-red-700 border-none">
            +
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-600">Koreksi Positif</p>
          <p className="text-2xl font-bold text-red-900">+{formatCurrency(positiveCorrection)}</p>
          <p className="text-xs text-red-700">Menambah penghasilan kena pajak</p>
        </div>
      </Card>

      {/* Koreksi Negatif Card */}
      <Card className="p-6 border-none shadow-md bg-gradient-to-br from-green-50 via-green-100 to-green-200">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-green-200/40">
            <X className="h-5 w-5 text-green-700" strokeWidth={1.5} />
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-none">
            -
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-600">Koreksi Negatif</p>
          <p className="text-2xl font-bold text-green-900">-{formatCurrency(negativeCorrection)}</p>
          <p className="text-xs text-green-700">Mengurangi penghasilan kena pajak</p>
        </div>
      </Card>
    </div>
  );
}
