import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar } from 'lucide-react';

interface TransactionInfoProps {
  info: {
    transactionId: string;
    referenceNumber: string;
    transactionDate: string;
    dueDate: string;
    counterparty: {
      name: string;
      npwp: string;
    };
    transactionType: string[];
    division: string;
    department: string;
    billType: string;
    paymentTerms: string;
  };
}

export function TransactionInfo({ info }: TransactionInfoProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          Informasi Transaksi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Transaction ID</p>
            <p className="font-mono text-sm">{info.transactionId}</p>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Reference Number</p>
            <p className="font-mono text-sm">{info.referenceNumber}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Tanggal Transaksi</p>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <p className="text-sm">{info.transactionDate}</p>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="text-sm">{info.dueDate}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Counterparty</p>
            <div className="space-y-1">
              <p className="text-sm font-medium">{info.counterparty.name}</p>
              <p className="text-xs text-gray-600">NPWP: {info.counterparty.npwp}</p>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Tipe Transaksi</p>
            <div className="flex flex-wrap justify-center gap-2">
              {info.transactionType.map((type, index) => (
                <Badge
                  key={index}
                  variant={index === 0 ? 'outline' : 'secondary'}
                  className={index === 1 ? 'border-blue-200 bg-blue-50 text-blue-700' : ''}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Divisi</p>
            <p className="text-sm">{info.division}</p>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Departemen</p>
            <p className="text-sm">{info.department}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Bill Type</p>
            <Badge variant="outline">{info.billType}</Badge>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-sm text-gray-600">Payment Terms</p>
            <p className="text-sm">{info.paymentTerms}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
