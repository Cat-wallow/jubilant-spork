import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreVertical, Paperclip } from 'lucide-react';
import type { StagedAdjustment } from './data';

interface StagedAdjustmentCardProps {
  adjustment: StagedAdjustment;
}

export function StagedAdjustmentCard({ adjustment }: StagedAdjustmentCardProps) {
  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  return (
    <Card className="p-4 border-l-4 border-t border-r border-b border-yellow-500 border-l-yellow-500 shadow-md">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-indigo-600 text-white border-none">
                Koreksi -
              </Badge>
              <span className="text-sm font-normal text-green-600">
                {formatCurrency(adjustment.amount)}
              </span>
            </div>
            <p className="text-xs text-slate-900 font-normal">{adjustment.title}</p>
            <p className="text-xs font-mono text-slate-500">{adjustment.accountCode}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
            <MoreVertical className="h-4 w-4 text-slate-900" />
          </Button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500">{adjustment.description}</p>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-500">By: {adjustment.author}</p>
          <Badge variant="outline" className="border-slate-200">
            <Paperclip className="h-3 w-3 mr-1" />
            {adjustment.attachments}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
