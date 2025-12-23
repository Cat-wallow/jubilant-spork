import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronRight, Paperclip } from 'lucide-react';
import type { SourceLine } from './data';

interface SourceLinesTableProps {
  sourceLines: SourceLine[];
}

export function SourceLinesTable({ sourceLines }: SourceLinesTableProps) {
  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const getTaxHintBadge = (taxHint: string) => {
    switch (taxHint) {
      case 'partial':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-slate-200">
            partial
          </Badge>
        );
      case 'non-fiscal':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-500 border-slate-200">
            non-fiscal
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-slate-200">
            fiscal
          </Badge>
        );
    }
  };

  const getFlagBadge = (flag: string) => {
    switch (flag) {
      case 'critical':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-500 border-red-500">
            Critical
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-500">
            Warning
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-500">
            Info
          </Badge>
        );
    }
  };

  const getRowClassName = (flag: string) => {
    if (flag === 'warning' || flag === 'critical') {
      return 'bg-yellow-50/30';
    }
    return '';
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 border-b border-slate-200">
            <TableHead className="text-xs uppercase tracking-wide text-slate-500 font-normal">
              Journal Ref
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-slate-500 font-normal">
              Date
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-slate-500 font-normal">
              COA Code
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-slate-500 font-normal">
              Account Name
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-slate-500 font-normal text-right">
              Amount
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-slate-500 font-normal">
              Tax Hint
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-slate-500 font-normal">
              Flag
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sourceLines.map((line) => (
            <TableRow key={line.id} className={`border-b border-slate-200 ${getRowClassName(line.flag)}`}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-900">{line.journalRef}</span>
                  {line.hasAttachments && (
                    <Paperclip className="h-3 w-3 text-slate-400" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-xs text-slate-900">{line.date}</span>
              </TableCell>
              <TableCell>
                <span className="text-xs font-mono text-slate-900">{line.coaCode}</span>
              </TableCell>
              <TableCell>
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-900">{line.accountName}</p>
                  <p className="text-xs text-slate-500">{line.accountDescription}</p>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span className="text-xs text-slate-900">{formatCurrency(line.amount)}</span>
              </TableCell>
              <TableCell>{getTaxHintBadge(line.taxHint)}</TableCell>
              <TableCell>{getFlagBadge(line.flag)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4 text-slate-900" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
