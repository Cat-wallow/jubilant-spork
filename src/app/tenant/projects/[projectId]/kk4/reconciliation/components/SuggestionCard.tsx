import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Eye } from 'lucide-react';
import type { Suggestion } from './data';

interface SuggestionCardProps {
  suggestion: Suggestion;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export function SuggestionCard({ suggestion, onAccept, onReject }: SuggestionCardProps) {
  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  return (
    <Card className="p-4 border-l-4 border-t border-r border-b border-blue-500 border-l-blue-500 shadow-md">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="bg-red-500 text-white border-none">
                Koreksi +
              </Badge>
              <span className="text-sm font-normal text-red-500">
                {formatCurrency(suggestion.amount)}
              </span>
            </div>
            <p className="text-xs text-slate-900 font-normal">{suggestion.title}</p>
            <p className="text-xs font-mono text-slate-500">{suggestion.accountCode}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
            <Eye className="h-4 w-4 text-slate-900" />
          </Button>
        </div>

        {/* Rule Info */}
        <div className="space-y-1">
          <p className="text-xs text-slate-500">
            <span className="font-bold">Rule:</span> {suggestion.ruleTitle}
          </p>
          <p className="text-xs text-slate-500">{suggestion.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => onAccept(suggestion.id)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            <Check className="h-4 w-4 mr-2" />
            Accept
          </Button>
          <Button
            onClick={() => onReject(suggestion.id)}
            variant="outline"
            size="icon"
            className="h-9 w-9 border-slate-200 shadow-sm"
          >
            <X className="h-4 w-4 text-slate-900" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
